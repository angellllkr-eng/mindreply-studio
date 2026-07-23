import type { Env, ParsedMessage, ProviderResult } from "./types.js";
import { assertValidEnv, rateLimitMax, airtableLoggingEnabled, supabaseLoggingEnabled, d1LoggingEnabled } from "./config.js";
import { logger } from "./logger.js";
import {
  handleVerification,
  verifySignature,
  parseWebhookBody,
  extractPhoneNumberId,
  sendText,
  sendAudioById,
  getMediaUrl,
  downloadMedia,
  uploadMedia,
  type GraphContext,
} from "./whatsapp.js";
import { checkAndIncrementRateLimit } from "./rateLimiter.js";
import { isDuplicate } from "./dedup.js";
import { fromKVNamespace } from "./kv.js";
import { routeAndCall, formatReply } from "./router.js";
import { transcribeSmart, synthesizeSpeech } from "./audio.js";
import { logToSupabase } from "./supabaseLog.js";
import { logToD1 } from "./d1Log.js";
import { VerifyTokenError } from "./errors.js";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return json({ ok: true, service: "whatsapp-ai-router" });
    }

    if (url.pathname !== "/webhook") {
      return new Response("Not found", { status: 404 });
    }

    if (request.method === "GET" && url.pathname === "/webhook") {
      try {
        const challenge = handleVerification(url, env.WHATSAPP_VERIFY_TOKEN);
        return new Response(challenge, { status: 200 });
      } catch (err) {
        if (err instanceof VerifyTokenError) {
          logger.warn("Webhook verification handshake failed");
          return new Response("Forbidden", { status: 403 });
        }
        logger.error("Unexpected error during verification", { error: String(err) });
        return new Response("Internal error", { status: 500 });
      }
    }

    try {
      assertValidEnv(env);
    } catch (err) {
      // Fails closed and loud - a misconfigured deploy should never silently
      // half-work. This is the one case we return 500: it's our bug, not a
      // malformed request, and there's nothing useful to retry into.
      logger.error("Invalid environment configuration", { error: String(err) });
      return new Response("Server misconfigured", { status: 500 });
    }

    if (request.method === "POST") {
      return handlePost(request, env, ctx);
    }

    return new Response("Method not allowed", { status: 405 });
  },
};

async function handlePost(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const rawBody = await request.text();

  try {
    await verifySignature(env.WHATSAPP_APP_SECRET, rawBody, request.headers.get("X-Hub-Signature-256"));
  } catch {
    // Reject outright - do NOT return 200 here. A 200 to an unsigned/forged
    // request would look like success to an attacker and, worse, is the one
    // case where we actually want NO further processing to happen at all.
    logger.warn("Rejected webhook POST with invalid or missing signature");
    return new Response("Forbidden", { status: 403 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  const parsed = parseWebhookBody(body);
  const phoneNumberId = extractPhoneNumberId(body);

  if (!parsed || parsed.type === "unsupported") {
    // Status callbacks (delivered/read receipts), reactions, etc. - valid
    // events we simply don't act on. Ack and move on.
    return new Response("EVENT_RECEIVED", { status: 200 });
  }

  if (!phoneNumberId) {
    // Meta always includes this in a real message event. If it's missing,
    // the payload shape isn't what we expect - log it and bail rather than
    // guessing which of (potentially several) numbers on the WABA to use.
    logger.error("Webhook message missing phone_number_id, skipping", { messageId: parsed.messageId });
    return new Response("EVENT_RECEIVED", { status: 200 });
  }

  const dedupKv = fromKVNamespace(env.DEDUP_KV);
  const dup = await isDuplicate(dedupKv, parsed.messageId);
  if (dup) {
    logger.info("Duplicate webhook delivery ignored", { messageId: parsed.messageId });
    return new Response("EVENT_RECEIVED", { status: 200 });
  }

  // Ack Meta immediately, keep working in the background. Meta times out
  // and retries webhooks that don't respond within a few seconds - waiting
  // for up to 5 model APIs plus WhatsApp sends would blow that budget.
  ctx.waitUntil(
    processMessage(env, phoneNumberId, parsed).catch((err) =>
      logger.error("Background processing failed", {
        error: String(err),
        waId: parsed.waId,
        messageId: parsed.messageId,
      }),
    ),
  );

  return new Response("EVENT_RECEIVED", { status: 200 });
}

async function processMessage(env: Env, phoneNumberId: string, msg: ParsedMessage): Promise<void> {
  const graphCtx: GraphContext = {
    fetchFn: fetch,
    token: env.WHATSAPP_ACCESS_TOKEN,
    phoneNumberId,
    graphVersion: env.WHATSAPP_GRAPH_VERSION,
  };

  const max = rateLimitMax(env);
  const rateLimitKv = fromKVNamespace(env.RATE_LIMIT_KV);
  const { limited } = await checkAndIncrementRateLimit(rateLimitKv, msg.waId, max);
  if (limited) {
    await sendText(graphCtx, msg.waId, "You've hit the hourly message limit. Try again in a bit.");
    return;
  }

  let text = msg.text;
  if (msg.isVoice && msg.mediaId) {
    const mediaUrl = await getMediaUrl(graphCtx, msg.mediaId);
    const audioBuffer = await downloadMedia(graphCtx, mediaUrl);
    text = await transcribeSmart(fetch, env.OPENAI_API_KEY, env.WHISPER_WORKER_URL, audioBuffer);
  }

  const apiKeys = {
    claude: env.ANTHROPIC_API_KEY,
    openai: env.OPENAI_API_KEY,
    grok: env.XAI_API_KEY,
    gemini: env.GEMINI_API_KEY,
    groq: env.GROQ_API_KEY,
  };

  const { results, primaryModel } = await routeAndCall(text, msg.isVoice, fetch, apiKeys);

  for (const result of results) {
    await sendText(graphCtx, msg.waId, formatReply(result));

    if (msg.isVoice && result.ok && result.modelKey === primaryModel) {
      // Best-effort: a broken TTS call should never take down a reply the
      // user already received as text.
      synthesizeAndSendVoice(graphCtx, env, msg.waId, result.replyText).catch((err) =>
        logger.warn("Voice reply failed (text reply already sent)", { error: String(err) }),
      );
    }

    if (airtableLoggingEnabled(env)) {
      logToAirtable(env, msg, result).catch((err) =>
        logger.warn("Airtable logging failed (non-fatal)", { error: String(err) }),
      );
    }

    if (supabaseLoggingEnabled(env)) {
      logToSupabase(fetch, env.SUPABASE_URL as string, env.SUPABASE_SERVICE_ROLE_KEY as string, msg, result).catch(
        (err) => logger.warn("Supabase logging failed (non-fatal)", { error: String(err) }),
      );
    }

    if (d1LoggingEnabled(env)) {
      logToD1(env.OPS_DB, msg, result).catch((err) =>
        logger.warn("D1 logging failed (non-fatal)", { error: String(err) }),
      );
    }
  }
}

async function synthesizeAndSendVoice(
  graphCtx: GraphContext,
  env: Env,
  waId: string,
  replyText: string,
): Promise<void> {
  const audio = await synthesizeSpeech(fetch, env.OPENAI_API_KEY, replyText);
  const mediaId = await uploadMedia(graphCtx, audio, "audio/mpeg");
  await sendAudioById(graphCtx, waId, mediaId);
}

async function logToAirtable(env: Env, msg: ParsedMessage, result: ProviderResult): Promise<void> {
  const table = encodeURIComponent(env.AIRTABLE_TABLE_NAME || "WhatsApp Log");
  const url = `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${table}`;
  await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.AIRTABLE_API_TOKEN}`, "content-type": "application/json" },
    body: JSON.stringify({
      fields: {
        wa_id: msg.waId,
        model: result.label,
        message_id: msg.messageId,
        reply: result.replyText,
        is_voice: msg.isVoice,
        timestamp: new Date().toISOString(),
      },
    }),
  });
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });
}


