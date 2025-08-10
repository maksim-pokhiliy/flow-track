"use client";

import { Stack, Typography } from "@app/components/ui";

type SectionProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

export function Section({ title, description, children }: SectionProps) {
  return (
    <Stack direction="column" spacing={8}>
      <Stack direction="column" spacing={2}>
        {title && <Typography variant="h3">{title}</Typography>}

        {description && (
          <Typography variant="body2" className="text-muted-foreground">
            {description}
          </Typography>
        )}
      </Stack>

      {children}
    </Stack>
  );
}

type SectionStatusProps = {
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
  children?: React.ReactNode;
};

export function SectionStatus({ isLoading, isError, error, children }: SectionStatusProps) {
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    const message = (error as Error)?.message ?? "Unknown error";

    return <Typography className="text-destructive">{message}</Typography>;
  }

  return <>{children}</>;
}
