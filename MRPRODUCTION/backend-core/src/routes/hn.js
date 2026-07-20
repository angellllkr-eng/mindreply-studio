import { Router } from 'express'
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

export const hnRouter = Router()
const HN_FILE = join(process.cwd(), 'data', 'hn.json')

async function loadCache() {
  if (!existsSync(HN_FILE)) return { stories: [], updated_at: null }
  try { return JSON.parse(await readFile(HN_FILE, 'utf8')) } catch { return { stories: [], updated_at: null } }
}

hnRouter.get('/', async (_req, res) => {
  const cache = await loadCache()
  const stories = (cache.stories || []).map((s, i) => ({ ...s, rank: i + 1 }))
  res.json({ stories, fetchedAt: cache.updated_at, updated_at: cache.updated_at })
})

hnRouter.get('/top/:n', async (req, res) => {
  const n = Math.min(parseInt(req.params.n, 10) || 5, 30)
  const cache = await loadCache()
  const stories = cache.stories.slice(0, n).map((s, i) => ({ ...s, rank: i + 1 }))
  res.json({ stories, fetchedAt: cache.updated_at, updated_at: cache.updated_at })
})

hnRouter.get('/refresh', async (_req, res) => {
  try {
    const r = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    if (!r.ok) throw new Error(`HN API ${r.status}`)
    const ids = (await r.json()).slice(0, 15)
    const stories = []
    for (const id of ids) {
      const sr = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      if (!sr.ok) continue
      const s = await sr.json()
      if (!s) continue
      stories.push({
        id: s.id, title: s.title, url: s.url || `https://news.ycombinator.com/item?id=${s.id}`,
        points: s.score, comments: s.descendants || 0, by: s.by,
        time: s.time, tag: 'hn'
      })
    }
    const data = { stories, updated_at: new Date().toISOString() }
    await writeFile(HN_FILE, JSON.stringify(data, null, 2))
    res.json({ refreshed: true, count: stories.length, updated_at: data.updated_at })
  } catch (e) {
    res.status(502).json({ error: e.message })
  }
})
