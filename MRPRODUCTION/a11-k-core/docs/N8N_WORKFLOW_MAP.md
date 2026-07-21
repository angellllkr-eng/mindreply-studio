# workflow automation Workflow Map — A11-K

These are operating mappings, not claims of active execution. A workflow becomes **active** only after credentials exist and a safe test run is verified.

| Workflow | Trigger | workflow connection path | Required names | State | Safe fallback |
|---|---|---|---|---|---|
| Brand Status Check | Manual/scheduled | `/workflow connection/brand-status-check` | `N8N_BASE_URL`, `N8N_API_KEY` | Blocked | Manual check |
| Site Down Alert | Verified outage | `/workflow connection/site-down-alert` | `N8N_BASE_URL`, `N8N_API_KEY`, `SUPPORT_EMAIL_TO` | Blocked | Escalate after verification |
| Public Intake | Form submit | `/workflow connection/public-intake` | `N8N_BASE_URL`, `N8N_API_KEY`, `N8N_WEBHOOK_SECRET` | Blocked | Manual contact route |
| Chat Escalation | High-risk signal | `/workflow connection/chat-escalation` | `N8N_BASE_URL`, `N8N_API_KEY` | Placeholder | Write escalation summary |
| Lead Capture | Approved intake | `/workflow connection/lead-capture` | `N8N_BASE_URL`, `N8N_API_KEY` | Placeholder | Prepare lead record |
| Customer Support Routing | Support request | `/workflow connection/support-routing` | `N8N_BASE_URL`, `N8N_API_KEY` | Placeholder | Manual queue |
| SEO Monitor | Manual/scheduled | `/workflow connection/seo-monitor` | `N8N_BASE_URL`, `N8N_API_KEY` | Placeholder | Manual metadata review |
| Deployment Watch | Deployment event | `/workflow connection/deployment-watch` | `N8N_BASE_URL`, `N8N_API_KEY`, `VERCEL_TOKEN` | Blocked | Vercel dashboard/CLI |
| Weekly Operating Report | Scheduled | `/workflow connection/weekly-operating-report` | `N8N_BASE_URL`, `N8N_API_KEY`, `DATABASE_URL` | Blocked | Markdown report |
| Idea Intake | Source submission | `/workflow connection/idea-intake` | `N8N_BASE_URL`, `N8N_API_KEY` | Placeholder | OneDrive index |
| Luxury/Meridian Review | Manual | `/workflow connection/meridian-review` | `N8N_BASE_URL`, `N8N_API_KEY` | Placeholder | Source-backed idea card |
| Shadow Estate Sync | Manual/scheduled | `/workflow connection/shadow-estate-sync` | `N8N_BASE_URL`, `N8N_API_KEY`, `DATABASE_URL` | Blocked | Static twin model |
| Decision Preflight | Proposed risky action | `/workflow connection/decision-preflight` | `N8N_BASE_URL`, `N8N_API_KEY` | Placeholder | Local preflight rules |
| Action Queue Update | Approved change | `/workflow connection/action-queue-update` | `N8N_BASE_URL`, `N8N_API_KEY`, `DATABASE_URL` | Blocked | Markdown queue |
| Model Availability Check | Manual/scheduled | `/workflow connection/model-availability` | `N8N_BASE_URL`, `N8N_API_KEY` | Placeholder | Env presence check |
| Cost/Limit Watch | Usage/deploy event | `/workflow connection/cost-limit-watch` | `N8N_BASE_URL`, `N8N_API_KEY` | Placeholder | Qualitative warnings |
| Audit Log Sync | Safe action event | `/workflow connection/audit-log-sync` | `N8N_BASE_URL`, `N8N_API_KEY`, `DATABASE_URL` | Blocked | Local summary docs |
| Rollback Reminder | High-risk change | `/workflow connection/rollback-reminder` | `N8N_BASE_URL`, `N8N_API_KEY` | Placeholder | Documented rollback |

Never store workflow connection secret values in this map. Never mark active from a file or endpoint name alone.
