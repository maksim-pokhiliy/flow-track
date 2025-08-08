"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { DashboardHeader } from "@app/components/layout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <DashboardHeader />

      <main>{children}</main>
    </QueryClientProvider>
  );
}
