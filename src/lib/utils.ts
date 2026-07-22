import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { siteConfig } from "@/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Prefix absolute site paths with `basePath` for plain `<a>` / static assets. */
export function withBasePath(path: string): string {
  if (/^(https?:|mailto:|tel:|#)/i.test(path)) return path
  const base = siteConfig.basePath.replace(/\/$/, "")
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${base}${normalized}`
}
