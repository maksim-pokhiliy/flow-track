"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";

import { Toaster } from "@app/components/ui";
import { setQueryClientForInvalidation } from "@app/shared/api/interceptors/cache-invalidation";
import { ThemeProvider, WorkspaceProvider } from "@app/shared/providers";

type RootProviderProps = {
  children: ReactNode;
};

export function RootProvider({ children }: RootProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  useEffect(() => {
    setQueryClientForInvalidation(queryClient);
  }, [queryClient]);

  return (
    <ThemeProvider>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <WorkspaceProvider>{children}</WorkspaceProvider>
          <Toaster position="bottom-right" expand={false} duration={4000} />
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
