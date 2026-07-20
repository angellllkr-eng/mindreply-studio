// Shared chat component — multi-provider fallback chat wired to backend-core
// Drop into any frontend: <ChatPanel product="aether-x" />
import { useState, useRef, useEffect, useCallback } from 'react'
import api from '../lib/api.js'

export function ChatPanel({ product = 'Mind-Reply', effort: defaultEffort = 'high' }) {
  const [messages, setMessages] = useState([
    { role: 'system', content: `${product} online. Backend wired. Multi-provider fallback active (Grok → OpenRouter → xAI).`, id: 'init' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [effort, setEffort] = useState(defaultEffort)
  const [provider, setProvider] = useState('')
  const [error, setError] = useState('')
  const scrollRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [])
  useEffect(() => { scrollToBottom() }, [messages, loading, scrollToBottom])

  const send = async (overrideText) => {
    const text = (overrideText ?? input).trim()
    if (!text || loading) return
    setError('')
    const userMsg = { role: 'user', content: text, id: `u-${Date.now()}` }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const r = await api.chat(text, { effort, provider: provider || undefined })
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: r.reply,
        provider: r.provider,
        model: r.model,
        id: `a-${Date.now()}`
      }])
    } catch (e) {
      setError(e.message)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `**Error** — ${e.message}`,
        error: true,
        id: `e-${Date.now()}`
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="glass" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid var(--glass-brd)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="pill"><span className="dot ok"></span>{product}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-mute)' }}>Multi-provider</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <select className="input" style={{ width: 'auto', padding: '6px 10px', fontSize: 12 }} value={effort} onChange={e => setEffort(e.target.value)}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select className="input" style={{ width: 'auto', padding: '6px 10px', fontSize: 12 }} value={provider} onChange={e => setProvider(e.target.value)}>
            <option value="">Auto</option>
            <option value="grok">Grok</option>
            <option value="openrouter">OpenRouter</option>
            <option value="xai">xAI</option>
          </select>
        </div>
      </div>

      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {messages.map(m => (
          <div key={m.id} className={`fade-in msg msg-${m.role}`} style={{
            display: 'flex', gap: 10,
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%'
          }}>
            <div style={{
              padding: '10px 14px', borderRadius: 12,
              background: m.role === 'user' ? 'linear-gradient(135deg, var(--coral), var(--coral-soft))' : 'var(--glass-bg-hi)',
              color: m.role === 'user' ? 'var(--navy-0)' : 'var(--ink)',
              border: m.role === 'user' ? 'none' : '1px solid var(--glass-brd)',
              fontFamily: m.role === 'assistant' ? 'var(--mono)' : 'var(--sans)',
              fontSize: 13, lineHeight: 1.55,
              whiteSpace: 'pre-wrap'
            }}>
              {m.content}
              {m.provider && (
                <div style={{ marginTop: 6, fontSize: 10, opacity: 0.6, fontFamily: 'var(--mono)' }}>
                  via {m.provider} · {m.model}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', padding: '10px 14px', borderRadius: 12, background: 'var(--glass-bg-hi)', border: '1px solid var(--glass-brd)' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-mute)' }}>thinking…</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 10, padding: '14px 18px', borderTop: '1px solid var(--glass-brd)' }}>
        <textarea
          className="textarea" rows={1} value={input}
          onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
          placeholder={`Ask ${product}… (Enter to send)`}
          style={{ flex: 1, minHeight: 44, maxHeight: 120 }}
        />
        <button className="btn btn-primary" onClick={() => send()} disabled={loading || !input.trim()}>
          Send
        </button>
      </div>
      {error && <div style={{ padding: '0 18px 12px', color: 'var(--coral)', fontFamily: 'var(--mono)', fontSize: 11 }}>{error}</div>}
    </div>
  )
}

export default ChatPanel
