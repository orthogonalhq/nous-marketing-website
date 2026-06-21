"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { DownloadCtaLink } from "@/components/marketing/download-cta-link";
import { NueLogoMark, NueWordmark } from "@/components/marketing/nous-logo";
import { homeCopy } from "@/content/home-copy";

type AppliedMarketingTheme = "dark" | "light" | "rust";
type MarketingTheme = "system" | AppliedMarketingTheme;
type MobileMenuSectionId = "product" | "resources";

const megaMenuWidthFallback = 856;

const navLinkClass = cn(
    "hidden rounded-full px-1.5 py-1 transition sm:inline",
    "hover:bg-[var(--nous-page-soft-control-bg)] hover:text-[var(--nous-fg-title)]"
);

const primaryNavActionClass = cn(
    "hidden h-8 items-center rounded-full border border-[color:var(--nous-stroke-soft)] px-3 text-sm font-medium transition sm:inline-flex",
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen((currentValue) => !currentValue);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className="reading-container relative z-50 flex items-center justify-between py-5">
                    <Link className="relative z-50 flex items-center gap-2.5 text-white" href="/" aria-label={homeCopy.navigation.homeAriaLabel}>
                        <span className="grid size-9 place-items-center">
                            <NueLogoMark className="h-[1.75rem] w-[1.7rem]" />
                        </span>
                        <NueWordmark />
                    </Link>
            <nav className="relative z-50 flex items-center gap-3 text-sm text-[var(--nous-fg-muted)] sm:gap-6" aria-label={homeCopy.navigation.primaryAriaLabel}>
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
                    <a className={navLinkClass} href="/login">
                        {homeCopy.navigation.links.login}
                    </a>
                    <DownloadCtaLink className={primaryNavActionClass} icon={false} label="download" variant="link" />
                </div>
                <button
                    aria-controls="mobile-site-menu"
                    aria-expanded={isMobileMenuOpen}
                    aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    className={cn(
                        "inline-flex size-8 items-center justify-center rounded-full border border-[color:var(--nous-stroke-soft)] sm:hidden",
                        "bg-[var(--nous-page-soft-control-bg)] text-[var(--nous-fg-title)] transition hover:border-white/[0.08] hover:bg-white/[0.06]"
                    )}
                    onClick={toggleMobileMenu}
                    type="button"
                >
                    <MobileMenuToggleIcon open={isMobileMenuOpen} />
                </button>
            </nav>
            <MobileMenu isOpen={isMobileMenuOpen} onNavigate={closeMobileMenu} />
        </header>
    );
}

function MobileMenuToggleIcon({ open }: { open: boolean }) {
    return (
        <svg aria-hidden="true" className="size-[18px]" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                clipRule="evenodd"
                d="M9.35719 3H14.6428C15.7266 2.99999 16.6007 2.99998 17.3086 3.05782C18.0375 3.11737 18.6777 3.24318 19.27 3.54497C20.2108 4.02433 20.9757 4.78924 21.455 5.73005C21.7568 6.32234 21.8826 6.96253 21.9422 7.69138C22 8.39925 22 9.27339 22 10.3572V13.6428C22 14.7266 22 15.6008 21.9422 16.3086C21.8826 17.0375 21.7568 17.6777 21.455 18.27C20.9757 19.2108 20.2108 19.9757 19.27 20.455C18.6777 20.7568 18.0375 20.8826 17.3086 20.9422C16.6008 21 15.7266 21 14.6428 21H9.35717C8.27339 21 7.39925 21 6.69138 20.9422C5.96253 20.8826 5.32234 20.7568 4.73005 20.455C3.78924 19.9757 3.02433 19.2108 2.54497 18.27C2.24318 17.6777 2.11737 17.0375 2.05782 16.3086C1.99998 15.6007 1.99999 14.7266 2 13.6428V10.3572C1.99999 9.27341 1.99998 8.39926 2.05782 7.69138C2.11737 6.96253 2.24318 6.32234 2.54497 5.73005C3.02433 4.78924 3.78924 4.02433 4.73005 3.54497C5.32234 3.24318 5.96253 3.11737 6.69138 3.05782C7.39926 2.99998 8.27341 2.99999 9.35719 3ZM6.85424 5.05118C6.24907 5.10062 5.90138 5.19279 5.63803 5.32698C5.07354 5.6146 4.6146 6.07354 4.32698 6.63803C4.19279 6.90138 4.10062 7.24907 4.05118 7.85424C4.00078 8.47108 4 9.26339 4 10.4V13.6C4 14.7366 4.00078 15.5289 4.05118 16.1458C4.10062 16.7509 4.19279 17.0986 4.32698 17.362C4.6146 17.9265 5.07354 18.3854 5.63803 18.673C5.90138 18.8072 6.24907 18.8994 6.85424 18.9488C7.17922 18.9754 7.55292 18.9882 8 18.9943V5.0057C7.55292 5.01184 7.17922 5.02462 6.85424 5.05118ZM10 5V19H14.6C15.7366 19 16.5289 18.9992 17.1458 18.9488C17.7509 18.8994 18.0986 18.8072 18.362 18.673C18.9265 18.3854 19.3854 17.9265 19.673 17.362C19.8072 17.0986 19.8994 16.7509 19.9488 16.1458C19.9992 15.5289 20 14.7366 20 13.6V10.4C20 9.26339 19.9992 8.47108 19.9488 7.85424C19.8994 7.24907 19.8072 6.90138 19.673 6.63803C19.3854 6.07354 18.9265 5.6146 18.362 5.32698C18.0986 5.19279 17.7509 5.10062 17.1458 5.05118C16.5289 5.00078 15.7366 5 14.6 5H10Z"
                fill="currentColor"
                fillRule="evenodd"
                className="transition-opacity duration-200"
                style={{ opacity: open ? 0 : 1 }}
            />
            <path
                clipRule="evenodd"
                d="M9.35719 3H14.6428C15.7266 2.99999 16.6007 2.99998 17.3086 3.05782C18.0375 3.11737 18.6777 3.24318 19.27 3.54497C20.2108 4.02433 20.9757 4.78924 21.455 5.73005C21.7568 6.32234 21.8826 6.96253 21.9422 7.69138C22 8.39925 22 9.27339 22 10.3572V13.6428C22 14.7266 22 15.6008 21.9422 16.3086C21.8826 17.0375 21.7568 17.6777 21.455 18.27C20.9757 19.2108 20.2108 19.9757 19.27 20.455C18.6777 20.7568 18.0375 20.8826 17.3086 20.9422C16.6008 21 15.7266 21 14.6428 21H9.35717C8.27339 21 7.39925 21 6.69138 20.9422C5.96253 20.8826 5.32234 20.7568 4.73005 20.455C3.78924 19.9757 3.02433 19.2108 2.54497 18.27C2.24318 17.6777 2.11737 17.0375 2.05782 16.3086C1.99998 15.6007 1.99999 14.7266 2 13.6428V10.3572C1.99999 9.27341 1.99998 8.39926 2.05782 7.69138C2.11737 6.96253 2.24318 6.32234 2.54497 5.73005C3.02433 4.78924 3.78924 4.02433 4.73005 3.54497C5.32234 3.24318 5.96253 3.11737 6.69138 3.05782C7.39926 2.99998 8.27341 2.99999 9.35719 3ZM6.85424 5.05118C6.24907 5.10062 5.90138 5.19279 5.63803 5.32698C5.07354 5.6146 4.6146 6.07354 4.32698 6.63803C4.19279 6.90138 4.10062 7.24907 4.05118 7.85424C4.00078 8.47108 4 9.26339 4 10.4V13.6C4 14.7366 4.00078 15.5289 4.05118 16.1458C4.10062 16.7509 4.19279 17.0986 4.32698 17.362C4.6146 17.9265 5.07354 18.3854 5.63803 18.673C5.90138 18.8072 6.24907 18.8994 6.85424 18.9488C7.47108 18.9992 8.26339 19 9.4 19H14.6C15.7366 19 16.5289 18.9992 17.1458 18.9488C17.7509 18.8994 18.0986 18.8072 18.362 18.673C18.9265 18.3854 19.3854 17.9265 19.673 17.362C19.8072 17.0986 19.8994 16.7509 19.9488 16.1458C19.9992 15.5289 20 14.7366 20 13.6V10.4C20 9.26339 19.9992 8.47108 19.9488 7.85424C19.8994 7.24907 19.8072 6.90138 19.673 6.63803C19.3854 6.07354 18.9265 5.6146 18.362 5.32698C18.0986 5.19279 17.7509 5.10062 17.1458 5.05118C16.5289 5.00078 15.7366 5 14.6 5H9.4C8.26339 5 7.47108 5.00078 6.85424 5.05118ZM7 7C7.55229 7 8 7.44772 8 8V16C8 16.5523 7.55229 17 7 17C6.44772 17 6 16.5523 6 16V8C6 7.44772 6.44772 7 7 7Z"
                fill="currentColor"
                fillRule="evenodd"
                className="transition-opacity duration-200"
                style={{ opacity: open ? 1 : 0 }}
            />
        </svg>
    );
}

function MobileMenu({ isOpen, onNavigate }: { isOpen: boolean; onNavigate: () => void }) {
    const [openSectionId, setOpenSectionId] = useState<MobileMenuSectionId | null>(null);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const previousBodyOverflow = document.body.style.overflow;
        const previousDocumentOverflow = document.documentElement.style.overflow;

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousDocumentOverflow;
        };
    }, [isOpen]);

    const toggleSection = (sectionId: MobileMenuSectionId) => {
        setOpenSectionId((currentSectionId) => currentSectionId === sectionId ? null : sectionId);
    };

    const handleNavigate = () => {
        onNavigate();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="nous-mobile-menu-bg-in fixed inset-0 z-40 flex flex-col overflow-hidden text-[var(--nous-page-fg)] backdrop-blur-2xl sm:hidden"
            id="mobile-site-menu"
            style={{ backgroundColor: "rgba(3, 3, 5, 0.9)" }}
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[image:var(--nous-texture-noise-page)] bg-[length:640px_640px] [mix-blend-mode:var(--nous-page-grain-blend-mode)] [opacity:var(--nous-page-grain-opacity)]" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.055),transparent_62%)]" />
            <nav
                aria-label="Mobile navigation"
                className="relative z-10 grid min-h-0 flex-1 grid-rows-[76px_1fr]"
            >
                <div aria-hidden="true" />
                <div className="min-h-0 overflow-x-hidden overflow-y-auto px-3 pb-3 pt-3">
                    <div className="grid">
                        <div className="will-change-transform" style={mobileMenuEntranceStyle(80)}> 
                            <MobileMenuAccordionSection id="product" isOpen={openSectionId === "product"} label={homeCopy.navigation.productLabel} onToggle={toggleSection}>
                                {homeCopy.navigation.productPrimaryLinks.map((link) => (
                                    <MobileMenuLink description={link.description} href={link.href} key={link.href} label={link.label} onNavigate={handleNavigate} />
                                ))}
                            </MobileMenuAccordionSection>
                        </div>
                        <div className="will-change-transform" style={mobileMenuEntranceStyle(140)}> 
                            <MobileMenuAccordionSection id="resources" isOpen={openSectionId === "resources"} label={homeCopy.navigation.resourcesLabel} onToggle={toggleSection}>
                                {homeCopy.navigation.resourceSections.map((section) => (
                                    <MobileResourceSection key={section.label} onNavigate={handleNavigate} section={section} />
                                ))}
                            </MobileMenuAccordionSection>
                        </div>
                        <div className="will-change-transform" style={mobileMenuEntranceStyle(200)}> 
                            <MobileMenuLink description="Compare free, Pro, Max, and team options." href="/pricing" label={homeCopy.navigation.links.pricing} onNavigate={handleNavigate} prominent />
                        </div>
                    </div>
                    <div className="pt-5 will-change-transform" style={mobileMenuEntranceStyle(260)}>
                        <div className="flex items-center justify-center gap-4 pt-1">
                            <MobileMenuFooterLink href="/login" label={homeCopy.navigation.links.login} onNavigate={handleNavigate} />
                            <DownloadCtaLink className="[&>a]:h-10 [&>a]:px-4" icon={false} label="download" />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

function mobileMenuEntranceStyle(delayMs: number): CSSProperties {
    return {
        animation: `nous-mobile-menu-item-in 220ms ease-out ${delayMs}ms both`
    };
}

function MobileMenuAccordionSection({ children, id, isOpen, label, onToggle }: { children: ReactNode; id: MobileMenuSectionId; isOpen: boolean; label: string; onToggle: (id: MobileMenuSectionId) => void }) {
    const panelId = `mobile-menu-section-${id}`;

    return (
        <section>
            <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between rounded-[var(--nous-radius-md)] px-3 py-4 text-left transition hover:bg-white/[0.04]"
                onClick={() => onToggle(id)}
                type="button"
            >
                <span className="nous-mono text-sm font-semibold uppercase tracking-[0.12em] text-[var(--nous-page-title-fg)]">
                    {label}
                </span>
                <span className={cn("inline-flex h-2 w-2.5 items-center justify-center text-[var(--nous-fg-quieter)] transition", isOpen && "rotate-180")} aria-hidden="true">
                    <svg className="size-full" fill="none" viewBox="0 0 10 8" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 8L0.669873 0.5L9.33013 0.500001L5 8Z" fill="currentColor" />
                    </svg>
                </span>
            </button>
            <div className={cn("grid transition-[grid-template-rows] duration-200", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")} id={panelId}>
                <div className="min-h-0 overflow-hidden">
                    <div className="grid gap-1 px-1 pb-4">{children}</div>
                </div>
            </div>
        </section>
    );
}

function MobileResourceSection({ onNavigate, section }: { onNavigate: () => void; section: (typeof homeCopy.navigation.resourceSections)[number] }) {
    return (
        <section className="rounded-[var(--nous-radius-md)] px-2 py-1.5">
            <h3 className="px-1 pb-1.5 text-[0.625rem] font-medium uppercase tracking-[0.08em] text-[var(--nous-fg-quieter)]">
                {section.label}
            </h3>
            <div className="grid gap-0.5">
                {section.links.map((link) => (
                    <MobileMenuLink description={link.description} external={"external" in link && link.external} href={link.href} key={link.href} label={link.label} onNavigate={onNavigate} />
                ))}
            </div>
        </section>
    );
}

function MobileMenuFooterLink({ disabled = false, href, label, onNavigate }: { disabled?: boolean; href?: string; label: string; onNavigate: () => void }) {
    if (disabled) {
        return (
            <span
                aria-disabled="true"
                className="rounded-full px-3 py-2 text-sm font-medium text-[var(--nous-fg-muted)] opacity-45"
                role="link"
            >
                {label}
            </span>
        );
    }

    return (
        <a
            className="rounded-full px-3 py-2 text-sm font-medium text-[var(--nous-fg-muted)] transition hover:bg-white/[0.04] hover:text-[var(--nous-fg-title)] focus-visible:bg-white/[0.04] focus-visible:text-[var(--nous-fg-title)] focus-visible:outline-none"
            href={href ?? "#"}
            onClick={onNavigate}
        >
            {label}
        </a>
    );
}

function MobileMenuLink({ description, external = false, href, label, onNavigate, prominent = false }: { description?: string; external?: boolean; href: string; label: string; onNavigate: () => void; prominent?: boolean }) {
    return (
        <a
            className={cn("group block rounded-[var(--nous-radius-md)] px-3 py-3 transition hover:bg-white/[0.05] focus-visible:bg-white/[0.05] focus-visible:outline-none", prominent && "py-4")}
            href={href}
            onClick={onNavigate}
            rel={external ? "noreferrer" : undefined}
            target={external ? "_blank" : undefined}
        >
            <span className="flex items-start justify-between gap-3">
                <span>
                    <span className={cn("block text-sm font-medium text-[var(--nous-page-title-fg)]", prominent && "nous-mono font-semibold uppercase tracking-[0.12em]")}>{label}</span>
                    {description ? <span className="mt-1 block text-xs leading-5 text-[var(--nous-fg-muted)]">{description}</span> : null}
                </span>
                {external ? <ExternalArrowIcon className="mt-1 size-3 shrink-0 text-[var(--nous-fg-quieter)] transition group-hover:text-[var(--nous-fg-title)]" /> : null}
            </span>
        </a>
    );
}

function ExternalArrowIcon({ className }: { className?: string }) {
    return (
        <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 8L8 1M8 1H3M8 1V6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
        </svg>
    );
}

function SiteFooter({ onThemeChange, theme }: { onThemeChange: (theme: MarketingTheme) => void; theme: MarketingTheme }) {
    return (
        <footer className="reading-container border-t border-[color:var(--nous-stroke-subtle)] pb-2 pt-12 text-sm text-[var(--nous-fg-muted)] sm:py-14">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_1.45fr] lg:gap-14">
                <div className="mt-8 max-w-md sm:mt-0 sm:max-w-lg lg:max-w-md">
                    <Link className="inline-flex items-center gap-2.5 text-white" href="/" aria-label={homeCopy.navigation.homeAriaLabel}>
                        <span className="grid size-9 place-items-center">
                            <NueLogoMark className="h-[1.75rem] w-[1.7rem]" />
                        </span>
                        <NueWordmark />
                    </Link>
                    <p className="mt-4 text-sm leading-6 text-[var(--nous-page-body-fg)] sm:mt-5 sm:text-base sm:leading-7">
                        <span className="font-medium text-[var(--nous-page-title-fg)]">{homeCopy.footer.taglineLead}</span>{" "}
                        {homeCopy.footer.taglineBody}
                    </p>
                    <div className="mt-5 grid gap-2 sm:flex sm:flex-wrap">
                        {homeCopy.footer.ctas.map((cta) => (
                            <FooterCtaLink cta={cta} key={cta.label} />
                        ))}
                    </div>
                </div>

                <FooterNavigation />
            </div>

            <div className="mt-8 border-t border-[color:var(--nous-stroke-subtle)] py-5 sm:mt-10 sm:flex sm:items-center sm:justify-between sm:py-0 sm:pt-6">
                <div className="flex h-8 items-center justify-between gap-3 sm:h-auto sm:order-none sm:flex-wrap sm:justify-start sm:gap-x-4 sm:gap-y-2">
                    <div className="flex h-8 items-center gap-x-3 text-xs leading-none text-[var(--nous-fg-quieter)] sm:h-auto sm:flex-wrap sm:gap-x-4 sm:gap-y-2">
                    <span>{homeCopy.footer.copyright}</span>
                    {homeCopy.footer.bottomLinks.map((link) => (
                        <a className="transition hover:text-[var(--nous-fg-title)]" href={link.href} key={link.label}>
                            {link.label}
                        </a>
                    ))}
                    </div>
                    <div className="sm:hidden">
                        <FooterThemeSwitcher onThemeChange={onThemeChange} theme={theme} />
                    </div>
                </div>
                <div className="mt-4 hidden sm:mt-0 sm:block">
                    <FooterThemeSwitcher onThemeChange={onThemeChange} theme={theme} />
                </div>
            </div>
        </footer>
    );
}

function FooterCtaLink({ cta }: { cta: (typeof homeCopy.footer.ctas)[number] }) {
    const isPrimary = cta.variant === "primary";
    const isExternal = "external" in cta && cta.external;

    if (cta.href === "/download") {
        return (
            <DownloadCtaLink
                className={cn(
                    "inline-flex h-9 w-full items-center justify-center rounded-full border px-3.5 text-sm font-medium transition sm:w-auto",
                    "border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-soft-control-bg)] text-[var(--nous-fg-title)] hover:border-white/[0.08] hover:bg-white/[0.06]"
                )}
                icon={false}
                variant="link"
            />
        );
    }

    return (
        <a
            className={cn(
                "inline-flex h-9 w-full items-center justify-center rounded-full border px-3.5 text-sm font-medium transition sm:w-auto",
                isPrimary
                    ? "border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-soft-control-bg)] text-[var(--nous-fg-title)] hover:border-white/[0.08] hover:bg-white/[0.06]"
                    : "border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-soft-control-bg)] text-[var(--nous-fg-title)] hover:border-white/[0.08] hover:bg-white/[0.06] sm:border-transparent sm:bg-transparent sm:text-[var(--nous-fg-muted)] sm:hover:bg-white/[0.04] sm:hover:text-[var(--nous-fg-title)]"
            )}
            href={cta.href}
            rel={isExternal ? "noreferrer" : undefined}
            target={isExternal ? "_blank" : undefined}
        >
            {cta.label}
        </a>
    );
}

function FooterNavigation() {
    const [productColumn, useCasesColumn, resourcesColumn, companyColumn] = homeCopy.footer.columns;

    return (
        <nav aria-label={homeCopy.footer.ariaLabel}>
            <div className="grid grid-cols-2 gap-8 sm:hidden">
                <FooterLinkColumn column={productColumn} />
                <FooterLinkColumn column={useCasesColumn} />
                <FooterLinkColumn column={resourcesColumn} />
                <FooterLinkColumn column={companyColumn} />
            </div>
            <div className="hidden gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-4">
                {homeCopy.footer.columns.map((column) => (
                    <FooterLinkColumn column={column} key={column.label} />
                ))}
            </div>
        </nav>
    );
}

function FooterLinkColumn({ column }: { column: (typeof homeCopy.footer.columns)[number] }) {
    return (
        <section>
            <h2 className="nous-mono text-[0.625rem] uppercase tracking-[0.08em] text-[var(--nous-fg-quieter)]">
                {column.label}
            </h2>
            <ul className="mt-3 grid gap-2 sm:mt-4 sm:gap-3">
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
                className="text-xs leading-5 text-[var(--nous-fg-muted)] transition hover:text-[var(--nous-fg-title)] sm:text-sm"
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
        <div className="flex h-8 items-center gap-2 sm:h-auto" role="group" aria-label={homeCopy.themeMenu.themeOptionsAriaLabel}>
            <span className="nous-mono hidden text-[0.625rem] uppercase tracking-[0.08em] text-[var(--nous-fg-quieter)] sm:inline">
                {homeCopy.footer.themeLabel}
            </span>
            <div className="flex items-center gap-px rounded-full border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-soft-control-bg)] p-px">
                {themes.map(({ label, value }) => (
                    <button
                        aria-label={`${homeCopy.themeMenu.optionAriaLabelPrefix} ${label} ${homeCopy.themeMenu.optionAriaLabelSuffix}`}
                        aria-pressed={theme === value}
                        className={cn(
                            "grid min-w-7 place-items-center rounded-full px-2 py-1 text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nous-accent-info)]",
                            theme === value
                                ? "bg-[var(--nous-bg-control-active)] text-[var(--nous-fg-title)]"
                                : "text-[var(--nous-fg-muted)] hover:bg-white/[0.04] hover:text-[var(--nous-fg-title)]"
                        )}
                        key={value}
                        onClick={() => onThemeChange(value)}
                        type="button"
                    >
                        <ThemeOptionIcon className="size-3.5" value={value} />
                    </button>
                ))}
            </div>
        </div>
    );
}

function ThemeOptionIcon({ className, value }: { className?: string; value: MarketingTheme }) {
    if (value === "system") {
        return (
            <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <rect height="8.5" rx="1.4" stroke="currentColor" strokeWidth="1.4" width="11.5" x="2.25" y="2.75" />
                <path d="M6.25 13.25h3.5M8 11.25v2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
            </svg>
        );
    }

    if (value === "light") {
        return (
            <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.4" />
                <path d="M8 1.9v1.2M8 12.9v1.2M1.9 8h1.2M12.9 8h1.2M3.7 3.7l.85.85M11.45 11.45l.85.85M12.3 3.7l-.85.85M4.55 11.45l-.85.85" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
            </svg>
        );
    }

    if (value === "dark") {
        return (
            <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.8 10.25A5.4 5.4 0 0 1 5.75 3.2 5.75 5.75 0 1 0 12.8 10.25Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.4" />
            </svg>
        );
    }

    return (
        <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.45 5.05A4.55 4.55 0 1 0 12.2 8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.35" />
            <path d="M9.6 4.6h2.3v-2.3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" />
            <path d="M5.25 9.6c.7 1.05 2.1 1.4 3.2.75.8-.48 1.18-1.35.95-2.05-.22-.65-.93-.9-1.72-1.18-.82-.3-1.7-.62-1.83-1.47-.1-.68.42-1.35 1.18-1.62" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
        </svg>
    );
}

function ProductMenu() {
    const { rootRef, rootStyle, updateClamp } = useMenuClamp();

    return (
        <div className="group relative hidden sm:block" onFocusCapture={updateClamp} onPointerEnter={updateClamp} ref={rootRef} style={rootStyle}>
            <MenuTrigger label={homeCopy.navigation.productLabel} />
            <MegaMenuViewport>
                <div className="grid grid-cols-2 gap-x-6 p-3">
                    {homeCopy.navigation.productPrimaryLinks.map((link, index) => (
                        <MegaMenuLink hasSeparator={index % 2 !== 1} href={link.href} key={link.href} label={link.label} description={link.description} />
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
    const { rootRef, rootStyle, updateClamp } = useMenuClamp();

    return (
        <div className="group relative hidden sm:block" onFocusCapture={updateClamp} onPointerEnter={updateClamp} ref={rootRef} style={rootStyle}>
            <MenuTrigger label={homeCopy.navigation.resourcesLabel} />
            <MegaMenuViewport>
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
                    <MegaMenuLink description={link.description} external={"external" in link && link.external} hasSeparator={false} href={link.href} key={link.href} label={link.label} />
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
    const rootStyle = { "--nous-mega-menu-clamp-x": "0px" } as CSSProperties;

    const updateClamp = useCallback(() => {
        const root = rootRef.current;
        const container = root?.closest<HTMLElement>(".reading-container");
        const menu = root?.querySelector<HTMLElement>("[data-mega-menu-viewport]");

        if (!root || !container) {
            return;
        }

        root.style.setProperty("--nous-mega-menu-clamp-x", "0px");

        const rootRect = root.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const menuWidth = menu?.getBoundingClientRect().width ?? megaMenuWidthFallback;
        const viewportGutter = 16;
        const minLeft = Math.max(containerRect.left, viewportGutter);
        const maxRight = Math.min(containerRect.right, window.innerWidth - viewportGutter);

        let clampX = 0;

        if (rootRect.left + menuWidth > maxRight) {
            clampX = maxRight - (rootRect.left + menuWidth);
        }

        if (rootRect.left + clampX < minLeft) {
            clampX = minLeft - rootRect.left;
        }

        root.style.setProperty("--nous-mega-menu-clamp-x", `${clampX}px`);
    }, []);

    return { rootRef, rootStyle, updateClamp };
}

function MegaMenuViewport({ children }: { children: ReactNode }) {
    return (
        <div
            className={cn(
                "pointer-events-none absolute left-0 top-full z-50 ml-[var(--nous-mega-menu-clamp-x,0px)] w-[856px] max-w-[calc(100vw-2rem)] pt-3",
                "translate-y-1 opacity-0 transition duration-150",
                "group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100",
                "group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100"
            )}
            data-mega-menu-viewport
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
    external = false,
    hasSeparator,
    href,
    label
}: {
    description: string;
    external?: boolean;
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
            rel={external ? "noreferrer" : undefined}
            target={external ? "_blank" : undefined}
        >
            <span className="block text-sm text-[var(--nous-fg-muted)] transition group-hover/item:text-[var(--nous-fg-title)]">{label}</span>
            <span className="mt-0.5 block text-sm font-medium leading-5 text-[var(--nous-fg-secondary)] transition group-hover/item:text-[var(--nous-fg-primary)]">{description}</span>
        </a>
    );
}
