"use client";

import { type ElementType, type ReactNode } from "react";

import { cn } from "@app/shared/lib";

type StackProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
};

const directionClasses = {
  row: "flex-row",
  column: "flex-col",
  "row-reverse": "flex-row-reverse",
  "column-reverse": "flex-col-reverse",
} as const;

const spacingClasses = {
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
} as const;

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
} as const;

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
} as const;

export function Stack<T extends ElementType = "div">({
  as,
  children,
  className,
  direction = "row",
  spacing = 0,
  align = "stretch",
  justify = "start",
  wrap = false,
  fullWidth = false,
  fullHeight = false,
}: StackProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "flex",
        directionClasses[direction],
        spacingClasses[spacing],
        alignClasses[align],
        justifyClasses[justify],
        wrap && "flex-wrap",
        fullWidth && "w-full",
        fullHeight && "h-full",
        className,
      )}
    >
      {children}
    </Component>
  );
}
