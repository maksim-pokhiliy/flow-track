import { ReactNode } from "react";

import { Container, Stack } from "@app/components/layout";
import { Typography } from "@app/components/ui";
import { cn } from "@app/shared/lib";

interface ContentSectionProps {
  title?: string;
  subtitle?: string | ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full" | false;
  className?: string;
  children?: ReactNode;
}

export const ContentSection = ({
  title,
  subtitle,
  maxWidth = "xl",
  className,
  children,
}: ContentSectionProps) => {
  return (
    <Container maxWidth={maxWidth} className={cn("py-8", className)}>
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
