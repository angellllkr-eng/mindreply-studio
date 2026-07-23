import { describe, it, expect, vi } from "./_shim.js";
import { logToSupabase } from "../src/supabaseLog.js";
import { logToD1 } from "../src/d1Log.js";
import type { ParsedMessage, ProviderResult } from "../src/types.js";

const msg: ParsedMessage = {
  waId: "447700900000",
  messageId: "wamid.1",
  type: "text",
  text: "hi",
  mediaId: null,
  isVoice: false,
};

const result: ProviderResult = {
  modelKey: "claude",
  label: "Claude",
  ok: true,
  replyText: "hello there",
  latencyMs: 120,
};

describe("logToSupabase", () => {
  it("POSTs a redacted-safe row to proof_receipts with the service role key", async () => {
    let capturedUrl = "";
    let capturedInit: RequestInit | undefined;
    const fetchFn = vi.fn().mockImplementation(async (url: string, init?: RequestInit) => {
      capturedUrl = url;
      capturedInit = init;
      return new Response(null, { status: 201 });
    });

    await logToSupabase(fetchFn as unknown as typeof fetch, "https://x.supabase.co", "service-role-key", msg, result);

    expect(capturedUrl).toBe("https://x.supabase.co/rest/v1/proof_receipts");
    const headers = capturedInit?.headers as Record<string, string>;
    expect(headers.apikey).toBe("service-role-key");
    const body = JSON.parse(capturedInit?.body as string);
    expect(body.raw_content_redacted).toBe(true);
    expect(body.route).toBe("whatsapp:447700900000");
  });

  it("throws on a non-2xx response so the caller can log+swallow it", async () => {
    const fetchFn = vi.fn().mockImplementation(async () => new Response("nope", { status: 401 }));
    let threw = false;
    try {
      await logToSupabase(fetchFn as unknown as typeof fetch, "https://x.supabase.co", "bad-key", msg, result);
    } catch {
      threw = true;
    }
    expect(threw).toBe(true);
  });
});

describe("logToD1", () => {
  it("binds the expected params in the expected order", async () => {
    const bound: unknown[] = [];
    const fakeDb = {
      prepare: (_query: string) => ({
        bind: (...values: unknown[]) => {
          bound.push(...values);
          return { run: async () => ({ results: [], success: true }) };
        },
      }),
    };

    await logToD1(fakeDb as any, msg, result);

    expect(bound[0]).toBe("447700900000");
    expect(bound[1]).toBe("wamid.1");
    expect(bound[2]).toBe("claude");
    expect(bound[3]).toBe(1);
    expect(bound[4]).toBe(120);
    expect(bound[5]).toBe(0);
  });
});
