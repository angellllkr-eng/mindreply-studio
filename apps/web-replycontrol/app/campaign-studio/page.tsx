'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CampaignStudio() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/campaign-studio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, brand: 'replycontrol' }),
      });

      if (!res.ok) throw new Error('Generation failed');

      const data = await res.json();
      setResult(data.content ?? 'No content returned.');
    } catch (err) {
      setResult('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold gradient-text">
            ← ReplyControl
          </Link>
          <span className="text-sm text-zinc-500">Campaign Studio</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Agency Campaign Studio
          </h1>
          <p className="text-xl text-zinc-400">
            Brief your campaign. Our AI team delivers client-ready assets.
          </p>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Create a full LinkedIn + Email campaign for a SaaS client targeting CMOs..."
          className="w-full h-56 bg-zinc-900 border border-zinc-700 focus:border-violet-500 rounded-3xl p-6 md:p-8 text-lg resize-none outline-none transition placeholder:text-zinc-600"
        />

        <button
          onClick={generate}
          disabled={loading || !prompt.trim()}
          className="mt-6 w-full py-5 text-xl font-semibold bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-3xl transition shadow-lg shadow-violet-600/20"
        >
          {loading ? 'AI Team Executing...' : 'Generate Agency-Ready Campaign'}
        </button>

        {result && (
          <div className="mt-12 bg-zinc-900 border border-zinc-700 rounded-3xl p-8 md:p-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Campaign Delivered</h2>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(result)}
                className="text-sm text-violet-400 hover:text-violet-300 transition"
              >
                Copy
              </button>
            </div>
            <div className="prose prose-invert max-w-none text-zinc-300 whitespace-pre-wrap leading-relaxed">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
