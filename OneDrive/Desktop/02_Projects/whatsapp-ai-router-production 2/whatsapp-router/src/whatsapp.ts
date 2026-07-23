import type { ParsedMessage } from "./types.js";
import { SignatureError, VerifyTokenError, WhatsAppApiError, fetchWithRetry } from "./errors.js";

// ---------------------------------------------------------------------------
// Webhook handshake (Meta's one-time GET verification)
// ---------------------------------------------------------------------------
export function handleVerification(url: URL, expectedToken: string): string {
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  console.log("VERIFY DEBUG:", { mode, token, expectedToken, challenge, tokenMatch: token === expectedToken, modeMatch: mode === "subscribe" });

  if (mode !== "subscribe" || token !== expectedToken || !challenge) {
    throw new VerifyTokenError();
  }
  return challenge;
}

// ---------------------------------------------------------------------------
// Signature verification (X-Hub-Signature-256) - proves the POST body really
// came from Meta and wasn't forged by someone who guessed the webhook URL.
// Without this, anyone can POST fake messages that trigger 5 paid API calls.
// ---------------------------------------------------------------------------
export async function verifySignature(
  appSecret: string,
  rawBody: string,
  signatureHeader: string | null,
): Promise<void> {
  if (!signatureHeader || !signatureHeader.startsWith("sha256=")) {
    throw new SignatureError("Missing or malformed X-Hub-Signature-256 header");
  }
  const providedHex = signatureHeader.slice("sha256=".length);

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(appSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(rawBody));
  const computedHex = Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (!timingSafeEqualHex(computedHex, providedHex)) {
    throw new SignatureError("Signature mismatch");
  }
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// ---------------------------------------------------------------------------
// Payload parsing
// ---------------------------------------------------------------------------
export function parseWebhookBody(body: unknown): ParsedMessage | null {
  const entry = (body as any)?.entry?.[0];
  const change = entry?.changes?.[0];
  const value = change?.value;
  const msg = value?.messages?.[0];

  if (!msg) return null; // status callback / read receipt, not a real message

  const waId: string = msg.from;
  const messageId: string = msg.id;
  const type = msg.type;

  if (type === "text") {
    return { waId, messageId, type: "text", text: msg.text.body, mediaId: null, isVoice: false };
  }
  if (type === "audio") {
    return { waId, messageId, type: "audio", text: "", mediaId: msg.audio.id, isVoice: true };
  }
  if (type === "interactive" && msg.interactive?.button_reply) {
    return {
      waId,
      messageId,
      type: "interactive",
      text: msg.interactive.button_reply.title,
      mediaId: null,
      isVoice: false,
    };
  }
  return { waId, messageId, type: "unsupported", text: "", mediaId: null, isVoice: false };
}

export function extractPhoneNumberId(body: unknown): string | null {
  return (body as any)?.entry?.[0]?.changes?.[0]?.value?.metadata?.phone_number_id ?? null;
}

// ---------------------------------------------------------------------------
// Sending
// ---------------------------------------------------------------------------
interface GraphContext {
  fetchFn: typeof fetch;
  token: string;
  phoneNumberId: string;
  graphVersion: string;
}

async function graphPost(ctx: GraphContext, path: string, body: unknown): Promise<any> {
  const url = `https://graph.facebook.com/${ctx.graphVersion}/${path}`;
  const res = await fetchWithRetry(
    ctx.fetchFn,
    url,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
    { retries: 1, timeoutMs: 10000 },
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new WhatsAppApiError(`Graph API ${res.status}: ${detail.slice(0, 300)}`, res.status, detail);
  }
  return res.json();
}

export async function sendText(ctx: GraphContext, waId: string, body: string): Promise<void> {
  const MAX = 4000;
  const trimmed = body.length > MAX ? body.slice(0, MAX - 15) + "\n[truncated]" : body;
  await graphPost(ctx, `${ctx.phoneNumberId}/messages`, {
    messaging_product: "whatsapp",
    to: waId,
    type: "text",
    text: { body: trimmed },
  });
}

export async function sendAudioById(ctx: GraphContext, waId: string, mediaId: string): Promise<void> {
  await graphPost(ctx, `${ctx.phoneNumberId}/messages`, {
    messaging_product: "whatsapp",
    to: waId,
    type: "audio",
    audio: { id: mediaId },
  });
}

export async function getMediaUrl(ctx: GraphContext, mediaId: string): Promise<string> {
  const res = await fetchWithRetry(
    ctx.fetchFn,
    `https://graph.facebook.com/${ctx.graphVersion}/${mediaId}`,
    { headers: { Authorization: `Bearer ${ctx.token}` } },
    { retries: 1, timeoutMs: 10000 },
  );
  if (!res.ok) throw new WhatsAppApiError(`Failed to resolve media URL: ${res.status}`);
  const json: any = await res.json();
  return json.url;
}

export async function downloadMedia(ctx: GraphContext, mediaUrl: string): Promise<ArrayBuffer> {
  const res = await fetchWithRetry(
    ctx.fetchFn,
    mediaUrl,
    { headers: { Authorization: `Bearer ${ctx.token}` } },
    { retries: 1, timeoutMs: 15000 },
  );
  if (!res.ok) throw new WhatsAppApiError(`Failed to download media: ${res.status}`);
  return res.arrayBuffer();
}

export async function uploadMedia(
  ctx: GraphContext,
  audioBuffer: ArrayBuffer,
  mimeType: string,
): Promise<string> {
  const form = new FormData();
  form.append("messaging_product", "whatsapp");
  form.append("file", new Blob([audioBuffer], { type: mimeType }), "reply.mp3");
  const res = await fetchWithRetry(
    ctx.fetchFn,
    `https://graph.facebook.com/${ctx.graphVersion}/${ctx.phoneNumberId}/media`,
    { method: "POST", headers: { Authorization: `Bearer ${ctx.token}` }, body: form },
    { retries: 1, timeoutMs: 15000 },
  );
  if (!res.ok) throw new WhatsAppApiError(`Failed to upload media: ${res.status}`);
  const json: any = await res.json();
  return json.id;
}

export type { GraphContext };

