"use client";

import dynamic from "next/dynamic";
import type { CSSProperties } from "react";
import type { RefObject } from "react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import type { CortexWorkflowCreationGraphNodeId, CortexWorkflowCreationMode } from "@/components/product-mockups/cortex-workflow-creation-script";
import type { HomepageChatMockupMode } from "@/components/product-mockups/homepage-chat-section-mockup";
import { productMockupLazyShellClassNameByMode } from "@/components/product-mockups/product-mockup-shell";
import type { ProductMockupShellMode } from "@/components/product-mockups/product-mockup-shell";
import type { SavedWorkflowGraphNodeId, SavedWorkflowStoryboardMode } from "@/components/product-mockups/saved-workflow-storyboard-script";
import { cn } from "@/lib/cn";

type HomepageChatMockupProps = {
    isPlaybackActive?: boolean;
    mode?: HomepageChatMockupMode;
};

type CortexWorkflowCreationMockupProps = {
    isPlaybackActive?: boolean;
    mode?: CortexWorkflowCreationMode;
    previewActiveGraphNodeId?: CortexWorkflowCreationGraphNodeId;
};

type SavedWorkflowRunMockupProps = {
    isPlaybackActive?: boolean;
    mode?: SavedWorkflowStoryboardMode;
    previewActiveGraphNodeId?: SavedWorkflowGraphNodeId;
};

const LazyHomepageChatSectionMockup = dynamic<HomepageChatMockupProps>(
    () => import("@/components/product-mockups/homepage-chat-section-mockup").then((module) => module.HomepageChatSectionMockup),
    { ssr: false }
);

const LazyCortexWorkflowCreationMockup = dynamic<CortexWorkflowCreationMockupProps>(
    () => import("@/components/product-mockups/cortex-workflow-creation-mockup").then((module) => module.CortexWorkflowCreationMockup),
    { ssr: false }
);

const LazySavedWorkflowRunWireframeMockup = dynamic<SavedWorkflowRunMockupProps>(
    () => import("@/components/product-mockups/saved-workflow-run-wireframe-mockup").then((module) => module.SavedWorkflowRunWireframeMockup),
    { ssr: false }
);

type LazyProductMockupProps =
    | {
        mode?: HomepageChatMockupMode;
        rootMargin?: string;
        variant: "homepage-chat";
    }
    | {
        mode?: CortexWorkflowCreationMode;
        previewActiveGraphNodeId?: CortexWorkflowCreationGraphNodeId;
        rootMargin?: string;
        variant: "cortex-workflow-creation";
    }
    | {
        mode?: SavedWorkflowStoryboardMode;
        previewActiveGraphNodeId?: SavedWorkflowGraphNodeId;
        rootMargin?: string;
        variant: "saved-workflow-run";
    };

const placeholderCopyByVariant = {
    "cortex-workflow-creation": "Cortex workflow creation mockup loading when near viewport",
    "homepage-chat": "Homepage chat visual mockup loading when near viewport",
    "saved-workflow-run": "Saved workflow run wireframe mockup loading when near viewport"
} as const;

export function LazyProductMockup(props: LazyProductMockupProps) {
    const { rootMargin = "900px 0px 900px", variant } = props;
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
    const [isPlaybackActive, setIsPlaybackActive] = useState(false);
    const mobileMetrics = useMobileProductMockupMetrics(containerRef, props.mode === "static" ? "static" : "storyboard");

    useEffect(() => {
        if (typeof window.IntersectionObserver !== "function") {
            const timeout = window.setTimeout(() => {
                setHasEnteredViewport(true);
                setIsPlaybackActive(true);
            }, 0);

            return () => window.clearTimeout(timeout);
        }

        const containerElement = containerRef.current;

        if (!containerElement) {
            return undefined;
        }

        const observer = new window.IntersectionObserver(
            ([entry]) => {
                const isIntersecting = Boolean(entry?.isIntersecting);

                setIsPlaybackActive(isIntersecting);

                if (isIntersecting) {
                    setHasEnteredViewport(true);
                }
            },
            { rootMargin, threshold: 0.01 }
        );

        observer.observe(containerElement);

        return () => observer.disconnect();
    }, [rootMargin]);

    return (
        <div
            className={cn(
                "relative max-md:-left-2 max-md:w-[calc(100%+1rem)] max-md:overflow-hidden",
                getLazyProductMockupShellClassName(props)
            )}
            data-lazy-product-mockup={variant}
            data-lazy-product-mockup-playback={isPlaybackActive ? "active" : "paused"}
            ref={containerRef}
            style={mobileMetrics.style}
        >
            {hasEnteredViewport ? (
                <MobileScaledProductMockupStage variant={variant}>
                    {renderMockup(props, isPlaybackActive)}
                </MobileScaledProductMockupStage>
            ) : <LazyProductMockupPlaceholder variant={variant} />}
        </div>
    );
}

function MobileScaledProductMockupStage({ children, variant }: { children: ReactNode; variant: LazyProductMockupProps["variant"] }) {
    return (
        <div
            className={cn(
                "md:contents",
                "max-md:absolute max-md:top-0 max-md:w-[var(--nous-home-chat-frame-width)] max-md:origin-top-left",
                "max-md:left-1",
                "max-md:scale-[var(--nous-product-mockup-mobile-scale,0.42)]"
            )}
            data-lazy-product-mockup-mobile-variant={variant}
            data-lazy-product-mockup-mobile-scale="fit-width"
        >
            {children}
        </div>
    );
}

function getLazyProductMockupShellClassName(props: LazyProductMockupProps) {
    const mode: ProductMockupShellMode = props.mode === "static" ? "static" : "storyboard";

    return productMockupLazyShellClassNameByMode[mode];
}

function useMobileProductMockupMetrics(containerRef: RefObject<HTMLDivElement | null>, mode: ProductMockupShellMode) {
    const [metrics, setMetrics] = useState({
        scale: 0.42,
        shellHeight: mode === "static" ? 270 : 312
    });

    useEffect(() => {
        const updateMetrics = () => {
            const rootStyle = window.getComputedStyle(document.documentElement);
            const desktopWidth = parseCssPixelValue(rootStyle.getPropertyValue("--nous-home-chat-frame-width"), 1120);
            const frameHeight = parseCssPixelValue(rootStyle.getPropertyValue("--nous-home-chat-frame-height"), 486);
            const rootFontSize = parseCssPixelValue(rootStyle.fontSize, 16);
            const storyboardControlHeight = mode === "storyboard" ? rootFontSize * 2.5 : 0;
            const containerWidth = containerRef.current?.getBoundingClientRect().width ?? window.innerWidth;
            const mobileGutter = 4;
            const availableWidth = Math.max(0, containerWidth - mobileGutter * 2);
            const nextScale = Math.min(1, availableWidth / desktopWidth);
            const nextShellHeight = Math.ceil((frameHeight + storyboardControlHeight) * nextScale);

            setMetrics({
                scale: nextScale,
                shellHeight: nextShellHeight
            });
        };

        updateMetrics();
        window.addEventListener("resize", updateMetrics);

        const resizeObserver = typeof window.ResizeObserver === "function" && containerRef.current
            ? new window.ResizeObserver(updateMetrics)
            : null;

        resizeObserver?.observe(containerRef.current as HTMLDivElement);

        return () => {
            window.removeEventListener("resize", updateMetrics);
            resizeObserver?.disconnect();
        };
    }, [containerRef, mode]);

    return {
        style: {
            "--nous-product-mockup-mobile-scale": metrics.scale.toString(),
            "--nous-product-mockup-mobile-shell-height": `${metrics.shellHeight}px`
        } as CSSProperties
    };
}

function parseCssPixelValue(value: string, fallback: number) {
    const parsedValue = Number.parseFloat(value);

    return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

function LazyProductMockupPlaceholder({ variant }: { variant: LazyProductMockupProps["variant"] }) {
    return (
        <div
            aria-label={placeholderCopyByVariant[variant]}
            className="absolute inset-0 rounded-[var(--nous-radius-xl)] border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-card-bg)]"
        />
    );
}

function renderMockup(props: LazyProductMockupProps, isPlaybackActive: boolean) {
    if (props.variant === "homepage-chat") {
        return <LazyHomepageChatSectionMockup isPlaybackActive={isPlaybackActive} mode={props.mode} />;
    }

    if (props.variant === "cortex-workflow-creation") {
        return <LazyCortexWorkflowCreationMockup isPlaybackActive={isPlaybackActive} mode={props.mode} previewActiveGraphNodeId={props.previewActiveGraphNodeId} />;
    }

    return <LazySavedWorkflowRunWireframeMockup isPlaybackActive={isPlaybackActive} mode={props.mode} previewActiveGraphNodeId={props.previewActiveGraphNodeId} />;
}
