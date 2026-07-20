import { useState } from 'react'
import { KitNav, KitCard, KitButton, KitBadge, KitFooter, useApiPost } from './kit/kit.jsx'

export default function App() {
  const [code, setCode] = useState('function sum(a, b) {\n  return a + b\n}')
  const [review, setReview] = useState(null)
  const { post, loading } = useApiPost()

  const review_ = async () => {
    const r = await post('/api/chat', {
      message: `Review this code. Return a short friendly report: a score /100, then 3 bullet issues ranked by severity (🔴/🟡/🟢), then 1 concrete fix. Be honest but kind.\n\n\`\`\`\n${code}\n\`\`\``,
      effort: 'high'
    })
    setReview(r.reply)
  }

  return (
    <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <KitNav mark="CL" brand="Code Lens" links={[{ href: '#tool', label: 'Review' }]} />

      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>Review your code in seconds.</h1>
        <p>Paste a snippet. Get a friendly, honest review — score, ranked issues, one fix to ship.</p>
      </section>

      <section style={{ padding: '0 20px 32px' }} id="tool">
        <div className="kit-wrap-narrow">
          <KitCard title="Your code">
            <textarea value={code} onChange={e => setCode(e.target.value)} rows={8} style={{ width: '100%', minHeight: 200, padding: 12, border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--mono)', fontSize: 13, background: 'var(--navy-0)', color: '#E2E8F0', resize: 'vertical' }} />
            <div style={{ marginTop: 12 }}>
              <KitButton onClick={review_} loading={loading}>Review code</KitButton>
            </div>
          </KitCard>
          {review && (
            <KitCard title="Review" style={{ marginTop: 16 }}>
              <div style={{ whiteSpace: 'pre-wrap', fontSize: 14, lineHeight: 1.6 }}>{review}</div>
              <div style={{ marginTop: 12 }}><KitBadge status="live">multi-provider</KitBadge></div>
            </KitCard>
          )}
        </div>
      </section>

      <KitFooter product="Code Lens" />
    </div>
  )
}
