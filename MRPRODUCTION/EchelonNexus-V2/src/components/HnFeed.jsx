import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';

export function HnFeed({ toast }) {
  const [stories, setStories] = useState([]);
  const [fetchedAt, setFetchedAt] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load(force = false) {
    setLoading(true);
    try {
      const r = force
        ? await api.get('/api/hn/refresh')
        : await api.get('/api/hn');
      setStories(r.stories || []);
      setFetchedAt(r.fetchedAt);
    } catch (e) {
      toast.err('HN fetch failed');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(false); }, []);

  const ago = fetchedAt ? new Date(fetchedAt).toLocaleTimeString() : '—';

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Hacker News</h2>
        <p className="muted">Top 15, cached 30 min. Last refresh: {ago}</p>
      </div>

      {loading ? <div className="empty">loading…</div> : (
        <ol className="hn-list">
          {stories.map(s => (
            <li key={s.id} className="hn-item">
              <span className="hn-rank">{s.rank}</span>
              <div className="hn-body">
                <a href={s.url} target="_blank" rel="noreferrer" className="hn-title">{s.title}</a>
                <div className="hn-meta">
                  <span>▲ {s.points}</span>
                  <span>💬 {s.comments}</span>
                  <span className="muted">by {s.by}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
      <button className="ghost" onClick={() => load(true)} disabled={loading}>force refresh</button>
    </section>
  );
}
