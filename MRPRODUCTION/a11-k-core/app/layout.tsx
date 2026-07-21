import type { Metadata } from "next";
import "./globals.css";
import "./brushworks.css";

export const metadata: Metadata = {
  title: {
    default: "A11-K Engine Core",
    template: "%s Â· A11-K",
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
      <body className="app-shell">{children}</body>
    </html>
  );
}


