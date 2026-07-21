import type { Metadata } from "next";
import { PublicNav } from "@/components/PublicNav";
import { StatusBadge } from "@/components/StatusBadge";
import { CHAT_MODES, getProviders, modelFallbackActive } from "@/lib/models";

export const metadata: Metadata = {
  title: "Models",
  description: "AI Model Status status — configured yes/no by env presence only.",
};

export default function ModelsPage() {
  const providers = getProviders();
  const fallback = modelFallbackActive();

  

  return (
    <>
      <PublicNav />
      <main className="section">
        <div className="container stack">
          <div>
            <h1 style={{ margin: 0 }}>AI Model Status</h1>
            <p className="muted">
              Shows configuration presence only. Never prints secret values. No fake AI responses.
            </p>
          </div>
          <div className="row">
            <StatusBadge status={fallback ? "blocked" : "active"} />
            <span className="muted">
              Fallback mode: {fallback ? "yes (no providers configured)" : "no"}
            </span>
          </div>
          <div className="grid grid-3">
            {providers.map((p) => (
              <article key={p.id} className="card">
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <h3 style={{ margin: 0 }}>{p.label}</h3>
                  <StatusBadge status={p.configured ? "active" : "blocked"} />
                </div>
                <p>Configured: {p.configured ? "yes" : "no"}</p>
  
                <p>{p.purpose}</p>
              </article>
            ))}
          </div>
          <div className="card">
            <h3>Modes (abstract routing map)</h3>
            <ul>
              {CHAT_MODES.map((m) => (
                <li key={m.id}>
                  <strong style={{ color: "var(--ink)" }}>{m.label}</strong> — {m.purpose}
                </li>
              ))}
            </ul>
            <p className="faint mono" style={{ marginTop: "0.6rem" }}>
              Provider configuration is evaluated server-side (no secrets shown).
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
