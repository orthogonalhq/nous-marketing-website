import type { ReactNode } from "react";

import { mockupCopy } from "@/content/mockup-copy";
import { Glyph } from "./icons";
import type { GlyphName } from "./icons";
import { Button, Surface } from "./primitives";

export function DashboardColumn({ children, icon, title }: { children: ReactNode; icon: GlyphName; title: string }) {
    return (
        <div className="min-w-0">
            <div className="mb-[var(--nous-card-column-title-margin-bottom)] flex items-center gap-[var(--nous-card-column-title-gap)]">
                <Glyph name={icon} className="h-4 text-[var(--nous-icon-fg-muted)]" />
                <h2 className="text-[length:var(--nous-type-section-title)] text-[var(--nous-section-title-fg)] font-semibold tracking-[-0.03em]">{title}</h2>
            </div>
            <div className="space-y-[var(--nous-card-stack-gap)]">{children}</div>
        </div>
    );
}

export function WorkCard({ body, count, title }: { body: string; count: string; title: string }) {
    return (
        <Surface className="relative px-[var(--nous-card-padding-x)] py-[var(--nous-card-padding-y)] pb-[var(--nous-card-padding-bottom)]">
            <span className="absolute right-[var(--nous-card-count-inset)] top-[var(--nous-card-count-inset)] grid size-5 place-items-center rounded-full bg-white/5 text-xs nous-mono text-[var(--nous-card-title-fg)]">
                {count}
            </span>
            <h3 className="pr-[var(--nous-card-title-padding-right)] text-sm text-[var(--nous-card-title-fg)] font-semibold">{title}</h3>
            <p className="mt-[var(--nous-card-body-margin-top)] text-xs text-[var(--nous-card-body-fg)]">{body}</p>
            <Button className="mt-[var(--nous-card-action-margin-top)] gap-[var(--nous-card-action-gap)] px-1 text-[length:var(--nous-type-micro-xs)] leading-none" icon="menu" variant="warning">{mockupCopy.cards.reviewAction}</Button>
        </Surface >
    );
}

export function InsightCard({ body, note, title }: { body: string; note: string; title: string }) {
    return (
        <Surface className="px-[var(--nous-card-padding-x)] py-[var(--nous-card-padding-y)] pb-[var(--nous-card-padding-bottom)]">
            <h3 className="text-sm text-[var(--nous-card-title-fg)] font-semibold">{title}</h3>
            <p className="mt-[var(--nous-card-insight-body-margin-top)] text-xs text-[var(--nous-card-body-fg)]">{body}</p>
            <p className="mt-[var(--nous-card-insight-note-margin-top)] text-xs text-[var(--nous-card-body-fg)]">{note}</p>
            <Button className="mt-[var(--nous-card-insight-action-margin-top)] gap-[var(--nous-card-action-gap)] px-2 text-[length:var(--nous-type-micro-xs)] leading-none" icon="edit" variant="primary">{mockupCopy.cards.reviewAction}</Button>
        </Surface>
    );
}

export function UpdateMiniCard({ body, time, title }: { body: string; time: string; title: string }) {
    return (
        <Surface className="px-[var(--nous-card-padding-x)] py-[var(--nous-card-padding-y)] pb-[var(--nous-card-padding-bottom)] !bg-[var(--nous-card-bg-muted)]">
            <p className="nous-mono text-[length:var(--nous-type-micro-xs)] text-[var(--nous-timestamp-fg-minimal)]">{time}</p>
            <h3 className="mt-[var(--nous-card-update-title-margin-top)] text-xs font-semibold text-[var(--nous-fg-secondary)]">{title}</h3>
            <p className="mt-[var(--nous-card-update-body-margin-top)] text-[length:var(--nous-type-micro-sm)] text-[var(--nous-card-body-fg)]">{body}</p>
        </Surface>
    );
}
