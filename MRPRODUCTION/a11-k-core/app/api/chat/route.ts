import { NextResponse } from "next/server";
import { streamText } from "ai";
import { createOpenAI, openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { getProviders, modelFallbackActive } from "@/lib/models";

export const runtime = "nodejs";
export const maxDuration = 60;

type Body = {
  message?: string;
  mode?: string;
  model?: string;
  brand?: string;
  context?: string;
  safeMode?: boolean;
  allowActions?: boolean;
  engine?: string;
};

function ghToken() {
  return (
    process.env.GH_TOKEN?.trim() ||
    process.env.GITHUB_TOKEN?.trim() ||
    process.env.GITHUB_MODELS_API_KEY?.trim() ||
    ""
  );
}

function humanize(err: unknown) {
  const msg = err instanceof Error ? err.message : String(err || "");
  const low = msg.toLowerCase();
  if (low.includes("credit") || low.includes("billing") || low.includes("402") || low.includes("403")) {
    return "Paid provider balance is empty. Routed away from billing noise.";
  }
  if (low.includes("quota") || low.includes("rate")) return "Provider quota hit. Trying next engine.";
  if (msg.length > 180) return "Provider failed. Trying next engine.";
  return msg || "Provider failed";
}

async function callGitHubModels(model: string, system: string, user: string) {
  const key = ghToken();
  if (!key) return null;
  const models = [model, "DeepSeek-R1", "gpt-4.1", "gpt-4o", "Llama-4-Maverick-17B-128E-Instruct-FP8", "Llama-3.3-70B-Instruct", "Phi-4", "Codestral-2501"];
  const unique = [...new Set(models.filter(Boolean))];
  let lastErr = "";
  for (const m of unique) {
    try {
      const res = await fetch("https://models.inference.ai.azure.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: m,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
          max_tokens: 1800,
          temperature: 0.35,
          stream: true,
        }),
      });
      if (!res.ok) {
        const raw = await res.text();
        lastErr = humanize(raw);
        continue;
      }
      // Convert OpenAI-style SSE to plain text stream for the existing UI
      const reader = res.body?.getReader();
      if (!reader) continue;
      const decoder = new TextDecoder();
      const stream = new ReadableStream({
        async start(controller) {
          const enc = new TextEncoder();
          let buf = "";
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              buf += decoder.decode(value, { stream: true });
              const lines = buf.split("\n");
              buf = lines.pop() || "";
              for (const line of lines) {
                const t = line.trim();
                if (!t.startsWith("data:")) continue;
                const data = t.slice(5).trim();
                if (!data || data === "[DONE]") continue;
                try {
                  const json = JSON.parse(data);
                  const piece = json.choices?.[0]?.delta?.content || json.choices?.[0]?.message?.content || "";
                  if (piece) controller.enqueue(enc.encode(piece));
                } catch {}
              }
            }
          } catch (e) {
            controller.enqueue(enc.encode(`\n\n_${humanize(e)}_`));
          } finally {
            controller.close();
          }
        },
      });
      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-A11K-Provider": "github-models",
          "X-A11K-Model": m,
          "Cache-Control": "no-store",
        },
      });
    } catch (e) {
      lastErr = humanize(e);
    }
  }
  throw new Error(lastErr || "GitHub Models unavailable");
}

function engineToModel(engine?: string, model?: string) {
  const e = (engine || model || "auto").toLowerCase();
  const map: Record<string, string> = {
    auto: "DeepSeek-R1",
    r1: "DeepSeek-R1",
    "deepseek-r1": "DeepSeek-R1",
    "gpt-4.1": "gpt-4.1",
    g41: "gpt-4.1",
    "gpt-4o": "gpt-4o",
    g4o: "gpt-4o",
    "llama-4": "Llama-4-Maverick-17B-128E-Instruct-FP8",
    llama4: "Llama-4-Maverick-17B-128E-Instruct-FP8",
    "llama-3.3-70b": "Llama-3.3-70B-Instruct",
    "phi-4": "Phi-4",
    codestral: "Codestral-2501",
    "qwen-3": "Qwen2.5-72B-Instruct",
    qwen: "Qwen2.5-72B-Instruct",
    mistral: "Mistral-Large-2411",
    "mistral-large": "Mistral-Large-2411",
    openai: "gpt-4.1",
    fallback: "gpt-4o",
  };
  return map[e] || e || "DeepSeek-R1";
}

// === RELIABILITY CHAIN (Phase 1) ===
// 1. GitHub Models (DeepSeek-R1, GPT-4.1, Llama-4) - Primary
// 2. OpenAI (gpt-4o) - Automatic Fallback
// Claude, Grok, OpenRouter are currently disabled (no credits)
// =====================================

// === FALLBACK ORDER (Phase 1) ===
// 1. GitHub Models (R1 / GPT-4.1 / Llama 4) - Primary
// 2. OpenAI (gpt-4o) - Automatic fallback
// =====================================

// === PHASE 1 RELIABILITY ===
// Primary: GitHub Models (R1, GPT-4.1, Llama 4)
// Fallback: OpenAI (gpt-4o)
// ===========================

export async function POST(req: Request) {
  let body: Body = {};
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
  const modeLabel = body.mode || "chief_orchestrator";
  const brandLabel = body.brand || "a11-k";
  const contextLabel = body.context || "estate";
  const safeMode = body.safeMode !== false;
  const wanted = engineToModel(body.engine, body.model);

  const systemPrompt = [
    "You are A11-K, the private command copilot and chief orchestrator for Angel Krastev / MindReply.",
    `Lens: ${modeLabel} Â· context ${contextLabel} Â· brand ${brandLabel}.`,
    "Style: sharp, terminal-grade, premium operator. No toy tone. No fake data.",
    "Never invent live deployment status, secrets, or billing balances.",
    "If unpaid providers fail, continue with the working engine and say so briefly.",
    "Prefer concrete next actions with rollback paths.",
    safeMode
      ? "Safe mode ON: do not execute or urge DNS/secret/destructive/publish actions without explicit owner approval."
      : "Safe mode off for planning only â€” still no secret leakage.",
    "Public surfaces use stealth wording: Operating Twin, workflow automation â€” never Shadow Company / n8n jargon.",
  ].join(" ");

  if (fallback || active.length === 0) {
    return NextResponse.json({
      status: "placeholder",
      fallback: true,
      reply: null,
      message:
        "No model provider configured. Set GH_TOKEN / GITHUB_TOKEN for the live frontier path, or another provider key.",
      mode: modeLabel,
      brand: brandLabel,
      missing: providers.filter((p) => !p.configured).map((p) => p.env[0]),
    });
  }

  // 1) GitHub Models first â€” advanced live path
  if (ghToken()) {
    try {
      const ghRes = await callGitHubModels(wanted, systemPrompt, userMessage);
      if (ghRes) return ghRes;
    } catch (err) {
      console.error("GitHub Models failed:", humanize(err));
    }
  }

  // 2) OpenAI-compatible via AI SDK
  if (active.some((p) => p.id === "openai") && process.env.OPENAI_API_KEY) {
    try {
      const result = streamText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      });
      return result.toTextStreamResponse({
        headers: { "X-A11K-Provider": "openai", "X-A11K-Model": "gpt-4o" },
      });
    } catch (err) {
      console.error("OpenAI failed:", err);
    }
  }

  // 3) Anthropic
  if (active.some((p) => p.id === "anthropic") && process.env.ANTHROPIC_API_KEY) {
    try {
      const result = streamText({
        model: anthropic("claude-sonnet-4-20250514"),
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      });
      return result.toTextStreamResponse({
        headers: { "X-A11K-Provider": "anthropic", "X-A11K-Model": "claude-sonnet-4" },
      });
    } catch (err) {
      console.error("Anthropic failed:", err);
    }
  }

  // 4) Gemini
  if (active.some((p) => p.id === "google") && process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    try {
      const { google } = await import("@ai-sdk/google");
      const result = streamText({
        model: google("gemini-2.0-flash"),
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      });
      return result.toTextStreamResponse({
        headers: { "X-A11K-Provider": "google", "X-A11K-Model": "gemini-2.0-flash" },
      });
    } catch (err) {
      console.error("Gemini failed:", err);
    }
  }

  // 5) OpenRouter last
  if (process.env.OPENROUTER_API_KEY) {
    try {
      const or = createOpenAI({
        apiKey: process.env.OPENROUTER_API_KEY,
        baseURL: "https://openrouter.ai/api/v1",
        headers: {
          "HTTP-Referer": "https://a11-k.space",
          "X-Title": "A11-K Command",
        },
      });
      const result = streamText({
        model: or("openrouter/auto"),
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      });
      return result.toTextStreamResponse({
        headers: { "X-A11K-Provider": "openrouter", "X-A11K-Model": "auto" },
      });
    } catch (err) {
      console.error("OpenRouter failed:", err);
    }
  }

  return NextResponse.json({
    status: "blocked",
    fallback: false,
    reply: null,
    message:
      "Advanced engines are wired, but every live provider call failed (usually empty paid balances). GitHub Models is the permanent free frontier path â€” confirm GH_TOKEN on Vercel.",
    providersConfigured: active.map((p) => p.id),
    mode: modeLabel,
    brand: brandLabel,
  });
}



