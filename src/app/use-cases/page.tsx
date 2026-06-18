import type { Metadata } from "next";
import { HomeThemeShell } from "@/components/home/home-theme-shell";
import { SubpageLanding } from "@/components/marketing/subpage-landing";
import { subpageCopy } from "@/content/subpage-copy";

export const metadata: Metadata = {
  title: "Use Cases",
  description: "Explore practical Nue use cases for individuals, families, teams, and recurring personal agent workflows."
};

export default function UseCasesPage() {
  return (
    <HomeThemeShell>
      <SubpageLanding copy={subpageCopy.useCases} />
    </HomeThemeShell>
  );
}
