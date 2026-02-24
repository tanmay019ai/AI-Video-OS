"use client";

import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { useAuth } from "./AuthProvider";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/dashboard";
  const { user, loading } = useAuth();

  React.useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?next=${encodeURIComponent(next)}`);
    }
  }, [loading, user, router, next]);

  if (loading) {
    return (
      <div className="grid gap-4">
        <div className="h-10 w-56 animate-pulse rounded-2xl bg-black/10 dark:bg-white/10" />
        <div className="h-36 w-full animate-pulse rounded-2xl bg-black/10 dark:bg-white/10" />
        <div className="h-36 w-full animate-pulse rounded-2xl bg-black/10 dark:bg-white/10" />
      </div>
    );
  }

  if (!user) return null;
  return <>{children}</>;
}
