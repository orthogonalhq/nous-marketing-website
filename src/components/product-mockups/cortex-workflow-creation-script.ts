export type CortexWorkflowCreationMode = "storyboard" | "static";

export type CortexWorkflowCreationGraphNodeId =
    | "agent"
    | "approval"
    | "cart"
    | "calendar"
    | "checkout"
    | "idle"
    | "memory"
    | "recipes"
    | "save"
    | "schedule";

export type CortexWorkflowCreationToolCall = {
    action: string;
    call: string;
    duration: string;
    durationMs: number;
    operation: "Create" | "Lint" | "Update";
    result: string;
    service: "Workflow Builder" | "Workflow Linter";
};

export type CortexWorkflowCreationStep = {
    detail: string;
    durationMs: number;
    graphNodeId: CortexWorkflowCreationGraphNodeId;
    key: CortexWorkflowCreationGraphNodeId;
    label: string;
    thinking: string;
    toolCalls: readonly CortexWorkflowCreationToolCall[];
};

export type CortexWorkflowFitThinkingStep = {
    durationMs: number;
    key: string;
    text: string;
};

export const cortexWorkflowCreationScript = {
    assistantLead: "Got it — because this needs to happen every week, I should set this up as a repeatable workflow instead of just making one meal plan.",
    assistantProposal: "Done — I created the Sunday Meal Prep workflow. It will run every Sunday at 9:00 AM, plan around your calendar and preferences, prepare a grocery cart, and pause before checkout.",
    composerPlaceholder: "Ask about the workflow, edit it, or run it once…",
    proposalActions: ["Run once now", "Edit workflow", "Delete workflow"],
    proposalDetails: [
        ["Schedule", "Every Sunday at 9:00 AM"],
        ["Context", "Food memories, budget, delivery address, and calendar"],
        ["Tools", "Recipe search and Uber Groceries"],
        ["Approval", "Required before checkout"],
        ["Output", "Weekly meal plan, grocery cart, and recipe links"]
    ],
    proposalName: "Sunday Meal Prep workflow",
    proposalSummary: ["Created", "Editable anytime", "Approval before checkout"],
    proposalTitle: "Workflow created",
    assistantLeadStreamIntervalMs: 14,
    autoSendDelayMs: 800,
    authoringStartDelayMs: 0,
    workflowFitThinking: {
        steps: [
            {
                durationMs: 1_800,
                key: "recurrence",
                text: "The user is asking for a meal plan, but the important phrase is “every week.” A one-time meal plan would help today and fail next Sunday."
            },
            {
                durationMs: 1_700,
                key: "repeatable-workflow",
                text: "This should not be another answer they have to remember to ask for. A saved workflow can wake up on a timer and build a fresh plan each week."
            },
            {
                durationMs: 1_900,
                key: "ask-permission",
                text: "Creating a workflow is durable automation, so I should ask before I start authoring it. The workflow can be created now without running, ordering groceries, or spending money."
            }
        ] satisfies readonly CortexWorkflowFitThinkingStep[],
        streamIntervalMs: 18
    },
    workflowFitThinkingRevealDelayMs: 320,
    permissionPrompt: {
        actions: ["Create workflow", "Just make this week’s plan", "Ask me first"],
        body: "I can create the workflow now. It will not run, order groceries, or spend money unless you approve those actions later. You can edit or delete it anytime.",
        details: [
            ["Scope", "Create schedule, context, tools, and approval rules"],
            ["Safety", "No workflow run and no purchase will happen yet"],
            ["Next", "You can edit or delete it after creation"]
        ],
        name: "Sunday Meal Prep workflow",
        selectedAction: "Create workflow",
        summary: ["Creates workflow", "No spending", "Editable anytime"],
        title: "Create workflow?"
    },
    permissionPromptDelayMs: 320,
    permissionSelectionClickHoldMs: 420,
    permissionSelectionDelayMs: 1_500,
    socketConnectDelayMs: 700,
    thinkingCollapseDelayMs: 1_000,
    workflowStepHoldMs: 500,
    workflowPlaceholderClickHoldMs: 220,
    workflowToolCallRevealDelayMs: 500,
    steps: [
        {
            detail: "Schedule trigger + lint",
            durationMs: 2_200,
            graphNodeId: "schedule",
            key: "schedule",
            label: "Create trigger",
            thinking: "The workflow needs a trigger first. Sunday morning gives enough time to plan, shop, and cook before the week starts.",
            toolCalls: [
                {
                    action: "Creating schedule trigger",
                    call: "workflow.createNode({ type: \"schedule\", cadence: \"weekly\", day: \"Sunday\", time: \"09:00\" })",
                    duration: "0.9s",
                    durationMs: 900,
                    operation: "Create",
                    result: "Created Schedule node · Every Sunday at 9:00 AM.",
                    service: "Workflow Builder"
                },
                {
                    action: "Linting workflow",
                    call: "workflow.lint()",
                    duration: "0.7s",
                    durationMs: 650,
                    operation: "Lint",
                    result: "Trigger is valid. Missing worker agent.",
                    service: "Workflow Linter"
                }
            ]
        },
        {
            detail: "Meal-planning agent + lint",
            durationMs: 2_000,
            graphNodeId: "agent",
            key: "agent",
            label: "Create planning agent",
            thinking: "Now I need a worker agent that creates a fresh dinner plan each week instead of reusing a static list.",
            toolCalls: [
                {
                    action: "Creating worker agent",
                    call: "workflow.createNode({ type: \"agent\", name: \"Plan 5 dinners\" })",
                    duration: "0.9s",
                    durationMs: 900,
                    operation: "Create",
                    result: "Created Plan 5 dinners agent.",
                    service: "Workflow Builder"
                },
                {
                    action: "Connecting trigger to agent",
                    call: "workflow.connect(\"Schedule\", \"Plan 5 dinners\")",
                    duration: "0.6s",
                    durationMs: 600,
                    operation: "Update",
                    result: "Schedule now starts the planning agent.",
                    service: "Workflow Builder"
                },
                {
                    action: "Linting workflow",
                    call: "workflow.lint()",
                    duration: "0.7s",
                    durationMs: 650,
                    operation: "Lint",
                    result: "Agent is connected. Missing context permissions.",
                    service: "Workflow Linter"
                }
            ]
        },
        {
            detail: "Use tastes, budget, and address",
            durationMs: 2_000,
            graphNodeId: "memory",
            key: "memory",
            label: "Attach memory",
            thinking: "The plan should use remembered preferences before external tools: dislikes, budget, household size, and delivery address.",
            toolCalls: [
                {
                    action: "Attaching memory context",
                    call: "workflow.attachMemory({ scope: [\"food preferences\", \"budget\", \"delivery address\"] })",
                    duration: "0.9s",
                    durationMs: 900,
                    operation: "Update",
                    result: "Memory scope attached with read permission only.",
                    service: "Workflow Builder"
                },
                {
                    action: "Linting workflow",
                    call: "workflow.lint()",
                    duration: "0.7s",
                    durationMs: 650,
                    operation: "Lint",
                    result: "Memory scope is valid. Calendar context still missing.",
                    service: "Workflow Linter"
                }
            ]
        },
        {
            detail: "Read nights out and late meetings",
            durationMs: 1_900,
            graphNodeId: "calendar",
            key: "calendar",
            label: "Attach calendar",
            thinking: "Dinner plans change with the actual week, so the workflow should check late meetings and nights out before choosing recipes.",
            toolCalls: [
                {
                    action: "Attaching calendar read",
                    call: "workflow.attachTool({ tool: \"Calendar\", mode: \"read\" })",
                    duration: "0.9s",
                    durationMs: 850,
                    operation: "Update",
                    result: "Calendar read permission attached.",
                    service: "Workflow Builder"
                },
                {
                    action: "Linting workflow",
                    call: "workflow.lint()",
                    duration: "0.7s",
                    durationMs: 650,
                    operation: "Lint",
                    result: "Calendar permission is valid. Recipe search still missing.",
                    service: "Workflow Linter"
                }
            ]
        },
        {
            detail: "Find recipes that fit the week",
            durationMs: 1_900,
            graphNodeId: "recipes",
            key: "recipes",
            label: "Attach recipe search",
            thinking: "Once it knows the week and preferences, it can search for fitting recipes instead of repeating the same plan.",
            toolCalls: [
                {
                    action: "Attaching recipe search",
                    call: "workflow.attachTool({ tool: \"Web Search\", purpose: \"find recipes\" })",
                    duration: "0.9s",
                    durationMs: 850,
                    operation: "Update",
                    result: "Recipe search attached to planning agent.",
                    service: "Workflow Builder"
                },
                {
                    action: "Linting workflow",
                    call: "workflow.lint()",
                    duration: "0.7s",
                    durationMs: 650,
                    operation: "Lint",
                    result: "Recipe search is valid. Grocery cart step still missing.",
                    service: "Workflow Linter"
                }
            ]
        },
        {
            detail: "Prepare cart without purchasing",
            durationMs: 2_100,
            graphNodeId: "cart",
            key: "cart",
            label: "Attach grocery tool",
            thinking: "The workflow can prepare a grocery cart, but it should stop before checkout because that spends money.",
            toolCalls: [
                {
                    action: "Attaching grocery cart draft",
                    call: "workflow.attachTool({ tool: \"Uber Eats\", mode: \"draft cart\" })",
                    duration: "1.0s",
                    durationMs: 950,
                    operation: "Update",
                    result: "Uber Eats cart draft attached. Checkout remains blocked.",
                    service: "Workflow Builder"
                },
                {
                    action: "Linting workflow",
                    call: "workflow.lint()",
                    duration: "0.7s",
                    durationMs: 650,
                    operation: "Lint",
                    result: "Cart draft is valid. Purchase approval required.",
                    service: "Workflow Linter"
                }
            ]
        },
        {
            detail: "Pause before checkout",
            durationMs: 1_900,
            graphNodeId: "approval",
            key: "approval",
            label: "Add approval rule",
            thinking: "Checkout needs a human approval checkpoint. The workflow can prepare everything, then pause before purchase.",
            toolCalls: [
                {
                    action: "Adding checkout approval",
                    call: "workflow.addApprovalGate({ before: \"checkout\", required: true })",
                    duration: "0.9s",
                    durationMs: 850,
                    operation: "Create",
                    result: "Approval gate inserted before checkout.",
                    service: "Workflow Builder"
                },
                {
                    action: "Linting workflow",
                    call: "workflow.lint()",
                    duration: "0.7s",
                    durationMs: 650,
                    operation: "Lint",
                    result: "Approval gate is valid. Workflow is ready for final validation.",
                    service: "Workflow Linter"
                }
            ]
        },
        {
            detail: "Approved checkout agent + lint",
            durationMs: 2_000,
            graphNodeId: "checkout",
            key: "checkout",
            label: "Create checkout agent",
            thinking: "After approval, the workflow needs a final agent that can place the grocery order only after the human checkout gate is approved.",
            toolCalls: [
                {
                    action: "Creating checkout agent",
                    call: "workflow.createNode({ type: \"agent\", name: \"Place approved order\" })",
                    duration: "0.9s",
                    durationMs: 900,
                    operation: "Create",
                    result: "Created Place approved order agent after the approval gate.",
                    service: "Workflow Builder"
                },
                {
                    action: "Connecting approval to checkout",
                    call: "workflow.connect(\"Approval\", \"Place approved order\")",
                    duration: "0.6s",
                    durationMs: 600,
                    operation: "Update",
                    result: "Checkout agent now waits for human approval.",
                    service: "Workflow Builder"
                },
                {
                    action: "Linting workflow",
                    call: "workflow.lint()",
                    duration: "0.7s",
                    durationMs: 650,
                    operation: "Lint",
                    result: "Checkout agent is gated correctly. Workflow is ready for final validation.",
                    service: "Workflow Linter"
                }
            ]
        },
        {
            detail: "Created and ready",
            durationMs: 1_900,
            graphNodeId: "save",
            key: "save",
            label: "Validate workflow",
            thinking: "The workflow is valid: weekly trigger, meal-planning agent, memory and calendar context, recipe search, grocery cart draft, and approval before checkout.",
            toolCalls: [
                {
                    action: "Running final lint",
                    call: "workflow.lint({ final: true })",
                    duration: "0.9s",
                    durationMs: 900,
                    operation: "Lint",
                    result: "No blocking issues. Workflow is created and ready.",
                    service: "Workflow Linter"
                }
            ]
        }
    ] satisfies readonly CortexWorkflowCreationStep[],
    typingIntervalMs: 18,
    userMessage: "I’m tired of eating out. I need a meal plan every week.",
    workflowProposalRevealDelayMs: 500
} as const;

export const cortexWorkflowCreationFinalStepIndex = cortexWorkflowCreationScript.steps.length - 1;
