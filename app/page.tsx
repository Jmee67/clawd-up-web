"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ChatWidget from "./components/ChatWidget";

// ── Types ──────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  timezone: string;
  businessType: string;
  xHandle: string;
  redditUsername: string;
  telegramToken: string;
  discordWebhook: string;
  notifyChannel: "telegram" | "discord";
  provider: "anthropic" | "openai" | "google";
  apiKey: string;
  vpsHost: string;
  vpsUser: string;
}

const DEFAULT: FormData = {
  name: "",
  email: "",
  timezone: "Europe/London",
  businessType: "saas",
  xHandle: "",
  redditUsername: "",
  telegramToken: "",
  discordWebhook: "",
  notifyChannel: "telegram",
  provider: "anthropic",
  apiKey: "",
  vpsHost: "",
  vpsUser: "root",
};

// ── Constants ──────────────────────────────────────────
const CHECKOUT_STARTER = "https://microbuilderco.lemonsqueezy.com/checkout/buy/b7d387a5-38ab-45df-9c0a-e7bba9aace9c?locale=en&currency=USD";

// ── Buy Button ─────────────────────────────────────────
function BuyButton({ className = "", label = "Get Started", href = CHECKOUT_STARTER }: { className?: string; label?: string; href?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block px-8 py-3 text-sm font-semibold rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors text-center ${className}`}
    >
      {label}
    </a>
  );
}

// ── FAQ Item ───────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--border)] py-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center justify-between gap-4"
      >
        <span className="text-sm font-semibold text-[var(--text)]">{q}</span>
        <span className="text-[var(--text-muted)] shrink-0 text-lg leading-none">{open ? "\u2212" : "+"}</span>
      </button>
      {open && (
        <p className="text-sm text-[var(--text-muted)] mt-2 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

// ── Product Demo Tabs ──────────────────────────────────
function ProductDemo() {
  const [tab, setTab] = useState<"brief" | "pipeline" | "buildlog">("brief");

  const tabs = [
    { id: "brief" as const, label: "Morning Brief" },
    { id: "pipeline" as const, label: "Pipeline" },
    { id: "buildlog" as const, label: "Build Log" },
  ];

  return (
    <section className="max-w-3xl mx-auto px-6 pb-24">
      <h2 className="text-2xl font-bold mb-2 text-center">Your pipeline. Morning to midnight.</h2>
      <p className="text-sm text-[var(--text-muted)] text-center mb-8">Watch an opportunity move from raw signal to shipped product.</p>

      {/* Tab bar */}
      <div className="flex gap-1 mb-6 justify-center">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              tab === t.id
                ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="min-h-[320px]">
        {tab === "brief" && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
              <span className="text-xs text-[var(--text-muted)] ml-2">Morning Brief &mdash; Mar 6, 2026</span>
            </div>
            <div className="space-y-3 text-sm font-mono leading-relaxed">
              <p className="text-[var(--text)] font-semibold font-sans">3 new signals overnight. 1 promoted to pipeline.</p>
              <div className="space-y-1">
                <p className="text-[var(--green)]">PROMOTED: MCP Config Validator</p>
                <p className="text-[var(--text-muted)] pl-4">Score: 19/25 (Signal 4, Size 4, Shape 4, Speed 4, Stress 3)</p>
                <p className="text-[var(--text-muted)] pl-4">Source: r/LocalLLaMA &mdash; 847 upvotes</p>
                <p className="text-[var(--text-muted)] pl-4">Pain: &ldquo;Spent 3 hours debugging MCP server config&rdquo;</p>
                <p className="text-[var(--text-muted)] pl-4">Next: Researcher assigned for deep dive</p>
              </div>
              <div className="space-y-1">
                <p className="text-red-400/70">KILLED: 2 signals</p>
                <p className="text-[var(--text-muted)] pl-4">Generic AI wrapper (kill pattern: no wedge)</p>
                <p className="text-[var(--text-muted)] pl-4">Social app for dog owners (kill pattern: social/network effect)</p>
              </div>
              <p className="pt-2 border-t border-[var(--border)] text-xs text-[var(--text-muted)]">Pipeline: 4 active | 2 in review | 1 building</p>
            </div>
          </div>
        )}

        {tab === "pipeline" && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
            <div className="flex gap-4 min-w-[700px]">
              {[
                { stage: "QUALIFIED", count: 1, cards: [{ name: "Invoice Tracker", score: "--" }] },
                { stage: "RESEARCHING", count: 1, cards: [{ name: "MCP Config Validator", score: "--" }] },
                { stage: "SCORING", count: 1, cards: [{ name: "Agent Cost Ctrl", score: "19/25" }] },
                { stage: "BUILDING", count: 1, cards: [{ name: "Budget Guard", score: "22/25" }] },
                { stage: "LIVE", count: 1, cards: [{ name: "Clawd Up", score: "$MRR" }] },
              ].map((col) => (
                <div key={col.stage} className="flex-1 min-w-[140px]">
                  <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    {col.stage} ({col.count})
                  </div>
                  {col.cards.map((card) => (
                    <div key={card.name} className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3">
                      <p className="text-sm font-medium text-[var(--text)] mb-1">{card.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">{card.score}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "buildlog" && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
              <span className="text-xs text-[var(--text-muted)] ml-2">Build Log &mdash; Nightly</span>
            </div>
            <div className="space-y-1 text-sm font-mono leading-relaxed">
              <p><span className="text-[var(--text-muted)]">[23:01]</span> <span className="text-[var(--accent)]">Forge:</span> <span className="text-[var(--text)]">Starting nightly build for &ldquo;Budget Guard&rdquo;</span></p>
              <p><span className="text-[var(--text-muted)]">[23:01]</span> <span className="text-[var(--accent)]">Forge:</span> <span className="text-[var(--text)]">Reading spec from design-specs/budget-guard.md</span></p>
              <p><span className="text-[var(--text-muted)]">[23:03]</span> <span className="text-[var(--accent)]">Forge:</span> <span className="text-[var(--text)]">Created 4 files: landing page, API route, pricing component, checkout flow</span></p>
              <p><span className="text-[var(--text-muted)]">[23:04]</span> <span className="text-[var(--green)]">QA:</span> <span className="text-[var(--text)]">Running automated checks...</span></p>
              <p><span className="text-[var(--text-muted)]">[23:04]</span> <span className="text-[var(--green)]">QA:</span> <span className="text-[var(--text)]">Lighthouse 96/100. No accessibility violations.</span></p>
              <p><span className="text-[var(--text-muted)]">[23:05]</span> <span className="text-[var(--green)]">QA:</span> <span className="text-[var(--text)]">All CTAs resolve. Checkout flow verified.</span></p>
              <p><span className="text-[var(--text-muted)]">[23:05]</span> <span className="text-[#ec4899]">Designer:</span> <span className="text-[var(--text)]">UX audit score: 84/100. 2 minor suggestions filed.</span></p>
              <p><span className="text-[var(--text-muted)]">[23:06]</span> <span className="text-[var(--accent)]">Forge:</span> <span className="text-[var(--text)]">Committed a1f3e21. Deployed to budget-guard.microbuilder.co</span></p>
              <p><span className="text-[var(--text-muted)]">[23:06]</span> <span className="text-[var(--text)]">Operator:</span> <span className="text-[var(--text)]">Build complete. Morning brief updated.</span></p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Agent Card ─────────────────────────────────────────
function AgentCard({ name, role, desc, color, pro }: { name: string; role: string; desc: string; color: string; pro?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 hover:bg-[var(--bg-card-hover)] transition-all cursor-pointer md:cursor-default relative"
      onClick={() => setExpanded(!expanded)}
    >
      {pro && (
        <span className="absolute top-3 right-3 text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] uppercase tracking-wider">Pro</span>
      )}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
        <h4 className="text-sm font-semibold text-[var(--text)]">{name}</h4>
      </div>
      <p className="text-xs font-medium text-[var(--accent)] mb-1">{role}</p>
      {/* Mobile: expand/collapse. Desktop: always visible */}
      <div className={`text-sm text-[var(--text-muted)] leading-relaxed transition-all duration-200 overflow-hidden md:max-h-40 md:opacity-100 ${expanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
        {desc}
      </div>
    </div>
  );
}

// ── Pipeline Stages Diagram ────────────────────────────
function PipelineStages() {
  const stages = ["BACKLOG", "QUALIFIED", "RESEARCHING", "SCORING", "REVIEW", "BUILDING", "LIVE"];
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 flex items-center justify-center overflow-x-auto">
      <div className="flex items-center gap-1 flex-nowrap">
        {stages.map((stage, i) => (
          <div key={stage} className="flex items-center gap-1">
            <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${
              stage === "SCORING"
                ? "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30"
                : "text-[var(--text-muted)] bg-[var(--bg)] border border-[var(--border)]"
            }`}>
              {stage}
            </span>
            {i < stages.length - 1 && (
              <span className="text-[var(--text-muted)]/40 text-xs">&rsaquo;</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Pro Waitlist Email Capture ──────────────────────────
function ProWaitlistCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email.trim() || !email.includes("@")) return;
    const subject = encodeURIComponent(`Pro Waitlist: ${email}`);
    window.open(`mailto:info@microbuilder.co?subject=${subject}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-sm text-[var(--green)] text-center py-3">
        Thanks! We&apos;ll notify you when Pro launches.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button
        onClick={handleSubmit}
        className="block w-full px-8 py-3 text-sm font-semibold rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors text-center"
      >
        Notify me when Pro launches
      </button>
    </div>
  );
}

// ── Landing Section ────────────────────────────────────
function Hero({ onStart }: { onStart: () => void }) {
  return (
    <div className="gradient-mesh min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <span className="text-lg font-bold tracking-tight">Clawd Up</span>
        <div className="flex items-center gap-4 text-sm">
          <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" }); }} className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors hidden sm:inline">How It Works</a>
          <a href="#pricing" onClick={(e) => { e.preventDefault(); document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }); }} className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors hidden sm:inline">Pricing</a>
          <a href="#faq" onClick={(e) => { e.preventDefault(); document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" }); }} className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors hidden sm:inline">FAQ</a>
          <a href={CHECKOUT_STARTER} target="_blank" rel="noopener noreferrer" className="px-4 py-2 font-medium rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-colors cursor-pointer">Get Started</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-block px-3 py-1 rounded-full border border-[var(--border)] text-xs text-[var(--text-muted)] mb-6">
          AI agents that find, validate, and build micro-SaaS products
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
          Find the opportunity.<br />
          Decide if it&apos;s real.<br />
          <span className="text-[var(--accent)]">Build it overnight.</span>
        </h1>
        <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto mb-10 leading-relaxed">
          Three AI agents that find opportunities, validate them, and manage your pipeline.
          Upgrade to six and they&apos;ll build, test, and ship for you too.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <BuyButton className="mx-auto" label="Get Started &mdash; $15" href={CHECKOUT_STARTER} />
          <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" }); }} className="px-6 py-3 text-sm font-medium rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--text-muted)] transition-colors">
            See how it works
          </a>
        </div>
      </section>

      {/* Product Demo (moved above stats bar) */}
      <ProductDemo />

      {/* Stats Bar */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--text-muted)]">
          {["3-6 AI agents", "92% noise filtered out", "327+ signals scanned", "7 pipeline stages", "Ships code overnight"].map((stat, i) => (
            <span key={stat} className="flex items-center gap-3">
              {i > 0 && <span className="text-[var(--border)]">&middot;</span>}
              <span>{stat}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Find / Decide / Build */}
      <section id="how-it-works" className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold mb-2 text-center">Three phases. Up to six agents. One system.</h2>
        <p className="text-sm text-[var(--text-muted)] text-center mb-16">Every opportunity follows the same path. Your agents handle each step.</p>

        <div className="space-y-16">
          {/* FIND */}
          <div className="border-l-2 border-[#6366f1]/40 pl-6">
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border bg-indigo-500/10 text-indigo-400 border-indigo-500/20 mb-4">FIND</span>
            <h3 className="text-2xl font-bold mb-2">Surface the signals that matter</h3>
            <p className="text-[var(--text-muted)] leading-relaxed max-w-lg mb-6">
              Scout scans Reddit, Hacker News, X, and niche communities 24/7.
              92% of signals get killed by pattern matching before they reach you.
              What survives lands in your morning brief, scored and ready to evaluate.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <AgentCard name="Scout" role="Signal hunter" desc="Scans Reddit, HN, X, and 12+ sources for bleeding-neck problems. Applies kill patterns to filter noise. Delivers scored leads daily." color="#6366f1" />
              <AgentCard name="Researcher" role="Market validator" desc="Deep-dives competitors, sizes TAM, maps the landscape. Produces structured analysis using the 5S framework. Kills ideas with data, not gut feel." color="#818cf8" />
            </div>
          </div>

          {/* DECIDE */}
          <div className="border-l-2 border-amber-500/40 pl-6">
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border bg-amber-500/10 text-amber-400 border-amber-500/20 mb-4">DECIDE</span>
            <h3 className="text-2xl font-bold mb-2">Score, stress-test, and commit</h3>
            <p className="text-[var(--text-muted)] leading-relaxed max-w-lg mb-6">
              Every opportunity gets scored /25 across five dimensions: Signal, Size, Shape, Speed, and Stress Test.
              The pipeline tracks stage gates from Backlog to Live.
              Nothing moves forward without evidence.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <AgentCard name="Operator" role="Pipeline manager" desc="Manages the 7-stage pipeline with enforced gates. Runs morning briefs, coordinates handoffs between agents, and tracks every opportunity from signal to shipped product." color="#10b981" />
              <PipelineStages />
            </div>
          </div>

          {/* BUILD */}
          <div className="border-l-2 border-green-500/40 pl-6">
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border bg-green-500/10 text-green-400 border-green-500/20 mb-4">BUILD</span>
            <h3 className="text-2xl font-bold mb-2">Ship while you sleep</h3>
            <p className="text-[var(--text-muted)] leading-relaxed max-w-lg mb-6">
              Forge builds landing pages, APIs, and components from specs.
              Designer audits every build for UX quality. QA runs automated checks before anything goes live.
              The nightly build cycle means you wake up to deployed products.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <AgentCard name="Forge" role="Builder" desc="Reads design specs and builds production code. React components, API routes, landing pages, checkout flows. Commits, type-checks, and deploys." color="#f59e0b" pro />
              <AgentCard name="Designer" role="UX auditor" desc="Audits every page against design principles. Scores UX quality, flags violations, and writes specs for Forge to implement. Your quality gate." color="#ec4899" pro />
              <AgentCard name="QA" role="Quality enforcer" desc="Tests what Forge builds. Lighthouse scores, accessibility checks, broken links, checkout flow verification. Blocks deploys that don't pass." color="#ef4444" pro />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold mb-8 text-center">Manual vs Clawd Up</h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left px-5 py-3 text-[var(--text-muted)] font-medium">Feature</th>
                <th className="text-left px-5 py-3 text-[var(--text-muted)] font-medium">Manual</th>
                <th className="text-left px-5 py-3 text-[var(--text-muted)] font-medium">Clawd Up</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Signal scanning", "Set up scrapers, RSS, alerts", "12+ sources, auto-scored"],
                ["Kill pattern filtering", "Review every signal yourself", "92% auto-killed"],
                ["Market research", "Hours per opportunity", "Structured 5S deep dive"],
                ["Pipeline management", "Spreadsheet or Notion", "7-stage gated pipeline"],
                ["Building from specs", "Write code yourself", "Forge ships nightly"],
                ["QA and UX checks", "Manual testing", "Automated before deploy"],
                ["Total setup time", "Weeks", "5 minutes"],
              ].map(([feature, manual, clawd]) => (
                <tr key={feature} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="px-5 py-3 text-[var(--text)] font-medium whitespace-nowrap">{feature}</td>
                  <td className="px-5 py-3 text-[var(--text-muted)]">{manual}</td>
                  <td className="px-5 py-3 text-[var(--green)]">{clawd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Built in Public */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-lg text-[var(--text)] font-semibold mb-2">Built in public. Follow the journey.</p>
        <p className="text-sm text-[var(--text-muted)]">
          <a href="https://x.com/Microbuilderco" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--text)] transition-colors">@Microbuilderco on X</a>
        </p>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold mb-8 text-center">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Starter */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold">Starter</h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-muted)]">One-time</span>
            </div>
            <div className="text-3xl font-bold mb-1">$15</div>
            <div className="text-sm text-[var(--text-muted)] mb-6">Yours forever. No subscription.</div>
            <ul className="space-y-2 text-sm mb-6 flex-1">
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>3 agents: Scout, Researcher, Operator</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Signal scanning across Reddit, X, HN</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>7-stage pipeline with enforced gates</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Morning briefs + kill pattern filtering</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>5S deep dive framework</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Email support</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Self-hosted, your data stays yours</li>
              <li className="text-[var(--text-muted)]/40 line-through"><span className="mr-2 opacity-40">&#10003;</span>Ongoing updates</li>
              <li className="text-[var(--text-muted)]/40 line-through"><span className="mr-2 opacity-40">&#10003;</span>New agent templates</li>
              <li className="text-[var(--text-muted)]/40 line-through"><span className="mr-2 opacity-40">&#10003;</span>Priority support</li>
            </ul>
            <a
              href={CHECKOUT_STARTER}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-8 py-3 text-sm font-semibold rounded-lg border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-colors text-center"
            >
              Buy Starter &mdash; $15
            </a>
          </div>

          {/* Starter + Updates (Highlighted) */}
          <div className="rounded-xl border-2 border-[var(--accent)] bg-[var(--bg-card)] p-8 flex flex-col relative">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold">Starter + Updates</h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[var(--accent)] text-white">Recommended</span>
            </div>
            <div className="text-3xl font-bold mb-1">$15 <span className="text-lg font-normal text-[var(--text-muted)]">+ $10/mo</span></div>
            <div className="text-sm text-[var(--text-muted)] mb-6">$15 one-time + $10/mo for live updates. Cancel anytime, keep the agents.</div>
            <ul className="space-y-2 text-sm mb-6 flex-1">
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Everything in Starter, plus:</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Monthly agent config updates</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>New kill patterns + scoring rubrics</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>New skills and cron templates as released</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Priority email support</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>30-day money-back guarantee on subscription</li>
            </ul>
            <BuyButton className="w-full" label="Buy Starter + Updates &mdash; $15" href={CHECKOUT_STARTER} />
            <p className="text-xs text-center text-[var(--text-muted)] mt-3">+ $10/mo for live updates</p>
          </div>

          {/* Pro */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-8 flex flex-col relative">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold">Pro</h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-muted)]">Coming Soon</span>
            </div>
            <div className="text-3xl font-bold mb-1">$50</div>
            <div className="text-sm text-[var(--text-muted)] mb-6">The full team. Yours forever.</div>
            <ul className="space-y-2 text-sm mb-6 flex-1">
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Everything in Starter, plus:</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Forge agent (builds code from specs)</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Designer agent (UX audits)</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>QA agent (automated testing)</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Orchestration engine (agent coordination)</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Nightly builds &mdash; ship while you sleep</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Optional: +$25/mo for live updates</li>
            </ul>
            <ProWaitlistCapture />
          </div>
        </div>
      </section>

      {/* What happens after purchase */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold mb-8 text-center">What happens after purchase</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-center">
            <div className="text-2xl font-bold text-[var(--accent)] mb-2">1</div>
            <p className="text-sm text-[var(--text)]">Purchase and run the install command (5 min)</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-center">
            <div className="text-2xl font-bold text-[var(--accent)] mb-2">2</div>
            <p className="text-sm text-[var(--text)]">Your first morning brief arrives with scored signals</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-center">
            <div className="text-2xl font-bold text-[var(--accent)] mb-2">3</div>
            <p className="text-sm text-[var(--text)]">Scout starts scanning Reddit, HN, and X for your niche</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold mb-8 text-center">FAQ</h2>
        <div className="max-w-2xl mx-auto">
          <FAQItem
            q="How is this different from just using Claude or ChatGPT?"
            a="ChatGPT is a general assistant you talk to. Clawd Up is a pre-configured team of specialists that runs autonomously -- scanning for opportunities while you sleep, managing a pipeline with enforced gates, and building products from specs. You don't prompt it. It prompts you."
          />
          <FAQItem
            q="What do I need to run this?"
            a="A VPS (we recommend Hetzner CAX21, ~$8/mo), Node.js 18+, and an Anthropic API key. The install wizard walks you through everything in 5 minutes."
          />
          <FAQItem
            q="What agents are included?"
            a="Starter includes 3 agents: Scout (finds signals), Researcher (validates markets), and Operator (manages pipeline). Pro adds 3 more: Forge (builds code), Designer (audits UX), and QA (tests builds). All agents share memory and coordinate automatically."
          />
          <FAQItem
            q="How much does the AI API cost to run?"
            a="Most users spend $30-80/mo on API calls. Scout and Researcher use Sonnet (cheap). Forge and Operator use Opus for complex work. You control the budget."
          />
          <FAQItem
            q="What can Forge actually build?"
            a="Landing pages, API routes, React components, checkout flows, and full micro-SaaS frontends. It reads design specs and produces production code. QA tests it before deploy."
          />
          <FAQItem
            q="What's the pipeline?"
            a="A 7-stage system: Backlog, Qualified, Researching, Scoring, Review, Building, Live. Each stage has gate criteria. Nothing advances without evidence. The Operator manages transitions automatically."
          />
          <FAQItem
            q="Why self-hosted?"
            a="Your data, your API keys, your agents. We never see your pipeline, signals, or business strategy. You own everything."
          />
          <FAQItem
            q="Can I cancel?"
            a="Yes, anytime. You keep all your configs, agents, and pipeline data. Updates stop, but nothing breaks."
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Signal to shipped product.</h2>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--accent)]">While you sleep.</h2>
        <p className="text-[var(--text-muted)] mb-8">Three agents. Seven pipeline stages. One purchase.</p>
        <BuyButton label="Get Started &mdash; $15" href={CHECKOUT_STARTER} />
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 text-center text-xs text-[var(--text-muted)]">
        Clawd Up &middot; Powered by{" "}
        <a href="https://github.com/openclaw/openclaw" className="underline hover:text-[var(--text)]">
          OpenClaw
        </a>
      </footer>
      <ChatWidget />
    </div>
  );
}

// ── Onboarding Steps ───────────────────────────────────
const STEPS = ["Basics", "Platforms", "Notifications", "AI Provider", "Server"] as const;

function Onboarding({ onBack, purchased }: { onBack: () => void; purchased?: boolean }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(DEFAULT);
  const [command, setCommand] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === 0) {
      if (!form.name.trim()) newErrors.name = "Name is required";
      if (!form.email.trim() || !form.email.includes("@")) newErrors.email = "Valid email is required";
    }
    if (step === 3) {
      if (!form.apiKey.trim()) newErrors.apiKey = "API key is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    if (step < STEPS.length - 1) setStep(step + 1);
    else generate();
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const generate = () => {
    const setupConfig = {
      name: form.name,
      timezone: form.timezone,
      channel: form.notifyChannel,
      telegram_token: form.telegramToken,
      discord_webhook: form.discordWebhook,
      provider: form.provider,
      api_key: form.apiKey,
      work_context: form.businessType,
      work_style: "direct",
      tier: "starter",
      vps_host: form.vpsHost,
      vps_user: form.vpsUser,
    };
    const config = btoa(JSON.stringify(setupConfig));
    const sshPrefix = form.vpsHost ? `ssh ${form.vpsUser}@${form.vpsHost} ` : "";
    const cmd = `${sshPrefix}curl -fsSL https://raw.githubusercontent.com/Jmee67/clawd-up/main/install.sh | bash -s -- --config ${config}`;
    setCommand(cmd);
  };

  const copyCmd = () => {
    if (command) {
      navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (command) {
    return (
      <div className="min-h-screen gradient-mesh flex items-center justify-center px-6">
        <div className="max-w-2xl w-full">
          <h2 className="text-2xl font-bold mb-2">Ready to install</h2>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            Run this on your server. It clones the repo, runs setup with your config, and starts the agents.
          </p>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 mb-4 text-sm text-[var(--text-muted)] space-y-1">
            <p className="text-[var(--text)] font-medium text-xs uppercase tracking-wider mb-2">Your configuration</p>
            <p>Name: {form.name}</p>
            <p>Timezone: {form.timezone}</p>
            <p>Provider: {form.provider}</p>
            <p>Notifications: {form.notifyChannel}</p>
            <p>Server: {form.vpsHost || "Local install"}</p>
          </div>
          <div className="relative rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 font-mono text-xs leading-relaxed break-all">
            {command}
            <button
              onClick={copyCmd}
              className="absolute top-3 right-3 text-xs px-3 py-1 rounded bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="mt-6 text-xs text-[var(--text-muted)] space-y-1">
            <p>Requirements: Node.js 18+, an OpenClaw gateway running on your server, and an API key for your chosen provider.</p>
            <p>
              Need help?{" "}
              <a href="https://github.com/Jmee67/clawd-up" className="underline hover:text-[var(--text)]">
                GitHub
              </a>{" "}
              &middot;{" "}
              <a href="https://discord.com/invite/clawd" className="underline hover:text-[var(--text)]">
                Discord
              </a>
            </p>
          </div>
          <div className="mt-6 text-xs text-[var(--text-muted)] space-y-1">
            <p className="font-medium text-[var(--text)]">What happens next</p>
            <p>1. The script installs Clawd Up agents on your OpenClaw instance</p>
            <p>2. Your first morning brief arrives within 5 minutes</p>
            <p>3. Scout starts scanning for signals immediately</p>
          </div>
          <button
            onClick={() => { setCommand(null); setStep(0); }}
            className="mt-4 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors";

  const selectClass = inputClass + " appearance-none";

  const labelClass = "block text-sm font-medium mb-1.5";

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        {purchased ? (
          <div className="mb-6">
            <div className="inline-block px-3 py-1 rounded-full bg-[var(--green)]/10 text-[var(--green)] text-xs font-medium mb-3">
              &#10003; Purchase complete
            </div>
            <h2 className="text-xl font-bold">Thanks for purchasing Clawd Up!</h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Set up your agents below to get started.
            </p>
          </div>
        ) : (
          <button onClick={onBack} className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] mb-6 transition-colors">
            &larr; Back
          </button>
        )}

        {/* Progress */}
        <div className="flex gap-1.5 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1">
              <div
                className={`h-1 rounded-full transition-colors ${
                  i <= step ? "bg-[var(--accent)]" : "bg-[var(--border)]"
                }`}
              />
              <div className={`text-xs mt-1.5 ${i === step ? "text-[var(--text)]" : "text-[var(--text-muted)]"}`}>
                {s}
              </div>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-5">
          {step === 0 && (
            <>
              <div>
                <label className={labelClass}>Your name</label>
                <input className={inputClass} value={form.name} onChange={(e) => { set("name", e.target.value); setErrors((prev) => { const { name: _, ...rest } = prev; return rest; }); }} placeholder="Jamie" />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input className={inputClass} type="email" value={form.email} onChange={(e) => { set("email", e.target.value); setErrors((prev) => { const { email: _, ...rest } = prev; return rest; }); }} placeholder="you@example.com" />
                <p className="text-xs text-[var(--text-muted)] mt-1">For license delivery and setup guide</p>
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className={labelClass}>Timezone</label>
                <select className={selectClass} value={form.timezone} onChange={(e) => set("timezone", e.target.value)}>
                  {["US/Eastern", "US/Central", "US/Pacific", "Europe/London", "Europe/Berlin", "Asia/Tokyo", "Australia/Sydney"].map((tz) => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Business type</label>
                <select className={selectClass} value={form.businessType} onChange={(e) => set("businessType", e.target.value)}>
                  <option value="saas">SaaS / Micro-SaaS</option>
                  <option value="ecom">E-commerce / D2C</option>
                  <option value="agency">Agency / Services</option>
                  <option value="content">Content / Media</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div>
                <label className={labelClass}>X / Twitter handle <span className="text-[var(--text-muted)]">(optional)</span></label>
                <input className={inputClass} value={form.xHandle} onChange={(e) => set("xHandle", e.target.value)} placeholder="@yourhandle" />
              </div>
              <div>
                <label className={labelClass}>Reddit username <span className="text-[var(--text-muted)]">(optional)</span></label>
                <input className={inputClass} value={form.redditUsername} onChange={(e) => set("redditUsername", e.target.value)} placeholder="u/yourname" />
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Scout uses these to monitor relevant communities and find signals in your niche.
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className={labelClass}>Notification channel</label>
                <div className="flex gap-3">
                  {(["telegram", "discord"] as const).map((ch) => (
                    <button
                      key={ch}
                      onClick={() => set("notifyChannel", ch)}
                      className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                        form.notifyChannel === ch
                          ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                          : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--text-muted)]"
                      }`}
                    >
                      {ch.charAt(0).toUpperCase() + ch.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              {form.notifyChannel === "telegram" ? (
                <div>
                  <label className={labelClass}>Telegram bot token</label>
                  <input className={inputClass} value={form.telegramToken} onChange={(e) => set("telegramToken", e.target.value)} placeholder="123456:ABC-DEF..." />
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Create a bot via @BotFather on Telegram
                  </p>
                </div>
              ) : (
                <div>
                  <label className={labelClass}>Discord webhook URL</label>
                  <input className={inputClass} value={form.discordWebhook} onChange={(e) => set("discordWebhook", e.target.value)} placeholder="https://discord.com/api/webhooks/..." />
                </div>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className={labelClass}>AI provider</label>
                <div className="flex gap-3">
                  {(["anthropic", "openai", "google"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => set("provider", p)}
                      className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                        form.provider === p
                          ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                          : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--text-muted)]"
                      }`}
                    >
                      {p === "anthropic" ? "Anthropic" : p === "openai" ? "OpenAI" : "Google"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClass}>API key</label>
                <input className={inputClass} type="password" value={form.apiKey} onChange={(e) => { set("apiKey", e.target.value); setErrors((prev) => { const { apiKey: _, ...rest } = prev; return rest; }); }} placeholder="sk-..." />
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Stored locally on your server. Never sent to us.
                </p>
                {errors.apiKey && <p className="text-xs text-red-400 mt-1">{errors.apiKey}</p>}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div>
                <label className={labelClass}>Server hostname or IP</label>
                <input className={inputClass} value={form.vpsHost} onChange={(e) => set("vpsHost", e.target.value)} placeholder="your-server.com or 1.2.3.4" />
              </div>
              <div>
                <label className={labelClass}>SSH user</label>
                <input className={inputClass} value={form.vpsUser} onChange={(e) => set("vpsUser", e.target.value)} placeholder="root" />
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                The install command runs on your server via SSH. Leave blank if installing locally.
              </p>
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button onClick={prev} className="px-6 py-2.5 text-sm rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--text-muted)] transition-colors">
              Back
            </button>
          )}
          <button
            onClick={next}
            className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors"
          >
            {step === STEPS.length - 1 ? "Generate Install Command" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main (inner, reads search params) ──────────────────
function HomeInner() {
  const searchParams = useSearchParams();
  const purchased = searchParams.get("purchased") === "true";
  const [view, setView] = useState<"landing" | "onboarding">(purchased ? "onboarding" : "landing");

  useEffect(() => {
    if (purchased) setView("onboarding");
  }, [purchased]);

  return view === "landing" ? (
    <Hero onStart={() => setView("onboarding")} />
  ) : (
    <Onboarding onBack={() => setView("landing")} purchased={purchased} />
  );
}

// ── Main (with Suspense for useSearchParams) ───────────
export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen gradient-mesh" />}>
      <HomeInner />
    </Suspense>
  );
}
