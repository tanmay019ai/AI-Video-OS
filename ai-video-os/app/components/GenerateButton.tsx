"use client";

import * as React from "react";
import { AnimatedButton } from "./AnimatedButton";

export type GenerationState =
  | "idle"
  | "script"
  | "scenes"
  | "rendering"
  | "completed"
  | "failed";

export type GenerateButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  state: GenerationState;
};

function labelForState(state: GenerationState) {
  switch (state) {
    case "script":
      return "Generating Script…";
    case "scenes":
      return "Creating Scenes…";
    case "rendering":
      return "Rendering…";
    default:
      return "Generate Video";
  }
}

export function GenerateButton({ onClick, disabled = false, state }: GenerateButtonProps) {
  const busy = state === "script" || state === "scenes" || state === "rendering";

  return (
    <AnimatedButton
      type="button"
      onClick={onClick}
      disabled={disabled}
      variant="primary"
      className="h-12 px-5"
      aria-busy={busy}
    >
      {busy ? (
        <span className="relative inline-flex h-4 w-4">
          <span className="absolute inset-0 rounded-full border-2 border-white/30 dark:border-zinc-950/20" />
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-white dark:border-t-zinc-950" />
        </span>
      ) : (
        <span className="h-2 w-2 rounded-full bg-white/90 shadow-[0_0_0_6px_rgba(255,255,255,0.12)] transition group-hover:shadow-[0_0_0_10px_rgba(255,255,255,0.14)] dark:bg-zinc-950/90 dark:shadow-[0_0_0_6px_rgba(9,9,11,0.12)] dark:group-hover:shadow-[0_0_0_10px_rgba(9,9,11,0.14)]" />
      )}
      <span>{labelForState(state)}</span>
    </AnimatedButton>
  );
}
