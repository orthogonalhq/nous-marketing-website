import type { Metadata } from "next";
import { HomeThemeShell } from "@/components/home/home-theme-shell";
import { SubpageLanding } from "@/components/marketing/subpage-landing";
import { subpageCopy } from "@/content/subpage-copy";

export const metadata: Metadata = {
  title: "Developers",
  description: "Developer resources for building with Nue, inspecting the source, following docs, and tracking early access releases."
};

export default function DevelopersPage() {
  return (
    <HomeThemeShell>
      <SubpageLanding copy={subpageCopy.developers} />
    </HomeThemeShell>
  );
}
