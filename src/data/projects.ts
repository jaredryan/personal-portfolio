export type ProjectLink = {
  label: string;
  href: string;
  kind: "demo" | "github" | "private" | "request";
};

export type Project = {
  slug: string;
  title: string;
  /** ~10 words or fewer, no trailing period — used as the second line of the
   * desktop Projects spine item, under the title. Not the same as oneLiner,
   * which is a full sentence used in the detail view. */
  shortDescriptor: string;
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
    title: "LPA Tracker Demo",
    shortDescriptor: "Document intelligence workflow demo",
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
    shortDescriptor: "Personal growth journaling app",
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
    title: "Unity 2D Roguelike Game",
    shortDescriptor: "Unity tutorial with personal enhancements",
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
    title: "Nest Invaders",
    shortDescriptor: "React arcade shooter",
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
    shortDescriptor: "Text-based React RPG",
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
