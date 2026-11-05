# Kadi Africa — Reference Audit

Status: **partially complete — blocked on network access.**

## 1. What I could and could not verify

The build sandbox has outbound access to an allowlist of hosts (`github.com`,
`registry.npmjs.org`, `pypi.org` and their CDNs). `https://kadi.africa/` returned
no response (`curl` exit code `000`), so **no page of the live site was fetched,
rendered or interacted with.**

Consequently:

- I have **not** reproduced any proprietary layout, image, copy, or colour value
  from kadi.africa.
- Everything implemented in this repository is derived from the functionality
  list supplied in the project brief (wooden NFC cards, QR backup, digital
  profiles, editable profiles without reprinting, installable web app, scan
  tracking, AI paper-card scanning, 50%+ revenue to reforestation).
- The visual identity here is an **original interpretation** of that product
  ("warm editorial / Kenyan craft" direction), not a reconstruction of Kadi's.

## 2. Verified feature inventory (source: project brief)

| # | Feature | Confidence | Implemented in this phase |
|---|---|---|---|
| 1 | Wooden NFC-enabled business card | Stated in brief | Marketing representation |
| 2 | QR code fallback for non-NFC phones | Stated in brief | Marketing representation + real QR generation |
| 3 | Digital profile: phone, email, WhatsApp, company, title, website, socials | Stated in brief | Profile mock + showcase |
| 4 | Edit profile without replacing the card | Stated in brief | Core marketing claim |
| 5 | Installable web app, offline access | Stated in brief | Feature card only |
| 6 | Profile & scan tracking | Stated in brief | Feature card + showcase mock |
| 7 | AI business-card scanner (OCR), optional premium | Stated in brief | Feature card only |
| 8 | 50%+ of revenue to Kenyan reforestation | Stated in brief | Impact section |

## 3. Unverified — must be confirmed against the live site

These appear in the brief or in typical NFC-card products but were **not**
verified. They are implemented as **original product decisions**, not as claims
about Kadi:

- Exact pricing, plan names and what each tier includes.
- Delivery timelines, return and warranty policy.
- Whether Kadi supports organisational/team accounts.
- Whether Kadi's profile URLs use `/@username` or `/p/username`.
- Whether the AI scanner is bundled or a separate paid add-on.
- All social proof numbers and testimonials on the landing page.

> ⚠️ **Before launch:** replace every figure and testimonial in
> `src/lib/site.ts` with verified data, or remove it. They are marked in that
> file as illustrative demo content.

## 4. Auditing method for when network access is available

1. Fetch every internal link from the homepage; record status codes.
2. Capture each page at 390, 768, 1024 and 1440 px.
3. Extract design tokens: colours (computed styles), font stacks, radii, spacing.
4. Enumerate interactive elements: `a`, `button`, `input`, `form`, and any
   element with a click handler; record what each does.
5. Inspect network calls on interaction to identify third-party services.
6. Register a throwaway account if registration is open; walk the dashboard.
7. Tap a real card if hardware is available, and record the landing behaviour.
