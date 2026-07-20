import { useState, useMemo } from 'react'
import { KitNav, KitCard, KitButton, KitInput, KitBadge, KitFooter, useApiPost } from './kit/kit.jsx'

export default function App() {
  const [intent, setIntent] = useState('match all email addresses')
  const [regex, setRegex] = useState('')
  const [test, setTest] = useState('Contact me at angel@mind-reply.com or hello@aurel.io')
  const { post, loading } = useApiPost()

  const matches = useMemo(() => {
    if (!regex) return []
    try {
      const re = new RegExp(regex, 'g')
      return [...test.matchAll(re)].map(m => ({ match: m[0], index: m.index }))
    } catch (e) { return [{ error: e.message }] }
  }, [regex, test])

  const forge = async () => {
    const r = await post('/api/chat', {
      message: `Return ONLY a single regex pattern (no flags, no slashes, no explanation) that will: ${intent}. Output the raw pattern on one line.`,
      effort: 'low'
    })
    const clean = r.reply.replace(/```[a-z]*|```/g, '').split('\n').map(s => s.trim()).filter(Boolean)[0] || r.reply.trim()
    setRegex(clean)
  }

  return (
    <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <KitNav mark="RF" brand="Regex Forge" links={[{ href: '#forge', label: 'Forge' }, { href: '#test', label: 'Test' }]} />

      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>Build regex in plain English.</h1>
        <p>Describe what you want to match. Get a pattern. Test it live. Done.</p>
      </section>

      <section style={{ padding: '0 20px 24px' }} id="forge">
        <div className="kit-wrap-narrow">
          <KitCard title="What do you want to match?">
            <div className="kit-row">
              <KitInput><input value={intent} onChange={e => setIntent(e.target.value)} placeholder="e.g. match all URLs in a string" /></KitInput>
              <KitButton onClick={forge} loading={loading}>Forge</KitButton>
            </div>
            {regex && (
              <div style={{ marginTop: 16, padding: 12, background: 'var(--navy-0)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--mono)', fontSize: 14, color: '#FF8A7A' }}>
                /{regex}/g
              </div>
            )}
          </KitCard>
        </div>
      </section>

      <section style={{ padding: '0 20px 32px' }} id="test">
        <div className="kit-wrap-narrow">
          <KitCard title="Test it">
            <KitInput label="Test string">
              <textarea value={test} onChange={e => setTest(e.target.value)} rows={4} style={{ width: '100%', minHeight: 100, padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--mono)', fontSize: 13, background: 'var(--bg-card)', color: 'var(--ink)', resize: 'vertical' }} />
            </KitInput>
            <div style={{ marginTop: 12 }}>
              {matches.length === 0 ? (
                <KitBadge>No matches</KitBadge>
              ) : matches[0]?.error ? (
                <KitBadge status="error">{matches[0].error}</KitBadge>
              ) : (
                <div className="kit-stack">
                  <div><KitBadge status="live">{matches.length} match{matches.length > 1 ? 'es' : ''}</KitBadge></div>
                  {matches.map((m, i) => (
                    <div key={i} style={{ fontFamily: 'var(--mono)', fontSize: 13, padding: '8px 10px', background: 'var(--line-soft)', borderRadius: 8 }}>
                      <span style={{ color: 'var(--ink-mute)' }}>@{m.index}</span> · <span style={{ color: 'var(--coral)' }}>{m.match}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </KitCard>
        </div>
      </section>

      <KitFooter product="Regex Forge" />
    </div>
  )
}
