"use client";

import { Loader2 } from "lucide-react";

import { Stack, Typography } from "@app/components/ui";

type QueryWrapperProps<T> = {
  isLoading: boolean;
  error: unknown | null;
  data: T | undefined;
  children: (data: T) => React.ReactNode;
  loadingMessage?: string;
  errorMessage?: string;
  isEmpty?: (data: T) => boolean;
  renderEmpty?: React.ReactNode | (() => React.ReactNode);
};

export function QueryWrapper<T>({
  isLoading,
  error,
  data,
  children,
  loadingMessage = "Loading...",
  errorMessage = "Failed to load data",
  isEmpty,
  renderEmpty,
}: QueryWrapperProps<T>) {
  if (isLoading) {
    return (
      <Stack direction="row" align="center" justify="center" className="min-h-[20vh]" spacing={2}>
        <Loader2 className="h-4 w-4 animate-spin" />

        {loadingMessage && <Typography>{loadingMessage}</Typography>}
      </Stack>
    );
  }

  if (error) {
    const message = (error as Error)?.message ?? errorMessage;

    return (
      <Typography className="text-destructive" variant="body1">
        {message}
      </Typography>
    );
  }

  const empty = !data || (isEmpty?.(data) ?? false);

  if (empty) {
    if (renderEmpty) {
      return typeof renderEmpty === "function" ? (
        <>{(renderEmpty as () => React.ReactNode)()}</>
      ) : (
        <>{renderEmpty}</>
      );
    }

    return null;
  }

  return <>{children(data)}</>;
}
