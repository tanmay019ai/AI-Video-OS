"use client";

import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { AnimatedButton } from "../components/AnimatedButton";
import { useAuth } from "../components/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/dashboard";
  const { user, login, loading } = useAuth();

  const [email, setEmail] = React.useState("demo@cineos.ai");
  const [password, setPassword] = React.useState("demo");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!loading && user) router.replace(next);
  }, [loading, user, router, next]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const res = await login(email, password);
    setSubmitting(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    router.replace(next);
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-2xl border border-border bg-surface-2 p-6 shadow-elevated backdrop-blur">
        <div className="text-xs font-semibold text-muted">Login</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-muted">
          Demo auth flow using a mock cookie session.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-2xl border border-border bg-surface-1 px-4 text-sm text-foreground outline-none transition focus:ring-4 focus:ring-brand-secondary/10"
              placeholder="you@company.com"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="h-11 w-full rounded-2xl border border-border bg-surface-1 px-4 text-sm text-foreground outline-none transition focus:ring-4 focus:ring-brand-secondary/10"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-500/25 bg-red-500/5 p-3 text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          ) : null}

          <AnimatedButton
            variant="primary"
            className="h-11 w-full"
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </AnimatedButton>

          <div className="text-xs text-muted">
            Tip: any email works here.
          </div>
        </form>
      </div>
    </div>
  );
}
