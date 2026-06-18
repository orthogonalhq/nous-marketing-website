"use client";

import { useEffect, useState } from "react";

import { PrimaryCtaLink } from "@/components/marketing/primary-cta-link";

type DownloadOs = "linux" | "macos" | "windows";

type DownloadCtaLinkProps = {
  className?: string;
  icon?: boolean;
  label?: "auto" | "download";
  variant?: "primary" | "link";
};

const osLabels = {
  linux: "Linux",
  macos: "macOS",
  windows: "Windows"
} satisfies Record<DownloadOs, string>;

export function DownloadCtaLink({ className, icon = true, label: labelMode = "auto", variant = "primary" }: DownloadCtaLinkProps) {
  const [os, setOs] = useState<DownloadOs | null>(null);
  const href = os ? `/download?os=${os}` : "/download";
  const label = labelMode === "download" ? "Download" : os ? `Download for ${osLabels[os]}` : "Download Nue";
  const content = (
    <>
      {label}
      {icon ? <DownloadArrowIcon /> : null}
    </>
  );

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setOs(detectDownloadOs()));

    return () => window.cancelAnimationFrame(raf);
  }, []);

  if (variant === "link") {
    return (
      <a className={className} href={href}>
        {content}
      </a>
    );
  }

  return (
    <PrimaryCtaLink className={className} href={href}>
      {content}
    </PrimaryCtaLink>
  );
}

function detectDownloadOs(): DownloadOs | null {
  const nav = window.navigator as Navigator & { userAgentData?: { platform?: string } };
  const platform = `${nav.userAgentData?.platform ?? nav.platform ?? ""} ${nav.userAgent ?? ""}`.toLowerCase();

  if (platform.includes("win")) {
    return "windows";
  }

  if (platform.includes("mac") || platform.includes("iphone") || platform.includes("ipad")) {
    return "macos";
  }

  if (platform.includes("linux") || platform.includes("x11")) {
    return "linux";
  }

  return null;
}

function DownloadArrowIcon() {
  return (
    <svg aria-hidden="true" className="ml-1.5 inline-block size-[0.95em] align-[-0.12em]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 16 16">
      <path d="M8 2.5v8" />
      <path d="m4.75 7.75 3.25 3.25 3.25-3.25" />
      <path d="M4 13.5h8" />
    </svg>
  );
}
