import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

const SYSTEM_PROMPT = `You are ReplyControl Agency OS, an elite AI campaign strategist and creative director for marketing agencies.
Generate a client-ready multi-channel campaign. Use clean Markdown with short sections:
1. Executive Summary
2. 3 Creative Concepts (name + hook + why it works)
3. Channel Plan (LinkedIn, Email, Paid)
4. Sample copy snippets
5. Deliverables & next steps
Keep it practical and scannable on mobile.`;

function demoCampaign(prompt: string, brand: string, note: string) {
  return `${note}

## Agency Campaign Brief
**Prompt:** ${prompt}
**Brand:** ${brand}

### Executive Summary
Position the brand as the agency OS that turns one brief into multi-channel execution—fast enough for client reviews on a phone, strong enough for a board deck.

### Creative Concepts
1. **Command Center** — "One brief. Full campaign." Authority + speed.
2. **AI Bench** — "Your creative team, always on." Scale without headcount panic.
3. **Client-Ready** — "From Slack ping to deck in hours." Delivery focus.

### Channel Plan
- **LinkedIn:** 5 posts (hook → proof → CTA), 1 carousel outline
- **Email:** 4-touch CMO nurture (problem → proof → offer → bump)
- **Paid:** 3 ad angles (efficiency, quality, control)

### Sample hooks
- "Stop rebuilding the same campaign from scratch."
- "Your next retainer shouldn't depend on one exhausted team."
- "Brief it once. Ship it everywhere."

### Deliverables
- Strategy one-pager
- Copy pack (LI + email + ads)
- Handoff checklist for Team Cockpit

### Next steps
1. Confirm audience + offer
2. Pick concept 1–3
3. Generate full assets in Studio
4. Assign agents in Team Cockpit`;
}

export async function POST(req: NextRequest) {
  try {
    let prompt = '';
    let brand = 'replycontrol';

    try {
      const body = await req.json();
      prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';
      if (typeof body?.brand === 'string' && body.brand.trim()) {
        brand = body.brand.trim();
      }
    } catch {
      return NextResponse.json(
        { content: demoCampaign('(empty)', brand, '⚠️ Could not read request. Showing demo brief.') },
        { status: 200 }
      );
    }

    if (!prompt) {
      return NextResponse.json(
        { content: 'Add a short campaign brief first, then tap Generate.' },
        { status: 200 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY?.trim();

    if (!apiKey) {
      return NextResponse.json({
        content: demoCampaign(
          prompt,
          brand,
          '📱 DEMO MODE — App works. For live Claude: Vercel → Settings → Environment Variables → ANTHROPIC_API_KEY → Redeploy.'
        ),
      });
    }

    // Stable default; override with ANTHROPIC_MODEL if needed
    const model =
      process.env.ANTHROPIC_MODEL?.trim() || 'claude-3-5-sonnet-latest';

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 50000);

    let anthropicRes: Response;
    try {
      anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model,
          max_tokens: 2500,
          temperature: 0.7,
          system: SYSTEM_PROMPT,
          messages: [
            {
              role: 'user',
              content: `Client brief:\n${prompt}\n\nBrand: ${brand}\nKeep output mobile-scannable.`,
            },
          ],
        }),
      });
    } catch (e) {
      clearTimeout(timeout);
      const aborted = e instanceof Error && e.name === 'AbortError';
      return NextResponse.json({
        content: demoCampaign(
          prompt,
          brand,
          aborted
            ? '⏱️ Claude timed out on mobile network. Demo brief below — try again on Wi‑Fi.'
            : '📡 Network error reaching Anthropic. Demo brief below — try again.'
        ),
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text().catch(() => '');
      console.error('Anthropic error', anthropicRes.status, errText);

      let hint = 'Check ANTHROPIC_API_KEY and redeploy.';
      if (anthropicRes.status === 401) hint = 'Invalid API key — fix ANTHROPIC_API_KEY in Vercel.';
      if (anthropicRes.status === 404 || anthropicRes.status === 400)
        hint = 'Model issue — set ANTHROPIC_MODEL=claude-3-5-sonnet-latest (or claude-3-haiku-20240307).';
      if (anthropicRes.status === 429) hint = 'Rate limit — wait 30s and try again.';

      return NextResponse.json({
        content: demoCampaign(
          prompt,
          brand,
          `⚠️ Claude unavailable (${anthropicRes.status}). ${hint}\nDemo brief so you’re not stuck:`
        ),
      });
    }

    const data = await anthropicRes.json();
    const content =
      data.content
        ?.filter((block: { type: string }) => block.type === 'text')
        .map((block: { text: string }) => block.text)
        .join('\n')
        .trim() || demoCampaign(prompt, brand, 'Empty model response — demo brief:');

    return NextResponse.json({ content });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({
      content:
        'Something glitched, but the app is fine. Pull to refresh and try Generate again.\n\nTip: short briefs work best on phone.',
    });
  }
}
