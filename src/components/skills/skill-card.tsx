"use client";

import { motion } from "framer-motion";
import {
  Atom,
  Binary,
  Bot,
  Braces,
  Clapperboard,
  Cloud,
  Code2,
  Database,
  FileCode2,
  FileType,
  GitBranch,
  HardDrive,
  Layers,
  LayoutTemplate,
  Network,
  Palette,
  PenTool,
  Route,
  Server,
  Sparkles,
  Table2,
  Terminal,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Atom,
  Layers,
  FileType,
  Palette,
  Code2,
  Sparkles,
  Server,
  Network,
  Route,
  FileCode2,
  Braces,
  Binary,
  Table2,
  Database,
  HardDrive,
  GitBranch,
  Terminal,
  Cloud,
  Bot,
  PenTool,
  Clapperboard,
  LayoutTemplate,
};

export function getSkillIcon(name: string): LucideIcon {
  return iconMap[name] ?? Code2;
}

type SkillCardProps = {
  name: string;
  icon: string;
  index: number;
  reduced: boolean;
};

export function SkillCard({ name, icon, index, reduced }: SkillCardProps) {
  const Icon = getSkillIcon(icon);

  return (
    <motion.div
      className={cn(
        "group flex items-center gap-3 rounded-lg border border-border/70 bg-fg/[0.03] px-3.5 py-3",
        "transition-[border-color,background-color,transform] duration-300",
        "hover:border-accent/40 hover:bg-accent/[0.06]",
      )}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={
        reduced
          ? { duration: 0 }
          : {
              duration: 0.45,
              delay: Math.min(index * 0.04, 0.4),
              ease: [0.22, 1, 0.36, 1],
            }
      }
      whileHover={reduced ? undefined : { y: -2 }}
    >
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-md bg-fg/[0.05] text-accent transition-colors group-hover:bg-accent/15"
        aria-hidden
      >
        <Icon className="size-4" strokeWidth={1.75} />
      </span>
      <span className="text-sm font-medium tracking-tight text-fg">{name}</span>
    </motion.div>
  );
}
