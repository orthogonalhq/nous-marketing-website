import type { Metadata } from "next";
import { HomeThemeShell } from "@/components/home/home-theme-shell";
import { LegalPage } from "@/components/marketing/legal-page";
import { legalCopy } from "@/content/legal-copy";

export const metadata: Metadata = {
  title: "Terms",
  description: "Nue early-access terms and product availability notes."
};

export default function TermsPage() {
  return (
    <HomeThemeShell>
      <LegalPage copy={legalCopy.terms} />
    </HomeThemeShell>
  );
}
