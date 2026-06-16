# Mockup Composable, Primitive, and Token Application Plan

Date: 2026-05-24

Inputs:

- `docs/mockup-design-system-consolidation-plan.md`
- `docs/mockup-composable-primitive-token-application-audit.md`
- `src/styles/tokens/*.css`
- `src/components/design-system/mockup/components/*`
- `src/components/product-mockups/*`
- `src/components/mockups/conversation/index.ts`

Goal: apply existing reusable tokens, primitives, and composables to the current mockups in low-risk slices while preserving visual parity on `/component-polish`, `/design-system`, and the homepage.

## Executive summary

The mockup system now has the right foundation:

- Semantic app tokens are broadly available.
- Neutral conversation aliases exist for reusable chat anatomy.
- Primitive components exist for surfaces, chips, icon buttons, segmented controls, disclosures, description lists, scroll regions, and panel headers.
- Conversation compounds exist for message bubbles, working panels, tool-call lists, and proposal cards.

The next work is not to invent more system surface area. It is to **apply what already exists** in the places where the audit found repeated inline patterns.

The safest sequence is:

1. Token-only neutralization of reusable homepage chat values.
2. Import-boundary cleanup for conversation and glyph consumers.
3. Structural primitive adoption in app-shell mockups.
4. Chat message/composer migration after token cleanup.
5. Workflow/phone shell extraction only after parity is proven.

## Non-negotiables

- Preserve visual parity first; this is not a redesign.
- Keep components server-rendered by default.
- Add `"use client"` only where state, effects, event handlers, or browser APIs are required.
- Keep homepage choreography local unless the same behavior appears elsewhere.
- Do not replace bespoke art direction with fake global tokens.
- Keep compatibility wrappers during migration.
- Prefer narrow PR/slices over a large rename/refactor.

## Current system state

### Already applied

| Area | Status |
| --- | --- |
| Core semantic tokens | Broadly applied: `--nous-fg-*`, `--nous-bg-*`, `--nous-stroke-*`, `--nous-accent-*`, `--nous-radius-*`, `--nous-shadow-*`. |
| App shell tokens | Applied across design-system mockups: shell, topbar, sidebar, workspace, drawer, updates, cards, nav, segmented. |
| Conversation aliases | Applied in `homepage-chat-visual-primitives.tsx`, `saved-workflow-companion-phone.tsx`, task proposal CSS, and `CommandInput`. |
| Conversation compounds | `MessageBubble`, `WorkingPanel`, `ToolCallList`, `ProposalCard`, `ProposalActionChip` exist and are consumed by the companion phone. |
| Product mockup token cleanup | `src/components/product-mockups` no longer uses `--nous-page-*`. |
| Legacy alias cleanup | Scoped mockups no longer use `--hairline-*`, `--asset-sidebar-*`, `--context-area-*`, or `--nous-text-*`. |

### Still under-applied

| Primitive / layer | Current gap |
| --- | --- |
| `DescriptionList` | Defined but not used for repeated label/value rows. |
| `Disclosure` | Defined but most `details`/`summary` markup remains inline. |
| `ScrollableRegion` | Defined but repeated scroll wrappers remain inline. |
| `PanelHeader` | Defined but headers are still handcrafted. |
| `SegmentedControl` | Defined but most usage goes through `SegmentedTabs` or custom tab markup. |
| `Chip` | Used in the context panel, but not for many status/topic/badge pills. |
| `Surface` | Used in cards, but not yet for workflow nodes/stat cards or conversation shells. |
| `MessageBubble` | Used by companion phone, not yet by homepage chat user bubble. |

## Phase 1 — Token-only homepage chat neutralization

**Objective:** remove reusable `--nous-home-chat-*` dependencies from reusable chat anatomy in `homepage-chat-section-mockup.tsx` without changing layout or storyboard behavior.

**Primary file:**

- `src/components/product-mockups/homepage-chat-section-mockup.tsx`

**Secondary file:**

- `src/components/component-polish/component-polish-page.test.tsx`

### Replace reusable token references

Replace these direct references where they represent reusable anatomy rather than homepage layout:

| Current token | New token |
| --- | --- |
| `--nous-home-chat-canvas-bg` | `--nous-chat-canvas-bg` |
| `--nous-home-chat-canvas-radial-bg` | `--nous-chat-canvas-radial-bg` |
| `--nous-home-chat-transcript-gap` | `--nous-chat-transcript-gap` |
| `--nous-home-chat-user-message-bg` | `--nous-chat-message-bg-user` |
| `--nous-home-chat-agent-message-bg` | `--nous-chat-message-bg-assistant` |
| `--nous-home-chat-user-message-max-width` | `--nous-chat-message-max-width-user` |
| `--nous-home-chat-message-radius` | `--nous-chat-message-radius` |
| `--nous-home-chat-message-padding-x` | `--nous-chat-message-padding-x` |
| `--nous-home-chat-message-padding-y` | `--nous-chat-message-padding-y` |
| `--nous-home-chat-message-font-size` | `--nous-chat-message-font-size` |
| `--nous-home-chat-message-leading` | `--nous-chat-message-leading` |
| `--nous-home-chat-response-section-gap` | `--nous-assistant-response-section-gap` |
| `--nous-home-chat-response-section-padding-top` | `--nous-assistant-response-section-padding-top` |
| `--nous-home-chat-response-paragraph-gap` | `--nous-assistant-response-paragraph-gap` |
| `--nous-home-chat-tool-list-margin-top` | `--nous-tool-call-list-margin-top` |
| `--nous-home-chat-command-min-height` | `--nous-composer-min-height` |
| `--nous-home-chat-command-compact-height` | `--nous-composer-compact-height` |
| `--nous-home-chat-command-font-size` | `--nous-composer-font-size` |
| `--nous-home-chat-command-compact-font-size` | `--nous-composer-compact-font-size` |
| `--nous-home-chat-command-leading` | `--nous-composer-leading` |
| `--nous-home-chat-command-compact-leading` | `--nous-composer-compact-leading` |
| `--nous-home-chat-command-compact-padding-x` | `--nous-composer-compact-padding-x` |
| `--nous-home-chat-command-compact-padding-top` | `--nous-composer-compact-padding-top` |
| `--nous-home-chat-command-compact-padding-bottom` | `--nous-composer-compact-padding-bottom` |
| `--nous-home-chat-command-toolbar-height` | `--nous-composer-toolbar-height` |
| `--nous-home-chat-command-toolbar-padding-x` | `--nous-composer-toolbar-padding-x` |
| `--nous-home-chat-command-toolbar-action-gap` | `--nous-composer-toolbar-action-gap` |
| `--nous-home-chat-send-button-size` | `--nous-composer-send-button-size` |
| `--nous-home-chat-send-button-ready-bg` | `--nous-composer-send-ready-bg` |
| `--nous-home-chat-send-button-ready-fg` | `--nous-composer-send-ready-fg` |
| `--nous-home-chat-send-button-ready-shadow` | `--nous-composer-send-ready-shadow` |
| `--nous-home-chat-typing-padding-x` | `--nous-chat-typing-padding-x` |
| `--nous-home-chat-typing-padding-y` | `--nous-chat-typing-padding-y` |
| `--nous-home-chat-typing-dot-size` | `--nous-chat-typing-dot-size` |
| `--nous-home-chat-typing-dot-gap` | `--nous-chat-typing-dot-gap` |

### Do not replace in this phase

Keep these homepage-specific values local:

- `--nous-home-chat-frame-width`
- `--nous-home-chat-frame-height`
- `--nous-home-chat-component-mask`
- `--nous-home-chat-canvas-left`
- `--nous-home-chat-canvas-content-padding-x`
- `--nous-home-chat-canvas-highlight-*`
- `--nous-home-chat-greeting-*`
- `--nous-home-chat-composer-width`
- `--nous-home-chat-composer-active-width`
- `--nous-home-chat-composer-margin-top`
- `--nous-home-chat-composer-active-margin-bottom`
- `--nous-home-chat-transcript-top`
- `--nous-home-chat-transcript-bottom`
- `--nous-home-chat-transcript-width`
- `--nous-home-chat-transcript-scrollbar-gutter`
- `--nous-home-chat-sidebar-*`
- `--nous-home-chat-nav-*`
- `--nous-home-chat-thread-*`
- `--nous-home-chat-user-*`
- icon-specific homepage values until composer/icon-frame extraction is designed

### Tests to update

Only update expectations that assert reusable anatomy token classes. Keep expectations for homepage layout tokens.

Examples:

- Keep assertions for frame/transcript/composer layout widths.
- Update assertions for command height/typography if they now use `--nous-composer-*`.
- Keep assertions for sidebar-specific `--nous-home-chat-sidebar-*`.

### Acceptance criteria

- No visual behavior changes on `/component-polish`.
- Reusable message/composer/typing/tool-call anatomy in `homepage-chat-section-mockup.tsx` no longer references `--nous-home-chat-*` when a neutral alias exists.
- Homepage-specific layout and choreography still use local `--nous-home-chat-*` tokens.
- Existing storyboard tests still pass after assertion updates.

### Audit command

```bash
rg -- "--nous-home-chat-(message|user-message|agent-message|response|tool-list|command|send-button|typing)" src/components/product-mockups/homepage-chat-section-mockup.tsx
```

Expected result: no matches except intentionally deferred icon-specific values if not addressed in this phase.

## Phase 2 — Import boundary cleanup

**Objective:** make neutral barrels the stable public import surface for product mockups.

### Conversation imports

Target:

- `src/components/product-mockups/homepage-chat-section-mockup.tsx`

Change from:

```ts
import { HomepageChatTaskProposalCard, HomepageChatToolCallList } from "@/components/product-mockups/homepage-chat-visual-primitives";
```

To:

```ts
import { HomepageChatTaskProposalCard, HomepageChatToolCallList } from "@/components/mockups/conversation";
```

### Design-system glyph imports

Targets:

- `src/components/product-mockups/homepage-chat-visual-primitives.tsx`
- `src/components/product-mockups/homepage-chat-section-mockup.tsx`
- `src/components/product-mockups/saved-workflow-companion-phone.tsx`
- `src/components/product-mockups/saved-workflow-run-wireframe-mockup.tsx`

Prefer:

```ts
import { Glyph } from "@/components/design-system/mockup/components";
import type { GlyphName } from "@/components/design-system/mockup/components";
```

Instead of deep imports from `components/icons`.

### Acceptance criteria

- Product mockups do not import directly from `homepage-chat-visual-primitives` unless they are defining that layer.
- Product mockups consume design-system glyphs through the design-system barrel.
- No visual changes.

### Audit commands

```bash
rg "product-mockups/homepage-chat-visual-primitives" src/components/product-mockups
rg "design-system/mockup/components/icons" src/components/product-mockups
```

Expected result:

- First command: no consumer imports outside `homepage-chat-visual-primitives.tsx` itself.
- Second command: no product mockup imports from the internal icon file.

## Phase 3 — Structural primitive adoption in app-shell mockups

**Objective:** make already-defined structural primitives real consumers without changing larger shell composition.

### 3.1 `DescriptionList` in `agent-drawer.tsx`

Target block:

- Change rows under `mockupCopy.agentDrawer.result.changeRows`.

Current pattern:

- Inline `<dl>` with repeated `Fragment`, `dt`, and `dd`.

Plan:

- Import `DescriptionList` from `./primitives`.
- Map rows into `{ key, label, value }`.
- Preserve:
  - `grid-cols-[var(--nous-drawer-dl-label-width)_1fr]` equivalent via `labelWidth`.
  - `text-[var(--nous-drawer-body-fg)]`.
  - mono meta label styling.

Acceptance:

- Drawer change rows look identical.
- `DescriptionList` has at least one real app-shell consumer.

### 3.2 `ScrollableRegion` in app-shell scroll bodies

Targets:

- `agent-drawer.tsx` drawer body.
- `workspace-updates.tsx` updates list body.
- `asset-sidebar.tsx` nav area.

Plan:

- Import `ScrollableRegion` from `./primitives`.
- Replace wrappers only where class behavior is already equivalent:
  - `flex-1`
  - `overflow-y-auto`
  - `min-h-0` where appropriate
  - `nous-mobile-scrollbar`
- Preserve existing padding, text, and layout classes by passing `className`.

Acceptance:

- Scroll behavior unchanged on desktop and mobile.
- No clipped content or lost sticky/fade overlays.
- Existing e2e page smoke tests pass.

### 3.3 `Chip` for simple pills

Targets:

- `agent-drawer.tsx` `TopicPill`.
- `saved-workflow-companion-phone.tsx` live/bot badge.
- `saved-workflow-run-wireframe-mockup.tsx` workflow node status badge.

Plan:

- Use `Chip` where the target is purely presentational.
- Use `size="sm"` and `shape="rounded"` or `shape="pill"` as needed.
- Keep exact class overrides for current padding/color if required.

Acceptance:

- Badges preserve current shape, density, and color contrast.
- No new interactive semantics are introduced for non-interactive pills.

## Phase 4 — Conversation primitive adoption in homepage chat

**Objective:** move reusable homepage chat markup onto conversation compounds while preserving storyboard timing and data attributes.

This phase should start only after Phase 1 passes.

### 4.1 User bubble → `MessageBubble role="user"`

Target:

- User message block in `homepage-chat-section-mockup.tsx`.

Plan:

- Use `MessageBubble` from `@/components/mockups/conversation`.
- Pass `role="user"`.
- Preserve:
  - `data-homepage-chat-message="user"` if tests/storyboard rely on it.
  - entry animation class.
  - `self-end` / max-width behavior.
  - current margin spacing.

Acceptance:

- User bubble visual parity.
- Tests still find `data-homepage-chat-message="user"`.

### 4.2 Assistant wrapper → `MessageBubble role="assistant"` or local shell

Target:

- Structured assistant response wrapper in `homepage-chat-section-mockup.tsx`.

Risk:

- This area controls streaming, accordion state, working blocks, final answer, result table, tool calls, and proposal card timing.

Plan:

- Do not migrate the whole structured response at once.
- First replace only the outer static surface if class parity is exact.
- Keep the internal streaming sequence local.

Acceptance:

- Storyboard timers and streaming states are unchanged.
- No loss of `data-homepage-chat-*` attributes used by tests.

### 4.3 Tool calls and proposal imports

Target:

- Existing `HomepageChatToolCallList` and `HomepageChatTaskProposalCard` usages.

Plan:

- Keep compatibility wrappers for data attributes.
- Import wrappers from `@/components/mockups/conversation`.
- Do not remove wrappers until tests and route code no longer depend on `HomepageChat*` names.

Acceptance:

- Compatibility wrappers still render homepage data attributes.
- Underlying implementation remains product-neutral.

## Phase 5 — Composer consolidation design and implementation

**Objective:** replace multiple command input/composer implementations with a flexible compound once token cleanup is complete.

Existing implementations:

- `CommandInput` in `primitives.tsx`.
- `DrawerCommandInput` in `agent-drawer.tsx`.
- `CommandComposer` in `homepage-chat-section-mockup.tsx`.

### Proposed compound

Create a new `CommandComposer` under the conversation/product compound layer rather than forcing all needs into the current primitive.

Suggested API:

```ts
type CommandComposerVariant = "hero" | "compact" | "drawer";

type CommandComposerProps = {
  actions?: ReactNode;
  className?: string;
  contentClassName?: string;
  leadingActions?: ReactNode;
  placeholder?: ReactNode;
  sendReady?: boolean;
  showCaret?: boolean;
  toolbarClassName?: string;
  trailingActions?: ReactNode;
  value?: ReactNode;
  variant?: CommandComposerVariant;
};
```

### Migration path

1. Build compound with no state.
2. Keep storyboard typing/effects in the existing client wrapper.
3. Migrate drawer composer first if it matches the `drawer` variant.
4. Migrate homepage compact composer.
5. Migrate homepage hero composer.
6. Retire or wrap the old `CommandInput` if it becomes redundant.

### Acceptance criteria

- Hero, compact, and drawer modes visually match current mockups.
- Send-ready animation remains controlled by existing CSS/data attributes.
- Composer content remains accessible as readable text.
- No client directive is added to pure visual composer components.

## Phase 6 — Header and shell primitives

**Objective:** apply `PanelHeader` and optional shell primitives only where they clarify repeated layout.

Targets:

- `context-panel.tsx`
- `workspace-updates.tsx`
- `asset-sidebar.tsx`
- `agent-drawer.tsx`

### Plan

1. Start with `workspace-updates.tsx`, because the header is small and action-oriented.
2. Try `context-panel.tsx` next, preserving segmented tabs placement.
3. Evaluate `agent-drawer.tsx`, where the header has tabs and action buttons.
4. Leave `asset-sidebar.tsx` last because it has branded workspace identity and custom controls.

### Acceptance criteria

- Header spacing, tab placement, and action alignment are unchanged.
- `PanelHeader` does not become a prop-heavy mega-component.
- If a header requires too many class overrides, keep it local.

## Phase 7 — Workflow and phone extraction only after repetition

**Objective:** avoid premature abstraction of large composed art-direction shells.

### `WorkflowGraph` / `WorkflowNode`

Current file:

- `saved-workflow-run-wireframe-mockup.tsx`

Can apply now:

- `Chip` for status badges.
- Possibly `Surface` for stat cards and nodes.

Do not extract `WorkflowGraph` yet unless:

- Another workflow/editor mockup appears.
- Node coordinates/connectors need to be data-driven in multiple places.

### `PhoneFrame`

Current file:

- `saved-workflow-companion-phone.tsx`

Can apply now:

- `Chip` for live/bot badge.
- `SegmentedControl` for helper/Telegram tabs if metadata styling is preserved.

Do not extract `PhoneFrame` yet unless:

- Another mobile mockup appears.
- Phone hardware/status chrome starts repeating.

### `ChatCanvas`

Potential source files:

- `homepage-chat-section-mockup.tsx`
- `saved-workflow-companion-phone.tsx`

Do not extract until:

- Message stack, composer, and working/proposal/tool-call anatomy converge.
- Homepage-specific offsets and masks are clearly separated from reusable canvas anatomy.

## Phase 8 — Cleanup and enforcement

**Objective:** prevent drift after migrations land.

### Search checks

Run after each implementation slice:

```bash
rg -- "--nous-page-" src/components/product-mockups src/components/design-system/mockup/components
rg -- "--hairline|--asset-sidebar|--context-area|--nous-text-" src/components/product-mockups src/components/design-system/mockup/components
rg -- "product-mockups/homepage-chat-visual-primitives" src/components/product-mockups
rg -- "design-system/mockup/components/icons" src/components/product-mockups
```

Expected:

- No `--nous-page-*` in mockup components.
- No legacy alias usage in scoped mockups.
- No product mockup consumers directly importing `homepage-chat-visual-primitives`.
- No product mockup consumers importing the internal icon file.

Homepage chat local-token check:

```bash
rg -- "--nous-home-chat-" src/components/product-mockups/homepage-chat-section-mockup.tsx
```

Expected:

- Matches remain only for homepage-specific composition, choreography, sidebar, coordinates, masks, and deferred icon sizing.

### Quality gates

For implementation PRs:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

For page-level or visual-flow changes:

```bash
npm run e2e
```

Use `npm run e2e` for phases that touch:

- `homepage-chat-section-mockup.tsx`
- `saved-workflow-companion-phone.tsx`
- `saved-workflow-run-wireframe-mockup.tsx`
- `workspace-mockup.tsx`

## Suggested PR sequence

| PR | Scope | Risk | Primary validation |
| --- | --- | --- | --- |
| 1 | Homepage chat token-only neutralization and test expectation updates | Low | unit tests + e2e component polish |
| 2 | Import boundary cleanup for conversation/glyph imports | Low | typecheck + lint |
| 3 | `DescriptionList` and `ScrollableRegion` in `agent-drawer`, updates, sidebar | Low-medium | design-system e2e |
| 4 | `Chip` for drawer topics, companion badge, workflow statuses | Low-medium | unit tests + visual smoke |
| 5 | Homepage user bubble to `MessageBubble` | Medium | component polish tests + e2e |
| 6 | Composer compound design and drawer/compact/hero migration | Medium-high | full checks + e2e |
| 7 | Optional `PanelHeader` adoption | Medium | design-system e2e |
| 8 | Optional workflow/phone shell extraction | Medium-high | full checks + visual review |

## Definition of done

The plan is complete when:

- Reusable chat anatomy no longer depends on `--nous-home-chat-*` names.
- Homepage-specific choreography and layout values remain local and intentionally named.
- Product mockups import conversation components through `@/components/mockups/conversation`.
- Product mockups import glyphs/types through the design-system mockup barrel.
- `DescriptionList`, `Disclosure`, `ScrollableRegion`, and `PanelHeader` are either used where appropriate or intentionally deferred with documented reasons.
- Repeated pills use `Chip` unless they require specialized proposal/action styling.
- Product mockups do not use marketing page tokens or legacy aliases.
- `/component-polish`, `/design-system`, and `/` continue to pass unit/e2e smoke coverage.

## Immediate next step

Begin with PR 1:

1. Update `homepage-chat-section-mockup.tsx` token references for reusable chat anatomy only.
2. Update affected tests in `component-polish-page.test.tsx`.
3. Run:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run e2e
```

This gives the highest system-alignment gain with the lowest visual risk.
