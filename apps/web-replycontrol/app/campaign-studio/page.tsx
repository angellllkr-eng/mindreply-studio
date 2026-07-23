'use client';

import { useState } from 'react';
import Link from 'next/link';

const EXAMPLES = [
  'LinkedIn + email for B2B SaaS targeting CMOs',
  'Product launch kit for a fintech app',
  'Retainer upsell campaign for an existing client',
];

export default function CampaignStudio() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setResult('');
    setCopied(false);

    try {
      const res = await fetch('/api/campaign-studio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim(), brand: 'replycontrol' }),
      });

      const data = await res.json().catch(() => ({}));
      const text =
        typeof data.content === 'string' && data.content.trim()
          ? data.content
          : typeof data.error === 'string'
            ? data.error
            : 'No response — tap Generate again.';
      setResult(text);
    } catch {
      setResult(
        'Network blip (common on mobile data). Check signal and tap Generate again. Pages still work offline for browsing.'
      );
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // iOS / insecure context — select-friendly fallback message
      setCopied(false);
      alert('Long-press the text to copy on this phone.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-safe">
      <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <Link href="/" className="font-semibold gradient-text text-sm sm:text-base shrink-0">
            ← Home
          </Link>
          <span className="text-xs sm:text-sm text-zinc-500 truncate">Campaign Studio</span>
          <Link
            href="/team-cockpit"
            className="text-xs sm:text-sm text-violet-400 shrink-0"
          >
            Cockpit
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Campaign Studio
          </h1>
          <p className="text-base sm:text-xl text-zinc-400">
            Brief once. Get a client-ready plan. Works on phone.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setPrompt(ex)}
              className="text-left text-xs sm:text-sm px-3 py-2 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 active:bg-zinc-800"
            >
              {ex}
            </button>
          ))}
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the campaign…"
          rows={6}
          className="w-full min-h-[140px] bg-zinc-900 border border-zinc-700 focus:border-violet-500 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-base resize-y outline-none transition placeholder:text-zinc-600"
        />

        <button
          type="button"
          onClick={generate}
          disabled={loading || !prompt.trim()}
          className="mt-4 w-full py-4 sm:py-5 text-lg sm:text-xl font-semibold bg-violet-600 active:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-2xl sm:rounded-3xl transition touch-manipulation"
        >
          {loading ? 'Working… (up to ~30s)' : 'Generate Campaign'}
        </button>

        {loading && (
          <p className="mt-3 text-center text-sm text-zinc-500">
            Keep this tab open. Mobile data can be slow.
          </p>
        )}

        {result && (
          <div className="mt-8 bg-zinc-900 border border-zinc-700 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-lg sm:text-2xl font-semibold">Result</h2>
              <button
                type="button"
                onClick={copyResult}
                className="text-sm px-3 py-2 rounded-xl bg-zinc-800 text-violet-300 active:bg-zinc-700 touch-manipulation"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="text-zinc-300 whitespace-pre-wrap leading-relaxed text-sm sm:text-base break-words select-text">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
