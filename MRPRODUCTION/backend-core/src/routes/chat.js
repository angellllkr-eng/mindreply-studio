import { Router } from 'express'
export const chatRouter = Router()

const PROVIDERS = [
  { id: 'grok', url: 'https://cli-chat-proxy.grok.com/v1/responses', auth: () => process.env.GROK_TOKEN, model: 'grok-4.5', build: (text, effort) => ({ model: 'grok-4.5', input: text, reasoning: { effort }, stream: false }) },
  { id: 'openrouter', url: 'https://openrouter.ai/api/v1/chat/completions', auth: () => process.env.OPENROUTER_API_KEY, model: 'anthropic/claude-opus-4.8', build: (text) => ({ model: 'anthropic/claude-opus-4.8', messages: [{ role: 'user', content: text }], stream: false }) },
  { id: 'xai', url: 'https://api.x.ai/v1/chat/completions', auth: () => process.env.XAI_API_KEY, model: 'grok-4.5', build: (text) => ({ model: 'grok-4.5', messages: [{ role: 'user', content: text }], stream: false }) }
]

async function callProvider(p, text, effort) {
  const token = p.auth()
  if (!token) return { ok: false, status: 401, error: `no token for ${p.id}` }
  const res = await fetch(p.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(p.id === 'openrouter' ? { 'HTTP-Referer': 'https://mrproduction.local', 'X-Title': 'MRPRODUCTION' } : {}),
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(p.build(text, effort))
  })
  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    return { ok: false, status: res.status, error: errText.slice(0, 300) }
  }
  const data = await res.json()
  const output = data?.output?.[0]?.content?.[0]?.text
    || data?.output_text
    || data?.choices?.[0]?.message?.content
    || JSON.stringify(data).slice(0, 500)
  return { ok: true, provider: p.id, model: p.model, reply: output }
}

chatRouter.post('/', async (req, res) => {
  const { message, effort = 'high', provider: preferred } = req.body || {}
  if (!message) return res.status(400).json({ error: 'message required' })

  const order = preferred
    ? [...PROVIDERS.filter(p => p.id === preferred), ...PROVIDERS.filter(p => p.id !== preferred)]
    : PROVIDERS

  const trail = []
  for (const p of order) {
    try {
      const r = await callProvider(p, message, effort)
      trail.push({ provider: p.id, ok: r.ok, status: r.status })
      if (r.ok) return res.json({ reply: r.reply, provider: r.provider, model: r.model, trail })
    } catch (e) {
      trail.push({ provider: p.id, ok: false, error: e.message })
    }
  }
  res.status(502).json({ error: 'all providers failed', trail })
})
