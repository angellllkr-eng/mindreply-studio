import type { FetchFn, ModelKey, ProviderResult } from "./types.js";
import { fetchWithRetry } from "./errors.js";
import { MODEL_IDS, PROVIDER_ENDPOINTS, geminiEndpoint } from "./config.js";

export interface ProviderAdapter {
  key: ModelKey;
  label: string;
  call(fetchFn: FetchFn, apiKey: string, prompt: string): Promise<ProviderResult>;
}

async function timed<T>(fn: () => Promise<T>): Promise<{ result: T; latencyMs: number }> {
  const start = Date.now();
  const result = await fn();
  return { result, latencyMs: Date.now() - start };
}

function safeParse<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

/** res.json() itself throws on a non-JSON body (e.g. an HTML error page from
 * a gateway/proxy in front of the provider) - never let that escape as an
 * unhandled rejection out of an adapter. */
async function safeJson(res: Response): Promise<any> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function fail(modelKey: ModelKey, label: string, latencyMs: number): ProviderResult {
  return { modelKey, label, ok: false, replyText: `${label} is unavailable right now.`, latencyMs };
}

export const claudeAdapter: ProviderAdapter = {
  key: "claude",
  label: "Claude",
  async call(fetchFn, apiKey, prompt) {
    const { result: res, latencyMs } = await timed(() =>
      fetchWithRetry(
        fetchFn,
        PROVIDER_ENDPOINTS.claude,
        {
          method: "POST",
          headers: {
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            model: MODEL_IDS.claude,
            max_tokens: 1024,
            messages: [{ role: "user", content: prompt }],
          }),
        },
        { retries: 1, timeoutMs: 20000 },
      ),
    );
    if (!res.ok) return fail("claude", "Claude", latencyMs);
    const json: any = await safeJson(res);
    const text = safeParse(() => json.content[0].text as string, "");
    return { modelKey: "claude", label: "Claude", ok: !!text, replyText: text || "(empty response)", latencyMs };
  },
};

export const openaiAdapter: ProviderAdapter = {
  key: "openai",
  label: "GPT",
  async call(fetchFn, apiKey, prompt) {
    const { result: res, latencyMs } = await timed(() =>
      fetchWithRetry(
        fetchFn,
        PROVIDER_ENDPOINTS.openai,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
          body: JSON.stringify({ model: MODEL_IDS.openai, messages: [{ role: "user", content: prompt }] }),
        },
        { retries: 1, timeoutMs: 20000 },
      ),
    );
    if (!res.ok) return fail("openai", "GPT", latencyMs);
    const json: any = await safeJson(res);
    const text = safeParse(() => json.choices[0].message.content as string, "");
    return { modelKey: "openai", label: "GPT", ok: !!text, replyText: text || "(empty response)", latencyMs };
  },
};

export const grokAdapter: ProviderAdapter = {
  key: "grok",
  label: "Grok",
  async call(fetchFn, apiKey, prompt) {
    const { result: res, latencyMs } = await timed(() =>
      fetchWithRetry(
        fetchFn,
        PROVIDER_ENDPOINTS.grok,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
          body: JSON.stringify({ model: MODEL_IDS.grok, messages: [{ role: "user", content: prompt }] }),
        },
        { retries: 1, timeoutMs: 20000 },
      ),
    );
    if (!res.ok) return fail("grok", "Grok", latencyMs);
    const json: any = await safeJson(res);
    const text = safeParse(() => json.choices[0].message.content as string, "");
    return { modelKey: "grok", label: "Grok", ok: !!text, replyText: text || "(empty response)", latencyMs };
  },
};

export const geminiAdapter: ProviderAdapter = {
  key: "gemini",
  label: "Gemini",
  async call(fetchFn, apiKey, prompt) {
    const { result: res, latencyMs } = await timed(() =>
      fetchWithRetry(
        fetchFn,
        geminiEndpoint(),
        {
          method: "POST",
          headers: { "x-goog-api-key": apiKey, "content-type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        },
        { retries: 1, timeoutMs: 20000 },
      ),
    );
    if (!res.ok) return fail("gemini", "Gemini", latencyMs);
    const json: any = await safeJson(res);
    const text = safeParse(() => json.candidates[0].content.parts[0].text as string, "");
    return { modelKey: "gemini", label: "Gemini", ok: !!text, replyText: text || "(empty response)", latencyMs };
  },
};

export const llamaAdapter: ProviderAdapter = {
  key: "llama",
  label: "Llama",
  async call(fetchFn, apiKey, prompt) {
    const { result: res, latencyMs } = await timed(() =>
      fetchWithRetry(
        fetchFn,
        PROVIDER_ENDPOINTS.llama,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
          body: JSON.stringify({ model: MODEL_IDS.llama, messages: [{ role: "user", content: prompt }] }),
        },
        { retries: 1, timeoutMs: 20000 },
      ),
    );
    if (!res.ok) return fail("llama", "Llama", latencyMs);
    const json: any = await safeJson(res);
    const text = safeParse(() => json.choices[0].message.content as string, "");
    return { modelKey: "llama", label: "Llama", ok: !!text, replyText: text || "(empty response)", latencyMs };
  },
};

export const PROVIDER_REGISTRY: Record<ModelKey, ProviderAdapter> = {
  claude: claudeAdapter,
  openai: openaiAdapter,
  grok: grokAdapter,
  gemini: geminiAdapter,
  llama: llamaAdapter,
};

const PREFIX_MAP: Record<string, ModelKey> = {
  "/claude": "claude",
  "/gpt": "openai",
  "/openai": "openai",
  "/grok": "grok",
  "/gemini": "gemini",
  "/llama": "llama",
};

export function routeByPrefix(rawText: string, isVoice: boolean) {
  const trimmed = rawText.trim();
  const lower = trimmed.toLowerCase();

  let targets: ModelKey[] = ["claude", "openai", "grok", "gemini", "llama"];
  let cleanText = trimmed;

  if (lower.startsWith("/all")) {
    cleanText = trimmed.slice(4).trim();
  } else {
    for (const [prefix, model] of Object.entries(PREFIX_MAP)) {
      if (lower.startsWith(prefix)) {
        targets = [model];
        cleanText = trimmed.slice(prefix.length).trim();
        break;
      }
    }
  }

  // Voice notes default to a single model instead of fanning out to all 5 -
  // avoids sending 5 separate voice replies back for one spoken message.
  if (isVoice && targets.length > 1) {
    targets = ["openai"];
  }

  const primaryModel: ModelKey = targets.length === 1 ? (targets[0] as ModelKey) : "openai";

  return { targets, cleanText: cleanText || trimmed, primaryModel };
}
