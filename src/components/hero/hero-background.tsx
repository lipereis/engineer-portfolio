"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function HeroBackground() {
  const reduced = useReducedMotion();
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const x = useSpring(mvX, { stiffness: 60, damping: 20, mass: 0.4 });
  const y = useSpring(mvY, { stiffness: 60, damping: 20, mass: 0.4 });

  const layerSlowX = useTransform(x, (v) => v * 0.35);
  const layerSlowY = useTransform(y, (v) => v * 0.35);
  const layerFastX = useTransform(x, (v) => v * 0.7);
  const layerFastY = useTransform(y, (v) => v * 0.7);
  const grainX = useTransform(x, (v) => v * 0.15);
  const grainY = useTransform(y, (v) => v * 0.15);

  const spotlight = useMotionTemplate`radial-gradient(620px circle at calc(50% + ${x}px) calc(40% + ${y}px), color-mix(in srgb, var(--accent) 22%, transparent), transparent 55%)`;

  React.useEffect(() => {
    if (reduced) return;

    const onMove = (event: PointerEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mvX.set((event.clientX - cx) / 28);
      mvY.set((event.clientY - cy) / 28);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mvX, mvY, reduced]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-bg" />

      <motion.div
        className="absolute -inset-[20%] opacity-90"
        animate={
          reduced
            ? undefined
            : {
                backgroundPosition: ["0% 40%", "100% 60%", "0% 40%"],
              }
        }
        transition={
          reduced
            ? undefined
            : { duration: 22, repeat: Infinity, ease: "linear" }
        }
        style={{
          x: reduced ? 0 : layerSlowX,
          y: reduced ? 0 : layerSlowY,
          backgroundImage: `
            radial-gradient(ellipse 80% 55% at 18% 20%, color-mix(in srgb, var(--accent) 28%, transparent), transparent 58%),
            radial-gradient(ellipse 70% 50% at 82% 18%, color-mix(in srgb, #5c4030 45%, transparent), transparent 55%),
            radial-gradient(ellipse 90% 70% at 50% 95%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 50%),
            linear-gradient(155deg, #0c0b0a 0%, #161311 42%, #0c0b0a 100%)
          `,
          backgroundSize: reduced ? "100% 100%" : "140% 140%",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-[28%] size-[min(70vw,520px)] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          x: reduced ? 0 : layerFastX,
          y: reduced ? 0 : layerFastY,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 18%, transparent) 0%, transparent 70%)",
        }}
      />

      {!reduced ? (
        <motion.div
          className="absolute inset-0 opacity-80 mix-blend-screen"
          style={{ background: spotlight }}
        />
      ) : null}

      <motion.div
        className="absolute -inset-[10%] opacity-[0.07] mix-blend-overlay"
        style={{
          x: reduced ? 0 : grainX,
          y: reduced ? 0 : grainY,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 40%, transparent 40%, color-mix(in srgb, var(--bg) 78%, transparent) 100%)",
        }}
      />
    </div>
  );
}
