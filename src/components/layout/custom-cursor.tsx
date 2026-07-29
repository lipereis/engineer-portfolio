"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

const FINE_POINTER = "(pointer: fine) and (hover: hover)";

/** Elements that expand the ring. Opt extra nodes in with data-cursor="hover". */
const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  '[role="button"]',
  '[role="option"]',
  "input",
  "textarea",
  "select",
  "summary",
  "label[for]",
  '[data-cursor="hover"]',
].join(", ");

const RING_SIZE = 38;
const DOT_SIZE = 5;

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 520, damping: 34, mass: 0.55 });
  const ringY = useSpring(dotY, { stiffness: 520, damping: 34, mass: 0.55 });

  React.useEffect(() => {
    const media = window.matchMedia(FINE_POINTER);
    const sync = () => setEnabled(media.matches && !reduced);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [reduced]);

  // Hide the native cursor only while the custom one is mounted and tracking.
  React.useEffect(() => {
    const root = document.documentElement;
    if (!enabled) return;
    root.classList.add("cursor-none");
    return () => root.classList.remove("cursor-none");
  }, [enabled]);

  React.useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
      setVisible(true);

      const target = event.target;
      const isInteractive =
        target instanceof Element && Boolean(target.closest(INTERACTIVE_SELECTOR));
      setHovering(isInteractive);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onLeave);
    };
  }, [enabled, dotX, dotY]);

  if (!enabled) return null;

  const ringScale = pressed ? 0.78 : hovering ? 1.85 : 1;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120] overflow-hidden">
      <motion.span
        className="absolute top-0 left-0 rounded-full border border-accent/70"
        style={{
          x: ringX,
          y: ringY,
          width: RING_SIZE,
          height: RING_SIZE,
          marginLeft: -RING_SIZE / 2,
          marginTop: -RING_SIZE / 2,
        }}
        animate={{
          scale: ringScale,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering
            ? "color-mix(in srgb, var(--accent) 14%, transparent)"
            : "color-mix(in srgb, var(--accent) 0%, transparent)",
          boxShadow: hovering
            ? "0 0 34px color-mix(in srgb, var(--accent) 26%, transparent)"
            : "0 0 18px color-mix(in srgb, var(--accent) 12%, transparent)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.5 }}
      />
      <motion.span
        className="absolute top-0 left-0 rounded-full bg-accent"
        style={{
          x: dotX,
          y: dotY,
          width: DOT_SIZE,
          height: DOT_SIZE,
          marginLeft: -DOT_SIZE / 2,
          marginTop: -DOT_SIZE / 2,
        }}
        animate={{
          opacity: visible && !hovering ? 1 : 0,
          scale: pressed ? 1.6 : 1,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
    </div>
  );
}
