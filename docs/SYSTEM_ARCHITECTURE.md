# System Architecture

## Two products, one platform

```
                 ┌──────────────────────────────────────────────┐
   Physical      │  Wooden NFC card  ──stores only──▶ https://   │
   layer         │  QR printed reverse              kadi.africa/p/username
                 └──────────────────────────────────────────────┘
                                      │ tap / scan
                                      ▼
                 ┌──────────────────────────────────────────────┐
   Identity      │  Public profile  (unauthenticated, mobile-1st)│
   platform      │  /p/[username]  · vCard · share · QR          │
                 └──────────────────────────────────────────────┘
                                      │ writes events
                                      ▼
                 ┌──────────────────────────────────────────────┐
   Commerce      │  Dashboard · Orders · Cards · Analytics      │
   + admin       │  /dashboard/*        /admin/*                │
                 └──────────────────────────────────────────────┘
                                      │
                                      ▼
                 Neon PostgreSQL (source of truth)
                 Upstash Redis (cache, rate limit)  ·  QStash (jobs)
                 Resend (email)  ·  Blob (uploads)  ·  PostHog · Sentry
```

**Invariant:** the card is a pointer. It resolves a card → profile mapping held in
Postgres. Profile edits never touch the card, so a lost or replaced card never
takes a customer's digital identity with it.

## Layers

| Layer | Responsibility |
|---|---|
| `app/` | Routing, layouts, server components, route handlers |
| `components/` | Presentation only — no data access |
| `server/services/` | Business rules; transaction boundaries |
| `server/repositories/` | Drizzle queries; the only place SQL lives |
| `lib/` | Pure helpers: validation, vCard, QR, formatting |
| `db/schema/` | Drizzle table definitions + relations |

Server Components read through services; mutations go through Server Actions
(UI-originated) or Route Handlers (external: M-Pesa callbacks, QR downloads).
Authorization is enforced inside the service layer, never only in the UI.

## Public profile caching

`/p/[username]` is cached at the edge with a tag per profile. Publishing a profile
calls `revalidateTag('profile:<id>')`. Fallback path when Redis is unavailable:
serve from Postgres and accept higher latency — cache is an optimization, never a
correctness dependency.

## Event model

Events are recorded as rows, not counters:

`profile_view`, `nfc_redirect`, `qr_redirect`, `contact_download`,
`phone_click`, `email_click`, `whatsapp_click`, `social_link_click`.

Dashboard metrics are aggregates over events. Classification rule: an NFC tap is
only recorded when the URL was reached from a card write (encoded marker); a
browser visit is never inferred to be a tap.

## Failure behaviour

- Payments: order state only advances on a verified server-side callback. A
  client success screen is never trusted.
- Background jobs: idempotency keys on every enqueue; retries are safe.
- Email failures never roll back an order; they are retried and logged.
