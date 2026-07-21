# DESIGN_SYSTEM (A11-K)

## Goals
Premium, dark, executive UI.
* glass/card look
* sharp hierarchy
* strong labels
* motion only when stable
* responsive layout
* accessible focus rings

## Tokens (use CSS vars)
* --bg, --bg-elev
* --bg-card
* --line, --line-strong
* --ink, --muted, --faint
* --accent, --accent-2
* --good, --warn, --bad
* --radius, --radius-sm
* --shadow
* --sans, --mono

## Components to standardise
* Button: `.btn`, `.btn-primary`, `.btn-ghost`
* Card: `.card` + glass variant
* Badge: `.badge` + status variants
* Table wrapper: `.table-wrap` (only for admin/protected)
* Focus: high-contrast outline for keyboard nav

## No-leak rule
Public pages must never render:
* env var names
* API keys
* webhook secret values
* internal tokens

## Robots/noindex
Private cockpit pages must have noindex/nofollow.
