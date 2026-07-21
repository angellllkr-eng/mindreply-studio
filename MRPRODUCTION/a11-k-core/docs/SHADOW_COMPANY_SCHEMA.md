# SHADOW_COMPANY_SCHEMA (A11-K)

## Storage model (example)
Use qualitative fields by default.

BrandTwin
* id
* name
* type
* domain
* visibility
* status
* positioning
* nextAction

SiteTwin
* id
* url
* status
* proofState
* blocker

WorkflowTwin
* id
* name
* status
* webhookPath (never store secrets)
* requiredCredentialsNames (protected cockpit)
* ownerApprovalNeeded

ModelTwin
* id
* provider
* purpose
* configured
* fallbackActive
* missingEnvNames (protected cockpit)

DecisionTwin
* id
* action
* affectedSystem
* risk
* confidence
* approvalRequired
* fallback

IdeaTwin
* id
* title
* status
* recommendation
