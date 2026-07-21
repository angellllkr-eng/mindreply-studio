import type { HTMLAttributes, ReactNode } from "react";

export type FriendlyStatus =
  | "live"
  | "ready"
  | "waiting"
  | "blocked"
  | "draft"
  | "review"
  | "safe"
  | "private";

const STATUS_LABELS: Record<FriendlyStatus, string> = {
  live: "Live",
  ready: "Ready",
  waiting: "Waiting",
  blocked: "Blocked",
  draft: "Draft only",
  review: "Needs review",
  safe: "Safe fallback",
  private: "Private",
};

export function StatusPill({ status, children }: { status: FriendlyStatus; children?: ReactNode }) {
  return <span className={`bw-pill bw-pill-${status}`}><span className="bw-pill-dot" aria-hidden="true" />{children || STATUS_LABELS[status]}</span>;
}

export function SectionIntro({ eyebrow, title, body, action }: { eyebrow?: string; title: string; body?: string; action?: ReactNode }) {
  return <div className="bw-section-intro"><div>{eyebrow ? <div className="bw-eyebrow">{eyebrow}</div> : null}<h2>{title}</h2>{body ? <p>{body}</p> : null}</div>{action ? <div className="bw-section-action">{action}</div> : null}</div>;
}

type BentoCardProps = HTMLAttributes<HTMLElement> & { children: ReactNode; tone?: "default" | "violet" | "mint" | "amber" | "coral" };

export function BentoCard({ children, className = "", tone = "default", ...props }: BentoCardProps) {
  return <article {...props} className={`bw-card bw-card-${tone} ${className}`}>{children}</article>;
}

export function MetricCard({ label, value, detail, status }: { label: string; value: string; detail: string; status?: FriendlyStatus }) {
  return <BentoCard className="bw-metric-card"><div className="bw-card-label">{label}</div><div className="bw-metric-value">{value}</div><div className="bw-card-detail">{detail}</div>{status ? <StatusPill status={status} /> : null}</BentoCard>;
}

export function NextAction({ title, body, href, status = "waiting" }: { title: string; body: string; href?: string; status?: FriendlyStatus }) {
  const content = <><div className="bw-action-top"><StatusPill status={status} /><span className="bw-arrow" aria-hidden="true">↗</span></div><strong>{title}</strong><p>{body}</p></>;
  return href ? <a className="bw-next-action" href={href}>{content}</a> : <div className="bw-next-action">{content}</div>;
}

export function EmptyState({ eyebrow = "Nothing connected yet", title, body, action }: { eyebrow?: string; title: string; body: string; action?: ReactNode }) {
  return <div className="bw-empty-state"><div className="bw-empty-orbit" aria-hidden="true"><span /></div><div className="bw-eyebrow">{eyebrow}</div><h3>{title}</h3><p>{body}</p>{action ? <div className="bw-empty-action">{action}</div> : null}</div>;
}

export function HumanNote({ children }: { children: ReactNode }) {
  return <div className="bw-human-note">{children}</div>;
}
