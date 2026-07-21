"use client";

import { useEffect, useMemo, useState } from "react";
import { CommandShell } from "@/components/CommandShell";
import { A11KStamp } from "@/components/A11KStamp";
import { StatusPill } from "@/components/Brushworks";

type Provider = { id: string; label: string; env: string[]; configured: boolean; purpose: string; status: "active" | "blocked" | "placeholder" | "unknown" };
type ChatMessage = { id: string; role: "user" | "system" | "assistant"; content: string };

const QUICK_PROMPTS = ["What should I do next?", "What is blocked?", "Check my sites", "Show my workflows", "Prepare a safe plan", "Explain this simply", "What should I not do?", "What needs my approval?"];
const MODELS = [["auto", "Best available"], ["openai", "OpenAI"], ["fallback", "Safe fallback"]] as const;
const MODES = [["chief_orchestrator", "Clear next move"], ["shipping_engineer", "Ship and verify"], ["brand_architect", "Brand and copy"], ["n8n_operator", "Workflow status"], ["devops_dns", "Sites and rollback"], ["shadow_analyst", "Decision preview"], ["cost_limits", "Cost and limits"]] as const;
const CONTEXTS = [["estate", "Everything"], ["a11k", "A11-K engine"], ["brands", "Brand fleet"], ["workflows", "Workflows"], ["deployments", "Sites and deployments"], ["shadow", "Decisions"]] as const;
const BRANDS = [["a11-k", "A11-K"], ["mindreply", "MindReply"], ["sql-studio", "SQL Studio"], ["code-lens", "Code Lens"], ["aurel", "AUREL"]] as const;
const FALLBACK_PROVIDERS: Provider[] = [{ id: "openai", label: "OpenAI", env: ["OPENAI_API_KEY"], configured: false, purpose: "General chat and structured replies", status: "unknown" }, { id: "anthropic", label: "Claude", env: ["ANTHROPIC_API_KEY"], configured: false, purpose: "Reasoning, writing, careful review", status: "unknown" }, { id: "xai", label: "Grok", env: ["XAI_API_KEY"], configured: false, purpose: "Fast strategy and ideation", status: "unknown" }, { id: "google", label: "Gemini", env: ["GOOGLE_GENERATIVE_AI_API_KEY"], configured: false, purpose: "Research and broad context", status: "unknown" }];
const INITIAL: ChatMessage = { id: "welcome", role: "system", content: "I�m here. Ask what matters and I�ll keep the answer clear, useful, and honest. Nothing risky moves without your approval." };

export default function ChatPage() {
  const [model, setModel] = useState("auto");
  const [mode, setMode] = useState("chief_orchestrator");
  const [context, setContext] = useState("estate");
  const [brand, setBrand] = useState("a11-k");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL]);
  const [providers, setProviders] = useState<Provider[]>(FALLBACK_PROVIDERS);
  const [missingEnv, setMissingEnv] = useState<string[]>([]);
  const [runtimeText, setRuntimeText] = useState("Private cockpit status is being checked.");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    fetch("/api/command/status", { cache: "no-store" }).then(async (response) => { const data = await response.json().catch(() => null); if (!response.ok) throw new Error(); return data; }).then((data) => { setProviders(data.providers || FALLBACK_PROVIDERS); setMissingEnv(data.missingEnv || []); setRuntimeText(data.command?.authConfigured ? "Private access is ready." : "Private command center is locked until access is confirmed."); }).catch(() => { setRuntimeText("Private command center is locked until access is confirmed."); setMissingEnv(["COMMAND_ACCESS_TOKEN", "AUTH_SECRET", "OPENAI_API_KEY", "N8N_API_KEY"]); });
  }, []);

  const configured = providers.filter((provider) => provider.configured);
  const visibleMissing = useMemo(() => [...new Set(missingEnv)], [missingEnv]);
  const lens = `${MODES.find(([id]) => id === mode)?.[1]} � ${CONTEXTS.find(([id]) => id === context)?.[1]} � ${BRANDS.find(([id]) => id === brand)?.[1]}`;

  async function send(text = message) {
    const trimmed = text.trim(); if (!trimmed || isSending) return;
    setMessages((current) => [...current, { id: `u-${Date.now()}`, role: "user", content: trimmed }]); setMessage(""); setIsSending(true);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ message: trimmed, model, mode, context, brand, safeMode: true, allowActions: false }) });
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("text/plain") && response.body) {
        const reader = response.body.getReader(); const decoder = new TextDecoder(); let answer = ""; const id = `a-${Date.now()}`;
        setMessages((current) => [...current, { id, role: "assistant", content: "" }]);
        while (true) { const { value, done } = await reader.read(); if (done) break; answer += decoder.decode(value, { stream: true }); setMessages((current) => current.map((item) => item.id === id ? { ...item, content: answer } : item)); }
      } else {
        const data = await response.json().catch(() => null); const answer = data?.message || data?.reply || "AI chat is ready, but the provider key is not connected in production yet."; setMessages((current) => [...current, { id: `s-${Date.now()}`, role: data?.reply ? "assistant" : "system", content: answer }]); if (data?.missing) setMissingEnv(data.missing);
      }
    } catch { setMessages((current) => [...current, { id: `e-${Date.now()}`, role: "system", content: "AI chat is ready, but the provider key is not connected in production yet. The safe fallback remains available." }]); } finally { setIsSending(false); }
  }

  return <CommandShell title="Ask A11-K" subtitle="Your calm copilot for the whole ecosystem. Ask plainly; get the next useful move." active="/command/chat">
    <div className="bw-chat-shell">
      <section className="bw-chat-main" aria-label="Ask A11-K chat">
        <div className="bw-chat-toolbar"><label>Model<select value={model} onChange={(event) => setModel(event.target.value)}>{MODELS.map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label><label>How should it help?<select value={mode} onChange={(event) => setMode(event.target.value)}>{MODES.map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label><label>Look at<select value={context} onChange={(event) => setContext(event.target.value)}>{CONTEXTS.map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label></div>
        <div className="bw-row-between"><div><div className="bw-eyebrow">CURRENT LENS</div><div className="bw-lens-text">{lens}</div></div><StatusPill status={configured.length ? "live" : "waiting"}>{configured.length ? "AI connected" : "Provider waiting"}</StatusPill></div>
        <div className="bw-chat-thread" aria-live="polite">{messages.map((item) => <div key={item.id} className={`bw-chat-message ${item.role === "user" ? "bw-chat-message-user" : ""} ${item.role === "system" ? "bw-chat-message-system" : ""}`}><span className="bw-chat-message-label">{item.role === "user" ? "You" : item.role === "assistant" ? "A11-K" : "A11-K / status"}</span>{item.content || "Thinking clearly�"}</div>)}{isSending ? <div className="bw-chat-message bw-chat-message-system"><span className="bw-chat-message-label">A11-K / status</span>Checking the safe provider route�</div> : null}</div>
        <div className="bw-quick-prompts">{QUICK_PROMPTS.map((prompt) => <button key={prompt} type="button" className="bw-quick-prompt" onClick={() => { setMessage(prompt); void send(prompt); }}>{prompt}</button>)}</div>
        <div className="bw-chat-composer"><textarea value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void send(); } }} placeholder="Ask what is live, what is blocked, or what should happen next�" /><div className="bw-chat-composer-bottom"><span className="bw-chat-helper">Safe mode is on � actions stay suggestions until you approve them</span><button type="button" className="bw-button bw-button-primary" disabled={isSending || !message.trim()} onClick={() => void send()}>{isSending ? "Thinking�" : "Ask A11-K ?"}</button></div></div>
      </section>
      <aside className="bw-chat-side"><div className="bw-side-card"><div className="bw-card-head"><h2>Right now</h2><StatusPill status={configured.length ? "live" : "waiting"}>{configured.length ? "Connected" : "Waiting"}</StatusPill></div><p>{runtimeText}</p></div><div className="bw-side-card"><h2>AI model status</h2>{providers.map((provider) => <div className="bw-provider-row" key={provider.id}><span className={`bw-provider-dot ${provider.configured ? "bw-provider-dot-live" : ""}`} /><span><strong>{provider.label}</strong><small>{provider.purpose}</small></span><span className="bw-provider-state">{provider.configured ? "Ready" : "Waiting"}</span></div>)}</div><div className="bw-side-card"><h2>What is waiting?</h2><p>{visibleMissing.length ? "A few connections are not set yet. The product stays honest and useful while they wait." : "Nothing missing is being reported."}</p>{visibleMissing.length ? <ul className="bw-missing-list">{visibleMissing.slice(0, 5).map((name) => <li key={name}>{name === "N8N_API_KEY" ? "Workflow automation is waiting for workflow automation credentials" : name === "COMMAND_ACCESS_TOKEN" ? "Command Center access is not confirmed in Vercel" : name === "OPENAI_API_KEY" ? "AI provider is not connected yet" : name}</li>)}</ul> : null}</div><div className="bw-side-card"><h2>Engine stamp</h2><p>A11-K is the core behind the connected fleet.</p><div style={{ marginTop: ".75rem" }}><A11KStamp label="A11-K Engine Core" href="/" /></div></div></aside>
    </div>
  </CommandShell>;
}
