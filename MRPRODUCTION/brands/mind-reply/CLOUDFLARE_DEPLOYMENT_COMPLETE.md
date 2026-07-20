# 🚀 Complete Deployment Guide to Cloudflare

## What Gets Deployed

| Component | Platform | Purpose |
|-----------|----------|---------|
| Frontend (landing pages, dashboard) | Cloudflare Pages | Static + edge rendering |
| Backend API (nano-engine, auth) | Cloudflare Workers | Serverless compute |
| Database (Supabase) | Supabase (external) | PostgreSQL + auth |
| Email queue | Cloudflare Queues | Background jobs |
| Job processing | Cloudflare Workers | Parallel processing |
| Analytics | Cloudflare Analytics Engine | Real-time metrics |
| State management | Durable Objects | Experiment state, caching |
| Static assets | R2 (S3-compatible) | Images, videos |
| DNS | Cloudflare | mind-reply.com routing |

---

## Step 1: Setup (15 minutes)

### 1.1 Create Cloudflare Account
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login
wrangler login
# Opens browser, authorize
```

### 1.2 Create Workers Project
```bash
wrangler init mind-reply
cd mind-reply

# Choose:
# - TypeScript: yes
# - Git: yes
# - Deploy: no (we'll do it manually)
```

### 1.3 Setup Environment
```bash
# Create .env.local
cat > .env.local << 'EOF'
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://user:pass@localhost:5432/mindreply
ENVIRONMENT=production
EOF

# Don't commit this file
echo ".env.local" >> .gitignore
```

---

## Step 2: Configure Wrangler

Create `wrangler.toml`:

```toml
name = "mind-reply"
main = "src/worker.ts"
type = "javascript"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

# KV Namespace (for caching, analytics)
[[kv_namespaces]]
binding = "KV"
id = "your_kv_namespace_id"
preview_id = "preview_namespace_id"

# Durable Objects (for state management)
[[durable_objects.bindings]]
name = "CAMPAIGN_STATE"
class_name = "CampaignState"
script_name = "mind-reply"

# Queue consumers
[[queues.consumers]]
queue = "email-queue"
max_batch_size = 100
max_batch_timeout_ms = 1000

[[queues.consumers]]
queue = "analytics-queue"
max_batch_size = 1000
max_batch_timeout_ms = 5000

# R2 Bucket (for assets)
[[r2_buckets]]
binding = "BUCKET"
bucket_name = "mind-reply-assets"
preview_bucket_name = "mind-reply-assets-preview"

# Analytics (Beta)
[analytics_engine_datasets]
mind_reply_events = {}

# Environment: Production
[env.production]
name = "mind-reply-prod"
routes = [
  { pattern = "mind-reply.com/*", zone_id = "your_zone_id" },
  { pattern = "api.mind-reply.com/*", zone_id = "your_zone_id" }
]
vars = {
  ENVIRONMENT = "production",
  API_BASE_URL = "https://api.mind-reply.com"
}

# Environment: Staging
[env.staging]
name = "mind-reply-staging"
routes = [
  { pattern = "staging.mind-reply.com/*", zone_id = "your_zone_id" }
]
vars = {
  ENVIRONMENT = "staging",
  API_BASE_URL = "https://api-staging.mind-reply.com"
}

# Build
[build]
command = "npm run build"
cwd = "./"
watch_paths = ["src/**/*.ts", "src/**/*.tsx"]

[build.upload]
format = "service-worker"

# Triggers
[[triggers.crons]]
cron = "0 */6 * * *"  # Every 6 hours
```

---

## Step 3: Project Structure

```
mind-reply/
├── src/
│   ├── worker.ts           # Main Worker entry
│   ├── nano-engine.ts      # Prediction engine
│   ├── ab-testing.ts       # A/B framework
│   ├── durable-objects.ts  # State management
│   ├── routes/             # API routes
│   │   ├── auth.ts
│   │   ├── experiments.ts
│   │   ├── analytics.ts
│   │   └── webhooks.ts
│   └── utils/
│       ├── crypto.ts
│       ├── analytics.ts
│       └── email.ts
├── frontend/
│   ├── pages/
│   ├── components/
│   └── index.html
├── wrangler.toml
├── package.json
└── README.md
```

---

## Step 4: Build & Deploy

### 4.1 Build Frontend
```bash
cd frontend
npm run build
# Output: dist/

# This will be deployed to Cloudflare Pages
```

### 4.2 Build Backend
```bash
npm run build
# Compiles TypeScript → JavaScript
# Output: dist/
```

### 4.3 Deploy to Cloudflare Pages (Frontend)

#### Option A: Via CLI
```bash
wrangler pages deploy frontend/dist --project-name=mind-reply
```

#### Option B: Via GitHub (Recommended)
```bash
# Push to GitHub
git push origin main

# Cloudflare Pages automatically:
# 1. Clones repo
# 2. Runs: npm run build
# 3. Deploys dist/ to Cloudflare Pages

# Set this up in Cloudflare dashboard:
# Pages → Create project → Connect GitHub → Select repo
```

### 4.4 Deploy to Cloudflare Workers (Backend)

```bash
# Deploy to production
wrangler publish --env production

# Deploy to staging
wrangler publish --env staging

# Output:
# ✓ Uploaded mind-reply (XX KB)
# ✓ Published to https://mind-reply.your-account.workers.dev
```

### 4.5 Deploy Durable Objects

```bash
# Durable Objects are deployed with your Worker
# No extra step needed

# Verify:
wrangler deployments list
```

### 4.6 Setup Email Queue

```bash
# Create queue
wrangler queues create email-queue
wrangler queues create analytics-queue

# Consumer automatically runs when messages arrive
```

---

## Step 5: Setup DNS (mind-reply.com)

### 5.1 Point Domain to Cloudflare
1. Go to Cloudflare dashboard
2. Add site → mind-reply.com
3. Update DNS at registrar to point to Cloudflare nameservers

### 5.2 Configure DNS Records

```
Type    Name           Value                    Proxy
A       mind-reply.com 192.0.2.1 (auto)        Proxied
CNAME   www            mind-reply.pages.dev    Proxied
CNAME   api            mind-reply.workers.dev  Proxied
```

### 5.3 Enable HTTPS
```bash
# Automatic with Cloudflare
# Your site is now: https://mind-reply.com
```

---

## Step 6: Environment Variables

### 6.1 Add Secrets to Workers

```bash
# Add secret variables (not visible in code)
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_KEY
wrangler secret put OPENAI_API_KEY
wrangler secret put DATABASE_URL

# Verify they're set
wrangler secret list
```

### 6.2 Access in Code

```typescript
// In your Worker:
export default {
  fetch: async (request, env) => {
    const supabaseUrl = env.SUPABASE_URL
    const apiKey = env.OPENAI_API_KEY
    // Use them...
  },
}
```

---

## Step 7: Testing

### 7.1 Local Testing

```bash
# Run locally (before deploying)
wrangler dev

# Now available at:
# http://localhost:8787

# Make requests:
curl http://localhost:8787/api/nano/stats
```

### 7.2 Staging Deployment

```bash
# Deploy to staging only
wrangler publish --env staging

# Test at:
# https://staging.mind-reply.com
```

### 7.3 Smoke Tests

```bash
# After production deploy:
npm run test:smoke

# Checks:
# - Home page loads
# - API responds
# - Database connects
# - Email queue works
```

---

## Step 8: Monitoring

### 8.1 View Logs

```bash
# Real-time logs from production
wrangler tail --env production

# Example output:
# 15:32:10 | POST /api/signup | 200 | 245ms
# 15:32:15 | GET /experiments | 200 | 12ms
```

### 8.2 Analytics

```bash
# View in Cloudflare dashboard:
# Workers → mind-reply → Analytics

# Metrics:
# - Requests
# - Response time
# - Error rate
# - CPU time
```

### 8.3 Error Tracking

```bash
# Errors appear in:
# Workers → mind-reply → Logs

# Or integrate Sentry:
npm install @sentry/node

import * as Sentry from '@sentry/node'

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: 'production',
})
```

---

## Step 9: Parallel Processing Setup

### 9.1 Email Queue

```bash
# This runs in the background, asynchronously

# Frontend sends signup:
fetch('/api/signup', { method: 'POST', body: {...} })

# Backend queues email job:
await env.EMAIL_QUEUE.send({
  type: 'welcome_email',
  to: 'user@example.com',
  name: 'John'
})

# Worker processes in parallel:
// In queue consumer
export async function handleEmailQueue(batch, env) {
  for (const msg of batch.messages) {
    await sendEmail(msg.body)
  }
}
```

### 9.2 Analytics Queue

```bash
# Every event goes to analytics queue

// Frontend tracks:
trackEvent('landing_view', { page: 'founder' })

// Backend queues:
await env.ANALYTICS_QUEUE.send({
  event: 'landing_view',
  page: 'founder',
  timestamp: new Date()
})

// Processes in parallel (doesn't block main request)
```

---

## Step 10: Scale & Optimize

### 10.1 Caching

```typescript
// Cache responses with Cloudflare Cache API
async function handleRequest(request) {
  const cache = caches.default
  
  // Check cache
  const response = await cache.match(request)
  if (response) return response

  // No cache, fetch from origin
  const fresh = await fetch(request)
  
  // Cache for 1 hour
  fresh.headers.set('Cache-Control', 'public, max-age=3600')
  cache.put(request, fresh.clone())
  
  return fresh
}
```

### 10.2 Rate Limiting

```typescript
// Prevent abuse
const rateLimiter = {
  async isAllowed(ip: string): Promise<boolean> {
    const key = `rate:${ip}`
    const count = await kv.get(key)
    
    if (!count) {
      await kv.put(key, '1', { expirationTtl: 60 })
      return true
    }
    
    if (parseInt(count) > 100) return false // 100 requests per minute
    
    await kv.put(key, (parseInt(count) + 1).toString(), { expirationTtl: 60 })
    return true
  }
}
```

### 10.3 Database Connection Pooling

```typescript
// Use connection pool to Supabase
import { Pool } from '@supabase/supabase-js'

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 10,
})

// Reuse connections across requests
```

---

## Step 11: Continuous Deployment

### 11.1 GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - run: npm install
      - run: npm run build
      
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          secrets: |
            SUPABASE_URL
            SUPABASE_KEY
            OPENAI_API_KEY
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_KEY: ${{ secrets.SUPABASE_KEY }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

### 11.2 Deploy Script

```bash
#!/bin/bash
# deploy.sh

set -e

echo "🚀 Deploying Mind-Reply..."

# Build
npm run build

# Deploy
echo "📤 Deploying to Cloudflare..."
wrangler publish --env production

echo "✅ Deployed successfully!"
echo "Frontend: https://mind-reply.com"
echo "API: https://api.mind-reply.com"
echo "Check status: https://dash.cloudflare.com"
```

Run: `bash deploy.sh`

---

## Step 12: Post-Deployment Checklist

- [ ] Frontend loads at https://mind-reply.com
- [ ] API responds at https://api.mind-reply.com/api/health
- [ ] Database connects (test query)
- [ ] Email queue processes (test signup)
- [ ] Analytics tracks events
- [ ] A/B tests assign variants
- [ ] Nano-engine initializes
- [ ] Logs appear in Cloudflare dashboard
- [ ] SSL certificate is valid
- [ ] DNS resolves correctly
- [ ] No 5xx errors in logs
- [ ] Performance is <500ms median

---

## Everything Now Works in Parallel

```
┌─────────────┐
│   Browser   │  Visit mind-reply.com
└──────┬──────┘
       │
       ▼
┌─────────────────────────────┐
│  Cloudflare Pages (Frontend)│  Serves landing page
└──────┬──────────────────────┘
       │ (User submits signup form)
       ▼
┌──────────────────────┐
│ Cloudflare Workers   │  Processes signup
│ (Backend API)        │
└──┬───────────┬───┬───┘
   │           │   │
   ▼           ▼   ▼
  DB        Email  Analytics
 Save       Queue  Queue
 User       (async) (async)
           │        │
           ▼        ▼
      SendGrid  Analytics
      sends     Engine
      email     processes

All in parallel. Nothing blocks.
```

---

## Cost Estimate

| Service | Price | Notes |
|---------|-------|-------|
| Workers | $5-50/mo | Millions of requests included |
| Pages | Free | Unlimited deployments |
| KV | $0.50/mo | First 10K ops free |
| Durable Objects | $0.15/mo | First 10M ops free |
| Queues | Free | First 10M msgs/month free |
| R2 | $0.015/GB | First 10GB free |
| Analytics | Free | Included with Workers |

**Total: ~$10-50/month for complete deployment**

(Compare to AWS: $200-500/month for same infrastructure)

---

You now have:
✅ Full production deployment
✅ Auto-scaling infrastructure
✅ Real-time analytics
✅ Parallel job processing
✅ Edge computing worldwide
✅ SSL/HTTPS automatic
✅ 99.9% uptime SLA
✅ All for <$50/month

Deploy now with: `wrangler publish --env production`
