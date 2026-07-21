import type { Metadata } from "next";
import { PublicNav } from "@/components/PublicNav";

export const metadata: Metadata = {
  title: "Docs",
  description: "A11-K operating docs index (public-safe).",
};

const DOCS = [
  { title: "Brand Registry", path: "docs/BRAND_REGISTRY.md" },
  { title: "Brand Idea Registry", path: "docs/BRAND_IDEA_REGISTRY.md" },
  { title: "Model Routing Map", path: "docs/MODEL_ROUTING_MAP.md" },
  { title: "n8n Workflow Map", path: "docs/N8N_WORKFLOW_MAP.md" },
  { title: "Autonomy Levels", path: "docs/AUTONOMY_LEVELS.md" },
  { title: "Escalation Rules", path: "docs/ESCALATION_RULES.md" },
  { title: "Shadow Company Model", path: "docs/SHADOW_COMPANY_MODEL.md" },
  { title: "OneDrive Source Index", path: "docs/ONEDRIVE_SOURCE_INDEX.md" },
];

export default function DocsPage() {
  return (
    <>
      <PublicNav />
      <main className="section">
        <div className="container stack">
          <div>
            <h1 style={{ margin: 0 }}>Operating Docs</h1>
            <p className="muted">Curated index. Full files live in MRPRODUCTION/docs.</p>
          </div>
          <div className="grid grid-2">
            {DOCS.map((d) => (
              <article key={d.path} className="card">
                <h3>{d.title}</h3>
                <p className="mono faint">{d.path}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
