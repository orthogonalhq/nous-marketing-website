import type { WorkflowNodeItem } from "@/components/mockups/workflow";
import { getWorkflowGraphGridCoordinate } from "@/components/mockups/workflow/workflow-grid";

export type MealPrepWorkflowConnectorPort = "center" | "memory" | "tool";

export type MealPrepWorkflowLayoutNode = {
    height: number;
    stackId?: string;
    stackPosition?: NonNullable<WorkflowNodeItem["stackPosition"]>;
    width: number;
    x: number;
    y: number;
};

export const mealPrepWorkflowToolStackId = "meal-prep-tools";
export const mealPrepWorkflowMemoryStackId = "meal-prep-memory";

export const mealPrepWorkflowControlNodeSize = 76;
export const mealPrepWorkflowAgentNodeHeight = 100;
export const mealPrepWorkflowAgentNodeWidth = 150;
export const mealPrepWorkflowPrimaryNodeGap = 58;
export const mealPrepWorkflowToolNodeHeight = 75;
export const mealPrepWorkflowToolNodeWidth = 125;

export const mealPrepWorkflowGraphX = {
    memory: getWorkflowGraphGridCoordinate(4),
    toolStack: getWorkflowGraphGridCoordinate(10),
    trigger: getWorkflowGraphGridCoordinate(0)
} as const;

export const mealPrepWorkflowGraphY = {
    control: getWorkflowGraphGridCoordinate(3) + 12,
    gate: getWorkflowGraphGridCoordinate(3) + 7,
    primary: getWorkflowGraphGridCoordinate(3),
    toolBottom: getWorkflowGraphGridCoordinate(13),
    toolTop: getWorkflowGraphGridCoordinate(9),
    trigger: getWorkflowGraphGridCoordinate(3) + 12
} as const;

const mealPrepWorkflowTriggerCenterX = mealPrepWorkflowGraphX.trigger + 75;
const mealPrepWorkflowTriggerX = mealPrepWorkflowTriggerCenterX - (mealPrepWorkflowControlNodeSize / 2);
const mealPrepWorkflowMealPrepAgentX = mealPrepWorkflowTriggerX + mealPrepWorkflowControlNodeSize + mealPrepWorkflowPrimaryNodeGap;
const mealPrepWorkflowApprovalGateX = mealPrepWorkflowMealPrepAgentX + mealPrepWorkflowAgentNodeWidth + mealPrepWorkflowPrimaryNodeGap;
const mealPrepWorkflowCheckoutAgentX = mealPrepWorkflowApprovalGateX + mealPrepWorkflowControlNodeSize + mealPrepWorkflowPrimaryNodeGap;
const mealPrepWorkflowCheckoutToolX = mealPrepWorkflowCheckoutAgentX + ((mealPrepWorkflowAgentNodeWidth - mealPrepWorkflowToolNodeWidth) / 2);

export const mealPrepWorkflowNodeLayout = {
    approvalGate: {
        height: mealPrepWorkflowControlNodeSize,
        width: mealPrepWorkflowControlNodeSize,
        x: mealPrepWorkflowApprovalGateX,
        y: mealPrepWorkflowGraphY.control
    },
    checkoutAgent: {
        height: mealPrepWorkflowAgentNodeHeight,
        width: mealPrepWorkflowAgentNodeWidth,
        x: mealPrepWorkflowCheckoutAgentX,
        y: mealPrepWorkflowGraphY.primary
    },
    mealPrepAgent: {
        height: mealPrepWorkflowAgentNodeHeight,
        width: mealPrepWorkflowAgentNodeWidth,
        x: mealPrepWorkflowMealPrepAgentX,
        y: mealPrepWorkflowGraphY.primary
    },
    toolCalendar: {
        height: mealPrepWorkflowToolNodeHeight,
        stackId: mealPrepWorkflowToolStackId,
        stackPosition: "first",
        width: mealPrepWorkflowToolNodeWidth,
        x: mealPrepWorkflowGraphX.toolStack,
        y: mealPrepWorkflowGraphY.toolTop
    },
    toolMemories: {
        height: mealPrepWorkflowToolNodeHeight,
        stackId: mealPrepWorkflowMemoryStackId,
        width: mealPrepWorkflowToolNodeWidth,
        x: mealPrepWorkflowGraphX.memory,
        y: mealPrepWorkflowGraphY.toolTop
    },
    toolUberCart: {
        height: mealPrepWorkflowToolNodeHeight,
        stackId: mealPrepWorkflowToolStackId,
        stackPosition: "last",
        width: mealPrepWorkflowToolNodeWidth,
        x: mealPrepWorkflowGraphX.toolStack,
        y: mealPrepWorkflowGraphY.toolTop
    },
    toolUberCheckout: {
        height: mealPrepWorkflowToolNodeHeight,
        width: mealPrepWorkflowToolNodeWidth,
        x: mealPrepWorkflowCheckoutToolX,
        y: mealPrepWorkflowGraphY.toolTop
    },
    toolWebSearch: {
        height: mealPrepWorkflowToolNodeHeight,
        stackId: mealPrepWorkflowToolStackId,
        stackPosition: "middle",
        width: mealPrepWorkflowToolNodeWidth,
        x: mealPrepWorkflowGraphX.toolStack,
        y: mealPrepWorkflowGraphY.toolTop
    },
    trigger: {
        height: mealPrepWorkflowControlNodeSize,
        width: mealPrepWorkflowControlNodeSize,
        x: mealPrepWorkflowTriggerX,
        y: mealPrepWorkflowGraphY.control
    }
} as const satisfies Record<string, MealPrepWorkflowLayoutNode>;

export const mealPrepWorkflowAgentPorts = [
    { label: "Memory", left: "33.333%" },
    { label: "Tool", left: "66.667%" }
] as const satisfies NonNullable<WorkflowNodeItem["ports"]>;

export function getMealPrepWorkflowToolConnectorSourceX(sourceNode: Pick<MealPrepWorkflowLayoutNode, "width" | "x">, port: MealPrepWorkflowConnectorPort) {
    switch (port) {
        case "memory":
            return sourceNode.x + (sourceNode.width / 3);
        case "tool":
            return sourceNode.x + ((sourceNode.width / 3) * 2);
        case "center":
            return sourceNode.x + (sourceNode.width / 2);
    }
}
