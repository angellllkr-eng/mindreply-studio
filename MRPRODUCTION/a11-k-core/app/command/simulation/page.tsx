import { CommandShell } from "@/components/CommandShell";
import { StatusBadge } from "@/components/StatusBadge";

const SIMS = [
  {
    action: "Attach a11-k.space to a11-k-core",
    result: "Engine landing becomes reachable on domain",
    risk: "Wrong project alias breaks engine domain",
    approval: true,
    rollback: "Remove domain from project / restore prior DNS",
  },
  {
    action: "Enable live AI chat SDK calls",
    result: "Command chat streams real model output",
    risk: "Cost / usage limits / data leakage if misconfigured",
    approval: true,
    rollback: "Disable route; keep fallback mode",
  },
  {
    action: "Activate public intake workflow connection",
    result: "Forms create support records",
    risk: "Spam / PII handling without storage policy",
    approval: true,
    rollback: "Disable workflow connection path",
  },
];

export default function SimulationPage() {
  return (
    <CommandShell
      title="Simulation"
      subtitle="Decision preflight. Abstract outcomes only."
      active="/command/simulation"
    >
      <div className="stack">
        {SIMS.map((s) => (
          <article key={s.action} className="card">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <h3 style={{ margin: 0 }}>{s.action}</h3>
              <StatusBadge status={s.approval ? "blocked" : "placeholder"} />
            </div>
            <p>
              <strong style={{ color: "var(--ink)" }}>Likely result:</strong> {s.result}
            </p>
            <p>
              <strong style={{ color: "var(--ink)" }}>Risk:</strong> {s.risk}
            </p>
            <p>
              <strong style={{ color: "var(--ink)" }}>Approval needed:</strong>{" "}
              {s.approval ? "yes (Level 4)" : "no"}
            </p>
            <p className="faint">Rollback: {s.rollback}</p>
          </article>
        ))}
      </div>
    </CommandShell>
  );
}
