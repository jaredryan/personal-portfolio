# Production Readiness Audit

Read-only final production and professional-readiness audit for the `claudeRevamp` branch of `jaredryan/personal-portfolio`, an Astro static portfolio hosted on Netlify. Findings are evidence-based, derived from direct inspection of the repository, live production headers (`curl -I https://jaredryan.netlify.app/`), `npm audit`/`npm outdated`, GitHub repo/branch metadata (`gh`), and a browser check (Playwright/Chromium) of the Hero layout at representative viewport sizes.

Audit date: 2026-07-22/23.

## 1. Overall Verdict

The site is technically solid and close to recruiter-ready. Nothing found is a functional blocker — the build is clean, no PII/secrets are exposed, there's no tracking to worry about, and 404/canonical/redirect behavior on production all check out correctly. The real gaps are: **zero HTTP security headers beyond Netlify's default HSTS**, **no README/LICENSE on a repo that is already public**, **all assets (including content-hashed `/_astro/*` files) served with `max-age=0`**, and **two real npm vulnerabilities** (one in prod, one dev-only). The phone-landscape typography issue is real but only reproducible on actual WebKit/iOS — it's root-caused here from the code, not from a matching screenshot.

## 2. Already Complete

- Custom 404 returns a true HTTP 404 (verified live), not a soft-404.
- Trailing-slash redirects (`/experience` → `/experience/`, 301) are consistent with canonical/OG URLs — no mismatch.
- HSTS already applied by Netlify (`max-age=31536000; includeSubDomains; preload`) — nothing to add here.
- Deploy previews already get `X-Robots-Tag: noindex` automatically from Netlify — branch/preview indexing is safe as-is.
- Dependabot is active (3 merged dependency-bump PRs in history) even with no committed `dependabot.yml` — GitHub's repo-level automatic security/version updates are doing this.
- No source maps shipped in `dist/` (0 `.map` files).
- No forms, no analytics, no cookies, no tracking scripts anywhere in `src/`. `localStorage` is used only for theme preference; `sessionStorage` only for a one-time entrance-animation flag. Neither collects or transmits anything.
- Game iframes are genuinely demand-loaded (`src` only set on Play click) and torn down on close (`src=""`), confirmed in `ProjectCarousel.astro`.
- `robots.txt` / sitemap / canonical / JSON-LD all point at the same consistent origin.

## 3. Must Fix Before Presenting Professionally

**a. No README or LICENSE — and the repo is already public**, not "may eventually be." (`gh repo view` confirms `isPrivate: false`, description is just "My personal website", no topics, no license.) A recruiter clicking through today sees an undocumented repo. Smallest credible pass:
- README with: 1-paragraph purpose, live link, one screenshot, stack (Astro + TS, Lightning CSS, vitest), local setup (`npm install`, `npm run dev`), build/test commands, deploy notes (Netlify, static), a short accessibility/design-system callout.
- A LICENSE (MIT is the norm for a portfolio) or an explicit "all rights reserved, code shown for demonstration" note if you'd rather not let people copy the design outright.
- Set the repo description/topics on GitHub (`astro`, `typescript`, `portfolio`).

**b. Two real npm vulnerabilities**, one of which is production-relevant:
- `astro` (moderate, direct dependency): reflected XSS via unescaped View Transition animation properties, fixed in 7.1.x. You're on `^7.0.6`; `npm outdated` shows 7.1.3 available. This site doesn't use View Transitions today (worth confirming), but it's a one-line semver-compatible bump (`npm install astro@latest`) with a fix already available — no reason to leave it.
- `svgo` (high): only reachable through `@iconify/tools`/icon build tooling, dev-only, never shipped to the browser. No production exposure — do not treat this as urgent, but a `npm audit fix` (or waiting for the iconify toolchain to bump its svgo pin) would silence it without a disruptive upgrade.

**c. Zero HTTP security headers configured** beyond what Netlify auto-adds. Right now `curl -I` on the live site shows only `strict-transport-security` — no CSP, no `X-Content-Type-Options`, no `Referrer-Policy`, no `Permissions-Policy`, no `X-Frame-Options`/`frame-ancestors`. For a portfolio this isn't exploitable today (no forms, no user input, no auth), but shipping literally no headers reads as an oversight on a site meant to demonstrate engineering judgment. See exact proposed policy below — recommend the safe/staged version, not a blind full CSP.

**d. All assets get `Cache-Control: public, max-age=0, must-revalidate`** — including content-hashed, immutable-by-design files like `/_astro/index.CqW6zT-O.css` (confirmed live via `curl -I`). Since Astro fingerprints these filenames on every content change, there is zero risk in caching them forever; right now every repeat visitor re-validates every JS/CSS file on every load for no reason. This is a free win.

## 4. Worthwhile But Optional

- **CSP in Report-Only mode first.** Origins actually needed, derived from the code:
  - `frame-src`: `https://whenbunniesattack.netlify.app https://snackattackgame.netlify.app` (the two `playableEmbedUrl` values in `src/data/projects.ts` — the Unity roguelike deliberately has no embed, so no `play.unity.com` needed).
  - `script-src`/`style-src`: Astro emits inline `<script is:inline>` (theme flip) and component `<script>`/`<style>` blocks compiled to hashed external files by Lightning CSS/Vite, plus one inline JSON-LD script. A blind `'unsafe-inline'`-free policy would break the inline theme script; either hash/nonce it or scope `'unsafe-inline'` to `script-src` only as an interim, staged step.
  - `font-src`/`img-src 'self'`: fonts are local `@fontsource-variable` packages (no Google Fonts CDN), all images/icons are same-origin — so `'self'` covers both with no external font/image origins to allow.
  - `frame-ancestors 'self'`: distinct from `frame-src` — this controls who can iframe *your* site (nobody currently does, so `'self'` or `'none'` is safe and doesn't affect your own game embeds, which are things *you* iframe, not the reverse).
  - Recommended concrete `netlify.toml` block:
    ```toml
    [[headers]]
      for = "/*"
      [headers.values]
        X-Content-Type-Options = "nosniff"
        Referrer-Policy = "strict-origin-when-cross-origin"
        Permissions-Policy = "camera=(), microphone=(), geolocation=()"
        X-Frame-Options = "SAMEORIGIN"
        Content-Security-Policy-Report-Only = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; frame-src https://whenbunniesattack.netlify.app https://snackattackgame.netlify.app; frame-ancestors 'self'; base-uri 'self'"

    [[headers]]
      for = "/_astro/*"
      [headers.values]
        Cache-Control = "public, max-age=31536000, immutable"
    ```
    Run the CSP as `-Report-Only` for a deploy or two, check the browser console for violations, then flip to enforcing `Content-Security-Policy` once clean. Don't cap `Permissions-Policy` beyond what's listed unless you confirm nothing else needs those APIs.
- **Explicit Node version pin.** `package.json` has `engines.node: >=22.12.0`, but there's no `.nvmrc`/`.node-version` and `netlify.toml` doesn't set `NODE_VERSION` — Netlify is inferring it. Cheap insurance against a future Netlify build-image default shift; add a `.nvmrc` with `22.12.0`.
- **Run tests in the Netlify build**, not just locally. `npm run build` = `astro check && astro build` — vitest never runs as a deploy gate. Changing the build script to `astro check && vitest run && astro build` (or a Netlify `[build.processing]`/plugin step) would catch regressions before they ship, given tests already exist (`experience.test.ts`, `projects.test.ts`, `urlState.test.ts`, etc.).
- **Branch protection.** `master` has no protection rules (`gh api .../protection` → 404), so the passing Netlify deploy-preview check on PRs is informational only — nothing currently blocks a merge without it. Given this is a solo-maintainer repo, this is optional, but a one-click "require status checks to pass" rule costs nothing.
- **Custom domain.** Currently `jaredryan.netlify.app` end-to-end (astro.config `site`, canonical, sitemap, robots, OG). A `jaredryan.dev`-style domain is a real professional signal for a portfolio but is pure polish — flagging only because it touches nearly every "already complete" SEO item if you ever do it (all of them would need the `site:` URL updated in one place).

## 5. Do Not Add / Unnecessary

Service workers, analytics, a blog, llms.txt, giant schema graphs, security.txt, terms/privacy pages — none of these are warranted, and nothing in the current architecture (no forms, no data collection, no auth) changes that. A privacy policy specifically has **no present need**: there is no analytics, no cookie, no form, no localStorage/sessionStorage use beyond theme + one-time animation-state, and no third-party script other than the two opt-in game iframes (which don't run until clicked). Re-evaluate only if analytics, a contact form, or real user accounts get added later.

## 6. Exact Recommended Implementation Order

1. Bump `astro` to 7.1.x (`npm install astro@latest`), re-run `npm run test` and `npm run build`, confirm no regressions.
2. Add the `netlify.toml` headers block above in `Report-Only` CSP mode + the `/_astro/*` immutable cache rule (bundled together since both are one file, zero behavior risk).
3. Write the README + add a LICENSE, since the repo is already public today.
4. Add `.nvmrc` (22.12.0).
5. Watch CSP report-only violations for a deploy or two, then flip to enforcing.
6. Wire `vitest run` into the build script.
7. Diagnose/fix the phone-landscape Hero typography (needs a real WebKit device or BrowserStack — see below; Chromium can't reproduce it).
8. Optional: branch protection rule, custom domain, `npm audit fix` for the dev-only svgo advisory.

## 7. Files/Configuration Likely Involved

- `netlify.toml` — headers, cache rules, possibly explicit `NODE_VERSION`.
- `package.json` — bump `astro`, change `build` script to include `vitest run`.
- New: `README.md`, `LICENSE`, `.nvmrc`.
- `src/styles/global.css` / `src/components/HeroCard.astro` — landscape typography fix (see below).
- GitHub repo settings (description/topics, branch protection) — not files, but part of the "public repo readiness" pass.

## 8. Phone-Landscape Hero Typography — Findings and Open Question

Could not visually reproduce the exact symptom: the only browser engine available for this audit was Chromium (confirmed via `navigator.userAgent` at 844×390 viewport), and Chromium doesn't implement iOS Safari's automatic text-size-adjust inflation, so a Chromium screenshot at iPhone-landscape dimensions shows nothing wrong.

What the code directly confirms:
- **No `text-size-adjust` (or `-webkit-text-size-adjust`) reset exists anywhere in the codebase** (`grep` across `src/` returns nothing). This is the standard root cause for exactly this symptom: WebKit's automatic font-boosting heuristic, which inflates paragraph text based on the block's column width relative to the viewport, and it is unconstrained here.
- `.hero-card__paragraph` and `.experience-detail-content__oneliner` (the Experience one-liner referenced in the original brief) both currently render at an **identical, unstyled inherited 16px/1rem** — confirmed via computed styles in-browser. Neither sets its own `font-size`. So any size difference seen on-device is not coming from authored CSS diverging between the two — it's the rendering engine applying different boost amounts to each, most likely because the Hero paragraph sits in a proportionally wider text column (the full-width Hero card) than the Experience one-liner does, and WebKit's heuristic is driven by that column-width-vs-viewport-width ratio, not by any breakpoint written in the CSS.
- The `html { font-size: 110% }` "spacious" rule (`global.css:17`) requires **both** `min-width: 760px` **and** `min-height: 850px` — a landscape phone never satisfies the height half, so that rule is not the culprit.

**Recommended narrow fix** (not applied — read-only audit): add `-webkit-text-size-adjust: 100%; text-size-adjust: 100%;` scoped to `.hero-card__paragraph` (and optionally `.experience-detail-content__oneliner` for the same protection), not globally on `html`/`body`. This disables WebKit's *automatic* font-boost heuristic only — it does not disable pinch-to-zoom or user-controlled text scaling (that's `user-scalable`/`maximum-scale` in the viewport meta, left untouched here), so it doesn't conflict with the instruction against disabling user text scaling. If the paragraph still reads oversized after that (i.e., it wasn't autosizing but something else), the next lever would be a combined `@media (orientation: landscape) and (max-height: 500px)` rule shrinking just `.hero-card__paragraph`, leaving `h1`/`.hero-card__role` untouched.

**Open question:** confirm the diagnosis on an actual iPhone or a WebKit-based testing service (BrowserStack, an Xcode Simulator, or a real device) before/after applying the fix — this diagnosis is confident but unverified against real WebKit rendering.
