# 🤖 TELEGRAM BRIDGE — SETUP & DEPLOYMENT

**Status:** Ready to deploy  
**Connected to:** Shell model-router + audit-log  
**Features:** Interactive chat, model switching, status monitoring  

---

## ⚡ QUICK START

### Step 1: Get Telegram Bot Token

1. Open Telegram → Search **@BotFather**
2. Send `/newbot`
3. Choose a name: `MindReply Shell` (or any name)
4. Get your **API token** (e.g., `123456789:ABCdefGHIjklmnoPQRstUVwxyz`)
5. Copy it

### Step 2: Add to .env

```bash
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklmnoPQRstUVwxyz
```

### Step 3: Start Bridge

```bash
# Install dependencies (if needed)
npm install

# Start Telegram bridge
npm run start:telegram

# Or start Shell + Telegram together
npm run start:all
```

---

## 🎯 HOW IT WORKS

### User sends message on Telegram:
```
User: "What's our platform status?"
```

### Bridge receives:
1. Checks if user is in conversations map
2. Gets their model preference (default: auto)
3. Gets their conversation history

### Shell processes:
1. Calls `shellChat()` with message + model + history
2. `shellChat()` wraps `callModelWithFailover()` (existing model-router)
3. Model-router tries: Claude → OpenAI → Groq → Gemini → Local
4. Returns response + model used + failover flag

### Bridge sends back:
```
MindReply Shell:
✅ All Systems Live

Containers:
✅ aurel (3000)
✅ mindreply-website (8080)
✅ control (8787)
✅ n8n (5678)

Status: OPERATIONAL

🤖 Claude
```

---

## 📝 COMMANDS

| Command | Purpose |
|---------|---------|
| `/start` | Initialize user, show welcome |
| `/model [name]` | Switch AI model (auto/claude/openai/groq/gemini/local) |
| `/status` | Show platform health |
| `/help` | List all commands |
| `/clear` | Clear conversation history |
| Any text | Chat with Shell |

---

## 🔗 INTEGRATION POINTS

| Component | Source | Purpose |
|-----------|--------|---------|
| `shellChat()` | backend/shell-handler.js | Wraps model-router + returns response |
| `callModelWithFailover()` | backend/model-router/timeout-failover.js | Routes to Claude/OpenAI/Groq/Gemini/Local |
| `getAuditLog()` | backend/audit-log/audit-log.js | Logs all Telegram interactions |
| `/api/chat` | server/index.js | Express endpoint (if web needed) |

---

## 🎮 FEATURES

✅ **Interactive Chat** — Real-time responses from Shell  
✅ **Model Switching** — `/model claude` to switch  
✅ **Conversation Memory** — Keeps last 20 messages  
✅ **Failover Tracking** — Shows when model switches  
✅ **Status Monitoring** — `/status` shows live containers  
✅ **Audit Logging** — All interactions logged  
✅ **Error Handling** — Graceful errors, retry logic  

---

## 📊 ARCHITECTURE

```
Telegram User
    ↓ (sends message)
Telegram Bridge (backend/telegram-bridge.js)
    ↓ (calls shellChat)
Shell Handler (backend/shell-handler.js)
    ↓ (calls callModelWithFailover)
Model Router (backend/model-router/timeout-failover.js)
    ↓ (tries each model)
Claude / OpenAI / Groq / Gemini / Local
    ↓ (returns response)
Audit Log (backend/audit-log/audit-log.js)
    ↓ (logs interaction)
Telegram Bridge
    ↓ (sends back to user)
Telegram User (receives response)
```

---

## 🚀 DEPLOYMENT

### Local Testing
```bash
npm run start:telegram
```

### Production
```bash
# Background process
nohup npm run start:telegram &

# Or via Docker
docker run -e TELEGRAM_BOT_TOKEN=xxx mindreply npm run start:telegram
```

### Verify It Works
1. Open Telegram
2. Search for your bot name
3. Send `/start`
4. Send a message: "What's your status?"
5. Shell responds with platform info

---

## 🔐 SECURITY

✅ No secrets in code  
✅ Token from .env only  
✅ All interactions logged (hashed)  
✅ Conversation memory per user  
✅ Model routing validated  
✅ Error messages don't leak stack traces  

---

## 📋 FILES CREATED

| File | Purpose |
|------|---------|
| `backend/telegram-bridge.js` | Main Telegram bot implementation |
| `start-telegram.mjs` | Standalone startup script |
| `.env` | Token configuration |
| `package.json` | Added `node-telegram-bot-api` + scripts |

---

## 🆘 TROUBLESHOOTING

### "TELEGRAM_BOT_TOKEN not set"
→ Add token to `.env` and restart

### "Message timeout"
→ Check if `/api/chat` endpoint is working
→ Run `curl http://localhost:3000/api/chat` to test

### "Model not available"
→ Check which API keys are in `.env`
→ Local model always works as fallback

### "Bot not receiving messages"
→ Check token is correct in `.env`
→ Run `npm run start:telegram` (look for startup banner)
→ Send `/start` to bot again

---

**Ready to deploy. Just add token and run:**

```bash
npm run start:telegram
```

Then send your bot a message on Telegram!
