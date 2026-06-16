import { mockupCopy } from "@/content/mockup-copy";
import { Glyph } from "./icons";
import type { GlyphName } from "./icons";
import { cn } from "./utils";
import type { WorkspaceMockupMode } from "./workspace-mockup";

export function AppTopBar({
    mode = "workspace",
    onModeChange
}: {
    mode?: WorkspaceMockupMode;
    onModeChange?: (mode: WorkspaceMockupMode) => void;
}) {
    return (
        <header className="col-span-2 flex min-w-0 items-center bg-[var(--nous-bg-chrome)] px-[var(--nous-topbar-padding-x)] text-[var(--nous-fg-secondary)]">
            <div className="flex w-28 shrink-0 items-center gap-1.5 max-sm:w-auto">
                <Glyph name="moveLeft" className="w-3.5 -ml-1 text-[var(--nous-icon-fg-primary)]" />
                <Glyph name="moveRight" className="w-3.5 text-[var(--nous-icon-fg-primary)] opacity-50" />
            </div>
            <div className="flex min-w-0 flex-1 items-center justify-center gap-[var(--nous-topbar-content-gap)] max-xl:gap-3">
                <div className="flex shrink-0 items-center gap-[var(--nous-topbar-brand-gap)] text-[var(--nous-fg-primary)]">
                    <Glyph name="nous" className="text-[var(--nous-accent-info)]" />
                    <span className="text-sm font-medium tracking-wide">{mockupCopy.topBar.brand}</span>
                </div>
                <div className="flex rounded-[var(--nous-radius-sm)] bg-[var(--nous-bg-control-bar)] p-[var(--nous-topbar-tablist-padding)] text-xs max-sm:hidden">
                    <TopTab active={mode === "chat"} icon="pulse" label={mockupCopy.topBar.tabs.chat} onSelect={onModeChange ? () => onModeChange("chat") : undefined} />
                    <TopTab active={mode === "workspace"} icon="workflow" label={mockupCopy.topBar.tabs.workspace} onSelect={onModeChange ? () => onModeChange("workspace") : undefined} />
                    <TopTab icon="developer" label={mockupCopy.topBar.tabs.developer} />
                </div>
                <div className="hidden h-[var(--nous-topbar-search-height)] w-[var(--nous-topbar-search-width)] items-center justify-between rounded-[var(--nous-radius-md)] border border-[var(--nous-stroke-ghost)] bg-[var(--nous-bg-elevated)] px-[var(--nous-topbar-search-padding-x)] xl:flex">
                    <span className="flex items-center gap-[var(--nous-topbar-search-gap)] text-xs">
                        <Glyph name="search" className="h-3" /> {mockupCopy.topBar.searchPlaceholder}
                    </span>
                    <kbd className="nous-mono rounded bg-[var(--nous-control-bg-soft)] px-[var(--nous-kbd-padding-x)] py-[var(--nous-kbd-padding-y)] text-[length:var(--nous-type-micro-xs)] text-[var(--nous-fg-body)]">
                        {mockupCopy.topBar.searchShortcut}
                    </kbd>
                </div>
            </div>
            <div className="flex w-28 shrink-0 justify-end gap-[var(--nous-topbar-window-controls-gap)] text-lg max-sm:w-auto max-sm:gap-2">
                <Glyph name="minimize" />
                <Glyph name="square" />
                <Glyph name="close" />
            </div>
        </header>
    );
}

function TopTab({ active, icon, label, onSelect }: { active?: boolean; icon: GlyphName; label: string; onSelect?: () => void }) {
    const className = cn(
        "flex items-center gap-[var(--nous-topbar-tab-gap)] rounded-[var(--nous-radius-xs)] px-[var(--nous-topbar-tab-padding-x)] py-[var(--nous-topbar-tab-padding-y)]",
        active
            ? "bg-[var(--nous-bg-control-active)] text-[var(--nous-fg-white)]"
            : "text-[var(--nous-fg-secondary)]",
        onSelect && "transition hover:text-[var(--nous-fg-primary)]"
    );
    const content = <><Glyph name={icon} className={`h-3 w-3 ${active ? "text-[var(--nous-accent-info-soft)]" : ""}`} />{label}</>;

    if (onSelect) {
        return (
            <button aria-pressed={active} className={className} onClick={onSelect} type="button">
                {content}
            </button>
        );
    }

    return <span className={className}>{content}</span>;
}

export function IconRail() {
    return (
        <aside className="col-start-1 row-start-2 mb-[var(--nous-shell-frame-inset)] grid min-h-0 grid-rows-[1fr_var(--nous-shell-userbar-height)] bg-[var(--nous-bg-chrome)]">
            <div className="flex min-h-0 flex-col items-center">
                <ProjectRailButton icon="home" iconClassName="size-[var(--nous-control-icon-size-lg)] mb-0" label={mockupCopy.topBar.projectLabels.home} />
                <div className="my-[var(--nous-rail-separator-offset)] h-px w-[var(--nous-rail-separator-width)] bg-[var(--nous-stroke-subtle)]" />
                <div className="flex flex-col">
                    <ProjectRailButton color="var(--nous-accent-workspace-deep)" icon="databaseZap" label={mockupCopy.topBar.projectLabels.coaching} />
                    <ProjectRailButton color="var(--nous-accent-success-deep)" icon="assetChat" label={mockupCopy.topBar.projectLabels.messages} />
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="h-px w-[var(--nous-rail-separator-width)] bg-[var(--nous-stroke-subtle)]" />
                <CreateProjectButton />
            </div>
        </aside>
    );
}

function ProjectRailButton({
    color,
    icon,
    iconClassName,
    label
}: {
    color?: string;
    icon: GlyphName;
    iconClassName?: string;
    label: string;
}) {
    return (
        <button
            aria-label={label}
            className={cn(
                "m-[var(--nous-rail-item-margin)] grid size-[var(--nous-control-size-md)] place-items-center rounded-[var(--nous-radius-md)] border border-transparent text-[var(--nous-icon-fg-primary)] transition",
                color && "text-[var(--nous-icon-fg-primary)]",
                iconClassName
            )}
            style={color ? { backgroundColor: color } : undefined}
            type="button"
        >
            <Glyph className={cn("size-[var(--nous-project-icon-size)]", iconClassName)} name={icon} />
        </button>
    );
}

function CreateProjectButton() {
    return (
        <button
            aria-label={mockupCopy.topBar.createProjectLabel}
            className="m-[var(--nous-rail-item-margin)] grid size-[var(--nous-control-size-md)] place-items-center text-[var(--nous-fg-primary)]"
            type="button"
        >
            <span className="grid size-7 place-items-center rounded-[var(--nous-radius-xs)]">
                <Glyph className="size-[var(--nous-control-icon-size-xl)]" name="squarePlus" strokeWidth={1.125} />
            </span>
        </button>
    );
}
