import Image from "next/image";
import type { ReactNode } from "react";

import { DisclosureTriangle, Glyph } from "@/components/design-system/mockup/components";
import type { GlyphName } from "@/components/design-system/mockup/components";
import { cn } from "@/lib/cn";

const primaryNavItems: Array<{ icon: GlyphName; label: string }> = [
    { icon: "inbox", label: "Inbox" },
    { icon: "pulse", label: "Pulse" }
];

const projectItems: Array<{ icon: GlyphName; label: string }> = [
    { icon: "database", label: "Coaching" },
    { icon: "assetChat", label: "Billing" }
];

type HomepageChatSectionMockupProps = {
    greeting?: string;
    prompt?: string;
};

export function HomepageChatSectionMockup({
    greeting = "Good morning, Andrew",
    prompt = "How can I help you today?"
}: HomepageChatSectionMockupProps) {
    return (
        <article
            aria-label="Homepage chat visual mockup"
            className={cn(
                "relative",
            )}
        >
            <div
                className={cn(
                    "nous-home-chat-component-fade relative mx-auto",
                    "h-[var(--nous-home-chat-frame-height)] w-[var(--nous-home-chat-frame-width)]"
                )}
            >
                <ChatCanvas greeting={greeting} prompt={prompt} />
                <AgentSidebar />
            </div>
        </article>
    );
}

function ChatCanvas({ greeting, prompt }: { greeting: string; prompt: string }) {
    return (
        <section
            aria-label="Chat welcome panel"
            className={cn(
                "absolute bottom-[0] left-[var(--nous-home-chat-canvas-left)] right-0 top-[var(--nous-home-chat-canvas-top)]",
                "rounded-[var(--nous-home-chat-canvas-radius)]",
                "border border-[color:var(--nous-stroke-default)]",
                "[background:var(--nous-home-chat-canvas-bg)] [background-size:var(--nous-home-chat-canvas-bg-size)]",
                "shadow-[inset_0_1px_0_var(--nous-stroke-ghost)]"
            )}
        >
            <div
                aria-hidden="true"
                className={cn(
                    "pointer-events-none absolute inset-0",
                    "[background-image:var(--nous-home-chat-canvas-highlight-bg)]"
                )}
            />
            <div
                className={cn(
                    "relative flex h-full flex-col items-center",
                    "pt-[var(--nous-home-chat-greeting-padding-top)]"
                )}
            >
                <h3
                    className={cn(
                        "text-[length:var(--nous-home-chat-greeting-font-size)] leading-none tracking-[var(--nous-home-chat-greeting-letter-spacing)]",
                        "text-[var(--nous-fg-white)]",
                        "[font-weight:var(--nous-home-chat-greeting-font-weight)]"
                    )}
                >
                    {greeting}
                </h3>
                <div
                    className={cn(
                        "mt-[var(--nous-home-chat-composer-margin-top)]",
                        "w-[var(--nous-home-chat-composer-width)]"
                    )}
                >
                    <CommandComposer prompt={prompt} />
                </div>
            </div>
        </section>
    );
}

function CommandComposer({ prompt }: { prompt: string }) {
    return (
        <div
            className={cn(
                "overflow-hidden rounded-[var(--nous-radius-control-lg)]",
                "border border-[color:var(--nous-stroke-subtle)]",
                "bg-[var(--nous-command-input-bg)] text-[var(--nous-command-input-placeholder-fg)]",
                "shadow-[inset_0_1px_0_var(--nous-stroke-ghost)]"
            )}
        >
            <p
                className={cn(
                    "min-h-[var(--nous-home-chat-command-min-height)]",
                    "px-[var(--nous-drawer-command-padding-x)] py-[var(--nous-drawer-command-padding-y)]",
                    "text-[length:var(--nous-home-chat-command-font-size)] leading-[var(--nous-home-chat-command-leading)]",
                    "text-[var(--nous-fg-muted)]"
                )}
            >
                {prompt}
            </p>
            <div
                className={cn(
                    "flex h-[var(--nous-home-chat-command-toolbar-height)] items-center justify-between",
                    "border-t border-[color:var(--nous-stroke-subtle)]",
                    "px-[var(--nous-home-chat-command-toolbar-padding-x)]",
                    "text-[var(--nous-icon-fg-subtle)]"
                )}
            >
                <div className={cn("flex items-center", "gap-[var(--nous-drawer-command-actions-gap)]")}>
                    <Glyph
                        className={cn(
                            "h-[var(--nous-home-chat-command-add-icon-height)]",
                            "w-[var(--nous-home-chat-command-add-icon-width)]"
                        )}
                        name="add"
                        strokeWidth="var(--nous-home-chat-icon-stroke-command)"
                    />
                    <Glyph
                        className={cn(
                            "h-[var(--nous-home-chat-command-square-icon-height)]",
                            "w-[var(--nous-home-chat-command-square-icon-width)]"
                        )}
                        name="squareSlash"
                        strokeWidth="var(--nous-home-chat-icon-stroke-command)"
                    />
                </div>
                <div className={cn("flex items-center", "gap-[var(--nous-home-chat-command-toolbar-action-gap)]")}>
                    <Glyph
                        className={cn(
                            "h-[var(--nous-home-chat-command-mic-icon-height)]",
                            "w-[var(--nous-home-chat-command-mic-icon-width)]"
                        )}
                        name="mic"
                        strokeWidth="var(--nous-home-chat-icon-stroke-command)"
                    />
                    <span
                        className={cn(
                            "grid size-[var(--nous-home-chat-send-button-size)] place-items-center",
                            "rounded-[var(--nous-control-radius-md)] border border-[color:var(--nous-stroke-subtle)]",
                            "bg-[var(--nous-control-bg-soft)] text-[var(--nous-fg-primary)]"
                        )}
                    >
                        <Glyph
                            className={cn(
                                "h-[var(--nous-home-chat-command-send-icon-height)]",
                                "w-[var(--nous-home-chat-command-send-icon-width)]"
                            )}
                            name="send"
                            strokeWidth="var(--nous-home-chat-icon-stroke-send)"
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}

function AgentSidebar() {
    return (
        <aside
            aria-label="Agent navigation"
            className={cn(
                "absolute left-0 top-0 flex h-full w-[var(--nous-home-chat-sidebar-width)] flex-col",
                "rounded-[var(--nous-home-chat-sidebar-radius)]",
                "border border-[color:var(--nous-stroke-soft)]",
                "[background:var(--nous-home-chat-sidebar-bg)]",
                "shadow-[var(--nous-home-chat-sidebar-shadow)] backdrop-blur"
            )}
        >
            <div
                aria-hidden="true"
                className={cn(
                    "pointer-events-none absolute -inset-px",
                    "rounded-[var(--nous-home-chat-sidebar-radius)]",
                    "nous-home-chat-sidebar-outline-border",
                    "opacity-[var(--nous-home-chat-sidebar-outline-opacity)]"
                )}
            />
            <div className={cn("relative flex h-full flex-col")}>
                <SidebarHeader />
                <div
                    className={cn(
                        "nous-mobile-scrollbar flex-1 overflow-y-auto",
                        "px-[var(--nous-home-chat-sidebar-padding-x)] pb-[var(--nous-home-chat-sidebar-body-padding-bottom)] pt-[var(--nous-home-chat-sidebar-body-padding-top)]"
                    )}
                >
                    <SidebarNav />
                </div>
                <SidebarFooter />
            </div>
        </aside>
    );
}

function SidebarHeader() {
    return (
        <header
            className={cn(
                "flex items-center justify-between",
                "px-[var(--nous-home-chat-sidebar-padding-x)]",
                "pb-[var(--nous-home-chat-sidebar-header-padding-bottom)] pt-[var(--nous-home-chat-sidebar-header-padding-top)]"
            )}
        >
            <p
                className={cn(
                    "text-[length:var(--nous-home-chat-sidebar-title-size)] font-semibold tracking-[-0.03em]",
                    "text-[var(--nous-sidebar-title-fg)]",
                    "[font-family:var(--nous-home-chat-sidebar-title-font-family)]"
                )}
            >
                Agent
            </p>
            <div
                className={cn(
                    "flex items-center gap-[var(--nous-drawer-header-actions-gap)]",
                    "text-[var(--nous-icon-fg-subtle)]"
                )}
            >
                <IconFrame icon="panelClose" label="Collapse sidebar" />
                <IconFrame icon="edit" label="New chat" surface />
            </div>
        </header>
    );
}

function SidebarNav() {
    return (
        <nav
            aria-label="Agent sections"
            className={cn(
                "space-y-[var(--nous-home-chat-nav-section-gap)]",
                "text-[length:var(--nous-home-chat-nav-font-size)]"
            )}
        >
            <div className={cn("space-y-[var(--nous-sidebar-section-item-gap)]")}>
                {primaryNavItems.map((item) => (
                    <SidebarRow icon={item.icon} key={item.label} label={item.label} />
                ))}
            </div>

            <SidebarGroup label="Project">
                {projectItems.map((item) => (
                    <SidebarRow icon={item.icon} key={item.label} label={item.label} />
                ))}
            </SidebarGroup>

            <SidebarGroup label="Chats">
                <div
                    className={cn(
                        "space-y-[var(--nous-home-chat-thread-gap)]",
                        "pt-[var(--nous-home-chat-thread-padding-top)]"
                    )}
                    data-homepage-chat-thread-count={0}
                />
            </SidebarGroup>
        </nav>
    );
}

function SidebarGroup({ children, label }: { children: ReactNode; label: string }) {
    return (
        <div>
            <p
                className={cn(
                    "mb-[var(--nous-sidebar-section-label-margin-bottom)] flex items-center gap-[var(--nous-sidebar-section-label-gap)]",
                    "text-[length:var(--nous-home-chat-nav-font-size)] font-semibold tracking-[-0.02em]",
                    "text-[var(--nous-nav-section-label-fg)]"
                )}
            >
                {label}{" "}
                <DisclosureTriangle
                    className={cn(
                        "translate-y-px",
                        "text-[var(--nous-nav-section-label-fg)]"
                    )}
                />
            </p>
            <div className={cn("space-y-[var(--nous-sidebar-section-item-gap)]")}>{children}</div>
        </div>
    );
}

function SidebarRow({ icon, label }: { icon: GlyphName; label: string }) {
    return (
        <div
            className={cn(
                "flex items-center gap-[var(--nous-nav-item-gap)]",
                "rounded-[var(--nous-radius-md)] p-[var(--nous-nav-item-padding)]",
                "text-[length:var(--nous-home-chat-nav-font-size)] font-semibold tracking-[var(--nous-home-chat-nav-letter-spacing)]",
                "text-[var(--nous-fg-body)]"
            )}
        >
            <Glyph
                className={cn(
                    "h-[var(--nous-home-chat-sidebar-icon-height)] w-[var(--nous-home-chat-sidebar-icon-width)]",
                    "text-[var(--nous-icon-fg-muted)]"
                )}
                name={icon}
                strokeWidth="var(--nous-home-chat-icon-stroke-sidebar)"
            />
            <span>{label}</span>
        </div>
    );
}

function SidebarFooter() {
    return (
        <footer
            className={cn(
                "relative flex h-[var(--nous-home-chat-sidebar-footer-height)] items-center justify-between",
                "border-t border-[color:var(--nous-stroke-subtle)]",
                "px-[var(--nous-home-chat-sidebar-padding-x)]"
            )}
        >
            <div className={cn("flex min-w-0 items-center", "gap-[var(--nous-sidebar-user-gap)]")}>
                <span
                    className={cn(
                        "relative grid size-[var(--nous-home-chat-user-avatar-size)] shrink-0 place-items-center overflow-hidden"
                    )}
                >
                    <Image
                        alt=""
                        className="object-cover"
                        data-homepage-chat-user-avatar-image="true"
                        fill
                        sizes="var(--nous-home-chat-user-avatar-size)"
                        src="/andrew-avatar.png"
                    />
                </span>
                <div className={cn("min-w-0")}>
                    <p
                        className={cn(
                            "truncate",
                            "text-[length:var(--nous-home-chat-nav-font-size)] font-medium leading-[var(--nous-home-chat-user-name-line-height)]",
                            "text-[var(--nous-fg-title)]"
                        )}
                    >
                        Agent
                    </p>
                    <p
                        className={cn(
                            "mt-[var(--nous-home-chat-user-title-margin-top)] truncate",
                            "text-xs italic leading-[var(--nous-home-chat-user-title-line-height)]",
                            "text-[var(--nous-fg-subtle)]"
                        )}
                    >
                        Andrew
                    </p>
                </div>
            </div>
            <Glyph
                className={cn(
                    "h-[var(--nous-home-chat-footer-icon-height)] w-[var(--nous-home-chat-footer-icon-width)]",
                    "text-[var(--nous-icon-fg-subtle)]"
                )}
                name="settings"
                strokeWidth="var(--nous-home-chat-icon-stroke-sidebar)"
            />
        </footer>
    );
}

function IconFrame({ icon, label, surface = false }: { icon: GlyphName; label: string; surface?: boolean }) {
    return (
        <span
            aria-label={label}
            className={cn(
                "grid size-[var(--nous-home-chat-icon-frame-size)] place-items-center",
                "rounded-[var(--nous-control-radius-xs)]",
                surface && "border border-[color:var(--nous-stroke-subtle)]",
                surface && "bg-[var(--nous-control-bg-soft)]",
                surface ? "text-[var(--nous-fg-primary)]" : "text-[var(--nous-icon-fg-subtle)]"
            )}
            role="img"
        >
            <Glyph
                className={cn(
                    "h-[var(--nous-home-chat-header-icon-height)]",
                    "w-[var(--nous-home-chat-header-icon-width)]"
                )}
                name={icon}
                strokeWidth="var(--nous-home-chat-icon-stroke-header)"
            />
        </span>
    );
}
