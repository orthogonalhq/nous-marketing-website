import { DashboardColumn, InsightCard, WorkCard } from "./cards";
import { mockupCopy } from "@/content/mockup-copy";
import { attentionCards, insightCards } from "./data";
import { Glyph } from "./icons";
import { Chip, GlyphButton, PanelHeader, ScrollableRegion, SegmentedControl } from "./primitives";
import type { WorkspaceMockupMode } from "./workspace-mockup";

export function ContextPanel({ mode = "workspace" }: { mode?: WorkspaceMockupMode }) {
    const isWorkspaceMode = mode === "workspace";

    return (
        <section className="col-start-2 flex min-h-0 min-w-0 flex-col overflow-hidden max-md:col-start-1">
            <PanelHeader
                actions={<GlyphButton icon="settings" label={mockupCopy.contextPanel.settingsLabel} variant="surface" />}
                className="h-[var(--nous-shell-contextbar-height)] border-b border-[color:var(--nous-stroke-subtle)] px-[var(--nous-workspace-header-padding-x)]"
                leading={<Glyph name="agent" className="text-[var(--nous-icon-fg-muted)]" />}
                tabs={(
                    <SegmentedControl
                        items={mockupCopy.contextPanel.tabs.map(([icon, label, active]) => ({
                            active: icon === "pulse" ? !isWorkspaceMode : icon === "workflow" ? isWorkspaceMode : active,
                            icon,
                            label
                        }))}
                    />
                )}
                title={mockupCopy.contextPanel.headerTitle}
            />

            <ScrollableRegion className="pl-[var(--nous-workspace-canvas-padding-left)] py-[var(--nous-workspace-canvas-padding-y)] pr-[var(--nous-workspace-canvas-padding-right)]">
                <div className="mb-[var(--nous-workspace-hero-margin-bottom)] max-w-xl">
                    <h3 className="text-[length:var(--nous-type-page-title)] font-semibold tracking-[-0.02em] text-[var(--nous-section-title-fg)]">{mockupCopy.contextPanel.heroTitle}</h3>
                    <p className="mt-[var(--nous-workspace-subtitle-margin-top)] text-md text-[var(--nous-fg-secondary)]">{mockupCopy.contextPanel.heroSubtitle}</p>
                    <div className="mt-[var(--nous-workspace-status-margin-top)] flex items-center gap-[var(--nous-workspace-status-gap)]">
                        <Chip variant="success">{mockupCopy.contextPanel.status.running}</Chip>
                        <span className="nous-mono text-xs text-[var(--nous-fg-quieter)]">{mockupCopy.contextPanel.status.uptime}</span>
                        <span className="nous-mono text-xs text-[var(--nous-fg-quieter)]">{mockupCopy.contextPanel.status.separator}</span>
                        <span className="nous-mono text-xs text-[var(--nous-fg-primary)]">{mockupCopy.contextPanel.status.agentCount}</span>
                    </div>
                </div>

                <div className="grid w-full grid-cols-[repeat(2,minmax(0,1fr))] gap-[var(--nous-workspace-dashboard-gap)] max-lg:grid-cols-1">
                    <DashboardColumn icon="flag" title={mockupCopy.contextPanel.dashboardColumns.attention}>
                        {attentionCards.map(([title, body, count]) => (
                            <WorkCard body={body} count={count} key={title} title={title} />
                        ))}
                    </DashboardColumn>
                    <DashboardColumn icon="pulse" title={mockupCopy.contextPanel.dashboardColumns.insights}>
                        {insightCards.map(([title, body, note]) => (
                            <InsightCard body={body} key={title} note={note} title={title} />
                        ))}
                    </DashboardColumn>
                </div>
            </ScrollableRegion>
        </section>
    );
}

export { ContextPanel as WorkspaceCanvas };
