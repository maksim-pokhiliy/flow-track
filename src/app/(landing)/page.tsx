import type { Metadata } from "next";

export { LandingPage as default } from "@app/modules/landing";

export const metadata: Metadata = {
  title: "Chronos - Time Tracking That Actually Works",
  description:
    "Beautiful, intuitive time tracking built by perfectionists, for perfectionists. Start your free trial today and boost your productivity.",
  keywords: [
    "time tracking",
    "productivity",
    "project management",
    "freelancer tools",
    "time management",
  ],
  authors: [{ name: "Chronos Team" }],
  openGraph: {
    title: "Chronos - Time Tracking That Actually Works",
    description: "Beautiful, intuitive time tracking built by perfectionists, for perfectionists.",
    url: "https://chronos.app",
    siteName: "Chronos",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chronos Time Tracker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chronos - Time Tracking That Actually Works",
    description: "Beautiful, intuitive time tracking built by perfectionists, for perfectionists.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
