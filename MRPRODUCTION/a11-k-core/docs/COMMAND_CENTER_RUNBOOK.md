# COMMAND_CENTER_RUNBOOK (A11-K)

## Route
* `/command` or `/command/gate`

## Protection
* Must require `COMMAND_ACCESS_TOKEN` (production-safe).
* If token is not configured in production: return 403.

## Cockpit workflow
1. Overview
    * action queue
    * top risks
    * escalations (only critical/high)
2. Brand Fleet
3. Domains
4. Deployments
5. Models
6. AI Chat (protected)
7. n8n Workflows
8. SEO/Growth
9. Support
10. Ideas Vault / OneDrive sources
11. Logs / Next actions

## Safety
* Never show secrets or internal tokens.
* Never show customer message bodies.
* All wiring statuses must be placeholder/blocked when not configured.
