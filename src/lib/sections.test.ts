import { describe, expect, it } from "vitest";

import { DESKTOP_SECTION_IDS, SECTION_IDS } from "./sections";

describe("portfolio section registry", () => {
  it("places Extensions after Projects and exposes it in desktop navigation", () => {
    expect(SECTION_IDS).toEqual([
      "about",
      "skills",
      "projects",
      "extensions",
      "ask",
      "stats",
      "experience",
      "education",
      "contact",
    ]);
    expect(DESKTOP_SECTION_IDS).toContain("extensions");
  });
});
