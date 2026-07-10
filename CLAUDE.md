# CLAUDE.md: Portfolio Redesign Build Guide

## Project

Rebuild Jared Ryan's personal portfolio as a static-first, recruiter-friendly, visually polished portfolio using Astro + TypeScript.

Primary repo:

```text
https://github.com/jaredryan/personal-portfolio
```

Read these two specs first and treat them as the source of truth:

```text
PRODUCT_SPEC.md
FRONTEND_SPEC.md
```

## Core Goal

Replace the current client-side React SPA portfolio with a fast static-first portfolio that demonstrates:

- Product-minded full-stack engineering
- Strong frontend judgment and interaction detail
- Recent project work
- Professional experience credibility
- Tasteful motion and visual polish
- Excellent recruiter scannability
- Crawler-readable HTML

## Non-Negotiables

1. **Do not preserve the old UI/component architecture.**
   - Use the old Experience source only as text/content input.
   - Do not imitate the prior Experience timeline implementation.
   - Do not reuse the old selected timeline behavior, MUI Timeline structure, background image section style, or icon-only navigation.

2. **Build static-first.**
   - Critical content must render as HTML.
   - Avoid hiding core content behind JS-only state.
   - Use small interactive islands only where needed.

3. **No standalone Skills section.**
   - Skills/focus areas appear as contextual pills on Experience and Project cards.

4. **No modal-overlay architecture for expanded sections.**
   - Full Experience and Projects sections should be normal page sections with anchor navigation.
   - Use `#experience` and `#projects` anchors.
   - Use query params for selected state, such as `?role=mantl#experience` and `?project=campfire#projects`.

5. **Default motion should be restrained.**
   - The only autonomous dashboard animation should be the Hero `Currently:` typewriter ticker.
   - Experience and Projects dashboard cards should change by user click/keyboard action, not auto-rotate.
   - Expanded Project detail may include a controlled screenshot carousel.
   - Respect `prefers-reduced-motion`.

6. **Accessibility matters.**
   - Use semantic HTML.
   - Maintain keyboard navigation.
   - Provide visible focus states.
   - Move focus intentionally after anchor/section navigation where useful.
   - Keep contrast WCAG-friendly.

## Design Direction

Visual identity: **Coastal Systems + Spark**.

Use the color tokens from `FRONTEND_SPEC.md`.

The feel should be:

- Calm
- Technical
- Structured
- Premium
- Lightly playful
- Human
- Fast to scan

Avoid:

- Brutalism
- Heavy 3D/game gimmicks
- Tiny low-contrast text
- Over-animated dashboard behavior
- Generic blue SaaS sameness

## Layout

Main page structure:

```text
1. Dashboard / Bento Landing
2. Full Experience Section
3. Full Projects Section
```

Dashboard:

- Three-card bento layout
- About/Hero card
- Experience preview card
- Projects preview card

## Navigation / URL State

Use anchors:

```text
#dashboard
#experience
#projects
```

Use query params for selected items:

```text
?role=mantl#experience
?project=campfire#projects
```

Build/reuse a URL state helper for selected role/project state. Do not reload the page when changing selected state.

Breadcrumb pattern:

```text
Dashboard › Experience
Dashboard › Experience › MANTL
Dashboard › Projects
Dashboard › Projects › Campfire
```

Earlier breadcrumb segments should be clickable. Current segment should be plain text or visually active.

## Placeholders / Assets

If a project screenshot or other expected asset is missing, create a visually acceptable placeholder or leave a clear TODO comment, but do not block the build.

## Known Content TODO

Experience metric chips and skill/focus pills are acceptable placeholders for v1. Jared plans to refine them later.

Do not over-optimize this copy during the build. Use the provided drafts unless something is obviously broken.

## Final QA Checklist

- No old Skills section remains.
- No old Experience implementation remains.
