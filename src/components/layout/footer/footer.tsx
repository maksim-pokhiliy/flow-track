import Link from "next/link";

import { Container, Grid, Section, Separator, Stack, Typography } from "@app/components";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#integrations" },
  ],
  company: [
    { label: "About", href: "#about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],
  support: [
    { label: "Documentation", href: "/docs" },
    { label: "Contact", href: "/contact" },
    { label: "Status", href: "/status" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "/security" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50">
      <Container size="xl">
        <Section spacing="sm">
          <Stack spacing={8}>
            <Grid cols={5} gap={8}>
              <Stack spacing={4}>
                <Typography variant="h6">Chronos</Typography>

                <Typography variant="body2" className="text-muted-foreground">
                  Time tracking that actually works. Built for teams who value productivity.
                </Typography>
              </Stack>

              {Object.entries(footerLinks).map(([category, links]) => (
                <Stack key={category} spacing={3}>
                  <Typography variant="subtitle2" className="capitalize">
                    {category}
                  </Typography>

                  <Stack spacing={2}>
                    {links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Grid>

            <Separator />

            <Stack direction="row" justify="between" align="center">
              <Typography variant="caption">
                © {new Date().getFullYear()} Chronos. All rights reserved.
              </Typography>

              <Stack direction="row" spacing={4}>
                <Link
                  href="/privacy"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>

                <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Section>
      </Container>
    </footer>
  );
}
