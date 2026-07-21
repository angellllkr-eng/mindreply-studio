import { CommandShell } from "@/components/CommandShell";
import { StatusBadge } from "@/components/StatusBadge";
import { IDEA_PACK } from "@/lib/ideas";

export default function IdeasPage() {
  return (
    <CommandShell
      title="Ideas Vault"
      subtitle="Stealth ideas stay abstract. No public launch without source + boundary."
      active="/command/ideas"
    >
      <div className="grid grid-2">
        {IDEA_PACK.map((idea) => (
          <article key={idea.id} className="card">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <h3 style={{ margin: 0 }}>{idea.title}</h3>
              <StatusBadge status={idea.status} />
            </div>
            <p>
              Visibility: <StatusBadge status={idea.visibility} />
            </p>
            <p>{idea.notes}</p>
          </article>
        ))}
      </div>
    </CommandShell>
  );
}
