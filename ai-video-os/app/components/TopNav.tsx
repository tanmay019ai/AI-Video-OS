"use client";

import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { AnimatedButton } from "./AnimatedButton";
import { useAuth } from "./AuthProvider";
import { ThemeToggle } from "./ThemeToggle";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={
        "rounded-2xl px-3 py-2 text-sm font-semibold transition " +
        (active
          ? "bg-surface-1 text-foreground"
          : "text-muted hover:bg-surface-2 hover:text-foreground")
      }
    >
      {children}
    </Link>
  );
}

export function TopNav() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  return (
    <div className="sticky top-0 z-20 border-b border-border bg-surface-2/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-2xl bg-brand-primary shadow-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(167,139,250,0.30),transparent_55%)]" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-foreground">
                CineOS
              </div>
              <div className="text-xs text-muted">AI Video OS</div>
            </div>
          </Link>

          <div className="hidden items-center gap-1 sm:flex">
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/product">Product</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {loading ? (
            <div className="h-10 w-28 animate-pulse rounded-2xl bg-black/10 dark:bg-white/10" />
          ) : user ? (
            <AnimatedButton
              type="button"
              variant="secondary"
              onClick={async () => {
                await logout();
                router.push("/");
              }}
              className="h-10"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </AnimatedButton>
          ) : (
            <Link href="/login" className="inline-flex">
              <AnimatedButton type="button" variant="primary" className="h-10">
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </AnimatedButton>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
