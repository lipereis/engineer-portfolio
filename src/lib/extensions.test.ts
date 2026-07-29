import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config";
import { en } from "@/lib/dictionaries/en";
import { pt } from "@/lib/dictionaries/pt";

describe("AmzScope extension content", () => {
  it("defines AmzScope as a curated public Chrome extension", () => {
    expect(siteConfig.extensions).toHaveLength(1);
    expect(siteConfig.extensions[0]).toMatchObject({
      id: "amzscope",
      name: "AmzScope",
      repository: "https://github.com/lipereis/AmzScope",
      technologies: ["JavaScript", "CSS", "Chrome Extension API"],
    });
    expect(siteConfig.extensions[0].description.pt).toContain("Amazon Brasil");
    expect(siteConfig.extensions[0].capabilities.en).toHaveLength(4);
    expect(siteConfig.repoDenylist).toContain("AmzScope");
  });

  it("provides complete EN and PT section copy", () => {
    expect(en.nav.extensions).toBe("Extensions");
    expect(pt.nav.extensions).toBe("Extensões");
    expect(en.sections.extensions.viewGithub).toBe("View on GitHub");
    expect(pt.sections.extensions.viewGithub).toBe("Ver no GitHub");
    expect(en.sections.extensions.previewLabel).toBe("Illustrative preview");
    expect(pt.sections.extensions.previewLabel).toBe("Prévia ilustrativa");
  });
});
