import { describe, expect, it } from "vitest";
import { experience } from "./experience";

describe("experience", () => {
  it("has 5 work entries then 2 education entries, all with required fields", () => {
    const kinds = experience.map((e) => e.kind);
    expect(kinds.filter((k) => k === "work")).toHaveLength(5);
    expect(kinds.filter((k) => k === "education")).toHaveLength(2);
    expect(experience[0].slug).toBe("ryan-lin");
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
