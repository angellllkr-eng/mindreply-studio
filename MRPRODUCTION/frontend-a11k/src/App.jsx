import { useState } from 'react'
import { KitNav, KitCard, KitButton, KitInput, KitBadge, KitChat, KitFooter, useApi, useApiPost } from './kit/kit.jsx'

export default function App() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog.')
  const [report, setReport] = useState(null)
  const { post, loading } = useApiPost()
  const { data: health } = useApi('/api/health')

  const check = async () => {
    const r = await post('/api/chat', {
      message: `Audit this text for accessibility (WCAG 2.2 AA): readability, plain language, alt-text needs, and color-contrast concerns. Return a short friendly report with a score /100 and 3 concrete fixes.\n\nTEXT:\n${text}`,
      effort: 'medium'
    })
    setReport(r.reply)
  }

  return (
    <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <KitNav mark="A11" brand="A11-K" links={[{ href: '#tool', label: 'Audit' }, { href: '#ask', label: 'Ask' }]} />

      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>Make your writing reach everyone.</h1>
        <p>Paste any text. Get a friendly accessibility audit in seconds — readability, plain language, and concrete fixes.</p>
        {health && <div style={{ marginTop: 12 }}><KitBadge status="live">API live</KitBadge></div>}
      </section>

      <section style={{ padding: '0 20px 32px' }} id="tool">
        <div className="kit-wrap-narrow">
          <KitCard title="Your text">
            <KitInput>
              <textarea value={text} onChange={e => setText(e.target.value)} rows={5} style={{ width: '100%', minHeight: 120, padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--sans)', fontSize: 14, background: 'var(--bg-card)', color: 'var(--ink)', resize: 'vertical' }} />
            </KitInput>
            <div style={{ marginTop: 12 }}>
              <KitButton onClick={check} loading={loading}>Audit accessibility</KitButton>
            </div>
          </KitCard>
          {report && (
            <KitCard title="Audit report" style={{ marginTop: 16 }}>
              <div style={{ whiteSpace: 'pre-wrap', fontSize: 14, lineHeight: 1.6 }}>{report}</div>
            </KitCard>
          )}
        </div>
      </section>

      <section style={{ padding: '0 20px 40px' }} id="ask">
        <div className="kit-wrap-narrow">
          <KitCard title="Ask about accessibility">
            <KitChat product="A11-K" placeholder="Ask about WCAG, screen readers, contrast…" systemPrompt="You are A11-K, an accessibility expert. Be practical and friendly." />
          </KitCard>
        </div>
      </section>

      <KitFooter product="A11-K" />
    </div>
  )
}
