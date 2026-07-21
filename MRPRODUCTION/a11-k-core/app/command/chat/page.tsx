"use client";

import { useEffect, useMemo, useState } from "react";
import { CommandShell } from "@/components/CommandShell";
import { StatusBadge } from "@/components/StatusBadge";

type Provider = {
  id: string;
  label: string;
  env: string[];
  configured: boolean;
  purpose: string;
  status: "active" | "blocked" | "placeholder" | "unknown";
};

type ChatMessage = {
  id: string;
  role: "user" | "system" | "assistant";
  content: string;
};

const MODES = [
  ["chief_orchestrator", "Chief Orchestrator"],
  ["shipping_engineer", "Shipping Engineer"],
  ["brand_architect", "Brand Architect"],
  ["n8n_operator", "n8n Workflow Operator"],
  ["devops_dns", "DevOps / DNS Operator"],
  ["shadow_analyst", "Shadow Company Analyst"],
  ["onedrive_miner", "OneDrive Idea Miner"],
  ["customer_support", "Customer Support Agent"],
  ["cost_limits", "Cost & Limits Analyst"],
  ["audit_observability", "Audit / Observability Analyst"],
  ["executive_summary", "Executive Summary"],
] as const;

const MODE_PURPOSES: Record<string, string> = {
  chief_orchestrator: "coordinate safe next actions",
  shipping_engineer: "code, deploy, verify",
  brand_architect: "brand structure and copy",
  n8n_operator: "workflows and escalation routes",
  devops_dns: "domains, builds, and rollback",
  shadow_analyst: "simulate decisions and risk",
  onedrive_miner: "source-backed idea review",
  customer_support: "support routing and escalation",
  cost_limits: "rate-limit and spend awareness",
  audit_observability: "trace actions and blockers",
  executive_summary: "owner-facing brief",
};

const MODELS = [
  ["auto", "Auto route"],
  ["ai_gateway", "Vercel AI Gateway"],
  ["openai", "OpenAI"],
  ["anthropic", "Anthropic / Claude"],
  ["xai", "xAI / Grok"],
  ["google", "Google / Gemini"],
  ["openwebui", "Open WebUI / local"],
  ["fallback", "Fallback / status only"],
] as const;

const CONTEXTS = [
  ["estate", "Whole estate"],
  ["mindreply", "MindReply public site"],
  ["a11k", "A11-K engine"],
  ["brands", "Brand fleet"],
  ["workflows", "n8n workflows"],
  ["deployments", "Vercel / deployments"],
  ["seo", "SEO / growth"],
  ["ideas", "OneDrive ideas"],
  ["shadow", "Shadow Company"],
  ["support", "Support queue"],
] as const;

const BRANDS = [
  ["a11-k", "A11-K"],
  ["mindreply", "MindReply"],
  ["sql-studio", "SQL Studio"],
  ["code-lens", "Code Lens"],
  ["sdr-agent", "SDR Agent"],
  ["regex-forge", "Regex Forge"],
  ["code-tutor", "Code Tutor"],
  ["aurel", "AUREL"],
  ["l402-skills", "L402 Skills"],
  ["meridian", "Meridian (source-backed idea)"],
] as const;

const PRESETS = [
  "What is broken right now?",
  "What should I ship next?",
  "Show blocked workflows",
  "Check all sites",
  "Show cost and rate-limit risks",
  "Run decision preflight",
  "Show what not to do",
  "Review OneDrive ideas",
];

const FALLBACK_PROVIDERS: Provider[] = [
  {
    id: "ai_gateway",
    label: "Vercel AI Gateway",
    env: ["AI_GATEWAY_API_KEY"],
    purpose: "central model routing",
    configured: false,
    status: "unknown",
  },
  {
    id: "openai",
    label: "OpenAI",
    env: ["OPENAI_API_KEY"],
    purpose: "general chat + shipping modes",
    configured: false,
    status: "unknown",
  },
  {
    id: "anthropic",
    label: "Anthropic / Claude",
    env: ["ANTHROPIC_API_KEY"],
    purpose: "code review + decision analysis",
    configured: false,
    status: "unknown",
  },
  {
    id: "xai",
    label: "xAI / Grok",
    env: ["XAI_API_KEY"],
    purpose: "shipping + executive summary",
    configured: false,
    status: "unknown",
  },
  {
    id: "google",
    label: "Google / Gemini",
    env: ["GOOGLE_GENERATIVE_AI_API_KEY"],
    purpose: "SEO + general reasoning",
    configured: false,
    status: "unknown",
  },
  {
    id: "openwebui",
    label: "Open WebUI / local",
    env: ["OPENWEBUI_BASE_URL", "OPENWEBUI_API_KEY"],
    purpose: "local fallback",
    configured: false,
    status: "unknown",
  },
];

const INITIAL_MESSAGE: ChatMessage = {
  id: "system-ready",
  role: "system",
  content:
    "Ask A11-K is ready. It will not invent an AI answer. If no provider is configured, the workspace will show the exact missing environment names and remain useful for preparation, review, and safe preflight.",
};

export default function ChatPage() {
  const [mode, setMode] = useState("chief_orchestrator");
  const [model, setModel] = useState("auto");
  const [context, setContext] = useState("estate");
  const [brand, setBrand] = useState("a11-k");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [providers, setProviders] = useState<Provider[]>(FALLBACK_PROVIDERS);
  const [missingEnv, setMissingEnv] = useState<string[]>([]);
  const [runtimeState, setRuntimeState] = useState<"active" | "blocked" | "placeholder">("placeholder");
  const [runtimeMessage, setRuntimeMessage] = useState("Checking private runtime status...");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    let mounted = true;

    fetch("/api/command/status", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(data?.error || `Status request returned ${response.status}`);
        }
        return data;
      })
      .then((data) => {
        if (!mounted) return;
        setProviders(data.providers || FALLBACK_PROVIDERS);
        setMissingEnv(data.missingEnv || []);
        setRuntimeState(data.command?.authConfigured ? "active" : "blocked");
        setRuntimeMessage(
          data.command?.authConfigured
            ? "Private command access is configured."
            : "Command auth is not configured; production access remains blocked.",
        );
      })
      .catch((error: Error) => {
        if (!mounted) return;
        setRuntimeState("blocked");
        setRuntimeMessage(`Runtime status unavailable: ${error.message}`);
        setMissingEnv([
          "COMMAND_ACCESS_TOKEN",
          "AUTH_SECRET",
          "AI_GATEWAY_API_KEY",
          "OPENAI_API_KEY",
          "ANTHROPIC_API_KEY",
          "XAI_API_KEY",
          "GOOGLE_GENERATIVE_AI_API_KEY",
          "DATABASE_URL",
        ]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const configuredProviders = providers.filter((provider) => provider.configured);
  const selectedMode = MODE_PURPOSES[mode] || "safe operating assistance";
  const selectedBrand = BRANDS.find(([id]) => id === brand)?.[1] || brand;
  const selectedContext = CONTEXTS.find(([id]) => id === context)?.[1] || context;
  const modelState = configuredProviders.length ? "active" : "blocked";
  const modelStateLabel = configuredProviders.length ? "provider detected" : "fallback only";

  const visibleMissingEnv = useMemo(() => {
    const unique = new Set(missingEnv);
    if (!configuredProviders.length) {
      [
        "AI_GATEWAY_API_KEY",
        "OPENAI_API_KEY",
        "ANTHROPIC_API_KEY",
        "XAI_API_KEY",
        "GOOGLE_GENERATIVE_AI_API_KEY",
        "OPENWEBUI_BASE_URL",
        "OPENWEBUI_API_KEY",
      ].forEach((name) => unique.add(name));
    }
    return [...unique];
  }, [configuredProviders.length, missingEnv]);

  async function send() {
    const text = message.trim();
    if (!text || isSending) return;

    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: "user", content: text },
    ]);
    setMessage("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message: text,
          mode,
          model,
          context,
          brand,
          safeMode: true,
          costMode: "normal",
          allowActions: false,
        }),
      });
      const data = await response.json().catch(() => null);
      const content = data?.reply || data?.message || `Chat endpoint returned ${response.status}.`;
      const missing = data?.missing?.length ? `\n\nMissing env names: ${data.missing.join(", ")}` : "";

      setMessages((current) => [
        ...current,
        {
          id: `system-${Date.now()}`,
          role: data?.reply ? "assistant" : "system",
          content: `${content}${missing}`,
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          role: "system",
          content: `Chat request could not be completed: ${error instanceof Error ? error.message : "unknown error"}. No fake response was generated.`,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <CommandShell
      title="Ask A11-K"
      subtitle="The chat is the command centre. Select the operating lens, context, and safe model route."
      active="/command/chat"
    >
      <div className="chat-workspace">
        <section className="chat-panel" aria-label="Ask A11-K chat">
          <div className="chat-toolbar">
            <div className="field">
              <label htmlFor="model">Model route</label>
              <select id="model" value={model} onChange={(event) => setModel(event.target.value)}>
                {MODELS.map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="mode">Operating mode</label>
              <select id="mode" value={mode} onChange={(event) => setMode(event.target.value)}>
                {MODES.map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="context">Context</label>
              <select id="context" value={context} onChange={(event) => setContext(event.target.value)}>
                {CONTEXTS.map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row" style={{ justifyContent: "space-between" }}>
            <div>
              <span className="faint" style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}>
                ACTIVE LENS
              </span>
              <div className="muted" style={{ marginTop: "0.2rem" }}>
                {selectedMode} &middot; {selectedContext} &middot; {selectedBrand}
              </div>
            </div>
            <StatusBadge status={modelState} />
          </div>

          <div className="chat-thread" aria-live="polite" aria-label="Chat messages">
            {messages.map((item) => (
              <div
                key={item.id}
                className={`chat-message ${item.role === "user" ? "chat-message-user" : ""} ${item.role === "system" ? "chat-message-system" : ""}`}
              >
                <span className="chat-message-label">
                  {item.role === "user" ? "You" : item.role === "assistant" ? "A11-K" : "System"}
                </span>
                {item.content}
              </div>
            ))}
            {isSending ? (
              <div className="chat-message chat-message-system">
                <span className="chat-message-label">System</span>
                Checking configured provider route. No response is claimed until returned by the backend.
              </div>
            ) : null}
          </div>

          <div className="quick-prompts" aria-label="Quick prompts">
            {PRESETS.map((preset) => (
              <button key={preset} type="button" className="btn btn-ghost" onClick={() => setMessage(preset)}>
                {preset}
              </button>
            ))}
          </div>

          <div className="chat-compose">
            <div className="field">
              <label htmlFor="message">Command</label>
              <textarea
                id="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ask what is broken, what should move next, or what needs approval..."
              />
            </div>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <span className="muted" style={{ fontSize: "0.78rem" }}>
                Safe mode on &middot; actions are suggestions only &middot; no fake AI output
              </span>
              <button type="button" className="btn btn-primary" onClick={send} disabled={isSending || !message.trim()}>
                {isSending ? "Checking..." : "Ask A11-K"}
              </button>
            </div>
          </div>
        </section>

        <aside className="context-panel" aria-label="A11-K context panel">
          <section className="context-card">
            <h2>Runtime</h2>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <strong>{runtimeState === "active" ? "Private runtime" : "Guarded runtime"}</strong>
              <StatusBadge status={runtimeState} />
            </div>
            <p style={{ marginTop: "0.45rem" }}>{runtimeMessage}</p>
          </section>

          <section className="context-card">
            <h2>Model status</h2>
            <div className="row" style={{ justifyContent: "space-between", marginBottom: "0.6rem" }}>
              <span className="muted">{modelStateLabel}</span>
              <StatusBadge status={modelState} />
            </div>
            <div className="provider-list">
              {providers.map((provider) => (
                <div className="provider-row" key={provider.id}>
                  <span className={`status-dot status-dot-${provider.status}`} aria-hidden="true" />
                  <span>
                    <strong>{provider.label}</strong>
                    <small>{provider.env.join(" + ")}</small>
                  </span>
                  <span className="status-word">{provider.configured ? "yes" : provider.status}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="context-card">
            <h2>Missing configuration names</h2>
            <p style={{ marginBottom: "0.6rem" }}>Names only. Values are never rendered.</p>
            <ul className="missing-env-list">
              {visibleMissingEnv.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </section>

          <section className="context-card">
            <h2>Next 3 actions</h2>
            <ol className="muted" style={{ margin: 0, paddingLeft: "1.15rem", fontSize: "0.82rem" }}>
              <li>Configure one approved provider route.</li>
              <li>Set command auth before production access.</li>
              <li>Keep deployment attempts paused while the platform limit is active.</li>
            </ol>
          </section>

          <section className="context-card">
            <h2>Cost / rate limits</h2>
            <div className="command-note">
              Model cost is unknown until a real provider route is wired. Deployment activity is guarded; do not repeat deploy attempts while a Vercel limit is active.
            </div>
          </section>

          <section className="context-card">
            <h2>Selected context</h2>
            <p>
              <strong style={{ color: "var(--ink)" }}>{selectedContext}</strong>
              <br />
              Brand: {selectedBrand}
              <br />
              Mode: {MODES.find(([id]) => id === mode)?.[1]}
            </p>
          </section>
        </aside>
      </div>
    </CommandShell>
  );
}
