# ESCALATION_RULES (A11-K)

## Purpose
Escalate to Angel **only** when a real operational risk exists (production down, boundary risk, secrets/env missing for production, or destructive/public-risk actions).

## Severity
* **Critical**
    * Production site down
    * Public/private leakage risk
    * Payment/billing issue
    * DNS/domain failure
    * Deployment repeatedly failing
    * Secret/env missing for production
    * Destructive action needed
* **High**
    * Customer support urgency high
    * Angry customer
    * Legal/contract/billing message
    * Major SEO/indexing issue
    * Broken intake/contact form
    * Workflow failure affecting users
* **Medium**
    * Stale project
    * Missing metadata
    * Workflow placeholder
    * Brand page needs content
    * Model provider unavailable
* **Low**
    * Copy polish
    * Design improvement
    * Optional SEO page
    * Experiment/lab idea

## Escalation message format (exact)

Plain Text

Severity: Critical / High / Medium / Low
Affected system:
What happened:
Why it matters:
Recommended action:
What Angel must do:
Safe fallback active: yes/no
Blocked by:

## Escalate only for
* production site down
* DNS/domain failure
* Vercel deploy limit/blocker
* deployment failing repeatedly
* missing production secret
* customer urgency high
* angry/legal/billing/customer-risk message
* private data exposure risk
* destructive action needed
* payment/plan issue
* public/private boundary risk

## Do not interrupt for
* normal progress
* optional copy polish
* minor design tweaks
* successful builds
* low-priority idea notes
