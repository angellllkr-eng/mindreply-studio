export default function CommandPage() {
  const cards = [
    ["Model Status", "Provider keys checked by env names only. No secrets shown."],
    ["Brand Registry", "AUREL, A11-K, MindReply, Brushworks, UNAPOLAGETIC."],
    ["Workflow Status", "Workflow automation mapped without exposing webhook URLs."],
    ["Action Queue", "Protect /command, connect providers, verify routes, wire workflows."],
    ["Cost & Limits Guard", "Stops repeated deploys, model loops, paid app surprises, and ad spend."],
    ["Audit Log", "Important actions should log safe summaries."],
    ["Rollback Plan", "Every risky action needs an undo path."],
    ["Live Proof", "Placeholder — backend not configured. No fake live data."],
    ["UNAPOLAGETIC", "Fashion/accessories first. Cosmetics blocked until compliance approval."],
  ];

  return (
    <main className="min-h-screen bg-[#05070b] text-white">
      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-[#5ee1ff]">Private owner system</p>
          <h1 className="mt-3 text-4xl font-semibold">Ask AUREL</h1>
          <p className="mt-2 text-white/60">Powered by A11-K. Decisions, workflows, models, sites, actions, proof, rollback.</p>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <select className="rounded-2xl border border-white/10 bg-black/50 p-3">
              <option>Auto</option><option>Claude</option><option>Grok</option><option>Gemini</option><option>OpenAI</option><option>Fallback Safe Mode</option>
            </select>
            <select className="rounded-2xl border border-white/10 bg-black/50 p-3">
              <option>Chief Orchestrator</option><option>Shipping Engineer</option><option>Brand Architect</option><option>Workflow Operator</option><option>Commerce Operator</option>
            </select>
            <select className="rounded-2xl border border-white/10 bg-black/50 p-3">
              <option>Whole Estate</option><option>AUREL</option><option>A11-K</option><option>MindReply</option><option>Brushworks</option><option>UNAPOLAGETIC</option>
            </select>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="min-h-[360px] rounded-3xl border border-white/10 bg-black/30 p-4">
              <p className="text-sm text-white/70">
                Command UI active. AI chat is ready, but provider wiring must be verified before showing live responses.
              </p>
              <p className="mt-3 text-sm text-[#e4c06f]">
                If no provider key is connected: “AI chat is ready, but no provider key is connected yet.”
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <input className="flex-1 rounded-2xl border border-white/10 bg-black/50 px-4 py-3" placeholder="Ask AUREL what to ship, fix, or block..." />
              <button className="rounded-2xl bg-[#e4c06f] px-5 py-3 font-semibold text-black">Send</button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-xl font-semibold">Context Panel</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/65">
              <li>• Current blockers: provider keys, protection, workflow wiring.</li>
              <li>• Next: protect /command, connect model keys, verify live route.</li>
              <li>• Do not fake live automation.</li>
              <li>• Rollback path required before risky production changes.</li>
            </ul>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map(([title, body]) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.025] p-5">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-white/65">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
