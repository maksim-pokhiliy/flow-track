"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@app/lib/utils";

const separatorVariants = cva("shrink-0", {
  variants: {
    variant: {
      default: "bg-border",
      subtle: "bg-border/50",
      strong: "bg-foreground/20",
      gradient: "bg-gradient-to-r from-transparent via-border to-transparent",
    },
    size: {
      default: "data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px",
      md: "data-[orientation=horizontal]:h-[2px] data-[orientation=vertical]:w-[2px]",
      lg: "data-[orientation=horizontal]:h-[3px] data-[orientation=vertical]:w-[3px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface SeparatorProps
  extends React.ComponentProps<typeof SeparatorPrimitive.Root>,
    VariantProps<typeof separatorVariants> {}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant,
  size,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorVariants({ variant, size }),
        orientation === "horizontal" ? "w-full" : "h-full",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
