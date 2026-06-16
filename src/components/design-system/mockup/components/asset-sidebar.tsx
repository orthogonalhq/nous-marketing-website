import { mockupCopy } from "@/content/mockup-copy";
import { sidebarSections } from "./data";
import { DisclosureTriangle, Glyph } from "./icons";
import { GlyphButton, NavItem, ScrollableRegion } from "./primitives";

export function AssetSidebar() {
    return (
        <aside className="col-start-1 flex min-h-0 flex-col border-r border-[color:var(--nous-stroke-subtle)] max-md:hidden">
            <div className="flex items-center justify-between px-[var(--nous-sidebar-padding-x)] py-[var(--nous-sidebar-header-padding-y)] pt-[var(--nous-sidebar-header-padding-top)]">
                <div className="flex items-center gap-[var(--nous-sidebar-header-gap)]">
                    <div className="grid size-6 place-items-center rounded-full bg-[var(--nous-accent-workspace-deep)] text-[var(--nous-fg-primary)]">
                        <Glyph name="databaseZap" className="h-3 w-3" strokeWidth={2.25} />
                    </div>
                    <div className="flex items-center gap-[var(--nous-sidebar-header-control-gap)]">
                        <span className="font-semibold text-[var(--nous-sidebar-title-fg)]">{mockupCopy.sidebar.title}</span>
                        <Glyph name="chevronDown" className="text-[var(--nous-fg-secondary)]" />
                    </div>
                </div>
                <div className="flex items-center gap-[var(--nous-sidebar-header-control-gap)]">
                    <GlyphButton icon="panelClose" label={mockupCopy.sidebar.collapseLabel} />
                    <GlyphButton icon="edit" label={mockupCopy.sidebar.editLabel} variant="surface" />
                </div>
            </div>
            <ScrollableRegion ariaLabel={mockupCopy.sidebar.navAriaLabel} as="nav" className="space-y-[var(--nous-sidebar-nav-section-gap)] px-[var(--nous-sidebar-padding-x)]">
                <div className="gap-[var(--nous-sidebar-nav-item-gap)] pt-[var(--nous-sidebar-nav-top-padding)]">
                    {mockupCopy.sidebar.primaryItems.map(([icon, label]) => (
                        <NavItem icon={icon} key={label} label={label} />
                    ))}
                </div>
                {sidebarSections.map((section) => (
                    <div key={section.title} className="space-y-[var(--nous-sidebar-section-item-gap)]">
                        <p className="mb-[var(--nous-sidebar-section-label-margin-bottom)] flex items-center gap-[var(--nous-sidebar-section-label-gap)] text-sm font-semibold text-[var(--nous-nav-section-label-fg)]">
                            {section.title} <DisclosureTriangle />
                        </p>
                        {section.items.map(([icon, label, active]) => (
                            <NavItem active={active} icon={icon} key={label} label={label} />
                        ))}
                    </div>
                ))}
            </ScrollableRegion>
            <div className="flex h-[var(--nous-shell-userbar-height)] items-center justify-between border-t border-[color:var(--nous-stroke-subtle)] p-[var(--nous-sidebar-footer-padding)]">
                <div className="flex items-center gap-[var(--nous-sidebar-user-gap)]">
                    <div className="size-7 rounded-full bg-gradient-to-br from-[#f4c7a0] to-[#116c7a]" />
                    <div>
                        <p className="text-sm/tight font-medium">{mockupCopy.sidebar.user.avatarLabel}</p>
                        <p className="text-xs/tight italic text-[var(--nous-fg-secondary)]">{mockupCopy.sidebar.user.name}</p>
                    </div>
                </div>
                <GlyphButton icon="settings" label={mockupCopy.sidebar.footerSettingsLabel} />
            </div>
        </aside>
    );
}
