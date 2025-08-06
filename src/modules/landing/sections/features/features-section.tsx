"use client";

import { BarChart3, Palette, Users } from "lucide-react";

import { Grid, Section, Stack, Typography } from "@app/components";

import { FeatureCard } from "./feature-card";

const features = [
  {
    title: "Beautiful Interface",
    description:
      "Clean, intuitive design that gets out of your way and lets you focus on what matters",
    icon: Palette,
    variant: "pink-rose" as const,
  },
  {
    title: "Smart Analytics",
    description: "Gain insights that help you work smarter, not harder with intelligent reporting",
    icon: BarChart3,
    variant: "blue-cyan" as const,
  },
  {
    title: "Team Collaboration",
    description: "Perfect for solo work or team productivity with real-time collaboration features",
    icon: Users,
    variant: "purple-indigo" as const,
  },
];

export function FeaturesSection() {
  return (
    <Section id="features" spacing="lg">
      <Stack spacing={12}>
        <Stack spacing={4} align="center" className="text-center">
          <Typography variant="h2">Everything you need to track time</Typography>

          <Typography variant="subtitle1" className="max-w-2xl text-muted-foreground">
            Powerful features designed to make time tracking effortless and insightful
          </Typography>
        </Stack>

        <Grid cols={3} gap={8}>
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </Grid>
      </Stack>
    </Section>
  );
}
