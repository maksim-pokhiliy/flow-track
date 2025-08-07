import type { Metadata } from "next";

export { RegisterPage as default } from "@app/modules/auth";

export const metadata: Metadata = {
  title: "Create Account - Chronos",
  description: "Start tracking your time with Chronos. Free forever for personal use.",
  keywords: ["sign up", "register", "create account", "time tracking", "free trial"],
  openGraph: {
    title: "Create Account - Chronos",
    description: "Start tracking your time with Chronos. Free forever for personal use.",
    url: "https://chronos.app/register",
    siteName: "Chronos",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Create Account - Chronos",
    description: "Start tracking your time with Chronos. Free forever for personal use.",
  },
  robots: {
    index: false,
    follow: true,
  },
};
