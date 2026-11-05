# Alama Identity: wooden NFC business cards

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
