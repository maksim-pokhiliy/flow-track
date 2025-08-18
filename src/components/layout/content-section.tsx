import { ReactNode } from "react";

import { Container, Stack } from "@app/components/layout";
import { Typography } from "@app/components/ui";

interface ContentSectionProps {
  title?: string;
  subtitle?: string | ReactNode;
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

            {subtitle &&
              (typeof subtitle === "string" ? (
                <Typography variant="body1" className="opacity-60">
                  {subtitle}
                </Typography>
              ) : (
                subtitle
              ))}
          </Stack>
        )}

        {children}
      </Stack>
    </Container>
  );
};
