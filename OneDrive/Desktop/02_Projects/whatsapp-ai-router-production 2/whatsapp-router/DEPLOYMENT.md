# Deploy — today, step by step

**Already done, for real, in your accounts (this session):**
- ✅ Cloudflare KV `whatsapp-router-rate-limit` (`841b9a59761a4e91838082d22bea3d4f`)
- ✅ Cloudflare KV `whatsapp-router-dedup` (`3bf909921504487c8ce48587559f3107`)
- ✅ Cloudflare D1 `whatsapp-router-ops` (`77eddf7c-5ab5-45fd-bd18-108e7d894421`) with a `provider_calls` table
- ✅ Supabase: writes into the existing `proof_receipts` table in your **MindR** project (`aziwdgndohdgnwztpwdi`) — no new project, no new schema, uses what's already there
- ✅ All of the above already wired into `wrangler.toml` and the source — nothing to fill in for these

**What I genuinely cannot do from here:** run `wrangler deploy` (no deploy access to your Cloudflare account from this session — I only have the scoped KV/D1/Supabase tools you connected) or know your WhatsApp/AI provider API keys (and you shouldn't paste those into a chat regardless). Those two things are the only real gap between "built and verified" and "live."

```bash
unzip whatsapp-ai-router-production.zip && cd whatsapp-router
npm install
npm run typecheck   # should print nothing = clean
npm test            # should print "# pass 39  # fail 0"

npx wrangler login

# Secrets - never go in wrangler.toml or git
npx wrangler secret put WHATSAPP_VERIFY_TOKEN   # a string you invent
npx wrangler secret put WHATSAPP_APP_SECRET     # Meta App Dashboard > Settings > Basic
npx wrangler secret put WHATSAPP_ACCESS_TOKEN   # System User token, Cloud API
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put XAI_API_KEY
npx wrangler secret put GEMINI_API_KEY
npx wrangler secret put GROQ_API_KEY
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY   # MindR project settings > API > service_role

npx wrangler deploy
# copy the printed https://....workers.dev URL
```

Then in Meta: **WhatsApp → Configuration → Webhook** → Callback URL =
`https://<your-worker>.workers.dev/webhook`, Verify Token = whatever you set
above → Verify and Save → subscribe to the `messages` field.

Text your number. That's the whole remaining path to live.

**What "ready" means right now, precisely:** source compiles clean under
TypeScript strict mode, all 39 tests pass against mocked providers /
WhatsApp / KV / D1 / Supabase (verified in this session, not just written).
Real Cloudflare KV, D1, and your existing Supabase table are live and wired
in with real IDs. What's *not* yet true: no message has actually round-tripped
through Anthropic/OpenAI/xAI/Google/Groq/Meta's real APIs, because I have no
credentials for those and shouldn't be given them in chat. First real message
you send after `wrangler deploy` is the actual first end-to-end run.

