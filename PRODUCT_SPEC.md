# Product Spec: Jared Ryan Portfolio Redesign

## 1. Purpose

Rebuild Jared Ryan's personal portfolio from a traditional client-side React portfolio into a fast, static-first, recruiter-friendly portfolio landing page that also demonstrates strong frontend taste.

The site should feel modern, polished, and interactive without becoming gimmicky. It should prioritize fast scanning for recruiters and technical reviewers while still rewarding deeper exploration through full Experience and Projects sections.

## 2. Primary Audience

1. Technical recruiters and hiring managers scanning quickly.
2. Engineering managers evaluating professional credibility.
3. Startup/founder contacts evaluating product and engineering judgment.
4. Technical peers who may click through project demos or GitHub repos.

## 3. Positioning

### Role Label

**Product-Minded Full-Stack Engineer**

### Hero Copy

```text
Jared Ryan
Product-Minded Full-Stack Engineer

I build polished, practical software for messy real-world workflows — the kind where product judgment, frontend details, and reliable systems all matter.

Lately, I use AI to move faster, but I build step by step and review carefully for strong UX, clean code, and reliability.
```

### Contact Actions

Primary actions in hero:

- Resume
- Email
- GitHub
- LinkedIn

Use obvious labels. Do not hide these behind a hamburger menu.

## 4. Product Principles

### Recruiter-first, not gimmick-first

The site should pass the 6-second scan test:

- Who is Jared?
- What kind of engineer is he?
- Where has he worked?
- What has he built recently?
- How do I contact him or download his resume?

### Static-first and crawler-readable

Critical content must exist as rendered HTML, not only JS-generated hidden state. The site should be easy for search engines, AI crawlers, and accessibility tools to parse.

### Skills should be contextual

Do not create a standalone Skills page/section. Avoid progress bars, logo walls, and arbitrary skill rankings.

Instead, show skills as contextual pills on:

- Experience entries
- Project cards

### One default motion source

The landing dashboard may have one autonomous motion element: the hero `Currently:` typewriter ticker.

Experience and Projects should be interactive by user action, not auto-rotating on timers in the dashboard.

Expanded Project detail may include a screenshot carousel with controls.

### Personality, but professionally curated

The site should feel like a real person built it. It can include humor and hobby references, but the professional value proposition should stay front and center.

## 5. Site Architecture

Single-page portfolio with major anchor sections.

```text
/#dashboard
/#experience
/#projects
```

Selected-state URLs:

```text
/?role=mantl#experience
/?project=campfire#projects
```

No separate project detail pages in v1.

## 6. Page Structure

### 6.1 Dashboard / Bento Landing

The initial viewport uses a 3-card responsive bento layout.

Desktop concept:

```text
┌─────────────────────────────────────┬──────────────────────┐
│                                     │                      │
│  ABOUT / HERO                       │  EXPERIENCE PREVIEW  │
│  Jared Ryan                         │                      │
│  Product-Minded Full-Stack Engineer │  Role list / selected│
│  Hero copy                          │  role teaser         │
│  Resume / Email / GitHub / LinkedIn │  Expand icon         │
│  Currently: typewriter              │                      │
│                                     │                      │
├─────────────────────────────────────┤                      │
│                                     │                      │
│  PROJECTS PREVIEW                   │                      │
│  Featured project preview           │                      │
│  Thumbnails / links / expand icon   │                      │
│                                     │                      │
└─────────────────────────────────────┴──────────────────────┘
```

Mobile order:

1. About / Hero
2. Experience Preview
3. Projects Preview
4. Full Experience
5. Full Projects

Do not force the hero to 100vh on mobile if it hurts scanning. A strong first section is good; excessive vertical space is not.

### 6.2 About / Hero Card

Contents:

- Name
- Role label
- Two hero paragraphs
- Resume / Email / GitHub / LinkedIn actions
- Theme toggle
- `Currently:` typewriter ticker

No expanded About section in v1.

### 6.3 Experience Preview Card

Default state:

- Compact list of roles
- Company
- Title
- Dates
- Optional small metric chip

Selected state:

- Breadcrumb-like local back affordance if needed
- Role title/company/dates/location
- One-liner summary
- 1–2 preview bullets maximum if space allows
- Preview skill/focus pills
- Expand icon to full Experience section

Design rule: the Experience bento is a teaser, not the full resume.

### 6.4 Projects Preview Card

Desktop two-column layout:

Left column:

- Large screenshot for selected project
- Thumbnail row/grid for all projects

Right column:

- Project title
- One-sentence summary
- Preview pills
- Demo/GitHub buttons where available
- Expand icon to full Projects section

Mobile one-column layout:

- Screenshot
- Title
- Summary
- Pills
- Links
- Thumbnails

Default selected project: **LPA Tracker / Broadspan AI Demo**.

### 6.5 Full Experience Section

A full-page-feeling section, not a modal overlay.

Desktop:

- Breadcrumbs: `Dashboard › Experience` or `Dashboard › Experience › [Role]`
- Career Spine on the left
- Selected role detail panel on the right
- Work and education included
- Metric chips
- Skill/focus pills
- Full bullets

Mobile:

- Stacked role cards or accordions
- Selecting a role may expand it inline or move into a selected detail state
- Breadcrumbs remain available

Experience should be chronological. Avoid overly clever alternatives such as an Impact Ledger as the primary structure.

### 6.6 Full Projects Section

A full-page-feeling section, not a modal overlay.

Default state:

- Breadcrumbs: `Dashboard › Projects`
- Grid of all projects
- Each card includes screenshot, title, one-liner, preview pills, and links where available

Selected project state:

- Breadcrumbs: `Dashboard › Projects › [Project]`
- Large screenshot carousel for selected project
- Project title
- One-liner
- Detail bullets
- Detail pills
- Demo/GitHub links where available
- Back to Projects via breadcrumb

Only the selected project carousel may auto-rotate. It must pause on hover/focus and have manual controls. Respect `prefers-reduced-motion`.

## 7. Navigation and URL State

### Major sections

- `#dashboard`
- `#experience`
- `#projects`

### Selected state query params

- `?role=mantl#experience`
- `?project=campfire#projects`

### Behavior

On page load:

- If `#experience`, scroll/focus Experience.
- If `?role=` exists and matches a role, select that role.
- If `#projects`, scroll/focus Projects.
- If `?project=` exists and matches a project, select that project.
- If no hash, show dashboard normally.

On selection:

- Update query param and hash without reloading.
- Move focus to selected content heading.

On returning to grid/list:

- Remove `?project` or `?role`.
- Keep the section hash.
- Return focus to section heading or grid/list heading.

### Breadcrumbs

Use a reusable Breadcrumbs component.

Examples:

```text
Dashboard › Projects
Dashboard › Projects › Campfire
Dashboard › Experience
Dashboard › Experience › MANTL
```

Earlier segments are clickable. Current segment is text or active state.

On mobile, if breadcrumbs become too long, truncate from the left:

```text
… › Projects › Campfire
```

## 8. Visual Identity

Theme name: **Coastal Systems + Spark**

The brand should communicate:

- Systematic
- Practical
- Product-minded
- Detail-sensitive
- Frontend-polished
- Calm under complexity
- Playful, but not unserious

### Light mode tokens

```text
Background:        #F7FAF8   mist
Surface:           #FFFFFF   clean card
Surface Alt:       #EEF6F8   pale coastal blue
Text Primary:      #102033   deep navy
Text Secondary:    #526173   slate
Border:            #D7E3EA   blue-gray

Primary Blue:      #2563EB   main actions
Accent Teal:       #14B8A6   hover/focus/system accent
Spark Coral:       #F9735B   playful accent
Soft Sand:         #F3C98B   warm secondary accent
```

### Dark mode tokens

```text
Background:        #07111F
Surface:           #0D1B2E
Surface Alt:       #10243A
Text Primary:      #EAF2FF
Text Secondary:    #9FB3C8
Border:            #22364F

Primary Blue:      #60A5FA
Accent Teal:       #2DD4BF
Spark Coral:       #FB7A68
Soft Sand:         #E5B96B
```

### Color usage

- Blue: primary actions, links, professional trust.
- Teal: hover/focus states, active outlines, system accent.
- Coral: playful touches, typewriter cursor, selected thumbnail marker.
- Sand: metric chips and subtle warmth.

Use accent colors sparingly. The site should not look rainbow or noisy.

## 9. Typewriter Content

Label:

```text
Currently:
```

Lines:

```text
First things first: make sure you’re building something somebody actually wants.
I love software where the flows feel obvious and natural.
When I have the energy, you’ll find me on a local hike or locked into a game on the living room chair.
When I don’t have the energy, same chair — Netflix, Webtoons, and pretending one more episode was planned.
I’m serious about clean code, but not very serious about pretending to be serious.
Somehow, even meal prep turned into a modular system of bases, sauces, vegetables, and macros.
```

Typewriter rules:

- Must not contain critical information required to understand the portfolio.
- Respect `prefers-reduced-motion`.
- If reduced motion is enabled, show a static line or rotate only on manual action.
- Cursor may use Spark Coral.

## 10. Projects Content

### 10.1 LPA Tracker / Broadspan AI Demo

Slug: `lpa-tracker`

One-liner:

```text
AI document intelligence platform that extracts provisions, supports review workflows, and turns deadlines into trackable tasks.
```

Preview pills:

```text
Next.js
TypeScript
PostgreSQL
Prisma
Auth.js
Document Workflows
```

Detail pills:

```text
Next.js
TypeScript
PostgreSQL
Prisma
Neon
Auth.js
Tailwind
shadcn/ui
Document Workflows
Built with AI
```

Links:

```text
Demo: TBD / available on request
GitHub: Private
```

Placeholder screenshot paths:

```text
/public/projects/lpa-tracker/cover.png
/public/projects/lpa-tracker/01.png
/public/projects/lpa-tracker/02.png
/public/projects/lpa-tracker/03.png
```

### 10.2 Campfire

Slug: `campfire`

One-liner:

```text
Personal growth journaling app that turns daily reflection, habits, streaks, and AI-assisted insight into a lightweight RPG-inspired loop.
```

Preview pills:

```text
Next.js
TypeScript
PostgreSQL
Prisma
Product Design
Built with AI
```

Detail pills:

```text
Next.js
TypeScript
PostgreSQL
Prisma
Neon
Auth.js
Tailwind
shadcn/ui
Product Design
Built with AI
```

Links:

```text
Demo: https://campfirejournal.vercel.app/
GitHub: https://github.com/jaredryan/Campfire
```

Placeholder screenshot paths:

```text
/public/projects/campfire/cover.png
/public/projects/campfire/01.png
/public/projects/campfire/02.png
/public/projects/campfire/03.png
```

### 10.3 Unity 2D Roguelike Prototype

Slug: `unity-roguelike`

One-liner:

```text
Unity 2D roguelike prototype with procedural tilemaps, enemy encounters, items, menus, multi-input support, difficulty scaling, and save support.
```

Preview pills:

```text
Unity
C#
Game Systems
Input Handling
UI Menus
Level Generation
```

Detail pills:

```text
Unity
C#
Game Systems
Input Handling
UI Menus
Movement
Animation
Level Generation
Difficulty Scaling
Save System
```

Links:

```text
Demo: https://play.unity.com/en/games/520d503e-5403-4bab-b4c5-02becc961884/2d-roguelike-tutorial
GitHub: null
```

Expanded bullets should mention that this extends Unity's 2D Roguelike tutorial with custom polish. Do not overclaim ownership of tutorial-provided assets or base systems.

Placeholder screenshot paths:

```text
/public/projects/unity-roguelike/cover.png
/public/projects/unity-roguelike/01.png
/public/projects/unity-roguelike/02.png
/public/projects/unity-roguelike/03.png
```

### 10.4 Nest Invaders

Slug: `nest-invaders`

One-liner:

```text
Galaga-inspired React arcade game with responsive UI and controls, enemy waves, multiple levels, collision logic, and scoring.
```

Preview pills:

```text
React
JavaScript
Game Loops
Collision Logic
Responsive Controls
Animation
```

Detail pills:

```text
React
JavaScript
Game Loops
Collision Logic
Responsive UI
Responsive Controls
CSS
Animation
```

Links:

```text
Demo: https://nestinvaders.netlify.app/
GitHub: https://github.com/jaredryan/nest-invaders/tree/standaloneGame
```

Placeholder screenshot paths:

```text
/public/projects/nest-invaders/cover.png
/public/projects/nest-invaders/01.png
/public/projects/nest-invaders/02.png
/public/projects/nest-invaders/03.png
```

### 10.5 When Bunnies Attack

Slug: `when-bunnies-attack`

One-liner:

```text
Playful, text-based React RPG with exploration, environment interaction, inventory, combat, and bunnies.
```

Preview pills:

```text
React
JavaScript
Combat Logic
Exploration
Inventory
Branching Dialogue
```

Detail pills:

```text
React
JavaScript
CSS
Game State
Inventory
Combat Logic
Exploration
Branching Dialogue
Responsive UI
```

Links:

```text
Demo: https://whenbunniesattack.netlify.app/
GitHub: https://github.com/jaredryan/when-bunnies-attack
```

Placeholder screenshot paths:

```text
/public/projects/when-bunnies-attack/cover.png
/public/projects/when-bunnies-attack/01.png
/public/projects/when-bunnies-attack/02.png
/public/projects/when-bunnies-attack/03.png
```

## 11. Experience Content

Use these entries as portfolio content/data. The pasted Experience source is only a copy/text reference; do not use or imitate any previous Experience UI or component behavior.

### 11.1 Gold Ocean Holdings

Slug: `gold-ocean`

Title:

```text
Senior Software Engineer
```

Company:

```text
Gold Ocean Holdings
```

Dates/location:

```text
2023 — Present · Remote
```

One-liner:

```text
Led engineering team improvements and built real estate acquisition screening workflows across listings, investment criteria, and recommendations.
```

Placeholder metric chips:

```text
6+ engineer team
15% productivity lift
20% better filtering
1hr+ saved/listing
```

Placeholder pills:

```text
Engineering Leadership
Process Improvement
Real Estate Tech
Data Workflows
Recommendation Logic
Python
Node.js
```

Full bullets:

```text
Managed a team of 6+ engineers, increasing productivity by 15% through structured improvement plans, career tracking, and pairing sessions.
Built real estate acquisition screening workflows across listing review, investment criteria, and recommendation logic.
Refined acquisition recommendation models to filter 20% more properties and save 1hr+ of manual evaluation for each listing filtered.
```

TODO: revisit this content before active job applications, especially if the real estate acquisition pipeline project is not yet built.

### 11.2 MANTL

Slug: `mantl`

Title:

```text
Software Developer II
```

Company:

```text
MANTL
```

Dates/location:

```text
2021 — 2023 · Remote
```

One-liner:

```text
Owned frontend-heavy product work, mentored engineers, turned stakeholder interviews into activation-time improvements, and led test automation efforts.
```

Placeholder metric chips:

```text
4+ engineers mentored
150+ tests
25% → 80% coverage
10%+ activation improvement
```

Placeholder pills:

```text
React
TypeScript
Frontend Architecture
Testing
Mentorship
Product Discovery
Workflow Automation
GraphQL
```

Full bullets:

```text
Mentored 4+ engineers on frontend work and owned critical frontend features, earning team recognition for PR reviews, pairing, testing, design, and product flow quality.
Led automated testing work for 3+ teams and 150+ tests, helping raise automated test coverage from 25% to 80%.
Interviewed internal stakeholders to identify and prioritize targeted workflow improvements that reduced customer activation time by 10%+.
```

TODO: revisit exact wording of activation-time bullet and chips during final content polish.

### 11.3 IBM — CA

Slug: `ibm-ca`

Title:

```text
Software Developer II
```

Company:

```text
IBM
```

Dates/location:

```text
2019 — 2021 · San Jose, CA
```

One-liner:

```text
Led frontend platform work across product, design, and backend partnerships, balancing usability, performance, security, and business value.
```

Placeholder metric chips:

```text
3+ engineer frontend lead
15% velocity lift
30% estimation accuracy
33% platform expansion
20% faster design cycles
```

Placeholder pills:

```text
Frontend Leadership
Product Collaboration
Design Collaboration
Architecture
Security
Performance
Agile
```

Full bullets:

```text
Led frontend work with 3+ engineers through Agile 3-month delivery cycles, improving team velocity by 15% and estimation accuracy by 30%.
Architected technical solutions with product and backend leads, considering security, performance, sizing, business value, and usability to expand platform capabilities by 33%.
Partnered with design to reduce design iteration cycles by 20% through early technical feedback on models, relationships, and implementation constraints.
```

### 11.4 IBM — TX

Slug: `ibm-tx`

Title:

```text
Software Developer I
```

Company:

```text
IBM
```

Dates/location:

```text
2018 — 2019 · Austin, TX
```

One-liner:

```text
Built demo applications and debugged cross-stack issues across authentication, authorization, automation, and deployment tooling.
```

Placeholder metric chips:

```text
10% sales lift
15% automation test lift
Cross-stack debugging
```

Placeholder pills:

```text
OAuth
OpenID Connect
Node.js
Angular
Java
Android
Swift
Docker
Jenkins
```

Full bullets:

```text
Pioneered demo applications showcasing product capabilities, contributing to a 10% sales increase.
Debugged issues across OAuth, OpenID, Node, Angular, Java, Android, Swift, Docker, Jenkins, and automation tooling, helping increase passing automation tests by 15%.
```

### 11.5 NTR

Slug: `ntr`

Title:

```text
Web Developer
```

Company:

```text
NTR
```

Dates/location:

```text
2018 — 2022 · Remote / Berkeley, CA
```

One-liner:

```text
Built and maintained a React/Node/MongoDB feedback platform used by 20+ colleges for 10,000+ submissions.
```

Placeholder metric chips:

```text
20+ colleges
10,000+ submissions
4 years maintained
99.999% availability
```

Placeholder pills:

```text
React
Node.js
MongoDB
Full-Stack Development
Platform Maintenance
Data Privacy
```

Full bullets:

```text
Partnered with a UC Berkeley professor to design a feedback platform for collecting, grading, releasing, and anonymizing submissions, now used by 20+ colleges for 10,000+ submissions.
Built the website from scratch with React, Node, and MongoDB, then administered it for 4 years with 99.999% availability and 0 bugs after the first year.
```

### 11.6 V School

Slug: `v-school`

Title:

```text
V School
```

Dates:

```text
2018
```

One-liner:

```text
Completed a 3-month full-stack bootcamp focused on MongoDB, Express, React, and Node.
```

Placeholder metric chips:

```text
3-month bootcamp
MERN stack
```

Placeholder pills:

```text
MongoDB
Express
React
Node.js
JavaScript
```

### 11.7 UC Berkeley

Slug: `uc-berkeley`

Title:

```text
UC Berkeley College of Engineering
```

Dates:

```text
2017
```

One-liner:

```text
Earned a B.S. in Bioengineering with a Computer Science emphasis.
```

Placeholder metric chips:

```text
B.S. Bioengineering
Computer Science emphasis
```

Placeholder pills:

```text
Engineering
Computer Science
Technical Problem Solving
```

## 12. Known Content TODOs

After Claude implements v1, revisit:

- Experience metric chips and skill/focus pills.
- Gold Ocean wording if the real estate acquisition pipeline is not complete before active job applications.
- Project screenshots.
- LPA Tracker demo/repo availability.
- Resume PDF content and filename.
- Any new startup role content.

## 13. Non-goals

Do not build:

- Backend
- CMS
- Blog
- Separate Skills page
- 3D/game navigation
- Heavy animation framework unless absolutely necessary
- Login/auth for the portfolio itself
- Separate project routes in v1
