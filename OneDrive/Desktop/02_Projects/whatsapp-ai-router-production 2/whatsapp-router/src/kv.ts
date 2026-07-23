// Thin abstraction over KVNamespace so rate limiter / dedup logic can be
// unit tested with a plain in-memory Map instead of Miniflare's KV emulator.
export interface KvLike {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
}

export function fromKVNamespace(ns: KVNamespace): KvLike {
  return {
    get: (key) => ns.get(key),
    put: (key, value, opts) => ns.put(key, value, opts)
  };
}

export function inMemoryKv(): KvLike {
  const store = new Map<string, { value: string; expiresAt: number | null }>();
  return {
    async get(key) {
      const entry = store.get(key);
      if (!entry) return null;
      if (entry.expiresAt && entry.expiresAt < Date.now()) {
        store.delete(key);
        return null;
      }
      return entry.value;
    },
    async put(key, value, opts) {
      store.set(key, {
        value,
        expiresAt: opts?.expirationTtl ? Date.now() + opts.expirationTtl * 1000 : null
      });
    }
  };
}
