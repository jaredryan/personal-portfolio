import { beforeEach, describe, expect, it } from "vitest";
import { clearSectionState, getQueryParam, setSectionState } from "./urlState";

describe("urlState", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/");
  });

  it("reads a query param, or null if absent", () => {
    window.history.replaceState(null, "", "/?role=mantl#experience");
    expect(getQueryParam("role")).toBe("mantl");
    expect(getQueryParam("project")).toBeNull();
  });

  it("sets a section param + hash via pushState, preserving unrelated params", () => {
    window.history.replaceState(null, "", "/?utm_source=test");
    setSectionState({ key: "project", value: "campfire", hash: "#projects" });
    expect(window.location.search).toContain("utm_source=test");
    expect(window.location.search).toContain("project=campfire");
    expect(window.location.hash).toBe("#projects");
  });

  it("clears a section param but keeps the hash", () => {
    window.history.replaceState(null, "", "/?role=mantl#experience");
    clearSectionState({ key: "role", hash: "#experience" });
    expect(getQueryParam("role")).toBeNull();
    expect(window.location.hash).toBe("#experience");
  });
});
