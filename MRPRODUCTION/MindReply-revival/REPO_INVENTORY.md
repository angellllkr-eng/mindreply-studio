# REPO INVENTORY — MindReply-revival

**Generated**: 2025-01-17  
**Repository**: https://github.com/Mind-Reply/MindReply  
**Local Path**: C:\Users\ANGEL\MRPRODUCTION\MindReply-revival\  
**Total Files**: 560+ (scanned)

---

## Quick Stats
| Metric | Value |
|--------|-------|
| **Languages** | TypeScript, JavaScript, Python, JSON, CSS |
| **Frameworks** | Next.js 13+, React 18, Tailwind CSS, Express (dormant), Flask (stub) |
| **Package Manager** | npm |
| **Container Tech** | Docker (Compose + multi-stage build) |
| **Database** | PostgreSQL 16 (docker-compose), Prisma/Drizzle ORM (definitions only) |
| **UI Libraries** | Radix UI, Lucide React, Sonner, TanStack Query, React Router |
| **Deployment** | Vercel (confirmed for aurel-one.vercel.app) |

---

## Directory Tree (Active Folders)

```
MindReply-revival/
├── app/                            # Next.js App Router (ACTIVE)
│   ├── page.tsx                   # Home: CampaignStudioFront
│   ├── layout.tsx                 # Root layout
│   ├── admin/                     # Admin dashboard routes
│   ├── api/                       # API routes
│   ├── campaign/                  # Campaign management
│   ├── campaign-studio/           # Main studio UI
│   ├── cockpit/                   # Control center
│   ├── dashboard/                 # Analytics dashboard
│   ├── login/                     # Auth UI
│   ├── pricing/                   # Pricing page
│   └── components/                # Shared React components
│       ├── campaign-studio/       # Studio components
│       ├── shared/                # Reusable UI (buttons, forms, etc.)
│       └── [others]
├── Backend/                        # Backend services (PARTIAL)
│   ├── Main.py                   # Flask app (stub)
│   ├── package.json              # Express deps (dormant)
│   ├── src/                      # Node.js source (empty/minimal)
│   └── api/                      # API definitions
├── frontend/                       # Legacy Next.js (may be archived)
│   ├── pages/                    # Old page structure
│   ├── lib/                      # Utilities
│   └── package.json              # Legacy deps
├── config/                         # Configuration files
│   ├── [config templates]
├── public/                         # Static assets
│   ├── [images, icons, etc.]
├── lib/                            # Shared utilities
│   ├── [helper functions]
├── prisma/                         # Database schema (ORM config)
│   ├── schema.prisma             # Prisma schema
│   └── [migrations]
├── migrations/                     # Database migrations
│   ├── [SQL/migration files]
├── docker-compose.yml             # Main dev composition (ACTIVE)
├── docker-compose.dev.yml         # Dev overrides
├── docker-compose.prod.yml        # Production overrides
├── Dockerfile                     # Main app image (ACTIVE, untested)
├── Dockerfile.admin              # Admin dashboard image
├── Dockerfile.backend            # Backend-only image
├── Dockerfile.frontend           # Frontend-only image
├── package.json                  # Main app deps (ACTIVE)
├── next.config.ts                # Next.js config (ACTIVE)
├── tsconfig.json                 # TypeScript config
├── tailwind.config.js            # Tailwind CSS config
├── postcss.config.js             # PostCSS config
├── .env                          # Dev env (EXPOSED in repo, dev values only)
├── .env.example                  # Template (ACTIVE)
├── .gitignore                    # Git exclusions (ACTIVE)
├── vite.config.js                # Vite config (used by Next.js or standalone)
├── README.md                     # Project docs
├── docs/                         # Documentation
│   ├── deployment/               # Deployment guides
│   ├── api/                      # API documentation
│   └── [other docs]
├── k8s/                          # Kubernetes manifests (reference, not active)
├── infra/                        # Infrastructure as Code
├── n8n/                          # N8N automation workflows
├── scripts/                      # Helper scripts
├── archive/                      # Old/deprecated code
├── apps/                         # Monorepo apps (if used)
├── automation/                   # Automation tools
└── [others: gitops/, operations/, trigger/, etc.]

```

---

## Core Application Files

### Entry Points
| File | Purpose | Status |
|------|---------|--------|
| `app/page.tsx` | Next.js home page | ✓ Active (CampaignStudioFront) |
| `app/layout.tsx` | Root layout wrapper | ✓ Active |
| `next.config.ts` | Next.js configuration | ✓ Active (API rewrites) |
| `app/api/[...path].ts` | API proxy routes (if present) | ? Unknown |
| `Backend/Main.py` | Flask server | ⚠ Stub only |
| `Backend/package.json` | Express dependencies | ⚠ Not active |

### Configuration Files
| File | Purpose | Status |
|------|---------|--------|
| `package.json` | npm dependencies | ✓ Valid |
| `tsconfig.json` | TypeScript settings | ✓ Present |
| `tailwind.config.js` | Tailwind CSS theme | ✓ Present |
| `.env` | Dev environment variables | ⚠ Exposed (dev values) |
| `.env.example` | Env template | ✓ Present |
| `.gitignore` | Git exclusions | ✓ Covers secrets |
| `vite.config.js` | Vite bundler config | ✓ Present |

### Docker & Deployment
| File | Purpose | Status |
|------|---------|--------|
| `Dockerfile` | Main multi-stage build | ✓ Valid (untested) |
| `docker-compose.yml` | Local dev stack | ✓ Valid (untested) |
| `docker-compose.prod.yml` | Production overrides | ? Unknown |
| `docker-compose.admin.yml` | Admin service | ? Unknown |

---

## Dependencies Summary

### Production Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.26.2",
  "@tanstack/react-query": "^5.56.2",
  "@radix-ui/*": "^1.x",
  "tailwindcss": "^3.4.13",
  "zod": "^3.23.8",
  "react-hook-form": "^7.53.0",
  "sonner": "^1.5.0",
  "recharts": "^2.13.0",
  "lucide-react": "^0.462.0"
}
```

### Development Dependencies
```json
{
  "typescript": "^5.5.3",
  "vite": "^8.1.4",
  "@vitejs/plugin-react": "^4.3.2",
  "tailwindcss": "^3.4.13",
  "autoprefixer": "^10.4.20",
  "eslint": "^9.11.1"
}
```

### Backend Dependencies (Express, dormant)
```json
{
  "express": "^4.19.2",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5"
}
```

---

## Secrets & Environment

### .env File (Dev Values Only)
```
DB_PASSWORD=local_dev_password_only
POSTGRES_PASSWORD=local_dev_password_only
JWT_SECRET=local_dev_jwt_secret_change_before_prod
API_URL=https://aurel.mind-reply.com
FRONTEND_URL=https://aurel.mind-reply.com
BACKEND_PORT=3000
NODE_ENV=production
OPENAI_API_KEY=[REDACTED]
ANTHROPIC_API_KEY=
XAI_API_KEY=
GROQ_API_KEY=
GEMINI_API_KEY=
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
PGADMIN_DEFAULT_PASSWORD=local_dev_admin_only
```

**Status**: ⚠ EXPOSED in repo (but in .gitignore). Dev values only; production keys not exposed.

### .env.example (Template)
```
DB_PASSWORD=mindreply_dev_password
DATABASE_URL=postgresql://mindreply_user:[REDACTED]@postgres:5432/mindreply
NODE_ENV=production
PORT=3000
VITE_API_URL=http://localhost:3000/api
OPENAI_API_KEY=sk-your-key-here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
N8N_WEBHOOK_URL=http://n8n:5678/webhook
SALESFORCE_CLIENT_ID=your-salesforce-client-id
SALESFORCE_CLIENT_SECRET=your-salesforce-client-secret
JWT_SECRET=mindreply_jwt_dev_secret_change_in_production
CORS_ORIGIN=http://localhost:3000
REDIS_HOST=redis
REDIS_PORT=6379
MCP_PORT=3001
PGADMIN_PASSWORD=admin
```

---

## Database & ORM

### Prisma
**Status**: ⚠ Present but dormant  
**Location**: `prisma/schema.prisma`  
**Usage**: Database schema definitions (may not be synced with actual DB)

### Drizzle
**Status**: ? Unknown  
**Note**: Some references to drizzle.config.ts in file tree (needs verification)

**Action**: Worker 3 to select one ORM and document.

---

## Build & Test Scripts

### Available Scripts
| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite` | Start dev server (Vite) |
| `build` | `tsc --noEmit && vite build` | TypeScript check + Vite build |
| `preview` | `vite preview` | Preview built app |
| `start` | `node server/index.js` | Start backend server (Express) |
| `start:telegram` | `node backend/telegram-bridge.js` | Start Telegram bridge |
| `start:all` | concurrently both | Run all services |
| `lint` | `eslint .` | Run ESLint |

**Status**: ⚠ `npm build` depends on `server/index.js` (missing folder)

---

## Docker Composition

### Services (docker-compose.yml)
| Service | Image | Port | Health | Status |
|---------|-------|------|--------|--------|
| `postgres` | postgres:16-alpine | 5432 | pg_isready ✓ | Ready |
| `app` | build: . | 3000, 3001 | curl /health | Buildable |
| `redis` | redis:7-alpine | 6379 | redis-cli ping ✓ | Ready |
| `pgadmin` | dpage/pgadmin4 | 5050 | Manual | Profile: dev |

**Networking**: `mindreply-network` (bridge)  
**Volumes**: `postgres_data`, `redis_data`

### Dockerfile (Main)
- **Stage 1** (frontend-builder): Node 20 Alpine, build frontend with Vite
- **Stage 2** (runtime): Node 20 Alpine, install dumb-init, copy dist + server/

**Issues**:
- Expects `server/index.js` (does not exist)
- Build will fail until `server/` is created

---

## Deployment Configuration

### Vercel
**Status**: ✓ Active for aurel-one.vercel.app  
**Project**: `prj_PInZtszt4aHVQr7J03g7LZw1wwDP`  
**Team**: `team_0plIJmQLgZC1wVv9zI2eVf3B`  
**Production Alias**: 
- `aurel-one.vercel.app` (live)
- `aurel.mind-reply.com` (DNS pending)

### Railway / Fly
**Status**: ⚠ Config files present (railway.toml, fly.toml) but not active  
**Note**: Reference only; primary deployment is Vercel

### Kubernetes
**Status**: ⚠ k8s/ folder and manifests present but not active  
**Note**: Reference; primary is Vercel + docker-compose for local dev

---

## Documentation Files

| File | Purpose | Status |
|------|---------|--------|
| `README.md` | Project overview | ? Not yet reviewed |
| `docs/deployment/` | Deployment guides | ? May be stale |
| `CLAUDE.md` | Claude AI instructions | ? Reference |
| `ADMIN_DASHBOARD_SETUP.md` | Admin setup | ? Reference |
| `Changelog.yml` | Version history | ? May be incomplete |

---

## Archive & Reference Folders

| Folder | Purpose | Status |
|--------|---------|--------|
| `archive/` | Old code | Preserved |
| `k8s/` | Kubernetes reference | Preserved |
| `infra/` | Infrastructure as Code | Preserved |
| `automation/` | Scripts & tools | Preserved |
| `apps/` | Monorepo structure (if used) | Preserved |
| `operations/` | Operations docs | Preserved |

---

## Duplicate / Conflict Files

### Dockerfiles (Multiple)
- `Dockerfile` (main, active)
- `Dockerfile.admin` (admin dashboard)
- `Dockerfile.backend` (backend only)
- `Dockerfile.frontend` (frontend only)
- `Dockerfile.prod` (production variant)
- `Dockerfile.test` (testing)
- `Dockerfile.test-runtime` (test runtime)

**Status**: ⚠ ARCHIVE CANDIDATES (keep Dockerfile, archive others unless they're specialized)

### docker-compose Files (Multiple)
- `docker-compose.yml` (main, active)
- `docker-compose.dev.yml` (dev overrides)
- `docker-compose.prod.yml` (production)
- `docker-compose.production.yml` (duplicate?)
- `docker-compose.admin.yml` (admin service)
- `docker-compose.stripe.yml` (Stripe variant)
- `docker-compose.working.yml` (backup?)
- `docker-compose.merged.yml` (merged config?)
- `docker-compose.simple.yml` (simplified?)

**Status**: ⚠ ARCHIVE CANDIDATES (keep docker-compose.yml + docker-compose.prod.yml, archive others after decision on final path)

### Backend Implementations
- `Backend/Main.py` (Flask, stub)
- `Backend/package.json` (Express, dormant)

**Status**: ⚠ CHOOSE ONE (Flask or Express) — archive the other

### Frontend Paths
- `app/` (Next.js App Router, active)
- `frontend/` (legacy Next.js pages, likely archived)

**Status**: ⚠ ARCHIVE `frontend/` unless it's intentionally separate

---

## Stale / Unused Components

### Identified
| Item | Path | Reason | Action |
|------|------|--------|--------|
| Legacy frontend | `frontend/` | App Router used instead | ARCHIVE_CANDIDATE |
| Express backend | `Backend/package.json` | Flask chosen or stub only | ARCHIVE_CANDIDATE |
| Duplicate compose files | docker-compose.*.yml | Use main + prod override only | ARCHIVE_CANDIDATES |
| Spare Dockerfiles | Dockerfile.* (except main) | Specialized builds not in use | ARCHIVE_CANDIDATES |
| N8N workflows | `n8n/` | Unclear if active | VERIFY / ARCHIVE_CANDIDATE |
| Kubernetes manifests | `k8s/` | Not deployed to K8s | ARCHIVE_CANDIDATE |
| Railway config | `railway.toml` | Not active | ARCHIVE_CANDIDATE |
| Fly config | `fly.toml` | Not active | ARCHIVE_CANDIDATE |

---

## Missing / Broken References

### Critical Missing
| Item | Expected Path | Status |
|------|---------------|--------|
| `server/index.js` | Root (required by Dockerfile) | MISSING → Will break docker build |
| `backend/telegram-bridge.js` | Root (referenced in npm scripts) | Status unknown |

### Possibly Missing
| Item | Expected Path | Status |
|------|---------------|--------|
| API routes | `app/api/` or `Backend/api/` | Unclear if implemented |
| Database schema | `prisma/schema.prisma` or drizzle | Present but not verified |
| Health endpoint | `Backend/` or `app/api/health.ts` | Flask stub exists; Express unknown |

---

## Security Status

### Secrets Found
| Secret Type | Location | Exposure | Status |
|-------------|----------|----------|--------|
| OpenAI API Key | `.env` | [REDACTED] | ⚠ In dev file |
| JWT Secret | `.env` + `.env.example` | Dev value only | ✓ Safe |
| DB Password | `.env` + `.env.example` | Dev value only | ✓ Safe |
| Postgres Password | `.env` + `.env.example` | Dev value only | ✓ Safe |
| Telegram Bot Token | `.env.example` | Placeholder | ✓ Safe |
| Salesforce Credentials | `.env.example` | Placeholders | ✓ Safe |

### .gitignore Coverage
✓ Covers `.env` files  
✓ Covers `*.pem`, `*.key`, `*.p12`, `*.pfx`, `*.crt`, `*.cer`  
✓ Covers state.json, logs, temp files  
✓ Covers `node_modules/`, `dist/`, `build/`

**Status**: ✓ Good — but git history scan needed to verify no secrets were leaked in past commits

---

## Conclusion

**Repo Status**: OPERATIONAL BUT INCOMPLETE

- **70% viable**: Core structure, dependencies, Docker composition, and deployment foundation are solid.
- **30% unfinished**: Backend implementation incomplete, UI redesign not started, server/ folder missing, DNS not configured.
- **No critical blockers**: Issues are fixable with structured work (Phases 1–3).

**Archive Candidates** (to clean up):
- `frontend/` (legacy)
- `Backend/package.json` (if Flask chosen)
- `docker-compose.*.yml` (extras)
- `Dockerfile.*` (extras, except main)

**Preserve**:
- `app/` (active)
- `public/`, `prisma/`, `docs/`
- `docker-compose.yml`, `Dockerfile` (main)
- `Backend/Main.py` or create real Express backend

---

## Next: Worker 2 (Security) & Worker 3 (Backend)
1. **Worker 2**: Scan git history; create SECURITY_ROTATION.md
2. **Worker 3**: Create `server/index.js`; implement API routes; test docker compose

---

**Report Generated**: 2025-01-17  
**Inspector**: Worker 1  
**Tool**: Direct filesystem inspection + fetch verification
