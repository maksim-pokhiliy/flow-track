"use client";

import { useSession } from "next-auth/react";
import type { ComponentType, ReactNode } from "react";

interface SessionLoaderProps {
  children: ReactNode;
  fallback?: ComponentType;
}

export function SessionLoader({
  children,
  fallback: FallbackComponent = DefaultLoadingScreen,
}: SessionLoaderProps) {
  const { status } = useSession();

  if (status === "loading") {
    return <FallbackComponent />;
  }

  return <>{children}</>;
}

function DefaultLoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
          <span className="text-2xl font-bold text-foreground">Chronos</span>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground text-sm">Loading your workspace...</p>
        </div>
      </div>
    </div>
  );
}
