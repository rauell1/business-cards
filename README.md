<!-- header:start -->
<div align="center">

# Alama Identity

**Alama Identity: wooden NFC business cards that open a digital profile with one tap. Marketing site, card studio and public profiles built with Next.js.**

[![Live: business-cards.rauell.workers.dev](https://img.shields.io/badge/Live-business--cards.rauell.workers.dev-0d9488?style=for-the-badge&logo=cloudflare&logoColor=white)](https://business-cards.rauell.workers.dev) ![Status: live](https://img.shields.io/badge/Status-Live-2ea44f?style=for-the-badge) ![Public repository](https://img.shields.io/badge/Repo-Public-555555?style=for-the-badge&logo=github)

![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat-square&logo=typescript&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white) ![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-f38020?style=flat-square&logo=cloudflare&logoColor=white)

[Live site](https://business-cards.rauell.workers.dev) · [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md) · [Code of conduct](CODE_OF_CONDUCT.md)

</div>

---
<!-- header:end -->

A production-grade marketing site and digital-identity platform for **Alama** (`alama.africa`), built with Next.js 15 (App Router), TypeScript in strict mode, and Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

## What is built so far

- **Complete public landing page**: sticky navbar with scroll-spy, hero with interactive profile demo, social proof marquee, mission & vision ("Leave a mark") with interactive value & reforestation calculator, 3D interactive Card Studio (Walnut, Ebony, and Olive Wood finish previewer + live laser engraving), feature bento grid, how-it-works with aligned NFC tap animation, interactive product showcase, benefits, impact ledger, testimonials, pricing with plan-aware checkout configurator, FAQ, and footer.
- **Live public profile route (`/p/[username]`, e.g. `/p/wanjiru`)**: mobile-first digital identity page with working `.vcf` vCard download, interactive client briefs ("Value left for you"), reforestation badge, and lock-screen QR pass modal.
- **SEO & Legal**: `/privacy`, `/terms`, `robots.txt`, `sitemap.xml`, JSON-LD, and Open Graph metadata.

## Design system

Tokens live in `src/app/globals.css` under `@theme`:

| Token | Value | Use |
|---|---|---|
| `paper` | `#f8f5ef` | page ground: warm, never sterile grey |
| `forest` | `#12362a` | primary brand, dark sections |
| `clay` | `#b8613a` | accent, underline, emphasis |
| `brass` | `#b8912f` | detail on dark surfaces |
| `moss` | `#6f8f63` | success states, growth |
| `font-display` | Instrument Serif | headlines, italic accents |
| `font-sans` | Instrument Sans Variable | everything else |

Type is self-hosted via Fontsource with no external CDN requests and zero layout shift. Custom utilities: `container-x`, `glass`, `glass-dark`, `grain`, `text-display`, `eyebrow`, `rule`.

## Content

All copy, mission/vision statements, card finishes, prices, plans, FAQs, stats, and demo profile data live in `src/lib/site.ts`.

## Project information

| | |
|---|---|
| Live site | https://business-cards.rauell.workers.dev |
| Hosting | Cloudflare Workers |
| Default branch | `main` |
| Repository | Public |

### Stack

- Next.js 15 (App Router), React 19, TypeScript (strict), Tailwind CSS 4
- Self-hosted fonts through Fontsource

### Deployment

Production runs on Cloudflare Workers at https://business-cards.rauell.workers.dev. `.github/workflows/deploy-cloudflare.yml` builds and deploys on every push to `main`, using the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets. Public build-time values are repository variables; runtime secrets are Worker secrets.

### Contributing and security

- How to set up, test and submit changes: [CONTRIBUTING.md](CONTRIBUTING.md)
- How to report a vulnerability: [SECURITY.md](SECURITY.md)
- Expected behaviour in project spaces: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

### Licence

No open-source licence has been granted. The code, content and brand assets belong to the project owner and all rights are reserved. Ask the owner before reusing any part of this repository.
