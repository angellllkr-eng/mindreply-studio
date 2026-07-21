import type { ReactNode } from "react";
import { PublicNav } from "@/components/PublicNav";
import { A11KStamp } from "@/components/A11KStamp";

export function PublicSurface({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <>
      <PublicNav />
      <main className="ak-public-page bw-page">
        <header className="ak-public-header">
          <div><div className="ak-kicker"><span className="ak-signal" /> {eyebrow}</div><h1>{title}</h1><p>{body}</p></div>
          <A11KStamp label="A11-K Engine Core" href="/" />
        </header>
        {children}
      </main>
      <footer className="bw-footer"><div className="bw-page bw-footer-inner"><span>A11-K Engine Core · public-safe system surface.</span><A11KStamp label="Powered by A11-K" href="/" /></div></footer>
    </>
  );
}
