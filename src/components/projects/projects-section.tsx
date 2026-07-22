"use client";

import { motion } from "framer-motion";

import { ProjectCard } from "@/components/projects/project-card";
import githubJson from "@/data/github.json";
import { useLocale } from "@/hooks/use-locale";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { GithubData } from "@/lib/types";

const github = githubJson as GithubData;

export function ProjectsSection() {
  const { t } = useLocale();
  const reduced = useReducedMotion();

  const reveal = reduced
    ? { initial: false as const, whileInView: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
      };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-20 border-t border-border/60 px-5 py-24 sm:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.header
          className="mb-12 max-w-2xl"
          {...reveal}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {t.nav.projects}
          </p>
          <h2
            id="projects-heading"
            className="font-display text-3xl tracking-tight text-fg sm:text-4xl"
          >
            {t.sections.projects.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.sections.projects.subtitle}
          </p>
        </motion.header>

        <ul className="grid list-none grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {github.topProjects.map((repo, index) => (
            <li key={repo.name} className="min-h-0">
              <ProjectCard {...repo} index={index} reduced={reduced} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
