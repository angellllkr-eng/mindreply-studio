'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'executing';
  currentTask: string;
  avatar: string;
}

const initialAgents: Agent[] = [
  {
    id: '1',
    name: 'Aura',
    role: 'Creative Director AI',
    status: 'executing',
    currentTask: 'Generating multi-variant ad copy for CMO outreach',
    avatar: '🎨',
  },
  {
    id: '2',
    name: 'Nexus',
    role: 'Media & Channel Strategist',
    status: 'active',
    currentTask: 'Optimizing LinkedIn budget allocation across 4 accounts',
    avatar: '📊',
  },
  {
    id: '3',
    name: 'Scribe',
    role: 'Copywriter & Content Lead',
    status: 'active',
    currentTask: 'Drafting 5-part cold email nurture sequence',
    avatar: '✍️',
  },
  {
    id: '4',
    name: 'Vanguard',
    role: 'Account & Operations Agent',
    status: 'idle',
    currentTask: 'Waiting for client approval on Campaign Studio deck',
    avatar: '🛡️',
  },
];

export default function TeamCockpit() {
  const [agents] = useState<Agent[]>(initialAgents);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg gradient-text">
            ← ReplyControl
          </Link>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Cockpit Active
            </span>
            <Link
              href="/campaign-studio"
              className="px-4 py-2 text-sm rounded-xl bg-violet-600 hover:bg-violet-500 text-white transition font-medium"
            >
              Campaign Studio
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Cockpit Surface */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Agency Team Cockpit
            </h1>
            <p className="text-zinc-400">
              Real-time orchestration of autonomous AI specialists across client accounts.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-center">
              <div className="text-2xl font-bold text-violet-400">4</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">Agents Deployed</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-center">
              <div className="text-2xl font-bold text-emerald-400">98.4%</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">SLA Accuracy</div>
            </div>
          </div>
        </div>

        {/* Agent Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 hover:border-violet-500/30 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-zinc-800 rounded-2xl">{agent.avatar}</span>
                    <div>
                      <h3 className="text-xl font-semibold">{agent.name}</h3>
                      <p className="text-sm text-zinc-400">{agent.role}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                      agent.status === 'executing'
                        ? 'bg-violet-500/10 text-violet-400 border border-violet-500/30'
                        : agent.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}
                  >
                    {agent.status}
                  </span>
                </div>

                <div className="bg-zinc-950/80 rounded-2xl p-4 border border-zinc-800/80 mb-4">
                  <div className="text-xs text-zinc-500 uppercase font-medium mb-1">Current Active Workstream</div>
                  <p className="text-sm text-zinc-300">{agent.currentTask}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/60 text-xs text-zinc-500">
                <span>Auto-sync enabled</span>
                <span className="text-violet-400 hover:underline cursor-pointer">View Logs →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Execution Banner */}
        <div className="bg-gradient-to-r from-violet-900/30 via-zinc-900 to-zinc-900 border border-violet-500/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Need a full campaign brief executed?</h3>
            <p className="text-zinc-400 text-sm max-w-xl">
              Pass client objectives into the Campaign Studio. Aura, Nexus, and Scribe will deliver multi-channel assets instantly.
            </p>
          </div>
          <Link
            href="/campaign-studio"
            className="px-6 py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition whitespace-nowrap shadow-lg shadow-violet-600/20"
          >
            Launch Campaign Brief
          </Link>
        </div>
      </div>
    </div>
  );
}
