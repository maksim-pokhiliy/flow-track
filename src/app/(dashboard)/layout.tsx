import { DashboardHeader } from "@app/components/layout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader />

      <main>{children}</main>
    </div>
  );
}
