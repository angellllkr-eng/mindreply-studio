import type { KvLike } from "./kv.js";

const DEDUP_TTL_SECONDS = 60 * 60 * 24; // 24h - comfortably longer than Meta's retry window for a single event

// Meta retries webhook delivery on anything other than a fast 200, and can
// also occasionally redeliver. Without this, a retry means re-calling all
// 5 model APIs and sending duplicate WhatsApp replies for one inbound message.
export async function isDuplicate(kv: KvLike, messageId: string): Promise<boolean> {
  const key = `dedup:${messageId}`;
  const seen = await kv.get(key);
  if (seen) return true;
  await kv.put(key, "1", { expirationTtl: DEDUP_TTL_SECONDS });
  return false;
}
