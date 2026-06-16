import type { CSSProperties } from "react";

import { AgentDrawer } from "./agent-drawer";
import { AssetSidebar } from "./asset-sidebar";
import { AppTopBar, IconRail } from "./chrome";
import { ContextPanel } from "./context-panel";
import { WorkspaceUpdates } from "./workspace-updates";
import styles from "./workspace-mockup.module.css";

export type WorkspaceMockupMode = "chat" | "workspace";

export function WorkspaceMockup({
    height,
    mode = "workspace",
    onModeChange
}: {
    height?: CSSProperties["height"];
    mode?: WorkspaceMockupMode;
    onModeChange?: (mode: WorkspaceMockupMode) => void;
}) {
    const style = height ? ({ "--nous-demo-frame-height": typeof height === "number" ? `${height}px` : height } as CSSProperties) : undefined;

    return (
        <div className="relative grid h-[var(--nous-demo-frame-height)] min-w-0 w-full max-w-full grid-cols-[var(--nous-shell-rail-width)_minmax(0,1fr)] grid-rows-[var(--nous-shell-topbar-height)_1fr] overflow-hidden rounded-[var(--nous-radius-xl)] bg-[var(--nous-bg-chrome)]" style={style}>
            <AppTopBar mode={mode} onModeChange={onModeChange} />
            <IconRail />
            <div className="relative col-start-2 row-start-2 mb-[var(--nous-shell-frame-inset)] mr-[var(--nous-shell-frame-inset)] grid min-h-0 min-w-0 grid-cols-[var(--nous-shell-sidebar-width)_minmax(0,1fr)_var(--nous-shell-updates-width)] overflow-hidden rounded-[var(--nous-radius-lg)] border border-[color:var(--nous-stroke-subtle)] [background:var(--nous-app-chrome-bg)] [background-size:var(--nous-app-chrome-bg-size)] max-xl:grid-cols-[var(--nous-shell-sidebar-width)_minmax(0,1fr)] max-md:grid-cols-[minmax(0,1fr)]">
                <AssetSidebar />
                <ContextPanel mode={mode} />
                <WorkspaceUpdates />
            </div>
            <AgentDrawer />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 bg-[image:var(--nous-texture-noise-overlay)] bg-[length:160px_160px] opacity-5 mix-blend-soft-light" />
            <span aria-hidden="true" className={styles.outerBorderOverlay} />
        </div>
    );
}
