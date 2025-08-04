import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chronos - Time Tracker",
  description: "Beautiful time tracking with projects, tasks and invoices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
