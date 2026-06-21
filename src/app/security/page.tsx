import type { Metadata } from "next";
import { HomeThemeShell } from "@/components/home/home-theme-shell";
import { LegalPage } from "@/components/marketing/legal-page";
import { legalCopy } from "@/content/legal-copy";

export const metadata: Metadata = {
  title: "Security",
  description: "How Nue approaches privacy, local-first control, tool permissions, approvals, and security during early access."
};

export default function SecurityPage() {
  return (
    <HomeThemeShell>
      <LegalPage copy={legalCopy.security} />
    </HomeThemeShell>
  );
}
