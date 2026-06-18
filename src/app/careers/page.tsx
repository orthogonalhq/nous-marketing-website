import type { Metadata } from "next";
import { HomeThemeShell } from "@/components/home/home-theme-shell";
import { SubpageLanding } from "@/components/marketing/subpage-landing";
import { subpageCopy } from "@/content/subpage-copy";

export const metadata: Metadata = {
  title: "Careers",
  description: "Help build Nue with high-taste maintainers who care about craft, privacy, performance, and open-source stewardship."
};

export default function CareersPage() {
  return (
    <HomeThemeShell>
      <SubpageLanding copy={subpageCopy.careers} />
    </HomeThemeShell>
  );
}
