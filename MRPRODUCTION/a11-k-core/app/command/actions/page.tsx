import { CommandShell } from "@/components/CommandShell";
import { StatusBadge } from "@/components/StatusBadge";
import { ACTION_QUEUE } from "@/lib/shadow";

export default function ActionsPage() {
  return (
    <CommandShell title="Action Queue" subtitle="What to do next — honest status only." active="/command/actions">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Action</th>
              <th>Severity</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Blocked by</th>
            </tr>
          </thead>
          <tbody>
            {ACTION_QUEUE.map((a) => (
              <tr key={a.id}>
                <td className="mono">{a.id}</td>
                <td>
                  <strong>{a.title}</strong>
                </td>
                <td>{a.severity}</td>
                <td>{a.owner}</td>
                <td>
                  <StatusBadge status={a.status} />
                </td>
                <td className="faint">{a.blockedBy || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CommandShell>
  );
}
