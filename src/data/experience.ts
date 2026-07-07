export type ExperienceEntry = {
  slug: string;
  kind: "work" | "education";
  tabLabel: string;
  title: string;
  company?: string;
  institution?: string;
  start?: number;
  end?: number | "Present";
  date?: number;
  location?: string;
  oneLiner: string;
  metricChips: string[];
  pills: string[];
  bullets: string[];
  /** Optional ~28px square logo path. No files exist yet — every entry falls
   * back to a monogram tile until real logos are added. */
  logo?: string;
};

export const experience: ExperienceEntry[] = [
  {
    slug: "gold-ocean",
    kind: "work",
    tabLabel: "Gold Ocean Holdings",
    title: "Senior Software Engineer",
    company: "Gold Ocean Holdings",
    logo: "/images/logos/gold-ocean.png",
    start: 2023,
    end: "Present",
    location: "Remote",
    oneLiner:
      "Led engineering team improvements and built real estate acquisition screening workflows across listings, investment criteria, and recommendations.",
    metricChips: ["6+ engineer team", "15% productivity lift", "20% better filtering", "1hr+ saved/listing"],
    pills: [
      "Engineering Leadership", "Process Improvement", "Real Estate Tech",
      "Data Workflows", "Recommendation Logic", "Python", "Node.js",
    ],
    bullets: [
      "Managed a team of 6+ engineers, increasing productivity by 15% through structured improvement plans, career tracking, and pairing sessions.",
      "Built real estate acquisition screening workflows across listing review, investment criteria, and recommendation logic.",
      "Refined acquisition recommendation models to filter 20% more properties and save 1hr+ of manual evaluation for each listing filtered.",
    ],
  },
  {
    slug: "mantl",
    kind: "work",
    tabLabel: "MANTL",
    title: "Software Developer II",
    company: "MANTL",
    logo: "/images/logos/mantl.png",
    start: 2021,
    end: 2023,
    location: "Remote",
    oneLiner:
      "Owned frontend-heavy product work, mentored engineers, turned stakeholder interviews into activation-time improvements, and led test automation efforts.",
    metricChips: ["4+ engineers mentored", "150+ tests", "25% → 80% coverage", "10%+ activation improvement"],
    pills: [
      "React", "TypeScript", "Frontend Architecture", "Testing", "Mentorship",
      "Product Discovery", "Workflow Automation", "GraphQL",
    ],
    bullets: [
      "Mentored 4+ engineers on frontend work and owned critical frontend features, earning team recognition for PR reviews, pairing, testing, design, and product flow quality.",
      "Led automated testing work for 3+ teams and 150+ tests, helping raise automated test coverage from 25% to 80%.",
      "Interviewed internal stakeholders to identify and prioritize targeted workflow improvements that reduced customer activation time by 10%+.",
    ],
  },
  {
    slug: "ibm-ca",
    kind: "work",
    tabLabel: "IBM (CA)",
    title: "Software Developer II",
    company: "IBM",
    logo: "/images/logos/ibm.png",
    start: 2019,
    end: 2021,
    location: "San Jose, CA",
    oneLiner:
      "Led frontend platform work across product, design, and backend partnerships, balancing usability, performance, security, and business value.",
    metricChips: ["3+ engineer frontend lead", "15% velocity lift", "30% estimation accuracy", "33% platform expansion", "20% faster design cycles"],
    pills: ["Frontend Leadership", "Product Collaboration", "Design Collaboration", "Architecture", "Security", "Performance", "Agile"],
    bullets: [
      "Led frontend work with 3+ engineers through Agile 3-month delivery cycles, improving team velocity by 15% and estimation accuracy by 30%.",
      "Architected technical solutions with product and backend leads, considering security, performance, sizing, business value, and usability to expand platform capabilities by 33%.",
      "Partnered with design to reduce design iteration cycles by 20% through early technical feedback on models, relationships, and implementation constraints.",
    ],
  },
  {
    slug: "ibm-tx",
    kind: "work",
    tabLabel: "IBM (TX)",
    title: "Software Developer I",
    company: "IBM",
    logo: "/images/logos/ibm.png",
    start: 2018,
    end: 2019,
    location: "Austin, TX",
    oneLiner:
      "Built demo applications and debugged cross-stack issues across authentication, authorization, automation, and deployment tooling.",
    metricChips: ["10% sales lift", "15% automation test lift", "Cross-stack debugging"],
    pills: ["OAuth", "OpenID Connect", "Node.js", "Angular", "Java", "Android", "Swift", "Docker", "Jenkins"],
    bullets: [
      "Pioneered demo applications showcasing product capabilities, contributing to a 10% sales increase.",
      "Debugged issues across OAuth, OpenID, Node, Angular, Java, Android, Swift, Docker, Jenkins, and automation tooling, helping increase passing automation tests by 15%.",
    ],
  },
  {
    slug: "ntr",
    kind: "work",
    tabLabel: "NTR",
    title: "Web Developer",
    company: "NTR",
    logo: "/images/logos/ntr.png",
    start: 2018,
    end: 2022,
    location: "Remote / Berkeley, CA",
    oneLiner: "Built and maintained a React/Node/MongoDB feedback platform used by 20+ colleges for 10,000+ submissions.",
    metricChips: ["20+ colleges", "10,000+ submissions", "4 years maintained", "99.999% availability"],
    pills: ["React", "Node.js", "MongoDB", "Full-Stack Development", "Platform Maintenance", "Data Privacy"],
    bullets: [
      "Partnered with a UC Berkeley professor to design a feedback platform for collecting, grading, releasing, and anonymizing submissions, now used by 20+ colleges for 10,000+ submissions.",
      "Built the website from scratch with React, Node, and MongoDB, then administered it for 4 years with 99.999% availability and 0 bugs after the first year.",
    ],
  },
  {
    slug: "v-school",
    kind: "education",
    tabLabel: "V School",
    title: "V School",
    institution: "V School",
    logo: "/images/logos/v-school.png",
    date: 2018,
    oneLiner: "Completed a 3-month full-stack bootcamp focused on React, Node, MongoDB, Express, HTML, and CSS.",
    metricChips: [],
    pills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "HTML", "CSS"],
    bullets: [],
  },
  {
    slug: "uc-berkeley",
    kind: "education",
    tabLabel: "UC Berkeley",
    title: "UC Berkeley College of Engineering",
    institution: "UC Berkeley",
    logo: "/images/logos/uc-berkeley.png",
    date: 2017,
    oneLiner: "Earned a B.S. in Bioengineering with a Computer Science emphasis.",
    metricChips: [],
    pills: ["Engineering", "Computer Science", "Technical Problem Solving"],
    bullets: [],
  },
];
