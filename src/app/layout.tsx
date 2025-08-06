import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { LandingHeader } from "@app/components";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chronos - Time Tracking That Actually Works",
  description:
    "Beautiful, intuitive time tracking built by perfectionists, for perfectionists. Start your free trial today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LandingHeader />

        <main>{children}</main>
      </body>
    </html>
  );
}
