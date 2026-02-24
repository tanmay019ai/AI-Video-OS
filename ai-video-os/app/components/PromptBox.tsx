"use client";

import { motion } from "framer-motion";
import * as React from "react";

export type PromptBoxProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  errorMessage?: string | null;
  maxLength?: number;
};

export function PromptBox({
  value,
  onChange,
  disabled = false,
  errorMessage,
  maxLength = 800,
}: PromptBoxProps) {
  const remaining = Math.max(0, maxLength - value.length);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="prompt"
          className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          Prompt
        </label>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          {remaining} left
        </div>
      </div>

      <motion.textarea
        id="prompt"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        maxLength={maxLength}
        placeholder="A cinematic shot of a neon-lit city, rain on glass, shallow depth of field…"
        className={
          "min-h-32 w-full resize-none rounded-2xl border border-border bg-surface-1 px-4 py-3 text-[15px] leading-6 text-foreground shadow-sm outline-none transition " +
          "placeholder:text-muted focus:ring-4 focus:ring-brand-secondary/10 disabled:cursor-not-allowed disabled:opacity-60 " +
          (errorMessage
            ? "border-red-500/40 focus:border-red-500 focus:ring-red-500/10"
            : "focus:border-white/20")
        }
        initial={false}
        whileFocus={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />

      {errorMessage ? (
        <div className="text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </div>
      ) : (
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          Tip: add style cues (&quot;film grain&quot;, &quot;anamorphic&quot;, &quot;slow dolly&quot;) for better results.
        </div>
      )}
    </div>
  );
}
