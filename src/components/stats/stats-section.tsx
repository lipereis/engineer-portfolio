"use client";

import { motion } from "framer-motion";

import { CommitActivity } from "@/components/stats/commit-activity";
import { ContributionCalendar } from "@/components/stats/contribution-calendar";
import { LanguageChart } from "@/components/stats/language-chart";
import githubJson from "@/data/github.json";
import { useLocale } from "@/hooks/use-locale";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { GithubData } from "@/lib/types";

const github = githubJson as GithubData;

function formatFetchedAt(iso: string, locale: string): string {
  try {
    return new Date(iso).toLocaleString(locale === "pt" ? "pt-BR" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export function StatsSection() {
  const { locale, t } = useLocale();
  const reduced = useReducedMotion();
  const s = t.sections.stats;
  const hasCalendar = github.contributionWeeks.length > 0;

  const reveal = reduced
    ? { initial: false as const, whileInView: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
      };

  const counters = [
    {
      label: s.repositories,
      value: github.profile.publicRepos,
    },
    {
      label: s.stars,
      value: github.stats.totalStars,
    },
    {
      label: s.followers,
      value: github.profile.followers,
    },
    {
      label: s.following,
      value: github.profile.following,
    },
  ] as const;

  return (
    <section
      id="stats"
      aria-labelledby="stats-heading"
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
            {t.nav.stats}
          </p>
          <h2
            id="stats-heading"
            className="font-display text-3xl tracking-tight text-fg sm:text-4xl"
          >
            {s.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {s.subtitle}
          </p>
        </motion.header>

        <motion.dl
          className="mb-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
          {...reveal}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: reduced ? 0 : 0.55,
            delay: reduced ? 0 : 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {counters.map((item) => (
            <div key={item.label} className="min-w-0">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {item.label}
              </dt>
              <dd className="mt-2 font-display text-3xl tabular-nums tracking-tight text-fg sm:text-4xl">
                {item.value.toLocaleString(locale === "pt" ? "pt-BR" : "en-US")}
              </dd>
            </div>
          ))}
        </motion.dl>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            {...reveal}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: reduced ? 0 : 0.55,
              delay: reduced ? 0 : 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h3 className="mb-5 text-sm font-medium tracking-wide text-muted-foreground">
              {s.languages}
            </h3>
            <LanguageChart languages={github.languages} />
          </motion.div>

          <motion.div
            {...reveal}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: reduced ? 0 : 0.55,
              delay: reduced ? 0 : 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h3 className="mb-5 text-sm font-medium tracking-wide text-muted-foreground">
              {s.commits}
            </h3>
            <CommitActivity weeks={github.commitActivity} />
          </motion.div>
        </div>

        <motion.div
          className="mt-12"
          {...reveal}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: reduced ? 0 : 0.55,
            delay: reduced ? 0 : 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h3 className="mb-5 text-sm font-medium tracking-wide text-muted-foreground">
            {s.contributions}
          </h3>
          {hasCalendar ? (
            <ContributionCalendar
              days={github.contributionWeeks}
              lessLabel={s.less}
              moreLabel={s.more}
            />
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {s.contributionsEmpty}
            </p>
          )}
        </motion.div>

        <p className="mt-10 text-xs text-muted-foreground">
          {s.fetchedAt}: {formatFetchedAt(github.fetchedAt, locale)}
        </p>
      </div>
    </section>
  );
}
