import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@app/lib/utils";

const stackVariants = cva("flex", {
  variants: {
    spacing: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
  },
  defaultVariants: {
    spacing: 4,
    align: "stretch",
    justify: "start",
    wrap: "nowrap",
  },
});

type Direction = "column" | "row" | "column-reverse" | "row-reverse";

interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  direction?:
    | Direction
    | { base?: Direction; sm?: Direction; md?: Direction; lg?: Direction; xl?: Direction };
}

const directionClasses: Record<Direction, string> = {
  column: "flex-col",
  row: "flex-row",
  "column-reverse": "flex-col-reverse",
  "row-reverse": "flex-row-reverse",
};

const getDirectionClasses = (direction: StackProps["direction"]) => {
  if (!direction) return "flex-col";

  if (typeof direction === "string") {
    return directionClasses[direction];
  }

  const classes: string[] = ["flex-col"]; // default

  if (direction.base) classes[0] = directionClasses[direction.base];

  if (direction.sm === "row") classes.push("sm:flex-row");

  if (direction.sm === "column") classes.push("sm:flex-col");

  if (direction.md === "row") classes.push("md:flex-row");

  if (direction.md === "column") classes.push("md:flex-col");

  if (direction.lg === "row") classes.push("lg:flex-row");

  if (direction.lg === "column") classes.push("lg:flex-col");

  if (direction.xl === "row") classes.push("xl:flex-row");

  if (direction.xl === "column") classes.push("xl:flex-col");

  return classes.join(" ");
};

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, spacing, align, justify, wrap, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          stackVariants({ spacing, align, justify, wrap }),
          getDirectionClasses(direction),
          className,
        )}
        {...props}
      />
    );
  },
);

Stack.displayName = "Stack";

export { Stack, stackVariants };
