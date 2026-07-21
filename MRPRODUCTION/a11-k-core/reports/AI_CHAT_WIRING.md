# AI Chat Wiring — Current Result

## Status
Implemented locally and build-verified. The private `/command/chat` client calls `/api/chat`, which uses the Vercel AI SDK `streamText` path with `@ai-sdk/openai` when `OPENAI_API_KEY` is present.

## Provider behaviour
- OpenAI: locally configured from a source-backed ignored environment file; value never rendered or committed.
- Other providers: status-only until their exact provider keys are configured.
- Missing names are rendered without values.
- If no provider exists, the API returns an honest placeholder response and does not invent text.

## Safety
- Safe mode is enabled by the command client.
- `allowActions` is false by default.
- The system prompt forbids destructive actions, DNS changes, secret changes, public/private exposure, production webhook activation, and unapproved deployments.
- Risky actions must be marked owner approval required.

## Persistence
`DATABASE_URL` is missing. Chat history is currently local in the client session; durable persistence is blocked until the database is configured.

## Build
`pnpm build` passed with 29/29 generated routes.

## Blockers
- `COMMAND_ACCESS_TOKEN` / full auth configuration is missing for production command access.
- `N8N_BASE_URL` and `N8N_API_KEY` are missing, so n8n remains placeholder/blocked.
- Production URL verification must be recorded separately; no deployment claim is made here.
