"use client";

import { Container, Logo, Stack } from "../ui";

export function DashboardHeader() {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <Stack className="h-14" direction="row" align="center" justify="between">
          <Stack spacing={12} justify="center">
            <Logo />
          </Stack>
        </Stack>
      </Container>
    </header>
  );
}
