# Quick Start — MindReply Docker

## 30-Second Setup

```bash
cd C:\Users\skyri\mindreply

# Copy environment template
copy .env.example .env

# Edit .env and add:
# - OPENAI_API_KEY=sk-...
# - SUPABASE_URL=https://...
# - SUPABASE_KEY=...

# Start all services
docker compose up -d

# Wait 10 seconds, then verify
curl http://localhost:3000/health
```

You should see:
```json
{"status":"ok","timestamp":"2026-07-10T..."}
```

## What Just Started?

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:3000 | React home page + dashboard |
| **API** | http://localhost:3000/api | Backend endpoints |
| **MCP** | http://localhost:3001/mcp | Public tools (no login) |
| **Database** | postgres:5432 | PostgreSQL (local dev) |
| **Cache** | redis:6379 | Redis sessions & queue |
| **PgAdmin** | http://localhost:5050 | Database browser (dev only) |

## Test It

### Submit Communication Audit
```bash
curl -X POST http://localhost:3000/api/communication-audit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah Chen",
    "company": "Acme Studio",
    "email": "sarah@acme.com",
    "website": "https://acme.com",
    "businessType": "Design Agency",
    "whereMessages": "Email, Slack, portal",
    "biggestProblem": "Slow follow-ups, lost deals",
    "weeklyConversations": 45,
    "whoFollowsUp": "No clear owner",
    "neverAutomate": "Approvals, payments",
    "requiresApproval": "All client replies",
    "desiredResult": "100% reply within 24h",
    "preferredPackage": "ReplyControl Setup",
    "notes": "Agencies lose 15% of deals to slow follow-ups"
  }'
```

Response (with AI analysis):
```json
{
  "success": true,
  "leadId": "uuid-here",
  "analysis": {
    "monthly_revenue_leakage_percent": 15.5,
    "risk_score": 7,
    "top_3_moves": [
      "Set up ownership matrix: one owner per thread",
      "Create auto-draft follow-ups (no auto-send)",
      "Weekly proof dashboard review"
    ],
    "recommended_next_action": "Communication audit discovery call"
  }
}
```

### Get Proof Metrics
```bash
curl http://localhost:3001/mcp/tools/get_proof_metrics
```

Response:
```json
{
  "messages_reviewed": 12480,
  "follow_ups_due": 38,
  "stalled_threads": 17,
  "revenue_protected": 42900
}
```

### Get Pricing
```bash
curl http://localhost:3001/mcp/tools/get_pricing
```

## View Logs

```bash
# Real-time logs
docker compose logs -f app

# Database logs
docker compose logs -f postgres

# Cache logs
docker compose logs -f redis

# All services
docker compose logs -f
```

## Stop Services

```bash
docker compose down

# Also remove database volume
docker compose down -v
```

## Common Commands

```bash
# Check status
docker compose ps

# Rebuild after code changes
docker compose build && docker compose up -d

# SSH into database
docker compose exec postgres psql -U mindreply_user -d mindreply

# Tail specific service
docker compose logs -f app --tail 100

# Inspect network
docker network inspect mindreply_mindreply-network
```

## Key Environment Variables (Edit in .env)

```bash
# Required for predictive AI
OPENAI_API_KEY=sk-your-key-here

# Optional: Connect real Supabase project
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key

# Change in production
JWT_SECRET=mindreply_jwt_dev_secret_change_in_production

# Database (usually fine as-is)
DB_PASSWORD=mindreply_dev_password
```

## Next Steps

1. ✅ **Local testing**: Submit an audit, check proof metrics
2. 🔌 **Connect Supabase**: Update .env, restart (`docker compose up -d`)
3. 📊 **Build dashboard**: Create `/dashboard`, `/dashboard/today`, `/dashboard/approvals`
4. 🚀 **Deploy**: `docker push mindreply:latest` → Cloudflare/VPS
5. 🔗 **Integrate n8n**: Wire communication audit → n8n workflow
6. 📱 **Add phone**: Integrate Quo, OpenPhone, or Aircall

## Troubleshooting

**"Port 3000 already in use"**
```bash
docker ps | grep 3000
docker stop <container-id>
# Or use different port: docker compose up -p 8000:3000
```

**"Database connection refused"**
```bash
# Wait a bit longer for postgres to start
docker compose logs postgres

# Restart database
docker compose restart postgres
```

**"npm install slow/timeout"**
- Rebuild with larger timeout: `docker build --build-arg BUILD_TIMEOUT=600 .`
- Or build locally first: `npm install && docker build .`

**"OpenAI key not working"**
```bash
# Check .env is loaded
docker compose exec app env | grep OPENAI

# Verify key format
# Should be: sk-... (not sk-proj-...)
```

---

Questions? See **DEPLOYMENT.md** for full docs.
