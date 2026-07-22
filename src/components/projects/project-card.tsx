"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink, GitFork, Star } from "lucide-react";

import { ProjectPlaceholder } from "@/components/projects/project-placeholder";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";
import type { ScoredRepo } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProjectCardProps = ScoredRepo & {
  index?: number;
  reduced?: boolean;
};

export function ProjectCard({
  index = 0,
  reduced = false,
  ...repo
}: ProjectCardProps) {
  const { t } = useLocale();
  const copy = t.sections.projects;
  const hasHomepage = Boolean(repo.homepage);

  return (
    <motion.article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-fg/[0.03]",
        "transition-[border-color,box-shadow,transform] duration-300",
        "hover:border-accent/45 hover:shadow-[0_12px_40px_-12px_color-mix(in_srgb,var(--accent)_45%,transparent)]",
      )}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={
        reduced
          ? { duration: 0 }
          : {
              duration: 0.5,
              delay: Math.min(index * 0.06, 0.36),
              ease: [0.22, 1, 0.36, 1],
            }
      }
      whileHover={reduced ? undefined : { y: -6 }}
    >
      <div className="relative overflow-hidden border-b border-border/50">
        <ProjectPlaceholder name={repo.name} language={repo.language} />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-display text-xl tracking-tight text-fg sm:text-2xl">
            {repo.name}
          </h3>
          {repo.language ? (
            <span className="rounded-md border border-border/60 bg-fg/[0.04] px-2 py-0.5 text-xs text-muted-foreground">
              {repo.language}
            </span>
          ) : null}
        </div>

        {repo.description ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {repo.description}
          </p>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1" title={copy.stars}>
            <Star className="size-3.5 text-accent" aria-hidden />
            <span className="sr-only">{copy.stars}: </span>
            {repo.stargazers_count}
          </span>
          <span className="inline-flex items-center gap-1" title={copy.forks}>
            <GitFork className="size-3.5" aria-hidden />
            <span className="sr-only">{copy.forks}: </span>
            {repo.forks_count}
          </span>
        </div>

        {repo.topics.length > 0 ? (
          <ul className="flex list-none flex-wrap gap-1.5">
            {repo.topics.slice(0, 5).map((topic) => (
              <li
                key={topic}
                className="rounded-md bg-accent/10 px-2 py-0.5 text-[0.7rem] text-accent"
              >
                {topic}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex flex-wrap gap-2 pt-1">
          {hasHomepage ? (
            <Button
              nativeButton={false}
              render={
                <a
                  href={repo.homepage!}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              size="sm"
              className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <ExternalLink className="size-3.5" aria-hidden />
              {copy.liveDemo}
            </Button>
          ) : null}
          <Button
            nativeButton={false}
            render={
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            variant="outline"
            size="sm"
            className="gap-1.5"
          >
            <Code2 className="size-3.5" aria-hidden />
            {copy.viewGithub}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
