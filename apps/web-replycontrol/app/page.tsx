'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ReplyControlHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="text-lg sm:text-xl font-bold tracking-tight">
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
              Open Studio
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-zinc-300 active:bg-zinc-800 touch-manipulation"
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-3 flex flex-col gap-1">
            <Link
              href="/campaign-studio"
              className="py-3 px-3 rounded-xl active:bg-zinc-900"
              onClick={() => setMenuOpen(false)}
            >
              Campaign Studio
            </Link>
            <Link
              href="/team-cockpit"
              className="py-3 px-3 rounded-xl active:bg-zinc-900"
              onClick={() => setMenuOpen(false)}
            >
              Team Cockpit
            </Link>
            <Link
              href="#features"
              className="py-3 px-3 rounded-xl active:bg-zinc-900"
              onClick={() => setMenuOpen(false)}
            >
              Features
            </Link>
          </div>
        )}
      </nav>

      <section className="pt-28 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs sm:text-sm mb-6 sm:mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
            </span>
            AGENCY OS v1.0
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-5 sm:mb-6">
            Command Your Agency.
            <br />
            <span className="gradient-text">AI Does the Rest.</span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-1">
            Intelligent agents orchestrate campaigns, coordinate teams, and deliver
            client-ready results at scale.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/campaign-studio"
              className="px-6 sm:px-8 py-4 rounded-2xl bg-violet-600 active:bg-violet-500 text-base sm:text-lg font-semibold transition shadow-lg shadow-violet-600/25 text-center touch-manipulation"
            >
              Enter Command Center
            </Link>
            <Link
              href="/team-cockpit"
              className="px-6 sm:px-8 py-4 rounded-2xl border border-zinc-700 active:border-zinc-500 text-base sm:text-lg font-medium transition text-center touch-manipulation"
            >
              Team Cockpit
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 sm:py-24 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {[
            {
              title: 'Campaign Studio',
              desc: 'Brief once. Get multi-channel assets, copy, and strategy in minutes.',
              href: '/campaign-studio',
            },
            {
              title: 'Team Cockpit',
              desc: 'AI agents coordinate creative, media, and account workstreams.',
              href: '/team-cockpit',
            },
            {
              title: 'Client Delivery',
              desc: 'Presentation-ready decks and automated execution handoff.',
              href: '/campaign-studio',
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="p-6 sm:p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 active:border-violet-500/40 transition block touch-manipulation"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{item.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
