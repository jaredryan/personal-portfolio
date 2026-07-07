import { describe, expect, it } from "vitest";
import { projects } from "./projects";

describe("projects", () => {
  it("has all five projects with required fields, slugs first, screenshots wired up", () => {
    expect(projects.map((p) => p.slug)).toEqual([
      "lpa-tracker",
      "campfire",
      "unity-roguelike",
      "nest-invaders",
      "when-bunnies-attack",
    ]);
    for (const project of projects) {
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.oneLiner.length).toBeGreaterThan(0);
      expect(project.previewPills.length).toBeGreaterThan(0);
      expect(project.detailPills.length).toBeGreaterThan(0);
      expect(project.details.length).toBeGreaterThan(0);
      expect(project.screenshots.cover).toBe(`/projects/${project.slug}/cover.svg`);
      expect(project.screenshots.images).toHaveLength(3);
    }
  });
});
