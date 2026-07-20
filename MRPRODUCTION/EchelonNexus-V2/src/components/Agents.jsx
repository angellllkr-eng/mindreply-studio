import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';

export function Agents({ toast }) {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await api.get('/api/agents');
        setAgents(r.agents || []);
      } catch (e) {
        toast.err('Agents load failed');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <section className="panel"><div className="empty">loading…</div></section>;

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Agent Registry</h2>
        <p className="muted">Single source of truth — every frontend reads from here.</p>
      </div>
      <div className="agent-grid">
        {agents.map(a => (
          <div key={a.id} className={`agent-card agent-${a.status}`}>
            <div className="agent-head">
              <span className="agent-name">{a.name}</span>
              <span className={`badge badge-${a.status === 'active' ? 'up' : 'wait'}`}>{a.status}</span>
            </div>
            <div className="agent-meta">
              <span className="mono">{a.vendor}</span>
              <span className="muted">{a.role}</span>
            </div>
            {a.products?.length > 0 && (
              <div className="agent-products">
                {a.products.map(p => <span key={p} className="chip">{p}</span>)}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
