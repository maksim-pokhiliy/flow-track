"use client";

import Link from "next/link";

import { Button, Stack } from "@app/components/ui";

export function AuthButtons() {
  return (
    <Stack spacing={4} className="hidden md:flex" direction="row">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/login">Log in</Link>
      </Button>

      <Button size="sm" asChild>
        <Link href="/register">Get started</Link>
      </Button>
    </Stack>
  );
}
