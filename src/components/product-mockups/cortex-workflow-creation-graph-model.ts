import type { WorkflowConnectorItem, WorkflowNodeItem, WorkflowNodeStatus } from "@/components/mockups/workflow";
import type { CortexWorkflowCreationGraphNodeId } from "@/components/product-mockups/cortex-workflow-creation-script";
import {
    getMealPrepWorkflowToolConnectorSourceX,
    mealPrepWorkflowAgentPorts,
    mealPrepWorkflowNodeLayout,
    mealPrepWorkflowPrimaryNodeGap
} from "@/components/product-mockups/meal-prep-workflow-graph-layout";
import { mealPrepWorkflowNodeCopy } from "@/components/product-mockups/meal-prep-workflow-node-copy";

type CortexWorkflowCreationVisualNodeId =
    | "approval-gate"
    | "checkout-agent"
    | "meal-prep-agent"
    | "tool-calendar"
    | "tool-memories"
    | "tool-uber-cart"
    | "tool-uber-checkout"
    | "tool-web-search"
    | "trigger";

type CortexWorkflowCreationVisualNodeDefinition = {
    badges?: readonly string[];
    detail: string;
    height: number;
    icon: WorkflowNodeItem["icon"];
    id: CortexWorkflowCreationVisualNodeId;
    kind: NonNullable<WorkflowNodeItem["kind"]>;
    shape?: WorkflowNodeItem["shape"];
    stackId?: WorkflowNodeItem["stackId"];
    stackPosition?: WorkflowNodeItem["stackPosition"];
    title: string;
    width: number;
    x: number;
    y: number;
};

const cortexWorkflowCreationVisualNodeDefinitions: readonly CortexWorkflowCreationVisualNodeDefinition[] = [
    {
        ...mealPrepWorkflowNodeLayout.trigger,
        detail: "Every Sunday · 9:00 AM",
        icon: "play",
        id: "trigger",
        kind: "primary",
        shape: "event",
        title: "Schedule"
    },
    {
        ...mealPrepWorkflowNodeLayout.mealPrepAgent,
        detail: mealPrepWorkflowNodeCopy.mealPrepAgentDirective,
        icon: "agent",
        id: "meal-prep-agent",
        kind: "primary",
        title: "Agent"
    },
    {
        ...mealPrepWorkflowNodeLayout.approvalGate,
        detail: mealPrepWorkflowNodeCopy.checkoutApproval,
        icon: "flag",
        id: "approval-gate",
        kind: "primary",
        shape: "gate",
        title: "Approval"
    },
    {
        ...mealPrepWorkflowNodeLayout.checkoutAgent,
        detail: mealPrepWorkflowNodeCopy.checkoutAgentDirective,
        icon: "agent",
        id: "checkout-agent",
        kind: "primary",
        title: "Agent"
    },
    {
        ...mealPrepWorkflowNodeLayout.toolMemories,
        badges: mealPrepWorkflowNodeCopy.memoryBadges,
        detail: "",
        icon: "database",
        id: "tool-memories",
        kind: "tool",
        title: "Memory"
    },
    {
        ...mealPrepWorkflowNodeLayout.toolCalendar,
        badges: mealPrepWorkflowNodeCopy.scheduleToolBadges,
        detail: "",
        icon: "historyClock",
        id: "tool-calendar",
        kind: "tool",
        title: "Calendar"
    },
    {
        ...mealPrepWorkflowNodeLayout.toolWebSearch,
        badges: mealPrepWorkflowNodeCopy.recipeToolBadges,
        detail: "",
        icon: "search",
        id: "tool-web-search",
        kind: "tool",
        title: "Web Search"
    },
    {
        ...mealPrepWorkflowNodeLayout.toolUberCart,
        badges: mealPrepWorkflowNodeCopy.groceryToolBadges,
        detail: "",
        icon: "box",
        id: "tool-uber-cart",
        kind: "tool",
        title: "Uber Eats"
    },
    {
        ...mealPrepWorkflowNodeLayout.toolUberCheckout,
        badges: mealPrepWorkflowNodeCopy.checkoutToolBadges,
        detail: "",
        icon: "box",
        id: "tool-uber-checkout",
        kind: "tool",
        title: "Uber Eats"
    }
] as const;

const cortexWorkflowCreationVisualNodeById = Object.fromEntries(
    cortexWorkflowCreationVisualNodeDefinitions.map((node) => [node.id, node])
) as Record<CortexWorkflowCreationVisualNodeId, CortexWorkflowCreationVisualNodeDefinition>;

const cortexWorkflowCreationGraphOrder: readonly CortexWorkflowCreationGraphNodeId[] = [
    "schedule",
    "agent",
    "memory",
    "calendar",
    "recipes",
    "cart",
    "approval",
    "checkout",
    "save"
] as const;

const toolActiveGraphNodeByVisualNodeId: Partial<Record<CortexWorkflowCreationVisualNodeId, CortexWorkflowCreationGraphNodeId>> = {
    "tool-calendar": "calendar",
    "tool-memories": "memory",
    "tool-uber-cart": "cart",
    "tool-uber-checkout": "checkout",
    "tool-web-search": "recipes"
};

const graphNodeRevealStepByVisualNodeId: Record<CortexWorkflowCreationVisualNodeId, CortexWorkflowCreationGraphNodeId> = {
    "approval-gate": "approval",
    "checkout-agent": "checkout",
    "meal-prep-agent": "agent",
    "tool-calendar": "calendar",
    "tool-memories": "memory",
    "tool-uber-cart": "cart",
    "tool-uber-checkout": "checkout",
    "tool-web-search": "recipes",
    trigger: "schedule"
};

export function resolveCortexWorkflowCreationNodes(activeGraphNodeId: CortexWorkflowCreationGraphNodeId, pressedPlaceholderGraphNodeId?: CortexWorkflowCreationGraphNodeId): readonly WorkflowNodeItem[] {
    const visibleNodes = cortexWorkflowCreationVisualNodeDefinitions
        .filter((node) => isCortexWorkflowCreationGraphStepVisible(graphNodeRevealStepByVisualNodeId[node.id], activeGraphNodeId))
        .map((node) => createWorkflowNode(node, activeGraphNodeId));

    const placeholderNodes = createWorkflowPlaceholderNodes(activeGraphNodeId, pressedPlaceholderGraphNodeId);

    return [...visibleNodes, ...placeholderNodes];
}

export function resolveCortexWorkflowCreationConnectors(activeGraphNodeId: CortexWorkflowCreationGraphNodeId): readonly WorkflowConnectorItem[] {
    const visibleConnectors = cortexWorkflowCreationGraphConnectors
        .filter((connector) => isCortexWorkflowCreationGraphStepVisible(cortexWorkflowCreationConnectorRevealStepById[connector.id], activeGraphNodeId))
        .map((connector) => ({
            ...connector,
            active: false
        }));

    const placeholderConnectors = createPlaceholderConnectors(activeGraphNodeId);

    return [...visibleConnectors, ...placeholderConnectors];
}

const cortexWorkflowCreationGraphConnectors = [
    createPrimaryHorizontalConnector("schedule-to-meal-prep", "trigger", "meal-prep-agent"),
    createPrimaryHorizontalConnector("meal-prep-to-approval", "meal-prep-agent", "approval-gate"),
    createPrimaryHorizontalConnector("approval-to-checkout", "approval-gate", "checkout-agent"),
    createToolConnector("meal-prep-to-memories", "meal-prep-agent", "tool-memories", { port: "memory" }),
    createToolConnector("meal-prep-to-calendar", "meal-prep-agent", "tool-calendar", { port: "tool" }),
    createToolConnector("checkout-to-uber-checkout", "checkout-agent", "tool-uber-checkout", { port: "tool" })
] as const satisfies readonly WorkflowConnectorItem[];

const cortexWorkflowCreationConnectorRevealStepById: Record<string, CortexWorkflowCreationGraphNodeId> = {
    "meal-prep-to-approval": "agent",
    "approval-to-checkout": "approval",
    "meal-prep-to-calendar": "calendar",
    "meal-prep-to-memories": "memory",
    "schedule-to-meal-prep": "schedule",
    "checkout-to-uber-checkout": "checkout"
};

function createPlaceholderConnectors(activeGraphNodeId: CortexWorkflowCreationGraphNodeId): readonly WorkflowConnectorItem[] {
    if (getCortexWorkflowCreationGraphIndex(activeGraphNodeId) < getCortexWorkflowCreationGraphIndex("checkout")) {
        return [];
    }

    return [createPrimaryHorizontalConnectorToPoint("checkout-to-next-placeholder", "checkout-agent", getAfterCheckoutPlaceholderPosition())];
}

function createWorkflowNode(node: CortexWorkflowCreationVisualNodeDefinition, activeGraphNodeId: CortexWorkflowCreationGraphNodeId): WorkflowNodeItem {
    const positionStyle: WorkflowNodeItem["positionStyle"] = node.kind === "tool"
        ? {
            left: node.x,
            top: node.y,
            width: node.width
        }
        : {
            height: node.height,
            left: node.x,
            minHeight: node.height,
            top: node.y,
            width: node.width
        };

    return {
        badges: node.badges,
        detail: node.detail,
        icon: node.icon,
        id: node.id,
        kind: node.kind,
        positionClassName: "",
        positionStyle,
        ports: node.id === "meal-prep-agent" || node.id === "checkout-agent" ? mealPrepWorkflowAgentPorts : undefined,
        shape: node.shape,
        stackId: node.stackId,
        stackPosition: node.stackPosition,
        status: getCortexWorkflowCreationVisualNodeStatus(node.id, activeGraphNodeId),
        title: node.title
    };
}

function shouldStackPlaceholder(graphNodeId: CortexWorkflowCreationGraphNodeId) {
    return graphNodeId === "recipes" || graphNodeId === "cart";
}

function createWorkflowPlaceholderNodes(activeGraphNodeId: CortexWorkflowCreationGraphNodeId, pressedPlaceholderGraphNodeId?: CortexWorkflowCreationGraphNodeId): readonly WorkflowNodeItem[] {
    if (activeGraphNodeId === "idle") {
        return [createPlaceholderNode(cortexWorkflowCreationVisualNodeById.trigger, "schedule", pressedPlaceholderGraphNodeId)];
    }

    if (activeGraphNodeId === "schedule") {
        return [createPlaceholderNode(cortexWorkflowCreationVisualNodeById["meal-prep-agent"], "agent", pressedPlaceholderGraphNodeId)];
    }

    const activeIndex = getCortexWorkflowCreationGraphIndex(activeGraphNodeId);

    if (activeIndex < getCortexWorkflowCreationGraphIndex("agent")) {
        return [];
    }

    return [
        createPrimaryPlaceholderNode(activeGraphNodeId, pressedPlaceholderGraphNodeId),
        createMemoryPortPlaceholderNode(pressedPlaceholderGraphNodeId),
        createToolPortPlaceholderNode(pressedPlaceholderGraphNodeId),
        createMemoryColumnPlaceholderNode(activeGraphNodeId),
        createSequentialToolPlaceholderNode(activeGraphNodeId, pressedPlaceholderGraphNodeId)
    ].concat(createCheckoutPortPlaceholderNodes(activeGraphNodeId)).filter((node): node is WorkflowNodeItem => Boolean(node));
}

function createCheckoutPortPlaceholderNodes(activeGraphNodeId: CortexWorkflowCreationGraphNodeId): readonly WorkflowNodeItem[] {
    if (getCortexWorkflowCreationGraphIndex(activeGraphNodeId) < getCortexWorkflowCreationGraphIndex("checkout")) {
        return [];
    }

    return [
        createFreePlaceholderNode({
            id: "placeholder-checkout-memory-port",
            kind: "tool",
            positionStyle: getNodePortPlaceholderPosition("checkout-agent", "memory", 16),
            size: "subnode"
        }),
        createFreePlaceholderNode({
            id: "placeholder-checkout-tool-port",
            kind: "tool",
            positionStyle: getNodePortPlaceholderPosition("checkout-agent", "tool", 16),
            size: "subnode"
        })
    ].filter((node): node is WorkflowNodeItem => Boolean(node));
}

function createPrimaryPlaceholderNode(activeGraphNodeId: CortexWorkflowCreationGraphNodeId, pressedPlaceholderGraphNodeId?: CortexWorkflowCreationGraphNodeId): WorkflowNodeItem | undefined {
    if (getCortexWorkflowCreationGraphIndex(activeGraphNodeId) < getCortexWorkflowCreationGraphIndex("approval")) {
        return createPlaceholderNode(cortexWorkflowCreationVisualNodeById["approval-gate"], "approval", pressedPlaceholderGraphNodeId);
    }

    if (getCortexWorkflowCreationGraphIndex(activeGraphNodeId) < getCortexWorkflowCreationGraphIndex("checkout")) {
        return createPlaceholderNode(cortexWorkflowCreationVisualNodeById["checkout-agent"], "checkout", pressedPlaceholderGraphNodeId);
    }

    return createFreePlaceholderNode({
        id: "placeholder-primary-next",
        kind: "primary",
        positionStyle: getAfterCheckoutPlaceholderPosition(),
        size: "node"
    });
}

function createMemoryPortPlaceholderNode(pressedPlaceholderGraphNodeId?: CortexWorkflowCreationGraphNodeId): WorkflowNodeItem {
    return createFreePlaceholderNode({
        id: "placeholder-memory-port",
        kind: "tool",
        placeholderState: pressedPlaceholderGraphNodeId === "memory" ? "pressed" : "idle",
        positionStyle: getNodePortPlaceholderPosition("meal-prep-agent", "memory", 16),
        size: "subnode"
    });
}

function createToolPortPlaceholderNode(pressedPlaceholderGraphNodeId?: CortexWorkflowCreationGraphNodeId): WorkflowNodeItem {
    return createFreePlaceholderNode({
        id: "placeholder-tool-port",
        kind: "tool",
        placeholderState: pressedPlaceholderGraphNodeId === "calendar" ? "pressed" : "idle",
        positionStyle: getNodePortPlaceholderPosition("meal-prep-agent", "tool", 16),
        size: "subnode"
    });
}

function createMemoryColumnPlaceholderNode(activeGraphNodeId: CortexWorkflowCreationGraphNodeId): WorkflowNodeItem | undefined {
    if (getCortexWorkflowCreationGraphIndex(activeGraphNodeId) < getCortexWorkflowCreationGraphIndex("memory")) {
        return undefined;
    }

    return createFreePlaceholderNode({
        id: "placeholder-memory-next",
        kind: "tool",
        positionStyle: {
            width: cortexWorkflowCreationVisualNodeById["tool-memories"].width
        },
        size: "subnode",
        stackId: cortexWorkflowCreationVisualNodeById["tool-memories"].stackId
    });
}

function createSequentialToolPlaceholderNode(activeGraphNodeId: CortexWorkflowCreationGraphNodeId, pressedPlaceholderGraphNodeId?: CortexWorkflowCreationGraphNodeId): WorkflowNodeItem | undefined {
    if (getCortexWorkflowCreationGraphIndex(activeGraphNodeId) < getCortexWorkflowCreationGraphIndex("calendar")) {
        return undefined;
    }

    if (getCortexWorkflowCreationGraphIndex(activeGraphNodeId) < getCortexWorkflowCreationGraphIndex("recipes")) {
        return createPlaceholderNode(cortexWorkflowCreationVisualNodeById["tool-web-search"], "recipes", pressedPlaceholderGraphNodeId);
    }

    if (getCortexWorkflowCreationGraphIndex(activeGraphNodeId) < getCortexWorkflowCreationGraphIndex("cart")) {
        return createPlaceholderNode(cortexWorkflowCreationVisualNodeById["tool-uber-cart"], "cart", pressedPlaceholderGraphNodeId);
    }

    return createFreePlaceholderNode({
        id: "placeholder-tool-next",
        kind: "tool",
        placeholderState: "idle",
        positionStyle: {
            width: cortexWorkflowCreationVisualNodeById["tool-uber-cart"].width
        },
        size: "subnode",
        stackId: cortexWorkflowCreationVisualNodeById["tool-uber-cart"].stackId
    });
}

function createPlaceholderNode(node: CortexWorkflowCreationVisualNodeDefinition, graphNodeId: CortexWorkflowCreationGraphNodeId, pressedPlaceholderGraphNodeId?: CortexWorkflowCreationGraphNodeId): WorkflowNodeItem {
    const isSubnode = node.kind === "tool";
    const placeholderSize = isSubnode ? 16 : 32;
    const placeholderPosition = getPlaceholderPosition(node, graphNodeId, placeholderSize);

    return {
        detail: "",
        icon: "squarePlus",
        id: `placeholder-${graphNodeId}`,
        kind: node.kind,
        placeholder: true,
        placeholderSize: isSubnode ? "subnode" : "node",
        placeholderState: pressedPlaceholderGraphNodeId === graphNodeId ? "pressed" : "idle",
        positionClassName: "",
        positionStyle: placeholderPosition,
        stackId: shouldStackPlaceholder(graphNodeId) ? node.stackId : undefined,
        stackPosition: shouldStackPlaceholder(graphNodeId) ? node.stackPosition : undefined,
        status: "queued",
        title: ""
    };
}

function createFreePlaceholderNode({ id, kind, placeholderState = "idle", positionStyle, size, stackId }: {
    id: string;
    kind: NonNullable<WorkflowNodeItem["kind"]>;
    placeholderState?: "idle" | "pressed";
    positionStyle: WorkflowNodeItem["positionStyle"];
    size: "node" | "subnode";
    stackId?: string;
}): WorkflowNodeItem {
    return {
        detail: "",
        icon: "squarePlus",
        id,
        kind,
        placeholder: true,
        placeholderSize: size,
        placeholderState,
        positionClassName: "",
        positionStyle,
        stackId,
        status: "queued",
        title: ""
    };
}

function getPlaceholderPosition(node: CortexWorkflowCreationVisualNodeDefinition, graphNodeId: CortexWorkflowCreationGraphNodeId, placeholderSize: number): WorkflowNodeItem["positionStyle"] {
    if (graphNodeId === "agent") {
        return {
            height: placeholderSize,
            left: node.x,
            top: node.y + (node.height / 2) - (placeholderSize / 2),
            width: placeholderSize
        };
    }

    if (graphNodeId === "approval") {
        return {
            height: placeholderSize,
            left: node.x,
            top: node.y + (node.height / 2) - (placeholderSize / 2),
            width: placeholderSize
        };
    }

    if (graphNodeId === "checkout") {
        return {
            height: placeholderSize,
            left: node.x,
            top: node.y + (node.height / 2) - (placeholderSize / 2),
            width: placeholderSize
        };
    }

    if (graphNodeId === "memory") {
        return getNodePortPlaceholderPosition("meal-prep-agent", "memory", placeholderSize);
    }

    if (graphNodeId === "calendar") {
        return getNodePortPlaceholderPosition("meal-prep-agent", "tool", placeholderSize);
    }

    if (graphNodeId === "recipes" || graphNodeId === "cart") {
        return { width: node.width };
    }

    return {
        height: placeholderSize,
        left: node.x + (node.width / 2) - (placeholderSize / 2),
        top: node.y + (node.height / 2) - (placeholderSize / 2),
        width: placeholderSize
    };
}

function getNodePortPlaceholderPosition(nodeId: "checkout-agent" | "meal-prep-agent", port: "memory" | "tool", placeholderSize: number): WorkflowNodeItem["positionStyle"] {
    const agentNode = cortexWorkflowCreationVisualNodeById[nodeId];
    const portX = getMealPrepWorkflowToolConnectorSourceX(agentNode, port);

    return {
        height: placeholderSize,
        left: portX - (placeholderSize / 2),
        top: agentNode.y + agentNode.height + 4,
        width: placeholderSize
    };
}

function getAfterCheckoutPlaceholderPosition(): WorkflowNodeItem["positionStyle"] {
    const checkoutNode = cortexWorkflowCreationVisualNodeById["checkout-agent"];
    const placeholderSize = 32;

    return {
        height: placeholderSize,
        left: checkoutNode.x + checkoutNode.width + mealPrepWorkflowPrimaryNodeGap,
        top: checkoutNode.y + (checkoutNode.height / 2) - (placeholderSize / 2),
        width: placeholderSize
    };
}

function createPrimaryHorizontalConnector(id: string, sourceNodeId: CortexWorkflowCreationVisualNodeId, targetNodeId: CortexWorkflowCreationVisualNodeId): WorkflowConnectorItem {
    const sourceNode = cortexWorkflowCreationVisualNodeById[sourceNodeId];
    const targetNode = cortexWorkflowCreationVisualNodeById[targetNodeId];
    const sourceX = sourceNode.x + sourceNode.width;
    const sourceY = sourceNode.y + (sourceNode.height / 2);
    const targetX = targetNode.x;
    const targetY = targetNode.y + (targetNode.height / 2);
    const top = Math.min(sourceY, targetY) - 4;
    const width = targetX - sourceX;
    const height = Math.abs(targetY - sourceY) + 8;
    const startY = sourceY - top;
    const endY = targetY - top;
    const arrowBaseX = width - 7.75;
    const arrowTipX = width - 2;

    return {
        id,
        path: {
            arrowD: `M${arrowTipX} ${endY} L${arrowBaseX} ${endY - 3.5} L${arrowBaseX} ${endY + 3.5} Z`,
            d: `M1.5 ${startY} C${Math.max(width * 0.45, 12)} ${startY} ${Math.max(width * 0.55, 18)} ${endY} ${arrowBaseX} ${endY}`,
            positionClassName: "",
            positionStyle: {
                height,
                left: sourceX,
                top,
                width
            },
            viewBox: `0 0 ${width} ${height}`
        }
    };
}

function createPrimaryHorizontalConnectorToPoint(id: string, sourceNodeId: CortexWorkflowCreationVisualNodeId, targetPosition: WorkflowNodeItem["positionStyle"]): WorkflowConnectorItem {
    const sourceNode = cortexWorkflowCreationVisualNodeById[sourceNodeId];
    const targetLeft = Number(targetPosition?.left ?? 0);
    const targetTop = Number(targetPosition?.top ?? 0);
    const targetHeight = Number(targetPosition?.height ?? 0);
    const sourceX = sourceNode.x + sourceNode.width;
    const sourceY = sourceNode.y + (sourceNode.height / 2);
    const targetX = targetLeft;
    const targetY = targetTop + (targetHeight / 2);
    const top = Math.min(sourceY, targetY) - 4;
    const width = targetX - sourceX;
    const height = Math.abs(targetY - sourceY) + 8;
    const startY = sourceY - top;
    const endY = targetY - top;
    const arrowBaseX = width - 7.75;
    const arrowTipX = width - 2;

    return {
        active: false,
        id,
        path: {
            arrowD: `M${arrowTipX} ${endY} L${arrowBaseX} ${endY - 3.5} L${arrowBaseX} ${endY + 3.5} Z`,
            d: `M1.5 ${startY} C${Math.max(width * 0.45, 12)} ${startY} ${Math.max(width * 0.55, 18)} ${endY} ${arrowBaseX} ${endY}`,
            positionClassName: "",
            positionStyle: {
                height,
                left: sourceX,
                top,
                width
            },
            viewBox: `0 0 ${width} ${height}`
        }
    };
}

function createToolConnector(id: string, sourceNodeId: CortexWorkflowCreationVisualNodeId, targetNodeId: CortexWorkflowCreationVisualNodeId, options: { label?: string; port?: "center" | "memory" | "tool" } = {}): WorkflowConnectorItem {
    const sourceNode = cortexWorkflowCreationVisualNodeById[sourceNodeId];
    const targetNode = cortexWorkflowCreationVisualNodeById[targetNodeId];
    const targetCenterX = targetNode.x + (targetNode.width / 2);
    const sourceX = getMealPrepWorkflowToolConnectorSourceX(sourceNode, options.port ?? "center");
    const sourceY = sourceNode.y + sourceNode.height;
    const targetX = targetCenterX;
    const targetY = targetNode.y;
    const left = Math.min(sourceX, targetX);
    const width = Math.max(Math.abs(targetX - sourceX), 1);
    const height = targetY - sourceY;
    const sourceLocalX = sourceX - left;
    const targetLocalX = targetX - left;

    return {
        id,
        path: {
            bidirectional: true,
            d: `M${sourceLocalX} 0 C${sourceLocalX} ${height * 0.38} ${targetLocalX} ${height * 0.62} ${targetLocalX} ${height}`,
            label: options.label,
            labelPositionStyle: options.label ? {
                left: Math.round(sourceX),
                top: Math.round(sourceY)
            } : undefined,
            positionClassName: "",
            positionStyle: {
                height,
                left,
                top: sourceY,
                width
            },
            variant: "tool",
            viewBox: `0 0 ${width} ${height}`
        }
    };
}

function getCortexWorkflowCreationVisualNodeStatus(nodeId: CortexWorkflowCreationVisualNodeId, activeGraphNodeId: CortexWorkflowCreationGraphNodeId): WorkflowNodeStatus {
    if (activeGraphNodeId === "save") {
        return "done";
    }

    if (nodeId === "trigger") {
        return getCortexWorkflowCreationGraphIndex(activeGraphNodeId) > getCortexWorkflowCreationGraphIndex("schedule") ? "done" : "queued";
    }

    if (nodeId === "meal-prep-agent") {
        return getCortexWorkflowCreationGraphIndex(activeGraphNodeId) > getCortexWorkflowCreationGraphIndex("agent") ? "done" : "queued";
    }

    if (nodeId === "approval-gate") {
        return getCortexWorkflowCreationGraphIndex(activeGraphNodeId) > getCortexWorkflowCreationGraphIndex("approval") ? "done" : "queued";
    }

    if (nodeId === "checkout-agent") {
        return getCortexWorkflowCreationGraphIndex(activeGraphNodeId) > getCortexWorkflowCreationGraphIndex("checkout") ? "done" : "queued";
    }

    return getCortexWorkflowCreationToolNodeStatus(nodeId, activeGraphNodeId);
}

function isCortexWorkflowCreationGraphStepVisible(revealGraphNodeId: CortexWorkflowCreationGraphNodeId | undefined, activeGraphNodeId: CortexWorkflowCreationGraphNodeId) {
    if (!revealGraphNodeId || activeGraphNodeId === "idle") {
        return false;
    }

    if (activeGraphNodeId === "save") {
        return true;
    }

    return getCortexWorkflowCreationGraphIndex(activeGraphNodeId) >= getCortexWorkflowCreationGraphIndex(revealGraphNodeId);
}

function getCortexWorkflowCreationToolNodeStatus(nodeId: CortexWorkflowCreationVisualNodeId, activeGraphNodeId: CortexWorkflowCreationGraphNodeId): WorkflowNodeStatus {
    const toolActiveGraphNodeId = toolActiveGraphNodeByVisualNodeId[nodeId];

    if (!toolActiveGraphNodeId) {
        return "queued";
    }

    return getCortexWorkflowCreationGraphIndex(activeGraphNodeId) > getCortexWorkflowCreationGraphIndex(toolActiveGraphNodeId) ? "done" : "queued";
}

function getCortexWorkflowCreationGraphIndex(nodeId: CortexWorkflowCreationGraphNodeId) {
    return cortexWorkflowCreationGraphOrder.indexOf(nodeId);
}
