"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { siteConfig } from "@/config";
import { useLocale } from "@/hooks/use-locale";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const STORAGE_KEY = "portfolio-loaded";
const MIN_MS = 600;

function hasSeenThisSession(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function LoadingScreen() {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  // Show-until-done: cover first paint (avoids FOUC). Effect hides when
  // reduced-motion, already seen this session, or min duration + load done.
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    // Critical: skip immediately when reduced (also handles false→true race)
    if (reduced) {
      setVisible(false);
      return;
    }

    if (hasSeenThisSession()) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const started = performance.now();
    let cancelled = false;
    let hideTimer = 0;

    const finish = () => {
      if (cancelled) return;
      const elapsed = performance.now() - started;
      const wait = Math.max(0, MIN_MS - elapsed);
      hideTimer = window.setTimeout(() => {
        if (cancelled) return;
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          // ignore
        }
        setVisible(false);
      }, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(hideTimer);
      window.removeEventListener("load", finish);
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          aria-label={t.chrome.loading}
        >
          <p className="font-display text-3xl tracking-tight text-fg sm:text-4xl">
            {siteConfig.name}
          </p>
          <p className="mt-3 text-xs tracking-[0.2em] text-muted-foreground uppercase">
            {t.chrome.loading}
          </p>
          <motion.div
            className="mt-8 h-px w-16 origin-left bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: MIN_MS / 1000, ease: "easeInOut" }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
