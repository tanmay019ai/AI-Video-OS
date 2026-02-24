"use client";

import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

export type LoadingOverlayProps = {
  visible: boolean;
  children: React.ReactNode;
};

export function LoadingOverlay({ visible, children }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="absolute inset-0 z-10 flex items-end justify-center rounded-2xl bg-black/10 p-4 backdrop-blur-md dark:bg-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            className="w-full max-w-md"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
