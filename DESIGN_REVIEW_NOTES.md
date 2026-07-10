# Portfolio Design Review Notes — 2026-07-10

Read-only design review pass, Projects-focused, plus the follow-up discussion it led to. The two must-fix items below are implemented in [PR #55](https://github.com/jaredryan/personal-portfolio/pull/55). Everything else is discussion/ideas — nothing past that PR has been built.

---

## Part 1: The Review

### Overall verdict

The site is close to done and reads as genuinely portfolio-ready, not a work-in-progress. Real screenshots make a big difference — the Projects page in particular went from "structurally fine" to "actually shows the work." The visual system (Coastal Systems + Spark: navy/blue/teal/coral/sand, Sora + Inter, restrained card-and-border language) is applied consistently across Dashboard, Projects, and Experience, and it avoids every generic-AI-portfolio tell — no corner brackets, connector lines, glow, or fake browser chrome anywhere in the system itself.

### What's working well

- Consistent card language (radius, border, shadow, surface-alt) makes Dashboard, Projects, and Experience feel like one system.
- Typography pairing (Sora display + Inter body + mono for the typewriter) is deliberate and gives the site personality without being loud.
- Genuine restraint — no decorative flourish anywhere found.
- Deep-linking (`?role=mantl`, `?project=campfire`) works correctly and initializes selected state on both desktop and mobile.
- Focus handling after selection is excellent — visible teal focus rings land on the right target with no scroll-jump weirdness.
- Private/no-demo project states (LPA Tracker's "Demo available on request" / "Private repo") handled with a distinct muted-pill style rather than a broken button.
- Mobile Experience accordion is a strong pattern — all entries stay scannable, one expands in place.
- No horizontal overflow at 375px on any of the three main pages.
- Dark mode well-tuned overall — light screenshots (e.g. Campfire's cream cover) actually pop nicely against the dark background.
- Demo/GitHub/Contact button hierarchy correctly weighted (filled Demo > outlined Contact > plain GitHub).

### Main issues found (ordered by importance)

1. **[FIXED in PR #55]** Projects page carousel auto-rotated every 6s by default, contradicting the project's own "user-controlled carousel" rule — and had a real bug: the desktop showcase carousel's timer kept running while CSS-hidden below the 900px breakpoint, so crossing into desktop width could show a blank frame or land on a random slide.
2. **[FIXED in PR #55]** IBM and V School logo images (dark marks on transparent PNG) were nearly invisible in dark mode.
3. **[FIXED in PR #55]** Unity 2D Roguelike screenshots showed real YouTube player chrome instead of clean gameplay — replaced with fresh fullscreen captures.
4. **Not fixed, nice-to-have:** Large unused vertical space below short detail panels (Projects/Experience) at typical desktop heights, from `min-height: 100svh` forcing full-viewport height regardless of content length.
5. **Not fixed, nice-to-have:** Campfire's cover screenshot (shown in 4 places — dashboard preview, project grid card, tab thumbnail, carousel slide 1) reads faint at real thumbnail size. See "Campfire vs LPA Tracker covers" below — this was re-examined and the original recommendation was walked back.

### Projects-specific notes

- Screenshots are a clear net positive — real product evidence instead of placeholder space, with genuine visual range across the five projects.
- 16:10 `object-fit: cover` framing is consistent; none of the covers crop awkwardly.
- Normal carousel (dots/arrows/expand/caption) is clear, balanced, and restrained.
- Expanded/lightbox carousel (arrows, keyboard ←/→/Esc, swipe) works well and stays in sync with the underlying carousel.
- Detail hierarchy (title → one-liner → actions → screenshot/copy) reads correctly at all breakpoints; the 800px two-column switch is well-chosen.
- Stack pills are dense on Campfire/LPA Tracker (10 pills, 2 rows) — flagged as low-priority since it's already an acknowledged v1 placeholder in the project brief.
- No real single-screenshot project exists in current data, so that code path (arrows/swipe hidden when only 1 image) couldn't be visually re-verified this session, though it was implemented and tested in the prior session.

### Recommended polish (as originally given)

**Must fix** — both done in PR #55: disable carousel auto-rotate; fix IBM/V School dark-mode contrast.

**Nice to have, not yet done:**
- Reconsider the full-viewport `min-height` on Projects/Experience sections for shorter entries.
- Campfire cover reordering — **walked back**, see discussion below.

**Not worth it:** don't touch the overall visual language; don't "fix" the Experience preview card's bottom whitespace on the dashboard (intentional grid-height match); don't trim the Coastal Systems palette defensively.

### Bonus: color palette reflection

The Coastal Systems + Spark palette (navy/blue/teal/coral/sand) is genuinely not one of the generic AI-portfolio defaults — it doesn't read as templated, and it lets the varied real screenshots sit calmly in frame instead of competing with a loud site background. If more distinctiveness is ever wanted, the lever I'd consider isn't a wholesale swap but *narrowing*: use blue only for links/primary actions and let coral be the *only* accent color (dropping sand, or reserving it for one specific purpose like metric chips). That would read more confident/opinionated while staying just as calm — not a must, just the one direction worth exploring for more signature.

---

## Part 2: Follow-up Discussion

### Campfire vs. LPA Tracker cover screenshots — recommendation walked back

Original review flagged Campfire's cover (a marketing/landing splash, mostly flat cream negative space) as reading "faint" at small sizes, and suggested swapping to a denser in-app screen (e.g. the Stats view).

Jared pushed back: LPA Tracker's cover is *also* a splash-adjacent choice (his original flagship project, made second because it was the one project without a title screen), and his reasoning was that dense tables are harder to read small than a clean splash page.

Checked empirically by screenshotting the actual live dashboard thumbnail strip (~90px wide, the smallest real instance on the site). Finding: **both Campfire and LPA Tracker read as nearly-blank pale rectangles at real thumbnail size** — LPA's tables actually disappear into gray fuzz even more than Campfire's splash does. Meanwhile Bunnies and Snack Attack (also splash/title screens!) read clearly, because they're dark and high-contrast.

**Revised conclusion:** the real driver isn't "splash vs. dashboard," it's **overall contrast/boldness of the image**. A pale, low-contrast image — whether marketing splash or table-heavy dashboard — turns to mush at thumbnail size; a dark, high-contrast, boldly-colored image reads clearly regardless of what it's a screenshot of. Since Campfire's in-app screens are also light/cream-toned (matching its own product theme), swapping the cover wouldn't meaningfully fix thumbnail legibility. **Decision: leave both covers as-is.** Jared's other three projects (games) aren't as strong as Campfire/LPA, so he doesn't want to lead with those either.

### Design rating discussion

Asked for an overall rating: **8/10** as of the two must-fixes landing. Genuinely cohesive, well-engineered, real product evidence, solid accessibility, avoids every generic-AI-portfolio tell. What keeps it from 9-10 is a handful of small inconsistencies (screenshot density/tone variance, some dead vertical space, pill density) rather than anything structural.

**What would push toward 10/10:**
1. Content-level polish, not just structural — the stack pills/metric chips are explicitly marked as v1 placeholders in the project's own brief; a 10 would have those fully curated rather than "acceptable for now." Same with per-project screenshot curation (choosing/cropping each shot specifically for how it reads at thumbnail size, not just as a good screenshot in isolation).
2. Zero remaining rough edges — the fixes done today, plus the whitespace/density notes above, fully resolved rather than "good enough."
3. One more moment of real craft/personality beyond the typewriter ticker — though this is in real tension with CLAUDE.md's explicit restraint mandate ("no flourish"). A true 10 in the design sense usually means one deliberate risk; the project has explicitly scoped that out in favor of "calm, practical, well-engineered" — a legitimate, coherent choice for a recruiter-facing engineering portfolio, it just caps how far pure distinctiveness can push the score.

Honest framing given: going from 8→10 costs a lot more effort than 6→8 did, for a smaller and more subjective payoff — not necessarily worth chasing right now.

### "Wow factor" ideas (for real 10/10, not urgent)

Discussed what would create actual "wow" rather than incremental polish — per the design principle of spending boldness in exactly one place, not everywhere:

1. **A genuine signature interaction tied to Jared's own content** — something that plays off the typewriter ticker's existing personality/humor, rather than a new decorative effect layered on top.
2. **One tasteful, one-time bento-card load/settle animation** — not autonomous/looping (which the spec rules out), fires once on page load, respects reduced-motion.
3. **★ Live/interactive game embeds — the strongest idea discussed.** Since Bunnies, Snack Attack, and the Unity 2D Roguelike have no backend, they could be embedded directly (iframe to wherever the WebGL/web build is hosted) so a recruiter can actually *play* one instead of looking at screenshots. Differentiation through substance, not decoration — genuinely rare in a portfolio, low technical risk given no backend/security concerns, and probably the single best "wow" lever available. Treated as a real candidate for a future session, not scoped/built today.

### Bento-grid navigation exploration

Jared's idea: instead of the current spine (Experience) / tab-switcher (Projects) navigation, make the *page itself* a bento grid — clicking a tile opens that project/role's detail, echoing the Dashboard's own bento language. Paired with idea #2 above (settle-in load animation).

**Pushback given on Experience:** the current spine+detail (desktop) / accordion (mobile) model shows the *whole* career arc simultaneously alongside the one selected entry — that's valuable specifically because Experience is a timeline meant to be scanned as a whole, not just browsed one entry at a time. A bento-grid-as-menu would add a navigation hop and lose that "shape of everything visible at once" quality on every single view. Jared agreed — Experience bento was dropped, partly because 7 entries makes it awkward anyway, partly because he was only proposing it for the sake of 2-of-3-pages consistency, not because it was independently a good fit.

**Validated for Projects:** unlike Experience, Projects is a "gallery to browse," not a "timeline to scan" — visually skimming thumbnails to decide what to look at is a natural, common portfolio pattern, and arguably fits that task better than small text tabs do. 5 projects also happens to divide cleanly into a grid.

**Refined concept that emerged (getting close to something real):**
- 3×2 grid of uniform squares (6 cells: 5 projects + 1 header tile).
- Header tile ("Projects", text-only, top-left) doubles as a *buffer* between the two visually-quieter covers (Campfire, LPA Tracker — "the cream buddies").
- Layout: Row 1 = [Header] [Cream A] [Game B] · Row 2 = [Cream B] [Bunnies] [Game C].
- Why it works: each cream tile's edge-neighbors (not diagonal) are all non-pale — either the text header or a bold dark game screenshot. The two cream tiles only ever touch diagonally (one corner), which reads as nothing in a grid. This directly solves the "pale images cluster and read as empty" problem found during the thumbnail-legibility check above.
- Interaction: image-forward tiles, hover tints the image and reveals title + one-liner (rather than always-visible text below the image, as today's cards do).

**Real production consideration flagged, unresolved:** screenshots are landscape (16:10-ish); forcing them into true squares means cropping tighter than the current carousel treatment does. Low risk for something like the Unity title screen (already fairly centered/square-ish), higher risk for something like LPA Tracker's dashboard (a square crop could cut off table columns currently visible in the wider frame). Would need a deliberately-chosen square crop region per project, not an auto-center-crop — i.e., this is a prerequisite piece of curation work, not just a CSS change.

**Status: a real, sketchable idea for a future session. Not built, not scoped into a plan yet.**

---

## Open ideas for later (nothing below this line is built)

- Projects page redesigned as a 3×2 bento grid (concept above) — replaces the tab-switcher + showcase panel.
- Live/interactive embeds for the three no-backend games (Bunnies, Snack Attack, Unity 2D Roguelike).
- One-time coordinated bento-card settle-in animation on page load.
- Optional palette exploration: narrow to blue (primary/links) + coral (sole accent), dropping or restricting sand, if more visual signature is ever wanted.
- Screenshot curation pass: pick/crop each project's images deliberately for how they read at thumbnail size (relevant prerequisite if the bento-grid idea above is ever built).
