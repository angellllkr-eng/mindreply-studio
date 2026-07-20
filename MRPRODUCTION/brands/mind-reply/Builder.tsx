import { useState } from 'react'
import { SiteLayout } from '@/components/site-shell'
import { GlassCard, StatusPill } from '@/components/ui-bits'

export default function Builder() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check (in production, use real auth)
    if (password === 'mindreply-operator-2026') {
      setAuthenticated(true)
      setError('')
    } else {
      setError('Invalid password')
      setPassword('')
    }
  }

  if (!authenticated) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-md px-6 py-32">
          <GlassCard className="py-12">
            <h1 className="text-2xl font-display text-center">Operator Access</h1>
            <p className="mt-2 text-sm text-muted-foreground text-center">
              This page is for MindReply operators only. Enter your access code to continue.
            </p>
            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <div>
                <label className="text-xs uppercase text-muted-foreground">Access Code</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••"
                  className="mt-2 w-full rounded-md bg-background/50 border border-border px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary"
                />
              </div>
              {error && <div className="text-xs text-red-400">{error}</div>}
              <button
                type="submit"
                className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
              >
                Access builder
              </button>
            </form>
          </GlassCard>
        </div>
      </SiteLayout>
    )
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-display">Builder Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Hidden from public. Your operator workspace.</p>
          </div>
          <button
            onClick={() => setAuthenticated(false)}
            className="rounded-md border border-border px-4 py-2 text-sm hover:border-primary/50"
          >
            Sign out
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <GlassCard>
            <div className="text-xs uppercase text-muted-foreground">Active audits</div>
            <div className="mt-2 text-3xl font-display">24</div>
            <p className="mt-1 text-xs text-muted-foreground">Waiting review</p>
          </GlassCard>
          <GlassCard>
            <div className="text-xs uppercase text-muted-foreground">Pending approvals</div>
            <div className="mt-2 text-3xl font-display">7</div>
            <p className="mt-1 text-xs text-muted-foreground">Needing decision</p>
          </GlassCard>
          <GlassCard>
            <div className="text-xs uppercase text-muted-foreground">Revenue at risk</div>
            <div className="mt-2 text-3xl font-display">€42,900</div>
            <p className="mt-1 text-xs text-muted-foreground">This month</p>
          </GlassCard>
        </div>

        {/* TABS */}
        <div className="space-y-12">
          {/* Communication Audit Builder */}
          <div>
            <h2 className="text-2xl font-display mb-6">
              <StatusPill tone="gold">1</StatusPill> Communication Audit Builder
            </h2>
            <GlassCard>
              <p className="text-sm text-muted-foreground mb-4">
                Customize the communication audit form. Questions appear on the public home page.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Form title</label>
                  <input
                    type="text"
                    defaultValue="Communication Audit"
                    className="mt-2 w-full rounded-md bg-background/50 border border-border px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Form description</label>
                  <textarea
                    defaultValue="Tell us about your communication challenges. We'll estimate your revenue leakage and recommend the best protection strategy."
                    className="mt-2 w-full rounded-md bg-background/50 border border-border px-3 py-2 text-sm"
                    rows={3}
                  />
                </div>
                <div className="border-t border-border/40 pt-4 mt-4">
                  <label className="text-sm font-medium">Questions in form</label>
                  <div className="mt-3 space-y-2">
                    {[
                      'Company name',
                      'Weekly conversations',
                      'Biggest problem',
                      'Who follows up?',
                      'What needs approval?',
                      'Desired outcome',
                    ].map((q, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-muted-foreground">{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Service Order Templates */}
          <div>
            <h2 className="text-2xl font-display mb-6">
              <StatusPill tone="gold">2</StatusPill> Service Order Templates
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: 'Website Completion', price: '€4,500' },
                { name: 'Chat Setup', price: '€1,200' },
                { name: 'Email Follow-Up Desk', price: '€2,900/mo' },
                { name: 'Phone + Missed Calls', price: '€1,800' },
              ].map((service, i) => (
                <GlassCard key={i} className="cursor-pointer hover:border-primary/50 transition">
                  <h4 className="font-display">{service.name}</h4>
                  <div className="mt-2 text-lg font-display text-primary">{service.price}</div>
                  <button className="mt-4 text-xs text-primary hover:underline">Edit template →</button>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Approval Workflow */}
          <div>
            <h2 className="text-2xl font-display mb-6">
              <StatusPill tone="gold">3</StatusPill> Approval Workflow Rules
            </h2>
            <GlassCard>
              <div className="space-y-4">
                <div className="border-b border-border/40 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">Client replies >€5,000 deal</h4>
                      <p className="mt-1 text-xs text-muted-foreground">Always send to owner for review</p>
                    </div>
                    <input type="checkbox" defaultChecked className="mt-1" />
                  </div>
                </div>
                <div className="border-b border-border/40 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">Follow-ups after 3 days quiet</h4>
                      <p className="mt-1 text-xs text-muted-foreground">Auto-draft + approval queue</p>
                    </div>
                    <input type="checkbox" defaultChecked className="mt-1" />
                  </div>
                </div>
                <div className="border-b border-border/40 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">Service order submissions</h4>
                      <p className="mt-1 text-xs text-muted-foreground">Route to sales team for contact</p>
                    </div>
                    <input type="checkbox" defaultChecked className="mt-1" />
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Proof Dashboard Config */}
          <div>
            <h2 className="text-2xl font-display mb-6">
              <StatusPill tone="gold">4</StatusPill> Proof Metrics (Customer View)
            </h2>
            <GlassCard>
              <p className="text-sm text-muted-foreground mb-4">
                Which metrics appear on customer proof dashboard?
              </p>
              <div className="space-y-3">
                {[
                  { metric: 'Revenue protected', enabled: true },
                  { metric: 'Deals saved from going silent', enabled: true },
                  { metric: 'Weekly revenue leakage stopped', enabled: true },
                  { metric: 'Conversations with clear ownership', enabled: true },
                  { metric: 'Approvals preventing regretted sends', enabled: false },
                  { metric: 'Stalled threads detected & fixed', enabled: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked={item.enabled} />
                    <span className="text-sm">{item.metric}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Lead Scoring Config */}
          <div>
            <h2 className="text-2xl font-display mb-6">
              <StatusPill tone="gold">5</StatusPill> Lead Scoring (AI-Powered Qualification)
            </h2>
            <GlassCard>
              <p className="text-sm text-muted-foreground mb-4">
                After audit submission, AI auto-scores leads. Route high-value only.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Minimum score to contact</label>
                  <select className="mt-2 w-full rounded-md bg-background/50 border border-border px-3 py-2 text-sm">
                    <option>7+ (high priority only)</option>
                    <option>6+ (good prospects)</option>
                    <option>5+ (all contacts)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Scoring factors</label>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex items-center justify-between bg-background/40 px-3 py-2 rounded">
                      <span>Revenue leakage %</span>
                      <span className="text-primary">30%</span>
                    </div>
                    <div className="flex items-center justify-between bg-background/40 px-3 py-2 rounded">
                      <span>Weekly conversation volume</span>
                      <span className="text-primary">25%</span>
                    </div>
                    <div className="flex items-center justify-between bg-background/40 px-3 py-2 rounded">
                      <span>Urgency (deals going silent)</span>
                      <span className="text-primary">25%</span>
                    </div>
                    <div className="flex items-center justify-between bg-background/40 px-3 py-2 rounded">
                      <span>Deal velocity</span>
                      <span className="text-primary">20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Save */}
          <div className="flex gap-3 justify-end">
            <button className="rounded-md border border-border px-6 py-2 text-sm hover:border-primary/50">
              Cancel
            </button>
            <button className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              Save all changes
            </button>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
