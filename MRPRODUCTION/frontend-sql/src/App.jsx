import { useState } from 'react'
import { KitNav, KitCard, KitButton, KitInput, KitBadge, KitFooter, useApiPost } from './kit/kit.jsx'

export default function App() {
  const [question, setQuestion] = useState('show the top 10 customers by total spend this month')
  const [schema, setSchema] = useState('customers(id, name, email), orders(id, customer_id, total, created_at)')
  const [sql, setSql] = useState('')
  const [explain, setExplain] = useState('')
  const { post, loading } = useApiPost()

  const gen = async () => {
    const r = await post('/api/chat', {
      message: `Write a PostgreSQL query for this request. Return ONLY the SQL in a code block, then a one-sentence plain-English explanation after.\n\nSCHEMA:\n${schema}\n\nREQUEST:\n${question}`,
      effort: 'medium'
    })
    const m = r.reply.match(/```sql\n?([\s\S]*?)```/) || r.reply.match(/```\n?([\s\S]*?)```/)
    setSql(m ? m[1].trim() : r.reply.trim())
    setExplain(r.reply.split(/```/).pop().trim())
  }

  return (
    <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <KitNav mark="SQ" brand="SQL Studio" links={[{ href: '#tool', label: 'Generate' }]} />

      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>Ask in English. Get SQL.</h1>
        <p>Describe your schema and your question. Get a clean PostgreSQL query — plus a one-line explanation.</p>
      </section>

      <section style={{ padding: '0 20px 32px' }} id="tool">
        <div className="kit-wrap-narrow">
          <KitCard title="Your query">
            <div className="kit-stack">
              <KitInput label="Schema (tables and columns)">
                <textarea value={schema} onChange={e => setSchema(e.target.value)} rows={3} style={{ width: '100%', minHeight: 70, padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--mono)', fontSize: 13, background: 'var(--bg-card)', color: 'var(--ink)', resize: 'vertical' }} />
              </KitInput>
              <KitInput label="What do you want to know?">
                <textarea value={question} onChange={e => setQuestion(e.target.value)} rows={2} style={{ width: '100%', minHeight: 60, padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--sans)', fontSize: 14, background: 'var(--bg-card)', color: 'var(--ink)', resize: 'vertical' }} />
              </KitInput>
              <KitButton onClick={gen} loading={loading}>Generate SQL</KitButton>
            </div>
          </KitCard>
          {sql && (
            <KitCard title="Generated SQL" style={{ marginTop: 16 }}>
              <pre style={{ margin: 0, padding: 14, background: 'var(--navy-0)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--mono)', fontSize: 13, color: '#FF8A7A', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>{sql}</pre>
              {explain && <div style={{ marginTop: 12, fontSize: 14, color: 'var(--ink-mute)' }}>{explain}</div>}
              <div style={{ marginTop: 12 }}><KitBadge status="live">PostgreSQL 16</KitBadge></div>
            </KitCard>
          )}
        </div>
      </section>

      <KitFooter product="SQL Studio" />
    </div>
  )
}
