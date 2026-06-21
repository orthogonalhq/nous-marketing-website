import type { Metadata } from "next";
import { HomeThemeShell } from "@/components/home/home-theme-shell";
import { LegalPage } from "@/components/marketing/legal-page";
import { legalCopy } from "@/content/legal-copy";

export const metadata: Metadata = {
  title: "Data Use",
  description: "How Nue expects to handle user data, AI data flows, model providers, waitlist information, and future integrations."
};

export default function DataUsePage() {
  return (
    <HomeThemeShell>
      <LegalPage copy={legalCopy.dataUse} />
    </HomeThemeShell>
  );
}
