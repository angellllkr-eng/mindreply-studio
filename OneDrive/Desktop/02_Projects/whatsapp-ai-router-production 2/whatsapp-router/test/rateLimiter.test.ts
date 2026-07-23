import { describe, it, expect } from "./_shim.js";
import { checkAndIncrementRateLimit } from "../src/rateLimiter.js";
import { isDuplicate } from "../src/dedup.js";
import { inMemoryKv } from "../src/kv.js";

describe("checkAndIncrementRateLimit", () => {
  it("allows requests under the limit", async () => {
    const kv = inMemoryKv();
    for (let i = 0; i < 5; i++) {
      const { limited } = await checkAndIncrementRateLimit(kv, "user1", 5);
      expect(limited).toBe(false);
    }
  });

  it("blocks the request that exceeds the limit", async () => {
    const kv = inMemoryKv();
    for (let i = 0; i < 3; i++) {
      await checkAndIncrementRateLimit(kv, "user1", 3);
    }
    const { limited, count } = await checkAndIncrementRateLimit(kv, "user1", 3);
    expect(limited).toBe(true);
    expect(count).toBe(3);
  });

  it("tracks separate senders independently", async () => {
    const kv = inMemoryKv();
    for (let i = 0; i < 3; i++) await checkAndIncrementRateLimit(kv, "userA", 3);
    const resultB = await checkAndIncrementRateLimit(kv, "userB", 3);
    expect(resultB.limited).toBe(false);
  });
});

describe("isDuplicate", () => {
  it("returns false the first time a message id is seen, true after", async () => {
    const kv = inMemoryKv();
    expect(await isDuplicate(kv, "wamid.abc")).toBe(false);
    expect(await isDuplicate(kv, "wamid.abc")).toBe(true);
  });

  it("treats different message ids independently", async () => {
    const kv = inMemoryKv();
    expect(await isDuplicate(kv, "wamid.1")).toBe(false);
    expect(await isDuplicate(kv, "wamid.2")).toBe(false);
  });
});
