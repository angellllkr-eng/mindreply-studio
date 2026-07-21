# Command Center Runbook — A11-K

## Entry

`https://a11-k.space/command` is the private cockpit. The default view is Ask A11-K at `/command/chat`.

## Production protection

Production requires both:

- `COMMAND_ACCESS_TOKEN`
- `AUTH_SECRET`

Flow:

1. Request `/command`.
2. Middleware checks the signed HttpOnly cookie or a private `x-a11k-command-token` header.
3. Without a valid session, the browser is redirected to `/command/gate`.
4. Submit the owner token to `/api/command/gate`.
5. The server signs `a11k_command_gate` with HMAC-SHA-256 and sets it as HttpOnly, Secure in production, SameSite=Lax, and 12-hour expiry.
6. Middleware validates the signed cookie on subsequent private requests.

Raw tokens are not accepted in query strings. The gate redirect strips the original query string to prevent URL leakage.

## Cockpit order

1. Ask A11-K / Chat
2. Overview and action queue
3. Brand fleet
4. Workflows
5. Models
6. Deployments
7. Operating Twin
8. OneDrive sources
9. Support
10. Settings / logs

## State model

- **Active** — implemented and backed by a verified configured dependency.
- **Placeholder** — UI/docs exist but the live dependency is not connected.
- **Blocked** — a required environment variable, credential, domain, or owner approval is missing.
- **Verified** — a post-change check passed; do not use this for an untested assumption.

## AI chat

The canonical client uses the Vercel AI SDK OpenAI `streamText` route at `/api/chat`. Production requires `OPENAI_API_KEY` or an intentionally wired `AI_GATEWAY_API_KEY` route.

Safe mode is on and `allowActions` is false. Chat may prepare recommendations but does not execute DNS, secrets, destructive actions, production webhooks, billing changes, or unapproved deployments.

If no provider is available, the endpoint returns an honest no-response fallback. It never fabricates a completion.

## Verification checklist

- `/command` redirects unauthorised users to `/command/gate`.
- Correct token creates a session and loads Ask A11-K.
- Incorrect token receives 401.
- Private API requests without a session receive 401/503.
- Private responses contain noindex/no-store headers.
- No token appears in browser URLs or source output.
- `mind-reply.com` is not modified by command changes.

## Escalation

Use the exact format in `ESCALATION_RULES.md`. Do not interrupt for successful builds, copy polish, or ordinary placeholder work.
