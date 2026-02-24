"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import * as React from "react";

export type AnimatedButtonProps = HTMLMotionProps<"button"> & {
  variant?: "primary" | "secondary" | "danger";
};

export function AnimatedButton({
  className,
  variant = "secondary",
  disabled,
  ...props
}: AnimatedButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold tracking-tight transition " +
    "shadow-sm focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60";

  const styles =
    variant === "primary"
      ? "bg-brand-primary text-background hover:opacity-95 focus:ring-brand-secondary/15 dark:bg-zinc-50 dark:text-zinc-950"
      : variant === "danger"
        ? "border border-red-500/30 bg-surface-1 text-red-600 hover:bg-red-500/5 focus:ring-red-500/12 dark:text-red-300"
        : "border border-border bg-surface-2 text-foreground hover:bg-surface-1 focus:ring-brand-secondary/10";

  return (
    <motion.button
      disabled={disabled}
      className={[base, styles, className].filter(Boolean).join(" ")}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.99 }}
      transition={{ type: "spring", stiffness: 520, damping: 30 }}
      {...props}
    />
  );
}
