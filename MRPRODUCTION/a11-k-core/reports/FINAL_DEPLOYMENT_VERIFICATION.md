# Production Verification — A11-K Core

## Date
2026-07-21

## Canonical target

- Project: `a11-k-core`
- Domain: `https://a11-k.space`
- Project ID: `prj_tF8MATzE2bOP0hPfiKZcuGX992dh`

## Verified before redeploy

| Check | Result |
|---|---|
| Local `pnpm build` | Passed: 29/29 routes |
| `/command` middleware | Signed token-cookie flow implemented |
| No query-string token acceptance | Implemented |
| Private noindex headers | Implemented |
| Vercel `COMMAND_ACCESS_TOKEN` | Encrypted in Production + Preview |
| Vercel `AUTH_SECRET` | Encrypted in Production + Preview |
| Vercel `OPENAI_API_KEY` | Encrypted in Production + Preview |
| `.env` tracked | No tracked `.env` file |
| `mind-reply.com` code | Not touched by this change |

## Deployment state

The current production deployment predates the latest gate hardening and environment setup. A new canonical deployment is required before claiming the new production behavior.

## Expected post-deploy behavior

- Unauthorised `/command` → redirect to `/command/gate` with no secret in the URL.
- Correct owner token → signed HttpOnly cookie and redirect to Ask A11-K.
- Wrong token → 401.
- Private APIs without cookie → 401 or configuration blocker response.
- Private headers → `X-Robots-Tag: noindex, nofollow, noarchive`, `Cache-Control: private, no-store`.
- Gated `/api/chat` with OpenAI configured → streamed provider response.

## Not yet claimable

- New code is not production-verified until the next canonical deployment is Ready.
- n8n is not active: `N8N_BASE_URL` and `N8N_API_KEY` remain absent.
- Durable persistence is not active: `DATABASE_URL` remains absent.
