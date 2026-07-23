// Shared types for the whole worker. Kept dependency-free so they can be
// imported from both runtime code and tests without pulling in Workers types.

export type ModelKey = "claude" | "openai" | "grok" | "gemini" | "llama";

export interface ParsedMessage {
  waId: string;
  messageId: string;
  type: "text" | "audio" | "interactive" | "unsupported";
  text: string;
  mediaId: string | null;
  isVoice: boolean;
}

export interface RoutedRequest {
  cleanText: string;
  target: ModelKey | "all";
  primaryModel: ModelKey;
}

export interface ProviderResult {
  modelKey: ModelKey;
  label: string;
  ok: boolean;
  replyText: string;
  latencyMs: number;
  errorDetail?: string;
}

// Minimal fetch-shaped interface so provider adapters and senders can be
// unit tested with a mock instead of the real network.
export type FetchFn = (input: string, init?: RequestInit) => Promise<Response>;

export interface Env {
  WHATSAPP_VERIFY_TOKEN: string;
  WHATSAPP_APP_SECRET: string;
  WHATSAPP_ACCESS_TOKEN: string;
  WHATSAPP_GRAPH_VERSION: string;

  ANTHROPIC_API_KEY: string;
  OPENAI_API_KEY: string;
  XAI_API_KEY: string;
  GEMINI_API_KEY: string;
  GROQ_API_KEY: string;

  AIRTABLE_API_TOKEN?: string;
  AIRTABLE_BASE_ID?: string;
  AIRTABLE_TABLE_NAME?: string;
  ENABLE_AIRTABLE_LOG: string;

  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  ENABLE_SUPABASE_LOG: string;

  ENABLE_D1_LOG: string;
  OPS_DB: D1Database;

  WHISPER_WORKER_URL: string;
  RATE_LIMIT_MAX_PER_HOUR: string;
  RATE_LIMIT_KV: KVNamespace;
  DEDUP_KV: KVNamespace;
}


