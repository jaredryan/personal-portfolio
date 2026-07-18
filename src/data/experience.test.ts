import { describe, expect, it } from "vitest";
import { experience } from "./experience";

describe("experience", () => {
  it("has 4 work entries then 2 education entries, all with required fields", () => {
    // NOTE: gold-ocean is temporarily commented out in experience.ts,
    // dropping work entries from 5 to 4 and the first slug from
    // "gold-ocean" to "mantl" — revert this test alongside re-enabling it.
    const kinds = experience.map((e) => e.kind);
    expect(kinds.filter((k) => k === "work")).toHaveLength(4);
    expect(kinds.filter((k) => k === "education")).toHaveLength(2);
    expect(experience[0].slug).toBe("mantl");
    for (const entry of experience) {
      expect(entry.title.length).toBeGreaterThan(0);
      expect(entry.oneLiner.length).toBeGreaterThan(0);
      expect(entry.pills.length).toBeGreaterThan(0);
      // Metric chips are a work-entry pattern only — education entries
      // intentionally carry no metricChips (nothing renders them).
      if (entry.kind === "work") {
        expect(entry.metricChips.length).toBeGreaterThan(0);
      } else {
        expect(entry.metricChips.length).toBe(0);
      }
    }
  });
});
