"use client";

import { motion } from "framer-motion";

import { siteConfig } from "@/config";
import { useLocale } from "@/hooks/use-locale";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ExperienceSection() {
  const { locale, t } = useLocale();
  const reduced = useReducedMotion();
  const copy = t.sections.experience;

  const reveal = reduced
    ? { initial: false as const, whileInView: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
      };

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-20 border-t border-border/60 px-5 py-24 sm:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.header
          className="mb-14 max-w-2xl"
          {...reveal}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {t.nav.experience}
          </p>
          <h2
            id="experience-heading"
            className="font-display text-3xl tracking-tight text-fg sm:text-4xl"
          >
            {copy.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {copy.subtitle}
          </p>
        </motion.header>

        <ol className="relative mx-auto list-none space-y-0 border-l border-border/80 pl-0 sm:max-w-3xl">
          {siteConfig.experience.map((entry, index) => (
            <motion.li
              key={entry.id}
              className="relative pl-10 pb-12 last:pb-0 sm:pl-12"
              initial={reduced ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={
                reduced
                  ? { duration: 0 }
                  : {
                      duration: 0.55,
                      delay: index * 0.09,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            >
              <span
                className="absolute top-1 -left-px flex size-7 -translate-x-1/2 items-center justify-center rounded-full border border-accent/50 bg-bg text-[10px] font-medium tracking-wide text-accent ring-4 ring-bg"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                {entry.period[locale]}
              </p>
              <h3 className="mt-2 font-display text-2xl tracking-tight text-fg sm:text-3xl">
                {entry.title[locale]}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {entry.description[locale]}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
