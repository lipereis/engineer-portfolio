"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const SHOW_AFTER = 480;

export function BackToTop() {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="back-to-top"
          className="fixed right-5 bottom-5 z-40 sm:right-8 sm:bottom-8"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={scrollTop}
            aria-label={t.chrome.backToTop}
            className="border-border bg-bg/80 text-fg shadow-none backdrop-blur-sm hover:border-accent/40 hover:bg-bg"
          >
            <ArrowUp />
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
