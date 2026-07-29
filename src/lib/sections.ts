export const SECTION_IDS = [
  "about",
  "skills",
  "projects",
  "extensions",
  "ask",
  "stats",
  "experience",
  "education",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const DESKTOP_SECTION_IDS = [
  "about",
  "projects",
  "extensions",
  "experience",
  "education",
  "contact",
] as const satisfies readonly SectionId[];
