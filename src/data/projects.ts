export type ProjectLink = {
  label: string;
  href: string;
  kind: "demo" | "github" | "private" | "request";
};

export type Project = {
  slug: string;
  title: string;
  /** Lucide icon name for the compact project switcher tab. */
  icon: string;
  /** Hex seed color for this project's dashboard-preview switcher icon —
   * drawn at full saturation for the icon itself, mixed lightly into the
   * card surface for the icon's background tile (mirrors the pill/chip
   * color-mix pattern elsewhere). A per-project identity color, not reused
   * from the site's core palette — six projects need six distinct ones.
   * Light theme only — see accentColorDark for the dark-theme variant. */
  accentColor: string;
  /** Dark-theme counterpart to accentColor. Not simply reused: a color
   * tuned to separate from a light (near-white) surface doesn't necessarily
   * separate from a dark (near-black) one — e.g. a deep navy reads fine on
   * white but nearly disappears against the dark theme's own navy surface.
   * Tuned independently per project. */
  accentColorDark: string;
  /** Short label for the compact project switcher tab — deliberately
   * shorter than title (e.g. "Bunnies" vs "When Bunnies Attack") so the
   * tab row stays compact. */
  switcherLabel: string;
  oneLiner: string;
  /** Short "what was built" paragraph — one of two compact editorial
   * sections in the detail view (the other is interestingBecause). Not a
   * full case study. */
  built: string;
  /** Short "why it's worth a look" paragraph — the second compact
   * editorial section in the detail view. */
  interestingBecause: string;
  previewPills: string[];
  detailPills: string[];
  links: ProjectLink[];
  screenshots: {
    cover: string;
    images: string[];
  };
  /** Optional playable embed — when set, a Play button appears on the
   * screenshot carousel and opens this URL in a large lightbox iframe.
   * Reserved for the three actual game projects; omit for everything else. */
  playableEmbedUrl?: string;
  playableLabel?: string;
  playableIframeTitle?: string;
};

export const projects: Project[] = [
  {
    slug: "campfire",
    title: "Campfire",
    icon: "lucide:flame",
    accentColor: "#DD5426",
    accentColorDark: "#FF6B3D",
    switcherLabel: "Campfire",
    oneLiner:
      "Personal growth journaling app with habits, streaks, reflection, and lightweight RPG-inspired progression.",
    built:
      "Built full-stack journaling flows, habit tracking, streak logic, authentication, database models, and review loops for daily personal reflection.",
    interestingBecause:
      "It makes self-reflection feel more like a product loop than a blank notes app.",
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
      cover: "/projects/campfire/cover.webp",
      images: ["/projects/campfire/01.webp", "/projects/campfire/02.webp", "/projects/campfire/03.webp"],
    },
  },
  {
    slug: "lpa-tracker",
    title: "LPA Tracker Demo",
    icon: "lucide:file-search",
    accentColor: "#B8942A",
    accentColorDark: "#FFC94D",
    switcherLabel: "LPA Tracker",
    oneLiner:
      "AI document intelligence demo for extracting fund provisions, supporting review, and turning deadlines into tasks.",
    built:
      "Built a document review workspace around uploaded fund documents, extracted provisions, definitions, deadlines, and task follow-up. The current demo is seeded and review-focused, with the AI/OCR pipeline intentionally deferred.",
    interestingBecause:
      "It turns dense legal documents into a structured workflow where findings can be reviewed, edited, sourced, and acted on.",
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
      cover: "/projects/lpa-tracker/cover.webp",
      images: ["/projects/lpa-tracker/01.webp", "/projects/lpa-tracker/02.webp", "/projects/lpa-tracker/03.webp"],
    },
  },
  {
    slug: "ryan-legal-pc",
    title: "Ryan Legal, PC",
    icon: "lucide:scale",
    accentColor: "#1E275E",
    accentColorDark: "#4169E1",
    switcherLabel: "Ryan Legal",
    oneLiner:
      "Content-first Astro website for a California law firm, organizing six practice areas with clear contact and payment paths.",
    built:
      "Built a professional law firm website around six practice areas, attorney experience, and case history, with a Netlify Function contact form and LawPay payment flow.",
    interestingBecause:
      "It turns decades of legal work into a clear, navigable site that feels credible without becoming dense or generic.",
    previewPills: ["Astro", "TypeScript", "Content Architecture", "SEO", "Client Work"],
    detailPills: [
      "Astro", "TypeScript", "Content Architecture", "SEO", "Client Work",
      "Accessibility", "Responsive Design", "Resend",
    ],
    links: [
      { label: "Demo", href: "https://ryanlegalpc.com/", kind: "demo" },
      { label: "Private repo", href: "", kind: "private" },
    ],
    screenshots: {
      cover: "/projects/ryan-legal-pc/cover.webp",
      images: ["/projects/ryan-legal-pc/01.webp", "/projects/ryan-legal-pc/02.webp"],
    },
  },
  {
    slug: "when-bunnies-attack",
    title: "When Bunnies Attack",
    icon: "lucide:rabbit",
    accentColor: "#3F8F3F",
    accentColorDark: "#4ADE80",
    switcherLabel: "Bunnies",
    oneLiner: "Playful text-based React RPG with exploration, inventory, combat, branching choices, and bunnies.",
    built:
      "Built a compact RPG system with exploration actions, environment interactions, inventory use, battle flow, dialogue, and state-driven progression.",
    interestingBecause:
      "It turns a tiny joke premise into a real interaction-design exercise across game state, choice, and UI feedback.",
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
      cover: "/projects/when-bunnies-attack/cover.webp",
      images: [
        "/projects/when-bunnies-attack/01.webp",
        "/projects/when-bunnies-attack/02.webp",
        "/projects/when-bunnies-attack/03.webp",
      ],
    },
    playableEmbedUrl: "https://whenbunniesattack.netlify.app/",
    playableLabel: "Play When Bunnies Attack",
    playableIframeTitle: "When Bunnies Attack — playable game",
  },
  {
    slug: "nest-invaders",
    title: "Snack Attack",
    icon: "lucide:chef-hat",
    accentColor: "#DC2626",
    accentColorDark: "#FF5252",
    switcherLabel: "Snack Attack",
    oneLiner:
      "Galaga-inspired React arcade shooter with waves, levels, collision logic, scoring, and responsive controls.",
    built:
      "Built a standalone arcade game with enemy movement, shooting, collision checks, level progression, scoring, and touch-friendly responsive UI.",
    interestingBecause:
      "It uses a lightweight React app structure to deliver a complete browser-playable arcade loop.",
    previewPills: ["React", "JavaScript", "Game Loops", "Collision Logic", "Responsive Controls", "Animation"],
    detailPills: [
      "React", "JavaScript", "Game Loops", "Collision Logic", "Responsive UI",
      "Responsive Controls", "CSS", "Animation",
    ],
    links: [
      { label: "Demo", href: "https://snackattackgame.netlify.app/", kind: "demo" },
      { label: "GitHub", href: "https://github.com/jaredryan/snack-attack/tree/standaloneGame", kind: "github" },
    ],
    screenshots: {
      cover: "/projects/snack-attack/cover.webp",
      images: ["/projects/snack-attack/01.webp", "/projects/snack-attack/02.webp"],
    },
    playableEmbedUrl: "https://snackattackgame.netlify.app/",
    playableLabel: "Play Snack Attack",
    playableIframeTitle: "Snack Attack — playable game",
  },
  {
    slug: "unity-roguelike",
    title: "Unity 2D Roguelike Game",
    icon: "lucide:gamepad-2",
    accentColor: "#A5692B",
    accentColorDark: "#E0954A",
    switcherLabel: "Unity 2D",
    oneLiner:
      "Unity 2D gameplay prototype extended with menus, multi-input support, difficulty tuning, and save behavior.",
    built:
      "Started from Unity's 2D Roguelike tutorial, then extended it with main, pause, game over, and how-to-play menus, plus keyboard, controller, and touch support.",
    interestingBecause:
      "It shows practical game-development polish layered onto a tutorial foundation: input, menus, pacing, and player-facing flow.",
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
      cover: "/projects/unity-roguelike/cover.webp",
      images: ["/projects/unity-roguelike/01.webp", "/projects/unity-roguelike/02.webp"],
    },
    // No playableEmbedUrl: play.unity.com's embed gets stuck behind its own
    // cookie-consent gate inside an iframe, so Play would be a dead end.
    // Demo link above still points there directly. Re-add once there's a
    // cleaner embed source (e.g. self-hosted).
  },
];
