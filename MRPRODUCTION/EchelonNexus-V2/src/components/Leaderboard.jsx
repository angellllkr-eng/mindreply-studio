import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';

export function Leaderboard({ toast }) {
  const [rows, setRows] = useState([]);
  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const r = await api.get('/api/leaderboard');
      setRows(r.leaderboard || []);
      setSource(r.source || '');
    } catch (e) {
      toast.err('Leaderboard load failed');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function record(winner, loser) {
    try {
      await api.post('/api/leaderboard/record', { winner, loser, product: 'manual' });
      toast.ok(`Battle recorded: ${winner} > ${loser}`);
      load();
    } catch (e) {
      toast.err('Record failed');
    }
  }

  const top = [...rows].sort((a,b) => (b.elo||0) - (a.elo||0));

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Leaderboard</h2>
        <p className="muted">Model ELO from battle outcomes. Source: {source || '—'}</p>
      </div>

      {loading ? <div className="empty">loading…</div> : (
        <table className="table">
          <thead>
            <tr><th>#</th><th>Model</th><th>ELO</th><th>W</th><th>L</th><th>D</th><th>Products</th><th>Action</th></tr>
          </thead>
          <tbody>
            {top.map((r, i) => (
              <tr key={r.model}>
                <td>{i+1}</td>
                <td className="mono">{r.model}</td>
                <td className="num"><strong>{r.elo}</strong></td>
                <td className="num ok">{r.wins}</td>
                <td className="num err">{r.losses}</td>
                <td className="num">{r.draws}</td>
                <td className="num">{r.products}</td>
                <td>
                  {i > 0 && (
                    <button className="mini" onClick={() => record(r.model, top[i-1].model)}>
                      beat #{i}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="ghost" onClick={load} disabled={loading}>refresh</button>
    </section>
  );
}
