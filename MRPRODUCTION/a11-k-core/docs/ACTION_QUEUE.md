# ACTION_QUEUE (A11-K)

## Purpose
A persistent queue of proposed operational actions.

## Action object
Each action is one record:
* id
* brand/site
* type
* priority (qualitative: low/medium/high)
* status: todo | doing | blocked | waiting owner | shipped | verified | archived
* owner (agent/angel)
* blocker (free text)
* next action
* escalation level (low/medium/high/critical)

## Command Center visibility
The queue must be shown in **/command → Overview**.

## Status rules
* `blocked` means a hard dependency is missing (env/credentials/DNS/token).
* `waiting owner` means Angel approval is required (Level 4).
* `verified` means a post-change check passed.

## No secrets rule
Queue must never store tokens, secrets, webhook secret values, or private customer content.
