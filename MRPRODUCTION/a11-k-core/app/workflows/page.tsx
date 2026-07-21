import type { Metadata } from "next";
import { PublicNav } from "@/components/PublicNav";
import { StatusBadge } from "@/components/StatusBadge";
import { WORKFLOWS, n8nBlockedBy } from "@/lib/workflows";

export const metadata: Metadata = {
  title: "Workflows",
  description: "n8n workflow hub map — paths and status only, no webhook secrets.",
};

export default function WorkflowsPage() {
  const blocked = n8nBlockedBy();
  return (
    <>
      <PublicNav />
      <main className="section">
        <div className="container stack">
          <div>
            <h1 style={{ margin: 0 }}>n8n Workflow Hub</h1>
            <p className="muted">
              Dashboard map only. Webhook secrets never shown.{" "}
              {blocked.length ? "Wiring is pending" : "Base wiring is ready (abstract)"}
            </p>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Workflow</th>
                  <th>Trigger</th>
                  <th>Path</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {WORKFLOWS.map((w) => (
                  <tr key={w.id}>
                    <td>
                      <strong>{w.name}</strong>
                      <div className="faint">{w.purpose}</div>
                    </td>
                    <td>{w.trigger}</td>
                    <td className="mono">Protected</td>
                    <td>
                      <StatusBadge status={w.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
