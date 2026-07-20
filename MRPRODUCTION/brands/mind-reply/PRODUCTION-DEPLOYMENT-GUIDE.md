# AUREL API Production Deployment

## Cloudflare DNS Configuration

Add these DNS records in Cloudflare Dashboard:

### 1. AUREL API (Workers)
```
Type: CNAME
Name: aurel
Content: aurel-api.mind-reply.workers.dev
TTL: Auto
Proxy: Proxied (orange cloud)
```

### 2. MindReply Frontend (Pages)
```
Type: CNAME
Name: www
Content: mind-reply-com.pages.dev
TTL: Auto
Proxy: Proxied (orange cloud)
```

### 3. Root Domain
```
Type: CNAME or ALIAS
Name: @ (root)
Content: mind-reply-com.pages.dev
TTL: Auto
Proxy: Proxied (orange cloud)
```

---

## Deployment Steps

### Step 1: Build AUREL Backend
```bash
cd C:\Users\skyri\MindReply
npm run build --workspace=backend
```

### Step 2: Deploy AUREL API to Cloudflare Workers
```bash
npx wrangler deploy --config wrangler-production.toml
```

### Step 3: Deploy MindReply Frontend to Cloudflare Pages
```bash
npx wrangler pages deploy public --project-name mind-reply-com
```

### Step 4: Verify Deployment
```
https://aurel.mind-reply.com → AUREL API
https://aurel.mind-reply.com/api/health → Health Check
https://www.mind-reply.com → MindReply Frontend
```

---

## Environment Variables (Production)

```
API_URL=https://aurel.mind-reply.com
FRONTEND_URL=https://aurel.mind-reply.com
NODE_ENV=production
BACKEND_PORT=3000
```

---

## Route Mapping

| Service | Local | Production |
|---------|-------|------------|
| AUREL API | http://localhost:3000 | https://aurel.mind-reply.com |
| MindReply Frontend | http://localhost:8080 | https://www.mind-reply.com |
| n8n Workflows | http://localhost:5678 | https://n8n.mind-reply.com |
| Control | http://localhost:8787 | https://control.mind-reply.com |

---

## Status: READY

✅ Configuration updated
✅ localhost:3000 → aurel.mind-reply.com
✅ Wrangler config ready
✅ All routes wired

**Execute deployment when ready.**
