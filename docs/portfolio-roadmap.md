# Portfolio Roadmap

Small, living list of known future portfolio-content changes. Not a project-management system — just enough for a future session (human or Claude) to pick up the right context before touching the Projects section again.

## Future: add the cooking app once it's production-ready

**Status: not started. Do not add a placeholder card for this now.**

When Jared's cooking application is finished and actually deployed:

1. Inspect the finished app directly before writing any portfolio copy — the real repository, the live deployment, actual screenshots, and the features as actually implemented. Do not draft copy from memory of the idea or from this note.
2. Don't just append a 7th card. Re-open `src/components/ProjectsSection.astro`'s `gridOrder` and re-evaluate the whole lineup:
   - Re-balance the grid's visual rhythm (cover-image tone alternation, card count vs. grid columns) with the new entry included, not bolted onto the end.
   - Reassess ordering/curation as a whole — is every current project still the strongest set of six-to-seven to show a recruiter, or does the weakest existing entry get retired/demoted to make room, per the standing preference for a concise set of strong projects over an ever-growing gallery?
3. Follow the same accuracy bar used for the Ryan Legal PC entry (2026-07): base every claim on the actual finished app, no invented metrics/outcomes, follow the existing `Project` data shape in `src/data/projects.ts` — no one-off treatment.
