import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export const runtime = "nodejs";
export const maxDuration = 60;

type ChatBody = {
  message?: string;
  model?: string;
  mode?: string;
  context?: string;
  provider?: string;
};

type ProviderPick = {
  id: string;
  client: ReturnType<typeof createOpenAI> | ReturnType<typeof createAnthropic>;
  defaultModel: string;
  kind: "openai-compatible" | "anthropic";
};

function buildProviders(): ProviderPick[] {
  const list: ProviderPick[] = [];

  const xai = process.env.XAI_API_KEY?.trim();
  if (xai) {
    list.push({
      id: "xai",
      kind: "openai-compatible",
      client: createOpenAI({ apiKey: xai, baseURL: "https://api.x.ai/v1" }),
      defaultModel: "grok-3",
    });
  }

  const anthropic = process.env.ANTHROPIC_API_KEY?.trim();
  if (anthropic) {
    list.push({
      id: "anthropic",
      kind: "anthropic",
      client: createAnthropic({ apiKey: anthropic }),
      defaultModel: "claude-sonnet-4-20250514",
    });
  }

  const openrouter = process.env.OPENROUTER_API_KEY?.trim();
  if (openrouter) {
    list.push({
      id: "openrouter",
      kind: "openai-compatible",
      client: createOpenAI({
        apiKey: openrouter,
        baseURL: "https://openrouter.ai/api/v1",
        headers: {
          "HTTP-Referer": "https://a11-k.space",
          "X-Title": "A11-K Command",
        },
      }),
      defaultModel: "openrouter/auto",
    });
  }

  const groq = process.env.GROQ_API_KEY?.trim();
  if (groq) {
    list.push({
      id: "groq",
      kind: "openai-compatible",
      client: createOpenAI({ apiKey: groq, baseURL: "https://api.groq.com/openai/v1" }),
      defaultModel: "llama-3.3-70b-versatile",
    });
  }

  const openai = process.env.OPENAI_API_KEY?.trim();
  const base = process.env.OPENAI_BASE_URL?.trim();
  if (openai) {
    list.push({
      id: "openai-compatible",
      kind: "openai-compatible",
      client: createOpenAI({ apiKey: openai, baseURL: base || undefined }),
      defaultModel: process.env.FALLBACK_OPENAI_MODEL?.trim() || "gpt-4o-mini",
    });
  }

  return list;
}

function resolveModel(provider: ProviderPick, requested?: string): string {
  if (!requested || requested === "auto") return provider.defaultModel;
  const r = requested.toLowerCase();

  if (provider.id === "xai") {
    if (r.includes("build")) return "grok-build";
    if (r.includes("4.5") || r.includes("4-5")) return "grok-4-latest";
    if (r.includes("grok")) return "grok-3";
  }

  if (provider.id === "anthropic") {
    if (r.includes("opus")) return "claude-opus-4-20250514";
    if (r.includes("haiku")) return "claude-haiku-4-5-20251001";
    if (r.includes("sonnet") || r.includes("claude")) return "claude-sonnet-4-20250514";
  }

  return requested;
}

function pickOrder(preferred?: string): ProviderPick[] {
  const all = buildProviders();
  if (!preferred || preferred === "auto") return all;
  const p = preferred.toLowerCase();
  const preferredList = all.filter((x) => {
    if (p === "xai" || p === "grok") return x.id === "xai";
    if (p === "anthropic" || p === "claude") return x.id === "anthropic";
    if (p === "openrouter") return x.id === "openrouter";
    if (p === "groq") return x.id === "groq";
    return x.id === preferred;
  });
  // preferred first, then remaining fallbacks
  const rest = all.filter((x) => !preferredList.some((y) => y.id === x.id));
  return [...preferredList, ...rest];
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatBody;
    const message = (body.message || "").trim();
    const mode = body.mode || "chief_orchestrator";
    const context = body.context || "whole_estate";

    if (!message) {
      return Response.json({ ok: false, answer: "Empty message." }, { status: 400 });
    }

    const providers = pickOrder(body.provider || body.model);
    if (!providers.length) {
      return Response.json({
        ok: false,
        answer:
          "No provider key connected. Need XAI_API_KEY and/or ANTHROPIC_API_KEY in a11-k-core/.env.local (and Vercel env for a11-k.space).",
        missing: ["XAI_API_KEY", "ANTHROPIC_API_KEY", "OPENROUTER_API_KEY", "OPENAI_API_KEY"],
      });
    }

    const system = [
      "You are A11-K Chief Orchestrator for Angel Krastev / MindReply estate.",
      "Be short, sharp, terminal-oriented. No fake data. Report missing config honestly.",
      `Mode: ${mode}. Context: ${context}.`,
      "Approvals required before: DNS, secrets, publishing, ads/spend, customer messages, destructive actions.",
    ].join(" ");

    const errors: Array<{ provider: string; model: string; error: string }> = [];

    for (const provider of providers) {
      const modelId = resolveModel(provider, body.model);
      try {
        const result = await generateText({
          model: provider.client(modelId),
          system,
          prompt: message,
          maxOutputTokens: 1200,
        });

        return Response.json({
          ok: true,
          answer: result.text,
          provider: provider.id,
          model: modelId,
          received: {
            model: body.model || "auto",
            mode,
            context,
            provider: body.provider || "auto",
          },
          fallbacksTried: errors,
          approvalsRequired: [
            "DNS/domain changes",
            "secrets/env changes",
            "product publishing",
            "ads/spend",
            "customer-sensitive messages",
            "destructive actions",
          ],
        });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        errors.push({ provider: provider.id, model: modelId, error: msg });
      }
    }

    return Response.json({
      ok: false,
      answer:
        "All providers failed. Usually empty API credits/billing — not missing wiring. Check console.x.ai + console.anthropic.com billing, then retry.",
      attempts: errors,
      providersConfigured: providers.map((p) => p.id),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return Response.json({
      ok: false,
      answer: `Provider call failed: ${msg}`,
    });
  }
}
