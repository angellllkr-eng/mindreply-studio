import React from "react";

export default function Command() {
  return (
    <main className="min-h-screen bg-[#05070b] text-white p-6">
      <section className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-[#5ee1ff]">AUREL / A11-K</p>
        <h1 className="mt-3 text-4xl font-semibold">Command</h1>
        <p className="mt-2 text-white/60">
          Command fallback is active. Existing Shell was not found. Backend/model wiring must be restored.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <h2 className="font-semibold text-[#e4c06f]">Model Status</h2>
            <p className="mt-2 text-sm text-white/60">Check AI_GATEWAY_API_KEY, XAI_API_KEY, ANTHROPIC_API_KEY.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <h2 className="font-semibold text-[#e4c06f]">Workflow Status</h2>
            <p className="mt-2 text-sm text-white/60">Check N8N_BASE_URL and N8N_API_KEY.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <h2 className="font-semibold text-[#e4c06f]">Deploy Status</h2>
            <p className="mt-2 text-sm text-white/60">Build locally, then deploy once.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
