import Link from "next/link";
import { CommandShell } from "@/components/CommandShell";
import { BentoCard, HumanNote, MetricCard, NextAction, SectionIntro, StatusPill } from "@/components/Brushworks";
import { ACTION_QUEUE } from "@/lib/shadow";
import { getProviders } from "@/lib/models";
import { WORKFLOWS } from "@/lib/workflows";

export default function CommandOverviewPage() {
  const providers = getProviders();
  const connected = providers.filter((provider) => provider.configured).length;
  const blockedWorkflows = WORKFLOWS.filter((workflow) => workflow.status === "blocked").length;
  const waitingActions = ACTION_QUEUE.filter((action) => action.status === "blocked" || action.status === "placeholder").length;

  return (
    <CommandShell title="Good morning, Angel." subtitle="Here is the useful version of your system: what is live, what is waiting, and the next safe move." active="/command">
      <div className="ak-command-hero">
        <div><div className="bw-eyebrow">YOUR OPERATING VIEW / 01</div><h2>See the signal. Choose the move.</h2><p>A11-K keeps the whole estate visible without pretending that placeholders are live.</p></div>
        <Link href="/command/chat" className="bw-button bw-button-primary">Ask A11-K <span>?</span></Link>
      </div>

      <div className="ak-command-metrics"><MetricCard label="Command center" value="Locked" detail="Private access is protected" status="private" /><MetricCard label="AI providers" value={`${connected}/${providers.length}`} detail={connected ? "At least one route is connected" : "AI provider not connected yet"} status={connected ? "live" : "waiting"} /><MetricCard label="Workflow status" value={blockedWorkflows ? "Waiting" : "Ready"} detail={blockedWorkflows ? "Automation is waiting for credentials" : "Workflow layer is available"} status={blockedWorkflows ? "waiting" : "ready"} /><MetricCard label="Next actions" value={`${waitingActions}`} detail="Items need a decision or a dependency" status="review" /></div>

      <section className="bw-section ak-command-section"><SectionIntro eyebrow="START HERE" title="The cockpit in one glance" body="Every card answers what it is, why it matters, and where to go next." /><div className="bw-bento-grid"><BentoCard tone="violet" className="ak-command-card-wide"><div className="ak-command-card-top"><StatusPill status="ready">Your copilot</StatusPill><span className="ak-card-index">01</span></div><h3>Ask A11-K</h3><p>Ask what to do next, what is blocked, which sites need attention, or how to explain the system simply.</p><Link href="/command/chat" className="bw-button bw-button-primary">Open chat ?</Link></BentoCard><BentoCard className="ak-command-card"><div className="ak-command-card-top"><StatusPill status="waiting">Waiting</StatusPill><span className="ak-card-index">02</span></div><h3>Workflow status</h3><p>Automation is ready in the interface, but workflow automation credentials are not connected yet.</p><Link href="/command/workflows" className="bw-feature-link">See workflows ?</Link></BentoCard><BentoCard tone="mint" className="ak-command-card"><div className="ak-command-card-top"><StatusPill status="safe">Protected</StatusPill><span className="ak-card-index">03</span></div><h3>Live proof layer</h3><p>Verified facts stay separate from placeholders. No fake health, deployment, or AI claims.</p><Link href="/status" className="bw-feature-link">View proof ?</Link></BentoCard></div></section>

      <section className="ak-command-next"><div><div className="bw-eyebrow">NEXT SAFE MOVES</div><h2>What deserves attention?</h2></div><div className="ak-next-grid"><NextAction title="Ask what should move next" body="Let the copilot turn the whole estate into one clear next action." href="/command/chat" status="ready" /><NextAction title="Review the blocked workflows" body="Automation is waiting for workflow automation credentials; the UI stays honest and usable." href="/command/workflows" status="waiting" /><NextAction title="Preview a risky decision" body="See the upside, risk, approval, and undo path before acting." href="/command/simulation" status="review" /></div></section>

      <HumanNote><strong>Safe by default.</strong> A11-K can prepare plans and explain the system. Deployments, domains, secrets, workflows, and public/private changes remain under your approval.</HumanNote>
    </CommandShell>
  );
}
