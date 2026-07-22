"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Code2, Download, ExternalLink } from "lucide-react";

import { HeroBackground } from "@/components/hero/hero-background";
import { TypingText } from "@/components/hero/typing-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { siteConfig } from "@/config";
import { useLocale } from "@/hooks/use-locale";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const githubUrl = `https://github.com/${siteConfig.githubUsername}`;

export function Hero() {
  const { t } = useLocale();
  const reduced = useReducedMotion();

  const scrollToProjects = React.useCallback(() => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
      history.replaceState(null, "", "#projects");
    }
  }, [reduced]);

  const reveal = reduced
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
      };

  const stagger = reduced ? 0 : 0.09;

  return (
    <section
      id="hero"
      aria-label={siteConfig.name}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-28 sm:px-8 sm:py-32">
        <motion.h1
          className="font-display text-[clamp(3.25rem,12vw,6.5rem)] leading-[0.95] tracking-tight text-fg"
          {...reveal}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {siteConfig.name}
        </motion.h1>

        <motion.div
          className="flex max-w-xl flex-col gap-3"
          {...reveal}
          transition={{
            duration: 0.7,
            delay: stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="font-sans text-lg text-fg/90 sm:text-xl">
            {t.hero.role}
            <span className="text-muted-foreground"> · {t.hero.focus}</span>
          </p>

          <TypingText lines={t.hero.typingLines} />

          <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.hero.arc}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-3"
          {...reveal}
          transition={{
            duration: 0.7,
            delay: stagger * 2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <MagneticButton
            type="button"
            size="lg"
            className="h-11 gap-2 px-5 text-sm"
            onClick={scrollToProjects}
          >
            {t.hero.ctaProjects}
            <ArrowDown data-icon="inline-end" />
          </MagneticButton>

          <MagneticButton
            size="lg"
            variant="outline"
            className="h-11 gap-2 px-5 text-sm"
            nativeButton={false}
            render={
              <Link
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <Download data-icon="inline-start" />
            {t.hero.ctaResume}
          </MagneticButton>

          <MagneticButton
            size="lg"
            variant="ghost"
            className="h-11 gap-2 px-5 text-sm"
            nativeButton={false}
            render={
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" />
            }
          >
            <Code2 data-icon="inline-start" />
            {t.hero.ctaGithub}
          </MagneticButton>

          <MagneticButton
            size="lg"
            variant="ghost"
            className="h-11 gap-2 px-5 text-sm"
            nativeButton={false}
            render={
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <ExternalLink data-icon="inline-start" />
            {t.hero.ctaLinkedin}
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
