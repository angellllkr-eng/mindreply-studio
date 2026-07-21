# AUTONOMY_LEVELS (A11-K)

## Level 0 — Observe only
* read status
* show dashboard
* no action

## Level 1 — Prepare
* draft copy
* prepare workflow placeholders
* prepare PRs
* prepare reports
* no production change

## Level 2 — Safe execute
* update docs
* run status checks
* update non-destructive UI
* create non-destructive reports
* update action queue
* create support ticket

## Level 3 — Controlled production
* deploy approved safe changes if rollback exists
* publish approved content
* requires rollback path

## Level 4 — Owner approval required
* DNS/domain changes
* billing/payment
* public/private exposure
* delete/archive projects
* send sensitive customer message
* production workflow connection activation
* secret/env changes

## Default
Use Level 1 or Level 2 unless explicitly approved.
