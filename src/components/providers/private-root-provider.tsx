"use client";

import { ReactNode } from "react";

import { TimerProvider } from "./timer-provider";
import { WorkspaceProvider } from "./workspace-provider";

type PrivateRootProviderProps = {
  children: ReactNode;
};

export function PrivateRootProvider({ children }: PrivateRootProviderProps) {
  return (
    <WorkspaceProvider>
      <TimerProvider>{children}</TimerProvider>
    </WorkspaceProvider>
  );
}
