"use client";

import * as React from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type TypingTextProps = {
  lines: readonly string[];
  className?: string;
  /** ms per character while typing */
  typeSpeed?: number;
  /** ms per character while deleting */
  deleteSpeed?: number;
  /** pause after a line is fully typed */
  holdMs?: number;
};

export function TypingText({
  lines,
  className,
  typeSpeed = 42,
  deleteSpeed = 28,
  holdMs = 2200,
}: TypingTextProps) {
  const reduced = useReducedMotion();
  const linesKey = lines.join("\0");
  const safeLines = React.useMemo(
    () => (lines.length > 0 ? [...lines] : [""]),
    // keyed by joined content so locale swaps reset cleanly
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [linesKey],
  );

  const [index, setIndex] = React.useState(0);
  const [text, setText] = React.useState("");
  const [phase, setPhase] = React.useState<"typing" | "holding" | "deleting">(
    "typing",
  );
  /** Announced only when a full phrase completes (hold) — not per keystroke. */
  const [announced, setAnnounced] = React.useState("");

  React.useEffect(() => {
    setIndex(0);
    if (reduced) {
      const first = safeLines[0] ?? "";
      setText(first);
      setPhase("holding");
      setAnnounced(first);
    } else {
      setText("");
      setPhase("typing");
      setAnnounced("");
    }
  }, [safeLines, reduced]);

  React.useEffect(() => {
    if (reduced) return;

    const current = safeLines[index % safeLines.length] ?? "";

    if (phase === "holding") {
      setAnnounced(current);
      const id = window.setTimeout(() => setPhase("deleting"), holdMs);
      return () => window.clearTimeout(id);
    }

    if (phase === "deleting") {
      if (text.length === 0) {
        setIndex((i) => (i + 1) % safeLines.length);
        setPhase("typing");
        return;
      }
      const id = window.setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
      }, deleteSpeed);
      return () => window.clearTimeout(id);
    }

    if (text.length >= current.length) {
      setPhase("holding");
      return;
    }

    const id = window.setTimeout(() => {
      setText(current.slice(0, text.length + 1));
    }, typeSpeed);
    return () => window.clearTimeout(id);
  }, [
    deleteSpeed,
    holdMs,
    index,
    phase,
    reduced,
    safeLines,
    text,
    typeSpeed,
  ]);

  const display = reduced ? (safeLines[0] ?? "") : text;

  return (
    <>
      <p
        className={cn(
          "min-h-[1.5em] font-sans text-base text-accent sm:text-lg",
          className,
        )}
      >
        <span>{display}</span>
        {!reduced ? (
          <span
            aria-hidden
            className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.12em] bg-accent align-baseline animate-pulse"
          />
        ) : null}
      </p>
      <span className="sr-only" aria-live="polite">
        {announced}
      </span>
    </>
  );
}
