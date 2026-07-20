// MindReply API client — one file, used by every frontend.
// Auto-detects backend URL: env var > same-origin > localhost:3001
const API_BASE =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) ||
  (typeof window !== 'undefined' && window.location.origin && window.location.hostname !== 'localhost'
    ? `${window.location.origin}/api`
    : 'http://localhost:3001/api');

async function req(path, opts = {}) {
  const r = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined
  });
  if (!r.ok) throw new Error(`${r.status} ${await r.text().catch(() => '')}`);
  return r.json();
}

export const api = {
  base: API_BASE,
  health:  () => req('/health'),
  agents:  () => req('/agents'),
  models:  () => req('/models'),
  hn:     () => req('/hn'),
  leaderboard: () => req('/leaderboard'),
  memory: {
    list:   () => req('/memory'),
    save:   (key, value) => req('/memory', { method: 'POST', body: { key, value } }),
    remove: (key) => req(`/memory/${encodeURIComponent(key)}`, { method: 'DELETE' })
  },
  chat: ({ message, provider = 'grok', model, effort = 'high', context }) =>
    req('/chat', { method: 'POST', body: { message, provider, model, effort, context } })
};
