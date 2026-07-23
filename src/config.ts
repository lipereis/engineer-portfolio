/**
 * Single source of truth for personal identity, career data, and skills.
 * UI chrome strings live in `src/lib/dictionaries/{en,pt}.ts`.
 *
 * EDITABLE: education entries, about copy, experience wording, skills lists.
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

export type ExperienceEntry = {
  id: string;
  title: LocalizedString;
  period: LocalizedString;
  description: LocalizedString;
};

export type EducationKind = "university" | "course" | "certificate";

export type EducationEntry = {
  id: string;
  kind: EducationKind;
  title: LocalizedString;
  institution: LocalizedString;
  period: LocalizedString;
  description: LocalizedString;
  /** Marked for Felipe to revise — draft placeholder from public learning arc. */
  editable: true;
};

export const siteConfig = {
  name: "Felipe Gomes",
  githubUsername: "lipereis",
  email: "felipedrg02@gmail.com",
  linkedin: "https://www.linkedin.com/in/felipe-gomes-0220b7247/",
  resumeUrl: "/resume.pdf",
  siteUrl: "https://lipereis.github.io/engineer-portfolio",
  basePath: "/engineer-portfolio",
  location: "Rio de Janeiro",
  headline: "AI Engineer · Frontend · Full-stack capable",
  socials: {} as Record<string, never>,

  /** Repos excluded from ranking (e.g. profile README-only). */
  repoDenylist: ["lipereis", "engineer-portfolio"] as const,

  /**
   * Always show first in Featured (then fill remaining slots by score).
   * Names must match GitHub repo names exactly (TrainFlow is private — needs GITHUB_TOKEN at build).
   */
  featuredPins: ["TrainFlow", "CineOps"] as const,

  about: {
    en: "I'm Felipe Gomes — a video editor turned product builder, now focused on AI engineering. I started in post-production, learned to ship with HTML, CSS, JavaScript, React, and Next.js, then built AI-assisted tools at the video × product intersection. Today I write frontend-strong, full-stack-capable code and aim for an AI engineering role where craft and shipping both matter.",
    pt: "Sou Felipe Gomes — editor de vídeo que virou construtor de produto e agora foca em engenharia de IA. Comecei na pós-produção, aprendi a entregar com HTML, CSS, JavaScript, React e Next.js, e depois criei ferramentas com IA na interseção vídeo × produto. Hoje escrevo código com forte base frontend e capacidade full-stack, buscando uma vaga de engenharia de IA onde craft e entrega importam juntos.",
  } satisfies LocalizedString,

  experience: [
    {
      id: "video-editing",
      title: {
        en: "Video Editing & Creative Craft",
        pt: "Edição de Vídeo & Ofício Criativo",
      },
      period: {
        en: "Foundation",
        pt: "Base",
      },
      description: {
        en: "Built a videomaker practice — pacing, storytelling, and finishing. That visual discipline still shapes how I design interfaces and ship product polish.",
        pt: "Construí prática como videomaker — ritmo, narrativa e finalização. Essa disciplina visual ainda molda como desenho interfaces e entrego acabamento de produto.",
      },
    },
    {
      id: "learning-programming",
      title: {
        en: "Learning Programming",
        pt: "Aprendendo Programação",
      },
      period: {
        en: "Growth",
        pt: "Crescimento",
      },
      description: {
        en: "Self-taught path from HTML/CSS/JavaScript into React and Next.js. Shipped personal sites and experiments while learning modern frontend fundamentals.",
        pt: "Caminho autodidata de HTML/CSS/JavaScript até React e Next.js. Publiquei sites e experimentos pessoais enquanto aprendia fundamentos modernos de frontend.",
      },
    },
    {
      id: "transition",
      title: {
        en: "Product & AI Tools Transition",
        pt: "Transição para Produto & Ferramentas com IA",
      },
      period: {
        en: "Current",
        pt: "Atual",
      },
      description: {
        en: "Building tools at the video × AI intersection (scripting, jump cuts, tube/ops workflows). Moving from creative tooling into serious software engineering practices.",
        pt: "Construindo ferramentas na interseção vídeo × IA (roteiros, jump cuts, fluxos tube/ops). Saindo de tooling criativo rumo a práticas sérias de engenharia de software.",
      },
    },
    {
      id: "goals",
      title: {
        en: "AI Engineering Goals",
        pt: "Metas em Engenharia de IA",
      },
      period: {
        en: "Next",
        pt: "Próximo",
      },
      description: {
        en: "Land an AI engineering role — frontend-strong, full-stack capable — contributing to real products with clean UI, solid TypeScript, and thoughtful AI systems.",
        pt: "Conseguir uma vaga de engenharia de IA — forte em frontend, capaz de full-stack — contribuindo em produtos reais com UI limpa, TypeScript sólido e sistemas de IA bem pensados.",
      },
    },
  ] as const satisfies readonly ExperienceEntry[],

  education: [
    {
      id: "origamid-web",
      kind: "course",
      title: {
        en: "Web Design & Frontend Fundamentals",
        pt: "Fundamentos de Web Design & Frontend",
      },
      institution: {
        en: "Origamid-style coursework (self-paced)",
        pt: "Cursos no estilo Origamid (autodidata)",
      },
      period: {
        en: "Ongoing / completed modules — EDITABLE",
        pt: "Em andamento / módulos concluídos — EDITÁVEL",
      },
      description: {
        en: "HTML, CSS, JavaScript, and UI fundamentals through structured online courses. Replace with exact course titles and years when ready.",
        pt: "HTML, CSS, JavaScript e fundamentos de UI via cursos online estruturados. Substitua pelos títulos e anos exatos quando estiver pronto.",
      },
      editable: true,
    },
    {
      id: "self-taught",
      kind: "course",
      title: {
        en: "Self-taught Software Path",
        pt: "Trilha Autodidata de Software",
      },
      institution: {
        en: "Independent study",
        pt: "Estudo independente",
      },
      period: {
        en: "Continuous — EDITABLE",
        pt: "Contínuo — EDITÁVEL",
      },
      description: {
        en: "React, Next.js, TypeScript, and product/AI tooling learned by shipping public GitHub projects. Update with formal milestones as they land.",
        pt: "React, Next.js, TypeScript e tooling de produto/IA aprendidos ao publicar projetos no GitHub. Atualize com marcos formais conforme forem surgindo.",
      },
      editable: true,
    },
    {
      id: "certificates-tbd",
      kind: "certificate",
      title: {
        en: "Certificates (TBD)",
        pt: "Certificados (a definir)",
      },
      institution: {
        en: "To be added",
        pt: "A adicionar",
      },
      period: {
        en: "Placeholder — EDITABLE",
        pt: "Placeholder — EDITÁVEL",
      },
      description: {
        en: "Reserved slot for certificates. Add issuer, credential ID, and date when available.",
        pt: "Espaço reservado para certificados. Adicione emissor, ID da credencial e data quando disponíveis.",
      },
      editable: true,
    },
  ] as const satisfies readonly EducationEntry[],

  skills: {
    frontend: [
      { name: "React", icon: "Atom" },
      { name: "Next.js", icon: "Layers" },
      { name: "TypeScript", icon: "FileType" },
      { name: "Tailwind CSS", icon: "Palette" },
      { name: "HTML / CSS", icon: "Code2" },
      { name: "Framer Motion", icon: "Sparkles" },
    ] as const satisfies readonly SkillItem[],
    backend: [
      { name: "Node.js", icon: "Server" },
      { name: "REST APIs", icon: "Network" },
      { name: "Next.js Route Handlers", icon: "Route" },
    ] as const satisfies readonly SkillItem[],
    languages: [
      { name: "TypeScript", icon: "FileCode2" },
      { name: "JavaScript", icon: "Braces" },
      { name: "Python", icon: "Binary" },
      { name: "SQL", icon: "Table2" },
    ] as const satisfies readonly SkillItem[],
    databases: [
      { name: "PostgreSQL", icon: "Database" },
      { name: "SQLite", icon: "HardDrive" },
    ] as const satisfies readonly SkillItem[],
    tools: [
      { name: "Git / GitHub", icon: "GitBranch" },
      { name: "VS Code / Cursor", icon: "Terminal" },
      { name: "Vercel", icon: "Cloud" },
      { name: "AI tooling", icon: "Bot" },
    ] as const satisfies readonly SkillItem[],
    design: [
      { name: "Figma", icon: "PenTool" },
      { name: "Video editing", icon: "Clapperboard" },
      { name: "UI craft", icon: "LayoutTemplate" },
    ] as const satisfies readonly SkillItem[],
  },
} as const;

export type SiteConfig = typeof siteConfig;
