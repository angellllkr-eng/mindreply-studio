import React from 'react'

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary"></div>
            <span className="font-display text-lg">MindReply</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm">
            <a href="/" className="hover:text-primary transition">Home</a>
            <a href="/replycontrol" className="hover:text-primary transition">ReplyControl</a>
            <a href="/pricing" className="hover:text-primary transition">Pricing</a>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/50 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-muted-foreground">
          <p>© 2026 MindReply. Private operator layer for client communication.</p>
        </div>
      </footer>
    </div>
  )
}
