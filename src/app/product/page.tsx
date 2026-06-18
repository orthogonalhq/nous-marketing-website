import type { Metadata } from "next";
import { HomeThemeShell } from "@/components/home/home-theme-shell";
import { SubpageLanding } from "@/components/marketing/subpage-landing";
import { subpageCopy } from "@/content/subpage-copy";

export const metadata: Metadata = {
  title: "Product",
  description: "Learn how Nue turns chat into a private operating system for personal agents, routines, tools, memory, and approvals."
};

export default function ProductPage() {
  return (
    <HomeThemeShell>
      <SubpageLanding copy={subpageCopy.product} />
    </HomeThemeShell>
  );
}
