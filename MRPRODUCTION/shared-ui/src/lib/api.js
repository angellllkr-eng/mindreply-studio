// Mind-Reply shared API client — talks to backend-core on localhost:3001
// Used by all frontends: Aether-X, Kratos-S, EchelonNexus-V2, Mind-Reply Hub

const BACKEND_URL = import.meta.env?.VITE_BACKEND_URL || 'http://localhost:3001'

async function req(path, opts = {}) {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
  return data
}

export const api = {
  health: () => req('/api/health'),
  agents: (product) => req(`/api/agents${product ? `/${product}` : ''}`),
  memory: {
    list: () => req('/api/memory'),
    get: (key) => req(`/api/memory/${encodeURIComponent(key)}`),
    set: (key, value, tags = []) => req('/api/memory', { method: 'POST', body: { key, value, tags } }),
    delete: (key) => req(`/api/memory/${encodeURIComponent(key)}`, { method: 'DELETE' }),
  },
  chat: (message, { effort = 'high', provider } = {}) =>
    req('/api/chat', { method: 'POST', body: { message, effort, provider } }),
  hn: () => req('/api/hn'),
  battles: () => req('/api/battles'),
  fleet: () => req('/api/fleet'),
  leaderboard: () => req('/api/leaderboard'),
  models: () => req('/api/models'),
}

export { BACKEND_URL }
export default api
