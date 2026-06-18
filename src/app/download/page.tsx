import type { Metadata } from "next";
import { HomeThemeShell } from "@/components/home/home-theme-shell";
import { DownloadPage as DownloadPageContent } from "@/components/marketing/download-page";

export const metadata: Metadata = {
  title: "Download",
  description: "Download the Nue early access release for a privacy-first personal agent OS."
};

export default function DownloadPage() {
  return (
    <HomeThemeShell>
      <DownloadPageContent />
    </HomeThemeShell>
  );
}
