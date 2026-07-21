# Cost and Limits — A11-K

| Area | State | Guardrail |
|---|---|---|
| OpenAI chat | Configured; telemetry unknown | Bounded output; avoid repeated loops |
| Other providers | Placeholder | Do not call without a configured route |
| Vercel deploy | Canonical project available | One intentional deploy after env changes |
| n8n | Blocked | No production workflow calls without credentials/test proof |
| Database | Blocked | No persistence claim until `DATABASE_URL` exists |

## Policy

- Use a small model for summaries and status classification.
- Use the strongest model for architecture, difficult code review, and final decisions.
- Batch site checks and cache safe status checks.
- Stop deployment attempts if Vercel reports a limit.
- Treat unknown provider cost/rate data as `unknown`, not zero.
- Require rollback and owner approval for risky changes.
