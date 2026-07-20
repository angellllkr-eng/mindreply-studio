// Shared FleetPanel — live status of all 9 Mind-Reply subdomains
import { useEffect, useState } from 'react'
import api from '../lib/api.js'

export function FleetPanel() {
  const [fleet, setFleet] = useState([])
  const [loading, setLoading] = useState(true)
  const [checked, setChecked] = useState('')

  const refresh = async () => {
    setLoading(true)
    try {
      const r = await api.fleet()
      setFleet(r.fleet || [])
      setChecked(r.checked_at || new Date().toISOString())
    } catch (e) {
      setFleet([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh(); const t = setInterval(refresh, 30000); return () => clearInterval(t) }, [])

  return (
    <div className="glass" style={{ padding: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Fleet Status</div>
          <div style={{ fontSize: 11, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', marginTop: 2 }}>
            {checked ? `checked ${new Date(checked).toLocaleTimeString()}` : 'loading…'}
          </div>
        </div>
        <button className="btn" onClick={refresh} disabled={loading} style={{ padding: '6px 12px', fontSize: 12 }}>
          {loading ? '…' : 'Refresh'}
        </button>
      </div>
      <div className="grid grid-3" style={{ gap: 10 }}>
        {fleet.map(s => (
          <a key={s.id} href={s.ok ? s.url : s.fallback || s.url} target="_blank" rel="noreferrer"
             style={{ padding: 12, borderRadius: 'var(--r-sm)', background: 'var(--navy-1)', border: '1px solid var(--glass-brd)', textDecoration: 'none', color: 'var(--ink)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</span>
              <span className="pill" style={{ padding: '2px 8px', fontSize: 10 }}>
                <span className={`dot ${s.ok ? 'ok' : 'err'}`}></span>
                {s.ok ? s.http : 'down'}
              </span>
            </div>
            <div style={{ fontSize: 10, color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}>
              {s.status}
            </div>
          </a>
        ))}
        {fleet.length === 0 && !loading && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 20, color: 'var(--ink-mute)', fontSize: 12 }}>
            Backend unreachable. Start backend-core on :3001.
          </div>
        )}
      </div>
    </div>
  )
}

export default FleetPanel
