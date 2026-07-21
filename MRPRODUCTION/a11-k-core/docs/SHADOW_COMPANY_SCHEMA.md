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

Workflow Status
* id
* name
* status
* webhookPath (never store secrets)
* requiredCredentialsNames (protected cockpit)
* ownerApprovalNeeded

AI Model Status
* id
* provider
* purpose
* configured
* fallbackActive
* missingEnvNames (protected cockpit)

Decision Preview
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
