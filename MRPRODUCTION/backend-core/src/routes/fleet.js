import { Router } from 'express'
export const fleetRouter = Router()

const FLEET = [
  { id: 'mind-reply', name: 'Mind-Reply', url: 'https://mind-reply.com', fallback: 'https://mindreply-bice.vercel.app', status: 'live' },
  { id: 'aurel', name: 'AUREL', url: 'https://aurel.mind-reply.com', fallback: 'https://aurel-one.vercel.app', status: 'live' },
  { id: 'a11k', name: 'A11-K', url: 'https://a11k.mind-reply.com', fallback: null, status: 'pending_dns' },
  { id: 'sdr', name: 'SDR Agent', url: 'https://sdr.mind-reply.com', fallback: 'https://sdr-agent-flax.vercel.app', status: 'fallback_only' },
  { id: 'regex', name: 'Regex Forge', url: 'https://regex.mind-reply.com', fallback: 'https://regex-forge.vercel.app', status: 'fallback_only' },
  { id: 'sql', name: 'SQL Studio', url: 'https://sql.mind-reply.com', fallback: 'https://sql-studio-weld.vercel.app', status: 'fallback_only' },
  { id: 'tutor', name: 'Code Tutor', url: 'https://tutor.mind-reply.com', fallback: 'https://code-tutor-flame.vercel.app', status: 'fallback_only' },
  { id: 'lens', name: 'Code Lens', url: 'https://lens.mind-reply.com', fallback: 'https://code-lens-henna.vercel.app', status: 'fallback_only' },
  { id: 'l402', name: 'L402 Skills', url: 'https://l402.mind-reply.com', fallback: 'https://l402-skills.vercel.app', status: 'fallback_only' }
]

fleetRouter.get('/', async (_req, res) => {
  const checks = await Promise.all(FLEET.map(async (s) => {
    const target = s.url
    try {
      const r = await fetch(target, { method: 'HEAD', signal: AbortSignal.timeout(5000) })
      return { ...s, http: r.status, ok: r.ok }
    } catch (e) {
      return { ...s, http: 0, ok: false, error: e.message }
    }
  }))
  res.json({ fleet: checks, checked_at: new Date().toISOString() })
})

fleetRouter.get('/static', (_req, res) => res.json({ fleet: FLEET }))
