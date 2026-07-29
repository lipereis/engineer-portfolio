/**
 * Generates public/resume.pdf from siteConfig plus the project list below.
 * Run: npx tsx scripts/generate-resume.ts
 */
import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import PDFDocument from "pdfkit";
import { siteConfig } from "../src/config";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_PATH = path.join(ROOT, "public", "resume.pdf");

const MARGIN = 46;
const PAGE_WIDTH = 612; // US Letter
const PAGE_HEIGHT = 792;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const PAGE_BOTTOM = PAGE_HEIGHT - MARGIN;

const ACCENT = "#C4A574";
const INK = "#141414";
const MUTED = "#565656";

type ProjectLine = {
  name: string;
  year: string;
  blurb: string;
  stack: string;
  repo: string;
};

const PROJECTS: ProjectLine[] = [
  {
    name: "TrainFlow",
    year: "2026",
    blurb:
      "AI-powered operating system for personal trainers: client management, program building, and assisted planning.",
    stack: "TypeScript, Next.js, Node.js",
    repo: "github.com/lipereis/TrainFlow",
  },
  {
    name: "RAGCore",
    year: "2026",
    blurb:
      "Local Retrieval-Augmented Generation engine for querying PDF documents. Combines semantic search (Chroma) with keyword search (BM25), local re-ranking via FlashRank, and grounded answers through the Gemini Flash API.",
    stack: "Python, pdfplumber, Chroma, BM25, FlashRank, Gemini API",
    repo: "github.com/lipereis/RAGCore",
  },
  {
    name: "SpoilerAlert",
    year: "2026",
    blurb:
      "Streamlit web app that generates a “Spotify Wrapped”-style card from a public Letterboxd profile. Scrapes public data, aggregates with pandas, and renders a 1080x1920 card with Pillow.",
    stack: "Python, Streamlit, pandas, Pillow, letterboxdpy",
    repo: "github.com/lipereis/spoileralert",
  },
  {
    name: "CineOps",
    year: "2026",
    blurb: "Tooling for audiovisual operations and post-production workflows.",
    stack: "JavaScript",
    repo: "github.com/lipereis/CineOps",
  },
];

const SKILL_ROWS: [string, string][] = [
  ["AI / AI Engineering", siteConfig.skills.ai.map((s) => s.name).join(", ")],
  ["Backend", siteConfig.skills.backend.map((s) => s.name).join(", ")],
  ["Languages", siteConfig.skills.languages.map((s) => s.name).join(", ")],
  ["Frontend", siteConfig.skills.frontend.map((s) => s.name).join(", ")],
  ["Databases", siteConfig.skills.databases.map((s) => s.name).join(", ")],
  ["Tools & Deploy", siteConfig.skills.tools.map((s) => s.name).join(", ")],
];

/** Absolute-positioned layout needs manual pagination. */
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

/** Bold left title with a muted right-aligned meta label on the same baseline. */
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

async function main() {
  await mkdir(path.dirname(OUT_PATH), { recursive: true });

  const doc = new PDFDocument({
    size: "LETTER",
    margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
    info: {
      Title: `${siteConfig.fullName} — Resume`,
      Author: siteConfig.fullName,
      Subject: siteConfig.headline,
      Keywords: "backend, AI engineer, RAG, Node.js, Python, TypeScript, Next.js",
    },
  });

  const stream = createWriteStream(OUT_PATH);
  doc.pipe(stream);

  // Header
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

  y = sectionTitle(doc, "Profile", y);
  y = body(doc, siteConfig.about.en, y) + 11;

  y = sectionTitle(doc, "Technical Skills", y);
  for (const [label, value] of SKILL_ROWS) {
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

  y = sectionTitle(doc, "Projects", y);
  for (const project of PROJECTS) {
    y = entryHeading(doc, project.name, project.year, y);
    y = body(doc, project.blurb, y, { color: MUTED }) + 2;
    y = body(doc, `Stack: ${project.stack}`, y, { size: 8 }) + 1;
    y = body(doc, `Repository: ${project.repo}`, y, { size: 8, color: MUTED }) + 9;
  }
  y += 2;

  y = sectionTitle(doc, "Education", y);
  for (const entry of siteConfig.education) {
    y = entryHeading(doc, entry.institution.en, entry.period.en, y);
    y = body(doc, `${entry.title.en} — ${entry.description.en}`, y, {
      color: MUTED,
    });
    y += 8;
  }
  y += 2;

  y = sectionTitle(doc, "Professional Experience", y);
  for (const entry of siteConfig.experience) {
    y = entryHeading(doc, `${entry.role.en} — ${entry.org.en}`, entry.period.en, y);
    y = body(doc, entry.description.en, y, { color: MUTED });
    y += 8;
  }
  y += 2;

  y = sectionTitle(doc, "Languages", y);
  y =
    body(
      doc,
      siteConfig.spokenLanguages
        .map((lang) => `${lang.name.en} — ${lang.level.en}`)
        .join("   |   "),
      y,
    ) + 11;

  y = sectionTitle(doc, "Courses & Certifications", y);
  for (const cert of siteConfig.certifications) {
    y = body(doc, `•  ${cert.title.en} (${cert.year})`, y, { color: MUTED }) + 3;
  }

  doc.end();

  await new Promise<void>((resolve, reject) => {
    stream.on("finish", () => resolve());
    stream.on("error", reject);
  });

  console.log(`Wrote ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
