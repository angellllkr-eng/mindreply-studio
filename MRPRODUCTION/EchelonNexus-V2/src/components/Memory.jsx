import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';

export function Memory({ toast }) {
  const [entries, setEntries] = useState([]);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const r = await api.get('/api/memory');
      setEntries(r.entries || []);
    } catch (e) {
      toast.err('Memory load failed');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function save(e) {
    e?.preventDefault();
    if (!key.trim()) return;
    try {
      await api.post('/api/memory', { key, value });
      toast.ok(`saved: ${key}`);
      setKey(''); setValue('');
      load();
    } catch (err) {
      toast.err('save failed');
    }
  }

  async function remove(k) {
    try {
      await api.del(`/api/memory/${encodeURIComponent(k)}`);
      toast.ok(`deleted: ${k}`);
      load();
    } catch (e) {
      toast.err('delete failed');
    }
  }

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Memory</h2>
        <p className="muted">Persistent key-value store. Supabase if configured, else in-memory.</p>
      </div>

      <form className="mem-form" onSubmit={save}>
        <input value={key} onChange={e => setKey(e.target.value)} placeholder="key" />
        <input value={value} onChange={e => setValue(e.target.value)} placeholder="value" />
        <button type="submit" disabled={!key.trim()}>save</button>
      </form>

      {loading ? <div className="empty">loading…</div> : entries.length === 0 ? (
        <div className="empty">no entries yet</div>
      ) : (
        <ul className="mem-list">
          {entries.map(e => (
            <li key={e.key} className="mem-item">
              <div className="mem-key mono">{e.key}</div>
              <div className="mem-val">{String(e.value)}</div>
              <button className="mini err" onClick={() => remove(e.key)}>×</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
