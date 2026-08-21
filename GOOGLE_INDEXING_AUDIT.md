# Google Indexing Audit — /projects & /profile not indexed

**Date:** 2026-08-21
**Scope:** Read-only audit of source (`main` branch) + live production (`https://jaredryan.netlify.app/`). No code changes made.

## Verdict

**No indexing-blocking bug found.** Sitemap, canonical tags, robots.txt, and internal linking are all internally consistent and correct as of this audit. There is one **real but non-blocking** technical issue (an avoidable redirect hop on every internal link — see Finding 1), which is the most plausible explanation for *why Google indexed `/`, `/experience`, and `/experience/` as separate entries* while `/projects` and `/profile` remain undiscovered. The most likely primary cause of the `/projects` / `/profile` gap itself is **Google discovery/crawl-budget lag**, not a site defect — nothing found here would prevent Google from indexing those pages once it crawls the sitemap again.

## Findings

### 1. Internal links point to the non-canonical (no-trailing-slash) URL, which 301-redirects — real, fixable, likely root cause of the "two /experience entries" symptom

Confirmed live via `curl`:

| Request | Status | Location header |
|---|---|---|
| `GET /experience` | **301** | `/experience/` |
| `GET /projects` | **301** | `/projects/` |
| `GET /profile` | **301** | `/profile/` |
| `GET /experience/` | 200 | — |
| `GET /projects/` | 200 | — |
| `GET /profile/` | 200 | — |
| `GET /` | 200 | — |

This redirect is **not** an explicit rule — there is no `_redirects` file and `netlify.toml` defines no `[[redirects]]`. It's Netlify's default static-asset behavior: since Astro emits `dist/experience/index.html` (a directory, not a `.html` sibling file), Netlify auto-redirects the bare path to the directory path.

But every internal `<a href>` in the codebase points to the **bare, no-slash form**:

```
src/components/ExperiencePreview.astro:27  href="/experience"
src/components/ExperiencePreview.astro:64  href="/experience"
src/components/HeroCard.astro:27           href="/profile"
src/components/ProfileSection.astro:262    href="/projects"
src/components/ProfileSection.astro:263    href="/experience"
src/components/ProjectsPreview.astro:20    href="/projects"
```

So every crawl path Google would use to *discover* `/projects` and `/profile` from an already-indexed page (`/` → `/profile`, `/` → `/projects`, `/experience` → `/projects`, etc.) requires following a 301 first. Googlebot does follow 301s, but it's an extra round-trip per discovery edge, and it's also almost certainly why `/experience` and `/experience/` show up in Search Console as two distinct entries: Google encountered both the redirect source (linked internally, everywhere) and the redirect target (sitemap, canonical tag) as two different URLs at different times.

`astro.config.mjs` also never sets `trailingSlash`, so this is happening only via Netlify's implicit default, not a declared Astro routing decision — nothing in the build enforces or documents which form is canonical.

**Fix (not applied — audit is read-only):** either set `trailingSlash: 'always'` in `astro.config.mjs` and update the six `href`s above to include the trailing slash, or set `trailingSlash: 'never'` and add an explicit Netlify redirect rule the other direction. Given the sitemap/canonical already standardize on trailing-slash, `'always'` + fixing the hrefs is the smaller change.

### 2. Sitemap — correct, no duplicates, matches canonical form

Live `sitemap-index.xml` → `sitemap-0.xml`:

```
https://jaredryan.netlify.app/
https://jaredryan.netlify.app/experience/
https://jaredryan.netlify.app/profile/
https://jaredryan.netlify.app/projects/
```

All four expected URLs present, exactly once each, all trailing-slash form, `/404` correctly excluded via the `filter` in `astro.config.mjs`. This matches the memory note that the sitemap was accepted by Google on 2026-07-11 — `/projects/` and `/profile/` were submitted then, same as `/` and `/experience/`.

### 3. Canonical tags — correct on every route, self-referencing to the final (post-redirect) URL

`BaseLayout.astro:18`: `canonicalURL = new URL(Astro.url.pathname, Astro.site)`.

Verified live on all four 200 responses:

| URL | `<link rel="canonical">` |
|---|---|
| `/` | `https://jaredryan.netlify.app/` |
| `/experience/` | `https://jaredryan.netlify.app/experience/` |
| `/projects/` | `https://jaredryan.netlify.app/projects/` |
| `/profile/` | `https://jaredryan.netlify.app/profile/` |

No canonical points at `/` or `/experience` from another page. Because the redirect in Finding 1 happens before Astro ever renders a response (Netlify's edge does it), there is no live case where a 200 page ships a canonical tag for the wrong URL — the self-referencing logic is only ever evaluated on the already-normalized trailing-slash URL.

### 4. Indexing directives — nothing blocking

- `robots.txt` (both `public/robots.txt` and live): `Allow: /` for all user agents, sitemap URL listed correctly. No disallow rules anywhere, no per-route exceptions.
- No `<meta name="robots">` tag exists anywhere in the codebase or rendered output (confirmed via source grep and live HTML fetch) — absence means the default `index,follow`, which is correct.
- No `X-Robots-Tag` response header on any route (checked `/`, `/experience/`, `/projects/`, `/profile/` — header absent on all).
- `netlify.toml` headers block only sets CSP/security headers (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, CSP-Report-Only) — nothing indexing-related, nothing route-scoped that would differentiate `/projects`/`/profile` from `/experience`.
- This matches the Search Console "Live URL test" results the user already ran — both pages report as available/indexable.

### 5. Internal links — reachable via plain crawlable HTML, no JS required

Confirmed via static HTML fetch (no JS execution):

- `/` (homepage) contains plain `<a href="/profile">` and `<a href="/projects">` inside `HeroCard.astro` / `ProjectsPreview.astro` output — both already-indexed-adjacent (homepage is indexed).
- `/experience/` contains `<a href="/profile">` and `<a href="/projects">` in its own nav.
- `/projects/` contains `<a href="/profile">` and `<a href="/experience">`.

No component uses a `client:*` Astro directive — `HeroCard`, `ExperiencePreview`, `ProjectsPreview`, `ProfileSection` all render fully server-side. There is no client-side-only navigation gating discovery of these routes; a crawler reading raw HTML (no JS execution) reaches both `/projects` and `/profile` from the homepage alone.

### 6. Astro / Netlify config — summary

- `astro.config.mjs`: `site: 'https://jaredryan.netlify.app'` (correct, matches canonical/sitemap host), `@astrojs/sitemap` integration active with a 404 filter, **no `trailingSlash` set** (see Finding 1).
- `netlify.toml`: build command/publish dir standard; no `[[redirects]]` block; no `_redirects` file exists anywhere in the repo. The no-slash → slash 301 is entirely Netlify's implicit default for directory-style static output, not a declared rule.
- No route-specific Netlify config (headers, redirects, or edge functions) differentiates `/projects` or `/profile` from `/experience` in any way that would explain a discoverability gap.

## Answers to the specific questions asked

**Why can Google treat `/experience` and `/experience/` as two separately indexed pages?**
Because every internal link across the site points at the bare `/experience` form, which currently 301-redirects to `/experience/` (the sitemap/canonical form). Google can encounter and record both the linked-to redirect source and the canonical redirect target as distinct URLs, especially across different crawl passes. This is a real, fixable inconsistency (Finding 1), even though it isn't currently producing a live 200/200 duplicate-canonical bug.

**Is there a real canonical/trailing-slash/sitemap inconsistency?**
Partially. The *sitemap and canonical tags* are internally consistent with each other (both always use the trailing-slash form). The inconsistency is that *internal `<a href>` links* don't match that form and rely on an undeclared, implicit Netlify redirect to reconcile the difference.

**Is there anything technically preventing or weakening discovery of `/projects` and `/profile`?**
No hard blocker found — robots.txt, meta robots, `X-Robots-Tag`, sitemap presence, and canonical tags are all correct for both routes, matching Search Console's own "available and can be indexed" Live URL Test result. The one weakening factor is Finding 1: discovery of these two pages via internal links always requires following a redirect hop rather than landing directly on the indexable URL.

**Or is this most likely a Google crawling/discovery issue rather than a site implementation problem?**
Most likely yes, for the primary symptom (`/projects` and `/profile` fully "unknown to Google" with zero recorded crawls). All indexing-relevant signals for those two routes are correct and match what already got `/` and `/experience/` indexed via the same sitemap on the same day (2026-07-11, per prior session notes). The gap looks like crawl-budget/discovery timing on Google's side — compounded by the Request Indexing quota block preventing a manual nudge — rather than a technical defect specific to `/projects`/`/profile`. Fixing Finding 1 is still worth doing since it removes a real inconsistency and a redirect hop from the two internal-discovery paths, but it is not "the bug" for the missing-crawl symptom by itself.

## Not investigated (out of scope / requires owner action)

- Exact historical timeline of when `/experience` vs `/experience/` were each first crawled — would need `git log` on route file creation dates and Search Console's raw crawl history, neither pulled in this pass (git-history inspection is owner-run per this repo's CLAUDE.md policy).
- Whether Google's index actually recognizes the 301 as permanent yet (can take multiple crawl cycles to consolidate signals once discovered).
