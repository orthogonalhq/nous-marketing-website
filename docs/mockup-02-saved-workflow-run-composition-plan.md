# Mockup 02 Saved Workflow Run Composition Audit and Plan

Date: 2026-05-24

Primary route:

- `http://localhost:3000/component-polish`
- Section: `02 / Saved workflow run`

Primary files:

- `src/components/product-mockups/saved-workflow-run-wireframe-mockup.tsx`
- `src/components/product-mockups/saved-workflow-companion-phone.tsx`
- `src/components/product-mockups/companion-iphone-status-bar.tsx`

Supporting files:

- `src/components/design-system/mockup/components/primitives.tsx`
- `src/components/design-system/mockup/components/index.ts`
- `src/components/mockups/conversation/index.ts`
- `src/components/product-mockups/homepage-chat-visual-primitives.tsx`
- `src/styles/tokens/components.css`

Goal: make mockup 02 as composed as possible while preserving visual parity and using global design-system tokens, primitives, and conversation compounds wherever they fit.

## Executive summary

Mockup 02 is already partly aligned with the design system:

- Workflow cards use `Surface` and `Chip`.
- Glyph imports come through the design-system barrel.
- The companion phone uses `MessageBubble`, `WorkingPanel`, `ToolCallList`, and `ProposalCard`.
- Reusable chat values use neutral `--nous-chat-*` aliases.
- Previous full checks passed after the first composition pass.

The remaining work is to extract the larger repeated structures and replace inline styling that is acting like local component contracts:

1. Add product-neutral component tokens for workflow/editor/device anatomy.
2. Extract a composed workflow editor layer: panel, header, graph, connectors, nodes, callout, stat cards.
3. Extract a composed companion device layer: app tabs, phone frame, phone screen, app header, avatar, transcript stack.
4. Move phone/app tab markup to existing `SegmentedControl` and headers to `PanelHeader` / `Surface`.
5. Move repeated description/stat rows toward `DescriptionList` through existing primitives or conversation compounds.
6. Keep workflow topology coordinates, Telegram brand color, and live status-bar time local unless repetition justifies global tokens.

## Non-negotiables

- Preserve visual parity on `/component-polish`.
- Keep server-rendered components by default.
- Add `"use client"` only for tab state, status-bar time, or other browser-only behavior.
- Keep existing test selectors:
  - `data-saved-workflow-run-wireframe="true"`
  - `data-companion-app-surface`
  - `data-companion-iphone-frame="true"`
  - `data-companion-iphone-status-bar="true"`
  - `data-tool-call-group="true"`
  - `data-proposal-card="true"`
  - `data-workflow-node-status="active"`
- Do not turn one-off topology coordinates into fake global tokens.
- Do not generalize Telegram blue unless a third-party app brand token strategy is created.
- Do not extract a global `WorkflowGraph` that pretends to solve arbitrary graph layout; extract a mockup-level composed graph first.

## Current audit

### `saved-workflow-run-wireframe-mockup.tsx`

Already good:

- Uses `Surface` for workflow nodes and stat cards.
- Uses `Chip` for trigger badge, approval callout, and node status badges.
- Uses `Glyph` / `GlyphName` from the design-system barrel.
- Uses semantic tokens for stroke, foreground, background, radius, and shadow.

Remaining gaps:

| Area | Current state | Recommended direction |
| --- | --- | --- |
| Outer mockup frame | Inline `<article>` with full surface styling. | Use `Surface as="article"` with `tone="muted"`, `radius="xl"`, `stroke="soft"`, `shadow="card"`. |
| Two-column stage | Inline grid and panel classes. | Extract `SavedWorkflowRunLayout` / `MockupSplitFrame`. |
| Companion/editor panels | Inline section boundaries and padding. | Extract `MockupPanel` or local `SavedWorkflowPanel` using `Surface`/border tokens. |
| Workflow editor header | Inline title, eyebrow, and trigger chip. | Extract `WorkflowEditorHeader` using `PanelHeader` plus `Chip`. |
| Graph background grid | Inline arbitrary background image and size. | Add workflow graph tokens for grid line and grid size. |
| Graph container | Inline scroll wrapper and sizing. | Extract `WorkflowGraphViewport` and `WorkflowGraphCanvas`. |
| Node topology | Coordinates stored as Tailwind class strings. | Move to typed layout data with `positionClassName`; keep coordinates local. |
| Connectors | Raw `<span>` connector markup. | Extract `WorkflowConnector`. |
| Approval callout | `Chip` with many layout/style overrides. | Extract `WorkflowCallout` composed from `Chip` or `Surface`. |
| Stat cards | Inline mapped `Surface`. | Extract `WorkflowStatGrid` + `WorkflowStatCard`; optionally use `DescriptionList` for label/value semantics. |

### `saved-workflow-companion-phone.tsx`

Already good:

- Client boundary is justified because the app surface tabs need state.
- Uses `MessageBubble`, `WorkingPanel`, `ToolCallList`, and `ProposalCard`.
- Uses `Chip` for the live/bot badge.
- Uses `--nous-chat-*` tokens for the phone screen and transcript gap.

Remaining gaps:

| Area | Current state | Recommended direction |
| --- | --- | --- |
| Helper/Telegram tabs | Handwritten `role="tablist"` and tab buttons. | Use `SegmentedControl` with `onSelect`, `ariaControls`, `metadata`, and `role="tablist"`. |
| Phone frame | Inline hardware shell, buttons, notch, camera, shadow, radii. | Extract `PhoneFrame`, `PhoneHardwareButton`, `PhoneNotch`, `PhoneCameraDot`; add neutral device tokens. |
| Phone screen | Inline screen surface. | Extract `PhoneScreen` using `Surface`/device tokens and chat canvas aliases. |
| App header | Inline header row. | Extract `CompanionAppHeader` using `PanelHeader`, `Chip`, and `AppAvatar`. |
| Transcript body | Inline flex stack. | Extract `CompanionTranscript` with chat transcript gap/padding tokens. |
| App avatar | Inline helper/Telegram branching. | Extract `AppAvatar` or `BrandedAvatar`; keep Telegram brand value local or behind a brand prop. |
| Proposal details | `ProposalCard` owns inline `<dl>` internally. | Enhance `ProposalCard` to use `DescriptionList` without changing output. |

### `companion-iphone-status-bar.tsx`

Already good:

- Client boundary is justified for live local time.
- Formatting logic has unit coverage via `formatCompanionStatusTime`.
- Status bar is isolated from the larger phone mockup.

Remaining gaps:

| Area | Current state | Recommended direction |
| --- | --- | --- |
| Status bar geometry | Inline top/inset/type/icon dimensions. | Add device/status tokens only if `PhoneFrame` extraction happens. |
| Icons | Inline SVGs are appropriate. | Keep local unless status icons are reused elsewhere. |

## Token plan

Add tokens only for reusable anatomy. Keep topology and one-off art direction local.

### Add device tokens

Suggested names in `src/styles/tokens/components.css`:

```css
--nous-device-phone-max-width: 27rem;
--nous-device-phone-frame-radius: 2.55rem;
--nous-device-phone-screen-radius: 2rem;
--nous-device-phone-screen-min-height: 34rem;
--nous-device-phone-bezel-bg: #000;
--nous-device-phone-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
--nous-device-phone-frame-padding: 0.5rem;
--nous-device-phone-notch-width: 6rem;
--nous-device-phone-notch-height: 1.5rem;
--nous-device-phone-camera-size: 0.375rem;
--nous-device-status-top: 1.15rem;
--nous-device-status-inset-x: 2rem;
--nous-device-status-height: 1rem;
--nous-device-status-font-size: 0.6875rem;
```

Rationale: phone hardware/screen anatomy is reusable across companion/mobile mockups.

### Add companion app tokens

```css
--nous-companion-surface-max-width: var(--nous-device-phone-max-width);
--nous-companion-tab-gap: 0.25rem;
--nous-companion-header-padding-x: 1rem;
--nous-companion-header-padding-bottom: 0.75rem;
--nous-companion-header-padding-top: 2rem;
--nous-companion-avatar-size: 2.25rem;
--nous-companion-transcript-padding-x: 1rem;
--nous-companion-transcript-padding-y: 1rem;
```

Rationale: app-surface tabs, header, avatar, and transcript spacing can repeat across mobile companion examples.

### Add workflow graph tokens

```css
--nous-workflow-run-min-height: 38rem;
--nous-workflow-graph-canvas-height: 31rem;
--nous-workflow-graph-canvas-min-width: 44rem;
--nous-workflow-graph-grid-size: 44px;
--nous-workflow-graph-grid-line: var(--nous-stroke-soft);
--nous-workflow-node-icon-size: 2rem;
--nous-workflow-node-icon-glyph-size: 0.875rem;
--nous-workflow-node-padding: 0.75rem;
--nous-workflow-callout-dot-size: 0.5rem;
--nous-workflow-unfocused-opacity: 0.75;
--nous-workflow-unfocused-blur: 0.18px;
```

Rationale: graph canvas, grid, node icon, and unfocused styling are reusable workflow-editor anatomy. Node coordinates remain local data.

### Keep local

- Node coordinates and connector coordinates.
- Specific workflow title/copy/data.
- Telegram brand color and Telegram glyph path.
- Radial art direction in the outer frame until a second mockup uses it.
- Hardware button offsets if no second phone mockup appears; if `PhoneFrame` is extracted, keep them as internal implementation constants rather than public tokens.

## Proposed component architecture

### New or extracted components

Recommended new folder structure:

```txt
src/components/mockups/device/
  index.ts
  phone-frame.tsx
  phone-status-bar.tsx        # optional re-export/wrapper around current status bar

src/components/mockups/workflow/
  index.ts
  workflow-editor-panel.tsx
  workflow-graph.tsx
  workflow-node.tsx
  workflow-connector.tsx
  workflow-stat-grid.tsx

src/components/product-mockups/
  saved-workflow-run-wireframe-mockup.tsx
  saved-workflow-companion-phone.tsx
```

Keep product-specific scenario data in `product-mockups` unless another workflow mockup needs it.

### Target composition tree

```tsx
<SavedWorkflowRunWireframeMockup>
  <Surface as="article" ...>
    <MockupAmbientBackdrop />
    <SavedWorkflowRunLayout>
      <SavedWorkflowPanel ariaLabel="Companion app conversation">
        <SavedWorkflowCompanionPhone />
      </SavedWorkflowPanel>

      <WorkflowEditorPanel>
        <WorkflowEditorHeader />
        <WorkflowGraphViewport>
          <WorkflowGraphCanvas>
            <WorkflowConnector />
            <WorkflowNode />
            <WorkflowCallout />
          </WorkflowGraphCanvas>
        </WorkflowGraphViewport>
        <WorkflowStatGrid>
          <WorkflowStatCard />
        </WorkflowStatGrid>
      </WorkflowEditorPanel>
    </SavedWorkflowRunLayout>
  </Surface>
</SavedWorkflowRunWireframeMockup>
```

### Companion phone target composition

```tsx
<SavedWorkflowCompanionPhone>
  <CompanionSurfaceTabs />
  <PhoneFrame>
    <CompanionIphoneStatusBar />
    <PhoneScreen>
      <CompanionAppHeader />
      <CompanionTranscript>
        <MessageBubble />
        <WorkingPanel />
        <ToolCallList />
        <ProposalCard />
      </CompanionTranscript>
    </PhoneScreen>
  </PhoneFrame>
</SavedWorkflowCompanionPhone>
```

## Implementation phases

### Phase 1 — Tokenize reusable anatomy

Objective: add neutral tokens before changing markup so visual parity is easier to maintain.

Tasks:

1. Add device tokens for phone shell/screen/status geometry.
2. Add companion app tokens for tabs/header/transcript spacing.
3. Add workflow graph tokens for canvas, grid, node icon, callout dot, unfocused opacity/blur.
4. Replace inline hard-coded reusable values in mockup 02 with tokens.

Acceptance criteria:

- No visual changes.
- No node/connector coordinates promoted to global tokens.
- Telegram brand values remain local or clearly branded.

### Phase 2 — Extract workflow editor composition

Objective: make the right-hand workflow editor a composed component tree.

Tasks:

1. Convert outer `<article>` to `Surface`.
2. Extract `SavedWorkflowRunLayout` for the two-column grid.
3. Extract `SavedWorkflowPanel` for the left/right panels.
4. Extract `WorkflowEditorPanel` and `WorkflowEditorHeader` using `PanelHeader` + `Chip`.
5. Extract `WorkflowGraphViewport` and `WorkflowGraphCanvas`.
6. Extract `WorkflowConnector` from raw connector spans.
7. Extract `WorkflowNode` into `src/components/mockups/workflow/workflow-node.tsx` once its props are product-neutral.
8. Extract `WorkflowCallout` for the active approval gate label.
9. Extract `WorkflowStatGrid` and `WorkflowStatCard`; use `DescriptionList` if semantics stay clean.

Acceptance criteria:

- `saved-workflow-run-wireframe-mockup.tsx` reads mostly as scenario composition plus data.
- Workflow graph internals are reusable but not over-generalized into an arbitrary graph engine.
- `data-workflow-node-status="active"` remains present on the active node.

### Phase 3 — Extract companion phone/device composition

Objective: make the left-hand companion phone reusable across mobile/companion examples.

Tasks:

1. Create `PhoneFrame` under `src/components/mockups/device`.
2. Keep hardware button/notch/camera markup inside `PhoneFrame`.
3. Create `PhoneScreen` for the inner screen surface.
4. Move `CompanionIphoneStatusBar` into the device barrel or re-export it there.
5. Keep the status bar as a small client component.
6. Keep `SavedWorkflowCompanionPhone` as the client owner of tab state.

Acceptance criteria:

- `data-companion-iphone-frame="true"` and `data-companion-iphone-status-bar="true"` remain.
- Only the status bar and tab owner require client behavior.
- Phone shell values come from device tokens where reusable.

### Phase 4 — Replace custom tabs/header with primitives

Objective: use existing design-system controls for app surface chrome.

Tasks:

1. Replace custom helper/Telegram tab buttons with `SegmentedControl`.
2. Preserve `role="tablist"`, `role="tab"`, `aria-selected`, and `aria-controls`.
3. Use `metadata` for `Nue companion` / `Telegram` sublabels.
4. Extract `CompanionAppHeader` using `PanelHeader` with `AppAvatar` as leading and `Chip` as action.
5. Keep Telegram-specific avatar color local.

Acceptance criteria:

- Existing tab interaction test still passes.
- Visual density matches the current tab switcher.
- Header title/subtitle/badge alignment is unchanged.

### Phase 5 — Conversation compound cleanup

Objective: reduce remaining inline detail markup inside conversation compounds where it benefits all consumers.

Tasks:

1. Update `ProposalCard` internals to use `DescriptionList` for details.
2. Consider adding optional `detailsLabelWidth` / `detailsClassName` props only if necessary.
3. Keep glass/prism card art intact.
4. Consider adding `MessageStack` or `ConversationTranscript` only if homepage chat and companion phone converge enough.

Acceptance criteria:

- Proposal card output and data attributes remain stable.
- Homepage chat proposal card tests continue to pass.
- No prop-heavy mega-component is introduced.

### Phase 6 — Product data and API cleanup

Objective: make mockup data declarative without hiding the visual story.

Tasks:

1. Give workflow nodes stable `id`s.
2. Store connector `from`/`to` labels where helpful while preserving local position classes.
3. Move repeated action/detail strings to named constants.
4. Type `WorkflowNodeStatus = "done" | "active" | "queued"`.
5. Keep scenario copy local to the product mockup unless content is shared elsewhere.

Acceptance criteria:

- Component props are typed around reusable concepts, not around the meal-prep story.
- The mockup remains readable as a product scenario.

### Phase 7 — Audit and validation

Search checks:

```bash
rg -- "--nous-page-" src/components/product-mockups src/components/design-system/mockup/components src/components/mockups
rg -- "--hairline|--asset-sidebar|--context-area|--nous-text-" src/components/product-mockups src/components/design-system/mockup/components src/components/mockups
rg "design-system/mockup/components/icons" src/components/product-mockups src/components/mockups
rg "#[0-9A-Fa-f]{3,8}|rgba?\(" src/components/product-mockups/saved-workflow-run-wireframe-mockup.tsx src/components/product-mockups/saved-workflow-companion-phone.tsx
```

Expected:

- No `--nous-page-*` usage.
- No legacy alias usage.
- No deep icon imports from product mockups or new mockup folders.
- Remaining hex/rgba values are only approved art direction: Telegram brand, phone hardware black, or ambient backdrop if intentionally deferred.

Quality gates:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run e2e
```

Use `npm run e2e` because this touches `/component-polish` and interaction for the companion tabs.

## Suggested PR sequence

| PR | Scope | Risk | Validation |
| --- | --- | --- | --- |
| 1 | Add workflow/device/companion tokens and replace reusable inline values | Low | typecheck + component tests |
| 2 | Extract workflow editor panel, graph, node, connector, stat components | Medium | unit + e2e component polish |
| 3 | Extract phone frame/screen and move app tabs to `SegmentedControl` | Medium | unit + e2e component polish |
| 4 | Update `ProposalCard` details to use `DescriptionList` | Medium | unit tests for homepage and saved workflow |
| 5 | Final audit cleanup and docs update | Low | full quality gates |

## Definition of done

The saved workflow mockup is complete when:

- `saved-workflow-run-wireframe-mockup.tsx` is primarily scenario data plus high-level composed components.
- `saved-workflow-companion-phone.tsx` owns only surface state and scenario composition, not phone hardware markup.
- Phone shell/screen/header/tabs use global tokens and primitives.
- Workflow panel/header/graph/nodes/stat cards use global tokens and primitives.
- Conversation internals remain on `MessageBubble`, `WorkingPanel`, `ToolCallList`, and `ProposalCard`.
- Existing data attributes and e2e flows remain stable.
- Any remaining local values are documented as topology, brand, or art-direction exceptions.

## Immediate next step

Start with Phase 1:

1. Add the workflow/device/companion tokens to `src/styles/tokens/components.css`.
2. Replace reusable hard-coded values in `saved-workflow-run-wireframe-mockup.tsx`, `saved-workflow-companion-phone.tsx`, and `companion-iphone-status-bar.tsx`.
3. Do not extract components in the same slice unless visual parity is straightforward.
