"use client";

import { Check } from "lucide-react";
import Link from "next/link";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Stack,
  Typography,
} from "@app/components";
import { cn } from "@app/lib/utils";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  ctaText: string;
  ctaVariant?: "default" | "gradient" | "outline";
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  highlighted = false,
  badge,
  ctaText,
  ctaVariant = "default",
}: PricingCardProps) {
  return (
    <Card className={cn("relative h-full flex flex-col", highlighted && "md:scale-105")}>
      {badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge variant="gradient" size="lg">
            {badge}
          </Badge>
        </div>
      )}

      <CardHeader>
        <CardTitle>{name}</CardTitle>

        <CardDescription>{description}</CardDescription>

        <Stack spacing={1} className="pt-4">
          <Stack direction="row" align="baseline" spacing={1}>
            <Typography variant="h2" className="font-bold">
              {price}
            </Typography>

            <Typography variant="body2" className="text-muted-foreground">
              {period}
            </Typography>
          </Stack>
        </Stack>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <Stack spacing={8} className="h-full">
          <Stack spacing={2} className="flex-1">
            {features.map((feature, index) => (
              <Stack key={index} direction="row" spacing={2} align="start">
                <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <Typography variant="body2">{feature}</Typography>
              </Stack>
            ))}
          </Stack>

          <Button variant={ctaVariant} className="w-full" asChild>
            <Link href="/register">{ctaText}</Link>
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
