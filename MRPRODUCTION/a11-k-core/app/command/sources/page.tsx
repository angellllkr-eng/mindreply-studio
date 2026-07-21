import { CommandShell } from "@/components/CommandShell";
import { StatusBadge } from "@/components/StatusBadge";
import { ONEDRIVE_SOURCES } from "@/lib/ideas";

export default function SourcesPage() {
  return (
    <CommandShell
      title="OneDrive Sources"
      subtitle="Index only. No private chat dumps. No secret files rendered."
      active="/command/sources"
    >
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Source</th>
              <th>Linked idea</th>
              <th>Summary</th>
              <th>Status</th>
              <th>Next</th>
            </tr>
          </thead>
          <tbody>
            {ONEDRIVE_SOURCES.map((s) => (
              <tr key={s.file}>
                <td className="mono">
                  <strong style={{ color: "var(--ink)" }}>{s.file}</strong>
                </td>
                <td>{s.linkedIdea}</td>
                <td>{s.summary}</td>
                <td>
                  <StatusBadge
                    status={
                      s.status === "confirmed"
                        ? "active"
                        : s.status === "abstract"
                          ? "placeholder"
                          : "blocked"
                    }
                  />
                </td>
                <td>{s.nextAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="faint" style={{ marginTop: "0.85rem" }}>
        No explicit yacht source found. Closest confirmed source is Meridian luxury hospitality.
      </p>
    </CommandShell>
  );
}
