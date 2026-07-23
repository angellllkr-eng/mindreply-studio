// Structured JSON logging. Cloudflare Workers Logs / `wrangler tail` pick up
// console.* output as-is, so plain JSON lines are the whole "log pipeline" -
// no extra service needed for a workload this size.
//
// SECRET_KEYS is a deny-list scrubbed from any object before it's logged, so
// an accidental `logger.info("req", env)` can't leak a key into log output.
const SECRET_KEYS = [
  "authorization",
  "x-api-key",
  "x-goog-api-key",
  "apikey",
  "api_key",
  "access_token",
  "token"
];

function redact(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(redact);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = SECRET_KEYS.includes(k.toLowerCase()) ? "[redacted]" : redact(v);
    }
    return out;
  }
  return value;
}

function emit(level: string, msg: string, fields?: Record<string, unknown>) {
  console.log(
    JSON.stringify({
      level,
      msg,
      ts: new Date().toISOString(),
      ...(fields ? (redact(fields) as Record<string, unknown>) : {})
    })
  );
}

export const logger = {
  info: (msg: string, fields?: Record<string, unknown>) => emit("info", msg, fields),
  warn: (msg: string, fields?: Record<string, unknown>) => emit("warn", msg, fields),
  error: (msg: string, fields?: Record<string, unknown>) => emit("error", msg, fields)
};
