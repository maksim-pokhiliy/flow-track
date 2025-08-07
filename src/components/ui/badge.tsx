import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@app/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-medium transition-all duration-200 [&>svg]:size-3 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary border border-primary/20",
        secondary: "bg-secondary text-secondary-foreground border border-border/50",
        destructive: "bg-destructive/10 text-destructive border border-destructive/20",
        outline: "border border-border text-foreground",
        gradient: "bg-gradient-brand text-white",
        success:
          "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
        warning:
          "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px] rounded-full",
        md: "px-2.5 py-1 text-xs rounded-full",
        lg: "px-3 py-1.5 text-sm rounded-full",
      },
      pulse: {
        true: "relative before:absolute before:inset-0 before:rounded-full before:bg-current before:animate-ping before:opacity-75",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      pulse: false,
    },
  },
);

interface BadgeProps extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  dot?: boolean;
}

function Badge({
  className,
  variant,
  size,
  pulse,
  asChild = false,
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, pulse }), className)}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "size-1.5 rounded-full",
            variant === "gradient" ? "bg-white/80" : "bg-current opacity-60",
          )}
        />
      )}

      {children}
    </Comp>
  );
}

export { Badge, badgeVariants };
