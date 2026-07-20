# AI Chat / Agent Control Plane

**Existing advanced surface** — Open WebUI-style Vite/React control plane.

## URL
**http://127.0.0.1:4747/aichat**

## Desktop
- `AI Chat.bat`
- `SuperGrok Heavy.bat` → same URL
- `Start-AIChat.bat` in this folder

## Engines
| Model | Binary |
|---|---|
| Grok 4.5 | `%USERPROFILE%\.grok\bin\grok.exe` |
| Claude Opus | `%APPDATA%\npm\claude.cmd` |

## Start
```bat
Desktop\AI Chat.bat
```

Or:
```powershell
Set-Location "$env:USERPROFILE\MRPRODUCTION\agent-control-plane"
node server.mjs
```

## Rule
Never start from scratch. This enhances the existing `agent-control-plane` app.
