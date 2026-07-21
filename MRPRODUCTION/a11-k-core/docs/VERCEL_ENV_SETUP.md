# Vercel Environment Setup — A11-K Core

## Canonical target

- Project: `a11-k-core`
- Project ID: `prj_tF8MATzE2bOP0hPfiKZcuGX992dh`
- Production URL: `https://a11-k.space`
- Scope: canonical A11-K project only

## Current Vercel state

The following encrypted variables have been added to the canonical project for **Production and Preview**:

- `COMMAND_ACCESS_TOKEN`
- `AUTH_SECRET`
- `OPENAI_API_KEY`

No values are stored in source files or printed by the agent.

## Required names

| Name | Required | Used by | Becomes active |
|---|---|---|---|
| `COMMAND_ACCESS_TOKEN` | Yes | Middleware and `/api/command/gate` | Owner token gate |
| `AUTH_SECRET` | Yes | HMAC signing for the HttpOnly gate cookie | Forgery-resistant command session |
| `OPENAI_API_KEY` or `AI_GATEWAY_API_KEY` | Yes for live AI | `/api/chat` | Real provider responses |

The current implementation uses `OPENAI_API_KEY` with `@ai-sdk/openai` and `streamText`.

## Optional names

| Name | State when absent | Used by |
|---|---|---|
| `ANTHROPIC_API_KEY` | Placeholder | Claude route/status |
| `XAI_API_KEY` | Placeholder | Grok route/status |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Placeholder | Gemini route/status |
| `OPENWEBUI_BASE_URL` | Placeholder | Local Open WebUI endpoint |
| `OPENWEBUI_API_KEY` | Placeholder | Local Open WebUI authentication |
| `DATABASE_URL` | Blocked | Durable chat history and audit persistence |
| `N8N_BASE_URL` | Blocked | n8n API/workflow execution |
| `N8N_API_KEY` | Blocked | n8n API authentication |
| `N8N_WEBHOOK_SECRET` | Blocked | n8n webhook verification |
| `VERCEL_TOKEN` | Placeholder | Vercel operations integration |
| `GITHUB_TOKEN` | Placeholder | GitHub operations integration |
| `BLOB_READ_WRITE_TOKEN` | Placeholder | Blob-backed files |
| `SUPPORT_EMAIL_TO` | Placeholder | Support escalation destination |

## Vercel dashboard location

`Vercel → Projects → a11-k-core → Settings → Environment Variables`

For a replacement or rotation:

1. Generate a different random value for `COMMAND_ACCESS_TOKEN` and `AUTH_SECRET`.
2. Set the target to **Production** and **Preview**.
3. Store as encrypted/sensitive.
4. Redeploy the canonical project once.
5. Test `/command` through `/command/gate`.

Never put secrets in a URL, Git remote, source file, report, screenshot, or chat message.

## Production gate behaviour

- Missing either gate variable: production `/command` stays `403`; private APIs return `503`.
- Both present: unauthorised browser requests redirect to `/command/gate`.
- Correct token: server sets a signed, HttpOnly `a11k_command_gate` cookie.
- Query-string tokens are rejected and stripped from gate redirects.
- Private responses retain `X-Robots-Tag: noindex, nofollow, noarchive`.

## Deployment rule

Environment changes apply to new deployments. Deploy only the canonical `a11-k-core` project after the code and environment changes are ready. Do not create or deploy `a11k-command` or any duplicate project.
