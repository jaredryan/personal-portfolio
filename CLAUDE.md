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

## Locked Content

Use the locked profile, project, and experience copy from `FRONTEND_SPEC.md` / `PRODUCT_SPEC.md`.

Hero label:

```text
Product-Minded Full-Stack Engineer
```

Hero paragraphs:

```text
I build polished, practical software for messy real-world workflows — the kind where product judgment, frontend details, and reliable systems all matter.

Lately, I use AI to move faster, but I build step by step and review carefully for strong UX, clean code, and reliability.
```

Typewriter label:

```text
Currently:
```

Typewriter lines:

```text
First things first: make sure you’re building something somebody actually wants.
I love software where the flows feel obvious and natural.
When I have the energy, you’ll find me on a local hike or locked into a game on the living room chair.
When I don’t have the energy, same chair — Netflix, Webtoons, and pretending one more episode was planned.
I’m serious about clean code, but not very serious about pretending to be serious.
Somehow, even meal prep turned into a modular system of bases, sauces, vegetables, and macros.
```

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

Desktop preferred layout:

```text
Left 2/3 stacked:
  - Hero card
  - Projects preview card

Right 1/3 vertical:
  - Experience preview card
```

Mobile order:

```text
Hero
Experience Preview
Projects Preview
Full Experience
Full Projects
```

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

## Implementation Order

Follow this order unless there is a strong technical reason not to:

1. Inspect current repo and decide whether to migrate in-place or create a clean Astro structure.
2. Set up Astro + TypeScript.
3. Add `PRODUCT_SPEC.md`, `FRONTEND_SPEC.md`, and this `CLAUDE.md` to the repo root if they are not already there.
4. Create typed data files:
   - `src/data/profile.ts`
   - `src/data/projects.ts`
   - `src/data/experience.ts`
5. Add global styles and theme tokens:
   - `src/styles/tokens.css`
   - `src/styles/global.css`
6. Build base layout and page shell:
   - `src/layouts/BaseLayout.astro`
   - `src/pages/index.astro`
7. Build reusable primitives:
   - `Breadcrumbs`
   - `PillList`
   - `MetricChips`
   - Card/shell utilities as needed
8. Build Hero card and theme toggle.
9. Build Typewriter ticker island.
10. Build bento dashboard.
11. Build Experience preview and full Experience section.
12. Build Projects preview and full Projects section.
13. Add URL state handling for role/project selection.
14. Add responsive polish.
15. Add accessibility polish and reduced-motion support.
16. Run build/typecheck/lint if available.
17. Report what changed and list any TODOs.

## Placeholders / Assets

Use placeholder image paths from `FRONTEND_SPEC.md` if real screenshots are not available yet.

Expected asset paths:

```text
/public/projects/lpa-tracker/cover.png
/public/projects/lpa-tracker/01.png
/public/projects/lpa-tracker/02.png
/public/projects/lpa-tracker/03.png
...
```

Expected resume path:

```text
/public/resume/Jared_Ryan_Resume.pdf
```

If missing, create visually acceptable placeholders or leave clear TODO comments, but do not block the build.

## Known Content TODO

Experience metric chips and skill/focus pills are acceptable placeholders for v1. Jared plans to refine them later.

Do not over-optimize this copy during the build. Use the provided drafts unless something is obviously broken.

## Final QA Checklist

Before stopping, verify:

- Site builds successfully.
- Dashboard renders without JavaScript-dependent critical content.
- Hero copy and typewriter lines match the spec.
- Theme toggle works and persists.
- `#experience` and `#projects` navigation works.
- `?role=mantl#experience` initializes selected Experience state.
- `?project=campfire#projects` initializes selected Project state.
- Keyboard users can access cards, buttons, breadcrumbs, toggles, and carousels.
- Reduced-motion users do not get unnecessary animation.
- Mobile layout is readable and not overly tall before meaningful content appears.
- No old Skills section remains.
- No old Experience implementation remains.
