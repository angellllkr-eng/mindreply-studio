import Link from "next/link";

export function PublicNav() {
  return (
    <header className="bw-public-nav">
      <div className="bw-public-nav-inner">
        <Link href="/" className="bw-brand-lockup">
          <span className="bw-brand-mark">A11</span>
          <span>
            <strong>A11-K</strong>
            <small>Engine Core</small>
          </span>
        </Link>
        <nav className="bw-public-links" aria-label="Public navigation">
          <Link href="/#system-map">How it works</Link>
          <Link href="/status">System status</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/labs">Labs</Link>
        </nav>
        <Link href="/command" className="bw-nav-cta">
          Open cockpit <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
