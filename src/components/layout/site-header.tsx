"use client";

import * as React from "react";
import Link from "next/link";
import { Languages, Menu, Moon, Sun, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config";
import { useLocale } from "@/hooks/use-locale";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const SECTION_IDS = [
  "about",
  "skills",
  "projects",
  "ask",
  "stats",
  "experience",
  "education",
  "contact",
] as const;

type SectionId = (typeof SECTION_IDS)[number];

/** Primary links shown in the desktop bar; full set in the mobile drawer. */
const DESKTOP_IDS = [
  "about",
  "projects",
  "experience",
  "education",
  "contact",
] as const satisfies readonly SectionId[];

export function SiteHeader() {
  const { theme, toggle } = useTheme();
  const { locale, setLocale, t } = useLocale();
  const reduced = useReducedMotion();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const jumpTo = React.useCallback(
    (id: SectionId) => {
      setOpen(false);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
        history.replaceState(null, "", `#${id}`);
      }
    },
    [reduced],
  );

  return (
    <>
      <a
        href="#content"
        className="bg-fg text-bg focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:px-3 focus:py-2 focus:outline-none sr-only focus:not-sr-only"
      >
        {t.chrome.skipToContent}
      </a>

      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "border-border bg-bg/80 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-4 px-5 sm:px-8">
          <Link
            href="/"
            className="font-display shrink-0 text-lg tracking-tight text-fg transition-colors hover:text-accent"
          >
            {siteConfig.name}
          </Link>

          <nav
            aria-label="Primary"
            className="ml-auto hidden items-center gap-1 lg:flex"
          >
            {DESKTOP_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => jumpTo(id)}
                className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-fg"
              >
                {t.nav[id]}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-2">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={toggle}
              aria-label={t.chrome.themeToggle}
              className="text-muted-foreground hover:text-fg"
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setLocale(locale === "en" ? "pt" : "en")}
              aria-label={t.chrome.languageToggle}
              className="text-muted-foreground hover:text-fg"
            >
              <Languages />
            </Button>

            <Link
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md px-2.5 py-1.5 text-sm text-accent transition-opacity hover:opacity-80 sm:inline"
            >
              {t.sections.contact.resume}
            </Link>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-fg lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-sm lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.openMenu}
        >
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-end px-5 sm:px-8">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={t.nav.closeMenu}
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>
          </div>
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 pb-10 sm:px-8">
            {SECTION_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => jumpTo(id)}
                className="rounded-md px-2 py-3 text-left text-lg text-fg transition-colors hover:text-accent"
              >
                {t.nav[id]}
              </button>
            ))}
            <Link
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 rounded-md px-2 py-3 text-lg text-accent"
              onClick={() => setOpen(false)}
            >
              {t.sections.contact.resume}
            </Link>
          </nav>
        </div>
      ) : null}
    </>
  );
}
