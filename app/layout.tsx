import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clawd Up — The Agentic OS for Solopreneurs",
  description: "Three AI agents that scout opportunities, kill bad ideas, and run your pipeline while you build. One-time purchase. Runs on OpenClaw.",
  openGraph: {
    title: "Clawd Up — The Agentic OS for Solopreneurs",
    description: "Scout. Researcher. Operator. Your AI ops team — $19 once, yours forever.",
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
