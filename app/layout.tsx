import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clawd Up — AI Business Ops for Indie Hackers",
  description: "Three AI agents that find, evaluate, and prioritize startup opportunities while you build. One-time purchase. Runs on OpenClaw.",
  openGraph: {
    title: "Clawd Up — AI Business Ops for Indie Hackers",
    description: "Scout. Researcher. Operator. Your AI ops team for $15.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
