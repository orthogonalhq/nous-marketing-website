"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { WaitlistForm } from "@/components/marketing/waitlist-form";
import { cn } from "@/lib/cn";

type DownloadOs = "linux" | "macos" | "windows";

const platforms = {
  macos: {
    icon: AppleIcon,
    label: "macOS",
    primary: "Join macOS waitlist",
    requirements: "Signed macOS installers are planned for Apple Silicon and Intel Macs once binary releases open.",
    secondary: "Inspect source",
    secondaryHref: "https://github.com/orthogonalhq/nous-core"
  },
  windows: {
    icon: WindowsIcon,
    label: "Windows",
    primary: "Join Windows waitlist",
    requirements: "Windows installers are planned for x64 and ARM64 targets once binary releases open.",
    secondary: "Inspect source",
    secondaryHref: "https://github.com/orthogonalhq/nous-core"
  },
  linux: {
    icon: LinuxIcon,
    label: "Linux",
    primary: "Join Linux waitlist",
    requirements: "Linux packages are planned for x64 and ARM64 targets once binary releases open.",
    secondary: "Inspect source",
    secondaryHref: "https://github.com/orthogonalhq/nous-core"
  }
} satisfies Record<DownloadOs, Platform>;

type Platform = {
  icon: (props: { className?: string }) => ReactNode;
  label: string;
  primary: string;
  requirements: string;
  secondary: string;
  secondaryHref: string;
};

const platformOrder: DownloadOs[] = ["macos", "windows", "linux"];
const eyebrowClass = "nous-mono text-[0.625rem] uppercase tracking-[0.08em] text-[var(--nous-page-preheader-fg)]";
const sectionTitleClass = "text-balance text-[1.85rem] font-normal leading-[1.05] tracking-[-0.04em] text-[var(--nous-page-title-fg)] sm:text-[2.45rem]";

export function DownloadPage() {
  const [detectedOs, setDetectedOs] = useState<DownloadOs | null>(null);
  const [waitlistPlatform, setWaitlistPlatform] = useState<DownloadOs | "unknown" | null>(null);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      const initialOs = getInitialOs();
      setDetectedOs(initialOs);

      if (window.location.hash === "#waitlist") {
        setWaitlistPlatform(initialOs ?? "unknown");
      }
    });

    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (waitlistPlatform === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [waitlistPlatform]);

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
                The Nue Personal Agent OS app is available for macOS, Windows, and Linux. Choose your platform to get the right early access path.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button className="inline-flex h-10 items-center rounded-full border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-soft-control-bg)] px-4 text-sm font-medium text-[var(--nous-fg-title)] transition hover:border-white/[0.08] hover:bg-white/[0.06]" onClick={() => setWaitlistPlatform(detectedOs ?? "unknown")} type="button">
                  Join early access
                </button>
                <a className="inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-[var(--nous-fg-muted)] transition hover:bg-white/[0.04] hover:text-[var(--nous-fg-title)]" href="#platform-downloads">
                  Choose a platform
                </a>
              </div>
            </div>
            <div className="rounded-[var(--nous-radius-xl)] border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-card-bg)] p-5 shadow-[var(--nous-shadow-card)]">
              <p className={eyebrowClass}>EARLY ACCESS</p>
              <p className="mt-3 text-sm leading-6 text-[var(--nous-page-body-fg)]">
                Nue is open source and local-first, with platform-specific early access for desktop setup, source inspection, docs, and release tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-page-section-band-bg)] py-14 sm:py-16" id="platform-downloads">
        <div className="reading-container [--reading-container-max:1180px]">
          <h2 className={sectionTitleClass}>Available for macOS, Windows, and Linux.</h2>
          <div className="mt-8 grid gap-0 overflow-hidden rounded-[var(--nous-radius-xl)] border border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-page-card-bg)] shadow-[var(--nous-shadow-card)] lg:grid-cols-3">
            {platformOrder.map((os, index) => (
              <PlatformDownloadColumn detected={detectedOs === os} isLast={index === platformOrder.length - 1} key={os} onJoinWaitlist={() => setWaitlistPlatform(os)} platform={platforms[os]} />
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
              Desktop will be the fastest path for everyday use once signed builds are available. Developers and maintainers can inspect the source, follow setup docs, and track releases from GitHub today.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <InstallOption href="https://github.com/orthogonalhq/nous-core" label="Source" text="Clone the repository and inspect the implementation." />
            <InstallOption href="https://docs.nue.orthg.nl" label="Docs" text="Follow setup notes, concepts, and configuration guidance." />
            <InstallOption href="https://github.com/orthogonalhq/nous-core/releases" label="Releases" text="Review release notes, checksums, and build artifacts." />
          </div>
        </div>
      </section>

      {waitlistPlatform ? <WaitlistLightbox onClose={() => setWaitlistPlatform(null)} platform={waitlistPlatform} /> : null}
    </>
  );
}

function PlatformDownloadColumn({ detected, isLast, onJoinWaitlist, platform }: { detected: boolean; isLast: boolean; onJoinWaitlist: () => void; platform: Platform }) {
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
        <button className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--nous-page-title-fg)] px-4 text-sm font-medium text-[var(--nous-page-bg)] transition hover:opacity-90" onClick={onJoinWaitlist} type="button">
          {platform.primary}
        </button>
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

function WaitlistLightbox({ onClose, platform }: { onClose: () => void; platform: DownloadOs | "unknown" }) {
  const [selectedPlatform, setSelectedPlatform] = useState<DownloadOs | "unknown">(platform);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const platformLabel = selectedPlatform === "unknown" ? "your platform" : platforms[selectedPlatform].label;
  const PlatformIcon = selectedPlatform === "unknown" ? SparkIcon : platforms[selectedPlatform].icon;

  return (
    <div aria-labelledby="waitlist-dialog-title" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/65 px-4 py-6 backdrop-blur-md sm:py-10" role="dialog">
      <button aria-label="Close waitlist backdrop" className="absolute inset-0 cursor-default" onClick={onClose} tabIndex={-1} type="button" />
      <div className="relative w-full max-w-xl rounded-[24px] border border-[color:var(--nous-stroke-default)] bg-[var(--nous-page-bg)] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.58)] sm:p-7">
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0 max-w-md">
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-soft-control-bg)] px-3 py-1.5 text-xs font-medium text-[var(--nous-fg-muted)]">
                <PlatformIcon className="size-3.5 text-[var(--nous-page-title-fg)]" />
                {platformLabel === "your platform" ? "Early access" : `${platformLabel} early access`}
              </div>
              <h2 className="mt-5 text-balance text-[2rem] font-normal leading-[1.02] tracking-[-0.05em] text-[var(--nous-page-hero-title-fg)] sm:text-[2.55rem]" id="waitlist-dialog-title">
                Get notified for {platformLabel}.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[var(--nous-page-body-fg)]">
                Pick a platform and leave your email. We’ll send one note when the right installer or setup path is available.
              </p>
            </div>
            <button className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-soft-control-bg)] text-[var(--nous-fg-muted)] transition hover:border-[color:var(--nous-stroke-default)] hover:bg-white/[0.06] hover:text-[var(--nous-fg-title)]" onClick={onClose} type="button">
              <span className="sr-only">Close waitlist form</span>
              <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <WaitlistForm className="mt-6" defaultPlatform={platform} onPlatformChange={setSelectedPlatform} platform={selectedPlatform} source="download-page" variant="modal" />
      </div>
    </div>
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

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M12 3.5 13.8 9l5.7 1.7-5.7 1.8L12 18l-1.8-5.5-5.7-1.8L10.2 9 12 3.5Z" />
      <path d="m18.5 16 .7 2.2 2.3.8-2.3.7-.7 2.3-.8-2.3-2.2-.7 2.2-.8.8-2.2Z" />
    </svg>
  );
}
