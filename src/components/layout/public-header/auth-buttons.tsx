import Link from "next/link";

import { Button } from "@app/components/ui/button";

import { Stack } from "../../ui";

export function AuthButtons() {
  return (
    <Stack spacing={4}>
      <Button variant="ghost" size="sm" asChild>
        <Link href="/login">Log in</Link>
      </Button>

      <Button size="sm" asChild>
        <Link href="/register">Get started</Link>
      </Button>
    </Stack>
  );
}
