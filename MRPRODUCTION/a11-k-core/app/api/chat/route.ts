import { NextResponse } from "next/server";
import { getProviders, modelFallbackActive } from "@/lib/models";

/**
 * Abstract chat endpoint.
 * Never fakes model completions.
 * Returns structured fallback when no provider keys exist.
 */
export async function POST(req: Request) {
  let body: {
    message?: string;
    mode?: string;
    model?: string;
    brand?: string;
  } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const providers = getProviders();
  const active = providers.filter((p) => p.configured);
  const fallback = modelFallbackActive();

  if (fallback || active.length === 0) {
    return NextResponse.json({
      status: "placeholder",
      fallback: true,
      reply: null,
      message:
        "No model provider configured. Set one of OPENAI_API_KEY, ANTHROPIC_API_KEY, XAI_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY, or OPENWEBUI_BASE_URL. No fake AI response generated.",
      mode: body.mode || "shipping_engineer",
      brand: body.brand || "a11-k",
      missing: providers.filter((p) => !p.configured).map((p) => p.env[0]),
    });
  }

  // Keys exist but full AI SDK wiring is abstract until intentionally activated.
  return NextResponse.json({
    status: "blocked",
    fallback: false,
    reply: null,
    message:
      "Provider env detected, but live model call path is not activated in this scaffold (stealth abstract). Wire AI SDK route before production chat.",
    providersConfigured: active.map((p) => p.id),
    mode: body.mode || "shipping_engineer",
    brand: body.brand || "a11-k",
  });
}
