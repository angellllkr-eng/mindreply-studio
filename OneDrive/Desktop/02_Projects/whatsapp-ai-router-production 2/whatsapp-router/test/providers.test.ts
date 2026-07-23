import { describe, it, expect, vi } from "./_shim.js";
import { routeByPrefix, claudeAdapter, openaiAdapter, geminiAdapter } from "../src/providers.js";

describe("routeByPrefix", () => {
  it("defaults to all 5 models for plain text", () => {
    const { targets, cleanText } = routeByPrefix("what's the weather like", false);
    expect(targets).toEqual(["claude", "openai", "grok", "gemini", "llama"]);
    expect(cleanText).toBe("what's the weather like");
  });

  it("routes /claude to claude only and strips the prefix", () => {
    const { targets, cleanText } = routeByPrefix("/claude explain recursion", false);
    expect(targets).toEqual(["claude"]);
    expect(cleanText).toBe("explain recursion");
  });

  it("routes /gpt and /openai to the same model", () => {
    expect(routeByPrefix("/gpt hi", false).targets).toEqual(["openai"]);
    expect(routeByPrefix("/openai hi", false).targets).toEqual(["openai"]);
  });

  it("is case-insensitive on the prefix", () => {
    expect(routeByPrefix("/CLAUDE hi", false).targets).toEqual(["claude"]);
  });

  it("/all explicitly fans out and strips itself", () => {
    const { targets, cleanText } = routeByPrefix("/all summarize this", false);
    expect(targets).toEqual(["claude", "openai", "grok", "gemini", "llama"]);
    expect(cleanText).toBe("summarize this");
  });

  it("forces a single model (openai) when the source was voice, even with no prefix", () => {
    const { targets, primaryModel } = routeByPrefix("what time is it", true);
    expect(targets).toEqual(["openai"]);
    expect(primaryModel).toBe("openai");
  });

  it("respects an explicit prefix even on voice-derived text", () => {
    const { targets } = routeByPrefix("/grok what time is it", true);
    expect(targets).toEqual(["grok"]);
  });
});

describe("provider adapters", () => {
  it("claudeAdapter parses a successful response", async () => {
    const fetchFn = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ content: [{ text: "hello from claude" }] }), { status: 200 }),
    );
    const result = await claudeAdapter.call(fetchFn as any, "sk-test", "hi");
    expect(result.ok).toBe(true);
    expect(result.replyText).toBe("hello from claude");
    expect(result.modelKey).toBe("claude");
  });

  it("claudeAdapter marks ok:false on a non-2xx response instead of throwing", async () => {
    const fetchFn = vi.fn().mockResolvedValue(new Response("server error", { status: 500 }));
    const result = await claudeAdapter.call(fetchFn as any, "sk-test", "hi");
    expect(result.ok).toBe(false);
    expect(result.replyText).toMatch(/unavailable/i);
  });

  it("openaiAdapter parses the chat completions shape", async () => {
    const fetchFn = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ choices: [{ message: { content: "hello from gpt" } }] }), { status: 200 }),
    );
    const result = await openaiAdapter.call(fetchFn as any, "sk-test", "hi");
    expect(result.replyText).toBe("hello from gpt");
  });

  it("geminiAdapter parses the generateContent shape", async () => {
    const fetchFn = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({ candidates: [{ content: { parts: [{ text: "hello from gemini" }] } }] }),
        { status: 200 },
      ),
    );
    const result = await geminiAdapter.call(fetchFn as any, "key-test", "hi");
    expect(result.replyText).toBe("hello from gemini");
  });

  it("never throws even when the response body is not valid JSON", async () => {
    const fetchFn = vi.fn().mockResolvedValue(new Response("not json", { status: 200 }));
    const result = await claudeAdapter.call(fetchFn as any, "sk-test", "hi");
    expect(result.ok).toBe(false);
  });
});
