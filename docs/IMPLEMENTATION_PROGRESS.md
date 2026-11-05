# Implementation Progress

Last updated: phase 3 (public website) landed.

## Legend

- ✅ Completed
- 🟡 In progress
- ⬜ Pending
- 🔒 Blocked - needs external credentials
- 🔌 Needs physical hardware
- 🧭 Assumption (not verified against the reference site)

## Phase 0 - Discovery

| Item | State | Note |
|---|---|---|
| Live site audit | 🔒 | `alama.africa` unreachable from the build sandbox. See `REFERENCE_AUDIT.md`. |
| Feature inventory | ✅ | Built from the supplied brief. |
| Architecture + schema design | ✅ | See `SYSTEM_ARCHITECTURE.md`, `DATABASE_SCHEMA.md`. |

## Phase 1-3 - Foundation & public website

| Item | State |
|---|---|
| Next.js 15 App Router + TypeScript strict | ✅ |
| Tailwind v4 design tokens (warm editorial system) | ✅ |
| Self-hosted variable fonts (no CDN, no layout shift) | ✅ |
| Sticky navbar: scroll-reactive glass, scroll-spy, focus-trapped mobile sheet | ✅ |
| Hero: parallax, cursor-tilt card, ambient orbs, animated underline | ✅ |
| Social proof marquee (pauses on hover, static for reduced motion) | ✅ |
| Feature bento (7 cards, staggered reveal) | ✅ |
| How it works + radiating tap visual | ✅ |
| Interactive product showcase (NFC / QR / profile tabs, real QR code) | ✅ |
| Benefits + team strip | ✅ |
| Impact section with count-up statistics | ✅ |
| Testimonials | ✅ |
| Pricing with individual/team toggle | ✅ |
| FAQ accordion (single-open, animated height) | ✅ |
| Final CTA + footer | ✅ |
| Legal pages, 404, sitemap, robots, JSON-LD, OG metadata | ✅ |
| Security headers, reduced-motion support, skip link | ✅ |
| Scroll progress + mobile sticky CTA | ✅ |
| Verification: `tsc --noEmit`, `next build`, CSS output audit | ✅ |
| Visual browser QA | 🔒 | No browser binary can run in the sandbox. |

## Phase 4 - Digital card engine

| Item | State |
|---|---|
| `profiles` / `profile_links` schema | ✅ designed |
| Drizzle migrations | ⬜ |
| Profile editor + live preview | ⬜ |
| Public profile route `/p/[username]` | ⬜ (route reserved) |
| vCard generation | ⬜ |
| QR PNG/SVG export endpoint | ⬜ |

## Phase 5-9

| Module | State |
|---|---|
| NFC card registry & assignment | 🔌 needs tag UIDs from hardware |
| Auth (Better Auth) | 🔒 needs `BETTER_AUTH_SECRET` + DB |
| Customer dashboard | ⬜ |
| Commerce + M-Pesa | 🔒 needs Daraja credentials |
| AI scanner | 🔒 needs OCR provider key |
| PWA / offline | ⬜ |
| Admin panel | ⬜ |

## Known gaps in the current build

1. **Analytics figures and testimonials are illustrative.** Replace before launch.
2. Social links point to platform home pages, not real accounts.
3. "Sign in" is an anchor to pricing - it becomes a real link when auth lands.
4. No checkout yet; all CTAs route to WhatsApp/email, which is the correct
   interim behaviour for a Kenyan SME until payment rails are live.
