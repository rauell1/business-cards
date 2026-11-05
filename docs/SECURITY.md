# Security & Privacy

## Principles

1. **Deny by default.** Every route handler and server action starts unauthorized.
2. **Ownership is checked server-side**, on the row, not on the ID supplied by the client.
3. **The card never carries private data.** Its chip stores a URL only.
4. **Public profiles expose only explicitly published fields** (per-field visibility).

## Controls

| Risk | Control |
|---|---|
| IDOR | Every read/write filters by `user_id` from the session inside the repository layer |
| Privilege escalation | Role read from DB per request; admin routes re-verify server-side |
| XSS | No `dangerouslySetInnerHTML` on user data; the only usage is trusted, server-generated QR SVG |
| SQL injection | Drizzle parameterised queries only |
| CSRF | SameSite=Lax cookies + origin check on mutating actions |
| Brute force | Upstash rate limits per IP and per account on auth endpoints |
| Webhook spoofing | Signature verification + idempotency key on payment callbacks |
| Upload abuse | MIME sniffing, size cap, signed URLs, images re-encoded |
| Clickjacking | `frame-ancestors` via CSP (added in phase 2) |

## Headers already shipped

`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
`Permissions-Policy` denying camera/mic/geolocation, `poweredByHeader: false`.

## Data protection (Kenya DPA 2019)

- Analytics store no visitor names; device category and referrer host only.
- Retention: raw events 12 months, rollups 36 months.
- Export and deletion endpoints are part of phase 6.
- A processor register and lawful-basis mapping are required before launch.

## Accessibility is a security-adjacent baseline

Skip link, visible focus rings, `aria-expanded/controls` on disclosure widgets,
`role="tab"` patterns with arrow-key navigation, focus trap and Escape restore in
the mobile menu, and full `prefers-reduced-motion` support.
