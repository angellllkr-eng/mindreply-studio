import Link from "next/link";
import type { ReactNode } from "react";

const NAV = [
  { href: "/command", label: "Overview" },
  { href: "/command/brands", label: "Brand Fleet" },
  { href: "/command/domains", label: "Domains" },
  { href: "/command/deployments", label: "Deployments" },
  { href: "/command/models", label: "Models" },
  { href: "/command/chat", label: "AI Chat" },
  { href: "/command/workflows", label: "n8n Workflows" },
  { href: "/command/seo", label: "SEO / Growth" },
  { href: "/command/support", label: "Customer Support" },
  { href: "/command/ideas", label: "Ideas Vault" },
  { href: "/command/sources", label: "OneDrive Sources" },
  { href: "/command/shadow", label: "Shadow Company" },
  { href: "/command/simulation", label: "Simulation" },
  { href: "/command/actions", label: "Action Queue" },
  { href: "/command/logs", label: "Logs / Next" },
];

export function CommandShell({
  title,
  subtitle,
  children,
  active,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  active?: string;
}) {
  return (
    <div className="cmd">
      <aside className="cmd-side">
        <div className="logo">
          <span
            style={{
              display: "inline-grid",
              placeItems: "center",
              width: "1.7rem",
              height: "1.7rem",
              borderRadius: 7,
              background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              color: "#061018",
              fontSize: "0.7rem",
              fontWeight: 800,
            }}
          >
            A11
          </span>
          Command
        </div>
        <nav className="cmd-nav" aria-label="Command center">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={active === item.href ? "active" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/" style={{ marginTop: "1rem", color: "var(--faint)" }}>
            ← Engine landing
          </Link>
        </nav>
      </aside>
      <main className="cmd-main">
        <div className="stealth-banner">
          STEALTH MODE · Private surface · noindex · no customer data · secrets never rendered ·
          missing systems shown as placeholder/blocked only
        </div>
        <header className="cmd-header">
          <div>
            <h1>{title}</h1>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
          <div className="row">
            <span className="badge badge-stealth">private</span>
            <span className="badge badge-placeholder">abstract layers</span>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
