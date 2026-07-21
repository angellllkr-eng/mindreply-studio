# DEPLOYMENT_RUNBOOK — A11-K Core

Purpose: deploy **only** the canonical project (`a11-k-core`) safely.

## Scope
* Build and deploy steps
* Protection / noindex safeguards
* Verification after deploy
* Rollback triggers

## Pre-deploy
1. Confirm the target is the canonical Vercel project: `a11-k-core`.
2. Confirm no destructive or secret-changing feature flags are enabled.
3. Confirm required production env names exist in Vercel (values are owner-only):
   * `COMMAND_ACCESS_TOKEN`
   * `AUTH_SECRET`
   * `OPENAI_API_KEY` or `AI_GATEWAY_API_KEY`

## Build
Run:
* `pnpm build`

## Deploy
Deploy only when Vercel allows deployments.
* Production deploy: `vercel --prod`

If Vercel deploy limit is hit:
* stop deploy attempts
* continue safe docs/code work
* record the blocker in `docs/COST_AND_LIMITS.md`

## Post-deploy verification
Verify by URL:
* `https://a11-k.space` returns 200
* `https://a11-k.space/command` is protected (redirects to gate without token)
* `https://a11-k.space/command/chat` loads the Ask A11-K chat UI
* Missing providers show honest “not connected yet” messaging

Verify by browser/network:
* Private pages set `noindex/no-store` headers
* No secrets appear in page HTML

## Rollback triggers (escalate)
Rollback if:
* public/private boundary breaks
* `/command` becomes public without protection
* production webhooks or destructive actions start unexpectedly

Rollback procedure:
* revert to previous known-good deployment
* rotate `AUTH_SECRET` if gate cookies might be compromised

