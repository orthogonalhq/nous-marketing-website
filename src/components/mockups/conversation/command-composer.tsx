import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type DataAttributes = Record<`data-${string}`, string | number | boolean | undefined>;

export type CommandComposerVariant = "compact" | "drawer" | "hero";

export type CommandComposerProps = {
    actions?: ReactNode;
    caretClassName?: string;
    className?: string;
    contentClassName?: string;
    contentProps?: (HTMLAttributes<HTMLDivElement> & DataAttributes);
    hasValue?: boolean;
    leadingActions?: ReactNode;
    leadingActionsClassName?: string;
    placeholder?: ReactNode;
    showCaret?: boolean;
    toolbarClassName?: string;
    toolbarProps?: (HTMLAttributes<HTMLDivElement> & DataAttributes);
    trailingActions?: ReactNode;
    trailingActionsClassName?: string;
    value?: ReactNode;
    valueClassName?: string;
    valueProps?: (HTMLAttributes<HTMLParagraphElement> & DataAttributes);
    variant?: CommandComposerVariant;
};

export function CommandComposer({
    actions,
    caretClassName,
    className,
    contentClassName,
    contentProps,
    hasValue,
    leadingActions,
    leadingActionsClassName,
    placeholder,
    showCaret = false,
    toolbarClassName,
    toolbarProps,
    trailingActions,
    trailingActionsClassName,
    value,
    valueClassName,
    valueProps,
    variant = "hero"
}: CommandComposerProps) {
    const resolvedHasValue = hasValue ?? Boolean(value);
    const displayValue = resolvedHasValue ? value : placeholder;
    const hasToolbar = Boolean(leadingActions || trailingActions || actions);
    const {
        className: contentPropsClassName,
        ...resolvedContentProps
    } = contentProps ?? {};
    const {
        className: toolbarPropsClassName,
        ...resolvedToolbarProps
    } = toolbarProps ?? {};
    const {
        className: valuePropsClassName,
        ...resolvedValueProps
    } = valueProps ?? {};

    const contentVariants: Record<CommandComposerVariant, string> = {
        compact: cn(
            "nous-mobile-scrollbar min-h-[var(--nous-composer-compact-height)] max-h-[var(--nous-composer-compact-max-height)] overflow-y-auto transition-[max-height,min-height] duration-300 ease-out",
            "px-[var(--nous-composer-compact-padding-x)] pb-[var(--nous-composer-compact-padding-bottom)] pt-[var(--nous-composer-compact-padding-top)]",
            "text-[length:var(--nous-composer-compact-font-size)] leading-[var(--nous-composer-compact-leading)]"
        ),
        drawer: cn(
            "min-h-[var(--nous-drawer-command-min-height)]",
            "px-[var(--nous-drawer-command-padding-x)] py-[var(--nous-drawer-command-padding-y)]",
            "text-xs leading-4"
        ),
        hero: cn(
            "nous-mobile-scrollbar min-h-[var(--nous-composer-min-height)] max-h-[var(--nous-composer-max-height)] overflow-y-auto transition-[max-height,min-height] duration-300 ease-out",
            "px-[var(--nous-drawer-command-padding-x)] pb-2 pt-[var(--nous-drawer-command-padding-y)]",
            "text-[length:var(--nous-composer-font-size)] leading-[var(--nous-composer-leading)]"
        )
    };
    const toolbarVariants: Record<CommandComposerVariant, string> = {
        compact: "flex h-[var(--nous-composer-toolbar-height)] items-center justify-between border-t border-[color:var(--nous-stroke-subtle)] px-[var(--nous-composer-toolbar-padding-x)] text-[var(--nous-icon-fg-subtle)]",
        drawer: "flex items-center justify-between border-t border-[color:var(--nous-stroke-subtle)] px-[var(--nous-drawer-command-toolbar-padding-x)] py-[var(--nous-drawer-command-toolbar-padding-y)]",
        hero: "flex h-[var(--nous-composer-toolbar-height)] items-center justify-between border-t border-[color:var(--nous-stroke-subtle)] px-[var(--nous-composer-toolbar-padding-x)] text-[var(--nous-icon-fg-subtle)]"
    };

    return (
        <div
            className={cn(
                "overflow-hidden rounded-[var(--nous-radius-control-lg)]",
                "border border-[color:var(--nous-stroke-subtle)]",
                "bg-[var(--nous-composer-bg)] text-[var(--nous-composer-placeholder-fg)]",
                "shadow-[inset_0_1px_0_var(--nous-stroke-ghost)]",
                className
            )}
            data-command-composer-variant={variant}
        >
            <div
                {...resolvedContentProps}
                className={cn(
                    contentVariants[variant],
                    resolvedHasValue ? "text-[var(--nous-fg-body)]" : "text-[var(--nous-fg-muted)]",
                    contentPropsClassName,
                    contentClassName
                )}
            >
                <p
                    {...resolvedValueProps}
                    className={cn(
                        variant !== "drawer" && "grid min-h-full content-start",
                        variant !== "drawer" && "whitespace-pre-wrap break-words",
                        valuePropsClassName,
                        valueClassName
                    )}
                >
                    <span>
                        {displayValue}
                        {showCaret ? (
                            <span
                                aria-hidden="true"
                                className={cn(
                                    "ml-px inline-block h-[var(--nous-drawer-caret-height)] w-px translate-y-[0.18em] bg-[var(--nous-fg-body)]",
                                    caretClassName
                                )}
                            />
                        ) : null}
                    </span>
                </p>
            </div>
            {hasToolbar ? (
                <div
                    {...resolvedToolbarProps}
                    className={cn(toolbarVariants[variant], toolbarPropsClassName, toolbarClassName)}
                >
                    {leadingActions ? (
                        <div className={cn("flex items-center", leadingActionsClassName)}>{leadingActions}</div>
                    ) : <span aria-hidden="true" />}
                    {trailingActions || actions ? (
                        <div className={cn("flex items-center", trailingActionsClassName)}>
                            {trailingActions}
                            {actions}
                        </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}
