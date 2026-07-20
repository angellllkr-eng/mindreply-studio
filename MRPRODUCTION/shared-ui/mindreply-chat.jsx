// MindReply Chat — drop-in component, reused by all 7 frontends.
// Usage: import Chat from './mindreply-chat.jsx'; <Chat product="AUREL" provider="grok" />
import { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { api } from './api.js';

export default function Chat({ product = 'MindReply', provider = 'grok', welcome }) {
  const [messages, setMessages] = useState([
    { role: 'grok', content: welcome || `${product} online. Backend wired. Ask anything — or pick a Hacker News story to inject context.`, id: 'init' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [effort, setEffort] = useState('high');
  const [agents, setAgents] = useState([]);
  const [hn, setHn] = useState([]);
  const [status, setStatus] = useState('connecting');
  const scrollRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, []);
  useEffect(() => { scrollToBottom() }, [messages, loading, scrollToBottom]);

  // Boot: health + agents + HN cache
  useEffect(() => {
    (async () => {
      try {
        await api.health(); setStatus('live');
        const a = await api.agents(); setAgents(a.agents || []);
        const h = await api.hn(); setHn(h.stories || []);
      } catch { setStatus('offline'); }
    })();
  }, []);

  const send = async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;
    const userMsg = { role: 'user', content: text, id: 'u-' + Date.now() };
    setMessages(p => [...p, userMsg]);
    setInput(''); setLoading(true);
    try {
      const r = await api.chat({ message: text, provider, effort, context: { product } });
      setMessages(p => [...p, { role: 'grok', content: r.reply, id: 'g-' + Date.now() }]);
    } catch (e) {
      setMessages(p => [...p, { role: 'grok', content: `**Error** — ${e.message}\n\nBackend may be offline or no provider key set.`, id: 'err-' + Date.now(), error: true }]);
    } finally { setLoading(false); }
  };

  const injectHn = (s) => {
    const ctx = `**HN Context** — "${s.title}" (${s.points} pts, ${s.comments} comments)\n${s.url}\n\nSummarise and tell me why it matters for agentic dev workflows.`;
    send(ctx);
  };

  const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  return (
    <div className="mr-chat">
      <header className="mr-header">
        <div className="mr-brand">
          <div className="mr-brand-mark">{product.slice(0, 2).toUpperCase()}</div>
          <span>{product}</span>
          <span className="mr-brand-sub">/ MindReply</span>
        </div>
        <div className="mr-row">
          <span className="mr-pill"><span className={`mr-dot ${status === 'live' ? '' : 'warn'}`}></span>{status}</span>
          <select className="mr-select" value={effort} onChange={e => setEffort(e.target.value)} style={{ width: 'auto' }}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </header>

      <div className="mr-messages" ref={scrollRef}>
        {messages.map(m => (
          <div key={m.id} className={`mr-msg ${m.role}`}>
            <div className="mr-msg-avatar">{m.role === 'user' ? 'AK' : 'G'}</div>
            <div className="mr-msg-body">
              {m.role === 'grok' ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown> : <div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>}
            </div>
          </div>
        ))}
        {loading && (
          <div className="mr-msg grok"><div className="mr-msg-avatar">G</div>
            <div className="mr-msg-body"><div className="mr-typing"><span></span><span></span><span></span></div></div>
          </div>
        )}
      </div>

      {hn.length > 0 && (
        <div style={{ padding: '0 20px 8px', display: 'flex', gap: 8, overflowX: 'auto', borderBottom: '1px solid var(--glass-brd)' }}>
          {hn.slice(0, 8).map(s => (
            <button key={s.id} className="mr-btn ghost" style={{ flexShrink: 0, fontSize: 11, padding: '6px 10px' }} onClick={() => injectHn(s)} title={s.title}>
              {s.title.length > 32 ? s.title.slice(0, 32) + '…' : s.title} · {s.points}p
            </button>
          ))}
        </div>
      )}

      <div className="mr-composer">
        <textarea className="mr-textarea" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
          placeholder={`Ask ${product}… (Enter to send, Shift+Enter for newline)`} rows={1} />
        <button className="mr-btn" onClick={() => send()} disabled={loading || !input.trim()}>Send</button>
      </div>
    </div>
  );
}
