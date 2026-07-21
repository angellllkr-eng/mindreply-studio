import type { LiveProofData } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

export function LiveProofPanel({
  data,
  showEnv = false,
}: {
  data: LiveProofData;
  showEnv?: boolean;
}) {
  const waiting =
    !data.proofLog.length || data.proofLog.every((l) => l.toLowerCase().includes("pending"));

  return (
    <section className="card stack" aria-label="Live proof panel">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h3 style={{ margin: 0 }}>Live Proof</h3>
        <StatusBadge status={data.workflow.status} />
      </div>

      {waiting ? (
        <p className="muted" style={{ margin: 0 }}>
          Waiting for workflow data · Placeholder — backend not configured
        </p>
      ) : null}

      <div className="grid grid-2">
        <div>
          <div className="faint" style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>
            WATCHING
          </div>
          <ul>
            {data.watching.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="faint" style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>
            WORKFLOW
          </div>
          <p className="muted" style={{ margin: "0.35rem 0 0" }}>
            <strong style={{ color: "var(--ink)" }}>{data.workflow.name}</strong>
            <br />
            {showEnv ? `env: ${data.workflow.requiredEnv.join(", ")}` : "Backend not configured"}
          </p>
        </div>
      </div>

      <div>
        <div className="faint" style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>
          PREDICTION
        </div>
        <p className="muted" style={{ margin: "0.35rem 0 0" }}>
          {data.prediction}
        </p>
      </div>

      <div>
        <div className="faint" style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>
          DECISION
        </div>
        <p className="muted" style={{ margin: "0.35rem 0 0" }}>
          {data.decision}
        </p>
      </div>

      <div>
        <div className="faint" style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>
          ESCALATION
        </div>
        <p className="muted" style={{ margin: "0.35rem 0 0" }}>
          {data.escalation}
        </p>
      </div>

      <div>
        <div className="faint" style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>
          PROOF LOG
        </div>
        <ul>
          {data.proofLog.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
