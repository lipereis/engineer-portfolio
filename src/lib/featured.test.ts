import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config";

describe("featured projects", () => {
  it("leads with HookEdit as a demo-only card", () => {
    const [first] = siteConfig.featuredProjects;
    expect(first.id).toBe("hookedit");
    expect(first.demo).toBe("https://hookedit.vercel.app/");
    expect("repository" in first).toBe(false);
  });

  it("gives every card EN and PT copy and at least one link", () => {
    const ids = new Set<string>();
    for (const project of siteConfig.featuredProjects) {
      expect(ids.has(project.id)).toBe(false);
      ids.add(project.id);
      expect(project.description.en.length).toBeGreaterThan(40);
      expect(project.description.pt.length).toBeGreaterThan(40);
      expect(project.technologies.length).toBeGreaterThan(0);
      const links = project as { demo?: string; repository?: string; privateTeamProject?: boolean };
      // a private team project has no public link and says so on the card instead
      expect(Boolean(links.demo || links.repository || links.privateTeamProject)).toBe(true);
    }
  });

  it("keeps the video portfolio out of the engineering repo listings", () => {
    expect(siteConfig.repoDenylist).toContain("video-portfolio");
    const ids: readonly string[] = siteConfig.featuredProjects.map((p) => p.id);
    expect(ids).not.toContain("video-portfolio");
  });
});
