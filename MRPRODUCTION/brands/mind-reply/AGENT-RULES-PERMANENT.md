#!/usr/bin/env markdown
# 🚨 MINDREPLY PROJECT — MANDATORY AGENT RULES

**STATUS: PERMANENT. ALL AGENTS MUST FOLLOW.**

**Last Updated:** 2026-07-10  
**Applies To:** All AI agents, all tasks, all code generation  
**Violation:** Restart from scratch using existing systems  

---

## ⛔ CARDINAL RULE

**DO NOT BUILD FROM SCRATCH.**

**MUST USE:**
1. Existing backend systems (model-router, audit-log, middleware)
2. Existing React components (pages/, components/)
3. Existing design templates (AUREL taste, TailwindCSS)
4. Existing infrastructure (Docker containers, n8n, Cloudflare)

---

## 📋 MANDATORY CHECKLIST BEFORE ANY CODE

### Before writing ANY code, agent MUST:

- [ ] Read `backend/model-router/timeout-failover.js` (how models work)
- [ ] Read `backend/audit-log/*` (how logging works)
- [ ] Read `backend/middleware/*` (how auth/middleware works)
- [ ] Read `src/pages/*` (existing React patterns)
- [ ] Read `src/components/*` (existing component library)
- [ ] Read existing `package.json` (dependencies, scripts)
- [ ] Check Docker setup (`docker-compose.yml`, running containers)
- [ ] Understand existing routes (App.tsx routing)
- [ ] Check existing API endpoints (what's already built)

### If any of above are skipped:
**REJECT THE TASK. Ask user to clarify existing systems first.**

---

## 🔧 EXISTING SYSTEMS (DO NOT REINVENT)

### Backend Systems:
```
backend/
├── model-router/
│   └── timeout-failover.js — Model selection + failover logic
├── audit-log/ — Communication audit system
├── middleware/ — Auth, validation, logging
├── durable-objects/ — User memory, state
└── config/ — All configuration
```

### Frontend Components:
```
src/
├── pages/ — Existing page components (Home, PrivateSetup, Builder, etc.)
├── components/ — Reusable UI components
├── index.css — Styling (TailwindCSS)
└── App.tsx — Routing
```

### Infrastructure:
```
- Docker: aurel, mindreply-website, control, n8n, cloudflared
- Cloudflare tunnel + Routes
- GitHub private repos
- Existing APIs for each container
```

### Design System:
```
- AUREL aesthetic (gold #e4c06f, cyan #5ee1ff)
- TailwindCSS (already configured)
- Dark theme (existing)
- Radix UI components (already in dependencies)
```

---

## 📦 DEPENDENCIES (DO NOT ADD WITHOUT ASKING)

**Existing stack (already installed):**
- React 18.3.1
- React Router DOM 6.26.2
- TailwindCSS 3.4.13
- Radix UI (dialog, label, select, slot)
- React Query 5.56.2
- React Hook Form 7.53.0
- Zod 3.23.8
- Sonner (toasts)
- Lucide React (icons)
- Recharts (charts)

**DO NOT:**
- Add UI libraries (use Radix UI + TailwindCSS already configured)
- Add styling frameworks (TailwindCSS is configured)
- Add form libraries (React Hook Form + Zod are configured)
- Add state management (React Query + hooks)

---

## 🎨 DESIGN RULE

**DO NOT create new design systems.**

**MUST use existing:**
1. AUREL theme colors (gold, cyan, dark backgrounds)
2. TailwindCSS utility classes (already configured)
3. Radix UI components (already in node_modules)
4. Existing page layouts (Home, PrivateSetup, Builder)
5. Existing component patterns (buttons, forms, dialogs)

**Example:** If building a new feature, copy an existing page's structure and adapt it. Don't create new CSS files or design from scratch.

---

## 🔌 API INTEGRATION RULE

**DO NOT hardcode APIs.**

**MUST use existing:**
1. `backend/model-router/timeout-failover.js` for AI calls
2. `backend/audit-log/*` for logging user actions
3. `backend/middleware/*` for authentication
4. Existing Docker container APIs (aurel:3000, n8n:5678, etc.)

**Example:** If building Shell, don't create new model calling logic. Import and use `callModelWithFailover` from existing backend.

---

## 📝 INTEGRATION CHECKLIST

For ANY new feature:

- [ ] Does it use existing backend systems? (Y/N)
- [ ] Does it use existing React patterns? (Y/N)
- [ ] Does it use existing design? (Y/N)
- [ ] Does it integrate with existing Docker containers? (Y/N)
- [ ] Does it log to existing audit system? (Y/N)
- [ ] Did I check all existing pages/components first? (Y/N)

**If ANY are "N": STOP. Redesign to use existing systems.**

---

## 🚫 COMMON VIOLATIONS (WILL NOT ACCEPT)

### ❌ Building a standalone chat app
- Should: Integrate with existing Shell infrastructure, use existing model-router

### ❌ Creating new CSS/design from scratch
- Should: Use AUREL theme + TailwindCSS + Radix UI (already configured)

### ❌ Adding new npm packages
- Should: Check if already installed, use existing dependencies

### ❌ Creating new auth system
- Should: Use existing middleware in `backend/middleware/`

### ❌ Hardcoding API calls
- Should: Use existing backend functions (model-router, audit-log)

### ❌ Creating new page without reading existing pages
- Should: Copy existing page structure, adapt for new feature

### ❌ Ignoring Docker containers
- Should: Integrate with running containers (aurel, n8n, control, etc.)

### ❌ Not logging to audit system
- Should: Use existing audit-log infrastructure for all user actions

---

## ✅ CORRECT APPROACH

1. **Read existing code first** (all mandatory files above)
2. **Understand architecture** (how model-router, audit-log work)
3. **Find similar existing feature** (page, component, API)
4. **Extend/adapt existing** (don't create new)
5. **Use existing design system** (AUREL + TailwindCSS)
6. **Integrate with existing backend** (model-router, audit-log)
7. **Test with running Docker containers**
8. **Log all actions to audit system**
9. **Follow existing patterns** (component structure, routing, styling)

---

## 📞 IF AGENT VIOLATES RULE

**User should:**
1. Point out which rule was violated
2. Link to this document
3. Ask agent to restart using existing systems
4. Provide examples of existing similar features

**Agent should:**
1. Acknowledge violation
2. Read the existing system being ignored
3. Redesign to use existing systems
4. Show how new design integrates with existing code

---

## 🎯 GOAL

**Every feature = integration with existing systems, not replacement or parallel duplicate.**

**Every component = built on AUREL design + TailwindCSS + Radix UI.**

**Every API call = uses existing model-router + audit-log infrastructure.**

**Every page = follows existing page patterns and routing.**

---

## 🔐 ENFORCEMENT

This rule is **PERMANENT** and applies to:
- Every task
- Every agent
- Every code change
- Every feature

**Violations result in:** Complete restart using existing systems.

---

**SIGNED:** Project Owner  
**EFFECTIVE:** 2026-07-10  
**REVISION:** 1.0 (Permanent)

**Next agent: READ THIS FIRST BEFORE ANY CODE.**
