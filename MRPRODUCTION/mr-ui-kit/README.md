# MR UI Kit — shared design system for the MRPRODUCTION fleet

Simple, human-friendly fronts. Heavy backends. One kit, seven products.

## Principles
- **Human-friendly first**: one primary action per screen, plain language, no jargon walls
- **Glassmorphism 2.0**: naval + coral palette, Space Grotesk display, Inter body, JetBrains Mono code
- **Light by default**, dark on toggle — readable in any room
- **One backend, many faces**: every frontend talks to `https://api.mind-reply.com` (local: `http://localhost:3001`)
- **No cutoff**: responsive, no horizontal scroll, touch-friendly (44px min targets)

## Palette
- `--navy-0: #0A0E1A` (deep bg, dark mode)
- `--navy-1: #111827`
- `--navy-2: #1E293B`
- `--coral: #FF6B5B` (primary action)
- `--coral-soft: #FF8A7A`
- `--ink: #0F172A` (text, light mode)
- `--ink-mute: #64748B`
- `--glass-brd: rgba(255,255,255,0.08)`
- `--glass-bg: rgba(255,255,255,0.04)`

## Typography
- Display: 'Space Grotesk', sans-serif
- Body: 'Inter', system-ui, sans-serif
- Mono: 'JetBrains Mono', monospace

## Components (this kit ships)
- `<KitCard>` — glass card with optional header/footer
- `<KitButton>` — primary (coral) / ghost / danger
- `<KitInput>` — labeled input with helper text
- `<KitBadge>` — status pill (live/pending/error)
- `<KitNav>` — top bar with brand mark + links
- `<KitEmpty>` — friendly empty state with icon
- `<KitLoader>` — skeleton/spinner
- `<KitChat>` — chat surface wired to `/api/chat`
- `<KitHNList>` — HN stories wired to `/api/hn`
- `<KitLeaderboard>` — model ELO table wired to `/api/battles/leaderboard`

## Backend contract (all frontends use this)
- `GET  /api/health` — liveness
- `GET  /api/agents` — model roster
- `GET  /api/memory` · `POST /api/memory` · `DELETE /api/memory/:key` — persistence
- `POST /api/chat` — multi-provider LLM with fallback trail
- `GET  /api/hn` · `POST /api/hn/refresh` — HN cache
- `GET  /api/battles` · `POST /api/battles` · `GET /api/battles/leaderboard` — model arena
- `GET  /api/fleet` — live status of all 9 subdomains
