export type SavedWorkflowStoryboardMode = "storyboard" | "static";

export type SavedWorkflowSubagentKey = "approval" | "calendar" | "checkout" | "complete" | "grocery" | "meal-planning" | "memory" | "recipes";

export type SavedWorkflowGraphNodeId =
    | "trigger"
    | "check-calendar"
    | "check-memories"
    | "build-meal-plan"
    | "prepare-cart"
    | "approval-gate"
    | "place-order"
    | "recipes-ready"
    | "order-complete";

export type SavedWorkflowSubagentActionScript = {
    action: string;
    thinking: string;
};

export type SavedWorkflowSubagentScript = {
    actions: readonly SavedWorkflowSubagentActionScript[];
    graphNodeId: SavedWorkflowGraphNodeId;
    key: SavedWorkflowSubagentKey;
    name: string;
    queuedAction: string;
    result: string;
};

export type SavedWorkflowStoryboardFrame = {
    action: string;
    durationMs: number;
    graphNodeId: SavedWorkflowGraphNodeId;
    key: string;
    runtimeMs: number;
    subagentKey: SavedWorkflowSubagentKey;
    subagentName: string;
    thinking: string;
};

export type SavedWorkflowSubagentRuntimeState = {
    action: string;
    key: SavedWorkflowSubagentKey;
    name: string;
    state: "active" | "complete" | "done" | "queued" | "waiting";
    duration?: string;
    thinking?: string;
};

const workflowFrameDurationsBySubagent: Record<SavedWorkflowSubagentKey, readonly number[]> = {
    approval: [1_200, 1_800],
    calendar: [1_600, 2_100, 1_500],
    checkout: [2_100, 1_600],
    complete: [1_200],
    grocery: [1_800, 2_100, 2_400, 1_700],
    memory: [1_700, 2_000, 1_700],
    "meal-planning": [2_200, 2_400, 1_900],
    recipes: [1_500]
};

const workflowFrameRuntimeDurationsBySubagent: Record<SavedWorkflowSubagentKey, readonly number[]> = {
    approval: [300, 0],
    calendar: [800, 1_200, 500],
    checkout: [4_800, 1_200],
    complete: [400],
    grocery: [4_200, 3_600, 5_900, 1_800],
    memory: [1_300, 900, 700],
    "meal-planning": [8_600, 5_400, 2_100],
    recipes: [1_100]
};

export const savedWorkflowStoryboardScript = {
    approvalActions: ["Approve checkout", "Review plan", "Edit cart"],
    approvalDetails: [
        ["Dinners", "5"],
        ["Cart", "34 items"],
        ["Estimate", "$86.40"],
        ["Delivery", "Today · 4–5 PM"]
    ],
    approvalApprovedName: "Checkout approved",
    approvalApprovedSummary: ["Approved", "$86.40", "Delivery today · 4–5 PM"],
    approvalApprovedTitle: "Approved",
    approvalName: "Meal plan ready",
    approvalPromptRevealDelayMs: 420,
    approvalMessage: "The workflow planned five dinners around your week and prepared an Uber Groceries cart. It needs approval before checkout.",
    approvalSummary: ["5 dinners", "34 items", "Checkout paused"],
    approvalTitle: "Approval needed",
    completionActions: [
        { href: "#weekly-recipes", label: "View this week’s recipes" },
        { label: "View receipt" },
        { label: "Edit next Sunday’s workflow" }
    ],
    completionDetails: [
        ["Order", "Uber Groceries"],
        ["Items", "34"],
        ["Total", "$86.40"],
        ["Delivery", "Today · 4–5 PM"],
        ["Recipes", "This week’s recipes"]
    ],
    completionName: "Sunday Meal Prep complete",
    completionSummary: ["34 items ordered", "$86.40 total", "Delivery today · 4–5 PM"],
    completionTitle: "Order complete",
    finalRevealDelayMs: 520,
    finalMessage: "Approved — the Uber Groceries order is complete. Delivery is scheduled for today from 4–5 PM.",
    introMessage: "Andrew, I have started working on your meal prep plan for the week.",
    simulatedApprovalClickHoldMs: 420,
    simulatedApprovalDelayMs: 2_200,
    subagents: [
        {
            actions: [
                {
                    action: "Checking memories",
                    thinking: "Looking up household memories for food preferences, disliked ingredients, budget habits, delivery address, and any recurring meal-planning rules."
                },
                {
                    action: "Applying food preferences and dislikes",
                    thinking: "I’m filtering toward meals this household usually accepts and avoiding ingredients previously marked as disliked. The planner should not waste slots on meals likely to be rejected."
                },
                {
                    action: "Applying budget and delivery address",
                    thinking: "I’m applying the usual weekly grocery budget and confirming the saved delivery address. The grocery cart should stay within the expected range and be ready for approval, not checkout."
                }
            ],
            graphNodeId: "check-memories",
            key: "memory",
            name: "Check memories",
            queuedAction: "Waiting to check memories",
            result: "Preferences, dislikes, budget, and address applied"
        },
        {
            actions: [
                {
                    action: "Checking this week’s calendar",
                    thinking: "Looking across the week for evenings that conflict with dinner planning. I’m marking nights that are already booked, compressed, or likely too late for cooking."
                },
                {
                    action: "Finding nights out and late meetings",
                    thinking: "Tuesday evening is already taken, so I shouldn’t plan dinner there. There’s also one late meeting, so that night should get something low-effort."
                },
                {
                    action: "Counting dinners needed",
                    thinking: "After removing blocked nights, this week needs five planned dinners. I’ll pass the available nights and timing constraints forward to meal planning."
                }
            ],
            graphNodeId: "check-calendar",
            key: "calendar",
            name: "Check calendar",
            queuedAction: "Waiting to check calendar",
            result: "Skip Tuesday dinner · 5 dinners needed · 1 late-meeting night"
        },
        {
            actions: [
                {
                    action: "Building dinners around the week",
                    thinking: "Using the available dinner nights from the calendar and constraints from memory, I’m drafting five dinners that fit the actual week instead of a generic meal plan."
                },
                {
                    action: "Balancing leftovers, effort, and variety",
                    thinking: "I’m balancing quick meals, lunch leftovers, prep effort, and variety. The late-meeting night should stay easy, and the week should not repeat the same kind of dinner too often."
                },
                {
                    action: "Finalizing the five-dinner plan",
                    thinking: "The five dinners fit the week, budget, preferences, and leftover goals. I’m handing the finalized plan to grocery so it can turn meals into cart items."
                }
            ],
            graphNodeId: "build-meal-plan",
            key: "meal-planning",
            name: "Plan meals",
            queuedAction: "Waiting to build meal plan",
            result: "5-dinner plan ready · leftovers prioritized"
        },
        {
            actions: [
                {
                    action: "Turning meals into ingredients",
                    thinking: "I’m expanding the finalized meal plan into ingredients and separating likely pantry staples from items that need to be bought this week."
                },
                {
                    action: "Merging duplicates and quantities",
                    thinking: "I’m combining repeated ingredients across recipes and adjusting quantities for household size and leftovers, so the cart doesn’t duplicate items unnecessarily."
                },
                {
                    action: "Preparing Uber Groceries cart",
                    thinking: "I’m drafting the Uber Groceries cart with the needed items, but I’m not checking out. This step prepares the order for review only."
                },
                {
                    action: "Checking estimate and delivery window",
                    thinking: "The cart estimate is within the usual range, and there’s a delivery window available today from 4–5 PM. The workflow should stop at approval before spending money."
                }
            ],
            graphNodeId: "prepare-cart",
            key: "grocery",
            name: "Prepare cart",
            queuedAction: "Waiting to prepare cart",
            result: "34-item Uber Groceries cart · $86.40 · Today 4–5 PM"
        },
        {
            actions: [
                {
                    action: "Pausing before checkout",
                    thinking: "The cart is prepared, but checkout would spend money, so the workflow must pause here. Approval is required before the order can be placed."
                },
                {
                    action: "Waiting for checkout approval",
                    thinking: "Everything needed for checkout is ready. The user can approve the order, review the meal plan, or edit the cart before anything is purchased."
                }
            ],
            graphNodeId: "approval-gate",
            key: "approval",
            name: "Approval gate",
            queuedAction: "Waiting for checkout checkpoint",
            result: "Checkout paused before spending money"
        },
        {
            actions: [
                {
                    action: "Placing Uber Groceries order",
                    thinking: "Approval is in, so I can move from draft cart to checkout. I’m submitting the prepared Uber Groceries order with the approved items and total."
                },
                {
                    action: "Confirming delivery time",
                    thinking: "The order is accepted. I’m confirming the delivery window and checking that the final total still matches the approved estimate."
                }
            ],
            graphNodeId: "place-order",
            key: "checkout",
            name: "Checkout subagent",
            queuedAction: "Waiting for approval to place order",
            result: "Uber Groceries order complete · delivery today 4–5 PM"
        },
        {
            actions: [
                {
                    action: "Publishing weekly recipe links",
                    thinking: "The grocery order is confirmed, so I’m saving the weekly recipe links alongside the meal plan. The user should have one place to open every dinner for the week."
                }
            ],
            graphNodeId: "recipes-ready",
            key: "recipes",
            name: "Recipe subagent",
            queuedAction: "Waiting to publish recipe links",
            result: "This week’s recipe links ready"
        },
        {
            actions: [
                {
                    action: "Order complete and recipes ready",
                    thinking: "The Sunday Meal Prep run is complete: order confirmed, delivery scheduled, and recipes linked. I’ll keep the next Sunday trigger scheduled."
                }
            ],
            graphNodeId: "order-complete",
            key: "complete",
            name: "Workflow complete",
            queuedAction: "Waiting for workflow completion",
            result: "Order complete · recipes ready"
        }
    ] satisfies readonly SavedWorkflowSubagentScript[],
    workflowCardRevealDelayMs: 1_400,
    workflowName: "Sunday Meal Prep workflow"
} as const;

export const savedWorkflowStoryboardFrames: readonly SavedWorkflowStoryboardFrame[] = savedWorkflowStoryboardScript.subagents.flatMap((subagent) => (
    subagent.actions.map(({ action, thinking }, actionIndex) => ({
        action,
        durationMs: workflowFrameDurationsBySubagent[subagent.key][actionIndex] ?? 1_800,
        graphNodeId: subagent.graphNodeId,
        key: `${subagent.key}-${actionIndex}`,
        runtimeMs: workflowFrameRuntimeDurationsBySubagent[subagent.key][actionIndex] ?? 1_200,
        subagentKey: subagent.key,
        subagentName: subagent.name,
        thinking
    }))
));

export const savedWorkflowStoryboardFinalFrameIndex = savedWorkflowStoryboardFrames.length - 1;
export const savedWorkflowStoryboardApprovalFrameIndex = savedWorkflowStoryboardFrames.findIndex((frame) => frame.key === "approval-1");

export function getSavedWorkflowSubagentStates(activeFrameIndex: number): readonly SavedWorkflowSubagentRuntimeState[] {
    const activeFrame = savedWorkflowStoryboardFrames[activeFrameIndex] ?? savedWorkflowStoryboardFrames[savedWorkflowStoryboardFinalFrameIndex];
    const activeSubagentIndex = savedWorkflowStoryboardScript.subagents.findIndex((subagent) => subagent.key === activeFrame.subagentKey);

    return savedWorkflowStoryboardScript.subagents.map((subagent, subagentIndex) => {
        if (subagentIndex < activeSubagentIndex) {
            return {
                action: subagent.result,
                key: subagent.key,
                name: subagent.name,
                state: "done"
            };
        }

        if (subagentIndex === activeSubagentIndex) {
            return {
                action: activeFrame.action,
                duration: getSavedWorkflowFrameDurationLabel(activeFrame),
                key: subagent.key,
                name: subagent.name,
                state: subagent.key === "complete" ? "complete" : subagent.key === "approval" ? "waiting" : "active",
                thinking: activeFrame.thinking
            };
        }

        return {
            action: subagent.queuedAction,
            key: subagent.key,
            name: subagent.name,
            state: "queued"
        };
    });
}

export function getSavedWorkflowRuntimeStartMs(frameIndex: number) {
    return savedWorkflowStoryboardFrames
        .slice(0, Math.max(0, frameIndex))
        .reduce((totalMs, frame) => totalMs + frame.runtimeMs, 0);
}

export function getSavedWorkflowRuntimeElapsedMs(frameIndex: number, frameProgress = 1) {
    const activeFrame = savedWorkflowStoryboardFrames[frameIndex];
    const clampedFrameProgress = Math.min(1, Math.max(0, frameProgress));

    return getSavedWorkflowRuntimeStartMs(frameIndex)
        + Math.round((activeFrame?.runtimeMs ?? 0) * clampedFrameProgress);
}

export function getSavedWorkflowStoryboardRuntimeElapsedMs() {
    return savedWorkflowStoryboardFrames.reduce((totalMs, frame) => totalMs + frame.runtimeMs, 0);
}

function getSavedWorkflowFrameDurationLabel(frame: SavedWorkflowStoryboardFrame) {
    if (frame.subagentKey === "approval" && frame.runtimeMs === 0) {
        return "Waiting";
    }

    return formatSavedWorkflowRuntimeDuration(frame.runtimeMs);
}

function formatSavedWorkflowRuntimeDuration(runtimeMs: number) {
    const runtimeSeconds = runtimeMs / 1_000;

    if (runtimeSeconds < 10 && runtimeMs % 1_000 !== 0) {
        return `${runtimeSeconds.toFixed(1)}s`;
    }

    return `${Math.max(1, Math.round(runtimeSeconds))}s`;
}

export function getSavedWorkflowActiveSubagentIndex(activeFrameIndex: number) {
    const activeFrame = savedWorkflowStoryboardFrames[activeFrameIndex] ?? savedWorkflowStoryboardFrames[savedWorkflowStoryboardFinalFrameIndex];

    return savedWorkflowStoryboardScript.subagents.findIndex((subagent) => subagent.key === activeFrame.subagentKey);
}
