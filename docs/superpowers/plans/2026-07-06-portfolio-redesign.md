# Portfolio Redesign (Astro Rebuild) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild jaredryan/personal-portfolio from an empty repo (only `CLAUDE.md`, `PRODUCT_SPEC.md`, `FRONTEND_SPEC.md` currently exist) into a static-first Astro + TypeScript single-page portfolio with a 3-card bento dashboard, full Experience and Projects sections, URL-driven selection state, light/dark theming, and a typewriter hero ticker.

**Architecture:** Astro renders all content as static HTML at build time (no SSR, no UI framework). Interactivity is vanilla TypeScript embedded in `<script>` tags inside `.astro` components — Astro bundles these per-component, and since every component in this plan renders exactly once on the page, there is no multi-instance hydration to worry about. Cross-component coordination (a click in the dashboard "Experience preview" card must update the full Experience section elsewhere on the same page, and vice versa) is done through one small event-delegation module, `src/utils/sectionNav.ts`, plus `src/utils/urlState.ts` for reading/writing the `?role=`/`?project=` query params and hash without a page reload. Full Projects/Experience sections pre-render **all** grid/detail markup at build time (crawler-readable, static-first) and toggle visibility client-side rather than fetching or re-rendering.

**Tech Stack:** Astro latest stable + TypeScript (strict), plain CSS with custom properties, Vitest, Netlify.

## Global Constraints

- Astro + TypeScript only. No React/Vue/Svelte/Tailwind — "Avoid bringing in a full UI framework unless necessary" (FRONTEND_SPEC §2).
- Do not preserve or imitate the old React SPA, old Experience UI/timeline, old Skills section, or hamburger-hidden contact links (CLAUDE.md Non-Negotiables §1).
- No standalone Skills section; skills/focus appear only as pills on Experience/Project entries (CLAUDE.md §3).
- No modal overlays for expanded sections — use normal page sections + anchors (`#dashboard`, `#experience`, `#projects`) + breadcrumbs (CLAUDE.md §4).
- Only autonomous motion allowed on the dashboard is the hero `Currently:` typewriter. Experience/Projects preview cards change only on user action. The expanded Project detail carousel may auto-rotate but only while it is the currently-visible selected project's carousel — carousels for non-visible projects must stay paused, not silently advancing in the background — and it must still pause on hover/focus and respect `prefers-reduced-motion` (CLAUDE.md §5, PRODUCT_SPEC §6.6).
- Selecting a role/project updates `?role=`/`?project=` + hash via `history.pushState`/`replaceState` — never a full page reload (PRODUCT_SPEC §7, FRONTEND_SPEC §9).
- Semantic HTML, visible focus states, keyboard access, intentional focus movement after navigation, `prefers-reduced-motion` support throughout (CLAUDE.md §6).
- Locked copy (hero label/paragraphs, typewriter label/lines, project/experience content) must be copied verbatim from PRODUCT_SPEC.md §§3, 9, 10, 11 and FRONTEND_SPEC.md §5 — do not rewrite or "improve" it.
- Theme init priority (checked in this order): 1) a saved `localStorage` preference if one exists, 2) else the OS/browser `prefers-color-scheme: dark` media query, 3) else light. Visible toggle persists manual choices to `localStorage`, and an anti-FOUC inline script in `<head>` applies this before first paint. Token values exactly as listed in PRODUCT_SPEC.md §8 / FRONTEND_SPEC.md §6.
- Latest stable versions: this is a fresh scaffold on an empty branch, so install the latest stable release of Astro, TypeScript, Vitest, jsdom, and `@astrojs/check` at implementation time rather than pinning the versions drafted in this plan. Do not intentionally downgrade unless a concrete incompatibility is found (note it inline in `package.json` if so).
- Do not guess/invent real URLs (final domain, LinkedIn URL). Where the spec has a placeholder and no real value is known, leave a clearly marked `TODO:` comment rather than inventing one. Known real value: contact email is `jryantennis@gmail.com` (from user context) — use it directly instead of the spec's placeholder.

---

## File Structure

```text
astro.config.mjs
netlify.toml
package.json
tsconfig.json
vitest.config.ts
public/
  favicon.svg
  resume/
    Jared_Ryan_Resume.pdf          (placeholder — TODO real resume)
  projects/
    lpa-tracker/{cover,01,02,03}.svg
    campfire/{cover,01,02,03}.svg
    unity-roguelike/{cover,01,02,03}.svg
    nest-invaders/{cover,01,02,03}.svg
    when-bunnies-attack/{cover,01,02,03}.svg
src/
  data/
    profile.ts
    projects.ts
    experience.ts
    profile.test.ts
    projects.test.ts
    experience.test.ts
  styles/
    tokens.css
    global.css
  layouts/
    BaseLayout.astro
  components/
    Breadcrumbs.astro
    PillList.astro
    MetricChips.astro
    ThemeToggle.astro
    TypewriterTicker.astro
    HeroCard.astro
    ExperiencePreview.astro
    ProjectsPreview.astro
    BentoDashboard.astro
    ProjectCarousel.astro
    ProjectsSection.astro
    ExperienceSection.astro
  pages/
    index.astro
  utils/
    urlState.ts
    urlState.test.ts
    focus.ts
    sectionNav.ts
```

---

### Task 1: Astro + TypeScript project scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `astro.config.mjs`
- Create: `netlify.toml`
- Create: `.gitignore`
- Create: `vitest.config.ts`
- Create: `src/pages/index.astro` (placeholder, replaced in Task 2)
- Create: `src/env.d.ts`

**Interfaces:**
- Produces: `npm run dev`, `npm run build`, `npm run test`, `npm run check` scripts every later task relies on.

- [ ] **Step 1: Scaffold Astro with the latest stable release**

Do not hand-write `package.json` with pinned versions — this is a fresh repo, so pull whatever is current at implementation time:

```bash
npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git --skip-houston
```

Expected: `package.json`, `tsconfig.json`, `astro.config.mjs`, `src/pages/index.astro`, `src/env.d.ts` are generated with the latest stable Astro version (do not manually edit the version string afterward — leave whatever `npm create astro@latest` wrote).

- [ ] **Step 2: Add the test toolchain and scripts at latest stable versions**

```bash
npm install -D vitest@latest jsdom@latest @astrojs/check@latest
```

Then edit the generated `package.json` `scripts` block only (leave the `dependencies`/`devDependencies` version strings exactly as installed):

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run"
  }
}
```

Confirm `tsconfig.json` (generated by the `--typescript strict` flag above) extends `astro/tsconfigs/strict`. If it doesn't, set it manually:

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 3: Confirm `astro.config.mjs` leaves `site` unset**

`npm create astro@latest` generates a minimal `astro.config.mjs`. Confirm it does not set a `site` value, and add this comment above the `defineConfig` call so the omission reads as intentional rather than forgotten:

```js
import { defineConfig } from "astro/config";

// `site` is left unset until the final production domain is known
// (FRONTEND_SPEC.md §11: "Canonical URL once final domain is known").
export default defineConfig({});
```

- [ ] **Step 4: Create `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

- [ ] **Step 5: Confirm `.gitignore`**

`npm create astro@latest` generates a `.gitignore` already covering `node_modules/`, `dist/`, and `.astro/`. Confirm it also excludes `.vscode/` and `*.log`; append them if missing.

- [ ] **Step 6: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 7: Confirm `src/env.d.ts` exists**

`npm create astro@latest` generates this file already. Confirm its contents:

```ts
/// <reference types="astro/client" />
```

- [ ] **Step 8: Replace the generated placeholder `src/pages/index.astro`**

The `minimal` template ships its own sample homepage. Replace it with a bare placeholder (Task 2 wires in the real layout):

```astro
---
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Jared Ryan</title>
  </head>
  <body>
    <p>Scaffold OK — replaced in Task 2.</p>
  </body>
</html>
```

Also delete any sample assets the template scaffolded that this project doesn't use (e.g. a template `favicon.svg` under `public/` or a sample `src/assets/` directory) — Task 2 adds this project's own favicon.

- [ ] **Step 9: Install dependencies and verify the scaffold builds**

Run: `npm install && npm run build`
Expected: Build completes, `dist/index.html` exists, no TypeScript errors. Run `npm ls astro typescript vitest jsdom @astrojs/check` and note the resolved versions in the Task 1 commit message trailer (e.g. `astro@5.x.x`) so it's traceable which "latest" was actually installed.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro + TypeScript project with latest stable dependencies"
```

---

### Task 2: Design tokens, global styles, and BaseLayout

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: CSS custom properties (`--color-bg`, `--color-surface`, `--color-surface-alt`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-primary`, `--color-accent-teal`, `--color-accent-coral`, `--color-accent-sand`, plus `--space-*`, `--radius-*`, `--font-sans`, `--shadow-card`, `--focus-ring`) that every later component's `<style>` block uses.
- Produces: `BaseLayout.astro` with `interface Props { title: string; description: string; ogImage?: string; structuredData?: Record<string, unknown> }`, consumed by `src/pages/index.astro` in Task 11.

- [ ] **Step 1: Create `src/styles/tokens.css`**

```css
:root {
  /* Light theme (default) — PRODUCT_SPEC.md §8 */
  --color-bg: #F7FAF8;
  --color-surface: #FFFFFF;
  --color-surface-alt: #EEF6F8;
  --color-text: #102033;
  --color-text-muted: #526173;
  --color-border: #D7E3EA;

  --color-primary: #2563EB;
  --color-accent-teal: #14B8A6;
  --color-accent-coral: #F9735B;
  --color-accent-sand: #F3C98B;

  --font-sans: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-7: 1.75rem;
  --space-8: 2rem;
  --space-12: 3rem;

  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;

  --shadow-card: 0 1px 2px rgba(16, 32, 51, 0.06), 0 8px 24px rgba(16, 32, 51, 0.08);
  --focus-ring: 0 0 0 3px color-mix(in srgb, var(--color-accent-teal) 55%, transparent);
}

[data-theme="dark"] {
  --color-bg: #07111F;
  --color-surface: #0D1B2E;
  --color-surface-alt: #10243A;
  --color-text: #EAF2FF;
  --color-text-muted: #9FB3C8;
  --color-border: #22364F;

  --color-primary: #60A5FA;
  --color-accent-teal: #2DD4BF;
  --color-accent-coral: #FB7A68;
  --color-accent-sand: #E5B96B;

  --shadow-card: 0 1px 2px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.35);
}
```

- [ ] **Step 2: Create `src/styles/global.css`**

```css
@import "./tokens.css";

*, *::before, *::after {
  box-sizing: border-box;
}

/*
 * color-scheme is set per-theme (not `light dark` on <html>) so browser-native
 * controls (scrollbars, form controls, etc.) always match the theme actually
 * applied via `data-theme`, not just the OS preference.
 */
:root {
  color-scheme: light;
}

[data-theme="dark"] {
  color-scheme: dark;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

main {
  display: block;
}

h1, h2, h3, h4 {
  line-height: 1.2;
  margin: 0;
}

p {
  margin: 0;
  max-width: 62ch;
}

a {
  color: var(--color-primary);
}

img {
  max-width: 100%;
  display: block;
}

button {
  font: inherit;
  color: inherit;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
  border-radius: var(--radius-sm);
}

section[id] {
  scroll-margin-top: var(--space-8);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: var(--space-4);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2b: Create placeholder favicon `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#2563EB"/>
  <text x="16" y="21" font-family="sans-serif" font-size="16" fill="#FFFFFF" text-anchor="middle">JR</text>
</svg>
```

- [ ] **Step 3: Create `src/layouts/BaseLayout.astro`**

```astro
---
import "../styles/global.css";

interface Props {
  title: string;
  description: string;
  ogImage?: string;
  structuredData?: Record<string, unknown>;
}

const { title, description, ogImage, structuredData } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {ogImage && <meta property="og:image" content={ogImage} />}

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {ogImage && <meta name="twitter:image" content={ogImage} />}

    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

    {structuredData && (
      <script type="application/ld+json" set:html={JSON.stringify(structuredData)} />
    )}

    <script is:inline>
      // Theme priority, checked in order: 1) saved localStorage preference,
      // 2) OS/browser prefers-color-scheme: dark, 3) light. Runs synchronously
      // before first paint to avoid a flash of the wrong theme.
      (function () {
        try {
          var stored = localStorage.getItem("theme");
          var theme = stored === "light" || stored === "dark"
            ? stored
            : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
          document.documentElement.setAttribute("data-theme", theme);
        } catch (e) {
          document.documentElement.setAttribute("data-theme", "light");
        }
      })();
    </script>
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 4: Point `src/pages/index.astro` at the layout**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---
<BaseLayout
  title="Jared Ryan | Product-Minded Full-Stack Engineer"
  description="I build polished, practical software for messy real-world workflows — the kind where product judgment, frontend details, and reliable systems all matter."
>
  <main class="container">
    <p>Layout OK — dashboard added in Task 11.</p>
  </main>
</BaseLayout>
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: Build succeeds; open `dist/index.html` and confirm `<html data-theme` is set by the inline script when previewed in a browser (`npm run preview`).

- [ ] **Step 6: Commit**

```bash
git add src/styles src/layouts src/pages/index.astro public/favicon.svg
git commit -m "feat: add design tokens, global styles, and BaseLayout"
```

---

### Task 3: Typed data files (profile, projects, experience)

**Files:**
- Create: `src/data/profile.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/experience.ts`
- Test: `src/data/profile.test.ts`
- Test: `src/data/projects.test.ts`
- Test: `src/data/experience.test.ts`

**Interfaces:**
- Produces: `Profile`, `Project`, `ProjectLink`, `ExperienceEntry` types and `profile`, `projects`, `experience` values imported by every component from Task 6 onward.

- [ ] **Step 1: Write failing test for `profile.ts`**

```ts
// src/data/profile.test.ts
import { describe, expect, it } from "vitest";
import { profile } from "./profile";

describe("profile", () => {
  it("has locked hero copy and contact links", () => {
    expect(profile.name).toBe("Jared Ryan");
    expect(profile.role).toBe("Product-Minded Full-Stack Engineer");
    expect(profile.heroParagraphs).toHaveLength(2);
    expect(profile.currentlyLabel).toBe("Currently:");
    expect(profile.currentlyLines).toHaveLength(6);
    expect(profile.links.email).toBe("mailto:jryantennis@gmail.com");
    expect(profile.links.github).toBe("https://github.com/jaredryan");
    expect(profile.links.resume.startsWith("/resume/")).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/data/profile.test.ts`
Expected: FAIL — `Cannot find module './profile'`.

- [ ] **Step 3: Implement `src/data/profile.ts`**

```ts
export type Profile = {
  name: string;
  role: string;
  heroParagraphs: string[];
  links: {
    resume: string;
    email: string;
    github: string;
    linkedin: string;
  };
  currentlyLabel: string;
  currentlyLines: string[];
};

export const profile: Profile = {
  name: "Jared Ryan",
  role: "Product-Minded Full-Stack Engineer",
  heroParagraphs: [
    "I build polished, practical software for messy real-world workflows — the kind where product judgment, frontend details, and reliable systems all matter.",
    "Lately, I use AI to move faster, but I build step by step and review carefully for strong UX, clean code, and reliability.",
  ],
  links: {
    resume: "/resume/Jared_Ryan_Resume.pdf",
    email: "mailto:jryantennis@gmail.com",
    github: "https://github.com/jaredryan",
    // TODO: replace with real LinkedIn URL (FRONTEND_SPEC.md §15).
    linkedin: "",
  },
  currentlyLabel: "Currently:",
  currentlyLines: [
    "First things first: make sure you’re building something somebody actually wants.",
    "I love software where the flows feel obvious and natural.",
    "When I have the energy, you’ll find me on a local hike or locked into a game on the living room chair.",
    "When I don’t have the energy, same chair — Netflix, Webtoons, and pretending one more episode was planned.",
    "I’m serious about clean code, but not very serious about pretending to be serious.",
    "Somehow, even meal prep turned into a modular system of bases, sauces, vegetables, and macros.",
  ],
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/data/profile.test.ts`
Expected: PASS.

- [ ] **Step 5: Write failing test for `projects.ts`**

```ts
// src/data/projects.test.ts
import { describe, expect, it } from "vitest";
import { projects } from "./projects";

describe("projects", () => {
  it("has all five projects with required fields, slugs first, screenshots wired up", () => {
    expect(projects.map((p) => p.slug)).toEqual([
      "lpa-tracker",
      "campfire",
      "unity-roguelike",
      "nest-invaders",
      "when-bunnies-attack",
    ]);
    for (const project of projects) {
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.oneLiner.length).toBeGreaterThan(0);
      expect(project.previewPills.length).toBeGreaterThan(0);
      expect(project.detailPills.length).toBeGreaterThan(0);
      expect(project.details.length).toBeGreaterThan(0);
      expect(project.screenshots.cover).toBe(`/projects/${project.slug}/cover.svg`);
      expect(project.screenshots.images).toHaveLength(3);
    }
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npx vitest run src/data/projects.test.ts`
Expected: FAIL — `Cannot find module './projects'`.

- [ ] **Step 7: Implement `src/data/projects.ts`**

```ts
export type ProjectLink = {
  label: string;
  href: string;
  kind: "demo" | "github" | "private" | "request";
};

export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  previewPills: string[];
  detailPills: string[];
  links: ProjectLink[];
  screenshots: {
    cover: string;
    images: string[];
  };
  details: string[];
};

export const projects: Project[] = [
  {
    slug: "lpa-tracker",
    title: "LPA Tracker / Broadspan AI Demo",
    oneLiner:
      "AI document intelligence platform that extracts provisions, supports review workflows, and turns deadlines into trackable tasks.",
    previewPills: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Auth.js", "Document Workflows"],
    detailPills: [
      "Next.js", "TypeScript", "PostgreSQL", "Prisma", "Neon", "Auth.js",
      "Tailwind", "shadcn/ui", "Document Workflows", "Built with AI",
    ],
    links: [
      { label: "Demo available on request", href: "", kind: "request" },
      { label: "Private repo", href: "", kind: "private" },
    ],
    screenshots: {
      cover: "/projects/lpa-tracker/cover.svg",
      images: ["/projects/lpa-tracker/01.svg", "/projects/lpa-tracker/02.svg", "/projects/lpa-tracker/03.svg"],
    },
    details: [
      "Built a document review dashboard for fund/legal document workflows, centered on extracted provisions, source context, and review status.",
      "Designed task workflows around deadlines so users can turn document findings into actionable follow-up work.",
      "Built with a modern full-stack architecture and AI-assisted development process, while keeping the current demo static and review-focused.",
    ],
  },
  {
    slug: "campfire",
    title: "Campfire",
    oneLiner:
      "Personal growth journaling app that turns daily reflection, habits, streaks, and AI-assisted insight into a lightweight RPG-inspired loop.",
    previewPills: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Product Design", "Built with AI"],
    detailPills: [
      "Next.js", "TypeScript", "PostgreSQL", "Prisma", "Neon", "Auth.js",
      "Tailwind", "shadcn/ui", "Product Design", "Built with AI",
    ],
    links: [
      { label: "Demo", href: "https://campfirejournal.vercel.app/", kind: "demo" },
      { label: "GitHub", href: "https://github.com/jaredryan/Campfire", kind: "github" },
    ],
    screenshots: {
      cover: "/projects/campfire/cover.svg",
      images: ["/projects/campfire/01.svg", "/projects/campfire/02.svg", "/projects/campfire/03.svg"],
    },
    details: [
      "Designed a personal growth product around daily reflection, habits, streaks, and review loops.",
      "Built the app with a modern full-stack TypeScript architecture and structured data model.",
      "Used AI-assisted development while preserving hands-on product direction, UX review, and implementation quality.",
    ],
  },
  {
    slug: "unity-roguelike",
    title: "Unity 2D Roguelike Prototype",
    oneLiner:
      "Unity 2D roguelike prototype with procedural tilemaps, enemy encounters, items, menus, multi-input support, difficulty scaling, and save support.",
    previewPills: ["Unity", "C#", "Game Systems", "Input Handling", "UI Menus", "Level Generation"],
    detailPills: [
      "Unity", "C#", "Game Systems", "Input Handling", "UI Menus", "Movement",
      "Animation", "Level Generation", "Difficulty Scaling", "Save System",
    ],
    links: [
      {
        label: "Demo",
        href: "https://play.unity.com/en/games/520d503e-5403-4bab-b4c5-02becc961884/2d-roguelike-tutorial",
        kind: "demo",
      },
    ],
    screenshots: {
      cover: "/projects/unity-roguelike/cover.svg",
      images: [
        "/projects/unity-roguelike/01.svg",
        "/projects/unity-roguelike/02.svg",
        "/projects/unity-roguelike/03.svg",
      ],
    },
    details: [
      "Built from Unity’s 2D Roguelike tutorial, then extended with main, pause, game over, and how-to-play menus.",
      "Added keyboard/mouse, gamepad, and touch support for broader playability.",
      "Added smoother movement, difficulty jumps every two levels, and save support for downloaded builds.",
    ],
  },
  {
    slug: "nest-invaders",
    title: "Snack Attack",
    oneLiner:
      "Galaga-inspired React arcade game with responsive UI and controls, enemy waves, multiple levels, collision logic, and scoring.",
    previewPills: ["React", "JavaScript", "Game Loops", "Collision Logic", "Responsive Controls", "Animation"],
    detailPills: [
      "React", "JavaScript", "Game Loops", "Collision Logic", "Responsive UI",
      "Responsive Controls", "CSS", "Animation",
    ],
    links: [
      { label: "Demo", href: "https://nestinvaders.netlify.app/", kind: "demo" },
      { label: "GitHub", href: "https://github.com/jaredryan/nest-invaders/tree/standaloneGame", kind: "github" },
    ],
    screenshots: {
      cover: "/projects/nest-invaders/cover.svg",
      images: [
        "/projects/nest-invaders/01.svg",
        "/projects/nest-invaders/02.svg",
        "/projects/nest-invaders/03.svg",
      ],
    },
    details: [
      "Built a standalone arcade-style React game with enemy waves, levels, shooting, collision checks, and scoring.",
      "Implemented responsive controls and UI so the game is playable across screen sizes.",
      "Refined game-loop animation behavior for smoother arcade-style movement.",
    ],
  },
  {
    slug: "when-bunnies-attack",
    title: "When Bunnies Attack",
    oneLiner: "Playful, text-based React RPG with exploration, environment interaction, inventory, combat, and bunnies.",
    previewPills: ["React", "JavaScript", "Combat Logic", "Exploration", "Inventory", "Branching Dialogue"],
    detailPills: [
      "React", "JavaScript", "CSS", "Game State", "Inventory", "Combat Logic",
      "Exploration", "Branching Dialogue", "Responsive UI",
    ],
    links: [
      { label: "Demo", href: "https://whenbunniesattack.netlify.app/", kind: "demo" },
      { label: "GitHub", href: "https://github.com/jaredryan/when-bunnies-attack", kind: "github" },
    ],
    screenshots: {
      cover: "/projects/when-bunnies-attack/cover.svg",
      images: [
        "/projects/when-bunnies-attack/01.svg",
        "/projects/when-bunnies-attack/02.svg",
        "/projects/when-bunnies-attack/03.svg",
      ],
    },
    details: [
      "Built a compact text-based RPG with exploration, environment interactions, inventory, and combat.",
      "Modeled branching dialogue and game state so choices and available actions change based on progress.",
      "Used a playful premise to practice interaction design, state refactoring, and responsive game UI.",
    ],
  },
];
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npx vitest run src/data/projects.test.ts`
Expected: PASS.

- [ ] **Step 9: Write failing test for `experience.ts`**

```ts
// src/data/experience.test.ts
import { describe, expect, it } from "vitest";
import { experience } from "./experience";

describe("experience", () => {
  it("has 5 work entries then 2 education entries, all with required fields", () => {
    const kinds = experience.map((e) => e.kind);
    expect(kinds.filter((k) => k === "work")).toHaveLength(5);
    expect(kinds.filter((k) => k === "education")).toHaveLength(2);
    expect(experience[0].slug).toBe("gold-ocean");
    for (const entry of experience) {
      expect(entry.title.length).toBeGreaterThan(0);
      expect(entry.oneLiner.length).toBeGreaterThan(0);
      expect(entry.pills.length).toBeGreaterThan(0);
      expect(entry.metricChips.length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 10: Run test to verify it fails**

Run: `npx vitest run src/data/experience.test.ts`
Expected: FAIL — `Cannot find module './experience'`.

- [ ] **Step 11: Implement `src/data/experience.ts`**

```ts
export type ExperienceEntry = {
  slug: string;
  kind: "work" | "education";
  tabLabel: string;
  title: string;
  company?: string;
  institution?: string;
  start?: number;
  end?: number | "Present";
  date?: number;
  location?: string;
  oneLiner: string;
  metricChips: string[];
  pills: string[];
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    slug: "gold-ocean",
    kind: "work",
    tabLabel: "Gold Ocean Holdings",
    title: "Senior Software Engineer",
    company: "Gold Ocean Holdings",
    start: 2023,
    end: "Present",
    location: "Remote",
    oneLiner:
      "Led engineering team improvements and built real estate acquisition screening workflows across listings, investment criteria, and recommendations.",
    metricChips: ["6+ engineer team", "15% productivity lift", "20% better filtering", "1hr+ saved/listing"],
    pills: [
      "Engineering Leadership", "Process Improvement", "Real Estate Tech",
      "Data Workflows", "Recommendation Logic", "Python", "Node.js",
    ],
    bullets: [
      "Managed a team of 6+ engineers, increasing productivity by 15% through structured improvement plans, career tracking, and pairing sessions.",
      "Built real estate acquisition screening workflows across listing review, investment criteria, and recommendation logic.",
      "Refined acquisition recommendation models to filter 20% more properties and save 1hr+ of manual evaluation for each listing filtered.",
    ],
  },
  {
    slug: "mantl",
    kind: "work",
    tabLabel: "MANTL",
    title: "Software Developer II",
    company: "MANTL",
    start: 2021,
    end: 2023,
    location: "Remote",
    oneLiner:
      "Owned frontend-heavy product work, mentored engineers, turned stakeholder interviews into activation-time improvements, and led test automation efforts.",
    metricChips: ["4+ engineers mentored", "150+ tests", "25% → 80% coverage", "10%+ activation improvement"],
    pills: [
      "React", "TypeScript", "Frontend Architecture", "Testing", "Mentorship",
      "Product Discovery", "Workflow Automation", "GraphQL",
    ],
    bullets: [
      "Mentored 4+ engineers on frontend work and owned critical frontend features, earning team recognition for PR reviews, pairing, testing, design, and product flow quality.",
      "Led automated testing work for 3+ teams and 150+ tests, helping raise automated test coverage from 25% to 80%.",
      "Interviewed internal stakeholders to identify and prioritize targeted workflow improvements that reduced customer activation time by 10%+.",
    ],
  },
  {
    slug: "ibm-ca",
    kind: "work",
    tabLabel: "IBM (CA)",
    title: "Software Developer II",
    company: "IBM",
    start: 2019,
    end: 2021,
    location: "San Jose, CA",
    oneLiner:
      "Led frontend platform work across product, design, and backend partnerships, balancing usability, performance, security, and business value.",
    metricChips: ["3+ engineer frontend lead", "15% velocity lift", "30% estimation accuracy", "33% platform expansion", "20% faster design cycles"],
    pills: ["Frontend Leadership", "Product Collaboration", "Design Collaboration", "Architecture", "Security", "Performance", "Agile"],
    bullets: [
      "Led frontend work with 3+ engineers through Agile 3-month delivery cycles, improving team velocity by 15% and estimation accuracy by 30%.",
      "Architected technical solutions with product and backend leads, considering security, performance, sizing, business value, and usability to expand platform capabilities by 33%.",
      "Partnered with design to reduce design iteration cycles by 20% through early technical feedback on models, relationships, and implementation constraints.",
    ],
  },
  {
    slug: "ibm-tx",
    kind: "work",
    tabLabel: "IBM (TX)",
    title: "Software Developer I",
    company: "IBM",
    start: 2018,
    end: 2019,
    location: "Austin, TX",
    oneLiner:
      "Built demo applications and debugged cross-stack issues across authentication, authorization, automation, and deployment tooling.",
    metricChips: ["10% sales lift", "15% automation test lift", "Cross-stack debugging"],
    pills: ["OAuth", "OpenID Connect", "Node.js", "Angular", "Java", "Android", "Swift", "Docker", "Jenkins"],
    bullets: [
      "Pioneered demo applications showcasing product capabilities, contributing to a 10% sales increase.",
      "Debugged issues across OAuth, OpenID, Node, Angular, Java, Android, Swift, Docker, Jenkins, and automation tooling, helping increase passing automation tests by 15%.",
    ],
  },
  {
    slug: "ntr",
    kind: "work",
    tabLabel: "NTR",
    title: "Web Developer",
    company: "NTR",
    start: 2018,
    end: 2022,
    location: "Remote / Berkeley, CA",
    oneLiner: "Built and maintained a React/Node/MongoDB feedback platform used by 20+ colleges for 10,000+ submissions.",
    metricChips: ["20+ colleges", "10,000+ submissions", "4 years maintained", "99.999% availability"],
    pills: ["React", "Node.js", "MongoDB", "Full-Stack Development", "Platform Maintenance", "Data Privacy"],
    bullets: [
      "Partnered with a UC Berkeley professor to design a feedback platform for collecting, grading, releasing, and anonymizing submissions, now used by 20+ colleges for 10,000+ submissions.",
      "Built the website from scratch with React, Node, and MongoDB, then administered it for 4 years with 99.999% availability and 0 bugs after the first year.",
    ],
  },
  {
    slug: "v-school",
    kind: "education",
    tabLabel: "V School",
    title: "V School",
    institution: "V School",
    date: 2018,
    oneLiner: "Completed a 3-month full-stack bootcamp focused on MongoDB, Express, React, and Node.",
    metricChips: ["3-month bootcamp", "MERN stack"],
    pills: ["MongoDB", "Express", "React", "Node.js", "JavaScript"],
    bullets: [],
  },
  {
    slug: "uc-berkeley",
    kind: "education",
    tabLabel: "UC Berkeley",
    title: "UC Berkeley College of Engineering",
    institution: "UC Berkeley",
    date: 2017,
    oneLiner: "Earned a B.S. in Bioengineering with a Computer Science emphasis.",
    metricChips: ["B.S. Bioengineering", "Computer Science emphasis"],
    pills: ["Engineering", "Computer Science", "Technical Problem Solving"],
    bullets: [],
  },
];
```

- [ ] **Step 12: Run all data tests**

Run: `npm run test`
Expected: All three test files PASS.

- [ ] **Step 13: Commit**

```bash
git add src/data
git commit -m "feat: add typed profile, projects, and experience data"
```

---

### Task 4: Reusable primitives — Breadcrumbs, PillList, MetricChips

**Files:**
- Create: `src/components/Breadcrumbs.astro`
- Create: `src/components/PillList.astro`
- Create: `src/components/MetricChips.astro`

**Interfaces:**
- Produces: `Breadcrumbs` Props `{ trail: { label: string; href?: string; roleLink?: string; projectLink?: string; clearRole?: boolean; clearProject?: boolean; dashboardLink?: boolean }[] }` — later tasks (13, 14) build trails using `data-role-link`/`data-project-link`/`data-clear-role`/`data-clear-project`/`data-dashboard-link` attributes wired up by `sectionNav.ts` (Task 5). Every "Dashboard" crumb in Tasks 13-14 sets `dashboardLink: true` (in addition to `href: "#dashboard"` for no-JS fallback) so returning to the dashboard clears any stale `?role=`/`?project=` param instead of leaving it in the URL.
- Produces: `PillList` Props `{ pills: string[]; variant?: "preview" | "detail" }`. Its `.pill`/`.pill-list` CSS is declared `is:global` (not Astro's default scoped style) because Tasks 9-10's client scripts rebuild pill lists via `document.createElement` when the user swaps the selected role/project — those dynamically-created elements need the class to be styled regardless of which component's scope "owns" them.
- Produces: `MetricChips` Props `{ chips: string[] }`. Its styles stay normally scoped (not global) — nothing in this plan ever recreates a `.metric-chip` via client JS, so there's no cross-scope styling gap to close.

- [ ] **Step 1: Create `src/components/Breadcrumbs.astro`**

```astro
---
type Crumb = {
  label: string;
  href?: string;
  roleLink?: string;
  projectLink?: string;
  clearRole?: boolean;
  clearProject?: boolean;
  dashboardLink?: boolean;
};

interface Props {
  trail: Crumb[];
}

const { trail } = Astro.props;
---
<nav aria-label="Breadcrumb" class="breadcrumbs">
  <ol>
    {trail.map((crumb, index) => {
      const isCurrent = index === trail.length - 1;
      return (
        <li>
          {isCurrent ? (
            <span aria-current="page">{crumb.label}</span>
          ) : (
            <a
              href={crumb.href ?? "#"}
              data-role-link={crumb.roleLink}
              data-project-link={crumb.projectLink}
              data-clear-role={crumb.clearRole ? "" : undefined}
              data-clear-project={crumb.clearProject ? "" : undefined}
              data-dashboard-link={crumb.dashboardLink ? "" : undefined}
            >
              {crumb.label}
            </a>
          )}
          {!isCurrent && <span class="sep" aria-hidden="true">›</span>}
        </li>
      );
    })}
  </ol>
</nav>

<style>
  .breadcrumbs ol {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
    list-style: none;
    margin: 0 0 var(--space-4);
    padding: 0;
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }

  .breadcrumbs li {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .breadcrumbs a {
    color: var(--color-text-muted);
    text-decoration: none;
  }

  .breadcrumbs a:hover {
    color: var(--color-primary);
    text-decoration: underline;
  }

  .breadcrumbs [aria-current="page"] {
    color: var(--color-text);
    font-weight: 600;
  }

  .breadcrumbs .sep {
    color: var(--color-border);
  }

  @media (max-width: 480px) {
    .breadcrumbs li:not(:last-child):not(:nth-last-child(2)) {
      display: none;
    }
    .breadcrumbs li:nth-last-child(2)::before {
      content: "\2026 \203A ";
      color: var(--color-border);
    }
  }
</style>
```

- [ ] **Step 2: Create `src/components/PillList.astro`**

```astro
---
interface Props {
  pills: string[];
  variant?: "preview" | "detail";
}

const { pills, variant = "preview" } = Astro.props;
---
<ul class={`pill-list pill-list--${variant}`}>
  {pills.map((pill) => (
    <li class="pill">{pill}</li>
  ))}
</ul>

<style is:global>
  /*
   * is:global is required here, not just a style choice: ExperiencePreview
   * (Task 9) and ProjectsPreview (Task 10) rebuild pill lists client-side
   * via document.createElement when the user swaps the selected role/project.
   * Elements created that way never receive Astro's per-component scoping
   * attribute, so a normally-scoped <style> block in this file would only
   * style the pills Astro rendered at build time, not ones JS adds later.
   * Making the rule global means any element with class="pill"/"pill-list"
   * anywhere on the page is styled consistently, regardless of who created it.
   */
  .pill-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .pill {
    background: var(--color-surface-alt);
    color: var(--color-text-muted);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-1) var(--space-3);
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .pill-list--detail .pill {
    font-size: 0.85rem;
  }
</style>
```

- [ ] **Step 3: Create `src/components/MetricChips.astro`**

```astro
---
interface Props {
  chips: string[];
}

const { chips } = Astro.props;
---
<ul class="metric-chips">
  {chips.map((chip) => (
    <li class="metric-chip">{chip}</li>
  ))}
</ul>

<style>
  .metric-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .metric-chip {
    background: color-mix(in srgb, var(--color-accent-sand) 25%, transparent);
    border: 1px solid var(--color-accent-sand);
    color: var(--color-text);
    border-radius: var(--radius-sm);
    padding: var(--space-1) var(--space-2);
    font-size: 0.75rem;
    font-weight: 600;
  }
</style>
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds (no page imports these yet, but `astro check` must type-check them cleanly).

- [ ] **Step 5: Commit**

```bash
git add src/components/Breadcrumbs.astro src/components/PillList.astro src/components/MetricChips.astro
git commit -m "feat: add Breadcrumbs, PillList, and MetricChips primitives"
```

---

### Task 5: URL state, focus, and cross-component navigation utilities

**Files:**
- Create: `src/utils/urlState.ts`
- Test: `src/utils/urlState.test.ts`
- Create: `src/utils/focus.ts`
- Create: `src/utils/sectionNav.ts`

**Interfaces:**
- Produces: `getQueryParam(key)`, `setSectionState(options)`, `clearSectionState(options)` (FRONTEND_SPEC.md §9 signatures) — consumed by `sectionNav.ts` and every full-section component.
- Produces: `moveFocusTo(selector: string): void`.
- Produces: `initSectionNav(): void` plus event name constants `SELECT_ROLE_EVENT`, `SELECT_PROJECT_EVENT`, `CLEAR_ROLE_EVENT`, `CLEAR_PROJECT_EVENT`, `SYNC_FROM_URL_EVENT` — every interactive component (Tasks 6, 9, 10, 13, 14) listens for these on `window`.
- **Important:** creating `sectionNav.ts` does not wire anything up by itself — `initSectionNav()` must actually be imported and called once from the real page. Task 11 Step 2 adds this call to `src/pages/index.astro`; every later rewrite of `index.astro` (Tasks 13, 14) must keep that call. Without it, every dashboard expand link, breadcrumb, role link, and project link is dead — clicks will `preventDefault()` nothing, since the listener that calls `preventDefault()` was never attached.

- [ ] **Step 1: Write failing tests for `urlState.ts`**

```ts
// src/utils/urlState.test.ts
import { beforeEach, describe, expect, it } from "vitest";
import { clearSectionState, getQueryParam, setSectionState } from "./urlState";

describe("urlState", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/");
  });

  it("reads a query param, or null if absent", () => {
    window.history.replaceState(null, "", "/?role=mantl#experience");
    expect(getQueryParam("role")).toBe("mantl");
    expect(getQueryParam("project")).toBeNull();
  });

  it("sets a section param + hash via pushState, preserving unrelated params", () => {
    window.history.replaceState(null, "", "/?utm_source=test");
    setSectionState({ key: "project", value: "campfire", hash: "#projects" });
    expect(window.location.search).toContain("utm_source=test");
    expect(window.location.search).toContain("project=campfire");
    expect(window.location.hash).toBe("#projects");
  });

  it("clears a section param but keeps the hash", () => {
    window.history.replaceState(null, "", "/?role=mantl#experience");
    clearSectionState({ key: "role", hash: "#experience" });
    expect(getQueryParam("role")).toBeNull();
    expect(window.location.hash).toBe("#experience");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/utils/urlState.test.ts`
Expected: FAIL — `Cannot find module './urlState'`.

- [ ] **Step 3: Implement `src/utils/urlState.ts`**

```ts
export function getQueryParam(key: string): string | null {
  return new URLSearchParams(window.location.search).get(key);
}

export function setSectionState(options: {
  key: "project" | "role";
  value: string;
  hash: "#projects" | "#experience";
  replace?: boolean;
}): void {
  const { key, value, hash, replace = false } = options;
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  url.hash = hash;
  if (replace) {
    window.history.replaceState(null, "", url);
  } else {
    window.history.pushState(null, "", url);
  }
}

export function clearSectionState(options: {
  key: "project" | "role";
  hash: "#projects" | "#experience";
  replace?: boolean;
}): void {
  const { key, hash, replace = false } = options;
  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  url.hash = hash;
  if (replace) {
    window.history.replaceState(null, "", url);
  } else {
    window.history.pushState(null, "", url);
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/utils/urlState.test.ts`
Expected: PASS.

- [ ] **Step 5: Implement `src/utils/focus.ts`**

```ts
export function moveFocusTo(selector: string): void {
  const target = document.querySelector<HTMLElement>(selector);
  if (!target) return;

  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1");
  }
  target.scrollIntoView({ block: "start" });
  target.focus({ preventScroll: true });
}
```

- [ ] **Step 6: Implement `src/utils/sectionNav.ts`**

```ts
import { clearSectionState, setSectionState } from "./urlState";
import { moveFocusTo } from "./focus";

export const SELECT_ROLE_EVENT = "portfolio:select-role";
export const SELECT_PROJECT_EVENT = "portfolio:select-project";
export const CLEAR_ROLE_EVENT = "portfolio:clear-role";
export const CLEAR_PROJECT_EVENT = "portfolio:clear-project";
export const SYNC_FROM_URL_EVENT = "portfolio:sync-from-url";

function dispatch(name: string, detail?: { slug: string }): void {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

let initialized = false;

export function initSectionNav(): void {
  if (initialized) return;
  initialized = true;

  document.addEventListener("click", (event) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-role-link], [data-project-link], [data-clear-role], [data-clear-project], [data-dashboard-link]"
    );
    if (!target) return;

    event.preventDefault();

    if (target.dataset.roleLink) {
      const slug = target.dataset.roleLink;
      setSectionState({ key: "role", value: slug, hash: "#experience" });
      dispatch(SELECT_ROLE_EVENT, { slug });
      // Every role panel has its own heading id (`experience-detail-heading-<slug>`,
      // Task 14) — there is no single shared id, since duplicate IDs across the
      // 7 pre-rendered panels would be invalid HTML and unreliable to query.
      moveFocusTo(`#experience-detail-heading-${slug}`);
    } else if (target.dataset.projectLink) {
      const slug = target.dataset.projectLink;
      setSectionState({ key: "project", value: slug, hash: "#projects" });
      dispatch(SELECT_PROJECT_EVENT, { slug });
      // Same reasoning as above: each of the 5 project panels has its own
      // heading id (`project-detail-heading-<slug>`, Task 13).
      moveFocusTo(`#project-detail-heading-${slug}`);
    } else if (target.hasAttribute("data-clear-role")) {
      clearSectionState({ key: "role", hash: "#experience" });
      dispatch(CLEAR_ROLE_EVENT);
      moveFocusTo("#experience-heading");
    } else if (target.hasAttribute("data-clear-project")) {
      clearSectionState({ key: "project", hash: "#projects" });
      dispatch(CLEAR_PROJECT_EVENT);
      moveFocusTo("#projects-heading");
    } else if (target.hasAttribute("data-dashboard-link")) {
      // Returning to the dashboard must drop BOTH `?role=` and `?project=` in
      // one navigation — using clearSectionState() twice would push two
      // separate history entries and only clear one key per call. Neither
      // urlState.ts helper covers "clear everything and go to a third hash,"
      // so this one case is handled directly with the URL API.
      const url = new URL(window.location.href);
      url.searchParams.delete("role");
      url.searchParams.delete("project");
      url.hash = "#dashboard";
      window.history.pushState(null, "", url);
      dispatch(CLEAR_ROLE_EVENT);
      dispatch(CLEAR_PROJECT_EVENT);
      moveFocusTo("#dashboard");
    }
  });

  window.addEventListener("popstate", () => {
    dispatch(SYNC_FROM_URL_EVENT);
  });
}
```

- [ ] **Step 7: Run full test suite**

Run: `npm run test`
Expected: All tests PASS, including Task 3's data tests.

- [ ] **Step 8: Commit**

```bash
git add src/utils
git commit -m "feat: add urlState, focus, and sectionNav utilities"
```

---

### Task 6: ThemeToggle component

**Files:**
- Create: `src/components/ThemeToggle.astro`

**Interfaces:**
- Produces: a `<button id="theme-toggle">` that HeroCard (Task 8) renders inside the hero actions row.

- [ ] **Step 1: Create `src/components/ThemeToggle.astro`**

```astro
---
---
<button
  id="theme-toggle"
  type="button"
  class="theme-toggle"
  aria-label="Switch to dark theme"
>
  <span class="theme-toggle__icon" aria-hidden="true">🌙</span>
  <span class="theme-toggle__label">Dark</span>
</button>

<style>
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-2) var(--space-3);
    cursor: pointer;
  }

  .theme-toggle:hover {
    border-color: var(--color-accent-teal);
  }
</style>

<script>
  const STORAGE_KEY = "theme";
  const button = document.getElementById("theme-toggle") as HTMLButtonElement | null;
  const icon = button?.querySelector(".theme-toggle__icon");
  const label = button?.querySelector(".theme-toggle__label");

  function applyTheme(theme: "light" | "dark") {
    document.documentElement.setAttribute("data-theme", theme);
    if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
    if (label) label.textContent = theme === "dark" ? "Light" : "Dark";
    button?.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
  }

  const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  applyTheme(current);

  button?.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* localStorage unavailable — theme still applies for this page view */
    }
  });
</script>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds (component not yet used on a page, but type-checks and bundles cleanly).

- [ ] **Step 3: Commit**

```bash
git add src/components/ThemeToggle.astro
git commit -m "feat: add ThemeToggle component"
```

---

### Task 7: TypewriterTicker component

**Files:**
- Create: `src/components/TypewriterTicker.astro`

**Interfaces:**
- Consumes: `Props { label: string; lines: string[] }` (`profile.currentlyLabel`, `profile.currentlyLines` from Task 3).
- Produces: rendered ticker used by HeroCard (Task 8).

- [ ] **Step 1: Create `src/components/TypewriterTicker.astro`**

```astro
---
interface Props {
  label: string;
  lines: string[];
}

const { label, lines } = Astro.props;
---
<div class="typewriter" data-lines={JSON.stringify(lines)}>
  <span class="typewriter__label">{label}</span>
  <span class="typewriter__text" aria-live="polite">{lines[0]}</span>
  <span class="typewriter__cursor" aria-hidden="true">|</span>
</div>

<style>
  .typewriter {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
    font-size: 0.95rem;
    color: var(--color-text-muted);
    min-height: 1.5em;
  }

  .typewriter__label {
    font-weight: 700;
    color: var(--color-text);
    white-space: nowrap;
  }

  .typewriter__text {
    overflow-wrap: anywhere;
  }

  .typewriter__cursor {
    color: var(--color-accent-coral);
    animation: blink 1s step-end infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .typewriter__cursor {
      animation: none;
    }
  }

  @keyframes blink {
    50% { opacity: 0; }
  }
</style>

<script>
  const root = document.querySelector<HTMLElement>(".typewriter");
  const textEl = root?.querySelector<HTMLElement>(".typewriter__text");
  const cursorEl = root?.querySelector<HTMLElement>(".typewriter__cursor");
  const lines: string[] = JSON.parse(root?.dataset.lines ?? "[]");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (root && textEl && lines.length > 0 && !prefersReducedMotion) {
    const TYPE_MS = 35;
    const DELETE_MS = 18;
    const HOLD_MS = 1800;
    let lineIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    function typeLine(line: string, charIndex: number) {
      textEl!.textContent = line.slice(0, charIndex);
      if (charIndex < line.length) {
        timeoutId = setTimeout(() => typeLine(line, charIndex + 1), TYPE_MS);
      } else {
        timeoutId = setTimeout(() => deleteLine(line, line.length), HOLD_MS);
      }
    }

    function deleteLine(line: string, charIndex: number) {
      textEl!.textContent = line.slice(0, charIndex);
      if (charIndex > 0) {
        timeoutId = setTimeout(() => deleteLine(line, charIndex - 1), DELETE_MS);
      } else {
        lineIndex = (lineIndex + 1) % lines.length;
        timeoutId = setTimeout(() => typeLine(lines[lineIndex], 0), TYPE_MS);
      }
    }

    typeLine(lines[0], 0);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clearTimeout(timeoutId);
    });
  } else if (cursorEl && prefersReducedMotion) {
    cursorEl.style.display = "none";
  }
</script>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Manual verification**

Run: `npm run preview`, temporarily render `<TypewriterTicker label={profile.currentlyLabel} lines={profile.currentlyLines} />` on the placeholder index page, load it in a browser, and confirm the line types/deletes/loops. Enable "reduce motion" in OS accessibility settings and reload — confirm it shows a static first line with no blinking cursor. Remove the temporary render afterward (HeroCard wires it properly in Task 8).

- [ ] **Step 4: Commit**

```bash
git add src/components/TypewriterTicker.astro
git commit -m "feat: add TypewriterTicker component"
```

---

### Task 8: HeroCard component

**Files:**
- Create: `src/components/HeroCard.astro`

**Interfaces:**
- Consumes: `profile` from `src/data/profile.ts`, `ThemeToggle`, `TypewriterTicker`.
- Produces: `<HeroCard />` (no props — reads `profile` directly since it's a singleton), consumed by `BentoDashboard` (Task 11).

- [ ] **Step 1: Create `src/components/HeroCard.astro`**

```astro
---
import { profile } from "../data/profile";
import ThemeToggle from "./ThemeToggle.astro";
import TypewriterTicker from "./TypewriterTicker.astro";
---
<article class="hero-card">
  <div class="hero-card__top">
    <div>
      <h1>{profile.name}</h1>
      <p class="hero-card__role">{profile.role}</p>
    </div>
    <ThemeToggle />
  </div>

  {profile.heroParagraphs.map((paragraph) => (
    <p class="hero-card__paragraph">{paragraph}</p>
  ))}

  <div class="hero-card__actions">
    <a class="hero-card__action hero-card__action--primary" href={profile.links.resume} download>
      Resume
    </a>
    <a class="hero-card__action" href={profile.links.email}>Email</a>
    <a class="hero-card__action" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
    {profile.links.linkedin && (
      <a class="hero-card__action" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
    )}
  </div>

  <TypewriterTicker label={profile.currentlyLabel} lines={profile.currentlyLines} />
</article>

<style>
  .hero-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .hero-card__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-4);
  }

  .hero-card__role {
    margin-top: var(--space-1);
    color: var(--color-primary);
    font-weight: 600;
  }

  .hero-card__paragraph {
    color: var(--color-text-muted);
  }

  .hero-card__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .hero-card__action {
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: var(--space-2) var(--space-4);
    text-decoration: none;
    color: var(--color-text);
    font-weight: 600;
  }

  .hero-card__action:hover {
    border-color: var(--color-accent-teal);
  }

  .hero-card__action--primary {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
  }
</style>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroCard.astro
git commit -m "feat: add HeroCard component"
```

---

### Task 9: ExperiencePreview component (dashboard card)

**Files:**
- Create: `src/components/ExperiencePreview.astro`

**Interfaces:**
- Consumes: `Props { entries: ExperienceEntry[] }`, `PillList`, `sectionNav` event constants.
- Produces: local click-to-preview interaction (no URL change) plus an expand link using `data-role-link` (URL + full-section sync via `sectionNav.ts`).

- [ ] **Step 1: Create `src/components/ExperiencePreview.astro`**

```astro
---
import type { ExperienceEntry } from "../data/experience";
import PillList from "./PillList.astro";

interface Props {
  entries: ExperienceEntry[];
}

const { entries } = Astro.props;
const workEntries = entries.filter((entry) => entry.kind === "work");
// Matches ExperienceSection's default selected role (Task 14) so the expand
// link is never a dead click before the user has previewed a specific role.
const defaultRoleSlug = "gold-ocean";
---
<div class="experience-preview" id="experience-preview">
  <h2 class="experience-preview__heading">Experience</h2>

  <ul class="experience-preview__list">
    {workEntries.map((entry) => (
      <li>
        <button
          type="button"
          class="experience-preview__item"
          data-preview-role={entry.slug}
          aria-pressed="false"
        >
          <span class="experience-preview__company">{entry.company}</span>
          <span class="experience-preview__title">{entry.title}</span>
          <span class="experience-preview__dates">
            {entry.start}—{entry.end}
          </span>
        </button>
      </li>
    ))}
  </ul>

  <div class="experience-preview__teaser" data-preview-teaser hidden>
    <p class="experience-preview__teaser-oneliner"></p>
    <div class="experience-preview__teaser-pills"></div>
  </div>

  <a
    class="experience-preview__expand"
    href={`?role=${defaultRoleSlug}#experience`}
    data-role-link={defaultRoleSlug}
    aria-label="View full Experience section"
  >
    View full experience →
  </a>
</div>

<style>
  .experience-preview {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    height: 100%;
  }

  .experience-preview__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .experience-preview__item {
    width: 100%;
    text-align: left;
    background: transparent;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: var(--space-2) var(--space-3);
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }

  .experience-preview__item[aria-pressed="true"] {
    border-color: var(--color-accent-teal);
    background: var(--color-surface-alt);
  }

  .experience-preview__company {
    font-weight: 700;
  }

  .experience-preview__dates {
    color: var(--color-text-muted);
    font-size: 0.85rem;
  }

  .experience-preview__teaser {
    background: var(--color-surface-alt);
    border-radius: var(--radius-sm);
    padding: var(--space-3);
  }

  .experience-preview__expand {
    align-self: flex-start;
    color: var(--color-primary);
    font-weight: 600;
    text-decoration: none;
  }
</style>

<script type="application/json" id="experience-preview-data" set:html={JSON.stringify(
  workEntries.map((entry) => ({ slug: entry.slug, oneLiner: entry.oneLiner, pills: entry.pills }))
)} />

<script>
  // This script runs after the JSON data block above in document order, so
  // `experience-preview-data`'s textContent is already in the DOM by the
  // time this executes — do not reorder these two <script> tags.
  const root = document.getElementById("experience-preview");
  const items = root?.querySelectorAll<HTMLButtonElement>("[data-preview-role]");
  const teaser = root?.querySelector<HTMLElement>("[data-preview-teaser]");
  const teaserOneLiner = teaser?.querySelector<HTMLElement>(".experience-preview__teaser-oneliner");
  const teaserPills = teaser?.querySelector<HTMLElement>(".experience-preview__teaser-pills");
  const expandLink = root?.querySelector<HTMLAnchorElement>(".experience-preview__expand");

  type EntrySummary = { slug: string; oneLiner: string; pills: string[] };
  const entryData: EntrySummary[] = JSON.parse(
    document.getElementById("experience-preview-data")?.textContent ?? "[]"
  );

  function selectPreview(slug: string) {
    items?.forEach((item) => {
      item.setAttribute("aria-pressed", String(item.dataset.previewRole === slug));
    });

    const entry = entryData.find((e) => e.slug === slug);
    if (!entry || !teaser || !teaserOneLiner || !teaserPills) return;

    teaser.hidden = false;
    teaserOneLiner.textContent = entry.oneLiner;
    teaserPills.innerHTML = "";
    const list = document.createElement("ul");
    list.className = "pill-list pill-list--preview";
    for (const pill of entry.pills.slice(0, 4)) {
      const li = document.createElement("li");
      li.className = "pill";
      li.textContent = pill;
      list.appendChild(li);
    }
    teaserPills.appendChild(list);

    if (expandLink) {
      expandLink.dataset.roleLink = slug;
    }
  }

  items?.forEach((item) => {
    item.addEventListener("click", () => {
      const slug = item.dataset.previewRole;
      if (slug) selectPreview(slug);
    });
  });
</script>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds. No `<template>` block should exist in this component — Astro components (like `PillList`) cannot be instantiated from client-side JS, so pills are built manually via `document.createElement` in the script above, using the global `.pill`/`.pill-list` classes from Task 4 (see Task 4's `is:global` fix).

- [ ] **Step 3: Manual verification**

Temporarily render `<ExperiencePreview entries={experience} />` on the placeholder page (import `experience` from `../data/experience`), run `npm run preview`, click each role button and confirm the teaser updates with that role's one-liner and up to 4 pills, and `aria-pressed` toggles correctly. Also confirm the "View full experience →" link already carries `data-role-link="gold-ocean"` (not an empty string) before any role is clicked. Remove the temporary render (BentoDashboard wires it in Task 11).

- [ ] **Step 4: Commit**

```bash
git add src/components/ExperiencePreview.astro
git commit -m "feat: add ExperiencePreview dashboard card"
```

---

### Task 10: ProjectsPreview component (dashboard card)

**Files:**
- Create: `src/components/ProjectsPreview.astro`

**Interfaces:**
- Consumes: `Props { projects: Project[] }`.
- Produces: local thumbnail-swap interaction (no URL change, default selection = `lpa-tracker`) plus an expand link using `data-project-link`.

- [ ] **Step 1: Create `src/components/ProjectsPreview.astro`**

```astro
---
import type { Project } from "../data/projects";

interface Props {
  projects: Project[];
}

const { projects } = Astro.props;
const defaultProject = projects.find((p) => p.slug === "lpa-tracker") ?? projects[0];
---
<div class="projects-preview" id="projects-preview">
  <h2 class="projects-preview__heading">Projects</h2>

  <div class="projects-preview__body">
    <div class="projects-preview__media">
      <img
        id="projects-preview-cover"
        src={defaultProject.screenshots.cover}
        alt={`${defaultProject.title} screenshot`}
        width="640"
        height="400"
      />
      <div class="projects-preview__thumbs">
        {projects.map((project) => (
          <button
            type="button"
            class="projects-preview__thumb"
            data-preview-project={project.slug}
            aria-pressed={project.slug === defaultProject.slug ? "true" : "false"}
            aria-label={`Preview ${project.title}`}
          >
            <img src={project.screenshots.cover} alt="" width="96" height="60" />
          </button>
        ))}
      </div>
    </div>

    <div class="projects-preview__info">
      <p class="projects-preview__title" id="projects-preview-title">{defaultProject.title}</p>
      <p class="projects-preview__oneliner" id="projects-preview-oneliner">{defaultProject.oneLiner}</p>
      <ul class="pill-list pill-list--preview" id="projects-preview-pills">
        {defaultProject.previewPills.map((pill) => <li class="pill">{pill}</li>)}
      </ul>
      <a
        class="projects-preview__expand"
        id="projects-preview-expand"
        href="#projects"
        data-project-link={defaultProject.slug}
      >
        View full project →
      </a>
    </div>
  </div>
</div>

<script type="application/json" id="projects-preview-data" set:html={JSON.stringify(
  projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    oneLiner: p.oneLiner,
    previewPills: p.previewPills,
    cover: p.screenshots.cover,
  }))
)} />

<style>
  .projects-preview {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .projects-preview__body {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: var(--space-4);
  }

  .projects-preview__media img#projects-preview-cover {
    width: 100%;
    aspect-ratio: 8 / 5;
    object-fit: cover;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
  }

  .projects-preview__thumbs {
    display: flex;
    gap: var(--space-2);
    margin-top: var(--space-2);
    overflow-x: auto;
  }

  .projects-preview__thumb {
    border: 2px solid transparent;
    border-radius: var(--radius-sm);
    padding: 0;
    background: none;
    cursor: pointer;
    flex-shrink: 0;
  }

  .projects-preview__thumb img {
    border-radius: var(--radius-sm);
    display: block;
  }

  .projects-preview__thumb[aria-pressed="true"] {
    border-color: var(--color-accent-coral);
  }

  .projects-preview__info {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .projects-preview__title {
    font-weight: 700;
    font-size: 1.1rem;
  }

  .projects-preview__oneliner {
    color: var(--color-text-muted);
  }

  .projects-preview__expand {
    color: var(--color-primary);
    font-weight: 600;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    .projects-preview__body {
      grid-template-columns: 1fr;
    }
  }
</style>

<script>
  type PreviewProject = {
    slug: string;
    title: string;
    oneLiner: string;
    previewPills: string[];
    cover: string;
  };

  const data: PreviewProject[] = JSON.parse(
    document.getElementById("projects-preview-data")?.textContent ?? "[]"
  );

  const cover = document.getElementById("projects-preview-cover") as HTMLImageElement | null;
  const title = document.getElementById("projects-preview-title");
  const oneLiner = document.getElementById("projects-preview-oneliner");
  const pillsList = document.getElementById("projects-preview-pills");
  const expandLink = document.getElementById("projects-preview-expand") as HTMLAnchorElement | null;
  const thumbs = document.querySelectorAll<HTMLButtonElement>("[data-preview-project]");

  function selectPreview(slug: string) {
    const project = data.find((p) => p.slug === slug);
    if (!project || !cover || !title || !oneLiner || !pillsList || !expandLink) return;

    cover.src = project.cover;
    cover.alt = `${project.title} screenshot`;
    title.textContent = project.title;
    oneLiner.textContent = project.oneLiner;
    pillsList.innerHTML = "";
    for (const pill of project.previewPills) {
      const li = document.createElement("li");
      li.className = "pill";
      li.textContent = pill;
      pillsList.appendChild(li);
    }
    expandLink.dataset.projectLink = slug;

    thumbs.forEach((thumb) => {
      thumb.setAttribute("aria-pressed", String(thumb.dataset.previewProject === slug));
    });
  }

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const slug = thumb.dataset.previewProject;
      if (slug) selectPreview(slug);
    });
  });
</script>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Manual verification**

Temporarily render `<ProjectsPreview projects={projects} />` on the placeholder page, run `npm run preview`, click each thumbnail and confirm the cover image, title, one-liner, and pills swap, with `aria-pressed` moving to the clicked thumbnail. Remove the temporary render (BentoDashboard wires it in Task 11).

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectsPreview.astro
git commit -m "feat: add ProjectsPreview dashboard card"
```

---

### Task 11: BentoDashboard assembly + wire into index.astro

**Files:**
- Create: `src/components/BentoDashboard.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `HeroCard`, `ExperiencePreview`, `ProjectsPreview`, `experience`, `projects`.
- Produces: `#dashboard` section rendered on the real page, replacing all placeholder renders from Tasks 7, 9, 10.

- [ ] **Step 1: Create `src/components/BentoDashboard.astro`**

```astro
---
import HeroCard from "./HeroCard.astro";
import ExperiencePreview from "./ExperiencePreview.astro";
import ProjectsPreview from "./ProjectsPreview.astro";
import { experience } from "../data/experience";
import { projects } from "../data/projects";
---
<section id="dashboard" class="bento" aria-label="Overview">
  <HeroCard />
  <ExperiencePreview entries={experience} />
  <ProjectsPreview projects={projects} />
</section>

<style>
  /*
   * Source order above is Hero, ExperiencePreview, ProjectsPreview — this is
   * also the required mobile/no-CSS/screen-reader order (CLAUDE.md mobile
   * layout: Hero, Experience Preview, Projects Preview). Below 1024px there
   * is no grid-column/grid-row override, so the single-column layout simply
   * follows this DOM order. The desktop 2-column bento look (Hero top-left,
   * Projects bottom-left, Experience spanning the right column) is achieved
   * purely through explicit grid placement at ≥1024px — never by reordering
   * the DOM to fake a visual layout, which would desync what mobile/screen
   * readers see from what sighted desktop users see.
   */
  .bento {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
    padding-block: var(--space-8);
    min-height: 100svh;
  }

  @media (min-width: 1024px) {
    .bento {
      grid-template-columns: 2fr 1fr;
      grid-template-rows: auto 1fr;
      align-items: start;
    }

    .bento :global(.hero-card) {
      grid-column: 1;
      grid-row: 1;
    }

    .bento :global(.experience-preview) {
      grid-column: 2;
      grid-row: 1 / span 2;
      height: 100%;
    }

    .bento :global(.projects-preview) {
      grid-column: 1;
      grid-row: 2;
    }
  }
</style>
```

- [ ] **Step 2: Replace `src/pages/index.astro` with the real page shell**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import BentoDashboard from "../components/BentoDashboard.astro";
import { profile } from "../data/profile";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.links.github,
  sameAs: [profile.links.github, profile.links.linkedin].filter(Boolean),
};
---
<BaseLayout
  title="Jared Ryan | Product-Minded Full-Stack Engineer"
  description={profile.heroParagraphs[0]}
  structuredData={structuredData}
>
  <main>
    <BentoDashboard />
  </main>
</BaseLayout>

<script>
  import { initSectionNav } from "../utils/sectionNav";
  initSectionNav();
</script>
```

This `initSectionNav()` call is what makes every `data-role-link`/`data-project-link`/`data-clear-role`/`data-clear-project` element on the page actually respond to clicks (Task 5). It has no visible effect yet since Tasks 13-14 haven't added the full sections it targets, but confirm in Step 3 below that it runs with no console errors. Keep this `<script>` block in every later rewrite of `index.astro` (Tasks 13, 14) — do not drop it.

- [ ] **Step 3: Verify build and manual check**

Run: `npm run build && npm run preview`
Expected: Dashboard renders with Hero (top-left), Projects preview (bottom-left), Experience preview (right column) on desktop widths (≥1024px via the grid placement rules), and stacks to a single column in DOM order — Hero, then Experience preview, then Projects preview — below 1024px. Confirm no JavaScript errors in the browser console.

- [ ] **Step 4: Commit**

```bash
git add src/components/BentoDashboard.astro src/pages/index.astro
git commit -m "feat: assemble bento dashboard on the index page"
```

---

### Task 12: ProjectCarousel component

**Files:**
- Create: `src/components/ProjectCarousel.astro`

**Interfaces:**
- Consumes: `Props { images: string[]; alt: string; autoRotateMs?: number }`.
- Produces: `<div class="carousel" data-carousel>` markup consumed by `ProjectsSection` (Task 13), one instance per project detail panel. Only the carousel whose ancestor `[data-project-detail]` panel is currently visible auto-rotates; the other 4 stay paused and reset to slide 0 the next time their panel is shown (see the `MutationObserver` in Step 1) — Task 13 does not need to call anything on `ProjectCarousel` directly for this to work.

- [ ] **Step 1: Create `src/components/ProjectCarousel.astro`**

```astro
---
interface Props {
  images: string[];
  alt: string;
  autoRotateMs?: number;
}

const { images, alt, autoRotateMs = 6000 } = Astro.props;
---
<div class="carousel" data-carousel data-autorotate-ms={autoRotateMs}>
  <div class="carousel__viewport">
    {images.map((src, index) => (
      <img
        src={src}
        alt={`${alt} — screenshot ${index + 1} of ${images.length}`}
        class="carousel__slide"
        data-slide-index={index}
        hidden={index !== 0}
        loading={index === 0 ? "eager" : "lazy"}
        width="960"
        height="600"
      />
    ))}
  </div>

  <div class="carousel__controls">
    <button type="button" class="carousel__prev" aria-label="Previous screenshot">‹</button>
    <div class="carousel__dots" role="tablist" aria-label="Screenshot selector">
      {images.map((_, index) => (
        <button
          type="button"
          class="carousel__dot"
          role="tab"
          aria-selected={index === 0 ? "true" : "false"}
          aria-label={`Show screenshot ${index + 1}`}
          data-dot-index={index}
        />
      ))}
    </div>
    <button type="button" class="carousel__next" aria-label="Next screenshot">›</button>
  </div>
</div>

<style>
  .carousel {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .carousel__viewport {
    position: relative;
    border-radius: var(--radius-md);
    overflow: hidden;
    border: 1px solid var(--color-border);
  }

  .carousel__slide {
    width: 100%;
    aspect-ratio: 8 / 5;
    object-fit: cover;
  }

  .carousel__controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
  }

  .carousel__prev,
  .carousel__next {
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border);
    border-radius: 999px;
    width: 2.25rem;
    height: 2.25rem;
    cursor: pointer;
    font-size: 1.1rem;
  }

  .carousel__dots {
    display: flex;
    gap: var(--space-2);
  }

  .carousel__dot {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    border: 1px solid var(--color-border);
    background: var(--color-surface-alt);
    cursor: pointer;
    padding: 0;
  }

  .carousel__dot[aria-selected="true"] {
    background: var(--color-accent-coral);
    border-color: var(--color-accent-coral);
  }
</style>

<script>
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ProjectsSection (Task 13) pre-renders all 5 project detail panels at once
  // and toggles each one's `hidden` attribute — it does not unmount/remount
  // this component. Without the visibility awareness below, every carousel's
  // setInterval would start immediately on page load and keep advancing while
  // its panel is hidden, so by the time a user opens a given project its
  // carousel would already be on some arbitrary slide, and 5 timers would be
  // running in the background for no visible benefit. Each carousel instead
  // only runs while the `[data-project-detail]` panel that contains it is
  // visible, and resets to slide 0 each time that panel becomes visible.
  document.querySelectorAll<HTMLElement>("[data-carousel]").forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll<HTMLImageElement>(".carousel__slide"));
    const dots = Array.from(carousel.querySelectorAll<HTMLButtonElement>(".carousel__dot"));
    const prevBtn = carousel.querySelector<HTMLButtonElement>(".carousel__prev");
    const nextBtn = carousel.querySelector<HTMLButtonElement>(".carousel__next");
    const autoRotateMs = Number(carousel.dataset.autorotateMs ?? 0);
    const panel = carousel.closest<HTMLElement>("[data-project-detail]");
    let current = 0;
    let timerId: ReturnType<typeof setInterval> | undefined;

    function isPanelVisible(): boolean {
      return !panel || !panel.hidden;
    }

    function show(index: number) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.hidden = i !== current;
      });
      dots.forEach((dot, i) => {
        dot.setAttribute("aria-selected", String(i === current));
      });
    }

    function startAutoRotate() {
      if (prefersReducedMotion || !autoRotateMs || slides.length < 2 || !isPanelVisible()) return;
      stopAutoRotate();
      timerId = setInterval(() => show(current + 1), autoRotateMs);
    }

    function stopAutoRotate() {
      if (timerId) clearInterval(timerId);
      timerId = undefined;
    }

    prevBtn?.addEventListener("click", () => {
      show(current - 1);
      startAutoRotate();
    });
    nextBtn?.addEventListener("click", () => {
      show(current + 1);
      startAutoRotate();
    });
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        show(i);
        startAutoRotate();
      });
    });

    carousel.addEventListener("mouseenter", stopAutoRotate);
    carousel.addEventListener("mouseleave", startAutoRotate);
    carousel.addEventListener("focusin", stopAutoRotate);
    carousel.addEventListener("focusout", startAutoRotate);

    if (panel) {
      // React to ProjectsSection toggling `hidden` on the ancestor panel.
      const observer = new MutationObserver(() => {
        if (isPanelVisible()) {
          show(0);
          startAutoRotate();
        } else {
          stopAutoRotate();
        }
      });
      observer.observe(panel, { attributes: true, attributeFilter: ["hidden"] });
    }

    if (isPanelVisible()) {
      startAutoRotate();
    }
  });
</script>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCarousel.astro
git commit -m "feat: add ProjectCarousel component"
```

---

### Task 13: Full ProjectsSection

**Files:**
- Create: `src/components/ProjectsSection.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `projects`, `Breadcrumbs`, `PillList`, `ProjectCarousel`, `sectionNav` event constants (`SELECT_PROJECT_EVENT`, `CLEAR_PROJECT_EVENT`, `SYNC_FROM_URL_EVENT`), `getQueryParam`.
- Produces: `#projects` section with grid view (default) and detail view (all 5 panels pre-rendered, one shown at a time), reacting to `?project=<slug>`. Each detail panel's heading uses a slug-specific id (`project-detail-heading-<slug>`) — never a shared static id — since all 5 panels exist in the DOM simultaneously (only `hidden` toggles) and duplicate IDs are invalid HTML.

- [ ] **Step 1: Create `src/components/ProjectsSection.astro`**

```astro
---
import type { Project } from "../data/projects";
import Breadcrumbs from "./Breadcrumbs.astro";
import PillList from "./PillList.astro";
import ProjectCarousel from "./ProjectCarousel.astro";

interface Props {
  projects: Project[];
}

const { projects } = Astro.props;
---
<section id="projects" class="projects-section" aria-labelledby="projects-heading">
  <div id="projects-grid-view">
    <Breadcrumbs trail={[{ label: "Dashboard", href: "#dashboard", dashboardLink: true }, { label: "Projects" }]} />
    <h2 id="projects-heading" tabindex="-1">Projects</h2>

    <ul class="projects-grid">
      {projects.map((project) => (
        <li>
          <button type="button" class="project-card" data-project-link={project.slug}>
            <img
              src={project.screenshots.cover}
              alt={`${project.title} screenshot`}
              width="480"
              height="300"
              loading="lazy"
            />
            <span class="project-card__title">{project.title}</span>
            <span class="project-card__oneliner">{project.oneLiner}</span>
            <PillList pills={project.previewPills} />
          </button>
        </li>
      ))}
    </ul>
  </div>

  <div id="projects-detail-view" hidden>
    {projects.map((project) => (
      <div class="project-detail" id={`project-detail-${project.slug}`} data-project-detail={project.slug} hidden>
        <Breadcrumbs
          trail={[
            { label: "Dashboard", href: "#dashboard", dashboardLink: true },
            { label: "Projects", href: "#projects", clearProject: true },
            { label: project.title },
          ]}
        />
        <h2 id={`project-detail-heading-${project.slug}`} tabindex="-1">{project.title}</h2>
        <p class="project-detail__oneliner">{project.oneLiner}</p>

        <ProjectCarousel images={project.screenshots.images} alt={project.title} />

        <ul class="project-detail__bullets">
          {project.details.map((detail) => <li>{detail}</li>)}
        </ul>

        <PillList pills={project.detailPills} variant="detail" />

        <div class="project-detail__links">
          {project.links.map((link) => (
            link.href ? (
              <a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
            ) : (
              <span class="project-detail__link-disabled">{link.label}</span>
            )
          ))}
        </div>
      </div>
    ))}
  </div>
</section>

<style>
  .projects-section {
    min-height: 100svh;
    padding-block: var(--space-8);
  }

  .projects-grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: var(--space-4);
  }

  .project-card {
    width: 100%;
    text-align: left;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    cursor: pointer;
  }

  .project-card img {
    border-radius: var(--radius-sm);
    aspect-ratio: 8 / 5;
    object-fit: cover;
  }

  .project-card__title {
    font-weight: 700;
  }

  .project-card__oneliner {
    color: var(--color-text-muted);
    font-size: 0.9rem;
  }

  .project-detail__bullets {
    padding-left: 1.2rem;
    color: var(--color-text-muted);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .project-detail__links {
    display: flex;
    gap: var(--space-3);
    margin-top: var(--space-3);
  }

  .project-detail__link-disabled {
    color: var(--color-text-muted);
    font-style: italic;
  }
</style>

<script>
  import {
    CLEAR_PROJECT_EVENT,
    SELECT_PROJECT_EVENT,
    SYNC_FROM_URL_EVENT,
  } from "../utils/sectionNav";
  import { getQueryParam } from "../utils/urlState";

  const gridView = document.getElementById("projects-grid-view");
  const detailView = document.getElementById("projects-detail-view");
  const detailPanels = document.querySelectorAll<HTMLElement>("[data-project-detail]");

  function showProject(slug: string) {
    const panel = document.getElementById(`project-detail-${slug}`);
    if (!panel) return;
    if (gridView) gridView.hidden = true;
    if (detailView) detailView.hidden = false;
    detailPanels.forEach((p) => {
      p.hidden = p.dataset.projectDetail !== slug;
    });
  }

  function showGrid() {
    if (gridView) gridView.hidden = false;
    if (detailView) detailView.hidden = true;
    detailPanels.forEach((p) => {
      p.hidden = true;
    });
  }

  function syncFromUrl() {
    const slug = getQueryParam("project");
    const validSlugs = Array.from(detailPanels).map((p) => p.dataset.projectDetail);
    if (slug && validSlugs.includes(slug)) {
      showProject(slug);
    } else {
      showGrid();
    }
  }

  window.addEventListener(SELECT_PROJECT_EVENT, ((event: CustomEvent<{ slug: string }>) => {
    showProject(event.detail.slug);
  }) as EventListener);

  window.addEventListener(CLEAR_PROJECT_EVENT, showGrid);
  window.addEventListener(SYNC_FROM_URL_EVENT, syncFromUrl);

  syncFromUrl();
</script>
```

- [ ] **Step 2: Wire `ProjectsSection` into `src/pages/index.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import BentoDashboard from "../components/BentoDashboard.astro";
import ProjectsSection from "../components/ProjectsSection.astro";
import { profile } from "../data/profile";
import { projects } from "../data/projects";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.links.github,
  sameAs: [profile.links.github, profile.links.linkedin].filter(Boolean),
};
---
<BaseLayout
  title="Jared Ryan | Product-Minded Full-Stack Engineer"
  description={profile.heroParagraphs[0]}
  structuredData={structuredData}
>
  <main>
    <BentoDashboard />
    <ProjectsSection projects={projects} />
  </main>
</BaseLayout>

<script>
  import { initSectionNav } from "../utils/sectionNav";
  initSectionNav();
</script>
```

Keep the `initSectionNav()` script block carried over from Task 11 — this is the same file being replaced, not a new one, so don't drop it.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds; `astro check` type-checks the `<script>` block's custom-event casts cleanly.

- [ ] **Step 4: Manual verification**

Run `npm run preview` and check:
- Loading `/` shows the Projects grid under `#projects`.
- Clicking a project card shows its detail view (grid hides, carousel/bullets/pills/links show) and the URL becomes `/?project=<slug>#projects` without a page reload.
- Clicking "Projects" in the detail breadcrumb returns to the grid and removes `?project` from the URL.
- Loading `/?project=campfire#projects` directly shows the Campfire detail panel immediately.
- Clicking the dashboard Projects-preview "View full project →" link jumps to `#projects` already showing the correct project detail.
- From `/?project=campfire#projects`, click the "Dashboard" breadcrumb and confirm the URL becomes `/#dashboard` (not `/?project=campfire#dashboard`) and focus moves to the dashboard section.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectsSection.astro src/pages/index.astro
git commit -m "feat: add full ProjectsSection with grid/detail URL state"
```

---

### Task 14: Full ExperienceSection

**Files:**
- Create: `src/components/ExperienceSection.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `experience`, `Breadcrumbs`, `PillList`, `MetricChips`, `sectionNav` event constants (`SELECT_ROLE_EVENT`, `CLEAR_ROLE_EVENT`, `SYNC_FROM_URL_EVENT`), `getQueryParam`, `setSectionState`.
- Produces: `#experience` section with a desktop career-spine + detail-panel layout and a mobile accordion, both reacting to `?role=<slug>`. Default selected role: `gold-ocean` (most recent). Each of the 7 detail panels uses a slug-specific heading id (`experience-detail-heading-<slug>`) for the same reason as `ProjectsSection` — all panels are pre-rendered simultaneously, so no id may repeat.

- [ ] **Step 1: Create `src/components/ExperienceSection.astro`**

```astro
---
import type { ExperienceEntry } from "../data/experience";
import Breadcrumbs from "./Breadcrumbs.astro";
import PillList from "./PillList.astro";
import MetricChips from "./MetricChips.astro";

interface Props {
  entries: ExperienceEntry[];
}

const { entries } = Astro.props;
const defaultSlug = "gold-ocean";

function dateLabel(entry: ExperienceEntry): string {
  if (entry.kind === "education") return String(entry.date ?? "");
  return `${entry.start} — ${entry.end}`;
}
---
<section id="experience" class="experience-section" aria-labelledby="experience-heading">
  <Breadcrumbs
    trail={[
      { label: "Dashboard", href: "#dashboard", dashboardLink: true },
      { label: "Experience" },
    ]}
  />
  <h2 id="experience-heading" tabindex="-1">Experience</h2>

  <div class="experience-layout">
    <nav class="experience-spine" aria-label="Career timeline">
      {entries.map((entry) => (
        <button
          type="button"
          class="experience-spine__item"
          data-spine-role={entry.slug}
          aria-pressed={entry.slug === defaultSlug ? "true" : "false"}
        >
          <span class="experience-spine__kind">{entry.kind === "work" ? "Work" : "Education"}</span>
          <span class="experience-spine__title">{entry.company ?? entry.institution}</span>
          <span class="experience-spine__dates">{dateLabel(entry)}</span>
        </button>
      ))}
    </nav>

    <div class="experience-detail">
      {entries.map((entry) => (
        <article
          class="experience-detail__panel"
          id={`experience-detail-${entry.slug}`}
          data-role-detail={entry.slug}
          hidden={entry.slug !== defaultSlug}
        >
          <h3 id={`experience-detail-heading-${entry.slug}`} tabindex="-1">
            {entry.title} {entry.company ? `· ${entry.company}` : ""}
          </h3>
          <p class="experience-detail__dates">
            {dateLabel(entry)}{entry.location ? ` · ${entry.location}` : ""}
          </p>
          <p class="experience-detail__oneliner">{entry.oneLiner}</p>
          {entry.metricChips.length > 0 && <MetricChips chips={entry.metricChips} />}
          {entry.bullets.length > 0 && (
            <ul class="experience-detail__bullets">
              {entry.bullets.map((bullet) => <li>{bullet}</li>)}
            </ul>
          )}
          <PillList pills={entry.pills} variant="detail" />
        </article>
      ))}
    </div>
  </div>

  <div class="experience-accordion">
    {entries.map((entry) => (
      <details class="experience-accordion__item" data-accordion-role={entry.slug} open={entry.slug === defaultSlug}>
        <summary>
          <span class="experience-spine__title">{entry.company ?? entry.institution}</span>
          <span class="experience-spine__dates">{dateLabel(entry)}</span>
        </summary>
        <p class="experience-detail__oneliner">{entry.oneLiner}</p>
        {entry.metricChips.length > 0 && <MetricChips chips={entry.metricChips} />}
        {entry.bullets.length > 0 && (
          <ul class="experience-detail__bullets">
            {entry.bullets.map((bullet) => <li>{bullet}</li>)}
          </ul>
        )}
        <PillList pills={entry.pills} variant="detail" />
      </details>
    ))}
  </div>
</section>

<style>
  .experience-section {
    min-height: 100svh;
    padding-block: var(--space-8);
  }

  .experience-layout {
    display: none;
    gap: var(--space-6);
  }

  .experience-spine {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-width: 220px;
  }

  .experience-spine__item {
    text-align: left;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: var(--space-2) var(--space-3);
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }

  .experience-spine__item[aria-pressed="true"] {
    border-color: var(--color-accent-teal);
    background: var(--color-surface-alt);
  }

  .experience-spine__kind {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
  }

  .experience-detail {
    flex: 1;
  }

  .experience-detail__panel {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .experience-detail__bullets {
    padding-left: 1.2rem;
    color: var(--color-text-muted);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .experience-accordion {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .experience-accordion__item {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-4);
  }

  .experience-accordion__item summary {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    font-weight: 700;
  }

  @media (min-width: 900px) {
    .experience-layout {
      display: flex;
    }
    .experience-accordion {
      display: none;
    }
  }
</style>

<script>
  import {
    CLEAR_ROLE_EVENT,
    SELECT_ROLE_EVENT,
    SYNC_FROM_URL_EVENT,
  } from "../utils/sectionNav";
  import { getQueryParam, setSectionState } from "../utils/urlState";

  const spineItems = document.querySelectorAll<HTMLButtonElement>("[data-spine-role]");
  const detailPanels = document.querySelectorAll<HTMLElement>("[data-role-detail]");
  const accordionItems = document.querySelectorAll<HTMLDetailsElement>("[data-accordion-role]");
  const defaultSlug = "gold-ocean";

  function selectRole(slug: string) {
    const validSlugs = Array.from(detailPanels).map((p) => p.dataset.roleDetail);
    const target = validSlugs.includes(slug) ? slug : defaultSlug;

    spineItems.forEach((item) => {
      item.setAttribute("aria-pressed", String(item.dataset.spineRole === target));
    });
    detailPanels.forEach((panel) => {
      panel.hidden = panel.dataset.roleDetail !== target;
    });
    // Setting .open on every item (not just the target) is what keeps the
    // mobile accordion single-selection: any other item that was previously
    // open gets closed here, so at most one role is ever expanded at a time —
    // matching the desktop career-spine model where exactly one is selected.
    accordionItems.forEach((item) => {
      item.open = item.dataset.accordionRole === target;
    });
  }

  function syncFromUrl() {
    const slug = getQueryParam("role");
    selectRole(slug ?? defaultSlug);
  }

  spineItems.forEach((item) => {
    item.addEventListener("click", () => {
      const slug = item.dataset.spineRole;
      if (!slug) return;
      selectRole(slug);
      setSectionState({ key: "role", value: slug, hash: "#experience" });
    });
  });

  accordionItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      const slug = item.dataset.accordionRole;
      if (!slug) return;
      // selectRole() closes every other accordion item so only one stays
      // open, and keeps the desktop spine/detail panel (both present in the
      // DOM at once, just hidden by CSS at this breakpoint) in sync too.
      selectRole(slug);
      setSectionState({ key: "role", value: slug, hash: "#experience" });
    });
  });

  window.addEventListener(SELECT_ROLE_EVENT, ((event: CustomEvent<{ slug: string }>) => {
    selectRole(event.detail.slug);
  }) as EventListener);

  window.addEventListener(CLEAR_ROLE_EVENT, () => selectRole(defaultSlug));
  window.addEventListener(SYNC_FROM_URL_EVENT, syncFromUrl);

  syncFromUrl();
</script>
```

- [ ] **Step 2: Wire `ExperienceSection` into `src/pages/index.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import BentoDashboard from "../components/BentoDashboard.astro";
import ExperienceSection from "../components/ExperienceSection.astro";
import ProjectsSection from "../components/ProjectsSection.astro";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { experience } from "../data/experience";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.links.github,
  sameAs: [profile.links.github, profile.links.linkedin].filter(Boolean),
};
---
<BaseLayout
  title="Jared Ryan | Product-Minded Full-Stack Engineer"
  description={profile.heroParagraphs[0]}
  structuredData={structuredData}
>
  <main>
    <BentoDashboard />
    <ExperienceSection entries={experience} />
    <ProjectsSection projects={projects} />
  </main>
</BaseLayout>

<script>
  import { initSectionNav } from "../utils/sectionNav";
  initSectionNav();
</script>
```

Keep the `initSectionNav()` script block carried over from Tasks 11/13 — don't drop it.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Manual verification**

Run `npm run preview` and check:
- Desktop width (≥900px): career spine + detail panel show side by side; Gold Ocean is selected by default.
- Below 900px: accordion list shows instead, Gold Ocean expanded by default.
- Clicking a spine item (or expanding an accordion item) updates the detail panel/accordion and the URL to `?role=<slug>#experience` without reload.
- Opening a different accordion item on mobile closes whichever one was previously open — confirm at most one is ever expanded at a time.
- Loading `/?role=mantl#experience` directly selects MANTL immediately.
- Clicking the dashboard Experience-preview "View full experience →" link jumps to `#experience` with the correct role already selected.
- From `/?role=mantl#experience`, click the "Dashboard" breadcrumb and confirm the URL becomes `/#dashboard` (not `/?role=mantl#dashboard`) and focus moves to the dashboard section.

- [ ] **Step 5: Commit**

```bash
git add src/components/ExperienceSection.astro src/pages/index.astro
git commit -m "feat: add full ExperienceSection with career spine and URL state"
```

---

### Task 15: Placeholder project screenshots, resume, and graceful missing-image handling

**Files:**
- Create: `public/projects/lpa-tracker/{cover,01,02,03}.svg`
- Create: `public/projects/campfire/{cover,01,02,03}.svg`
- Create: `public/projects/unity-roguelike/{cover,01,02,03}.svg`
- Create: `public/projects/nest-invaders/{cover,01,02,03}.svg`
- Create: `public/projects/when-bunnies-attack/{cover,01,02,03}.svg`
- Create: `public/resume/Jared_Ryan_Resume.pdf` (placeholder)

**Interfaces:**
- Produces: files at every path already referenced by `src/data/projects.ts` (Task 3) and `profile.links.resume` (Task 3) — no code changes needed elsewhere since those paths are already correct.

- [ ] **Step 1: Generate one placeholder SVG per screenshot slot**

Create each `public/projects/<slug>/<name>.svg` with this template, substituting `TITLE` and `LABEL`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="960" height="600" viewBox="0 0 960 600">
  <rect width="960" height="600" fill="#EEF6F8"/>
  <rect x="24" y="24" width="912" height="552" rx="16" fill="none" stroke="#D7E3EA" stroke-width="2"/>
  <text x="480" y="290" font-family="sans-serif" font-size="28" fill="#102033" text-anchor="middle">TITLE</text>
  <text x="480" y="330" font-family="sans-serif" font-size="16" fill="#526173" text-anchor="middle">LABEL — placeholder screenshot</text>
</svg>
```

Concretely, run this script once to generate all 20 files:

```bash
#!/usr/bin/env bash
set -euo pipefail

declare -A titles=(
  [lpa-tracker]="LPA Tracker"
  [campfire]="Campfire"
  [unity-roguelike]="Unity 2D Roguelike"
  [snack-attack]="Snack Attack"
  [when-bunnies-attack]="When Bunnies Attack"
)

for slug in "${!titles[@]}"; do
  mkdir -p "public/projects/$slug"
  title="${titles[$slug]}"
  for name in cover 01 02 03; do
    cat > "public/projects/$slug/$name.svg" <<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="960" height="600" viewBox="0 0 960 600">
  <rect width="960" height="600" fill="#EEF6F8"/>
  <rect x="24" y="24" width="912" height="552" rx="16" fill="none" stroke="#D7E3EA" stroke-width="2"/>
  <text x="480" y="290" font-family="sans-serif" font-size="28" fill="#102033" text-anchor="middle">$title</text>
  <text x="480" y="330" font-family="sans-serif" font-size="16" fill="#526173" text-anchor="middle">$name — placeholder screenshot</text>
</svg>
SVG
  done
done
```

Save this as `/tmp/gen-placeholders.sh` and run: `bash /tmp/gen-placeholders.sh`
Expected: 20 `.svg` files created under `public/projects/`.

- [ ] **Step 2: Add a placeholder resume PDF**

There is no real resume file to include yet (FRONTEND_SPEC.md §15: "Add/update final resume PDF"). Create a minimal valid one-page PDF placeholder so the `Resume` link in HeroCard doesn't 404:

```bash
mkdir -p public/resume
cat > public/resume/Jared_Ryan_Resume.pdf <<'PDF'
%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 92 >>
stream
BT /F1 18 Tf 72 700 Td (Jared Ryan - Resume placeholder. Replace before sending to recruiters.) Tj ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
0
%%EOF
PDF
```

Expected: `public/resume/Jared_Ryan_Resume.pdf` exists and opens in a PDF viewer showing the placeholder text.

- [ ] **Step 3: Verify build and image rendering**

Run: `npm run build && npm run preview`
Expected: All project cover/thumbnail images render the placeholder SVGs (no broken-image icons) in the dashboard preview, full Projects grid, and project detail carousels. Clicking "Resume" downloads/opens the placeholder PDF.

- [ ] **Step 4: Commit**

```bash
git add public/projects public/resume
git commit -m "feat: add placeholder project screenshots and resume PDF"
```

---

### Task 16: Reduced-motion, keyboard, and responsive accessibility pass

**Files:**
- Modify: `src/components/ExperiencePreview.astro` (focus-visible check only, no code expected to change if Task 4-14 styles are correct)
- Modify: `src/styles/global.css` (add any gaps found)
- Modify: any component where the manual audit below finds a real defect

**Interfaces:**
- No new interfaces — this task is a verification + targeted-fix pass against CLAUDE.md §6 and FRONTEND_SPEC.md §§10, 12.

- [ ] **Step 1: Keyboard-only pass**

Run `npm run preview`. Using only Tab/Shift+Tab/Enter/Space:
- Confirm every interactive element (theme toggle, experience preview role buttons, project thumbnails, expand links, breadcrumbs, spine items, accordion summaries, carousel prev/next/dots, project cards) is reachable in a sensible order and shows a visible focus ring (the global `:focus-visible` rule from Task 2).
- Confirm activating an expand link or breadcrumb moves focus to the destination heading (Task 5's `moveFocusTo`), not just scrolls.
- Record any element that is unreachable or has no visible focus ring, then fix it directly (e.g., missing `type="button"`, a `<div>` used as a button instead of `<button>`, or a missing `tabindex="-1"` target) before continuing.

- [ ] **Step 2: `prefers-reduced-motion` pass**

Enable "reduce motion" in OS accessibility settings, reload:
- Confirm the typewriter cursor stops blinking and no typing animation plays (Task 7).
- Confirm the project carousel does not auto-rotate (Task 12's `prefersReducedMotion` guard) but manual prev/next/dots still work.
- Confirm `global.css`'s reduced-motion media query (Task 2) is not overridden by a more specific rule anywhere; if any component's inline animation ignores it, add a `@media (prefers-reduced-motion: reduce)` override in that component's `<style>` block.

- [ ] **Step 3: Responsive pass at spec'd breakpoints**

Using browser dev tools, check 375px, 430px, 768px, 1024px, and 1440px widths (FRONTEND_SPEC.md §12):
- Bento dashboard collapses to a single column below 1024px with order Hero → Experience preview → Projects preview. `BentoDashboard.astro` (Task 11) already renders its three children in that exact DOM order and only applies `grid-column`/`grid-row` placement at `≥1024px`, so mobile naturally follows DOM order with no override needed — confirm this hasn't regressed (view page source or disable CSS entirely and check the reading order is still Hero → Experience → Projects).
- Projects preview two-column layout becomes one-column below 768px.
- Experience section switches from spine+panel to accordion below 900px.
- Breadcrumbs truncate from the left on narrow widths (Task 4's `@media (max-width: 480px)` rule) without overflowing.
- Theme toggle remains visible and reachable at every width.
- No element causes horizontal page scroll at 375px.

- [ ] **Step 4: Contrast spot-check**

Using browser dev tools' contrast checker (or equivalent), verify body text, muted text, and pill/chip text meet WCAG AA (4.5:1 for normal text) against their backgrounds in both light and dark themes, using the token values from Task 2. Note: `--color-text-muted` (`#526173` light / `#9FB3C8` dark) on `--color-surface-alt` is the most likely borderline case — check it first.

- [ ] **Step 5: Commit any fixes found**

```bash
git add -A
git commit -m "fix: accessibility and responsive issues found in manual audit"
```

(If the audit found no defects, skip this commit — do not create an empty commit.)

---

### Task 17: Final build/typecheck verification and TODO report

**Files:**
- None (verification only), unless Task 16's audit or this task's checks surface a defect, in which case fix it in the relevant existing file.

- [ ] **Step 1: Run the full verification suite**

Run: `npm run test`
Expected: All Vitest suites (Tasks 3, 5) PASS.

Run: `npm run build`
Expected: `astro check` reports 0 errors, 0 warnings; `astro build` completes; `dist/` contains static HTML for `/`.

- [ ] **Step 2: Confirm static/crawler-readable content**

Run: `npm run build`, then inspect `dist/index.html` directly (e.g., `grep` for hero copy, project titles, and experience company names) to confirm the dashboard, full Experience section, and full Projects section content is present as rendered HTML — not only injected by client JS. This directly verifies CLAUDE.md's "Dashboard renders without JavaScript-dependent critical content" QA item.

- [ ] **Step 3: Walk the CLAUDE.md Final QA Checklist**

Confirm each item, using `npm run preview`:
- [ ] Site builds successfully.
- [ ] Dashboard renders without JS-dependent critical content (Step 2 above).
- [ ] Hero copy and typewriter lines match PRODUCT_SPEC.md §§3, 9 verbatim.
- [ ] Theme toggle works and persists across reload.
- [ ] `#experience` and `#projects` anchor navigation works.
- [ ] `?role=mantl#experience` initializes selected Experience state.
- [ ] `?project=campfire#projects` initializes selected Project state.
- [ ] Keyboard users can reach cards, buttons, breadcrumbs, toggles, and carousel controls (Task 16, Step 1).
- [ ] Reduced-motion users get no unnecessary animation (Task 16, Step 2).
- [ ] Mobile layout is readable, correct order, not excessively tall before meaningful content (Task 16, Step 3).
- [ ] No old Skills section exists anywhere (grep the repo for "Skills" to confirm none was accidentally added).
- [ ] No old Experience implementation exists (the repo had no source before this plan ran, so this is satisfied by construction — confirm `git log` shows this plan's commits only touch new files).

- [ ] **Step 4: Report remaining content TODOs to the user**

Summarize (do not silently fix) the following known-open items, all explicitly sanctioned as v1-acceptable by the specs:
- `profile.ts`: `links.linkedin` is empty — needs a real LinkedIn URL (FRONTEND_SPEC.md §15).
- `public/resume/Jared_Ryan_Resume.pdf` is a placeholder — needs the real resume (FRONTEND_SPEC.md §15).
- All `public/projects/*/*.svg` are placeholder graphics — needs real screenshots (FRONTEND_SPEC.md §15, PRODUCT_SPEC.md §12).
- Experience metric chips and pills across all of `experience.ts` are placeholder copy to revisit (PRODUCT_SPEC.md §12, CLAUDE.md "Known Content TODO").
- Gold Ocean bullets/chips should be revisited before active job applications, especially if the real-estate acquisition pipeline isn't built yet (PRODUCT_SPEC.md §11.1, §12).
- LPA Tracker demo availability/GitHub visibility is still TBD (PRODUCT_SPEC.md §10.1, §12).
- `astro.config.mjs`'s `site` (canonical URL) is intentionally unset until a final domain is chosen (FRONTEND_SPEC.md §11).

- [ ] **Step 5: Final commit (only if Steps 1-3 required fixes)**

```bash
git add -A
git commit -m "chore: final QA fixes for portfolio v1"
```

(If no fixes were needed, there is nothing to commit — the plan is complete as of Task 16.)

---

## Self-Review Notes

- **Spec coverage:** Every PRODUCT_SPEC.md §§1-13 and FRONTEND_SPEC.md §§1-15 requirement maps to a task above — hero/typewriter (Tasks 3, 7, 8), theme (Tasks 2, 6), bento layout (Task 11), Experience preview/full (Tasks 9, 14), Projects preview/full/carousel (Tasks 10, 12, 13), URL state + breadcrumbs (Tasks 4, 5, 13, 14), accessibility/responsive/SEO (Tasks 2, 16, 17), placeholder assets (Task 15), non-goals (no Skills section, no backend/CMS/blog, no project routes) are simply never built.
- **Placeholder scan:** No "TBD"/"handle later" steps remain; the only `TODO:` comments left in shipped code are ones the specs themselves explicitly sanction for v1 (LinkedIn URL, resume PDF, screenshots, canonical domain) and are called out explicitly in Task 17 Step 4 rather than hidden.
- **Type consistency:** `ExperienceEntry`, `Project`, `ProjectLink` (Task 3) are used with identical field names in Tasks 9, 10, 13, 14. `urlState.ts`'s `setSectionState`/`clearSectionState`/`getQueryParam` signatures (Task 5) match FRONTEND_SPEC.md §9 exactly and are used identically in Tasks 13-14. `sectionNav.ts` event constants are exported once (Task 5) and imported by name (not re-declared) in Tasks 13-14.
- **Correction pass (post-draft review):** incorporated 10 reviewer-caught defects from the first draft: (1) dependency versions are now installed via `npm create astro@latest` + `@latest` installs instead of hand-pinned, (2) theme init priority (saved → OS-dark → light) is now stated explicitly in Global Constraints and commented inline in the anti-FOUC script, (3) `initSectionNav()` is now actually imported and called from every version of `index.astro` (Tasks 11, 13, 14) — previously defined but never invoked, so every `data-role-link`/`data-project-link` click would have done nothing, (4) `ExperiencePreview`'s JSON data `<script>` now precedes its executable `<script>` in document order, (5) the Experience preview expand link now defaults to `data-role-link="gold-ocean"` instead of `data-role-link=""` (an empty string is falsy, so the old version's expand link would never have triggered `sectionNav.ts`'s click handler), (6) `project-detail-heading`/`experience-detail-heading` are now per-slug ids (`-<slug>` suffix) since all 5/7 panels are pre-rendered simultaneously and duplicate ids are invalid HTML — `sectionNav.ts`'s `moveFocusTo` calls were updated to build the slug-specific selector, (7) `PillList`'s styles are now `is:global` because `ExperiencePreview`/`ProjectsPreview` rebuild pill `<li>`s via `document.createElement`, which never receive Astro's scoped-style attribute, (8) `ProjectCarousel` now tracks its ancestor panel's `hidden` state via `MutationObserver` and only auto-rotates while visible, resetting to slide 0 on reveal, instead of all 5 carousels running simultaneously in the background, (9) `BentoDashboard` now renders `HeroCard`/`ExperiencePreview`/`ProjectsPreview` as flat siblings in that DOM order with pure CSS grid placement (`grid-column`/`grid-row`, `:global()` selectors) for the desktop 2-column look, instead of nesting Projects before Experience in a wrapper div that produced the wrong mobile/no-CSS order.
- **Correction pass 2 (final pre-implementation review):** (1) the Tech Stack line at the top now says "Astro latest stable" instead of the stale "Astro 5," matching Task 1's `npm create astro@latest` scaffold, (2) Task 14's `<Breadcrumbs>` code snippet no longer contains the invalid `id="experience-breadcrumbs"` prop — it's correct in the snippet itself rather than fixed in a follow-up step, (3) `ExperienceSection`'s spine-click and accordion-toggle handlers now call `setSectionState({ key: "role", value: slug, hash: "#experience" })` instead of a raw `window.history.pushState(...)`, so URL updates go through the same shared utility as every other selection and preserve unrelated query params, (4) the mobile accordion's toggle handler now calls `selectRole(slug)` before updating the URL, which closes any other open `<details>` so at most one role is expanded at a time, (5) `Breadcrumbs`' `Crumb` type gained a `dashboardLink?: boolean` field, rendered as `data-dashboard-link`; `sectionNav.ts` handles it by clearing both `role` and `project` params in a single `pushState`, setting `#dashboard`, and moving focus there — every "Dashboard" breadcrumb in Tasks 13-14 now sets `dashboardLink: true` (keeping `href="#dashboard"` for no-JS fallback) so returning to the dashboard from a selected role/project no longer leaves a stale `?role=`/`?project=` in the URL, (6) `global.css` now sets `color-scheme` per theme (`:root { color-scheme: light }` / `[data-theme="dark"] { color-scheme: dark }`) instead of a static `html { color-scheme: light dark }`, so native browser controls track the actually-applied theme rather than just the OS preference.
