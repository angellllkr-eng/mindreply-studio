const BASE = import.meta.env.VITE_API_BASE || '';

async function request(path, opts = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText} ${txt.slice(0,120)}`);
  }
  return res.json();
}

export const api = {
  get:  (p) => request(p),
  post: (p, body) => request(p, { method: 'POST', body }),
  del:  (p) => request(p, { method: 'DELETE' })
};
