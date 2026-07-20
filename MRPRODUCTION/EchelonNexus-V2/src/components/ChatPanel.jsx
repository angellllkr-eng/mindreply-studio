import { useState } from 'react';
import { api } from '../lib/api.js';

const PROVIDERS = [
  { id: 'grok',      label: 'Grok' },
  { id: 'anthropic', label: 'Claude' },
  { id: 'openai',    label: 'GPT' },
  { id: 'openrouter',label: 'OpenRouter' }
];

export function ChatPanel({ toast }) {
  const [message, setMessage] = useState('');
  const [provider, setProvider] = useState('grok');
  const [effort, setEffort] = useState('high');
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState([]);

  async function send(e) {
    e?.preventDefault();
    if (!message.trim() || busy) return;
    setBusy(true);
    const userMsg = message;
    setMessage('');
    setLog(prev => [...prev, { role: 'user', text: userMsg }]);
    try {
      const r = await api.post('/api/chat', { message: userMsg, provider, effort });
      setLog(prev => [...prev, {
        role: 'assistant',
        text: r.reply,
        meta: `${r.provider}${r.model ? ' · ' + r.model : ''} · ${effort}`
      }]);
    } catch (err) {
      setLog(prev => [...prev, { role: 'error', text: err.message }]);
      toast.err('Chat failed — all providers down?');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Chat</h2>
        <p className="muted">Multi-provider fallback chain. If primary fails, challenger takes over.</p>
      </div>

      <div className="chat-log">
        {log.length === 0 && <div className="empty">Ask anything. Replies stream from your model hierarchy.</div>}
        {log.map((m, i) => (
          <div key={i} className={`msg msg-${m.role}`}>
            <div className="msg-text">{m.text}</div>
            {m.meta && <div className="msg-meta">{m.meta}</div>}
          </div>
        ))}
        {busy && <div className="msg msg-assistant"><div className="msg-text muted">thinking…</div></div>}
      </div>

      <form className="chat-input" onSubmit={send}>
        <select value={provider} onChange={e => setProvider(e.target.value)} disabled={busy}>
          {PROVIDERS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
        </select>
        <select value={effort} onChange={e => setEffort(e.target.value)} disabled={busy}>
          <option value="high">high</option>
          <option value="medium">medium</option>
          <option value="low">low</option>
        </select>
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Message the model…"
          disabled={busy}
          autoFocus
        />
        <button type="submit" disabled={busy || !message.trim()}>{busy ? '…' : 'Send'}</button>
      </form>
    </section>
  );
}
