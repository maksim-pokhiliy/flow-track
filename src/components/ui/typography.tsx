import { type ElementType } from "react";

import { cn } from "@app/shared/lib/cn";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "subtitle1"
  | "subtitle2"
  | "caption"
  | "overline"
  | "button";

type MapItem = { tag: ElementType; cls: string };

const map: Record<Variant, MapItem> = {
  h1: { tag: "h1", cls: "text-4xl font-semibold" },
  h2: { tag: "h2", cls: "text-3xl font-semibold" },
  h3: { tag: "h3", cls: "text-2xl font-semibold" },
  h4: { tag: "h4", cls: "text-xl font-semibold" },
  h5: { tag: "h5", cls: "text-lg font-semibold" },
  h6: { tag: "h6", cls: "text-base font-semibold" },
  body1: { tag: "p", cls: "text-base" },
  body2: { tag: "p", cls: "text-sm" },
  subtitle1: { tag: "p", cls: "text-base font-medium" },
  subtitle2: { tag: "p", cls: "text-sm font-medium" },
  caption: { tag: "span", cls: "text-xs" },
  overline: { tag: "span", cls: "text-[10px] uppercase tracking-wide" },
  button: { tag: "span", cls: "text-sm font-medium" },
};

type TypographyProps = React.PropsWithChildren<{
  variant?: Variant;
  className?: string;
  as?: ElementType;
}>;

export function Typography({ variant = "body1", className, as, children }: TypographyProps) {
  const item = map[variant];
  const Tag = (as ?? item.tag) as ElementType;

  return <Tag className={cn(item.cls, className)}>{children}</Tag>;
}
