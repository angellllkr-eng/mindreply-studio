import { describe, it, expect, vi } from "./_shim.js";
import { routeAndCall, formatReply } from "../src/router.js";

const apiKeys = { claude: "k1", openai: "k2", grok: "k3", gemini: "k4", groq: "k5" };

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status });
}

describe("routeAndCall", () => {
  it("calls only the targeted provider for a prefixed message", async () => {
    const fetchFn = vi.fn().mockResolvedValue(jsonResponse({ content: [{ text: "ok" }] }));
    const { results } = await routeAndCall("/claude hi", false, fetchFn as any, apiKeys);
    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(results).toHaveLength(1);
    expect(results[0]?.modelKey).toBe("claude");
  });

  it("fans out to all 5 providers for unprefixed text and isolates one failure", async () => {
    const fetchFn = vi.fn().mockImplementation((url: string) => {
      if (url.includes("x.ai")) {
        return Promise.resolve(new Response("boom", { status: 500 }));
      }
      if (url.includes("anthropic")) return Promise.resolve(jsonResponse({ content: [{ text: "c" }] }));
      if (url.includes("openai")) return Promise.resolve(jsonResponse({ choices: [{ message: { content: "o" } }] }));
      if (url.includes("generativelanguage")) {
        return Promise.resolve(jsonResponse({ candidates: [{ content: { parts: [{ text: "g" }] } }] }));
      }
      if (url.includes("groq")) return Promise.resolve(jsonResponse({ choices: [{ message: { content: "l" } }] }));
      return Promise.resolve(new Response("unexpected url", { status: 404 }));
    });

    const { results } = await routeAndCall("hello everyone", false, fetchFn as any, apiKeys);
    expect(results).toHaveLength(5);

    const grok = results.find((r) => r.modelKey === "grok");
    const claude = results.find((r) => r.modelKey === "claude");
    expect(grok?.ok).toBe(false);
    expect(claude?.ok).toBe(true);
    // the other 4 succeeding is the whole point of Promise.allSettled here
    expect(results.filter((r) => r.ok)).toHaveLength(4);
  });

  it("survives every single provider rejecting outright (network errors), never throws", async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error("network down"));
    const { results } = await routeAndCall("hello", false, fetchFn as any, apiKeys);
    expect(results).toHaveLength(5);
    expect(results.every((r) => r.ok === false)).toBe(true);
  });

  it("defaults voice messages to a single primary model", async () => {
    const fetchFn = vi.fn().mockResolvedValue(jsonResponse({ choices: [{ message: { content: "o" } }] }));
    const { results, primaryModel } = await routeAndCall("what's up", true, fetchFn as any, apiKeys);
    expect(results).toHaveLength(1);
    expect(primaryModel).toBe("openai");
  });
});

describe("formatReply", () => {
  it("keeps formatting plain - label + raw reply, no extra styling", () => {
    const text = formatReply({ modelKey: "claude", label: "Claude", ok: true, replyText: "Paris.", latencyMs: 10 });
    expect(text).toBe("[Claude] Paris.");
  });
});
