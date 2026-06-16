"use client";

import { History } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { DisclosureTriangle, ScrollableRegion } from "@/components/design-system/mockup/components";
import { PrimaryCtaButton } from "@/components/marketing/primary-cta-link";
import {
    AssistantResponseFlow,
    AssistantResponseSection,
    CommandComposer,
    HomepageChatToolCallList,
    MessageBubble,
    ProposalCard
} from "@/components/mockups/conversation";
import { AmbientSurface } from "@/components/mockups/surface";
import { WorkflowEditorPanel } from "@/components/mockups/workflow";
import type { WorkflowConnectorItem, WorkflowNodeItem } from "@/components/mockups/workflow";
import {
    resolveCortexWorkflowCreationConnectors,
    resolveCortexWorkflowCreationNodes
} from "@/components/product-mockups/cortex-workflow-creation-graph-model";
import {
    cortexWorkflowCreationFinalStepIndex,
    cortexWorkflowCreationScript
} from "@/components/product-mockups/cortex-workflow-creation-script";
import type { CortexWorkflowCreationGraphNodeId, CortexWorkflowCreationMode, CortexWorkflowCreationToolCall } from "@/components/product-mockups/cortex-workflow-creation-script";
import { HomepageChatComposerLeadingActions, HomepageChatComposerTrailingActions } from "@/components/product-mockups/homepage-chat-composer-buttons";
import { productMockupFrameHeightClassName } from "@/components/product-mockups/product-mockup-shell";
import { cn } from "@/lib/cn";

type CortexWorkflowCreationStoryboardStage = "complete" | "connecting" | "ready" | "responding" | "typing";

export function CortexWorkflowCreationMockup({ mode = "storyboard", previewActiveGraphNodeId }: {
    mode?: CortexWorkflowCreationMode;
    previewActiveGraphNodeId?: CortexWorkflowCreationGraphNodeId;
}) {
    const isStaticMode = mode === "static";
    const [storyboardStage, setStoryboardStage] = useState<CortexWorkflowCreationStoryboardStage>(() => isStaticMode ? "complete" : "typing");
    const [typedMessageLength, setTypedMessageLength] = useState(() => isStaticMode ? cortexWorkflowCreationScript.userMessage.length : 0);
    const [assistantLeadLength, setAssistantLeadLength] = useState(() => isStaticMode ? cortexWorkflowCreationScript.assistantLead.length : 0);
    const [storyboardFitThinkingStepIndex, setStoryboardFitThinkingStepIndex] = useState(() => isStaticMode ? cortexWorkflowCreationScript.workflowFitThinking.steps.length - 1 : 0);
    const [storyboardShowFitThinkingCard, setStoryboardShowFitThinkingCard] = useState(isStaticMode);
    const [storyboardIsFitThinkingComplete, setStoryboardIsFitThinkingComplete] = useState(isStaticMode);
    const [storyboardCanStreamAssistantLead, setStoryboardCanStreamAssistantLead] = useState(isStaticMode);
    const [storyboardStepIndex, setStoryboardStepIndex] = useState(0);
    const [storyboardShowPermissionPrompt, setStoryboardShowPermissionPrompt] = useState(isStaticMode);
    const [storyboardPermissionActionState, setStoryboardPermissionActionState] = useState<"idle" | "pressed">("idle");
    const [storyboardHasDraftPermission, setStoryboardHasDraftPermission] = useState(false);
    const [storyboardGraphNodeId, setStoryboardGraphNodeId] = useState<CortexWorkflowCreationGraphNodeId>("idle");
    const [storyboardPressedPlaceholderGraphNodeId, setStoryboardPressedPlaceholderGraphNodeId] = useState<CortexWorkflowCreationGraphNodeId | undefined>(undefined);
    const [storyboardHasThinkingCard, setStoryboardHasThinkingCard] = useState(false);
    const [storyboardIsAuthoringComplete, setStoryboardIsAuthoringComplete] = useState(isStaticMode);
    const [storyboardShowProposal, setStoryboardShowProposal] = useState(false);
    const [storyboardRunId, setStoryboardRunId] = useState(0);
    const storyboardTimeoutsRef = useRef<number[]>([]);
    const typedMessage = cortexWorkflowCreationScript.userMessage.slice(0, typedMessageLength);
    const assistantLeadText = cortexWorkflowCreationScript.assistantLead.slice(0, assistantLeadLength);
    const hasSubmittedMessage = isStaticMode || storyboardStage === "connecting" || storyboardStage === "responding" || storyboardStage === "complete";
    const activeFitThinkingStepIndex = isStaticMode ? cortexWorkflowCreationScript.workflowFitThinking.steps.length - 1 : storyboardFitThinkingStepIndex;
    const activeStepIndex = isStaticMode ? cortexWorkflowCreationFinalStepIndex : storyboardStepIndex;
    const showFitThinkingCard = isStaticMode || (hasSubmittedMessage && storyboardShowFitThinkingCard);
    const isFitThinkingComplete = isStaticMode || storyboardIsFitThinkingComplete;
    const showPermissionPrompt = isStaticMode || (hasSubmittedMessage && storyboardShowPermissionPrompt);
    const permissionActionState = isStaticMode ? "idle" : storyboardPermissionActionState;
    const hasDraftPermission = isStaticMode || (hasSubmittedMessage && storyboardHasDraftPermission);
    const hasThinkingCard = isStaticMode || (hasDraftPermission && storyboardHasThinkingCard);
    const isAuthoringComplete = isStaticMode || storyboardIsAuthoringComplete;
    const showProposal = isStaticMode || (hasDraftPermission && storyboardShowProposal);
    const activeGraphNodeId = previewActiveGraphNodeId ?? (isStaticMode ? "save" : storyboardGraphNodeId);
    const resolvedWorkflowNodes = resolveCortexWorkflowCreationNodes(activeGraphNodeId, isStaticMode ? undefined : storyboardPressedPlaceholderGraphNodeId);
    const resolvedWorkflowConnectors = resolveCortexWorkflowCreationConnectors(activeGraphNodeId);

    const clearStoryboardTimeouts = useCallback(() => {
        storyboardTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
        storyboardTimeoutsRef.current = [];
    }, []);

    const queueStoryboardTimeout = useCallback((callback: () => void, delayMs: number) => {
        const timeout = window.setTimeout(callback, delayMs);
        storyboardTimeoutsRef.current.push(timeout);
    }, []);

    const approveWorkflowCreationNow = useCallback(() => {
        if (isStaticMode || storyboardHasDraftPermission) {
            return;
        }

        setStoryboardPermissionActionState("idle");
        setStoryboardHasDraftPermission(true);
    }, [isStaticMode, storyboardHasDraftPermission]);

    const restartStoryboard = () => {
        clearStoryboardTimeouts();
        setStoryboardStage("typing");
        setTypedMessageLength(0);
        setAssistantLeadLength(0);
        setStoryboardFitThinkingStepIndex(0);
        setStoryboardShowFitThinkingCard(false);
        setStoryboardIsFitThinkingComplete(false);
        setStoryboardCanStreamAssistantLead(false);
        setStoryboardStepIndex(0);
        setStoryboardShowPermissionPrompt(false);
        setStoryboardPermissionActionState("idle");
        setStoryboardHasDraftPermission(false);
        setStoryboardGraphNodeId("idle");
        setStoryboardPressedPlaceholderGraphNodeId(undefined);
        setStoryboardHasThinkingCard(false);
        setStoryboardIsAuthoringComplete(false);
        setStoryboardShowProposal(false);
        setStoryboardRunId((currentRunId) => currentRunId + 1);
    };

    useEffect(() => {
        if (isStaticMode) {
            return undefined;
        }

        if (storyboardStage !== "typing") {
            return undefined;
        }

        if (typedMessageLength >= cortexWorkflowCreationScript.userMessage.length) {
            return undefined;
        }

        const timeout = window.setTimeout(() => {
            const nextLength = Math.min(typedMessageLength + 1, cortexWorkflowCreationScript.userMessage.length);

            setTypedMessageLength(nextLength);

            if (nextLength >= cortexWorkflowCreationScript.userMessage.length) {
                setStoryboardStage("ready");
            }
        }, cortexWorkflowCreationScript.typingIntervalMs);

        return () => window.clearTimeout(timeout);
    }, [isStaticMode, storyboardStage, typedMessageLength]);

    useEffect(() => {
        if (isStaticMode) {
            return undefined;
        }

        if (storyboardStage !== "ready") {
            return undefined;
        }

        const timeout = window.setTimeout(() => {
            setAssistantLeadLength(0);
            setStoryboardFitThinkingStepIndex(0);
            setStoryboardShowFitThinkingCard(false);
            setStoryboardIsFitThinkingComplete(false);
            setStoryboardCanStreamAssistantLead(false);
            setStoryboardStepIndex(0);
            setStoryboardShowPermissionPrompt(false);
            setStoryboardPermissionActionState("idle");
            setStoryboardHasDraftPermission(false);
            setStoryboardGraphNodeId("idle");
            setStoryboardPressedPlaceholderGraphNodeId(undefined);
            setStoryboardHasThinkingCard(false);
            setStoryboardIsAuthoringComplete(false);
            setStoryboardShowProposal(false);
            setStoryboardStage("connecting");
        }, cortexWorkflowCreationScript.autoSendDelayMs);

        return () => window.clearTimeout(timeout);
    }, [isStaticMode, storyboardStage]);

    useEffect(() => {
        if (isStaticMode) {
            return undefined;
        }

        if (storyboardStage !== "connecting") {
            return undefined;
        }

        const timeout = window.setTimeout(() => {
            setStoryboardStage("responding");
        }, cortexWorkflowCreationScript.socketConnectDelayMs);

        return () => window.clearTimeout(timeout);
    }, [isStaticMode, storyboardStage]);

    useEffect(() => {
        if (isStaticMode) {
            return undefined;
        }

        if (storyboardStage !== "responding" || !storyboardCanStreamAssistantLead) {
            return undefined;
        }

        if (assistantLeadLength >= cortexWorkflowCreationScript.assistantLead.length) {
            return undefined;
        }

        const interval = window.setInterval(() => {
            setAssistantLeadLength((currentLength) => {
                const nextLength = Math.min(currentLength + 2, cortexWorkflowCreationScript.assistantLead.length);

                if (nextLength >= cortexWorkflowCreationScript.assistantLead.length) {
                    window.clearInterval(interval);
                }

                return nextLength;
            });
        }, cortexWorkflowCreationScript.assistantLeadStreamIntervalMs);

        return () => window.clearInterval(interval);
    }, [assistantLeadLength, isStaticMode, storyboardCanStreamAssistantLead, storyboardStage]);

    useEffect(() => {
        if (isStaticMode) {
            return undefined;
        }

        if (storyboardStage !== "responding") {
            return undefined;
        }

        if (storyboardCanStreamAssistantLead) {
            return undefined;
        }

        const timeouts: number[] = [];
        let elapsedMs = cortexWorkflowCreationScript.workflowFitThinkingRevealDelayMs;

        timeouts.push(window.setTimeout(() => {
            setStoryboardShowFitThinkingCard(true);
        }, elapsedMs));

        cortexWorkflowCreationScript.workflowFitThinking.steps.forEach((step, stepIndex) => {
            timeouts.push(window.setTimeout(() => {
                setStoryboardFitThinkingStepIndex(stepIndex);
            }, elapsedMs));

            elapsedMs += step.durationMs;
        });

        timeouts.push(window.setTimeout(() => {
            setStoryboardIsFitThinkingComplete(true);
        }, elapsedMs));

        timeouts.push(window.setTimeout(() => {
            setStoryboardCanStreamAssistantLead(true);
        }, elapsedMs + cortexWorkflowCreationScript.thinkingCollapseDelayMs));

        return () => {
            timeouts.forEach((timeout) => window.clearTimeout(timeout));
        };
    }, [isStaticMode, storyboardCanStreamAssistantLead, storyboardStage]);

    useEffect(() => {
        if (isStaticMode) {
            return undefined;
        }

        if (storyboardStage !== "responding" || !storyboardCanStreamAssistantLead) {
            return undefined;
        }

        if (assistantLeadLength < cortexWorkflowCreationScript.assistantLead.length) {
            return undefined;
        }

        if (storyboardShowPermissionPrompt) {
            return undefined;
        }

        const timeout = window.setTimeout(() => {
            setStoryboardShowPermissionPrompt(true);
        }, cortexWorkflowCreationScript.permissionPromptDelayMs);

        return () => window.clearTimeout(timeout);
    }, [assistantLeadLength, isStaticMode, storyboardCanStreamAssistantLead, storyboardShowPermissionPrompt, storyboardStage]);

    useEffect(() => {
        if (isStaticMode) {
            return undefined;
        }

        if (!storyboardShowPermissionPrompt || storyboardHasDraftPermission) {
            return undefined;
        }

        const pressTimeout = window.setTimeout(() => {
            setStoryboardPermissionActionState("pressed");
        }, cortexWorkflowCreationScript.permissionSelectionDelayMs);

        const approveTimeout = window.setTimeout(() => {
            setStoryboardPermissionActionState("idle");
            setStoryboardHasDraftPermission(true);
        }, cortexWorkflowCreationScript.permissionSelectionDelayMs + cortexWorkflowCreationScript.permissionSelectionClickHoldMs);

        return () => {
            window.clearTimeout(pressTimeout);
            window.clearTimeout(approveTimeout);
        };
    }, [isStaticMode, storyboardHasDraftPermission, storyboardShowPermissionPrompt]);

    useEffect(() => {
        if (isStaticMode) {
            return undefined;
        }

        if (storyboardStage !== "responding" || !storyboardHasDraftPermission) {
            return undefined;
        }

        clearStoryboardTimeouts();

        let elapsedMs = cortexWorkflowCreationScript.authoringStartDelayMs;
        queueStoryboardTimeout(() => setStoryboardGraphNodeId("idle"), elapsedMs);
        queueStoryboardTimeout(() => setStoryboardHasThinkingCard(true), elapsedMs);
        queueStoryboardTimeout(() => setStoryboardIsAuthoringComplete(false), elapsedMs);

        cortexWorkflowCreationScript.steps.forEach((step, stepIndex) => {
            queueStoryboardTimeout(() => setStoryboardStepIndex(stepIndex), elapsedMs);
            const graphRevealTimeMs = elapsedMs + getCortexThinkingStreamDurationMs(step.thinking) + cortexWorkflowCreationScript.workflowToolCallRevealDelayMs;

            if (step.graphNodeId !== "save") {
                queueStoryboardTimeout(() => setStoryboardPressedPlaceholderGraphNodeId(step.graphNodeId), Math.max(elapsedMs, graphRevealTimeMs - cortexWorkflowCreationScript.workflowPlaceholderClickHoldMs));
            }

            queueStoryboardTimeout(() => {
                setStoryboardGraphNodeId(step.graphNodeId);
                setStoryboardPressedPlaceholderGraphNodeId(undefined);
            }, graphRevealTimeMs);
            elapsedMs += getCortexWorkflowAuthoringStepDurationMs(step);
        });

        queueStoryboardTimeout(() => setStoryboardIsAuthoringComplete(true), elapsedMs);
        queueStoryboardTimeout(() => setStoryboardShowProposal(true), elapsedMs + cortexWorkflowCreationScript.thinkingCollapseDelayMs + cortexWorkflowCreationScript.workflowProposalRevealDelayMs);

        return () => {
            clearStoryboardTimeouts();
        };
    }, [clearStoryboardTimeouts, isStaticMode, queueStoryboardTimeout, storyboardHasDraftPermission, storyboardRunId, storyboardStage]);

    return (
        <article aria-label="Cortex workflow creation mockup" className="relative" data-cortex-workflow-creation-mockup="true">
            {!isStaticMode && (
                <div className="mb-3 flex justify-end">
                    <PrimaryCtaButton
                        aria-label="Restart Cortex workflow creation animation"
                        onClick={restartStoryboard}
                        style={{ "--nous-primary-cta-size": "0.625rem" } as CSSProperties}
                    >
                        <History aria-hidden="true" className="size-3" strokeWidth={1.8} />
                    </PrimaryCtaButton>
                </div>
            )}
            <div
                className={cn("nous-workflow-component-fade relative mx-auto w-full max-w-full overflow-hidden", productMockupFrameHeightClassName)}
                data-cortex-workflow-active-node={activeGraphNodeId}
                data-cortex-workflow-creation-layout="home-chat"
                data-cortex-workflow-creation-mode={mode}
                data-cortex-workflow-fit-thinking-visible={showFitThinkingCard ? "true" : "false"}
                data-cortex-workflow-permission-action={showPermissionPrompt ? permissionActionState : "hidden"}
                data-cortex-workflow-permission-approved={hasDraftPermission ? "true" : "false"}
                data-cortex-workflow-permission-visible={showPermissionPrompt ? "true" : "false"}
                data-cortex-workflow-proposal-visible={showProposal ? "true" : "false"}
                data-cortex-workflow-storyboard-stage={storyboardStage}
                data-cortex-workflow-thinking-visible={hasThinkingCard ? "true" : "false"}
            >
                <div className="absolute inset-0" data-homepage-chat-area="chat" data-state="focus">
                    <CortexWorkflowCreationCanvas connectors={resolvedWorkflowConnectors} nodes={resolvedWorkflowNodes} />
                </div>
                <div className="absolute inset-y-0 left-0 z-10" data-cortex-workflow-area="messages" data-state="focus">
                    <CortexWorkflowCreationMessagePane
                        activeStepIndex={activeStepIndex}
                        activeFitThinkingStepIndex={activeFitThinkingStepIndex}
                        assistantLeadText={assistantLeadText}
                        hasDraftPermission={hasDraftPermission}
                        hasSubmittedMessage={hasSubmittedMessage}
                        hasThinkingCard={hasThinkingCard}
                        isAuthoringComplete={isAuthoringComplete}
                        isFitThinkingComplete={isFitThinkingComplete}
                        onCreateWorkflow={approveWorkflowCreationNow}
                        permissionActionState={permissionActionState}
                        showFitThinkingCard={showFitThinkingCard}
                        showPermissionPrompt={showPermissionPrompt}
                        showProposal={showProposal}
                        storyboardStage={storyboardStage}
                        streamThinking={!isStaticMode}
                        typedMessage={typedMessage}
                    />
                </div>
            </div>
        </article>
    );
}

function CortexWorkflowCreationCanvas({ connectors, nodes }: {
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
                ariaLabel="Cortex workflow creation canvas"
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
                <div className="absolute inset-0 z-0 opacity-[var(--nous-workflow-unfocused-opacity)]" data-cortex-workflow-background="true">
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

function CortexWorkflowCreationMessagePane({ activeFitThinkingStepIndex, activeStepIndex, assistantLeadText, hasDraftPermission, hasSubmittedMessage, hasThinkingCard, isAuthoringComplete, isFitThinkingComplete, onCreateWorkflow, permissionActionState, showFitThinkingCard, showPermissionPrompt, showProposal, storyboardStage, streamThinking, typedMessage }: {
    activeFitThinkingStepIndex: number;
    activeStepIndex: number;
    assistantLeadText: string;
    hasDraftPermission: boolean;
    hasSubmittedMessage: boolean;
    hasThinkingCard: boolean;
    isAuthoringComplete: boolean;
    isFitThinkingComplete: boolean;
    onCreateWorkflow?: () => void;
    permissionActionState: "idle" | "pressed";
    showFitThinkingCard: boolean;
    showPermissionPrompt: boolean;
    showProposal: boolean;
    storyboardStage: CortexWorkflowCreationStoryboardStage;
    streamThinking: boolean;
    typedMessage: string;
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
            <CortexWorkflowCreationCompanionChat
                activeFitThinkingStepIndex={activeFitThinkingStepIndex}
                activeStepIndex={activeStepIndex}
                assistantLeadText={assistantLeadText}
                hasDraftPermission={hasDraftPermission}
                hasSubmittedMessage={hasSubmittedMessage}
                hasThinkingCard={hasThinkingCard}
                isAuthoringComplete={isAuthoringComplete}
                isFitThinkingComplete={isFitThinkingComplete}
                onCreateWorkflow={onCreateWorkflow}
                permissionActionState={permissionActionState}
                showFitThinkingCard={showFitThinkingCard}
                showPermissionPrompt={showPermissionPrompt}
                showProposal={showProposal}
                storyboardStage={storyboardStage}
                streamThinking={streamThinking}
                typedMessage={typedMessage}
            />
        </AmbientSurface>
    );
}

function CortexWorkflowCreationCompanionChat({ activeFitThinkingStepIndex, activeStepIndex, assistantLeadText, hasDraftPermission, hasSubmittedMessage, hasThinkingCard, isAuthoringComplete, isFitThinkingComplete, onCreateWorkflow, permissionActionState, showFitThinkingCard, showPermissionPrompt, showProposal, storyboardStage, streamThinking, typedMessage }: {
    activeFitThinkingStepIndex: number;
    activeStepIndex: number;
    assistantLeadText: string;
    hasDraftPermission: boolean;
    hasSubmittedMessage: boolean;
    hasThinkingCard: boolean;
    isAuthoringComplete: boolean;
    isFitThinkingComplete: boolean;
    onCreateWorkflow?: () => void;
    permissionActionState: "idle" | "pressed";
    showFitThinkingCard: boolean;
    showPermissionPrompt: boolean;
    showProposal: boolean;
    storyboardStage: CortexWorkflowCreationStoryboardStage;
    streamThinking: boolean;
    typedMessage: string;
}) {
    const rootRef = useRef<HTMLElement>(null);
    const transcriptScrollFrameRef = useRef<number | null>(null);
    const transcriptScrollTimeoutsRef = useRef<number[]>([]);
    const hasAssistantPermissionContent = assistantLeadText.length > 0 || showFitThinkingCard || showPermissionPrompt;
    const hasAssistantAuthoringContent = hasDraftPermission && (hasThinkingCard || showProposal);

    const scrollTranscriptToBottom = useCallback(() => {
        const scrollRegion = rootRef.current?.querySelector<HTMLElement>('[aria-label="Cortex workflow creation transcript"]');

        if (!scrollRegion) {
            return;
        }

        if (typeof scrollRegion.scrollTo === "function") {
            scrollRegion.scrollTo({ behavior: "auto", top: scrollRegion.scrollHeight });
        } else {
            scrollRegion.scrollTop = scrollRegion.scrollHeight;
        }
    }, []);

    const clearTranscriptScrollTimeouts = useCallback(() => {
        transcriptScrollTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
        transcriptScrollTimeoutsRef.current = [];
    }, []);

    const scheduleTranscriptScrollToBottom = useCallback((includeDelayedPasses = false) => {
        if (transcriptScrollFrameRef.current !== null) {
            window.cancelAnimationFrame(transcriptScrollFrameRef.current);
        }

        transcriptScrollFrameRef.current = window.requestAnimationFrame(() => {
            transcriptScrollFrameRef.current = null;
            scrollTranscriptToBottom();
        });

        if (!includeDelayedPasses) {
            return;
        }

        clearTranscriptScrollTimeouts();

        [80, 240, 720].forEach((delayMs) => {
            const timeoutId = window.setTimeout(() => {
                scrollTranscriptToBottom();
            }, delayMs);

            transcriptScrollTimeoutsRef.current.push(timeoutId);
        });
    }, [clearTranscriptScrollTimeouts, scrollTranscriptToBottom]);

    useEffect(() => {
        return () => {
            if (transcriptScrollFrameRef.current !== null) {
                window.cancelAnimationFrame(transcriptScrollFrameRef.current);
                transcriptScrollFrameRef.current = null;
            }

            clearTranscriptScrollTimeouts();
        };
    }, [clearTranscriptScrollTimeouts]);

    useEffect(() => {
        scheduleTranscriptScrollToBottom(true);
    }, [activeFitThinkingStepIndex, activeStepIndex, assistantLeadText, hasDraftPermission, hasSubmittedMessage, hasThinkingCard, scheduleTranscriptScrollToBottom, showFitThinkingCard, showPermissionPrompt, showProposal, storyboardStage]);

    useEffect(() => {
        const transcriptContent = rootRef.current?.querySelector<HTMLElement>('[data-cortex-workflow-transcript-content="true"]');

        if (!transcriptContent) {
            return undefined;
        }

        const mutationObserver = new MutationObserver(() => {
            scheduleTranscriptScrollToBottom();
        });

        mutationObserver.observe(transcriptContent, {
            characterData: true,
            childList: true,
            subtree: true
        });

        const resizeObserver = typeof window.ResizeObserver === "function"
            ? new window.ResizeObserver(() => {
                scheduleTranscriptScrollToBottom();
            })
            : undefined;

        resizeObserver?.observe(transcriptContent);
        scheduleTranscriptScrollToBottom(true);

        return () => {
            mutationObserver.disconnect();
            resizeObserver?.disconnect();
        };
    }, [scheduleTranscriptScrollToBottom]);

    return (
        <section
            aria-label="Cortex companion conversation"
            className="relative z-20 flex h-full flex-col px-[var(--nous-home-chat-sidebar-padding-x)] pb-3 pt-[var(--nous-home-chat-sidebar-header-padding-top)]"
            data-companion-app-surface="helper"
            ref={rootRef}
        >
            <div className="flex min-h-0 w-full flex-1 flex-col">
                <ScrollableRegion ariaLabel="Cortex workflow creation transcript" className="-mr-4 py-3 pr-4">
                    <div className="flex min-h-full w-full flex-col justify-end gap-[var(--nous-chat-transcript-gap)] pb-2" data-cortex-workflow-transcript-content="true">
                        {hasSubmittedMessage ? (
                            <MessageBubble role="user">
                                {cortexWorkflowCreationScript.userMessage}
                            </MessageBubble>
                        ) : null}
                        {storyboardStage === "connecting" ? <CortexTypingIndicator /> : null}
                        {hasSubmittedMessage && hasAssistantPermissionContent ? (
                            <AssistantResponseFlow>
                                {showFitThinkingCard ? (
                                    <CortexWorkflowFitThinkingCard
                                        activeStepIndex={activeFitThinkingStepIndex}
                                        isComplete={isFitThinkingComplete}
                                        streamThinking={streamThinking}
                                    />
                                ) : null}
                                {assistantLeadText.length > 0 ? (
                                    <AssistantResponseSection>
                                        <p data-cortex-workflow-lead-prose="true" data-cortex-workflow-lead-stream="true">{assistantLeadText}</p>
                                    </AssistantResponseSection>
                                ) : null}
                                {showPermissionPrompt ? (
                                    <div className="nous-home-chat-final-answer-in" data-cortex-workflow-permission-card="true">
                                        <WorkflowCreationPermissionCard actionState={permissionActionState} onCreateWorkflow={onCreateWorkflow} />
                                    </div>
                                ) : null}
                            </AssistantResponseFlow>
                        ) : null}
                        {hasAssistantAuthoringContent ? (
                            <AssistantResponseFlow>
                                {hasThinkingCard ? (
                                    <CortexThinkingCard
                                        activeStepIndex={activeStepIndex}
                                        isComplete={isAuthoringComplete}
                                        streamThinking={streamThinking}
                                    />
                                ) : null}
                                {showProposal ? (
                                    <>
                                        <AssistantResponseSection className="nous-home-chat-final-answer-in">
                                            <p data-cortex-workflow-proposal-prose="true">{cortexWorkflowCreationScript.assistantProposal}</p>
                                        </AssistantResponseSection>
                                        <div className="nous-home-chat-final-answer-in" data-cortex-workflow-proposal-card="true">
                                            <WorkflowCreationProposalCard />
                                        </div>
                                    </>
                                ) : null}
                            </AssistantResponseFlow>
                        ) : null}
                    </div>
                </ScrollableRegion>
            </div>
            <div className="w-full" data-homepage-chat-composer-shell="compact">
                <CompanionComposer
                    isSendReady={storyboardStage === "ready"}
                    placeholder={cortexWorkflowCreationScript.composerPlaceholder}
                    showCaret={storyboardStage === "typing"}
                    value={hasSubmittedMessage ? "" : typedMessage}
                />
            </div>
        </section>
    );
}

function CortexWorkflowFitThinkingCard({ activeStepIndex, isComplete, streamThinking }: {
    activeStepIndex: number;
    isComplete: boolean;
    streamThinking: boolean;
}) {
    const [isExpanded, setIsExpanded] = useState(() => !isComplete);
    const [elapsedMs, setElapsedMs] = useState(() => isComplete ? getWorkflowFitThinkingDurationMs() : 0);
    const hasAutoCollapsedRef = useRef(isComplete);
    const visibleSteps = cortexWorkflowCreationScript.workflowFitThinking.steps.slice(0, activeStepIndex + 1);
    const totalDurationMs = getWorkflowFitThinkingDurationMs();
    const thinkingDurationLabel = getWorkflowFitThinkingDurationLabel(isComplete ? totalDurationMs : elapsedMs, isComplete);

    useEffect(() => {
        if (!isComplete) {
            hasAutoCollapsedRef.current = false;
            return undefined;
        }

        if (hasAutoCollapsedRef.current) {
            return undefined;
        }

        hasAutoCollapsedRef.current = true;

        const timeout = window.setTimeout(() => {
            setIsExpanded(false);
        }, cortexWorkflowCreationScript.thinkingCollapseDelayMs);

        return () => window.clearTimeout(timeout);
    }, [isComplete]);

    useEffect(() => {
        if (isComplete) {
            return undefined;
        }

        const interval = window.setInterval(() => {
            setElapsedMs((currentElapsedMs) => Math.min(totalDurationMs, currentElapsedMs + 100));
        }, 100);

        return () => window.clearInterval(interval);
    }, [isComplete, totalDurationMs]);

    return (
        <article
            className="nous-home-chat-message-in flex flex-col self-stretch text-xs leading-[var(--nous-leading-drawer)] text-[var(--nous-drawer-body-fg-strong)]"
            data-cortex-fit-thinking-card="true"
            data-homepage-chat-message="assistant"
        >
            <div
                className={cn(
                    "nous-home-chat-response-line-in",
                    !isExpanded && isComplete && "mb-[var(--nous-assistant-response-section-gap)]"
                )}
                data-homepage-chat-working-accordion={isExpanded ? "open" : "closed"}
            >
                <button
                    aria-expanded={isExpanded}
                    className={cn(
                        "pointer-events-auto flex w-full items-center gap-[var(--nous-drawer-status-gap)]",
                        "border-b border-[color:var(--nous-stroke-subtle)] pb-[var(--nous-assistant-response-section-padding-top)]",
                        "font-semibold text-[var(--nous-drawer-meta-fg)]"
                    )}
                    data-cortex-fit-thinking-toggle="true"
                    data-homepage-chat-working-toggle="true"
                    onClick={() => setIsExpanded((currentValue) => !currentValue)}
                    type="button"
                >
                    {thinkingDurationLabel}
                    <DisclosureTriangle className={cn("transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", isExpanded ? "rotate-0" : "-rotate-90")} />
                </button>
                <div
                    className={cn(
                        "grid overflow-hidden transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                    data-homepage-chat-working-accordion-panel={isExpanded ? "open" : "closed"}
                >
                    <div
                        className={cn(
                            "overflow-hidden transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            isExpanded ? "translate-y-0 opacity-100 delay-75" : "-translate-y-1 opacity-0"
                        )}
                        data-homepage-chat-working-accordion-content={isExpanded ? "open" : "closed"}
                    >
                        <div className="space-y-[var(--nous-assistant-response-section-gap)] pt-[var(--nous-assistant-response-section-padding-top)]">
                            {visibleSteps.map((step, stepIndex) => (
                                <CortexWorkflowFitThinkingBlock
                                    isActive={stepIndex === activeStepIndex}
                                    key={step.key}
                                    stream={streamThinking && !isComplete && stepIndex === activeStepIndex}
                                    stepKey={step.key}
                                    text={step.text}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

function CortexWorkflowFitThinkingBlock({ isActive, stepKey, stream, text }: {
    isActive: boolean;
    stepKey: string;
    stream: boolean;
    text: string;
}) {
    return (
        <section
            className="nous-home-chat-response-line-in space-y-[var(--nous-assistant-response-paragraph-gap)]"
            data-cortex-fit-thinking-step={stepKey}
            data-cortex-fit-thinking-step-active={isActive ? "true" : "false"}
            data-homepage-chat-working-block="true"
        >
            <p data-cortex-fit-thinking-paragraph={stepKey} data-homepage-chat-working-paragraph="true">
                <CortexStreamedThinking stream={stream} stepKey={`fit-${stepKey}`} text={text} />
            </p>
        </section>
    );
}

function getWorkflowFitThinkingDurationLabel(elapsedMs: number, isComplete: boolean) {
    const durationSeconds = Math.max(0, Math.floor(elapsedMs / 1_000));

    return `${isComplete ? "Thought" : "Thinking"} for ${durationSeconds} seconds`;
}

function getWorkflowFitThinkingDurationMs() {
    return cortexWorkflowCreationScript.workflowFitThinking.steps.reduce((totalMs, step) => totalMs + step.durationMs, 0);
}

function CortexThinkingCard({ activeStepIndex, isComplete, streamThinking }: {
    activeStepIndex: number;
    isComplete: boolean;
    streamThinking: boolean;
}) {
    const [isExpanded, setIsExpanded] = useState(() => !isComplete);
    const hasAutoCollapsedRef = useRef(isComplete);
    const visibleSteps = cortexWorkflowCreationScript.steps.slice(0, activeStepIndex + 1);

    useEffect(() => {
        if (!isComplete) {
            hasAutoCollapsedRef.current = false;
            return undefined;
        }

        if (hasAutoCollapsedRef.current) {
            return undefined;
        }

        hasAutoCollapsedRef.current = true;

        const timeout = window.setTimeout(() => {
            setIsExpanded(false);
        }, cortexWorkflowCreationScript.thinkingCollapseDelayMs);

        return () => window.clearTimeout(timeout);
    }, [isComplete]);

    return (
        <article
            className="nous-home-chat-message-in flex flex-col self-stretch text-xs leading-[var(--nous-leading-drawer)] text-[var(--nous-drawer-body-fg-strong)]"
            data-cortex-thinking-card="true"
            data-homepage-chat-message="assistant"
        >
            <div
                className={cn(
                    "nous-home-chat-response-line-in",
                    !isExpanded && isComplete && "mb-[var(--nous-assistant-response-section-gap)]"
                )}
                data-homepage-chat-working-accordion={isExpanded ? "open" : "closed"}
            >
                <button
                    aria-expanded={isExpanded}
                    className={cn(
                        "pointer-events-auto flex w-full items-center gap-[var(--nous-drawer-status-gap)]",
                        "border-b border-[color:var(--nous-stroke-subtle)] pb-[var(--nous-assistant-response-section-padding-top)]",
                        "font-semibold text-[var(--nous-drawer-meta-fg)]"
                    )}
                    data-cortex-thinking-toggle="true"
                    data-homepage-chat-working-toggle="true"
                    onClick={() => setIsExpanded((currentValue) => !currentValue)}
                    type="button"
                >
                    {isComplete ? "Created workflow" : "Creating workflow"}
                    <DisclosureTriangle className={cn("transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", isExpanded ? "rotate-0" : "-rotate-90")} />
                </button>
                <div
                    className={cn(
                        "grid overflow-hidden transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                    data-homepage-chat-working-accordion-panel={isExpanded ? "open" : "closed"}
                >
                    <div
                        className={cn(
                            "overflow-hidden transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            isExpanded ? "translate-y-0 opacity-100 delay-75" : "-translate-y-1 opacity-0"
                        )}
                        data-homepage-chat-working-accordion-content={isExpanded ? "open" : "closed"}
                    >
                        <div className="space-y-[var(--nous-assistant-response-section-gap)] pt-[var(--nous-assistant-response-section-padding-top)]">
                            {visibleSteps.map((step, stepIndex) => (
                                <CortexThinkingBlock
                                    isActive={stepIndex === activeStepIndex}
                                    key={step.key}
                                    stream={streamThinking && !isComplete && stepIndex === activeStepIndex}
                                    stepKey={step.key}
                                    text={step.thinking}
                                    toolCalls={step.toolCalls}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

function CortexTypingIndicator() {
    return (
        <div
            aria-label="Nue is typing"
            className={cn(
                "nous-home-chat-message-in flex w-fit items-center gap-[var(--nous-chat-typing-dot-gap)] self-start rounded-full",
                "border border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-chat-message-bg-assistant)]",
                "px-[var(--nous-chat-typing-padding-x)] py-[var(--nous-chat-typing-padding-y)]"
            )}
            data-cortex-workflow-typing="assistant"
            data-homepage-chat-typing="assistant"
        >
            {[0, 1, 2].map((dotIndex) => (
                <span
                    aria-hidden="true"
                    className="nous-home-chat-typing-dot size-[var(--nous-chat-typing-dot-size)] rounded-full bg-[var(--nous-fg-muted)]"
                    key={dotIndex}
                    style={{ animationDelay: `${dotIndex * 120}ms` }}
                />
            ))}
        </div>
    );
}

function CortexThinkingBlock({ isActive, stepKey, stream, text, toolCalls }: {
    isActive: boolean;
    stepKey: string;
    stream: boolean;
    text: string;
    toolCalls: readonly CortexWorkflowCreationToolCall[];
}) {
    const shouldStreamThinking = isActive && stream;
    const [hasStreamedThinking, setHasStreamedThinking] = useState(() => !shouldStreamThinking);
    const [activeToolCallIndex, setActiveToolCallIndex] = useState<number | null>(() => (isActive && stream ? 0 : null));
    const [areToolCallsComplete, setAreToolCallsComplete] = useState(() => !(isActive && stream));
    const showToolCalls = !shouldStreamThinking || hasStreamedThinking;

    useEffect(() => {
        if (!shouldStreamThinking) {
            return undefined;
        }

        const timeoutId = window.setTimeout(() => {
            setHasStreamedThinking(true);
        }, getCortexThinkingStreamDurationMs(text) + cortexWorkflowCreationScript.workflowToolCallRevealDelayMs);

        return () => window.clearTimeout(timeoutId);
    }, [shouldStreamThinking, text]);

    useEffect(() => {
        if (!isActive || !stream || !showToolCalls) {
            return undefined;
        }

        const timeoutIds: number[] = [];
        let elapsedMs = 0;

        toolCalls.slice(0, -1).forEach((toolCall, index) => {
            elapsedMs += toolCall.durationMs;
            timeoutIds.push(window.setTimeout(() => {
                setActiveToolCallIndex(index + 1);
            }, elapsedMs));
        });

        const totalToolCallDurationMs = toolCalls.reduce((totalMs, toolCall) => totalMs + toolCall.durationMs, 0);

        timeoutIds.push(window.setTimeout(() => {
            setAreToolCallsComplete(true);
            setActiveToolCallIndex(null);
        }, totalToolCallDurationMs));

        return () => timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    }, [isActive, showToolCalls, stream, toolCalls]);

    const isToolCallListRunning = isActive && stream && !areToolCallsComplete;
    const resolvedActiveToolCallIndex = isToolCallListRunning ? activeToolCallIndex : null;

    return (
        <section
            className="nous-home-chat-response-line-in space-y-[var(--nous-assistant-response-paragraph-gap)]"
            data-cortex-thinking-step={stepKey}
            data-cortex-thinking-step-active={isActive ? "true" : "false"}
            data-homepage-chat-working-block="true"
        >
            <p data-cortex-thinking-paragraph={stepKey} data-homepage-chat-working-paragraph="true">
                <CortexStreamedThinking stream={stream} stepKey={stepKey} text={text} />
            </p>
            {showToolCalls ? (
                <div data-cortex-authoring-tool-calls={stepKey}>
                <HomepageChatToolCallList
                    activeToolCallIndex={resolvedActiveToolCallIndex}
                    className="w-full"
                    completedLabel={getCortexAuthoringToolCallsCompletedLabel(toolCalls)}
                    defaultOpen={false}
                    isRunning={isToolCallListRunning}
                    toolCalls={toolCalls}
                />
                </div>
            ) : null}
        </section>
    );
}

function getCortexThinkingStreamDurationMs(text: string) {
    return Math.ceil(text.length / 2) * 18;
}

function getCortexWorkflowAuthoringStepDurationMs(step: (typeof cortexWorkflowCreationScript.steps)[number]) {
    return getCortexThinkingStreamDurationMs(step.thinking)
        + cortexWorkflowCreationScript.workflowToolCallRevealDelayMs
        + step.toolCalls.reduce((totalMs, toolCall) => totalMs + toolCall.durationMs, 0)
        + cortexWorkflowCreationScript.workflowStepHoldMs;
}

function getCortexAuthoringToolCallsCompletedLabel(toolCalls: readonly CortexWorkflowCreationToolCall[]) {
    const totalDurationSeconds = Math.max(1, Math.round(toolCalls.reduce((totalMs, toolCall) => totalMs + toolCall.durationMs, 0) / 1_000));

    return `Ran ${toolCalls.length} workflow ${toolCalls.length === 1 ? "tool" : "tools"} · ${totalDurationSeconds}s`;
}

function CortexStreamedThinking({ stepKey, stream, text }: { stepKey: string; stream: boolean; text: string }) {
    const [visibleLength, setVisibleLength] = useState(() => stream ? 0 : text.length);

    useEffect(() => {
        if (!stream) {
            return undefined;
        }

        const interval = window.setInterval(() => {
            setVisibleLength((currentLength) => {
                const nextLength = Math.min(text.length, currentLength + 2);

                if (nextLength >= text.length) {
                    window.clearInterval(interval);
                }

                return nextLength;
            });
        }, 18);

        return () => window.clearInterval(interval);
    }, [stream, text]);

    return <span data-cortex-thinking-stream={stepKey}>{text.slice(0, stream ? visibleLength : text.length)}</span>;
}

function WorkflowCreationPermissionCard({ actionState, onCreateWorkflow }: { actionState: "idle" | "pressed"; onCreateWorkflow?: () => void }) {
    return (
        <ProposalCard
            actions={cortexWorkflowCreationScript.permissionPrompt.actions.map((action) => ({
                content: action === cortexWorkflowCreationScript.permissionPrompt.selectedAction ? (
                    <button
                        className={cn(
                            "cursor-pointer rounded-[var(--nous-radius-sm)] border-0 bg-transparent px-1 py-0 text-inherit transition-[box-shadow,transform,background,color] duration-200",
                            actionState === "pressed" && "-mx-1 scale-[0.98] bg-[var(--nous-task-proposal-primary-action-hover-bg)] shadow-[0_0_0_3px_var(--nous-focus-ring-soft)]"
                        )}
                        data-cortex-permission-action={action}
                        data-cortex-permission-action-state={actionState}
                        onClick={onCreateWorkflow}
                        type="button"
                    >
                        {action}
                    </button>
                ) : action,
                key: action
            }))}
            body={cortexWorkflowCreationScript.permissionPrompt.body}
            compact
            details={cortexWorkflowCreationScript.permissionPrompt.details.map(([label, value]) => ({
                content: value,
                key: label,
                label
            }))}
            detailsDefaultOpen={false}
            name={cortexWorkflowCreationScript.permissionPrompt.name}
            summaryItems={[...cortexWorkflowCreationScript.permissionPrompt.summary]}
            title={cortexWorkflowCreationScript.permissionPrompt.title}
        />
    );
}

function WorkflowCreationProposalCard() {
    return (
        <ProposalCard
            actions={cortexWorkflowCreationScript.proposalActions.map((action) => ({
                content: action,
                key: action
            }))}
            details={cortexWorkflowCreationScript.proposalDetails.map(([label, value]) => ({
                content: value,
                key: label,
                label
            }))}
            detailsDefaultOpen={false}
            name={cortexWorkflowCreationScript.proposalName}
            summaryItems={[...cortexWorkflowCreationScript.proposalSummary]}
            title={cortexWorkflowCreationScript.proposalTitle}
        />
    );
}

function CompanionComposer({ isSendReady, placeholder, showCaret, value }: {
    isSendReady: boolean;
    placeholder: string;
    showCaret: boolean;
    value: string;
}) {
    return (
        <CommandComposer
            caretClassName="nous-home-chat-caret"
            contentClassName="content-start"
            contentProps={{
                "data-cortex-workflow-composer-value": value,
                "data-homepage-chat-composer-mode": "compact",
                "data-homepage-chat-composer-value": value
            }}
            hasValue={Boolean(value)}
            leadingActions={<HomepageChatComposerLeadingActions />}
            leadingActionsClassName="gap-[var(--nous-drawer-command-actions-gap)]"
            placeholder={placeholder}
            showCaret={showCaret}
            trailingActions={<HomepageChatComposerTrailingActions isSendReady={isSendReady} sendLabel="Send Cortex workflow message" />}
            trailingActionsClassName="gap-[var(--nous-composer-toolbar-action-gap)]"
            value={value}
            valueProps={{ "data-homepage-chat-composer-content": "true" }}
            variant="compact"
        />
    );
}
