import type { Metadata } from "next";

export { LoginPage as default } from "@app/modules/auth";

export const metadata: Metadata = {
  title: "Sign In - Chronos",
  description: "Sign in to your Chronos account to continue tracking time",
  keywords: ["sign in", "login", "access account", "time tracking"],
  openGraph: {
    title: "Sign In - Chronos",
    description: "Sign in to your Chronos account to continue tracking time",
    url: "https://chronos.app/login",
    siteName: "Chronos",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sign In - Chronos",
    description: "Sign in to your Chronos account to continue tracking time",
  },
  robots: {
    index: false,
    follow: true,
  },
};
