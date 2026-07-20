# NEXT ACTIONS — Immediate Steps for Production Stabilization

**Generated**: 2025-01-17  
**Mission Phase**: Phase 1 — Unblock Backend & Security  
**Estimated Duration**: 1–2 hours

---

## IMMEDIATE (Next 30 minutes)

### Task 1: Create server/ Folder & Entry Point [Worker 3]
**Owner**: Worker 3 (Backend Controller)  
**Blocker Solved**: #3 (Missing server/ folder)

```bash
# Navigate to repo root
cd MRPRODUCTION/MindReply-revival

# Create folder
mkdir -p server

# Create Express entry point
cat > server/index.js << 'EOF'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

// API: Agents
app.get('/api/agents', (req, res) => {
  res.json({
    agents: [
      { id: '1', name: 'MindReply Director', status: 'active' },
      { id: '2', name: 'MindReply Analyst', status: 'active' }
    ]
  });
});

// API: Memory
app.get('/api/memory', (req, res) => {
  res.json({ entries: [], capacity: 1000 });
});

app.post('/api/memory', (req, res) => {
  const { key, value } = req.body;
  res.json({ stored: true, key, timestamp: new Date().toISOString() });
});

// API: Chat
app.post('/api/chat', (req, res) => {
  const { message, context } = req.body;
  res.json({
    reply: `Echo: ${message}`,
    context: context || {}
  });
});

// Root
app.get('/', (req, res) => {
  res.json({
    status: 'live',
    repo: 'MindReply',
    version: '1.0.0'
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`MindReply Backend listening on port ${port}`);
});
EOF
```

**Verify**:
```bash
# Check file exists
ls -la server/index.js

# Output expected:
# -rw-r--r--   1 user  group   1234 Jan 17 10:00 server/index.js
```

**Evidence**: Output screenshot showing file created

---

### Task 2: Run Security Scan [Worker 2]
**Owner**: Worker 2 (Security Controller)  
**Blocker Solved**: #4 (Secrets in git history)

```bash
# Navigate to repo root
cd MRPRODUCTION/MindReply-revival

# Scan git log for secrets (basic grep)
git log --all -p | grep -i "api_key\|secret\|token\|password" | head -20

# Expected: either clean output or list of matches

# Install git-secrets (if not present)
# brew install git-secrets  # macOS
# or download from https://github.com/awslabs/git-secrets

# Scan using git-secrets
git secrets --scan

# Expected: "OK" or list of issues
```

**If No Issues Found**:
```bash
# Create SECURITY_ROTATION.md
cat > ../SECURITY_ROTATION.md << 'EOF'
# Security Rotation Checklist

## Status: AUDIT COMPLETE — No Exposed Secrets Found

### Secrets Audit
- [x] Git history scanned (no leaked keys)
- [x] Current .env contains dev values only
- [x] .gitignore correctly excludes .env files
- [x] .env.example contains no real secrets

### Secrets To Rotate (on first production deployment)
1. **OPENAI_API_KEY**
   - [ ] Generate new key in OpenAI dashboard
   - [ ] Update .env.production in Vercel
   - [ ] Update GitHub Actions secrets

2. **JWT_SECRET**
   - [ ] Generate new random string (32+ chars)
   - [ ] Update .env.production
   - [ ] Re-sign any existing tokens (if needed)

3. **DB_PASSWORD**
   - [ ] Update Postgres password
   - [ ] Update DATABASE_URL
   - [ ] Update all services (docker-compose.prod.yml)

4. **TELEGRAM_BOT_TOKEN**
   - [ ] Regenerate in Telegram BotFather
   - [ ] Update .env.production

### Pre-Commit Hook Setup
- [ ] Run: git secrets --install
- [ ] Verify: .git/hooks/pre-commit exists
- [ ] Test: Try committing a fake secret (should fail)

### Rotation Schedule
- Initial: Upon first production deployment
- Annual: Each January 1st
- Emergency: Upon suspected compromise

## Completed By
Worker 2 (Security Controller)

## Evidence
- git log scan output (no secrets found)
- .env diff (no production secrets committed)
EOF
```

**If Issues Found**:
1. Document each issue
2. Create action items for owner
3. Do NOT push secrets to public repo
4. Rotate compromised secrets immediately

**Evidence**: Screenshot of git-secrets output or SECURITY_ROTATION.md completed

---

## SHORT-TERM (Next 1–2 hours)

### Task 3: Test Docker Build [Worker 3]
**Owner**: Worker 3 (Backend Controller)  
**Verify**: Dockerfile can build

```bash
# Navigate to repo root
cd MRPRODUCTION/MindReply-revival

# Build image (this will fail without npm install first)
# First, ensure dependencies are installed
npm install

# Now try docker build
docker build -t mindreply-app:dev .

# Expected output:
# [1/8] FROM node:20-alpine
# [2/8] WORKDIR /app
# ...
# [8/8] RUN npm run build
# Successfully tagged mindreply-app:dev
```

**If Build Fails**:
- Check error message
- Common issues:
  - npm install failed → check package.json / internet connection
  - Vite build failed → check app/ folder / tsconfig.json
  - Missing files → check COPY commands in Dockerfile

**Fix & Retry**:
```bash
# Clear docker cache and retry
docker build --no-cache -t mindreply-app:dev .
```

**Evidence**: Screenshot of successful docker build output

---

### Task 4: Test docker-compose up [Worker 3]
**Owner**: Worker 3 (Backend Controller)  
**Verify**: All services boot

```bash
# Navigate to repo root
cd MRPRODUCTION/MindReply-revival

# Start services
docker-compose up -d

# Wait for services to be healthy (~10–15 seconds)
sleep 15

# Check status
docker-compose ps

# Expected output:
# CONTAINER ID   IMAGE               STATUS              NAMES
# xxxxx          mindreply-app       healthy             mindreply-app
# xxxxx          postgres:16         healthy             mindreply-db
# xxxxx          redis:7             healthy             mindreply-cache
# xxxxx          pgadmin4            up                  mindreply-pgadmin
```

**If Any Service Unhealthy**:
```bash
# Check logs
docker-compose logs mindreply-app
docker-compose logs mindreply-db

# Common issues:
# - app: "ENOENT" → missing server/index.js (Task 1 fixes this)
# - postgres: connection refused → postgres still starting (wait longer)
# - redis: connection timeout → redis still starting
```

**Evidence**: Screenshot of `docker-compose ps` showing all healthy

---

### Task 5: Test Health Endpoint [Worker 3]
**Owner**: Worker 3 (Backend Controller)  
**Verify**: Backend responds

```bash
# Test health endpoint
curl http://localhost:3000/health

# Expected response:
# {"ok":true,"timestamp":"2025-01-17T10:00:00.000Z"}

# Test agents endpoint
curl http://localhost:3000/api/agents

# Expected response:
# {"agents":[{"id":"1","name":"MindReply Director","status":"active"},{"id":"2","name":"MindReply Analyst","status":"active"}]}
```

**If Request Fails**:
```bash
# Check if app is actually running
docker-compose ps | grep mindreply-app

# If not running, check logs
docker-compose logs mindreply-app

# Restart if needed
docker-compose restart mindreply-app
```

**Evidence**: Screenshot of curl responses (or terminal output)

---

### Task 6: Create API_CONTRACT.md [Worker 3]
**Owner**: Worker 3 (Backend Controller)  
**Purpose**: Document backend API for frontend integration

```bash
# Create file
cat > ../API_CONTRACT.md << 'EOF'
# API Contract — MindReply Backend

**Backend Base URL**: `/api` (rewrites to backend in production)  
**Version**: 1.0.0  
**Status**: Draft (endpoints respond, auth/DB not yet integrated)

---

## Endpoints

### Health Check
**GET** `/health`

Health check for backend readiness.

**Response (200 OK)**:
```json
{
  "ok": true,
  "timestamp": "2025-01-17T10:00:00.000Z"
}
```

---

### Agents
**GET** `/api/agents`

List available agents.

**Response (200 OK)**:
```json
{
  "agents": [
    { "id": "1", "name": "MindReply Director", "status": "active" },
    { "id": "2", "name": "MindReply Analyst", "status": "active" }
  ]
}
```

---

### Memory
**GET** `/api/memory`

Retrieve stored memory entries.

**Response (200 OK)**:
```json
{
  "entries": [],
  "capacity": 1000
}
```

---

**POST** `/api/memory`

Store a new memory entry.

**Request (Content-Type: application/json)**:
```json
{
  "key": "example_key",
  "value": { "data": "example" }
}
```

**Response (200 OK)**:
```json
{
  "stored": true,
  "key": "example_key",
  "timestamp": "2025-01-17T10:00:00.000Z"
}
```

---

### Chat
**POST** `/api/chat`

Send a message for processing.

**Request (Content-Type: application/json)**:
```json
{
  "message": "Hello MindReply",
  "context": { "agent": "Director" }
}
```

**Response (200 OK)**:
```json
{
  "reply": "Echo: Hello MindReply",
  "context": { "agent": "Director" }
}
```

---

## Notes
- All endpoints currently return mock data
- Database integration pending
- Authentication not yet implemented
- Real LLM integration pending

## Next Steps
1. Integrate with database (Postgres + Prisma)
2. Implement authentication (JWT)
3. Connect LLM backend (OpenAI / other)
4. Add memory persistence
5. Implement agent logic
EOF
```

**Verify**:
```bash
# Check file created
ls -la API_CONTRACT.md
```

**Evidence**: Content of API_CONTRACT.md

---

## CHECKLIST — Phase 1 Complete

- [ ] `server/index.js` created (Task 1)
- [ ] SECURITY_ROTATION.md created (Task 2)
- [ ] Docker build succeeds (Task 3)
- [ ] `docker-compose up` all services healthy (Task 4)
- [ ] `/health` endpoint responds 200 OK (Task 5)
- [ ] API_CONTRACT.md created (Task 6)

**Phase 1 Success Criteria**: All items checked ✓

---

## PHASE 2 (After Phase 1 Complete) — Begin UI Redesign

Once Phase 1 is verified:

1. **Worker 4**: Begin UI redesign
   - Create `app/shell/` folder with modular components
   - Implement scroll menu navigation
   - Add memory rail, agent panels, model panels
   - Design premium dark futuristic aesthetic
   - Connect to real API (now available)

2. **Worker 6**: Begin DNS setup
   - Create DNS_CHECKLIST.md with Cloudflare records
   - Prepare subdomain mapping

3. **Worker 7**: Fix CI/CD
   - Inspect `.github/workflows/`
   - Fix failing steps (if any)
   - Verify green build

---

## Critical Notes

### Security
- **Never commit real secrets** to the repository
- Use `.env.example` as template only
- Rotate all secrets before production deployment
- Use Vercel/GitHub secrets for production values

### Docker
- `docker-compose up` assumes Docker daemon is running
- First build may take 3–5 minutes
- Subsequent builds are cached (faster)
- Health checks take ~10 seconds to report healthy

### Testing
- Backend is currently **stubbed** (mock responses)
- Real integration with DB/LLM comes in Phase 2
- Frontend can build and connect now, but data is mock

---

## Estimated Completion

- **Phase 1**: 1–2 hours
- **Phase 2** (UI + DNS + CI/CD): 4–6 hours
- **Phase 3** (DNS verification + final deployment): 1–2 hours

**Total to Production**: ~8–10 hours

---

## Next: Report & Publish Phase 1 Results

Once all Phase 1 tasks are complete:
1. Collect screenshots/logs as evidence
2. Update LIVE_CHECK_REPORT.md with new status
3. Commit all changes with message: "stabilize backend, create API contract, begin security audit"
4. Push to main branch
5. Await Phase 2 worker approval

---

**Report Generated**: 2025-01-17  
**Owner**: Worker 1 (Repo Inspector)  
**Next Owner**: Worker 3 (Backend Controller) — Begin Task 1 immediately
