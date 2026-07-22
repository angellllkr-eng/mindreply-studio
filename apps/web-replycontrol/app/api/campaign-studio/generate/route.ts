import { NextRequest, NextResponse } from 'next/server';

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

    // Placeholder — replace with OpenAI / Anthropic later
    const result = `Agency Campaign Brief: ${prompt}

Brand context: ${brand ?? 'replycontrol'}

• Creative Concepts (3 variants)
  1. Bold authority positioning
  2. Data-driven thought leadership
  3. Peer-to-peer CMO narrative

• Channel Strategy
  – LinkedIn organic + sponsored
  – Email nurture sequence (5 touches)
  – Retargeting ads

• Client Presentation Deck Ready
• Automated Execution Agents Deployed
• Timeline: 48h first draft → 72h full package`;

    return NextResponse.json({ content: result });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
