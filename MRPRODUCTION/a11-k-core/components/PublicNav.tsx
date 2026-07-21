import Link from "next/link";

export function PublicNav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand-mark">
          <span>A11</span>
          A11-K Engine Core
        </Link>
        <nav className="nav-links" aria-label="Public">
          <Link href="/#system-map">System Map</Link>
          <Link href="/status">Status</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/labs">Labs</Link>
        </nav>
      </div>
    </header>
  );
}
