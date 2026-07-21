# Escalation Rules — A11-K

## Severity

### Critical
- Production site down
- Public/private data exposure risk
- DNS/domain failure
- Repeated deployment failure
- Billing/payment issue
- Missing production secret blocking a required path
- Destructive action required
- Credential/token compromise

### High
- Urgent customer issue
- Angry/legal/billing message
- Broken intake/contact form
- Workflow failure affecting users
- Public page exposes a private route
- Dangerous cost/rate-limit condition

### Medium
- Stale project
- Missing metadata
- Workflow placeholder
- Provider unavailable with safe fallback
- Non-critical platform limit

### Low
- Copy polish
- Optional SEO
- Design improvement
- Experiment idea

## Message format

```text
ESCALATION
Severity: Critical / High / Medium / Low
Affected system:
What happened:
Why it matters:
Recommended action:
What Angel must do:
Safe fallback active: yes/no
Blocked by:
Rollback path:
```

Escalate only real production, security, customer, credential, cost, DNS, or destructive-action risk. Do not interrupt for ordinary progress or successful builds.
