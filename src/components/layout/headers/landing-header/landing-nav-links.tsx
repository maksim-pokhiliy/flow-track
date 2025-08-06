"use client";

import Link from "next/link";

import { Stack, Typography } from "@app/components";

const landingNavItems = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export function LandingNavLinks() {
  return (
    <Stack direction="row" spacing={8}>
      {landingNavItems.map((item) => (
        <Link key={item.label} href={item.href}>
          <Typography variant="body1">{item.label}</Typography>
        </Link>
      ))}
    </Stack>
  );
}
