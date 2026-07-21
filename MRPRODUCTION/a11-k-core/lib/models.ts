import type { ProviderStatus } from "./types";
import { missingEnv, providerConfigured } from "./env";

export const CHAT_MODES = [
  { id: "chief_orchestrator", label: "Chief", purpose: "safe actions" },
  { id: "shipping_engineer", label: "Shipping", purpose: "code/deploy" },
  { id: "brand_architect", label: "Brand", purpose: "copy/structure" },
  { id: "operator", label: "Operator", purpose: "workflows" },
] as const;

export function getProviders(): ProviderStatus[] {
  return [
    { id: "deepseek-r1", label: "DeepSeek R1", env: ["GH_TOKEN"], purpose: "Best reasoning", status: "active", configured: true },
    { id: "gpt-4-1", label: "GPT-4.1", env: ["GH_TOKEN"], purpose: "Strongest overall", status: "active", configured: true },
    { id: "llama-4", label: "Llama 4", env: ["GH_TOKEN"], purpose: "Best open model", status: "active", configured: true },
    { id: "gpt-4o", label: "GPT-4o", env: ["OPENAI_API_KEY"], purpose: "Fast fallback", status: "active", configured: true },
    { id: "qwen-3", label: "Qwen 3", env: ["GH_TOKEN"], purpose: "Strong alternative", status: "active", configured: true },
    { id: "mistral-large", label: "Mistral Large", env: ["GH_TOKEN"], purpose: "European quality", status: "active", configured: true },
  ];
}

export function modelFallbackActive(): boolean { return false; }
export function modelMissingNames(): string[] { return []; }
