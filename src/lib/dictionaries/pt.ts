import type { Dictionary } from "./en";

export const pt = {
  meta: {
    title: "Felipe Gomes — AI Engineer",
    description:
      "AI Engineer · Frontend · Full-stack capable. Portfólio de Felipe Gomes — ofício em vídeo, produto e tooling com IA, do Rio de Janeiro.",
  },

  nav: {
    about: "Sobre",
    skills: "Habilidades",
    projects: "Projetos",
    ask: "Busca",
    stats: "Estatísticas",
    experience: "Experiência",
    education: "Educação",
    contact: "Contato",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },

  hero: {
    role: "AI Engineer",
    focus: "Frontend · Full-stack capable",
    typingLines: [
      "Construindo produtos com código e IA",
      "Do ofício em vídeo à engenharia de IA",
      "Entregando ferramentas com acabamento premium",
    ],
    arc: "Editor de vídeo em transição para engenharia de IA — construindo produtos com código e IA.",
    ctaProjects: "Ver Projetos",
    ctaResume: "Baixar Currículo",
    ctaGithub: "GitHub",
    ctaLinkedin: "LinkedIn",
  },

  sections: {
    about: {
      title: "Sobre",
      subtitle: "O caminho do ofício criativo à engenharia.",
    },
    skills: {
      title: "Habilidades",
      subtitle: "Ferramentas que uso para desenhar, construir e entregar.",
      groups: {
        frontend: "Frontend",
        backend: "Backend",
        languages: "Linguagens de Programação",
        databases: "Bancos de Dados",
        tools: "Ferramentas",
        design: "Design",
      },
    },
    projects: {
      title: "Projetos em Destaque",
      subtitle: "Destaques fixos, depois repositórios ranqueados pela atividade no GitHub.",
      liveDemo: "Demo ao vivo",
      viewGithub: "GitHub",
      stars: "Stars",
      forks: "Forks",
      private: "Privado",
    },
    ask: {
      title: "Pergunte sobre meus projetos",
      subtitle: "Busque em todos os repositórios públicos.",
      placeholder: "Tente “Next.js”, “vídeo” ou o nome de um repo…",
      empty: "Nenhum projeto corresponde a essa busca. Tente outra palavra-chave.",
      results: "resultados",
    },
    stats: {
      title: "Estatísticas do GitHub",
      subtitle: "Instantâneo da atividade pública na última build.",
      repositories: "Repositórios",
      stars: "Stars totais",
      forks: "Forks totais",
      followers: "Seguidores",
      following: "Seguindo",
      languages: "Linguagens",
      commits: "Atividade de commits",
      contributions: "Calendário de contribuições",
      contributionsEmpty:
        "Calendário de contribuições indisponível nesta build (GraphQL omitido).",
      less: "Menos",
      more: "Mais",
      fetchedAt: "Dados obtidos em",
    },
    experience: {
      title: "Experiência",
      subtitle: "Uma linha do tempo de ofício, aprendizado e transição.",
    },
    education: {
      title: "Educação",
      subtitle: "Cursos, trilha autodidata e certificados.",
      kinds: {
        university: "Universidade",
        course: "Curso",
        certificate: "Certificado",
      },
      editable: "Editável",
      editableHint: "Rascunho — revise em config.ts",
    },
    contact: {
      title: "Contato",
      subtitle: "Vamos falar sobre vagas, colaboração ou projetos.",
      email: "E-mail",
      copyEmail: "Copiar e-mail",
      copied: "Copiado!",
      copyFailed: "Não foi possível copiar o e-mail",
      linkedin: "LinkedIn",
      github: "GitHub",
      resume: "Currículo",
    },
  },

  command: {
    title: "Menu de comandos",
    placeholder: "Ir para uma seção, alternar tema ou copiar e-mail…",
    empty: "Nenhuma ação correspondente.",
    groups: {
      navigation: "Navegação",
      actions: "Ações",
      preferences: "Preferências",
    },
    actions: {
      copyEmail: "Copiar e-mail",
      openGithub: "Abrir GitHub",
      openLinkedin: "Abrir LinkedIn",
      downloadResume: "Baixar currículo",
      toggleTheme: "Alternar tema",
      themeDark: "Tema: Escuro",
      themeLight: "Tema: Claro",
      languageEn: "Idioma: English",
      languagePt: "Idioma: Português",
    },
  },

  chrome: {
    loading: "Carregando",
    backToTop: "Voltar ao topo",
    themeToggle: "Alternar tema",
    languageToggle: "Trocar idioma",
    skipToContent: "Pular para o conteúdo",
    footer: {
      builtBy: "Feito por Felipe Gomes",
      rights: "Todos os direitos reservados.",
      source: "Código no GitHub",
    },
    notFound: {
      title: "Página não encontrada",
      description: "Essa rota não existe neste portfólio.",
      home: "Voltar ao início",
    },
  },
} as const satisfies Dictionary;
