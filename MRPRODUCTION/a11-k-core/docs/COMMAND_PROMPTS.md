# COMMAND_PROMPTS — Ask A11-K (Prompt Presets)

These are **UI prompt presets** used by the Command Center chat.

Rule: prompts are advisory. If provider keys are missing, the server must return a safe “provider not connected” response.

## Chief Orchestrator
* What should I ship next?
* What is blocked right now?
* What action requires my approval?

## Shipping Engineer
* Prepare a safe plan to reduce risk.
* Draft the steps for a production change (with rollback).
* What should I verify before deploying?

## Brand Architect
* Summarize what the current brand needs to improve.
* Rewrite the public copy in plain English.
* What should we avoid to keep the brand distinct?

## workflow automation Operator
* Which workflow is waiting for credentials?
* Create a safe workflow connection payload outline (no secrets).
* What would be the fallback if workflow automation is not connected?

## DevOps/DNS Operator
* Is this deploy safe right now?
* What domain wiring step is blocked?
* Provide a rollback checklist (no secrets).

## Shadow Analyst (Simulation)
* Simulate the safest next operational move.
* What could go wrong if we publish this?
* What should we undo?

## Cost & Limits Analyst
* Where could costs spike?
* How do we avoid repeated loops?
* What’s the safest model choice for this task?

## Audit / Observability Analyst
* Summarize the last system checks.
* What event types are most relevant today?
* Which logs are available vs blocked?
