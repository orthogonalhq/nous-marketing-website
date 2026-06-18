"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { DownloadCtaLink } from "@/components/marketing/download-cta-link";
import { cn } from "@/lib/cn";

type DownloadOs = "linux" | "macos" | "windows";

const platforms = {
  macos: {
    icon: AppleIcon,
    label: "macOS",
    primary: "Download for Apple Silicon",
    primaryHref: "/download?os=macos&arch=apple-silicon",
    requirements: "macOS 13 or later. Apple Silicon recommended. Intel builds are available for older supported Macs.",
    secondary: "Download for Intel",
    secondaryHref: "/download?os=macos&arch=intel"
  },
  windows: {
    icon: WindowsIcon,
    label: "Windows",
    primary: "Download for x64",
    primaryHref: "/download?os=windows&arch=x64",
    requirements: "Windows 10 or later, 64-bit. ARM64 builds are available for supported Windows on Arm devices.",
    secondary: "Download for ARM64",
    secondaryHref: "/download?os=windows&arch=arm64"
  },
  linux: {
    icon: LinuxIcon,
    label: "Linux",
    primary: "Download for x64",
    primaryHref: "/download?os=linux&arch=x64",
    requirements: "glibc 2.28 or later. Tested targets include Ubuntu 20.04+, Debian 10+, Fedora 36+, and RHEL 8+.",
    secondary: "Download for ARM64",
    secondaryHref: "/download?os=linux&arch=arm64"
  }
} satisfies Record<DownloadOs, Platform>;

type Platform = {
  icon: (props: { className?: string }) => ReactNode;
  label: string;
  primary: string;
  primaryHref: string;
  requirements: string;
  secondary: string;
  secondaryHref: string;
};

const platformOrder: DownloadOs[] = ["macos", "windows", "linux"];
const eyebrowClass = "nous-mono text-[0.625rem] uppercase tracking-[0.08em] text-[var(--nous-page-preheader-fg)]";
const sectionTitleClass = "text-balance text-[1.85rem] font-normal leading-[1.05] tracking-[-0.04em] text-[var(--nous-page-title-fg)] sm:text-[2.45rem]";

export function DownloadPage() {
  const [detectedOs, setDetectedOs] = useState<DownloadOs | null>(null);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setDetectedOs(getInitialOs()));

    return () => window.cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-14 sm:pb-16 sm:pt-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[image:var(--nous-page-hero-bottom-light-bg)]" />
        <div className="reading-container relative z-10 [--reading-container-max:1180px]">
          <p className={eyebrowClass}>DOWNLOAD</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-balance text-[2.7rem] font-normal leading-[0.98] tracking-[-0.055em] text-[var(--nous-page-hero-title-fg)] sm:text-[3.6rem] lg:text-[4.6rem]">
                Download Nue.
              </h1>
              <p className="mt-6 max-w-2xl text-balance text-[1.0625rem] leading-7 text-[var(--nous-page-body-fg)] sm:text-lg sm:leading-8">
                Get the early access desktop app for your operating system. Choose your platform and architecture below.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <DownloadCtaLink />
                <a className="inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-[var(--nous-fg-muted)] transition hover:bg-white/[0.04] hover:text-[var(--nous-fg-title)]" href="#platform-downloads">
                  Choose another build
                </a>
              </div>
            </div>
            <div className="rounded-[var(--nous-radius-xl)] border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-card-bg)] p-5 shadow-[var(--nous-shadow-card)]">
              <p className={eyebrowClass}>EARLY ACCESS</p>
              <p className="mt-3 text-sm leading-6 text-[var(--nous-page-body-fg)]">
                Nue is open source and local-first. If you want source, docs, or release notes instead of an installer, use the links below.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-page-section-band-bg)] py-14 sm:py-16" id="platform-downloads">
        <div className="reading-container [--reading-container-max:1180px]">
          <h2 className={sectionTitleClass}>Nue early access</h2>
          <div className="mt-8 grid gap-0 overflow-hidden rounded-[var(--nous-radius-xl)] border border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-page-card-bg)] shadow-[var(--nous-shadow-card)] lg:grid-cols-3">
            {platformOrder.map((os, index) => (
              <PlatformDownloadColumn detected={detectedOs === os} isLast={index === platformOrder.length - 1} key={os} platform={platforms[os]} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="reading-container grid gap-10 [--reading-container-max:1180px] lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className={eyebrowClass}>INSTALL ANOTHER WAY</p>
            <h2 className={cn(sectionTitleClass, "mt-3")}>Source, docs, and release details.</h2>
            <p className="mt-5 text-base leading-7 text-[var(--nous-page-body-fg)]">
              Desktop is the fastest path for everyday use. Developers and maintainers can inspect the source, follow setup docs, and track releases from GitHub.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <InstallOption href="https://github.com/orthogonalhq/nous-core" label="Source" text="Clone the repository and inspect the implementation." />
            <InstallOption href="https://docs.nue.orthg.nl" label="Docs" text="Follow setup notes, concepts, and configuration guidance." />
            <InstallOption href="https://github.com/orthogonalhq/nous-core/releases" label="Releases" text="Review release notes, checksums, and build artifacts." />
          </div>
        </div>
      </section>
    </>
  );
}

function PlatformDownloadColumn({ detected, isLast, platform }: { detected: boolean; isLast: boolean; platform: Platform }) {
  const Icon = platform.icon;

  return (
    <article className={cn("flex min-h-[380px] flex-col p-5 sm:p-6", !isLast && "border-b border-[color:var(--nous-stroke-subtle)] lg:border-b-0 lg:border-r", detected && "bg-[var(--nous-bg-selected-subtle)]")}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Icon className="size-5 text-[var(--nous-page-title-fg)]" />
          <h3 className="text-xl font-normal tracking-[-0.035em] text-[var(--nous-page-title-fg)]">{platform.label}</h3>
        </div>
        {detected ? <span className="rounded-full bg-[var(--nous-accent-info-bg)] px-2.5 py-1 text-xs font-medium text-[var(--nous-accent-info-fg)]">Detected</span> : null}
      </div>

      <div className="mt-5 grid gap-3">
        <a className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--nous-page-title-fg)] px-4 text-sm font-medium text-[var(--nous-page-bg)] transition hover:opacity-90" href={platform.primaryHref}>
          {platform.primary}
        </a>
        <a className="inline-flex h-12 items-center justify-center rounded-full border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-soft-control-bg)] px-4 text-sm font-medium text-[var(--nous-fg-title)] transition hover:border-[color:var(--nous-stroke-default)] hover:bg-[var(--nous-bg-control)]" href={platform.secondaryHref}>
          {platform.secondary}
        </a>
      </div>

      <div className="mt-auto pt-14">
        <p className="text-sm font-medium text-[var(--nous-page-title-fg)]">Minimum requirements</p>
        <p className="mt-2 text-sm leading-6 text-[var(--nous-page-body-fg)]">{platform.requirements}</p>
      </div>
    </article>
  );
}

function InstallOption({ href, label, text }: { href: string; label: string; text: string }) {
  return (
    <a className="rounded-[var(--nous-radius-xl)] border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-card-bg)] p-5 shadow-[var(--nous-shadow-card)] transition hover:border-[color:var(--nous-stroke-default)] hover:bg-white/[0.035]" href={href} rel="noreferrer" target="_blank">
      <h3 className="text-lg font-normal tracking-[-0.03em] text-[var(--nous-page-title-fg)]">{label}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--nous-fg-muted)]">{text}</p>
    </a>
  );
}

function getInitialOs(): DownloadOs | null {
  const searchParams = new URLSearchParams(window.location.search);
  const requestedOs = searchParams.get("os");

  if (requestedOs === "windows" || requestedOs === "macos" || requestedOs === "linux") {
    return requestedOs;
  }

  return detectDownloadOs();
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

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M16.37 1.43c0 1.08-.42 2.08-1.14 2.88-.78.86-2.08 1.52-3.16 1.43-.14-1.04.4-2.14 1.12-2.91.8-.86 2.2-1.5 3.18-1.4ZM20.8 17.4c-.54 1.24-.8 1.8-1.5 2.9-.98 1.5-2.36 3.36-4.08 3.38-1.52.02-1.92-.98-4-.96-2.08.01-2.52.98-4.04.96-1.72-.02-3.04-1.7-4.02-3.2-2.75-4.2-3.04-9.14-1.34-11.76 1.2-1.86 3.1-2.94 4.88-2.94 1.82 0 2.96.99 4.46.99 1.46 0 2.34-.99 4.44-.99 1.58 0 3.26.86 4.46 2.34-3.92 2.15-3.28 7.75.74 9.28Z" />
    </svg>
  );
}

function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 5.4 11 4.3v7.4H3V5.4Zm9-1.25 9-1.25v8.8h-9V4.15ZM3 12.7h8v7.45L3 19.05V12.7Zm9 0h9v8.8l-9-1.25V12.7Z" />
    </svg>
  );
}

function LinuxIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24">
      <path d="M12 3.2c-2 0-3.25 1.7-3.25 4.25 0 1.5-.5 2.7-1.25 3.95-.75 1.25-1.4 2.58-1.4 4.55 0 3.05 2.35 4.85 5.9 4.85s5.9-1.8 5.9-4.85c0-1.97-.65-3.3-1.4-4.55-.75-1.25-1.25-2.45-1.25-3.95 0-2.55-1.25-4.25-3.25-4.25Z" />
      <path d="M10.2 8.1h.01M13.8 8.1h.01M9.2 16.6c.85.55 1.75.8 2.8.8s1.95-.25 2.8-.8" />
    </svg>
  );
}
