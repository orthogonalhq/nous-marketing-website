import { DownloadCtaLink } from "@/components/marketing/download-cta-link";
import { PrimaryCtaLink } from "@/components/marketing/primary-cta-link";
import type { SubpageCard, SubpageCopy } from "@/content/subpage-copy";
import { cn } from "@/lib/cn";

const eyebrowClass = "nous-mono text-[0.625rem] uppercase tracking-[0.08em] text-[var(--nous-page-preheader-fg)]";
const titleClass = "text-balance text-[2.4rem] font-normal leading-[0.98] tracking-[-0.055em] text-[var(--nous-page-hero-title-fg)] sm:text-[3.1rem] lg:text-[4.2rem]";
const sectionTitleClass = "text-balance text-[1.85rem] font-normal leading-[1.05] tracking-[-0.04em] text-[var(--nous-page-title-fg)] sm:text-[2.45rem]";

export function SubpageLanding({ copy }: { copy: SubpageCopy }) {
  return (
    <>
      <SubpageHero copy={copy} />
      {copy.sections.map((section, index) => (
        <section
          className={cn(
            "relative border-t border-[color:var(--nous-stroke-subtle)] py-20 sm:py-24",
            index % 2 === 0 && "bg-[var(--nous-page-section-band-bg)]"
          )}
          id={section.id}
          key={section.title}
        >
          <div className="reading-container [--reading-container-max:1180px]">
            <div className="max-w-3xl">
              <p className={eyebrowClass}>{section.eyebrow}</p>
              <h2 className={cn(sectionTitleClass, "mt-3")}>{section.title}</h2>
              {section.body ? (
                <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--nous-page-body-fg)] sm:text-[1.0625rem] sm:leading-8">
                  {section.body}
                </p>
              ) : null}
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {section.cards.map((card) => (
                <SubpageInfoCard card={card} key={card.title} />
              ))}
            </div>
          </div>
        </section>
      ))}
      {copy.closing ? <ClosingPanel closing={copy.closing} /> : null}
    </>
  );
}

function SubpageHero({ copy }: { copy: SubpageCopy }) {
  return (
    <section className="relative overflow-hidden pb-20 pt-14 sm:pb-24 sm:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[image:var(--nous-page-hero-bottom-light-bg)]" />
      <div className="reading-container relative z-10 grid gap-10 [--reading-container-max:1180px] lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <p className={eyebrowClass}>{copy.badge}</p>
          <h1 className={cn(titleClass, "mt-4 max-w-4xl")}>{copy.title}</h1>
          <p className="mt-6 max-w-2xl text-balance text-[1.0625rem] leading-7 text-[var(--nous-page-body-fg)] sm:text-lg sm:leading-8">
            {copy.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {copy.primaryCta.href === "/download" ? <DownloadCtaLink /> : <PrimaryCtaLink href={copy.primaryCta.href}>{copy.primaryCta.label}</PrimaryCtaLink>}
            {copy.secondaryCta ? (
              copy.secondaryCta.href === "/download" ? (
                <DownloadCtaLink className="inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-[var(--nous-fg-muted)] transition hover:bg-white/[0.04] hover:text-[var(--nous-fg-title)]" variant="link" />
              ) : (
                <a
                  className="inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-[var(--nous-fg-muted)] transition hover:bg-white/[0.04] hover:text-[var(--nous-fg-title)]"
                  href={copy.secondaryCta.href}
                >
                  {copy.secondaryCta.label}
                </a>
              )
            ) : null}
          </div>
        </div>

        <div className="rounded-[calc(var(--nous-radius-xl)+8px)] border border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-page-card-bg)] p-4 shadow-[var(--nous-shadow-card)]">
          <div className="rounded-[var(--nous-radius-xl)] border border-[color:var(--nous-stroke-soft)] bg-white/[0.025] p-5">
            <p className={eyebrowClass}>AT A GLANCE</p>
            <div className="mt-5 grid gap-3">
              {(copy.heroStats ?? [
                { label: "Stage", value: "Early access" },
                { label: "Focus", value: "Private routines" },
                { label: "Model", value: "Open source" }
              ]).map((stat) => (
                <div className="flex items-center justify-between gap-4 border-b border-[color:var(--nous-stroke-subtle)] pb-3 last:border-b-0 last:pb-0" key={stat.label}>
                  <span className="text-sm text-[var(--nous-fg-muted)]">{stat.label}</span>
                  <strong className="text-right text-sm font-medium text-[var(--nous-page-title-fg)]">{stat.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SubpageInfoCard({ card }: { card: SubpageCard }) {
  return (
    <article className="flex min-h-[250px] flex-col rounded-[var(--nous-radius-xl)] border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-card-bg)] p-5 shadow-[var(--nous-shadow-card)]">
      {card.eyebrow ? <p className={eyebrowClass}>{card.eyebrow}</p> : null}
      <h3 className="mt-3 text-xl font-normal leading-tight tracking-[-0.035em] text-[var(--nous-page-title-fg)]">{card.title}</h3>
      <p className="mt-4 text-sm leading-6 text-[var(--nous-page-body-fg)]">{card.body}</p>
      {card.items ? (
        <ul className="mt-5 grid gap-2 text-sm text-[var(--nous-fg-muted)]">
          {card.items.map((item) => (
            <li className="flex gap-2" key={item}>
              <span aria-hidden="true" className="mt-2 size-1 rounded-full bg-[var(--nous-accent-info)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function ClosingPanel({ closing }: { closing: NonNullable<SubpageCopy["closing"]> }) {
  return (
    <section className="py-20 sm:py-24">
      <div className="reading-container reading-container-narrow rounded-[calc(var(--nous-radius-xl)+8px)] border border-[color:var(--nous-stroke-default)] [background:var(--nous-page-cta-panel-bg)] p-8 text-center shadow-[var(--nous-shadow-drawer)] sm:p-12">
        <p className={eyebrowClass}>{closing.eyebrow}</p>
        <h2 className={cn(sectionTitleClass, "mx-auto mt-3 max-w-3xl")}>{closing.title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--nous-page-body-fg)]">{closing.body}</p>
        {closing.cta.href === "/download" ? <DownloadCtaLink className="mt-8" /> : <PrimaryCtaLink className="mt-8" href={closing.cta.href}>{closing.cta.label}</PrimaryCtaLink>}
      </div>
    </section>
  );
}
