# MRPRODUCTION Migration Kit — 2026-07-17

## What's in here

| Folder | What | Size |
|---|---|---|
| `dot-grok/` | Grok 4.5 CLI + config + auth + plugins | 431 MB |
| `dot-claude/` | Claude Code credentials + config | 5 MB |
| `dot-local/` | claude.exe binary + tools | 481 MB |
| `dot-config/` | Agent configs, MCP, settings | 432 MB |
| `open-webui-2/` | Open WebUI #2 docker-compose + .env (API key) | small |
| `desktop-launchers/` | All 12 Desktop .bat files | small |
| `desktop-suite/` | Control v1/v2 + installers | small |
| `raycast-local/` | Raycast local app data | 174 MB |
| `docs/` | Estate docs, permanent rules, stack docs | small |
| `infrastructure/` | Docker/Cloudflare/Supabase configs | small |
| `RESTORE.ps1` | One-shot restore script | — |

**Total: ~1.5 GB**

## What is NOT here (too big or needs reinstall)

| Item | Why | Action on new laptop |
|---|---|---|
| Docker Desktop WSL disk | 10+ GB, machine-specific | Reinstall Docker Desktop fresh |
| MRPRODUCTION estate | Multi-GB, has repos | Copy via external drive or `git clone` |
| Grok/Claude auth tokens | May expire on new machine | Run `grok login` / `claude` if prompted |
| Windows ISO / installers | In archive, not needed | Skip |

## How to restore on new laptop

1. Wait for OneDrive to sync this folder
2. Open **fresh PowerShell**:
```powershell
Set-Location "$env:USERPROFILE\OneDrive\MRPRODUCTION-MIGRATION\2026-07-17"
.\RESTORE.ps1
```
3. Install **Docker Desktop** + **Raycast** separately
4. Desktop → **MULTI AGENT STACK.bat**
5. Browser → **http://127.0.0.1:8890**

## Critical files verified

- `dot-grok/config.toml` → `grok-4.5` + `always-approve` ✓
- `dot-grok/bin/grok.exe` → 131 MB ✓
- `dot-claude/.credentials.json` → 540 bytes ✓
- `dot-local/bin/claude.exe` → 241 MB ✓
- `open-webui-2/.env` → API key present ✓
- `open-webui-2/docker-compose.yml` → port 8890 ✓
- `desktop-suite/Control-v2.ps1` → 13 KB ✓
- 12 Desktop launchers ✓

## Rules saved in docs

- `docs/architecture/AGENT-RULES-PERMANENT.md` — Never start from scratch
- `docs/deployment/MULTI-AGENT-STACK.md` — Stack reference
