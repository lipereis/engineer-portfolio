export const en = {
  meta: {
    title: "Felipe Gomes — AI & Automation for Video",
    description:
      "AI & Automation for Video · Python, n8n, LLMs · Video Editor. Portfolio of Felipe Gomes — n8n workflows, LLM pipelines, and product tooling from Rio de Janeiro.",
  },

  nav: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    extensions: "Extensions",
    ask: "Search",
    stats: "Stats",
    experience: "Experience",
    education: "Education",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  hero: {
    role: "AI & Automation for Video",
    focus: "Full-stack · React / Next.js / Node.js",
    typingLines: [
      "Building AI tools for video",
      "RAG systems, agents, and APIs",
      "From the editing suite to AI engineering",
    ],
    arc: "A video editor who builds the AI tools editors need: transcription, captions, retrieval, and the backend behind them.",
    ctaProjects: "View Projects",
    ctaResume: "Download Resume",
    ctaGithub: "GitHub",
    ctaLinkedin: "LinkedIn",
  },

  sections: {
    about: {
      title: "About",
      subtitle: "The path from creative craft to engineering.",
      videoPortfolio: "See my video work",
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
      subtitle: "AI, backend, and full-stack projects I designed and built end to end.",
      liveDemo: "Live Demo",
      privateTeam: "Team project · private repository",
      viewGithub: "GitHub",
    },
    extensions: {
      title: "Browser Extensions",
      subtitle:
        "Small tools that bring useful data into the workflows where it matters.",
      viewGithub: "View on GitHub",
      capabilities: "What it does",
      previewLabel: "Illustrative preview",
      preview: {
        asin: "ASIN",
        sales: "Monthly sales",
        gross: "Gross revenue",
        commission: "Amazon commission",
        net: "Net earnings",
      },
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
      repositories: "Public repositories",
      commitsYear: "Commits in the last 12 months",
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
      subtitle: "Degree, courses in progress, and the self-taught path.",
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
