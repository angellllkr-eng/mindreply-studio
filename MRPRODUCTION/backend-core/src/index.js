import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { healthRouter } from './routes/health.js'
import { agentsRouter } from './routes/agents.js'
import { memoryRouter } from './routes/memory.js'
import { chatRouter } from './routes/chat.js'
import { hnRouter } from './routes/hn.js'
import { battlesRouter } from './routes/battles.js'
import { fleetRouter } from './routes/fleet.js'
import { leaderboardRouter } from './routes/leaderboard.js'
import { modelsRouter } from './routes/models.js'
import { logger } from './logger.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '2mb' }))
app.use((req, _res, next) => { logger(req); next() })

app.use('/api/health', healthRouter)
app.use('/api/agents', agentsRouter)
app.use('/api/memory', memoryRouter)
app.use('/api/chat', chatRouter)
app.use('/api/hn', hnRouter)
app.use('/api/battles', battlesRouter)
app.use('/api/fleet', fleetRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/models', modelsRouter)

app.get('/', (_req, res) => res.json({
  status: 'live',
  service: 'mr-backend-core',
  version: '1.0.0',
  endpoints: ['/api/health', '/api/agents', '/api/memory', '/api/chat', '/api/hn', '/api/battles', '/api/fleet', '/api/leaderboard', '/api/models']
}))

app.use((err, _req, res, _next) => {
  console.error('[ERR]', err.message)
  res.status(500).json({ error: 'internal', message: err.message })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`mr-backend-core listening on 0.0.0.0:${PORT}`)
})
