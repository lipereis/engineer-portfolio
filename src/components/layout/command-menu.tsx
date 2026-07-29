"use client";

import * as React from "react";
import {
  Code2,
  Download,
  ExternalLink,
  Languages,
  Mail,
  Moon,
  Sun,
} from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { siteConfig } from "@/config";
import { useLocale } from "@/hooks/use-locale";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useTheme } from "@/hooks/use-theme";
import { SECTION_IDS, type SectionId } from "@/lib/sections";
import { resumePathForLocale, withBasePath } from "@/lib/utils";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const { theme, toggle } = useTheme();
  const { locale, setLocale, t } = useLocale();
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const run = React.useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  const jumpTo = React.useCallback(
    (id: SectionId) => {
      run(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({
            behavior: reduced ? "auto" : "smooth",
            block: "start",
          });
          history.replaceState(null, "", `#${id}`);
        }
      });
    },
    [reduced, run],
  );

  const githubUrl = `https://github.com/${siteConfig.githubUsername}`;

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title={t.command.title}
      description={t.command.placeholder}
    >
      <Command>
        <CommandInput placeholder={t.command.placeholder} />
        <CommandList>
          <CommandEmpty>{t.command.empty}</CommandEmpty>

          <CommandGroup heading={t.command.groups.navigation}>
            {SECTION_IDS.map((id) => (
              <CommandItem
                key={id}
                value={`${id} ${t.nav[id]}`}
                onSelect={() => jumpTo(id)}
              >
                {t.nav[id]}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading={t.command.groups.actions}>
            <CommandItem
              value={t.command.actions.copyEmail}
              onSelect={() =>
                run(() => {
                  void navigator.clipboard.writeText(siteConfig.email);
                })
              }
            >
              <Mail />
              {t.command.actions.copyEmail}
            </CommandItem>
            <CommandItem
              value={t.command.actions.openGithub}
              onSelect={() =>
                run(() => {
                  window.open(githubUrl, "_blank", "noopener,noreferrer");
                })
              }
            >
              <Code2 />
              {t.command.actions.openGithub}
            </CommandItem>
            <CommandItem
              value={t.command.actions.openLinkedin}
              onSelect={() =>
                run(() => {
                  window.open(siteConfig.linkedin, "_blank", "noopener,noreferrer");
                })
              }
            >
              <ExternalLink />
              {t.command.actions.openLinkedin}
            </CommandItem>
            <CommandItem
              value={t.command.actions.downloadResume}
              onSelect={() =>
                run(() => {
                  window.open(
                    withBasePath(resumePathForLocale(locale)),
                    "_blank",
                    "noopener,noreferrer",
                  );
                })
              }
            >
              <Download />
              {t.command.actions.downloadResume}
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading={t.command.groups.preferences}>
            <CommandItem
              value={`${t.command.actions.toggleTheme} ${theme}`}
              onSelect={() => run(toggle)}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
              {theme === "dark"
                ? t.command.actions.themeLight
                : t.command.actions.themeDark}
            </CommandItem>
            <CommandItem
              value={`${t.command.actions.languageEn} ${t.command.actions.languagePt}`}
              onSelect={() =>
                run(() => setLocale(locale === "en" ? "pt" : "en"))
              }
            >
              <Languages />
              {locale === "en"
                ? t.command.actions.languagePt
                : t.command.actions.languageEn}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
