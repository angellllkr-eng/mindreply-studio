import React from "react";
import { aurelSurfaces, commandSummary } from "../data/aurelRegistry";

type PanelProps = {
  title: string;
  badge: string;
  children: React.ReactNode;
};

export function AurelCommandFrame() {
  const selected = aurelSurfaces.slice(0, 14);

  return (
    <div className="space-y-4">
      <section className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        <Metric label="Production" value={commandSummary.level4} tone="gold" />
        <Metric label="Integrated" value={commandSummary.level3} tone="cyan" />
        <Metric label="Route + API" value={commandSummary.level2} tone="cyan" />
        <Metric label="Route Only" value={commandSummary.level1} tone="muted" />
        <Metric label="Empty" value={commandSummary.level0} tone="muted" />
        <Metric label="Blocked" value={commandSummary.blocked} tone="warn" />
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Panel title="Model Status" badge="env only">
          <Env keys={[
            "AI_GATEWAY_API_KEY",
            "OPENAI_API_KEY",
            "ANTHROPIC_API_KEY",
            "XAI_API_KEY",
            "GOOGLE_GENERATIVE_AI_API_KEY",
            "OPENWEBUI_BASE_URL",
            "OPENWEBUI_API_KEY"
          ]} />
        </Panel>

        <Panel title="Workflow Status" badge="no fake n8n">
          <p className="text-sm text-white/65">
            Workflow automation is blocked until N8N_BASE_URL and N8N_API_KEY exist.
            Webhook URLs and secrets must never be displayed.
          </p>
        </Panel>

        <Panel title="Live Proof" badge="truth">
          <p className="text-sm text-white/65">
            No fake timestamps, revenue, customers, orders, providers, workflows or live URLs.
            A surface is production only after HTTP verification.
          </p>
        </Panel>

        <Panel title="GitHub Security" badge="owner gate">
          <p className="text-sm text-white/65">
            Security checks report status only. Secret alerts require owner rotation and verification.
            Alerts must not be auto-dismissed.
          </p>
        </Panel>

        <Panel title="Cost Guard" badge="limits">
          <p className="text-sm text-white/65">
            Blocks deploy spam, model loops, workflow spam, paid apps, product publishing and ads without approval.
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
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#5ee1ff]">
              operational truth
            </p>
            <h2 className="text-xl font-semibold">Surfaces that exist, surfaces that are blocked</h2>
          </div>
          <span className="rounded-full border border-[#e4c06f]/30 bg-[#e4c06f]/10 px-3 py-1 text-xs text-[#e4c06f]">
            {commandSummary.total} tracked
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {selected.map((s) => (
            <article key={s.id} className="rounded-2xl border border-white/10 bg-black/25 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium">{s.title}</h3>
                  <p className="text-xs text-white/40">{s.route} · {s.domain}</p>
                </div>
                <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-white/55">
                  L{s.level}
                </span>
              </div>
              <p className="mt-2 text-xs text-white/58">{s.purpose}</p>
              <p className="mt-2 text-xs text-[#e4c06f]">Next: {s.nextAction}</p>
              <p className="mt-1 text-xs text-yellow-200/70">Blocked: {s.blocked}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: number; tone: "gold" | "cyan" | "muted" | "warn" }) {
  const color =
    tone === "gold" ? "#e4c06f" :
    tone === "cyan" ? "#5ee1ff" :
    tone === "warn" ? "#facc15" :
    "rgba(255,255,255,.45)";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-white/40">{label}</p>
      <p className="mt-2 text-3xl font-semibold" style={{ color }}>{value}</p>
    </div>
  );
}

function Panel({ title, badge, children }: PanelProps) {
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

function Env({ keys }: { keys: string[] }) {
  return (
    <div className="space-y-1">
      {keys.map((key) => (
        <div key={key} className="flex items-center justify-between border-b border-white/5 py-1 text-xs">
          <span className="text-white/65">{key}</span>
          <span className="text-white/35">name only</span>
        </div>
      ))}
    </div>
  );
}
