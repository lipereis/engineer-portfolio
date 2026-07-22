import { en, type Dictionary } from "./dictionaries/en";
import { pt } from "./dictionaries/pt";

export type Locale = "en" | "pt";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = {
  en,
  pt,
};

/**
 * Returns the full message dictionary for the given locale.
 * Personal facts (about, experience, education, skills) live in `siteConfig`.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

export const defaultLocale: Locale = "en";

export const locales: readonly Locale[] = ["en", "pt"] as const;

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "pt";
}
