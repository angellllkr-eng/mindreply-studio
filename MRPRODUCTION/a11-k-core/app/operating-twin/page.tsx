import { PublicSurface } from "@/components/PublicSurface";
import { BentoCard, HumanNote, StatusPill } from "@/components/Brushworks";

const LAYERS = [
  ["Brand view", "A simple picture of which products exist and what each one is for.", "waiting"],
  ["Site view", "Public URL health only. No customer content is mirrored.", "waiting"],
  ["Workflow view", "Automation map without workflow connection secrets.", "blocked"],
  ["AI model view", "Which provider routes are configured, without exposing keys.", "waiting"],
  ["Decision view", "A preview of the upside, risk, approval, and undo path.", "ready"],
] as const;

export default function OperatingTwinPage() {
  return <PublicSurface eyebrow="A11-K / OPERATING TWIN" title="See the system without making it complicated." body="The Operating Twin is a safe picture of the estate: structure, signals, and decisions � never private customer data or invented live facts."><div className="ak-public-grid">{LAYERS.map(([title, body, status]) => <BentoCard key={title} className="ak-public-card" tone={status === "blocked" ? "amber" : status === "ready" ? "mint" : "violet"}><StatusPill status={status}>{status === "blocked" ? "Waiting" : status === "ready" ? "Ready" : "Preview"}</StatusPill><h3>{title}</h3><p>{body}</p><span className="bw-feature-link">View layer ?</span></BentoCard>)}</div><HumanNote><strong>Truth boundary.</strong> The Operating Twin is a structural preview. Live synchronisation is not claimed until its source and credentials are verified.</HumanNote></PublicSurface>;
}
