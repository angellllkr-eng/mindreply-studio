import type { ProviderStatus } from "./types";
import { missingEnv, providerConfigured } from "./env";

export const CHAT_MODES = [
  { id: "shipping_engineer", label: "Shipping Engineer", purpose: "code, deploy, verify" },
  { id: "seo_strategist", label: "SEO Strategist", purpose: "search pages, positioning, metadata" },
  { id: "brand_architect", label: "Brand Architect", purpose: "brand structure and copy" },
  { id: "n8n_operator", label: "n8n Workflow Operator", purpose: "workflows and webhooks" },
  { id: "customer_support", label: "Customer Support Agent", purpose: "support + escalation" },
  { id: "code_reviewer", label: "Code Reviewer", purpose: "review and fix paths" },
  { id: "growth_planner", label: "Growth Planner", purpose: "growth loops and SEO" },
  {
    id: "luxury_analyst",
    label: "Luxury/Hospitality/Yacht Analyst",
    purpose: "Meridian / hospitality idea review",
  },
  { id: "executive_summary", label: "Executive Summary", purpose: "owner-facing brief" },
] as const;

export function getProviders(): ProviderStatus[] {
  const defs: Omit<ProviderStatus, "configured" | "status">[] = [
    {
      id: "openai",
      label: "OpenAI",
      env: ["OPENAI_API_KEY"],
      purpose: "general + shipping modes",
    },
    {
      id: "anthropic",
      label: "Anthropic",
      env: ["ANTHROPIC_API_KEY"],
      purpose: "code review + luxury analysis",
    },
    {
      id: "xai",
      label: "xAI / Grok",
      env: ["XAI_API_KEY"],
      purpose: "shipping + executive summary",
    },
    {
      id: "google",
      label: "Google / Gemini",
      env: ["GOOGLE_GENERATIVE_AI_API_KEY"],
      purpose: "SEO + general",
    },
    {
      id: "openwebui",
      label: "Open WebUI / local",
      env: ["OPENWEBUI_BASE_URL"],
      purpose: "offline fallback",
    },
  ];

  return defs.map((d) => {
    const configured = providerConfigured(d.env);
    return {
      ...d,
      configured,
      status: configured ? "active" : "blocked",
    };
  });
}

export function modelFallbackActive(): boolean {
  return getProviders().every((p) => !p.configured);
}

export function modelMissingNames(): string[] {
  return missingEnv([
    "OPENAI_API_KEY",
    "ANTHROPIC_API_KEY",
    "XAI_API_KEY",
    "GOOGLE_GENERATIVE_AI_API_KEY",
    "OPENWEBUI_BASE_URL",
    "AI_GATEWAY_API_KEY",
  ]);
}
