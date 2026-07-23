import type { KvLike } from "./kv.js";

const WINDOW_SECONDS = 60 * 60; // 1 hour fixed window

export interface RateLimitResult {
  limited: boolean;
  count: number;
  max: number;
}

// Fixed-window counter in KV. Not perfectly precise at window boundaries
// (a burst could land ~2x max right at the edge) but that's an acceptable
// tradeoff for a personal-scale bot in exchange for O(1) reads/writes -
// a sliding-window log would need to store every timestamp per user.
export async function checkAndIncrementRateLimit(
  kv: KvLike,
  waId: string,
  max: number
): Promise<RateLimitResult> {
  const windowStart = Math.floor(Date.now() / 1000 / WINDOW_SECONDS);
  const key = `ratelimit:${waId}:${windowStart}`;

  const current = await kv.get(key);
  const count = current ? parseInt(current, 10) : 0;

  if (count >= max) {
    return { limited: true, count, max };
  }

  await kv.put(key, String(count + 1), { expirationTtl: WINDOW_SECONDS });
  return { limited: false, count: count + 1, max };
}
