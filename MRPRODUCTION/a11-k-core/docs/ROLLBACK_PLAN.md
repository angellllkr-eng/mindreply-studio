# Rollback Plan — A11-K

## Production deployment

- Promote the previous known-good Vercel deployment.
- Revert the canonical commit if necessary.
- Keep `/command` protected during rollback.

## Command gate

- Rotate `COMMAND_ACCESS_TOKEN` if compromised.
- Rotate `AUTH_SECRET` to invalidate existing signed gate cookies.
- Redeploy once; old cookies then fail validation.
- Never use a query-string token fallback.

## AI provider

- Rotate/remove the provider variable if compromised.
- Revert the model route or return to honest status-only fallback.
- Keep `allowActions: false` until action tooling has separate approvals.

## workflow automation

- Deactivate the workflow.
- Remove compromised credentials.
- Switch customer-facing paths to the manual fallback.
- Mark blocked until a safe test passes.

## Domain/public route

- Remove the domain from the wrong project.
- Restore the previous DNS record.
- Remove the route from sitemap/navigation and apply noindex.
- Verify the public site before reconnecting.
