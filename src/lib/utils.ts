import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { siteConfig } from "@/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Repo names are shown as-is unless config declares a nicer label. */
export function displayRepoName(name: string): string {
  const overrides = siteConfig.repoDisplayNames as Record<string, string>
  return overrides[name.toLowerCase()] ?? name
}

/** Prefix absolute site paths with `basePath` for plain `<a>` / static assets. */
export function withBasePath(path: string): string {
  if (/^(https?:|mailto:|tel:|#)/i.test(path)) return path
  const base = siteConfig.basePath.replace(/\/$/, "")
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${base}${normalized}`
}
