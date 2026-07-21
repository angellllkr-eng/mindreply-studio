import type { Metadata } from "next";
import "./command.css";

export const metadata: Metadata = {
  title: "Command Center",
  robots: { index: false, follow: false, nocache: true, noarchive: true },
};

export default function CommandLayout({ children }: { children: React.ReactNode }) {
  return children;
}
