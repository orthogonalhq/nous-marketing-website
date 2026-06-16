import { homeCopy } from "@/content/home-copy";
import type { ProductChapter } from "@/content/home-copy";
import { LazyProductMockup } from "@/components/product-mockups/lazy-product-mockup";
import { cn } from "@/lib/cn";
import badgeStyles from "./hero-sub-header-cards.module.css";

export function ProductGradientSection() {
    return (
        <section className="relative border-b border-[color:var(--nous-stroke-subtle)] py-24" id="product">
            <ProductSectionRadial position="top" />
            <ProductSectionRadial position="bottom" />
            <div className="reading-container relative z-10 space-y-36 [--reading-container-max:1180px] lg:space-y-44">
                {homeCopy.product.chapters.map((chapter) => (
                    <article className="grid gap-8" id={getProductChapterId(chapter)} key={chapter.label}>
                        <div className="grid gap-x-8 gap-y-8 lg:grid-cols-4 lg:items-start">
                            <div className="grid gap-4 lg:col-span-2 lg:self-center">
                                <ProductChapterBadge chapter={chapter} />
                                <h2 className="text-[1.853rem] font-normal leading-[1.05] tracking-[-0.035em] text-[var(--nous-page-title-fg)] sm:text-[2.31625rem]">
                                    {chapter.title}
                                </h2>
                            </div>
                            <p className="text-lg leading-6 text-[var(--nous-page-body-fg)] lg:col-span-2 lg:col-start-3 lg:row-start-1 lg:self-center">
                                {chapter.body}
                            </p>
                        </div>

                        <ProductChapterVisual chapter={chapter} />
                        <div className="grid lg:grid-cols-2">
                            <div className="lg:col-start-2">
                                <p className="nous-mono mb-2 pl-3 text-[0.625rem] uppercase tracking-[0.08em] text-[var(--nous-fg-quieter)]">
                                    Features
                                </p>
                                <ProductChapterFeatureGrid chapter={chapter} />
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

function ProductSectionRadial({ position }: { position: "bottom" | "top" }) {
    const isTop = position === "top";

    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 z-0 overflow-visible ${isTop ? "top-0" : "bottom-0"}`}
        >
            <div className="reading-container relative h-0 overflow-visible [--reading-container-max:1180px]">
                <div
                    className={`absolute left-1/2 aspect-square w-[200vw] max-w-[2180px] -translate-x-1/2 flex-none bg-no-repeat ${isTop ? "top-0 bg-[image:var(--nous-page-product-top-radial-bg)] bg-[length:100%_100%] bg-top" : "bottom-0 bg-[image:var(--nous-page-product-bottom-radial-bg)] bg-[length:100%_100%] bg-bottom"}`}
                />
            </div>
        </div>
    );
}

function getProductChapterId(chapter: ProductChapter) {
    if (chapter.variant === "ask") {
        return "conversation";
    }

    if (chapter.variant === "cortex") {
        return "delegation";
    }

    return "agent-os";
}

function ProductChapterBadge({ chapter }: { chapter: ProductChapter }) {
    return (
        <span className={`${badgeStyles.wrap} ${badgeStyles.highlight} ${badgeStyles.borderSubtle} nous-mono w-fit text-[0.6875rem] tracking-[0.08em]`}>
            <span className={badgeStyles.card}>
                <span className={`${badgeStyles.label} flex items-center gap-2`}>
                    <span>{chapter.index} </span>
                    <span>{chapter.product} </span>
                    <span aria-hidden="true">→</span>
                </span>
            </span>
            <span aria-hidden="true" className={badgeStyles.edgeShine}>
                <span className={`${badgeStyles.edgeChannel} ${badgeStyles.edgeChannelRed}`} />
                <span className={`${badgeStyles.edgeChannel} ${badgeStyles.edgeChannelGreen}`} />
                <span className={`${badgeStyles.edgeChannel} ${badgeStyles.edgeChannelBlue}`} />
            </span>
            <span aria-hidden="true" className={badgeStyles.edgePrism} />
            <span aria-hidden="true" className={badgeStyles.prism} />
            <span aria-hidden="true" className={badgeStyles.shadow} />
        </span>
    );
}

function ProductChapterFeatureGrid({ chapter }: { chapter: ProductChapter }) {
    const featureRows = chapter.features.reduce<Array<Array<string>>>((rows, feature, index) => {
        if (index % 2 === 0) {
            rows.push([feature]);
        } else {
            rows[rows.length - 1]?.push(feature);
        }

        return rows;
    }, []);

    return (
        <div className="overflow-hidden rounded-[var(--nous-radius-lg)] border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-card-bg)]">
            {featureRows.map((features, rowIndex) => (
                <div
                    className={cn(
                        "grid sm:grid-cols-2",
                        rowIndex < featureRows.length - 1 && "border-b border-[color:var(--nous-stroke-subtle)]"
                    )}
                    key={features.join("-")}
                >
                    {features.map((feature, featureIndex) => {
                        const index = (rowIndex * 2) + featureIndex;

                        return (
                            <div
                                className={cn(
                                    "flex items-center justify-between gap-3 px-3 py-3",
                                    featureIndex === 0 && features.length > 1 && "border-b border-[color:var(--nous-stroke-subtle)] sm:border-b-0 sm:border-r"
                                )}
                                key={feature}
                            >
                                <span className="nous-mono text-[0.625rem] tracking-[0.08em] text-[var(--nous-fg-quieter)]">
                                    {chapter.index.charAt(0)}.{index + 1}
                                </span>
                                <span className="min-w-0 flex-1 text-sm font-medium tracking-[-0.012em] text-[var(--nous-fg-title)]">{feature}</span>
                                <span aria-hidden="true" className="text-[var(--nous-fg-quieter)]">+</span>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

function ProductChapterVisual({ chapter }: { chapter: ProductChapter }) {
    if (chapter.variant === "ask") {
        return (
            <div className="overflow-visible py-2">
                <LazyProductMockup variant="homepage-chat" />
            </div>
        );
    }

    if (chapter.variant === "cortex") {
        return (
            <div className="overflow-hidden py-2">
                <LazyProductMockup variant="cortex-workflow-creation" />
            </div>
        );
    }

    return (
        <div className="overflow-hidden py-2">
            <LazyProductMockup variant="saved-workflow-run" />
        </div>
    );
}
