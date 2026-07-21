import { CommandShell } from "@/components/CommandShell";
import { StatusBadge } from "@/components/StatusBadge";

const ROWS = [
  {
    project: "a11-k-core",
    repo: "local MRPRODUCTION/a11-k-core",
    branch: "main",
    commit: "pending first deploy",
    status: "placeholder" as const,
  },
  {
    project: "mindreply-org",
    repo: "mindreply-org",
    branch: "production",
    commit: "live public site",
    status: "active" as const,
  },
  {
    project: "stale Vercel projects",
    repo: "various",
    branch: "—",
    commit: "do not reconnect a11-k.space",
    status: "blocked" as const,
  },
];

export default function DeploymentsPage() {
  return (
    <CommandShell
      title="Deployments"
      subtitle="Abstract deploy table. No spam if Vercel limits hit."
      active="/command/deployments"
    >
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Vercel project</th>
              <th>Repo</th>
              <th>Branch</th>
              <th>Commit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.project}>
                <td>
                  <strong>{r.project}</strong>
                </td>
                <td className="mono">{r.repo}</td>
                <td>{r.branch}</td>
                <td>{r.commit}</td>
                <td>
                  <StatusBadge status={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CommandShell>
  );
}
