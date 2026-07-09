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
};

export const projects: Project[] = [
  {
    slug: "lpa-tracker",
    title: "LPA Tracker Demo",
    icon: "lucide:file-search",
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
      cover: "/projects/lpa-tracker/cover.svg",
      images: ["/projects/lpa-tracker/01.svg", "/projects/lpa-tracker/02.svg", "/projects/lpa-tracker/03.svg"],
    },
  },
  {
    slug: "campfire",
    title: "Campfire",
    icon: "lucide:flame",
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
      cover: "/projects/campfire/cover.svg",
      images: ["/projects/campfire/01.svg", "/projects/campfire/02.svg", "/projects/campfire/03.svg"],
    },
  },
  {
    slug: "unity-roguelike",
    title: "Unity 2D Roguelike Game",
    icon: "lucide:gamepad-2",
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
      cover: "/projects/unity-roguelike/cover.svg",
      images: [
        "/projects/unity-roguelike/01.svg",
        "/projects/unity-roguelike/02.svg",
        "/projects/unity-roguelike/03.svg",
      ],
    },
  },
  {
    slug: "nest-invaders",
    title: "Snack Attack",
    icon: "lucide:chef-hat",
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
      cover: "/projects/nest-invaders/cover.svg",
      images: [
        "/projects/nest-invaders/01.svg",
        "/projects/nest-invaders/02.svg",
        "/projects/nest-invaders/03.svg",
      ],
    },
  },
  {
    slug: "when-bunnies-attack",
    title: "When Bunnies Attack",
    icon: "lucide:rabbit",
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
      cover: "/projects/when-bunnies-attack/cover.svg",
      images: [
        "/projects/when-bunnies-attack/01.svg",
        "/projects/when-bunnies-attack/02.svg",
        "/projects/when-bunnies-attack/03.svg",
      ],
    },
  },
];
