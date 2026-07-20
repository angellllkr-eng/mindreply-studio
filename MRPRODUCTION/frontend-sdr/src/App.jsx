import { useState } from 'react'
import { KitNav, KitCard, KitButton, KitInput, KitFooter, useApiPost } from './kit/kit.jsx'

export default function App() {
  const [product, setProduct] = useState('')
  const [persona, setPersona] = useState('')
  const [tone, setTone] = useState('warm')
  const [out, setOut] = useState(null)
  const { post, loading } = useApiPost()

  const gen = async () => {
    const r = await post('/api/chat', {
      message: `Write 3 cold outreach emails for ${product || 'a SaaS tool'} targeting ${persona || 'busy founders'}. Tone: ${tone}. Each under 120 words, one clear CTA, no buzzword salad. Number them 1/2/3.`,
      effort: 'high'
    })
    setOut(r.reply)
  }

  return (
    <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <KitNav mark="SD" brand="SDR Agent" links={[{ href: '#tool', label: 'Generate' }]} />

      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>Outreach that gets replies.</h1>
        <p>Describe your product and who you're reaching. Get three ready-to-send cold emails — no buzzwords, just signal.</p>
      </section>

      <section style={{ padding: '0 20px 32px' }} id="tool">
        <div className="kit-wrap-narrow">
          <KitCard title="Outreach brief">
            <div className="kit-stack">
              <KitInput label="What are you selling?" value={product} onChange={e => setProduct(e.target.value)} placeholder="e.g. a time-tracking app for designers" />
              <KitInput label="Who are you emailing?" value={persona} onChange={e => setPersona(e.target.value)} placeholder="e.g. design team leads at agencies" />
              <KitInput label="Tone">
                <select value={tone} onChange={e => setTone(e.target.value)} style={{ width: '100%' }}>
                  <option value="warm">Warm</option>
                  <option value="direct">Direct</option>
                  <option value="curious">Curious</option>
                  <option value="bold">Bold</option>
                </select>
              </KitInput>
              <KitButton onClick={gen} loading={loading} disabled={!product || !persona}>Generate 3 emails</KitButton>
            </div>
          </KitCard>
          {out && (
            <KitCard title="Your outreach" style={{ marginTop: 16 }}>
              <div style={{ whiteSpace: 'pre-wrap', fontSize: 14, lineHeight: 1.6 }}>{out}</div>
            </KitCard>
          )}
        </div>
      </section>

      <KitFooter product="SDR Agent" />
    </div>
  )
}
