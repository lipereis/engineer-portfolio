/**
 * Generates public/resume-en.pdf and public/resume-pt.pdf from siteConfig.
 * Also writes public/resume.pdf as a copy of the English file (legacy URL).
 * Run: npx tsx scripts/generate-resume.ts
 */
import { createWriteStream, copyFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import PDFDocument from "pdfkit";
import { siteConfig, type LocalizedString } from "../src/config";
import type { Locale } from "../src/lib/i18n";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");

const MARGIN = 46;
const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const PAGE_BOTTOM = PAGE_HEIGHT - MARGIN;

const ACCENT = "#C4A574";
const INK = "#141414";
const MUTED = "#565656";

type ProjectLine = {
  name: string;
  year: string;
  blurb: LocalizedString;
  stack: string;
  /** Private projects list a live demo instead of a repository. */
  repo?: string;
  demo?: string;
};

const PROJECTS: ProjectLine[] = [
  {
    name: "HookEdit",
    year: "2026",
    blurb: {
      en: "AI editor for vertical video. Transcribes uploads with word-level timestamps (faster-whisper), builds dynamic captions, and uses Gemini to suggest retention edits (cuts, B-roll, sound effects, hook review). Renders the final clip with a single ffmpeg filter graph.",
      pt: "Editor de vídeo vertical com IA. Transcreve o upload com timestamp por palavra (faster-whisper), monta legendas dinâmicas e usa o Gemini para sugerir edições de retenção (cortes, B-roll, efeitos sonoros, avaliação do hook). Renderiza o clipe final com um único filter graph do ffmpeg.",
    },
    stack: "TypeScript, Next.js, Python, FastAPI, faster-whisper, Gemini API, ffmpeg",
    demo: "hookedit.vercel.app",
  },
  {
    name: "Video Content Pipeline",
    year: "2026",
    blurb: {
      en: "n8n workflow that turns a video into a first draft of social content: Whisper transcription, then hooks, script, and captions written by a local LLM (Ollama). A FastAPI worker holds the logic; failed videos are kept in a separate folder with the reason. Runs fully local in Docker.",
      pt: "Workflow n8n que transforma um vídeo em um primeiro rascunho de conteúdo: transcrição com Whisper e, em seguida, hooks, roteiro e legendas escritos por um LLM local (Ollama). Um worker FastAPI concentra a lógica; vídeos que falham ficam em uma pasta separada com o motivo. Roda 100% local em Docker.",
    },
    stack: "n8n, Docker, Python, FastAPI, faster-whisper, Ollama, pytest",
    repo: "github.com/lipereis/video-content-pipeline",
  },
  {
    name: "jobfit",
    year: "2026",
    blurb: {
      en: "Command-line tool that scores job postings against a resume, requirement by requirement. Reads company boards through public APIs into SQLite and uses rule-based scoring with no language model. Run on 1,917 real postings, it exposed four scoring flaws that became rules and tests; a labelled set gates every change.",
      pt: "Ferramenta de linha de comando que dá nota a vagas com base no currículo, requisito por requisito. Lê quadros de vagas por APIs públicas para um SQLite e usa regras auditáveis, sem modelo de linguagem. Rodada em 1.917 vagas reais, expôs quatro falhas de pontuação que viraram regras e testes; um conjunto rotulado trava cada mudança.",
    },
    stack: "Python, SQLite, SQL, pytest, GitHub Actions",
    repo: "github.com/lipereis/job-fit",
  },
  {
    name: "TrainFlow",
    year: "2026",
    blurb: {
      en: "AI-powered operating system for personal trainers: client management, program building, and assisted planning.",
      pt: "Sistema operacional com IA para personal trainers: gestão de alunos, montagem de treinos e planejamento assistido.",
    },
    stack: "TypeScript, Next.js, Node.js",
    repo: "github.com/lipereis/TrainFlow",
  },
  {
    name: "RAGCore",
    year: "2026",
    blurb: {
      en: "Local Retrieval-Augmented Generation engine for querying PDF documents. Combines semantic search (Chroma) with keyword search (BM25), local re-ranking via FlashRank, and grounded answers through the Gemini Flash API.",
      pt: "Motor local de Retrieval-Augmented Generation (RAG) para consulta de documentos PDF. Combina busca semântica (Chroma) e busca por palavra-chave (BM25), com re-ranking local via FlashRank e respostas grounded pela API do Gemini Flash.",
    },
    stack: "Python, pdfplumber, Chroma, BM25, FlashRank, Gemini API",
    repo: "github.com/lipereis/RAGCore",
  },
  {
    name: "SpoilerAlert",
    year: "2026",
    blurb: {
      en: "Streamlit web app that generates a “Spotify Wrapped”-style card from a public Letterboxd profile. Scrapes public data, aggregates with pandas, and renders a 1080x1920 card with Pillow.",
      pt: "Aplicação web em Streamlit que gera um card no estilo “Spotify Wrapped” a partir do perfil público no Letterboxd. Faz scraping de dados públicos, agregação com pandas e renderização do card (1080x1920) com Pillow.",
    },
    stack: "Python, Streamlit, pandas, Pillow, letterboxdpy",
    repo: "github.com/lipereis/spoileralert",
  },
  {
    name: "CineOps",
    year: "2026",
    blurb: {
      en: "Film production tool that ties the shooting stripboard to the budget: moving a scene to another shooting day recalculates the budget in the same transaction.",
      pt: "Ferramenta de produção de cinema que liga o stripboard de filmagem ao orçamento: mover uma cena para outra diária recalcula o orçamento na mesma transação.",
    },
    stack: "TypeScript, Next.js, PostgreSQL, Prisma, dnd-kit",
    repo: "github.com/lipereis/CineOps",
  },
];

const COPY = {
  en: {
    profile: "Profile",
    skills: "Technical Skills",
    projects: "Projects",
    education: "Education",
    experience: "Professional Experience",
    languages: "Languages",
    certifications: "Courses & Certifications",
    stack: "Stack",
    repository: "Repository",
    demo: "Live demo",
    skillRows: [
      ["AI / AI Engineering", siteConfig.skills.ai.map((s) => s.name).join(", ")],
      ["Backend", siteConfig.skills.backend.map((s) => s.name).join(", ")],
      ["Languages", siteConfig.skills.languages.map((s) => s.name).join(", ")],
      ["Frontend", siteConfig.skills.frontend.map((s) => s.name).join(", ")],
      ["Databases", siteConfig.skills.databases.map((s) => s.name).join(", ")],
      ["Tools & Deploy", siteConfig.skills.tools.map((s) => s.name).join(", ")],
    ] as [string, string][],
  },
  pt: {
    profile: "Perfil",
    skills: "Competências Técnicas",
    projects: "Projetos",
    education: "Formação Acadêmica",
    experience: "Experiência Profissional",
    languages: "Idiomas",
    certifications: "Cursos e Certificações",
    stack: "Stack",
    repository: "Repositório",
    demo: "Demo ao vivo",
    skillRows: [
      [
        "IA / AI Engineering",
        siteConfig.skills.ai.map((s) => s.name).join(", "),
      ],
      ["Backend", siteConfig.skills.backend.map((s) => s.name).join(", ")],
      [
        "Linguagens",
        siteConfig.skills.languages.map((s) => s.name).join(", "),
      ],
      ["Frontend", siteConfig.skills.frontend.map((s) => s.name).join(", ")],
      [
        "Banco de Dados",
        siteConfig.skills.databases.map((s) => s.name).join(", "),
      ],
      [
        "Ferramentas & Deploy",
        siteConfig.skills.tools.map((s) => s.name).join(", "),
      ],
    ] as [string, string][],
  },
} as const;

function ensureSpace(doc: PDFKit.PDFDocument, y: number, needed: number): number {
  if (y + needed <= PAGE_BOTTOM) return y;
  doc.addPage();
  return MARGIN;
}

function sectionTitle(doc: PDFKit.PDFDocument, title: string, y: number): number {
  const top = ensureSpace(doc, y, 46);
  doc
    .font("Helvetica-Bold")
    .fontSize(9.5)
    .fillColor(INK)
    .text(title.toUpperCase(), MARGIN, top, { characterSpacing: 1.3 });
  const rule = doc.y + 3.5;
  doc
    .moveTo(MARGIN, rule)
    .lineTo(MARGIN + CONTENT_WIDTH, rule)
    .strokeColor(ACCENT)
    .lineWidth(1)
    .stroke();
  return rule + 9;
}

function entryHeading(
  doc: PDFKit.PDFDocument,
  left: string,
  right: string,
  y: number,
): number {
  const top = ensureSpace(doc, y, 40);
  doc
    .font("Helvetica-Bold")
    .fontSize(9.5)
    .fillColor(INK)
    .text(left, MARGIN, top, { width: CONTENT_WIDTH * 0.68 });
  const leftBottom = doc.y;
  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor(MUTED)
    .text(right, MARGIN + CONTENT_WIDTH * 0.68, top + 1, {
      width: CONTENT_WIDTH * 0.32,
      align: "right",
    });
  return Math.max(leftBottom, doc.y) + 2;
}

function body(
  doc: PDFKit.PDFDocument,
  text: string,
  y: number,
  options: { indent?: number; color?: string; size?: number } = {},
): number {
  const indent = options.indent ?? 0;
  const top = ensureSpace(doc, y, 24);
  doc
    .font("Helvetica")
    .fontSize(options.size ?? 8.5)
    .fillColor(options.color ?? INK)
    .text(text, MARGIN + indent, top, {
      width: CONTENT_WIDTH - indent,
      lineGap: 1.1,
    });
  return doc.y;
}

function writeResume(locale: Locale, outPath: string): Promise<void> {
  const copy = COPY[locale];

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "LETTER",
      margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
      info: {
        Title: `${siteConfig.fullName} — Resume (${locale.toUpperCase()})`,
        Author: siteConfig.fullName,
        Subject: siteConfig.headline,
        Keywords:
          "backend, AI engineer, RAG, Node.js, Python, TypeScript, Next.js",
      },
    });

    const stream = createWriteStream(outPath);
    doc.pipe(stream);

    doc
      .font("Helvetica-Bold")
      .fontSize(21)
      .fillColor(INK)
      .text(siteConfig.fullName.toUpperCase(), MARGIN, MARGIN, {
        width: CONTENT_WIDTH,
        characterSpacing: 0.4,
      });

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(ACCENT)
      .text(siteConfig.headline, { width: CONTENT_WIDTH });

    doc.moveDown(0.4);
    doc
      .fontSize(8.5)
      .fillColor(MUTED)
      .text(
        [
          siteConfig.location,
          siteConfig.phone,
          siteConfig.email,
          `github.com/${siteConfig.githubUsername}`,
          siteConfig.linkedinHandle,
          "lipereis.github.io/engineer-portfolio",
        ].join("   ·   "),
        { width: CONTENT_WIDTH },
      );

    let y = doc.y + 13;

    y = sectionTitle(doc, copy.profile, y);
    y = body(doc, siteConfig.about[locale], y) + 11;

    y = sectionTitle(doc, copy.skills, y);
    for (const [label, value] of copy.skillRows) {
      y = ensureSpace(doc, y, 22);
      doc
        .font("Helvetica-Bold")
        .fontSize(8.5)
        .fillColor(INK)
        .text(`${label}: `, MARGIN, y, { continued: true, width: CONTENT_WIDTH });
      doc.font("Helvetica").fillColor(MUTED).text(value, { lineGap: 1 });
      y = doc.y + 3.5;
    }
    y += 8;

    y = sectionTitle(doc, copy.projects, y);
    for (const project of PROJECTS) {
      y = entryHeading(doc, project.name, project.year, y);
      y = body(doc, project.blurb[locale], y, { color: MUTED }) + 2;
      y = body(doc, `${copy.stack}: ${project.stack}`, y, { size: 8 }) + 1;
      const link = project.demo
        ? `${copy.demo}: ${project.demo}`
        : `${copy.repository}: ${project.repo}`;
      y = body(doc, link, y, { size: 8, color: MUTED }) + 9;
    }
    y += 2;

    y = sectionTitle(doc, copy.education, y);
    for (const entry of siteConfig.education) {
      y = entryHeading(doc, entry.institution[locale], entry.period[locale], y);
      y = body(
        doc,
        `${entry.title[locale]} — ${entry.description[locale]}`,
        y,
        { color: MUTED },
      );
      y += 8;
    }
    y += 2;

    y = sectionTitle(doc, copy.experience, y);
    for (const entry of siteConfig.experience) {
      y = entryHeading(
        doc,
        `${entry.role[locale]} — ${entry.org[locale]}`,
        entry.period[locale],
        y,
      );
      y = body(doc, entry.description[locale], y, { color: MUTED });
      y += 8;
    }
    y += 2;

    y = sectionTitle(doc, copy.languages, y);
    y =
      body(
        doc,
        siteConfig.spokenLanguages
          .map((lang) => `${lang.name[locale]} — ${lang.level[locale]}`)
          .join("   |   "),
        y,
      ) + 11;

    y = sectionTitle(doc, copy.certifications, y);
    for (const cert of siteConfig.certifications) {
      y =
        body(doc, `•  ${cert.title[locale]} (${cert.year})`, y, {
          color: MUTED,
        }) + 3;
    }

    doc.end();

    stream.on("finish", () => resolve());
    stream.on("error", reject);
  });
}

async function main() {
  await mkdir(PUBLIC, { recursive: true });

  const enPath = path.join(PUBLIC, "resume-en.pdf");
  const ptPath = path.join(PUBLIC, "resume-pt.pdf");
  const legacyPath = path.join(PUBLIC, "resume.pdf");

  await writeResume("en", enPath);
  await writeResume("pt", ptPath);
  copyFileSync(enPath, legacyPath);

  console.log(`Wrote ${enPath}`);
  console.log(`Wrote ${ptPath}`);
  console.log(`Wrote ${legacyPath} (EN alias)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
