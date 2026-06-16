import { useId } from "react";
import type { CSSProperties, ReactNode } from "react";

import { Glyph, Surface } from "@/components/design-system/mockup/components";
import type { GlyphName } from "@/components/design-system/mockup/components";
import { AmbientLayer } from "@/components/mockups/surface";
import {
    workflowGraphGridDotCenterPx,
    workflowGraphGridDotRadiusPx,
    workflowGraphGridSizePx
} from "@/components/mockups/workflow/workflow-grid";
import { cn } from "@/lib/cn";

export type WorkflowNodeStatus = "active" | "complete" | "done" | "queued";

export type WorkflowNodeItem = {
    badges?: readonly string[];
    detail: string;
    icon: GlyphName;
    id: string;
    kind?: "primary" | "tool";
    placeholder?: boolean;
    placeholderSize?: "node" | "subnode";
    placeholderState?: "idle" | "pressed";
    positionClassName: string;
    positionStyle?: CSSProperties;
    ports?: readonly WorkflowNodePortItem[];
    shape?: "event" | "gate";
    showCompletionCheck?: boolean;
    stackId?: string;
    stackPosition?: "first" | "last" | "middle" | "only";
    status: WorkflowNodeStatus;
    title: string;
};

export type WorkflowNodePortItem = {
    label: string;
    left: string;
};

export type WorkflowConnectorItem = {
    active?: boolean;
    id: string;
    path?: {
        arrowD?: string;
        bidirectional?: boolean;
        d: string;
        label?: string;
        labelPositionStyle?: CSSProperties;
        positionClassName: string;
        positionStyle?: CSSProperties;
        variant?: "primary" | "tool";
        viewBox: string;
    };
    positionClassName?: string;
    segments?: readonly string[];
};

export function WorkflowRunFrame({ ariaLabel, children }: { ariaLabel: string; children: ReactNode }) {
    return (
        <article
            aria-label={ariaLabel}
            className="relative"
            data-saved-workflow-run-wireframe="true"
        >
            {children}
        </article>
    );
}

export function WorkflowAmbientBackdrop() {
    return (
        <>
            <AmbientLayer className="[background:var(--nous-workflow-run-radial-bg)]" />
            <AmbientLayer className="[background-image:var(--nous-workflow-run-highlight-bg)]" />
        </>
    );
}

export function WorkflowRunLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative grid min-h-[var(--nous-workflow-run-min-height)] lg:grid-cols-[minmax(21rem,0.88fr)_minmax(0,1.12fr)]">
            {children}
        </div>
    );
}

export function WorkflowRunPanel({ ariaLabel, children, className, padding = "default", variant = "default" }: {
    ariaLabel: string;
    children: ReactNode;
    className?: string;
    padding?: "default" | "none";
    variant?: "companion" | "default";
}) {
    return (
        <section
            aria-label={ariaLabel}
            className={cn(
                "relative z-10",
                padding === "default" && "p-4 sm:p-6",
                variant === "companion" && "border-b border-[color:var(--nous-stroke-subtle)] lg:border-b-0 lg:border-r",
                className
            )}
        >
            {children}
        </section>
    );
}

export function WorkflowEditorPanel({ className, connectors, nodes, surface = "panel" }: {
    className?: string;
    connectors: readonly WorkflowConnectorItem[];
    nodes: readonly WorkflowNodeItem[];
    surface?: "panel" | "transparent";
}) {
    const stackGroups = getWorkflowNodeStackGroups(nodes);
    const stackedNodeIds = new Set(stackGroups.flatMap((group) => group.nodes.map((node) => node.id)));
    const standaloneNodes = nodes.filter((node) => !stackedNodeIds.has(node.id));

    return (
        <WorkflowRunPanel ariaLabel="Unfocused workflow run graph" className={cn("overflow-hidden shadow-[inset_1px_0_0_var(--nous-stroke-ghost)]", surface === "panel" && "[background:var(--nous-workflow-panel-bg)]", className)} padding="none">
            <WorkflowPanelRadial />
            <WorkflowGraphViewport>
                <WorkflowGraphCanvas>
                    {connectors.map((connector) => (
                        <WorkflowConnector key={connector.id} {...connector} />
                    ))}

                    {standaloneNodes.map((node) => (
                        <WorkflowNode key={node.id} {...node} />
                    ))}

                    {stackGroups.map((group) => (
                        <WorkflowNodeStack key={group.id} nodes={group.nodes} stackId={group.id} />
                    ))}

                </WorkflowGraphCanvas>
            </WorkflowGraphViewport>
        </WorkflowRunPanel>
    );
}

function getWorkflowNodeStackGroups(nodes: readonly WorkflowNodeItem[]) {
    const groups = new Map<string, WorkflowNodeItem[]>();

    nodes.forEach((node) => {
        if (!node.stackId) {
            return;
        }

        const group = groups.get(node.stackId) ?? [];
        group.push(node);
        groups.set(node.stackId, group);
    });

    return [...groups.entries()].map(([id, groupNodes]) => ({
        id,
        nodes: groupNodes
    }));
}

function WorkflowNodeStack({ nodes, stackId }: { nodes: readonly WorkflowNodeItem[]; stackId: string }) {
    const firstNode = nodes[0];
    const realStackNodeIds = nodes.filter((node) => !node.placeholder).map((node) => node.id);
    const stackStyle: CSSProperties = {
        left: firstNode?.positionStyle?.left,
        top: firstNode?.positionStyle?.top,
        width: firstNode?.positionStyle?.width
    };

    return (
        <div className="nous-workflow-node-stack absolute z-10 flex flex-col" data-workflow-node-stack={stackId} style={stackStyle}>
            {nodes.map((node) => (
                <WorkflowNode isStacked key={node.id} {...getWorkflowNodeWithResolvedStackPosition(node, realStackNodeIds)} />
            ))}
        </div>
    );
}

function getWorkflowNodeWithResolvedStackPosition(node: WorkflowNodeItem, realStackNodeIds: readonly string[]): WorkflowNodeItem {
    if (node.placeholder) {
        return node;
    }

    const realNodeIndex = realStackNodeIds.indexOf(node.id);

    if (realNodeIndex === -1) {
        return node;
    }

    if (realStackNodeIds.length === 1) {
        return {
            ...node,
            stackPosition: "only"
        };
    }

    if (realNodeIndex === 0) {
        return {
            ...node,
            stackPosition: "first"
        };
    }

    if (realNodeIndex === realStackNodeIds.length - 1) {
        return {
            ...node,
            stackPosition: "last"
        };
    }

    return {
        ...node,
        stackPosition: "middle"
    };
}

function WorkflowGraphGrid() {
    const gridPatternId = `workflow-dot-grid-${useId().replaceAll(":", "")}`;

    return (
        <svg
            aria-hidden="true"
            className="pointer-events-none absolute"
            data-workflow-dot-grid="true"
            height="100%"
            preserveAspectRatio="none"
            style={{
                height: `calc(100% + ${workflowGraphGridSizePx * 2}px)`,
                transform: `translate(${-workflowGraphGridSizePx}px, ${-workflowGraphGridSizePx}px)`,
                width: `calc(100% + ${workflowGraphGridSizePx * 2}px)`
            }}
            width="100%"
        >
            <defs>
                <pattern
                    height={workflowGraphGridSizePx}
                    id={gridPatternId}
                    patternUnits="userSpaceOnUse"
                    width={workflowGraphGridSizePx}
                >
                    <circle cx={workflowGraphGridDotCenterPx} cy={workflowGraphGridDotCenterPx} fill="var(--nous-workflow-graph-grid-dot)" r={workflowGraphGridDotRadiusPx} />
                </pattern>
            </defs>
            <rect fill={`url(#${gridPatternId})`} height="100%" width="100%" />
        </svg>
    );
}

function WorkflowPanelRadial() {
    return (
        <AmbientLayer className="[background:var(--nous-workflow-panel-radial-bg)]" />
    );
}

function WorkflowGraphViewport({ children }: { children: ReactNode }) {
    return (
        <div className="relative z-10 h-full overflow-hidden lg:opacity-[var(--nous-workflow-unfocused-opacity)]">
            {children}
        </div>
    );
}

function WorkflowGraphCanvas({ children }: { children: ReactNode }) {
    return (
        <div className="relative h-full min-h-[var(--nous-workflow-graph-canvas-height)] w-full min-w-0">
            <WorkflowGraphGrid />
            {children}
        </div>
    );
}

function WorkflowConnector({ active, id, path, positionClassName, segments }: WorkflowConnectorItem) {
    const segmentClassNames = segments ?? (positionClassName ? [positionClassName] : []);

    if (path) {
        const activeMarkerId = `nous-workflow-connector-arrow-${id}`;
        const baseMarkerId = `nous-workflow-connector-arrow-base-${id}`;
        const usesInlineArrow = Boolean(path.arrowD);
        const usesBidirectionalArrows = Boolean(path.bidirectional);
        const isToolConnector = path.variant === "tool";

        return (
            <>
                <svg
                    aria-hidden="true"
                    className={cn("absolute overflow-visible", path.positionClassName)}
                    data-workflow-connector={id}
                    data-workflow-connector-active={active ? "true" : "false"}
                    data-workflow-connector-bidirectional={usesBidirectionalArrows ? "true" : "false"}
                    data-workflow-connector-kind="path"
                    data-workflow-connector-terminal="true"
                    data-workflow-connector-variant={path.variant ?? "primary"}
                    preserveAspectRatio="none"
                    style={path.positionStyle}
                    viewBox={path.viewBox}
                >
                    {!usesInlineArrow ? (
                        <defs>
                            {usesBidirectionalArrows ? (
                                <marker
                                    id={baseMarkerId}
                                    markerHeight="5"
                                    markerUnits="strokeWidth"
                                    markerWidth="5"
                                    orient="auto-start-reverse"
                                    refX="7"
                                    refY="4"
                                    viewBox="0 0 8 8"
                                >
                                    <path d="M1 1 7 4 1 7Z" fill="var(--nous-workflow-connector-stroke)" />
                                </marker>
                            ) : null}
                            <marker
                                id={activeMarkerId}
                                markerHeight="5"
                                markerUnits="strokeWidth"
                                markerWidth="5"
                                orient={usesBidirectionalArrows ? "auto-start-reverse" : "auto"}
                                refX="7"
                                refY="4"
                                viewBox="0 0 8 8"
                            >
                                <path d="M1 1 7 4 1 7Z" fill="var(--nous-workflow-connector-active-stroke)" />
                            </marker>
                        </defs>
                    ) : null}
                    <path
                        className={cn(
                            "fill-none stroke-[var(--nous-workflow-connector-stroke)]",
                            isToolConnector && "nous-workflow-connector-path-tool"
                        )}
                        d={path.d}
                        markerEnd={usesBidirectionalArrows ? `url(#${baseMarkerId})` : undefined}
                        markerStart={usesBidirectionalArrows ? `url(#${baseMarkerId})` : undefined}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                    />
                    {active ? (
                        <path
                            className={cn(
                                "fill-none stroke-[var(--nous-workflow-connector-active-stroke)]",
                                isToolConnector ? "nous-workflow-connector-path-tool-active" : "nous-workflow-connector-path-active"
                            )}
                            d={path.d}
                            markerEnd={!usesInlineArrow ? `url(#${activeMarkerId})` : undefined}
                            markerStart={usesBidirectionalArrows ? `url(#${activeMarkerId})` : undefined}
                            pathLength={isToolConnector ? undefined : 1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            vectorEffect="non-scaling-stroke"
                        />
                    ) : null}
                    {path.arrowD ? (
                        <path
                            className={cn(
                                "nous-workflow-connector-path-arrow",
                                active && "nous-workflow-connector-path-arrow-active"
                            )}
                            d={path.arrowD}
                            data-workflow-connector-arrow="true"
                        />
                    ) : null}
                </svg>
                {path.label ? (
                    <span
                        aria-hidden="true"
                        className="nous-workflow-connector-chip absolute z-20"
                        data-workflow-connector-chip={path.label}
                        style={path.labelPositionStyle}
                    >
                        {path.label}
                    </span>
                ) : null}
            </>
        );
    }

    return (
        <>
            {segmentClassNames.map((segmentClassName, segmentIndex) => {
                const orientation = getWorkflowConnectorSegmentOrientation(segmentClassName);

                return (
                    <span
                        aria-hidden="true"
                        className={cn(
                            "nous-workflow-connector absolute rounded-full bg-[var(--nous-workflow-connector-stroke)] opacity-70",
                            orientation === "horizontal" ? "nous-workflow-connector-horizontal" : "nous-workflow-connector-vertical",
                            active && "nous-workflow-connector-active",
                            segmentClassName
                        )}
                        data-workflow-connector={id}
                        data-workflow-connector-active={active ? "true" : "false"}
                        data-workflow-connector-orientation={orientation}
                        data-workflow-connector-segment-terminal={segmentIndex === segmentClassNames.length - 1 ? "true" : "false"}
                        key={`${id}-${segmentIndex}`}
                    />
                );
            })}
        </>
    );
}

function getWorkflowConnectorSegmentOrientation(segmentClassName: string) {
    return segmentClassName.includes("h-px") ? "horizontal" : "vertical";
}

function WorkflowNode({ badges, detail, id, isStacked = false, kind = "primary", placeholder, placeholderSize = "node", placeholderState = "idle", ports, positionClassName, positionStyle, shape, showCompletionCheck = false, stackId, stackPosition, status, title }: WorkflowNodeItem & { isStacked?: boolean }) {
    const isTool = kind === "tool";
    const hasBadges = Boolean(badges?.length);
    const hasDetail = detail.length > 0;
    const shouldShowCompletionCheck = showCompletionCheck && (status === "done" || status === "complete");

    if (placeholder) {
        return (
            <span
                aria-hidden="true"
                className={cn(
                    "nous-workflow-node-placeholder",
                    placeholderSize === "subnode" ? "nous-workflow-node-placeholder-subnode" : "nous-workflow-node-placeholder-node",
                    isStacked ? "relative mx-auto" : "absolute",
                    positionClassName
                )}
                data-workflow-node-id={id}
                data-workflow-node-kind={kind}
                data-workflow-node-placeholder="true"
                data-workflow-node-placeholder-size={placeholderSize}
                data-workflow-node-placeholder-state={placeholderState}
                data-workflow-node-status={status}
                style={isStacked ? undefined : positionStyle}
            >
                <Glyph className="nous-workflow-node-placeholder-icon" name="squarePlus" strokeWidth={1.5} />
            </span>
        );
    }

    return (
        <Surface
            as="div"
            className={cn(
                "nous-workflow-node flex flex-col [background:var(--nous-workflow-node-bg)]",
                isStacked ? "relative w-full" : "absolute",
                !isStacked && !isTool && "min-h-[var(--nous-workflow-node-min-height)]",
                "border border-[color:var(--nous-workflow-node-border)]",
                isTool
                    ? "nous-workflow-node-tool px-[var(--nous-workflow-tool-node-padding-x)] py-[var(--nous-workflow-tool-node-padding-y)]"
                    : "px-[var(--nous-workflow-node-padding-x)] py-[var(--nous-workflow-node-padding-y)]",
                "justify-start",
                "text-xs leading-[var(--nous-leading-drawer)] text-[var(--nous-workflow-node-detail-fg)]",
                status === "active" && "nous-workflow-node-active",
                status === "complete" && "nous-workflow-node-complete",
                status === "done" && "nous-workflow-node-done",
                shape === "event" && "nous-workflow-node-shape-event",
                shape === "gate" && "nous-workflow-node-shape-gate",
                stackPosition && "nous-workflow-node-stack-item",
                stackPosition === "first" && "nous-workflow-node-stack-first",
                stackPosition === "middle" && "nous-workflow-node-stack-middle",
                stackPosition === "last" && "nous-workflow-node-stack-last",
                stackPosition === "only" && "nous-workflow-node-stack-only",
                positionClassName
            )}
            data-workflow-node-id={id}
            data-workflow-node-kind={kind}
            data-workflow-node-shape={shape ?? "default"}
            data-workflow-node-stack-id={stackId ?? "none"}
            data-workflow-node-stack-position={stackPosition ?? "none"}
            data-workflow-node-status={status}
            radius="control"
            shadow="none"
            style={isStacked ? undefined : positionStyle}
            stroke="default"
            tone="transparent"
        >
            <span aria-hidden="true" className="nous-workflow-node-active-prism-border">
                <span className="nous-workflow-node-active-prism-gradient" />
            </span>
            {shouldShowCompletionCheck ? <WorkflowNodeDoneCheck /> : null}
            <h4 className="nous-mono relative z-10 truncate pr-[var(--nous-workflow-node-title-padding-right)] text-[length:var(--nous-workflow-node-title-size)] uppercase leading-tight tracking-[var(--nous-workflow-node-title-tracking)] text-[var(--nous-workflow-node-title-fg)] [font-weight:var(--nous-workflow-node-title-weight)]" data-workflow-node-title="true">{title}</h4>
            {hasDetail ? (
                <p className="relative z-10 mt-[var(--nous-workflow-node-detail-margin-top)] overflow-hidden text-[length:var(--nous-workflow-node-detail-size)] font-[var(--nous-workflow-node-detail-weight)] leading-[var(--nous-workflow-node-detail-leading)] tracking-[var(--nous-workflow-node-detail-tracking)] text-[var(--nous-workflow-node-detail-fg)]" data-workflow-node-detail="true">{detail}</p>
            ) : null}
            {hasBadges ? (
                <div
                    className={cn(
                        "relative z-10 flex flex-wrap",
                        isTool
                            ? "nous-workflow-node-metadata"
                            : "mt-auto gap-[var(--nous-workflow-node-badge-row-gap)] pt-[var(--nous-workflow-node-badge-row-padding-top)]"
                    )}
                    data-workflow-node-badges="true"
                    data-workflow-node-badges-variant={isTool ? "metadata" : "chip"}
                >
                    {badges?.map((badge) => (
                        <span className={isTool ? "nous-workflow-node-metadata-item" : "nous-workflow-node-badge"} data-workflow-node-badge={badge} key={badge}>{badge}</span>
                    ))}
                </div>
            ) : null}
            {ports?.map((port) => (
                <span
                    aria-hidden="true"
                    className="nous-workflow-connector-chip nous-workflow-node-port-chip absolute z-20"
                    data-workflow-node-port-chip={port.label}
                    key={port.label}
                    style={{ left: port.left, top: "100%" }}
                >
                    {port.label}
                </span>
            ))}
        </Surface>
    );
}

function WorkflowNodeDoneCheck() {
    return (
        <span aria-hidden="true" className="nous-workflow-node-done-check" data-workflow-node-done-check="true">
            <svg fill="none" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6.15 5.1 8.25 9.25 3.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
            </svg>
        </span>
    );
}
