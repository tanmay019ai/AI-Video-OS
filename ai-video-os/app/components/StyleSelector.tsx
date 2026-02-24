"use client";

import { motion } from "framer-motion";
import * as React from "react";

export type VideoStyle = "Cinematic" | "Anime" | "3D";

export type StyleSelectorProps = {
  value: VideoStyle;
  onChange: (value: VideoStyle) => void;
  disabled?: boolean;
};

const styles: VideoStyle[] = ["Cinematic", "Anime", "3D"];

export function StyleSelector({ value, onChange, disabled }: StyleSelectorProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-xs font-medium text-muted">Style</div>
      <div className="relative inline-flex rounded-2xl border border-border bg-surface-2 p-1 shadow-sm">
        {styles.map((s) => {
          const active = s === value;
          return (
            <button
              key={s}
              type="button"
              disabled={disabled}
              onClick={() => onChange(s)}
              className={
                "relative z-10 h-8 rounded-2xl px-3 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 " +
                (active ? "text-foreground" : "text-muted hover:text-foreground")
              }
            >
              {active ? (
                <motion.span
                  layoutId="style-pill"
                  className="absolute inset-0 -z-10 rounded-2xl bg-surface-1"
                  transition={{ type: "spring", stiffness: 520, damping: 34 }}
                />
              ) : null}
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}
