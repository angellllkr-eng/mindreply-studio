import { CommandShell } from "@/components/CommandShell";
import { StatusBadge } from "@/components/StatusBadge";
import { SHADOW_TWINS } from "@/lib/shadow";

export default function ShadowPage() {
  return (
    <CommandShell
      title="Operating Twin"
      subtitle="Twins mirror structure, not private customer data."
      active="/command/shadow"
    >
      <div className="grid grid-3">
        {SHADOW_TWINS.map((t) => (
          <article key={t.id} className="card">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <h3 style={{ margin: 0 }}>{t.name}</h3>
              <StatusBadge status={t.status} />
            </div>
            <p>{t.purpose}</p>
            <p className="faint">Last sync: {t.lastSync}</p>
          </article>
        ))}
      </div>
    </CommandShell>
  );
}
