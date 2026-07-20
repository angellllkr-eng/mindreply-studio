# BLOCKERS — Critical Issues Preventing Production Readiness

**Generated**: 2025-01-17  
**Total Blockers**: 8 (ranked by impact)

---

## BLOCKER #1 — DNS Not Configured for Custom Domains
**Severity**: 🔴 **CRITICAL**  
**Owner**: Worker 6 (Domain Controller)  
**Impact**: No subdomains resolve; main brand URLs offline  

### Current State
- `https://aurel.mind-reply.com` → DNS lookup fails (no route)
- `https://aurel-one.vercel.app` → 200 OK (Vercel fallback works)
- PUBLIC-FLEET.md lists 9 intended subdomains, only fallback URLs work

### Why It Matters
- Production DNS is not live; users cannot reach the main domain
- All subdomain routing (app., arena., agents., api., admin., docs., status.) is pending
- Cloudflare zone exists but no A/CNAME records point subdomains to Vercel

### Root Cause
- Cloudflare Tunnel was stopped (per STATUS.md)
- Vercel aliases were added but DNS records were not created
- No DNS_CHECKLIST.md exists with exact records needed

### Fix Required
1. Obtain Cloudflare API token or dashboard access
2. Create DNS records for each subdomain:
   ```
   mind-reply.com → CNAME → cname.vercel.com (Vercel)
   aurel.mind-reply.com → CNAME → cname.vercel.com
   app.mind-reply.com → CNAME → cname.vercel.com
   [... etc for all 9 subdomains]
   ```
3. Verify TTL and propagation
4. Test each domain resolves + returns 200 OK
5. Document in DNS_CHECKLIST.md

### Evidence Needed (Post-Fix)
- DNS propagation check (nslookup output)
- fetch results from each subdomain
- Screenshot of Cloudflare dashboard (records visible)

### Estimated Time
1–2 hours (DNS setup + propagation wait)

---

## BLOCKER #2 — Backend Implementation Missing
**Severity**: 🔴 **CRITICAL**  
**Owner**: Worker 3 (Backend Controller)  
**Impact**: App has no working API; frontend cannot connect; docker build fails

### Current State
- `Backend/Main.py` exists but contains only stub routes (`/`, `/health`)
- `Backend/package.json` exists but Express is not active
- Dockerfile expects `server/index.js` (does not exist)
- No actual API endpoints: no auth, no agents, no memory, no chat

### Why It Matters
- Frontend rewrites to `$NEXT_PUBLIC_API_URL` but backend has no routes to handle them
- `docker compose up` will fail during app build (missing server/ folder)
- Production cannot pass health checks

### Root Cause
- Backend was started but never completed
- Decision between Flask vs Express was never finalized
- No one implemented real routes

### Fix Required
**Choose One Path**:

**Path A: Express (Recommended)**
1. Create `server/` folder (root)
2. Create `server/index.js` with Express app:
   ```javascript
   import express from 'express';
   import cors from 'cors';

   const app = express();
   app.use(cors());
   app.use(express.json());

   app.get('/health', (req, res) => {
     res.json({ ok: true });
   });

   app.get('/api/agents', (req, res) => {
     res.json({ agents: [] });
   });

   app.get('/api/memory', (req, res) => {
     res.json({ memory: [] });
   });

   app.post('/api/chat', (req, res) => {
     res.json({ message: 'echo' });
   });

   const port = process.env.PORT || 3000;
   app.listen(port, () => console.log(`Server on port ${port}`));
   ```
3. Move `Backend/api/` routes into `server/routes/`
4. Update `Dockerfile` CMD to `node server/index.js`
5. Test: `docker compose up` → `curl http://localhost:3000/health`

**Path B: Flask (Alternative)**
1. Expand `Backend/Main.py` with real routes
2. Update `Dockerfile` CMD to `python Backend/Main.py`
3. Ensure Flask listens on 0.0.0.0:3000

**Action**: Assume Path A (Express). If you prefer Flask, notify Worker 3.

### Evidence Needed (Post-Fix)
- docker build log (success)
- docker-compose up log (all services healthy)
- `curl http://localhost:3000/health` response (200 OK, `{"ok": true}`)
- API route tests for /agents, /memory, /chat

### Estimated Time
2–3 hours (implementation + testing)

---

## BLOCKER #3 — Missing server/ Folder (Dockerfile Dependency)
**Severity**: 🔴 **CRITICAL**  
**Owner**: Worker 3 (Backend Controller)  
**Impact**: `docker build` fails immediately

### Current State
- Dockerfile line 19: `COPY server/ ./server/`
- Folder does not exist
- Build step never executes

### Root Cause
- Dockerfile was written before server/ folder was created
- Backend was split between Backend/ (Python) and never unified into server/ (Node.js)

### Fix Required
**Create the folder and add entry point**:
```bash
mkdir -p server
cat > server/index.js << 'EOF'
// Express entry point
import express from 'express';
// ... (see BLOCKER #2)
EOF
```

### Evidence Needed
- `ls -la server/` shows index.js
- `docker build` completes successfully

### Estimated Time
<30 minutes (once BLOCKER #2 decision is made)

---

## BLOCKER #4 — Security: Secrets Exposed in Git History
**Severity**: 🟡 **HIGH**  
**Owner**: Worker 2 (Security Controller)  
**Impact**: If keys were ever committed, they are compromised and must be rotated

### Current State
- `.env` file exists (in .gitignore, but not in remote)
- `.env.example` contains template secrets
- Unknown: were old keys ever committed before .gitignore was added?
- OpenAI key is marked [REDACTED] in current .env

### Why It Matters
- If secrets leaked in git history, they must be rotated immediately
- Third parties may have access to databases, APIs, and services
- GitHub secret scanning may have detected and disabled keys
- OWASP compliance requires documented secret rotation

### Root Cause
- Repository predates .gitignore or .gitignore was added after initial commits
- No pre-commit hooks to prevent secret exposure

### Fix Required
1. Scan git history:
   ```bash
   git log --all -p | grep -i "api_key\|secret\|token\|password"
   # or use git-secrets or TruffleHog
   ```
2. For every exposed key found, create a rotation plan
3. Document all rotations in SECURITY_ROTATION.md:
   ```markdown
   # Secrets Rotation Checklist

   ## OPENAI_API_KEY
   - [ ] Disabled old key in OpenAI dashboard
   - [ ] Created new key
   - [ ] Updated .env.production on Vercel
   - [ ] Updated GitHub Actions secrets
   - [ ] Verified app uses new key (logs)

   ## JWT_SECRET
   - [ ] ... (repeat for each secret)
   ```
4. Rotate all identified secrets (or confirm they were never committed)
5. Add pre-commit hook:
   ```bash
   git secrets --install
   git secrets --register-aws
   # or custom patterns
   ```

### Evidence Needed (Post-Fix)
- SECURITY_ROTATION.md with checklist (all marked complete)
- Screenshot of git log scan (no exposed keys found)
- Vercel secrets dashboard showing updated values

### Estimated Time
1–2 hours (scan + rotation + verification)

---

## BLOCKER #5 — UI Not Redesigned (Old Campaign-Studio Focus)
**Severity**: 🟡 **HIGH**  
**Owner**: Worker 4 (Frontend/UI Redesign)  
**Impact**: Current UI doesn't match mission requirement for modern premium shell

### Current State
- `app/page.tsx` renders CampaignStudioFront component
- UI is campaign-focused, not MindReply command center
- No scroll menu navigation
- No memory rail, agent panels, model panels, worker board, outcome board
- No premium dark futuristic aesthetic
- No responsive desktop-first layout documentation

### Why It Matters
- Mission requires: premium dark futuristic, scroll-menu driven, memory-aware, agent/model oriented, no cutoff
- Current UI is functional but not aligned with brand direction
- mind-reply.com needs to be the flagship public site, not a campaign studio

### Root Cause
- UI was designed for a different product context (campaigns, not the MindReply platform)
- Redesign was not started

### Fix Required
1. Create new modular UI shell in `app/shell/` or replace `app/page.tsx`
2. Design components:
   - Hero command center (top)
   - Left-side scroll menu (navigation)
   - Memory rail (right side or persistent)
   - Agent panel (main area)
   - Model panel (main area)
   - Worker orchestration panel
   - Outcome board
   - Publishing/subdomain map
   - Live check/report panel
   - Owner controls
   - Footer (privacy/security trust layer)
3. Implement with:
   - Tailwind CSS (dark, premium colors)
   - Radix UI (accessible components)
   - React Router (navigation)
   - TanStack Query (data fetching from real backend)
4. Test desktop layout (no cutoff, no horizontal scroll)
5. Verify responsive behavior (mobile fallback)
6. Connect to real backend (once API routes exist)

### Evidence Needed (Post-Fix)
- New app/shell/ or updated app/page.tsx
- `npm run build` succeeds
- Desktop screenshot (no cutoff, all panels visible)
- Responsive test (tablet/mobile works)
- Buttons functional or marked disabled with reason
- Memory panel saves/loads data

### Estimated Time
3–4 hours (design + component implementation + testing)

---

## BLOCKER #6 — API Contract Not Documented
**Severity**: 🟡 **MEDIUM**  
**Owner**: Worker 3 (Backend Controller)  
**Impact**: Frontend cannot know what endpoints to call or what format to expect

### Current State
- No API_CONTRACT.md exists
- Backend has no real endpoints
- Frontend `next.config.ts` has rewrites but no calling code

### Why It Matters
- Without documented endpoints, frontend developer is blocked
- Integration tests cannot be written
- Production debugging is harder

### Root Cause
- API design was never documented
- Backend was stubbed but never spec'd

### Fix Required
Create API_CONTRACT.md with all endpoints:
```markdown
# API Contract — MindReply Backend

## Base URL
`/api` (rewrites to backend URL in production)

## Endpoints

### Health Check
GET /api/health
Response: { "ok": true }

### Agents
GET /api/agents
Response: [{ id: string, name: string, status: string }]

POST /api/agents/:id/activate
Request: { memory: {} }
Response: { activated: true }

### Memory
GET /api/memory
Response: { entries: [] }

POST /api/memory
Request: { key: string, value: any }
Response: { stored: true }

### Chat
POST /api/chat
Request: { message: string, context: {} }
Response: { reply: string }

### Auth (if needed)
POST /api/auth/login
GET /api/auth/user
...
```

### Evidence Needed (Post-Fix)
- API_CONTRACT.md with all endpoints listed
- Example requests/responses for each endpoint
- OpenAPI/Swagger spec (optional but recommended)

### Estimated Time
1 hour (documentation + examples)

---

## BLOCKER #7 — Subdomain Deployment Not Staged
**Severity**: 🟠 **MEDIUM**  
**Owner**: Worker 6 (Domain Controller)  
**Impact**: Subdomains (app., arena., agents., etc.) have no deployment home

### Current State
- PUBLIC-FLEET.md lists 9 subdomains and fallback Vercel URLs
- Only aurel-one.vercel.app is actively deployed
- No Vercel projects exist for app., arena., agents., etc.
- No routing decision made: single app with subdomain detection vs. multiple apps?

### Why It Matters
- Subdomains are part of the public-facing architecture
- Without dedicated deployment paths, subdomain apps cannot be published

### Root Cause
- Deployment topology was not finalized
- Vercel projects were created for individual products but not integrated under mind-reply.com

### Fix Required
1. Decide routing strategy:
   - **Option A**: Single Next.js app with subdomain detection (simplest, one deployment)
   - **Option B**: Multiple Vercel projects (more control, more setup)
2. For each subdomain, decide owner:
   - mind-reply.com → main public site (Option A or separate project)
   - app.mind-reply.com → authenticated app shell (new project or route)
   - arena.mind-reply.com → experimental interface (new project or route)
   - agents.mind-reply.com → agent/model control (new project or route)
   - api.mind-reply.com → backend (separate host or Vercel serverless)
   - admin.mind-reply.com → admin dashboard (new project or route)
   - docs.mind-reply.com → documentation (static site, Vercel or Netlify)
   - status.mind-reply.com → health/status page (static or service)
3. Configure Vercel projects and DNS
4. Document in DEPLOYMENT_PLAN.md and DOMAIN_MAP.md

### Evidence Needed (Post-Fix)
- DEPLOYMENT_PLAN.md with decision + rationale
- DOMAIN_MAP.md with all subdomains → targets
- Vercel projects created (if Option B)
- DNS records added (if subdomains point to different hosts)

### Estimated Time
2–3 hours (decision + setup + testing)

---

## BLOCKER #8 — CI/CD Pipeline Status Unknown
**Severity**: 🟠 **MEDIUM**  
**Owner**: Worker 7 (CI/CD Controller)  
**Impact**: No automated builds; cannot verify code quality or deploy safely

### Current State
- `.github/workflows/` folder exists (contains workflows)
- Status of workflows unknown (may be failing)
- Likely issue: workflow paths don't match new directory structure

### Why It Matters
- Without passing CI, code quality and security are not verified
- Deployments are manual and error-prone
- Branch protection rules cannot be enforced

### Root Cause
- Workflows were written for old project structure (e.g., targeting `server/` which doesn't exist yet)
- No verification that workflows actually pass

### Fix Required
1. Inspect `.github/workflows/` files
2. Fix any failing steps:
   - Check working directory (cwd) is correct
   - Check build commands match package.json
   - Check artifact paths are correct
3. Add steps (if missing):
   - `npm ci` (clean install)
   - `npm run lint`
   - `npm run build`
   - `npm test` (if test suite exists)
   - Security scan (e.g., npm audit, OWASP)
4. Test workflow locally (act command)
5. Merge into main and verify green checkmark on GitHub

### Evidence Needed (Post-Fix)
- GitHub Actions dashboard showing all workflows passing ✓
- Workflow file showing lint → build → test steps
- Security scan step added (npm audit or similar)
- Screenshot of green checks on recent commits

### Estimated Time
1–2 hours (inspection + fixes + testing)

---

## Blocker Dependency Graph

```
BLOCKER #2 (Backend)
    ↓ (depends on)
BLOCKER #3 (server/ folder) ✓ (fast)

BLOCKER #5 (UI Redesign)
    ↓ (depends on)
BLOCKER #6 (API Contract)
    ↓ (waits for)
BLOCKER #2 (Backend implementation)

BLOCKER #1 (DNS)
    ← (requires completion of all above for testing)

BLOCKER #7 (CI/CD)
    ← (should be fixed before BLOCKER #1)

BLOCKER #8 (Subdomain Deployment)
    ← (requires BLOCKER #7 + BLOCKER #1)

BLOCKER #4 (Security/Rotation)
    ← (can run in parallel with others)
```

**Recommended Execution Order**:
1. Parallel: BLOCKER #3 + BLOCKER #4
2. BLOCKER #2 (Express backend)
3. BLOCKER #6 (API contract)
4. BLOCKER #5 (UI redesign)
5. BLOCKER #7 (CI/CD)
6. BLOCKER #8 (Subdomain deployment)
7. BLOCKER #1 (DNS / final deployment)

---

## Timeline Estimate

| Phase | Blockers | Time | Status |
|-------|----------|------|--------|
| **Phase 1** | #3, #4 | 1–2 hrs | Parallel |
| **Phase 2** | #2, #6 | 3–4 hrs | Sequential |
| **Phase 3** | #5 | 3–4 hrs | UI redesign |
| **Phase 4** | #7 | 1–2 hrs | CI/CD |
| **Phase 5** | #8 | 2–3 hrs | Deployment setup |
| **Phase 6** | #1 | 1–2 hrs | DNS + verification |
| **Total** | | ~14–18 hrs | Estimated |

---

## Conclusion

All blockers are **resolvable**. None require external dependencies or third-party integration. All are within scope of the stabilization mission.

**Priority**: Start Phase 1 immediately (BLOCKER #3 + #4 are fast).

**Success Criteria** (to unblock each):
1. #3: server/ exists with valid index.js
2. #4: SECURITY_ROTATION.md complete, all keys rotated
3. #2: docker build succeeds, /health responds
4. #6: API_CONTRACT.md with all endpoints
5. #5: npm run build succeeds, desktop screenshot shows all panels
6. #7: GitHub Actions dashboard shows green checks
7. #8: DEPLOYMENT_PLAN.md + DOMAIN_MAP.md finalized
8. #1: All subdomains resolve to correct targets, health checks pass

---

**Report Generated**: 2025-01-17  
**Owner**: Worker 1 (Repo Inspector)  
**Next**: Begin Phase 1 (BLOCKER #3 + #4)
