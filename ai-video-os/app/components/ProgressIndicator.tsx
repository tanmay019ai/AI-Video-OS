"use client";

import { motion } from "framer-motion";
import * as React from "react";
import type { GenerationState } from "./GenerateButton";

export type ProgressIndicatorProps = {
  state: GenerationState;
  progress: number;
};

function headlineFor(state: GenerationState) {
  switch (state) {
    case "script":
      return "Generating script";
    case "scenes":
      return "Creating scenes";
    case "rendering":
      return "Rendering video";
    case "completed":
      return "Completed";
    case "failed":
      return "Failed";
    default:
      return "Ready";
  }
}

function detailFor(state: GenerationState) {
  switch (state) {
    case "script":
      return "Mapping beats, pacing, and narration.";
    case "scenes":
      return "Designing shots, camera moves, and continuity.";
    case "rendering":
      return "Compositing frames, color, and motion consistency.";
    default:
      return "";
  }
}

export function ProgressIndicator({ state, progress }: ProgressIndicatorProps) {
  const clamped = Math.max(0, Math.min(100, progress));

  return (
    <div className="rounded-2xl border border-border bg-surface-1 p-4 shadow-elevated">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold tracking-tight text-foreground">
            {headlineFor(state)}
          </div>
          {detailFor(state) ? (
            <div className="mt-1 text-xs text-muted">
              {detailFor(state)}
            </div>
          ) : null}
        </div>
        <div className="text-xs tabular-nums text-muted">
          {clamped}%
        </div>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
        <motion.div
          className="h-full rounded-full bg-brand-secondary"
          initial={false}
          animate={{ width: `${clamped}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
        />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-muted">
        <div className={state === "script" || state === "scenes" || state === "rendering" || state === "completed" ? "text-foreground" : ""}>
          Script
        </div>
        <div className={state === "scenes" || state === "rendering" || state === "completed" ? "text-foreground" : ""}>
          Scenes
        </div>
        <div className={state === "rendering" || state === "completed" ? "text-foreground" : ""}>
          Render
        </div>
      </div>
    </div>
  );
}
