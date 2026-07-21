import { CommandShell } from "@/components/CommandShell";
import { StatusBadge } from "@/components/StatusBadge";

export default function LogsPage() {
  return (
    <CommandShell
      title="Logs / Next Actions"
      subtitle="Audit-friendly notes. No secret values. No customer payloads."
      active="/command/logs"
    >
      <div className="stack">
        <article className="card">
          <div className="row">
            <StatusBadge status="active" />
            <strong>2026-07-21</strong>
          </div>
          <p className="muted">
            Scaffolded a11-k-core with public engine landing, protected command shell, abstract
            brand/model/workflow/shadow layers, LiveProofPanel, stealth posture.
          </p>
        </article>
        <article className="card">
          <h3>Next 3</h3>
          <ol>
            <li>Map a11-k.space to a11-k-core (owner DNS/Vercel)</li>
            <li>Set COMMAND_ACCESS_TOKEN (or Auth.js envs)</li>
            <li>Provide N8N_BASE_URL + N8N_API_KEY when ready to wire workflows</li>
          </ol>
        </article>
      </div>
    </CommandShell>
  );
}
