import { Link } from 'react-router-dom'
import { SiteLayout } from '@/components/site-shell'
import { GlassCard, SectionHeader, StatusPill } from '@/components/ui-bits'

const pricingTiers = [
  {
    name: 'Communication Audit',
    price: 'Free',
    cta: 'Start audit',
    ctaTo: '/communication-audit',
    featured: false,
    description: 'Perfect for: Getting started, understanding your risk',
    features: [
      '30-minute discovery call prep',
      'AI-analyzed revenue leakage %',
      'Risk score (1-10)',
      'Top 3 revenue protection moves',
      'Written recommendation report',
      'No credit card required',
    ],
    highlight: 'Lead gen. Get a risk score. See if ReplyControl is right for you.',
  },
  {
    name: 'ReplyControl SaaS',
    price: '€999',
    pricePeriod: '/month',
    cta: 'Try free (14 days)',
    ctaTo: '/replycontrol',
    featured: true,
    description: 'Perfect for: Agencies managing 5-20 client conversations/day',
    features: [
      'Real-time revenue tracking',
      'Stalled thread detection (>3 days)',
      'Live proof dashboard',
      '100% conversation ownership',
      'Weekly proof reports (email)',
      'MCP server (API access)',
      'Team roles (operator, reviewer)',
      'Audit trail & receipts',
      'Email & Slack integration ready',
    ],
    highlight: 'Your SaaS product. Operators use the dashboard. You own the data.',
  },
  {
    name: 'Full Desk Service',
    price: '€2,900',
    pricePeriod: '/month',
    cta: 'Contact sales',
    ctaTo: '/communication-audit',
    featured: false,
    description: 'Perfect for: Agencies wanting done-for-you service',
    features: [
      'Everything in ReplyControl',
      'Dedicated operator (yours or ours)',
      'n8n workflow automation',
      'Salesforce lead sync',
      'Phone provider integration',
      'Chat widget setup (Crisp/Tidio)',
      'Daily standup review',
      '24-hour response guarantee',
      'Referral commission program',
    ],
    highlight: 'White-glove service. Your operator runs the board daily. You get proof metrics.',
  },
]

const comparisonRows = [
  { feature: 'Revenue leakage detection', audit: true, saas: true, service: true },
  { feature: 'Risk scoring (AI)', audit: true, saas: true, service: true },
  { feature: 'Live dashboard', audit: false, saas: true, service: true },
  { feature: 'Ownership tracking', audit: false, saas: true, service: true },
  { feature: 'Approval layer', audit: false, saas: true, service: true },
  { feature: 'Weekly proof reports', audit: false, saas: true, service: true },
  { feature: 'n8n workflows', audit: false, saas: false, service: true },
  { feature: 'Salesforce sync', audit: false, saas: false, service: true },
  { feature: 'Operator included', audit: false, saas: false, service: true },
  { feature: 'Setup assistance', audit: false, saas: 'Self-serve', service: true },
]

export default function Pricing() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-24">
          <div className="text-center">
            <StatusPill tone="gold">Flexible pricing for every stage</StatusPill>
            <h1 className="mt-6 text-5xl md:text-6xl font-display leading-[1.02]">
              Start free. Scale to <span className="gold-text">revenue protection.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              No hidden fees. Cancel anytime. Only pay for what you use.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => (
            <GlassCard
              key={tier.name}
              className={tier.featured ? 'border-primary/50 border-2 md:scale-105' : ''}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <StatusPill tone="gold">Most popular</StatusPill>
                </div>
              )}

              <h3 className="text-xl font-display">{tier.name}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{tier.description}</p>

              <div className="mt-6">
                <div className="text-4xl font-display">
                  {tier.price}
                  {tier.pricePeriod && (
                    <span className="text-lg text-muted-foreground">{tier.pricePeriod}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground italic">{tier.highlight}</p>
              </div>

              <Link
                to={tier.ctaTo}
                className={`mt-6 block text-center rounded-md px-6 py-2 text-sm font-medium transition ${
                  tier.featured
                    ? 'bg-primary text-primary-foreground glow-gold hover:opacity-90'
                    : 'border border-border text-foreground hover:border-primary/50'
                }`}
              >
                {tier.cta}
              </Link>

              <div className="mt-6 space-y-2 border-t border-border/40 pt-6">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Feature comparison"
          title={<>What you get at each <span className="gold-text">tier</span></>}
        />
        <div className="mt-14 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Feature</th>
                <th className="text-center py-3 px-4 text-muted-foreground font-medium">Audit</th>
                <th className="text-center py-3 px-4 text-muted-foreground font-medium">ReplyControl</th>
                <th className="text-center py-3 px-4 text-muted-foreground font-medium">Full Desk</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={i} className="border-b border-border/40">
                  <td className="py-3 px-4 text-foreground">{row.feature}</td>
                  <td className="text-center py-3 px-4">
                    {row.audit === true && <span className="text-primary">✓</span>}
                    {row.audit === false && <span className="text-muted-foreground/40">—</span>}
                    {typeof row.audit === 'string' && <span className="text-xs text-muted-foreground">{row.audit}</span>}
                  </td>
                  <td className="text-center py-3 px-4">
                    {row.saas === true && <span className="text-primary">✓</span>}
                    {row.saas === false && <span className="text-muted-foreground/40">—</span>}
                    {typeof row.saas === 'string' && <span className="text-xs text-muted-foreground">{row.saas}</span>}
                  </td>
                  <td className="text-center py-3 px-4">
                    {row.service === true && <span className="text-primary">✓</span>}
                    {row.service === false && <span className="text-muted-foreground/40">—</span>}
                    {typeof row.service === 'string' && <span className="text-xs text-muted-foreground">{row.service}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <SectionHeader
          eyebrow="Questions"
          title={<>Common <span className="gold-text">pricing questions</span></>}
        />
        <div className="mt-14 space-y-4">
          <GlassCard>
            <h4 className="font-display text-lg">Can I upgrade or downgrade anytime?</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Yes. Switch between Audit, ReplyControl, and Full Desk anytime. Pro-rated billing. No penalty.
            </p>
          </GlassCard>
          <GlassCard>
            <h4 className="font-display text-lg">What's included in the free audit?</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Full AI analysis: your revenue leakage %, risk score, top 3 moves to protect revenue, and a written report. You keep all data. No credit card required.
            </p>
          </GlassCard>
          <GlassCard>
            <h4 className="font-display text-lg">Is there a setup fee?</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Audit: free. ReplyControl SaaS: free to start (14-day trial). Full Desk: one-time €1,200 setup for workflow design & integration.
            </p>
          </GlassCard>
          <GlassCard>
            <h4 className="font-display text-lg">Can I use ReplyControl with Salesforce?</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              ReplyControl SaaS: manual export. Full Desk: automatic sync. Leads, opportunities, and tasks flow bidirectionally.
            </p>
          </GlassCard>
          <GlassCard>
            <h4 className="font-display text-lg">What if I have 50+ conversations/day?</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Contact sales for enterprise pricing. We scale to any volume. Multi-operator support, advanced automation, custom integrations.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <GlassCard className="text-center py-14 glow-gold">
          <h3 className="text-3xl md:text-4xl font-display">
            Start with the <span className="gold-text">free audit</span>.
          </h3>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            2 minutes. No credit card. Get your risk score and see how much revenue you're leaking.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/communication-audit" className="rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground glow-gold hover:opacity-90 transition">
              Take audit
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
