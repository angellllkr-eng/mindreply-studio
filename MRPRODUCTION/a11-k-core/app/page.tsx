import Link from "next/link";
import { A11KStamp } from "@/components/A11KStamp";
import { BentoCard, HumanNote, SectionIntro, StatusPill } from "@/components/Brushworks";
import { PublicNav } from "@/components/PublicNav";
import { BRAND_REGISTRY } from "@/lib/brand-registry";

const CORE_LAYERS = [
  ["01", "Ask A11-K", "A calm place to ask what matters, what is blocked, and what should happen next.", "violet", "/command/chat"],
  ["02", "AI model status", "See which intelligence routes are connected, with no invented answers or hidden claims.", "mint", "/models"],
  ["03", "Workflow status", "Understand what automation can do, what is waiting, and what still needs credentials.", "amber", "/workflows"],
  ["04", "Decision preview", "Look at the upside, risk, approval, and undo path before anything consequential moves.", "coral", "/command/simulation"],
  ["05", "Live proof layer", "Watch the system honestly: verified facts, clear placeholders, and no theatre.", "violet", "/status"],
  ["06", "Human escalation", "Angel only gets the issues that truly need a human decision.", "mint", "/command/logs"],
] as const;

export default function HomePage() {
  const publicBrands = BRAND_REGISTRY.filter((brand) => brand.visibility === "public").slice(0, 8);
  return (
    <>
      <PublicNav />
      <main className="bw-page">
        <section className="ak-hero">
          <div className="ak-hero-copy">
            <div className="ak-kicker"><span className="ak-signal" /> A11-K / ENGINE CORE</div>
            <h1>The engine behind everything you are building.</h1>
            <p>The private command layer that helps manage AI models, workflows, brands, sites, and decisions — with a human in control.</p>
            <div className="bw-hero-actions">
              <Link href="/command" className="bw-button bw-button-primary">Open Command Center <span>↗</span></Link>
              <a href="#system-map" className="bw-button bw-button-subtle">View System Map <span>↓</span></a>
            </div>
            <div className="ak-hero-trust"><StatusPill status="private">Private by design</StatusPill><span>Protected cockpit · honest status · owner approval</span></div>
          </div>
          <div className="ak-engine-visual" aria-label="A11-K engine core preview">
            <div className="ak-orbit ak-orbit-one" /><div className="ak-orbit ak-orbit-two" /><div className="ak-orbit ak-orbit-three" />
            <div className="ak-core-mark"><span>A11</span><small>K</small></div>
            <div className="ak-signal-card ak-signal-card-one"><span className="ak-signal-icon">⌘</span><div><strong>Command layer</strong><small>private cockpit ready</small></div><StatusPill status="private" /></div>
            <div className="ak-signal-card ak-signal-card-two"><span className="ak-signal-icon">◌</span><div><strong>Decision preview</strong><small>approval stays human</small></div><StatusPill status="safe" /></div>
            <div className="ak-signal-card ak-signal-card-three"><span className="ak-signal-icon">✦</span><div><strong>Connected fleet</strong><small>different brands, one core</small></div><StatusPill status="ready" /></div>
          </div>
        </section>

        <section className="ak-proof-strip"><div><span className="ak-strip-number">01</span><strong>See the whole system</strong><small>one calm view instead of scattered tools</small></div><div><span className="ak-strip-number">02</span><strong>Prepare the right move</strong><small>plans, previews, and safe fallbacks</small></div><div><span className="ak-strip-number">03</span><strong>Keep control</strong><small>nothing risky ships without approval</small></div></section>

        <section className="bw-section" id="system-map">
          <SectionIntro eyebrow="THE A11-K OPERATING SYSTEM" title="Simple on the surface. Powerful underneath." body="A11-K watches the connected ecosystem, translates technical reality into human language, and helps move the next useful thing forward." action={<A11KStamp label="A11-K Engine Core" href="/" />} />
          <div className="bw-bento-grid">
            {CORE_LAYERS.map(([number, title, body, tone, href], index) => <BentoCard key={title} tone={tone} className={index === 0 || index === 3 ? "ak-layer-wide" : "ak-layer-card"}><div className="ak-layer-number">{number}</div><h3>{title}</h3><p>{body}</p><Link href={href} className="bw-feature-link">Open layer ↗</Link></BentoCard>)}
          </div>
        </section>

        <section className="bw-section ak-fleet-section">
          <SectionIntro eyebrow="THE CONNECTED FLEET" title="One core. Many distinct products." body="MindReply is the commercial brand. Tools keep their own personality. A11-K is the quiet, recognisable engine stamp that connects and governs them." />
          <div className="ak-fleet-grid">{publicBrands.map((brand) => <div className="ak-fleet-card" key={brand.slug}><div className="ak-fleet-card-top"><span className="ak-fleet-symbol">{brand.name.slice(0, 1)}</span><StatusPill status={brand.status === "active" ? "ready" : "waiting"}>{brand.status === "active" ? "Connected" : "In progress"}</StatusPill></div><strong>{brand.name}</strong><small>{brand.domain}</small><A11KStamp label="Engine layer" compact href="/" /></div>)}</div>
          <HumanNote><strong>The stamp is deliberately quiet.</strong> Each product stays itself. A11-K simply signals that the surface is connected to a safer operating core.</HumanNote>
        </section>

        <section className="bw-section ak-final-cta"><div className="ak-final-panel"><div><div className="bw-eyebrow">THE NEXT MOVE</div><h2>Start with one clear question.</h2><p>Ask what is live, what is blocked, or what should happen next. A11-K turns the system into a conversation you can actually use.</p></div><Link href="/command" className="bw-button bw-button-primary">Open Ask A11-K <span>↗</span></Link></div></section>
      </main>
      <footer className="bw-footer"><div className="bw-page bw-footer-inner"><span>A11-K Engine Core · the operating system behind the ecosystem.</span><A11KStamp label="A11-K certified engine layer" href="/" /></div></footer>
    </>
  );
}
