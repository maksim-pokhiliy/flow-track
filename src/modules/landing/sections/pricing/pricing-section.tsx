"use client";

import { Grid, Section, Stack, Typography } from "@app/components";

import { PricingCard } from "./pricing-card";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for individuals getting started",
    features: [
      "1 project",
      "Basic time tracking",
      "Weekly reports",
      "CSV export",
      "Mobile app access",
    ],
    ctaText: "Start Free",
    ctaVariant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For professionals and freelancers",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Custom reports",
      "API access",
      "Team collaboration (up to 5)",
      "Invoice generation",
      "Priority support",
    ],
    highlighted: true,
    badge: "Most Popular",
    ctaText: "Start Free Trial",
    ctaVariant: "gradient" as const,
  },
  {
    name: "Team",
    price: "$29",
    period: "/user/month",
    description: "For growing teams and organizations",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Admin dashboard",
      "Time approval workflow",
      "Custom integrations",
      "SSO authentication",
      "Dedicated support",
    ],
    ctaText: "Contact Sales",
    ctaVariant: "outline" as const,
  },
];

export function PricingSection() {
  return (
    <Section id="pricing" spacing="lg">
      <Stack spacing={12}>
        <Stack spacing={4} align="center" className="text-center">
          <Typography variant="h2">Simple, transparent pricing</Typography>

          <Typography variant="subtitle1" className="max-w-2xl text-muted-foreground">
            Start for free, upgrade when you need. No credit card required for free tier.
          </Typography>
        </Stack>

        <Grid cols={3} gap={8} className="items-stretch">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </Grid>
      </Stack>
    </Section>
  );
}
