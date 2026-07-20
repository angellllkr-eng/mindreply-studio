import { useState, useRef, useEffect } from 'react'
import './index.css'

const MODELS = [
  { id: 'grok-4.5', name: 'Grok 4.5', provider: 'grok', icon: '⚡', desc: 'xAI heavy · open mode' },
  { id: 'claude-opus', name: 'Claude Opus', provider: 'claude', icon: '🧠', desc: 'Anthropic · bypass perms' },
  { id: 'open-webui', name: 'Open WebUI #2', provider: 'webui', icon: '🌐', desc: 'localhost:8890 hub' },
  { id: 'copilot', name: 'GitHub Copilot', provider: 'copilot', icon: '🤖', desc: 'Editor AI' },
]

const SYSTEMS = [
  { id: 'docker', name: 'Docker Desktop', status: 'stopped', port: '' },
  { id: 'open-webui-2', name: 'Open WebUI #2', status: 'stopped', port: '8890' },
  { id: 'grok-cli', name: 'Grok CLI OPEN', status: 'stopped', port: '' },
  { id: 'claude-cli', name: 'Claude Opus OPEN', status: 'stopped', port: '' },
]

const SUGGESTIONS = [
  'Map MRPRODUCTION estate and next deploy moves',
  'Status of MindReply, AUREL, BRIXO, A11-K',
  'Wire Grok 4.5 + Claude Opus competitive stack',
  'Safe disk reclaim without deleting valuables',
  'Open WebUI #2 on 8890 + model connections',
  'What is broken after laptop migration?',
]

export default function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [activeModel, setActiveModel] = useState(MODELS[0])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('chat')
  const [isLoading, setIsLoading] = useState(false)
  const [systems, setSystems] = useState(SYSTEMS)
  const [health, setHealth] = useState(null)
  const [showSug, setShowSug] = useState(true)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then(setHealth)
      .catch(() => setHealth({ ok: false }))
  }, [])

  const sendMessage = async (text) => {
    const content = (text ?? input).trim()
    if (!content || isLoading) return
    setShowSug(false)
    setMessages((prev) => [...prev, { role: 'user', content }])
    setInput('')
    setIsLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          model: activeModel.id,
          provider: activeModel.provider,
        }),
      })
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || data.error || 'No response' },
      ])
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error: ' + e.message },
      ])
    }
    setIsLoading(false)
  }

  const startSystem = async (id) => {
    setSystems((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'starting' } : s)))
    try {
      await fetch(`/api/system/${id}/start`, { method: 'POST' })
      setSystems((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'running' } : s)))
    } catch {
      setSystems((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'error' } : s)))
    }
  }

  const stopSystem = async (id) => {
    await fetch(`/api/system/${id}/stop`, { method: 'POST' })
    setSystems((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'stopped' } : s)))
  }

  const newChat = () => {
    setMessages([])
    setShowSug(true)
  }

  return (
    <div className="app">
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo">AI Chat</div>
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
        </div>
        <button className="new-chat-btn" onClick={newChat}>
          + New chat
        </button>

        <div className="section-title">Models</div>
        <div className="model-list">
          {MODELS.map((m) => (
            <div
              key={m.id}
              className={`model-item ${activeModel.id === m.id ? 'active' : ''}`}
              onClick={() => setActiveModel(m)}
            >
              <span className="model-icon">{m.icon}</span>
              <div className="model-info">
                <div className="model-name">{m.name}</div>
                <div className="model-desc">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-title">Control plane</div>
        <div className="tab-list">
          <div
            className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            💬 Chat
          </div>
          <div
            className={`tab ${activeTab === 'systems' ? 'active' : ''}`}
            onClick={() => setActiveTab('systems')}
          >
            🎛 Systems
          </div>
          <div
            className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙ Settings
          </div>
        </div>

        <div className="sidebar-foot">
          <div className={`health ${health?.ok ? 'ok' : 'bad'}`}>
            {health?.ok ? 'API online' : 'API offline'}
          </div>
          <div className="health-sub">
            Grok {health?.grok ? '✓' : '✗'} · Claude {health?.claude ? '✓' : '✗'}
          </div>
        </div>
      </aside>

      <main className="main">
        {activeTab === 'chat' && (
          <>
            <header className="chat-header">
              <div className="chat-title">
                {activeModel.icon} {activeModel.name}
              </div>
              <div className="header-actions">
                <button onClick={newChat}>New</button>
                <a href="http://127.0.0.1:8890" target="_blank" rel="noreferrer">
                  Open WebUI ↗
                </a>
              </div>
            </header>
            <div className="chat-body">
              {messages.length === 0 && (
                <div className="empty">
                  <div className="empty-title">AI Chat · Control Plane</div>
                  <div className="empty-sub">
                    Open WebUI-style surface · Grok 4.5 + Claude Opus · no scratch toys
                  </div>
                  {showSug && (
                    <div className="suggestions">
                      {SUGGESTIONS.map((s) => (
                        <button key={s} className="sug" onClick={() => sendMessage(s)}>
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`msg ${msg.role}`}>
                  <div className="msg-avatar">
                    {msg.role === 'user' ? '👤' : activeModel.icon}
                  </div>
                  <div className="msg-content">{msg.content}</div>
                </div>
              ))}
              {isLoading && (
                <div className="msg assistant">
                  <div className="msg-avatar">{activeModel.icon}</div>
                  <div className="msg-content loading">Thinking…</div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            <div className="input-area">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder={`Message ${activeModel.name}…`}
                rows={1}
              />
              <button onClick={() => sendMessage()} disabled={isLoading || !input.trim()}>
                ➤
              </button>
            </div>
          </>
        )}

        {activeTab === 'systems' && (
          <div className="systems-panel">
            <h2>System Control</h2>
            <p className="panel-note">Parallel engines — each own process, no shared queue.</p>
            <div className="systems-grid">
              {systems.map((s) => (
                <div key={s.id} className={`system-card ${s.status}`}>
                  <div className="sys-name">{s.name}</div>
                  <div className="sys-status">{s.status}</div>
                  {s.port && <div className="sys-port">Port {s.port}</div>}
                  <div className="sys-actions">
                    {s.status !== 'running' && s.status !== 'starting' && (
                      <button onClick={() => startSystem(s.id)}>▶ Start</button>
                    )}
                    {s.status === 'running' && (
                      <button onClick={() => stopSystem(s.id)}>⏹ Stop</button>
                    )}
                    {s.status === 'starting' && <button disabled>Starting…</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-panel">
            <h2>Settings</h2>
            <div className="setting-row">
              <label>AI Chat URL</label>
              <input type="text" defaultValue="http://127.0.0.1:4747/aichat" readOnly />
            </div>
            <div className="setting-row">
              <label>Grok binary</label>
              <input type="text" defaultValue={health?.grokPath || 'detecting…'} readOnly />
            </div>
            <div className="setting-row">
              <label>Claude binary</label>
              <input type="text" defaultValue={health?.claudePath || 'not installed'} readOnly />
            </div>
            <div className="setting-row">
              <label>Open WebUI #2</label>
              <input type="text" defaultValue="http://127.0.0.1:8890" readOnly />
            </div>
            <div className="setting-row">
              <label>Rule</label>
              <input type="text" defaultValue="Never start from scratch · enhance existing" readOnly />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
