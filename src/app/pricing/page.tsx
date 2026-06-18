import type { Metadata } from "next";
import { HomeThemeShell } from "@/components/home/home-theme-shell";
import { PricingPage as PricingPageContent } from "@/components/marketing/pricing-page";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent early access pricing information for Nue, the open-source personal agent OS."
};

export default function PricingPage() {
  return (
    <HomeThemeShell>
      <PricingPageContent />
    </HomeThemeShell>
  );
}
