# MindReply — Production-Ready Docker Setup

**Keep every client conversation moving.**

A private operator layer for agencies, founders, consultants, and service teams. Fully containerized, wired with predictive AI, and ready for Cloudflare deployment.

## Architecture

```
┌─────────────────────────────────────────────────┐
│   Cloudflare (DNS, SSL, Route Protection)      │
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼────────────────────────────────┐
│  Docker Container (mindreply:latest)          │
├────────────────────────────────────────────────┤
│                                                │
│  Frontend Layer (React + TanStack)            │
│  ├─ Home (hero, proof dashboard)              │
│  ├─ Communication Audit (form)                │
│  ├─ ReplyControl Dashboard                    │
│  ├─ Pricing & Services                        │
│  └─ Private Desk (routes protected)           │
│                                                │
│  Backend Layer (Node.js + Express)            │
│  ├─ API: /api/communication-audit             │
│  ├─ API: /api/dashboard/replycontrol          │
│  ├─ API: /api/dashboard/proof                 │
│  ├─ API: /api/services/:service_slug          │
│  └─ Health: /health                           │
│                                                │
│  MCP Server (Port 3001)                       │
│  ├─ submit_communication_audit (public)       │
│  ├─ list_operators (public)                   │
│  ├─ get_pricing (public)                      │
│  └─ get_proof_metrics (public)                │
│                                                │
│  Predictive AI Layer (OpenAI)                 │
│  ├─ Revenue leakage analysis                  │
│  ├─ Stalled thread detection                  │
│  ├─ Next-action prioritization                │
│  └─ Risk scoring                              │
│                                                │
└──────────────┬───────────────────────────────┘
               │
       ┌───────┴────────────┬──────────────┐
       │                    │              │
   ┌───▼─────┐    ┌────────▼──┐   ┌──────▼───┐
   │PostgreSQL│    │   Redis   │   │ External │
   │          │    │  (Cache)  │   │ Services │
   │ Database │    │           │   │          │
   │          │    │  Sessions │   ├─ OpenAI │
   │ Supabase │    │  MCP Msgs │   ├─Supabase│
   │          │    │           │   ├─ n8n    │
   │ Leads    │    └───────────┘   ├─Salesf. │
   │ Actions  │                    ├─GitHub  │
   │ Approvals│                    ├─Zapier  │
   │ Receipts │                    ├─Crisp   │
   └──────────┘                    └─────────┘
```

## What's Included

### Frontend (React + Vite)
- **Home**: Hero with proof dashboard card, metrics, call-to-action
- **Communication Audit**: Lead capture form with revenue risk analysis
- **ReplyControl Dashboard**: Conversation board, follow-ups, stalled threads
- **Proof Metrics**: Real data visualization (messages, follow-ups, revenue protected)
- **Service Orders**: Website Completion, Chat Setup, Phone Recovery, etc.
- **Settings**: Integration status (Supabase, n8n, Salesforce, Cloudflare)

### Backend (Node.js + Express)
- **Authentication**: JWT-based, protected routes
- **Database**: PostgreSQL with Supabase schema
- **Communication Audit API**: Captures leads, generates revenue risk analysis
- **Dashboard APIs**: Real conversation data, proof metrics, next actions
- **Service Orders**: Creates tasks for approval workflow
- **Approvals Queue**: Owner review before any sensitive action
- **Proof Receipts**: Immutable log of all actions taken

### Predictive AI Layer
- **Revenue Leakage Detection**: GPT-4 analyzes communication patterns
- **Stalled Thread Ranking**: Identifies quiet clients, estimates trust decay
- **Next Action Prioritization**: Ranks actions by urgency and effectiveness
- **Risk Scoring**: 1-10 scale based on message stalls, follow-up delays, ownership gaps

### MCP Server (Port 3001)
Four public endpoints (no login required):
- `submit_communication_audit` — capture leads from anywhere
- `list_operators` — available service operators
- `get_pricing` — service pricing
- `get_proof_metrics` — live dashboard metrics

### Data Layer
- **PostgreSQL**: profiles, leads, actions, approvals, proof_receipts, service_orders, route_checks
- **Redis**: session storage, MCP message queue, caching
- **Supabase Ready**: schema and auth prepared for Supabase migration

## Files Structure

```
mindreply/
├── Dockerfile                    # Multi-stage build
├── docker-compose.yml            # Services: app, postgres, redis, pgadmin
├── .dockerignore                 # Build context optimization
├── .env.example                  # Required secrets
├── deploy.sh                     # Bash deployment helper
│
├── package.json                  # Node.js dependencies
├── vite.config.ts                # Vite frontend build
├── tsconfig.json                 # TypeScript config
├── tailwind.config.js            # TailwindCSS theme
├── postcss.config.js             # PostCSS plugins
│
├── src/                          # Frontend (React)
│   ├── main.tsx                  # Entry point
│   ├── App.tsx                   # Router
│   ├── index.css                 # Global styles
│   ├── pages/
│   │   └── Home.tsx              # Home page (hero + proof)
│   └── components/
│       ├── site-shell.tsx        # Layout wrapper
│       └── ui-bits.tsx           # Reusable UI components
│
├── server/                       # Backend (Node.js)
│   ├── index.js                  # Express + MCP server
│   └── db/
│       ├── schema.sql            # PostgreSQL tables
│       └── seed.sql              # Demo data
│
├── public/                       # Static assets (optional)
└── dist/                         # Built frontend (generated)
```

## Getting Started

### 1. Prerequisites
- Docker & Docker Compose installed
- (Optional) Supabase account and project
- (Optional) OpenAI API key for predictive features

### 2. Clone & Setup
```bash
cd /path/to/mindreply
cp .env.example .env
# Edit .env with your secrets
```

### 3. Build & Run Locally
```bash
# Using docker-compose (all-in-one)
docker compose up -d

# Or using the helper script (macOS/Linux)
bash deploy.sh
```

### 4. Verify
```bash
# Check health
curl http://localhost:3000/health

# View logs
docker compose logs -f app

# Test API
curl -X POST http://localhost:3000/api/communication-audit \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "company": "Test Co", "email": "test@example.com"}'

# Test MCP
curl http://localhost:3001/mcp/tools/get_proof_metrics
```

## Environment Variables

### Required
- `OPENAI_API_KEY` — OpenAI API key for predictive analysis
- `DATABASE_URL` — PostgreSQL connection string (default: `postgres://mindreply_user:password@postgres:5432/mindreply`)
- `JWT_SECRET` — Session token secret (change in production)

### Optional (for full integration)
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_KEY` — Supabase anon key
- `N8N_WEBHOOK_URL` — n8n workflow trigger
- `SALESFORCE_CLIENT_ID` — Salesforce OAuth client
- `SALESFORCE_CLIENT_SECRET` — Salesforce OAuth secret
- `SALESFORCE_INSTANCE_URL` — Salesforce instance

## API Endpoints

### Public
- `GET /health` — Health check
- `POST /mcp/*` — MCP server tools (public, no auth)

### Protected (requires JWT)
- `POST /api/communication-audit` — Submit audit form
- `GET /api/dashboard/replycontrol` — Conversation board
- `GET /api/dashboard/proof` — Proof metrics
- `POST /api/services/:service_slug` — Create service order
- `GET /api/approvals` — Approval queue

## Database Schema

### leads
Communication audit submissions. Includes revenue risk estimates.

### actions
Pending replies, follow-ups, tasks. Tracked with ownership and next action.

### approvals
Approval queue. Nothing sensitive sends without owner review.

### proof_receipts
Immutable log of all actions. Safe summaries only (no raw data).

### service_orders
Service requests (Website Completion, Chat Setup, etc.).

### route_checks
Health monitoring results.

## Deploying to Cloudflare

### Option 1: Cloudflare Pages (Static Frontend)
```bash
# Build frontend only
npm run build

# Deploy dist/ to Cloudflare Pages
wrangler pages deploy dist/
```

### Option 2: Cloudflare Workers + Docker
1. Push Docker image to Docker Hub or private registry
2. Deploy backend to Fly.io, Railway, or Render
3. Connect Cloudflare to backend via Worker reverse proxy

### Option 3: Docker on VPS (Recommended for Production)
```bash
# Build image
docker build -t mindreply:latest .

# Push to registry
docker push your-registry/mindreply:latest

# SSH into VPS
ssh user@your-vps.com

# Pull and run
docker pull your-registry/mindreply:latest
docker compose up -d

# Set up Cloudflare DNS to point to VPS
```

## Key Features

✅ **Predictive Revenue Protection**
- AI analyzes communication patterns
- Estimates monthly revenue leakage
- Ranks stalled threads by risk

✅ **Approval Layer**
- Nothing sensitive sends without owner review
- Immutable proof receipts
- Full audit trail

✅ **Multi-channel Ready**
- Email, Slack, CRM, phone integration hooks
- n8n workflow automation
- Salesforce CRM sync

✅ **Production-Ready**
- Multi-stage Docker build (optimized image size)
- Health checks and graceful shutdown
- Redis caching and session storage
- PostgreSQL for reliability
- Security: JWT, environment secrets, CORS

✅ **Extensible**
- MCP server for external tool access
- OpenAPI/REST for integrations
- Webhooks for n8n, Zapier
- Supabase auth and database ready

## Performance Targets

- **Image size**: ~150MB (multi-stage)
- **Build time**: ~2-3 minutes (with npm install)
- **Startup time**: <5 seconds
- **API response**: <200ms (with cache)
- **Dashboard refresh**: Real-time via Redis

## Security Notes

1. **No secrets in code** — All via environment variables
2. **No auto-send** — All actions require approval
3. **No auto-post** — Owner review enforced
4. **No payment activation** — Manual setup only
5. **Proof receipts** — Immutable action log
6. **CORS protected** — API only accepts from trusted origins

## What's Next

1. **Connect Supabase** → Replace local PostgreSQL with Supabase for live data
2. **Enable OpenAI** → Predictive analysis for revenue leakage and stalled threads
3. **Configure n8n** → Automate intake, follow-ups, and reporting
4. **Set up Salesforce** → Sync leads, opportunities, and tasks
5. **Deploy to Cloudflare** → Go live with CDN protection
6. **Add phone providers** → Integrate Quo, OpenPhone, or Aircall
7. **Set up monitoring** → DataDog, Sentry, or New Relic for production

## Support

Questions? Issues?
- Check logs: `docker compose logs -f app`
- Health: `http://localhost:3000/health`
- Rebuild: `docker compose build --no-cache && docker compose up -d`

---

**MindReply © 2026** — Private operator layer for client communication.
