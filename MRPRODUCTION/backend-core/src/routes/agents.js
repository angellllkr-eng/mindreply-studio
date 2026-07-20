import { Router } from 'express'
export const agentsRouter = Router()

const AGENTS = [
  { id: 'grok-4.5', name: 'Grok 4.5', vendor: 'xAI', role: 'primary', elo: 2847, status: 'active', products: ['Mind-Reply', 'AUREL', 'Echelon Nexus'] },
  { id: 'claude-opus-4.8', name: 'Claude Opus 4.8', vendor: 'Anthropic', role: 'challenger', elo: 2812, status: 'active', products: ['Mind-Reply', 'AUREL'] },
  { id: 'gpt-5.5', name: 'GPT-5.5', vendor: 'OpenAI', role: 'fallback', elo: 2798, status: 'standby', products: ['Mind-Reply'] },
  { id: 'gemini-3.1-pro', name: 'Gemini 3.1 Pro', vendor: 'Google', role: 'fallback', elo: 2745, status: 'standby', products: [] },
  { id: 'deepseek-v3', name: 'DeepSeek V3', vendor: 'DeepSeek', role: 'fallback', elo: 1690, status: 'standby', products: [] }
]

agentsRouter.get('/', (_req, res) => res.json({ agents: AGENTS }))
agentsRouter.get('/:product', (req, res) => {
  const list = AGENTS.filter(a => a.products.map(p => p.toLowerCase()).includes(req.params.product.toLowerCase()))
  res.json({ product: req.params.product, agents: list })
})
