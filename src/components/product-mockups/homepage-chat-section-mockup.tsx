"use client";

import Image from "next/image";
import { History } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, MouseEvent, ReactNode, UIEvent, WheelEvent } from "react";

import { DisclosureTriangle, Glyph } from "@/components/design-system/mockup/components";
import type { GlyphName } from "@/components/design-system/mockup/components";
import { PrimaryCtaButton } from "@/components/marketing/primary-cta-link";
import { CommandComposer as ConversationCommandComposer, HomepageChatTaskProposalCard, HomepageChatToolCallList, MessageBubble } from "@/components/mockups/conversation";
import { AmbientSurface } from "@/components/mockups/surface";
import { HomepageChatComposerLeadingActions, HomepageChatComposerTrailingActions } from "@/components/product-mockups/homepage-chat-composer-buttons";
import { productMockupFrameHeightClassName } from "@/components/product-mockups/product-mockup-shell";
import { cn } from "@/lib/cn";

const primaryNavItems: Array<{ icon: GlyphName; label: string }> = [
    { icon: "inbox", label: "Inbox" },
    { icon: "pulse", label: "Pulse" }
];

const projectItems: Array<{ icon: GlyphName; label: string }> = [
    { icon: "database", label: "Coaching" },
    { icon: "assetChat", label: "Travel" }
];

export const homepageChatStoryboardScript = {
    assistantResponse: {
        accordionTitle: "Reviewing your subscriptions",
        finalBody: "I found 8 recurring charges that look like subscriptions. I checked where this should live and don’t see a finance project yet, so I’d create a Finances project, move this thread there, and build a quarterly subscription review task inside it. Each run will confirm what’s essential, flag anything you don’t recognize, then draft cancellation, downgrade, or reminder steps for approval. I won’t make any changes until you approve a specific action.",
        finalLead: "",
        finalProposalDetails: [
            { label: "Project", value: "Create Finances and move this thread there" },
            { label: "Schedule", value: "Run every quarter" },
            { label: "Tools", value: "Bank account + Email, read-only" },
            { label: "Approval", value: "Ask before cancellations, downgrades, reminders, or changes" }
        ],
        finalProposalName: "Quarterly subscription review",
        finalSuggestedActions: ["Approve setup", "Discuss more", "Not now"],
        finalSuggestedActionsTitle: "Task proposal",
        firstPass: "The right next step is setup, not an immediate run. If you approve it, I’ll create the Finances project first, move this thread into it, and build the quarterly task there before asking whether to run the first review.",
        initialThinking: "I’ll trace the billing evidence instead of guessing from app names. Subscriptions can show up under payment processors or alternate merchant names, so I’m going to compare recurring bank charges with receipt and renewal emails before I propose anything.",
        postToolThinking: "Found it: there are 8 recurring candidates. The reliable matches have both a repeated charge and receipt evidence; GreenCart is weaker because it looks recurring in the bank feed but only has a renewal notice, so I’m marking it for confirmation.",
        results: [
            ["StreamBox", "$18.99", "Entertainment", "Review", "High"],
            ["CloudVault", "$9.99", "Storage", "Confirm essential", "High"],
            ["FitClub", "$29.00", "Fitness", "Check usage", "Medium"],
            ["DesignPro", "$12.00", "Creative tools", "Review", "High"],
            ["MusicBox", "$10.99", "Entertainment", "Review", "High"],
            ["NewsDaily", "$6.00", "News", "Confirm essential", "High"],
            ["Languagely", "$15.00", "Learning", "Check usage", "Medium"],
            ["GreenCart", "$7.99", "Shopping", "Needs confirmation", "Low"]
        ],
        resultsSummary: "I’m putting the evidence into an inspectable table before turning it into a task.",
        resultsTableTitle: "Likely recurring subscriptions",
        steps: ["working", "approach", "tool-calls", "results", "validation", "project-tool-calls", "project-decision", "first-pass", "closed", "final"],
        thinkingCollapseDelayMs: 1000,
        toolCalls: [
            {
                action: "Checking bank statements",
                call: "bank.findRecurringCharges",
                duration: "0.9s",
                durationMs: 900,
                operation: "Read",
                result: "Found 8 recurring charges across checking and credit accounts.",
                service: "Bank account"
            },
            {
                action: "Checking email receipts",
                call: "email.matchReceipts",
                duration: "0.6s",
                durationMs: 600,
                operation: "Read",
                result: "Matched 6 receipts and 1 renewal notice.",
                service: "Email"
            }
        ],
        toolCallsCompletedLabel: "Ran 2 tools · 1.5s",
        toolCallsIntro: "First I’ll pull the recurring-charge list, then cross-check receipts so the table is evidence-backed.",
        toolCallsRunningDelayMs: 1500,
        projectDecision: "There isn’t a finance project yet. I’ll propose creating Finances, move this thread there, and store the quarterly subscription review task inside that project so the task has durable context, permissions, and run history.",
        projectToolCalls: [
            {
                action: "Finding project home",
                call: "projectManager.findTaskHome",
                duration: "0.5s",
                durationMs: 500,
                operation: "Read",
                result: "No finance, billing, subscriptions, or household-admin project found. Propose creating Finances.",
                service: "Project manager"
            }
        ],
        projectToolCallsCompletedLabel: "Ran 1 tool · 0.5s",
        projectToolCallsIntro: "Before I ask to build a repeatable task, I need to know where it belongs. I’ll check existing projects for finances, billing, subscriptions, or household admin.",
        projectToolCallsRunningDelayMs: 500,
        validation: "Now I’m turning that evidence into a review plan, not a verdict: confirm what’s essential, inspect overlapping categories, check usage where billing exists but intent is unclear, and leave low-confidence matches as questions.",
        thinkingStatus: "Worked for 8s"
    },
    autoResponseDelayMs: 5000,
    responseAfterThinkingDelayMs: 980,
    responseStreamIntervalMs: 12,
    sidebarThreadTypingIntervalMs: 24,
    transcriptScrollOverrideDebounceMs: 1800,
    transcriptScrollOverrideThresholdPx: 32,
    responseStepDelayMs: 700,
    threadTitle: "Lower monthly bills",
    typingIntervalMs: 18,
    userMessage: "I need to lower my monthly bills. Can you find subscriptions I should review?"
} as const;

const homepageChatThinkingStreamTexts = [
    homepageChatStoryboardScript.assistantResponse.initialThinking,
    homepageChatStoryboardScript.assistantResponse.toolCallsIntro,
    homepageChatStoryboardScript.assistantResponse.postToolThinking,
    homepageChatStoryboardScript.assistantResponse.resultsSummary,
    homepageChatStoryboardScript.assistantResponse.validation,
    homepageChatStoryboardScript.assistantResponse.projectToolCallsIntro,
    homepageChatStoryboardScript.assistantResponse.projectDecision,
    homepageChatStoryboardScript.assistantResponse.firstPass
];

const homepageChatFinalStreamTexts = [
    homepageChatStoryboardScript.assistantResponse.finalLead,
    homepageChatStoryboardScript.assistantResponse.finalBody,
    homepageChatStoryboardScript.assistantResponse.finalSuggestedActionsTitle,
    homepageChatStoryboardScript.assistantResponse.finalProposalName,
    ...homepageChatStoryboardScript.assistantResponse.finalProposalDetails.map(({ value }) => value),
    ...homepageChatStoryboardScript.assistantResponse.finalSuggestedActions
];

const homepageChatThinkingStreamTextLength = homepageChatThinkingStreamTexts.reduce((totalLength, text) => totalLength + text.length, 0);
const homepageChatResponseStreamTextLength = [...homepageChatThinkingStreamTexts, ...homepageChatFinalStreamTexts].reduce((totalLength, text) => totalLength + text.length, 0);
const homepageChatClosedStepCount = homepageChatStoryboardScript.assistantResponse.steps.indexOf("closed") + 1;
const homepageChatFinalStepCount = homepageChatStoryboardScript.assistantResponse.steps.indexOf("final") + 1;
const homepageChatApproachStreamTextLength = [
    homepageChatStoryboardScript.assistantResponse.initialThinking
].reduce((totalLength, text) => totalLength + text.length, 0);
const homepageChatToolCallsStreamTextLength = [
    homepageChatStoryboardScript.assistantResponse.initialThinking,
    homepageChatStoryboardScript.assistantResponse.toolCallsIntro
].reduce((totalLength, text) => totalLength + text.length, 0);
const homepageChatResultsStreamTextLength = [
    ...homepageChatThinkingStreamTexts.slice(0, 4)
].reduce((totalLength, text) => totalLength + text.length, 0);
const homepageChatValidationStreamTextLength = [
    ...homepageChatThinkingStreamTexts.slice(0, 5)
].reduce((totalLength, text) => totalLength + text.length, 0);
const homepageChatProjectToolCallsStreamTextLength = [
    ...homepageChatThinkingStreamTexts.slice(0, 6)
].reduce((totalLength, text) => totalLength + text.length, 0);
const homepageChatProjectDecisionStreamTextLength = [
    ...homepageChatThinkingStreamTexts.slice(0, 7)
].reduce((totalLength, text) => totalLength + text.length, 0);

function getHomepageChatResponseStreamLimit(visibleResponseStepCount: number, areToolCallsComplete: boolean, areProjectToolCallsComplete: boolean) {
    if (visibleResponseStepCount < 2) {
        return 0;
    }

    if (visibleResponseStepCount < 3) {
        return homepageChatApproachStreamTextLength;
    }

    if (visibleResponseStepCount < 4 || !areToolCallsComplete) {
        return homepageChatToolCallsStreamTextLength;
    }

    if (visibleResponseStepCount < 5) {
        return homepageChatResultsStreamTextLength;
    }

    if (visibleResponseStepCount < 6) {
        return homepageChatValidationStreamTextLength;
    }

    if (visibleResponseStepCount < 7 || !areProjectToolCallsComplete) {
        return homepageChatProjectToolCallsStreamTextLength;
    }

    if (visibleResponseStepCount < 8) {
        return homepageChatProjectDecisionStreamTextLength;
    }

    if (visibleResponseStepCount < homepageChatFinalStepCount) {
        return homepageChatThinkingStreamTextLength;
    }

    return homepageChatResponseStreamTextLength;
}

type SequentialStreamTextSegment = {
    fullText: string;
    streamedText: string;
};

function getSequentialStreamTextSegments(texts: readonly string[], responseStreamLength: number) {
    return texts.reduce<{ offset: number; segments: SequentialStreamTextSegment[] }>(
        (state, text) => {
            const visibleLength = Math.max(0, Math.min(responseStreamLength - state.offset, text.length));

            return {
                offset: state.offset + text.length,
                segments: [
                    ...state.segments,
                    {
                        fullText: text,
                        streamedText: text.slice(0, visibleLength)
                    }
                ]
            };
        },
        { offset: 0, segments: [] }
    ).segments;
}

export type HomepageChatMockupState = "focus" | "unfocused";

export type HomepageChatMockupMode = "storyboard" | "static";

type HomepageChatStoryboardStage = "typing" | "ready" | "responding" | "complete";

type SidebarThread = {
    id: string;
    isStreaming: boolean;
    title: string;
};

type HomepageChatSectionMockupProps = {
    greeting?: string;
    mode?: HomepageChatMockupMode;
    prompt?: string;
};

export function HomepageChatSectionMockup({
    greeting = "Good morning, Andrew",
    mode = "storyboard",
    prompt = "How can I help you today?"
}: HomepageChatSectionMockupProps) {
    const isStaticMode = mode === "static";
    const mockupRef = useRef<HTMLElement | null>(null);
    const [hasEnteredView, setHasEnteredView] = useState(() => isStaticMode || (typeof window !== "undefined" && typeof window.IntersectionObserver !== "function"));
    const [storyboardStage, setStoryboardStage] = useState<HomepageChatStoryboardStage>(() => isStaticMode ? "complete" : "typing");
    const [typedMessageLength, setTypedMessageLength] = useState(() => isStaticMode ? homepageChatStoryboardScript.userMessage.length : 0);
    const [responseStreamLength, setResponseStreamLength] = useState(() => isStaticMode ? homepageChatResponseStreamTextLength : 0);
    const [visibleResponseStepCount, setVisibleResponseStepCount] = useState(() => isStaticMode ? homepageChatStoryboardScript.assistantResponse.steps.length : 0);
    const [isWorkingAccordionExpanded, setIsWorkingAccordionExpanded] = useState(() => !isStaticMode);
    const [areToolCallsComplete, setAreToolCallsComplete] = useState(isStaticMode);
    const [activeToolCallIndex, setActiveToolCallIndex] = useState<number | null>(null);
    const [areProjectToolCallsComplete, setAreProjectToolCallsComplete] = useState(isStaticMode);
    const [activeProjectToolCallIndex, setActiveProjectToolCallIndex] = useState<number | null>(null);
    const [sidebarThreadTitleLength, setSidebarThreadTitleLength] = useState(() => isStaticMode ? homepageChatStoryboardScript.threadTitle.length : 0);
    const responseStreamLengthRef = useRef(responseStreamLength);
    const resolvedChatState: HomepageChatMockupState = "focus";
    const resolvedSidebarState: HomepageChatMockupState = "unfocused";
    const typedMessage = homepageChatStoryboardScript.userMessage.slice(0, typedMessageLength);
    const hasSubmittedMessage = storyboardStage === "responding" || storyboardStage === "complete";
    const showResponseTyping = storyboardStage === "responding" && visibleResponseStepCount === 0;
    const sidebarThreadTitle = homepageChatStoryboardScript.threadTitle.slice(0, sidebarThreadTitleLength);
    const sidebarThreads: SidebarThread[] = hasSubmittedMessage ? [
        {
            id: "subscription-cleanup-thread",
            isStreaming: sidebarThreadTitleLength < homepageChatStoryboardScript.threadTitle.length,
            title: sidebarThreadTitle
        }
    ] : [];

    useEffect(() => {
        responseStreamLengthRef.current = responseStreamLength;
    }, [responseStreamLength]);

    useEffect(() => {
        if (isStaticMode) {
            return;
        }

        const mockupElement = mockupRef.current;

        if (!mockupElement) {
            return;
        }

        if (typeof window.IntersectionObserver !== "function") {
            return;
        }

        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) {
                    return;
                }

                setHasEnteredView(true);
                observer.disconnect();
            },
            { threshold: 0.24 }
        );

        observer.observe(mockupElement);

        return () => observer.disconnect();
    }, [isStaticMode]);

    const restartStoryboard = () => {
        setStoryboardStage("typing");
        setTypedMessageLength(0);
        setResponseStreamLength(0);
        setVisibleResponseStepCount(0);
        setIsWorkingAccordionExpanded(true);
        setAreToolCallsComplete(false);
        setActiveToolCallIndex(null);
        setAreProjectToolCallsComplete(false);
        setActiveProjectToolCallIndex(null);
        setSidebarThreadTitleLength(0);
    };

    useEffect(() => {
        if (isStaticMode) {
            return;
        }

        if (!hasEnteredView) {
            return;
        }

        if (!hasSubmittedMessage) {
            return;
        }

        if (sidebarThreadTitleLength >= homepageChatStoryboardScript.threadTitle.length) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setSidebarThreadTitleLength((currentLength) => Math.min(currentLength + 1, homepageChatStoryboardScript.threadTitle.length));
        }, homepageChatStoryboardScript.sidebarThreadTypingIntervalMs);

        return () => window.clearTimeout(timeoutId);
    }, [hasEnteredView, hasSubmittedMessage, isStaticMode, sidebarThreadTitleLength]);

    useEffect(() => {
        if (isStaticMode) {
            return;
        }

        if (!hasEnteredView) {
            return;
        }

        if (storyboardStage !== "typing") {
            return;
        }

        if (typedMessageLength >= homepageChatStoryboardScript.userMessage.length) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            const nextLength = Math.min(typedMessageLength + 1, homepageChatStoryboardScript.userMessage.length);

            setTypedMessageLength(nextLength);

            if (nextLength >= homepageChatStoryboardScript.userMessage.length) {
                setStoryboardStage("ready");
            }
        }, homepageChatStoryboardScript.typingIntervalMs);

        return () => window.clearTimeout(timeoutId);
    }, [hasEnteredView, isStaticMode, storyboardStage, typedMessageLength]);

    useEffect(() => {
        if (isStaticMode) {
            return;
        }

        if (!hasEnteredView) {
            return;
        }

        if (storyboardStage !== "ready") {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setResponseStreamLength(0);
            setVisibleResponseStepCount(0);
            setIsWorkingAccordionExpanded(true);
            setAreToolCallsComplete(false);
            setActiveToolCallIndex(null);
            setAreProjectToolCallsComplete(false);
            setActiveProjectToolCallIndex(null);
            setSidebarThreadTitleLength(0);
            setStoryboardStage("responding");
        }, homepageChatStoryboardScript.autoResponseDelayMs);

        return () => window.clearTimeout(timeoutId);
    }, [hasEnteredView, isStaticMode, storyboardStage]);

    useEffect(() => {
        if (isStaticMode) {
            return;
        }

        if (!hasEnteredView) {
            return;
        }

        if (storyboardStage !== "responding") {
            return;
        }

        if (visibleResponseStepCount >= homepageChatStoryboardScript.assistantResponse.steps.length) {
            return;
        }

        const nextStoryboardStep = homepageChatStoryboardScript.assistantResponse.steps[visibleResponseStepCount];
        const currentResponseStreamLimit = getHomepageChatResponseStreamLimit(visibleResponseStepCount, areToolCallsComplete, areProjectToolCallsComplete);
        const remainingCurrentStreamDelayMs = Math.max(0, currentResponseStreamLimit - responseStreamLengthRef.current) * homepageChatStoryboardScript.responseStreamIntervalMs;

        if (nextStoryboardStep === "results" && !areToolCallsComplete) {
            return;
        }

        if (nextStoryboardStep === "project-decision" && !areProjectToolCallsComplete) {
            return;
        }

        let nextStepDelay: number = remainingCurrentStreamDelayMs + homepageChatStoryboardScript.responseStepDelayMs;

        if (nextStoryboardStep === "closed") {
            nextStepDelay = remainingCurrentStreamDelayMs + homepageChatStoryboardScript.assistantResponse.thinkingCollapseDelayMs;
        } else if (visibleResponseStepCount >= homepageChatClosedStepCount) {
            nextStepDelay = homepageChatStoryboardScript.responseAfterThinkingDelayMs;
        }

        const timeoutId = window.setTimeout(() => {
            const nextCount = Math.min(visibleResponseStepCount + 1, homepageChatStoryboardScript.assistantResponse.steps.length);

            setVisibleResponseStepCount(nextCount);

            if (nextCount >= homepageChatClosedStepCount) {
                setIsWorkingAccordionExpanded(false);
            }

            if (nextCount >= homepageChatFinalStepCount) {
                setResponseStreamLength((currentLength) => Math.max(currentLength, homepageChatThinkingStreamTextLength + 1));
            }

            if (nextCount >= homepageChatStoryboardScript.assistantResponse.steps.length) {
                setStoryboardStage("complete");
            }
        }, nextStepDelay);

        return () => window.clearTimeout(timeoutId);
    }, [areProjectToolCallsComplete, areToolCallsComplete, hasEnteredView, isStaticMode, storyboardStage, visibleResponseStepCount]);

    useEffect(() => {
        if (isStaticMode) {
            return;
        }

        if (!hasEnteredView) {
            return;
        }

        if (storyboardStage !== "responding") {
            return;
        }

        if (areToolCallsComplete) {
            return;
        }

        if (visibleResponseStepCount < 3) {
            return;
        }

        if (responseStreamLength < homepageChatToolCallsStreamTextLength) {
            return;
        }

        const timeoutIds: number[] = [];
        let elapsedMs = 0;

        homepageChatStoryboardScript.assistantResponse.toolCalls.slice(0, -1).forEach((toolCall, index) => {
            elapsedMs += toolCall.durationMs;
            timeoutIds.push(window.setTimeout(() => {
                setActiveToolCallIndex(index + 1);
            }, elapsedMs));
        });

        timeoutIds.push(window.setTimeout(() => {
            setAreToolCallsComplete(true);
            setActiveToolCallIndex(null);
        }, homepageChatStoryboardScript.assistantResponse.toolCallsRunningDelayMs));

        return () => timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    }, [areToolCallsComplete, hasEnteredView, isStaticMode, responseStreamLength, storyboardStage, visibleResponseStepCount]);

    useEffect(() => {
        if (isStaticMode) {
            return;
        }

        if (!hasEnteredView) {
            return;
        }

        if (storyboardStage !== "responding") {
            return;
        }

        if (areProjectToolCallsComplete) {
            return;
        }

        if (visibleResponseStepCount < 6) {
            return;
        }

        if (responseStreamLength < homepageChatProjectToolCallsStreamTextLength) {
            return;
        }

        const timeoutIds: number[] = [];
        let elapsedMs = 0;

        homepageChatStoryboardScript.assistantResponse.projectToolCalls.slice(0, -1).forEach((toolCall, index) => {
            elapsedMs += toolCall.durationMs;
            timeoutIds.push(window.setTimeout(() => {
                setActiveProjectToolCallIndex(index + 1);
            }, elapsedMs));
        });

        timeoutIds.push(window.setTimeout(() => {
            setAreProjectToolCallsComplete(true);
            setActiveProjectToolCallIndex(null);
        }, homepageChatStoryboardScript.assistantResponse.projectToolCallsRunningDelayMs));

        return () => timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    }, [areProjectToolCallsComplete, hasEnteredView, isStaticMode, responseStreamLength, storyboardStage, visibleResponseStepCount]);

    useEffect(() => {
        if (isStaticMode) {
            return;
        }

        if (!hasEnteredView) {
            return;
        }

        if (storyboardStage !== "responding" && storyboardStage !== "complete") {
            return;
        }

        if (responseStreamLength >= homepageChatResponseStreamTextLength) {
            return;
        }

        const activeResponseStreamLimit = getHomepageChatResponseStreamLimit(visibleResponseStepCount, areToolCallsComplete, areProjectToolCallsComplete);

        if (responseStreamLength >= activeResponseStreamLimit) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setResponseStreamLength((currentLength) => Math.min(currentLength + 1, activeResponseStreamLimit));
        }, homepageChatStoryboardScript.responseStreamIntervalMs);

        return () => window.clearTimeout(timeoutId);
    }, [areProjectToolCallsComplete, areToolCallsComplete, hasEnteredView, isStaticMode, responseStreamLength, storyboardStage, visibleResponseStepCount]);

    const handleSendClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        if (isStaticMode) {
            return;
        }

        if (storyboardStage !== "ready") {
            return;
        }

        setResponseStreamLength(0);
        setVisibleResponseStepCount(0);
        setIsWorkingAccordionExpanded(true);
        setAreToolCallsComplete(false);
        setActiveToolCallIndex(null);
        setAreProjectToolCallsComplete(false);
        setActiveProjectToolCallIndex(null);
        setSidebarThreadTitleLength(0);
        setStoryboardStage("responding");
    };

    const handleSendKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        event.stopPropagation();
    };

    const handleWorkingAccordionToggle = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsWorkingAccordionExpanded((currentValue) => !currentValue);
    };

    return (
        <article
            aria-label="Homepage chat visual mockup"
            className={cn(
                "relative space-y-3",
            )}
            data-homepage-chat-mode={mode}
            ref={mockupRef}
        >
            {isStaticMode ? null : (
                <div className="flex justify-end">
                    <PrimaryCtaButton
                        aria-label="Restart conversation animation"
                        className="-mb-2"
                        onClick={restartStoryboard}
                        style={{ "--nous-primary-cta-size": "0.625rem" } as CSSProperties}
                    >
                        <History aria-hidden="true" className="size-3" strokeWidth={1.8} />
                    </PrimaryCtaButton>
                </div>
            )}
            <div
                className={cn(
                    "relative mx-auto",
                    productMockupFrameHeightClassName
                )}
            >
                <div
                    className="absolute inset-0"
                    data-homepage-chat-area="chat"
                    data-state={resolvedChatState}
                >
                    <ChatCanvasFrame
                        greeting={greeting}
                        areToolCallsComplete={areToolCallsComplete}
                        activeToolCallIndex={activeToolCallIndex}
                        areProjectToolCallsComplete={areProjectToolCallsComplete}
                        activeProjectToolCallIndex={activeProjectToolCallIndex}
                        hasSubmittedMessage={hasSubmittedMessage}
                        isWorkingAccordionExpanded={isWorkingAccordionExpanded}
                        onSend={handleSendClick}
                        onSendKeyDown={handleSendKeyDown}
                        onWorkingAccordionToggle={handleWorkingAccordionToggle}
                        prompt={prompt}
                        responseStreamLength={responseStreamLength}
                        showResponseTyping={showResponseTyping}
                        state={resolvedChatState}
                        storyboardStage={storyboardStage}
                        typedMessage={typedMessage}
                        visibleResponseStepCount={visibleResponseStepCount}
                    />
                </div>
                <div
                    className={cn(
                        "pointer-events-none absolute inset-0 z-10"
                    )}
                    data-homepage-chat-area="sidebar"
                    data-state={resolvedSidebarState}
                >
                    <AgentSidebar state={resolvedSidebarState} threads={sidebarThreads} />
                </div>
            </div>
        </article>
    );
}

function ChatCanvasFrame({
    areToolCallsComplete,
    activeToolCallIndex,
    areProjectToolCallsComplete,
    activeProjectToolCallIndex,
    greeting,
    hasSubmittedMessage,
    isWorkingAccordionExpanded,
    onSend,
    onSendKeyDown,
    onWorkingAccordionToggle,
    prompt,
    responseStreamLength,
    showResponseTyping,
    state,
    storyboardStage,
    typedMessage,
    visibleResponseStepCount
}: {
    areToolCallsComplete: boolean;
    activeToolCallIndex: number | null;
    areProjectToolCallsComplete: boolean;
    activeProjectToolCallIndex: number | null;
    greeting: string;
    hasSubmittedMessage: boolean;
    isWorkingAccordionExpanded: boolean;
    onSend: (event: MouseEvent<HTMLButtonElement>) => void;
    onSendKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
    onWorkingAccordionToggle: (event: MouseEvent<HTMLButtonElement>) => void;
    prompt: string;
    responseStreamLength: number;
    showResponseTyping: boolean;
    state: HomepageChatMockupState;
    storyboardStage: HomepageChatStoryboardStage;
    typedMessage: string;
    visibleResponseStepCount: number;
}) {
    return (
        <div
            className={cn(
                "absolute bottom-[.5rem] left-[var(--nous-home-chat-canvas-left)] right-0 top-[1rem]",
                "rounded-[14px]"
            )}
        >
            <ChatCanvas
                areToolCallsComplete={areToolCallsComplete}
                activeToolCallIndex={activeToolCallIndex}
                areProjectToolCallsComplete={areProjectToolCallsComplete}
                activeProjectToolCallIndex={activeProjectToolCallIndex}
                greeting={greeting}
                hasSubmittedMessage={hasSubmittedMessage}
                isWorkingAccordionExpanded={isWorkingAccordionExpanded}
                onSend={onSend}
                onSendKeyDown={onSendKeyDown}
                onWorkingAccordionToggle={onWorkingAccordionToggle}
                prompt={prompt}
                responseStreamLength={responseStreamLength}
                showResponseTyping={showResponseTyping}
                state={state}
                storyboardStage={storyboardStage}
                typedMessage={typedMessage}
                visibleResponseStepCount={visibleResponseStepCount}
            />
        </div>
    );
}

function ChatCanvas({
    areToolCallsComplete,
    activeToolCallIndex,
    areProjectToolCallsComplete,
    activeProjectToolCallIndex,
    greeting,
    hasSubmittedMessage,
    isWorkingAccordionExpanded,
    onSend,
    onSendKeyDown,
    onWorkingAccordionToggle,
    prompt,
    responseStreamLength,
    showResponseTyping,
    state,
    storyboardStage,
    typedMessage,
    visibleResponseStepCount
}: {
    areToolCallsComplete: boolean;
    activeToolCallIndex: number | null;
    areProjectToolCallsComplete: boolean;
    activeProjectToolCallIndex: number | null;
    greeting: string;
    hasSubmittedMessage: boolean;
    isWorkingAccordionExpanded: boolean;
    onSend: (event: MouseEvent<HTMLButtonElement>) => void;
    onSendKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
    onWorkingAccordionToggle: (event: MouseEvent<HTMLButtonElement>) => void;
    prompt: string;
    responseStreamLength: number;
    showResponseTyping: boolean;
    state: HomepageChatMockupState;
    storyboardStage: HomepageChatStoryboardStage;
    typedMessage: string;
    visibleResponseStepCount: number;
}) {
    const canvasLayers = [
        {
            className: "[background:var(--nous-chat-canvas-radial-bg)]",
            "data-homepage-chat-canvas-radial": "true"
        },
        ...(state === "unfocused" ? [
            {
                className: "[background-image:var(--nous-home-chat-canvas-highlight-bg)]",
                "data-homepage-chat-canvas-highlight": "true"
            }
        ] : [])
    ];

    return (
        <AmbientSurface
            ariaLabel="Chat welcome panel"
            as="section"
            className={cn(
                "relative h-full overflow-hidden",
                "rounded-[var(--nous-home-chat-canvas-radius)]",
                "border border-[color:var(--nous-stroke-default)]",
                "[background:var(--nous-chat-canvas-bg)] [background-size:var(--nous-home-chat-canvas-bg-size)]",
                "shadow-[inset_0_1px_0_var(--nous-stroke-ghost)]"
            )}
            contentClassName={cn(
                "flex h-full flex-col items-center",
                "px-[var(--nous-home-chat-canvas-content-padding-x)] pt-[var(--nous-home-chat-greeting-padding-top)]"
            )}
            contentProps={{ "data-homepage-chat-storyboard-stage": storyboardStage }}
            layers={canvasLayers}
        >
            <h3
                className={cn(
                    "text-[length:var(--nous-home-chat-greeting-font-size)] leading-none tracking-[var(--nous-home-chat-greeting-letter-spacing)]",
                    "text-[var(--nous-fg-white)]",
                    "[font-weight:var(--nous-home-chat-greeting-font-weight)]",
                    "transition-[opacity,transform] duration-500 ease-out",
                    hasSubmittedMessage && "-translate-y-3 opacity-0"
                )}
            >
                {greeting}
            </h3>
            <ChatTranscript
                areToolCallsComplete={areToolCallsComplete}
                activeToolCallIndex={activeToolCallIndex}
                areProjectToolCallsComplete={areProjectToolCallsComplete}
                activeProjectToolCallIndex={activeProjectToolCallIndex}
                hasSubmittedMessage={hasSubmittedMessage}
                isWorkingAccordionExpanded={isWorkingAccordionExpanded}
                onWorkingAccordionToggle={onWorkingAccordionToggle}
                responseStreamLength={responseStreamLength}
                showResponseTyping={showResponseTyping}
                visibleResponseStepCount={visibleResponseStepCount}
            />
            <div
                className={cn(
                    hasSubmittedMessage ? "w-[var(--nous-home-chat-composer-active-width)]" : "w-[var(--nous-home-chat-composer-width)]",
                    "transition-[margin,transform] duration-500 ease-out",
                    hasSubmittedMessage
                        ? "mb-[var(--nous-home-chat-composer-active-margin-bottom)] mt-auto translate-y-0"
                        : "mt-[var(--nous-home-chat-composer-margin-top)]"
                )}
                data-homepage-chat-composer-shell={hasSubmittedMessage ? "compact" : "hero"}
            >
                <HomepageChatCommandComposer
                    isCompact={hasSubmittedMessage}
                    isSendReady={storyboardStage === "ready"}
                    onSend={onSend}
                    onSendKeyDown={onSendKeyDown}
                    prompt={prompt}
                    showCaret={storyboardStage === "typing"}
                    value={hasSubmittedMessage ? "" : typedMessage}
                />
            </div>
        </AmbientSurface>
    );
}

function ChatTranscript({
    areToolCallsComplete,
    activeToolCallIndex,
    areProjectToolCallsComplete,
    activeProjectToolCallIndex,
    hasSubmittedMessage,
    isWorkingAccordionExpanded,
    onWorkingAccordionToggle,
    responseStreamLength,
    showResponseTyping,
    visibleResponseStepCount
}: {
    areToolCallsComplete: boolean;
    activeToolCallIndex: number | null;
    areProjectToolCallsComplete: boolean;
    activeProjectToolCallIndex: number | null;
    hasSubmittedMessage: boolean;
    isWorkingAccordionExpanded: boolean;
    onWorkingAccordionToggle: (event: MouseEvent<HTMLButtonElement>) => void;
    responseStreamLength: number;
    showResponseTyping: boolean;
    visibleResponseStepCount: number;
}) {
    const transcriptViewportRef = useRef<HTMLDivElement | null>(null);
    const programmaticScrollRef = useRef(false);
    const scrollOverrideTimeoutRef = useRef<number | null>(null);
    const [isScrollOverrideActive, setIsScrollOverrideActive] = useState(false);
    const messageCount = (hasSubmittedMessage ? 1 : 0) + (visibleResponseStepCount > 0 ? 1 : 0);

    const isNearTranscriptBottom = (transcriptViewport: HTMLDivElement) => {
        const distanceFromBottom = transcriptViewport.scrollHeight - transcriptViewport.clientHeight - transcriptViewport.scrollTop;

        return distanceFromBottom <= homepageChatStoryboardScript.transcriptScrollOverrideThresholdPx;
    };

    const clearScrollOverrideDebounce = () => {
        if (scrollOverrideTimeoutRef.current === null) {
            return;
        }

        window.clearTimeout(scrollOverrideTimeoutRef.current);
        scrollOverrideTimeoutRef.current = null;
    };

    const startScrollOverrideDebounce = () => {
        clearScrollOverrideDebounce();

        scrollOverrideTimeoutRef.current = window.setTimeout(() => {
            const transcriptViewport = transcriptViewportRef.current;

            if (transcriptViewport && isNearTranscriptBottom(transcriptViewport)) {
                setIsScrollOverrideActive(false);
            }

            scrollOverrideTimeoutRef.current = null;
        }, homepageChatStoryboardScript.transcriptScrollOverrideDebounceMs);
    };

    const handleTranscriptScrollOverride = () => {
        if (programmaticScrollRef.current) {
            return;
        }

        const transcriptViewport = transcriptViewportRef.current;

        if (!transcriptViewport) {
            return;
        }

        if (isNearTranscriptBottom(transcriptViewport)) {
            clearScrollOverrideDebounce();
            setIsScrollOverrideActive(false);
            return;
        }

        setIsScrollOverrideActive(true);
        startScrollOverrideDebounce();
    };

    const handleTranscriptScroll = (event: UIEvent<HTMLDivElement>) => {
        event.stopPropagation();
        handleTranscriptScrollOverride();
    };

    const handleTranscriptWheel = (event: WheelEvent<HTMLDivElement>) => {
        event.stopPropagation();

        if (event.deltaY < 0) {
            setIsScrollOverrideActive(true);
            startScrollOverrideDebounce();
        }
    };

    useEffect(() => () => {
        if (scrollOverrideTimeoutRef.current !== null) {
            window.clearTimeout(scrollOverrideTimeoutRef.current);
        }
    }, []);

    useEffect(() => {
        if (!hasSubmittedMessage) {
            return;
        }

        if (isScrollOverrideActive) {
            return;
        }

        const isThinkingClosingBeforeFinalAnswer = visibleResponseStepCount === homepageChatClosedStepCount && !isWorkingAccordionExpanded;

        if (isThinkingClosingBeforeFinalAnswer) {
            return;
        }

        const transcriptViewport = transcriptViewportRef.current;

        if (!transcriptViewport) {
            return;
        }

        programmaticScrollRef.current = true;
        transcriptViewport.scrollTop = transcriptViewport.scrollHeight;

        const timeoutId = window.setTimeout(() => {
            programmaticScrollRef.current = false;
        }, 0);

        return () => window.clearTimeout(timeoutId);
    }, [hasSubmittedMessage, isScrollOverrideActive, isWorkingAccordionExpanded, responseStreamLength, visibleResponseStepCount]);

    return (
        <div
            aria-label={`Chat transcript, ${messageCount} messages`}
            className={cn(
                "nous-mobile-scrollbar pointer-events-auto absolute bottom-[var(--nous-home-chat-transcript-bottom)] top-[var(--nous-home-chat-transcript-top)] -translate-x-1/2 overflow-y-auto overscroll-contain"
            )}
            data-homepage-chat-message-count={messageCount}
            data-homepage-chat-response-stream-length={responseStreamLength}
            data-homepage-chat-scroll-override={isScrollOverrideActive ? "active" : "idle"}
            data-homepage-chat-transcript="true"
            data-homepage-chat-visible-response-step-count={visibleResponseStepCount}
            onClick={(event) => event.stopPropagation()}
            onScroll={handleTranscriptScroll}
            onWheel={handleTranscriptWheel}
            ref={transcriptViewportRef}
            style={{
                left: "calc(50% + var(--nous-home-chat-transcript-scrollbar-gutter) / 2)",
                width: "calc(var(--nous-home-chat-transcript-width) + var(--nous-home-chat-transcript-scrollbar-gutter))"
            }}
        >
            <div
                className={cn(
                    "box-border flex min-h-full w-[var(--nous-home-chat-transcript-width)] flex-col pb-2",
                    "justify-end",
                    "gap-[var(--nous-chat-transcript-gap)]"
                )}
                data-homepage-chat-transcript-stack="true"
                data-homepage-chat-transcript-stack-align="bottom"
            >
                {hasSubmittedMessage ? (
                    <MessageBubble
                        className="nous-home-chat-message-in my-6 self-end"
                        compatibility="homepage"
                        role="user"
                    >
                        <p>{homepageChatStoryboardScript.userMessage}</p>
                    </MessageBubble>
                ) : null}

                {visibleResponseStepCount > 0 ? (
                    <StructuredAssistantResponse
                        areToolCallsComplete={areToolCallsComplete}
                        activeToolCallIndex={activeToolCallIndex}
                        areProjectToolCallsComplete={areProjectToolCallsComplete}
                        activeProjectToolCallIndex={activeProjectToolCallIndex}
                        isWorkingAccordionExpanded={isWorkingAccordionExpanded}
                        onWorkingAccordionToggle={onWorkingAccordionToggle}
                        responseStreamLength={responseStreamLength}
                        visibleResponseStepCount={visibleResponseStepCount}
                    />
                ) : null}

                {showResponseTyping ? <TypingIndicator /> : null}
            </div>
        </div>
    );
}

function StructuredAssistantResponse({
    areToolCallsComplete,
    activeToolCallIndex,
    areProjectToolCallsComplete,
    activeProjectToolCallIndex,
    isWorkingAccordionExpanded,
    onWorkingAccordionToggle,
    responseStreamLength,
    visibleResponseStepCount
}: {
    areToolCallsComplete: boolean;
    activeToolCallIndex: number | null;
    areProjectToolCallsComplete: boolean;
    activeProjectToolCallIndex: number | null;
    isWorkingAccordionExpanded: boolean;
    onWorkingAccordionToggle: (event: MouseEvent<HTMLButtonElement>) => void;
    responseStreamLength: number;
    visibleResponseStepCount: number;
}) {
    const response = homepageChatStoryboardScript.assistantResponse;
    const workIsComplete = visibleResponseStepCount >= homepageChatClosedStepCount;
    const isExpanded = !workIsComplete || isWorkingAccordionExpanded;
    const streamWorkingText = !workIsComplete;
    const canShowPostToolCallThinking = areToolCallsComplete || workIsComplete;
    const canShowPostProjectToolCallThinking = areProjectToolCallsComplete || workIsComplete;
    const showApproach = visibleResponseStepCount >= 2 || workIsComplete;
    const showToolCalls = visibleResponseStepCount >= 3 || workIsComplete;
    const showResults = (visibleResponseStepCount >= 4 && canShowPostToolCallThinking) || workIsComplete;
    const showValidation = (visibleResponseStepCount >= 5 && canShowPostToolCallThinking) || workIsComplete;
    const showProjectToolCalls = (visibleResponseStepCount >= 6 && canShowPostToolCallThinking) || workIsComplete;
    const showProjectDecision = (visibleResponseStepCount >= 7 && canShowPostProjectToolCallThinking) || workIsComplete;
    const showFirstPass = (visibleResponseStepCount >= 8 && canShowPostProjectToolCallThinking) || workIsComplete;
    const showFinalAnswer = visibleResponseStepCount >= homepageChatFinalStepCount;
    const streamedSegments = getSequentialStreamTextSegments(
        [
            response.initialThinking,
            response.toolCallsIntro,
            response.postToolThinking,
            response.resultsSummary,
            response.validation,
            response.projectToolCallsIntro,
            response.projectDecision,
            response.firstPass,
            response.finalLead,
            response.finalBody,
            response.finalSuggestedActionsTitle,
            response.finalProposalName,
            ...response.finalProposalDetails.map(({ value }) => value),
            ...response.finalSuggestedActions
        ],
        responseStreamLength
    );
    const getSegment = (index: number, fullText: string) => streamedSegments[index] ?? { fullText, streamedText: "" };
    const getVisibleText = (segment: SequentialStreamTextSegment) => (streamWorkingText ? segment.streamedText : segment.fullText);
    const hasVisibleText = (...segments: SequentialStreamTextSegment[]) => segments.some((segment) => getVisibleText(segment).length > 0);
    const initialThinkingText = getSegment(0, response.initialThinking);
    const toolCallsIntroText = getSegment(1, response.toolCallsIntro);
    const postToolThinkingText = getSegment(2, response.postToolThinking);
    const resultsSummaryText = getSegment(3, response.resultsSummary);
    const validationText = getSegment(4, response.validation);
    const projectToolCallsIntroText = getSegment(5, response.projectToolCallsIntro);
    const projectDecisionText = getSegment(6, response.projectDecision);
    const firstPassText = getSegment(7, response.firstPass);
    const finalSegmentOffset = 8;
    const finalLeadText = getSegment(finalSegmentOffset, response.finalLead);
    const finalBodyText = getSegment(finalSegmentOffset + 1, response.finalBody);
    const finalSuggestedActionsTitleText = getSegment(finalSegmentOffset + 2, response.finalSuggestedActionsTitle);
    const finalProposalNameText = getSegment(finalSegmentOffset + 3, response.finalProposalName);
    const finalProposalDetailTexts = response.finalProposalDetails.map((detail, index) => ({
        detail,
        text: getSegment(finalSegmentOffset + 4 + index, detail.value)
    }));
    const finalActionSegmentOffset = finalSegmentOffset + 4 + response.finalProposalDetails.length;
    const finalSuggestedActionTexts = response.finalSuggestedActions.map((action, index) => ({
        action,
        text: getSegment(finalActionSegmentOffset + index, action)
    }));
    const showToolCallList = getVisibleText(toolCallsIntroText) === response.toolCallsIntro;
    const showProjectToolCallList = getVisibleText(projectToolCallsIntroText) === response.projectToolCallsIntro;
    const showResultsTable = getVisibleText(resultsSummaryText) === response.resultsSummary;
    const isToolCallListRunning = streamWorkingText && showToolCallList && !areToolCallsComplete;
    const isProjectToolCallListRunning = streamWorkingText && showProjectToolCallList && !areProjectToolCallsComplete;
    const showFinalSuggestions = finalSuggestedActionsTitleText.streamedText.length > 0 || finalProposalNameText.streamedText.length > 0 || finalProposalDetailTexts.some(({ text }) => text.streamedText.length > 0) || finalSuggestedActionTexts.some(({ text }) => text.streamedText.length > 0);

    return (
        <article
            className={cn(
                "nous-home-chat-message-in flex flex-col self-stretch",
                "text-xs leading-[var(--nous-leading-drawer)] text-[var(--nous-drawer-body-fg-strong)]"
            )}
            data-homepage-chat-message="assistant"
            onClick={(event) => event.stopPropagation()}
        >
            <div
                className={cn(
                    "nous-home-chat-response-line-in",
                    !isExpanded && workIsComplete && "mb-[var(--nous-assistant-response-section-gap)]"
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
                    data-homepage-chat-working-toggle="true"
                    onClick={onWorkingAccordionToggle}
                    type="button"
                >
                    {workIsComplete ? response.thinkingStatus : response.accordionTitle}
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
                            {showApproach && hasVisibleText(initialThinkingText) ? (
                                <WorkingParagraph streamKey="initial-thinking" text={getVisibleText(initialThinkingText)} />
                            ) : null}
                            {showToolCalls && hasVisibleText(toolCallsIntroText) ? (
                                <WorkingBlock>
                                    <p><SequentialStreamedText streamKey="tool-calls-intro" text={getVisibleText(toolCallsIntroText)} /></p>
                                    {showToolCallList ? <HomepageChatToolCallList activeToolCallIndex={activeToolCallIndex} completedLabel={response.toolCallsCompletedLabel} isRunning={isToolCallListRunning} toolCalls={response.toolCalls} /> : null}
                                </WorkingBlock>
                            ) : null}
                            {showResults && hasVisibleText(postToolThinkingText, resultsSummaryText) ? (
                                <WorkingBlock>
                                    {getVisibleText(postToolThinkingText).length > 0 ? <p><SequentialStreamedText streamKey="post-tool-thinking" text={getVisibleText(postToolThinkingText)} /></p> : null}
                                    {getVisibleText(resultsSummaryText).length > 0 ? <p><SequentialStreamedText streamKey="results-summary" text={getVisibleText(resultsSummaryText)} /></p> : null}
                                    {showResultsTable ? <SubscriptionResultsTable results={response.results} title={response.resultsTableTitle} /> : null}
                                </WorkingBlock>
                            ) : null}
                            {showValidation && hasVisibleText(validationText) ? (
                                <WorkingParagraph streamKey="validation" text={getVisibleText(validationText)} />
                            ) : null}
                            {showProjectToolCalls && hasVisibleText(projectToolCallsIntroText) ? (
                                <WorkingBlock>
                                    <p><SequentialStreamedText streamKey="project-tool-calls-intro" text={getVisibleText(projectToolCallsIntroText)} /></p>
                                    {showProjectToolCallList ? <HomepageChatToolCallList activeToolCallIndex={activeProjectToolCallIndex} completedLabel={response.projectToolCallsCompletedLabel} isRunning={isProjectToolCallListRunning} toolCalls={response.projectToolCalls} /> : null}
                                </WorkingBlock>
                            ) : null}
                            {showProjectDecision && hasVisibleText(projectDecisionText) ? (
                                <WorkingParagraph streamKey="project-decision" text={getVisibleText(projectDecisionText)} />
                            ) : null}
                            {showFirstPass && hasVisibleText(firstPassText) ? (
                                <WorkingParagraph streamKey="first-pass" text={getVisibleText(firstPassText)} />
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            {showFinalAnswer ? (
                <div
                    className={cn(
                        "nous-home-chat-final-answer-in space-y-[var(--nous-assistant-response-section-gap)]",
                        isExpanded && "mt-4"
                    )}
                    data-homepage-chat-final-answer="true"
                >
                    {finalLeadText.streamedText.length > 0 ? (
                        <p className="text-[var(--nous-drawer-result-fg)]"><SequentialStreamedText streamKey="final-lead" text={finalLeadText.streamedText} /></p>
                    ) : null}
                    <p><SequentialStreamedText streamKey="final-body" text={finalBodyText.streamedText} /></p>
                    {showFinalSuggestions ? (
                        <TaskProposalCard
                            actionTexts={finalSuggestedActionTexts}
                            detailTexts={finalProposalDetailTexts}
                            nameText={finalProposalNameText.streamedText}
                            titleText={finalSuggestedActionsTitleText.streamedText}
                        />
                    ) : null}
                </div>
            ) : null}
        </article>
    );
}

function WorkingBlock({ children }: { children: ReactNode }) {
    return (
        <section
            className="nous-home-chat-response-line-in space-y-[var(--nous-assistant-response-paragraph-gap)]"
            data-homepage-chat-working-block="true"
        >
            {children}
        </section>
    );
}

function WorkingParagraph({ streamKey, text }: { streamKey: string; text: string }) {
    return (
        <WorkingBlock>
            <p data-homepage-chat-working-paragraph="true"><SequentialStreamedText streamKey={streamKey} text={text} /></p>
        </WorkingBlock>
    );
}

function TaskProposalCard({
    actionTexts,
    detailTexts,
    nameText,
    titleText
}: {
    actionTexts: Array<{ action: string; text: SequentialStreamTextSegment }>;
    detailTexts: Array<{ detail: { label: string; value: string }; text: SequentialStreamTextSegment }>;
    nameText: string;
    titleText: string;
}) {
    const compactSummaryItems = [
        { label: "Finances project", source: "Project" },
        { label: "Quarterly", source: "Schedule" },
        { label: "Read-only tools", source: "Tools" },
        { label: "Approval required", source: "Approval" }
    ]
        .filter(({ source }) => detailTexts.some(({ detail, text }) => detail.label === source && text.streamedText.length > 0))
        .map(({ label }) => label);

    return (
        <HomepageChatTaskProposalCard
            actions={actionTexts.map(({ action, text }) => ({
                content: <SequentialStreamedText streamKey={`final-action-${action}`} text={text.streamedText} />,
                key: action,
                visible: text.streamedText.length > 0
            }))}
            details={detailTexts.map(({ detail, text }) => ({
                content: <SequentialStreamedText streamKey={`final-proposal-${detail.label}`} text={text.streamedText} />,
                key: detail.label,
                label: detail.label,
                visible: text.streamedText.length > 0
            }))}
            name={nameText.length > 0 ? <SequentialStreamedText streamKey="final-proposal-name" text={nameText} /> : null}
            summaryItems={compactSummaryItems}
            title={titleText.length > 0 ? <SequentialStreamedText streamKey="final-suggested-actions-title" text={titleText} /> : null}
        />
    );
}

function SubscriptionResultsTable({ results, title }: {
    results: typeof homepageChatStoryboardScript.assistantResponse.results;
    title: string;
}) {
    return (
        <details
            className={cn(
                "mt-[var(--nous-tool-call-list-margin-top)] rounded-[var(--nous-radius-md)]",
                "border border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-control-bg-soft)]"
            )}
            data-homepage-chat-results-table="true"
        >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-2 py-2 font-semibold text-[var(--nous-drawer-result-fg)]">
                <span>{title}</span>
                <span className="nous-mono text-[length:var(--nous-type-meta)] font-semibold uppercase text-[var(--nous-drawer-meta-fg)]">{results.length} shown</span>
            </summary>
            <div className="overflow-x-auto border-t border-[color:var(--nous-stroke-subtle)]">
                <table className="min-w-full text-left text-[length:var(--nous-type-meta)]" data-homepage-chat-results-table-grid="true">
                    <thead className="text-[var(--nous-drawer-meta-fg)]">
                        <tr className="border-b border-[color:var(--nous-stroke-subtle)]">
                            <th className="px-2 py-2 font-semibold" scope="col">Service</th>
                            <th className="px-2 py-2 font-semibold" scope="col">Monthly</th>
                            <th className="px-2 py-2 font-semibold" scope="col">Category</th>
                            <th className="px-2 py-2 font-semibold" scope="col">Next step</th>
                            <th className="px-2 py-2 font-semibold" scope="col">Confidence</th>
                        </tr>
                    </thead>
                    <tbody className="text-[var(--nous-drawer-body-fg)]">
                        {results.map(([service, monthly, category, nextStep, confidence]) => (
                            <tr className="border-b border-[color:var(--nous-stroke-subtle)] last:border-b-0" key={service}>
                                <th className="px-2 py-2 font-semibold text-[var(--nous-drawer-result-fg)]" scope="row">{service}</th>
                                <td className="px-2 py-2">{monthly}</td>
                                <td className="px-2 py-2">{category}</td>
                                <td className="px-2 py-2">{nextStep}</td>
                                <td className="px-2 py-2">{confidence}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </details>
    );
}

function SequentialStreamedText({ streamKey, text }: { streamKey: string; text: string }) {
    return <span data-homepage-chat-streamed-text={streamKey}>{text}</span>;
}

function TypingIndicator() {
    return (
        <div
            aria-label="Nue is typing"
            className={cn(
                "nous-home-chat-message-in flex w-fit items-center gap-[var(--nous-chat-typing-dot-gap)] self-start rounded-full",
                "border border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-chat-message-bg-assistant)]",
                "px-[var(--nous-chat-typing-padding-x)] py-[var(--nous-chat-typing-padding-y)]"
            )}
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

function HomepageChatCommandComposer({
    isCompact,
    isSendReady,
    onSend,
    onSendKeyDown,
    prompt,
    showCaret,
    value
}: {
    isCompact: boolean;
    isSendReady: boolean;
    onSend: (event: MouseEvent<HTMLButtonElement>) => void;
    onSendKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
    prompt: string;
    showCaret: boolean;
    value: string;
}) {
    return (
        <ConversationCommandComposer
            caretClassName="nous-home-chat-caret"
            contentProps={{
                "data-homepage-chat-composer-mode": isCompact ? "compact" : "hero",
                "data-homepage-chat-composer-value": value
            }}
            hasValue={Boolean(value)}
            leadingActions={<HomepageChatComposerLeadingActions />}
            leadingActionsClassName="gap-[var(--nous-drawer-command-actions-gap)]"
            placeholder={prompt}
            showCaret={showCaret}
            trailingActions={<HomepageChatComposerTrailingActions isSendReady={isSendReady} onSend={onSend} onSendKeyDown={onSendKeyDown} />}
            trailingActionsClassName="gap-[var(--nous-composer-toolbar-action-gap)]"
            value={value}
            valueProps={{ "data-homepage-chat-composer-content": "true" }}
            variant={isCompact ? "compact" : "hero"}
        />
    );
}

function AgentSidebar({ state, threads }: { state: HomepageChatMockupState; threads: readonly SidebarThread[] }) {
    const sidebarLayers = [
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
            ariaLabel="Agent navigation"
            as="aside"
            className={cn(
                "absolute left-0 top-0 flex h-full w-[var(--nous-home-chat-sidebar-width)] flex-col overflow-hidden",
                "pointer-events-auto",
                "rounded-[var(--nous-home-chat-sidebar-radius)]",
                "border border-[color:var(--nous-stroke-soft)]",
                "[background:var(--nous-home-chat-sidebar-bg)]",
                "shadow-[var(--nous-home-chat-sidebar-shadow)] backdrop-blur",
                state === "unfocused" && "nous-home-chat-sidebar-unfocused"
            )}
            contentClassName={cn(
                "flex h-full flex-col",
                state === "unfocused" && "opacity-[var(--nous-home-chat-sidebar-unfocused-content-opacity)]"
            )}
            data-state={state}
            layers={sidebarLayers}
        >
            <SidebarHeader />
            <div
                className={cn(
                    "nous-mobile-scrollbar flex-1 overflow-y-auto",
                    "px-[var(--nous-home-chat-sidebar-padding-x)] pb-[var(--nous-home-chat-sidebar-body-padding-bottom)] pt-[var(--nous-home-chat-sidebar-body-padding-top)]"
                )}
            >
                <SidebarNav threads={threads} />
            </div>
            <SidebarFooter />
        </AmbientSurface>
    );
}

function SidebarHeader() {
    return (
        <header
            className={cn(
                "flex items-center justify-between",
                "px-[var(--nous-home-chat-sidebar-padding-x)]",
                "pb-[var(--nous-home-chat-sidebar-header-padding-bottom)] pt-[var(--nous-home-chat-sidebar-header-padding-top)]"
            )}
        >
            <p
                className={cn(
                    "text-[length:var(--nous-home-chat-sidebar-title-size)] font-semibold tracking-[-0.03em]",
                    "text-[var(--nous-sidebar-title-fg)]",
                    "[font-family:var(--nous-home-chat-sidebar-title-font-family)]"
                )}
            >
                Agent
            </p>
            <div
                className={cn(
                    "flex items-center gap-[var(--nous-drawer-header-actions-gap)]",
                    "text-[var(--nous-icon-fg-subtle)]"
                )}
            >
                <IconFrame icon="panelClose" label="Collapse sidebar" />
                <IconFrame icon="edit" label="New chat" surface />
            </div>
        </header>
    );
}

function SidebarNav({ threads }: { threads: readonly SidebarThread[] }) {
    return (
        <nav
            aria-label="Agent sections"
            className={cn(
                "space-y-[var(--nous-home-chat-nav-section-gap)]",
                "text-[length:var(--nous-home-chat-nav-font-size)]"
            )}
        >
            <div className={cn("space-y-[var(--nous-sidebar-section-item-gap)]")}>
                {primaryNavItems.map((item) => (
                    <SidebarRow icon={item.icon} key={item.label} label={item.label} />
                ))}
            </div>

            <SidebarGroup label="Project">
                {projectItems.map((item) => (
                    <SidebarRow icon={item.icon} key={item.label} label={item.label} />
                ))}
            </SidebarGroup>

            <SidebarGroup label="Chats">
                <div
                    className={cn(
                        "space-y-[var(--nous-home-chat-thread-gap)]",
                        "pt-[var(--nous-home-chat-thread-padding-top)]"
                    )}
                    data-homepage-chat-thread-count={threads.length}
                >
                    {threads.map((thread) => (
                        <p
                            className={cn(
                                "truncate",
                                "px-[var(--nous-home-chat-thread-padding-top)]",
                                "text-[length:var(--nous-home-chat-nav-font-size)] font-semibold tracking-[var(--nous-home-chat-nav-letter-spacing)]",
                                "text-[var(--nous-fg-body)]"
                            )}
                            data-homepage-chat-thread="true"
                            data-homepage-chat-thread-streaming={thread.isStreaming ? "true" : "false"}
                            key={thread.id}
                        >
                            <span data-homepage-chat-thread-title={thread.id}>{thread.title}</span>
                            {thread.isStreaming ? <span aria-hidden="true" className="nous-home-chat-caret ml-px inline-block h-[0.85em] w-px translate-y-[0.12em] bg-[var(--nous-fg-body)]" data-homepage-chat-thread-caret="true" /> : null}
                        </p>
                    ))}
                </div>
            </SidebarGroup>
        </nav>
    );
}

function SidebarGroup({ children, label }: { children: ReactNode; label: string }) {
    return (
        <div>
            <p
                className={cn(
                    "mb-[var(--nous-sidebar-section-label-margin-bottom)] flex items-center gap-[var(--nous-sidebar-section-label-gap)]",
                    "text-[length:var(--nous-home-chat-nav-font-size)] font-semibold tracking-[-0.02em]",
                    "text-[var(--nous-nav-section-label-fg)]"
                )}
            >
                {label}{" "}
                <DisclosureTriangle
                    className={cn(
                        "translate-y-px",
                        "text-[var(--nous-nav-section-label-fg)]"
                    )}
                />
            </p>
            <div className={cn("space-y-[var(--nous-sidebar-section-item-gap)]")}>{children}</div>
        </div>
    );
}

function SidebarRow({ icon, label }: { icon: GlyphName; label: string }) {
    return (
        <div
            className={cn(
                "flex items-center gap-[var(--nous-nav-item-gap)]",
                "rounded-[var(--nous-radius-md)] p-[var(--nous-nav-item-padding)]",
                "text-[length:var(--nous-home-chat-nav-font-size)] font-semibold tracking-[var(--nous-home-chat-nav-letter-spacing)]",
                "text-[var(--nous-fg-body)]"
            )}
        >
            <Glyph
                className={cn(
                    "h-[var(--nous-home-chat-sidebar-icon-height)] w-[var(--nous-home-chat-sidebar-icon-width)]",
                    "text-[var(--nous-icon-fg-muted)]"
                )}
                name={icon}
                strokeWidth="var(--nous-home-chat-icon-stroke-sidebar)"
            />
            <span>{label}</span>
        </div>
    );
}

function SidebarFooter() {
    return (
        <footer
            className={cn(
                "relative flex h-[var(--nous-home-chat-sidebar-footer-height)] items-center justify-between",
                "border-t border-[color:var(--nous-stroke-subtle)]",
                "px-[var(--nous-home-chat-sidebar-padding-x)]"
            )}
        >
            <div className={cn("flex min-w-0 items-center", "gap-[var(--nous-sidebar-user-gap)]")}>
                <span
                    className={cn(
                        "relative grid size-[var(--nous-home-chat-user-avatar-size)] shrink-0 place-items-center overflow-hidden"
                    )}
                >
                    <Image
                        alt=""
                        className="object-cover"
                        data-homepage-chat-user-avatar-image="true"
                        fill
                        sizes="var(--nous-home-chat-user-avatar-size)"
                        src="/andrew-avatar.png"
                    />
                </span>
                <div className={cn("min-w-0")}>
                    <p
                        className={cn(
                            "truncate",
                            "text-[length:var(--nous-home-chat-nav-font-size)] font-medium leading-[var(--nous-home-chat-user-name-line-height)]",
                            "text-[var(--nous-fg-title)]"
                        )}
                    >
                        Agent
                    </p>
                    <p
                        className={cn(
                            "mt-[var(--nous-home-chat-user-title-margin-top)] truncate",
                            "text-xs italic leading-[var(--nous-home-chat-user-title-line-height)]",
                            "text-[var(--nous-fg-subtle)]"
                        )}
                    >
                        Andrew
                    </p>
                </div>
            </div>
            <Glyph
                className={cn(
                    "h-[var(--nous-home-chat-footer-icon-height)] w-[var(--nous-home-chat-footer-icon-width)]",
                    "text-[var(--nous-icon-fg-subtle)]"
                )}
                name="settings"
                strokeWidth="var(--nous-home-chat-icon-stroke-sidebar)"
            />
        </footer>
    );
}

function IconFrame({ icon, label, surface = false }: { icon: GlyphName; label: string; surface?: boolean }) {
    return (
        <span
            aria-label={label}
            className={cn(
                "grid size-[var(--nous-home-chat-icon-frame-size)] place-items-center",
                "rounded-[var(--nous-control-radius-xs)]",
                surface && "border border-[color:var(--nous-stroke-subtle)]",
                surface && "bg-[var(--nous-control-bg-soft)]",
                surface ? "text-[var(--nous-fg-primary)]" : "text-[var(--nous-icon-fg-subtle)]"
            )}
            role="img"
        >
            <Glyph
                className={cn(
                    "h-[var(--nous-home-chat-header-icon-height)]",
                    "w-[var(--nous-home-chat-header-icon-width)]"
                )}
                name={icon}
                strokeWidth="var(--nous-home-chat-icon-stroke-header)"
            />
        </span>
    );
}
