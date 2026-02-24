"use client";

import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import * as React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { AnimatedButton } from "./AnimatedButton";
import { CreditUsageWidget } from "./CreditUsageWidget";
import { GenerateButton, type GenerationState } from "./GenerateButton";
import { LoadingOverlay } from "./LoadingOverlay";
import { ProgressIndicator } from "./ProgressIndicator";
import { PromptBox } from "./PromptBox";
import { StatusMessage } from "./StatusMessage";
import { StyleSelector, type VideoStyle } from "./StyleSelector";
import { VideoPreviewCard, type VideoItem } from "./VideoPreviewCard";
import { VideoSkeletonCard } from "./VideoSkeletonCard";

const TOTAL_CREDITS = 12;

function newId() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export type DashboardViewProps = {
  locked?: boolean;
};

export function DashboardView({ locked = false }: DashboardViewProps) {
  const [prompt, setPrompt] = React.useState("");
  const [state, setState] = React.useState<GenerationState>("idle");
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);
  const [creditsUsed, setCreditsUsed] = React.useState(3);
  const [videos, setVideos] = React.useState<VideoItem[]>([]);
  const [style, setStyle] = React.useState<VideoStyle>("Cinematic");

  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const completionTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const creditsRemaining = Math.max(0, TOTAL_CREDITS - creditsUsed);
  const busy = state === "script" || state === "scenes" || state === "rendering";
  const trimmedPrompt = prompt.trim();

  const ctaDisabled = locked || busy || trimmedPrompt.length === 0 || creditsRemaining === 0;

  function clearTimers() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current);
      completionTimeoutRef.current = null;
    }
  }

  React.useEffect(() => {
    return () => clearTimers();
  }, []);

  function failGeneration(message: string) {
    clearTimers();
    setState("failed");
    setProgress(0);
    setError(message);
    setCreditsUsed((u) => Math.max(0, u - 1));
  }

  function completeGeneration(promptText: string) {
    clearTimers();
    setProgress(100);
    setState("completed");
    setError(null);
    setVideos((prev) =>
      [
        {
          id: newId(),
          prompt: promptText,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ].slice(0, 6),
    );

    completionTimeoutRef.current = setTimeout(() => {
      setProgress(0);
    }, 800);
  }

  function startGeneration() {
    if (locked) return;

    const promptText = trimmedPrompt;
    if (!promptText) {
      setError("Add a prompt to generate a video.");
      setState("failed");
      return;
    }
    if (creditsRemaining === 0) {
      setError("You’re out of credits. Upgrade to continue generating.");
      setState("failed");
      return;
    }

    clearTimers();
    setError(null);
    setState("script");
    setProgress(4);

    setCreditsUsed((u) => u + 1);

    void (async () => {
      try {
        const res = await axios.post("/api/generate", {
          prompt: promptText,
          style,
        });
        if (!res.data?.ok) {
          failGeneration("Generation failed. Please retry.");
          return;
        }

        let p = 4;
        let phase: GenerationState = "script";

        intervalRef.current = setInterval(() => {
          const bump =
            phase === "script"
              ? 2.2 + Math.random() * 2.2
              : phase === "scenes"
                ? 1.8 + Math.random() * 2.0
                : 1.2 + Math.random() * 1.6;
          p = p + bump;

          if (phase === "script" && p >= 36) {
            phase = "scenes";
            setState("scenes");
          }

          if (phase === "scenes" && p >= 70) {
            phase = "rendering";
            setState("rendering");
          }

          const ceiling = phase === "rendering" ? 96 : phase === "scenes" ? 74 : 40;
          p = Math.min(p, ceiling);
          setProgress(Math.floor(p));

          if (phase === "rendering" && p >= 96) {
            clearTimers();
            completionTimeoutRef.current = setTimeout(() => {
              completeGeneration(promptText);
              setTimeout(() => setState("idle"), 900);
            }, 720);
          }
        }, 140);
      } catch {
        failGeneration("Service unavailable. Please retry in a moment.");
      }
    })();
  }

  return (
    <main className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <section className="lg:col-span-5">
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-border bg-surface-2 p-6 shadow-elevated backdrop-blur"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.18),transparent_60%)]" />

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-muted">
              <Sparkles className="h-4 w-4 text-brand-secondary" />
              Premium workspace
            </div>
            <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight text-foreground">
              Generate cinematic AI video—
              <span className="text-muted"> from a single prompt.</span>
            </h1>
            <p className="text-[15px] leading-6 text-muted">
              Fast feedback loops, smooth transitions, and startup-grade polish.
            </p>
          </div>

          <div className="mt-6">
            <PromptBox
              value={prompt}
              onChange={(v) => {
                setPrompt(v);
                if (state === "failed") setState("idle");
                if (error) setError(null);
              }}
              disabled={busy || locked}
              errorMessage={state === "failed" ? error : null}
            />

            <div className="mt-4">
              <StyleSelector value={style} onChange={setStyle} disabled={busy || locked} />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <GenerateButton onClick={startGeneration} disabled={ctaDisabled} state={state} />

            <div className="flex items-center gap-3">
              <div className="text-xs text-muted">
                {creditsRemaining > 0 ? (
                  <span>{creditsRemaining} credits remaining</span>
                ) : (
                  <span className="text-red-500">No credits left</span>
                )}
              </div>
              <div className="hidden sm:block">
                <CreditUsageWidget used={creditsUsed} total={TOTAL_CREDITS} />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <StatusMessage state={locked ? "idle" : state} />
          </div>

          <AnimatePresence>
            {state === "failed" && error ? (
              <motion.div
                className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-red-500/25 bg-red-500/5 p-4"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.18 }}
              >
                <div className="text-sm text-red-700 dark:text-red-300">{error}</div>
                <AnimatedButton
                  type="button"
                  onClick={startGeneration}
                  disabled={busy || creditsRemaining === 0 || trimmedPrompt.length === 0 || locked}
                  variant="danger"
                  className="h-9"
                >
                  Retry
                </AnimatedButton>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {locked ? (
            <div className="pointer-events-auto absolute inset-0 flex items-center justify-center rounded-2xl bg-black/10 p-6 backdrop-blur-md dark:bg-white/5">
              <div className="w-full max-w-sm rounded-2xl border border-border bg-surface-1 p-5 shadow-elevated">
                <div className="text-sm font-semibold text-foreground">Sign in required</div>
                <div className="mt-1 text-xs text-muted">
                  Login to generate videos, track usage, and manage your plan.
                </div>
                <div className="mt-4 flex gap-2">
                  <Link href="/login" className="inline-flex flex-1">
                    <AnimatedButton variant="primary" className="h-10 w-full">
                      Login
                    </AnimatedButton>
                  </Link>
                  <Link href="/pricing" className="inline-flex">
                    <AnimatedButton className="h-10">Pricing</AnimatedButton>
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </motion.div>
      </section>

      <section className="lg:col-span-7">
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-border bg-surface-2 p-6 shadow-elevated backdrop-blur"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut", delay: 0.06 }}
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-sm font-semibold tracking-tight text-foreground">Video queue</div>
              <div className="mt-1 text-xs text-muted">
                Shimmer while generating, then a playable preview.
              </div>
            </div>

            <div className="hidden sm:block text-xs text-muted">
              States: Idle → Script → Scenes → Rendering → Completed / Failed
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {busy ? (
              <>
                <VideoSkeletonCard />
                <VideoSkeletonCard />
                <VideoSkeletonCard />
                <VideoSkeletonCard />
              </>
            ) : videos.length > 0 ? (
              videos.map((v) => <VideoPreviewCard key={v.id} video={v} />)
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-border bg-surface-2 p-8 text-center text-sm text-muted">
                Your generated videos will appear here.
              </div>
            )}
          </div>

          <LoadingOverlay visible={busy}>
            <ProgressIndicator state={state} progress={progress} />
          </LoadingOverlay>
        </motion.div>
      </section>
    </main>
  );
}
