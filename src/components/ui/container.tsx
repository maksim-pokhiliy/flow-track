"use client";

import { type ElementType, type ReactNode } from "react";

import { cn } from "@app/shared/lib";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full" | false;
  fixed?: boolean;
  disableGutters?: boolean;
};

const maxWidthClasses = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
  full: "max-w-full",
};

export function Container<T extends ElementType = "div">({
  as,
  children,
  className,
  maxWidth = "lg",
  fixed = false,
  disableGutters = false,
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "mx-auto w-full",
        maxWidth !== false && maxWidthClasses[maxWidth],
        fixed && "max-w-none",
        !disableGutters && "px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </Component>
  );
}
