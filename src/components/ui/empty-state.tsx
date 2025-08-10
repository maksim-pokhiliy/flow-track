"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@app/components/ui/card";

type EmptyStateProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

export function EmptyState({ title = "Nothing here yet", description, action }: EmptyStateProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>

        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      {action && <CardContent>{action}</CardContent>}
    </Card>
  );
}
