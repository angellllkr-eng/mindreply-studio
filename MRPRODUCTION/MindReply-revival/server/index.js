import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  if (isDev) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  }
  next();
});

// ============================================
// HEALTH CHECK
// ============================================
app.get('/health', (req, res) => {
  res.status(200).json({
    ok: true,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    service: 'MindReply Backend'
  });
});

// ============================================
// ROOT
// ============================================
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'live',
    repo: 'MindReply',
    version: '1.0.0',
    message: 'MindReply Backend API',
    docs: 'See /api/docs or API_CONTRACT.md in repo'
  });
});

// ============================================
// API: AGENTS
// ============================================
app.get('/api/agents', (req, res) => {
  // Mock agent list (real data will come from database)
  res.status(200).json({
    agents: [
      {
        id: 'director',
        name: 'MindReply Director',
        status: 'active',
        description: 'Strategic decision-making agent',
        version: '1.0.0'
      },
      {
        id: 'analyst',
        name: 'MindReply Analyst',
        status: 'active',
        description: 'Data analysis and insights',
        version: '1.0.0'
      },
      {
        id: 'executor',
        name: 'MindReply Executor',
        status: 'active',
        description: 'Task execution and automation',
        version: '1.0.0'
      }
    ],
    timestamp: new Date().toISOString()
  });
});

// ============================================
// API: MODELS
// ============================================
app.get('/api/models', (req, res) => {
  // Mock model list (real data from OpenAI/Anthropic/etc.)
  res.status(200).json({
    models: [
      {
        id: 'gpt-4',
        name: 'GPT-4',
        provider: 'OpenAI',
        status: 'available'
      },
      {
        id: 'claude-3-opus',
        name: 'Claude 3 Opus',
        provider: 'Anthropic',
        status: 'available'
      },
      {
        id: 'grok-3',
        name: 'Grok 3',
        provider: 'xAI',
        status: 'available'
      }
    ],
    timestamp: new Date().toISOString()
  });
});

// ============================================
// API: MEMORY (Get)
// ============================================
app.get('/api/memory', (req, res) => {
  // Mock memory entries (real data from database)
  res.status(200).json({
    entries: [],
    capacity: 1000,
    used: 0,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// API: MEMORY (Post)
// ============================================
app.post('/api/memory', (req, res) => {
  const { key, value } = req.body;

  // Validate input
  if (!key || value === undefined) {
    return res.status(400).json({
      error: 'Missing required fields: key, value',
      timestamp: new Date().toISOString()
    });
  }

  // Mock store
  res.status(201).json({
    stored: true,
    key,
    value,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// API: MEMORY (Delete)
// ============================================
app.delete('/api/memory/:key', (req, res) => {
  const { key } = req.params;

  res.status(200).json({
    deleted: true,
    key,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// API: CHAT
// ============================================
app.post('/api/chat', (req, res) => {
  const { message, context = {} } = req.body;

  if (!message) {
    return res.status(400).json({
      error: 'Missing required field: message',
      timestamp: new Date().toISOString()
    });
  }

  // Mock response (real LLM integration pending)
  res.status(200).json({
    reply: `Echo from MindReply: ${message}`,
    context,
    processing_time_ms: 42,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// API: STATUS
// ============================================
app.get('/api/status', (req, res) => {
  res.status(200).json({
    status: 'operational',
    components: {
      database: 'connected',
      cache: 'connected',
      api: 'operational',
      workers: 'operational'
    },
    timestamp: new Date().toISOString()
  });
});

// ============================================
// API: AUTH (Stub)
// ============================================
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Missing email or password',
      timestamp: new Date().toISOString()
    });
  }

  // Mock auth response (real auth pending)
  res.status(200).json({
    authenticated: true,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock.token',
    user: {
      id: 'user_123',
      email,
      role: 'owner'
    },
    timestamp: new Date().toISOString()
  });
});

app.get('/api/auth/user', (req, res) => {
  // Mock: assume bearer token exists
  res.status(200).json({
    user: {
      id: 'user_123',
      email: 'owner@mindreply.com',
      role: 'owner',
      authenticated: true
    },
    timestamp: new Date().toISOString()
  });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`, err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: isDev ? err.message : 'An error occurred',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// START SERVER
// ============================================
app.listen(port, () => {
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`🚀 MindReply Backend Server`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📍 Listening on: http://0.0.0.0:${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⚙️  Uptime: Ready`);
  console.log(`\n✅ Health check: GET http://localhost:${port}/health`);
  console.log(`📚 API root: GET http://localhost:${port}/`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});
