"use client";

import * as React from "react";
import { Check, Code2, Copy, ExternalLink, Mail } from "lucide-react";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { siteConfig } from "@/config";
import { useLocale } from "@/hooks/use-locale";

export function ContactSection() {
  const { t } = useLocale();
  const copy = t.sections.contact;
  const [copied, setCopied] = React.useState(false);
  const [announcement, setAnnouncement] = React.useState("");
  const resetTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const githubUrl = `https://github.com/${siteConfig.githubUsername}`;
  const mailto = `mailto:${siteConfig.email}`;

  React.useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setAnnouncement(copy.copied);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => {
        setCopied(false);
        setAnnouncement("");
      }, 2000);
    } catch {
      setCopied(false);
      setAnnouncement(copy.copyFailed);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setAnnouncement(""), 2000);
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 border-t border-border/60 px-5 py-24 sm:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {t.nav.contact}
          </p>
          <h2
            id="contact-heading"
            className="font-display text-3xl tracking-tight text-fg sm:text-4xl"
          >
            {copy.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {copy.subtitle}
          </p>
        </header>

        <div className="flex flex-col gap-8">
          <a
            href={mailto}
            className="font-display text-2xl tracking-tight text-fg underline-offset-4 transition-colors hover:text-accent hover:underline sm:text-3xl"
          >
            {siteConfig.email}
          </a>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton
              size="lg"
              className="h-11 gap-2 px-5 text-sm"
              nativeButton={false}
              render={<a href={mailto} />}
            >
              <Mail data-icon="inline-start" />
              {copy.email}
            </MagneticButton>

            <MagneticButton
              type="button"
              size="lg"
              variant="outline"
              className="h-11 gap-2 px-5 text-sm"
              onClick={() => {
                void handleCopyEmail();
              }}
            >
              {copied ? (
                <Check data-icon="inline-start" />
              ) : (
                <Copy data-icon="inline-start" />
              )}
              {copied ? copy.copied : copy.copyEmail}
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
              {copy.linkedin}
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
              {copy.github}
            </MagneticButton>
          </div>

          <span className="sr-only" aria-live="polite">
            {announcement}
          </span>
        </div>
      </div>
    </section>
  );
}
