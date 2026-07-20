# Mind-Reply ORG + PUBLIC SUBDOMAINS
Owner human: angellllkr-eng
GitHub org: https://github.com/Mind-Reply
Domain: mind-reply.com
Hosting: Vercel only (NO Cloudflare Tunnel)

## Public subdomain map (target state)
| Subdomain | Product | Current Vercel URL | DNS target (Cloudflare) | Proxy |
|---|---|---|---|---|
| mind-reply.com | Main hub | mindreply-bice.vercel.app / mind-reply.com | A 76.76.21.21 or Vercel nameservers | DNS only if CNAME |
| www.mind-reply.com | Main hub alias | same as apex | CNAME → cname.vercel-dns.com | DNS only |
| aurel.mind-reply.com | AUREL | aurel-one.vercel.app | CNAME → cname.vercel-dns.com | DNS only |
| a11k.mind-reply.com | A11-K | (assign Vercel project) | CNAME → cname.vercel-dns.com | DNS only |
| sdr.mind-reply.com | SDR Agent | sdr-agent-flax.vercel.app | CNAME → cname.vercel-dns.com | DNS only |
| regex.mind-reply.com | Regex Forge | regex-forge.vercel.app | CNAME → cname.vercel-dns.com | DNS only |
| sql.mind-reply.com | SQL Studio | sql-studio-weld.vercel.app | CNAME → cname.vercel-dns.com | DNS only |
| tutor.mind-reply.com | Code Tutor | code-tutor-flame.vercel.app | CNAME → cname.vercel-dns.com | DNS only |
| lens.mind-reply.com | Code Lens | code-lens-henna.vercel.app | CNAME → cname.vercel-dns.com | DNS only |
| l402.mind-reply.com | L402 Skills | l402-skills.vercel.app | CNAME → cname.vercel-dns.com | DNS only |

## REMOVE (old tunnel)
Delete any CNAME pointing to:
`9cd050c8-412f-47fc-a470-fbb67c75cc51.cfargotunnel.com`

## GitHub org repos (already under Mind-Reply)
- Mind-Reply/MindReply
- Mind-Reply/Aurel
- Mind-Reply/A11-K
- Mind-Reply/mind-reply.com

## Personal repos to transfer into org
- angellllkr-eng/Aurel → Mind-Reply/Aurel (exists; sync content)
- angellllkr-eng/Mind-Reply → Mind-Reply/MindReply (sync)
- angellllkr-eng/AUREL-brand → create Mind-Reply/AUREL-brand
- tool projects (regex/sdr/tutor/lens/sql/l402) → create under Mind-Reply when source available

## Vercel domain attach (per project)
vercel domains add <subdomain>.mind-reply.com <project>
Then set Cloudflare CNAME as above (Proxy OFF / DNS only)
