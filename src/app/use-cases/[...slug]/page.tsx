import type { Metadata } from "next";
import { HomeThemeShell } from "@/components/home/home-theme-shell";
import { SubpageLanding } from "@/components/marketing/subpage-landing";
import { subpageCopy } from "@/content/subpage-copy";

export const metadata: Metadata = {
  title: "Use Cases",
  description: "Explore Nue use cases for recurring work that benefits from memory, tools, approvals, and reusable routines."
};

export default function UseCasesCatchAllPage() {
  return (
    <HomeThemeShell>
      <SubpageLanding copy={subpageCopy.useCases} />
    </HomeThemeShell>
  );
}
