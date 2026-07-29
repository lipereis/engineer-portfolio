"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  CircleDollarSign,
  ExternalLink,
  Puzzle,
  ScanSearch,
} from "lucide-react";

import { ExtensionPreview } from "@/components/extensions/extension-preview";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { siteConfig } from "@/config";
import { useLocale } from "@/hooks/use-locale";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const CAPABILITY_ICONS = [
  ScanSearch,
  BarChart3,
  CircleDollarSign,
  CircleDollarSign,
] as const;

export function ExtensionsSection() {
  const { locale, t } = useLocale();
  const reduced = useReducedMotion();
  const copy = t.sections.extensions;
  const extension = siteConfig.extensions[0];

  return (
    <section
      id="extensions"
      aria-labelledby="extensions-heading"
      className="scroll-mt-20 border-t border-border/60 px-5 py-24 sm:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {t.nav.extensions}
          </p>
          <h2
            id="extensions-heading"
            className="font-display text-3xl tracking-tight text-fg sm:text-4xl"
          >
            {copy.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {copy.subtitle}
          </p>
        </header>

        <motion.article
          className="overflow-hidden rounded-2xl border border-border/70 bg-fg/[0.03] p-5 sm:p-8 lg:p-10"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  <Puzzle className="size-3.5" aria-hidden />
                  {extension.type[locale]}
                </span>
                {extension.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <h3 className="font-display text-4xl tracking-tight text-fg sm:text-5xl">
                {extension.name}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                {extension.description[locale]}
              </p>

              <h4 className="mt-7 text-xs font-medium uppercase tracking-[0.18em] text-accent">
                {copy.capabilities}
              </h4>
              <ul className="mt-3 grid list-none gap-2 sm:grid-cols-2">
                {extension.capabilities[locale].map((capability, index) => {
                  const Icon = CAPABILITY_ICONS[index];
                  return (
                    <li
                      key={capability}
                      className="flex items-start gap-2.5 text-sm text-fg/80"
                    >
                      <Icon
                        className="mt-0.5 size-4 shrink-0 text-accent"
                        aria-hidden
                      />
                      {capability}
                    </li>
                  );
                })}
              </ul>

              <MagneticButton
                size="lg"
                className="mt-8 h-11 gap-2 px-5 text-sm"
                nativeButton={false}
                render={
                  <a
                    href={extension.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                {copy.viewGithub}
                <ExternalLink data-icon="inline-end" />
              </MagneticButton>
            </div>

            <ExtensionPreview
              label={copy.previewLabel}
              labels={copy.preview}
              alt={extension.previewAlt[locale]}
            />
          </div>
        </motion.article>
      </div>
    </section>
  );
}
