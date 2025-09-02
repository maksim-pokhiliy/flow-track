"use client";

import type { VariantProps } from "class-variance-authority";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@app/components/ui";

type EmptyStateProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: VariantProps<typeof Card>["variant"];
};

export function EmptyState({
  title = "Nothing here yet",
  description,
  action,
  variant = "default",
}: EmptyStateProps) {
  return (
    <Card className="w-full" variant={variant}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}

      <CardContent>{description && <CardDescription>{description}</CardDescription>}</CardContent>

      {action && <CardContent>{action}</CardContent>}
    </Card>
  );
}
