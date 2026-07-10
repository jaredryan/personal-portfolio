export type Profile = {
  name: string;
  role: string;
  heroParagraphs: string[];
  links: {
    resume: string;
    email: string;
    github: string;
    linkedin: string;
  };
  currentlyLabel: string;
  currentlyLines: string[];
  /** Hidden bonus lines queued into the typewriter ticker when its clickable
   * area is activated — never part of the normal automatic rotation. First
   * activation queues bonusLines[0], second queues bonusLines[1], third and
   * later activations are no-ops. */
  bonusLines: string[];
};

export const profile: Profile = {
  name: "Jared Ryan",
  role: "Product-Minded Full-Stack Engineer",
  heroParagraphs: [
    "I build polished, practical software for messy real-world workflows — the kind where product judgment, frontend details, and reliable systems all matter.",
    "Lately, I use AI to move faster, but I build step by step and review carefully for strong UX, clean code, and reliability.",
  ],
  links: {
    resume: "/resume/Jared_Ryan_Resume.pdf",
    email: "mailto:jryantennis@gmail.com",
    github: "https://github.com/jaredryan",
    linkedin: "https://www.linkedin.com/in/jared-m-ryan",
  },
  currentlyLabel: "Currently:",
  currentlyLines: [
    "First things first: make sure you’re building something somebody actually wants.",
    "I love software where the flows feel obvious and natural.",
    "When I have the energy, you’ll find me on a local hike or locked into a game on the living room chair.",
    "When I don’t have the energy, same chair — Netflix, Webtoons, and pretending one more episode was planned.",
    "I’m serious about clean code, but not very serious about pretending to be serious.",
    "Somehow, even meal prep turned into a modular system of bases, sauces, vegetables, and macros.",
  ],
  bonusLines: [
    "Congrats, you found the hidden state. And you thought you could pull one over on me.",
    "Once again: congratulations.",
  ],
};
