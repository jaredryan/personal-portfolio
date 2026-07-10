import { describe, expect, it } from "vitest";
import { projects } from "./projects";

describe("projects", () => {
  it("has all five projects with required fields, slugs first, screenshots wired up", () => {
    expect(projects.map((p) => p.slug)).toEqual([
      "campfire",
      "lpa-tracker",
      "when-bunnies-attack",
      "nest-invaders",
      "unity-roguelike",
    ]);
    for (const project of projects) {
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.icon.length).toBeGreaterThan(0);
      expect(project.switcherLabel.length).toBeGreaterThan(0);
      expect(project.oneLiner.length).toBeGreaterThan(0);
      expect(project.built.length).toBeGreaterThan(0);
      expect(project.interestingBecause.length).toBeGreaterThan(0);
      expect(project.previewPills.length).toBeGreaterThan(0);
      expect(project.detailPills.length).toBeGreaterThan(0);
      // nest-invaders' asset folder is named snack-attack (routing slug and
      // asset-folder name are intentionally independent for this project).
      const assetFolder = project.slug === "nest-invaders" ? "snack-attack" : project.slug;
      expect(project.screenshots.cover).toBe(`/projects/${assetFolder}/cover.webp`);
      expect(project.screenshots.images.length).toBeGreaterThanOrEqual(2);
    }
  });
});
