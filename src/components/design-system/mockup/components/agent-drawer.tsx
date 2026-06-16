"use client";

import { useState } from "react";

import { CommandComposer } from "@/components/mockups/conversation/command-composer";
import { mockupCopy } from "@/content/mockup-copy";
import { DisclosureTriangle, Glyph } from "./icons";
import { Chip, DescriptionList, GlyphButton, ScrollableRegion, SegmentedTabs } from "./primitives";

export function AgentDrawer() {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) {
        return (
            <button
                aria-label={mockupCopy.agentDrawer.collapsedOpenLabel}
                className="absolute bottom-[var(--nous-drawer-floating-inset)] right-[var(--nous-drawer-floating-inset)] z-20 grid size-[var(--nous-control-size-lg)] place-items-center rounded-full border border-[color:var(--nous-stroke-default)] [background:var(--nous-drawer-floating-bg)] text-[var(--nous-fg-primary)] shadow-[var(--nous-shadow-drawer)] backdrop-blur transition hover:border-[color:var(--nous-stroke-strong)]"
                onClick={() => setIsOpen(true)}
                type="button"
            >
                <Glyph className="size-[var(--nous-control-icon-size-lg)] -mb-[1px] text-[var(--nous-fg-secondary)]" name="nous" strokeWidth={2 / 5} />
            </button>
        );
    }

    return (
        <aside
            aria-label={mockupCopy.agentDrawer.ariaLabel}
            className="absolute bottom-[var(--nous-drawer-inset)] right-[var(--nous-drawer-inset)] top-[var(--nous-drawer-top)] z-20 flex w-[min(var(--nous-drawer-width),calc(100%-calc(var(--nous-drawer-inset)*2)))] flex-col rounded-[var(--nous-radius-lg)] border border-[color:var(--nous-stroke-default)] [background:var(--nous-drawer-overlay-bg)] shadow-[var(--nous-shadow-drawer)] backdrop-blur"
        >
            <div className="flex items-center justify-between border-b border-[color:var(--nous-stroke-subtle)] px-[var(--nous-drawer-header-padding-x)] py-[var(--nous-drawer-header-padding-y)]">
                <SegmentedTabs
                    tabs={mockupCopy.agentDrawer.tabs}
                />
                <div className="flex items-center gap-[var(--nous-drawer-header-actions-gap)]">
                    <GlyphButton icon="historyClock" label={mockupCopy.agentDrawer.viewHistoryLabel} variant="surface" />
                    <GlyphButton icon="close" label={mockupCopy.agentDrawer.closeLabel} onClick={() => setIsOpen(false)} />
                </div>
            </div>
            <div className="nous-mono border-b border-[color:var(--nous-stroke-subtle)] py-[var(--nous-drawer-topic-padding-y)] text-[length:var(--nous-type-micro-sm)] text-[var(--nous-fg-title)]">
                <div className="mx-[var(--nous-drawer-topic-scroll-margin-x)] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex w-max gap-[var(--nous-drawer-topic-gap)] text-[length:var(--nous-type-micro-xs)]">
                        {mockupCopy.agentDrawer.topics.map((topic, index) => (
                            <TopicPill active={index === 0} key={topic}>{topic}</TopicPill>
                        ))}
                    </div>
                </div>
            </div>
            <ScrollableRegion className="px-[var(--nous-drawer-body-padding-x)] py-[var(--nous-drawer-body-padding-y)] text-xs leading-[var(--nous-leading-drawer)] text-[var(--nous-drawer-body-fg-strong)]">
                <div className="flex min-h-full flex-col justify-end">
                    <p className="max-w-[var(--nous-drawer-intro-max-width)]">
                        {mockupCopy.agentDrawer.intro}
                    </p>
                    <div className="my-[var(--nous-drawer-message-margin-y)] ml-[var(--nous-drawer-message-offset-left)] rounded-[var(--nous-drawer-message-radius)] border border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-message-bg)] px-[var(--nous-drawer-message-padding-x)] py-[var(--nous-drawer-message-padding-y)] text-[var(--nous-message-fg)]">
                        {mockupCopy.agentDrawer.message}
                    </div>
                    <p className="mb-2 flex items-center gap-[var(--nous-drawer-status-gap)] font-semibold text-[var(--nous-drawer-meta-fg)]">
                        {mockupCopy.agentDrawer.status} <DisclosureTriangle className="-rotate-90" />
                    </p>
                    <div className="space-y-[var(--nous-drawer-result-gap)] border-t border-[color:var(--nous-stroke-subtle)] pt-[var(--nous-drawer-result-padding-top)]">
                        <p className="text-[var(--nous-drawer-result-fg)]">{mockupCopy.agentDrawer.result.ready}</p>
                        <p>
                            {mockupCopy.agentDrawer.result.details}
                        </p>
                        <p>{mockupCopy.agentDrawer.result.nothingSent}</p>
                        <div>
                            <h3 className="mb-[var(--nous-drawer-result-title-margin-bottom)] font-semibold text-[var(--nous-drawer-result-fg)]">{mockupCopy.agentDrawer.changesTitle}</h3>
                            <DescriptionList
                                rows={mockupCopy.agentDrawer.result.changeRows.map(([label, value], index) => ({
                                    key: `${label}-${index}`,
                                    label,
                                    value
                                }))}
                            />
                        </div>
                        <div>
                            <h3 className="mb-[var(--nous-drawer-action-title-margin-bottom)] font-semibold text-[var(--nous-drawer-result-fg)]">{mockupCopy.agentDrawer.suggestedActionsTitle}</h3>
                            <ul className="list-disc space-y-1 pl-[var(--nous-drawer-list-padding-left)]">
                                {mockupCopy.agentDrawer.suggestedActions.map((action) => (
                                    <li key={action}>{action}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </ScrollableRegion>
            <DrawerCommandInput />
        </aside>
    );
}

function TopicPill({ active, children }: { active?: boolean; children: string }) {
    const tone = active ? "info" : "default";

    return (
        <Chip
            className={`rounded-[var(--nous-radius-xs)] px-[var(--nous-drawer-topic-padding-x)] py-[var(--nous-drawer-topic-padding-y-item)] ${active ? "bg-[var(--nous-accent-info-bg-subtle)] text-[var(--nous-accent-info-fg-strong)]" : "bg-[var(--nous-control-bg-soft)] text-[var(--nous-fg-title)]"}`}
            shape="rounded"
            size="sm"
            tone={tone}
        >
            {children}
        </Chip>
    );
}

function DrawerCommandInput() {
    return (
        <div className="px-[var(--nous-drawer-input-padding-x)] pb-[var(--nous-drawer-input-padding-bottom)]">
            <CommandComposer
                caretClassName="translate-y-0.5"
                contentClassName="text-[var(--nous-composer-placeholder-fg)]"
                leadingActions={(
                    <>
                        <Glyph name="add" className="size-5.5" strokeWidth={1.4} />
                        <Glyph name="squareSlash" className="size-5" strokeWidth={1.4} />
                    </>
                )}
                leadingActionsClassName="gap-[var(--nous-control-gap)] text-[var(--nous-icon-fg-subtle)]"
                placeholder={mockupCopy.agentDrawer.commandText}
                showCaret
                trailingActions={(
                    <>
                        <Glyph name="mic" className="size-5" strokeWidth={1.4} />
                        <span className="grid size-8 place-items-center rounded-[var(--nous-control-radius-md)] border border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-control-bg-soft)] text-[var(--nous-drawer-result-fg)]">
                            <Glyph name="send" className="size-5" strokeWidth={1.4} />
                        </span>
                    </>
                )}
                trailingActionsClassName="gap-[var(--nous-drawer-command-actions-gap)] text-[var(--nous-icon-fg-subtle)]"
                variant="drawer"
            />
        </div>
    );
}
