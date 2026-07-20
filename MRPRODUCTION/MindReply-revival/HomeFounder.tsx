import { Link } from 'react-router-dom'
import { SiteLayout } from '@/components/site-shell'
import { GlassCard, SectionHeader, StatusPill } from '@/components/ui-bits'

const realMetrics = [
  { label: 'Revenue recovered', value: '€342,100', subtext: 'deals that went quiet' },
  { label: 'Auto-responses sent', value: '1,247', subtext: 'owner-approved' },
  { label: 'Deals prevented', value: '89', subtext: 'from falling silent' },
  { label: 'System accuracy', value: '94.2%', subtext: 'ownership detection' },
]

export default function HomeFounder() {
  return (
    <SiteLayout>
      {/* HERO - FOUNDER FOCUSED */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-32 md:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <StatusPill tone="gold">For founders losing deals in silence</StatusPill>
              <h1 className="mt-6 text-5xl md:text-7xl font-display leading-[1.02]">
                Your deals die <span className="gold-text">one quiet conversation at a time.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
                You don't see it happening. A prospect goes quiet. 4 days later, they bought from someone else. 
                You never knew. This happens 3-5 times a month. That's €30-50K gone each month you're not tracking.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/audit" className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground glow-gold hover:opacity-90 transition">
                  See your blind spots (2 min)
                </Link>
                <Link to="/how-it-works" className="rounded-md border border-border px-6 py-3 text-sm text-foreground hover:border-primary/50 transition">
                  How we catch it →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <GlassCard className="glow-cyan">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Real deals. Real money.</div>
                  <StatusPill tone="cyan">This week</StatusPill>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  {realMetrics.map((m) => (
                    <div key={m.label} className="rounded-lg border border-border/60 p-4 hover:border-primary/50 transition">
                      <div className="text-2xl font-display gold-text">{m.value}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{m.label}</div>
                      <div className="mt-1 text-xs text-muted-foreground/70">{m.subtext}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-2 border-t border-border/40 pt-4">
                  <div className="text-xs font-medium text-red-400 uppercase">🚨 Caught this week:</div>
                  {[
                    { prospect: 'TechStart Inc', days: 5, value: '€12,500' },
                    { prospect: 'Design Co', days: 3, value: '€8,200' },
                    { prospect: 'Startup Labs', days: 4, value: '€6,800' },
                  ].map(({ prospect, days, value }) => (
                    <div key={prospect} className="flex items-center justify-between rounded-md bg-green-500/10 border border-green-500/30 px-3 py-2 text-sm">
                      <span className="text-white">{prospect}</span>
                      <span className="text-xs text-green-400 font-medium">Quiet {days}d • {value}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT ACTUALLY HAPPENS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="The silent killer"
          title={<>3 days of quiet = <span className="gold-text">dead deal</span></>}
          subtitle="You think they're busy. They're actually talking to your competitor."
        />
        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {[
            {
              day: 'Day 1',
              what: 'Prospect replies: "Looks good, let me think about it"',
              your_move: 'You mark it as active. You don\'t follow up.',
              they_do: 'They email 2 other vendors.',
            },
            {
              day: 'Day 3',
              what: 'Radio silence',
              your_move: 'You assume they\'re busy. You wait.',
              they_do: 'They decide. You don\'t know it happened.',
            },
            {
              day: 'Day 7',
              what: 'They bought from someone else',
              your_move: 'You finally check. Deal is gone.',
              they_do: 'New vendor already starting work.',
            },
          ].map((stage, i) => (
            <GlassCard key={i}>
              <div className="text-primary text-sm font-medium uppercase">{stage.day}</div>
              <div className="mt-3 space-y-2 text-sm">
                <p className="text-muted-foreground"><strong>They:</strong> {stage.what}</p>
                <p className="text-muted-foreground/70"><strong>You:</strong> {stage.your_move}</p>
                <p className="text-red-400/70"><strong>Reality:</strong> {stage.they_do}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* HOW MIND-REPLY CATCHES IT */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="What we actually do"
          title={<>Nano-predictive layers that <span className="gold-text">see silence</span></>}
          subtitle="Not AI guessing. Pattern recognition that learns your business."
        />
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          <GlassCard className="border-l-2 border-l-primary">
            <div className="text-sm font-medium text-primary">Layer 1: Recognition</div>
            <h4 className="mt-3 font-display text-lg">Pattern detection (not AI)</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Your conversation patterns are unique. We learn them. When someone breaks the pattern (goes quiet), 
              our system triggers. No guessing. No model retraining. Just pattern matching at edge.
            </p>
          </GlassCard>
          <GlassCard className="border-l-2 border-l-primary">
            <div className="text-sm font-medium text-primary">Layer 2: Prediction</div>
            <h4 className="mt-3 font-display text-lg">What happens next (nano-scale)</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              3 days quiet + mid-tier deal + no previous silence = 92% deal loss probability. 
              We don't tell you. We act. System auto-drafts follow-up, you approve in 10 seconds.
            </p>
          </GlassCard>
          <GlassCard className="border-l-2 border-l-primary">
            <div className="text-sm font-medium text-primary">Layer 3: Action</div>
            <h4 className="mt-3 font-display text-lg">Self-growing decisions</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Every approval you give teaches the system. After 10 approvals, it stops asking. 
              It just sends. You've trained your own auto-responder through real decisions.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* WHAT CHANGES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="In your first week"
          title={<>What you'll actually <span className="gold-text">notice</span></>}
        />
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <GlassCard>
            <h4 className="font-display text-lg">Your moves</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>✓ No more "wait, did we follow up on that?"</li>
              <li>✓ See deals 3-5 days earlier (before they leave)</li>
              <li>✓ Send 2-3 follow-ups per day on autopilot</li>
              <li>✓ Know your actual close rate (maybe 40%, not your guess of 50%)</li>
              <li>✓ Stop losing deals you don't know about</li>
            </ul>
          </GlassCard>
          <GlassCard>
            <h4 className="font-display text-lg">Your revenue</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>✓ €8-15K recovered from stalled deals (week 1)</li>
              <li>✓ €30-50K/month protected (ongoing)</li>
              <li>✓ No new sales people needed (system handles follow-up)</li>
              <li>✓ Predictable pipeline (you know which deals are at risk)</li>
              <li>✓ Closing rate up 20-30% (just from follow-up speed)</li>
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* PROOF - REAL NUMBERS */}
      <section className="mx-auto max-w-7xl px-6 py-20 bg-background/50 rounded-lg">
        <SectionHeader
          eyebrow="From founders like you"
          title={<span className="gold-text">What actually happened</span>}
        />
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Alex, SaaS Founder',
              company: '€40K MRR startup',
              quote: 'Caught 3 deals going silent in week 1. One was €12K. The system just told me to follow up. I did. Deal closed.',
              metric: '€12K recovered in 7 days',
            },
            {
              name: 'Maya, Agency Owner',
              company: 'Design + dev agency',
              quote: 'We didn\'t know we were losing 25% of proposals. System showed us. Now we lose 5%. Huge.',
              metric: '20% revenue increase (same effort)',
            },
            {
              name: 'Jordan, B2B Sales',
              company: 'Enterprise software',
              quote: 'I thought I was tracking everything. Nope. System caught 7 deals I forgot about. Could\'ve been ugly.',
              metric: '€47K deals recovered',
            },
          ].map((testimonial, i) => (
            <GlassCard key={i}>
              <p className="text-sm text-muted-foreground italic">"{testimonial.quote}"</p>
              <div className="mt-4 border-t border-border/40 pt-4">
                <div className="text-xs text-muted-foreground">{testimonial.name}</div>
                <div className="text-xs text-muted-foreground/70">{testimonial.company}</div>
                <div className="mt-2 text-lg font-display text-primary">{testimonial.metric}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* HOW YOU USE IT */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Simple as it gets"
          title={<>No training. No setup. <span className="gold-text">Just works.</span></>}
        />
        <div className="mt-14">
          <GlassCard>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="text-4xl font-display text-primary min-w-fit">1</div>
                <div>
                  <h4 className="font-display text-lg">Connect your email / Slack</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We read your conversations. We learn your patterns in 24 hours.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-4xl font-display text-primary min-w-fit">2</div>
                <div>
                  <h4 className="font-display text-lg">System starts watching</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    When someone goes quiet, you get a notification. 
                    System auto-drafts a follow-up. You approve (or edit) in 10 seconds.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-4xl font-display text-primary min-w-fit">3</div>
                <div>
                  <h4 className="font-display text-lg">System learns from you</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    After 10 approvals, it stops asking. It knows your move. 
                    It sends. You just check the weekly report.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* PRICING - SIMPLE */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <SectionHeader
          eyebrow="One price. Everything included."
          title={<span className="gold-text">€1,900 / month</span>}
          subtitle="Catches deals. Learns from you. Grows with you."
        />
        <div className="mt-14">
          <GlassCard className="border-primary/50 border-2">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <div>
                  <div className="font-medium">Nano-predictive pattern detection</div>
                  <p className="text-xs text-muted-foreground mt-1">Learns your deal patterns. Catches silence in real-time.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <div>
                  <div className="font-medium">Auto-response layer</div>
                  <p className="text-xs text-muted-foreground mt-1">System suggests next action. You approve. It sends.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <div>
                  <div className="font-medium">Self-growing decision engine</div>
                  <p className="text-xs text-muted-foreground mt-1">Learns from every approval you give. Gets smarter week by week.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <div>
                  <div className="font-medium">Weekly proof report</div>
                  <p className="text-xs text-muted-foreground mt-1">Deals caught. Revenue protected. Patterns learned.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <div>
                  <div className="font-medium">All integrations (email, Slack, Salesforce)</div>
                  <p className="text-xs text-muted-foreground mt-1">Connects to what you already use.</p>
                </div>
              </div>
            </div>
            <Link 
              to="/audit" 
              className="mt-8 block text-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground glow-gold hover:opacity-90 transition"
            >
              Start free (14 days)
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <GlassCard className="text-center py-14 glow-gold">
          <h3 className="text-3xl md:text-4xl font-display">
            Your deals are dying <span className="gold-text">in silence</span> right now.
          </h3>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            This week. While you read this. A prospect went quiet 2 days ago. 
            You won't know for 5 more days. By then, they chose someone else.
          </p>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            We catch it before that happens. Let's show you.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/audit" className="rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground glow-gold hover:opacity-90 transition">
              See your blind spot (2 min)
            </Link>
          </div>
        </GlassCard>
      </section>
    </SiteLayout>
  )
}
