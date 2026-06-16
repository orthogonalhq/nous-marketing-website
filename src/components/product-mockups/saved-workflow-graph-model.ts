import type { WorkflowConnectorItem, WorkflowNodeItem, WorkflowNodeStatus } from "@/components/mockups/workflow";
import {
    getMealPrepWorkflowToolConnectorSourceX,
    mealPrepWorkflowAgentPorts,
    mealPrepWorkflowNodeLayout
} from "@/components/product-mockups/meal-prep-workflow-graph-layout";
import { mealPrepWorkflowNodeCopy } from "@/components/product-mockups/meal-prep-workflow-node-copy";
import type { SavedWorkflowGraphNodeId } from "@/components/product-mockups/saved-workflow-storyboard-script";

type SavedWorkflowVisualNodeId =
    | "approval-gate"
    | "checkout-agent"
    | "meal-prep-agent"
    | "tool-calendar"
    | "tool-memories"
    | "tool-uber-cart"
    | "tool-uber-checkout"
    | "tool-web-search"
    | "trigger";

type SavedWorkflowVisualNodeDefinition = {
    badges?: readonly string[];
    detail: string;
    height: number;
    icon: WorkflowNodeItem["icon"];
    id: SavedWorkflowVisualNodeId;
    kind: NonNullable<WorkflowNodeItem["kind"]>;
    shape?: WorkflowNodeItem["shape"];
    stackId?: WorkflowNodeItem["stackId"];
    stackPosition?: WorkflowNodeItem["stackPosition"];
    title: string;
    width: number;
    x: number;
    y: number;
};

const savedWorkflowVisualNodeDefinitions: readonly SavedWorkflowVisualNodeDefinition[] = [
    {
        ...mealPrepWorkflowNodeLayout.trigger,
        detail: "Run Sunday · 9:00 AM",
        icon: "play",
        id: "trigger",
        kind: "primary",
        shape: "event",
        title: "Trigger"
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

const savedWorkflowVisualNodeById = Object.fromEntries(
    savedWorkflowVisualNodeDefinitions.map((node) => [node.id, node])
) as Record<SavedWorkflowVisualNodeId, SavedWorkflowVisualNodeDefinition>;

const savedWorkflowGraphOrder: readonly SavedWorkflowGraphNodeId[] = [
    "trigger",
    "check-memories",
    "check-calendar",
    "build-meal-plan",
    "prepare-cart",
    "approval-gate",
    "place-order",
    "recipes-ready",
    "order-complete"
] as const;

const mealPrepAgentActiveNodes: readonly SavedWorkflowGraphNodeId[] = [
    "check-calendar",
    "check-memories",
    "build-meal-plan",
    "prepare-cart"
] as const;

const checkoutAgentActiveNodes: readonly SavedWorkflowGraphNodeId[] = ["place-order", "recipes-ready"] as const;

const toolActiveGraphNodeByVisualNodeId: Partial<Record<SavedWorkflowVisualNodeId, SavedWorkflowGraphNodeId>> = {
    "tool-calendar": "check-calendar",
    "tool-memories": "check-memories",
    "tool-uber-cart": "prepare-cart",
    "tool-uber-checkout": "place-order",
    "tool-web-search": "build-meal-plan"
};

const savedWorkflowFinalDetailOverrides: Partial<Record<SavedWorkflowVisualNodeId, string>> = {
    "checkout-agent": "Order confirmed"
};

export const savedWorkflowGraphNodes = savedWorkflowVisualNodeDefinitions.map((node) => (
    createWorkflowNode(node, "trigger")
)) as readonly WorkflowNodeItem[];

export const savedWorkflowGraphConnectors = [
    createPrimaryHorizontalConnector("trigger-to-meal-prep", "trigger", "meal-prep-agent"),
    createPrimaryHorizontalConnector("meal-prep-to-approval", "meal-prep-agent", "approval-gate"),
    createPrimaryHorizontalConnector("approval-to-checkout", "approval-gate", "checkout-agent"),
    createToolConnector("meal-prep-to-memories", "meal-prep-agent", "tool-memories", { port: "memory" }),
    createToolConnector("meal-prep-to-calendar", "meal-prep-agent", "tool-calendar", { port: "tool" }),
    createToolConnector("checkout-to-uber-checkout", "checkout-agent", "tool-uber-checkout", { port: "tool" })
] as const satisfies readonly WorkflowConnectorItem[];

const savedWorkflowConnectorTargetById: Record<string, SavedWorkflowVisualNodeId> = {
    "approval-to-checkout": "checkout-agent",
    "checkout-to-uber-checkout": "tool-uber-checkout",
    "meal-prep-to-approval": "approval-gate",
    "meal-prep-to-calendar": "tool-calendar",
    "meal-prep-to-memories": "tool-memories",
    "trigger-to-meal-prep": "meal-prep-agent"
};

export function resolveSavedWorkflowNodes(activeGraphNodeId: SavedWorkflowGraphNodeId): readonly WorkflowNodeItem[] {
    return savedWorkflowVisualNodeDefinitions.map((node) => createWorkflowNode(node, activeGraphNodeId));
}

export function resolveSavedWorkflowConnectors(activeGraphNodeId: SavedWorkflowGraphNodeId): readonly WorkflowConnectorItem[] {
    return savedWorkflowGraphConnectors.map((connector) => {
        const targetNodeId = savedWorkflowConnectorTargetById[connector.id];
        const targetStatus = targetNodeId ? getSavedWorkflowVisualNodeStatus(targetNodeId, activeGraphNodeId) : "queued";

        return {
            ...connector,
            active: targetStatus === "active" || targetStatus === "complete" || targetStatus === "done"
        };
    });
}

export function getSavedWorkflowNodeStatus(nodeId: SavedWorkflowGraphNodeId, activeGraphNodeId: SavedWorkflowGraphNodeId): WorkflowNodeStatus {
    const visualNodeId = mapLegacyGraphNodeToPrimaryVisualNode(nodeId);

    return getSavedWorkflowVisualNodeStatus(visualNodeId, activeGraphNodeId);
}

export function getSavedWorkflowCalloutPosition(activeGraphNodeId: SavedWorkflowGraphNodeId) {
    const visualNodeId = mapLegacyGraphNodeToPrimaryVisualNode(activeGraphNodeId);
    const node = savedWorkflowVisualNodeById[visualNodeId];

    return `left-[${(node.x + node.width + 24) / 16}rem] top-[${(node.y + 6) / 16}rem]`;
}

export function getSavedWorkflowCalloutLabel(subagentName: string, action: string) {
    return subagentName === "Approval gate" ? action : `${subagentName} active`;
}

function createWorkflowNode(node: SavedWorkflowVisualNodeDefinition, activeGraphNodeId: SavedWorkflowGraphNodeId): WorkflowNodeItem {
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
        detail: getWorkflowNodeDetail(node, activeGraphNodeId),
        icon: node.icon,
        id: node.id,
        kind: node.kind,
        positionClassName: "",
        positionStyle,
        ports: node.id === "meal-prep-agent" || node.id === "checkout-agent" ? mealPrepWorkflowAgentPorts : undefined,
        shape: node.shape,
        showCompletionCheck: true,
        stackId: node.stackId,
        stackPosition: node.stackPosition,
        status: getSavedWorkflowVisualNodeStatus(node.id, activeGraphNodeId),
        title: node.title
    };
}

function getWorkflowNodeDetail(node: SavedWorkflowVisualNodeDefinition, activeGraphNodeId: SavedWorkflowGraphNodeId) {
    if (activeGraphNodeId === "order-complete") {
        return savedWorkflowFinalDetailOverrides[node.id] ?? node.detail;
    }

    if (activeGraphNodeId === "recipes-ready" && node.id === "checkout-agent") {
        return savedWorkflowFinalDetailOverrides["checkout-agent"] ?? node.detail;
    }

    return node.detail;
}

function createPrimaryHorizontalConnector(id: string, sourceNodeId: SavedWorkflowVisualNodeId, targetNodeId: SavedWorkflowVisualNodeId): WorkflowConnectorItem {
    const sourceNode = savedWorkflowVisualNodeById[sourceNodeId];
    const targetNode = savedWorkflowVisualNodeById[targetNodeId];
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

function createToolConnector(id: string, sourceNodeId: SavedWorkflowVisualNodeId, targetNodeId: SavedWorkflowVisualNodeId, options: { label?: string; port?: "center" | "memory" | "tool" } = {}): WorkflowConnectorItem {
    const sourceNode = savedWorkflowVisualNodeById[sourceNodeId];
    const targetNode = savedWorkflowVisualNodeById[targetNodeId];
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
                left: roundWorkflowConnectorCoordinate(sourceX),
                top: roundWorkflowConnectorCoordinate(sourceY)
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

function roundWorkflowConnectorCoordinate(value: number) {
    return Math.round(value);
}

function getSavedWorkflowVisualNodeStatus(nodeId: SavedWorkflowVisualNodeId, activeGraphNodeId: SavedWorkflowGraphNodeId): WorkflowNodeStatus {
    if (nodeId === "trigger") {
        return activeGraphNodeId === "trigger" ? "active" : "done";
    }

    if (nodeId === "meal-prep-agent") {
        if (mealPrepAgentActiveNodes.includes(activeGraphNodeId)) {
            return "active";
        }

        return getSavedWorkflowGraphIndex(activeGraphNodeId) > getSavedWorkflowGraphIndex("prepare-cart") ? "done" : "queued";
    }

    if (nodeId === "approval-gate") {
        if (activeGraphNodeId === "approval-gate") {
            return "active";
        }

        return getSavedWorkflowGraphIndex(activeGraphNodeId) > getSavedWorkflowGraphIndex("approval-gate") ? "done" : "queued";
    }

    if (nodeId === "checkout-agent") {
        if (checkoutAgentActiveNodes.includes(activeGraphNodeId)) {
            return "active";
        }

        return activeGraphNodeId === "order-complete" ? "complete" : "queued";
    }

    return getSavedWorkflowToolNodeStatus(nodeId, activeGraphNodeId);
}

function getSavedWorkflowToolNodeStatus(nodeId: SavedWorkflowVisualNodeId, activeGraphNodeId: SavedWorkflowGraphNodeId): WorkflowNodeStatus {
    const toolActiveGraphNodeId = toolActiveGraphNodeByVisualNodeId[nodeId];

    if (!toolActiveGraphNodeId) {
        return "queued";
    }

    if (activeGraphNodeId === toolActiveGraphNodeId) {
        return "active";
    }

    return getSavedWorkflowGraphIndex(activeGraphNodeId) > getSavedWorkflowGraphIndex(toolActiveGraphNodeId) ? "done" : "queued";
}

function mapLegacyGraphNodeToPrimaryVisualNode(nodeId: SavedWorkflowGraphNodeId): SavedWorkflowVisualNodeId {
    switch (nodeId) {
        case "approval-gate":
            return "approval-gate";
        case "build-meal-plan":
        case "check-calendar":
        case "check-memories":
        case "prepare-cart":
            return "meal-prep-agent";
        case "place-order":
        case "recipes-ready":
        case "order-complete":
            return "checkout-agent";
        case "trigger":
            return "trigger";
    }
}

function getSavedWorkflowGraphIndex(nodeId: SavedWorkflowGraphNodeId) {
    return savedWorkflowGraphOrder.indexOf(nodeId);
}
