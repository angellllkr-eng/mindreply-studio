# Final Execution Audit — Wave 1 + AI SDK

## Decision
- Base: existing `a11-k-core`.
- Reason: canonical project already contains the protected command shell, route tree, registry surfaces, LiveProofPanel, and operating docs. Creating `a11k-command` would create a disconnected duplicate, contrary to truth.txt.
- Patterns adapted: Vercel Chatbot/AI SDK model route, shadcn/admin dashboard layout conventions, platform-style registry surfaces.

## Completed
- `/command` protected cockpit exists.
- Ask A11-K is the default command interface.
- Model, mode, context, and brand selectors exist.
- Provider status and missing environment names are visible.
- Real Vercel AI SDK OpenAI streaming route is wired for local/provider-configured use.
- Honest provider fallback remains active when no provider is configured.
- n8n, brand, action, cost, audit, rollback, escalation, shadow, and source surfaces/docs exist.
- `LiveProofPanel` exists.
- `.env.local` is ignored and no secret values are printed or committed.
- The old embedded-token Git remote was replaced with a token-free URL.
- `pnpm build` passed: 29/29 routes.

## Exact states
| Feature | State |
|---|---|
| Command shell | active locally / protected in production |
| Ask A11-K UI | active locally |
| OpenAI AI SDK stream | active where local key is available |
| Other provider routes | placeholder/status only |
| n8n automation | blocked until credentials |
| Durable chat persistence | blocked until `DATABASE_URL` |
| Production command auth | blocked until auth secret/token |
| Live proof workflow data | placeholder until backend workflow is connected |
| Deployment claim | not asserted without verified URL |

## Required env names only
`COMMAND_ACCESS_TOKEN`, `AUTH_SECRET`, `AI_GATEWAY_API_KEY`, `ANTHROPIC_API_KEY`, `XAI_API_KEY`, `GOOGLE_GENERATIVE_AI_API_KEY`, `OPENWEBUI_BASE_URL`, `OPENWEBUI_API_KEY`, `DATABASE_URL`, `N8N_BASE_URL`, `N8N_API_KEY`.

## Next 3 actions
1. Configure production command auth and provider variables in the canonical Vercel project.
2. Configure n8n only after confirming the production base URL and API key; keep workflows blocked otherwise.
3. Verify the canonical deployment and then attach/confirm `a11-k.space`; do not deploy a duplicate `a11k-command` project.
