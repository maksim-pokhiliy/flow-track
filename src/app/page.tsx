import { BarChart3, FileText, LucideIcon, Timer } from "lucide-react";
import Link from "next/link";

import { Header } from "@app/components/layout/header";
import { Button } from "@app/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@app/components/ui/card";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Timer,
    title: "Smart Timer",
    description: "One-click time tracking with automatic project detection",
  },
  {
    icon: FileText,
    title: "Professional Invoices",
    description: "Generate beautiful PDF invoices from your time entries",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Understand where your time goes with powerful analytics",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header variant="landing" />

      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Beautiful Time Tracking</h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Track your time, manage projects, and generate invoices with the most elegant time tracker
          you&apos;ll ever use.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link href="/register">
            <Button size="lg" className="gap-2">
              <Timer className="h-4 w-4" />
              Start Tracking Free
            </Button>
          </Link>

          <Link href="/login">
            <Button variant="outline" size="lg">
              Sign in
            </Button>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Everything you need to track time</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card key={feature.title}>
                <CardHeader>
                  <Icon className="h-8 w-8 text-primary mb-2" />

                  <CardTitle>{feature.title}</CardTitle>

                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start tracking?</h2>

          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of professionals who trust Chronos with their time
          </p>

          <Link href="/register">
            <Button size="lg">Get Started Free</Button>
          </Link>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Chronos. Built with Next.js and love.</p>
        </div>
      </footer>
    </div>
  );
}
