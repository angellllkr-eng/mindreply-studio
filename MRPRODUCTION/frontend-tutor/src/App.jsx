import { KitNav, KitCard, KitChat, KitFooter } from './kit/kit.jsx'

const STARTERS = [
  "Explain async/await like I'm 12",
  'Why is my React component re-rendering?',
  "What's the difference between SQL JOIN types?",
  'Show me a clean use of useEffect with cleanup'
]

export default function App() {
  return (
    <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <KitNav mark="CT" brand="Code Tutor" links={[{ href: '#ask', label: 'Ask' }]} />

      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>Learn by asking.</h1>
        <p>A patient tutor for any language, any level. No judgement, no jargon walls — just clear answers with examples.</p>
      </section>

      <section style={{ padding: '0 20px 24px' }}>
        <div className="kit-wrap-narrow">
          <KitCard title="Try one of these">
            <div className="kit-stack">
              {STARTERS.map(s => (
                <button key={s} className="kit-btn kit-btn-ghost" style={{ textAlign: 'left', justifyContent: 'flex-start' }} onClick={() => {
                  const ta = document.querySelector('.kit-chat-composer textarea')
                  if (ta) { ta.value = s; ta.dispatchEvent(new Event('input', { bubbles: true })); ta.focus() }
                }}>{s}</button>
              ))}
            </div>
          </KitCard>
        </div>
      </section>

      <section style={{ padding: '0 20px 40px' }} id="ask">
        <div className="kit-wrap-narrow">
          <KitCard>
            <KitChat product="Code Tutor" placeholder="Ask anything about code…" systemPrompt="You are Code Tutor. Explain clearly with small examples. Adapt to the learner's level. Never condescend." />
          </KitCard>
        </div>
      </section>

      <KitFooter product="Code Tutor" />
    </div>
  )
}
