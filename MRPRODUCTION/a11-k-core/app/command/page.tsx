async function getTrends() {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "";
    const res = await fetch(`${base}/api/command/trends`, { cache: "no-store" });
    if (!res.ok) throw new Error("trend_fetch_failed");
    return res.json();
  } catch {
    return {
      ok: false,
      items: [
        {
          source: "AUREL",
          title: "Trend Intel waiting for backend",
          signal: "Placeholder � backend not configured.",
          suggestedAction: "Open /api/command/trends after deploy and verify response.",
        },
      ],
    };
  }
}

export default async function CommandPage() {
  const trends = await getTrends();
  const items = Array.isArray(trends.items) ? trends.items.slice(0, 12) : [];

  return (
    <main className="min-h-screen bg-[#05070b] text-white">
      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-[#5ee1ff]">Private command layer</p>
          <h1 className="mt-3 text-4xl font-semibold">Ask A11-K</h1>
          <p className="mt-2 text-white/60">
            The private command layer for decisions, workflows, and protected execution.
          </p>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_460px]">
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-xl font-semibold">Command Queue</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {[
                "Protect /command",
                "Connect model providers",
                "Wire workflows without exposing webhook secrets",
                "Renew Brushworks",
                "Prepare UNAPOLAGETIC fashion-first",
                "Keep cosmetics blocked until compliance approval",
                "Use Trend Intel to create action items",
                "Stop repeated deploys if limits appear",
              ].map((x) => (
                <div key={x} className="rounded-2xl border border-white/10 bg-black/25 p-3 text-sm text-white/70">
                  {x}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-[#5ee1ff]/20 bg-gradient-to-br from-[#071923] via-white/[0.045] to-black/30 p-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#5ee1ff]">HN + ecosystem radar</p>
            <h2 className="mt-1 text-xl font-semibold">Trend Intel</h2>
            <p className="mt-1 text-sm text-white/50">
              Pulls HN, GitHub, and npm signals into AUREL actions.
            </p>

            <div className="mt-4 space-y-3">
              {items.map((item: any, i: number) => (
                <article key={`${item.source}-${item.title}-${i}`} className="rounded-2xl border border-white/10 bg-black/25 p-3">
                  <div className="flex justify-between gap-3">
                    <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white/55">
                      {item.source}
                    </span>
                    <span className="text-[11px] text-white/35">
                      score {item.score || "n/a"} � comments {item.comments || "n/a"}
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-white/90">
                    {item.url ? <a href={item.url} className="hover:text-[#5ee1ff]">{item.title}</a> : item.title}
                  </h3>
                  <p className="mt-2 text-xs text-white/55">{item.signal}</p>
                  <p className="mt-2 text-xs text-[#e4c06f]">Action: {item.suggestedAction}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
