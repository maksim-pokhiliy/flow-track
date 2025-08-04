import type { Metadata } from "next";

import { Footer, Header } from "@app/components/layout";

export const metadata: Metadata = {
  title: "Chronos - Time Tracker",
  description: "Beautiful time tracking with projects, tasks and invoices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <Header variant="app" />

      {children}

      <Footer />
    </div>
  );
}
