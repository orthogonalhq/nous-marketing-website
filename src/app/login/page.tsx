import type { Metadata } from "next";
import { HomeThemeShell } from "@/components/home/home-theme-shell";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to Nue."
};

export default function LoginPage() {
  return (
    <HomeThemeShell>
      <section className="relative flex min-h-[640px] items-center justify-center px-4 py-24 sm:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-32 bottom-0 z-0 bg-[image:var(--nous-page-login-radial-bg)] sm:-top-40" />
        <div className="relative z-10 w-full max-w-[420px]">
          <div className="mb-10">
            <h1 className="text-[1.8rem] font-normal leading-tight tracking-[-0.045em] text-[var(--nous-page-hero-title-fg)] sm:text-[2.15rem]">Welcome to Nue.</h1>
            <p className="mt-1 text-[1.45rem] font-normal leading-tight tracking-[-0.045em] text-[var(--nous-fg-quieter)] sm:text-[1.75rem]">AI should give you time back.</p>
          </div>

          <div className="grid gap-3">
            <button className="relative inline-flex h-11 w-full items-center justify-center rounded-[14px] bg-[var(--nous-page-soft-control-bg)] px-4 text-sm font-semibold text-[var(--nous-page-title-fg)] transition hover:bg-white/[0.07]" type="button">
              <span className="absolute left-4 inline-flex size-5 items-center justify-center"><GoogleIcon /></span>
              Continue with Google
            </button>
            <button className="relative inline-flex h-11 w-full items-center justify-center rounded-[14px] bg-[var(--nous-page-soft-control-bg)] px-4 text-sm font-semibold text-[var(--nous-page-title-fg)] transition hover:bg-white/[0.07]" type="button">
              <span className="absolute left-4 inline-flex size-5 items-center justify-center"><GitHubIcon /></span>
              Continue with GitHub
            </button>
            <button className="relative inline-flex h-11 w-full items-center justify-center rounded-[14px] bg-[var(--nous-page-soft-control-bg)] px-4 text-sm font-semibold text-[var(--nous-page-title-fg)] transition hover:bg-white/[0.07]" type="button">
              <span className="absolute left-4 inline-flex size-5 items-center justify-center"><AppleIcon /></span>
              Continue with Apple
            </button>
          </div>

          <form className="mt-6 grid gap-3">
            <label className="grid gap-2 text-sm font-semibold text-[var(--nous-fg-muted)]">
              Email
              <input className="h-12 rounded-[14px] border border-[color:var(--nous-stroke-default)] bg-[var(--nous-page-soft-control-bg)] px-4 text-sm text-[var(--nous-page-title-fg)] outline-none transition placeholder:text-[var(--nous-fg-quieter)] focus:border-[color:var(--nous-page-title-fg)] focus:bg-white/[0.045]" placeholder="Your email address" type="email" />
            </label>
            <button className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-[14px] bg-[var(--nous-page-soft-control-bg)] px-4 text-sm font-semibold text-[var(--nous-page-title-fg)] transition hover:bg-white/[0.07]" type="button">
              Continue
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[var(--nous-page-title-fg)]">
            Don&apos;t have an account? <a className="text-[var(--nous-fg-muted)] transition hover:text-[var(--nous-page-title-fg)]" href="/download#waitlist">Sign up</a>
          </p>
        </div>
      </section>
    </HomeThemeShell>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24">
      <path d="M21.6 12.23c0-.74-.07-1.45-.19-2.13H12v4.03h5.38a4.6 4.6 0 0 1-1.99 3.02v2.51h3.23c1.89-1.74 2.98-4.3 2.98-7.43Z" fill="#4285F4" />
      <path d="M12 22c2.7 0 4.96-.89 6.62-2.34l-3.23-2.51c-.9.6-2.04.95-3.39.95-2.6 0-4.8-1.76-5.59-4.12H3.08v2.59A10 10 0 0 0 12 22Z" fill="#34A853" />
      <path d="M6.41 13.98A6.01 6.01 0 0 1 6.09 12c0-.69.12-1.35.32-1.98V7.43H3.08A10 10 0 0 0 2 12c0 1.61.39 3.13 1.08 4.57l3.33-2.59Z" fill="#FBBC05" />
      <path d="M12 5.9c1.47 0 2.79.51 3.83 1.5l2.86-2.86C16.96 2.93 14.7 2 12 2a10 10 0 0 0-8.92 5.43l3.33 2.59C7.2 7.66 9.4 5.9 12 5.9Z" fill="#EA4335" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.18-3.37-1.18-.46-1.16-1.12-1.47-1.12-1.47-.91-.63.07-.62.07-.62 1.01.07 1.54 1.04 1.54 1.04.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.99c.85 0 1.7.11 2.5.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86l-.01 2.59c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16.46 12.65c-.02-2.08 1.7-3.08 1.78-3.13-1-.14-1.56-1.07-2.94-1.18-1.24-.13-2.42.73-3.05.73-.64 0-1.62-.71-2.66-.69-1.37.02-2.64.8-3.34 2.03-1.43 2.48-.37 6.14 1.03 8.15.68.98 1.49 2.09 2.55 2.05 1.02-.04 1.41-.66 2.65-.66 1.23 0 1.58.66 2.66.64 1.1-.02 1.79-1 2.46-1.99.78-1.14 1.1-2.24 1.12-2.3-.03-.01-2.14-.82-2.16-3.65ZM14.49 7.04c.56-.68.94-1.63.84-2.58-.81.03-1.8.54-2.38 1.22-.52.6-.98 1.57-.86 2.49.91.07 1.84-.46 2.4-1.13Z" />
    </svg>
  );
}
