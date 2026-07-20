import { Router } from 'express';
export const modelsRouter = Router();

// Model hierarchy — competition leaderboard source
const MODELS = [
  { id: 'grok-4.5', vendor: 'xAI', tier: 'primary', elo: 1820, context: 256000, strengths: ['reasoning', 'code', 'speed'] },
  { id: 'claude-opus-4.8', vendor: 'Anthropic', tier: 'challenger', elo: 1815, context: 200000, strengths: ['writing', 'analysis', 'long-context'] },
  { id: 'gemini-2-pro', vendor: 'Google', tier: 'fallback', elo: 1740, context: 1000000, strengths: ['multimodal', 'long-context'] },
  { id: 'gpt-5', vendor: 'OpenAI', tier: 'fallback', elo: 1780, context: 256000, strengths: ['general', 'tools'] },
  { id: 'deepseek-v3', vendor: 'DeepSeek', tier: 'fallback', elo: 1690, context: 128000, strengths: ['code', 'cost'] }
];

modelsRouter.get('/', (req, res) => res.json({ models: MODELS }));
modelsRouter.get('/:id', (req, res) => {
  const m = MODELS.find(x => x.id === req.params.id);
  return m ? res.json(m) : res.status(404).json({ error: 'model not found' });
});
