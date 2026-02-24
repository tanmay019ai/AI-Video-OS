"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import * as React from "react";

export type VideoItem = {
  id: string;
  prompt: string;
  createdAt: string;
};

export type VideoPreviewCardProps = {
  video: VideoItem;
};

export function VideoPreviewCard({ video }: VideoPreviewCardProps) {
  return (
    <motion.div
      className="group overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-sm backdrop-blur transition"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
    >
      <div className="relative h-36 w-full">
        <div className="absolute inset-0 bg-linear-to-br from-zinc-950 via-zinc-700 to-zinc-950 opacity-90 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.30),transparent_45%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.20),transparent_45%)]" />
        <div className="absolute left-3 top-3 rounded-2xl bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          Ready
        </div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100"
          initial={false}
        >
          <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-black/25 px-4 py-2 text-xs font-semibold text-white shadow-sm backdrop-blur">
            <Play className="h-4 w-4" />
            Play
          </div>
        </motion.div>

        <div className="absolute bottom-3 left-3 right-3">
          <div className="line-clamp-2 text-sm font-semibold leading-5 text-white dark:text-zinc-950">
            {video.prompt}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted">
            {new Date(video.createdAt).toLocaleString()}
          </div>
          <div className="rounded-2xl border border-border bg-surface-1 px-2 py-1 text-[11px] font-semibold text-foreground">
            Completed
          </div>
        </div>
      </div>
    </motion.div>
  );
}
