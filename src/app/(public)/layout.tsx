import { PublicHeader } from "@app/components/layout";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-full">
      <PublicHeader />

      <main className="flex flex-1 h-full">{children}</main>
    </div>
  );
}
