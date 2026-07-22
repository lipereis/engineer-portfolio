"use client";

import { motion } from "framer-motion";

import { siteConfig } from "@/config";
import { useLocale } from "@/hooks/use-locale";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function EducationSection() {
  const { locale, t } = useLocale();
  const reduced = useReducedMotion();
  const copy = t.sections.education;

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="scroll-mt-20 border-t border-border/60 px-5 py-24 sm:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {t.nav.education}
          </p>
          <h2
            id="education-heading"
            className="font-display text-3xl tracking-tight text-fg sm:text-4xl"
          >
            {copy.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {copy.subtitle}
          </p>
        </header>

        <ul className="grid list-none grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.education.map((entry, index) => (
            <motion.li
              key={entry.id}
              className={cn(
                "flex h-full flex-col gap-3 rounded-xl border border-border/60 bg-fg/[0.03] p-5",
                "transition-[border-color] duration-300 hover:border-accent/35",
              )}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={
                reduced
                  ? { duration: 0 }
                  : {
                      duration: 0.5,
                      delay: Math.min(index * 0.07, 0.28),
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-accent/35 bg-accent/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-accent">
                  {copy.kinds[entry.kind]}
                </span>
                {entry.editable ? (
                  <span
                    className="rounded-md border border-border/50 px-2 py-0.5 text-[11px] text-muted-foreground/80"
                    title={copy.editableHint}
                  >
                    {copy.editable}
                  </span>
                ) : null}
              </div>

              <div>
                <h3 className="font-display text-xl tracking-tight text-fg sm:text-2xl">
                  {entry.title[locale]}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {entry.institution[locale]}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-accent/90">
                  {entry.period[locale]}
                </p>
              </div>

              <p className="mt-auto text-sm leading-relaxed text-muted-foreground">
                {entry.description[locale]}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
