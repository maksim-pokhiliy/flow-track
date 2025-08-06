"use client";

import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

import { Button, Section, Stack, Typography } from "@app/components";

export function CTASection() {
  return (
    <Section spacing="lg" className="bg-gradient-to-br from-background via-primary/5 to-background">
      <Stack spacing={8} align="center" className="text-center">
        <Stack spacing={4}>
          <Typography variant="h2">Ready to take control of your time?</Typography>

          <Typography variant="subtitle1" className="text-muted-foreground">
            Join thousands of professionals who&apos;ve already boosted their productivity with
            Chronos. Start your free trial today - no credit card required.
          </Typography>
        </Stack>

        <Stack direction="row" spacing={4}>
          <Button variant="gradient" rightIcon={ArrowRight} size="lg">
            Start Free Trial
          </Button>

          <Button variant="outline" size="lg" rightIcon={Clock}>
            <Link href="#pricing">View Pricing</Link>
          </Button>
        </Stack>

        <Typography variant="caption" className="text-muted-foreground">
          Free forever for 1 project • No credit card required • Cancel anytime
        </Typography>
      </Stack>
    </Section>
  );
}
