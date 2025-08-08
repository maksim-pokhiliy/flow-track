import { DashboardHeader } from "@app/components/layout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardHeader />

      <main>{children}</main>
    </>
  );
}
