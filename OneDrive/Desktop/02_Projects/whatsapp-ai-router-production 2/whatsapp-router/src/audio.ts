import type { FetchFn } from "./types.js";
import { fetchWithRetry, ProviderError } from "./errors.js";

/**
 * Transcribe audio via Cloudflare Workers AI Whisper.
 * Free tier, no OpenAI key needed. Falls back to OpenAI if the Worker URL is not set.
 */
export async function transcribeWithCloudflareWhisper(
  fetchFn: FetchFn,
  workerUrl: string | undefined,
  audioBuffer: ArrayBuffer,
): Promise<string> {
  if (!workerUrl) throw new ProviderError("cloudflare", "WHISPER_WORKER_URL not set");

  const blob = new Blob([audioBuffer], { type: "audio/ogg" });

  // POST the raw audio bytes to the Worker (more reliable than URL fetch for WhatsApp media)
  const res = await fetchWithRetry(
    fetchFn,
    workerUrl,
    {
      method: "POST",
      headers: { "Content-Type": "audio/ogg" },
      body: blob,
    },
    { retries: 1, timeoutMs: 30000 },
  );

  if (!res.ok) throw new ProviderError("cloudflare", `Whisper worker error: ${res.status}`);
  return await res.text();
}

export async function transcribeAudio(
  fetchFn: FetchFn,
  apiKey: string,
  audioBuffer: ArrayBuffer,
): Promise<string> {
  const form = new FormData();
  form.append("file", new Blob([audioBuffer], { type: "audio/ogg" }), "voice.ogg");
  form.append("model", "whisper-1");

  const res = await fetchWithRetry(
    fetchFn,
    "https://api.openai.com/v1/audio/transcriptions",
    { method: "POST", headers: { Authorization: `Bearer ${apiKey}` }, body: form },
    { retries: 1, timeoutMs: 20000 },
  );
  if (!res.ok) throw new ProviderError("openai", `Transcription failed: ${res.status}`);
  const json: any = await res.json();
  return json.text ?? "";
}

/**
 * Smart transcribe: try Cloudflare Whisper first (free), fall back to OpenAI (paid).
 */
export async function transcribeSmart(
  fetchFn: FetchFn,
  openaiKey: string,
  whisperWorkerUrl: string | undefined,
  audioBuffer: ArrayBuffer,
): Promise<string> {
  try {
    if (whisperWorkerUrl) {
      return await transcribeWithCloudflareWhisper(fetchFn, whisperWorkerUrl, audioBuffer);
    }
  } catch (err) {
    // Fall through to OpenAI
  }
  return await transcribeAudio(fetchFn, openaiKey, audioBuffer);
}

export async function synthesizeSpeech(
  fetchFn: FetchFn,
  apiKey: string,
  text: string,
): Promise<ArrayBuffer> {
  const res = await fetchWithRetry(
    fetchFn,
    "https://api.openai.com/v1/audio/speech",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({ model: "tts-1", voice: "alloy", input: text.slice(0, 4000) }),
    },
    { retries: 1, timeoutMs: 20000 },
  );
  if (!res.ok) throw new ProviderError("openai", `TTS failed: ${res.status}`);
  return res.arrayBuffer();
}
