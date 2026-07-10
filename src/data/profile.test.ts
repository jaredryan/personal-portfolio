import { describe, expect, it } from "vitest";
import { profile } from "./profile";

describe("profile", () => {
  it("has locked hero copy and contact links", () => {
    expect(profile.name).toBe("Jared Ryan");
    expect(profile.role).toBe("Product-Minded Full-Stack Engineer");
    expect(profile.heroParagraphs).toHaveLength(2);
    expect(profile.currentlyLabel).toBe("Currently:");
    expect(profile.currentlyLines).toHaveLength(6);
    expect(profile.links.email).toBe("mailto:jryantennis@gmail.com");
    expect(profile.links.github).toBe("https://github.com/jaredryan");
    expect(profile.links.resume.startsWith("/resume/")).toBe(true);
    expect(profile.bonusLines).toEqual([
      "Congrats, you found the hidden state. And you thought you could pull one over on me.",
      "Once again: congratulations.",
    ]);
  });
});
