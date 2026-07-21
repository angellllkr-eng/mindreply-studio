import type { ProviderStatus } from "./types";
import { missingEnv, providerConfigured } from "./env";

export const CHAT_MODES = [
  { id: "chief_orchestrator", label: "Chief Orchestrator", purpose: "coordinate safe next actions" },
  { id: "shipping_engineer", label: "Shipping Engineer", purpose: "code, deploy, verify" },
  { id: "brand_architect", label: "Brand Architect", purpose: "brand structure and copy" },
  { id: "n8n_operator", label: "workflow automation Workflow Operator", purpose: "workflows and escalation routes" },
  { id: "devops_dns", label: "DevOps / DNS Operator", purpose: "domains, builds, and rollback" },
  { id: "shadow_analyst", label: "Operating Twin Analyst", purpose: "simulate decisions and risk" },
  { id: "onedrive_miner", label: "OneDrive Idea Miner", purpose: "source-backed idea review" },
  { id: "customer_support", label: "Customer Support Agent", purpose: "support routing and escalation" },
  { id: "cost_limits", label: "Cost & Limits Analyst", purpose: "rate-limit and spend awareness" },
  { id: "audit_observability", label: "Audit / Observability Analyst", purpose: "trace actions and blockers" },
  { id: "executive_summary", label: "Executive Summary", purpose: "owner-facing brief" },
] as const;

export function getProviders(): ProviderStatus[] {
  const defs: Omit<ProviderStatus, "configured" | "status">[] = [
    {
      id: "openai",
      label: "OpenAI",
      env: ["OPENAI_API_KEY"],
      purpose: "general chat + shipping modes",
    },
    {
      id: "google",
      label: "Google / Gemini",
      env: ["GOOGLE_GENERATIVE_AI_API_KEY"],
      purpose: "free tier — SEO + general reasoning",
    },
    {
      id: "groq",
      label: "GroqCloud",
      env: ["GROQ_API_KEY"],
      purpose: "free tier — fast Llama inference",
    },
    {
      id: "cerebras",
      label: "Cerebras",
      env: ["CEREBRAS_API_KEY"],
      purpose: "free tier — fast open-weight models",
    },
    {
      id: "mistral",
      label: "Mistral",
      env: ["MISTRAL_API_KEY"],
      purpose: "free tier — Mistral models",
    },
    {
      id: "openrouter",
      label: "OpenRouter",
      env: ["OPENROUTER_API_KEY"],
      purpose: "fallback aggregator (rate-limited)",
    },
    {
      id: "anthropic",
      label: "Anthropic / Claude",
      env: ["ANTHROPIC_API_KEY"],
      purpose: "code review + decision analysis",
    },
    {
      id: "xai",
      label: "xAI / Grok",
      env: ["XAI_API_KEY"],
      purpose: "shipping + executive summary",
    },
    {
      id: "ai_gateway",
      label: "Vercel AI Gateway",
      env: ["AI_GATEWAY_API_KEY"],
      purpose: "central model routing",
    },
    {
      id: "openwebui",
      label: "Open WebUI / local",
      env: ["OPENWEBUI_BASE_URL", "OPENWEBUI_API_KEY"],
      purpose: "local fallback when configured",
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
    "GOOGLE_GENERATIVE_AI_API_KEY",
    "GROQ_API_KEY",
    "CEREBRAS_API_KEY",
    "MISTRAL_API_KEY",
    "OPENROUTER_API_KEY",
    "ANTHROPIC_API_KEY",
    "XAI_API_KEY",
    "AI_GATEWAY_API_KEY",
    "OPENWEBUI_BASE_URL",
    "OPENWEBUI_API_KEY",
  ]);
}
