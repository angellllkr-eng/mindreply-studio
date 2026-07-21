import { CommandShell } from "@/components/CommandShell";
import { StatusBadge } from "@/components/StatusBadge";

export default function SupportPage() {
  return (
    <CommandShell
      title="Customer Support"
      subtitle="Queue is abstract until public intake workflow connection is live."
      active="/command/support"
    >
      <div className="card stack">
        <div className="row">
          <StatusBadge status="placeholder" />
          <span className="muted">No customer records loaded (stealth / privacy)</span>
        </div>
        <p className="muted" style={{ margin: 0 }}>
          Waiting for workflow data. Escalation format ready for critical/high only.
        </p>
        <pre
          className="mono"
          style={{
            margin: 0,
            whiteSpace: "pre-wrap",
            background: "#0b0f16",
            border: "1px solid var(--line)",
            borderRadius: 10,
            padding: "0.85rem",
            color: "var(--muted)",
          }}
        >{`ESCALATION
—
Severity: Critical / High / Medium / Low
Affected system:
What happened:
Why it matters:
Recommended action:
What Angel must do:
Safe fallback active: yes/no
Blocked by:`}</pre>
      </div>
    </CommandShell>
  );
}
