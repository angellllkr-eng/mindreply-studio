import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are ReplyControl Agency OS, an elite AI campaign strategist and creative director for top-tier marketing agencies.
Generate client-ready, multi-channel campaign strategies including:
1. Executive Summary & Core Angle
2. 3 Distinct Creative Concepts (with copy hooks)
3. Channel Strategy (LinkedIn, Email, Paid Social)
4. Key Deliverables & Next Steps for Execution.
Format clearly using clean Markdown.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, brand } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    // Demo mode if key is missing
    if (!apiKey) {
      const mockResult = `[DEMO MODE — Add ANTHROPIC_API_KEY in Vercel Environment Variables for live Claude]

Agency Campaign Brief: ${prompt}
Brand Context: ${brand ?? 'replycontrol'}

• Creative Concepts (3 Variants)
  1. Bold Authority: "Scale Without the Workload"
  2. Data-Driven: "3x Campaign Output using Autonomous AI Agents"
  3. Executive Narrative: "How Modern Agencies Out-Execute Competitors"

• Channel Strategy & Asset Breakdown
  – LinkedIn Organic: 5 thought-leadership posts with carousel hooks
  – Cold Email Sequence: 4-step personalized nurture (CMO angle)
  – Paid Social: 3 ad copy variants targeting Marketing Directors

• Deliverables & Timeline
  – Executive Pitch Deck: Generated
  – Execution Workflow: Ready for deployment in Team Cockpit
  – Estimated SLA: First drafts in 2 hours, full rollout in 24 hours`;

      return NextResponse.json({ content: mockResult });
    }

    const model =
      process.env.ANTHROPIC_MODEL?.trim() || 'claude-sonnet-4-20250514';

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: 4096,
        temperature: 0.7,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `Client Prompt: ${prompt}\nBrand: ${brand ?? 'replycontrol'}`,
          },
        ],
      }),
    });

    if (!anthropicRes.ok) {
      const errData = await anthropicRes.text();
      console.error('Anthropic API Error:', anthropicRes.status, errData);
      return NextResponse.json(
        {
          error:
            'AI generation failed. Check ANTHROPIC_API_KEY, model access, and quota.',
        },
        { status: 500 }
      );
    }

    const data = await anthropicRes.json();
    const content =
      data.content
        ?.filter((block: { type: string }) => block.type === 'text')
        .map((block: { text: string }) => block.text)
        .join('\n')
        .trim() || 'No content generated.';

    return NextResponse.json({ content });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
