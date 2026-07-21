export async function POST(request: Request) {
  try {
    const body = await request.json();

    return Response.json({
      ok: true,
      answer:
        "AI chat is ready, but no provider key is connected yet. Missing env: AI_GATEWAY_API_KEY or provider key.",
      received: {
        model: body?.model || "auto",
        mode: body?.mode || "chief_orchestrator",
        context: body?.context || "whole_estate",
      },
      approvalsRequired: [
        "DNS/domain changes",
        "secrets/env changes",
        "product publishing",
        "ads/spend",
        "customer-sensitive messages",
        "destructive actions",
      ],
    });
  } catch {
    return Response.json({
      ok: false,
      answer: "Placeholder — backend not configured.",
    });
  }
}
