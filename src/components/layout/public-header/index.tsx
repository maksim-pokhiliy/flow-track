"use client";

import { Container, Logo, Stack } from "../../ui";

import { AuthButtons } from "./auth-buttons";
import { MobileMenu } from "./mobile-menu";
import { Navigation } from "./navigation";

export function PublicHeader() {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <Stack className="h-14" align="center" justify="between" direction="row">
          <Stack spacing={12} align="center" direction="row">
            <Logo />

            <Navigation />
          </Stack>

          <Stack align="center" spacing={4} direction="row">
            <AuthButtons />

            <MobileMenu />
          </Stack>
        </Stack>
      </Container>
    </header>
  );
}
