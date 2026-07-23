import { describe, it, expect } from "./_shim.js";
import { handleVerification, verifySignature, parseWebhookBody, extractPhoneNumberId } from "../src/whatsapp.js";
import { VerifyTokenError, SignatureError } from "../src/errors.js";

describe("handleVerification", () => {
  it("returns the challenge when mode+token match", () => {
    const url = new URL(
      "https://x.test/webhook?hub.mode=subscribe&hub.verify_token=secret123&hub.challenge=abc999",
    );
    expect(handleVerification(url, "secret123")).toBe("abc999");
  });

  it("throws VerifyTokenError on token mismatch", () => {
    const url = new URL(
      "https://x.test/webhook?hub.mode=subscribe&hub.verify_token=wrong&hub.challenge=abc999",
    );
    expect(() => handleVerification(url, "secret123")).toThrow(VerifyTokenError);
  });

  it("throws VerifyTokenError when hub.mode is missing", () => {
    const url = new URL("https://x.test/webhook?hub.verify_token=secret123&hub.challenge=abc999");
    expect(() => handleVerification(url, "secret123")).toThrow(VerifyTokenError);
  });
});

describe("verifySignature", () => {
  const secret = "test-app-secret";
  const body = JSON.stringify({ hello: "world" });

  async function computeSig(s: string, b: string): Promise<string> {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", enc.encode(s), { name: "HMAC", hash: "SHA-256" }, false, [
      "sign",
    ]);
    const buf = await crypto.subtle.sign("HMAC", key, enc.encode(b));
    const hex = Array.from(new Uint8Array(buf))
      .map((b2) => b2.toString(16).padStart(2, "0"))
      .join("");
    return `sha256=${hex}`;
  }

  it("accepts a correctly signed body", async () => {
    const sig = await computeSig(secret, body);
    await expect(verifySignature(secret, body, sig)).resolves.toBeUndefined();
  });

  it("rejects a body signed with the wrong secret", async () => {
    const sig = await computeSig("wrong-secret", body);
    await expect(verifySignature(secret, body, sig)).rejects.toThrow(SignatureError);
  });

  it("rejects a tampered body", async () => {
    const sig = await computeSig(secret, body);
    await expect(verifySignature(secret, body + "tampered", sig)).rejects.toThrow(SignatureError);
  });

  it("rejects a missing header", async () => {
    await expect(verifySignature(secret, body, null)).rejects.toThrow(SignatureError);
  });

  it("rejects a malformed header", async () => {
    await expect(verifySignature(secret, body, "not-sha256-prefixed")).rejects.toThrow(SignatureError);
  });
});

describe("parseWebhookBody", () => {
  function envelope(messages: unknown[]) {
    return {
      entry: [
        {
          changes: [
            { value: { metadata: { phone_number_id: "PNID123" }, messages } },
          ],
        },
      ],
    };
  }

  it("parses a text message", () => {
    const body = envelope([{ from: "44777...", id: "wamid.1", type: "text", text: { body: "hi there" } }]);
    const parsed = parseWebhookBody(body);
    expect(parsed).toEqual({
      waId: "44777...",
      messageId: "wamid.1",
      type: "text",
      text: "hi there",
      mediaId: null,
      isVoice: false,
    });
  });

  it("parses an audio message", () => {
    const body = envelope([{ from: "44777...", id: "wamid.2", type: "audio", audio: { id: "media-1" } }]);
    const parsed = parseWebhookBody(body);
    expect(parsed?.type).toBe("audio");
    expect(parsed?.mediaId).toBe("media-1");
    expect(parsed?.isVoice).toBe(true);
  });

  it("parses an interactive button reply", () => {
    const body = envelope([
      { from: "44777...", id: "wamid.3", type: "interactive", interactive: { button_reply: { id: "retry_claude", title: "Retry" } } },
    ]);
    const parsed = parseWebhookBody(body);
    expect(parsed?.type).toBe("interactive");
    expect(parsed?.text).toBe("Retry");
  });

  it("returns null for a status-only callback (no messages array)", () => {
    const body = { entry: [{ changes: [{ value: { statuses: [{ status: "delivered" }] } }] }] };
    expect(parseWebhookBody(body)).toBeNull();
  });

  it("returns type unsupported for an unknown message type", () => {
    const body = envelope([{ from: "44777...", id: "wamid.4", type: "sticker" }]);
    const parsed = parseWebhookBody(body);
    expect(parsed?.type).toBe("unsupported");
  });

  it("extracts the phone_number_id from metadata", () => {
    const body = envelope([{ from: "44777...", id: "wamid.5", type: "text", text: { body: "x" } }]);
    expect(extractPhoneNumberId(body)).toBe("PNID123");
  });
});
