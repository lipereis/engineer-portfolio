"use client";

import { siteConfig } from "@/config";
import { useLocale } from "@/hooks/use-locale";
import { resumePathForLocale, withBasePath } from "@/lib/utils";

const year = new Date().getFullYear();

export function SiteFooter() {
  const { t, locale } = useLocale();
  const githubUrl = `https://github.com/${siteConfig.githubUsername}`;
  const resumeHref = withBasePath(resumePathForLocale(locale));

  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="font-display text-xl tracking-tight text-fg">
            {siteConfig.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {t.chrome.footer.builtBy}
          </p>
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.name}. {t.chrome.footer.rights}
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
        >
          <a
            href={`mailto:${siteConfig.email}`}
            className="transition-colors hover:text-fg"
          >
            {t.sections.contact.email}
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-fg"
          >
            {t.sections.contact.github}
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-fg"
          >
            {t.sections.contact.linkedin}
          </a>
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-fg"
          >
            {t.sections.contact.resume}
          </a>
          <a
            href="https://github.com/lipereis/engineer-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            {t.chrome.footer.source}
          </a>
        </nav>
      </div>
    </footer>
  );
}
