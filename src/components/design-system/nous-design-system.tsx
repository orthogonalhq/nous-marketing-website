import type { ReactNode } from "react";

import { DesignSystemThemeShell } from "./design-system-theme-shell";
import { WorkspaceMockup } from "./mockup/components";

const tokenRows = [
    ["fg", "--nous-fg-*", "foreground hierarchy", "title, primary, body, muted, subtle"],
    ["bg", "--nous-bg-*", "surface hierarchy", "canvas, chrome, inset, card, glass"],
    ["stroke", "--nous-stroke-*", "hairline system", "ghost, soft, subtle, default, strong"],
    ["accent", "--nous-accent-*", "state and identity", "info, workspace, success, warning"],
    ["shell", "--nous-shell-*", "frame dimensions", "topbar, rail, sidebar, updates"],
    ["region", "--nous-sidebar-*", "layout anatomy", "topbar, sidebar, workspace, updates"],
    ["component", "--nous-card-*", "component anatomy", "card, control, drawer, nav"],
    ["type", "--nous-type-*", "dense app type", "micro, meta, section, page"]
] as const;

const statusItems = [
    ["Stable", "tokens, surfaces, controls, visual density"],
    ["Slot-first", "shell regions, drawers, updates panels"],
    ["Provisional", "workflow data, task schemas, feed item models"]
] as const;

const componentRows = [
    ["Shell frame", "workspace specimen", "Stable frame", "Topbar, rail, sidebar, canvas, updates rail, drawer geometry."],
    ["Topbar controls", "top chrome", "Stable visual", "Navigation arrows, app identity, mode switcher, search field, window controls."],
    ["Project rail", "left rail", "Stable frame", "Icon-only project switching, identity color tiles, create action."],
    ["Asset sidebar", "left panel", "Slot-first", "Workspace title, collapsible sections, nav rows, footer user/control area."],
    ["Workspace header", "canvas header", "Stable frame", "Context title, mode tabs, settings action."],
    ["Operational cards", "canvas body", "Provisional content", "Card surface and density are stable; task/insight data contracts are not."],
    ["Updates rail", "right panel", "Slot-first", "Feed stack, header controls, bottom fade, compact update cards."],
    ["Agent drawer", "overlay", "Slot-first", "Glass overlay, topic rail, conversation body, command input."],
    ["Typography", "whole shell", "Stable visual", "Compact sans hierarchy with mono metadata and token syntax."],
    ["State accents", "cards/chips/rail", "Stable visual", "Blue focus, purple workspace identity, green running, yellow review."],
] as const;

export function DesignSystemDoc() {
    return (
        <DesignSystemThemeShell>
            <IntroBar />
            <SpecimenSection />
            <VisualComponentSystem />
            <CompactTokenSystem />
        </DesignSystemThemeShell>
    );
}

function IntroBar() {
    return (
        <header className="border-b border-[color:var(--nous-stroke-subtle)] pb-5 pt-1">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                    <p className="nous-mono text-xs tracking-[0.02em] text-[var(--nous-accent-info)]">Design system</p>
                    <h1 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[var(--nous-fg-title)] md:text-4xl">
                        Nue app shell reference
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-[var(--nous-fg-muted)]">
                        A quiet reference board for the workspace shell: first the specimen, then the visual components, then the compact token grammar.
                    </p>
                </div>
                <div className="grid gap-2 sm:grid-cols-3 lg:w-[520px]">
                    {statusItems.map(([label, body]) => (
                        <div className="border-l border-[color:var(--nous-stroke-subtle)] pl-3" key={label}>
                            <p className="nous-mono text-[length:var(--nous-type-micro-xs)] tracking-[0.02em] text-[var(--nous-fg-quieter)]">{label}</p>
                            <p className="mt-1 text-xs leading-5 text-[var(--nous-fg-body)]">{body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </header>
    );
}

function SpecimenSection() {
    return (
        <Section
            eyebrow="01"
            id="workspace-specimen"
            title="Canonical workspace specimen"
            description="The current source artifact. Keep this visually authoritative; derive components and tokens from this composition."
        >
            <WorkspaceMockup />
        </Section>
    );
}

function VisualComponentSystem() {
    return (
        <Section
            eyebrow="02"
            id="visual-components"
            title="Component visualized design system"
            description="A component extraction map from the specimen. This avoids inaccurate isolated components while still identifying the reusable visual system."
        >
            <div className="rounded-[var(--nous-radius-lg)] border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-reference-panel-bg)]">
                <div className="grid grid-cols-[1fr_120px] border-b border-[color:var(--nous-stroke-subtle)] px-3 py-2 text-[length:var(--nous-type-micro-xs)] tracking-[0.02em] text-[var(--nous-fg-subtle)] md:grid-cols-[180px_150px_130px_1fr]">
                    <p>Part</p>
                    <p className="hidden md:block">Source</p>
                    <p>Status</p>
                    <p className="hidden md:block">Extraction guidance</p>
                </div>
                {componentRows.map(([part, source, status, guidance]) => (
                    <div className="grid grid-cols-[1fr_120px] gap-3 border-b border-[color:var(--nous-stroke-soft)] px-3 py-3 last:border-b-0 md:grid-cols-[180px_150px_130px_1fr]" key={part}>
                        <p className="font-semibold text-[var(--nous-fg-title)]">{part}</p>
                        <p className="nous-mono hidden text-xs text-[var(--nous-fg-subtle)] md:block">{source}</p>
                        <p className="nous-mono text-xs text-[var(--nous-accent-info)]">{status}</p>
                        <p className="hidden text-xs leading-5 text-[var(--nous-fg-muted)] md:block">{guidance}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}

function CompactTokenSystem() {
    return (
        <Section
            eyebrow="03"
            id="compact-tokens"
            title="Compact token system visualization"
            description="The technical layer is intentionally compressed. It should clarify implementation syntax without competing with the visual specimen."
        >
            <div className="rounded-[var(--nous-radius-lg)] border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-reference-panel-bg)]">
                <div className="grid grid-cols-[72px_1fr] border-b border-[color:var(--nous-stroke-subtle)] px-3 py-2 text-[length:var(--nous-type-micro-xs)] tracking-[0.02em] text-[var(--nous-fg-subtle)] md:grid-cols-[90px_220px_1fr_1fr]">
                    <p>Group</p>
                    <p className="hidden md:block">Namespace</p>
                    <p>Purpose</p>
                    <p className="hidden md:block">Examples</p>
                </div>
                {tokenRows.map(([group, namespace, purpose, examples]) => (
                    <div className="grid grid-cols-[72px_1fr] gap-3 border-b border-[color:var(--nous-stroke-soft)] px-3 py-3 last:border-b-0 md:grid-cols-[90px_220px_1fr_1fr]" key={namespace}>
                        <p className="nous-mono text-xs text-[var(--nous-accent-info)]">{group}</p>
                        <p className="nous-mono hidden text-xs text-[var(--nous-fg-primary)] md:block">{namespace}</p>
                        <p className="text-xs leading-5 text-[var(--nous-fg-body)]">{purpose}</p>
                        <p className="hidden text-xs leading-5 text-[var(--nous-fg-muted)] md:block">{examples}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}

function Section({ children, description, eyebrow, id, title }: { children: ReactNode; description: string; eyebrow: string; id: string; title: string }) {
    return (
        <section className="scroll-mt-6" id={id}>
            <div className="mb-4 flex flex-col gap-2 border-b border-[color:var(--nous-stroke-subtle)] pb-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="nous-mono text-xs tracking-[0.02em] text-[var(--nous-fg-quieter)]">{eyebrow}</p>
                    <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-[var(--nous-fg-title)] md:text-2xl">{title}</h2>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-[var(--nous-fg-muted)]">{description}</p>
            </div>
            {children}
        </section>
    );
}
