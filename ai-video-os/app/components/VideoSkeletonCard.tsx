"use client";

import * as React from "react";

export function VideoSkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-sm backdrop-blur">
      <div
        className={
          "h-36 w-full bg-linear-to-r from-zinc-200/60 via-zinc-100 to-zinc-200/60 " +
          "dark:from-zinc-800/60 dark:via-zinc-900 dark:to-zinc-800/60 bg-size-[200%_100%] animate-[shimmer_1.4s_ease-in-out_infinite]"
        }
      />
      <div className="space-y-2 p-4">
        <div className="h-4 w-2/3 rounded-full bg-black/10 dark:bg-white/10 animate-pulse" />
        <div className="h-3 w-full rounded-full bg-black/10 dark:bg-white/10 animate-pulse" />
        <div className="h-3 w-5/6 rounded-full bg-black/10 dark:bg-white/10 animate-pulse" />
        <div className="pt-2">
          <div className="h-8 w-28 rounded-2xl bg-black/10 dark:bg-white/10 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
