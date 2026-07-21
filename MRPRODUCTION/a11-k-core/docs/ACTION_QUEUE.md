# Action Queue — A11-K

| ID | System | Type | Priority | Status | Owner | Blocked by | Next action | Escalation |
|---|---|---|---|---|---|---|---|---|
| A11K-001 | A11-K command | Production access | High | doing | Shipping agent | New canonical deployment required | Deploy once, then test `/command/gate` | High |
| A11K-002 | A11-K command | Production deploy | High | todo | Shipping agent | Environment changes need a new deployment | Deploy canonical `a11-k-core` only | High |
| A11K-003 | A11-K chat | AI provider | High | doing | Shipping agent | Deployment verification pending | Test a gated stream request | Medium |
| A11K-004 | A11-K workflows | workflow automation wiring | High | blocked | Angel | `N8N_BASE_URL`, `N8N_API_KEY` | Add credentials, then run one safe test | High |
| A11K-005 | A11-K persistence | Durable history | Medium | blocked | Angel | `DATABASE_URL` | Configure database when selected | Medium |
| A11K-006 | Security | GitHub token rotation | Critical | waiting owner | Previously exposed token requires account action | Revoke old GitHub token | Critical |

No secret values, workflow connection contents, or customer message bodies belong in this queue.
