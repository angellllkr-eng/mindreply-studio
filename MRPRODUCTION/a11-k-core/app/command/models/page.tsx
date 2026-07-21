import { CommandShell } from "@/components/CommandShell";
import { StatusBadge } from "@/components/StatusBadge";
import { CHAT_MODES, getProviders, modelFallbackActive } from "@/lib/models";

export default function CommandModelsPage() {
  const providers = getProviders();
  const fallback = modelFallbackActive();
  return (
    <CommandShell title="Models" subtitle="Configured yes/no only." active="/command/models">
      <div className="stack">
        <div className="row">
          <span className="muted">Fallback active:</span>
          <StatusBadge status={fallback ? "blocked" : "active"} />
          <span className="muted">{fallback ? "yes" : "no"}</span>
        </div>
        <div className="grid grid-3">
          {providers.map((p) => (
            <article key={p.id} className="card">
              <div className="row" style={{ justifyContent: "space-between" }}>
                <h3 style={{ margin: 0 }}>{p.label}</h3>
                <StatusBadge status={p.status} />
              </div>
              <p>Configured: {p.configured ? "yes" : "no"}</p>
              <p className="mono faint">{p.env.join(", ")}</p>
              <p>{p.purpose}</p>
            </article>
          ))}
        </div>
        <div className="card">
          <h3>Modes</h3>
          <ul>
            {CHAT_MODES.map((m) => (
              <li key={m.id}>
                {m.label} — {m.purpose}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CommandShell>
  );
}
