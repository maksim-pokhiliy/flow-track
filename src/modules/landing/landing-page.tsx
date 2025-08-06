import { BackgroundPattern, Container } from "@app/components";

import { CTASection } from "./sections/cta";
import { FeaturesSection } from "./sections/features";
import { HeroSection } from "./sections/hero";
import { PricingSection } from "./sections/pricing";

export function LandingPage() {
  return (
    <>
      <Container size="xl">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <CTASection />
      </Container>

      <BackgroundPattern variant="dots" opacity={0.2} className="fixed" />
    </>
  );
}
