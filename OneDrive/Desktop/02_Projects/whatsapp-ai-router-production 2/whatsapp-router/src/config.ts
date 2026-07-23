import type { Env, ModelKey } from "./types.js";

// Central place for model IDs and endpoints - the single source of truth
// providers.ts pulls from. Verify these against each provider's docs before
// a production deploy; these strings drift faster than anything else here.
export const MODEL_IDS: Record<ModelKey, string> = {
  claude: "claude-sonnet-5",
  openai: "gpt-5.6",
  grok: "grok-4.3",
  gemini: "gemini-3.5-flash",
  llama: "meta-llama/llama-4-maverick-17b-128e-instruct", // via Groq - verify exact id in Groq console
};

// Static endpoints for the four providers whose URL doesn't embed the model
// id. Gemini's REST URL embeds the model id itself, so it's built in
// providers.ts from MODEL_IDS.gemini directly instead of living here - that
// keeps the model id defined in exactly one place instead of two that could
// drift apart.
export const PROVIDER_ENDPOINTS: Record<Exclude<ModelKey, "gemini">, string> = {
  claude: "https://api.anthropic.com/v1/messages",
  openai: "https://api.openai.com/v1/chat/completions",
  grok: "https://api.x.ai/v1/chat/completions",
  llama: "https://api.groq.com/openai/v1/chat/completions",
};

export function geminiEndpoint(): string {
  return `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_IDS.gemini}:generateContent`;
}

const REQUIRED_ENV_KEYS: (keyof Env)[] = [

  "WHATSAPP_APP_SECRET",
  "WHATSAPP_ACCESS_TOKEN",
  "WHATSAPP_GRAPH_VERSION",
  "ANTHROPIC_API_KEY",
  "OPENAI_API_KEY",
  "XAI_API_KEY",
  "GEMINI_API_KEY",
  "GROQ_API_KEY",
  "WHISPER_WORKER_URL",
  "RATE_LIMIT_MAX_PER_HOUR",
];

/**
 * Fails closed and loud at request time if a required secret/var is missing,
 * rather than letting a misconfigured deploy limp along and fail confusingly
 * three calls deep into a provider adapter. KV bindings aren't checked here -
 * a missing binding is a wrangler.toml error that throws before fetch() runs.
 */
export function assertValidEnv(env: Env): void {
  const missing = REQUIRED_ENV_KEYS.filter((k) => !env[k]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment values: ${missing.join(", ")}`);
  }
}

export function rateLimitMax(env: Env): number {
  const n = parseInt(env.RATE_LIMIT_MAX_PER_HOUR, 10);
  return Number.isFinite(n) && n > 0 ? n : 20;
}

export function airtableLoggingEnabled(env: Env): boolean {
  return env.ENABLE_AIRTABLE_LOG === "true" && !!env.AIRTABLE_API_TOKEN && !!env.AIRTABLE_BASE_ID;
}

export function supabaseLoggingEnabled(env: Env): boolean {
  return env.ENABLE_SUPABASE_LOG === "true" && !!env.SUPABASE_URL && !!env.SUPABASE_SERVICE_ROLE_KEY;
}

export function d1LoggingEnabled(env: Env): boolean {
  return env.ENABLE_D1_LOG === "true";
}

export function graphBaseUrl(env: Env): string {
  return `https://graph.facebook.com/${env.WHATSAPP_GRAPH_VERSION}`;
}



