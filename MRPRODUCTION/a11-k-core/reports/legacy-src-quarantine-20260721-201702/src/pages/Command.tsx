import React, { useEffect, useState } from "react";
import { AurelCommandFrame } from "../components/AurelCommandFrame";

type Message = {
  role: "system" | "user" | "aurel";
  text: string;
};

export default function Command() {
  const [model, setModel] = useState("Auto");
  const [mode, setMode] = useState("Chief Orchestrator");
  const [context, setContext] = useState("Whole Estate");
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      text: "AUREL Command is active. This cockpit shows what is real, what is blocked, and what needs approval."
    }
  ]);

  useEffect(() => {
    document.title = "AUREL Command — Powered by A11-K";
    const meta = document.querySelector('meta[name="robots"]') || document.createElement("meta");
    meta.setAttribute("name", "robots");
    meta.setAttribute("content", "noindex,nofollow");
    document.head.appendChild(meta);

    fetch("/api/command/status")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => setStatus({ ok: false, blocked: "status_endpoint_unavailable" }));
  }, []);

  async function send() {
    const text = input.trim();
    if (!text) return;

    setMessages((old) => [...old, { role: "user", text }]);
    setInput("");

    const payload = { message: text, model, mode, context };

    try {
      const res = await fetch("/api/command/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({}));

      setMessages((old) => [
        ...old,
        {
          role: "aurel",
          text: data.answer || "AI chat is ready, but no production provider key is connected yet. Missing env: AI_GATEWAY_API_KEY or provider key."
        }
      ]);
    } catch {
      setMessages((old) => [
        ...old,
        {
          role: "aurel",
          text: "AI chat is ready, but no production provider key is connected yet. Missing env: AI_GATEWAY_API_KEY or provider key."
        }
      ]);
    }
  }

  const quick = [
    "What should I do next?",
    "What is blocked?",
    "Check my sites",
    "Show workflows",
    "Show cost risks",
    "Show rollback plan",
    "What needs my approval?",
    "Build UNAPOLAGETIC plan",
    "Check GitHub security",
    "Check live URLs"
  ];

  return (
    <main className="min-h-screen bg-[#05070b] text-white">
      <div className="mx-auto flex max-w-[1700px] gap-4 px-4 py-4">
        <aside className="hidden w-72 shrink-0 rounded-3xl border border-white/10 bg-white/[0.04] p-4 lg:block">
          <p className="text-xs uppercase tracking-[0.35em] text-[#e4c06f]">AUREL</p>
          <h1 className="mt-2 text-3xl font-semibold">Command</h1>
          <p className="mt-2 text-sm text-white/50">Powered by A11-K</p>

          <nav className="mt-8 space-y-2">
            {[
              "Ask AUREL",
              "Overview",
              "Brand Fleet",
              "Models",
              "Workflows",
              "Deployments",
              "GitHub Security",
              "Cost Guard",
              "Rollback",
              "UNAPOLAGETIC",
              "Live Proof"
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/5 bg-black/20 px-3 py-2 text-sm text-white/70">
                {item}
              </div>
            ))}
          </nav>

          <div className="mt-6 rounded-2xl border border-[#5ee1ff]/20 bg-[#5ee1ff]/10 p-3 text-xs text-[#b8f3ff]">
            Private route. No secrets. No fake live data.
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="mb-4 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-4">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#5ee1ff]">Private owner cockpit</p>
                <h2 className="mt-2 text-4xl font-semibold tracking-tight">Ask AUREL</h2>
                <p className="mt-1 text-sm text-white/60">
                  Decisions, workflows, models, sites, security, proof and rollback.
                </p>
              </div>

              <div className="grid gap-2 md:grid-cols-3">
                <select value={model} onChange={(e) => setModel(e.target.value)} className="rounded-2xl border border-white/10 bg-black/50 px-3 py-2 text-sm">
                  {["Auto", "Claude", "Grok", "Gemini", "OpenAI", "Open WebUI / Local", "Fallback Safe Mode"].map((x) => <option key={x}>{x}</option>)}
                </select>

                <select value={mode} onChange={(e) => setMode(e.target.value)} className="rounded-2xl border border-white/10 bg-black/50 px-3 py-2 text-sm">
                  {["Chief Orchestrator", "Shipping Engineer", "Brand Architect", "Workflow Operator", "Commerce Operator", "Cost & Limits Analyst", "Audit / Rollback", "Security Fixer", "Domain / Deployment Operator"].map((x) => <option key={x}>{x}</option>)}
                </select>

                <select value={context} onChange={(e) => setContext(e.target.value)} className="rounded-2xl border border-white/10 bg-black/50 px-3 py-2 text-sm">
                  {["Whole Estate", "AUREL", "A11-K", "MindReply", "Brushworks", "UNAPOLAGETIC", "Tools", "Workflows", "Security", "Deployments"].map((x) => <option key={x}>{x}</option>)}
                </select>
              </div>
            </div>
          </header>

          <div className="grid gap-4 xl:grid-cols-[1fr_390px]">
            <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-4 flex flex-wrap gap-2">
                {quick.map((q) => (
                  <button key={q} onClick={() => setInput(q)} className="rounded-full border border-[#e4c06f]/25 bg-[#e4c06f]/10 px-3 py-1 text-xs text-[#f5dc91]">
                    {q}
                  </button>
                ))}
              </div>

              <div className="min-h-[420px] space-y-3 rounded-3xl border border-white/10 bg-black/30 p-4">
                {messages.map((m, i) => (
                  <div key={`${m.role}-${i}`} className={m.role === "user" ? "ml-auto max-w-[86%] rounded-2xl bg-[#5ee1ff]/15 p-3 text-sm" : "max-w-[86%] rounded-2xl bg-white/[0.06] p-3 text-sm text-white/80"}>
                    <div className="mb-1 text-[10px] uppercase tracking-[0.22em] text-white/35">{m.role}</div>
                    {m.text}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") send();
                  }}
                  placeholder="Ask AUREL what to ship, fix, verify or block..."
                  className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm outline-none"
                />
                <button onClick={send} className="rounded-2xl bg-[#e4c06f] px-5 py-3 text-sm font-semibold text-black">
                  Send
                </button>
              </div>
            </section>

            <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
              <h3 className="text-lg font-semibold">Context Panel</h3>
              <p className="mt-1 text-sm text-white/50">{model} · {mode} · {context}</p>

              <div className="mt-5 space-y-3">
                <Block title="Current blockers" items={[
                  status?.blocked || "Status loaded locally",
                  "Provider keys may be missing",
                  "n8n requires N8N_BASE_URL and N8N_API_KEY",
                  "Production route must be protected",
                  "No deploy until build passes"
                ]} />
                <Block title="Next 3 actions" items={[
                  "Verify /command locally",
                  "Connect provider/env only when ready",
                  "Deploy once after build and project check"
                ]} />
                <Block title="Approval required" items={[
                  "DNS/domain changes",
                  "secrets/env changes",
                  "product publishing",
                  "ads/spend",
                  "destructive actions"
                ]} />
                <Block title="Rollback" items={[
                  "Restore backups from reports folder",
                  "Revert commit",
                  "Use previous Vercel deployment"
                ]} />
              </div>
            </aside>
          </div>

          <section className="mt-4">
            <AurelCommandFrame />
          </section>
        </section>
      </div>
    </main>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
      <div className="mb-2 text-xs uppercase tracking-[0.2em] text-[#5ee1ff]">{title}</div>
      {items.map((item) => (
        <div key={item} className="mb-1 text-sm text-white/65">• {item}</div>
      ))}
    </div>
  );
}
