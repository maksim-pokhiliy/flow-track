import { PublicHeader, Stack } from "@app/components/layout";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <Stack className="min-h-full">
      <PublicHeader />

      <main className="flex flex-1 h-full">{children}</main>
    </Stack>
  );
}
