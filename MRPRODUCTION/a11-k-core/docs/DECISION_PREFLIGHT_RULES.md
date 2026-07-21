# DECISION_PREFLIGHT_RULES (A11-K)

## Purpose
Create a Decision Preview **before** major actions.

## Major actions
* deploy production
* change DNS/domain mapping
* publish new public page
* delete/archive project
* connect workflow automation production workflow connection
* send customer message
* use paid model/API heavily
* expose a route publicly

## Decision Preview requirements
Every Decision Preview must include:
* action
* reason
* affected system
* risk (qualitative)
* expected result
* fallback
* needs Angel (yes/no)

## Execution rule
* If destructive or risky → **do not execute**.
* Escalate to Angel for approval.

## Language
Use: Likely / Suggested / Risk signal / Needs validation / Safe to prepare / Owner approval required.
