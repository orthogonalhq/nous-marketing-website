import type { CSSProperties } from "react";

const eyebrowClass = "nous-mono text-[0.625rem] uppercase tracking-[0.08em] text-[var(--nous-page-preheader-fg)]";
const sectionTitleClass = "text-base font-semibold leading-7 text-[var(--nous-page-title-fg)] sm:text-[1.0625rem]";
const legalBodyContainerStyle = { "--reading-container-max": "680px" } as CSSProperties;

export type LegalSection = {
  title: string;
  body?: string[];
  bullets?: string[];
};

export type LegalPageCopy = {
  badge: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
  title: string;
};

export function LegalPage({ copy }: { copy: LegalPageCopy }) {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-14 sm:pb-20 sm:pt-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[image:var(--nous-page-hero-bottom-light-bg)]" />
        <div className="reading-container relative z-10 [--reading-container-max:920px]">
          <p className={eyebrowClass}>{copy.badge}</p>
          <h1 className="mt-4 max-w-4xl text-balance text-[2.7rem] font-normal leading-[0.98] tracking-[-0.055em] text-[var(--nous-page-hero-title-fg)] sm:text-[3.6rem] lg:text-[4.6rem]">{copy.title}</h1>
          <p className="mt-6 max-w-2xl text-balance text-[1.0625rem] leading-7 text-[var(--nous-page-body-fg)] sm:text-lg sm:leading-8">{copy.description}</p>
          <p className="mt-5 text-sm text-[var(--nous-fg-muted)]">Last updated {copy.lastUpdated}</p>
        </div>
      </section>

      <section className="border-t border-[color:var(--nous-stroke-subtle)] py-8 sm:py-10">
        <div className="reading-container" style={legalBodyContainerStyle}>
          <div className="grid gap-8 sm:gap-9">
          {copy.sections.map((section, index) => (
            <article className="grid gap-2 sm:grid-cols-[3.25rem_1fr] sm:gap-4" key={section.title}>
              <div className="nous-mono pt-1 text-xs text-[var(--nous-fg-muted)]">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <h2 className={sectionTitleClass}>{section.title}</h2>
                {section.body?.map((paragraph) => (
                  <p className="mt-3 text-sm leading-7 text-[var(--nous-page-body-fg)] sm:text-base sm:leading-7" key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--nous-page-body-fg)] sm:text-base sm:leading-7">
                    {section.bullets.map((bullet) => (
                      <li className="flex gap-3" key={bullet}>
                        <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[var(--nous-accent-info)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
          </div>
        </div>
      </section>
    </>
  );
}
