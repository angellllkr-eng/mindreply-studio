import { Router } from 'express'
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

export const memoryRouter = Router()
const MEM_FILE = join(process.cwd(), 'data', 'memory.json')

async function load() {
  if (!existsSync(MEM_FILE)) return { entries: [] }
  try { return JSON.parse(await readFile(MEM_FILE, 'utf8')) } catch { return { entries: [] } }
}
async function save(data) { await writeFile(MEM_FILE, JSON.stringify(data, null, 2)) }

memoryRouter.get('/', async (_req, res) => {
  const data = await load()
  res.json({ entries: data.entries, capacity: 1000, used: data.entries.length })
})

memoryRouter.post('/', async (req, res) => {
  const { key, value, tags = [] } = req.body || {}
  if (!key) return res.status(400).json({ error: 'key required' })
  const data = await load()
  const entry = {
    key, value, tags,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  const idx = data.entries.findIndex(e => e.key === key)
  if (idx >= 0) { entry.created_at = data.entries[idx].created_at; data.entries[idx] = entry }
  else data.entries.push(entry)
  await save(data)
  res.json({ stored: true, key, entry })
})

memoryRouter.get('/:key', async (req, res) => {
  const data = await load()
  const entry = data.entries.find(e => e.key === req.params.key)
  if (!entry) return res.status(404).json({ error: 'not found' })
  res.json({ entry })
})

memoryRouter.delete('/:key', async (req, res) => {
  const data = await load()
  data.entries = data.entries.filter(e => e.key !== req.params.key)
  await save(data)
  res.json({ deleted: true, key: req.params.key })
})
