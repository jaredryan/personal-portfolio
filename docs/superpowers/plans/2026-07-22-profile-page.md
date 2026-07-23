# Profile Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an optional, recruiter-friendly `/profile` page reachable from a new expand control on the dashboard Hero card, using the supplied copy verbatim, without disturbing the existing Coastal Systems + Spark system, dashboard bento, or Experience/Projects pages.

**Architecture:** Follow the existing Experience/Projects page pattern exactly — a `src/pages/profile.astro` route wrapping a new `ProfileSection.astro` component (breadcrumb + page-utility-row + page-title-group + content + `ContactDrawer`), fed by a small typed data file holding the supplied copy verbatim. The Hero card's existing top-right slot (currently `ThemeToggle`) is replaced by a new expand link reusing the dashboard's existing `arrow-up-right` expand-icon pattern (currently duplicated across `ExperiencePreview`/`ProjectsPreview`); `ThemeToggle` moves into the Hero's action row. No new dependencies, no JS beyond what CSS/semantic HTML can't do (page-entry motion is pure CSS).

**Tech Stack:** Astro (`.astro` components/pages), TypeScript data modules, Vitest (jsdom) for data-level tests, existing `tokens.css`/`global.css` design tokens only.

## Global Constraints

- Use the supplied Profile-page copy verbatim — no rewriting, shortening, expanding, or added transition/metric copy. Layout adapts to the copy, not the reverse.
- Preserve: Coastal Systems + Spark tokens, dashboard bento structure, current Hero/Experience/Projects copy and data, Ryan Legal PC entry, footer source link, responsive behavior, animation system, `prefers-reduced-motion` handling, breadcrumb styling, SEO/metadata setup, both themes, existing focus/a11y fixes.
- Do not: restore Gold Ocean Holdings or the earlier startup, add/mention the cooking app, touch résumé content, touch Project copy/links, touch Snack Attack, add a Profile dashboard bento tile, make the whole Hero card clickable, redesign the Contact drawer, add new dependencies, add a CMS or generic timeline framework, do unrelated refactors.
- Route: `/profile` (matches the site's existing no-trailing-slash convention used by `/experience` and `/projects` — see Task 3 note).
- One `h1` on the Profile page ("The path behind the work"); `h2` for "How I got here" / "What I bring now"; `h3` for the three chapter headings and three value headings. Chapter numbers are decorative, not separately announced headings.

---

### Task 1: Profile copy data module + verbatim test

**Files:**
- Create: `src/data/profileNarrative.ts`
- Test: `src/data/profileNarrative.test.ts`

**Interfaces:**
- Produces: `profileNarrative: ProfileNarrative` — consumed by `ProfileSection.astro` (Task 3). Shape:
  ```ts
  export type ProfileNarrative = {
    pageLabel: string;
    heading: string;
    intro: string[];
    journeyHeading: string;
    chapters: { number: string; heading: string; body: string[] }[];
    valuesHeading: string;
    values: { heading: string; body: string }[];
    closing: string;
    closingActions: { view_projects: string; view_experience: string; resume: string; contact: string };
  };
  ```

- [ ] **Step 1: Write the data module with the supplied copy verbatim**

  Straight apostrophes → typographic apostrophes (’) to match the site's existing typographic-apostrophe convention (see `profile.ts`'s "you're"-style copy). No other text changes.

- [ ] **Step 2: Write `profileNarrative.test.ts` asserting the exact supplied strings**

  Mirrors `experience.test.ts`/`profile.test.ts`'s style: assert `chapters.length === 3`, `values.length === 3`, and exact-match key strings (heading, journeyHeading, valuesHeading, each chapter heading, each value heading, closing, closingActions) so any future accidental copy edit fails CI.

- [ ] **Step 3: Run `npx vitest run src/data/profileNarrative.test.ts` — expect PASS**

- [ ] **Step 4: Commit** (only if user asks for a commit at the end of the session — see repo convention; do not commit proactively)

---

### Task 2: Shared expand-link control (consolidate the duplicated `__expand` CSS)

**Files:**
- Modify: `src/styles/global.css` (add `.bento-expand-link`)
- Modify: `src/components/ExperiencePreview.astro` (swap `.experience-preview__expand` → `.bento-expand-link`, delete the now-duplicate CSS block)
- Modify: `src/components/ProjectsPreview.astro` (swap `.projects-preview__expand` → `.bento-expand-link`, delete the now-duplicate CSS block)

**Interfaces:**
- Produces: global class `.bento-expand-link` (1.75rem square, `radius-sm`, coral-text icon, `arrow-up-right` icon at 1.125rem, surface-alt hover) — consumed by Task 3 (Hero) and already-updated Experience/Projects preview headers.

- [ ] **Step 1: Add `.bento-expand-link` to `global.css`**, copying the exact current `.experience-preview__expand` rules (width/height 1.75rem, `border-radius: var(--radius-sm)`, `color: var(--color-accent-coral-text)`, hover `background: var(--color-surface-alt)`, child svg 1.125rem).

- [ ] **Step 2: In `ExperiencePreview.astro` and `ProjectsPreview.astro`, change the expand `<a>`'s class to `bento-expand-link`** and delete the corresponding `.experience-preview__expand` / `.projects-preview__expand` scoped CSS blocks (dead code once the markup no longer references them).

- [ ] **Step 3: Visual check** — dashboard's Experience/Projects preview expand arrows render identically to before (same size/color/hover) in both themes.

---

### Task 3: Hero card — add the Profile expand control, relocate the theme toggle

**Files:**
- Modify: `src/components/HeroCard.astro`

**Interfaces:**
- Consumes: `.bento-expand-link` (Task 2).
- Produces: no new interfaces — purely a markup/CSS change to an existing component.

- [ ] **Step 1: Replace `<ThemeToggle />` in `.hero-card__top`** with:
  ```astro
  <a class="bento-expand-link" href="/profile" aria-label="Read more about Jared">
    <Icon name="lucide:arrow-up-right" aria-hidden="true" />
  </a>
  ```
  This keeps `.hero-card__top`'s existing `justify-content: space-between` layout (identity left, control right) — no structural CSS change needed there.

- [ ] **Step 2: Add `<ThemeToggle />` as the last child of `.hero-card__actions`**, after the LinkedIn link:
  ```astro
  <div class="hero-card__actions">
    <a class="hero-card__resume" ...>Resume</a>
    <a class="hero-card__icon-btn" ...>Email</a>
    <a class="hero-card__icon-btn" ...>GitHub</a>
    {profile.links.linkedin && <a class="hero-card__icon-btn" ...>LinkedIn</a>}
    <ThemeToggle />
  </div>
  ```
  `ThemeToggle.astro` already sets `width/height: 2.5rem`, `aspect-ratio: 1`, `flex-shrink: 0`, `border-radius: var(--radius-lg)` — identical sizing to `.hero-card__icon-btn`, so it drops into the row and wraps correctly with no CSS changes to `ThemeToggle.astro` itself.

- [ ] **Step 3: Keep the `fs`/headshot logic, paragraphs, typewriter untouched** — diff should touch only the two locations above.

- [ ] **Step 4: Manual check (dev server)** — Hero's top-right now shows the coral expand arrow (not the sun/moon icon); action row now ends with the theme toggle; toggling still flips the theme instantly and persists on reload; expand link opens `/profile`.

---

### Task 4: `ContactDrawer` — add Profile to nav, extend `currentPage` type

**Files:**
- Modify: `src/components/ContactDrawer.astro`

**Interfaces:**
- Produces: `Props.currentPage: "profile" | "experience" | "projects"` — consumed by Task 5's `ProfileSection.astro`.

- [ ] **Step 1: Extend the `currentPage` prop type** from `"experience" | "projects"` to `"profile" | "experience" | "projects"`.

- [ ] **Step 2: Reorder `navItems`** to the spec's requested order:
  ```ts
  const navItems = [
    { href: "/", label: "Dashboard", key: "dashboard" },
    { href: "/profile", label: "Profile", key: "profile" },
    { href: "/projects", label: "Projects", key: "projects" },
    { href: "/experience", label: "Experience", key: "experience" },
  ] as const;
  ```

- [ ] **Step 3: No other changes** — the drawer's open/close/focus-trap script is untouched (it already works off `[data-contact-trigger]`/`[data-contact-drawer]` attributes, unaffected by nav item count or order).

---

### Task 5: `ContactTrigger` — optional label override

**Files:**
- Modify: `src/components/ContactTrigger.astro`

**Interfaces:**
- Produces: `Props.label?: string` (defaults to `"Contact"`) — consumed by Task 6's closing "Contact me" action.

- [ ] **Step 1: Add an optional `label` prop**, defaulting to `"Contact"`, rendered in place of the hardcoded text. `aria-label="Open contact options"` stays fixed (it's already fine regardless of visible label).

  ```astro
  interface Props {
    label?: string;
  }
  const { label = "Contact" } = Astro.props;
  ...
  <Icon name="lucide:mail" aria-hidden="true" />
  {label}
  ```

- [ ] **Step 2: Verify existing call sites** (`ExperienceSection.astro`, `ProjectsSection.astro` ×2) render unchanged — they don't pass `label`, so they keep "Contact".

---

### Task 6: `ProfileSection.astro` — the page content

**Files:**
- Create: `src/components/ProfileSection.astro`

**Interfaces:**
- Consumes: `profileNarrative` (Task 1), `Breadcrumbs`, `ContactDrawer` (`currentPage="profile"`, Task 4), `ContactTrigger` (Task 5), `profile.links` (résumé href).
- Produces: the `<section class="profile-section page-shell">` rendered by `src/pages/profile.astro` (Task 7).

- [ ] **Step 1: Header block** — breadcrumb + contact trigger utility row, then eyebrow + h1:
  ```astro
  <div class="page-utility-row">
    <Breadcrumbs trail={[{ label: "Dashboard", href: "/" }, { label: "Profile" }]} />
    <ContactTrigger />
  </div>
  <header class="profile-header">
    <p class="eyebrow">{profileNarrative.pageLabel}</p>
    <h1 id="profile-heading" tabindex="-1">{profileNarrative.heading}</h1>
  </header>
  ```
  `tabindex="-1"` on the `h1` matches the existing `ExperienceSection`/`ProjectsSection` pattern of a focusable, non-tab-stopped page heading (available for a future deep-link focus target; harmless here since nothing currently moves focus to it).

- [ ] **Step 2: Intro** — two `<p class="prose">` from `profileNarrative.intro`.

- [ ] **Step 3: Journey section** — `h2` + an `<ol>` of three `<li>` chapters, each with a decorative number, `h3`, and body paragraphs:
  ```astro
  <section aria-labelledby="profile-journey-heading">
    <h2 id="profile-journey-heading">{profileNarrative.journeyHeading}</h2>
    <ol class="profile-journey">
      {profileNarrative.chapters.map((chapter) => (
        <li class="profile-journey__chapter">
          <span class="profile-journey__number" aria-hidden="true">{chapter.number}</span>
          <h3>{chapter.heading}</h3>
          {chapter.body.map((p) => <p class="prose">{p}</p>)}
        </li>
      ))}
    </ol>
  </section>
  ```
  `aria-hidden="true"` on the number is what keeps a screen reader from announcing "01" as an isolated item before the heading (Task 5's explicit requirement).

- [ ] **Step 4: Values section** — `h2` + three compact panels:
  ```astro
  <section aria-labelledby="profile-values-heading">
    <h2 id="profile-values-heading">{profileNarrative.valuesHeading}</h2>
    <div class="profile-values">
      {profileNarrative.values.map((value) => (
        <div class="profile-value">
          <h3>{value.heading}</h3>
          <p>{value.body}</p>
        </div>
      ))}
    </div>
  </section>
  ```

- [ ] **Step 5: Closing** — copy + four actions reusing established interactions (résumé download, internal links, Contact drawer trigger):
  ```astro
  <section class="profile-closing">
    <p class="prose">{profileNarrative.closing}</p>
    <div class="profile-closing__actions">
      <a class="profile-closing__primary" href="/projects">{profileNarrative.closingActions.view_projects}</a>
      <a class="profile-closing__secondary" href="/experience">{profileNarrative.closingActions.view_experience}</a>
      <a class="profile-closing__secondary" href={profile.links.resume} download>{profileNarrative.closingActions.resume}</a>
      <ContactTrigger label={profileNarrative.closingActions.contact} />
    </div>
  </section>
  <ContactDrawer currentPage="profile" />
  ```
  Note: `profile` (from `../data/profile`) needs importing for `profile.links.resume`.

- [ ] **Step 6: Styles** — scoped `<style>` block:
  - `.profile-header` — eyebrow + h1, generous bottom margin (reuse `--space-6`/`--space-8`).
  - Content column capped to a readable measure (`max-width: 68ch` or similar — wider than `.prose`'s 62ch since headings/chapters read fine a touch wider, narrow enough to avoid full-viewport-width paragraphs on desktop, per Task 6/7's explicit "no full-viewport stretch" requirement).
  - `.profile-journey` — `list-style: none`, thin left border (`border-left: 2px solid var(--color-border)`) as the "chapter rail," each `li` padded left with the number absolutely positioned on the rail (or inline before the heading on narrow screens — verify no overlap at 390px). Single column at every viewport width (explicitly avoids the spec's "no alternating on mobile" risk by never alternating at any width).
  - `.profile-values` — `display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))`, `gap: var(--space-4)`; each `.profile-value` styled like a light card (`background: var(--color-surface-alt)` or bordered panel, consistent with `.pill`/existing muted-panel treatment — not a heavy shadow card, to stay "secondary to the main narrative" per spec).
  - `.profile-closing__primary` — same visual recipe as `.hero-card__resume` (filled `--color-primary`, hover teal).
  - `.profile-closing__secondary` — same visual recipe as `.contact-trigger` (outlined primary, hover teal); `ContactTrigger`'s own scoped `.contact-trigger` class already gives the "Contact me" instance this look for free, so only the two secondary `<a>` tags need this class explicitly.
  - Page-entry motion: a `profile-enter` keyframe (transform: translateY + opacity only) applied to `.profile-header`, and a staggered variant (`animation-delay` via `:nth-child`) on the three `.profile-journey__chapter` items and three `.profile-value` panels. No JS — reduced-motion is already handled globally (`global.css`'s blanket `prefers-reduced-motion` rule clamps every `animation-duration` to ~0), so no local override needed, matching the existing sitewide convention (see `BentoDashboard.astro`'s comment on the same point).

- [ ] **Step 7: Responsive check points to hit while styling** (manual, via dev server + resize / device toolbar): 390×844 portrait, 844×390 landscape, a tall-tablet size (e.g. 1024×1366), a short-height laptop-ish size (e.g. 1280×720), and a standard desktop width. No horizontal overflow at any of them; chapter numbers stay adjacent to their headings; action row wraps instead of compressing.

---

### Task 7: `/profile` route

**Files:**
- Create: `src/pages/profile.astro`

**Interfaces:**
- Consumes: `ProfileSection` (Task 6), `BaseLayout`.

- [ ] **Step 1: Create the page**, mirroring `experience.astro`/`projects.astro` exactly:
  ```astro
  ---
  import BaseLayout from "../layouts/BaseLayout.astro";
  import ProfileSection from "../components/ProfileSection.astro";
  ---
  <BaseLayout
    title="Profile | Jared Ryan"
    description="The path behind Jared Ryan’s work: professional software development, real estate ownership, and a deliberate return to building practical products."
  >
    <main>
      <ProfileSection />
    </main>
  </BaseLayout>
  ```
  No `structuredData` prop passed — matching `experience.astro`/`projects.astro`'s own convention (only the homepage carries the `WebSite`/`ProfilePage`/`Person` `@graph`). This is also what avoids creating a second, conflicting `schema.org` `ProfilePage` entity: the homepage already owns that type for `/`. Canonical URL, Open Graph, and Twitter tags are all derived automatically by `BaseLayout` from `title`/`description`/`Astro.url.pathname`, same as every other page — no extra work needed.

  Straight apostrophe in the description → typographic apostrophe (’), matching the "minor typographic normalization" allowance.

- [ ] **Step 2: Sitemap** — no config change needed; `@astrojs/sitemap`'s filter only excludes `/404`, so `/profile` is picked up automatically once the route exists.

---

### Task 8: Build + test verification (run once)

**Files:** none (verification only)

- [ ] **Step 1: `npm run test`** — expect all existing tests plus the new `profileNarrative.test.ts` to pass.
- [ ] **Step 2: `npm run build`** — expect `astro check` (typecheck), `vitest run`, and `astro build` (including sitemap generation) to all succeed; confirm `dist/profile/index.html` (or equivalent) and `dist/sitemap-*.xml` (containing `/profile`) exist in the output.
- [ ] **Step 3: Manual/dev-server pass** covering the checklist in the original brief's Task 12 (Hero control, theme toggle relocation, Profile page content/copy/headings/breadcrumb/actions, both themes, keyboard tab order, reduced motion, the four viewport sizes) — run once, fix-and-repeat only if something is actually broken.

---

## Self-Review Notes

- **Spec coverage:** Tasks 1–7 cover brief Tasks 1–11 (Hero control → Task 3; theme toggle → Task 3; route/shell/breadcrumb/label/heading → Tasks 6–7; verbatim copy → Task 1; semantics/heading hierarchy → Task 6; visual direction/responsive/motion → Task 6; nav integration → Task 4; metadata/sitemap → Task 7; implementation organization → Tasks 1/6/7 file layout). Task 8 covers brief Task 12.
- **No placeholders:** every step above names exact files/classes/props; the one open judgment call (exact rail/value-panel pixel styling) is deliberately left to implementation-time visual iteration rather than being a vague "add styling" step, since CSS values here are a design decision, not a spec requirement — the design constraints (single-column rail, auto-fit value grid, no shadow-heavy cards, transform/opacity-only motion) are all pinned down explicitly.
- **Type consistency:** `ProfileNarrative` (Task 1) field names match `ProfileSection.astro`'s usage (Task 6) exactly; `ContactDrawer`'s `currentPage` union (Task 4) matches the `"profile"` value passed in Task 6; `ContactTrigger`'s new `label` prop (Task 5) matches its call site in Task 6.
