"use client";

import { Container, Logo, Stack } from "@app/components";

export function AppHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <Container size="xl">
        <Stack align="center" justify="between">
          <Logo />
        </Stack>
      </Container>
    </header>
  );
}
