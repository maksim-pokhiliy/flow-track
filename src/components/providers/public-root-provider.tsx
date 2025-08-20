"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import { Toaster } from "../ui";

import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

type PublicRootProviderProps = {
  children: ReactNode;
};

export function PublicRootProvider({ children }: PublicRootProviderProps) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <QueryProvider>
          {children}

          <Toaster position="bottom-right" expand={false} duration={4000} />
        </QueryProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
