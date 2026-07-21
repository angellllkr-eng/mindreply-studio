# OPERATING_REPORT_SPEC (A11-K)

## Purpose
Generate a weekly/daily operating snapshot for Angel.

## Sections
* Site health
    * public surfaces status
    * protected cockpit status (no data)
* Workflow health
    * which workflows are active/placeholder/blocked
* Model status
    * provider configured yes/no
    * fallback active yes/no
    * missing env names only (allowed only on protected cockpit)
* Support requests
    * counts and top categories (no customer content)
* Escalations
    * list of escalations by severity + affected system
* SEO changes
    * pages added/updated
* Brand progress
    * delivery milestones per brand/module
* Top blockers
    * env/DNS/credentials/paywall/deploy limit
* Next 3 actions
    * ranked and labeled with expected approval level

## Scheduling (n8n)
* If n8n is configured: run a scheduled job.
* If n8n is not configured: output a placeholder mapping with required env/credential names only.

## Safety
No secrets, no webhook secret values, no private logs, no customer data.
