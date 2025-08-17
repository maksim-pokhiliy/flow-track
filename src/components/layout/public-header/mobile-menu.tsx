"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Stack } from "@app/components/layout";
import { navItems } from "@app/components/layout/public-header/nav-items";
import {
  Button,
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@app/components/ui";
import { cn } from "@app/shared/lib";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <Stack className="mt-6" spacing={4}>
          <Stack as="nav" spacing={2} className="px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-2 px-3 rounded-sm text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </Stack>

          <Separator />

          <Stack spacing={4} className="px-4">
            <Button variant="outline" asChild>
              <Link href="/login" onClick={() => setOpen(false)}>
                Log in
              </Link>
            </Button>

            <Button asChild>
              <Link href="/register" onClick={() => setOpen(false)}>
                Get started
              </Link>
            </Button>
          </Stack>
        </Stack>
      </SheetContent>
    </Sheet>
  );
}
