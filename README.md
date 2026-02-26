# Clawd Up — Web

Landing page and onboarding flow for [Clawd Up](https://github.com/Jmee67/clawd-up).

## What it does

1. Landing page: what Clawd Up is, the three agents, pricing
2. Multi-step onboarding: name, timezone, business type, platforms, notifications, AI provider, server details
3. Generates a personalized install command with config encoded as base64
4. User runs the command on their server — no interactive prompts needed

## Stack

- Next.js 15 (App Router, static export)
- Tailwind CSS v4
- TypeScript
- Deploy to Vercel

## Development

```bash
npm install
npm run dev
```

## Deploy

```bash
# Push to GitHub, connect to Vercel
vercel
```

Or use the Vercel deploy button on the repo.

## Design

Dark theme, minimal, single page. No auth, no backend. The install command points to the main clawd-up repo's `install.sh`.
