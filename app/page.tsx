"use client";

import { useState, useEffect, Suspense } from "react";
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
const CHECKOUT_PRO = "https://microbuilderco.lemonsqueezy.com/checkout/buy/SUBSCRIPTION_ID?currency=USD&locale=en";

// ── Buy Button ─────────────────────────────────────────
function BuyButton({ className = "", label = "Get Started", href = CHECKOUT_PRO }: { className?: string; label?: string; href?: string }) {
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
        <span className="text-[var(--text-muted)] shrink-0 text-lg leading-none">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p className="text-sm text-[var(--text-muted)] mt-2 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

// ── Landing Section ────────────────────────────────────
function Hero({ onStart }: { onStart: () => void }) {
  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="gradient-mesh min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <span className="text-lg font-bold tracking-tight">Clawd Up</span>
        <a href="#pricing" onClick={(e) => { e.preventDefault(); document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }); }} className="px-4 py-2 text-sm font-medium rounded-lg border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-colors cursor-pointer">Get Started</a>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
          Kill bad ideas before<br />
          <span className="text-[#9b9bb0]">they cost you months.</span>
        </h1>
        <p className="text-lg text-[#9b9bb0] max-w-xl mx-auto mb-10">
          Three AI agents that scout opportunities, run deep dives, and deliver
          your morning brief. You build. They operate. $10/mo.
        </p>
        <BuyButton className="mx-auto" label="Subscribe — $10/mo" href={CHECKOUT_PRO} />
      </section>

      {/* Sample Output (moved above agent cards) */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-8 text-center">What your morning looks like</h2>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
            <span className="text-xs text-[var(--text-muted)] ml-2">Morning Brief — 8:00 AM</span>
          </div>
          <div className="space-y-3 text-sm text-[var(--text-muted)] font-mono leading-relaxed">
            <p className="text-[var(--text)] font-semibold font-sans">3 New Signals</p>
            <p><span className="text-[var(--green)]">PROMOTED</span> AI invoice matching for construction — 18.5/25 — &quot;I&apos;d pay $200/mo to stop doing this&quot;</p>
            <p><span className="text-yellow-400">WATCHING</span> Return fraud detection for Shopify — 14/25 — Heavy competition, needs wedge</p>
            <p><span className="text-red-400">KILLED</span> Pet subscription box — Physical product + saturated market</p>
            <p className="pt-2 border-t border-[var(--border)] text-xs">Pipeline: 3 active, 1 advanced to SCORING, 26 killed lifetime. Generated in 4.2s.</p>
          </div>
        </div>
      </section>

      {/* System Components */}
      <section className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">
        {[
          {
            name: "Signal Detection",
            desc: "Scans Reddit, X, and Hacker News for bleeding-neck problems with money behind them. Real pain, real spend.",
            tag: "Scout Agent",
          },
          {
            name: "Opportunity Analysis",
            desc: "5S deep dives that find reasons NOT to build before you waste a month. Signal, Size, Shape, Speed, Stress Test.",
            tag: "Researcher Agent",
          },
          {
            name: "Autonomous Operations",
            desc: "Morning briefs, pipeline enforcement, nightly builds. Runs while you sleep so you wake up to progress.",
            tag: "Operator Agent",
          },
        ].map((a) => (
          <div
            key={a.name}
            className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 hover:bg-[var(--bg-card-hover)] transition-colors"
          >
            <div className="text-xs font-medium text-[var(--accent)] mb-2 uppercase tracking-wider">
              {a.tag}
            </div>
            <h3 className="text-lg font-semibold mb-2">{a.name}</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">{a.desc}</p>
          </div>
        ))}
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "92%", label: "Kill rate on bad ideas" },
            { value: "327+", label: "Signals evaluated autonomously" },
            { value: "3 days", label: "To first revenue signal" },
            { value: "5 min", label: "Install to first brief" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-[var(--text)]">{stat.value}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-[var(--text-muted)] mt-6">
          Built for a real solo operation. Battle-tested daily since February 2026.
        </p>
      </section>

      {/* Founder Testimonial */}
      <section className="max-w-3xl mx-auto px-6 pb-20 text-center">
        <blockquote className="text-lg italic text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto">
          &ldquo;I built Clawd Up for myself. Three agents running 24/7, scanning Reddit and X, killing bad ideas before I waste time on them. After a month of daily use, I&apos;m selling what works.&rdquo;
        </blockquote>
        <p className="text-sm text-[var(--text-muted)] mt-4">&mdash; Jamie, Microbuilder</p>
      </section>

      {/* What You Get */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-8 text-center">What&apos;s in the box</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "3 autonomous agents with expert-grade system prompts",
            "Pre-configured cron schedules (briefs, triage, nightly builds)",
            "Pipeline system with stage gates and 26+ kill patterns",
            "Memory system with decay scoring, vault, and daily notes",
            "Self-healing operations with health monitoring",
            "Telegram or Discord notifications out of the box",
            "One-command install, first brief in 5 minutes",
            "Your server, your data, your API keys. Nothing phones home.",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
              <span className="text-[var(--green)] mt-0.5 shrink-0">&#10003;</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-8 text-center">FAQ</h2>
        <div className="max-w-2xl mx-auto">
          <FAQItem
            q="What is OpenClaw?"
            a="OpenClaw is a free, open-source AI agent framework. Clawd Up is a pre-configured agent package that runs on top of it. Install OpenClaw first, then add Clawd Up in one command."
          />
          <FAQItem
            q="What do I need to run this?"
            a="A Linux server (VPS or local) with Node.js 18+, an OpenClaw gateway, and an API key from Anthropic, OpenAI, or Google. A $5/mo VPS works fine."
          />
          <FAQItem
            q="What's the difference between Starter and Pro?"
            a="Starter is a one-time $15 purchase with no updates. Pro is $10/month with ongoing updates and new agents. Both include the full starter kit."
          />
          <FAQItem
            q="Is there a demo?"
            a="The morning brief sample above is real output from a live system. Check the GitHub repo for the full agent configs, cron schedules, and pipeline setup."
          />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-8 text-center">Pricing</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Starter */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-8">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold">Starter</h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-muted)]">One-time</span>
            </div>
            <div className="text-3xl font-bold mb-1">$15</div>
            <div className="text-sm text-[var(--text-muted)] mb-6">one-time purchase, yours forever</div>
            <ul className="space-y-2 text-sm mb-6">
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Full agent starter kit</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Install script + setup wizard</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Scout + Researcher + Operator agents</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Email support</li>
              <li className="text-[var(--text-muted)]/40 line-through"><span className="mr-2 opacity-40">&#10003;</span>Ongoing updates</li>
              <li className="text-[var(--text-muted)]/40 line-through"><span className="mr-2 opacity-40">&#10003;</span>New agent templates</li>
              <li className="text-[var(--text-muted)]/40 line-through"><span className="mr-2 opacity-40">&#10003;</span>Priority support</li>
            </ul>
            <p className="text-xs text-[var(--text-muted)] mb-4">Requires <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--text)]">OpenClaw</a> (free, open source)</p>
            <a
              href={CHECKOUT_STARTER}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-8 py-3 text-sm font-semibold rounded-lg border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-colors text-center"
            >
              Buy Once &mdash; $15
            </a>
          </div>

          {/* Pro */}
          <div className="rounded-xl border-2 border-[var(--accent)] bg-[var(--bg-card)] p-8 relative">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold">Pro</h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[var(--accent)] text-white">Most Popular</span>
            </div>
            <div className="text-3xl font-bold mb-1">$10<span className="text-lg font-normal text-[var(--text-muted)]">/mo</span></div>
            <div className="text-sm text-[var(--text-muted)] mb-6">monthly subscription, cancel anytime</div>
            <ul className="space-y-2 text-sm mb-6">
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Everything in Starter, plus:</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Monthly agent updates</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>New agent templates as released</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Priority email support</li>
              <li className="text-[var(--text-muted)]"><span className="text-[var(--green)] mr-2">&#10003;</span>Early access to new features</li>
            </ul>
            <p className="text-xs text-[var(--text-muted)] mb-4">Requires <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--text)]">OpenClaw</a> (free, open source)</p>
            <BuyButton className="w-full" label="Subscribe &mdash; $10/mo" href={CHECKOUT_PRO} />
            <p className="text-xs text-center text-[var(--text-muted)] mt-3">30-day money-back guarantee. No questions asked.</p>
          </div>
        </div>
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
              ✓ Purchase complete
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
