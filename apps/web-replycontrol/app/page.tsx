'use client';

import Link from 'next/link';

export default function ReplyControlHome() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="gradient-text">ReplyControl</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <Link href="#features" className="hover:text-white transition">
              Features
            </Link>
            <Link href="/campaign-studio" className="hover:text-white transition">
              Studio
            </Link>
            <Link href="/team-cockpit" className="hover:text-white transition">
              Team Cockpit
            </Link>
            <Link
              href="/campaign-studio"
              className="px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-medium transition"
            >
              Open Cockpit
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-40 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
            </span>
            AGENCY OS v1.0
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Command Your Agency.
            <br />
            <span className="gradient-text">AI Does the Rest.</span>
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Intelligent agents orchestrate campaigns, coordinate teams, and deliver
            client-ready results at scale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/campaign-studio"
              className="px-8 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 text-lg font-semibold transition shadow-lg shadow-violet-600/25"
            >
              Enter Command Center
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 rounded-2xl border border-zinc-700 hover:border-zinc-500 text-lg font-medium transition"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Campaign Studio',
              desc: 'Brief once. Get multi-channel assets, copy, and strategy in minutes.',
            },
            {
              title: 'Team Cockpit',
              desc: 'AI agents coordinate creative, media, and account workstreams.',
            },
            {
              title: 'Client Delivery',
              desc: 'Presentation-ready decks and automated execution handoff.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/30 transition"
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="team" className="py-24 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Team Cockpit</h2>
          <p className="text-zinc-400 text-lg mb-8">
            Orchestrate specialists and agents from one unified command surface.
          </p>
          <Link
            href="/team-cockpit"
            className="inline-flex px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition"
          >
            Launch Team Cockpit →
          </Link>
        </div>
      </section>
    </div>
  );
}
