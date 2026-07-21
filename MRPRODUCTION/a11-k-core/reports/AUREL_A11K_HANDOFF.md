# AUREL / A11-K Handoff

Created:
- docs/AUREL_PRODUCT_DIRECTION.md
- docs/prompts/FINAL_MASTER_COMMAND.md
- .env.example

Next:
1. Run pnpm.cmd build
2. Add real environment values to Vercel only
3. Deploy once with vercel deploy --prod --yes

Do not commit real secrets.
Do not run repeated deploys when Vercel limit is active.
