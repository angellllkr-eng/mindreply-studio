import { CommandShell } from "@/components/CommandShell";
import { StatusBadge } from "@/components/StatusBadge";
import { BRAND_REGISTRY } from "@/lib/brand-registry";

export default function BrandsPage() {
  return (
    <CommandShell title="Brand Fleet" subtitle="Full registry including stealth abstracts." active="/command/brands">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Domain</th>
              <th>Visibility</th>
              <th>Status</th>
              <th>Workflow</th>
              <th>Next action</th>
            </tr>
          </thead>
          <tbody>
            {BRAND_REGISTRY.map((b) => (
              <tr key={b.slug}>
                <td>
                  <strong>{b.name}</strong>
                  <div className="faint mono">{b.slug}</div>
                </td>
                <td className="mono">{b.domain}</td>
                <td>
                  <StatusBadge status={b.visibility} />
                </td>
                <td>
                  <StatusBadge status={b.status} />
                </td>
                <td>
                  <StatusBadge status={b.workflowStatus} />
                </td>
                <td>{b.nextAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CommandShell>
  );
}
