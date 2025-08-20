import { DashboardHeader, Stack } from "@app/components/layout";
import { PrivateRootProvider } from "@app/components/providers/private-root-provider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Stack className="min-h-full">
      <DashboardHeader />

      <main className="flex flex-1 h-full">
        <PrivateRootProvider>{children}</PrivateRootProvider>
      </main>
    </Stack>
  );
}
