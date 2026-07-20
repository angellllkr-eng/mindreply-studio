import { Link } from 'react-router-dom'
import { SiteLayout } from '@/components/site-shell'
import { GlassCard, SectionHeader, StatusPill } from '@/components/ui-bits'

export default function Home() {
  return (
    <SiteLayout>
      {/* HERO - PRIVATE OWNER SYSTEM */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-32 md:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <StatusPill tone="gold">For operators who own their decisions</StatusPill>
              <h1 className="mt-6 text-5xl md:text-7xl font-display leading-[1.02]">
                Your <span className="gold-text">private owner system.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
                MindReply is not a builder. It's a private command layer for replies, routes, proof, decisions, and next actions. One shell. Your engine. Full control.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/private-setup" className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground glow-gold hover:opacity-90 transition">
                  Request private setup
                </Link>
                <Link to="https://shell.mind-reply.com" target="_blank" className="rounded-md border border-border px-6 py-3 text-sm text-foreground hover:border-primary/50 transition">
                  Open private shell →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <GlassCard className="glow-cyan">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Your system, three layers</div>
                <div className="mt-6 space-y-4">
                  <div className="rounded-lg border border-border/60 p-4 hover:border-primary/50 transition">
                    <div className="text-sm font-medium text-primary">Layer 1: Proof</div>
                    <p className="mt-1 text-xs text-muted-foreground">See what's live, what's blocked, what's next.</p>
                  </div>
                  <div className="rounded-lg border border-border/60 p-4 hover:border-primary/50 transition">
                    <div className="text-sm font-medium text-primary">Layer 2: Routes</div>
                    <p className="mt-1 text-xs text-muted-foreground">Signal → decision → action. No chaos.</p>
                  </div>
                  <div className="rounded-lg border border-border/60 p-4 hover:border-primary/50 transition">
                    <div className="text-sm font-medium text-primary">Layer 3: Engine</div>
                    <p className="mt-1 text-xs text-muted-foreground">A11-K handles workflows. You stay in control.</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS MINDREPLY */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Not a builder. Not generic."
          title={<>MindReply is your <span className="gold-text">command layer.</span></>}
          subtitle="A private system for operators who move fast."
        />
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          <GlassCard className="border-l-2 border-l-primary">
            <div className="text-sm font-medium text-primary">Proof System</div>
            <h4 className="mt-3 font-display text-lg">Status, not noise</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              What's live. What's blocked. What costs money. What needs approval. Clear proof every decision is made.
            </p>
          </GlassCard>
          <GlassCard className="border-l-2 border-l-primary">
            <div className="text-sm font-medium text-primary">Route Intelligence</div>
            <h4 className="mt-3 font-display text-lg">Signal to action</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Incoming signals map to decisions map to routes map to next actions. No guessing. No spreadsheets.
            </p>
          </GlassCard>
          <GlassCard className="border-l-2 border-l-primary">
            <div className="text-sm font-medium text-primary">Decision Layer</div>
            <h4 className="mt-3 font-display text-lg">You decide. Engine executes.</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              MindReply Shell is your command cockpit. A11-K engine handles workflows, automation, proof. You stay in control.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* SYSTEM MAP */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="The architecture"
          title={<>MindReply ecosystem — <span className="gold-text">built for operators</span></>}
        />
        <div className="mt-14 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-display mb-4">Your front layer</h3>
            <div className="space-y-3">
              <Link to="https://shell.mind-reply.com" target="_blank" className="block p-4 rounded-lg border border-border/60 hover:border-primary/50 transition">
                <div className="font-medium">MindReply Shell</div>
                <div className="text-xs text-muted-foreground mt-1">Copilot-style command chat. Your private cockpit.</div>
              </Link>
              <Link to="/a11k-engine" className="block p-4 rounded-lg border border-border/60 hover:border-primary/50 transition">
                <div className="font-medium">AUREL Proof</div>
                <div className="text-xs text-muted-foreground mt-1">Visual standard. Trust surface. Premium presentation.</div>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-display mb-4">Your engine layer</h3>
            <div className="space-y-3">
              <Link to="https://a11k.mind-reply.com" target="_blank" className="block p-4 rounded-lg border border-border/60 hover:border-primary/50 transition">
                <div className="font-medium">A11-K Engine</div>
                <div className="text-xs text-muted-foreground mt-1">Signal intelligence. Route logic. Decision brain.</div>
              </Link>
              <div className="p-4 rounded-lg border border-border/60 opacity-50">
                <div className="font-medium">n8n Workflows (Protected)</div>
                <div className="text-xs text-muted-foreground mt-1">Automation brain. Controlled execution.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOR AGENCIES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-lg border border-border/60 p-12 bg-gradient-to-br from-primary/5 to-transparent">
          <h3 className="text-2xl font-display">For agencies</h3>
          <p className="mt-2 text-muted-foreground">
            Stop chasing client replies through email, Slack, spreadsheets. MindReply gives your team one command layer for proof, routes, and next actions. Stay in control. Scale without chaos.
          </p>
          <Link to="/for-agencies" className="mt-4 inline-block text-primary hover:opacity-70 text-sm font-medium">
            See how agencies use MindReply →
          </Link>
        </div>
      </section>

      {/* FOR OPERATORS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-lg border border-border/60 p-12 bg-gradient-to-br from-primary/5 to-transparent">
          <h3 className="text-2xl font-display">For founders & operators</h3>
          <p className="mt-2 text-muted-foreground">
            Your system is scattered. Tools everywhere. No owner layer. MindReply gives you one private command shell for replies, workflows, decisions, and proof. Move faster. Make clearer decisions.
          </p>
          <Link to="/for-operators" className="mt-4 inline-block text-primary hover:opacity-70 text-sm font-medium">
            See how operators use MindReply →
          </Link>
        </div>
      </section>

      {/* OFFER */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <GlassCard className="text-center py-14 glow-gold">
          <h3 className="text-3xl md:text-4xl font-display">
            Build your <span className="gold-text">private owner system</span>
          </h3>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Private audit. System map. Branded shell. Setup sprint. Everything you need to own your replies, routes, proof, and decisions in one place.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/private-setup" className="rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground glow-gold hover:opacity-90 transition">
              Request private setup
            </Link>
          </div>
        </GlassCard>
      </section>
    </SiteLayout>
  )
}
