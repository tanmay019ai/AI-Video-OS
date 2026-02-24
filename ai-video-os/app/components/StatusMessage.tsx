"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Film, Sparkles } from "lucide-react";
import * as React from "react";
import type { GenerationState } from "./GenerateButton";

export type StatusMessageProps = {
  state: GenerationState;
};

function contentFor(state: GenerationState) {
  switch (state) {
    case "script":
      return {
        title: "Generating script",
        detail: "Structuring beats, narration, and pacing.",
        Icon: Sparkles,
      };
    case "scenes":
      return {
        title: "Creating scenes",
        detail: "Designing shots, camera moves, and continuity.",
        Icon: Film,
      };
    case "rendering":
      return {
        title: "Rendering video",
        detail: "Compositing frames with consistent motion and color.",
        Icon: Film,
      };
    case "completed":
      return {
        title: "Ready",
        detail: "Your preview is available in the queue.",
        Icon: CheckCircle2,
      };
    case "failed":
      return {
        title: "Generation failed",
        detail: "Try simplifying the prompt or reducing length.",
        Icon: AlertTriangle,
      };
    default:
      return {
        title: "Idle",
        detail: "Enter a prompt to start generating.",
        Icon: Sparkles,
      };
  }
}

export function StatusMessage({ state }: StatusMessageProps) {
  const { title, detail, Icon } = contentFor(state);
  const tone =
    state === "failed"
      ? "text-red-600 dark:text-red-300"
      : state === "completed"
        ? "text-foreground"
        : "text-foreground";

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={state}
        className="flex items-start gap-3"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl border border-border bg-surface-2 shadow-sm">
          <Icon className={"h-4 w-4 " + tone} />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-tight text-foreground">
            {title}
          </div>
          <div className="mt-0.5 text-xs text-muted">{detail}</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
