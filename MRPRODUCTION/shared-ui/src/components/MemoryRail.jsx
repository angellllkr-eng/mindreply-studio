// Shared MemoryRail — persistent memory layer wired to backend-core
import { useEffect, useState } from 'react'
import api from '../lib/api.js'

export function MemoryRail() {
  const [entries, setEntries] = useState([])
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  const load = async () => {
    try {
      const r = await api.memory.list()
      setEntries(r.entries || [])
    } catch (e) {
      setEntries([])
    }
  }

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!key || !value) return
    setLoading(true)
    try {
      await api.memory.set(key, value, ['manual'])
      setKey(''); setValue('')
      await load()
    } finally { setLoading(false) }
  }

  const remove = async (k) => {
    await api.memory.delete(k)
    await load()
  }

  return (
    <div className="glass" style={{ padding: 18, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Memory Rail</div>
      <div style={{ fontSize: 11, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', marginBottom: 14 }}>
        {entries.length} entries · backend-core persisted
      </div>

      <div className="col" style={{ marginBottom: 14 }}>
        <input className="input" placeholder="key" value={key} onChange={e => setKey(e.target.value)} />
        <textarea className="textarea" placeholder="value" value={value} onChange={e => setValue(e.target.value)} rows={2} />
        <button className="btn btn-primary" onClick={save} disabled={loading || !key || !value}>
          {loading ? '…' : 'Store'}
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {entries.length === 0 && (
          <div style={{ color: 'var(--ink-mute)', fontSize: 12, textAlign: 'center', padding: 20 }}>
            No entries yet.
          </div>
        )}
        {entries.map(e => (
          <div key={e.key} style={{ padding: 10, borderRadius: 'var(--r-sm)', background: 'var(--navy-1)', border: '1px solid var(--glass-brd)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--coral-soft)' }}>{e.key}</span>
              <button onClick={() => remove(e.key)} style={{ background: 'none', border: 'none', color: 'var(--ink-dim)', cursor: 'pointer', fontSize: 11 }}>×</button>
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {typeof e.value === 'string' ? e.value.slice(0, 120) : JSON.stringify(e.value).slice(0, 120)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MemoryRail
