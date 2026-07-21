import React from "react";
import { aurelSurfaces } from "../data/aurelRegistry";

export function AurelCommandCards() {
  const counts = {
    production: aurelSurfaces.filter((x) => x.operationalLevel === 4).length,
    integrated: aurelSurfaces.filter((x) => x.operationalLevel === 3).length,
    api: aurelSurfaces.filter((x) => x.operationalLevel === 2).length,
    route: aurelSurfaces.filter((x) => x.operationalLevel === 1).length,
    empty: aurelSurfaces.filter((x) => x.operationalLevel === 0).length,
    blocked: aurelSurfaces.filter((x) => x.status === "blocked" || x.status === "needs_owner" || x.status === "missing_env").length,
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        <Metric label="Production" value={counts.production} tone="gold" />
        <Metric label="Integrated" value={counts.integrated} tone="cyan" />
        <Metric label="Route + API" value={counts.api} tone="cyan" />
        <Metric label="Route only" value={counts.route} tone="muted" />
        <Metric label="Empty" value={counts.empty} tone="muted" />
        <Metric label="Blocked" value={counts.blocked} tone="warn" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel title="Model Status" badge="honest">
          <EnvList keys={[
            "AI_GATEWAY_API_KEY",
            "OPENAI_API_KEY",
            "ANTHROPIC_API_KEY",
            "XAI_API_KEY",
            "GOOGLE_GENERATIVE_AI_API_KEY",
            "OPENWEBUI_BASE_URL",
            "OPENWEBUI_API_KEY"
          ]} />
        </Panel>

        <Panel title="Workflow Status" badge="n8n">
          <p className="text-sm text-white/65">
            Real workflow automation requires N8N_BASE_URL and N8N_API_KEY.
            No webhook secrets are shown.
          </p>
          <ul className="mt-3 space-y-1 text-xs text-white/50">
            <li>• Site Health Check</li>
            <li>• Deployment Verify</li>
            <li>• Owner Approval Queue</li>
            <li>• Rollback Reminder</li>
            <li>• UNAPOLAGETIC Product Review</li>
          </ul>
        </Panel>

        <Panel title="Live Proof" badge="truth">
          <p className="text-sm text-white/65">
            No fake timestamps. No fake revenue. No fake customer/order data.
            Claims stay local until HTTP checks prove production.
          </p>
        </Panel>

        <Panel title="GitHub Security" badge="security">
          <p className="text-sm text-white/65">
            Checks are blocked unless gh auth or GITHUB_TOKEN is available.
            Secret alerts must be rotated manually before closing.
          </p>
        </Panel>

        <Panel title="Cost Guard" badge="limits">
          <p className="text-sm text-white/65">
            Stops deploy spam, model loops, workflow spam, paid app connections, Shopify publishing, and ads without approval.
          </p>
        </Panel>

        <Panel title="UNAPOLAGETIC Ops" badge="commerce">
          <p className="text-sm text-white/75">
            Unapologetic style systems for people who move without asking permission.
          </p>
          <p className="mt-3 text-xs text-[#e4c06f]">
            Fashion/accessories first. Cosmetics blocked until compliance approval.
          </p>
        </Panel>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#5ee1ff]">30-surface registry</p>
            <h2 className="text-xl font-semibold">Operational truth, not fake done</h2>
          </div>
          <span className="rounded-full border border-[#e4c06f]/30 bg-[#e4c06f]/10 px-3 py-1 text-xs text-[#e4c06f]">
            {aurelSurfaces.length} surfaces
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {aurelSurfaces.map((s) => (
            <div key={s.id} className="rounded-2xl border border-white/10 bg-black/25 p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-medium">{s.title}</h3>
                  <p className="text-xs text-white/40">{s.route} · {s.domain}</p>
                </div>
                <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-white/55">
                  L{s.operationalLevel}
                </span>
              </div>
              <p className="mt-2 text-xs text-white/58">{s.purpose}</p>
              <p className="mt-2 text-xs text-[#e4c06f]">Next: {s.nextAction}</p>
              {s.blocked !== "None" && (
                <p className="mt-1 text-xs text-yellow-200/70">Blocked: {s.blocked}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: number; tone: "gold" | "cyan" | "muted" | "warn" }) {
  const color = tone === "gold" ? "#e4c06f" : tone === "cyan" ? "#5ee1ff" : tone === "warn" ? "#facc15" : "rgba(255,255,255,.45)";
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-white/40">{label}</p>
      <p className="mt-2 text-3xl font-semibold" style={{ color }}>{value}</p>
    </div>
  );
}

function Panel({ title, badge, children }: { title: string; badge: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.025] p-4 shadow-2xl shadow-black/30">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="font-semibold">{title}</h3>
        <span className="rounded-full border border-[#e4c06f]/25 bg-[#e4c06f]/10 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-[#e4c06f]">
          {badge}
        </span>
      </div>
      {children}
    </section>
  );
}

function EnvList({ keys }: { keys: string[] }) {
  return (
    <div className="space-y-1">
      {keys.map((k) => (
        <div key={k} className="flex items-center justify-between border-b border-white/5 py-1 text-xs">
          <span className="text-white/65">{k}</span>
          <span className="text-white/35">name only</span>
        </div>
      ))}
    </div>
  );
}
