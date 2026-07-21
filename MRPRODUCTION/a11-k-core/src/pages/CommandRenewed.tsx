import React from "react";
import TrendIntelCard from "../components/TrendIntelCard";

export default function CommandRenewed() {
  return (
    <main className="min-h-screen bg-[#05070b] p-5 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-[#5ee1ff]">Private owner system</p>
          <h1 className="mt-3 text-4xl font-semibold">Ask AUREL</h1>
          <p className="mt-2 text-white/60">Powered by A11-K. Command, trends, workflows, action queue, rollback.</p>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_420px]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-xl font-semibold">Command Queue</h2>
            <div className="mt-4 space-y-2 text-sm text-white/65">
              <p>• Protect /command</p>
              <p>• Connect model providers</p>
              <p>• Wire workflows without exposing webhook secrets</p>
              <p>• Use Trend Intel to create real next actions</p>
            </div>
          </div>

          <TrendIntelCard />
        </div>
      </section>
    </main>
  );
}
