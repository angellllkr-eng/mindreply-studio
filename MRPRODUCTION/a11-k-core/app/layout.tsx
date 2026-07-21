import type { Metadata } from "next";
import "./globals.css";
import "./brushworks.css";

export const metadata: Metadata = {
  title: {
    default: "A11-K Engine Core",
    template: "%s · A11-K",
  },
  description:
    "The command layer for MindReply models, workflows, brands, sites, and decisions.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "A11-K Engine Core",
    description:
      "The command layer for MindReply models, workflows, brands, sites, and decisions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A11-K Engine Core",
    description:
      "The command layer for MindReply models, workflows, brands, sites, and decisions.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="app-shell">{children}</body>
    </html>
  );
}
