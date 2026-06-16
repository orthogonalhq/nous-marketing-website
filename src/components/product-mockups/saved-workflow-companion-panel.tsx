"use client";

import { useEffect, useRef } from "react";

import { ScrollableRegion } from "@/components/design-system/mockup/components";
import {
    AssistantResponseFlow,
    AssistantResponseSection,
    CommandComposer,
    ProposalCard,
    RunningWorkflow
} from "@/components/mockups/conversation";
import type { WorkflowRunStep } from "@/components/mockups/conversation";
import {
    getSavedWorkflowActiveSubagentIndex,
    getSavedWorkflowSubagentStates,
    savedWorkflowStoryboardFinalFrameIndex,
    savedWorkflowStoryboardScript
} from "@/components/product-mockups/saved-workflow-storyboard-script";
import { HomepageChatComposerLeadingActions, HomepageChatComposerTrailingActions } from "@/components/product-mockups/homepage-chat-composer-buttons";
import { cn } from "@/lib/cn";

type SavedWorkflowCompanionChatProps = {
    activeFrameIndex?: number;
    activeThinking?: string;
    activeThinkingStreamKey?: string;
    approvalActionState?: "idle" | "pressed";
    approvalMessage?: string;
    approvalStatus?: "approved" | "pending";
    className?: string;
    composerPlaceholder?: string;
    completionMessage?: string;
    finalMessage?: string;
    hasWorkflowCard?: boolean;
    introMessage?: string;
    layout?: "canvas" | "panel";
    onApproveCheckout?: () => void;
    showApproval?: boolean;
    showCompletion?: boolean;
    streamThinking?: boolean;
    workflowElapsedLabel?: string;
};

export function SavedWorkflowCompanionChat({
    activeFrameIndex = savedWorkflowStoryboardFinalFrameIndex,
    activeThinking,
    activeThinkingStreamKey,
    approvalActionState = "idle",
    approvalMessage = savedWorkflowStoryboardScript.approvalMessage,
    approvalStatus = "pending",
    className,
    composerPlaceholder = "Approve checkout, ask for changes, or edit cart…",
    completionMessage,
    finalMessage = savedWorkflowStoryboardScript.finalMessage,
    hasWorkflowCard = true,
    introMessage = savedWorkflowStoryboardScript.introMessage,
    layout = "canvas",
    onApproveCheckout,
    showApproval = false,
    showCompletion = true,
    streamThinking = true,
    workflowElapsedLabel
}: SavedWorkflowCompanionChatProps) {
    const isPanelLayout = layout === "panel";
    const rootRef = useRef<HTMLElement>(null);
    const activeSubagentIndex = getSavedWorkflowActiveSubagentIndex(activeFrameIndex);
    const workflowSteps = getSavedWorkflowSubagentStates(activeFrameIndex).map((step): WorkflowRunStep => ({
        detail: step.action,
        duration: step.duration,
        key: step.key,
        label: step.name,
        state: step.state,
        thinking: ["active", "waiting"].includes(step.state) ? activeThinking : step.thinking,
        thinkingStreamKey: ["active", "waiting"].includes(step.state) ? activeThinkingStreamKey : undefined
    }));

    useEffect(() => {
        const scrollRegion = rootRef.current?.querySelector<HTMLElement>('[aria-label="Saved workflow companion transcript"]');

        if (!scrollRegion) {
            return undefined;
        }

        const animationFrame = window.requestAnimationFrame(() => {
            if (typeof scrollRegion.scrollTo === "function") {
                scrollRegion.scrollTo({
                    behavior: "auto",
                    top: scrollRegion.scrollHeight
                });
            } else {
                scrollRegion.scrollTop = scrollRegion.scrollHeight;
            }
        });

        return () => window.cancelAnimationFrame(animationFrame);
    }, [
        activeFrameIndex,
        activeThinkingStreamKey,
        approvalMessage.length,
        approvalStatus,
        completionMessage?.length,
        finalMessage.length,
        hasWorkflowCard,
        introMessage.length,
        showApproval,
        showCompletion,
        workflowElapsedLabel
    ]);

    return (
        <section
            aria-label="Companion app conversation"
            className={cn(
                "relative z-20 flex h-full flex-col",
                isPanelLayout
                    ? "px-[var(--nous-home-chat-sidebar-padding-x)] pb-3 pt-[var(--nous-home-chat-sidebar-header-padding-top)]"
                    : "items-center px-[var(--nous-home-chat-canvas-content-padding-x)] pt-[calc(var(--nous-home-chat-greeting-padding-top)-0.5rem)]",
                className
            )}
            data-companion-app-surface="helper"
            ref={rootRef}
        >
            <div className={cn("flex min-h-0 w-full flex-1 flex-col", !isPanelLayout && "items-center")}>
                <ScrollableRegion
                    ariaLabel="Saved workflow companion transcript"
                    className={cn(
                        isPanelLayout
                            ? "-mr-4 py-3 pr-4"
                            : "w-[calc(var(--nous-home-chat-transcript-width)+var(--nous-home-chat-transcript-scrollbar-gutter))] px-[calc(var(--nous-home-chat-transcript-scrollbar-gutter)/2)] py-4"
                    )}
                >
                    <div className={cn("flex min-h-full flex-col justify-end pb-2", isPanelLayout ? "w-full" : "w-[var(--nous-home-chat-transcript-width)]")}>
                        <AssistantResponseFlow>
                            <AssistantResponseSection>
                                <p data-companion-intro-prose="true">{introMessage}</p>
                            </AssistantResponseSection>
                            {hasWorkflowCard ? (
                                <RunningWorkflow
                                    activeStepIndex={activeSubagentIndex}
                                    elapsedLabel={workflowElapsedLabel}
                                    isRunning
                                    streamThinking={streamThinking}
                                    steps={workflowSteps}
                                    workflowName={savedWorkflowStoryboardScript.workflowName}
                                />
                            ) : null}
                            {showApproval ? (
                                <>
                                    {approvalStatus === "pending" ? (
                                        <AssistantResponseSection className="nous-home-chat-final-answer-in">
                                            <p data-companion-approval-prose="true">{approvalMessage}</p>
                                        </AssistantResponseSection>
                                    ) : null}
                                    <div className="nous-home-chat-final-answer-in">
                                        <ApprovalProposalCard actionState={approvalActionState} onApproveCheckout={onApproveCheckout} status={approvalStatus} />
                                    </div>
                                </>
                            ) : null}
                            {showCompletion ? (
                                <>
                                    <AssistantResponseSection className="nous-home-chat-final-answer-in">
                                        <p data-companion-final-prose="true">{completionMessage ?? finalMessage}</p>
                                    </AssistantResponseSection>
                                    <div className="nous-home-chat-final-answer-in">
                                        <CompletionProposalCard />
                                    </div>
                                </>
                            ) : null}
                        </AssistantResponseFlow>
                    </div>
                </ScrollableRegion>
            </div>
            <div className={cn(isPanelLayout ? "w-full" : "mb-[var(--nous-home-chat-composer-active-margin-bottom)] w-[var(--nous-home-chat-composer-active-width)]")} data-homepage-chat-composer-shell="compact">
                <CompanionComposer placeholder={composerPlaceholder} />
            </div>
        </section>
    );
}

function ApprovalProposalCard({ actionState, onApproveCheckout, status }: { actionState: "idle" | "pressed"; onApproveCheckout?: () => void; status: "approved" | "pending" }) {
    const isApproved = status === "approved";

    return (
        <div data-approval-card-status={status} data-human-in-loop-card="true">
            <ProposalCard
                actions={isApproved ? [] : savedWorkflowStoryboardScript.approvalActions.map((action) => ({
                    content: action === "Approve checkout" && onApproveCheckout ? (
                        <button
                            className={cn(
                                "cursor-pointer rounded-[var(--nous-radius-sm)] border-0 bg-transparent px-1 py-0 text-inherit transition-[box-shadow,transform,background,color] duration-200",
                                actionState === "pressed" && "-mx-1 scale-[0.98] bg-[var(--nous-task-proposal-primary-action-hover-bg)] shadow-[0_0_0_3px_var(--nous-focus-ring-soft)]"
                            )}
                            data-approval-action="Approve checkout"
                            data-approval-action-state={actionState}
                            onClick={onApproveCheckout}
                            type="button"
                        >
                            {action}
                        </button>
                    ) : action,
                    key: action
                }))}
                details={isApproved ? [] : savedWorkflowStoryboardScript.approvalDetails.map(([label, value]) => ({
                    content: value,
                    key: label,
                    label
                }))}
                detailsDefaultOpen={false}
                compact={isApproved}
                name={isApproved ? savedWorkflowStoryboardScript.approvalApprovedName : savedWorkflowStoryboardScript.approvalName}
                summaryItems={isApproved ? [...savedWorkflowStoryboardScript.approvalApprovedSummary] : [...savedWorkflowStoryboardScript.approvalSummary]}
                title={isApproved ? savedWorkflowStoryboardScript.approvalApprovedTitle : savedWorkflowStoryboardScript.approvalTitle}
            />
        </div>
    );
}

function CompletionProposalCard() {
    return (
        <div data-order-complete-card="true">
            <ProposalCard
                actions={savedWorkflowStoryboardScript.completionActions.map((action) => ({
                    content: "href" in action ? <a href={action.href}>{action.label}</a> : action.label,
                    key: action.label
                }))}
                details={[]}
                detailsDefaultOpen={false}
                name={savedWorkflowStoryboardScript.completionName}
                summaryItems={[...savedWorkflowStoryboardScript.completionSummary]}
                title={savedWorkflowStoryboardScript.completionTitle}
            />
        </div>
    );
}

function CompanionComposer({ placeholder }: { placeholder: string }) {
    return (
        <CommandComposer
            contentClassName="content-start text-[var(--nous-composer-placeholder-fg)]"
            leadingActions={<HomepageChatComposerLeadingActions />}
            leadingActionsClassName="gap-[var(--nous-drawer-command-actions-gap)]"
            placeholder={placeholder}
            trailingActions={<HomepageChatComposerTrailingActions isSendReady={false} sendLabel="Send saved workflow message" />}
            trailingActionsClassName="gap-[var(--nous-composer-toolbar-action-gap)]"
            variant="compact"
        />
    );
}
