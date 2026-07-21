import { NextResponse } from "next/server";
import { commandGateConfigured, hasEnv, missingEnv } from "@/lib/env";
import { getProviders } from "@/lib/models";

export const dynamic = "force-dynamic";

/**
 * Private, value-free runtime status endpoint.
 * It reports configuration presence and required names only; never secret values.
 */
export async function GET() {
  const providers = getProviders().map((provider) => ({
    id: provider.id,
    label: provider.label,
    env: provider.env,
    configured: provider.configured,
    purpose: provider.purpose,
    status: provider.status,
  }));

  return NextResponse.json(
    {
      status: "ok",
      providers,
      command: {
        authConfigured: commandGateConfigured(),
        persistenceConfigured: hasEnv("DATABASE_URL"),
      },
      missingEnv: missingEnv([
        "COMMAND_ACCESS_TOKEN",
        "AUTH_SECRET",
        "AUTH_GITHUB_ID",
        "AUTH_GITHUB_SECRET",
        "DATABASE_URL",
        "AI_GATEWAY_API_KEY",
        "OPENAI_API_KEY",
        "ANTHROPIC_API_KEY",
        "XAI_API_KEY",
        "GOOGLE_GENERATIVE_AI_API_KEY",
        "OPENWEBUI_BASE_URL",
        "OPENWEBUI_API_KEY",
        "N8N_BASE_URL",
        "N8N_API_KEY",
        "VERCEL_TOKEN",
        "GH_TOKEN",
        "GITHUB_TOKEN",
      ]),
    },
    {
      headers: {
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    },
  );
}
