import Link from "next/link";
import type { ReactNode } from "react";
import { StatusPill } from "@/components/Brushworks";

const GROUPS = [
  {
    label: "Workspace",
    items: [
      ["/command/chat", "Ask A11-K", "01"],
      ["/command", "Overview", "02"],
      ["/command/brands", "Brand fleet", "03"],
      ["/command/workflows", "Workflow status", "04"],
      ["/command/models", "AI model status", "05"],
    ],
  },
  {
    label: "Decisions",
    items: [
      ["/command/simulation", "Decision preview", "06"],
      ["/command/actions", "Cost & limits", "07"],
      ["/command/rollback", "Rollback paths", "08"],
      ["/command/logs", "When to notify Angel", "09"],
    ],
  },
  {
    label: "Estate",
    items: [
      ["/command/domains", "Sites & domains", "10"],
      ["/command/deployments", "Deployments", "11"],
      ["/command/ideas", "Idea vault", "12"],
      ["/command/sources", "Sources", "13"],
    ],
  },
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
    <div className="bw-cockpit">
      <aside className="bw-sidebar">
        <Link href="/command/chat" className="bw-cockpit-brand">
          <span className="bw-brand-mark">A11</span>
          <span>
            <strong>Command</strong>
            <small>Private cockpit</small>
          </span>
        </Link>
        <div className="bw-sidebar-state">
          <span className="bw-live-dot" aria-hidden="true" />
          <span>Owner workspace</span>
          <StatusPill status="private" />
        </div>
        <nav className="bw-command-nav" aria-label="Command center">
          {GROUPS.map((group) => (
            <div className="bw-nav-group" key={group.label}>
              <div className="bw-nav-group-label">{group.label}</div>
              {group.items.map(([href, label, number]) => (
                <Link key={href} href={href} className={active === href ? "is-active" : undefined}>
                  <span className="bw-nav-number">{number}</span>
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="bw-sidebar-bottom">
          <div className="bw-safe-mini">
            <span>✦</span>
            <div>
              <strong>Safe mode on</strong>
              <small>Nothing ships without you</small>
            </div>
          </div>
          <Link href="/" className="bw-back-link">
            ← Public A11-K
          </Link>
        </div>
      </aside>
      <main className="bw-cockpit-main">
        <div className="bw-cockpit-topbar">
          <div className="bw-topbar-left">
            <span className="bw-live-dot" aria-hidden="true" />
            <span>Private command center</span>
            <span className="bw-topbar-divider">/</span>
            <span className="bw-topbar-muted">a11-k.space</span>
          </div>
          <div className="bw-topbar-right">
            <span className="bw-topbar-muted">No secrets shown</span>
            <StatusPill status="safe">Safe mode</StatusPill>
          </div>
        </div>
        <header className="bw-page-header">
          <div>
            <div className="bw-eyebrow">A11-K / {active === "/command/chat" ? "YOUR COPILOT" : "OWNER VIEW"}</div>
            <h1>{title}</h1>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
          <div className="bw-page-header-pills">
            <StatusPill status="private">Private</StatusPill>
            <span className="bw-header-hint">Changes stay prepared until approved</span>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
