import { CommandShell } from "@/components/CommandShell";
import { BentoCard, HumanNote, StatusPill } from "@/components/Brushworks";

const PATHS = [
  ["If a deploy breaks", "Keep the last Ready deployment and return traffic to it.", "Promote the previous known-good deployment.", "No", "ready"],
  ["If a domain points wrong", "The public surface could land on the wrong project.", "Remove the alias and restore the previous DNS record.", "Yes", "review"],
  ["If a workflow fails", "An intake or escalation may stop moving.", "Disable the workflow and use the manual queue.", "No", "safe"],
  ["If an AI provider fails", "Chat must not invent an answer.", "Show the honest provider blocker and keep status-only mode.", "No", "safe"],
  ["If a private route is exposed", "Internal controls or data could become public.", "Keep the route locked and remove it from public navigation.", "Yes", "blocked"],
] as const;

export default function RollbackPage() {
  return <CommandShell title="Rollback paths" subtitle="Human-readable ways to undo a risky change." active="/command/rollback"><div className="bw-bento-grid">{PATHS.map(([title, problem, fallback, approval, status]) => <BentoCard key={title} className="ak-command-card" tone={status === "blocked" ? "coral" : status === "review" ? "amber" : "mint"}><div className="bw-card-head"><StatusPill status={status}>{status === "safe" ? "Safe fallback" : status === "review" ? "Needs approval" : status === "blocked" ? "Critical" : "Ready"}</StatusPill><span className="ak-card-index">{approval === "Yes" ? "OWNER" : "AUTO"}</span></div><h3>{title}</h3><p><strong className="bw-inline-label">Problem:</strong> {problem}</p><p style={{ marginTop: ".55rem" }}><strong className="bw-inline-label">Fallback:</strong> {fallback}</p><p style={{ marginTop: ".55rem" }}><strong className="bw-inline-label">Approval:</strong> {approval}</p></BentoCard>)}</div><HumanNote><strong>Rollback is part of the decision.</strong> Nothing risky is considered ready without a known way back.</HumanNote></CommandShell>;
}
