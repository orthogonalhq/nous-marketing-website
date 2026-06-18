import { HeroModeTabs } from "@/components/home/hero-mode-tabs";
import { HeroSubHeaderCards } from "@/components/home/hero-sub-header-cards";
import { HomeThemeShell } from "@/components/home/home-theme-shell";
import { ProductGradientSection } from "@/components/home/product-gradient-section";
import { DownloadCtaLink } from "@/components/marketing/download-cta-link";
import { homeCopy } from "@/content/home-copy";
import type { HomeCopy } from "@/content/home-copy";
import { cn } from "@/lib/cn";
import { HardDrive, ShieldCheck, UserRoundCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import heroCardStyles from "./hero-sub-header-cards.module.css";
import thesisStyles from "./hero-thesis-prism.module.css";

type TrustPrinciple = HomeCopy["trust"]["principles"][number]["principle"];

const trustPrincipleIcons = {
    "Privacy first": { Icon: ShieldCheck, gradientId: "trust-prism-privacy" },
    "Local first": { Icon: HardDrive, gradientId: "trust-prism-local" },
    "You first": { Icon: UserRoundCheck, gradientId: "trust-prism-you" }
} satisfies Record<TrustPrinciple, { Icon: LucideIcon; gradientId: string }>;

const preheaderClass = "nous-mono text-[0.625rem] tracking-[0.08em] text-[var(--nous-page-preheader-fg)]";
const sectionTitleClass = "text-[1.853rem] font-normal leading-[1.05] tracking-[-0.035em] text-[var(--nous-page-title-fg)] sm:text-[2.31625rem]";
const bodyCopyClass = "text-base leading-7 text-[var(--nous-page-body-fg)] sm:text-[1.0625rem] sm:leading-8";

export function Homepage() {
    return (
        <HomeThemeShell>
            <HeroSection />
            <PrinciplesSection />

            <ProductGradientSection />

            <OwnershipSection />
            <TrustSection />
            <DownloadSection />
        </HomeThemeShell>
    );
}

function HeroSection() {
    return (
        <section className="relative w-full pb-10 pt-8 lg:pb-10 lg:pt-16">
            <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[75vh] w-[120vw] max-w-none -translate-x-1/2 bg-[image:var(--nous-page-hero-bottom-light-bg)]" />
            <div className="reading-container relative z-10 flex flex-col justify-center gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="mt-7 max-w-4xl text-balance text-[3.011125rem] font-normal leading-[0.98] tracking-[-0.05em] text-[var(--nous-page-hero-title-fg)] sm:text-[3.3585625rem] lg:text-[3.706rem]">
                        {homeCopy.hero.title}
                    </h1>
                    <HeroSubHeaderCards />
                </div>
                <p className="mt-6 max-w-xl text-balance text-[1.0625rem] leading-7 text-[var(--nous-page-body-fg)] sm:text-lg sm:leading-8">
                    <span
                        className={thesisStyles.thesis}
                        data-text={homeCopy.hero.subtitleLead}
                    >
                        {homeCopy.hero.subtitleLead}
                    </span>
                    <span className="block">
                        {homeCopy.hero.subtitleBody}
                    </span>
                </p>
            </div>

            <div className="relative z-10">
                <HeroModeTabs />
                <HeroBaseShadow />
            </div>
        </section>
    );
}

function HeroBaseShadow() {
    return (
        <>
            {["h-[5px] w-[72%] blur-md", "h-[4px] w-[62%] blur-sm", "h-[3px] w-[52%] blur-sm"].map((className) => (
                <div
                    aria-hidden="true"
                    className={cn("pointer-events-none absolute bottom-0 left-1/2 z-0 max-w-[var(--reading-container-max)] -translate-x-1/2 bg-black", className)}
                    key={className}
                />
            ))}
        </>
    );
}

function PrinciplesSection() {
    return (
        <section className="border-y border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-page-section-band-bg)] py-24">
            <div className="reading-container reading-container-narrow text-center">
                <h2 className="w-full text-balance text-[1.853rem] font-normal leading-[1.08] tracking-[-0.04em] text-[var(--nous-page-title-fg)] sm:text-[2.31625rem] lg:text-[2.7795rem]">
                    {homeCopy.principles.title} <span className="text-[var(--nous-fg-muted)]">{homeCopy.principles.titleMuted}</span>
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-balance text-[1.0625rem] leading-7 text-[var(--nous-page-body-fg)] sm:text-lg sm:leading-8">
                    {homeCopy.principles.body}
                </p>
            </div>
            {/* <div className="reading-container reading-container-narrow mt-12 grid gap-4 md:grid-cols-3">
                {homeCopy.principles.cards.map((card) => (
                    <PrincipleCardView card={card} key={card.title} />
                ))}
            </div> */}
        </section>
    );
}

function OwnershipSection() {
    return (
        <section className="relative overflow-hidden py-24" id="ownership">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--nous-stroke-subtle)] to-transparent" />
            <div className="reading-container relative grid gap-10 [--reading-container-max:1180px] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <SectionIntro
                    eyebrow={homeCopy.ownership.eyebrow}
                    title={homeCopy.ownership.title}
                    body={homeCopy.ownership.body}
                />
                <OwnershipPlaceholderVisual />
            </div>
        </section>
    );
}

function OwnershipPlaceholderVisual() {
    return (
        <figure
            aria-label="Ownership visual placeholder"
            className={cn(
                heroCardStyles.wrap,
                heroCardStyles.highlight,
                heroCardStyles.borderSubtle,
                "block w-full rounded-[calc(var(--nous-radius-xl)+8px)] [--nous-hero-card-border-width:1px]"
            )}
        >
            <span className={cn(heroCardStyles.card, "block min-h-[420px] w-full rounded-[inherit]")}>
                <span aria-hidden="true" className={cn(heroCardStyles.label, "block min-h-[420px] w-full p-0")} />
            </span>
            <span aria-hidden="true" className={cn(heroCardStyles.edgeShine, "rounded-[inherit]")}>
                <span className={`${heroCardStyles.edgeChannel} ${heroCardStyles.edgeChannelRed}`} />
                <span className={`${heroCardStyles.edgeChannel} ${heroCardStyles.edgeChannelGreen}`} />
                <span className={`${heroCardStyles.edgeChannel} ${heroCardStyles.edgeChannelBlue}`} />
            </span>
            <span aria-hidden="true" className={cn(heroCardStyles.edgePrism, "rounded-[inherit]")} />
            <span aria-hidden="true" className={cn(heroCardStyles.prism, "rounded-[inherit]")} />
            <span aria-hidden="true" className={cn(heroCardStyles.shadow, "rounded-[inherit]")} />
        </figure>
    );
}

function TrustSection() {
    return (
        <section className="reading-container grid gap-12 py-24 [--reading-container-max:1180px] lg:grid-cols-[0.9fr_1.1fr] lg:items-center" id="trust">
            <SectionIntro
                eyebrow={homeCopy.trust.eyebrow}
                title={homeCopy.trust.title}
                body={homeCopy.trust.body}
            />
            <div className="divide-y divide-[color:var(--nous-stroke-subtle)]">
                {homeCopy.trust.principles.map((item) => {
                    const { Icon, gradientId } = trustPrincipleIcons[item.principle];

                    return (
                        <article className="grid grid-cols-[64px_1fr] items-center gap-8 py-6" key={item.principle}>
                            <TrustPrismIcon Icon={Icon} gradientId={gradientId} />
                            <div>
                                <h3 className="font-medium tracking-[-0.012em] text-[var(--nous-page-title-fg)]">{item.principle}</h3>
                                <p className="mt-1 text-sm leading-6 text-[var(--nous-fg-muted)]">{item.body}</p>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

function TrustPrismIcon({ gradientId, Icon }: { gradientId: string; Icon: LucideIcon }) {
    return (
        <span aria-hidden="true" className="relative isolate inline-grid size-16 flex-none place-items-center">
            <span className="absolute inset-2 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.18),rgba(125,135,175,0.08)_42%,transparent_72%)] blur-xl" />
            <Icon className="absolute inset-0 size-16 translate-x-[1.5px] translate-y-2 text-black opacity-50 blur-[0.5px]" strokeWidth={0.5} />
            <Icon className="absolute inset-0 size-16 -translate-x-[0.45px] -translate-y-[0.55px] text-[var(--nous-primary-cta-prism-white)] opacity-35 mix-blend-screen" strokeWidth={0.5} />
            <Icon className="absolute inset-0 size-16 translate-x-[0.65px] translate-y-[0.25px] text-[var(--nous-primary-cta-edge-red)] opacity-60 mix-blend-screen" strokeWidth={0.5} />
            <Icon className="absolute inset-0 size-16 translate-x-[0.05px] translate-y-[0.05px] text-[var(--nous-primary-cta-edge-green)] opacity-45 mix-blend-screen" strokeWidth={0.5} />
            <Icon className="absolute inset-0 size-16 -translate-x-px -translate-y-[0.45px] text-[var(--nous-primary-cta-edge-blue)] opacity-60 mix-blend-screen" strokeWidth={0.5} />
            <Icon
                className="relative z-10 size-16 opacity-100 [filter:drop-shadow(0_1px_0_rgba(255,255,255,0.24))_drop-shadow(0_8px_18px_rgba(0,0,0,0.58))_drop-shadow(0_0_12px_rgba(125,135,175,0.18))]"
                stroke={`url(#${gradientId})`}
                strokeWidth={0.5}
            >
                <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id={gradientId} x1="4" x2="20" y1="21" y2="3">
                        <stop offset="0%" stopColor="var(--nous-primary-cta-prism-red)" />
                        <stop offset="38%" stopColor="var(--nous-primary-cta-prism-green)" />
                        <stop offset="58%" stopColor="var(--nous-primary-cta-prism-blue)" />
                        <stop offset="72%" stopColor="var(--nous-primary-cta-prism-white)" />
                        <stop offset="100%" stopColor="var(--nous-primary-cta-text)" />
                    </linearGradient>
                </defs>
            </Icon>
        </span>
    );
}

function DownloadSection() {
    return (
        <section className="pb-24" id="download">
            <div className="reading-container reading-container-narrow rounded-[calc(var(--nous-radius-xl)+8px)] border border-[color:var(--nous-stroke-default)] [background:var(--nous-page-cta-panel-bg)] p-8 text-center shadow-[var(--nous-shadow-drawer)] sm:p-12">
                <p className={preheaderClass}>{homeCopy.download.eyebrow}</p>
                <h2 className={cn(sectionTitleClass, "mx-auto mt-3 max-w-3xl")}>{homeCopy.download.title}</h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--nous-page-body-fg)]">
                    {homeCopy.download.body}
                </p>
                <DownloadCtaLink className="mt-8" />
            </div>
        </section>
    );
}

function SectionIntro({ body, eyebrow, title }: { body: string; eyebrow: string; title: string }) {
    return (
        <div>
            <p className={preheaderClass}>{eyebrow}</p>
            <h2 className={cn(sectionTitleClass, "mt-3")}>{title}</h2>
            <p className={cn(bodyCopyClass, "mt-5")}>{body}</p>
        </div>
    );
}
