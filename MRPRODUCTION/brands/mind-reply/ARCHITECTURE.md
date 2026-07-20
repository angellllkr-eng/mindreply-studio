```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     MindReply — Complete Architecture                      │
└─────────────────────────────────────────────────────────────────────────────┘

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  🌐 CLOUDFLARE (DNS, SSL, CDN, DDoS Protection)                           ┃
┗━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                    │
            ┌───────▼────────┐
            │ mind-reply.com │
            └────────┬────────┘
                    │
┏━━━━━━━━━━━━━━━━━━━▼━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  🐳 DOCKER CONTAINER (mindreply:latest)                               ┃
┃                                                                         ┃
┃  Port 3000:                                                            ┃
┃  ┌──────────────────────────────────────────────────────────┐         ┃
┃  │ ⚛️  FRONTEND (React + Vite)                              │         ┃
┃  ├──────────────────────────────────────────────────────────┤         ┃
┃  │ GET  /                 → Home (hero + proof dashboard)  │         ┃
┃  │ GET  /communication-audit   → Lead capture form         │         ┃
┃  │ GET  /replycontrol     → Conversation board             │         ┃
┃  │ GET  /pricing          → Service menu                   │         ┃
┃  │ GET  /dashboard/*      → Private operator desk          │         ┃
┃  └──────────────────────────────────────────────────────────┘         ┃
┃                           ▲                                             ┃
┃                           │ Express Router                              ┃
┃                           ▼                                             ┃
┃  ┌──────────────────────────────────────────────────────────┐         ┃
┃  │ 🔧 BACKEND (Express + Node.js)                          │         ┃
┃  ├──────────────────────────────────────────────────────────┤         ┃
┃  │                                                          │         ┃
┃  │ Communication Audit Route                               │         ┃
┃  │ ────────────────────────────────────────────           │         ┃
┃  │ POST /api/communication-audit                          │         ┃
┃  │ ├─ Capture: name, company, email, website             │         ┃
┃  │ ├─ OpenAI GPT-4 Analysis:                             │         ┃
┃  │ │  ├─ Monthly revenue leakage %                        │         ┃
┃  │ │  ├─ Risk score (1-10)                               │         ┃
┃  │ │  ├─ Top 3 revenue protection moves                  │         ┃
┃  │ │  └─ Recommended next action                         │         ┃
┃  │ ├─ Save to PostgreSQL (leads table)                   │         ┃
┃  │ └─ Create approval item (approval queue)              │         ┃
┃  │                                                          │         ┃
┃  │ Dashboard APIs                                          │         ┃
┃  │ ────────────────────────────────────────────           │         ┃
┃  │ GET /api/dashboard/replycontrol                        │         ┃
┃  │ ├─ Pending replies (from DB)                          │         ┃
┃  │ ├─ Follow-ups due (OpenAI ranked)                     │         ┃
┃  │ ├─ Stalled threads (quiet > 3 days)                   │         ┃
┃  │ └─ Next actions (prioritized by risk)                 │         ┃
┃  │                                                          │         ┃
┃  │ GET /api/dashboard/proof                               │         ┃
┃  │ ├─ Messages reviewed: 12,480                          │         ┃
┃  │ ├─ Follow-ups due: 38                                 │         ┃
┃  │ ├─ Stalled threads: 17                                │         ┃
┃  │ └─ Revenue protected: €42,900                         │         ┃
┃  │                                                          │         ┃
┃  │ Service Orders                                          │         ┃
┃  │ ────────────────────────────────────────────           │         ┃
┃  │ POST /api/services/:service_slug                       │         ┃
┃  │ ├─ Service: Website Completion, Chat Setup, etc.     │         ┃
┃  │ ├─ Save to service_orders table                       │         ┃
┃  │ └─ Create approval (no auto-send)                     │         ┃
┃  │                                                          │         ┃
┃  │ Health Check                                            │         ┃
┃  │ ────────────────────────────────────────────           │         ┃
┃  │ GET /health → {"status":"ok","timestamp":"..."}       │         ┃
┃  │                                                          │         ┃
┃  └──────────────────────────────────────────────────────────┘         ┃
┃                           ▲                                             ┃
┃                           │ Queries / Commands                          ┃
┃                           ▼                                             ┃
┃  ┌──────────────────────────────────────────────────────────┐         ┃
┃  │ 🤖 AI LAYER (OpenAI Integration)                        │         ┃
┃  ├──────────────────────────────────────────────────────────┤         ┃
┃  │ Model: gpt-4-turbo                                     │         ┃
┃  │                                                          │         ┃
┃  │ Predictive Functions:                                  │         ┃
┃  │ ├─ Revenue Leakage: Analyzes communication patterns    │         ┃
┃  │ ├─ Risk Scoring: 1-10 based on stalled threads        │         ┃
┃  │ ├─ Thread Ranking: Prioritizes by urgency & value     │         ┃
┃  │ └─ Next-Action Suggestion: Recommends moves           │         ┃
┃  │                                                          │         ┃
┃  │ Prompt Engineering:                                    │         ┃
┃  │ ├─ Communication audit analysis                        │         ┃
┃  │ ├─ Revenue risk estimation                            │         ┃
┃  │ ├─ Stalled thread detection                           │         ┃
┃  │ └─ Action prioritization                              │         ┃
┃  │                                                          │         ┃
┃  │ JSON Response Format (structured output)               │         ┃
┃  │ └─ Ensures reliable parsing & integration              │         ┃
┃  │                                                          │         ┃
┃  └──────────────────────────────────────────────────────────┘         ┃
┃                           ▲                                             ┃
┃                           │ Query                                       ┃
┃                           ▼                                             ┃
┃  ┌──────────────────────────────────────────────────────────┐         ┃
┃  │ 🌐 MCP SERVER (Port 3001)                              │         ┃
┃  ├──────────────────────────────────────────────────────────┤         ┃
┃  │ Public endpoints (no auth required):                   │         ┃
┃  │                                                          │         ┃
┃  │ POST /mcp/tools/submit_communication_audit             │         ┃
┃  │ ├─ Accessible from external apps / Claude / agents    │         ┃
┃  │ └─ Captures leads into MindReply                       │         ┃
┃  │                                                          │         ┃
┃  │ GET  /mcp/tools/list_operators                         │         ┃
┃  │ ├─ Returns available service operators                 │         ┃
┃  │ └─ Integrated with operator assignment                 │         ┃
┃  │                                                          │         ┃
┃  │ GET  /mcp/tools/get_pricing                            │         ┃
┃  │ ├─ Service pricing for sales pages                     │         ┃
┃  │ └─ Queryable from external agents                      │         ┃
┃  │                                                          │         ┃
┃  │ GET  /mcp/tools/get_proof_metrics                      │         ┃
┃  │ ├─ Live dashboard metrics                              │         ┃
┃  │ ├─ Messages reviewed, follow-ups, stalled, revenue    │         ┃
┃  │ └─ Embedded in sales presentations                     │         ┃
┃  │                                                          │         ┃
┃  └──────────────────────────────────────────────────────────┘         ┃
┃                           ▲                                             ┃
┃                           │ Request                                     ┃
┃                           ▼                                             ┃
┃  ┌──────────────────────────────────────────────────────────┐         ┃
┃  │ 💾 DATA LAYER                                           │         ┃
┃  ├──────────────────────────────────────────────────────────┤         ┃
┃  │                                                          │         ┃
┃  │ PostgreSQL (Port 5432)                                 │         ┃
┃  │ ├─ profiles: Users & roles                            │         ┃
┃  │ ├─ leads: Communication audits + risk data            │         ┃
┃  │ ├─ actions: Pending replies, follow-ups              │         ┃
┃  │ ├─ approvals: Approval queue                         │         ┃
┃  │ ├─ proof_receipts: Immutable action log              │         ┃
┃  │ ├─ service_orders: Service requests                  │         ┃
┃  │ └─ route_checks: Health monitoring                   │         ┃
┃  │                                                          │         ┃
┃  │ Redis (Port 6379)                                      │         ┃
┃  │ ├─ Sessions: User login state                         │         ┃
┃  │ ├─ Cache: API response caching                        │         ┃
┃  │ ├─ MCP Queue: Message processing                      │         ┃
┃  │ └─ Real-time: WebSocket message broadcasting          │         ┃
┃  │                                                          │         ┃
┃  └──────────────────────────────────────────────────────────┘         ┃
┃                                                                         ┃
┃  🏥 HEALTH CHECK (Automated)                                            ┃
┃  ├─ Liveness: App responds to /health every 30s                       ┃
┃  ├─ Readiness: PostgreSQL & Redis healthy before serving              ┃
┃  └─ Auto-restart if unhealthy                                          ┃
┃                                                                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  🔌 EXTERNAL INTEGRATIONS (Wired, Ready to Activate)                     ┃
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
│                                                                          │
│  OpenAI (GPT-4)                    Supabase                  n8n         │
│  ├─ Predictive analysis            ├─ Auth (via env)       ├─ Webhooks  │
│  ├─ Revenue leakage                ├─ Database (migrate)   ├─ Workflows │
│  ├─ Stalled detection              └─ Storage              └─ Reports   │
│  └─ Risk scoring                                                        │
│                                                                          │
│  Salesforce                        Zapier                  GitHub        │
│  ├─ Lead sync (OAuth)             ├─ Integrations        ├─ Deployment │
│  ├─ Opportunity creation           ├─ Triggers            ├─ Secrets    │
│  ├─ Task assignment                └─ Multi-app wiring    └─ CI/CD      │
│  └─ CRM record updates                                                  │
│                                                                          │
│  Crisp / Tidio / Intercom          Phone Providers        Cloudflare    │
│  ├─ Chat widget                    ├─ Quo / OpenPhone    ├─ DNS        │
│  ├─ Visitor tracking               ├─ Aircall            ├─ SSL        │
│  ├─ Message routing                ├─ Smith.ai           ├─ CDN        │
│  └─ Agent assignment               └─ Missed call log     └─ DDoS Prot. │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  📊 DATA FLOW EXAMPLE                                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

1️⃣  User submits communication audit form (Home page)
    ↓
2️⃣  Frontend POST to /api/communication-audit
    ↓
3️⃣  Backend receives request → validates → prepares prompt
    ↓
4️⃣  OpenAI GPT-4 analyzes:
    • Weekly conversations: 45
    • Problem: "Clients expect fast replies, we miss follow-ups"
    • Desired result: "100% reply within 24h"
    ↓
5️⃣  AI returns JSON:
    {
      "monthly_revenue_leakage_percent": 15.5,
      "risk_score": 7,
      "top_3_moves": [
        "Set up ownership matrix",
        "Create auto-draft follow-ups (no auto-send)",
        "Weekly proof dashboard review"
      ]
    }
    ↓
6️⃣  Backend saves to PostgreSQL (leads table)
    ↓
7️⃣  Backend creates approval item (approval queue)
    ↓
8️⃣  Frontend receives response with leadId & analysis
    ↓
9️⃣  User sees revenue risk dashboard
    ↓
🔟 Operator logs in → Reviews approval → Next actions assigned


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  🚀 DEPLOYMENT OPTIONS                                                  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Option A: Cloudflare Pages (Frontend) + VPS Backend
┌─────────────────────────┐      ┌──────────────────────┐
│ Cloudflare Pages (dist/)│──────│ VPS Docker Container │
│ • No server runtime     │      │ • Full stack in box  │
│ • Global edge caching   │      │ • Your control       │
│ • API routes to VPS     │      │ • Simple docker-ps   │
└─────────────────────────┘      └──────────────────────┘

Option B: Full Docker on VPS
┌──────────────────────────────┐
│ VPS (Linode / DigitalOcean)  │
│ docker-compose up -d         │
│ • Frontend + Backend + DB    │
│ • Cloudflare DNS pointing    │
│ • Auto SSL via Certbot       │
└──────────────────────────────┘

Option C: Railway / Fly.io
┌──────────────────────────────┐
│ Railway / Fly.io            │
│ git push → auto deploy      │
│ • Managed containers        │
│ • Auto scaling              │
│ • PostgreSQL & Redis managed│
└──────────────────────────────┘

All options: Point Cloudflare DNS to your host


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ✅ SECURITY & COMPLIANCE                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

✓ No secrets in code (all via .env)
✓ No auto-send (approval layer enforced)
✓ No auto-post (owner review required)
✓ JWT authentication on protected routes
✓ CORS configured (trusted origins only)
✓ Immutable proof receipts (audit trail)
✓ Redis sessions (secure cookie handling)
✓ PostgreSQL encryption (at rest & in transit)
✓ Environment variable rotation recommended
✓ Regular secrets scanning (pre-commit hooks)


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  📈 PERFORMANCE TARGETS                                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Docker Image:          ~150MB (optimized multi-stage)
Build Time:            ~2-3 minutes (npm install cached on rebuild)
Cold Start:            <5 seconds
API Response:          <200ms (with Redis cache)
Dashboard Refresh:     Real-time (WebSocket ready)
Database Queries:      <50ms (with indexing)
OpenAI Call:           ~1-2 seconds (async, can optimize)
Concurrent Users:      500+ (horizontal scaling ready)


📖 FULL DOCUMENTATION: See START_HERE.md, QUICKSTART.md, DEPLOYMENT.md

```
