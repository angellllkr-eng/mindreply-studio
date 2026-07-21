import Link from "next/link";
import { PublicNav } from "@/components/PublicNav";
import { StatusBadge } from "@/components/StatusBadge";
import { BRAND_REGISTRY } from "@/lib/brand-registry";

const SECTIONS = [
  {
    id: "system-map",
    title: "System Map",
    body: "Public brand sites stay public. A11-K is the engine core: status, models, workflows, and a private command layer.",
  },
  {
    id: "brand-fleet",
    title: "Brand Fleet",
    body: "MindReply and tool modules on the public edge. Stealth brands (Meridian, BRIXO, labs) stay abstract until sources and boundaries are clear.",
  },
  {
    id: "model-router",
    title: "Model Router",
    body: "Provider presence is detected by configuration presence only. No fake completions. Fallback mode when no providers are configured.",
  },
  {
    id: "workflow-hub",
    title: "n8n Workflow Hub",
    body: "Workflow map with wiring placeholders. Trigger details are protected until wiring is configured.",
  },
  {
    id: "deploy-monitor",
    title: "Deployment Monitor",
    body: "GitHub/Vercel watch is abstract until tokens are present. No spam deploys if limits are hit.",
  },
  {
    id: "prediction",
    title: "Prediction Layer",
    body: "Predicts likely blockers (missing env, DNS, domain map) without inventing live incidents.",
  },
  {
    id: "decision",
    title: "Decision Layer",
    body: "Autonomy levels 0–4. Default Level 1–2. Owner approval for DNS, secrets, destructive, and public/private boundary changes.",
  },
  {
    id: "self-growth",
    title: "Self-Growth Loop",
    body: "SEO, intake, and weekly operating report loops — placeholder until wired, never fake active.",
  },
  {
    id: "idea-vault",
    title: "OneDrive Idea Vault",
    body: "Abstract index of sources. Yacht idea remains blocked: no explicit yacht source; closest is Meridian hospitality.",
  },
];

export default function HomePage() {
  const publicBrands = BRAND_REGISTRY.filter((b) => b.visibility === "public");
  const stealthBrands = BRAND_REGISTRY.filter((b) => b.visibility !== "public");

  return (
    <>
      <PublicNav />
      <main>
        <section className="hero">
          <div className="container">
            <div className="row" style={{ marginBottom: "1rem" }}>
              <StatusBadge status="placeholder" />
              <span className="badge badge-stealth">engine core</span>
              <span className="badge">mind-reply.com untouched</span>
            </div>
            <h1>A11-K Engine Core</h1>
            <p>
              The command layer for MindReply models, workflows, brands, sites, and decisions.
            </p>
            <div className="hero-actions">
              <Link href="/command/gate" className="btn btn-primary">
                Request Owner Cockpit
              </Link>
              <Link href="/status" className="btn">
                System Status
              </Link>
            </div>
          </div>
        </section>

        <section className="section" id="system-map">
          <div className="container">
            <h2>System Map</h2>
            <p className="lede">
              MindReply stays public on mind-reply.com. A11-K is the engine core on a11-k.space — with
              a protected operating cockpit.
            </p>
            <div className="grid grid-3">
              {SECTIONS.map((s) => (
                <article key={s.id} id={s.id} className="card">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>Brand Fleet (public-safe)</h2>
            <p className="lede">Only public-facing names and status labels. No private admin data.</p>
            <div className="grid grid-3">
              {publicBrands.map((b) => {
                const wfLabel =
                  b.workflowStatus === "active"
                    ? "Operational"
                    : b.workflowStatus === "blocked"
                      ? "Blocked"
                      : b.workflowStatus === "placeholder"
                        ? "Wiring pending"
                        : "Unknown";

                return (
                  <article key={b.slug} className="card card-glass">
                    <div className="row" style={{ justifyContent: "space-between" }}>
                      <div>
                        <h3 style={{ margin: 0 }}>{b.name}</h3>
                        <p className="mono faint" style={{ margin: "0.35rem 0 0" }}>
                          {b.domain}
                        </p>
                      </div>
                      <div className="stack" style={{ gap: "0.35rem" }}>
                        <StatusBadge status={b.status} />
                        <span className="badge">{wfLabel}</span>
                      </div>
                    </div>
                    <p style={{ margin: "0.9rem 0 0" }}>
                      Premium module connected to A11-K. {b.visibility === "public" ? "" : ""}
                    </p>
                  </article>
                );
              })}
            </div>

            <p className="faint" style={{ marginTop: "0.95rem" }}>
              Stealth fleet is not listed publicly. Use the protected operating cockpit to view full mapping.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container card">
            <h2 style={{ marginTop: 0 }}>Open Command Center</h2>
            <p className="muted">
              Protected operating cockpit for brands, models, workflows, deployments, and next actions.
            </p>
            <Link href="/command/gate" className="btn btn-primary">
              Request Owner Cockpit
            </Link>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          A11-K · engine for MindReply · public-safe landing · private command is stealth
        </div>
      </footer>
    </>
  );
}
