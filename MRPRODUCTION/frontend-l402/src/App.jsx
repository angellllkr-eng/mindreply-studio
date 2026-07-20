import { useState } from 'react'
import { KitNav, KitCard, KitButton, KitInput, KitBadge, KitFooter, useApiPost } from './kit/kit.jsx'

export default function App() {
  const [name, setName] = useState('git-commit')
  const [purpose, setPurpose] = useState('Write clean conventional commit messages from staged diff')
  const [skill, setSkill] = useState(null)
  const { post, loading } = useApiPost()

  const gen = async () => {
    const r = await post('/api/chat', {
      message: `Generate a SKILL.md for an AI agent skill. Use this exact format:\n\n---\nname: ${name}\ndescription: one sentence\n---\n\n# ${name}\n\n## When to use\n- 3 bullet triggers\n\n## Instructions\n- 5-7 numbered steps\n\n## Examples\n\`\`\`\n2 short input/output examples\n\`\`\`\n\nReturn ONLY the SKILL.md content, no preamble.\n\nSkill name: ${name}\nPurpose: ${purpose}`,
      effort: 'high'
    })
    setSkill(r.reply)
  }

  return (
    <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <KitNav mark="L4" brand="L402 Skills" links={[{ href: '#tool', label: 'Create' }]} />

      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>Build agent skills in minutes.</h1>
        <p>Name it. Describe what it does. Get a ready-to-install SKILL.md — the same format your agents already read.</p>
      </section>

      <section style={{ padding: '0 20px 32px' }} id="tool">
        <div className="kit-wrap-narrow">
          <KitCard title="New skill">
            <div className="kit-stack">
              <KitInput label="Skill name (kebab-case)">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="git-commit" style={{ fontFamily: 'var(--mono)' }} />
              </KitInput>
              <KitInput label="What does it do?">
                <textarea value={purpose} onChange={e => setPurpose(e.target.value)} rows={2} style={{ width: '100%', minHeight: 60, padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--sans)', fontSize: 14, background: 'var(--bg-card)', color: 'var(--ink)', resize: 'vertical' }} />
              </KitInput>
              <KitButton onClick={gen} loading={loading} disabled={!name || !purpose}>Generate SKILL.md</KitButton>
            </div>
          </KitCard>
          {skill && (
            <KitCard title="SKILL.md" style={{ marginTop: 16 }}>
              <pre style={{ margin: 0, padding: 14, background: 'var(--navy-0)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--mono)', fontSize: 12, color: '#E2E8F0', overflowX: 'auto', whiteSpace: 'pre-wrap', maxHeight: 480, overflowY: 'auto' }}>{skill}</pre>
              <div style={{ marginTop: 12 }}><KitBadge status="live">ready to install</KitBadge></div>
            </KitCard>
          )}
        </div>
      </section>

      <KitFooter product="L402 Skills" />
    </div>
  )
}
