import { describe, expect, it } from "vitest";
import { profileNarrative } from "./profileNarrative";

describe("profileNarrative", () => {
  it("has the supplied page label and heading", () => {
    expect(profileNarrative.pageLabel).toBe("Profile");
    expect(profileNarrative.heading).toBe("The path behind the work");
  });

  it("has the supplied opening lead, shown nowhere else in the intro copy", () => {
    expect(profileNarrative.openingLead).toBe("Building useful software is the work I want to keep doing.");
    for (const paragraph of profileNarrative.intro) {
      expect(paragraph).not.toContain(profileNarrative.openingLead);
    }
  });

  it("has the supplied intro copy, verbatim", () => {
    expect(profileNarrative.intro).toEqual([
      "I’m a product-minded full-stack engineer who likes turning ambiguous ideas into software that feels clear, useful, and finished. My best work sits between product thinking and implementation: understanding the workflow, shaping the experience, building the system, and staying with it through the details that make it reliable.",
      "That path has not been perfectly linear. I spent the first part of my career in professional software roles, then several years building and operating a residential real estate portfolio. Stepping outside a conventional engineering role gave me a broader view of ownership—and a clearer sense of the work I wanted to return to.",
    ]);
  });

  it("has exactly 3 journey chapters with the supplied headings, in order", () => {
    expect(profileNarrative.journeyHeading).toBe("How I got here");
    expect(profileNarrative.chapters).toHaveLength(3);
    expect(profileNarrative.chapters.map((c) => c.number)).toEqual(["01", "02", "03"]);
    expect(profileNarrative.chapters.map((c) => c.heading)).toEqual([
      "Building software",
      "A less conventional stretch",
      "Returning deliberately",
    ]);
    for (const chapter of profileNarrative.chapters) {
      expect(chapter.body.length).toBeGreaterThan(0);
    }
  });

  it("chapter 3 mentions Campfire, Ryan Legal, PC, and LPA Tracker but not Gold Ocean Holdings or the cooking app", () => {
    const chapter3 = profileNarrative.chapters[2].body.join(" ");
    expect(chapter3).toContain("Campfire");
    expect(chapter3).toContain("Ryan Legal, PC");
    expect(chapter3).toContain("LPA Tracker");
    expect(chapter3).not.toMatch(/Gold Ocean/i);
    expect(chapter3).not.toMatch(/cooking/i);
  });

  it("has exactly 3 values with the supplied headings and copy, in order", () => {
    expect(profileNarrative.valuesHeading).toBe("What I bring now");
    expect(profileNarrative.values).toHaveLength(3);
    expect(profileNarrative.values).toEqual([
      {
        heading: "Product judgment",
        body: "I look beyond the requested feature to the workflow around it: what problem it solves, where it creates friction, and what should stay simple.",
      },
      {
        heading: "End-to-end ownership",
        body: "I’m comfortable carrying an idea from ambiguity through design, implementation, deployment, and refinement—and taking responsibility for the tradeoffs along the way.",
      },
      {
        heading: "Practical communication",
        body: "I translate between technical systems, business needs, and the people using the product, without making any of them feel like an afterthought.",
      },
    ]);
  });

  it("has the supplied closing copy and the four established actions", () => {
    expect(profileNarrative.closing).toBe(
      "I’m looking for work where I can help shape the product as well as build it—especially on teams that care about clear workflows, thoughtful interfaces, and software that holds up in the real world.",
    );
    expect(profileNarrative.closingActions).toEqual({
      viewProjects: "View projects",
      viewExperience: "View experience",
      resume: "Download résumé",
      contact: "Contact me",
    });
  });
});
