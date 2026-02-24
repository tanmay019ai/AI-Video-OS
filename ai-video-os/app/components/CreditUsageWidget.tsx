"use client";

import { motion } from "framer-motion";
import * as React from "react";

export type CreditUsageWidgetProps = {
  used: number;
  total: number;
};

export function CreditUsageWidget({ used, total }: CreditUsageWidgetProps) {
  const safeTotal = Math.max(1, total);
  const clampedUsed = Math.max(0, Math.min(safeTotal, used));
  const pct = Math.round((clampedUsed / safeTotal) * 100);
  const low = safeTotal - clampedUsed <= 2;

  return (
    <div className="w-60 rounded-2xl border border-border bg-surface-2 p-3 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-medium text-muted">Credits</div>
          <div className="mt-0.5 text-[11px] text-muted">Starter plan</div>
        </div>
        <div className="rounded-2xl border border-border bg-surface-1 px-2 py-1 text-[11px] font-semibold tabular-nums text-foreground">
          {safeTotal - clampedUsed} left
        </div>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
        <motion.div
          className="h-full rounded-full bg-brand-secondary"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 240, damping: 30 }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="text-[11px] text-muted">
          Used {clampedUsed}/{safeTotal}
        </div>
        {low ? (
          <div className="text-[11px] font-semibold text-brand-secondary">
            Upgrade
          </div>
        ) : null}
      </div>
    </div>
  );
}
