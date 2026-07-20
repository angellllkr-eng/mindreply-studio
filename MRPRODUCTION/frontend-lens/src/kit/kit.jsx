// MR UI Kit — shared React components. Zero deps. Drop into any Vite + React app.
// Usage: import { KitNav, KitCard, KitButton, useApi } from '../../mr-ui-kit/kit.jsx'

import { useState, useEffect, useCallback, useRef } from 'react'

// Config — every frontend reads this from window.MR_API or falls back
export const API_BASE =
  (typeof window !== 'undefined' && window.MR_API) ||
  'http://localhost:3001'

// --- useApi hook: simple fetch + loading + error ---
export function useApi(path, { auto = true, deps = [] } = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(auto)
  const [error, setError] = useState(null)
  const run = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const r = await fetch(`${API_BASE}${path}`)
      if (!r.ok) throw new Error(`${r.status}`)
      const j = await r.json()
      setData(j)
      return j
    } catch (e) { setError(e.message) } finally { setLoading(false) }
  }, [path])
  useEffect(() => { if (auto) run() /* eslint-disable-next-line */ }, [auto, ...deps])
  return { data, loading, error, run, setData }
}

// --- useApiPost: fire-and-collect POST ---
export function useApiPost() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const post = useCallback(async (path, body) => {
    setLoading(true); setError(null)
    try {
      const r = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const j = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(j.error || `${r.status}`)
      return j
    } catch (e) { setError(e.message); throw e } finally { setLoading(false) }
  }, [])
  return { post, loading, error }
}

// --- Theme ---
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage === 'undefined') return 'light'
    return localStorage.getItem('mr-theme') || 'light'
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('mr-theme', theme)
  }, [theme])
  return { theme, toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light') }
}

// --- Nav ---
export function KitNav({ mark = 'MR', brand = 'Mind-Reply', links = [], right = null }) {
  const { theme, toggle } = useTheme()
  return (
    <nav className="kit-nav">
      <div className="kit-nav-brand">
        <div className="kit-nav-mark">{mark}</div>
        <span>{brand}</span>
      </div>
      <div className="kit-nav-links">
        {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
        <button className="kit-theme-toggle" onClick={toggle} aria-label="Toggle theme">
          {theme === 'light' ? '☾' : '☀'}
        </button>
        {right}
      </div>
    </nav>
  )
}

// --- Card ---
export function KitCard({ title, children, footer, glass = false, className = '' }) {
  return (
    <div className={`kit-card ${glass ? 'kit-card-glass' : ''} ${className}`}>
      {title && <h3>{title}</h3>}
      {children}
      {footer && <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--line)' }}>{footer}</div>}
    </div>
  )
}

// --- Button ---
export function KitButton({ children, variant = 'primary', size = 'md', loading = false, ...props }) {
  const cls = `kit-btn kit-btn-${variant} ${size === 'sm' ? 'kit-btn-sm' : ''}`
  return (
    <button className={cls} disabled={loading || props.disabled} {...props}>
      {loading ? <span className="kit-loader" /> : children}
    </button>
  )
}

// --- Input ---
export function KitInput({ label, helper, ...props }) {
  return (
    <div className="kit-input">
      {label && <label>{label}</label>}
      <input {...props} />
      {helper && <span className="helper">{helper}</span>}
    </div>
  )
}

// --- Badge ---
export function KitBadge({ status = 'default', children }) {
  const map = { live: 'kit-badge-live', pending: 'kit-badge-pending', error: 'kit-badge-error' }
  return <span className={`kit-badge ${map[status] || ''}`}><span className="kit-dot" />{children}</span>
}

// --- Empty ---
export function KitEmpty({ icon = '∅', title = 'Nothing here yet', children }) {
  return (
    <div className="kit-empty">
      <div className="kit-empty-icon">{icon}</div>
      <div style={{ fontWeight: 500, color: 'var(--ink)', marginBottom: 4 }}>{title}</div>
      <div>{children}</div>
    </div>
  )
}

// --- Loader ---
export function KitLoader({ label = 'Loading…' }) {
  return <div className="kit-row" style={{ justifyContent: 'center', padding: 20, color: 'var(--ink-mute)' }}><span className="kit-loader" /> {label}</div>
}

// --- Footer ---
export function KitFooter({ product = 'Mind-Reply', year = 2026 }) {
  return (
    <footer className="kit-footer">
      <div>{product} · © {year} · <a href="https://github.com/angellllkr-eng">angellllkr-eng</a></div>
      <div style={{ marginTop: 4, fontSize: 12 }}>Powered by <a href="https://mind-reply.com">Mind-Reply</a> · <a href="/api/health">API</a></div>
    </footer>
  )
}

// --- Chat (wired to /api/chat) ---
export function KitChat({ product = 'Mind-Reply', placeholder = 'Ask anything…', systemPrompt = '' }) {
  const [messages, setMessages] = useState([
    { role: 'bot', content: `Hi — I'm the ${product} assistant. Ask me anything and I'll route it through the best available model.`, id: 'init' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [trail, setTrail] = useState(null)
  const scrollRef = useRef(null)
  const taRef = useRef(null)

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }) }, [messages, loading])

  const send = async (text) => {
    text = (text ?? input).trim()
    if (!text || loading) return
    const userMsg = { role: 'user', content: text, id: 'u' + Date.now() }
    setMessages(p => [...p, userMsg])
    setInput('')
    setLoading(true); setTrail(null)
    try {
      const r = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: systemPrompt ? `${systemPrompt}\n\n${text}` : text, effort: 'high' })
      })
      const j = await r.json()
      if (!r.ok) throw new Error(j.error || `${r.status}`)
      setMessages(p => [...p, { role: 'bot', content: j.reply, id: 'b' + Date.now() }])
      if (j.trail) setTrail(j.trail)
    } catch (e) {
      setMessages(p => [...p, { role: 'bot', content: `⚠️ ${e.message}`, id: 'e' + Date.now(), error: true }])
    } finally { setLoading(false) }
  }

  return (
    <div className="kit-chat">
      <div className="kit-chat-msgs" ref={scrollRef}>
        {messages.map(m => (
          <div key={m.id} className="kit-chat-msg">
            <div className={`kit-chat-avatar ${m.role}`}>{m.role === 'user' ? 'AK' : 'M'}</div>
            <div className={`kit-chat-bubble ${m.role}`}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div className="kit-chat-msg"><div className="kit-chat-avatar bot">M</div><div className="kit-chat-bubble bot"><span className="kit-loader" /></div></div>
        )}
      </div>
      {trail && trail.length > 1 && (
        <div style={{ fontSize: 11, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', marginTop: 6 }}>
          trail: {trail.map(t => `${t.provider}:${t.ok ? '✓' : '✗'}`).join(' → ')}
        </div>
      )}
      <div className="kit-chat-composer">
        <textarea
          ref={taRef} value={input} rows={1}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
          placeholder={placeholder}
        />
        <KitButton onClick={() => send()} loading={loading} disabled={!input.trim()}>Send</KitButton>
      </div>
    </div>
  )
}

// --- HN List (wired to /api/hn) ---
export function KitHNList({ limit = 10, onInject = null }) {
  const { data, loading, error, run } = useApi('/api/hn')
  if (loading) return <KitLoader label="Loading HN cache…" />
  if (error) return <KitEmpty icon="!">Couldn't reach HN cache. <a href="#" onClick={e => { e.preventDefault(); run() }}>Retry</a></KitEmpty>
  const stories = (data?.stories || []).slice(0, limit)
  if (!stories.length) return <KitEmpty icon="∅" title="No stories cached">Run <code>POST /api/hn/refresh</code> to fetch.</KitEmpty>
  return (
    <div className="kit-stack">
      {stories.map((s, i) => (
        <div key={s.id} className="kit-card" style={{ padding: 14, cursor: onInject ? 'pointer' : 'default' }} onClick={() => onInject?.(s)}>
          <div className="kit-row" style={{ justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-mute)' }}>#{i + 1} · {s.points}↑ · {s.comments}💬</span>
            {onInject && <span style={{ fontSize: 12, color: 'var(--coral)' }}>inject →</span>}
          </div>
          <div style={{ fontWeight: 500, marginTop: 4 }}>{s.title}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 2 }}>by {s.by}</div>
        </div>
      ))}
    </div>
  )
}

// --- Leaderboard (wired to /api/battles/leaderboard) ---
export function KitLeaderboard() {
  const { data, loading, error } = useApi('/api/battles/leaderboard')
  if (loading) return <KitLoader label="Loading leaderboard…" />
  if (error || !data?.leaderboard?.length) return <KitEmpty icon="∅" title="No battles yet">Run a model battle to populate the leaderboard.</KitEmpty>
  return (
    <table className="kit-table">
      <thead><tr><th>#</th><th>Model</th><th>W</th><th>L</th><th>ELO</th></tr></thead>
      <tbody>
        {data.leaderboard.map((m, i) => (
          <tr key={m.model}>
            <td style={{ fontFamily: 'var(--mono)', color: 'var(--ink-mute)' }}>{i + 1}</td>
            <td style={{ fontWeight: 500 }}>{m.model}</td>
            <td style={{ color: '#16A34A' }}>{m.wins || 0}</td>
            <td style={{ color: '#DC2626' }}>{m.losses || 0}</td>
            <td style={{ fontFamily: 'var(--mono)', fontWeight: 600 }}>{m.elo || 1500}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// --- Fleet status (wired to /api/fleet) ---
export function KitFleet() {
  const { data, loading, error, run } = useApi('/api/fleet')
  if (loading) return <KitLoader label="Checking fleet…" />
  if (error) return <KitEmpty icon="!">Couldn't check fleet. <a href="#" onClick={e => { e.preventDefault(); run() }}>Retry</a></KitEmpty>
  return (
    <div className="kit-grid">
      {(data?.fleet || []).map(s => (
        <KitCard key={s.id} title={s.name}>
          <div className="kit-row" style={{ justifyContent: 'space-between' }}>
            <KitBadge status={s.ok ? 'live' : 'error'}>{s.ok ? `HTTP ${s.http}` : 'down'}</KitBadge>
            <a href={s.url} style={{ fontSize: 13 }}>{s.url.replace('https://', '')}</a>
          </div>
          {s.fallback && <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 8 }}>fallback: <a href={s.fallback}>{s.fallback.replace('https://', '')}</a></div>}
        </KitCard>
      ))}
    </div>
  )
}
