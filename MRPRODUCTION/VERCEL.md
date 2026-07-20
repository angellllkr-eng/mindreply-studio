# Vercel / Vercast on DESKTOP-73C17P4

## Live (no login needed to view)
- https://aurel.mind-reply.com → 200 Vercel
- https://aurel-one.vercel.app → 200 Vercel

## Why @vercast is empty
Raycast Vercast needs a Vercel **Personal Access Token** in extension preferences.
CLI also has no auth.json on this machine yet.

## Fix (one time)
1. Open https://vercel.com/account/tokens
2. Create token (name: DESKTOP-73C17P4)
3. Raycast → Extensions → Vercel/Vercast → set Access Token
4. Optional CLI:
   vercel login
   # or
   vercel --token YOUR_TOKEN whoami

## Known project (from previous machine)
- projectName: aurel
- projectId: prj_PInZtszt4aHVQr7J03g7LZw1wwDP
- org/team: team_0plIJmQLgZC1wVv9zI2eVf3B
- production alias: aurel-one.vercel.app + aurel.mind-reply.com

## Policy
No Cloudflare Tunnel. Vercel only for public sites.
