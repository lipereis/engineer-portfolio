export const en = {
  meta: {
    title: "Felipe Gomes — Software Engineer",
    description:
      "Software Engineer · Frontend · Full-stack capable. Portfolio of Felipe Gomes — video craft, product, and AI tooling from Rio de Janeiro.",
  },

  nav: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    ask: "Search",
    stats: "Stats",
    experience: "Experience",
    education: "Education",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  hero: {
    role: "Software Engineer",
    focus: "Frontend · Full-stack capable",
    typingLines: [
      "Building products with code and AI",
      "From video craft to software engineering",
      "Shipping tools that feel premium",
    ],
    arc: "Video editor transitioning into software engineering — building products with code and AI.",
    ctaProjects: "View Projects",
    ctaResume: "Download Resume",
    ctaGithub: "GitHub",
    ctaLinkedin: "LinkedIn",
  },

  sections: {
    about: {
      title: "About",
      subtitle: "The path from creative craft to engineering.",
    },
    skills: {
      title: "Skills",
      subtitle: "Tools I use to design, build, and ship.",
      groups: {
        frontend: "Frontend",
        backend: "Backend",
        languages: "Programming Languages",
        databases: "Databases",
        tools: "Tools",
        design: "Design",
      },
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Top repositories ranked from public GitHub activity.",
      liveDemo: "Live Demo",
      viewGithub: "GitHub",
      stars: "Stars",
      forks: "Forks",
    },
    ask: {
      title: "Ask me about my projects",
      subtitle: "Search across all public repositories.",
      placeholder: "Try “Next.js”, “video”, or a repo name…",
      empty: "No projects match that search. Try another keyword.",
      results: "results",
    },
    stats: {
      title: "GitHub Statistics",
      subtitle: "Public activity snapshot from the latest build.",
      repositories: "Repositories",
      stars: "Total stars",
      forks: "Total forks",
      followers: "Followers",
      following: "Following",
      languages: "Languages",
      commits: "Commit activity",
      contributions: "Contribution calendar",
      fetchedAt: "Data fetched",
    },
    experience: {
      title: "Experience",
      subtitle: "A timeline of craft, learning, and transition.",
    },
    education: {
      title: "Education",
      subtitle: "Courses, self-taught path, and certificates.",
      kinds: {
        university: "University",
        course: "Course",
        certificate: "Certificate",
      },
    },
    contact: {
      title: "Contact",
      subtitle: "Let's talk about roles, collaboration, or projects.",
      email: "Email",
      copyEmail: "Copy email",
      copied: "Copied!",
      linkedin: "LinkedIn",
      github: "GitHub",
      resume: "Resume",
    },
  },

  command: {
    title: "Command menu",
    placeholder: "Jump to a section, toggle theme, or copy email…",
    empty: "No matching actions.",
    groups: {
      navigation: "Navigation",
      actions: "Actions",
      preferences: "Preferences",
    },
    actions: {
      copyEmail: "Copy email",
      openGithub: "Open GitHub",
      openLinkedin: "Open LinkedIn",
      downloadResume: "Download resume",
      toggleTheme: "Toggle theme",
      themeDark: "Theme: Dark",
      themeLight: "Theme: Light",
      languageEn: "Language: English",
      languagePt: "Language: Português",
    },
  },

  chrome: {
    loading: "Loading",
    backToTop: "Back to top",
    themeToggle: "Toggle theme",
    languageToggle: "Switch language",
    skipToContent: "Skip to content",
    footer: {
      builtBy: "Built by Felipe Gomes",
      rights: "All rights reserved.",
      source: "Source on GitHub",
    },
    notFound: {
      title: "Page not found",
      description: "That route doesn’t exist on this portfolio.",
      home: "Back home",
    },
  },
} as const;

/** Widen nested string literals so PT (and future locales) can diverge. */
type DeepStringify<T> = T extends string
  ? string
  : T extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepStringify<U>>
    : T extends object
      ? { readonly [K in keyof T]: DeepStringify<T[K]> }
      : T;

export type Dictionary = DeepStringify<typeof en>;
