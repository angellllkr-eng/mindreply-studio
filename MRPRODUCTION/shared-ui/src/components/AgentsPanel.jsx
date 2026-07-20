// Shared AgentsPanel — model hierarchy competing for products
import { useEffect, useState } from 'react'
import api from '../lib/api.js'

export function AgentsPanel({ product }) {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const r = product ? await api.agents(product) : await api.agents()
        setAgents(r.agents || [])
      } catch (e) {
        setAgents([])
      } finally {
        setLoading(false)
      }
    })()
  }, [product])

  return (
    <div className="glass" style={{ padding: 18 }}>
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Agent Hierarchy</div>
      <div style={{ fontSize: 11, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', marginBottom: 14 }}>
        {product ? `${product} · ` : ''}ELO-ranked · {agents.length} models
      </div>
      <div className="col" style={{ gap: 8 }}>
        {loading && <div style={{ color: 'var(--ink-mute)', fontSize: 12 }}>loading…</div>}
        {!loading && agents.length === 0 && (
          <div style={{ color: 'var(--ink-mute)', fontSize: 12 }}>Backend unreachable.</div>
        )}
        {agents
          .slice()
          .sort((a, b) => b.elo - a.elo)
          .map(a => (
            <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderRadius: 'var(--r-sm)', background: 'var(--navy-1)', border: '1px solid var(--glass-brd)' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{a.name}</div>
                <div style={{ fontSize: 10, color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}>
                  {a.vendor} · {a.role}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--coral-soft)' }}>{a.elo}</span>
                <span className="pill" style={{ padding: '2px 8px', fontSize: 10 }}>
                  <span className={`dot ${a.status === 'active' ? 'ok' : 'warn'}`}></span>
                  {a.status}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default AgentsPanel
