import { Link } from 'react-router-dom'
import { SiteLayout } from '@/components/site-shell'
import { GlassCard, SectionHeader, StatusPill } from '@/components/ui-bits'

export default function PrivateSetup() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <StatusPill tone="gold">The offer</StatusPill>
          <h1 className="mt-6 text-5xl md:text-6xl font-display leading-[1.02]">
            Private owner system setup
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            I build a private command system around your existing work: replies, routes, proof, workflows, decisions, and next actions — controlled from one branded shell.
          </p>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="7-day setup sprint"
          title={<>What you get — <span className="gold-text">ready to use</span></>}
        />
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <GlassCard>
            <div className="text-primary font-medium">1. Private Audit</div>
            <p className="mt-3 text-sm text-muted-foreground">Deep look at your existing system: tools, workflows, decision points, proof gaps. No fluff.</p>
          </GlassCard>
          <GlassCard>
            <div className="text-primary font-medium">2. System Map</div>
            <p className="mt-3 text-sm text-muted-foreground">Clear diagram of your signals → decisions → routes → actions. Everything connected.</p>
          </GlassCard>
          <GlassCard>
            <div className="text-primary font-medium">3. Branded Shell</div>
            <p className="mt-3 text-sm text-muted-foreground">Copilot-style private chat app with your branding. Your command cockpit. Zero learning curve.</p>
          </GlassCard>
          <GlassCard>
            <div className="text-primary font-medium">4. Route Audit</div>
            <p className="mt-3 text-sm text-muted-foreground">Check all routes work. SEO status. Public proof. Private decision layer. Documented.</p>
          </GlassCard>
          <GlassCard>
            <div className="text-primary font-medium">5. Workflow Bridge</div>
            <p className="mt-3 text-sm text-muted-foreground">n8n automation plan. Connect existing tools. Route decisions to execution. No manual work.</p>
          </GlassCard>
          <GlassCard>
            <div className="text-primary font-medium">6. Proof Polish</div>
            <p className="mt-3 text-sm text-muted-foreground">Presentation layer. AUREL-grade visual standard. Everything feels premium. Builds trust.</p>
          </GlassCard>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="This is for you if"
          title={<>You're ready to <span className="gold-text">own your system</span></>}
        />
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          <GlassCard>
            <div className="font-display text-lg">Agency owners</div>
            <p className="mt-3 text-sm text-muted-foreground">
              Stop chasing replies through 5 different tools. One command layer. Your team stays in sync. Clients see premium proof.
            </p>
          </GlassCard>
          <GlassCard>
            <div className="font-display text-lg">Founders</div>
            <p className="mt-3 text-sm text-muted-foreground">
              Your system is scattered. Spreadsheets. Slack threads. Email. MindReply gives you one private cockpit to decide and execute.
            </p>
          </GlassCard>
          <GlassCard>
            <div className="font-display text-lg">Operators</div>
            <p className="mt-3 text-sm text-muted-foreground">
              You move fast. You need clear routes. You need proof. One shell to see status, make decisions, trigger actions. No meetings.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="The process"
          title={<>Setup sprint — <span className="gold-text">7 days</span></>}
        />
        <div className="mt-14 space-y-4">
          <div className="flex gap-4">
            <div className="text-primary font-display text-lg font-bold min-w-fit">Day 1</div>
            <div className="pt-1">
              <div className="font-medium">Audit & map</div>
              <p className="text-sm text-muted-foreground mt-1">Deep dive into your existing system. Document every signal, decision, route, tool.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-primary font-display text-lg font-bold min-w-fit">Day 2-3</div>
            <div className="pt-1">
              <div className="font-medium">Build shell & routes</div>
              <p className="text-sm text-muted-foreground mt-1">Create branded MindReply Shell. Connect to your proof system. Set up route intelligence.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-primary font-display text-lg font-bold min-w-fit">Day 4-5</div>
            <div className="pt-1">
              <div className="font-medium">Connect workflows & proof</div>
              <p className="text-sm text-muted-foreground mt-1">n8n automation setup. Document decision layer. Build proof dashboard. Test every route.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-primary font-display text-lg font-bold min-w-fit">Day 6-7</div>
            <div className="pt-1">
              <div className="font-medium">Polish & launch</div>
              <p className="text-sm text-muted-foreground mt-1">AUREL-grade presentation. Final testing. Documentation. You own the system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU OWN */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="After setup"
          title={<>You own <span className="gold-text">everything</span></>}
        />
        <div className="mt-14 max-w-3xl">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="text-primary text-xl">✓</div>
              <div>
                <div className="font-medium">Branded Shell</div>
                <p className="text-sm text-muted-foreground mt-1">Runs on your domain. Your branding. You control the cockpit.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-primary text-xl">✓</div>
              <div>
                <div className="font-medium">n8n Workflows</div>
                <p className="text-sm text-muted-foreground mt-1">Private automation brain. All your routes documented. You can modify.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-primary text-xl">✓</div>
              <div>
                <div className="font-medium">Route Documentation</div>
                <p className="text-sm text-muted-foreground mt-1">Every signal → decision → action mapped. Team knows exactly how your system works.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-primary text-xl">✓</div>
              <div>
                <div className="font-medium">Proof Dashboard</div>
                <p className="text-sm text-muted-foreground mt-1">What's live. What's blocked. What costs money. Clear proof, every time.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-primary text-xl">✓</div>
              <div>
                <div className="font-medium">Training & Docs</div>
                <p className="text-sm text-muted-foreground mt-1">How to use the shell. How to modify routes. How to add team members.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader eyebrow="Cost" title={<>Custom setup — <span className="gold-text">depends on scope</span></>} />
        <div className="mt-14 max-w-3xl rounded-lg border border-border/60 p-8 bg-primary/5">
          <p className="text-muted-foreground">
            Setup cost depends on your existing system complexity, team size, and automation needs. Typical range: €3,000 - €8,000 for the 7-day sprint.
          </p>
          <p className="mt-4 text-muted-foreground">
            After setup, optional ongoing support: €500-€2,000/month for maintenance, new route additions, team training.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <GlassCard className="text-center py-14 glow-gold">
          <h3 className="text-3xl md:text-4xl font-display">
            Ready to own your system?
          </h3>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Let's talk about your existing setup, your goals, and how MindReply can become your private command layer.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <a href="mailto:setup@mind-reply.com" className="rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground glow-gold hover:opacity-90 transition">
              Schedule setup call
            </a>
            <Link to="/" className="rounded-md border border-border px-8 py-3 text-sm text-foreground hover:border-primary/50 transition">
              Back to home
            </Link>
          </div>
        </GlassCard>
      </section>
    </SiteLayout>
  )
}
