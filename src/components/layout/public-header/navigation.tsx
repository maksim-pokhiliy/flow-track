"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Stack } from "@app/components/ui";
import { cn } from "@app/shared/lib";

import { navItems } from "./nav-items";

export function Navigation() {
  const pathname = usePathname();

  return (
    <Stack className="hidden md:flex" as="nav" spacing={6} align="center">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {item.label}
        </Link>
      ))}
    </Stack>
  );
}
