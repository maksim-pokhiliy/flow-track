"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

interface SessionLoadingState {
  isLoading: boolean;
  hasMinimumTimeElapsed: boolean;
}

interface SessionLoadingContextValue extends SessionLoadingState {
  setCustomLoading?: (loading: boolean) => void;
}

interface SessionLoadingProviderProps {
  children: React.ReactNode;
  minimumLoadingTime?: number;
  fallback?: React.ComponentType;
}

const SessionLoadingContext = createContext<SessionLoadingContextValue | null>(null);

export function SessionLoadingProvider({
  children,
  minimumLoadingTime = 2000,
  fallback: FallbackComponent = DefaultLoadingScreen,
}: SessionLoadingProviderProps) {
  const { status } = useSession();

  const [hasMinimumTimeElapsed, setHasMinimumTimeElapsed] = useState(false);
  const [startTime] = useState(() => Date.now());

  const isSessionLoading = status === "loading";
  const isLoading = isSessionLoading || !hasMinimumTimeElapsed;

  useEffect(() => {
    const timeElapsed = Date.now() - startTime;
    const remainingTime = Math.max(0, minimumLoadingTime - timeElapsed);

    const timer = setTimeout(() => {
      setHasMinimumTimeElapsed(true);
    }, remainingTime);

    return () => clearTimeout(timer);
  }, [minimumLoadingTime, startTime]);

  const contextValue: SessionLoadingContextValue = {
    isLoading,
    hasMinimumTimeElapsed,
  };

  if (isLoading) {
    return (
      <SessionLoadingContext.Provider value={contextValue}>
        <FallbackComponent />
      </SessionLoadingContext.Provider>
    );
  }

  return (
    <SessionLoadingContext.Provider value={contextValue}>{children}</SessionLoadingContext.Provider>
  );
}

export function useSessionLoading(): SessionLoadingContextValue {
  const context = useContext(SessionLoadingContext);

  if (!context) {
    throw new Error("useSessionLoading must be used within SessionLoadingProvider");
  }

  return context;
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

export type { SessionLoadingContextValue, SessionLoadingProviderProps, SessionLoadingState };
