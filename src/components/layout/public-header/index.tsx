"use client";

import { Container, Logo, Stack } from "@app/components/layout";
import { AuthButtons } from "@app/components/layout/public-header/auth-buttons";
import { MobileMenu } from "@app/components/layout/public-header/mobile-menu";
import { Navigation } from "@app/components/layout/public-header/navigation";

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
