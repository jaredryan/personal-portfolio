export type ProfileChapter = {
  number: string;
  heading: string;
  body: string[];
};

export type ProfileValue = {
  heading: string;
  body: string;
  /** Lucide icon name — matches the icon+heading pattern used by every page
   * header (PageHeader.astro), just applied to these three cards. */
  icon: string;
};

export type ProfileNarrative = {
  pageLabel: string;
  heading: string;
  intro: string[];
  journeyHeading: string;
  chapters: ProfileChapter[];
  valuesHeading: string;
  values: ProfileValue[];
  closing: string;
  closingActions: {
    viewProjects: string;
    viewExperience: string;
    resume: string;
    contact: string;
  };
};

// Copy supplied verbatim — do not rewrite, shorten, or expand. Minor
// typographic normalization only (straight apostrophes to typographic ones,
// matching the rest of src/data's convention).
export const profileNarrative: ProfileNarrative = {
  pageLabel: "Profile",
  heading: "The path behind the work",
  intro: [
    "I’m a product-minded full-stack engineer who likes turning ambiguous ideas into software that feels clear, useful, and finished. My best work sits between product thinking and implementation: understanding the workflow, shaping the experience, building the system, and staying with it through the details that make it reliable.",
    "That path has not been perfectly linear. I spent the first part of my career in professional software roles, then several years building and operating a residential real estate portfolio. Stepping outside a conventional engineering role gave me a broader view of ownership—and made it clearer that building useful software is the work I want to keep doing.",
  ],
  journeyHeading: "How I got here",
  chapters: [
    {
      number: "01",
      heading: "Building software",
      body: [
        "I started in software after studying bioengineering at UC Berkeley and completing a full-stack program at V School. At IBM, I worked across authentication, authorization, deployment tooling, and product interfaces before moving into frontend leadership. At MANTL, I owned frontend-heavy product work, mentored engineers, helped teams expand automated testing, and worked directly with stakeholders to improve operational workflows.",
        "Those roles taught me that the most valuable engineering work is rarely just code. It is understanding where people get stuck, weighing product and technical tradeoffs, and building something the team can confidently maintain.",
      ],
    },
    {
      number: "02",
      heading: "A less conventional stretch",
      body: [
        "After MANTL, I moved away from a standard engineering role and focused on real estate investment and operations. I underwrote acquisitions, managed tenants and renovations, worked through financing and insurance issues, and made decisions where the consequences were immediate and mine to own.",
        "That work was not software engineering, and I do not present it as such. It did strengthen the parts of me that matter in engineering: judgment under uncertainty, practical communication, follow-through, and the habit of looking at a whole system rather than a single task.",
      ],
    },
    {
      number: "03",
      heading: "Returning deliberately",
      body: [
        "Over time, I noticed that the work I kept returning to was product building. I began shipping again through projects with real constraints, working deployments, and direct feedback. Campfire let me explore personal growth as a product loop. Ryan Legal, PC required turning decades of legal experience into a clear, credible public site. LPA Tracker pushed dense document review into a structured workflow. Smaller games gave me room to work directly on interaction, pacing, and feedback.",
        "AI now helps me move faster, but it has not replaced the way I work. I still build step by step, review carefully, and stay accountable for the result. The difference is that I can move from idea to working product more quickly and spend more time refining what matters.",
        "I am returning to software with a clearer sense of the role I want: one where engineering, product judgment, and ownership belong together.",
      ],
    },
  ],
  valuesHeading: "What I bring now",
  values: [
    {
      heading: "Product judgment",
      body: "I look beyond the requested feature to the workflow around it: what problem it solves, where it creates friction, and what should stay simple.",
      icon: "lucide:target",
    },
    {
      heading: "End-to-end ownership",
      body: "I’m comfortable carrying an idea from ambiguity through design, implementation, deployment, and refinement—and taking responsibility for the tradeoffs along the way.",
      icon: "lucide:layers",
    },
    {
      heading: "Practical communication",
      body: "I translate between technical systems, business needs, and the people using the product, without making any of them feel like an afterthought.",
      icon: "lucide:message-circle",
    },
  ],
  closing: "I’m looking for work where I can help shape the product as well as build it—especially on teams that care about clear workflows, thoughtful interfaces, and software that holds up in the real world.",
  closingActions: {
    viewProjects: "View projects",
    viewExperience: "View experience",
    resume: "Download résumé",
    contact: "Contact me",
  },
};
