# 🚨 AGENT QUICK START — READ FIRST

**Status:** MANDATORY FOR ALL AGENTS  
**Rule:** Use existing systems ONLY. No building from scratch.

---

## 📖 MUST READ FIRST (5 minutes)

1. **`AGENT-RULES-PERMANENT.md`** — The permanent rules (this repo)
2. **`backend/model-router/timeout-failover.js`** — How models work
3. **`src/pages/`** — Existing page patterns
4. **`package.json`** — Dependencies (already installed)

---

## ⚡ QUICK CHECKLIST

Before writing code:

- [ ] Read AGENT-RULES-PERMANENT.md
- [ ] Found existing system that does similar thing?
- [ ] Using existing backend functions?
- [ ] Using existing design/components?
- [ ] Checked existing pages for patterns?
- [ ] NOT adding new npm packages?
- [ ] NOT building from scratch?

**If NO to any above: STOP. Redesign first.**

---

## 🔧 EXISTING SYSTEMS TO USE

| Need | Location | How |
|------|----------|-----|
| AI models | `backend/model-router/timeout-failover.js` | `callModelWithFailover()` |
| Logging | `backend/audit-log/` | Log all user actions |
| Auth | `backend/middleware/` | Use existing middleware |
| Pages | `src/pages/` | Copy existing page pattern |
| Components | `src/components/` | Use Radix UI + TailwindCSS |
| Design | Existing CSS | AUREL theme + TailwindCSS |
| Docker | docker-compose.yml | aurel, n8n, control, etc. |

---

## ❌ DO NOT DO

- Build new chat from scratch (use existing Shell infrastructure)
- Create new design (use AUREL + TailwindCSS already configured)
- Add npm packages (check if already installed)
- Create new auth (use existing middleware)
- Hardcode APIs (use existing model-router)
- Ignore Docker containers (integrate with them)
- Skip audit logging (log all actions)

---

## ✅ DO THIS

1. Read existing similar feature
2. Understand how it works
3. Extend/adapt it
4. Use existing design system
5. Integrate with existing backend
6. Follow existing patterns

---

**EVERY FEATURE = INTEGRATION. NEVER DUPLICATION.**

Read full rules in: `AGENT-RULES-PERMANENT.md`
