import { Link } from 'react-router-dom'
import { SiteLayout } from '@/components/site-shell'
import { GlassCard, SectionHeader, StatusPill } from '@/components/ui-bits'

export default function ForAgencies() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <StatusPill tone="gold">For your team</StatusPill>
          <h1 className="mt-6 text-5xl md:text-6xl font-display leading-[1.02]">
            Stop chasing replies.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            One command layer for your entire team. Proof of every client decision. Routes you can trust. No more Slack threads, email chains, spreadsheets.
          </p>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="The problem"
          title={<>Your team is <span className="gold-text">scattered</span></>}
        />
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <GlassCard className="border-red-500/20 bg-red-500/5">
            <div className="text-red-400 font-medium">What's happening now</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Client question in email</li>
              <li>• Slack thread (5 people, no decision)</li>
              <li>• Email back to client (who sees it?)</li>
              <li>• Update goes to spreadsheet (maybe)</li>
              <li>• 3 days later: did we follow up?</li>
            </ul>
          </GlassCard>
          <GlassCard className="border-green-500/20 bg-green-500/5">
            <div className="text-green-400 font-medium">With MindReply</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>✓ Signal comes in (any channel)</li>
              <li>✓ Routes to owner (one person)</li>
              <li>✓ Owner decides in Shell</li>
              <li>✓ Proof logged (timestamp, decision, action)</li>
              <li>✓ Automated follow-up (no manual)</li>
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="How it works for teams"
          title={<>One system — <span className="gold-text">clear ownership</span></>}
        />
        <div className="mt-14 space-y-4">
          <div className="rounded-lg border border-border/60 p-6 hover:border-primary/50 transition">
            <div className="font-medium text-primary">Signal Detection</div>
            <p className="text-sm text-muted-foreground mt-2">Client message, email, form, webhook — all come into one place. You see everything.</p>
          </div>
          <div className="rounded-lg border border-border/60 p-6 hover:border-primary/50 transition">
            <div className="font-medium text-primary">Route Assignment</div>
            <p className="text-sm text-muted-foreground mt-2">Smart routing: by client, by project, by urgency. One owner per thread. Clear accountability.</p>
          </div>
          <div className="rounded-lg border border-border/60 p-6 hover:border-primary/50 transition">
            <div className="font-medium text-primary">Decision Shell</div>
            <p className="text-sm text-muted-foreground mt-2">Your branded chat app. See context. Make decision. Type reply. Approve and send. One step.</p>
          </div>
          <div className="rounded-lg border border-border/60 p-6 hover:border-primary/50 transition">
            <div className="font-medium text-primary">Proof Dashboard</div>
            <p className="text-sm text-muted-foreground mt-2">Every decision tracked. Timestamp. Who decided. What was decided. What happened. No disputes.</p>
          </div>
          <div className="rounded-lg border border-border/60 p-6 hover:border-primary/50 transition">
            <div className="font-medium text-primary">Workflow Automation</div>
            <p className="text-sm text-muted-foreground mt-2">n8n workflows handle follow-up, CRM sync, file generation. Your team focuses on decisions, not admin.</p>
          </div>
        </div>
      </section>

      {/* TEAM SCENARIOS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Real workflows"
          title={<>How teams use <span className="gold-text">MindReply</span></>}
        />
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          <GlassCard>
            <div className="font-display text-lg">Account managers</div>
            <p className="mt-3 text-sm text-muted-foreground">
              See all client signals in one shell. No more checking email, Slack, Monday. One place. One decision. One proof.
            </p>
          </GlassCard>
          <GlassCard>
            <div className="font-display text-lg">Ops team</div>
            <p className="mt-3 text-sm text-muted-foreground">
              Monitor all routes. Spot stalled threads. Track approval times. Run reports. Everything documented. No manual updates.
            </p>
          </GlassCard>
          <GlassCard>
            <div className="font-display text-lg">Leadership</div>
            <p className="mt-3 text-sm text-muted-foreground">
              See which clients are at risk. Which deals are stalled. Response time metrics. Approval patterns. Real business intel.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* RESULTS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="What changes"
          title={<>Your team becomes <span className="gold-text">faster and clearer</span></>}
        />
        <div className="mt-14 max-w-3xl">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-2xl font-display text-primary min-w-fit">2x faster</div>
              <div>
                <div className="font-medium">Response time</div>
                <p className="text-sm text-muted-foreground">No looking for context. No waiting for Slack responses. Owner sees everything in shell. Decides. Done.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl font-display text-primary min-w-fit">100% clear</div>
              <div>
                <div className="font-medium">Ownership</div>
                <p className="text-sm text-muted-foreground">One owner per thread. Team knows who to ask. No "I thought you had it" conversations.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl font-display text-primary min-w-fit">0 lost deals</div>
              <div>
                <div className="font-medium">To silence</div>
                <p className="text-sm text-muted-foreground">You see stalled threads immediately. Alerts. Routes. Actions. Before deals disappear.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl font-display text-primary min-w-fit">Complete proof</div>
              <div>
                <div className="font-medium">For every decision</div>
                <p className="text-sm text-muted-foreground">Timestamp. Who decided. What was decided. What's the status. No more "I don't remember what we agreed."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <GlassCard className="text-center py-14 glow-gold">
          <h3 className="text-3xl md:text-4xl font-display">
            Ready to build your <span className="gold-text">command layer?</span>
          </h3>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Let's audit your current system and design the perfect setup for your team.
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
