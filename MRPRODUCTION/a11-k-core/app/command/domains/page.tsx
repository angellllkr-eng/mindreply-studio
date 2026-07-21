import { CommandShell } from "@/components/CommandShell";
import { StatusBadge } from "@/components/StatusBadge";

const DOMAINS = [
  { host: "a11-k.space", role: "Engine landing", status: "blocked" as const, note: "TLS/DNS map pending" },
  { host: "www.a11-k.space", role: "Redirect to root", status: "placeholder" as const, note: "Prepare redirect" },
  { host: "a11-k.space/command", role: "Private command", status: "placeholder" as const, note: "noindex + gate" },
  { host: "command.a11-k.space", role: "Private command host", status: "placeholder" as const, note: "optional; not blocker" },
  { host: "mind-reply.com", role: "Public customer brand", status: "active" as const, note: "Do not break" },
  { host: "www.mind-reply.com", role: "Public customer brand", status: "active" as const, note: "Verified 200" },
  { host: "*.a11-k.space", role: "Wildcard", status: "placeholder" as const, note: "Not required; not a blocker" },
];

export default function DomainsPage() {
  return (
    <CommandShell title="Domains" subtitle="Routing matrix. Wildcard is optional." active="/command/domains">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Host</th>
              <th>Role</th>
              <th>Status</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {DOMAINS.map((d) => (
              <tr key={d.host}>
                <td className="mono">
                  <strong style={{ color: "var(--ink)" }}>{d.host}</strong>
                </td>
                <td>{d.role}</td>
                <td>
                  <StatusBadge status={d.status} />
                </td>
                <td>{d.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CommandShell>
  );
}
