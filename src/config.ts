/**
 * Single source of truth for personal identity, career data, and skills.
 * UI chrome strings live in `src/lib/dictionaries/{en,pt}.ts`.
 *
 * Content mirrors the source CV (Felipe Gomes — Backend & AI Engineer).
 */

export type LucideIconName = string;

export type LocalizedString = {
  en: string;
  pt: string;
};

export type SkillItem = {
  name: string;
  icon: LucideIconName;
};

/** Narrative beats shown as the About timeline. */
export type JourneyEntry = {
  id: string;
  title: LocalizedString;
  period: LocalizedString;
  description: LocalizedString;
};

/** Real roles shown in the Experience section and on the resume. */
export type ExperienceEntry = {
  id: string;
  role: LocalizedString;
  org: LocalizedString;
  period: LocalizedString;
  description: LocalizedString;
  tags?: readonly string[];
};

export type EducationKind = "university" | "course" | "certificate";

export type EducationEntry = {
  id: string;
  kind: EducationKind;
  title: LocalizedString;
  institution: LocalizedString;
  period: LocalizedString;
  description: LocalizedString;
};

export type CertificationEntry = {
  id: string;
  title: LocalizedString;
  year: string;
};

export type SpokenLanguage = {
  name: LocalizedString;
  level: LocalizedString;
};

export const siteConfig = {
  name: "Felipe Gomes",
  fullName: "Felipe Damasceno Reis Gomes",
  githubUsername: "lipereis",
  email: "felipedrg02@gmail.com",
  phone: "(21) 9 7455-4444",
  linkedin: "https://www.linkedin.com/in/felipe-gomes-0220b7247/",
  linkedinHandle: "linkedin.com/in/felipe-gomes-0220b7247",
  resumeUrl: "/resume.pdf",
  siteUrl: "https://lipereis.github.io/engineer-portfolio",
  basePath: "/engineer-portfolio",
  location: "Rio de Janeiro — RJ",
  headline: "Backend & AI Engineer · Full-stack (React / Next.js / Node.js)",
  socials: {} as Record<string, never>,

  /** Repos excluded from ranking (e.g. profile README-only). */
  repoDenylist: ["lipereis", "engineer-portfolio"] as const,

  /**
   * Always show first in Featured (then fill remaining slots by score).
   * Names must match GitHub repo names exactly (case-insensitive match).
   */
  featuredPins: ["TrainFlow", "CineOps", "RAGCore", "spoileralert"] as const,

  /** Prettier labels for repos whose GitHub name isn't cased the way I write it. */
  repoDisplayNames: {
    spoileralert: "SpoilerAlert",
  } as const,

  about: {
    en: "I'm Felipe Gomes — moving from communication and audiovisual work into software, focused on backend and AI engineering. My foundation is storytelling, production, and content operations; today I point that same discipline at building digital products. I'm self-taught in JavaScript, React, Node.js, and Python, with published projects (including AI tooling built on retrieval, vector search, and re-ranking) and constant practice in version control and deployment. I'm looking for a Backend / AI Engineer role where product reasoning, delivery discipline, and growing full-stack depth all count.",
    pt: "Sou Felipe Gomes — em transição da comunicação e do audiovisual para software, com foco em backend e engenharia de IA. Minha base é storytelling, produção e gestão de conteúdo; hoje aplico essa mesma disciplina na construção de produtos digitais. Sou autodidata em JavaScript, React, Node.js e Python, com projetos publicados (incluindo ferramentas de IA com retrieval, busca vetorial e re-ranking) e prática constante de versionamento e deploy. Busco uma vaga de Backend / AI Engineer onde raciocínio de produto, disciplina de entrega e profundidade full-stack crescente contem juntos.",
  } satisfies LocalizedString,

  /** About-section timeline: the arc, not job history. */
  journey: [
    {
      id: "audiovisual",
      title: {
        en: "Communication & Audiovisual",
        pt: "Comunicação & Audiovisual",
      },
      period: { en: "Foundation", pt: "Base" },
      description: {
        en: "A Social Communication degree at PUC-Rio plus years of editing, producing, and running content. Pacing, narrative, and finishing discipline — the habits I still bring to product work.",
        pt: "Graduação em Comunicação Social na PUC-Rio e anos editando, produzindo e gerindo conteúdo. Ritmo, narrativa e disciplina de acabamento — hábitos que ainda levo para produto.",
      },
    },
    {
      id: "learning-code",
      title: {
        en: "Learning to Build",
        pt: "Aprendendo a Construir",
      },
      period: { en: "Growth", pt: "Crescimento" },
      description: {
        en: "Self-taught from HTML, CSS, and JavaScript into React, Next.js, TypeScript, and Node.js. Shipped every step in public on GitHub instead of collecting tutorials.",
        pt: "Autodidata de HTML, CSS e JavaScript até React, Next.js, TypeScript e Node.js. Publiquei cada etapa no GitHub em vez de acumular tutoriais.",
      },
    },
    {
      id: "backend-ai",
      title: {
        en: "Backend & AI Engineering",
        pt: "Backend & Engenharia de IA",
      },
      period: { en: "Current", pt: "Atual" },
      description: {
        en: "Building real systems: a local hybrid RAG engine (Chroma + BM25 + FlashRank + Gemini), an AI operating system for personal trainers, and Python data apps. REST APIs, retrieval pipelines, and prompt engineering.",
        pt: "Construindo sistemas reais: um motor RAG híbrido local (Chroma + BM25 + FlashRank + Gemini), um sistema operacional com IA para personal trainers e apps de dados em Python. APIs REST, pipelines de retrieval e prompt engineering.",
      },
    },
    {
      id: "goals",
      title: {
        en: "Backend / AI Engineer Role",
        pt: "Vaga de Backend / AI Engineer",
      },
      period: { en: "Next", pt: "Próximo" },
      description: {
        en: "Join a team shipping real products — owning backend services and AI features, with the frontend depth to carry a feature end to end.",
        pt: "Entrar em um time que entrega produtos reais — cuidando de serviços backend e features de IA, com profundidade de frontend para levar uma feature ponta a ponta.",
      },
    },
  ] as const satisfies readonly JourneyEntry[],

  /** Professional experience to date (communication & audiovisual). */
  experience: [
    {
      id: "nossoolharcarioca",
      role: {
        en: "Social Media / Video Editor / Videomaker",
        pt: "Social Media / Editor de Vídeo / Videomaker",
      },
      org: {
        en: "Nossoolharcarioca — Freelance",
        pt: "Nossoolharcarioca — Freelancer",
      },
      period: { en: "2025", pt: "2025" },
      description: {
        en: "Planned, produced, and edited video content for Instagram, focused on storytelling and engagement.",
        pt: "Planejamento, produção e edição de conteúdo em vídeo para Instagram, com foco em storytelling e engajamento.",
      },
      tags: ["Instagram", "Premiere Pro", "Storytelling"],
    },
    {
      id: "coreboyshubclips",
      role: {
        en: "Social Media — TikTok & YouTube Shorts",
        pt: "Social Media — TikTok e YouTube Shorts",
      },
      org: { en: "Coreboyshubclips", pt: "Coreboyshubclips" },
      period: { en: "2024", pt: "2024" },
      description: {
        en: "Curated, edited, and published short-form video; tracked performance and iterated on what worked.",
        pt: "Curadoria, edição e publicação de vídeos curtos; monitoramento de desempenho e iteração sobre o que funcionava.",
      },
      tags: ["TikTok", "Shorts", "Analytics"],
    },
    {
      id: "ladobdacena",
      role: {
        en: "Digital Content Creator",
        pt: "Criador de Conteúdo Digital",
      },
      org: {
        en: "@ladobdacena — TikTok & Substack",
        pt: "@ladobdacena — TikTok e Substack",
      },
      period: { en: "2023", pt: "2023" },
      description: {
        en: "Produced content on cinema and audiovisual culture; wrote articles and newsletters; managed the community.",
        pt: "Produção de conteúdo sobre cinema e audiovisual; redação de artigos e newsletters; gestão de comunidade.",
      },
      tags: ["Substack", "Writing", "Community"],
    },
    {
      id: "puc-editing-intern",
      role: { en: "Intern — Editing Suites", pt: "Estagiário — Ilhas de Edição" },
      org: { en: "PUC-Rio", pt: "PUC-Rio" },
      period: { en: "Aug 2023 — Feb 2024", pt: "Ago/2023 — Fev/2024" },
      description: {
        en: "Edited and finished audiovisual projects, organized post-production workflows, and gave technical support to students and faculty.",
        pt: "Edição e finalização de projetos audiovisuais, organização de fluxos de pós-produção e suporte técnico a alunos e professores.",
      },
      tags: ["Post-production", "Workflow", "Support"],
    },
  ] as const satisfies readonly ExperienceEntry[],

  education: [
    {
      id: "puc-rio",
      kind: "university",
      title: {
        en: "B.A. in Social Communication",
        pt: "Comunicação Social",
      },
      institution: {
        en: "Pontifical Catholic University of Rio de Janeiro (PUC-Rio)",
        pt: "Pontifícia Universidade Católica do Rio de Janeiro (PUC-Rio)",
      },
      period: {
        en: "Completed June 2024",
        pt: "Conclusão: Junho/2024",
      },
      description: {
        en: "Narrative, media production, and audience thinking — the base I now apply to product and engineering work.",
        pt: "Narrativa, produção de mídia e pensamento de audiência — a base que agora aplico em produto e engenharia.",
      },
    },
    {
      id: "origamid",
      kind: "course",
      title: {
        en: "Web Design & Frontend Fundamentals",
        pt: "Web Design & Fundamentos de Frontend",
      },
      institution: {
        en: "Origamid (self-paced)",
        pt: "Origamid (autodidata)",
      },
      period: { en: "Completed modules", pt: "Módulos concluídos" },
      description: {
        en: "JavaScript, React, Backend with Node.js, and Tailwind CSS course tracks.",
        pt: "Trilhas de JavaScript, React, Backend com Node.js e Tailwind CSS.",
      },
    },
    {
      id: "freecodecamp",
      kind: "certificate",
      title: {
        en: "Python & Full Stack tracks",
        pt: "Trilhas de Python & Full Stack",
      },
      institution: { en: "freeCodeCamp", pt: "freeCodeCamp" },
      period: { en: "Certifications", pt: "Certificações" },
      description: {
        en: "Python fundamentals and full-stack web development coursework.",
        pt: "Fundamentos de Python e desenvolvimento web full-stack.",
      },
    },
    {
      id: "self-taught",
      kind: "course",
      title: {
        en: "Self-taught Software Path",
        pt: "Trilha Autodidata em Software",
      },
      institution: { en: "Independent study", pt: "Estudo independente" },
      period: { en: "Continuous", pt: "Contínuo" },
      description: {
        en: "React, Next.js, TypeScript, and AI tooling learned by shipping public GitHub projects.",
        pt: "React, Next.js, TypeScript e ferramentas de IA aprendidos publicando projetos no GitHub.",
      },
    },
  ] as const satisfies readonly EducationEntry[],

  /** Shorter credentials rendered as a chip list under Education. */
  certifications: [
    {
      id: "edicao-negocios",
      title: { en: "Editing & Business", pt: "Edição e Negócios" },
      year: "2023",
    },
    {
      id: "comercializacao",
      title: {
        en: "Audiovisual Sales & Distribution",
        pt: "Comercialização e Distribuição para o Audiovisual",
      },
      year: "2024",
    },
    {
      id: "legislacao",
      title: {
        en: "Audiovisual Law & Business",
        pt: "Legislação e Negócios para o Audiovisual",
      },
      year: "2024",
    },
    {
      id: "pedagogica",
      title: {
        en: "Pedagogical Training: Entrepreneurship & BNCC",
        pt: "Formação Pedagógica: Empreendedorismo e BNCC",
      },
      year: "2024",
    },
    {
      id: "office365",
      title: { en: "Office 365", pt: "Office 365" },
      year: "2022",
    },
  ] as const satisfies readonly CertificationEntry[],

  spokenLanguages: [
    {
      name: { en: "Portuguese", pt: "Português" },
      level: { en: "Native", pt: "Nativo" },
    },
    {
      name: { en: "English", pt: "Inglês" },
      level: { en: "Advanced", pt: "Avançado" },
    },
    {
      name: { en: "Spanish", pt: "Espanhol" },
      level: { en: "Advanced", pt: "Avançado" },
    },
  ] as const satisfies readonly SpokenLanguage[],

  skills: {
    ai: [
      { name: "RAG (Retrieval-Augmented Generation)", icon: "Bot" },
      { name: "Vector search (Chroma)", icon: "Boxes" },
      { name: "Keyword search (BM25)", icon: "Search" },
      { name: "Re-ranking (FlashRank)", icon: "ArrowUpDown" },
      { name: "Gemini / Claude / OpenAI APIs", icon: "Sparkles" },
      { name: "Prompt engineering", icon: "MessageSquareCode" },
    ] as const satisfies readonly SkillItem[],
    backend: [
      { name: "Node.js", icon: "Server" },
      { name: "REST APIs", icon: "Network" },
      { name: "Next.js Route Handlers", icon: "Route" },
      { name: "Auth & API integration", icon: "KeyRound" },
    ] as const satisfies readonly SkillItem[],
    languages: [
      { name: "TypeScript", icon: "FileCode2" },
      { name: "JavaScript", icon: "Braces" },
      { name: "Python", icon: "Binary" },
      { name: "SQL", icon: "Table2" },
    ] as const satisfies readonly SkillItem[],
    frontend: [
      { name: "React", icon: "Atom" },
      { name: "Next.js", icon: "Layers" },
      { name: "Tailwind CSS", icon: "Palette" },
      { name: "HTML / CSS", icon: "Code2" },
      { name: "Framer Motion", icon: "Sparkles" },
    ] as const satisfies readonly SkillItem[],
    databases: [
      { name: "PostgreSQL", icon: "Database" },
      { name: "SQLite", icon: "HardDrive" },
    ] as const satisfies readonly SkillItem[],
    tools: [
      { name: "Git / GitHub", icon: "GitBranch" },
      { name: "VS Code / Cursor", icon: "Terminal" },
      { name: "Vercel", icon: "Cloud" },
      { name: "Streamlit", icon: "LayoutDashboard" },
      { name: "Notion", icon: "NotebookPen" },
    ] as const satisfies readonly SkillItem[],
    design: [
      { name: "Figma", icon: "PenTool" },
      { name: "Video editing", icon: "Clapperboard" },
      { name: "UI craft", icon: "LayoutTemplate" },
    ] as const satisfies readonly SkillItem[],
  },
} as const;

export type SiteConfig = typeof siteConfig;
