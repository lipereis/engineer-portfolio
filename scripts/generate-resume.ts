/**
 * Generates a one-page starter resume PDF at public/resume.pdf.
 * Run: npx tsx scripts/generate-resume.ts
 */
import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import PDFDocument from "pdfkit";
import { siteConfig } from "../src/config";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_PATH = path.join(ROOT, "public", "resume.pdf");

const MARGIN = 48;
const PAGE_WIDTH = 612; // US Letter
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const ACCENT = "#C4A574";
const INK = "#1a1a1a";
const MUTED = "#555555";

type ProjectLine = {
  name: string;
  blurb: string;
  stack?: string;
};

const PROJECTS: ProjectLine[] = [
  {
    name: "video-portfolio",
    blurb: "Video editor / videomaker portfolio site.",
    stack: "JavaScript",
  },
  {
    name: "ladobdacena",
    blurb: "Articles on music, cinema, and fashion.",
    stack: "HTML, CSS, JavaScript",
  },
  {
    name: "scriptmvp-ai",
    blurb: "AI tool for viral Reels / TikTok / Shorts scripts (prompt engineering portfolio).",
    stack: "Python",
  },
  {
    name: "Wealthchain",
    blurb: "Crypto market UI powered by the CoinGecko API.",
    stack: "JavaScript",
  },
  {
    name: "CineOps",
    blurb: "Video / ops tooling experiment at the creative × product intersection.",
    stack: "JavaScript",
  },
  {
    name: "tubepilot-ai",
    blurb: "AI-assisted tube / content workflow tool (live on Vercel).",
    stack: "TypeScript",
  },
];

function sectionTitle(doc: PDFKit.PDFDocument, title: string, y: number): number {
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(INK)
    .text(title.toUpperCase(), MARGIN, y, { characterSpacing: 1.2 });
  const after = doc.y + 4;
  doc
    .moveTo(MARGIN, after)
    .lineTo(MARGIN + CONTENT_WIDTH, after)
    .strokeColor(ACCENT)
    .lineWidth(1)
    .stroke();
  return after + 10;
}

async function main() {
  await mkdir(path.dirname(OUT_PATH), { recursive: true });

  const doc = new PDFDocument({
    size: "LETTER",
    margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
    info: {
      Title: `${siteConfig.name} — Resume`,
      Author: siteConfig.name,
      Subject: siteConfig.headline,
    },
  });

  const stream = createWriteStream(OUT_PATH);
  doc.pipe(stream);

  // Header
  doc
    .font("Helvetica-Bold")
    .fontSize(22)
    .fillColor(INK)
    .text(siteConfig.name, MARGIN, MARGIN, { width: CONTENT_WIDTH, align: "left" });

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(MUTED)
    .text(siteConfig.headline, { width: CONTENT_WIDTH });

  const contact = [
    siteConfig.email,
    siteConfig.location,
    `github.com/${siteConfig.githubUsername}`,
    "linkedin.com/in/felipe-gomes-0220b7247",
  ].join("  ·  ");

  doc.moveDown(0.35);
  doc.fontSize(8.5).fillColor(MUTED).text(contact, { width: CONTENT_WIDTH });

  let y = doc.y + 14;

  // Summary
  y = sectionTitle(doc, "Summary", y);
  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor(INK)
    .text(siteConfig.about.en, MARGIN, y, {
      width: CONTENT_WIDTH,
      align: "left",
      lineGap: 1.5,
    });
  y = doc.y + 12;

  // Experience arc (honest — no fake employers)
  y = sectionTitle(doc, "Experience arc", y);
  for (const entry of siteConfig.experience) {
    if (entry.id === "goals") continue; // keep goals off the resume body
    doc
      .font("Helvetica-Bold")
      .fontSize(9.5)
      .fillColor(INK)
      .text(entry.title.en, MARGIN, y, { continued: true, width: CONTENT_WIDTH * 0.72 });
    doc
      .font("Helvetica")
      .fontSize(8.5)
      .fillColor(MUTED)
      .text(`  —  ${entry.period.en}`, { align: "left" });
    y = doc.y + 2;
    doc
      .font("Helvetica")
      .fontSize(8.5)
      .fillColor(INK)
      .text(entry.description.en, MARGIN, y, {
        width: CONTENT_WIDTH,
        lineGap: 1,
      });
    y = doc.y + 8;
  }

  // Selected projects
  y = sectionTitle(doc, "Selected projects", y);
  for (const project of PROJECTS) {
    const label = project.stack
      ? `${project.name}  (${project.stack})`
      : project.name;
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(INK)
      .text(`•  ${label}`, MARGIN, y, { width: CONTENT_WIDTH });
    y = doc.y + 1;
    doc
      .font("Helvetica")
      .fontSize(8.5)
      .fillColor(MUTED)
      .text(project.blurb, MARGIN + 12, y, { width: CONTENT_WIDTH - 12 });
    y = doc.y + 6;
  }

  // Skills
  y = sectionTitle(doc, "Skills", y);
  const skillLines: [string, string][] = [
    ["Frontend", siteConfig.skills.frontend.map((s) => s.name).join(", ")],
    ["Backend", siteConfig.skills.backend.map((s) => s.name).join(", ")],
    ["Languages", siteConfig.skills.languages.map((s) => s.name).join(", ")],
    ["Databases", siteConfig.skills.databases.map((s) => s.name).join(", ")],
    ["Tools", siteConfig.skills.tools.map((s) => s.name).join(", ")],
    ["Design", siteConfig.skills.design.map((s) => s.name).join(", ")],
  ];
  for (const [label, value] of skillLines) {
    doc
      .font("Helvetica-Bold")
      .fontSize(8.5)
      .fillColor(INK)
      .text(`${label}: `, MARGIN, y, { continued: true, width: CONTENT_WIDTH });
    doc.font("Helvetica").fillColor(MUTED).text(value);
    y = doc.y + 3;
  }

  y += 6;

  // Education (honest placeholders — no fake degrees)
  y = sectionTitle(doc, "Education & learning", y);
  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor(INK)
    .text(
      "Self-taught software path via structured online coursework (HTML, CSS, JavaScript, UI fundamentals) and public GitHub projects in React, Next.js, TypeScript, and AI tooling. Formal certificates and course titles to be added when finalized — no university degree listed.",
      MARGIN,
      y,
      { width: CONTENT_WIDTH, lineGap: 1 },
    );

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
