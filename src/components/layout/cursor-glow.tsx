"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

const FINE_POINTER = "(pointer: fine)";

export function CursorGlow() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = React.useState(false);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const x = useSpring(mvX, { stiffness: 180, damping: 28, mass: 0.4 });
  const y = useSpring(mvY, { stiffness: 180, damping: 28, mass: 0.4 });

  React.useEffect(() => {
    const media = window.matchMedia(FINE_POINTER);
    const sync = () => setEnabled(media.matches && !reduced);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [reduced]);

  React.useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      mvX.set(event.clientX);
      mvY.set(event.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, mvX, mvY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-10 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        x,
        y,
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--accent) 28%, transparent) 0%, transparent 70%)",
      }}
    />
  );
}
