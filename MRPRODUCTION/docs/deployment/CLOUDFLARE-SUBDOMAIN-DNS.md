# Cloudflare DNS — set ALL public products as subdomains
Domain: mind-reply.com
Goal: every public site = <product>.mind-reply.com on Vercel
Proxy: DNS only (grey cloud) for all CNAME records below

## 1) DELETE these if present
Any CNAME whose target contains:
- cfargotunnel.com
- 9cd050c8-412f-47fc-a470-fbb67c75cc51

## 2) CREATE / UPDATE records
| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | www | cname.vercel-dns.com | DNS only |
| CNAME | aurel | cname.vercel-dns.com | DNS only |
| CNAME | a11k | cname.vercel-dns.com | DNS only |
| CNAME | sdr | cname.vercel-dns.com | DNS only |
| CNAME | regex | cname.vercel-dns.com | DNS only |
| CNAME | sql | cname.vercel-dns.com | DNS only |
| CNAME | tutor | cname.vercel-dns.com | DNS only |
| CNAME | lens | cname.vercel-dns.com | DNS only |
| CNAME | l402 | cname.vercel-dns.com | DNS only |

## 3) Apex mind-reply.com
Keep current working Vercel apex setup.
If needed: A record → 76.76.21.21 (Vercel)

## 4) In Vercel (each project → Domains)
Add matching domain:
- aurel.mind-reply.com → project aurel
- sdr.mind-reply.com → project sdr-agent
- regex.mind-reply.com → project regex-forge
- sql.mind-reply.com → project sql-studio
- tutor.mind-reply.com → project code-tutor
- lens.mind-reply.com → project code-lens
- l402.mind-reply.com → project l402-skills
- a11k.mind-reply.com → project a11k
- www.mind-reply.com → main mindreply project

## 5) Verify
https://aurel.mind-reply.com
https://sdr.mind-reply.com
https://regex.mind-reply.com
https://sql.mind-reply.com
https://tutor.mind-reply.com
https://lens.mind-reply.com
https://l402.mind-reply.com
https://a11k.mind-reply.com
https://www.mind-reply.com
