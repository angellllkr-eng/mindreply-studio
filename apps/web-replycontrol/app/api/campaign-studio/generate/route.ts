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

    const apiKey = process.env.OPENAI_API_KEY;

    // Fallback to structured placeholder if OPENAI_API_KEY is not configured
    if (!apiKey) {
      const mockResult = `[DEMO MODE - Add OPENAI_API_KEY to Vercel Environment Variables for live AI]

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

    // Live OpenAI GPT-4o call
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are ReplyControl Agency OS, an elite AI campaign strategist and creative director for top-tier marketing agencies. 
Generate client-ready, multi-channel campaign strategies including:
1. Executive Summary & Core Angle
2. 3 Distinct Creative Concepts (with copy hooks)
3. Channel Strategy (LinkedIn, Email, Paid Social)
4. Key Deliverables & Next Steps for Execution.
Format clearly using clean Markdown.`,
          },
          {
            role: 'user',
            content: `Client Prompt: ${prompt}\nBrand: ${brand ?? 'replycontrol'}`,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!openaiRes.ok) {
      const errData = await openaiRes.json();
      console.error('OpenAI API Error:', errData);
      return NextResponse.json(
        { error: 'AI generation failed. Check API key and quota.' },
        { status: 500 }
      );
    }

    const data = await openaiRes.json();
    const content = data.choices?.[0]?.message?.content ?? 'No content generated.';

    return NextResponse.json({ content });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
