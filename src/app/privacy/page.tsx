import type { Metadata } from "next";
import { HomeThemeShell } from "@/components/home/home-theme-shell";
import { LegalPage } from "@/components/marketing/legal-page";
import { legalCopy } from "@/content/legal-copy";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Nue privacy principles for early access: local-first control, minimal collection, explicit consent, and transparent data handling."
};

export default function PrivacyPage() {
  return (
    <HomeThemeShell>
      <LegalPage copy={legalCopy.privacy} />
    </HomeThemeShell>
  );
}
