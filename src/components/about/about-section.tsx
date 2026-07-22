"use client";

import { motion } from "framer-motion";

import { siteConfig } from "@/config";
import { useLocale } from "@/hooks/use-locale";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function AboutSection() {
  const { locale, t } = useLocale();
  const reduced = useReducedMotion();

  const reveal = reduced
    ? { initial: false as const, whileInView: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
      };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
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
            {t.nav.about}
          </p>
          <h2
            id="about-heading"
            className="font-display text-3xl tracking-tight text-fg sm:text-4xl"
          >
            {t.sections.about.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.sections.about.subtitle}
          </p>
        </motion.header>

        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <motion.p
            className="max-w-xl text-base leading-relaxed text-fg/90 sm:text-lg"
            {...reveal}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: reduced ? 0 : 0.6,
              delay: reduced ? 0 : 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {siteConfig.about[locale]}
          </motion.p>

          <ol className="relative list-none space-y-0 border-l border-border/80 pl-0">
            {siteConfig.experience.map((entry, index) => (
              <motion.li
                key={entry.id}
                className="relative pl-8 pb-10 last:pb-0"
                initial={reduced ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : {
                        duration: 0.5,
                        delay: index * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
              >
                <span
                  className="absolute top-1.5 -left-px size-2.5 -translate-x-1/2 rounded-full bg-accent ring-4 ring-bg"
                  aria-hidden
                />
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                  {entry.period[locale]}
                </p>
                <h3 className="mt-1.5 font-display text-xl tracking-tight text-fg sm:text-2xl">
                  {entry.title[locale]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {entry.description[locale]}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
