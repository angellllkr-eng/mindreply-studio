import { Link } from 'react-router-dom'
import { SiteLayout } from '@/components/site-shell'
import { GlassCard, SectionHeader, StatusPill } from '@/components/ui-bits'

export default function HomeAgency() {
  return (
    <SiteLayout>
      {/* HERO - AGENCY FOCUSED */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-32 md:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <StatusPill tone="gold">For agencies managing 20+ client conversations/day</StatusPill>
              <h1 className="mt-6 text-5xl md:text-7xl font-display leading-[1.02]">
                Your clients think you <span className="gold-text">forgot them.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
                Email thread goes quiet. Client assumes you're not interested. 
                You assume they're not ready. 2 weeks later they hired your competitor.
                
                This happens 2-4 times a month. Each one costs you €3-8K in revenue and €5-10K in reputation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/audit" className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground glow-gold hover:opacity-90 transition">
                  Audit your communication (3 min)
                </Link>
                <Link to="/how-it-works" className="rounded-md border border-border px-6 py-3 text-sm text-foreground hover:border-primary/50 transition">
                  See how we fix it →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <GlassCard className="glow-cyan">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Across our agencies</div>
                  <StatusPill tone="cyan">Last 30 days</StatusPill>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  {[
                    { label: 'Clients saved from silence', value: '432' },
                    { label: 'Revenue protected', value: '€1.2M' },
                    { label: 'Follow-ups auto-handled', value: '8,340' },
                    { label: 'Client satisfaction ↑', value: '34%' },
                  ].map((m) => (
                    <div key={m.label} className="rounded-lg border border-border/60 p-4 hover:border-primary/50 transition">
                      <div className="text-2xl font-display gold-text">{m.value}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{m.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t border-border/40 pt-4 space-y-2">
                  <div className="text-xs font-medium text-yellow-400 uppercase">📊 What our agencies say:</div>
                  <div className="text-xs text-muted-foreground italic">
                    "Clients now call us 'the organized ones.' It's a competitive advantage."
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* THE CHAOS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="What's really happening"
          title={<>Your team is <span className="gold-text">drowning in emails</span></>}
          subtitle="And clients are getting angry about it."
        />
        <div className="mt-14 space-y-4">
          <GlassCard>
            <div className="flex items-start gap-4">
              <div className="text-2xl min-w-fit">👤</div>
              <div>
                <h4 className="font-medium">Your team</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Managing 30 client conversations in email. Some in Slack. Some in portal. 
                  Someone forgets to reply. Someone else thought someone else replied. 
                  Nobody knows who owns what.
                </p>
              </div>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="flex items-start gap-4">
              <div className="text-2xl min-w-fit">😡</div>
              <div>
                <h4 className="font-medium">Your clients</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Waiting 5 days for a reply. 
                  Then 3 more days. Then they assume you don't care. 
                  They text someone else. Done.
                </p>
              </div>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="flex items-start gap-4">
              <div className="text-2xl min-w-fit">💔</div>
              <div>
                <h4 className="font-medium">You lose</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  The client. Their referrals. Your reputation. And you didn't even know it was happening.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Three things that change"
          title={<>How you become <span className="gold-text">"the organized ones"</span></>}
        />
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          <GlassCard className="border-l-2 border-l-primary">
            <div className="text-sm font-medium text-primary uppercase">Layer 1</div>
            <h4 className="mt-3 font-display text-lg">Ownership clarity</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Every client conversation has one owner. 
              Everyone knows who owns it. 
              Nobody gets confused. 
              System shows "waiting on you" vs "waiting on them" vs "needs approval."
            </p>
          </GlassCard>
          <GlassCard className="border-l-2 border-l-primary">
            <div className="text-sm font-medium text-primary uppercase">Layer 2</div>
            <h4 className="mt-3 font-display text-lg">Pattern prediction</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Client goes quiet for 3 days. System flags it. 
              Not because "AI thinks," but because your pattern says "when quiet > 3 days, usually lost."
              System learns your specific client base.
            </p>
          </GlassCard>
          <GlassCard className="border-l-2 border-l-primary">
            <div className="text-sm font-medium text-primary uppercase">Layer 3</div>
            <h4 className="mt-3 font-display text-lg">Auto-action approval</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              System suggests next step: "Send follow-up," "Call them," "Send proposal." 
              Owner approves in 10 seconds. 
              System executes. 
              Over time, system learns what you always approve.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* BEFORE/AFTER */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Real example"
          title={<>One week. One team. <span className="gold-text">What changed.</span></>}
        />
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-display text-lg mb-4">Before Mind-Reply</h4>
            <GlassCard className="bg-red-500/5 border-red-500/20">
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <strong className="text-foreground">Monday:</strong> 
                  Client ABC email arrives. Sarah takes it. Sarah forgets.
                </div>
                <div>
                  <strong className="text-foreground">Wednesday:</strong> 
                  Client ABC calls angry. "We haven't heard from you in 2 days!"
                </div>
                <div>
                  <strong className="text-foreground">Thursday:</strong> 
                  Sarah finally replies. Too late. Client got 2 other quotes.
                </div>
                <div className="border-t border-border/40 pt-3 mt-3">
                  <span className="text-red-400">Result: Lost deal. €8K+ gone. Client blames your team for being disorganized.</span>
                </div>
              </div>
            </GlassCard>
          </div>
          <div>
            <h4 className="font-display text-lg mb-4">After Mind-Reply</h4>
            <GlassCard className="bg-green-500/5 border-green-500/20">
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <strong className="text-foreground">Monday:</strong> 
                  Client ABC email arrives. Assigned to Sarah. Team sees it. System logs it.
                </div>
                <div>
                  <strong className="text-foreground">Wednesday (Day 2 of quiet):</strong> 
                  System alerts: "ABC went quiet. Sarah, follow up?" Sarah clicks approve. Message sent.
                </div>
                <div>
                  <strong className="text-foreground">Thursday:</strong> 
                  Client ABC replies: "Oh sorry, yes! We're interested. How much?"
                </div>
                <div className="border-t border-border/40 pt-3 mt-3">
                  <span className="text-green-400">Result: Deal moved forward. €8K+ protected. Client impressed by responsiveness.</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-20 bg-background/50 rounded-lg">
        <SectionHeader
          eyebrow="From agency owners"
          title={<>How it changed their <span className="gold-text">business</span></>}
        />
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Marcus, Marketing Agency',
              size: '8-person team',
              before: 'Team of 8, chaos. Someone always forgot something. Clients complained.',
              after: 'Everyone knows who owns each client. System reminds us before we forget. Clients now say we\'re "scary organized."',
              impact: '€47K more revenue (less lost deals)',
            },
            {
              name: 'Sophia, Design Studio',
              size: '12-person team',
              before: 'Email threads everywhere. Designers didn\'t know if client was still interested.',
              after: 'System shows them. They can see status: waiting on client, waiting on us, needs approval. Work flows smoothly.',
              impact: '30% faster project timelines',
            },
            {
              name: 'James, B2B Consulting',
              size: '6-person team',
              before: 'Lost 3-4 deals per month to slow follow-ups. We didn\'t realize.',
              after: 'System caught 2 deals in week 1 that would\'ve gone silent. Now we lose almost none.',
              impact: '€120K revenue saved in 3 months',
            },
          ].map((testimonial, i) => (
            <GlassCard key={i}>
              <h4 className="font-display text-sm">{testimonial.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{testimonial.size}</p>
              
              <div className="mt-4 space-y-3 text-xs">
                <div>
                  <span className="text-muted-foreground/70 block">Before:</span>
                  <span className="text-muted-foreground">{testimonial.before}</span>
                </div>
                <div>
                  <span className="text-muted-foreground/70 block">After:</span>
                  <span className="text-muted-foreground">{testimonial.after}</span>
                </div>
              </div>

              <div className="mt-4 border-t border-border/40 pt-3">
                <div className="text-lg font-display text-primary">{testimonial.impact}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="In practice"
          title={<>Setup takes <span className="gold-text">2 hours</span></>}
          subtitle="Then it just works. Your team learns it in 10 minutes."
        />
        <div className="mt-14 space-y-4">
          {[
            {
              num: '1',
              title: 'Connect your email / Slack',
              desc: 'System reads your last 90 days of conversations. Learns patterns.',
            },
            {
              num: '2',
              title: 'Assign team members',
              desc: 'Set who owns which clients. System enforces it.',
            },
            {
              num: '3',
              title: 'System watches',
              desc: 'When client goes quiet, system alerts owner. Owner approves action. System acts.',
            },
            {
              num: '4',
              title: 'System learns',
              desc: 'After 20-30 approvals, system knows your patterns. Stops asking. Just does.',
            },
          ].map((step, i) => (
            <GlassCard key={i}>
              <div className="flex gap-4">
                <div className="text-3xl font-display text-primary min-w-fit">{step.num}</div>
                <div>
                  <h4 className="font-display text-lg">{step.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <SectionHeader
          eyebrow="Simple. Everything included."
          title={<span className="gold-text">€2,900 / month</span>}
          subtitle="For teams managing 20+ clients."
        />
        <div className="mt-14">
          <GlassCard className="border-primary/50 border-2">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <div>
                  <div className="font-medium">Nano-predictive patterns (not AI hype)</div>
                  <p className="text-xs text-muted-foreground mt-1">Learns your specific client behavior. Catches silence before it's too late.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <div>
                  <div className="font-medium">Ownership dashboard</div>
                  <p className="text-xs text-muted-foreground mt-1">Everyone sees who owns each client. Status: waiting on them, waiting on us, needs approval.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <div>
                  <div className="font-medium">Auto-suggestion layer</div>
                  <p className="text-xs text-muted-foreground mt-1">System suggests next action. Team approves. System executes.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <div>
                  <div className="font-medium">Self-learning system</div>
                  <p className="text-xs text-muted-foreground mt-1">Gets smarter with every approval. Eventually runs on its own.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <div>
                  <div className="font-medium">Weekly team reports</div>
                  <p className="text-xs text-muted-foreground mt-1">Revenue protected. Clients saved. Patterns learned.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <div>
                  <div className="font-medium">All integrations (email, Slack, Salesforce, HubSpot)</div>
                  <p className="text-xs text-muted-foreground mt-1">Works with what you already use.</p>
                </div>
              </div>
            </div>
            <Link 
              to="/audit" 
              className="mt-8 block text-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground glow-gold hover:opacity-90 transition"
            >
              Audit your communication (free)
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <GlassCard className="text-center py-14 glow-gold">
          <h3 className="text-3xl md:text-4xl font-display">
            Your clients think you <span className="gold-text">don't care</span>.
          </h3>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            You do. You're just disorganized. 
            System helps you be organized without hiring more people.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/audit" className="rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground glow-gold hover:opacity-90 transition">
              Audit your communication
            </Link>
          </div>
        </GlassCard>
      </section>
    </SiteLayout>
  )
}
