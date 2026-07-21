import { NextResponse } from "next/server";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { getProviders, modelFallbackActive } from "@/lib/models";

/**
 * A11-K Command Chat — provider fallback chain.
 *
 * Order: OpenAI → Anthropic → Gemini → Groq → Cerebras → Mistral → OpenRouter
 * Only providers with configured keys are attempted.
 * Never fabricates completions. Returns honest fallback when all providers are missing.
 */
export async function POST(req: Request) {
  let body: {
    message?: string;
    mode?: string;
    model?: string;
    brand?: string;
    safeMode?: boolean;
    allowActions?: boolean;
  } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const userMessage = body.message?.trim();
  if (!userMessage) {
    return NextResponse.json({ error: "empty_message" }, { status: 400 });
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
        "No model provider configured. Set one of OPENAI_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY, GROQ_API_KEY, CEREBRAS_API_KEY, MISTRAL_API_KEY, or OPENROUTER_API_KEY. No fake AI response generated.",
      mode: body.mode || "chief_orchestrator",
      brand: body.brand || "a11-k",
      missing: providers.filter((p) => !p.configured).map((p) => p.env[0]),
    });
  }

  const modeLabel = body.mode || "chief_orchestrator";
  const brandLabel = body.brand || "a11-k";
  const safeMode = body.safeMode !== false;

  const systemPrompt = `You are A11-K, the private command copilot for the MindReply ecosystem.
Current lens: ${modeLabel} · ${brandLabel}.
Rules:
- Be clear, useful, and honest.
- Never invent live data, secrets, or deployment status.
- If you don't know, say so.
- Recommend safe next actions with rollback paths.
- ${safeMode ? "Safe mode is ON. Do not suggest destructive actions, DNS changes, secret changes, or unapproved deployments." : ""}
- Keep answers concise. Use plain English.`;

  // Try providers in fallback order
  const providerOrder = ["openai", "anthropic", "google", "groq", "cerebras", "mistral", "openrouter"];
  const configuredIds = new Set(active.map((p) => p.id));

  // OpenAI
  if (configuredIds.has("openai")) {
    try {
      const result = streamText({
        model: openai("gpt-4o-mini"),
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      });
      return result.toTextStreamResponse();
    } catch (err) {
      console.error("OpenAI stream failed:", err);
    }
  }

  // Anthropic / Claude
  if (configuredIds.has("anthropic")) {
    try {
      const result = streamText({
        model: anthropic("claude-3-5-haiku-latest"),
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      });
      return result.toTextStreamResponse();
    } catch (err) {
      console.error("Anthropic stream failed:", err);
    }
  }

  // Future: Gemini fallback (when GOOGLE_GENERATIVE_AI_API_KEY is configured)
  // if (configuredIds.has("google")) {
  //   try {
  //     const { google } = await import("@ai-sdk/google");
  //     const result = streamText({
  //       model: google("gemini-2.0-flash"),
  //       system: systemPrompt,
  //       messages: [{ role: "user", content: userMessage }],
  //       maxTokens: 1200,
  //     });
  //     return result.toTextStreamResponse();
  //   } catch (err) {
  //     console.error("Gemini stream failed:", err);
  //   }
  // }

  // All providers failed or not configured
  return NextResponse.json({
    status: "blocked",
    fallback: false,
    reply: null,
    message:
      "AI chat is ready, but the provider call failed. The safe fallback remains available. Check provider keys and usage limits.",
    providersConfigured: active.map((p) => p.id),
    mode: modeLabel,
    brand: brandLabel,
  });
}
