# MindReply

Monorepo for **MindReply** and **ReplyControl**.

## Apps

| App | Path | Domain |
|-----|------|--------|
| ReplyControl | `apps/web-replycontrol` | https://control.mind-reply.com |
| MindReply | `apps/web-mindreply` (soon) | https://mind-reply.com |

## ReplyControl — Agency Command Center

AI orchestration platform for marketing & creative agencies.

### Local development

```bash
npm install
npm run dev:replycontrol
```

Open [http://localhost:3000](http://localhost:3000).

### Vercel

1. Import this repo at [vercel.com/new](https://vercel.com/new)
2. **Root Directory:** `apps/web-replycontrol`
3. Framework: Next.js
4. Add domain: `control.mind-reply.com`

### Structure

```text
mind-reply/
├── apps/
│   └── web-replycontrol/
├── packages/
└── package.json
```
