import { PublicHeader } from "@app/components/layout";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />

      <main>{children}</main>
    </>
  );
}
