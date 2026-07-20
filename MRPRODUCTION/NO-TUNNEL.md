# PERMANENT DECISION — No Cloudflare Tunnel

## What those IDs were (ignore them)
| ID | Meaning | Action |
|---|---|---|
| `241d88aa4edc5575bd74c89d4c9d41a8` | Cloudflare **Zone ID** for mind-reply.com | Ignore. Not needed for Vercel. |
| `9cd050c8-412f-47fc-a470-fbb67c75cc51` | Old **Tunnel ID** | Dead. Do not restart. |
| `b7f7884ba7b5622bc929ef9c7f196a2b` | Cloudflare Account tag | Ignore for site hosting. |

## Decision
**STOP using Cloudflare Tunnel for public sites.**
Public sites run on **Vercel only**. This PC does not need to stay on for sites to stay live.

## AUREL (done)
- Live: https://aurel.mind-reply.com  (Vercel 200)
- Also: https://aurel-one.vercel.app  (Vercel 200)
- Local tunnel: NOT installed on DESKTOP-73C17P4 (correct)

## Optional DNS cleanup (Cloudflare dashboard, 30 seconds)
If you still see a CNAME for `aurel` pointing to `*.cfargotunnel.com`:
1. Edit record `aurel`
2. Type: CNAME
3. Target: `a00feb97f3cf4b49.vercel-dns-017.com.`
4. Proxy: **DNS only** (grey cloud)
5. Save

Site already works even with residual tunnel CNAME because Vercel is answering.

## Do NOT run
- cloudflared service install
- cloudflared tunnel run
- any local port 3000–3013 tunnel mapping for production

## Keep using
- Vercel for public deploys
- Supabase project `aziwdgndohdgnwztpwdi` for data/MCP
- Local Next only for development (`npm run dev`)
