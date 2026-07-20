import { useState, useCallback } from 'react';

export function useToast() {
  const [items, setItems] = useState([]);
  const push = useCallback((text, kind = 'info', ttl = 3500) => {
    const id = Math.random().toString(36).slice(2);
    setItems(prev => [...prev, { id, text, kind }]);
    setTimeout(() => setItems(prev => prev.filter(i => i.id !== id)), ttl);
  }, []);
  return {
    items,
    ok:    (t) => push(t, 'ok'),
    err:   (t) => push(t, 'err', 6000),
    info:  (t) => push(t, 'info')
  };
}
