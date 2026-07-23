#!/usr/bin/env bash
# Run this once, from inside the unzipped whatsapp-router/ directory.
# It stops and asks for each secret one at a time - nothing is stored in
# this script or in shell history beyond what wrangler itself keeps.
set -e

npm install
npm run typecheck
npm test

npx wrangler login

echo "z1cC0kcCJ63XP__gOAM_Dc9xBwXsE5s90taI4Bt4r6s" | npx wrangler secret put WHATSAPP_VERIFY_TOKEN
# ^ pre-generated for you - also copy this exact string into Meta's webhook
#   config as the Verify Token. Printed again at the end of this script.

npx wrangler secret put WHATSAPP_APP_SECRET
npx wrangler secret put WHATSAPP_ACCESS_TOKEN
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put XAI_API_KEY
npx wrangler secret put GEMINI_API_KEY
npx wrangler secret put GROQ_API_KEY
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY

npx wrangler deploy

echo ""
echo "=================================================="
echo "Deployed. Now go to Meta > WhatsApp > Configuration > Webhook:"
echo "  Verify Token: z1cC0kcCJ63XP__gOAM_Dc9xBwXsE5s90taI4Bt4r6s"
echo "  Callback URL: <the workers.dev URL wrangler just printed above>/webhook"
echo "=================================================="
