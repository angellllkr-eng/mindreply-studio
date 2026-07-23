export class ProviderError extends Error {
  constructor(
    public modelKey: string,
    message: string,
    public override cause?: unknown,
  ) {
    super(`[${modelKey}] ${message}`);
    this.name = "ProviderError";
  }
}

export class WhatsAppApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public body?: unknown,
  ) {
    super(message);
    this.name = "WhatsAppApiError";
  }
}

export class SignatureError extends Error {
  constructor(message = "Invalid webhook signature") {
    super(message);
    this.name = "SignatureError";
  }
}

export class VerifyTokenError extends Error {
  constructor(message = "Webhook verification handshake failed") {
    super(message);
    this.name = "VerifyTokenError";
  }
}

export class RateLimitExceededError extends Error {
  constructor(public waId: string) {
    super(`Rate limit exceeded for ${waId}`);
    this.name = "RateLimitExceededError";
  }
}

// Fetch with a hard timeout + a single retry on network error or 5xx.
// 4xx (bad request, bad auth) is not retried - retrying won't fix it and
// just burns another call against your quota.
//
// Takes the narrower FetchFn (string-only input) rather than typeof fetch,
// so both the real global fetch and the string-only test mocks satisfy it.
import type { FetchFn } from "./types.js";

export async function fetchWithRetry(
  fetchFn: FetchFn,
  input: string,
  init: RequestInit,
  opts: { timeoutMs?: number; retries?: number } = {},
): Promise<Response> {
  const timeoutMs = opts.timeoutMs ?? 15_000;
  const retries = opts.retries ?? 1;

  let lastErr: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetchFn(input, { ...init, signal: controller.signal });
      clearTimeout(timer);
      if (res.status >= 500 && attempt < retries) {
        lastErr = new Error(`Upstream ${res.status}`);
        continue;
      }
      return res;
    } catch (err) {
      clearTimeout(timer);
      lastErr = err;
      if (attempt >= retries) break;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}
