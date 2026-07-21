# Model Routing Map — A11-K

## Provider truth

| Provider | Required name | Local state | Vercel state | Route/state |
|---|---|---|---|---|
| OpenAI | `OPENAI_API_KEY` | Configured | Production + Preview configured | Active route via `@ai-sdk/openai` |
| Vercel AI Gateway | `AI_GATEWAY_API_KEY` | Missing | Missing | Placeholder until deliberately wired |
| Anthropic / Claude | `ANTHROPIC_API_KEY` | Missing | Missing | Status placeholder |
| xAI / Grok | `XAI_API_KEY` | Missing | Missing | Status placeholder |
| Google / Gemini | `GOOGLE_GENERATIVE_AI_API_KEY` | Missing | Missing | Status placeholder |
| Open WebUI | `OPENWEBUI_BASE_URL`, `OPENWEBUI_API_KEY` | Missing | Missing | Local fallback placeholder |

## Mode defaults

| Mode | Purpose | Preferred route | Safe fallback |
|---|---|---|---|
| Chief Orchestrator | Coordinate safe actions | OpenAI | Status-only preparation |
| Shipping Engineer | Code/build/deploy/verify | OpenAI or Anthropic | Build checklist |
| Brand Architect | Positioning/copy | OpenAI or Google | Source-backed draft |
| n8n Operator | Workflow mapping | OpenAI or Anthropic | Placeholder map |
| DevOps/DNS Operator | Access/deployment risk | OpenAI | Manual preflight |
| Shadow Analyst | Simulation/risk | OpenAI or Anthropic | Qualitative twin |
| Cost & Limits Analyst | Spend/rate awareness | OpenAI | Rule warnings |
| Audit Analyst | Traceability | OpenAI | Markdown audit |

AI output is advisory. Production deploys, DNS, secrets, billing, private/public changes, customer-sensitive messages, and production n8n activation require owner approval and rollback paths.
