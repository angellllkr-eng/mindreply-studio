import { useState, useEffect } from 'react'
import { ChatPanel, FleetPanel, MemoryRail, AgentsPanel, api } from '@shared/index.js'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const TABS = [
  { id: 'chat', label: 'Chat' },
  { id: 'agents', label: 'Agents' },
  { id: 'fleet', label: 'Fleet' },
  { id: 'memory', label: 'Memory' },
  { id: 'hn', label: 'HN Feed' }
]

export default function App() {
  const [tab, setTab] = useState('chat')
  const [health, setHealth] = useState(null)
  const [hn, setHn] = useState([])

  useEffect(() => {
    api.health().then(setHealth).catch(() => setHealth(null))
    api.hn().then(r => setHn(r.stories || [])).catch(() => setHn([]))
    const t = setInterval(() => api.health().then(setHealth).catch(() => {}), 15000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 28px', borderBottom: '1px solid var(--glass-brd)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--coral), var(--coral-soft))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--navy-0)', fontSize: 14 }}>EN</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>Echelon Nexus <span style={{ color: 'var(--coral-soft)', fontSize: 12, fontFamily: 'var(--mono)' }}>V2</span></div>
            <div style={{ fontSize: 11, color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}>Agentic Control Plane · Mind-Reply</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="pill">
            <span className={`dot ${health ? 'ok' : 'err'}`}></span>
            {health ? `backend ${health.version}` : 'backend offline'}
          </span>
        </div>
      </header>

      <nav style={{ display: 'flex', gap: 4, padding: '0 28px', borderBottom: '1px solid var(--glass-brd)' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              padding: '12px 18px', background: 'none', border: 'none', borderBottom: tab === t.id ? '2px solid var(--coral)' : '2px solid transparent',
              color: tab === t.id ? 'var(--ink)' : 'var(--ink-mute)', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500
            }}>
            {t.label}
          </button>
        ))}
      </nav>

      <main style={{ flex: 1, padding: 24, maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        {tab === 'chat' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, height: 'calc(100vh - 180px)' }}>
            <ChatPanel product="Echelon Nexus V2" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
              <MemoryRail />
            </div>
          </div>
        )}
        {tab === 'agents' && (
          <div className="grid grid-2">
            <AgentsPanel product="Mind-Reply" />
            <AgentsPanel product="AUREL" />
            <AgentsPanel product="Echelon Nexus" />
            <AgentsPanel />
          </div>
        )}
        {tab === 'fleet' && <FleetPanel />}
        {tab === 'memory' && (
          <div style={{ height: 'calc(100vh - 180px)' }}>
            <MemoryRail />
          </div>
        )}
        {tab === 'hn' && (
          <div className="glass" style={{ padding: 18 }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Hacker News — Best</div>
            <div className="col" style={{ gap: 10 }}>
              {hn.length === 0 && <div style={{ color: 'var(--ink-mute)', fontSize: 12 }}>No stories loaded.</div>}
              {hn.map(s => (
                <a key={s.id || s.rank} href={s.url} target="_blank" rel="noreferrer"
                   style={{ padding: 12, borderRadius: 'var(--r-sm)', background: 'var(--navy-1)', border: '1px solid var(--glass-brd)', textDecoration: 'none', color: 'var(--ink)' }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{s.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}>
                    {s.points} pts · {s.comments} comments
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer style={{ padding: '14px 28px', borderTop: '1px solid var(--glass-brd)', fontSize: 11, color: 'var(--ink-dim)', fontFamily: 'var(--mono)' }}>
        Echelon Nexus V2 · backend-core :3001 · owner angellllkr-eng
      </footer>
    </div>
  )
}
