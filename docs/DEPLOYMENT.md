# Deployment (Vercel + Neon)

> **Current state: never deployed.** GitHub reports `deployments: []` and zero
> check runs for `main`, so this repository has not been linked to Vercel. The
> build agent's sandbox cannot reach `api.vercel.com` and holds no Vercel token,
> so deployment must be started from the Vercel dashboard or GitHub integration —
> see §1.

## 1. Connect the repository (one-time, ~2 minutes)

1. Open <https://vercel.com/new> and sign in with the GitHub account that owns
   `rauell1/business-cards`.
2. **Import** the `rauell1/business-cards` repository.
3. Framework preset: **Next.js** (auto-detected). Leave the build command,
   output directory and install command at their defaults — Vercel runs
   `npm ci` then `next build`, which is exactly what was verified locally.
4. **Environment variables:** none are required for the marketing site. If you
   want the canonical/OG URLs to point at the production domain, add:
   - `NEXT_PUBLIC_APP_URL` = `https://kadi.africa`
5. Click **Deploy**.

Every subsequent push to `main` produces a production deployment; every pull
request gets its own preview URL automatically.

## 2. Dependency security

The initial build pinned `next@15.1.6`, which npm flags for **CVE-2025-66478**,
and that version bundled vulnerable `postcss` releases. The project has been
upgraded to **Next 16.4.5 / React 19.3.1**, and `npm audit --omit=dev` now
reports **0 vulnerabilities**.

Next 16 requires `"jsx": "react-jsx"` in `tsconfig.json` (the framework rewrites
this automatically on first build). No application code changed for the upgrade —
the app was verified serving all routes after the bump.

Re-run `npm audit --omit=dev` before every release; treat any new advisory as a
release blocker.

## 3. What Vercel will run

| Step | Command | Verified |
|---|---|---|
| Install | `npm ci` | ✅ lockfile committed, clean install passes |
| Build | `next build` | ✅ passes from a clean `git archive` of `main` |
| Output | static (`○`) for all 9 routes | ✅ no server runtime needed |

- No `process.env` reads exist in `src/`, so a missing variable cannot break the
  first build.
- `engines.node` is pinned to `>=20.9.0`.
- There is **no `vercel.json`** on purpose: the Next.js preset needs no
  overrides, and an empty config file is a common source of "build succeeded but
  nothing routed" mistakes.

## 4. Domain

1. Vercel → Project → **Settings → Domains → Add** `kadi.africa` and
   `www.kadi.africa`.
2. At your DNS provider, point the apex `A` record at Vercel's IP
   (`76.76.21.21`) and `www` `CNAME` to `cname.vercel-dns.com`. If the DNS is
   already on Cloudflare, use the values Vercel shows instead and keep the proxy
   off until the certificate is issued.
3. SSL is provisioned automatically. Update `site.url` in `src/lib/site.ts` if
   the production domain differs from `https://kadi.africa`.

## 5. Database (only when phase 4 lands)

Neon is **not** needed for the current build. When the identity engine arrives:

1. Create a Neon project and copy the **pooled** connection string.
2. Add `DATABASE_URL` (pooled) and, optionally, `DATABASE_URL_UNPOOLED` for
   migrations, in Vercel → Settings → Environment Variables for Production and
   Preview separately.
3. Run migrations from CI or a workstation — never automatically against
   production during a deploy. Use `drizzle-kit migrate` against the unpooled
   URL.

## 6. Deployment checklist

- [ ] Repository imported in Vercel
- [ ] First production deployment green
- [ ] `npm audit --omit=dev` clean (currently 0 vulnerabilities)
- [ ] `NEXT_PUBLIC_APP_URL` set to the production origin
- [ ] Custom domain attached, SSL issued
- [ ] `robots.txt` and `sitemap.xml` resolve on the production domain
- [ ] Preview deployments enabled for pull requests
- [ ] Neon project created (phase 4+)
- [ ] Sentry DSN added (phase 4+)

## 7. Rollback

Vercel keeps every deployment immutable. To roll back, open **Deployments**,
select the last known-good build and choose **Promote to Production**. No
rebuild occurs, so rollback is instantaneous and does not depend on the repo
state.
