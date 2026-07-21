import { CommandShell } from "@/components/CommandShell";
import { StatusBadge } from "@/components/StatusBadge";
import { WORKFLOWS, n8nBlockedBy } from "@/lib/workflows";

export default function CommandWorkflowsPage() {
  const blocked = n8nBlockedBy();
  return (
    <CommandShell
      title="workflow automation Workflows"
      subtitle={
        blocked.length
          ? `Blocked credentials: ${blocked.join(", ")}`
          : "Base workflow automation env present — workflow connections still abstract"
      }
      active="/command/workflows"
    >
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Workflow</th>
              <th>workflow connection</th>
              <th>Required env</th>
              <th>Action</th>
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
                <td className="mono">{w.connectionPath}</td>
                <td className="mono">{w.requiredEnv.join(", ")}</td>
                <td>{w.dashboardAction}</td>
                <td>
                  <StatusBadge status={w.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="faint" style={{ marginTop: "0.85rem" }}>
        Safe trigger buttons stay disabled until workflow connection status is active. Secrets never rendered.
      </p>
    </CommandShell>
  );
}
