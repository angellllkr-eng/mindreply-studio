import type { Metadata } from "next";
import { PublicNav } from "@/components/PublicNav";
import { StatusBadge } from "@/components/StatusBadge";

export const metadata: Metadata = {
  title: "Labs",
  description: "Public-safe experiments index. Stealth labs stay abstract.",
  robots: { index: false, follow: false },
};

const LABS = [
  { name: "Operating Twin demos", status: "placeholder", note: "No private data" },
  { name: "Model fallback playground", status: "placeholder", note: "No fake completions" },
  { name: "Meridian hospitality sketch", status: "stealth", note: "Idea vault only" },
  { name: "Kratos-S / Aether-X", status: "stealth", note: "Not promoted publicly" },
];

export default function LabsPage() {
  return (
    <>
      <PublicNav />
      <main className="section">
        <div className="container stack">
          <div>
            <h1 style={{ margin: 0 }}>Labs</h1>
            <p className="muted">Experiments index. Stealth modules are named only, not launched.</p>
          </div>
          <div className="grid grid-2">
            {LABS.map((l) => (
              <article key={l.name} className="card">
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <h3 style={{ margin: 0 }}>{l.name}</h3>
                  <StatusBadge status={l.status} />
                </div>
                <p>{l.note}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
