# Design Motif Strategy — "Calm Systems, Polished Workflows, Small Sparks of Personality"

Strategy pass only — no files were edited as part of this document. Based on a visual review of the deployed site across desktop, dashboard mobile, Experience, and Projects.

## Verdict

"Calm systems, polished workflows, small sparks of personality" fits — and it's a much better brief than "add more visual interest," because the site's actual gap isn't decoration, it's that nothing right now is *specific to Jared*. Everything currently reads as competent, generic SaaS-card language (soft bg, white cards, blue primary, rounded corners) — correct execution, zero authorship. The fix is a handful of small, structural, well-motivated details, not a new layer of ornament. A literal "grid pattern everywhere" approach should be rejected; a very restrained ambient version of it plus 2-3 specific, functional touches should be accepted.

## Recommended visual motif direction

**Ambient, background-only, global. Not literal.** Concretely:

- A near-invisible dot-grid or graph-paper texture in the page background (`--color-bg`), something like 2-3% opacity dots on a large repeat — visible only as ambient texture in empty space, never competing with card content. This is genuinely global (works on all three pages) because it lives *behind* everything and touches zero component styling.
- One functional, well-motivated piece: treat the Hero's "Currently:" typewriter line as a small system-log moment — monospace font for that line specifically, maybe a hair of tinted background. This is earned, not decorative, because the element already behaves like a terminal (blinking cursor, typed text). It should stay confined to that one element.
- Explicitly reject: corner brackets, alignment ticks, connector lines between cards. These are the single most "generic AI portfolio template" move available here — exactly the kind of default the frontend-design calibration warns about. They'd read as costume, not systems-thinking.

Experience gets **none** of this beyond the ambient background — it's already the calmest, most credible page, and the brief is explicit that it shouldn't get fancier for its own sake.

## Screenshot framing recommendation

Build the frame now, independent of real screenshots — it's structural, not content-dependent:

- A small project-icon badge in the corner of the carousel frame, reusing the same icon already in the switcher tab. This is the highest-value, lowest-cost move in the whole pass — it visually ties "this is the Campfire flame icon" to both the tab *and* the screenshot in one glance.
- A slim real caption row (e.g. "Screenshot 2 of 3"), built as actual DOM tied to the carousel's existing slide index — not baked into the placeholder image, which currently provides this "for free" but will vanish the moment real screenshots replace the placeholders. This needs to exist as UI now so it survives that swap.
- **Reject** literal macOS-style browser chrome (traffic lights + address bar) as a universal treatment — it looks wrong wrapped around a Unity game screenshot that was never a browser tab. If device framing is wanted at all, it should be conditional per project type, which is more complexity than this deserves right now. A plain, deliberate frame (current border/radius/shadow, tuned once real images exist) reads as "exhibit" without pretending every project is a web page.
- Shadow/inset depth and exact border treatment: **wait for real screenshots** — impossible to judge shadow depth against a flat placeholder color.

## Project identity recommendation

**Icon-only, not per-project color.** Adding five accent colors means new tokens, contrast-checking across light/dark, and a real risk of the page turning into "five little themes" — exactly what the brief says to avoid. The icons already exist, already work in the switcher, and are the cheap, calm way to make each project distinct: reuse the same icon in the screenshot-frame badge (above) and optionally as a small mark next to the detail title. One consistent device, five different marks, zero new colors.

## What to leave alone

- Bento dashboard layout/concept
- Experience page structure
- Compact Projects switcher + selected showcase structure
- Sora/Inter fonts
- Lucide/Simple Icons
- Restrained animation
- Current color palette
- Static-first architecture
- Accessibility patterns
- Projects showcase content order (header → 2-col carousel/copy)
- Switcher pill styling and its coral selected state
- PillList/button styling
- Dashboard tablet-portrait fix

## Prioritized implementation plan

**Low-risk, do now:**

1. Global ambient background texture — trivial CSS, independent of everything else.
2. Project-icon badge on the carousel frame — low complexity, reuses existing icon data, works identically with placeholder or real images.
3. Real caption row under the carousel — low-medium complexity (hook into existing `current` slide index in the carousel script), needed as infrastructure regardless of screenshot content.
4. Monospace treatment for the Hero typewriter line — trivial, but verify contrast/readability in both themes before calling it done.

**Wait for real screenshots:**

5. Shadow/inset depth tuning on the frame.
6. Any device-frame/browser-chrome decision (and whether it should differ per project type at all).
7. Caption wording — real images may suggest better captions than a generic counter.

**Avoid:**

8. Per-project accent colors.
9. Corner brackets / alignment ticks / connector lines — generic, not distinctive.
10. Universal browser-chrome framing.
11. Any texture placed behind actual content text.

## Concerns before implementation

The dead-space issue from the earlier critique still exists on Experience's and Projects' full pages at wide/tall viewports — only the dashboard got the tablet-portrait fix. That's out of scope for this motif pass, but worth naming: the ambient background texture (item 1) is a nice, free side-benefit there, since it makes leftover whitespace read as "intentional quiet space" rather than "unstyled void" — but it doesn't replace an actual layout fix if one is wanted later.
