"use client";

import { MoonStar, Sun } from "lucide-react";
import { motion } from "framer-motion";
import * as React from "react";

const STORAGE_KEY = "ai-video-os-theme";

type ThemeMode = "dark" | "light";

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  if (mode === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function ThemeToggle() {
  const [mode, setMode] = React.useState<ThemeMode>("dark");

  React.useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) ?? null;
    if (saved === "light" || saved === "dark") {
      setMode(saved);
      applyTheme(saved);
      return;
    }

    // Default to the premium dark cinematic theme.
    setMode("dark");
    applyTheme("dark");
  }, []);

  function toggle() {
    const next: ThemeMode = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  const Icon = mode === "dark" ? MoonStar : Sun;
  const label = mode === "dark" ? "Dark" : "Light";

  return (
    <motion.button
      type="button"
      onClick={toggle}
      className="inline-flex h-10 items-center gap-2 rounded-2xl border border-border bg-surface-2 px-3 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition hover:bg-surface-1 focus:outline-none focus:ring-4 focus:ring-brand-secondary/10"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 520, damping: 30 }}
      aria-label="Toggle theme"
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </motion.button>
  );
}
