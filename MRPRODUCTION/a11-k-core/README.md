# A11-K Core

Premium engine core for the MindReply ecosystem.

- **Public:** `/` landing, `/status`, `/models`, `/workflows`, `/docs`
- **Stealth/private:** `/command/*` (noindex, gate when `COMMAND_ACCESS_TOKEN` set)
- **Not for:** replacing mind-reply.com public customer site

## Status language

Every feature is one of: `active` | `placeholder` | `blocked` | `unknown`.

Missing systems are created **abstractly** (maps, cards, tables) and positioned **stealth** (private, noindex, no secrets, no fake live data).

## Dev

```bash
npm.cmd install
npm.cmd run dev
```

## Build

```bash
npm.cmd run build
```

## Env

Copy `.env.example` → `.env.local`. Never commit values.
