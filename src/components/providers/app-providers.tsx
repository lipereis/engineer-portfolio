"use client";

import type { ReactNode } from "react";
import { CommandMenu } from "@/components/layout/command-menu";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LocaleProvider } from "@/hooks/use-locale";
import { ThemeProvider } from "@/hooks/use-theme";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <TooltipProvider>
          {children}
          <CommandMenu />
        </TooltipProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
