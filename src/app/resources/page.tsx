import type { Metadata } from "next";
import { HomeThemeShell } from "@/components/home/home-theme-shell";
import { SubpageLanding } from "@/components/marketing/subpage-landing";
import { subpageCopy } from "@/content/subpage-copy";

export const metadata: Metadata = {
  title: "Resources",
  description: "A resource hub for Nue documentation, guides, examples, changelog notes, and community paths."
};

export default function ResourcesPage() {
  return (
    <HomeThemeShell>
      <SubpageLanding copy={subpageCopy.resources} />
    </HomeThemeShell>
  );
}
