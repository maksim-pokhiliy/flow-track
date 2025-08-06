"use client";

import { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  IconBox,
} from "@app/components";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  variant?: "pink-rose" | "blue-cyan" | "purple-indigo";
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  variant = "blue-cyan",
}: FeatureCardProps) {
  return (
    <Card className="h-full group hover:border-foreground/20 transition-all duration-300">
      <CardContent>
        <IconBox
          variant={variant}
          className="group-hover:scale-110 transition-transform duration-300"
        >
          <Icon className="h-6 w-6" />
        </IconBox>
      </CardContent>

      <CardHeader>
        <CardTitle>{title}</CardTitle>

        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
