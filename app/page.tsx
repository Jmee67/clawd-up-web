"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

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
const CHECKOUT_URL = "https://microbuilderco.lemonsqueezy.com/checkout/buy/b7d387a5-38ab-45df-9c0a-e7bba9aace9c";

// ── Buy Button ─────────────────────────────────────────
function BuyButton({ className = "", label = "Buy now — $15" }: { className?: string; label?: string }) {
  return (
    <a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block px-8 py-3 text-sm font-semibold rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors text-center ${className}`}
    >
      {label}
    </a>
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
        <BuyButton label="Buy now" className="px-4 py-2 text-sm font-medium" />
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
          Your AI ops team.<br />
          <span className="text-[var(--text-muted)]">Ship faster.</span>
        </h1>
        <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto mb-10">
          Three agents that find demand signals, write deep dives, and run your
          opportunity pipeline. You build. They operate.
        </p>
        <BuyButton className="mx-auto" />
      </section>

      {/* Agents */}
      <section className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">
        {[
          {
            name: "Scout",
            desc: "Scans X and Reddit for demand signals. Real pain, real spend, real opportunity.",
            tag: "Detection",
          },
          {
            name: "Researcher",
            desc: "Writes 5S deep dives. Signal, Size, Shape, Speed, Stress Test. Finds reasons NOT to build.",
            tag: "Analysis",
          },
          {
            name: "Operator",
            desc: "Morning briefs, signal triage, nightly builds, pipeline enforcement. Keeps everything moving.",
            tag: "Execution",
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

      {/* Sample Output */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-8 text-center">See it in action</h2>
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

      {/* Social Proof / Stats */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "327+", label: "Signals evaluated" },
            { value: "26+", label: "Bad ideas killed" },
            { value: "14 days", label: "Avg time to first revenue signal" },
            { value: "5 min", label: "Install to first brief" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-[var(--text)]">{stat.value}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-[var(--text-muted)] mt-6">
          Built and battle-tested on a live bootstrapper operation since February 2026.
        </p>
      </section>

      {/* What You Get */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-8 text-center">What you get</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "3 specialized AI agents with expert-grade identities",
            "Pre-configured cron schedules (briefs, triage, builds)",
            "Pipeline system with stage gates and kill patterns",
            "Memory system with decay, vault, and daily notes",
            "Immune system for self-healing agent operations",
            "28% leaner than default OpenClaw config",
            "Telegram or Discord notifications",
            "One-command install, running in 5 minutes",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
              <span className="text-[var(--green)] mt-0.5 shrink-0">&#10003;</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-3xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Pricing</h2>
        <div className="inline-block rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-8 text-left max-w-sm">
          <div className="text-3xl font-bold mb-1">$15</div>
          <div className="text-sm text-[var(--text-muted)] mb-4">one-time, own it forever</div>
          <ul className="space-y-2 text-sm text-[var(--text-muted)] mb-6">
            <li>All 3 agents</li>
            <li>All crons, templates, pipeline</li>
            <li>Lifetime access to current version</li>
          </ul>
          <BuyButton className="w-full" />
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <div className="text-sm font-medium text-[var(--text)] mb-1">
              + Weekly Updates — $9/mo
            </div>
            <div className="text-xs text-[var(--text-muted)]">
              New SOULs, skills, signal sources, kill patterns. Cancel anytime.
            </div>
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

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const next = () => {
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
            <p>Requirements: Node.js 18+, OpenClaw installed, API key for your chosen provider.</p>
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
                <input className={inputClass} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jamie" />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input className={inputClass} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
                <p className="text-xs text-[var(--text-muted)] mt-1">For license delivery and setup guide</p>
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
                <input className={inputClass} type="password" value={form.apiKey} onChange={(e) => set("apiKey", e.target.value)} placeholder="sk-..." />
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Stored locally on your server. Never sent to us.
                </p>
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
