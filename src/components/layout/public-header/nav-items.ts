export const navItems = [
  { href: "/pricing", label: "Pricing" },
  { href: "/features", label: "Features" },
  { href: "/about", label: "About" },
] as const;

export type NavItem = (typeof navItems)[number];
