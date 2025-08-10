import { ReactNode } from "react";

import { Container } from "./container";
import { Stack } from "./stack";
import { Typography } from "./typography";

interface ContentSectionProps {
  title?: string;
  subtitle?: string;
  backgroundColor?: "light" | "dark";
  maxWidth?: "sm" | "md" | "lg" | "xl";
  children?: ReactNode;
}

export const ContentSection = ({
  title,
  subtitle,
  maxWidth = "xl",
  children,
}: ContentSectionProps) => {
  return (
    <Container maxWidth={maxWidth} className="pt-8">
      <Stack spacing={children ? 12 : 0}>
        {(title ?? subtitle) && (
          <Stack spacing={2}>
            {title && <Typography variant="h1">{title}</Typography>}

            {subtitle && (
              <Typography variant="body1" className="opacity-60">
                {subtitle}
              </Typography>
            )}
          </Stack>
        )}

        {children}
      </Stack>
    </Container>
  );
};
