"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export type MagneticButtonProps = React.ComponentProps<typeof Button> & {
  /** Pointer pull factor; ignored when reduced motion is on. */
  strength?: number;
};

export function MagneticButton({
  className,
  strength = 0.35,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLElement | null>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const x = useSpring(mvX, { stiffness: 200, damping: 18, mass: 0.2 });
  const y = useSpring(mvY, { stiffness: 200, damping: 18, mass: 0.2 });

  const dampen = reduced ? 0 : strength;

  const handleMove: NonNullable<MagneticButtonProps["onMouseMove"]> = (
    event,
  ) => {
    onMouseMove?.(event);
    if (dampen === 0 || !ref.current) {
      mvX.set(0);
      mvY.set(0);
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    mvX.set(dx * dampen);
    mvY.set(dy * dampen);
  };

  const handleLeave: NonNullable<MagneticButtonProps["onMouseLeave"]> = (
    event,
  ) => {
    onMouseLeave?.(event);
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <motion.span style={{ x, y }} className="inline-flex">
      <Button
        ref={(node) => {
          ref.current = node;
        }}
        className={cn(className)}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        {...props}
      />
    </motion.span>
  );
}
