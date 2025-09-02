"use client";

import { Loader } from "lucide-react";

import { ContentSection, Stack } from "@app/components/layout";
import { Typography } from "@app/components/ui/typography";
import { cn } from "@app/shared/lib";

type QueryWrapperProps<T> = {
  isLoading: boolean;
  loadingText?: string;
  error?: unknown | null;
  data?: T;
  children: (data: T) => React.ReactNode;
  isEmpty?: (data: T) => boolean;
  renderEmpty?: React.ReactNode | (() => React.ReactNode);
  size?: "sm" | "md" | "lg";
};

export function QueryWrapper<T>({
  isLoading,
  loadingText,
  error,
  data,
  children,
  isEmpty,
  renderEmpty,
  size = "md",
}: QueryWrapperProps<T>) {
  const loaderSize = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }[size];

  const textVariant = {
    sm: "body2" as const,
    md: "body1" as const,
    lg: "h4" as const,
  }[size];

  const pySize = {
    sm: "py-2" as const,
    md: "py-8" as const,
    lg: "py-8" as const,
  }[size];

  if (isLoading) {
    return (
      <ContentSection maxWidth="2xl" className={pySize}>
        <Stack align="center" justify="center" spacing={2} direction="row">
          <Loader className={cn("animate-spin", loaderSize)} />

          <Typography variant={textVariant} className={size === "lg" ? "font-normal" : undefined}>
            {loadingText ?? "Loading..."}
          </Typography>
        </Stack>
      </ContentSection>
    );
  }

  if (error) {
    const err = (error as Error) ?? new Error("Unknown error");

    return (
      <ContentSection maxWidth="2xl" className={pySize}>
        <Stack align="center" justify="center">
          <Typography className="text-destructive">{err.message}</Typography>
        </Stack>
      </ContentSection>
    );
  }

  const empty = !data || (isEmpty?.(data) ?? false);

  if (empty) {
    if (!renderEmpty) {
      return null;
    }

    return (
      <>
        {typeof renderEmpty === "function" ? (renderEmpty as () => React.ReactNode)() : renderEmpty}
      </>
    );
  }

  return <>{children(data)}</>;
}
