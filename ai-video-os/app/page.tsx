import Link from "next/link";
import { AnimatedButton } from "./components/AnimatedButton";
import { DashboardView } from "./components/DashboardView";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-border bg-surface-2 p-6 shadow-elevated backdrop-blur">
            <div className="text-xs font-semibold text-muted">AI Video OS</div>
            <h1 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-tight text-foreground">
              Premium AI video SaaS frontend.
            </h1>
            <p className="mt-3 text-[15px] leading-6 text-muted">
              Login/logout, dark/light theme, polished generation feedback, credits/usage patterns, and a cinematic dashboard—ready to connect to your backend.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="inline-flex">
                <AnimatedButton variant="primary" className="h-11">
                  Login to start
                </AnimatedButton>
              </Link>
              <Link href="/product" className="inline-flex">
                <AnimatedButton className="h-11">Product</AnimatedButton>
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface-1 p-4">
                <div className="font-semibold text-foreground">What we provide</div>
                <div className="mt-1 text-xs text-muted">
                  A complete SaaS shell + dashboard experience.
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-surface-1 p-4">
                <div className="font-semibold text-foreground">Perceived speed</div>
                <div className="mt-1 text-xs text-muted">
                  Shimmer skeletons, overlays, progress steps.
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-surface-1 p-4">
                <div className="font-semibold text-foreground">Motion polish</div>
                <div className="mt-1 text-xs text-muted">
                  Micro-interactions and smooth transitions.
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-surface-1 p-4">
                <div className="font-semibold text-foreground">Plan patterns</div>
                <div className="mt-1 text-xs text-muted">
                  Credits, limits, upgrade prompts.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <DashboardView locked />
        </div>
      </section>
    </div>
  );
}
