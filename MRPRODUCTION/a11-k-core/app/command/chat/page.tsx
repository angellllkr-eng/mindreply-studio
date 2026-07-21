"use client";

import { useMemo, useState } from "react";
import { CommandShell } from "@/components/CommandShell";

const MODES = [
  "Shipping Engineer",
  "SEO Strategist",
  "Brand Architect",
  "n8n Workflow Operator",
  "Customer Support Agent",
  "Code Reviewer",
  "Growth Planner",
  "Luxury/Hospitality/Yacht Analyst",
  "Executive Summary",
];

const BRANDS = ["MindReply", "A11-K", "AUREL", "Regex Forge", "SQL Studio", "Meridian (stealth)"];
const PRESETS = [
  "Summarize top 3 blockers",
  "Draft weekly operating report outline",
  "Preflight this deploy decision",
  "Review Meridian idea pack abstractly",
];

export default function ChatPage() {
  const [mode, setMode] = useState(MODES[0]);
  const [brand, setBrand] = useState(BRANDS[1]);
  const [model, setModel] = useState("auto");
  const [message, setMessage] = useState("");
  const [log, setLog] = useState("Waiting for workflow data / model config…\nNo fake AI responses.");

  const modelOptions = useMemo(
    () => ["auto", "openai", "anthropic", "xai", "google", "openwebui"],
    [],
  );

  async function send() {
    if (!message.trim()) return;
    setLog((prev) => prev + `\n\nYou (${mode} · ${brand}): ${message}`);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message, mode, brand, model }),
    });
    const data = await res.json();
    setLog(
      (prev) =>
        prev +
        `\n\nSystem [${data.status}${data.fallback ? " · fallback" : ""}]: ${data.message}`,
    );
    setMessage("");
  }

  return (
    <CommandShell
      title="AI Chat"
      subtitle="Model/mode/brand selectors. No fake completions."
      active="/command/chat"
    >
      <div className="stack">
        <div className="grid grid-3">
          <div className="field">
            <label>Model</label>
            <select value={model} onChange={(e) => setModel(e.target.value)}>
              {modelOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Mode</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              {MODES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Brand context</label>
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              {BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          {PRESETS.map((p) => (
            <button key={p} type="button" className="btn btn-ghost" onClick={() => setMessage(p)}>
              {p}
            </button>
          ))}
        </div>

        <div className="chat-log" aria-live="polite">
          {log}
        </div>

        <div className="field">
          <label>Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <button type="button" className="btn btn-primary" onClick={send}>
          Send (honest fallback if unconfigured)
        </button>
      </div>
    </CommandShell>
  );
}
