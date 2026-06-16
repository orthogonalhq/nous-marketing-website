import { Fragment } from "react";
import type { CSSProperties, ReactNode } from "react";

import { DescriptionList, DisclosureTriangle, Glyph } from "@/components/design-system/mockup/components";
import badgeStyles from "@/components/home/hero-sub-header-cards.module.css";
import { cn } from "@/lib/cn";

import { WorkflowThinkingWindow } from "./workflow-thinking-window";

type CompatibilityMode = "homepage" | "none";
type MessageBubbleRole = "assistant" | "system" | "user";
type ProposalActionPriority = "primary" | "secondary" | "tertiary";

export type ToolCall = {
    action: string;
    call: string;
    duration: string;
    durationMs: number;
    operation: string;
    result: string;
    service: string;
};

export type WorkflowRunStep = {
    detail: ReactNode;
    duration?: string;
    key?: string;
    label: string;
    state?: "active" | "complete" | "done" | "pending" | "queued" | "waiting";
    thinking?: ReactNode;
    thinkingStreamKey?: string;
};

export type RunningWorkflowClassNames = {
    branchMarker?: string;
    completedLabel?: string;
    elapsedLabel?: string;
    headerRow?: string;
    root?: string;
    stepContent?: string;
    stepDetail?: string;
    stepLabel?: string;
    stepLine?: string;
    summary?: string;
    thinkingGrid?: string;
    thinkingSlot?: string;
    thinkingWindow?: string;
    titleGroup?: string;
    titleIcon?: string;
    titleText?: string;
    toggleIcon?: string;
};

export type ProposalDetail = {
    content: ReactNode;
    key?: string;
    label: string;
    visible?: boolean;
};

export type ProposalAction = {
    content: ReactNode;
    key: string;
    priority?: ProposalActionPriority;
    visible?: boolean;
};

export type HomepageChatToolCall = ToolCall;
export type HomepageChatProposalDetail = ProposalDetail;
export type HomepageChatProposalAction = ProposalAction;

type MessageBubbleProps = {
    children: ReactNode;
    className?: string;
    compatibility?: CompatibilityMode;
    maxWidthClassName?: string;
    role?: MessageBubbleRole;
};

type WorkingPanelProps = {
    children: ReactNode;
    className?: string;
    compatibility?: CompatibilityMode;
    eyebrow?: string;
    status: string;
};

type AssistantResponseFlowProps = {
    children: ReactNode;
    className?: string;
    compatibility?: CompatibilityMode;
    contentClassName?: string;
    status?: ReactNode;
    statusMeta?: ReactNode;
    statusRowClassName?: string;
};

type AssistantResponseSectionProps = {
    children: ReactNode;
    className?: string;
    compatibility?: CompatibilityMode;
};

type ToolCallListProps = {
    activeToolCallIndex: number | null;
    className?: string;
    compatibility?: CompatibilityMode;
    completedLabel: string;
    defaultOpen?: boolean;
    isRunning: boolean;
    toolCalls: readonly ToolCall[];
};

type RunningWorkflowProps = {
    activeStepIndex?: number | null;
    className?: string;
    classNames?: RunningWorkflowClassNames;
    completedLabel?: string;
    defaultOpen?: boolean;
    elapsedLabel?: string;
    isRunning: boolean;
    streamThinking?: boolean;
    steps: readonly WorkflowRunStep[];
    workflowName: string;
};

type ProposalCardProps = {
    actions: ProposalAction[];
    body?: ReactNode;
    compatibility?: CompatibilityMode;
    compact?: boolean;
    details: ProposalDetail[];
    detailsDefaultOpen?: boolean;
    name: ReactNode;
    summaryItems?: ReactNode[];
    title: ReactNode;
    viewDetailsLabel?: string;
};

export function MessageBubble({
    children,
    className,
    compatibility = "none",
    maxWidthClassName,
    role: messageRole = "assistant"
}: MessageBubbleProps) {
    const roleClasses: Record<MessageBubbleRole, string> = {
        assistant: "mr-auto border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-chat-message-bg-assistant)] text-[var(--nous-chat-message-fg-strong)]",
        system: "mx-auto border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-control-bg-soft)] text-[var(--nous-chat-message-fg)]",
        user: "ml-auto border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-chat-message-bg-user)] text-[var(--nous-chat-message-fg)]"
    };
    const maxWidth = maxWidthClassName ?? (messageRole === "user" ? "max-w-[var(--nous-chat-message-max-width-user)]" : "max-w-[var(--nous-chat-message-max-width-assistant)]");

    return (
        <div
            className={cn(
                maxWidth,
                "rounded-[var(--nous-chat-message-radius)] border",
                "px-[var(--nous-chat-message-padding-x)] py-[var(--nous-chat-message-padding-y)]",
                "text-[length:var(--nous-chat-message-font-size)] leading-[var(--nous-chat-message-leading)]",
                roleClasses[messageRole],
                className
            )}
            data-chat-message={messageRole}
            data-homepage-chat-message={compatibility === "homepage" ? messageRole : undefined}
        >
            {children}
        </div>
    );
}

export function HomepageChatAssistantMessage({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <MessageBubble className={className} compatibility="homepage" role="assistant">
            {children}
        </MessageBubble>
    );
}

export function AssistantResponseFlow({
    children,
    className,
    compatibility = "none",
    contentClassName,
    status,
    statusMeta,
    statusRowClassName
}: AssistantResponseFlowProps) {
    return (
        <article
            className={cn(
                "flex flex-col self-stretch text-xs leading-[var(--nous-leading-drawer)] text-[var(--nous-drawer-body-fg-strong)]",
                className
            )}
            data-chat-assistant-response-flow="true"
            data-homepage-chat-message={compatibility === "homepage" ? "assistant" : undefined}
        >
            {status ? (
                <div
                    className={cn(
                        "flex w-full items-center justify-between gap-3 border-b border-[color:var(--nous-stroke-subtle)]",
                        "pb-[var(--nous-assistant-response-section-padding-top)] font-semibold text-[var(--nous-drawer-meta-fg)]",
                        statusRowClassName
                    )}
                    data-chat-assistant-response-status="true"
                >
                    <span className="flex items-center gap-[var(--nous-drawer-status-gap)]">
                        {status}
                        <DisclosureTriangle className="size-3" />
                    </span>
                    {statusMeta ? <span className="nous-mono text-[length:var(--nous-type-meta)] uppercase tracking-[0.08em] text-[var(--nous-drawer-meta-fg)]">{statusMeta}</span> : null}
                </div>
            ) : null}
            <div
                className={cn(
                    "space-y-[var(--nous-assistant-response-section-gap)]",
                    Boolean(status) && "pt-[var(--nous-assistant-response-section-padding-top)]",
                    contentClassName
                )}
                data-chat-assistant-response-content="true"
            >
                {children}
            </div>
        </article>
    );
}

export function AssistantResponseSection({ children, className, compatibility = "none" }: AssistantResponseSectionProps) {
    return (
        <section
            className={cn("space-y-[var(--nous-assistant-response-paragraph-gap)]", className)}
            data-chat-assistant-response-section="true"
            data-homepage-chat-working-block={compatibility === "homepage" ? "true" : undefined}
        >
            {children}
        </section>
    );
}

export function WorkingPanel({ children, className, compatibility = "none", eyebrow, status }: WorkingPanelProps) {
    return (
        <section
            className={cn(
                "rounded-[var(--nous-chat-message-radius)] border border-[color:var(--nous-stroke-subtle)]",
                "bg-[var(--nous-chat-message-bg-assistant)] px-[var(--nous-chat-message-padding-x)] py-[var(--nous-chat-message-padding-y)]",
                "text-[length:var(--nous-chat-message-font-size)] leading-[var(--nous-chat-message-leading)] text-[var(--nous-chat-message-fg-strong)]",
                className
            )}
            data-chat-message="assistant"
            data-chat-working-panel="true"
            data-homepage-chat-message={compatibility === "homepage" ? "assistant" : undefined}
            data-homepage-chat-working-panel={compatibility === "homepage" ? "true" : undefined}
        >
            <div className="flex items-center justify-between gap-3 border-b border-[color:var(--nous-stroke-subtle)] pb-[var(--nous-assistant-response-section-padding-top)] font-semibold text-[var(--nous-drawer-meta-fg)]">
                <span className="flex items-center gap-[var(--nous-drawer-status-gap)]">
                    {status}
                    <DisclosureTriangle className="size-3" />
                </span>
                {eyebrow ? <span className="nous-mono text-[length:var(--nous-type-meta)] uppercase tracking-[0.08em] text-[var(--nous-drawer-meta-fg)]">{eyebrow}</span> : null}
            </div>
            <div className="space-y-[var(--nous-assistant-response-paragraph-gap)] pt-[var(--nous-assistant-response-section-padding-top)]">
                {children}
            </div>
        </section>
    );
}

export function HomepageChatWorkingPanel({ children, eyebrow, status }: { children: ReactNode; eyebrow?: string; status: string }) {
    return (
        <WorkingPanel compatibility="homepage" eyebrow={eyebrow} status={status}>
            {children}
        </WorkingPanel>
    );
}

export function ToolCallList({
    activeToolCallIndex,
    className,
    compatibility = "none",
    completedLabel,
    defaultOpen = false,
    isRunning,
    toolCalls
}: ToolCallListProps) {
    const resolvedActiveToolCallIndex = activeToolCallIndex ?? 0;
    const activeToolCall = isRunning ? toolCalls[resolvedActiveToolCallIndex] : undefined;
    const toolCallHeaderLabel = isRunning && activeToolCall
        ? `${activeToolCall.service} · ${activeToolCall.action} · ${activeToolCall.duration}`
        : completedLabel;

    return (
        <details
            className={cn(
                "mt-[var(--nous-tool-call-list-margin-top)] w-[90%] rounded-[var(--nous-radius-md)]",
                "transition-colors open:bg-[var(--nous-control-bg-soft)]",
                className
            )}
            data-homepage-chat-tool-call-group={compatibility === "homepage" ? "true" : undefined}
            data-homepage-chat-tool-call-state={compatibility === "homepage" ? (isRunning ? "running" : "complete") : undefined}
            data-homepage-chat-tool-calls={compatibility === "homepage" ? "true" : undefined}
            data-tool-call-group="true"
            data-tool-call-state={isRunning ? "running" : "complete"}
            data-tool-calls="true"
            open={defaultOpen}
        >
            <summary
                className={cn(
                    "nous-mono relative flex cursor-pointer list-none items-center gap-2 overflow-hidden rounded-[var(--nous-radius-md)]",
                    "px-2 py-1.5 text-[length:var(--nous-type-meta)] font-semibold text-[var(--nous-drawer-meta-fg)]",
                    "transition-colors hover:bg-[var(--nous-control-bg-soft)]",
                    isRunning && "nous-tool-call-running-summary",
                    isRunning && compatibility === "homepage" && "nous-home-chat-tool-call-running-summary"
                )}
            >
                <Glyph className="relative z-10 size-3.5" name="cli" strokeWidth={1.8} />
                <span className="relative z-10">{toolCallHeaderLabel}</span>
            </summary>
            <dl
                className={cn(
                    "grid grid-cols-[var(--nous-drawer-dl-label-width)_1fr] gap-x-[var(--nous-drawer-status-gap)] gap-y-2",
                    "px-2 pb-2 pt-1 text-[var(--nous-drawer-body-fg)]"
                )}
            >
                {toolCalls.map((toolCall, index) => (
                    <Fragment key={`${toolCall.service}-${toolCall.call}-${index}`}>
                        <dt
                            className={cn(
                                "nous-mono text-[length:var(--nous-type-meta)] font-semibold text-[var(--nous-drawer-meta-fg)]",
                                isRunning && index === resolvedActiveToolCallIndex && "text-[var(--nous-drawer-result-fg)]"
                            )}
                            data-homepage-chat-tool-call={compatibility === "homepage" ? toolCall.service : undefined}
                            data-tool-call={toolCall.service}
                        >
                            {toolCall.operation} · {toolCall.duration}
                        </dt>
                        <dd className={cn(isRunning && index === resolvedActiveToolCallIndex && "text-[var(--nous-drawer-result-fg)]")}>
                            <span className="font-semibold text-[var(--nous-drawer-result-fg)]">{toolCall.action}</span>
                            <span> · {toolCall.service}</span>
                            <span> · {toolCall.result}</span>
                            <span className="nous-mono mt-1 block text-[length:var(--nous-type-meta)] text-[var(--nous-drawer-meta-fg)]">{toolCall.call}</span>
                        </dd>
                    </Fragment>
                ))}
            </dl>
        </details>
    );
}

export function HomepageChatToolCallList(props: Omit<ToolCallListProps, "compatibility">) {
    return <ToolCallList {...props} compatibility="homepage" />;
}

export function RunningWorkflow({
    activeStepIndex = null,
    className,
    classNames,
    completedLabel = "Workflow complete",
    defaultOpen = false,
    elapsedLabel,
    isRunning,
    streamThinking = true,
    steps,
    workflowName
}: RunningWorkflowProps) {
    const resolvedActiveStepIndex = activeStepIndex ?? 0;
    const activeStep = isRunning ? steps[resolvedActiveStepIndex] : undefined;
    const dataState = activeStep?.state === "complete" ? "complete" : activeStep?.state === "waiting" ? "waiting" : isRunning ? "running" : "complete";
    const currentAction = activeStep ? activeStep.detail : completedLabel;
    const currentThinking = activeStep?.thinking;
    const currentThinkingText = typeof currentThinking === "string" ? currentThinking : "";
    const shouldShowRunningGlow = activeStep?.state === "active";

    return (
        <details
            className={cn(
                "group mt-[var(--nous-tool-call-list-margin-top)] w-full rounded-[var(--nous-radius-md)]",
                "transition-colors",
                className,
                classNames?.root
            )}
            data-running-workflow-current-action={typeof currentAction === "string" ? currentAction : undefined}
            data-running-workflow-current-subagent={activeStep?.label}
            data-running-workflow-current-thinking={typeof currentThinking === "string" ? currentThinking : undefined}
            data-running-workflow-group="true"
            data-running-workflow-state={dataState}
            open={defaultOpen}
        >
            <RunningWorkflowSummary activeStep={activeStep} classNames={classNames} completedLabel={completedLabel} elapsedLabel={elapsedLabel} shouldShowRunningGlow={shouldShowRunningGlow} workflowName={workflowName} />
            {activeStep ? (
                <RunningWorkflowThinkingSlot activeStep={activeStep} classNames={classNames} isRunning={isRunning} streamThinking={streamThinking} text={currentThinkingText} />
            ) : null}
        </details>
    );
}

function RunningWorkflowSummary({ activeStep, classNames, completedLabel, elapsedLabel, shouldShowRunningGlow, workflowName }: {
    activeStep?: WorkflowRunStep;
    classNames?: RunningWorkflowClassNames;
    completedLabel: string;
    elapsedLabel?: string;
    shouldShowRunningGlow: boolean;
    workflowName: string;
}) {
    return (
        <summary
            className={cn(
                "relative flex cursor-pointer list-none flex-col gap-1.5 overflow-hidden rounded-[var(--nous-radius-md)]",
                "px-2 py-1.5 text-[length:var(--nous-type-meta)] font-semibold text-[var(--nous-drawer-meta-fg)]",
                "transition-colors hover:bg-[var(--nous-running-workflow-bg)]",
                classNames?.summary
            )}
        >
            <span className={cn("nous-mono relative z-10 flex w-full min-w-0 items-center gap-2", classNames?.headerRow)}>
                <span className={cn("relative flex min-w-0 items-center gap-2 overflow-hidden rounded-[var(--nous-radius-xs)]", classNames?.titleGroup)}>
                    <Glyph className={cn("size-3.5 shrink-0 text-[var(--nous-drawer-meta-fg)]", shouldShowRunningGlow && "nous-running-workflow-icon-wave", classNames?.titleIcon)} name="workflow" strokeWidth={1.8} />
                    <span className={cn("inline-block min-w-0 truncate", shouldShowRunningGlow && "nous-running-workflow-summary", classNames?.titleText)}>{workflowName}</span>
                </span>
                <DisclosureTriangle className={cn("size-3 shrink-0 -rotate-90 transition-transform duration-300 group-open:rotate-0", classNames?.toggleIcon)} />
                <span aria-hidden="true" className="min-w-0 flex-1" />
                {elapsedLabel ? (
                    <span className={cn("shrink-0 text-[0.625rem] font-medium tabular-nums text-[var(--nous-drawer-meta-fg)]", classNames?.elapsedLabel)} data-running-workflow-elapsed="true">
                        {elapsedLabel}
                    </span>
                ) : null}
            </span>
            <RunningWorkflowStepLine activeStep={activeStep} classNames={classNames} completedLabel={completedLabel} />
        </summary>
    );
}

function RunningWorkflowStepLine({ activeStep, classNames, completedLabel }: {
    activeStep?: WorkflowRunStep;
    classNames?: RunningWorkflowClassNames;
    completedLabel: string;
}) {
    return (
        <span className={cn("nous-mono relative z-10 ml-[0.4375rem] grid min-w-0 grid-cols-[3ch_minmax(0,1fr)] gap-x-2 text-[0.6875rem] leading-snug text-[var(--nous-drawer-meta-fg)]", classNames?.stepLine)}>
            <RunningWorkflowBranchMarker className={classNames?.branchMarker} />
            {activeStep ? (
                <span className={cn("flex min-w-0 flex-col gap-0.5", classNames?.stepContent)}>
                    <span className="flex min-w-0 items-center gap-2">
                        <span className={cn("min-w-0 truncate font-semibold text-[var(--nous-drawer-meta-fg)]", classNames?.stepLabel)}>{activeStep.label}</span>
                        {activeStep.duration ? (
                            <span className="shrink-0 font-medium tabular-nums text-[var(--nous-drawer-meta-fg)] opacity-75" data-running-workflow-step-duration="true">{activeStep.duration}</span>
                        ) : null}
                    </span>
                    <span className={cn("truncate font-normal text-[var(--nous-drawer-meta-fg)]", classNames?.stepDetail)}>{activeStep.detail}</span>
                </span>
            ) : (
                <span className={cn("truncate text-[var(--nous-drawer-meta-fg)]", classNames?.completedLabel)}>{completedLabel}</span>
            )}
        </span>
    );
}

function RunningWorkflowBranchMarker({ className }: { className?: string }) {
    return (
        <span aria-hidden="true" className={cn("select-none text-[length:var(--nous-type-meta)] text-[var(--nous-drawer-meta-fg)] opacity-50", className)}>└──</span>
    );
}

function RunningWorkflowThinkingSlot({ activeStep, classNames, isRunning, streamThinking, text }: {
    activeStep: WorkflowRunStep;
    classNames?: RunningWorkflowClassNames;
    isRunning: boolean;
    streamThinking: boolean;
    text: string;
}) {
    return (
        <div className={cn("px-2 pb-2 pt-0", classNames?.thinkingSlot)} data-running-workflow-thinking-slot="true">
            <div className={cn("nous-mono ml-[0.4375rem] grid min-w-0 grid-cols-[3ch_minmax(0,1fr)] gap-x-2", classNames?.thinkingGrid)}>
                <span aria-hidden="true" />
                <WorkflowThinkingWindow className={classNames?.thinkingWindow} stream={isRunning && streamThinking} streamKey={activeStep.thinkingStreamKey ?? activeStep.key ?? activeStep.label} text={text} thinkingFor={activeStep.label} />
            </div>
        </div>
    );
}

export function ProposalCard({
    actions,
    body,
    compatibility = "none",
    compact = false,
    details,
    detailsDefaultOpen = false,
    name,
    summaryItems = [],
    title,
    viewDetailsLabel = "View details"
}: ProposalCardProps) {
    const visibleDetails = details.filter((detail) => detail.visible ?? true);
    const visibleActions = actions.filter((action) => action.visible ?? true);
    const hasVisibleDetails = visibleDetails.length > 0;
    const hasVisibleActions = visibleActions.length > 0;
    const separatorMaskStyle = {
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 1rem, #000 calc(100% - 1rem), transparent)",
        maskImage: "linear-gradient(90deg, transparent, #000 1rem, #000 calc(100% - 1rem), transparent)"
    } as CSSProperties;

    return (
        <section
            className={cn(badgeStyles.highlight, badgeStyles.glassPanelWrap, "w-full")}
            data-homepage-chat-final-suggestions={compatibility === "homepage" ? "true" : undefined}
            data-homepage-chat-task-proposal-card={compatibility === "homepage" ? "true" : undefined}
            data-proposal-card="true"
        >
            <div className={badgeStyles.glassPanelCard}>
                <div className={badgeStyles.glassPanelContent}>
                    <details className="group" data-homepage-chat-task-proposal-disclosure={compatibility === "homepage" ? "true" : undefined} data-proposal-card-disclosure="true" open={detailsDefaultOpen}>
                        <summary
                            className={cn(
                                "flex cursor-pointer list-none items-start justify-between gap-3 px-3.5 py-3",
                                "transition-colors hover:bg-[var(--nous-task-proposal-summary-hover-bg)]",
                                compact && "px-3 py-2.5"
                            )}
                            data-homepage-chat-task-proposal-compact={compatibility === "homepage" ? "true" : undefined}
                            data-proposal-card-summary="true"
                        >
                            <div className="min-w-0 space-y-1.5">
                                <div className="space-y-1">
                                    <p className={cn("text-[0.59375rem] font-semibold uppercase leading-none tracking-[0.14em] text-[var(--nous-drawer-meta-fg)]", compact && "text-[0.5625rem]")}>
                                        {title}
                                    </p>
                                    <h3 className={cn("text-[0.9375rem] font-semibold leading-tight tracking-[-0.01em] text-[var(--nous-drawer-result-fg)]", compact && "text-[0.8125rem]")}>
                                        {name}
                                    </h3>
                                </div>
                                {body ? <div className="text-[0.75rem] leading-snug text-[var(--nous-drawer-body-fg-strong)]">{body}</div> : null}
                                {summaryItems.length > 0 ? (
                                    <p
                                        className={cn("flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.6875rem] leading-snug text-[var(--nous-drawer-meta-fg)]", compact && "text-[0.625rem]")}
                                        data-homepage-chat-task-proposal-summary={compatibility === "homepage" ? "true" : undefined}
                                        data-proposal-card-metadata="true"
                                    >
                                        {summaryItems.map((item, index) => (
                                            <span className="inline-flex items-center gap-1.5" key={index}>
                                                {index > 0 ? <span aria-hidden="true" className="text-[var(--nous-stroke-default)]">•</span> : null}
                                                <span>{item}</span>
                                            </span>
                                        ))}
                                    </p>
                                ) : null}
                            </div>
                            {hasVisibleDetails ? (
                                <span className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 text-[0.625rem] font-semibold text-[var(--nous-drawer-meta-fg)] transition-colors group-hover:bg-[var(--nous-task-proposal-chip-hover-bg)]">
                                    {viewDetailsLabel}
                                    <DisclosureTriangle className="size-3 -rotate-90 transition-transform duration-300 group-open:rotate-0" />
                                </span>
                            ) : null}
                        </summary>
                        {hasVisibleDetails ? (
                            <div
                                className="border-t border-[color:var(--nous-task-proposal-details-border)] bg-[var(--nous-task-proposal-details-bg)] px-3.5 py-2.5"
                                data-homepage-chat-task-proposal-details={compatibility === "homepage" ? "true" : undefined}
                                data-proposal-card-details="true"
                            >
                                <DescriptionList
                                    className="divide-y divide-[color:var(--nous-task-proposal-divider)] text-[var(--nous-drawer-body-fg-strong)]"
                                    labelClassName="text-[0.6875rem] font-semibold leading-snug text-[var(--nous-drawer-meta-fg)]"
                                    labelWidth="5rem"
                                    rowClassName="gap-3 py-2 first:pt-0 last:pb-0"
                                    rows={visibleDetails.map((detail) => ({
                                        key: detail.key ?? detail.label,
                                        label: detail.label,
                                        value: detail.content
                                    }))}
                                    valueClassName="text-[0.75rem] leading-snug text-[var(--nous-drawer-body-fg-strong)]"
                                />
                            </div>
                        ) : null}
                    </details>
                    {hasVisibleActions ? (
                        <>
                            <div aria-hidden="true" className="h-[2px]" data-homepage-chat-task-proposal-separator={compatibility === "homepage" ? "true" : undefined} data-proposal-card-separator="true">
                                <span className="block h-px bg-[var(--nous-task-proposal-separator-highlight)]" style={separatorMaskStyle} />
                                <span className="block h-px bg-[var(--nous-task-proposal-separator-shadow)]" style={separatorMaskStyle} />
                            </div>
                            <div className="flex flex-wrap items-center gap-2 bg-[var(--nous-task-proposal-actions-bg)] px-3.5 py-2.5" data-homepage-chat-final-actions-list={compatibility === "homepage" ? "true" : undefined} data-proposal-card-actions="true">
                                {visibleActions.map((action, index) => (
                                    <ProposalActionChip index={index} key={action.key} priority={action.priority}>{action.content}</ProposalActionChip>
                                ))}
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
            <ProposalGlassPrismOverlay />
        </section>
    );
}

export function HomepageChatTaskProposalCard(props: Omit<ProposalCardProps, "compatibility">) {
    return <ProposalCard {...props} compatibility="homepage" />;
}

export function ProposalActionChip({ children, index, priority }: { children: ReactNode; index: number; priority?: ProposalActionPriority }) {
    const resolvedPriority = priority ?? (index === 0 ? "primary" : index === 1 ? "secondary" : "tertiary");
    const priorityClasses: Record<ProposalActionPriority, string> = {
        primary: cn(
            "border-[color:var(--nous-task-proposal-primary-action-border)]",
            "bg-[var(--nous-task-proposal-primary-action-bg)]",
            "text-[var(--nous-task-proposal-primary-action-fg)]",
            "shadow-[inset_0_1px_0_var(--nous-task-proposal-action-highlight)]",
            "hover:border-[color:var(--nous-task-proposal-primary-action-hover-border)]",
            "hover:bg-[var(--nous-task-proposal-primary-action-hover-bg)]"
        ),
        secondary: cn(
            "border-[color:var(--nous-task-proposal-secondary-action-border)]",
            "bg-[var(--nous-task-proposal-secondary-action-bg)]",
            "text-[var(--nous-task-proposal-secondary-action-fg)]",
            "hover:border-[color:var(--nous-task-proposal-secondary-action-hover-border)]",
            "hover:bg-[var(--nous-task-proposal-secondary-action-hover-bg)]"
        ),
        tertiary: cn(
            "border-transparent bg-[var(--nous-task-proposal-tertiary-action-bg)] px-2.5",
            "text-[var(--nous-task-proposal-tertiary-action-fg)]",
            "hover:bg-[var(--nous-task-proposal-tertiary-action-hover-bg)]",
            "hover:text-[var(--nous-task-proposal-tertiary-action-hover-fg)]"
        )
    };

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-[var(--nous-radius-md)] border px-3 py-1.5 text-[0.6875rem] font-semibold leading-none",
                "transition-[background,border-color,color,transform] duration-200 hover:-translate-y-px",
                priorityClasses[resolvedPriority]
            )}
        >
            {children}
        </span>
    );
}

export function HomepageChatProposalActionChip({ children, index }: { children: ReactNode; index: number }) {
    return <ProposalActionChip index={index}>{children}</ProposalActionChip>;
}

function ProposalGlassPrismOverlay() {
    const overlayStyle = { borderRadius: "inherit" } as CSSProperties;

    return (
        <>
            <span aria-hidden="true" className={badgeStyles.edgeShine} style={overlayStyle}>
                <span className={`${badgeStyles.edgeChannel} ${badgeStyles.edgeChannelRed}`} style={overlayStyle} />
                <span className={`${badgeStyles.edgeChannel} ${badgeStyles.edgeChannelGreen}`} style={overlayStyle} />
                <span className={`${badgeStyles.edgeChannel} ${badgeStyles.edgeChannelBlue}`} style={overlayStyle} />
            </span>
            <span aria-hidden="true" className={badgeStyles.edgePrism} style={overlayStyle} />
            <span aria-hidden="true" className={badgeStyles.prism} style={overlayStyle} />
        </>
    );
}
