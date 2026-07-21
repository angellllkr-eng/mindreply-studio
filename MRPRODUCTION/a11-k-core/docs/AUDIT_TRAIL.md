# Audit Trail — A11-K

## Event shape

```text
id:
event:
actor:
target:
reason:
status:
approval_required:
risk:
rollback:
cost_risk:
rate_limit_risk:
```

## Event types

`site_check`, `deployment_check`, `workflow_trigger`, `model_request`, `support_escalation`, `seo_recommendation`, `brand_update`, `idea_review`, `decision_preflight`, `owner_approval_needed`, `rollback_performed`, `rate_limit_high`, `cost_warning`.

## Safe verified summaries

| Event | Target | Result |
|---|---|---|
| `build_check` | `a11-k-core` | Verified: `pnpm build`, 29/29 routes |
| `env_presence_check` | Vercel `a11-k-core` | Names checked; values hidden |
| `gate_hardening` | `/command` | Signed HttpOnly cookie flow implemented |
| `model_route` | `/api/chat` | OpenAI Vercel AI SDK stream implemented |
| `n8n_status` | Workflow hub | Blocked until credentials and test run |

Never log raw tokens, provider keys, webhook secrets, private customer content, or private source contents.
