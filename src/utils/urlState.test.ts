import { beforeEach, describe, expect, it } from "vitest";
import { clearSectionState, getQueryParam, setSectionState } from "./urlState";

describe("urlState", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/");
  });

  it("reads a query param, or null if absent", () => {
    window.history.replaceState(null, "", "/experience?role=mantl");
    expect(getQueryParam("role")).toBe("mantl");
    expect(getQueryParam("project")).toBeNull();
  });

  it("sets a section param via pushState, preserving unrelated params", () => {
    window.history.replaceState(null, "", "/projects?utm_source=test");
    setSectionState({ key: "project", value: "campfire" });
    expect(window.location.search).toContain("utm_source=test");
    expect(window.location.search).toContain("project=campfire");
  });

  it("clears a section param", () => {
    window.history.replaceState(null, "", "/experience?role=mantl");
    clearSectionState({ key: "role" });
    expect(getQueryParam("role")).toBeNull();
  });
});
