"use client";

import Link from "next/link";

import { Button, Container, Logo, Stack } from "@app/components";

import { LandingNavLinks } from "./landing-nav-links";

export function LandingHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <Container size="xl">
        <Stack direction="row" align="center" justify="between" className="py-4">
          <Logo />

          <nav className="hidden md:flex">
            <LandingNavLinks />
          </nav>

          <Stack direction="row" align="center">
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>

            <Button variant="gradient" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </Stack>
        </Stack>
      </Container>
    </header>
  );
}
