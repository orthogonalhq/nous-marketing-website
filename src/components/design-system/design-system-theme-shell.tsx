"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { cn } from "@/lib/cn";

type DesignSystemTheme = "dark" | "light" | "rust";
type DesignSystemThemeShellBackground = "design-system" | "homepage";

type DesignSystemThemeShellProps = {
  background?: DesignSystemThemeShellBackground;
  children: ReactNode;
};

const themes: Array<{ label: string; value: DesignSystemTheme }> = [
  { label: "Dark", value: "dark" },
  { label: "Light", value: "light" },
  { label: "Rust", value: "rust" }
];

export function DesignSystemThemeShell({ background = "design-system", children }: DesignSystemThemeShellProps) {
  const [theme, setTheme] = useState<DesignSystemTheme>("dark");
  const usesHomepageBackground = background === "homepage";

  return (
    <main
      className={cn(
        "nous-design-system relative min-h-screen py-4",
        usesHomepageBackground
          ? "nous-marketing-shell overflow-hidden text-[var(--nous-page-fg)]"
          : "bg-[image:var(--nous-design-system-page-bg)] text-[var(--nous-fg-primary)] [background-size:var(--nous-design-system-page-bg-size)]"
      )}
      data-nous-theme={theme}
      data-testid="design-system-shell"
    >
      {usesHomepageBackground ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[var(--nous-page-bg)]" data-bg-layer="page-background-root">
          <div className="absolute inset-0 bg-[image:var(--nous-texture-noise-page)] bg-[length:640px_640px] [mix-blend-mode:var(--nous-page-grain-blend-mode)] [opacity:var(--nous-page-grain-opacity)]" data-bg-layer="page-grain-texture" />
          <div className="absolute inset-0 bg-[image:var(--nous-page-vignette-bg)]" data-bg-layer="page-edge-vignette" />
        </div>
      ) : null}
      <div className={cn("reading-container", usesHomepageBackground && "relative z-10")}>
        <div className="sticky top-3 z-[100] mb-6 flex justify-end">
          <div className="flex items-center gap-2 rounded-[var(--nous-radius-pill)] border border-[color:var(--nous-stroke-default)] bg-[var(--nous-bg-panel)]/90 p-1 pl-3 shadow-[var(--nous-shadow-card)] backdrop-blur-xl">
            <label className="text-xs font-medium text-[var(--nous-fg-secondary)]" htmlFor="design-system-theme">
              Theme
            </label>
            <select
              aria-label="Theme"
              className="cursor-pointer rounded-[var(--nous-radius-pill)] border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-bg-control-active)] px-3 py-2 text-xs font-medium text-[var(--nous-fg-title)] outline-none transition hover:border-[color:var(--nous-stroke-emphasis)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nous-accent-info)]"
              id="design-system-theme"
              onChange={(event) => setTheme(event.target.value as DesignSystemTheme)}
              value={theme}
            >
              {themes.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-40">{children}</div>
      </div>
    </main>
  );
}
