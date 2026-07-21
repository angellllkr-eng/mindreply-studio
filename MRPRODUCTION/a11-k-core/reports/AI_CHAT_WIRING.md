# AI Chat Wiring — A11-K

## Command chat
Primary private cockpit default view is **Ask A11-K** inside `/command`.

Chat UI consumes **streaming** text from:

* `GET/POST /api/chat`

## Request contract (server)
The backend reads UI selections:

* mode
* selectedModel
* context/brand target
* safeMode (default true)
* allowActions (default false)

If required provider env is missing, the server returns an **honest blocked response** (no fabricated AI).

## Provider routing
Model selection uses the configured provider route:

* OpenAI: requires `OPENAI_API_KEY`
* Vercel AI Gateway: requires `AI_GATEWAY_API_KEY` (if wired)

All other providers are shown as placeholders unless wired and configured.

## Safety
* No destructive actions
* No DNS/domain changes
* No secrets exposure
* No action execution without explicit owner approval

## Proof rule
This document is **wiring documentation only**. Treat provider “active” as verified only after a provider runtime call succeeds.
