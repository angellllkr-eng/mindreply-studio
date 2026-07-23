import type { ParsedMessage, ProviderResult } from "./types.js";

// Fast, edge-colocated operational log - separate from Supabase's
// proof_receipts. This is for your own ops visibility (latency, per-model
// success rate) and is allowed to be cheap/high-volume; proof_receipts is
// the customer-facing verification record and stays intentionally minimal.
export async function logToD1(db: D1Database, msg: ParsedMessage, result: ProviderResult): Promise<void> {
  await db
    .prepare(
      `INSERT INTO provider_calls (wa_id, message_id, model_key, ok, latency_ms, is_voice)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .bind(msg.waId, msg.messageId, result.modelKey, result.ok ? 1 : 0, result.latencyMs, msg.isVoice ? 1 : 0)
    .run();
}
