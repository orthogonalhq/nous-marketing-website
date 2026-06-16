import { mockupCopy } from "@/content/mockup-copy";
import { UpdateMiniCard } from "./cards";
import { updateCards } from "./data";
import { Glyph } from "./icons";
import { GlyphButton, PanelHeader, ScrollableRegion } from "./primitives";

export function WorkspaceUpdates() {
    return (
        <aside className="relative col-start-3 flex min-h-0 flex-col overflow-hidden border-l border-[color:var(--nous-stroke-subtle)] [background:var(--nous-updates-panel-bg)] [background-size:var(--nous-updates-panel-bg-size)] px-[var(--nous-updates-padding-x)] pb-[var(--nous-updates-padding-x)] pt-[var(--nous-updates-padding-top)] max-xl:hidden">
            <PanelHeader
                actions={(
                    <>
                        <GlyphButton icon="filter" label={mockupCopy.updates.filterLabel} variant="surface" />
                        <GlyphButton icon="settings" label={mockupCopy.updates.tuneLabel} variant="surface" />
                    </>
                )}
                className="mb-[var(--nous-updates-header-margin-bottom)] shrink-0"
                leading={<GlyphButton icon="panelRightClose" className="text-[var(--nous-icon-fg-muted)]" label={mockupCopy.updates.closeLabel} />}
                title={(
                    <span className="flex items-center gap-[var(--nous-updates-title-gap)]">
                        <Glyph name="timeline" className="text-[var(--nous-icon-fg-muted)]" />
                        <span>{mockupCopy.updates.title}</span>
                    </span>
                )}
            />
            <ScrollableRegion className="-mr-[var(--nous-updates-scroll-gutter)] space-y-[var(--nous-updates-list-gap)] pr-[var(--nous-updates-scroll-gutter)]">
                {updateCards.map(([title, body, time], index) => (
                    <UpdateMiniCard body={body} key={`${title}-${index}`} time={time} title={title} />
                ))}
            </ScrollableRegion>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-[image:var(--nous-updates-bottom-fade)]" />
        </aside>
    );
}

export { WorkspaceUpdates as UpdatesPanel };
