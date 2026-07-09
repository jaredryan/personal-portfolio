# Frontend Spec: Jared Ryan Portfolio Redesign

## 1. Implementation Goal

Rebuild the portfolio from scratch as a static-first Astro + TypeScript site, preserving useful content from the current portfolio but replacing the old client-side React SPA architecture and component design.

The implementation should prioritize:

- Static HTML output for critical content
- Fast loading
- Clean responsive design
- Accessible interaction patterns
- Small, intentional JavaScript islands
- Easy future content edits through typed data files

## 2. Recommended Stack

```text
Astro
TypeScript
Plain CSS with CSS custom properties
Vanilla JS or small framework islands only where useful
Netlify deployment
```

Avoid bringing in a full UI framework unless necessary.

Build the Experience section as a fresh custom Career Spine + Detail Panel. Use the pasted Experience source only for copy/data, not as a UI or component reference.

## 3. Migration Notes

Current repo:

```text
https://github.com/jaredryan/personal-portfolio
```

The pasted Experience source contains the work and education copy to preserve. Treat it strictly as content/data input. Do not reference, preserve, or imitate any previous Experience UI or component behavior.

Do not preserve:

- Current client-side React SPA architecture
- Current Skills section
- Any previous Experience UI/component implementation
- Current hamburger/contact hiding pattern
- Old heavy background-image section style

Preserve:

- Work and education text/content only
- The broad idea that Experience is chronological
- The new planned Career Spine + Detail Panel direction described in this spec
- Blue/clean visual preference, updated into Coastal Systems + Spark

## 4. Proposed File Structure

```text
src/
  components/
    BentoDashboard.astro
    HeroCard.astro
    ExperiencePreview.tsx or .astro
    ProjectsPreview.tsx or .astro
    ExperienceSection.tsx or .astro
    ProjectsSection.tsx or .astro
    Breadcrumbs.astro
    PillList.astro
    MetricChips.astro
    ThemeToggle.tsx
    TypewriterTicker.tsx
    ProjectCarousel.tsx
  data/
    profile.ts
    projects.ts
    experience.ts
  layouts/
    BaseLayout.astro
  pages/
    index.astro
  styles/
    global.css
    tokens.css
  utils/
    urlState.ts
    focus.ts
public/
  resume/Jared_Ryan_Resume.pdf
  projects/
    lpa-tracker/
      cover.png
      01.png
      02.png
      03.png
    campfire/
      cover.png
      01.png
      02.png
      03.png
    unity-roguelike/
      cover.png
      01.png
      02.png
      03.png
    nest-invaders/
      cover.png
      01.png
      02.png
      03.png
    when-bunnies-attack/
      cover.png
      01.png
      02.png
      03.png
```

If using `.tsx` islands, keep them focused and small. Static content should remain available in Astro-rendered HTML where practical.

## 5. Data Models

### 5.1 profile.ts

```ts
export const profile = {
  name: "Jared Ryan",
  role: "Product-Minded Full-Stack Engineer",
  heroParagraphs: [
    "I build polished, practical software for messy real-world workflows — the kind where product judgment, frontend details, and reliable systems all matter.",
    "Lately, I use AI to move faster, but I build step by step and review carefully for strong UX, clean code, and reliability."
  ],
  links: {
    resume: "/resume/Jared_Ryan_Resume.pdf",
    email: "mailto:YOUR_EMAIL_HERE",
    github: "https://github.com/jaredryan",
    linkedin: "YOUR_LINKEDIN_URL_HERE"
  },
  currentlyLines: [
    "First things first: make sure you’re building something somebody actually wants.",
    "I love software where the flows feel obvious and natural.",
    "When I have the energy, you’ll find me on a local hike or locked into a game on the living room chair.",
    "When I don’t have the energy, same chair — Netflix, Webtoons, and pretending one more episode was planned.",
    "I’m serious about clean code, but not very serious about pretending to be serious.",
    "Somehow, even meal prep turned into a modular system of bases, sauces, vegetables, and macros."
  ]
};
```

### 5.2 projects.ts

Use this shape:

```ts
type ProjectLink = {
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
```

Initial data:

```ts
export const projects: Project[] = [
  {
    slug: "lpa-tracker",
    title: "LPA Tracker / Broadspan AI Demo",
    oneLiner: "AI document intelligence platform that extracts provisions, supports review workflows, and turns deadlines into trackable tasks.",
    previewPills: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Auth.js", "Document Workflows"],
    detailPills: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Neon", "Auth.js", "Tailwind", "shadcn/ui", "Document Workflows", "Built with AI"],
    links: [
      { label: "Demo available on request", href: "", kind: "request" },
      { label: "Private repo", href: "", kind: "private" }
    ],
    screenshots: {
      cover: "/projects/lpa-tracker/cover.png",
      images: ["/projects/lpa-tracker/01.png", "/projects/lpa-tracker/02.png", "/projects/lpa-tracker/03.png"]
    },
    details: [
      "Built a document review dashboard for fund/legal document workflows, centered on extracted provisions, source context, and review status.",
      "Designed task workflows around deadlines so users can turn document findings into actionable follow-up work.",
      "Built with a modern full-stack architecture and AI-assisted development process, while keeping the current demo static and review-focused."
    ]
  },
  {
    slug: "campfire",
    title: "Campfire",
    oneLiner: "Personal growth journaling app that turns daily reflection, habits, streaks, and AI-assisted insight into a lightweight RPG-inspired loop.",
    previewPills: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Product Design", "Built with AI"],
    detailPills: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Neon", "Auth.js", "Tailwind", "shadcn/ui", "Product Design", "Built with AI"],
    links: [
      { label: "Demo", href: "https://campfirejournal.vercel.app/", kind: "demo" },
      { label: "GitHub", href: "https://github.com/jaredryan/Campfire", kind: "github" }
    ],
    screenshots: {
      cover: "/projects/campfire/cover.png",
      images: ["/projects/campfire/01.png", "/projects/campfire/02.png", "/projects/campfire/03.png"]
    },
    details: [
      "Designed a personal growth product around daily reflection, habits, streaks, and review loops.",
      "Built the app with a modern full-stack TypeScript architecture and structured data model.",
      "Used AI-assisted development while preserving hands-on product direction, UX review, and implementation quality."
    ]
  },
  {
    slug: "unity-roguelike",
    title: "Unity 2D Roguelike Prototype",
    oneLiner: "Unity 2D roguelike prototype with procedural tilemaps, enemy encounters, items, menus, multi-input support, difficulty scaling, and save support.",
    previewPills: ["Unity", "C#", "Game Systems", "Input Handling", "UI Menus", "Level Generation"],
    detailPills: ["Unity", "C#", "Game Systems", "Input Handling", "UI Menus", "Movement", "Animation", "Level Generation", "Difficulty Scaling", "Save System"],
    links: [
      { label: "Demo", href: "https://play.unity.com/en/games/520d503e-5403-4bab-b4c5-02becc961884/2d-roguelike-tutorial", kind: "demo" }
    ],
    screenshots: {
      cover: "/projects/unity-roguelike/cover.png",
      images: ["/projects/unity-roguelike/01.png", "/projects/unity-roguelike/02.png", "/projects/unity-roguelike/03.png"]
    },
    details: [
      "Built from Unity’s 2D Roguelike tutorial, then extended with main, pause, game over, and how-to-play menus.",
      "Added keyboard/mouse, gamepad, and touch support for broader playability.",
      "Added smoother movement, difficulty jumps every two levels, and save support for downloaded builds."
    ]
  },
  {
    slug: "nest-invaders",
    title: "Snack Attack",
    oneLiner: "Galaga-inspired React arcade game with responsive UI and controls, enemy waves, multiple levels, collision logic, and scoring.",
    previewPills: ["React", "JavaScript", "Game Loops", "Collision Logic", "Responsive Controls", "Animation"],
    detailPills: ["React", "JavaScript", "Game Loops", "Collision Logic", "Responsive UI", "Responsive Controls", "CSS", "Animation"],
    links: [
      { label: "Demo", href: "https://nestinvaders.netlify.app/", kind: "demo" },
      { label: "GitHub", href: "https://github.com/jaredryan/nest-invaders/tree/standaloneGame", kind: "github" }
    ],
    screenshots: {
      cover: "/projects/nest-invaders/cover.png",
      images: ["/projects/nest-invaders/01.png", "/projects/nest-invaders/02.png", "/projects/nest-invaders/03.png"]
    },
    details: [
      "Built a standalone arcade-style React game with enemy waves, levels, shooting, collision checks, and scoring.",
      "Implemented responsive controls and UI so the game is playable across screen sizes.",
      "Refined game-loop animation behavior for smoother arcade-style movement."
    ]
  },
  {
    slug: "when-bunnies-attack",
    title: "When Bunnies Attack",
    oneLiner: "Playful, text-based React RPG with exploration, environment interaction, inventory, combat, and bunnies.",
    previewPills: ["React", "JavaScript", "Combat Logic", "Exploration", "Inventory", "Branching Dialogue"],
    detailPills: ["React", "JavaScript", "CSS", "Game State", "Inventory", "Combat Logic", "Exploration", "Branching Dialogue", "Responsive UI"],
    links: [
      { label: "Demo", href: "https://whenbunniesattack.netlify.app/", kind: "demo" },
      { label: "GitHub", href: "https://github.com/jaredryan/when-bunnies-attack", kind: "github" }
    ],
    screenshots: {
      cover: "/projects/when-bunnies-attack/cover.png",
      images: ["/projects/when-bunnies-attack/01.png", "/projects/when-bunnies-attack/02.png", "/projects/when-bunnies-attack/03.png"]
    },
    details: [
      "Built a compact text-based RPG with exploration, environment interactions, inventory, and combat.",
      "Modeled branching dialogue and game state so choices and available actions change based on progress.",
      "Used a playful premise to practice interaction design, state refactoring, and responsive game UI."
    ]
  }
];
```

### 5.3 experience.ts

Use this shape:

```ts
type ExperienceEntry = {
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
```

Initial values should follow PRODUCT_SPEC.md section 11.

Important: mark Experience metric chips and pills as placeholder copy to revisit after v1.

## 6. Theme System

Use CSS custom properties in `tokens.css`.

Example:

```css
:root {
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
}
```

### Theme toggle behavior

- Visible toggle.
- Default to light.
- If user has a saved preference in `localStorage`, use it.
- If no saved preference exists, optionally respect `prefers-color-scheme`.
- Avoid flash of incorrect theme where possible with a small inline script in the document head.

## 7. Layout Requirements

### Global

- Use `box-sizing: border-box`.
- Use fluid spacing with CSS variables.
- Use readable line lengths.
- Use high contrast text.
- Use visible focus states.
- Use `scroll-margin-top` for anchor sections.

### Bento Dashboard

Desktop:

- Main wrapper: `min-height: 100svh` or close, but do not sacrifice content.
- Grid: two columns, left approximately 2fr, right approximately 1fr.
- Left column has Hero top and Projects bottom.
- Right column has Experience spanning the height.

Mobile:

- Single column.
- Hero first, Experience second, Projects third.
- Cards should not require horizontal scrolling except intentional thumbnail/project carousel patterns.

### Full Sections

- `#experience` and `#projects` should each feel like a focused page section.
- Use `min-height: 100svh` where appropriate.
- Avoid true modal overlays.
- Use breadcrumbs at top.

## 8. Component Behavior

### 8.1 TypewriterTicker

Props:

```ts
type TypewriterTickerProps = {
  label: string;
  lines: string[];
};
```

Behavior:

- Types line gradually.
- Pauses.
- Deletes more quickly.
- Moves to next line.
- Loops.
- Cursor uses coral accent.
- Respect `prefers-reduced-motion`; show static first line if reduced motion.
- Do not block rendering or layout.

### 8.2 ExperiencePreview

Props:

```ts
type ExperiencePreviewProps = {
  entries: ExperienceEntry[];
};
```

Behavior:

- Default: show compact role list.
- Clicking a role shows selected teaser.
- Selected teaser shows one-liner and a limited number of pills/chips.
- Expand icon links to `/?role=<slug>#experience` or `#experience` depending on selected state.
- If a role is selected in preview and user expands, preserve that selected role in URL.

### 8.3 ExperienceSection

Behavior:

- Reads `role` query param on load.
- If valid, selects matching role.
- Desktop: career spine + detail panel.
- Mobile: stacked cards/accordions or list/detail pattern.
- Selecting a role updates URL to `?role=<slug>#experience`.
- Breadcrumbs update based on selected role.
- Include work and education entries.

### 8.4 ProjectsPreview

Behavior:

- Default selected project: LPA Tracker.
- Desktop: screenshot/thumbnails left, text/actions right.
- Mobile: one-column.
- Thumbnail clicks swap selected project in preview only; no timer.
- Expand icon links to `/?project=<slug>#projects` for selected project, or `#projects` if design chooses grid-first.

### 8.5 ProjectsSection

Behavior:

- Reads `project` query param on load.
- If valid, shows selected project detail.
- If no project param, shows project grid.
- Selecting a project updates URL to `?project=<slug>#projects`.
- Breadcrumbs:
  - Grid: `Dashboard › Projects`
  - Detail: `Dashboard › Projects › [Project]`
- Project detail includes screenshot carousel.
- Returning to Projects removes `project` param and keeps `#projects`.

### 8.6 ProjectCarousel

Behavior:

- Selected project only.
- Manual previous/next controls.
- Optional auto-rotation.
- Pause on hover/focus.
- Respect `prefers-reduced-motion`.
- Use accessible labels for controls.
- Use alt text for screenshots.

## 9. URL State Utility

Create `src/utils/urlState.ts`.

Responsibilities:

- Read query param.
- Set query param.
- Remove query param.
- Update hash.
- Preserve unrelated query params if possible.
- Use `history.pushState` for selection and `history.replaceState` where appropriate.

Suggested API:

```ts
export function getQueryParam(key: string): string | null;

export function setSectionState(options: {
  key: "project" | "role";
  value: string;
  hash: "#projects" | "#experience";
  replace?: boolean;
}): void;

export function clearSectionState(options: {
  key: "project" | "role";
  hash: "#projects" | "#experience";
  replace?: boolean;
}): void;
```

## 10. Accessibility Requirements

- Use semantic sections: `<main>`, `<section>`, `<header>`, `<nav>`.
- Every major section has a proper heading.
- Breadcrumbs should use `<nav aria-label="Breadcrumb">`.
- Cards that behave like buttons should be actual `<button>` elements or links.
- Project/role thumbnails must be keyboard accessible.
- Focus visibly moves after anchor navigation/selection.
- Respect `prefers-reduced-motion`.
- Use alt text for project screenshots.
- Avoid text over busy images unless contrast is guaranteed.
- Maintain strong contrast in light and dark themes.

## 11. SEO and Metadata

Add:

- Title: `Jared Ryan | Product-Minded Full-Stack Engineer`
- Meta description based on hero copy.
- Open Graph title/description/image.
- Twitter card metadata.
- Canonical URL once final domain is known.
- Structured data JSON-LD for Person where reasonable.

Critical content must be present in the static HTML source.

## 12. Responsive QA Targets

Test at:

```text
375px mobile
430px large mobile
768px tablet
1024px small laptop/tablet landscape
1440px desktop
```

Check:

- Bento layout collapses cleanly.
- Project preview two-column becomes one-column.
- Experience spine becomes mobile-friendly.
- Breadcrumbs do not overflow awkwardly.
- Theme toggle remains reachable.
- Buttons are not too small on touch devices.

## 13. Performance Requirements

- Avoid heavy animation libraries.
- Optimize images.
- Use lazy loading for below-the-fold project images.
- Keep JavaScript minimal.
- Avoid large UI libraries.
- Aim for excellent Lighthouse performance/accessibility/SEO scores.

## 14. Execution Order for Claude

1. Inspect current repo and confirm whether to migrate in place or create a new Astro app inside the repo.
2. Create Astro + TypeScript setup.
3. Add global tokens, typography, theme system, and base layout.
4. Create `profile.ts`, `projects.ts`, and `experience.ts` from the spec.
5. Build static page structure with `#dashboard`, `#experience`, and `#projects`.
6. Build Bento dashboard.
7. Build Hero card and theme toggle.
8. Build TypewriterTicker.
9. Build ProjectsPreview.
10. Build ExperiencePreview.
11. Build full ProjectsSection with grid/detail state.
12. Build ProjectCarousel.
13. Build full ExperienceSection with career spine/detail panel and mobile cards/accordions.
14. Add URL state helpers and integrate `?project=` / `?role=` behavior.
15. Add breadcrumbs.
16. Add placeholder images and graceful missing-image states.
17. Add SEO metadata.
18. Run responsive, accessibility, and reduced-motion QA.
19. Remove unused legacy dependencies/components if migrating in place.
20. Provide summary of changed files and remaining TODOs.

## 15. Important TODOs After v1 Implementation

- Revisit and refine Experience metric chips and skill/focus pills.
- Replace placeholder screenshots with real project screenshots.
- Add/update final resume PDF.
- Add real email and LinkedIn URL.
- Decide whether LPA Tracker gets a hosted demo and whether GitHub remains private.
- Revisit Gold Ocean wording before active job applications.
- Add future startup role content if appropriate.
