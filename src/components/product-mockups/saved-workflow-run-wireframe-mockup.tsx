"use client";

import { History } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { PrimaryCtaButton } from "@/components/marketing/primary-cta-link";
import { AmbientSurface } from "@/components/mockups/surface";
import {
    WorkflowEditorPanel,
    WorkflowRunFrame
} from "@/components/mockups/workflow";
import type { WorkflowConnectorItem, WorkflowNodeItem } from "@/components/mockups/workflow";
import { SavedWorkflowCompanionChat } from "@/components/product-mockups/saved-workflow-companion-panel";
import {
    resolveSavedWorkflowConnectors,
    resolveSavedWorkflowNodes
} from "@/components/product-mockups/saved-workflow-graph-model";
import {
    getSavedWorkflowRuntimeElapsedMs,
    getSavedWorkflowRuntimeStartMs,
    getSavedWorkflowStoryboardRuntimeElapsedMs,
    savedWorkflowStoryboardApprovalFrameIndex,
    savedWorkflowStoryboardFinalFrameIndex,
    savedWorkflowStoryboardFrames,
    savedWorkflowStoryboardScript
} from "@/components/product-mockups/saved-workflow-storyboard-script";
import type { SavedWorkflowGraphNodeId, SavedWorkflowStoryboardMode } from "@/components/product-mockups/saved-workflow-storyboard-script";
import { productMockupFrameHeightClassName } from "@/components/product-mockups/product-mockup-shell";
import { cn } from "@/lib/cn";

export function SavedWorkflowRunWireframeMockup({ mode = "storyboard", previewActiveGraphNodeId }: {
    mode?: SavedWorkflowStoryboardMode;
    previewActiveGraphNodeId?: SavedWorkflowGraphNodeId;
}) {
    const isStaticMode = mode === "static";
    const [storyboardFrameIndex, setStoryboardFrameIndex] = useState(0);
    const [storyboardHasWorkflowCard, setStoryboardHasWorkflowCard] = useState(false);
    const [storyboardShowApprovalCard, setStoryboardShowApprovalCard] = useState(false);
    const [storyboardApprovalStatus, setStoryboardApprovalStatus] = useState<"approved" | "pending">("pending");
    const [storyboardApprovalActionState, setStoryboardApprovalActionState] = useState<"idle" | "pressed">("idle");
    const [storyboardShowCompletionResponse, setStoryboardShowCompletionResponse] = useState(false);
    const [introMessageLength, setIntroMessageLength] = useState(isStaticMode ? savedWorkflowStoryboardScript.introMessage.length : 0);
    const [approvalMessageLength, setApprovalMessageLength] = useState(isStaticMode ? savedWorkflowStoryboardScript.approvalMessage.length : 0);
    const [finalMessageLength, setFinalMessageLength] = useState(isStaticMode ? savedWorkflowStoryboardScript.finalMessage.length : 0);
    const [workflowElapsedMs, setWorkflowElapsedMs] = useState(isStaticMode ? getSavedWorkflowStoryboardRuntimeElapsedMs() : 0);
    const [storyboardRunId, setStoryboardRunId] = useState(0);
    const storyboardTimeoutsRef = useRef<number[]>([]);
    const activeFrameIndex = isStaticMode ? savedWorkflowStoryboardFinalFrameIndex : storyboardFrameIndex;
    const hasWorkflowCard = isStaticMode || storyboardHasWorkflowCard;
    const showApprovalCard = isStaticMode || storyboardShowApprovalCard;
    const approvalStatus = isStaticMode ? "approved" : storyboardApprovalStatus;
    const approvalActionState = isStaticMode ? "idle" : storyboardApprovalActionState;
    const showCompletionResponse = isStaticMode || storyboardShowCompletionResponse;
    const composerPlaceholder = showCompletionResponse
        ? "Ask about recipes, delivery, or next Sunday’s workflow…"
        : "Approve checkout, ask for changes, or edit cart…";
    const activeFrame = hasWorkflowCard ? savedWorkflowStoryboardFrames[activeFrameIndex] : undefined;
    const activeThinking = activeFrame?.thinking ?? "";
    const activeGraphNodeId = previewActiveGraphNodeId ?? activeFrame?.graphNodeId ?? "trigger";
    const resolvedWorkflowNodes = resolveSavedWorkflowNodes(activeGraphNodeId);
    const resolvedWorkflowConnectors = resolveSavedWorkflowConnectors(activeGraphNodeId);
    const workflowElapsedLabel = formatWorkflowElapsedTime(isStaticMode ? getSavedWorkflowStoryboardRuntimeElapsedMs() : workflowElapsedMs);

    const clearStoryboardTimeouts = useCallback(() => {
        storyboardTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
        storyboardTimeoutsRef.current = [];
    }, []);

    const queueStoryboardTimeout = useCallback((callback: () => void, delayMs: number) => {
        const timeout = window.setTimeout(callback, delayMs);
        storyboardTimeoutsRef.current.push(timeout);
    }, []);

    const scheduleStoryboardFramesFrom = useCallback((startFrameIndex: number, initialDelayMs: number) => {
        let elapsedMs = initialDelayMs;

        savedWorkflowStoryboardFrames.slice(startFrameIndex).forEach((frame, relativeFrameIndex) => {
            const frameIndex = startFrameIndex + relativeFrameIndex;
            queueStoryboardTimeout(() => setStoryboardFrameIndex(frameIndex), elapsedMs);
            elapsedMs += frame.durationMs;

            if (frameIndex === savedWorkflowStoryboardApprovalFrameIndex) {
                elapsedMs += savedWorkflowStoryboardScript.approvalPromptRevealDelayMs;
                queueStoryboardTimeout(() => setStoryboardShowApprovalCard(true), elapsedMs);
                elapsedMs += savedWorkflowStoryboardScript.simulatedApprovalDelayMs;
                queueStoryboardTimeout(() => setStoryboardApprovalActionState("pressed"), elapsedMs);
                elapsedMs += savedWorkflowStoryboardScript.simulatedApprovalClickHoldMs;
                queueStoryboardTimeout(() => {
                    setStoryboardApprovalActionState("idle");
                    setStoryboardApprovalStatus("approved");
                }, elapsedMs);
            }
        });

        queueStoryboardTimeout(() => setStoryboardShowCompletionResponse(true), elapsedMs + savedWorkflowStoryboardScript.finalRevealDelayMs);
    }, [queueStoryboardTimeout]);

    const restartStoryboard = () => {
        clearStoryboardTimeouts();
        setStoryboardFrameIndex(0);
        setStoryboardHasWorkflowCard(false);
        setStoryboardShowApprovalCard(false);
        setStoryboardApprovalStatus("pending");
        setStoryboardApprovalActionState("idle");
        setStoryboardShowCompletionResponse(false);
        setIntroMessageLength(0);
        setApprovalMessageLength(0);
        setFinalMessageLength(0);
        setWorkflowElapsedMs(0);
        setStoryboardRunId((currentRunId) => currentRunId + 1);
    };

    const approveCheckoutNow = useCallback(() => {
        if (isStaticMode || !storyboardShowApprovalCard || storyboardApprovalStatus === "approved") {
            return;
        }

        const nextFrameIndex = savedWorkflowStoryboardApprovalFrameIndex + 1;
        const nextFrameDurationMs = savedWorkflowStoryboardFrames[nextFrameIndex]?.durationMs ?? 0;

        clearStoryboardTimeouts();
        setStoryboardApprovalActionState("idle");
        setStoryboardApprovalStatus("approved");
        setStoryboardFrameIndex(nextFrameIndex);
        scheduleStoryboardFramesFrom(nextFrameIndex + 1, nextFrameDurationMs);
    }, [clearStoryboardTimeouts, isStaticMode, scheduleStoryboardFramesFrom, storyboardApprovalStatus, storyboardShowApprovalCard]);

    useEffect(() => {
        if (isStaticMode) {
            return undefined;
        }

        const interval = window.setInterval(() => {
            setIntroMessageLength((currentLength) => {
                const nextLength = Math.min(savedWorkflowStoryboardScript.introMessage.length, currentLength + 2);

                if (nextLength >= savedWorkflowStoryboardScript.introMessage.length) {
                    window.clearInterval(interval);
                }

                return nextLength;
            });
        }, 28);

        return () => window.clearInterval(interval);
    }, [isStaticMode, storyboardRunId]);

    useEffect(() => {
        if (isStaticMode || !storyboardShowApprovalCard) {
            return undefined;
        }

        const interval = window.setInterval(() => {
            setApprovalMessageLength((currentLength) => {
                const nextLength = Math.min(savedWorkflowStoryboardScript.approvalMessage.length, currentLength + 2);

                if (nextLength >= savedWorkflowStoryboardScript.approvalMessage.length) {
                    window.clearInterval(interval);
                }

                return nextLength;
            });
        }, 24);

        return () => window.clearInterval(interval);
    }, [isStaticMode, storyboardRunId, storyboardShowApprovalCard]);

    useEffect(() => {
        if (isStaticMode || !storyboardShowCompletionResponse) {
            return undefined;
        }

        const interval = window.setInterval(() => {
            setFinalMessageLength((currentLength) => {
                const nextLength = Math.min(savedWorkflowStoryboardScript.finalMessage.length, currentLength + 2);

                if (nextLength >= savedWorkflowStoryboardScript.finalMessage.length) {
                    window.clearInterval(interval);
                }

                return nextLength;
            });
        }, 24);

        return () => window.clearInterval(interval);
    }, [isStaticMode, storyboardRunId, storyboardShowCompletionResponse]);

    useEffect(() => {
        if (isStaticMode) {
            return undefined;
        }

        clearStoryboardTimeouts();
        queueStoryboardTimeout(() => setStoryboardHasWorkflowCard(true), savedWorkflowStoryboardScript.workflowCardRevealDelayMs);
        scheduleStoryboardFramesFrom(0, savedWorkflowStoryboardScript.workflowCardRevealDelayMs);

        return () => {
            clearStoryboardTimeouts();
        };
    }, [clearStoryboardTimeouts, isStaticMode, queueStoryboardTimeout, scheduleStoryboardFramesFrom, storyboardRunId]);

    useEffect(() => {
        if (isStaticMode || !hasWorkflowCard || showCompletionResponse) {
            return undefined;
        }

        const activeStoryboardFrame = savedWorkflowStoryboardFrames[activeFrameIndex];
        const runtimeStartTimeout = window.setTimeout(() => {
            setWorkflowElapsedMs(getSavedWorkflowRuntimeStartMs(activeFrameIndex));
        }, 0);

        if (!activeStoryboardFrame || activeStoryboardFrame.durationMs <= 0 || activeStoryboardFrame.runtimeMs <= 0) {
            return () => window.clearTimeout(runtimeStartTimeout);
        }

        const tickMs = 250;
        let frameDisplayElapsedMs = 0;
        const interval = window.setInterval(() => {
            frameDisplayElapsedMs = Math.min(activeStoryboardFrame.durationMs, frameDisplayElapsedMs + tickMs);
            setWorkflowElapsedMs(getSavedWorkflowRuntimeElapsedMs(activeFrameIndex, frameDisplayElapsedMs / activeStoryboardFrame.durationMs));

            if (frameDisplayElapsedMs >= activeStoryboardFrame.durationMs) {
                window.clearInterval(interval);
            }
        }, tickMs);

        return () => {
            window.clearTimeout(runtimeStartTimeout);
            window.clearInterval(interval);
        };
    }, [activeFrameIndex, hasWorkflowCard, isStaticMode, showCompletionResponse, storyboardRunId]);

    return (
        <WorkflowRunFrame ariaLabel="Saved workflow run wireframe mockup">
            {!isStaticMode && (
                <div className="mb-3 flex justify-end">
                    <PrimaryCtaButton
                        aria-label="Restart saved workflow animation"
                        onClick={restartStoryboard}
                        style={{ "--nous-primary-cta-size": "0.625rem" } as CSSProperties}
                    >
                        <History aria-hidden="true" className="size-3" strokeWidth={1.8} />
                    </PrimaryCtaButton>
                </div>
            )}
            <div
                className={cn("nous-workflow-component-fade relative mx-auto w-full max-w-full overflow-hidden", productMockupFrameHeightClassName)}
                data-saved-workflow-approval-status={showApprovalCard ? approvalStatus : "hidden"}
                data-saved-workflow-approval-action={showApprovalCard ? approvalActionState : "hidden"}
                data-saved-workflow-approval-visible={showApprovalCard ? "true" : "false"}
                data-saved-workflow-card-visible={hasWorkflowCard ? "true" : "false"}
                data-saved-workflow-completion-visible={showCompletionResponse ? "true" : "false"}
                data-saved-workflow-final-visible={showCompletionResponse ? "true" : "false"}
                data-saved-workflow-frame={hasWorkflowCard ? savedWorkflowStoryboardFrames[activeFrameIndex]?.key : "trigger"}
                data-saved-workflow-layout="home-chat"
                data-saved-workflow-mode={mode}
            >
                <div className="absolute inset-0" data-homepage-chat-area="chat" data-state="focus">
                    <SavedWorkflowWorkflowCanvas
                        connectors={resolvedWorkflowConnectors}
                        nodes={resolvedWorkflowNodes}
                    />
                </div>
                <div className="absolute inset-y-0 left-0 z-10" data-saved-workflow-area="messages" data-state="focus">
                    <SavedWorkflowMessagePane
                        activeFrameIndex={activeFrameIndex}
                        activeThinking={activeThinking}
                        activeThinkingStreamKey={activeFrame?.key}
                        approvalMessage={savedWorkflowStoryboardScript.approvalMessage.slice(0, approvalMessageLength)}
                        approvalActionState={approvalActionState}
                        approvalStatus={approvalStatus}
                        completionMessage={savedWorkflowStoryboardScript.finalMessage.slice(0, finalMessageLength)}
                        composerPlaceholder={composerPlaceholder}
                        finalMessage={savedWorkflowStoryboardScript.finalMessage.slice(0, finalMessageLength)}
                        hasWorkflowCard={hasWorkflowCard}
                        introMessage={savedWorkflowStoryboardScript.introMessage.slice(0, introMessageLength)}
                        onApproveCheckout={approveCheckoutNow}
                        showApprovalCard={showApprovalCard}
                        showCompletionResponse={showCompletionResponse}
                        streamThinking={!isStaticMode}
                        workflowElapsedLabel={workflowElapsedLabel}
                    />
                </div>
            </div>
        </WorkflowRunFrame>
    );
}

function SavedWorkflowWorkflowCanvas({ connectors, nodes }: {
    connectors: readonly WorkflowConnectorItem[];
    nodes: readonly WorkflowNodeItem[];
}) {
    const canvasLayers = [
        {
            className: "[background:var(--nous-workflow-run-radial-bg)]",
            "data-homepage-chat-canvas-radial": "true"
        }
    ];

    return (
        <div className="absolute bottom-[.5rem] left-[var(--nous-home-chat-canvas-left)] right-0 top-[1rem] rounded-[14px]">
            <AmbientSurface
                ariaLabel="Chat welcome panel"
                as="section"
                className={cn(
                    "relative isolate h-full overflow-hidden",
                    "rounded-[var(--nous-home-chat-canvas-radius)]",
                    "ring-1 ring-inset ring-[color:var(--nous-stroke-default)]",
                    "[background:var(--nous-workflow-run-bg)] [background-size:var(--nous-home-chat-canvas-bg-size)]",
                    "shadow-[inset_0_1px_0_var(--nous-stroke-ghost)]"
                )}
                contentClassName="h-full"
                layers={canvasLayers}
            >
                <div className="absolute inset-0 z-0 opacity-[var(--nous-workflow-unfocused-opacity)]" data-saved-workflow-background="true">
                    <WorkflowEditorPanel
                        className="h-full border-0 shadow-none"
                        connectors={connectors}
                        nodes={nodes}
                        surface="transparent"
                    />
                </div>
            </AmbientSurface>
        </div>
    );
}

function formatWorkflowElapsedTime(elapsedMs: number) {
    const totalSeconds = Math.max(0, Math.floor(elapsedMs / 1_000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function SavedWorkflowMessagePane({ activeFrameIndex, activeThinking, activeThinkingStreamKey, approvalActionState, approvalMessage, approvalStatus, completionMessage, composerPlaceholder, finalMessage, hasWorkflowCard, introMessage, onApproveCheckout, showApprovalCard, showCompletionResponse, streamThinking, workflowElapsedLabel }: {
    activeFrameIndex: number;
    activeThinking: string;
    activeThinkingStreamKey?: string;
    approvalActionState: "idle" | "pressed";
    approvalMessage: string;
    approvalStatus: "approved" | "pending";
    completionMessage: string;
    composerPlaceholder: string;
    finalMessage: string;
    hasWorkflowCard: boolean;
    introMessage: string;
    onApproveCheckout?: () => void;
    showApprovalCard: boolean;
    showCompletionResponse: boolean;
    streamThinking: boolean;
    workflowElapsedLabel: string;
}) {
    const messagePaneLayers = [
        {
            className: "bg-[image:var(--nous-home-chat-sidebar-radial-bg)]",
            "data-homepage-chat-sidebar-radial": "true"
        },
        {
            className: cn(
                "z-20 rounded-[var(--nous-home-chat-sidebar-radius)]",
                "nous-home-chat-sidebar-outline-border",
                "opacity-[var(--nous-home-chat-sidebar-outline-opacity)]"
            ),
            "data-homepage-chat-sidebar-outer-border": "true"
        }
    ];

    return (
        <AmbientSurface
            as="div"
            className={cn(
                "absolute left-0 top-0 flex h-full w-[var(--nous-home-chat-sidebar-width)] flex-col overflow-hidden",
                "pointer-events-auto",
                "rounded-[var(--nous-home-chat-sidebar-radius)]",
                "border border-[color:var(--nous-stroke-soft)]",
                "[background:var(--nous-home-chat-sidebar-bg)]",
                "shadow-[var(--nous-home-chat-sidebar-shadow)] backdrop-blur"
            )}
            contentClassName="h-full"
            layers={messagePaneLayers}
        >
            <SavedWorkflowCompanionChat activeFrameIndex={activeFrameIndex} activeThinking={activeThinking} activeThinkingStreamKey={activeThinkingStreamKey} approvalActionState={approvalActionState} approvalMessage={approvalMessage} approvalStatus={approvalStatus} completionMessage={completionMessage} composerPlaceholder={composerPlaceholder} finalMessage={finalMessage} hasWorkflowCard={hasWorkflowCard} introMessage={introMessage} layout="panel" onApproveCheckout={onApproveCheckout} showApproval={showApprovalCard} showCompletion={showCompletionResponse} streamThinking={streamThinking} workflowElapsedLabel={workflowElapsedLabel} />
        </AmbientSurface>
    );
}
