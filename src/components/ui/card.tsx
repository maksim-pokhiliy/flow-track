import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Stack } from "@app/components/ui/stack";
import { Typography } from "@app/components/ui/typography";
import { cn } from "@app/lib/utils";

const cardVariants = cva("bg-background rounded-xl transition-shadow duration-200", {
  variants: {
    variant: {
      default: "border-2 border-border shadow-sm",
      elevated: "border shadow-lg",
      ghost: "bg-transparent border-0 shadow-none",
      gradient:
        "border-0 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800",
      interactive:
        "border shadow-sm cursor-pointer hover:shadow-md hover:border-foreground/20 active:scale-[0.99]",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
  },
});

interface CardProps extends React.ComponentProps<"div">, VariantProps<typeof cardVariants> {}

function Card({ className, variant, padding, children, ...props }: CardProps) {
  return (
    <Stack
      data-slot="card"
      className={cn(cardVariants({ variant, padding }), className)}
      spacing={6}
      {...props}
    >
      {children}
    </Stack>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <Stack data-slot="card-header" className={className} spacing={2} {...props} />;
}

function CardTitle({ className, children, ...props }: React.ComponentProps<"h3">) {
  return (
    <Typography as="h3" variant="h6" data-slot="card-title" className={className} {...props}>
      {children}
    </Typography>
  );
}

function CardDescription({ className, children, ...props }: React.ComponentProps<"p">) {
  return (
    <Typography
      as="p"
      variant="body2"
      data-slot="card-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    >
      {children}
    </Typography>
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={className} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Stack
      data-slot="card-footer"
      direction="row"
      align="center"
      className={className}
      {...props}
    />
  );
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, cardVariants };
export type { CardProps };
