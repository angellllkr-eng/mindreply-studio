import { Router } from 'express'
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

export const battlesRouter = Router()
const BATTLES_FILE = join(process.cwd(), 'data', 'battles.json')

async function load() {
  if (!existsSync(BATTLES_FILE)) return { battles: [], leaderboard: [] }
  try { return JSON.parse(await readFile(BATTLES_FILE, 'utf8')) } catch { return { battles: [], leaderboard: [] } }
}
async function save(d) { await writeFile(BATTLES_FILE, JSON.stringify(d, null, 2)) }

battlesRouter.get('/', async (_req, res) => {
  const d = await load()
  res.json(d)
})

battlesRouter.post('/', async (req, res) => {
  const { product, prompt, grok_reply, claude_reply, winner, notes } = req.body || {}
  if (!product || !winner) return res.status(400).json({ error: 'product + winner required' })
  const d = await load()
  const battle = {
    id: `btl_${Date.now()}`,
    product, prompt, grok_reply, claude_reply, winner,
    notes: notes || '',
    created_at: new Date().toISOString()
  }
  d.battles.unshift(battle)
  const lb = d.leaderboard
  for (const m of [winner, ...(winner === 'grok' ? ['claude'] : ['grok'])]) {
    const row = lb.find(r => r.model === m)
    if (row) {
      if (m === winner) { row.wins = (row.wins || 0) + 1; row.elo = (row.elo || 1500) + 12 }
      else { row.losses = (row.losses || 0) + 1; row.elo = (row.elo || 1500) - 12 }
    } else {
      lb.push({ model: m, wins: m === winner ? 1 : 0, losses: m === winner ? 0 : 1, elo: m === winner ? 1512 : 1488 })
    }
  }
  lb.sort((a, b) => (b.elo || 0) - (a.elo || 0))
  await save(d)
  res.json({ saved: true, battle, leaderboard: lb })
})

battlesRouter.get('/leaderboard', async (_req, res) => {
  const d = await load()
  res.json({ leaderboard: d.leaderboard })
})
