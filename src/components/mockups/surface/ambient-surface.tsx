import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type DataAttributes = Record<`data-${string}`, string | number | boolean | undefined>;
type AmbientSurfaceElement = "article" | "aside" | "div" | "section";

export type AmbientLayerProps = {
    className?: string;
    insetClassName?: string;
    style?: CSSProperties;
} & DataAttributes;

export type AmbientSurfaceProps = {
    ariaLabel?: string;
    as?: AmbientSurfaceElement;
    children: ReactNode;
    className?: string;
    contentClassName?: string;
    contentProps?: (HTMLAttributes<HTMLDivElement> & DataAttributes);
    id?: string;
    layers?: readonly AmbientLayerProps[];
    role?: string;
    style?: CSSProperties;
} & DataAttributes;

export function AmbientLayer({ className, insetClassName = "inset-0", style, ...layerProps }: AmbientLayerProps) {
    return (
        <div
            {...layerProps}
            aria-hidden="true"
            className={cn("pointer-events-none absolute", insetClassName, className)}
            style={style}
        />
    );
}

export function AmbientSurface({
    ariaLabel,
    as: Component = "div",
    children,
    className,
    contentClassName,
    contentProps,
    id,
    layers = [],
    role,
    style,
    ...surfaceProps
}: AmbientSurfaceProps) {
    const { className: contentPropsClassName, ...resolvedContentProps } = contentProps ?? {};

    return (
        <Component
            {...surfaceProps}
            aria-label={ariaLabel}
            className={cn("relative overflow-hidden", className)}
            id={id}
            role={role}
            style={style}
        >
            {layers.map((layer, index) => (
                <AmbientLayer key={index} {...layer} />
            ))}
            <div {...resolvedContentProps} className={cn("relative z-10", contentPropsClassName, contentClassName)}>
                {children}
            </div>
        </Component>
    );
}
