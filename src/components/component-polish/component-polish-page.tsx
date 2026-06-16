import { DesignSystemThemeShell } from "@/components/design-system/design-system-theme-shell";
import { LazyProductMockup } from "@/components/product-mockups/lazy-product-mockup";

const polishNotes = [
    ["Source", "Supplied homepage chat mockup", "Preserves the offset sidebar, quiet central greeting, and command bar proportions."],
    ["System", "Nue app-shell tokens", "Uses chrome, drawer, command input, stroke, radius, and type variables from the design system."],
    ["Intent", "Homepage chat section", "A polish board for tightening visual components before the composition lands on the homepage."]
] as const;

const tokenRefs = ["--nous-home-chat-frame-width", "--nous-home-chat-sidebar-bg", "--nous-home-chat-component-mask", "--nous-command-input-bg", "--nous-stroke-subtle"] as const;

export function ComponentPolishPage() {
    return (
        <DesignSystemThemeShell background="homepage">
            <ComponentPolishIntro />
            <HomepageChatStudy />
            <CortexWorkflowCreationStudy />
            <SavedWorkflowRunStudy />
        </DesignSystemThemeShell>
    );
}
function ComponentPolishIntro() {
    return (
        <header className="border-b border-[color:var(--nous-stroke-subtle)] pb-5 pt-1">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                    <p className="nous-mono text-xs tracking-[0.08em] text-[var(--nous-accent-info)]">Component polish</p>
                    <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--nous-fg-title)] md:text-4xl">
                        Homepage chat visual component board
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-[var(--nous-fg-muted)]">
                        A focused staging page for refining production visuals against the supplied mockup while staying inside the Nue design-system token grammar.
                    </p>
                </div>
                <div className="grid gap-2 sm:grid-cols-3 lg:w-[560px]">
                    {polishNotes.map(([label, title, body]) => (
                        <div className="rounded-[var(--nous-radius-lg)] border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-reference-panel-bg)] p-3" key={label}>
                            <p className="nous-mono text-[length:var(--nous-type-micro-xs)] tracking-[0.08em] text-[var(--nous-fg-quieter)]">{label}</p>
                            <p className="mt-2 text-xs font-semibold text-[var(--nous-fg-title)]">{title}</p>
                            <p className="mt-1 text-xs leading-5 text-[var(--nous-fg-muted)]">{body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </header>
    );
}
function HomepageChatStudy() {
    return (
        <section aria-labelledby="homepage-chat-study-title" className="scroll-mt-6">
            <div className="mb-4 flex flex-col gap-3 border-b border-[color:var(--nous-stroke-subtle)] pb-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="nous-mono text-xs tracking-[0.08em] text-[var(--nous-fg-quieter)]">01 / Homepage chat</p>
                    <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-[var(--nous-fg-title)] md:text-2xl" id="homepage-chat-study-title">
                        Agent chat section composition
                    </h2>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-[var(--nous-fg-muted)]">
                    The component keeps the mockup&apos;s dark, low-contrast app surface: a left agent drawer in front of a broad chat canvas, with the command input as the only strong focal element.
                </p>
            </div>

            <div className="grid gap-4">
                <div className="flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="nous-mono text-[length:var(--nous-type-micro-xs)] tracking-[0.08em] text-[var(--nous-accent-info)]">Visual specimen</p>
                        <p className="mt-1 text-sm font-medium text-[var(--nous-fg-title)]">Mockup-aligned chat hero candidate</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {tokenRefs.map((token) => (
                            <span className="nous-mono rounded-full border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-control-bg-soft)] px-3 py-1 text-[length:var(--nous-type-micro-xs)] text-[var(--nous-fg-subtle)]" key={token}>
                                {token}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto py-2">
                    <LazyProductMockup mode="static" variant="homepage-chat" />
                </div>
            </div>
        </section>
    );
}

function CortexWorkflowCreationStudy() {
    return (
        <section aria-labelledby="cortex-workflow-creation-study-title" className="mt-16 scroll-mt-6">
            <div className="mb-4 flex flex-col gap-3 border-b border-[color:var(--nous-stroke-subtle)] pb-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="nous-mono text-xs tracking-[0.08em] text-[var(--nous-fg-quieter)]">02 / Cortex workflow creation</p>
                    <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-[var(--nous-fg-title)] md:text-2xl" id="cortex-workflow-creation-study-title">
                        Recurring intent becomes a saved workflow
                    </h2>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-[var(--nous-fg-muted)]">
                    A wireframe for the meal-prep setup example: Cortex recognizes “every week,” asks permission to create the workflow, then builds the schedule, memory, tools, and approval rule live.
                </p>
            </div>

            <div className="grid gap-4">
                <div className="flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="nous-mono text-[length:var(--nous-type-micro-xs)] tracking-[0.08em] text-[var(--nous-accent-info)]">Wireframe specimen</p>
                        <p className="mt-1 text-sm font-medium text-[var(--nous-fg-title)]">Sunday Meal Prep workflow creation candidate</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {["Companion chat", "Reasoning", "Workflow creation", "Context permissions", "Approval rule"].map((label) => (
                            <span className="rounded-full border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-control-bg-soft)] px-3 py-1 text-xs text-[var(--nous-fg-subtle)]" key={label}>
                                {label}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="overflow-hidden py-2">
                    <LazyProductMockup variant="cortex-workflow-creation" />
                </div>
            </div>
        </section>
    );
}

function SavedWorkflowRunStudy() {
    return (
        <section aria-labelledby="saved-workflow-run-study-title" className="mt-16 scroll-mt-6">
            <div className="mb-4 flex flex-col gap-3 border-b border-[color:var(--nous-stroke-subtle)] pb-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="nous-mono text-xs tracking-[0.08em] text-[var(--nous-fg-quieter)]">03 / Saved workflow run</p>
                    <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-[var(--nous-fg-title)] md:text-2xl" id="saved-workflow-run-study-title">
                        Companion conversation with background workflow
                    </h2>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-[var(--nous-fg-muted)]">
                    A wireframe for the meal-prep example: the conversation stays in focus on the left while the saved workflow graph fires in the unfocused background and pauses at a human approval gate.
                </p>
            </div>

            <div className="grid gap-4">
                <div className="flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="nous-mono text-[length:var(--nous-type-micro-xs)] tracking-[0.08em] text-[var(--nous-accent-info)]">Wireframe specimen</p>
                        <p className="mt-1 text-sm font-medium text-[var(--nous-fg-title)]">Saved Sunday Meal Prep run candidate</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {["Companion chat", "Thinking", "Tool calls", "Approval gate", "Workflow graph"].map((label) => (
                            <span className="rounded-full border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-control-bg-soft)] px-3 py-1 text-xs text-[var(--nous-fg-subtle)]" key={label}>
                                {label}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="overflow-hidden py-2">
                    <LazyProductMockup variant="saved-workflow-run" />
                </div>
            </div>
        </section>
    );
}
