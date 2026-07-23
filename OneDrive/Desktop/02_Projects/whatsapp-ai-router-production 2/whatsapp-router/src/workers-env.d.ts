// Minimal ambient declarations for the Cloudflare Workers runtime globals
// this project touches. Kept intentionally small and hand-written rather
// than pulling in @cloudflare/workers-types, so the project has zero
// third-party type dependencies. If you add more Workers bindings (R2, D1,
// Durable Objects, etc.) either extend this file or install
// @cloudflare/workers-types and delete it - both work fine with wrangler.

interface KVNamespacePutOptions {
  expirationTtl?: number;
  expiration?: number;
  metadata?: unknown;
}

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: KVNamespacePutOptions): Promise<void>;
  delete(key: string): Promise<void>;
}

interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run<T = unknown>(): Promise<D1Result<T>>;
  all<T = unknown>(): Promise<D1Result<T>>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}
