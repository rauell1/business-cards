# Kadi — wooden NFC business cards

A production-grade marketing site and the foundation for a full digital-identity
platform, built with Next.js 15 (App Router), TypeScript in strict mode and
Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

## What is built so far

**Phase 3 — the complete public landing page.** Thirteen sections, all
server-rendered and statically prerendered: sticky navbar with scroll-spy,
hero, social proof, feature bento, how-it-works, interactive product showcase,
benefits, impact, testimonials, pricing, FAQ, final CTA and footer. Plus legal
pages, `robots.txt`, `sitemap.xml`, JSON-LD and Open Graph metadata.

Interactive work is client-side only where it needs to be: motion, tabs,
accordions and the pricing toggle. The page still renders and reads correctly
with JavaScript disabled.

## Design system

Tokens live in `src/app/globals.css` under `@theme`:

| Token | Value | Use |
|---|---|---|
| `paper` | `#f8f5ef` | page ground — warm, never sterile grey |
| `forest` | `#12362a` | primary brand, dark sections |
| `clay` | `#b8613a` | accent, underline, emphasis |
| `brass` | `#b8912f` | detail on dark surfaces |
| `moss` | `#6f8f63` | success states, growth |
| `font-display` | Instrument Serif | headlines, italic accents |
| `font-sans` | Instrument Sans Variable | everything else |

Type is self-hosted via Fontsource — no Google CDN, no third-party request, no
layout shift. Custom utilities: `container-x`, `glass`, `glass-dark`, `grain`,
`text-display`, `eyebrow`, `rule`.

## Motion

`motion/react` with a single easing curve (`cubic-bezier(.16,1,.3,1)`) used
throughout. Every animated component checks `useReducedMotion()` and renders its
final state when the user has asked for less motion — this is verified in
`Reveal`, `StaggerGroup`, `Navbar`, `Hero`, `Showcase`, `Impact`, `Pricing` and
`MobileCta`.

## Content

All copy, prices, plans, FAQs and stats live in `src/lib/site.ts`. No copy is
hard-coded inside components, so content edits never touch layout.

> ⚠️ **Before launch:** several figures and all testimonials are illustrative
> demo content, and the reference site could not be audited from the build
> environment. Read `docs/REFERENCE_AUDIT.md` first.

## Deployment

The production build is Vercel-ready: `npm ci && next build`, no environment
variables required, all routes statically prerendered. **It has not been
deployed** — the repository still needs to be imported into Vercel once
(`vercel.com/new`). Full runbook, domain setup and rollback steps:
`docs/DEPLOYMENT.md`.

## Documentation

- `docs/REFERENCE_AUDIT.md` — what was and was not verified
- `docs/SYSTEM_ARCHITECTURE.md` — the two-product model, caching, events
- `docs/DATABASE_SCHEMA.md` — Neon/Drizzle entity design and constraints
- `docs/SECURITY.md` — controls and Kenya DPA posture
- `docs/DEPLOYMENT.md` — Vercel, domain and Neon setup
- `docs/IMPLEMENTATION_PROGRESS.md` — what's done, pending, blocked

## Roadmap

Phase 4 (identity engine) → 5 (NFC registry) → 6 (dashboard) → 7 (commerce,
M-Pesa) → 8 (AI scanner, PWA) → 9 (admin). Each phase has an entry in
`docs/IMPLEMENTATION_PROGRESS.md` with its external dependencies listed.
