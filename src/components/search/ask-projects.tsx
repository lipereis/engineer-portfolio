"use client";

import * as React from "react";
import { ExternalLink, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import githubJson from "@/data/github.json";
import { useLocale } from "@/hooks/use-locale";
import type { GithubData, ScoredRepo } from "@/lib/types";

const github = githubJson as GithubData;

function matchesQuery(repo: ScoredRepo, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return false;

  const haystack = [
    repo.name,
    repo.description ?? "",
    repo.language ?? "",
    ...repo.topics,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}

export function AskProjects() {
  const { t } = useLocale();
  const [query, setQuery] = React.useState("");

  const results = React.useMemo(() => {
    if (!query.trim()) return [];
    return github.allProjects.filter((repo) => matchesQuery(repo, query));
  }, [query]);

  const hasQuery = query.trim().length > 0;

  return (
    <section
      id="ask"
      aria-labelledby="ask-heading"
      className="scroll-mt-20 border-t border-border/60 px-5 py-24 sm:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {t.nav.ask}
          </p>
          <h2
            id="ask-heading"
            className="font-display text-3xl tracking-tight text-fg sm:text-4xl"
          >
            {t.sections.ask.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.sections.ask.subtitle}
          </p>
        </header>

        <div className="relative mb-8 max-w-xl">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.sections.ask.placeholder}
            aria-label={t.sections.ask.title}
            className="h-11 pl-10 text-base md:text-sm"
            autoComplete="off"
          />
        </div>

        {hasQuery ? (
          <div aria-live="polite">
            <p className="mb-4 text-sm text-muted-foreground">
              {results.length} {t.sections.ask.results}
            </p>

            {results.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {t.sections.ask.empty}
              </p>
            ) : (
              <ul className="divide-y divide-border/60 border-t border-border/60">
                {results.map((repo) => (
                  <li key={repo.name}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-4 py-4 transition-colors hover:text-accent"
                    >
                      <div className="min-w-0">
                        <p className="font-medium tracking-tight text-fg group-hover:text-accent">
                          {repo.name}
                          {repo.language ? (
                            <span className="ml-2 text-xs font-normal text-muted-foreground">
                              {repo.language}
                            </span>
                          ) : null}
                        </p>
                        {repo.description ? (
                          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                            {repo.description}
                          </p>
                        ) : null}
                      </div>
                      <ExternalLink
                        className="mt-1 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
