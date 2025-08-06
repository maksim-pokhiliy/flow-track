import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@app/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-6xl font-bold tracking-tight",
      h2: "text-5xl font-bold tracking-tight",
      h3: "text-4xl font-bold tracking-tight",
      h4: "text-3xl font-semibold tracking-tight",
      h5: "text-2xl font-semibold",
      h6: "text-xl font-semibold",
      subtitle1: "text-lg font-medium",
      subtitle2: "text-base font-medium",
      body1: "text-base",
      body2: "text-sm",
      button: "text-sm font-medium uppercase tracking-wider",
      caption: "text-xs text-muted-foreground",
      overline: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "body1",
  },
});

interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "body1", as, children, ...props }, ref) => {
    const componentMap = {
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h4",
      h5: "h5",
      h6: "h6",
      subtitle1: "h6",
      subtitle2: "h6",
      body1: "p",
      body2: "p",
      button: "span",
      caption: "span",
      overline: "span",
    } as const;

    const Component = as ?? componentMap[variant ?? "body1"] ?? "p";

    return React.createElement(
      Component,
      {
        ref,
        className: cn(typographyVariants({ variant }), className),
        ...props,
      },
      children,
    );
  },
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
