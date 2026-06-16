"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { NueLogoMark, NueWordmark } from "@/components/marketing/nous-logo";
import { homeCopy } from "@/content/home-copy";

type AppliedMarketingTheme = "dark" | "light" | "rust";
type MarketingTheme = "system" | AppliedMarketingTheme;

const megaMenuWidthFallback = 856;

const navLinkClass = cn(
    "hidden rounded-full px-1.5 py-1 transition sm:inline",
    "hover:bg-[var(--nous-page-soft-control-bg)] hover:text-[var(--nous-fg-title)]"
);

const primaryNavActionClass = cn(
    "inline-flex h-8 items-center rounded-full border border-[color:var(--nous-stroke-soft)] px-3 text-sm font-medium transition",
    "bg-[var(--nous-page-soft-control-bg)] text-[var(--nous-fg-title)] hover:border-white/[0.08] hover:bg-white/[0.06]"
);

const themes = homeCopy.themes satisfies ReadonlyArray<{ label: string; value: MarketingTheme }>;

export function HomeThemeShell({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<MarketingTheme>("system");
    const [systemTheme, setSystemTheme] = useState<AppliedMarketingTheme>("dark");
    const appliedTheme = theme === "system" ? systemTheme : theme;

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
        const updateSystemTheme = () => setSystemTheme(mediaQuery.matches ? "light" : "dark");

        updateSystemTheme();
        mediaQuery.addEventListener("change", updateSystemTheme);

        return () => mediaQuery.removeEventListener("change", updateSystemTheme);
    }, []);

    return (
        <div
            className="nous-design-system nous-marketing-shell relative min-h-screen overflow-hidden text-[var(--nous-page-fg)]"
            data-nous-theme={appliedTheme}
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[var(--nous-page-bg)]" data-bg-layer="page-background-root">
                <div className="absolute inset-0 bg-[image:var(--nous-texture-noise-page)] bg-[length:640px_640px] [mix-blend-mode:var(--nous-page-grain-blend-mode)] [opacity:var(--nous-page-grain-opacity)]" data-bg-layer="page-grain-texture" />
                <div className="absolute inset-0 bg-[image:var(--nous-page-vignette-bg)]" data-bg-layer="page-edge-vignette" />
            </div>
            <div className="relative z-10">
                <SiteHeader />
                <main>{children}</main>
                <SiteFooter onThemeChange={setTheme} theme={theme} />
            </div>
        </div>
    );
}

function SiteHeader() {
    return (
        <header className="reading-container flex items-center justify-between py-5">
            <a className="flex items-center gap-2.5 text-white" href="#top" aria-label={homeCopy.navigation.homeAriaLabel}>
                <span className="grid size-9 place-items-center">
                    <NueLogoMark className="h-[1.75rem] w-[1.7rem]" />
                </span>
                <NueWordmark />
            </a>
            <nav className="flex items-center gap-3 text-sm text-[var(--nous-fg-muted)] sm:gap-6" aria-label={homeCopy.navigation.primaryAriaLabel}>
                <ProductMenu />
                <ResourcesMenu />
                <a className={navLinkClass} href="/pricing">{homeCopy.navigation.links.pricing}</a>
                <span className="hidden h-4 w-px bg-[var(--nous-stroke-default)] sm:inline-block" aria-hidden="true" />
                <div className="flex items-center gap-2">
                    <a
                        aria-label={homeCopy.navigation.githubAriaLabel}
                        className="group flex size-8 items-center justify-center rounded-full border border-transparent bg-white/[0.04] p-1 transition hover:border-white/[0.04]"
                        href={homeCopy.navigation.githubHref}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <svg aria-hidden="true" className="size-5 text-[var(--nous-fg-muted)] transition-colors group-hover:text-[rgba(255,255,255,0.92)]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                clipRule="evenodd"
                                d="M12 2C6.477 2 2 6.586 2 12.244c0 4.526 2.865 8.363 6.839 9.718.5.095.683-.222.683-.493 0-.243-.009-.888-.014-1.743-2.782.619-3.369-1.374-3.369-1.374-.455-1.184-1.11-1.5-1.11-1.5-.908-.636.069-.623.069-.623 1.004.073 1.532 1.056 1.532 1.056.892 1.566 2.341 1.114 2.91.852.091-.662.35-1.114.636-1.37-2.221-.259-4.555-1.138-4.555-5.064 0-1.119.39-2.034 1.03-2.75-.103-.258-.446-1.302.098-2.713 0 0 .84-.276 2.75 1.05A9.36 9.36 0 0 1 12 6.94a9.36 9.36 0 0 1 2.504.346c1.909-1.326 2.747-1.05 2.747-1.05.546 1.411.203 2.455.1 2.713.64.716 1.028 1.631 1.028 2.75 0 3.936-2.337 4.802-4.566 5.056.359.317.679.943.679 1.9 0 1.37-.013 2.475-.013 2.812 0 .274.18.593.688.492C19.138 20.604 22 16.768 22 12.244 22 6.586 17.523 2 12 2Z"
                                fillRule="evenodd"
                            />
                        </svg>
                    </a>
                    <a className={navLinkClass} href="/login">{homeCopy.navigation.links.login}</a>
                    <a className={primaryNavActionClass} href="/signup">{homeCopy.navigation.links.getStarted}</a>
                </div>
            </nav>
        </header>
    );
}

function SiteFooter({ onThemeChange, theme }: { onThemeChange: (theme: MarketingTheme) => void; theme: MarketingTheme }) {
    return (
        <footer className="reading-container border-t border-[color:var(--nous-stroke-subtle)] py-12 text-sm text-[var(--nous-fg-muted)] sm:py-14">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_1.45fr] lg:gap-14">
                <div className="max-w-md">
                    <a className="inline-flex items-center gap-2.5 text-white" href="#top" aria-label={homeCopy.navigation.homeAriaLabel}>
                        <span className="grid size-9 place-items-center">
                            <NueLogoMark className="h-[1.75rem] w-[1.7rem]" />
                        </span>
                        <NueWordmark />
                    </a>
                    <p className="mt-5 text-balance text-base leading-7 text-[var(--nous-page-body-fg)]">
                        <span className="font-medium text-[var(--nous-page-title-fg)]">{homeCopy.footer.taglineLead}</span>{" "}
                        {homeCopy.footer.taglineBody}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                        {homeCopy.footer.ctas.map((cta) => (
                            <FooterCtaLink cta={cta} key={cta.label} />
                        ))}
                    </div>
                </div>

                <nav aria-label={homeCopy.footer.ariaLabel} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {homeCopy.footer.columns.map((column) => (
                        <FooterLinkColumn column={column} key={column.label} />
                    ))}
                </nav>
            </div>

            <div className="mt-10 flex flex-col gap-5 border-t border-[color:var(--nous-stroke-subtle)] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--nous-fg-quieter)]">
                    <span>{homeCopy.footer.copyright}</span>
                    {homeCopy.footer.bottomLinks.map((link) => (
                        <a className="transition hover:text-[var(--nous-fg-title)]" href={link.href} key={link.label}>
                            {link.label}
                        </a>
                    ))}
                </div>
                <FooterThemeSwitcher onThemeChange={onThemeChange} theme={theme} />
            </div>
        </footer>
    );
}

function FooterCtaLink({ cta }: { cta: (typeof homeCopy.footer.ctas)[number] }) {
    const isPrimary = cta.variant === "primary";
    const isExternal = "external" in cta && cta.external;

    return (
        <a
            className={cn(
                "inline-flex h-9 items-center rounded-full border px-3.5 text-sm font-medium transition",
                isPrimary
                    ? "border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-soft-control-bg)] text-[var(--nous-fg-title)] hover:border-white/[0.08] hover:bg-white/[0.06]"
                    : "border-transparent text-[var(--nous-fg-muted)] hover:bg-white/[0.04] hover:text-[var(--nous-fg-title)]"
            )}
            href={cta.href}
            rel={isExternal ? "noreferrer" : undefined}
            target={isExternal ? "_blank" : undefined}
        >
            {cta.label}
        </a>
    );
}

function FooterLinkColumn({ column }: { column: (typeof homeCopy.footer.columns)[number] }) {
    return (
        <section>
            <h2 className="nous-mono text-[0.625rem] uppercase tracking-[0.08em] text-[var(--nous-fg-quieter)]">
                {column.label}
            </h2>
            <ul className="mt-4 grid gap-3">
                {column.links.map((link) => (
                    <FooterLinkItem key={link.label} link={link} />
                ))}
            </ul>
        </section>
    );
}

function FooterLinkItem({ link }: { link: (typeof homeCopy.footer.columns)[number]["links"][number] }) {
    const isExternal = "external" in link && link.external;

    return (
        <li>
            <a
                className="text-sm text-[var(--nous-fg-muted)] transition hover:text-[var(--nous-fg-title)]"
                href={link.href}
                rel={isExternal ? "noreferrer" : undefined}
                target={isExternal ? "_blank" : undefined}
            >
                {link.label}
            </a>
        </li>
    );
}

function FooterThemeSwitcher({ onThemeChange, theme }: { onThemeChange: (theme: MarketingTheme) => void; theme: MarketingTheme }) {
    return (
        <div className="flex items-center gap-2" role="group" aria-label={homeCopy.themeMenu.themeOptionsAriaLabel}>
            <span className="nous-mono text-[0.625rem] uppercase tracking-[0.08em] text-[var(--nous-fg-quieter)]">
                {homeCopy.footer.themeLabel}
            </span>
            <div className="flex rounded-full border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-soft-control-bg)] p-0.5">
                {themes.map(({ label, value }) => (
                    <button
                        aria-label={`${homeCopy.themeMenu.optionAriaLabelPrefix} ${label} ${homeCopy.themeMenu.optionAriaLabelSuffix}`}
                        aria-pressed={theme === value}
                        className={cn(
                            "rounded-full px-2.5 py-1 text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nous-accent-info)]",
                            theme === value
                                ? "bg-[var(--nous-bg-control-active)] text-[var(--nous-fg-title)]"
                                : "text-[var(--nous-fg-muted)] hover:bg-white/[0.04] hover:text-[var(--nous-fg-title)]"
                        )}
                        key={value}
                        onClick={() => onThemeChange(value)}
                        type="button"
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}

function ProductMenu() {
    const { clampX, rootRef, updateClamp } = useMenuClamp();

    return (
        <div className="group relative hidden sm:block" onFocusCapture={updateClamp} onPointerEnter={updateClamp} ref={rootRef}>
            <MenuTrigger label={homeCopy.navigation.productLabel} />
            <MegaMenuViewport clampX={clampX}>
                <div className="grid grid-cols-[repeat(3,256px)] gap-x-6 p-3">
                    {homeCopy.navigation.productPrimaryLinks.map((link, index) => (
                        <MegaMenuLink hasSeparator={index % 3 !== 2} href={link.href} key={link.href} label={link.label} description={link.description} />
                    ))}
                </div>
                <div className="relative z-10 flex items-center justify-between border-t border-[color:var(--nous-stroke-subtle)] px-4 pb-3 pt-4">
                    <a className="min-w-0 max-w-[80%] rounded-[var(--nous-radius-md)] px-3 py-2 text-sm text-[var(--nous-fg-muted)] transition hover:bg-white/[0.07] hover:text-[var(--nous-fg-title)]" href={homeCopy.navigation.productFooter.href}>
                        <span className="font-medium text-[var(--nous-fg-title)]">{homeCopy.navigation.productFooter.label}</span>
                    </a>
                    <a className="rounded-[var(--nous-radius-md)] px-3 py-2 text-sm font-medium text-[var(--nous-accent-info-fg)] transition hover:bg-[var(--nous-accent-info-bg)]" href={homeCopy.navigation.productFooter.href}>
                        {homeCopy.navigation.productFooter.cta}
                    </a>
                </div>
            </MegaMenuViewport>
        </div>
    );
}

function ResourcesMenu() {
    const { clampX, rootRef, updateClamp } = useMenuClamp();

    return (
        <div className="group relative hidden sm:block" onFocusCapture={updateClamp} onPointerEnter={updateClamp} ref={rootRef}>
            <MenuTrigger label={homeCopy.navigation.resourcesLabel} />
            <MegaMenuViewport clampX={clampX}>
                <div className="grid grid-cols-[1.08fr_1fr_1fr] gap-x-3 p-3">
                    {homeCopy.navigation.resourceSections.map((section) => (
                        <ResourceMenuSection key={section.label} section={section} />
                    ))}
                </div>
            </MegaMenuViewport>
        </div>
    );
}

function ResourceMenuSection({ section }: { section: (typeof homeCopy.navigation.resourceSections)[number] }) {
    const isFeatured = section.variant === "featured";

    return (
        <section
            className={cn(
                "relative z-10 rounded-[var(--nous-radius-md)] p-2",
                isFeatured && "border border-[color:var(--nous-stroke-subtle)] bg-white/[0.025]"
            )}
        >
            <h3 className="px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-[0.08em] text-[var(--nous-fg-quieter)]">
                {section.label}
            </h3>
            <div className="grid gap-1">
                {section.links.map((link) => (
                    <MegaMenuLink description={link.description} hasSeparator={false} href={link.href} key={link.href} label={link.label} />
                ))}
            </div>
        </section>
    );
}

function MenuTrigger({ label }: { label: string }) {
    return (
        <button
            className={cn(
                "flex items-center gap-1 rounded-full px-1.5 py-1 text-sm text-[var(--nous-fg-muted)] transition",
                "hover:bg-[var(--nous-page-soft-control-bg)] hover:text-[var(--nous-fg-title)]",
                "group-focus-within:bg-[var(--nous-page-soft-control-bg)] group-focus-within:text-[var(--nous-fg-title)]"
            )}
            type="button"
        >
            {label}
            <span className="inline-flex h-2 w-2.5 items-center justify-center text-[var(--nous-fg-quieter)] transition group-hover:rotate-180 group-hover:text-[var(--nous-fg-title)] group-focus-within:rotate-180" aria-hidden="true">
                <svg className="size-full" fill="none" viewBox="0 0 10 8" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 8L0.669873 0.5L9.33013 0.500001L5 8Z" fill="currentColor" />
                </svg>
            </span>
        </button>
    );
}

function useMenuClamp() {
    const rootRef = useRef<HTMLDivElement>(null);
    const [clampX, setClampX] = useState(0);

    const updateClamp = useCallback(() => {
        const root = rootRef.current;
        const container = root?.closest(".reading-container");

        if (!root || !container) {
            return;
        }

        const rootRect = root.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const minLeft = Math.max(containerRect.left, 0);
        const maxRight = Math.min(containerRect.right, window.innerWidth);

        let nextClampX = 0;
        const menuWidth = root.querySelector<HTMLElement>("[data-mega-menu-viewport]")?.getBoundingClientRect().width ?? megaMenuWidthFallback;
        const menuRight = rootRect.left + menuWidth;

        if (menuRight > maxRight) {
            nextClampX = maxRight - menuRight;
        }

        const menuLeft = rootRect.left + nextClampX;

        if (menuLeft < minLeft) {
            nextClampX += minLeft - menuLeft;
        }

        setClampX(nextClampX);
    }, []);

    return { clampX, rootRef, updateClamp };
}

function MegaMenuViewport({ children, clampX }: { children: ReactNode; clampX: number }) {
    return (
        <div
            className={cn(
                "pointer-events-none absolute left-0 top-full z-50 w-[856px] max-w-[calc(100vw-2rem)] pt-3",
                "translate-y-1 opacity-0 transition duration-150",
                "group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100",
                "group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100"
            )}
            data-mega-menu-viewport
            style={{ marginLeft: clampX }}
        >
            <div className="relative min-h-[236px] overflow-hidden rounded-[14px] border border-white/[0.08] bg-[rgba(8,9,10,0.9)] p-2 shadow-[0_8px_32px_#08090a] backdrop-blur-[32px]">
                <div aria-hidden="true" className="absolute inset-2 rounded-md border border-[color:var(--nous-stroke-subtle)] bg-white/[0.018]" />
                {children}
            </div>
        </div>
    );
}

function MegaMenuLink({
    description,
    hasSeparator,
    href,
    label
}: {
    description: string;
    hasSeparator: boolean;
    href: string;
    label: string;
}) {
    return (
        <a
            className={cn(
                "group/item relative rounded-md px-4 py-3 transition hover:bg-white/[0.03]",
                "focus-visible:bg-white/[0.03] focus-visible:outline-none",
                hasSeparator && "after:absolute after:right-[-12px] after:top-0 after:h-full after:w-px after:bg-[var(--nous-stroke-subtle)]"
            )}
            href={href}
        >
            <span className="block text-sm text-[var(--nous-fg-muted)] transition group-hover/item:text-[var(--nous-fg-title)]">{label}</span>
            <span className="mt-0.5 block text-sm font-medium leading-5 text-[var(--nous-fg-secondary)] transition group-hover/item:text-[var(--nous-fg-primary)]">{description}</span>
        </a>
    );
}
