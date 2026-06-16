export const workflowGraphGridSizePx = 25;
export const workflowGraphGridDotRadiusPx = 0.9375;
export const workflowGraphGridDotCenterPx = workflowGraphGridSizePx / 2;

export function getWorkflowGraphGridCoordinate(index: number) {
    return workflowGraphGridDotCenterPx + (workflowGraphGridSizePx * index);
}
