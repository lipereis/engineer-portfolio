"use client";

import { motion } from "framer-motion";

import { SkillCard } from "@/components/skills/skill-card";
import { siteConfig } from "@/config";
import { useLocale } from "@/hooks/use-locale";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const SKILL_GROUPS = [
  "frontend",
  "backend",
  "languages",
  "databases",
  "tools",
  "design",
] as const;

export function SkillsSection() {
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
      id="skills"
      aria-labelledby="skills-heading"
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
            {t.nav.skills}
          </p>
          <h2
            id="skills-heading"
            className="font-display text-3xl tracking-tight text-fg sm:text-4xl"
          >
            {t.sections.skills.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.sections.skills.subtitle}
          </p>
        </motion.header>

        <div className="flex flex-col gap-12">
          {SKILL_GROUPS.map((groupKey, groupIndex) => {
            const items = siteConfig.skills[groupKey];
            const label = t.sections.skills.groups[groupKey];
            const baseIndex = SKILL_GROUPS.slice(0, groupIndex).reduce(
              (sum, key) => sum + siteConfig.skills[key].length,
              0,
            );

            return (
              <div key={groupKey}>
                <h3 className="mb-4 text-sm font-medium tracking-wide text-muted-foreground">
                  {label}
                </h3>
                <ul className="grid list-none grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((skill, i) => (
                    <li key={`${groupKey}-${skill.name}`}>
                      <SkillCard
                        name={skill.name}
                        icon={skill.icon}
                        index={baseIndex + i}
                        reduced={reduced}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
