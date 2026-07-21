"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type ChatMessage = {
  id: string;
  role: "user" | "system" | "assistant";
  content: string;
  meta?: string;
};

const ENGINES = [
  { id: "r1", label: "DeepSeek R1", short: "R1", detail: "Reasoning" },
  { id: "gpt-4.1", label: "GPT-4.1", short: "4.1", detail: "Strongest" },
  { id: "llama-4", label: "Llama 4", short: "L4", detail: "Open" },
  { id: "gpt-4o", label: "GPT-4o", short: "4o", detail: "Fast" },
  { id: "qwen-3", label: "Qwen 3", short: "Q3", detail: "Alt" },
  { id: "mistral", label: "Mistral", short: "MI", detail: "EU" },
] as const;

const MODES = [
  ["chief_orchestrator", "Orchestrator"],
  ["shipping_engineer", "Ship"],
  ["brand_architect", "Brand"],
  ["devops_dns", "Sites"],
  ["cost_limits", "Cost"],
] as const;

const CONTEXTS = [
  ["estate", "Estate"],
  ["a11k", "A11-K"],
  ["brands", "Brands"],
  ["deployments", "Deploy"],
] as const;

const BRANDS = [
  ["a11-k", "A11-K"],
  ["mindreply", "MindReply"],
  ["aurel", "AUREL"],
  ["brixo", "BRIXO"],
] as const;

const QUICK = [
  "Biggest blocker right now?",
  "3 high-impact moves, no new budget",
  "AUREL vs MindReply for London agencies",
  "What decision is waiting on me?",
  "Fastest unblock path",
  "7-day plan with working models only",
];

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "system",
  content: "Ready. Pick a model. Ask anything. Sharp answers only.",
};

export default function ChatPage() {
  const [engine, setEngine] = useState("r1");
  const [mode, setMode] = useState("chief_orchestrator");
  const [context, setContext] = useState("estate");
  const [brand, setBrand] = useState("a11-k");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [isSending, setIsSending] = useState(false);
  const [lastRoute, setLastRoute] = useState("GitHub primary");
  const [showSuggest, setShowSuggest] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isSending]);

  useEffect(() => {
    if (!taRef.current) return;
    taRef.current.style.height = "auto";
    taRef.current.style.height = Math.min(taRef.current.scrollHeight, 160) + "px";
  }, [message]);

  const activeEngine = ENGINES.find((e) => e.id === engine) || ENGINES[0];
  const lens = useMemo(
    () => `${MODES.find(([id]) => id === mode)?.[1]} · ${CONTEXTS.find(([id]) => id === context)?.[1]} · ${BRANDS.find(([id]) => id === brand)?.[1]}`,
    [mode, context, brand]
  );

  async function send(text = message) {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;
    setShowSuggest(false);
    setMenuOpen(false);
    setMessages((c) => [...c, { id: `u-${Date.now()}`, role: "user", content: trimmed }]);
    setMessage("");
    setIsSending(true);
    setLastRoute("routing...");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: trimmed, model: engine, engine, mode, context, brand, safeMode: true, allowActions: false }),
      });
      const provider = response.headers.get("X-A11K-Provider") || "";
      const modelUsed = response.headers.get("X-A11K-Model") || "";
      if (provider) setLastRoute(`${provider} · ${modelUsed || engine}`);
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("text/plain") && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let answer = "";
        const id = `a-${Date.now()}`;
        setMessages((c) => [...c, { id, role: "assistant", content: "", meta: provider ? `${provider} · ${modelUsed}` : "streaming" }]);
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
          setMessages((c) => c.map((item) => item.id === id ? { ...item, content: answer, meta: provider ? `${provider} · ${modelUsed}` : item.meta } : item));
        }
      } else {
        const data = await response.json().catch(() => null);
        const answer = data?.message || data?.reply || data?.answer || "No live provider answered.";
        setMessages((c) => [...c, { id: `s-${Date.now()}`, role: data?.reply || data?.answer ? "assistant" : "system", content: answer, meta: data?.provider ? `${data.provider} · ${data.model || ""}` : "status" }]);
        if (data?.provider) setLastRoute(`${data.provider} · ${data.model || ""}`);
      }
    } catch {
      setMessages((c) => [...c, { id: `e-${Date.now()}`, role: "system", content: "Transport failed. Retry." }]);
    } finally {
      setIsSending(false);
    }
  }

  function newChat() {
    setMessages([WELCOME]);
    setShowSuggest(true);
    setLastRoute("GitHub primary");
  }

  return (
    <div className="mx-app">
      <div className="mx-glow" aria-hidden="true" />
      <header className="mx-top">
        <div className="mx-brand">
          <Link href="/command" className="mx-mark">A11</Link>
          <div>
            <div className="mx-title">Ask A11-K</div>
            <div className="mx-sub">{activeEngine.label} · {lens}</div>
          </div>
        </div>
        <div className="mx-top-actions">
          <span className="mx-route">{lastRoute}</span>
          <button type="button" className="mx-ghost" onClick={newChat}>New</button>
          <button type="button" className="mx-ghost" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen}>
            Settings
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="mx-settings">
          <label>Mode
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              {MODES.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
            </select>
          </label>
          <label>Look at
            <select value={context} onChange={(e) => setContext(e.target.value)}>
              {CONTEXTS.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
            </select>
          </label>
          <label>Brand
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              {BRANDS.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
            </select>
          </label>
        </div>
      ) : null}

      <div className="mx-models" role="tablist" aria-label="Models">
        {ENGINES.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={engine === item.id}
            className={`mx-model ${engine === item.id ? "is-active" : ""}`}
            onClick={() => setEngine(item.id)}
          >
            <span className="mx-model-short">{item.short}</span>
            <span className="mx-model-label">{item.label}</span>
            <span className="mx-model-detail">{item.detail}</span>
          </button>
        ))}
      </div>

      <main className="mx-thread" ref={threadRef} aria-live="polite">
        {messages.length <= 1 ? (
          <div className="mx-empty">
            <div className="mx-empty-kicker">Private command</div>
            <h1>What do you need?</h1>
            <p>Working models only. GitHub first, OpenAI fallback. No fluff.</p>
            <div className="mx-chips">
              {QUICK.map((prompt) => (
                <button key={prompt} type="button" className="mx-chip" onClick={() => void send(prompt)} disabled={isSending}>
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((item) => (
            <div key={item.id} className={`mx-msg mx-msg-${item.role}`}>
              <div className="mx-msg-label">
                {item.role === "user" ? "You" : item.role === "assistant" ? "A11-K" : "Status"}
                {item.meta ? ` · ${item.meta}` : ""}
              </div>
              <div className="mx-msg-body">{item.content || (isSending ? "..." : "")}</div>
            </div>
          ))
        )}
        {isSending ? <div className="mx-typing"><i /><i /><i /></div> : null}
      </main>

      <footer className="mx-dock">
        {showSuggest && messages.length > 1 ? (
          <div className="mx-popup">
            <div className="mx-popup-head">
              <span>Suggestions</span>
              <button type="button" onClick={() => setShowSuggest(false)} aria-label="Close">×</button>
            </div>
            {QUICK.slice(0, 4).map((prompt) => (
              <button key={prompt} type="button" className="mx-popup-item" onClick={() => void send(prompt)} disabled={isSending}>
                {prompt}
              </button>
            ))}
          </div>
        ) : null}
        <div className="mx-bar">
          <textarea
            ref={taRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (e.target.value.trim().length === 0) setShowSuggest(true);
            }}
            onFocus={() => setShowSuggest(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
            placeholder={`Message ${activeEngine.label}...`}
          />
          <button type="button" className="mx-send" disabled={isSending || !message.trim()} onClick={() => void send()}>
            {isSending ? "..." : "Send"}
          </button>
        </div>
        <div className="mx-hint">Enter send · Shift+Enter newline · private</div>
      </footer>
    </div>
  );
}
