"use client";

import axios from "axios";
import * as React from "react";

export type User = {
  email: string;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  const refresh = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/auth/session");
      setUser(res.data?.user ?? null);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = React.useCallback(async (email: string, password: string) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const nextUser = res.data?.user ?? null;
      if (!nextUser) return { ok: false as const, error: "Login failed." };
      setUser(nextUser);
      return { ok: true as const };
    } catch (e: unknown) {
      const apiError = (() => {
        if (!axios.isAxiosError(e)) return undefined;
        const data = e.response?.data;
        if (!data || typeof data !== "object") return undefined;
        const maybe = (data as Record<string, unknown>).error;
        return typeof maybe === "string" ? maybe : undefined;
      })();

      const msg =
        apiError ??
        (e instanceof Error ? e.message : undefined) ??
        "Could not sign in. Please try again.";
      return { ok: false as const, error: String(msg) };
    }
  }, []);

  const logout = React.useCallback(async () => {
    try {
      await axios.post("/api/auth/logout");
    } finally {
      setUser(null);
    }
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    login,
    logout,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
