import type { Metadata } from "next";
import Link from "next/link";
import { A11KStamp } from "@/components/A11KStamp";
import { BentoCard, EmptyState, SectionIntro, StatusPill } from "@/components/Brushworks";

export const metadata: Metadata = {
  title: "Brushworks — Visual Build Layer",
  description: "The visual build layer for fast, premium AI-native products.",
  robots: { index: false, follow: false },
};

const SYSTEMS = [
  ["✦", "Brand surfaces", "Landing pages and product stories that make the next step obvious.", "violet"],
  ["▦", "Product systems", "Bento layouts, dashboards, and flows that feel ready to ship.", "mint"],
  ["◌", "Motion and polish", "The small details that make a useful product feel memorable.", "coral"],
  ["⌘", "Engine-connected", "A visual layer that stays grounded by A11-K underneath.", "amber"],
] as const;

export default function BrushworksPage() {
  return (
    <main className="bw-page">
      <header className="bw-public-nav bw-public-nav-local">
        <div className="bw-public-nav-inner">
          <Link href="/brushworks" className="bw-brand-lockup">
            <span className="bw-brand-mark">BW</span>
            <span><strong>Brushworks</strong><small>Visual build layer</small></span>
          </Link>
          <nav className="bw-public-links" aria-label="Brushworks">
            <a href="#systems">What we build</a>
            <a href="#principles">Principles</a>
            <a href="#start">Start here</a>
          </nav>
          <A11KStamp label="Powered by A11-K" href="/" compact />
        </div>
      </header>

      <section className="bw-hero">
        <div>
          <div className="bw-eyebrow">BRUSHWORKS / VISUAL BUILD LAYER</div>
          <h1>Make the <span>next version</span> feel inevitable.</h1>
          <p className="bw-hero-copy">The visual build layer for fast, premium AI-native products — from the first landing page to the product surface people keep coming back to.</p>
          <div className="bw-hero-actions">
            <a className="bw-button bw-button-primary" href="#systems">See what we build <span>↘</span></a>
            <a className="bw-button bw-button-subtle" href="https://a11-k.space">Meet the engine <span>↗</span></a>
          </div>
          <div className="bw-hero-note"><span className="bw-live-dot" style={{ color: "var(--bw-mint)" }} /> Creative execution with a safe operating layer underneath.</div>
        </div>
        <div className="bw-hero-visual" aria-label="Brushworks product preview">
          <div className="bw-hero-orbit" />
          <div className="bw-hero-panel">
            <div className="bw-hero-panel-head"><div><strong>Build board</strong><small>one clear surface at a time</small></div><StatusPill status="ready">Ready to shape</StatusPill></div>
            <div className="bw-hero-signal"><span className="bw-signal-icon">✦</span><span><strong>Core message</strong><small>Make the value obvious in five seconds</small></span><span>01</span></div>
            <div className="bw-hero-signal"><span className="bw-signal-icon">◌</span><span><strong>Product feeling</strong><small>Calm, premium, useful, human</small></span><span>02</span></div>
            <div className="bw-hero-signal"><span className="bw-signal-icon">⌁</span><span><strong>Ship signal</strong><small>Clear next action, honest state</small></span><span>03</span></div>
          </div>
        </div>
      </section>

      <section className="bw-section" id="systems">
        <SectionIntro eyebrow="THE LAYER PEOPLE SEE" title="Beautiful is useful when it helps someone move." body="Brushworks turns complex products into clear, confident surfaces. No filler dashboards. No decorative noise. Just a stronger path from first impression to useful action." />
        <div className="bw-bento-grid">
          {SYSTEMS.map(([icon, title, body, tone], index) => <BentoCard key={title} tone={tone} className={index === 0 ? "bw-feature-card-wide" : "bw-feature-card"}><div className="bw-feature-icon">{icon}</div><h3>{title}</h3><p>{body}</p><span className="bw-feature-link">Explore layer ↗</span></BentoCard>)}
          <BentoCard tone="violet" className="bw-feature-card-tall"><div className="bw-eyebrow">THE DIFFERENCE</div><h3>Not a template. A point of view.</h3><p>Every surface gets its own personality. Brushworks can be warm and expressive; A11-K stays sharp, trusted, and in control.</p><div className="bw-human-note" style={{ marginTop: "1.3rem" }}><strong>Built with Brushworks.</strong><br />Powered by A11-K.</div></BentoCard>
          <BentoCard className="bw-feature-card-wide" id="principles"><div className="bw-eyebrow">OUR PRINCIPLES</div><h3>Clarity over cleverness.</h3><p>Short copy. Strong hierarchy. Friendly empty states. Real status only. A product should tell someone what it is, why it matters, and what to do next without a tour.</p></BentoCard>
          <BentoCard tone="mint" className="bw-feature-card"><div className="bw-eyebrow">CONNECTED, NOT CLONED</div><h3>One ecosystem. Different voices.</h3><p>Each tool keeps its own character. The quiet A11-K mark is the shared signal that the system is connected.</p></BentoCard>
        </div>
      </section>

      <section className="bw-section" id="start">
        <SectionIntro eyebrow="START HERE" title="A better surface is a better first move." body="Use Brushworks when the product is real but the experience still feels like a workbench. We turn the workbench into a place people want to use." />
        <div className="bw-bento-grid">
          <Link href="/" className="bw-next-action" style={{ gridColumn: "span 4" }}><div className="bw-action-top"><StatusPill status="ready">Engine core</StatusPill><span className="bw-arrow">↗</span></div><strong>See A11-K</strong><p>The authoritative engine behind the connected ecosystem.</p></Link>
          <div className="bw-next-action" style={{ gridColumn: "span 4" }}><div className="bw-action-top"><StatusPill status="waiting">In progress</StatusPill><span className="bw-arrow">→</span></div><strong>Shape a product surface</strong><p>Start with the message, the feeling, and the one action that matters.</p></div>
          <div className="bw-next-action" style={{ gridColumn: "span 4" }}><div className="bw-action-top"><StatusPill status="safe">Honest by design</StatusPill><span className="bw-arrow">✦</span></div><strong>Keep the signal clean</strong><p>Nothing is called live until it has proof behind it.</p></div>
        </div>
        <div style={{ marginTop: "1.25rem" }}><EmptyState eyebrow="The Brushworks bench is opening" title="The next surface starts here." body="The host is prepared inside the canonical A11-K project. Domain attachment remains a Vercel/account operation; the experience itself is ready to keep building." action={<A11KStamp label="A11-K engine stamp" href="/" />} /></div>
      </section>

      <footer className="bw-footer"><div className="bw-footer-inner"><span>Brushworks — visual build layer for AI-native products.</span><A11KStamp label="Powered by A11-K" href="/" /></div></footer>
    </main>
  );
}
