export const en = {
  meta: {
    title: "Felipe Gomes — Backend & AI Engineer",
    description:
      "Backend & AI Engineer · Full-stack (React / Next.js / Node.js). Portfolio of Felipe Gomes — RAG systems, APIs, and product tooling from Rio de Janeiro.",
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
    role: "Backend & AI Engineer",
    focus: "Full-stack · React / Next.js / Node.js",
    typingLines: [
      "Building RAG systems and APIs",
      "From audiovisual craft to AI engineering",
      "Shipping tools that feel premium",
    ],
    arc: "Communication and audiovisual background, now building backend services and AI systems.",
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
        ai: "AI Engineering",
        backend: "Backend",
        languages: "Programming Languages",
        frontend: "Frontend",
        databases: "Databases",
        tools: "Tools & Deploy",
        design: "Design",
      },
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Pinned highlights, then top repositories ranked from GitHub activity.",
      liveDemo: "Live Demo",
      viewGithub: "GitHub",
      stars: "Stars",
      forks: "Forks",
      private: "Private",
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
      contributionsEmpty:
        "Contribution calendar unavailable for this build (GraphQL skipped).",
      less: "Less",
      more: "More",
      fetchedAt: "Data fetched",
    },
    experience: {
      title: "Experience",
      subtitle: "Professional work in communication and audiovisual production.",
    },
    education: {
      title: "Education",
      subtitle: "Degree, courses, and the self-taught path.",
      kinds: {
        university: "University",
        course: "Course",
        certificate: "Certificate",
      },
      certifications: "Courses & certifications",
      languages: "Languages",
    },
    contact: {
      title: "Contact",
      subtitle: "Let's talk about roles, collaboration, or projects.",
      email: "Email",
      copyEmail: "Copy email",
      copied: "Copied!",
      copyFailed: "Couldn’t copy email",
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
