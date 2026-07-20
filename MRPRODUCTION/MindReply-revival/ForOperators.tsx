import { Link } from 'react-router-dom'
import { SiteLayout } from '@/components/site-shell'
import { GlassCard, SectionHeader, StatusPill } from '@/components/ui-bits'

export default function ForOperators() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <StatusPill tone="gold">For founders & operators</StatusPill>
          <h1 className="mt-6 text-5xl md:text-6xl font-display leading-[1.02]">
            Your system is <span className="gold-text">scattered.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Spreadsheets. Slack. Email. n8n workflows nobody understands. Decisions happen in meetings and get lost. You move fast but nothing connects.
          </p>
        </div>
      </section>

      {/* THE REALITY */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="What this looks like"
          title={<>You're doing <span className="gold-text">10 jobs at once</span></>}
        />
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <GlassCard className="border-red-500/20 bg-red-500/5">
            <div className="text-red-400 font-medium">Current chaos</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Deciding via Slack (nobody reads it)</li>
              <li>• Workflows in n8n (too complex)</li>
              <li>• Approvals via email (slow)</li>
              <li>• Follow-up in calendar (manual)</li>
              <li>• Proof nowhere (trust issues)</li>
              <li>• Next actions unclear (ad-hoc)</li>
            </ul>
          </GlassCard>
          <GlassCard className="border-green-500/20 bg-green-500/5">
            <div className="text-green-400 font-medium">With MindReply</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>✓ One shell for decisions</li>
              <li>✓ Routes run themselves</li>
              <li>✓ Proof automatic</li>
              <li>✓ Follow-up automatic</li>
              <li>✓ Status visible always</li>
              <li>✓ Next actions clear</li>
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Your private system"
          title={<>One command layer — <span className="gold-text">everything connected</span></>}
        />
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <GlassCard className="border-l-2 border-l-primary">
            <div className="text-sm font-medium text-primary">Decision Layer</div>
            <h4 className="mt-3 font-display text-lg">MindReply Shell</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Your private Copilot chat app. See status. See context. Make decision. Type command. Done. Your branded cockpit.
            </p>
          </GlassCard>
          <GlassCard className="border-l-2 border-l-primary">
            <div className="text-sm font-medium text-primary">Engine Layer</div>
            <h4 className="mt-3 font-display text-lg">A11-K + n8n</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Signal intelligence. Route logic. Workflow execution. You decide. Engine does. Automatic proof. No manual work.
            </p>
          </GlassCard>
          <GlassCard className="border-l-2 border-l-primary">
            <div className="text-sm font-medium text-primary">Proof Layer</div>
            <h4 className="mt-3 font-display text-lg">AUREL Dashboard</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              What's live. What's blocked. What's next. Timestamp on every decision. You know exactly what's happening, always.
            </p>
          </GlassCard>
          <GlassCard className="border-l-2 border-l-primary">
            <div className="text-sm font-medium text-primary">Control Layer</div>
            <h4 className="mt-3 font-display text-lg">Routes You Own</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Every route documented. Every decision mapped. Every outcome tracked. You can modify. You stay in control.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* FOR YOU SPECIFICALLY */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="What changes for you"
          title={<>You go from <span className="gold-text">busy to focused</span></>}
        />
        <div className="mt-14 space-y-6">
          <div className="rounded-lg border border-border/60 p-8">
            <div className="font-display text-lg mb-3">Before: Ad-hoc chaos</div>
            <p className="text-muted-foreground text-sm">
              You're context-switching. Email, Slack, meetings, spreadsheets. Decisions happen. You forget to follow up. Proof exists nowhere. Team misaligned.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 p-8">
            <div className="font-display text-lg mb-3">After: Operator's cockpit</div>
            <p className="text-muted-foreground text-sm">
              You open Shell. You see status. You make decision. Routes execute. Proof logs. Team aligned. You focus on strategy, not admin.
            </p>
          </div>
        </div>
      </section>

      {/* HOW YOU USE IT */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="A real day"
          title={<>How MindReply <span className="gold-text">changes your routine</span></>}
        />
        <div className="mt-14 space-y-4">
          <div className="flex gap-4">
            <div className="text-primary font-display text-lg font-bold min-w-fit">Morning</div>
            <div className="pt-1">
              <div className="font-medium">Open Shell</div>
              <p className="text-sm text-muted-foreground mt-1">See overnight signals. See what's stalled. See what needs approval. 30 seconds to know your status.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-primary font-display text-lg font-bold min-w-fit">Anytime</div>
            <div className="pt-1">
              <div className="font-medium">Make decisions in Shell</div>
              <p className="text-sm text-muted-foreground mt-1">New signal. Type decision. Route triggers. Workflow executes. Proof logs. Zero admin.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-primary font-display text-lg font-bold min-w-fit">Weekly</div>
            <div className="pt-1">
              <div className="font-medium">Check proof dashboard</div>
              <p className="text-sm text-muted-foreground mt-1">See what happened. See decisions. See outcomes. See routes working. Show team/board. Trust built.</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE PAYOFF */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Result"
          title={<>You own your system — <span className="gold-text">not the other way around</span></>}
        />
        <div className="mt-14 max-w-3xl">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-2xl font-display text-primary min-w-fit">1 cockpit</div>
              <div>
                <div className="font-medium">Not 10 tools</div>
                <p className="text-sm text-muted-foreground">MindReply Shell is your command center. Everything you need in one place. No context switching.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl font-display text-primary min-w-fit">Full proof</div>
              <div>
                <div className="font-medium">For every move</div>
                <p className="text-sm text-muted-foreground">Timestamp. Decision. Route. Outcome. You know exactly what happened. No disputes. No forgetting.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl font-display text-primary min-w-fit">Automatic routes</div>
              <div>
                <div className="font-medium">Not manual work</div>
                <p className="text-sm text-muted-foreground">You decide. Engine executes. Workflows run. Proof logs. Zero manual follow-up needed.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl font-display text-primary min-w-fit">You stay focused</div>
              <div>
                <div className="font-medium">On strategy</div>
                <p className="text-sm text-muted-foreground">Not admin. Not spreadsheets. Not "did we do that?" You make decisions. System handles the rest.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <GlassCard className="text-center py-14 glow-gold">
          <h3 className="text-3xl md:text-4xl font-display">
            Stop being <span className="gold-text">scattered.</span>
          </h3>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Build your private command layer. One shell. Clear routes. Automatic proof. Full control.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/private-setup" className="rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground glow-gold hover:opacity-90 transition">
              Request setup
            </Link>
            <Link to="/" className="rounded-md border border-border px-8 py-3 text-sm text-foreground hover:border-primary/50 transition">
              Back to home
            </Link>
          </div>
        </GlassCard>
      </section>
    </SiteLayout>
  )
}
