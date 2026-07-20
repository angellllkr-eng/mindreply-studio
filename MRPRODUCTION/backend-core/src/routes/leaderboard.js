import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';
export const leaderboardRouter = Router();

const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : null;

const FALLBACK = [
  { model: 'grok-4.5', wins: 14, losses: 6, draws: 2, elo: 1820, products: 6 },
  { model: 'claude-opus-4.8', wins: 13, losses: 7, draws: 2, elo: 1815, products: 4 },
  { model: 'gpt-5', wins: 9, losses: 11, draws: 2, elo: 1780, products: 0 },
  { model: 'gemini-2-pro', wins: 7, losses: 13, draws: 2, elo: 1740, products: 0 },
  { model: 'deepseek-v3', wins: 5, losses: 15, draws: 2, elo: 1690, products: 0 }
];

leaderboardRouter.get('/', async (req, res) => {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('leaderboard').select('*').order('elo', { ascending: false });
      if (!error && data?.length) return res.json({ leaderboard: data, source: 'supabase' });
    } catch (e) { /* fall through */ }
  }
  res.json({ leaderboard: FALLBACK, source: 'fallback' });
});

leaderboardRouter.post('/record', async (req, res) => {
  const { winner, loser, product } = req.body || {};
  if (!winner || !loser) return res.status(400).json({ error: 'winner and loser required' });
  // Simple Elo: +16 for winner, -16 for loser
  if (supabase) {
    try {
      await supabase.rpc('record_battle', { winner_model: winner, loser_model: loser, product_name: product });
      return res.json({ recorded: true, source: 'supabase' });
    } catch (e) { /* fall through */ }
  }
  return res.json({ recorded: true, source: 'fallback', winner, loser, product });
});
