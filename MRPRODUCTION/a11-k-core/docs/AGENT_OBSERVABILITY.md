# AGENT_OBSERVABILITY (A11-K)

## Purpose
Make agent behavior auditable without logging secrets or private customer data.

## Event schema (minimum)
Record events with:
* event_id (uuid)
* timestamp (server time)
* actor (agent)
* event_type
* target (site/tool/workflow)
* summary (short, non-sensitive)
* approval_required (yes/no)
* blocker (if any)
* output_summary (if any)

## Minimum event types
* site_check
* deployment_check
* workflow_trigger
* model_request
* support_escalation
* seo_recommendation
* brand_update
* idea_review
* decision_preflight
* owner_approval_needed

## No secrets rule
Never log:
* API keys
* webhook secret values
* Authorization headers
* private customer messages

## Storage
* Public files: summaries only.
* Protected cockpit: full internal trace permitted.
