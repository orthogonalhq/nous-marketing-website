import type { CSSProperties, ReactNode } from "react";

import { Glyph } from "./icons";
import type { GlyphName } from "./icons";
import { cn } from "./utils";

export type ChipVariant = "default" | "active" | "success" | "info" | "warning";
type ButtonVariant = "ghost" | "soft" | "primary" | "warning" | "icon";
type SurfaceElement = "article" | "aside" | "div" | "section";
type SurfaceRadius = "control" | "message" | "none" | "sm" | "md" | "lg" | "xl";
type SurfaceShadow = "none" | "card" | "overlay";
type SurfaceStroke = "none" | "soft" | "subtle" | "default" | "strong";
type SurfaceTone = "card" | "inset" | "muted" | "panel" | "transparent";
type ChipSize = "sm" | "md" | "lg";
type ChipShape = "pill" | "rounded";
type ChipPriority = "default" | "high" | "low";
type GlyphButtonAs = "button" | "span";
type GlyphButtonShape = "rounded" | "circle";
type GlyphButtonTone = "default" | "green" | "workspace";
type GlyphButtonVariant = "muted" | "surface";
type ScrollableRegionElement = "div" | "nav" | "section";
type DataAttributes = Record<`data-${string}`, string | number | boolean | undefined>;
type GlyphButtonSize = "xs" | "default" | "rail" | "lg";

export type SegmentedControlItem = {
    active?: boolean;
    ariaControls?: string;
    className?: string;
    disabled?: boolean;
    icon?: GlyphName;
    id?: string;
    label: ReactNode;
    metadata?: ReactNode;
};

export type DescriptionListRow = {
    key?: string;
    label: ReactNode;
    value: ReactNode;
    visible?: boolean;
};

export function Surface({
    ariaLabel,
    as: Component = "article",
    children,
    className,
    id,
    radius = "lg",
    role,
    shadow = "none",
    stroke = "soft",
    style,
    tone = "card",
    ...surfaceProps
}: {
    ariaLabel?: string;
    as?: SurfaceElement;
    children: ReactNode;
    className?: string;
    id?: string;
    radius?: SurfaceRadius;
    role?: string;
    shadow?: SurfaceShadow;
    stroke?: SurfaceStroke;
    style?: CSSProperties;
    tone?: SurfaceTone;
} & DataAttributes) {
    const tones: Record<SurfaceTone, string> = {
        card: "bg-[var(--nous-card-bg)]",
        inset: "bg-[var(--nous-bg-inset)]",
        muted: "bg-[var(--nous-card-bg-muted)]",
        panel: "bg-[var(--nous-bg-panel)]",
        transparent: "bg-transparent"
    };
    const strokes: Record<SurfaceStroke, string> = {
        default: "border border-[color:var(--nous-stroke-default)]",
        none: "border-0",
        soft: "border border-[color:var(--nous-stroke-soft)]",
        strong: "border border-[color:var(--nous-stroke-strong)]",
        subtle: "border border-[color:var(--nous-stroke-subtle)]"
    };
    const radii: Record<SurfaceRadius, string> = {
        control: "rounded-[var(--nous-radius-control)]",
        lg: "rounded-[var(--nous-radius-lg)]",
        message: "rounded-[var(--nous-drawer-message-radius)]",
        md: "rounded-[var(--nous-radius-md)]",
        none: "rounded-none",
        sm: "rounded-[var(--nous-radius-sm)]",
        xl: "rounded-[var(--nous-radius-xl)]"
    };
    const shadows: Record<SurfaceShadow, string> = {
        card: "shadow-[var(--nous-shadow-card)]",
        none: "shadow-none",
        overlay: "shadow-[var(--nous-shadow-overlay)]"
    };

    return (
        <Component
            {...surfaceProps}
            aria-label={ariaLabel}
            className={cn(
                "nous-surface",
                radii[radius],
                strokes[stroke],
                tones[tone],
                shadows[shadow],
                className
            )}
            id={id}
            role={role}
            style={style}
        >
            {children}
        </Component>
    );
}

export function NavItem({ active, className, href, icon, label }: { active?: boolean; className?: string; href?: string; icon: GlyphName; label: string }) {
    return (
        <a
            className={cn(
                "flex items-center gap-[var(--nous-nav-item-gap)] rounded-[var(--nous-radius-md)] p-[var(--nous-nav-item-padding)] text-sm font-semibold transition",
                active
                    ? "border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-nav-item-bg-active)] text-[var(--nous-nav-item-fg-active)]"
                    : "text-[var(--nous-fg-body)] hover:bg-[var(--nous-nav-item-bg-active)]",
                className
            )}
            href={href}
        >
            <Glyph name={icon} className="size-[var(--nous-nav-icon-size)] text-[var(--nous-icon-fg-muted)]" />
            <span className="truncate">{label}</span>
        </a>
    );
}

export function SegmentedControl({
    ariaLabel,
    className,
    itemClassName,
    items,
    onSelect,
    role = "tablist"
}: {
    ariaLabel?: string;
    className?: string;
    itemClassName?: string;
    items: readonly SegmentedControlItem[];
    onSelect?: (item: SegmentedControlItem, index: number) => void;
    role?: "group" | "tablist";
}) {
    const isInteractive = Boolean(onSelect);

    return (
        <div
            aria-label={ariaLabel}
            className={cn(
                "inline-flex rounded-[var(--nous-radius-sm)] border border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-bg-control)] p-[var(--nous-segmented-padding)] text-xs text-[var(--nous-fg-secondary)]",
                className
            )}
            role={role}
        >
            {items.map((item, index) => {
                const key = item.id ?? String(item.label);
                const itemClasses = cn(
                    "flex items-center gap-[var(--nous-segmented-item-gap)] rounded-[var(--nous-radius-xs)] pl-[var(--nous-segmented-item-padding-left)] py-[var(--nous-segmented-item-padding-y)] pr-[var(--nous-segmented-item-padding-right)]",
                    item.active && "border border-[var(--nous-stroke-ghost)] bg-[var(--nous-bg-selected-subtle)] text-[var(--nous-fg-primary)]",
                    isInteractive && "transition hover:bg-[var(--nous-control-bg-soft)] disabled:pointer-events-none disabled:opacity-50",
                    itemClassName,
                    item.className
                );
                const content = (
                    <>
                        {item.icon ? <Glyph className={cn("h-2.5 w-2.5", item.active && "text-[var(--nous-accent-info)]")} name={item.icon} /> : null}
                        <span>{item.label}</span>
                        {item.metadata ? <span className="nous-mono text-[length:var(--nous-type-micro-xs)] text-[var(--nous-fg-quieter)]">{item.metadata}</span> : null}
                    </>
                );

                if (isInteractive) {
                    return (
                        <button
                            aria-controls={item.ariaControls}
                            aria-selected={role === "tablist" ? Boolean(item.active) : undefined}
                            className={itemClasses}
                            disabled={item.disabled}
                            id={item.id}
                            key={key}
                            onClick={() => onSelect?.(item, index)}
                            role={role === "tablist" ? "tab" : undefined}
                            type="button"
                        >
                            {content}
                        </button>
                    );
                }

                return (
                    <span
                        aria-controls={item.ariaControls}
                        aria-selected={role === "tablist" ? Boolean(item.active) : undefined}
                        className={itemClasses}
                        id={item.id}
                        key={key}
                        role={role === "tablist" ? "tab" : undefined}
                    >
                        {content}
                    </span>
                );
            })}
        </div>
    );
}

export function SegmentedTabs({ tabs }: { tabs: ReadonlyArray<readonly [GlyphName, string, boolean]> }) {
    return <SegmentedControl items={tabs.map(([icon, label, active]) => ({ active, icon, label }))} />;
}

export function CommandInput({ value }: { value: string }) {
    return (
        <div className="border-t border-[color:var(--nous-stroke-subtle)] p-4">
            <div className="flex min-h-20 items-start gap-3 rounded-[var(--nous-radius-lg)] border border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-composer-bg)] px-4 py-3 text-sm text-[var(--nous-composer-placeholder-fg)]">
                <Glyph name="add" className="mt-1 text-[var(--nous-fg-body)]" />
                <p className="flex-1 leading-6">{value}</p>
                <Glyph name="mic" className="mt-auto text-[var(--nous-fg-subtle)]" />
                <span className="mt-auto grid size-7 place-items-center rounded-[var(--nous-radius-md)] bg-[var(--nous-control-bg-soft)] text-[var(--nous-fg-primary)]">
                    <Glyph name="send" />
                </span>
            </div>
        </div>
    );
}

export function Button({ children, className, icon, variant = "soft" }: { children?: ReactNode; className?: string; icon?: GlyphName; variant?: ButtonVariant }) {
    const variants: Record<ButtonVariant, string> = {
        ghost: "text-[var(--nous-fg-body)] hover:bg-[var(--nous-control-bg-soft)]",
        icon: "size-8 border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-bg-panel)] px-0 text-[var(--nous-fg-body)]",
        primary: "border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-accent-info-bg)] text-[var(--nous-accent-info-fg)]",
        soft: "border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-control-bg-soft)] text-[var(--nous-fg-primary)]",
        warning: "border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-accent-warning-bg-muted)] text-[var(--nous-accent-warning)]"
    };

    return (
        <button
            className={cn(
                "nous-mono inline-flex items-center justify-center gap-[var(--nous-control-gap)] rounded-[var(--nous-control-radius-sm)] border px-[var(--nous-control-padding-x)] py-[var(--nous-control-padding-y)] text-xs transition",
                variants[variant],
                className
            )}
            type="button"
        >
            <span className="!text-[var(--nous-fg-primary)]">{children}</span>
            {icon ? <Glyph className="size-[var(--nous-control-icon-size-xs)]" name={icon} /> : null}
        </button>
    );
}

export function Chip({
    children,
    className,
    interactive = false,
    mono = true,
    priority = "default",
    shape = "pill",
    size = "md",
    tone,
    variant
}: {
    children: ReactNode;
    className?: string;
    interactive?: boolean;
    mono?: boolean;
    priority?: ChipPriority;
    shape?: ChipShape;
    size?: ChipSize;
    tone?: ChipVariant;
    variant?: ChipVariant;
}) {
    const resolvedTone = tone ?? variant ?? "default";
    const variants: Record<ChipVariant, string> = {
        active: "border-none bg-[var(--nous-accent-info-bg)] text-[var(--nous-accent-info-fg)]",
        default: "border-none bg-[var(--nous-control-bg-soft)] text-[var(--nous-fg-body)]",
        info: "border-none bg-[var(--nous-accent-info-bg-subtle)] text-[var(--nous-accent-info-fg-muted)]",
        success: "border-none bg-[var(--nous-accent-success-bg)] text-[var(--nous-accent-success-fg)]",
        warning: "border-none bg-[var(--nous-accent-warning-bg)] text-[var(--nous-accent-warning)]"
    };
    const sizes: Record<ChipSize, string> = {
        lg: "px-4 py-1 text-[length:var(--nous-type-action)]",
        md: "px-4 py-0.75 text-xs",
        sm: "px-2.5 py-0.5 text-[length:var(--nous-type-caption)]"
    };
    const shapes: Record<ChipShape, string> = {
        pill: "rounded-full",
        rounded: "rounded-[var(--nous-radius-md)]"
    };
    const priorities: Record<ChipPriority, string> = {
        default: "",
        high: "ring-1 ring-[var(--nous-stroke-subtle)]",
        low: "opacity-80"
    };

    return (
        <span
            className={cn(
                "inline-flex items-center border",
                mono && "nous-mono",
                sizes[size],
                shapes[shape],
                variants[resolvedTone],
                priorities[priority],
                interactive && "transition hover:bg-[var(--nous-bg-selected-subtle)]",
                className
            )}
        >
            {children}
        </span>
    );
}

export function GlyphButton({
    active,
    as = "button",
    buttonClassName,
    className,
    icon,
    iconClassName,
    label,
    onClick,
    shape = "rounded",
    size = "default",
    surface,
    tone = "default",
    variant = "muted"
}: {
    active?: boolean;
    as?: GlyphButtonAs;
    buttonClassName?: string;
    className?: string;
    icon: GlyphName;
    iconClassName?: string;
    label: string;
    onClick?: () => void;
    shape?: GlyphButtonShape;
    size?: GlyphButtonSize;
    surface?: GlyphButtonVariant;
    tone?: GlyphButtonTone;
    variant?: GlyphButtonVariant;
}) {
    const sizes: Record<GlyphButtonSize, string> = {
        default: "size-[var(--nous-control-size-sm)]",
        lg: "size-[var(--nous-control-size-lg)]",
        rail: "m-[var(--nous-rail-item-margin)] size-[var(--nous-control-size-md)]",
        xs: "size-5"
    };
    const shapes: Record<GlyphButtonShape, string> = {
        circle: "rounded-full",
        rounded: size === "rail" ? "rounded-[var(--nous-radius-md)]" : "rounded-[var(--nous-control-radius-xs)]"
    };
    const variants: Record<GlyphButtonVariant, string> = {
        muted: "border-transparent text-[var(--nous-icon-fg-muted)]",
        surface: "border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-bg-control)] text-[var(--nous-icon-fg-primary)]"
    };
    const tones: Record<GlyphButtonTone, string> = {
        default: "",
        green: "bg-[var(--nous-accent-success)] text-[var(--nous-fg-primary)]",
        workspace: "bg-[var(--nous-accent-workspace)] text-[var(--nous-fg-primary)]"
    };
    const resolvedVariant = surface ?? variant;
    const resolvedTone = active ? "workspace" : tone;
    const classes = cn(
        "grid place-items-center border transition",
        sizes[size],
        shapes[shape],
        variants[resolvedVariant],
        tones[resolvedTone],
        !active && tone === "default" && "hover:border-[color:var(--nous-stroke-subtle)] hover:bg-[var(--nous-control-bg-soft)]",
        buttonClassName,
        className
    );
    const glyph = <Glyph className={cn("size-[var(--nous-control-icon-size-sm)]", iconClassName)} name={icon} strokeWidth={1.5} />;

    if (as === "span") {
        return (
            <span aria-label={label} className={classes} role="img">
                {glyph}
            </span>
        );
    }

    return (
        <button aria-label={label} className={classes} onClick={onClick} type="button">
            {glyph}
        </button>
    );
}

export function Disclosure({
    children,
    className,
    contentClassName,
    defaultOpen = false,
    summary,
    summaryClassName
}: {
    children: ReactNode;
    className?: string;
    contentClassName?: string;
    defaultOpen?: boolean;
    summary: ReactNode;
    summaryClassName?: string;
}) {
    return (
        <details className={className} open={defaultOpen}>
            <summary
                className={cn(
                    "flex cursor-pointer list-none items-center gap-2 rounded-[var(--nous-radius-md)] transition-colors marker:content-none [&::-webkit-details-marker]:hidden",
                    summaryClassName
                )}
            >
                {summary}
            </summary>
            <div className={contentClassName}>{children}</div>
        </details>
    );
}

export function DescriptionList({
    className,
    divided = false,
    labelClassName,
    labelWidth = "var(--nous-drawer-dl-label-width)",
    rowClassName,
    rows,
    valueClassName
}: {
    className?: string;
    divided?: boolean;
    labelClassName?: string;
    labelWidth?: string;
    rowClassName?: string;
    rows: readonly DescriptionListRow[];
    valueClassName?: string;
}) {
    return (
        <dl className={cn("text-[var(--nous-drawer-body-fg)]", className)}>
            {rows.filter((row) => row.visible ?? true).map((row, index) => (
                <div
                    className={cn(
                        "grid gap-x-[var(--nous-drawer-status-gap)] gap-y-1",
                        divided && "border-t border-[color:var(--nous-stroke-subtle)] py-2 first:border-t-0 first:pt-0 last:pb-0",
                        rowClassName
                    )}
                    key={row.key ?? index}
                    style={{ gridTemplateColumns: `${labelWidth} minmax(0, 1fr)` }}
                >
                    <dt className={cn("nous-mono text-[length:var(--nous-type-meta)] font-semibold text-[var(--nous-drawer-meta-fg)]", labelClassName)}>{row.label}</dt>
                    <dd className={valueClassName}>{row.value}</dd>
                </div>
            ))}
        </dl>
    );
}

export function ScrollableRegion({
    ariaLabel,
    as: Component = "div",
    children,
    className,
    scrollbar = "mobile"
}: {
    ariaLabel?: string;
    as?: ScrollableRegionElement;
    children: ReactNode;
    className?: string;
    scrollbar?: "hidden" | "mobile" | "native";
}) {
    const scrollbars: Record<NonNullable<typeof scrollbar>, string> = {
        hidden: "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        mobile: "nous-mobile-scrollbar",
        native: ""
    };

    return (
        <Component
            aria-label={ariaLabel}
            className={cn(
                "min-h-0 flex-1 overflow-y-auto overscroll-contain",
                scrollbars[scrollbar],
                className
            )}
        >
            {children}
        </Component>
    );
}

export function PanelHeader({
    actions,
    className,
    description,
    leading,
    tabs,
    title,
    titleClassName
}: {
    actions?: ReactNode;
    className?: string;
    description?: ReactNode;
    leading?: ReactNode;
    tabs?: ReactNode;
    title: ReactNode;
    titleClassName?: string;
}) {
    return (
        <header className={cn("flex items-center justify-between gap-4", className)}>
            <div className="flex min-w-0 items-center gap-3">
                {leading}
                <div className="min-w-0">
                    <h2 className={cn("truncate text-sm font-semibold text-[var(--nous-panel-header-fg)]", titleClassName)}>{title}</h2>
                    {description ? <p className="mt-1 text-xs text-[var(--nous-fg-muted)]">{description}</p> : null}
                </div>
            </div>
            {tabs ? <div className="shrink-0">{tabs}</div> : null}
            {actions ? <div className="flex shrink-0 items-center gap-[var(--nous-control-gap)]">{actions}</div> : null}
        </header>
    );
}
