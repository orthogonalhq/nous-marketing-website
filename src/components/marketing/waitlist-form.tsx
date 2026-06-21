"use client";

import { useCallback, useId, useState } from "react";
import { PrimaryCtaButton } from "@/components/marketing/primary-cta-link";
import { cn } from "@/lib/cn";

type WaitlistStatus = "idle" | "loading" | "success" | "duplicate" | "error";
type WaitlistPlatform = "linux" | "macos" | "unknown" | "windows";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const platformOptions = [
  { label: "macOS", value: "macos" },
  { label: "Windows", value: "windows" },
  { label: "Linux", value: "linux" }
] satisfies Array<{ label: string; value: WaitlistPlatform }>;

export function WaitlistForm({ buttonText = "Join early access", className, defaultPlatform = "unknown", onPlatformChange, platform: controlledPlatform, source = "website", variant = "card" }: { buttonText?: string; className?: string; defaultPlatform?: WaitlistPlatform; onPlatformChange?: (platform: WaitlistPlatform) => void; platform?: WaitlistPlatform; source?: string; variant?: "card" | "modal" }) {
  const emailId = useId();
  const platformId = useId();
  const statusId = useId();
  const [email, setEmail] = useState("");
  const [uncontrolledPlatform, setUncontrolledPlatform] = useState<WaitlistPlatform>(defaultPlatform);
  const [status, setStatus] = useState<WaitlistStatus>("idle");
  const [message, setMessage] = useState("No spam. One email when your early access path is ready.");
  const isLoading = status === "loading";
  const isModal = variant === "modal";
  const platform = controlledPlatform ?? uncontrolledPlatform;

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setStatus("error");
      setMessage("Email is required.");
      return;
    }

    if (!emailPattern.test(trimmedEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("Adding you to the waitlist...");

    try {
      const response = await fetch("/api/waitlist", {
        body: JSON.stringify({ email: trimmedEmail, platform, source }),
        headers: { "Content-Type": "application/json" },
        method: "POST"
      });
      const data = (await response.json()) as { error?: string; message?: string };

      if (response.ok) {
        setEmail("");
        setStatus("success");
        setMessage(data.message ?? "You're on the list.");
        return;
      }

      if (response.status === 409) {
        setStatus("duplicate");
        setMessage(data.error ?? "You're already on the list.");
        return;
      }

      setStatus("error");
      setMessage(data.error ?? "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }, [email, platform, source]);

  function updatePlatform(nextPlatform: WaitlistPlatform) {
    setUncontrolledPlatform(nextPlatform);
    onPlatformChange?.(nextPlatform);
  }

  return (
    <form aria-describedby={statusId} className={cn("w-full", !isModal && "max-w-2xl rounded-[calc(var(--nous-radius-xl)+4px)] border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-card-bg)] p-2 shadow-[var(--nous-shadow-card)]", isModal && "grid gap-5", className)} onSubmit={handleSubmit}>
      {isModal ? (
        <div>
          <label className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--nous-fg-muted)]" id={platformId}>Choose your platform</label>
          <div aria-labelledby={platformId} className="mt-3 grid grid-cols-3 gap-2" role="group">
            {platformOptions.map((option) => (
              <button
                aria-pressed={platform === option.value}
                className={cn(
                  "h-11 rounded-full border px-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
                  platform === option.value
                    ? "border-[color:var(--nous-stroke-emphasis)] bg-[var(--nous-page-title-fg)] text-[var(--nous-page-bg)] shadow-[0_0_34px_rgba(111,140,255,0.16)]"
                    : "border-[color:var(--nous-stroke-soft)] bg-white/[0.035] text-[var(--nous-fg-muted)] hover:border-[color:var(--nous-stroke-default)] hover:bg-white/[0.055] hover:text-[var(--nous-fg-title)]"
                )}
                disabled={isLoading}
                key={option.value}
                onClick={() => updatePlatform(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className={cn("grid gap-2", isModal ? "sm:grid-cols-[1fr_auto] sm:items-center" : "sm:grid-cols-[1fr_150px_auto] sm:items-center")}>
        <label className="sr-only" htmlFor={emailId}>Email address</label>
        <input
          autoComplete="email"
          className="h-12 min-w-0 rounded-full border border-transparent bg-white/[0.035] px-4 text-sm text-[var(--nous-page-title-fg)] outline-none placeholder:text-[var(--nous-fg-quieter)] transition focus:border-[color:var(--nous-stroke-default)] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isLoading}
          id={emailId}
          inputMode="email"
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle" && status !== "loading") {
              setStatus("idle");
              setMessage("No spam. One email when your early access path is ready.");
            }
          }}
          placeholder="you@example.com"
          type="email"
          value={email}
        />
        {!isModal ? (
          <>
            <label className="sr-only" htmlFor={platformId}>Platform</label>
            <select
              className="h-12 rounded-full border border-transparent bg-white/[0.035] px-4 text-sm text-[var(--nous-page-title-fg)] outline-none transition focus:border-[color:var(--nous-stroke-default)] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoading}
              id={platformId}
              onChange={(event) => updatePlatform(event.target.value as WaitlistPlatform)}
              value={platform}
            >
              <option value="unknown">Platform</option>
              <option value="macos">macOS</option>
              <option value="windows">Windows</option>
              <option value="linux">Linux</option>
            </select>
          </>
        ) : null}
        <PrimaryCtaButton aria-label={buttonText} disabled={isLoading} type="submit">
          {isLoading ? "Joining..." : buttonText}
        </PrimaryCtaButton>
      </div>
      <p
        aria-live="polite"
        className={cn(
          "px-3 pt-3 text-xs leading-5",
          status === "success" && "text-emerald-300/90",
          status === "duplicate" && "text-sky-300/90",
          status === "error" && "text-rose-300/90",
          (status === "idle" || status === "loading") && "text-[var(--nous-fg-muted)]"
        )}
        id={statusId}
      >
        {message}
      </p>
    </form>
  );
}
