"use client";

import { ArrowRight, Play, Sparkles, Timer, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

import { Badge, Button, FullScreenSection, GradientText, Stack, Typography } from "@app/components";

export function HeroSection() {
  return (
    <FullScreenSection id="hero">
      <Stack className="text-center pt-[100px]" align="center" spacing={10}>
        <Badge variant="gradient" size="lg">
          <Sparkles className="h-3 w-3" />
          Built for productivity enthusiasts
        </Badge>

        <Stack spacing={4}>
          <Typography as="h1" variant="h1" className="max-w-4xl">
            Time tracking that{" "}
            <GradientText as="span" variant="h1">
              actually works
            </GradientText>
          </Typography>

          <Typography variant="subtitle1" className="mx-auto max-w-2xl text-muted-foreground">
            Say goodbye to clunky interfaces and hello to beautiful, intuitive time tracking. Built
            by <span className="text-foreground font-semibold">perfectionists</span>, for{" "}
            <span className="text-foreground font-semibold">perfectionists</span>.
          </Typography>
        </Stack>

        <Stack direction={{ md: "row" }} spacing={4} className="w-full md:w-auto">
          <Button variant="gradient" size="lg" rightIcon={ArrowRight} className="shadow-2xl">
            <Link href="/register">Start Free Trial</Link>
          </Button>

          <Button variant="outline" size="lg" rightIcon={Play}>
            Watch Demo
          </Button>
        </Stack>

        <Stack spacing={4} className="pt-8">
          <Typography variant="caption" className="uppercase tracking-wider">
            Trusted by productive teams worldwide
          </Typography>

          <Stack direction="row" align="center" justify="center" spacing={8}>
            <Stack direction="row" spacing={2} align="center">
              <Users className="h-4 w-4 text-muted-foreground" />

              <Typography variant="body2" className="text-muted-foreground">
                10k+ users
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} align="center">
              <Timer className="h-4 w-4 text-muted-foreground" />

              <Typography variant="body2" className="text-muted-foreground">
                1M+ hours tracked
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} align="center">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />

              <Typography variant="body2" className="text-muted-foreground">
                99.9% uptime
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </FullScreenSection>
  );
}
