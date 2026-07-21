import { CommandShell } from "@/components/CommandShell";
import { StatusBadge } from "@/components/StatusBadge";

const PAGES = [
  "/website-completion",
  "/response-overload-rescue",
  "/for-agencies",
  "/client-communication-automation",
  "/client-update-reports",
  "/mindreply-agents",
  "/tools",
  "/tools/sql-studio",
  "/tools/code-lens",
  "/tools/ai-sdr-agent",
  "/tools/regex-forge",
  "/tools/code-tutor",
];

export default function SeoPage() {
  return (
    <CommandShell
      title="SEO / Growth"
      subtitle="Checklist only. No thin SEO spam. Public pages stay on mind-reply.com."
      active="/command/seo"
    >
      <div className="card" style={{ marginBottom: "1rem" }}>
        <h3>Every public page must have</h3>
        <p className="muted">
          title · description · H1 · canonical · OpenGraph · Twitter · sitemap · robots · internal
          links · CTA · support path
        </p>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Priority path (MindReply)</th>
              <th>SEO status</th>
            </tr>
          </thead>
          <tbody>
            {PAGES.map((p) => (
              <tr key={p}>
                <td className="mono">{p}</td>
                <td>
                  <StatusBadge status="placeholder" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CommandShell>
  );
}
