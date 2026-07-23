import type { FetchFn, ModelKey, ProviderResult } from "./types.js";
import { PROVIDER_REGISTRY, routeByPrefix } from "./providers.js";

export interface ApiKeys {
  claude: string;
  openai: string;
  grok: string;
  gemini: string;
  groq: string; // used for the "llama" model key
}

function apiKeyFor(modelKey: ModelKey, keys: ApiKeys): string {
  if (modelKey === "llama") return keys.groq;
  return keys[modelKey];
}

export interface RouterOutput {
  results: ProviderResult[];
  primaryModel: ModelKey;
  cleanText: string;
}

/**
 * Calls every targeted provider in parallel via Promise.allSettled so one
 * slow/failing provider never blocks or breaks the others - each branch is
 * fully isolated. Never throws: a total provider outage still returns
 * results with ok:false, which the caller turns into a plain WhatsApp reply
 * rather than a 500.
 */
export async function routeAndCall(
  text: string,
  isVoice: boolean,
  fetchFn: FetchFn,
  apiKeys: ApiKeys,
): Promise<RouterOutput> {
  const { targets, cleanText, primaryModel } = routeByPrefix(text, isVoice);

  const settled = await Promise.allSettled(
    targets.map((key) => PROVIDER_REGISTRY[key].call(fetchFn, apiKeyFor(key, apiKeys), cleanText)),
  );

  const results: ProviderResult[] = settled.map((outcome, i) => {
    const key = targets[i] as ModelKey;
    if (outcome.status === "fulfilled") return outcome.value;
    return {
      modelKey: key,
      label: PROVIDER_REGISTRY[key].label,
      ok: false,
      replyText: `${PROVIDER_REGISTRY[key].label} is unavailable right now.`,
      latencyMs: 0,
    };
  });

  return { results, primaryModel, cleanText };
}

/** Deliberately plain - infra pass, not the personality/UX pass. */
export function formatReply(result: ProviderResult): string {
  return `[${result.label}] ${result.replyText}`;
}
