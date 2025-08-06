import { type VariantProps } from "class-variance-authority";

import { Typography, type typographyVariants } from "@app/components/ui/typography";
import { cn } from "@app/lib/utils";

interface GradientTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof typographyVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export function GradientText({ className, variant, as, children, ...props }: GradientTextProps) {
  return (
    <Typography
      as={as}
      variant={variant}
      className={cn(
        "bg-gradient-to-r from-[hsl(var(--brand-blue))] to-[hsl(var(--brand-purple))] bg-clip-text text-transparent",
        className,
      )}
      {...props}
    >
      {children}
    </Typography>
  );
}
