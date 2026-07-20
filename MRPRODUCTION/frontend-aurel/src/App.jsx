import { KitNav, KitCard, KitButton, KitChat, KitFooter, useApi } from './kit/kit.jsx'

const FEATURES = [
  { icon: '◆', title: 'Premium routing', body: 'Every request falls back across Grok, Claude, and OpenRouter so you always get an answer.' },
  { icon: '◈', title: 'Memory that sticks', body: 'Your conversations and notes persist to the backend — pick up where you left off, on any device.' },
  { icon: '◇', title: 'Owner-only access', body: 'Single human owner. No noise, no spam, no upsells. Just your premium assistant.' }
]

export default function App() {
  const { data: health } = useApi('/api/health')

  return (
    <div className="app">
      <KitNav mark="AU" brand="AUREL" links={[{ href: '#features', label: 'Features' }, { href: '#ask', label: 'Ask' }]} />

      <section className="hero">
        <h1>Premium AI connectivity, without the noise.</h1>
        <p>AUREL is your private assistant — wired to the best models, with memory and multi-provider fallback. No queues, no rate limits, no compromise.</p>
        <div className="cta-row">
          <KitButton onClick={() => document.getElementById('ask')?.scrollIntoView({ behavior: 'smooth' })}>Start asking</KitButton>
          <KitButton variant="ghost" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>See features</KitButton>
        </div>
        {health && <div style={{ marginTop: 20, fontSize: 13, color: 'var(--ink-mute)' }}>Backend live · {Math.round(health.uptime || 0)}s uptime</div>}
      </section>

      <section className="section" id="features">
        <h2>What you get</h2>
        <div className="features">
          {FEATURES.map(f => (
            <KitCard key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3 style={{ marginTop: 0 }}>{f.title}</h3>
              <p style={{ marginBottom: 0 }}>{f.body}</p>
            </KitCard>
          ))}
        </div>
      </section>

      <section className="section" id="ask">
        <h2>Ask AUREL</h2>
        <div className="kit-wrap-narrow">
          <KitCard>
            <KitChat product="AUREL" placeholder="Ask your premium assistant…" systemPrompt="You are AUREL, a premium private AI assistant. Be concise, warm, and useful." />
          </KitCard>
        </div>
      </section>

      <KitFooter product="AUREL" />
    </div>
  )
}
