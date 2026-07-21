# SHADOW_COMPANY_MODEL (A11-K)

## Purpose
A private AI operating twin that mirrors the estate and simulates likely outcomes.

## Twins
### BrandTwin
* brand name
* public/private status
* domain/subdomain
* source repo/folder
* positioning
* audience
* CTA
* SEO state
* workflow state
* risk state
* next action

### SiteTwin
* URL
* HTTP status (abstract)
* deployment project (abstract)
* metadata/content/support-chat state (abstract)
* proof layer state
* last verified (abstract)
* blocker

### Workflow Status
* workflow automation workflow name
* trigger (abstract)
* input/output (abstract)
* status: active/placeholder/blocked
* credentials needed (names only, protected cockpit)
* escalation rule
* last known state
* owner action needed

### AI Model Status
* provider
* model purpose
* configured yes/no
* missing env names only (protected cockpit)
* recommended use
* fallback
* risk

### CustomerSignalTwin
* source
* issue type
* urgency
* sentiment/risk flag
* recommended route
* escalation needed (yes/no)

### Decision Preview
* proposed action
* affected brand/site/workflow
* expected benefit
* risk
* confidence
* human approval required
* rollback path

### IdeaTwin
* idea name
* source file/link (protected or internal reference)
* concept
* audience
* status
* build/validate/archive recommendation
