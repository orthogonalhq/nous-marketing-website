import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { formatCompanionStatusTime } from "@/components/product-mockups/companion-iphone-status-bar";
import { CommandComposer } from "@/components/mockups/conversation";
import { CortexWorkflowCreationMockup } from "@/components/product-mockups/cortex-workflow-creation-mockup";
import { cortexWorkflowCreationScript } from "@/components/product-mockups/cortex-workflow-creation-script";
import { HomepageChatSectionMockup, homepageChatStoryboardScript } from "@/components/product-mockups/homepage-chat-section-mockup";
import { LazyProductMockup } from "@/components/product-mockups/lazy-product-mockup";
import { mealPrepWorkflowNodeCopy } from "@/components/product-mockups/meal-prep-workflow-node-copy";
import { SavedWorkflowRunWireframeMockup } from "@/components/product-mockups/saved-workflow-run-wireframe-mockup";
import { savedWorkflowStoryboardApprovalFrameIndex, savedWorkflowStoryboardFrames, savedWorkflowStoryboardScript } from "@/components/product-mockups/saved-workflow-storyboard-script";

import { ComponentPolishPage } from "./component-polish-page";

let restoreIntersectionObserver: (() => void) | undefined;

afterEach(() => {
    cleanup();
    vi.useRealTimers();
    restoreIntersectionObserver?.();
    restoreIntersectionObserver = undefined;
});

function mockIntersectionObserver() {
    const originalIntersectionObserver = window.IntersectionObserver;
    let observerCallback: IntersectionObserverCallback | undefined;

    class MockIntersectionObserver implements IntersectionObserver {
        readonly root = null;
        readonly rootMargin = "0px";
        readonly scrollMargin = "0px";
        readonly thresholds = [0];

        constructor(callback: IntersectionObserverCallback) {
            observerCallback = callback;
        }

        disconnect() {}
        observe() {}
        takeRecords() {
            return [];
        }
        unobserve() {}
    }

    Object.defineProperty(window, "IntersectionObserver", {
        configurable: true,
        value: MockIntersectionObserver,
        writable: true
    });

    restoreIntersectionObserver = () => {
        Object.defineProperty(window, "IntersectionObserver", {
            configurable: true,
            value: originalIntersectionObserver,
            writable: true
        });
    };

    return (isIntersecting: boolean) => {
        observerCallback?.(
            [
                {
                    isIntersecting
                } as IntersectionObserverEntry
            ],
            {} as IntersectionObserver
        );
    };
}

function advanceStoryboardTyping() {
    for (let index = 0; index < homepageChatStoryboardScript.userMessage.length; index += 1) {
        act(() => {
            vi.advanceTimersByTime(homepageChatStoryboardScript.typingIntervalMs);
        });
    }
}

function advanceStoryboardResponse() {
    act(() => {
        vi.advanceTimersByTime(20_000);
    });

    advanceResponseStream(1700);
}

function advanceResponseStream(characterCount: number) {
    for (let index = 0; index < characterCount; index += 1) {
        act(() => {
            vi.advanceTimersByTime(homepageChatStoryboardScript.responseStreamIntervalMs);
        });
    }
}

function getRequiredElement(container: HTMLElement, selector: string) {
    const element = container.querySelector(selector);

    expect(element).not.toBeNull();

    return element as HTMLElement;
}

function getWorkflowNodeGeometry(container: HTMLElement, nodeId: string) {
    const node = getRequiredElement(container, `[data-workflow-node-id="${nodeId}"]`);

    return {
        height: node.style.height,
        left: node.style.left,
        minHeight: node.style.minHeight,
        top: node.style.top,
        width: node.style.width
    };
}

function getWorkflowStackGeometry(container: HTMLElement, stackId: string) {
    const stack = getRequiredElement(container, `[data-workflow-node-stack="${stackId}"]`);

    return {
        left: stack.style.left,
        top: stack.style.top,
        width: stack.style.width
    };
}

function getWorkflowConnectorGeometry(container: HTMLElement, connectorId: string) {
    const connector = getRequiredElement(container, `[data-workflow-connector="${connectorId}"]`);

    return {
        height: connector.style.height,
        left: connector.style.left,
        top: connector.style.top,
        viewBox: connector.getAttribute("viewBox"),
        width: connector.style.width
    };
}

function expectWorkflowNodeBadges(container: HTMLElement, nodeId: string, badges: readonly string[]) {
    const node = getRequiredElement(container, `[data-workflow-node-id="${nodeId}"]`);
    const badgeGroup = node.querySelector('[data-workflow-node-badges="true"]');
    const actualBadges = [...node.querySelectorAll("[data-workflow-node-badge]")].map((badge) => badge.textContent);

    expect(badgeGroup).toHaveAttribute("data-workflow-node-badges-variant", "metadata");
    expect(actualBadges).toEqual([...badges]);
    expect(node.querySelector('[data-workflow-node-detail="true"]')).not.toBeInTheDocument();
}

function expectComposerControlsUseHomepageButtons(container: HTMLElement, sendLabel: string, isSendReady: boolean) {
    const sendButton = within(container).getByRole("button", { name: sendLabel });

    expect(sendButton).toHaveAttribute("aria-disabled", isSendReady ? "false" : "true");
    expect(sendButton).toHaveAttribute("data-homepage-chat-send-ready", String(isSendReady));
    expect(sendButton).toHaveClass(
        "grid",
        "size-[var(--nous-composer-send-button-size)]",
        "rounded-[var(--nous-control-radius-md)]",
        "border",
        "transition-[background,border-color,color,box-shadow,transform]"
    );

    if (isSendReady) {
        expect(sendButton).toHaveClass(
            "nous-home-chat-send-button-ready",
            "border-transparent",
            "bg-[var(--nous-composer-send-ready-bg)]",
            "text-[var(--nous-composer-send-ready-fg)]"
        );
    } else {
        expect(sendButton).toHaveClass(
            "border-[color:var(--nous-stroke-subtle)]",
            "bg-[var(--nous-control-bg-soft)]",
            "text-[var(--nous-fg-primary)]"
        );
    }

    expect(hasSpanWithClasses(container, "h-[var(--nous-home-chat-command-add-icon-height)]", "w-[var(--nous-home-chat-command-add-icon-width)]")).toBe(true);
    expect(hasSpanWithClasses(container, "h-[var(--nous-home-chat-command-square-icon-height)]", "w-[var(--nous-home-chat-command-square-icon-width)]")).toBe(true);
    expect(hasSpanWithClasses(container, "h-[var(--nous-home-chat-command-mic-icon-height)]", "w-[var(--nous-home-chat-command-mic-icon-width)]")).toBe(true);
    expect(hasSpanWithClasses(container, "h-[var(--nous-home-chat-command-send-icon-height)]", "w-[var(--nous-home-chat-command-send-icon-width)]")).toBe(true);
    expect(hasDivWithClass(container, "gap-[var(--nous-drawer-command-actions-gap)]")).toBe(true);
}

function hasSpanWithClasses(container: HTMLElement, ...classNames: string[]) {
    return [...container.querySelectorAll("span")].some((element) => classNames.every((className) => element.classList.contains(className)));
}

function hasDivWithClass(container: HTMLElement, className: string) {
    return [...container.querySelectorAll("div")].some((element) => element.classList.contains(className));
}

function advanceCortexWorkflowCreationToPermissionPrompt() {
    const workflowFitThinkingDurationMs = cortexWorkflowCreationScript.workflowFitThinking.steps.reduce((totalMs, step) => totalMs + step.durationMs, 0);

    for (let index = 0; index < cortexWorkflowCreationScript.userMessage.length; index += 1) {
        act(() => {
            vi.advanceTimersByTime(cortexWorkflowCreationScript.typingIntervalMs);
        });
    }

    act(() => {
        vi.advanceTimersByTime(cortexWorkflowCreationScript.autoSendDelayMs);
    });

    act(() => {
        vi.advanceTimersByTime(cortexWorkflowCreationScript.socketConnectDelayMs);
    });

    act(() => {
        vi.advanceTimersByTime(cortexWorkflowCreationScript.workflowFitThinkingRevealDelayMs + workflowFitThinkingDurationMs + cortexWorkflowCreationScript.thinkingCollapseDelayMs);
    });

    const assistantLeadTickCount = Math.ceil(cortexWorkflowCreationScript.assistantLead.length / 2);

    for (let index = 0; index < assistantLeadTickCount; index += 1) {
        act(() => {
            vi.advanceTimersByTime(cortexWorkflowCreationScript.assistantLeadStreamIntervalMs);
        });
    }

    act(() => {
        vi.advanceTimersByTime(cortexWorkflowCreationScript.permissionPromptDelayMs);
    });
}

describe("ComponentPolishPage", () => {
    it("documents the homepage chat component against mockup and system references", async () => {
        render(<ComponentPolishPage />);

        expect(screen.getByRole("heading", { name: /homepage chat visual component board/i })).toBeVisible();
        expect(screen.getByRole("heading", { name: /agent chat section composition/i })).toBeVisible();
        expect(screen.getByText(/supplied homepage chat mockup/i)).toBeVisible();
        expect(screen.getByText(/nue app-shell tokens/i)).toBeVisible();
        await waitFor(() => {
            expect(screen.getByRole("article", { name: /homepage chat visual mockup/i })).toBeVisible();
        });

        expect(screen.getByRole("article", { name: /homepage chat visual mockup/i })).toHaveAttribute("data-homepage-chat-mode", "static");
        expect(screen.getByRole("heading", { name: /recurring intent becomes a saved workflow/i })).toBeVisible();
        expect(screen.getByRole("article", { name: /cortex workflow creation mockup/i })).toBeVisible();
        expect(screen.getByRole("heading", { name: /companion conversation with background workflow/i })).toBeVisible();
        expect(screen.getByRole("article", { name: /saved workflow run wireframe mockup/i })).toBeVisible();
        expect(screen.getByText("--nous-command-input-bg")).toBeVisible();
    });

    it("supports the design-system theme switcher", async () => {
        const { container } = render(<ComponentPolishPage />);
        const getTheme = () => within(container).getByTestId("design-system-shell").dataset.nousTheme;
        const themeSelect = within(container).getByRole("combobox", { name: "Theme" });

        await waitFor(() => {
            expect(screen.getAllByLabelText("Agent navigation")[0]).toBeVisible();
        });

        const chatCanvas = container.querySelector('[aria-label="Chat welcome panel"]');
        const sidebar = screen.getAllByLabelText("Agent navigation")[0];
        const proposalCard = container.querySelector('[data-homepage-chat-task-proposal-card="true"]');
        const proposalSummary = container.querySelector('[data-homepage-chat-task-proposal-compact="true"]');
        const proposalDetails = container.querySelector('[data-homepage-chat-task-proposal-details="true"]');
        const proposalActions = container.querySelector('[data-homepage-chat-final-actions-list="true"]');
        const primaryProposalAction = within(proposalCard as HTMLElement).getByText("Approve setup").parentElement;

        expect(getTheme()).toBe("dark");
        expect(themeSelect).toHaveValue("dark");
        expect(chatCanvas).toHaveClass("[background:var(--nous-chat-canvas-bg)]");
        expect(sidebar).toHaveClass("[background:var(--nous-home-chat-sidebar-bg)]", "shadow-[var(--nous-home-chat-sidebar-shadow)]");
        expect(proposalSummary).toHaveClass("hover:bg-[var(--nous-task-proposal-summary-hover-bg)]");
        expect(proposalDetails).toHaveClass(
            "border-[color:var(--nous-task-proposal-details-border)]",
            "bg-[var(--nous-task-proposal-details-bg)]"
        );
        expect(proposalDetails?.querySelector("dl")).toHaveClass("divide-[color:var(--nous-task-proposal-divider)]");
        expect(proposalActions).toHaveClass("bg-[var(--nous-task-proposal-actions-bg)]");
        expect(primaryProposalAction).toHaveClass(
            "bg-[var(--nous-task-proposal-primary-action-bg)]",
            "text-[var(--nous-task-proposal-primary-action-fg)]"
        );

        fireEvent.change(themeSelect, { target: { value: "light" } });

        await waitFor(() => expect(getTheme()).toBe("light"));
        expect(themeSelect).toHaveValue("light");

        fireEvent.change(themeSelect, { target: { value: "rust" } });

        await waitFor(() => expect(getTheme()).toBe("rust"));
        expect(themeSelect).toHaveValue("rust");
    });
});

describe("LazyProductMockup", () => {
    it("keeps heavy mockup markup out of the DOM until it is near the viewport", async () => {
        const triggerIntersection = mockIntersectionObserver();

        render(<LazyProductMockup mode="static" variant="homepage-chat" />);

        expect(screen.getByLabelText(/homepage chat visual mockup loading when near viewport/i)).toBeVisible();
        expect(screen.queryByRole("article", { name: /homepage chat visual mockup/i })).not.toBeInTheDocument();

        act(() => {
            triggerIntersection(true);
        });

        await waitFor(() => {
            expect(screen.getByRole("article", { name: /homepage chat visual mockup/i })).toBeVisible();
        });
    });
});

describe("CommandComposer", () => {
    it("lets compact composer content grow to five lines before scrolling", () => {
        const { container } = render(
            <CommandComposer
                contentProps={{ "data-test-composer-content": "true" }}
                hasValue
                value={"Line one\nLine two\nLine three\nLine four\nLine five\nLine six"}
                valueProps={{ "data-test-composer-value": "true" }}
                variant="compact"
            />
        );

        expect(container.querySelector('[data-command-composer-variant="compact"]')).toBeInTheDocument();
        expect(container.querySelector('[data-test-composer-content="true"]')).toHaveClass(
            "min-h-[var(--nous-composer-compact-height)]",
            "max-h-[var(--nous-composer-compact-max-height)]",
            "overflow-y-auto"
        );
        expect(container.querySelector('[data-test-composer-value="true"]')).toHaveClass("whitespace-pre-wrap", "break-words");
    });
});

describe("CortexWorkflowCreationMockup", () => {
    it("frames weekly meal-planning intent as a governed workflow creation", () => {
        const { container } = render(<CortexWorkflowCreationMockup mode="static" />);
        const finalStep = cortexWorkflowCreationScript.steps[cortexWorkflowCreationScript.steps.length - 1];
        const workflowFitThinkingDurationSeconds = Math.floor(cortexWorkflowCreationScript.workflowFitThinking.steps.reduce((totalMs, step) => totalMs + step.durationMs, 0) / 1_000);

        expect(screen.getByRole("article", { name: /cortex workflow creation mockup/i })).toBeVisible();
        expect(container.querySelector('[data-cortex-workflow-creation-layout="home-chat"]')).toBeInTheDocument();
        expect(container.querySelector('[data-cortex-workflow-creation-mode="static"]')).toBeInTheDocument();
        expect(container.querySelector('[data-cortex-workflow-fit-thinking-visible="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-cortex-workflow-permission-visible="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-cortex-workflow-permission-approved="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-cortex-workflow-thinking-visible="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-cortex-workflow-proposal-visible="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-cortex-workflow-active-node="save"]')).toBeInTheDocument();
        expect(screen.getByText(cortexWorkflowCreationScript.userMessage)).toBeVisible();
        expect(screen.getByText(cortexWorkflowCreationScript.assistantLead)).toBeVisible();
        expect(screen.getByText(cortexWorkflowCreationScript.permissionPrompt.body)).toBeVisible();
        expect(screen.getAllByText(cortexWorkflowCreationScript.permissionPrompt.selectedAction).length).toBeGreaterThan(0);
        expect(screen.getByText(cortexWorkflowCreationScript.assistantProposal)).toBeVisible();
        expect(screen.getAllByText(cortexWorkflowCreationScript.proposalName).length).toBeGreaterThan(0);
        expect(screen.getAllByText("Create workflow").length).toBeGreaterThan(0);
        expect(screen.getByText("Edit workflow")).toBeVisible();
        expect(screen.getByText("Run once now")).toBeVisible();
        expect(screen.getByText("Delete workflow")).toBeVisible();
        expect(screen.getByText("Just make this week’s plan")).toBeVisible();
        expect(screen.getByText(cortexWorkflowCreationScript.composerPlaceholder)).toBeVisible();
        expectComposerControlsUseHomepageButtons(container, "Send Cortex workflow message", false);
        expect(container.querySelector('[data-cortex-thinking-card="true"] [data-tool-call-group="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-running-workflow-group="true"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-cortex-fit-thinking-card="true"]')).toBeInTheDocument();
        expect(screen.getByText(`Thought for ${workflowFitThinkingDurationSeconds} seconds`)).toBeVisible();
        expect(container.querySelector('[data-cortex-fit-thinking-step="recurrence"]')).toHaveTextContent(cortexWorkflowCreationScript.workflowFitThinking.steps[0].text);
        expect(container.querySelector('[data-cortex-fit-thinking-step="ask-permission"]')).toHaveAttribute("data-cortex-fit-thinking-step-active", "true");
        expect(container.querySelector('[data-cortex-thinking-card="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-cortex-fit-thinking-card="true"] [data-homepage-chat-working-accordion="closed"]')).toBeInTheDocument();
        expect(container.querySelector('[data-cortex-thinking-card="true"] [data-homepage-chat-working-accordion="closed"]')).toBeInTheDocument();
        expect(screen.getByText("Created workflow")).toBeVisible();
        expect(container.querySelector('[data-cortex-thinking-step="schedule"]')).toHaveTextContent(cortexWorkflowCreationScript.steps[0].thinking);
        expect(container.querySelector('[data-cortex-thinking-step="save"]')).toHaveAttribute("data-cortex-thinking-step-active", "true");
        expect(container.querySelector('[data-cortex-thinking-stream="save"]')).toHaveTextContent(finalStep.thinking);
        expect(container.querySelector('[data-cortex-authoring-tool-calls="schedule"]')).toHaveTextContent("workflow.createNode");
        expect(container.querySelector('[data-cortex-authoring-tool-calls="schedule"]')).toHaveTextContent("workflow.lint()");
        expect(container.querySelector('[data-cortex-authoring-tool-calls="schedule"] [data-tool-call-group="true"]')).toHaveAttribute("data-tool-call-state", "complete");
        expect(container.querySelectorAll('[data-cortex-authoring-tool-calls] [data-tool-call="Workflow Linter"]')).toHaveLength(cortexWorkflowCreationScript.steps.length);
        expect(container.querySelector('[data-cortex-authoring-tool-calls="save"]')).toHaveTextContent("workflow.lint({ final: true })");
        expect(container.querySelector('[data-cortex-authoring-tool-calls="save"]')).toHaveTextContent("No blocking issues. Workflow is created and ready.");
        expect(container.querySelector('[data-workflow-node-id="trigger"]')).toHaveAttribute("data-workflow-node-status", "done");
        expect(container.querySelector('[data-workflow-node-done-check="true"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-id="meal-prep-agent"]')).toHaveTextContent("Agent");
        expect(container.querySelector('[data-workflow-node-id="meal-prep-agent"]')).toHaveTextContent(mealPrepWorkflowNodeCopy.mealPrepAgentDirective);
        expect(container.querySelector('[data-workflow-node-id="approval-gate"]')).toHaveTextContent(mealPrepWorkflowNodeCopy.checkoutApproval);
        expect(container.querySelector('[data-workflow-node-id="tool-memories"]')).toHaveAttribute("data-workflow-node-status", "done");
        expectWorkflowNodeBadges(container, "tool-memories", mealPrepWorkflowNodeCopy.memoryBadges);
        expectWorkflowNodeBadges(container, "tool-calendar", mealPrepWorkflowNodeCopy.scheduleToolBadges);
        expectWorkflowNodeBadges(container, "tool-web-search", mealPrepWorkflowNodeCopy.recipeToolBadges);
        expectWorkflowNodeBadges(container, "tool-uber-cart", mealPrepWorkflowNodeCopy.groceryToolBadges);
        expect(container.querySelector('[data-workflow-node-stack="meal-prep-tools"]')).toBeInTheDocument();
        expect(container.querySelector('[data-workflow-connector="meal-prep-to-calendar"]')).toHaveAttribute("data-workflow-connector-bidirectional", "true");
        expect(container.querySelector('[data-workflow-connector="checkout-to-uber-checkout"]')).toHaveAttribute("data-workflow-connector-bidirectional", "true");
        expect(container.querySelector('[data-workflow-connector="checkout-to-uber-checkout"]')).toHaveStyle({ width: "25px" });
        expect(container.querySelector('[data-workflow-node-id="tool-uber-checkout"]')).toHaveAttribute("data-workflow-node-status", "done");
        expectWorkflowNodeBadges(container, "tool-uber-checkout", mealPrepWorkflowNodeCopy.checkoutToolBadges);
        expect(container.querySelector('[data-workflow-node-id="meal-prep-agent"] [data-workflow-node-port-chip="Memory"]')).toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-id="meal-prep-agent"] [data-workflow-node-port-chip="Tool"]')).toBeInTheDocument();
    });

    it("uses the saved workflow graph geometry for the final authored graph", () => {
        const alignedNodeIds = [
            "trigger",
            "meal-prep-agent",
            "approval-gate",
            "checkout-agent",
            "tool-memories",
            "tool-uber-checkout"
        ] as const;
        const alignedConnectorPairs = [
            ["schedule-to-meal-prep", "trigger-to-meal-prep"],
            ["meal-prep-to-approval", "meal-prep-to-approval"],
            ["approval-to-checkout", "approval-to-checkout"],
            ["meal-prep-to-memories", "meal-prep-to-memories"],
            ["meal-prep-to-calendar", "meal-prep-to-calendar"],
            ["checkout-to-uber-checkout", "checkout-to-uber-checkout"]
        ] as const;
        const creationRender = render(<CortexWorkflowCreationMockup mode="static" />);
        const creationNodeGeometry = Object.fromEntries(alignedNodeIds.map((nodeId) => [
            nodeId,
            getWorkflowNodeGeometry(creationRender.container, nodeId)
        ]));
        const creationMemoryStackGeometry = getWorkflowStackGeometry(creationRender.container, "meal-prep-memory");
        const creationToolStackGeometry = getWorkflowStackGeometry(creationRender.container, "meal-prep-tools");
        const creationConnectorGeometry = Object.fromEntries(alignedConnectorPairs.map(([creationConnectorId]) => [
            creationConnectorId,
            getWorkflowConnectorGeometry(creationRender.container, creationConnectorId)
        ]));
        const creationMealPrepAgentGeometry = getWorkflowNodeGeometry(creationRender.container, "meal-prep-agent");
        const creationCheckoutAgentGeometry = getWorkflowNodeGeometry(creationRender.container, "checkout-agent");
        const creationNextPlaceholderGeometry = getWorkflowNodeGeometry(creationRender.container, "placeholder-primary-next");
        const creationNextPlaceholderConnectorGeometry = getWorkflowConnectorGeometry(creationRender.container, "checkout-to-next-placeholder");
        const primaryConnectorWidth = creationConnectorGeometry["schedule-to-meal-prep"].width;

        expect(creationMealPrepAgentGeometry.width).toBe("150px");
        expect(creationMealPrepAgentGeometry.height).toBe("100px");
        expect(creationCheckoutAgentGeometry.width).toBe(creationMealPrepAgentGeometry.width);
        expect(creationCheckoutAgentGeometry.height).toBe(creationMealPrepAgentGeometry.height);
        expect(creationConnectorGeometry["meal-prep-to-approval"].width).toBe(primaryConnectorWidth);
        expect(creationConnectorGeometry["approval-to-checkout"].width).toBe(primaryConnectorWidth);
        expect(creationNextPlaceholderConnectorGeometry.width).toBe(primaryConnectorWidth);
        expect(creationNextPlaceholderGeometry.width).toBe("32px");
        expect(Number.parseFloat(creationNextPlaceholderGeometry.left) + Number.parseFloat(creationNextPlaceholderGeometry.width)).toBeLessThanOrEqual(772);

        creationRender.unmount();

        const savedRender = render(<SavedWorkflowRunWireframeMockup mode="static" />);

        alignedNodeIds.forEach((nodeId) => {
            expect(getWorkflowNodeGeometry(savedRender.container, nodeId)).toEqual(creationNodeGeometry[nodeId]);
        });

        expect(getWorkflowStackGeometry(savedRender.container, "meal-prep-memory")).toEqual(creationMemoryStackGeometry);
        expect(getWorkflowStackGeometry(savedRender.container, "meal-prep-tools")).toEqual(creationToolStackGeometry);

        expect(getWorkflowNodeGeometry(savedRender.container, "meal-prep-agent").width).toBe("150px");
        expect(getWorkflowNodeGeometry(savedRender.container, "checkout-agent").width).toBe("150px");
        expect(getWorkflowNodeGeometry(savedRender.container, "checkout-agent").height).toBe("100px");

        alignedConnectorPairs.forEach(([creationConnectorId, savedConnectorId]) => {
            expect(getWorkflowConnectorGeometry(savedRender.container, savedConnectorId)).toEqual(creationConnectorGeometry[creationConnectorId]);
        });

        savedRender.unmount();
    });

    it("rounds the last visible real tool card in partial creation stacks", () => {
        const calendarOnlyRender = render(<CortexWorkflowCreationMockup mode="static" previewActiveGraphNodeId="calendar" />);

        expect(calendarOnlyRender.container.querySelector('[data-workflow-node-id="tool-calendar"]')).toHaveAttribute("data-workflow-node-stack-position", "only");
        expect(calendarOnlyRender.container.querySelector('[data-workflow-node-id="placeholder-recipes"]')).toHaveAttribute("data-workflow-node-placeholder", "true");

        calendarOnlyRender.unmount();

        const calendarAndSearchRender = render(<CortexWorkflowCreationMockup mode="static" previewActiveGraphNodeId="recipes" />);

        expect(calendarAndSearchRender.container.querySelector('[data-workflow-node-id="tool-calendar"]')).toHaveAttribute("data-workflow-node-stack-position", "first");
        expect(calendarAndSearchRender.container.querySelector('[data-workflow-node-id="tool-web-search"]')).toHaveAttribute("data-workflow-node-stack-position", "last");
        expect(calendarAndSearchRender.container.querySelector('[data-workflow-node-id="placeholder-cart"]')).toHaveAttribute("data-workflow-node-placeholder", "true");

        calendarAndSearchRender.unmount();
    });

    it("storyboards permission before live workflow creation and final confirmation", () => {
        vi.useFakeTimers();
        const { container } = render(<CortexWorkflowCreationMockup />);
        const layout = container.querySelector('[data-cortex-workflow-creation-layout="home-chat"]');
        const workflowFitThinkingDurationMs = cortexWorkflowCreationScript.workflowFitThinking.steps.reduce((totalMs, step) => totalMs + step.durationMs, 0);
        const workflowFitThinkingDurationSeconds = Math.floor(workflowFitThinkingDurationMs / 1_000);
        const scheduleThinkingStreamDurationMs = Math.ceil(cortexWorkflowCreationScript.steps[0].thinking.length / 2) * 18;
        const scheduleToolCallDurationMs = cortexWorkflowCreationScript.steps[0].toolCalls.reduce((totalMs, toolCall) => totalMs + toolCall.durationMs, 0);
        const agentThinkingStreamDurationMs = Math.ceil(cortexWorkflowCreationScript.steps[1].thinking.length / 2) * 18;

        expect(layout).toHaveAttribute("data-cortex-workflow-creation-mode", "storyboard");
        expect(layout).toHaveAttribute("data-cortex-workflow-fit-thinking-visible", "false");
        expect(layout).toHaveAttribute("data-cortex-workflow-permission-visible", "false");
        expect(layout).toHaveAttribute("data-cortex-workflow-permission-approved", "false");
        expect(layout).toHaveAttribute("data-cortex-workflow-thinking-visible", "false");
        expect(layout).toHaveAttribute("data-cortex-workflow-proposal-visible", "false");
        expect(container.querySelector('[data-cortex-thinking-card="true"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-running-workflow-group="true"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-chat-message="user"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-homepage-chat-composer-value]')).toHaveAttribute("data-homepage-chat-composer-value", "");
        expect(container.querySelector('[data-homepage-chat-send-ready]')).toHaveAttribute("data-homepage-chat-send-ready", "false");

        act(() => {
            vi.advanceTimersByTime(cortexWorkflowCreationScript.typingIntervalMs);
        });

        expect(container.querySelector('[data-homepage-chat-composer-value]')).toHaveAttribute("data-homepage-chat-composer-value", "I");

        for (let index = 1; index < cortexWorkflowCreationScript.userMessage.length; index += 1) {
            act(() => {
                vi.advanceTimersByTime(cortexWorkflowCreationScript.typingIntervalMs);
            });
        }

        expect(layout).toHaveAttribute("data-cortex-workflow-storyboard-stage", "ready");
        expect(container.querySelector('[data-homepage-chat-composer-value]')).toHaveAttribute("data-homepage-chat-composer-value", cortexWorkflowCreationScript.userMessage);
        expect(container.querySelector('[data-homepage-chat-send-ready]')).toHaveAttribute("data-homepage-chat-send-ready", "true");
        expect(container.querySelector('[data-chat-message="user"]')).not.toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(cortexWorkflowCreationScript.autoSendDelayMs);
        });

        expect(layout).toHaveAttribute("data-cortex-workflow-storyboard-stage", "connecting");
        expect(screen.getByText(cortexWorkflowCreationScript.userMessage)).toBeVisible();
        expect(container.querySelector('[data-chat-message="user"]')).toBeInTheDocument();
        expect(container.querySelector('[data-homepage-chat-composer-value]')).toHaveAttribute("data-homepage-chat-composer-value", "");
        expect(container.querySelector('[data-homepage-chat-send-ready]')).toHaveAttribute("data-homepage-chat-send-ready", "false");
        expect(screen.getByLabelText("Nue is typing")).toBeVisible();
        expect(container.querySelector('[data-cortex-workflow-lead-stream="true"]')).not.toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(cortexWorkflowCreationScript.socketConnectDelayMs);
        });

        expect(layout).toHaveAttribute("data-cortex-workflow-storyboard-stage", "responding");
        expect(container.querySelector('[data-homepage-chat-typing="assistant"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-cortex-workflow-lead-stream="true"]')).not.toBeInTheDocument();
        expect(layout).toHaveAttribute("data-cortex-workflow-fit-thinking-visible", "false");
        expect(layout).toHaveAttribute("data-cortex-workflow-permission-visible", "false");
        expect(container.querySelector('[data-cortex-workflow-permission-card="true"]')).not.toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(cortexWorkflowCreationScript.workflowFitThinkingRevealDelayMs);
        });

        expect(layout).toHaveAttribute("data-cortex-workflow-fit-thinking-visible", "true");
        expect(layout).toHaveAttribute("data-cortex-workflow-permission-visible", "false");
        expect(container.querySelector('[data-cortex-fit-thinking-card="true"]')).toBeInTheDocument();
        expect(screen.getByText("Thinking for 0 seconds")).toBeVisible();
        expect(container.querySelector('[data-cortex-fit-thinking-step="recurrence"]')).toHaveAttribute("data-cortex-fit-thinking-step-active", "true");
        expect(container.querySelector('[data-cortex-thinking-stream="fit-recurrence"]')).toHaveTextContent("");

        act(() => {
            vi.advanceTimersByTime(100);
        });

        expect(screen.getByText("Thinking for 0 seconds")).toBeVisible();

        act(() => {
            vi.advanceTimersByTime(240);
        });

        const streamedFitThinking = container.querySelector('[data-cortex-thinking-stream="fit-recurrence"]')?.textContent ?? "";
        expect(streamedFitThinking.length).toBeGreaterThan(0);
        expect(cortexWorkflowCreationScript.workflowFitThinking.steps[0].text.startsWith(streamedFitThinking)).toBe(true);

        act(() => {
            vi.advanceTimersByTime(workflowFitThinkingDurationMs - 240);
        });

        expect(screen.getByText(`Thought for ${workflowFitThinkingDurationSeconds} seconds`)).toBeVisible();
        expect(container.querySelector('[data-cortex-workflow-lead-stream="true"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-cortex-fit-thinking-card="true"] [data-homepage-chat-working-accordion="open"]')).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(cortexWorkflowCreationScript.thinkingCollapseDelayMs);
        });

        expect(container.querySelector('[data-cortex-fit-thinking-card="true"] [data-homepage-chat-working-accordion="closed"]')).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(cortexWorkflowCreationScript.assistantLeadStreamIntervalMs);
        });

        const streamedLead = container.querySelector('[data-cortex-workflow-lead-stream="true"]')?.textContent ?? "";
        expect(streamedLead.length).toBeGreaterThan(0);
        expect(cortexWorkflowCreationScript.assistantLead.startsWith(streamedLead)).toBe(true);
        expect(streamedLead).not.toBe(cortexWorkflowCreationScript.assistantLead);

        const assistantLeadTickCount = Math.ceil(cortexWorkflowCreationScript.assistantLead.length / 2);

        for (let index = 1; index < assistantLeadTickCount; index += 1) {
            act(() => {
                vi.advanceTimersByTime(cortexWorkflowCreationScript.assistantLeadStreamIntervalMs);
            });
        }

        expect(container.querySelector('[data-cortex-workflow-lead-stream="true"]')).toHaveTextContent(cortexWorkflowCreationScript.assistantLead);

        act(() => {
            vi.advanceTimersByTime(cortexWorkflowCreationScript.permissionPromptDelayMs);
        });

        expect(layout).toHaveAttribute("data-cortex-workflow-permission-visible", "true");
        expect(layout).toHaveAttribute("data-cortex-workflow-permission-approved", "false");
        expect(layout).toHaveAttribute("data-cortex-workflow-permission-action", "idle");
        expect(layout).toHaveAttribute("data-cortex-workflow-active-node", "idle");
        expect(container.querySelector('[data-workflow-node-placeholder="true"]')).toHaveAttribute("data-workflow-node-id", "placeholder-schedule");
        expect(container.querySelector('[data-workflow-node-placeholder-size="node"]')).toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-id="trigger"]')).not.toBeInTheDocument();
        expect(screen.getByText(`Thought for ${workflowFitThinkingDurationSeconds} seconds`)).toBeVisible();
        expect(container.querySelector('[data-cortex-workflow-permission-card="true"]')).toBeInTheDocument();
        expect(screen.getByText(cortexWorkflowCreationScript.permissionPrompt.body)).toBeVisible();
        expect(screen.getByRole("button", { name: cortexWorkflowCreationScript.permissionPrompt.selectedAction })).toHaveAttribute("data-cortex-permission-action-state", "idle");
        expect(container.querySelector('[data-cortex-authoring-tool-calls]')).not.toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(cortexWorkflowCreationScript.permissionSelectionDelayMs - 1);
        });

        expect(layout).toHaveAttribute("data-cortex-workflow-permission-approved", "false");
        expect(layout).toHaveAttribute("data-cortex-workflow-permission-action", "idle");
        expect(layout).toHaveAttribute("data-cortex-workflow-active-node", "idle");
        expect(container.querySelector('[data-cortex-authoring-tool-calls]')).not.toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(1);
        });

        expect(layout).toHaveAttribute("data-cortex-workflow-permission-approved", "false");
        expect(layout).toHaveAttribute("data-cortex-workflow-permission-action", "pressed");
        expect(layout).toHaveAttribute("data-cortex-workflow-active-node", "idle");
        expect(screen.getByRole("button", { name: cortexWorkflowCreationScript.permissionPrompt.selectedAction })).toHaveAttribute("data-cortex-permission-action-state", "pressed");
        expect(container.querySelector('[data-cortex-authoring-tool-calls]')).not.toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(cortexWorkflowCreationScript.permissionSelectionClickHoldMs - 1);
        });

        expect(layout).toHaveAttribute("data-cortex-workflow-permission-approved", "false");
        expect(layout).toHaveAttribute("data-cortex-workflow-permission-action", "pressed");
        expect(layout).toHaveAttribute("data-cortex-workflow-active-node", "idle");

        act(() => {
            vi.advanceTimersByTime(1);
        });

        expect(layout).toHaveAttribute("data-cortex-workflow-permission-approved", "true");
        expect(layout).toHaveAttribute("data-cortex-workflow-permission-action", "idle");
        const userMessages = container.querySelectorAll('[data-chat-message="user"]');
        expect(userMessages).toHaveLength(1);
        expect(userMessages[0]).toHaveTextContent(cortexWorkflowCreationScript.userMessage);
        expect(layout).toHaveAttribute("data-cortex-workflow-thinking-visible", "false");
        expect(layout).toHaveAttribute("data-cortex-workflow-active-node", "idle");

        act(() => {
            vi.advanceTimersByTime(cortexWorkflowCreationScript.authoringStartDelayMs);
        });

        expect(layout).toHaveAttribute("data-cortex-workflow-thinking-visible", "true");
        expect(layout).toHaveAttribute("data-cortex-workflow-active-node", "idle");
        expect(container.querySelector('[data-workflow-node-placeholder="true"]')).toHaveAttribute("data-workflow-node-id", "placeholder-schedule");
        expect(container.querySelector('[data-cortex-thinking-card="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-running-workflow-group="true"]')).not.toBeInTheDocument();
        expect(screen.getByText("Creating workflow")).toBeVisible();
        expect(container.querySelector('[data-cortex-thinking-step="schedule"]')).toHaveAttribute("data-cortex-thinking-step-active", "true");
        expect(container.querySelector('[data-cortex-thinking-stream="schedule"]')).toHaveTextContent("");
        expect(container.querySelector('[data-cortex-authoring-tool-calls="schedule"]')).not.toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(240);
        });

        const streamedThinking = container.querySelector('[data-cortex-thinking-stream="schedule"]')?.textContent ?? "";
        expect(streamedThinking.length).toBeGreaterThan(0);
        expect(cortexWorkflowCreationScript.steps[0].thinking.startsWith(streamedThinking)).toBe(true);
        expect(container.querySelector('[data-cortex-authoring-tool-calls="schedule"]')).not.toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(scheduleThinkingStreamDurationMs - 240);
        });

        expect(container.querySelector('[data-cortex-authoring-tool-calls="schedule"]')).not.toBeInTheDocument();
        expect(layout).toHaveAttribute("data-cortex-workflow-active-node", "idle");

        act(() => {
            vi.advanceTimersByTime(cortexWorkflowCreationScript.workflowToolCallRevealDelayMs);
        });

        const scheduleToolCallGroup = container.querySelector('[data-cortex-authoring-tool-calls="schedule"] [data-tool-call-group="true"]');
        expect(layout).toHaveAttribute("data-cortex-workflow-active-node", "schedule");
        expect(container.querySelector('[data-workflow-node-id="trigger"]')).toHaveAttribute("data-workflow-node-status", "queued");
        expect(container.querySelector('[data-workflow-node-id="placeholder-agent"]')).toHaveAttribute("data-workflow-node-placeholder", "true");
        expect(container.querySelector('[data-workflow-node-id="placeholder-agent"]')).toHaveAttribute("data-workflow-node-placeholder-size", "node");
        expect(container.querySelector('[data-workflow-node-id="meal-prep-agent"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-workflow-connector="schedule-to-meal-prep"]')).toHaveAttribute("data-workflow-connector-active", "false");
        expect(container.querySelector('[data-cortex-authoring-tool-calls="schedule"]')).toHaveTextContent("workflow.createNode");
        expect(container.querySelector('[data-cortex-authoring-tool-calls="schedule"]')).toHaveTextContent("workflow.lint()");
        expect(scheduleToolCallGroup).toHaveAttribute("data-tool-call-state", "running");
        expect(scheduleToolCallGroup).not.toHaveAttribute("open");

        act(() => {
            vi.advanceTimersByTime(scheduleToolCallDurationMs + cortexWorkflowCreationScript.workflowStepHoldMs);
        });

        expect(container.querySelector('[data-cortex-thinking-step="agent"]')).toHaveAttribute("data-cortex-thinking-step-active", "true");
        expect(layout).toHaveAttribute("data-cortex-workflow-active-node", "schedule");
        expect(container.querySelector('[data-workflow-node-id="trigger"]')).toHaveAttribute("data-workflow-node-status", "queued");
        expect(container.querySelector('[data-workflow-node-id="placeholder-agent"]')).toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-id="meal-prep-agent"]')).not.toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(agentThinkingStreamDurationMs + cortexWorkflowCreationScript.workflowToolCallRevealDelayMs);
        });

        expect(layout).toHaveAttribute("data-cortex-workflow-active-node", "agent");
        expect(container.querySelector('[data-workflow-node-id="trigger"]')).toHaveAttribute("data-workflow-node-status", "done");
        expect(container.querySelector('[data-workflow-node-id="meal-prep-agent"]')).toHaveAttribute("data-workflow-node-status", "queued");
        expect(container.querySelector('[data-workflow-node-id="meal-prep-agent"]')).toHaveTextContent("Agent");
        expect(container.querySelector('[data-workflow-node-id="meal-prep-agent"]')).toHaveTextContent(mealPrepWorkflowNodeCopy.mealPrepAgentDirective);
        expect(container.querySelector('[data-workflow-node-id="meal-prep-agent"] [data-workflow-node-port-chip="Memory"]')).toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-id="meal-prep-agent"] [data-workflow-node-port-chip="Tool"]')).toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-id="placeholder-memory-port"]')).toHaveAttribute("data-workflow-node-placeholder", "true");
        expect(container.querySelector('[data-workflow-node-id="placeholder-memory-port"]')).toHaveAttribute("data-workflow-node-placeholder-size", "subnode");
        expect(container.querySelector('[data-workflow-node-id="placeholder-tool-port"]')).toHaveAttribute("data-workflow-node-placeholder", "true");
        expect(container.querySelector('[data-workflow-node-id="placeholder-tool-port"]')).toHaveAttribute("data-workflow-node-placeholder-size", "subnode");
        expect(container.querySelector('[data-workflow-node-id="placeholder-approval"]')).toHaveAttribute("data-workflow-node-placeholder", "true");
        expect(container.querySelector('[data-workflow-node-id="placeholder-approval"]')).toHaveAttribute("data-workflow-node-placeholder-size", "node");
        expect(container.querySelector('[data-workflow-node-id="placeholder-checkout"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-workflow-connector="schedule-to-meal-prep"]')).toHaveAttribute("data-workflow-connector-active", "false");
        expect(container.querySelector('[data-workflow-connector="meal-prep-to-approval"]')).toHaveStyle({ width: "58px" });
        expect(container.querySelector('[data-workflow-connector="schedule-to-meal-prep"]')).toHaveStyle({ width: "58px" });
        expect(container.querySelector('[data-workflow-node-id="tool-memories"]')).not.toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(30_000);
        });

        expect(layout).toHaveAttribute("data-cortex-workflow-proposal-visible", "true");
        expect(container.querySelector('[data-cortex-workflow-active-node="save"]')).toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-id="checkout-agent"]')).toHaveAttribute("data-workflow-node-status", "done");
        expect(container.querySelector('[data-workflow-node-id="checkout-agent"]')).toHaveTextContent(mealPrepWorkflowNodeCopy.checkoutAgentDirective);
        expect(container.querySelector('[data-workflow-node-id="placeholder-primary-next"]')).toHaveAttribute("data-workflow-node-placeholder", "true");
        expect(container.querySelector('[data-workflow-node-id="placeholder-primary-next"]')).toHaveAttribute("data-workflow-node-placeholder-size", "node");
        expect(container.querySelector('[data-workflow-node-id="tool-uber-checkout"]')).toHaveAttribute("data-workflow-node-status", "done");
        expectWorkflowNodeBadges(container, "tool-uber-checkout", mealPrepWorkflowNodeCopy.checkoutToolBadges);
        expect(container.querySelector('[data-workflow-node-id="placeholder-memory-port"]')).toHaveAttribute("data-workflow-node-placeholder", "true");
        expect(container.querySelector('[data-workflow-node-id="placeholder-memory-next"]')).toHaveAttribute("data-workflow-node-placeholder", "true");
        expect(container.querySelector('[data-workflow-node-id="placeholder-memory-next"]')?.closest('[data-workflow-node-stack="meal-prep-memory"]')).toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-id="placeholder-memory-next"]')).not.toHaveStyle({ top: "316.5px" });
        expect(container.querySelector('[data-workflow-node-id="placeholder-tool-next"]')).toHaveAttribute("data-workflow-node-placeholder", "true");
        expect(container.querySelector('[data-workflow-node-id="checkout-agent"] [data-workflow-node-port-chip="Memory"]')).toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-id="checkout-agent"] [data-workflow-node-port-chip="Tool"]')).toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-id="placeholder-checkout-memory-port"]')).toHaveAttribute("data-workflow-node-placeholder", "true");
        expect(container.querySelector('[data-workflow-node-id="placeholder-checkout-tool-port"]')).toHaveAttribute("data-workflow-node-placeholder", "true");
        expect(container.querySelector('[data-workflow-connector="checkout-to-uber-checkout"]')).toHaveAttribute("data-workflow-connector-active", "false");
        expect(container.querySelector('[data-workflow-connector="checkout-to-uber-checkout"]')).toHaveStyle({ width: "25px" });
        expect(container.querySelector('[data-workflow-connector="checkout-to-next-placeholder"]')).toHaveAttribute("data-workflow-connector-active", "false");
        expect(container.querySelector('[data-workflow-connector="approval-to-checkout"]')).toHaveStyle({ width: "58px" });
        expect(container.querySelector('[data-workflow-connector="checkout-to-next-placeholder"]')).toHaveStyle({ width: "58px" });
        expect(container.querySelectorAll('[data-cortex-authoring-tool-calls] [data-tool-call="Workflow Linter"]')).toHaveLength(cortexWorkflowCreationScript.steps.length);
        expect(screen.getByText(cortexWorkflowCreationScript.assistantProposal)).toBeVisible();
        expect(screen.getAllByText("Workflow created").length).toBeGreaterThan(0);
        expect(screen.getByText("Edit workflow")).toBeVisible();
        expect(screen.getByText("Delete workflow")).toBeVisible();
    });

    it("starts creating immediately when the Create workflow button is clicked", () => {
        vi.useFakeTimers();
        const { container } = render(<CortexWorkflowCreationMockup />);
        const layout = container.querySelector('[data-cortex-workflow-creation-layout="home-chat"]');
        const workflowFitThinkingDurationMs = cortexWorkflowCreationScript.workflowFitThinking.steps.reduce((totalMs, step) => totalMs + step.durationMs, 0);

        for (let index = 0; index < cortexWorkflowCreationScript.userMessage.length; index += 1) {
            act(() => {
                vi.advanceTimersByTime(cortexWorkflowCreationScript.typingIntervalMs);
            });
        }

        act(() => {
            vi.advanceTimersByTime(cortexWorkflowCreationScript.autoSendDelayMs);
        });

        act(() => {
            vi.advanceTimersByTime(cortexWorkflowCreationScript.socketConnectDelayMs);
        });

        act(() => {
            vi.advanceTimersByTime(cortexWorkflowCreationScript.workflowFitThinkingRevealDelayMs + workflowFitThinkingDurationMs + cortexWorkflowCreationScript.thinkingCollapseDelayMs);
        });

        const assistantLeadTickCount = Math.ceil(cortexWorkflowCreationScript.assistantLead.length / 2);

        for (let index = 0; index < assistantLeadTickCount; index += 1) {
            act(() => {
                vi.advanceTimersByTime(cortexWorkflowCreationScript.assistantLeadStreamIntervalMs);
            });
        }

        act(() => {
            vi.advanceTimersByTime(cortexWorkflowCreationScript.permissionPromptDelayMs);
        });

        expect(layout).toHaveAttribute("data-cortex-workflow-permission-visible", "true");
        expect(layout).toHaveAttribute("data-cortex-workflow-permission-approved", "false");
        expect(layout).toHaveAttribute("data-cortex-workflow-active-node", "idle");

        fireEvent.click(screen.getByRole("button", { name: cortexWorkflowCreationScript.permissionPrompt.selectedAction }));

        expect(layout).toHaveAttribute("data-cortex-workflow-permission-approved", "true");
        expect(container.querySelectorAll('[data-chat-message="user"]')).toHaveLength(1);

        act(() => {
            vi.advanceTimersByTime(cortexWorkflowCreationScript.authoringStartDelayMs);
        });

        expect(layout).toHaveAttribute("data-cortex-workflow-thinking-visible", "true");
        expect(layout).toHaveAttribute("data-cortex-workflow-active-node", "idle");
    });

    it("keeps the creation transcript pinned while authoring text streams and tool calls appear", async () => {
        vi.useFakeTimers();
        const originalScrollToDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scrollTo");
        const scrollTo = vi.fn();

        Object.defineProperty(HTMLElement.prototype, "scrollTo", {
            configurable: true,
            value: scrollTo
        });

        try {
            const { container } = render(<CortexWorkflowCreationMockup />);
            const firstStep = cortexWorkflowCreationScript.steps[0];
            const firstStepThinkingStreamDurationMs = Math.ceil(firstStep.thinking.length / 2) * 18;

            advanceCortexWorkflowCreationToPermissionPrompt();

            fireEvent.click(screen.getByRole("button", { name: cortexWorkflowCreationScript.permissionPrompt.selectedAction }));

            act(() => {
                vi.advanceTimersByTime(cortexWorkflowCreationScript.authoringStartDelayMs);
            });

            act(() => {
                vi.advanceTimersByTime(16);
            });

            expect(container.querySelector('[data-cortex-workflow-transcript-content="true"]')).toBeInTheDocument();
            expect(container.querySelector('[data-cortex-thinking-stream="schedule"]')).toBeInTheDocument();

            scrollTo.mockClear();

            act(() => {
                vi.advanceTimersByTime(18);
            });

            await act(async () => {
                await Promise.resolve();
            });

            act(() => {
                vi.advanceTimersByTime(16);
            });

            expect(scrollTo).toHaveBeenCalled();

            scrollTo.mockClear();

            act(() => {
                vi.advanceTimersByTime(firstStepThinkingStreamDurationMs - 18 + cortexWorkflowCreationScript.workflowToolCallRevealDelayMs);
            });

            await act(async () => {
                await Promise.resolve();
            });

            act(() => {
                vi.advanceTimersByTime(16);
            });

            expect(container.querySelector('[data-cortex-authoring-tool-calls="schedule"]')).toBeInTheDocument();
            expect(scrollTo).toHaveBeenCalled();
        } finally {
            if (originalScrollToDescriptor) {
                Object.defineProperty(HTMLElement.prototype, "scrollTo", originalScrollToDescriptor);
            } else {
                delete (HTMLElement.prototype as { scrollTo?: unknown }).scrollTo;
            }
        }
    });

});

describe("SavedWorkflowRunWireframeMockup", () => {
    it("formats the iPhone status time from the user's local clock", () => {
        expect(formatCompanionStatusTime(new Date(2026, 4, 24, 15, 7, 20))).toMatch(/^(3|03|15)\D07$/);
    });

    it("frames the completed saved workflow order state in the no-chrome homepage chat layout", () => {
        const { container } = render(<SavedWorkflowRunWireframeMockup mode="static" />);
        const finalFrame = savedWorkflowStoryboardFrames[savedWorkflowStoryboardFrames.length - 1];

        expect(screen.getByRole("article", { name: /saved workflow run wireframe mockup/i })).toBeVisible();
        expect(container.querySelector('[data-saved-workflow-layout="home-chat"]')).toBeInTheDocument();
        expect(container.querySelector('[data-saved-workflow-mode="static"]')).toBeInTheDocument();
        expect(container.querySelector('[data-saved-workflow-approval-visible="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-saved-workflow-approval-status="approved"]')).toBeInTheDocument();
        expect(container.querySelector('[data-saved-workflow-completion-visible="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-saved-workflow-final-visible="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-saved-workflow-area="messages"]')).toBeInTheDocument();
        expect(screen.queryByLabelText("Agent navigation")).not.toBeInTheDocument();
        expect(screen.getByLabelText("Chat welcome panel")).toBeVisible();
        expect(screen.getByLabelText("Companion app conversation")).toBeVisible();
        expect(screen.getByLabelText("Unfocused workflow run graph")).toBeVisible();
        expect(container.querySelector('[data-saved-workflow-layout="home-chat"]')).toHaveClass("nous-workflow-component-fade");
        expect(container.querySelector('[data-saved-workflow-background="true"]')).not.toHaveClass("nous-workflow-unfocused-mask");
        expect(screen.queryByText("UNFOCUSED WORKFLOW EDITOR")).not.toBeInTheDocument();
        expect(container.querySelector('[data-running-workflow-elapsed="true"]')).toHaveTextContent("0:44");
        expect(container.querySelector('[data-running-workflow-step-duration="true"]')).toHaveTextContent("0.4s");
        expect(screen.getByText(savedWorkflowStoryboardScript.introMessage)).toBeVisible();
        expect(container.querySelector('[data-companion-intro-prose="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-chat-assistant-response-flow="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-chat-working-panel="true"]')).not.toBeInTheDocument();
        expect(screen.queryByText("Workflow ran for 4s")).not.toBeInTheDocument();
        expect(screen.queryByText(/You’re out Tuesday evening/)).not.toBeInTheDocument();
        expect(screen.getAllByText("Sunday Meal Prep workflow").length).toBeGreaterThan(0);
        expect(screen.queryByText("Waiting for checkout approval")).not.toBeInTheDocument();
        expect(screen.queryByText(savedWorkflowStoryboardScript.approvalMessage)).not.toBeInTheDocument();
        expect(screen.getByText(savedWorkflowStoryboardScript.finalMessage)).toBeVisible();
        expect(screen.queryByText("Ran 3 tools · 4s")).not.toBeInTheDocument();
        expect(screen.queryByText(/approval needed/i)).not.toBeInTheDocument();
        expect(screen.queryByText("Approve checkout")).not.toBeInTheDocument();
        expect(container.querySelector('[data-approval-card-status="approved"]')).toBeInTheDocument();
        expect(screen.getAllByText("Checkout approved").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Approved").length).toBeGreaterThan(0);
        expect(screen.getAllByText(/order complete/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText("Delivery today · 4–5 PM").length).toBeGreaterThan(0);
        expect(screen.getByRole("link", { name: "View this week’s recipes" })).toHaveAttribute("href", "#weekly-recipes");
        expect(screen.getByText("Ask about recipes, delivery, or next Sunday’s workflow…")).toBeVisible();
        expectComposerControlsUseHomepageButtons(container, "Send saved workflow message", false);
        expect(screen.queryByText("Approve checkout, ask for changes, or edit cart…")).not.toBeInTheDocument();
        expect(screen.queryByLabelText("Saved workflow sections")).not.toBeInTheDocument();
        expect(screen.getAllByText(/Sunday Meal Prep/).length).toBeGreaterThan(0);
        expect(container.querySelector('[data-running-workflow-elapsed="true"]')).toHaveTextContent(/^\d+:\d{2}$/);
        expect(screen.queryByText("Workspaces")).not.toBeInTheDocument();
        expect(container.querySelector('[data-companion-iphone-frame="true"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-tool-call-group="true"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-companion-tool-calls="true"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-running-workflow-group="true"]')).toHaveAttribute("data-running-workflow-current-subagent", "Workflow complete");
        expect(container.querySelector('[data-running-workflow-group="true"]')).toHaveAttribute("data-running-workflow-current-action", "Order complete and recipes ready");
        expect(container.querySelector('[data-running-workflow-group="true"]')).toHaveAttribute("data-running-workflow-current-thinking", finalFrame.thinking);
        expect(container.querySelector('[data-running-workflow-state="complete"]')).toBeInTheDocument();
        expect(container.querySelector('[data-running-workflow-step]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-running-workflow-thinking-window="true"]')).toHaveStyle({ height: "calc(0.625rem * 1.35 * 3)" });
        expect(container.querySelector('[data-running-workflow-thinking="true"]')).toHaveTextContent(finalFrame.thinking);
        expect(container.querySelector('[data-order-complete-card="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-companion-app-surface="helper"]')).toBeInTheDocument();

        expect(screen.queryByRole("tab", { name: /helper app/i })).not.toBeInTheDocument();
        expect(screen.queryByRole("tab", { name: /third-party app/i })).not.toBeInTheDocument();
        expect(container.querySelector('[data-companion-app-surface="telegram"]')).not.toBeInTheDocument();
        expect(screen.queryByText("Nue bot · Sunday Meal Prep")).not.toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-status="active"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-id="checkout-agent"]')).toHaveAttribute("data-workflow-node-status", "complete");
        expect(container.querySelector('[data-workflow-node-id="checkout-agent"]')).toHaveTextContent("Agent");
        expect(container.querySelector('[data-workflow-node-id="checkout-agent"]')).toHaveTextContent("Order confirmed");
        expect(container.querySelector('[data-workflow-node-id="checkout-agent"] [data-workflow-node-done-check="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-id="meal-prep-agent"]')).toHaveTextContent(mealPrepWorkflowNodeCopy.mealPrepAgentDirective);
        expect(container.querySelector('[data-workflow-node-id="workflow-complete"]')).not.toBeInTheDocument();
        expect(container.querySelectorAll('[data-workflow-node-status="done"]').length).toBeGreaterThan(0);
        const triggerNode = container.querySelector('[data-workflow-node-id="trigger"]') as HTMLElement;
        const approvalNode = container.querySelector('[data-workflow-node-id="approval-gate"]') as HTMLElement;

        expect(triggerNode).toHaveAttribute("data-workflow-node-shape", "event");
        expect(triggerNode.style.width).toBe("76px");
        expect(triggerNode.style.height).toBe("76px");
        expect(triggerNode.querySelector('[data-workflow-node-detail="true"]')).toHaveTextContent("Run Sunday · 9:00 AM");
        expect(triggerNode.querySelector('[data-workflow-node-done-check="true"]')).toBeInTheDocument();
        expect(approvalNode).toHaveAttribute("data-workflow-node-shape", "gate");
        expect(approvalNode.style.width).toBe("76px");
        expect(approvalNode.style.height).toBe("76px");
        expect(approvalNode.querySelector('[data-workflow-node-done-check="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-id="approval-gate"]')).toHaveTextContent(mealPrepWorkflowNodeCopy.checkoutApproval);
        expect(container.querySelector('[data-workflow-node-icon="true"]')).not.toBeInTheDocument();
        const memoryNode = container.querySelector('[data-workflow-node-id="tool-memories"]') as HTMLElement;
        const toolCalendarNode = container.querySelector('[data-workflow-node-id="tool-calendar"]') as HTMLElement;
        const toolCheckoutNode = container.querySelector('[data-workflow-node-id="tool-uber-checkout"]') as HTMLElement;

        expect(container.querySelector('[data-workflow-node-stack="meal-prep-tools"]')).toBeInTheDocument();
        expect(memoryNode.style.height).toBe("");
        expect(memoryNode.style.minHeight).toBe("");
        expect(toolCalendarNode.style.height).toBe("");
        expect(toolCalendarNode.style.minHeight).toBe("");
        expect(toolCheckoutNode.style.height).toBe("");
        expect(toolCheckoutNode.style.minHeight).toBe("");
        expect(toolCalendarNode).toHaveAttribute("data-workflow-node-status", "done");
        expect(toolCalendarNode.querySelector('[data-workflow-node-done-check="true"]')).toBeInTheDocument();
        expect(toolCalendarNode).toHaveTextContent("Calendar");
        expectWorkflowNodeBadges(container, "tool-memories", mealPrepWorkflowNodeCopy.memoryBadges);
        expectWorkflowNodeBadges(container, "tool-calendar", mealPrepWorkflowNodeCopy.scheduleToolBadges);
        expectWorkflowNodeBadges(container, "tool-web-search", mealPrepWorkflowNodeCopy.recipeToolBadges);
        expectWorkflowNodeBadges(container, "tool-uber-cart", mealPrepWorkflowNodeCopy.groceryToolBadges);
        expect(toolCalendarNode).toHaveAttribute("data-workflow-node-stack-id", "meal-prep-tools");
        expect(toolCalendarNode).toHaveAttribute("data-workflow-node-stack-position", "first");
        expect(container.querySelector('[data-workflow-node-id="tool-web-search"]')).toHaveAttribute("data-workflow-node-stack-position", "middle");
        expect(container.querySelector('[data-workflow-node-id="tool-uber-cart"]')).toHaveAttribute("data-workflow-node-stack-position", "last");
        expect(toolCheckoutNode).toHaveAttribute("data-workflow-node-status", "done");
        expect(toolCheckoutNode.querySelector('[data-workflow-node-done-check="true"]')).toBeInTheDocument();
        expect(toolCheckoutNode).toHaveTextContent("Uber Eats");
        expectWorkflowNodeBadges(container, "tool-uber-checkout", mealPrepWorkflowNodeCopy.checkoutToolBadges);
        expect(container.querySelector('[data-workflow-connector="meal-prep-to-calendar"]')).toHaveAttribute("data-workflow-connector-kind", "path");
        expect(container.querySelector('[data-workflow-connector="meal-prep-to-calendar"]')).toHaveAttribute("data-workflow-connector-variant", "tool");
        expect(container.querySelector('[data-workflow-connector="meal-prep-to-calendar"]')).toHaveAttribute("data-workflow-connector-bidirectional", "true");
        expect(container.querySelector('[data-workflow-connector="meal-prep-to-memories"]')).toHaveAttribute("data-workflow-connector-bidirectional", "true");
        expect(container.querySelector('[data-workflow-node-id="meal-prep-agent"] [data-workflow-node-port-chip="Memory"]')).toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-id="meal-prep-agent"] [data-workflow-node-port-chip="Tool"]')).toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-id="checkout-agent"] [data-workflow-node-port-chip="Memory"]')).toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-id="checkout-agent"] [data-workflow-node-port-chip="Tool"]')).toBeInTheDocument();
        expect(container.querySelector('[data-workflow-connector="checkout-to-memory-empty"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-workflow-connector="checkout-to-uber-checkout"]')).toHaveAttribute("data-workflow-connector-bidirectional", "true");
        expect(container.querySelector('[data-workflow-connector="checkout-to-uber-checkout"]')).toHaveStyle({ width: "25px" });
        expect(container.querySelector('[data-workflow-connector="meal-prep-to-web-search"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-workflow-connector="meal-prep-to-uber-cart"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-workflow-connector-chip="Tool"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-workflow-connector-chip="Memory"]')).not.toBeInTheDocument();
        expect(container.querySelectorAll("[data-workflow-connector-chip]")).toHaveLength(0);
        expect(container.querySelector('[data-workflow-connector="approval-to-checkout"]')).toHaveAttribute("data-workflow-connector-active", "true");
        expect(container.querySelector('[data-workflow-connector="approval-to-checkout"]')).toHaveAttribute("data-workflow-connector-bidirectional", "false");
        expect(container.querySelector('[data-workflow-connector="approval-to-checkout"]')).toHaveAttribute("data-workflow-connector-kind", "path");
        expect(container.querySelector('[data-workflow-connector="approval-to-checkout"]')).toHaveAttribute("data-workflow-connector-terminal", "true");
        expect(screen.getAllByText("Memory").length).toBeGreaterThan(0);
    });

    it("storyboards the workflow card through subagent actions and syncs the background graph", () => {
        vi.useFakeTimers();
        const { container } = render(<SavedWorkflowRunWireframeMockup />);
        const layout = container.querySelector('[data-saved-workflow-layout="home-chat"]');

        expect(layout).toHaveAttribute("data-saved-workflow-mode", "storyboard");
        expect(layout).toHaveAttribute("data-saved-workflow-card-visible", "false");
        expect(layout).toHaveAttribute("data-saved-workflow-approval-status", "hidden");
        expect(layout).toHaveAttribute("data-saved-workflow-final-visible", "false");

        expect(container.querySelector('[data-running-workflow-group="true"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-status="active"]')).toHaveTextContent("Trigger");

        act(() => {
            vi.advanceTimersByTime(1_200);
        });

        expect(screen.getByText(savedWorkflowStoryboardScript.introMessage)).toBeVisible();
        expect(layout).toHaveAttribute("data-saved-workflow-card-visible", "false");

        act(() => {
            vi.advanceTimersByTime(savedWorkflowStoryboardScript.workflowCardRevealDelayMs - 1_200);
        });

        const workflowCard = container.querySelector('[data-running-workflow-group="true"]');
        const firstFrame = savedWorkflowStoryboardFrames[0];
        expect(layout).toHaveAttribute("data-saved-workflow-card-visible", "true");
        expect(workflowCard).toHaveAttribute("data-running-workflow-current-subagent", "Check memories");
        expect(workflowCard).toHaveAttribute("data-running-workflow-current-action", "Checking memories");
        expect(container.querySelector('[data-running-workflow-elapsed="true"]')).toHaveTextContent("0:00");
        expect(container.querySelector('[data-running-workflow-step-duration="true"]')).toHaveTextContent("1.3s");
        expect(container.querySelector('[data-running-workflow-step-duration="true"]')).not.toHaveTextContent("2s");
        expect(container.querySelector('[data-workflow-node-id="meal-prep-agent"]')).toHaveAttribute("data-workflow-node-status", "active");
        expect(container.querySelector('[data-workflow-node-id="tool-memories"]')).toHaveAttribute("data-workflow-node-status", "active");

        expect(container.querySelector('[data-running-workflow-thinking-slot="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-running-workflow-thinking-window="true"]')).toHaveStyle({ height: "calc(0.625rem * 1.35 * 3)" });
        expect(container.querySelector('[data-running-workflow-thinking="true"]')).toHaveTextContent("");

        const firstThinkingStreamMs = 240;
        act(() => {
            vi.advanceTimersByTime(firstThinkingStreamMs);
        });

        const streamedFirstThinking = container.querySelector('[data-running-workflow-thinking="true"]')?.textContent ?? "";
        expect(streamedFirstThinking.length).toBeGreaterThan(0);
        expect(streamedFirstThinking).not.toBe(firstFrame.thinking);
        expect(firstFrame.thinking.startsWith(streamedFirstThinking)).toBe(true);

        act(() => {
            vi.advanceTimersByTime(firstFrame.durationMs - firstThinkingStreamMs);
        });

        expect(workflowCard).toHaveAttribute("data-running-workflow-current-action", "Applying food preferences and dislikes");
        expect(container.querySelector('[data-running-workflow-elapsed="true"]')).toHaveTextContent("0:01");
        expect(container.querySelector('[data-running-workflow-step-duration="true"]')).toHaveTextContent("0.9s");
        expect(container.querySelector('[data-running-workflow-thinking="true"]')).toHaveTextContent("");

        const secondFrame = savedWorkflowStoryboardFrames[1];
        const secondThinkingStreamMs = 120;
        act(() => {
            vi.advanceTimersByTime(secondThinkingStreamMs);
        });

        const streamedSecondThinking = container.querySelector('[data-running-workflow-thinking="true"]')?.textContent ?? "";
        expect(streamedSecondThinking.length).toBeGreaterThan(0);
        expect(streamedSecondThinking).not.toBe(secondFrame.thinking);
        expect(secondFrame.thinking.startsWith(streamedSecondThinking)).toBe(true);
        expect(streamedSecondThinking.length).toBeLessThan(streamedFirstThinking.length);

        const memoryStoryboardMs = savedWorkflowStoryboardFrames.slice(0, 3).reduce((totalMs, frame) => totalMs + frame.durationMs, 0);
        act(() => {
            vi.advanceTimersByTime(memoryStoryboardMs - firstFrame.durationMs - secondThinkingStreamMs);
        });

        expect(workflowCard).toHaveAttribute("data-running-workflow-current-subagent", "Check calendar");
        expect(workflowCard).toHaveAttribute("data-running-workflow-current-action", "Checking this week’s calendar");
        expect(container.querySelector('[data-running-workflow-step-duration="true"]')).toHaveTextContent("0.8s");
        expect(container.querySelector('[data-workflow-node-id="meal-prep-agent"]')).toHaveAttribute("data-workflow-node-status", "active");
        expect(container.querySelector('[data-workflow-node-id="tool-calendar"]')).toHaveAttribute("data-workflow-node-status", "active");

        const calendarThinkingStreamMs = 120;
        act(() => {
            vi.advanceTimersByTime(calendarThinkingStreamMs);
        });

        const streamedCalendarThinking = container.querySelector('[data-running-workflow-thinking="true"]')?.textContent ?? "";
        expect(streamedCalendarThinking.length).toBeGreaterThan(0);
        expect(streamedCalendarThinking).not.toBe(savedWorkflowStoryboardFrames[3].thinking);
        expect(savedWorkflowStoryboardFrames[3].thinking.startsWith(streamedCalendarThinking)).toBe(true);

        const msUntilApprovalPrompt = savedWorkflowStoryboardFrames
            .slice(3, savedWorkflowStoryboardApprovalFrameIndex + 1)
            .reduce((totalMs, frame) => totalMs + frame.durationMs, 0)
            - calendarThinkingStreamMs
            + savedWorkflowStoryboardScript.approvalPromptRevealDelayMs;
        act(() => {
            vi.advanceTimersByTime(msUntilApprovalPrompt);
        });

        expect(layout).toHaveAttribute("data-saved-workflow-approval-visible", "true");
        expect(layout).toHaveAttribute("data-saved-workflow-approval-status", "pending");
        expect(layout).toHaveAttribute("data-saved-workflow-approval-action", "idle");
        expect(layout).toHaveAttribute("data-saved-workflow-final-visible", "false");
        expect(workflowCard).toHaveAttribute("data-running-workflow-current-subagent", "Approval gate");
        expect(workflowCard).toHaveAttribute("data-running-workflow-current-action", "Waiting for checkout approval");
        expect(container.querySelector('[data-running-workflow-step-duration="true"]')).toHaveTextContent("Waiting");
        expect(container.querySelector('[data-workflow-node-id="approval-gate"]')).toHaveAttribute("data-workflow-node-status", "active");

        expect(screen.getByRole("button", { name: "Approve checkout" })).toBeVisible();
        expect(screen.getByRole("button", { name: "Approve checkout" })).toHaveAttribute("data-approval-action-state", "idle");
        expect(container.querySelector('[data-approval-card-status="pending"]')).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(savedWorkflowStoryboardScript.simulatedApprovalDelayMs - 1);
        });

        expect(layout).toHaveAttribute("data-saved-workflow-approval-status", "pending");
        expect(layout).toHaveAttribute("data-saved-workflow-approval-action", "idle");

        act(() => {
            vi.advanceTimersByTime(1);
        });

        expect(layout).toHaveAttribute("data-saved-workflow-approval-status", "pending");
        expect(layout).toHaveAttribute("data-saved-workflow-approval-action", "pressed");
        expect(screen.getByRole("button", { name: "Approve checkout" })).toHaveAttribute("data-approval-action-state", "pressed");

        act(() => {
            vi.advanceTimersByTime(savedWorkflowStoryboardScript.simulatedApprovalClickHoldMs - 1);
        });

        expect(layout).toHaveAttribute("data-saved-workflow-approval-status", "pending");
        expect(layout).toHaveAttribute("data-saved-workflow-approval-action", "pressed");

        act(() => {
            vi.advanceTimersByTime(1);
        });

        expect(layout).toHaveAttribute("data-saved-workflow-approval-status", "approved");
        expect(layout).toHaveAttribute("data-saved-workflow-approval-action", "idle");
        expect(workflowCard).toHaveAttribute("data-running-workflow-current-subagent", "Checkout subagent");
        expect(workflowCard).toHaveAttribute("data-running-workflow-current-action", "Placing Uber Groceries order");
        expect(container.querySelector('[data-running-workflow-step-duration="true"]')).toHaveTextContent("4.8s");
        expect(screen.queryByRole("button", { name: "Approve checkout" })).not.toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(20_000);
        });

        expect(layout).toHaveAttribute("data-saved-workflow-approval-visible", "true");
        expect(layout).toHaveAttribute("data-saved-workflow-approval-status", "approved");
        expect(layout).toHaveAttribute("data-saved-workflow-completion-visible", "true");
        expect(layout).toHaveAttribute("data-saved-workflow-final-visible", "true");
        expect(workflowCard).toHaveAttribute("data-running-workflow-current-subagent", "Workflow complete");
        expect(workflowCard).toHaveAttribute("data-running-workflow-current-action", "Order complete and recipes ready");
        expect(container.querySelector('[data-running-workflow-step-duration="true"]')).toHaveTextContent("0.4s");
        expect(container.querySelector('[data-workflow-node-status="active"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-id="checkout-agent"]')).toHaveAttribute("data-workflow-node-status", "complete");
        expect(container.querySelector('[data-workflow-node-id="checkout-agent"]')).toHaveTextContent("Agent");
        expect(container.querySelector('[data-workflow-node-id="checkout-agent"]')).toHaveTextContent("Order confirmed");
        expect(container.querySelector('[data-workflow-node-id="workflow-complete"]')).not.toBeInTheDocument();
        expect(container.querySelectorAll('[data-workflow-node-status="done"]').length).toBeGreaterThan(0);
        expect(container.querySelector('[data-workflow-node-id="approval-gate"]')).toHaveTextContent(mealPrepWorkflowNodeCopy.checkoutApproval);
        expect(container.querySelector('[data-workflow-connector="meal-prep-to-calendar"]')).toHaveAttribute("data-workflow-connector-active", "true");
        expect(container.querySelector('[data-workflow-connector="meal-prep-to-calendar"]')).toHaveAttribute("data-workflow-connector-kind", "path");
        expect(container.querySelector('[data-workflow-connector="approval-to-checkout"]')).toHaveAttribute("data-workflow-connector-active", "true");
        expect(container.querySelector('[data-workflow-connector="approval-to-checkout"]')).toHaveAttribute("data-workflow-connector-kind", "path");
        expect(container.querySelector('[data-approval-card-status="approved"]')).toBeInTheDocument();
        expect(screen.getAllByText("Checkout approved").length).toBeGreaterThan(0);
        expect(screen.queryByText("Approve checkout")).not.toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(2_000);
        });

        expect(screen.getByText(savedWorkflowStoryboardScript.finalMessage)).toBeVisible();
        expect(screen.getByRole("link", { name: "View this week’s recipes" })).toHaveAttribute("href", "#weekly-recipes");
        expect(screen.getByText("Ask about recipes, delivery, or next Sunday’s workflow…")).toBeVisible();
    });

    it("continues immediately when checkout approval is clicked", () => {
        vi.useFakeTimers();
        const { container } = render(<SavedWorkflowRunWireframeMockup />);
        const layout = container.querySelector('[data-saved-workflow-layout="home-chat"]');

        const msUntilApprovalPrompt = savedWorkflowStoryboardScript.workflowCardRevealDelayMs
            + savedWorkflowStoryboardFrames
                .slice(0, savedWorkflowStoryboardApprovalFrameIndex + 1)
                .reduce((totalMs, frame) => totalMs + frame.durationMs, 0)
            + savedWorkflowStoryboardScript.approvalPromptRevealDelayMs;

        act(() => {
            vi.advanceTimersByTime(msUntilApprovalPrompt);
        });

        expect(layout).toHaveAttribute("data-saved-workflow-approval-status", "pending");

        fireEvent.click(screen.getByRole("button", { name: "Approve checkout" }));

        expect(layout).toHaveAttribute("data-saved-workflow-approval-status", "approved");
        expect(container.querySelector('[data-running-workflow-group="true"]')).toHaveAttribute("data-running-workflow-current-subagent", "Checkout subagent");
        expect(container.querySelector('[data-running-workflow-group="true"]')).toHaveAttribute("data-running-workflow-current-action", "Placing Uber Groceries order");
        expect(layout).toHaveAttribute("data-saved-workflow-completion-visible", "false");
    });

    it("restarts the saved workflow animation from the trigger state", () => {
        vi.useFakeTimers();
        const { container } = render(<SavedWorkflowRunWireframeMockup />);
        const layout = container.querySelector('[data-saved-workflow-layout="home-chat"]');
        const restartButton = screen.getByRole("button", { name: /restart saved workflow animation/i });

        act(() => {
            vi.advanceTimersByTime(savedWorkflowStoryboardScript.workflowCardRevealDelayMs);
        });

        expect(layout).toHaveAttribute("data-saved-workflow-card-visible", "true");
        expect(container.querySelector('[data-running-workflow-group="true"]')).toHaveAttribute("data-running-workflow-current-subagent", "Check memories");
        expect(container.querySelector('[data-workflow-node-id="meal-prep-agent"]')).toHaveAttribute("data-workflow-node-status", "active");
        expect(container.querySelector('[data-workflow-node-id="tool-memories"]')).toHaveAttribute("data-workflow-node-status", "active");

        fireEvent.click(restartButton);

        expect(layout).toHaveAttribute("data-saved-workflow-card-visible", "false");
        expect(layout).toHaveAttribute("data-saved-workflow-final-visible", "false");
        expect(layout).toHaveAttribute("data-saved-workflow-frame", "trigger");
        expect(container.querySelector('[data-running-workflow-group="true"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-workflow-node-status="active"]')).toHaveTextContent("Trigger");
    });
});

describe("HomepageChatSectionMockup", () => {
    it("can render the completed conversation without storyboard timers", () => {
        const { container } = render(<HomepageChatSectionMockup mode="static" />);

        expect(screen.getByRole("article", { name: /homepage chat visual mockup/i })).toHaveAttribute("data-homepage-chat-mode", "static");
        expect(screen.queryByRole("button", { name: /restart conversation animation/i })).not.toBeInTheDocument();
        expect(screen.getByText(homepageChatStoryboardScript.userMessage)).toBeVisible();
        expect(screen.getByText(homepageChatStoryboardScript.assistantResponse.thinkingStatus)).toBeVisible();
        expect(screen.getByText(/I found 8 recurring charges/)).toBeVisible();
        expect(screen.getByText(homepageChatStoryboardScript.assistantResponse.finalProposalName)).toBeVisible();
        expect(screen.getByText("Approve setup")).toBeVisible();
        expect(container.querySelector('[data-homepage-chat-typing="assistant"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-homepage-chat-message-count="2"]')).toBeInTheDocument();
    });

    it("renders the key mockup landmarks and command prompt", () => {
        const { container } = render(<HomepageChatSectionMockup />);

        expect(screen.getByRole("article", { name: /homepage chat visual mockup/i })).toBeVisible();
        expect(screen.getByLabelText("Agent navigation")).toBeVisible();
        expect(container.querySelector('[data-homepage-chat-user-avatar-image="true"]')).toBeInTheDocument();
        expect(screen.getByText("Good morning, Andrew")).toBeVisible();
        expect(screen.getByText("How can I help you today?")).toBeVisible();
        expect(screen.queryByText("Investment analysis")).not.toBeInTheDocument();
        expect(screen.getByText("Chats")).toBeVisible();
        expect(container.querySelector("[data-homepage-chat-thread-count]")).toHaveAttribute("data-homepage-chat-thread-count", "0");
        expect(container.querySelector('[data-homepage-chat-transcript="true"]')).toHaveClass("overflow-y-auto");
        expect(container.querySelector('[data-homepage-chat-transcript="true"]')).toHaveStyle({
            left: "calc(50% + var(--nous-home-chat-transcript-scrollbar-gutter) / 2)",
            width: "calc(var(--nous-home-chat-transcript-width) + var(--nous-home-chat-transcript-scrollbar-gutter))"
        });
        expect(container.querySelector('[data-homepage-chat-transcript-stack="true"]')).toHaveClass("min-h-full", "justify-end", "pb-2", "w-[var(--nous-home-chat-transcript-width)]");
        expect(container.querySelector('[data-homepage-chat-transcript-stack="true"]')).toHaveAttribute("data-homepage-chat-transcript-stack-align", "bottom");
        expect(container.querySelector('[data-homepage-chat-composer-content="true"]')).toHaveClass("content-start");
        expect(container.querySelector('[data-homepage-chat-composer-shell="hero"]')).toHaveClass("w-[var(--nous-home-chat-composer-width)]");
        expect(container.querySelector('[data-homepage-chat-composer-mode="hero"]')).toHaveClass(
            "min-h-[var(--nous-composer-min-height)]",
            "max-h-[var(--nous-composer-max-height)]",
            "overflow-y-auto"
        );
        expectComposerControlsUseHomepageButtons(container, "Send storyboard message", false);
    });

    it("keeps chat focused and sidebar unfocused", () => {
        const { container } = render(<HomepageChatSectionMockup />);
        const getChatRegion = () => container.querySelector('[data-homepage-chat-area="chat"]');
        const getSidebarRegion = () => container.querySelector('[data-homepage-chat-area="sidebar"]');
        const getSidebar = () => screen.getByLabelText("Agent navigation");

        expect(screen.queryByRole("button", { name: /swap focused chat mockup area/i })).not.toBeInTheDocument();
        expect(getChatRegion()).toHaveAttribute("data-state", "focus");
        expect(getChatRegion()).not.toHaveClass("nous-home-chat-component-fade");
        expect(container.querySelector('[data-homepage-chat-canvas-radial="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-homepage-chat-canvas-highlight="true"]')).not.toBeInTheDocument();
        expect(getSidebarRegion()).toHaveAttribute("data-state", "unfocused");
        expect(getSidebar()).toHaveClass("nous-home-chat-sidebar-unfocused");
        expect(container.querySelector('[data-homepage-chat-sidebar-radial="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-homepage-chat-sidebar-outer-border="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-homepage-chat-unfocused-overlay="sidebar"]')).not.toBeInTheDocument();
        expect(container.querySelector("[data-homepage-chat-secondary-border]")).not.toBeInTheDocument();
    });

    it("types the scripted user message before enabling send", () => {
        vi.useFakeTimers();

        const { container } = render(<HomepageChatSectionMockup />);
        const transcript = container.querySelector('[data-homepage-chat-transcript="true"]');
        const sendButton = screen.getByRole("button", { name: /send storyboard message/i });

        expect(transcript).toHaveAttribute("data-homepage-chat-message-count", "0");
        expect(sendButton).toHaveAttribute("data-homepage-chat-send-ready", "false");
        expect(screen.getByText("How can I help you today?")).toBeVisible();

        advanceStoryboardTyping();

        expect(screen.getByText(homepageChatStoryboardScript.userMessage)).toBeVisible();
        expect(sendButton).toHaveAttribute("data-homepage-chat-send-ready", "true");
        expect(transcript).toHaveAttribute("data-homepage-chat-message-count", "0");
    });

    it("waits to start the storyboard until the mockup enters the viewport", () => {
        vi.useFakeTimers();

        const triggerIntersection = mockIntersectionObserver();
        const { container } = render(<HomepageChatSectionMockup />);
        const composerValue = () => container.querySelector("[data-homepage-chat-composer-value]");

        advanceStoryboardTyping();

        expect(composerValue()).toHaveAttribute("data-homepage-chat-composer-value", "");
        expect(screen.getByRole("button", { name: /send storyboard message/i })).toHaveAttribute("data-homepage-chat-send-ready", "false");

        act(() => {
            triggerIntersection(true);
        });

        act(() => {
            vi.advanceTimersByTime(homepageChatStoryboardScript.typingIntervalMs);
        });

        expect(composerValue()).toHaveAttribute("data-homepage-chat-composer-value", "I");
    });

    it("holds the ready state for five seconds before auto-populating the response", () => {
        vi.useFakeTimers();

        const { container } = render(<HomepageChatSectionMockup />);
        const transcript = container.querySelector('[data-homepage-chat-transcript="true"]');

        advanceStoryboardTyping();

        act(() => {
            vi.advanceTimersByTime(homepageChatStoryboardScript.autoResponseDelayMs - 1);
        });

        expect(container.querySelector('[data-homepage-chat-message="user"]')).not.toBeInTheDocument();
        expect(transcript).toHaveAttribute("data-homepage-chat-message-count", "0");

        act(() => {
            vi.advanceTimersByTime(1);
        });

        expect(container.querySelector('[data-homepage-chat-message="user"]')).toBeInTheDocument();
        expect(container.querySelector('[data-homepage-chat-typing="assistant"]')).toBeInTheDocument();
        expect(transcript).toHaveAttribute("data-homepage-chat-message-count", "1");
    });

    it("streams the active chat tab title into the sidebar", () => {
        vi.useFakeTimers();

        const { container } = render(<HomepageChatSectionMockup />);
        const sendButton = screen.getByRole("button", { name: /send storyboard message/i });

        advanceStoryboardTyping();
        fireEvent.click(sendButton);

        const threadTitle = container.querySelector('[data-homepage-chat-thread-title="subscription-cleanup-thread"]');
        const threadRow = container.querySelector('[data-homepage-chat-thread="true"]');

        expect(container.querySelector("[data-homepage-chat-thread-count]")).toHaveAttribute("data-homepage-chat-thread-count", "1");
        expect(threadRow).toHaveAttribute("data-homepage-chat-thread-streaming", "true");
        expect(threadTitle).toHaveTextContent("");
        expect(container.querySelector('[data-homepage-chat-thread-caret="true"]')).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(homepageChatStoryboardScript.sidebarThreadTypingIntervalMs);
        });

        expect(threadTitle).toHaveTextContent("L");

        for (let index = 1; index < homepageChatStoryboardScript.threadTitle.length; index += 1) {
            act(() => {
                vi.advanceTimersByTime(homepageChatStoryboardScript.sidebarThreadTypingIntervalMs);
            });
        }

        expect(threadTitle).toHaveTextContent(homepageChatStoryboardScript.threadTitle);
        expect(threadRow).toHaveAttribute("data-homepage-chat-thread-streaming", "false");
        expect(container.querySelector('[data-homepage-chat-thread-caret="true"]')).not.toBeInTheDocument();
    });

    it("lets visitor scrolling temporarily override transcript auto-scroll", () => {
        vi.useFakeTimers();

        const { container } = render(<HomepageChatSectionMockup />);
        const sendButton = screen.getByRole("button", { name: /send storyboard message/i });

        advanceStoryboardTyping();
        fireEvent.click(sendButton);

        const transcript = container.querySelector('[data-homepage-chat-transcript="true"]') as HTMLDivElement;

        Object.defineProperty(transcript, "clientHeight", { configurable: true, value: 300 });
        Object.defineProperty(transcript, "scrollHeight", { configurable: true, value: 1000 });

        act(() => {
            vi.advanceTimersByTime(0);
        });

        transcript.scrollTop = 300;
        fireEvent.scroll(transcript);

        expect(transcript).toHaveAttribute("data-homepage-chat-scroll-override", "active");

        advanceResponseStream(12);

        expect(transcript.scrollTop).toBe(300);

        act(() => {
            vi.advanceTimersByTime(homepageChatStoryboardScript.transcriptScrollOverrideDebounceMs);
        });

        expect(transcript).toHaveAttribute("data-homepage-chat-scroll-override", "active");

        transcript.scrollTop = 980;
        fireEvent.scroll(transcript);

        expect(transcript).toHaveAttribute("data-homepage-chat-scroll-override", "idle");

        act(() => {
            vi.advanceTimersByTime(1500);
        });

        expect(transcript.scrollTop).toBe(1000);
    });

    it("lets the visitor press send to trigger the staged response immediately", async () => {
        vi.useFakeTimers();

        const { container } = render(<HomepageChatSectionMockup />);
        const sendButton = screen.getByRole("button", { name: /send storyboard message/i });
        const getChatRegion = () => container.querySelector('[data-homepage-chat-area="chat"]');

        advanceStoryboardTyping();

        fireEvent.click(sendButton);

        expect(getChatRegion()).toHaveAttribute("data-state", "focus");
        const userMessage = container.querySelector('[data-homepage-chat-message="user"]');

        expect(userMessage).toBeInTheDocument();
        expect(within(userMessage as HTMLElement).queryByText("User")).not.toBeInTheDocument();
        expect(container.querySelector('[data-homepage-chat-composer-shell="compact"]')).toHaveClass("w-[var(--nous-home-chat-composer-active-width)]");
        expect(container.querySelector('[data-homepage-chat-composer-mode="compact"]')).toHaveClass(
            "min-h-[var(--nous-composer-compact-height)]",
            "max-h-[var(--nous-composer-compact-max-height)]",
            "overflow-y-auto",
            "text-[length:var(--nous-composer-compact-font-size)]",
            "px-[var(--nous-composer-compact-padding-x)]"
        );
        expect(container.querySelector('[data-homepage-chat-typing="assistant"]')).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(homepageChatStoryboardScript.responseStepDelayMs);
        });

        expect(screen.getByText(homepageChatStoryboardScript.assistantResponse.accordionTitle)).toBeVisible();
        expect(container.querySelector('[data-homepage-chat-working-accordion="open"]')).toBeInTheDocument();
        expect(container.querySelector('[data-homepage-chat-transcript-stack="true"]')).toHaveClass("justify-end");
        expect(container.querySelector('[data-homepage-chat-transcript-stack="true"]')).toHaveAttribute("data-homepage-chat-transcript-stack-align", "bottom");

        act(() => {
            vi.advanceTimersByTime(homepageChatStoryboardScript.responseStepDelayMs);
        });

        act(() => {
            vi.advanceTimersByTime(homepageChatStoryboardScript.responseStepDelayMs);
        });

        act(() => {
            vi.advanceTimersByTime(1500);
        });

        expect(container.querySelector('[data-homepage-chat-transcript="true"]')).toHaveAttribute("data-homepage-chat-visible-response-step-count", "2");
        await act(async () => {
            await vi.advanceTimersByTimeAsync(120);
        });
        expect(container.querySelector('[data-homepage-chat-transcript="true"]')).not.toHaveAttribute("data-homepage-chat-response-stream-length", "0");

        const streamedInitialThinking = container.querySelector('[data-homepage-chat-streamed-text="initial-thinking"]');

        expect(streamedInitialThinking).toBeInTheDocument();
        expect(streamedInitialThinking?.textContent).not.toBe(homepageChatStoryboardScript.assistantResponse.initialThinking);

        advanceResponseStream(4);

        expect(streamedInitialThinking?.textContent?.length).toBeGreaterThan(0);
        expect(streamedInitialThinking?.textContent).not.toBe(homepageChatStoryboardScript.assistantResponse.initialThinking);

        act(() => {
            vi.advanceTimersByTime(homepageChatStoryboardScript.responseStepDelayMs);
        });

        expect(container.querySelector('[data-homepage-chat-tool-call-group="true"]')).not.toBeInTheDocument();
        const toolCallStreamBoundaryLength =
            homepageChatStoryboardScript.assistantResponse.initialThinking.length +
            homepageChatStoryboardScript.assistantResponse.toolCallsIntro.length;
        const currentToolCallStreamLength = ["initial-thinking", "tool-calls-intro"].reduce(
            (totalLength, streamKey) => totalLength + (container.querySelector(`[data-homepage-chat-streamed-text="${streamKey}"]`)?.textContent?.length ?? 0),
            0
        );

        advanceResponseStream(toolCallStreamBoundaryLength - currentToolCallStreamLength);

        const runningToolCallGroup = container.querySelector('[data-homepage-chat-tool-call-group="true"]');
        const runningToolCallGroupSummary = runningToolCallGroup?.querySelector("summary");

        expect(runningToolCallGroup).toBeInTheDocument();
        expect(runningToolCallGroup).toHaveAttribute("data-homepage-chat-tool-call-state", "running");
        expect(runningToolCallGroupSummary).toHaveClass("nous-home-chat-tool-call-running-summary");
        expect(screen.getByText("Bank account · Checking bank statements · 0.9s")).toBeVisible();
        expect(screen.queryByText("Email · Checking email receipts · 0.6s")).not.toBeInTheDocument();
        expect(container.querySelector('[data-homepage-chat-results-table="true"]')).not.toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(homepageChatStoryboardScript.assistantResponse.toolCalls[0].durationMs);
        });

        expect(screen.getByText("Email · Checking email receipts · 0.6s")).toBeVisible();

        act(() => {
            vi.advanceTimersByTime(homepageChatStoryboardScript.assistantResponse.toolCalls[1].durationMs - 1);
        });

        expect(container.querySelector('[data-homepage-chat-tool-call-group="true"]')).toHaveAttribute("data-homepage-chat-tool-call-state", "running");
        expect(container.querySelector('[data-homepage-chat-results-table="true"]')).not.toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(1);
        });

        advanceResponseStream(900);

        const toolCallGroup = container.querySelector('[data-homepage-chat-tool-call-group="true"]');
        const toolCallGroupSummary = toolCallGroup?.querySelector("summary");

        expect(toolCallGroup).toBeInTheDocument();
        expect(toolCallGroup).not.toHaveAttribute("open");
        expect(toolCallGroup).toHaveAttribute("data-homepage-chat-tool-call-state", "complete");
        expect(toolCallGroup).toHaveClass("w-[90%]", "open:bg-[var(--nous-control-bg-soft)]");
        expect(toolCallGroup).not.toHaveClass("border");
        expect(screen.getByText(homepageChatStoryboardScript.assistantResponse.toolCallsCompletedLabel)).toBeVisible();
        expect(toolCallGroupSummary).toHaveClass("nous-mono", "text-[length:var(--nous-type-meta)]", "hover:bg-[var(--nous-control-bg-soft)]");
        expect(toolCallGroupSummary).not.toHaveClass("nous-home-chat-tool-call-running-summary");
        expect(screen.getByText(/Found 8 recurring charges/)).not.toBeVisible();

        fireEvent.click(toolCallGroupSummary as HTMLElement);

        expect(toolCallGroup).toHaveAttribute("open");
        expect(within(toolCallGroup as HTMLElement).queryByText("Bank account + Email")).not.toBeInTheDocument();
        expect(within(toolCallGroup as HTMLElement).getByText("Read · 0.9s")).toBeVisible();
        expect(within(toolCallGroup as HTMLElement).getByText("Read · 0.6s")).toBeVisible();
        expect(screen.getByText(/Checking bank statements/)).toBeVisible();
        expect(screen.getByText(/Checking email receipts/)).toBeVisible();
        expect(screen.getByText(/Found 8 recurring charges/)).toBeVisible();
        expect(screen.getByText(/Matched 6 receipts/)).toBeVisible();
        expect(screen.getByText("bank.findRecurringCharges")).toBeVisible();
        expect(screen.getByText("email.matchReceipts")).toBeVisible();
        const resultsTable = container.querySelector('[data-homepage-chat-results-table="true"]');
        const resultsTableSummary = resultsTable?.querySelector("summary");

        expect(resultsTable).toBeInTheDocument();
        expect(resultsTable).not.toHaveAttribute("open");
        expect(screen.getByText("8 shown")).toBeVisible();

        fireEvent.click(resultsTableSummary as HTMLElement);

        expect(resultsTable).toHaveAttribute("open");
        expect(screen.getByRole("columnheader", { name: "Service" })).toBeVisible();
        expect(screen.getByRole("rowheader", { name: "StreamBox" })).toBeVisible();
        expect(screen.getByRole("rowheader", { name: "GreenCart" })).toBeVisible();
        expect(container.querySelector('[data-homepage-chat-working-toggle="true"]')).toHaveClass("border-b");

        advanceStoryboardResponse();

        expect(screen.getByText(homepageChatStoryboardScript.assistantResponse.thinkingStatus)).toBeVisible();
        expect(container.querySelector('[data-homepage-chat-final-answer="true"]')).toBeInTheDocument();
        expect(screen.getByText(/I found 8 recurring charges/)).toBeVisible();
        const proposalCard = container.querySelector('[data-homepage-chat-task-proposal-card="true"]');
        const proposalDisclosure = proposalCard?.querySelector('[data-homepage-chat-task-proposal-disclosure="true"]');
        const proposalSummary = proposalCard?.querySelector('[data-homepage-chat-task-proposal-compact="true"]');

        expect(proposalCard).toBeInTheDocument();
        expect(proposalDisclosure).not.toHaveAttribute("open");
        expect(within(proposalCard as HTMLElement).getByText(homepageChatStoryboardScript.assistantResponse.finalSuggestedActionsTitle)).toBeVisible();
        expect(within(proposalCard as HTMLElement).getByText(homepageChatStoryboardScript.assistantResponse.finalProposalName)).toBeVisible();
        expect(within(proposalCard as HTMLElement).getByText("Finances project")).toBeVisible();
        expect(within(proposalCard as HTMLElement).getByText("Quarterly")).toBeVisible();
        expect(within(proposalCard as HTMLElement).getByText("Read-only tools")).toBeVisible();
        expect(within(proposalCard as HTMLElement).getByText("Approval required")).toBeVisible();
        expect(within(proposalCard as HTMLElement).getByText("Approve setup")).toBeVisible();
        expect(within(proposalCard as HTMLElement).getByText("Discuss more")).toBeVisible();
        expect(within(proposalCard as HTMLElement).getByText("Not now")).toBeVisible();

        fireEvent.click(proposalSummary as HTMLElement);

        expect(proposalDisclosure).toHaveAttribute("open");
        expect(within(proposalCard as HTMLElement).getByText("Project")).toBeVisible();
        expect(within(proposalCard as HTMLElement).getByText(/Create Finances/)).toBeVisible();
        expect(within(proposalCard as HTMLElement).getByText("Schedule")).toBeVisible();
        expect(within(proposalCard as HTMLElement).getByText("Approval")).toBeVisible();
        expect(container.querySelector('[data-homepage-chat-working-accordion="closed"]')).toBeInTheDocument();
        expect(container.querySelector('[data-homepage-chat-working-accordion-panel="closed"]')).toHaveClass("grid-rows-[0fr]", "opacity-0", "duration-700");
        expect(container.querySelector('[data-homepage-chat-working-accordion-content="closed"]')).toHaveClass("-translate-y-1", "opacity-0");

        fireEvent.click(screen.getByRole("button", { name: homepageChatStoryboardScript.assistantResponse.thinkingStatus }));

        expect(container.querySelector('[data-homepage-chat-working-accordion="open"]')).toBeInTheDocument();
        expect(container.querySelector('[data-homepage-chat-working-accordion-panel="open"]')).toHaveClass("grid-rows-[1fr]", "opacity-100", "transition-[grid-template-rows,opacity]", "duration-700");
        expect(container.querySelector('[data-homepage-chat-working-accordion-content="open"]')).toHaveClass("translate-y-0", "opacity-100", "delay-75");
        expect(container.querySelector('[data-homepage-chat-final-answer="true"]')).toHaveClass("mt-4");
        expect(screen.getByText(homepageChatStoryboardScript.assistantResponse.initialThinking)).toBeVisible();
        expect(screen.getByText(homepageChatStoryboardScript.assistantResponse.projectToolCallsCompletedLabel)).toBeVisible();
        expect(screen.getByText(homepageChatStoryboardScript.assistantResponse.projectDecision)).toBeVisible();
        expect(screen.getAllByText(/Finances project/).length).toBeGreaterThan(0);
        expect(container.querySelector('[data-homepage-chat-message="assistant"]')).toBeInTheDocument();
        expect(container.querySelector('[data-homepage-chat-typing="assistant"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-homepage-chat-transcript="true"]')).toHaveAttribute("data-homepage-chat-message-count", "2");
    }, 20_000);

    it("restarts the conversation animation from the beginning", () => {
        vi.useFakeTimers();

        const { container } = render(<HomepageChatSectionMockup />);
        const sendButton = screen.getByRole("button", { name: /send storyboard message/i });
        const restartButton = screen.getByRole("button", { name: /restart conversation animation/i });

        advanceStoryboardTyping();
        fireEvent.click(sendButton);

        expect(container.querySelector('[data-homepage-chat-message="user"]')).toBeInTheDocument();
        expect(screen.getByText("Chats")).toBeVisible();
        expect(container.querySelector('[data-homepage-chat-thread="true"]')).toBeInTheDocument();
        expect(container.querySelector('[data-homepage-chat-thread="true"]')).toHaveAttribute("data-homepage-chat-thread-streaming", "true");
        expect(container.querySelector("[data-homepage-chat-thread-count]")).toHaveAttribute("data-homepage-chat-thread-count", "1");

        fireEvent.click(restartButton);

        expect(container.querySelector('[data-homepage-chat-message="user"]')).not.toBeInTheDocument();
        expect(screen.queryByText(homepageChatStoryboardScript.threadTitle)).not.toBeInTheDocument();
        expect(container.querySelector("[data-homepage-chat-thread-count]")).toHaveAttribute("data-homepage-chat-thread-count", "0");
        expect(screen.getByText("How can I help you today?")).toBeVisible();
        expect(sendButton).toHaveAttribute("data-homepage-chat-send-ready", "false");
        expect(container.querySelector('[data-homepage-chat-area="chat"]')).toHaveAttribute("data-state", "focus");
        expect(container.querySelector('[data-homepage-chat-transcript="true"]')).toHaveAttribute("data-homepage-chat-message-count", "0");
    });
});
