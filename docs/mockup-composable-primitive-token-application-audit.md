# Mockup Composable, Primitive, and Token Application Audit

Date: 2026-05-24

Inputs:

- `docs/mockup-design-system-consolidation-plan.md`
- `src/styles/tokens/*.css`
- `src/components/design-system/mockup/components/*`
- `src/components/product-mockups/*`
- `src/components/mockups/conversation/index.ts`

Goal: audit what shared composables, primitives, and tokens **are applied**, **are not applied**, **can be applied now**, **could be applied with small extensions**, and **should be applied next** across the existing mockups.

## Current inventory

### Available primitive layer

Defined in `src/components/design-system/mockup/components/primitives.tsx`:

- `Surface`
- `NavItem`
- `SegmentedControl` and compatibility `SegmentedTabs`
- `CommandInput`
- `Button`
- `Chip`
- `GlyphButton`
- `Disclosure`
- `DescriptionList`
- `ScrollableRegion`
- `PanelHeader`

### Available composed/mockup layer

- App shell compounds:
  - `AppTopBar`
  - `IconRail`
  - `AssetSidebar`
  - `ContextPanel`
  - `WorkspaceUpdates`
  - `AgentDrawer`
  - `WorkspaceMockup`
- Card compounds:
  - `DashboardColumn`
  - `WorkCard`
  - `InsightCard`
  - `UpdateMiniCard`
- Conversation compounds:
  - `MessageBubble`
  - `WorkingPanel`
  - `ToolCallList`
  - `ProposalCard`
  - `ProposalActionChip`
  - `HomepageChat*` compatibility wrappers
- Neutral conversation import surface:
  - `src/components/mockups/conversation/index.ts`

### Applied token layer

- Core semantic tokens are broadly applied:
  - `--nous-fg-*`
  - `--nous-bg-*`
  - `--nous-stroke-*`
  - `--nous-accent-*`
  - `--nous-radius-*`
  - `--nous-shadow-*`
  - `--nous-type-*`
  - `--nous-control-*`
  - `--nous-icon-*`
- App shell component tokens are applied across the design-system mockup:
  - `--nous-shell-*`
  - `--nous-topbar-*`
  - `--nous-sidebar-*`
  - `--nous-workspace-*`
  - `--nous-drawer-*`
  - `--nous-updates-*`
  - `--nous-card-*`
  - `--nous-nav-*`
  - `--nous-segmented-*`
- Neutral conversation tokens are now applied in reusable conversation components and the companion phone:
  - `--nous-chat-*`
  - `--nous-composer-*`
  - `--nous-assistant-response-*`
  - `--nous-tool-call-*`
  - `--nous-task-proposal-*`

Scan notes:

- `--nous-page-*`: no matches in scoped mockup component trees.
- Legacy aliases (`--hairline-*`, `--asset-sidebar-*`, `--context-area-*`, `--nous-text-*`): no matches in scoped mockup component trees.
- Remaining `--nous-home-chat-*` references:
  - `src/components/product-mockups/homepage-chat-section-mockup.tsx`: 114 matches.
  - `src/components/component-polish/component-polish-page.test.tsx`: 13 matches, mostly validating homepage-specific layout and storyboard behavior.
- Neutral conversation token references now exist in:
  - `homepage-chat-visual-primitives.tsx`: 46 matches.
  - `saved-workflow-companion-phone.tsx`: 4 matches.
  - `hero-sub-header-cards.module.css`: 2 matches.
  - `primitives.tsx`: 2 matches.

## What is applied now

| Area | Applied primitives/composables | Applied tokens | Notes |
| --- | --- | --- | --- |
| `cards.tsx` | `Surface`, `Button`, `Glyph` | `--nous-card-*`, `--nous-control-*`, core fg/bg/stroke | Strong primitive usage. Good reference implementation for card reuse. |
| `asset-sidebar.tsx` | `GlyphButton`, `NavItem`, `Glyph`, `DisclosureTriangle` | `--nous-sidebar-*`, `--nous-nav-*`, `--nous-icon-*` | Mostly systemized; scroll/body wrappers are still bespoke. |
| `context-panel.tsx` | `SegmentedTabs`, `GlyphButton`, `Chip`, card compounds | `--nous-workspace-*`, `--nous-segmented-*`, `--nous-card-*` | Header and scroll structure can still be primitive-backed. |
| `workspace-updates.tsx` | `GlyphButton`, `UpdateMiniCard` | `--nous-updates-*`, `--nous-card-*` | Header/actions and cards are mostly reusable; scroll region remains inline. |
| `agent-drawer.tsx` | `SegmentedTabs`, `GlyphButton`, `Glyph`, `DisclosureTriangle` | `--nous-drawer-*`, core fg/stroke/control | Uses primitives for header controls but still duplicates pills, scroll, description list, and composer. |
| `workspace-mockup.tsx` | App shell compounds | `--nous-shell-*`, app chrome/background tokens | Correctly composes larger mockup regions rather than restyling them inline. |
| `homepage-chat-visual-primitives.tsx` | Conversation compounds; `Glyph`, `DisclosureTriangle` | `--nous-chat-*`, `--nous-assistant-response-*`, `--nous-tool-call-*`, `--nous-task-proposal-*` | This is now the strongest reusable conversation layer. |
| `saved-workflow-companion-phone.tsx` | `MessageBubble`, `WorkingPanel`, `ToolCallList`, `ProposalCard`, `Glyph` | `--nous-chat-*`, core fg/stroke/control | Good product-neutral consumer of conversation compounds. |
| `saved-workflow-run-wireframe-mockup.tsx` | `Glyph`, companion phone compound | Core/card/control/stroke/accent tokens | Product mockup no longer depends on marketing page tokens. |
| `homepage-chat-section-mockup.tsx` | `Glyph`, `DisclosureTriangle`, `HomepageChatToolCallList`, `HomepageChatTaskProposalCard` | Mostly `--nous-home-chat-*`, plus neutral task proposal via wrappers | Storyboard remains largely homepage-specific; reusable subparts are partially extracted. |
| `companion-iphone-status-bar.tsx` | None beyond local SVG/layout | Local Tailwind and core colors | Correctly bespoke; device chrome should stay local unless reused. |

Support-file coverage:

- `icons.tsx` is the shared glyph registry; no primitive migration needed beyond preferring barrel imports from consumers.
- `data.ts` is a content re-export; no design-system migration needed.
- `utils.ts` only contains `cn`; no design-system migration needed.
- `index.ts` is the app-shell barrel; keep it as the stable import surface for mockup primitives and shell components.
- `workspace-mockup.module.css` contains a one-off outer border overlay for the app-shell specimen; keep local unless that overlay treatment appears in multiple shells.

## What is not applied yet

### Underused primitives

These exist but are not yet materially applied outside their definitions:

- `SegmentedControl` direct usage; most existing usage still goes through `SegmentedTabs` or custom tab markup.
- `Disclosure`.
- `DescriptionList`.
- `ScrollableRegion`.
- `PanelHeader`.

### Partially applied primitives

- `Surface` is applied well in design-system cards, but not yet in:
  - workflow run root shell
  - workflow nodes
  - workflow stat cards
  - conversation message/working/proposal surfaces
- `Chip` is applied in the context panel, but not yet in:
  - agent drawer topic pills
  - companion phone live/bot badge
  - workflow node status badges
  - proposal action chips, which are specialized but still conceptually chip-like
- `GlyphButton` is applied for controls, but not yet for non-interactive icon frames or app rail variants.
- `NavItem` is applied in the app sidebar, but not in the homepage chat sidebar rows.

### Token families not fully applied

Neutral conversation aliases are not fully applied in `homepage-chat-section-mockup.tsx`. The remaining `--nous-home-chat-*` usage falls into two groups:

1. **Reusable behavior that should move to neutral aliases:**
   - message radius, padding, font size, leading, backgrounds
   - assistant response spacing
   - tool-call list spacing
   - composer height, typography, toolbar, send-ready state
   - typing indicator spacing and dot size

2. **Homepage-specific composition that should stay local for now:**
   - frame width/height
   - canvas offset and transcript absolute positioning
   - masks/fades/highlights
   - greeting placement and typography
   - sidebar choreography and unfocused masks
   - avatar art and thread animation details

## Can be applied now

These are low-risk, localized migrations that should preserve visuals with class overrides where needed.

### 1. Replace remaining reusable `--nous-home-chat-*` references with neutral aliases

Target: `src/components/product-mockups/homepage-chat-section-mockup.tsx`.

Safe token substitutions already available:

| Current | Replace with |
| --- | --- |
| `--nous-home-chat-canvas-bg` | `--nous-chat-canvas-bg` |
| `--nous-home-chat-canvas-radial-bg` | `--nous-chat-canvas-radial-bg` |
| `--nous-home-chat-transcript-gap` | `--nous-chat-transcript-gap` |
| `--nous-home-chat-user-message-bg` | `--nous-chat-message-bg-user` |
| `--nous-home-chat-agent-message-bg` | `--nous-chat-message-bg-assistant` |
| `--nous-home-chat-user-message-max-width` | `--nous-chat-message-max-width-user` |
| `--nous-home-chat-message-radius` | `--nous-chat-message-radius` |
| `--nous-home-chat-message-padding-x/y` | `--nous-chat-message-padding-x/y` |
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
| `--nous-home-chat-command-compact-padding-*` | `--nous-composer-compact-padding-*` |
| `--nous-home-chat-command-toolbar-height` | `--nous-composer-toolbar-height` |
| `--nous-home-chat-command-toolbar-padding-x` | `--nous-composer-toolbar-padding-x` |
| `--nous-home-chat-command-toolbar-action-gap` | `--nous-composer-toolbar-action-gap` |
| `--nous-home-chat-send-button-size` | `--nous-composer-send-button-size` |
| `--nous-home-chat-send-button-ready-*` | `--nous-composer-send-ready-*` |
| `--nous-home-chat-typing-padding-x/y` | `--nous-chat-typing-padding-x/y` |
| `--nous-home-chat-typing-dot-size/gap` | `--nous-chat-typing-dot-size/gap` |

Do not replace homepage-specific layout tokens in this pass.

### 2. Use the neutral conversation import surface

Targets:

- `homepage-chat-section-mockup.tsx`
- `saved-workflow-companion-phone.tsx` already uses this pattern.

Use:

```ts
import { HomepageChatTaskProposalCard, HomepageChatToolCallList } from "@/components/mockups/conversation";
```

Instead of importing compatibility wrappers directly from `product-mockups/homepage-chat-visual-primitives`.

### 3. Apply `DescriptionList` to simple `dl` blocks

Targets:

- `agent-drawer.tsx` change rows.
- `homepage-chat-visual-primitives.tsx` proposal detail rows, if the current divider and label width are preserved.

This makes label/value rows consistent and gives `DescriptionList` a real consumer.

### 4. Apply `ScrollableRegion` to simple scroll bodies

Targets:

- `agent-drawer.tsx` drawer body.
- `workspace-updates.tsx` updates list.
- `asset-sidebar.tsx` nav area.

These already follow the same pattern: `flex-1`, `overflow-y-auto`, custom scrollbar utilities, and min-height constraints.

### 5. Apply `Chip` to status/badge pills

Targets:

- `agent-drawer.tsx` topic pills.
- `saved-workflow-companion-phone.tsx` live/bot badge.
- `saved-workflow-run-wireframe-mockup.tsx` node status badges.

Use `size`, `shape`, `tone`, and class overrides to maintain exact spacing.

### 6. Normalize deep icon imports through the component barrel

Targets:

- `homepage-chat-visual-primitives.tsx`
- `homepage-chat-section-mockup.tsx`
- `saved-workflow-companion-phone.tsx`
- `saved-workflow-run-wireframe-mockup.tsx`

Prefer:

```ts
import { Glyph } from "@/components/design-system/mockup/components";
import type { GlyphName } from "@/components/design-system/mockup/components";
```

This keeps product mockups from depending on internal file layout.

## Could be applied with small extensions

These are reasonable but need visual review or primitive API additions.

### `PanelHeader`

Could apply to:

- `context-panel.tsx`
- `workspace-updates.tsx`
- `asset-sidebar.tsx`
- `agent-drawer.tsx`

Needed extension:

- Better support for tab slots, split title/action rows, and compact mono labels.

### `SegmentedControl`

Could apply to:

- `chrome.tsx` topbar tabs.
- `saved-workflow-companion-phone.tsx` helper/Telegram tabs.
- `agent-drawer.tsx` and `context-panel.tsx`, replacing compatibility `SegmentedTabs`.

Needed extension:

- Stronger styling control for metadata rows and topbar-specific density.

### `GlyphButton` / icon-frame primitive

Could apply to:

- `chrome.tsx` rail project buttons.
- `homepage-chat-section-mockup.tsx` `IconFrame`.
- `saved-workflow-run-wireframe-mockup.tsx` workflow node icon frames.
- `saved-workflow-companion-phone.tsx` avatar/icon shells only if a non-button `IconFrame` primitive is introduced.

Recommendation:

- Do not overload `GlyphButton` too far. If many non-interactive frames appear, introduce `IconFrame` as a primitive.

### `Surface`

Could apply to:

- `saved-workflow-run-wireframe-mockup.tsx` root shell, stat cards, workflow nodes.
- `homepage-chat-visual-primitives.tsx` `MessageBubble` and `WorkingPanel` shells.

Risk:

- Current surfaces use exact background/shadow/ring combinations. Apply only where `tone`, `stroke`, `radius`, and `shadow` preserve parity without obscure overrides.

### `CommandInput` → `CommandComposer`

Could replace or evolve:

- `CommandInput` in `primitives.tsx`.
- `DrawerCommandInput` in `agent-drawer.tsx`.
- `CommandComposer` in `homepage-chat-section-mockup.tsx`.

Needed extension:

- `variant="hero | compact | drawer"`
- toolbar slots
- placeholder/value slot
- send-ready state
- caret rendering
- optional client wrapper for storyboard behavior

This is probably a new compound, not a simple primitive refactor.

## Should be applied next

Priority order:

1. **Token-only homepage chat neutralization**
   - Replace reusable `--nous-home-chat-*` references in `homepage-chat-section-mockup.tsx` with existing neutral aliases.
   - Keep homepage frame, masks, transcript coordinates, sidebar choreography, and avatar art local.

2. **Canonical conversation imports**
   - Route all reusable conversation consumers through `@/components/mockups/conversation`.
   - Keep `HomepageChat*` wrappers only as compatibility shims for the storyboard while migrating.

3. **Use structural primitives where they already match**
   - `DescriptionList` for simple label/value rows.
   - `Disclosure` for basic native details shells.
   - `ScrollableRegion` for repeated scroll bodies.
   - This avoids adding dead primitives that exist but are not used.

4. **Promote homepage user/assistant message variants to `MessageBubble`**
   - Start with the user bubble in `homepage-chat-section-mockup.tsx`.
   - Then evaluate the custom structured assistant response, preserving storyboard streaming behavior.

5. **Generalize the composer after token cleanup**
   - Do not force `CommandInput` into the homepage storyboard yet.
   - Design `CommandComposer` as a compound that can handle hero, compact, and drawer states.

6. **Only extract larger shells after repetition is confirmed**
   - `PhoneFrame` after another phone mockup appears.
   - `WorkflowGraph` after another workflow/editor mockup appears.
   - `ChatCanvas` after the homepage chat and companion phone converge on shared anatomy.

## Should stay local for now

Do not globalize these unless repeated elsewhere:

- Homepage mask/fade classes and keyframes.
- Homepage frame dimensions, canvas offsets, transcript absolute coordinates, and greeting placement.
- Homepage sidebar unfocused masks, radial overlays, avatar art, and thread choreography.
- Workflow graph coordinates, connector paths, and active-node placement.
- iPhone hardware details and status-bar icon dimensions.
- Telegram blue and other integration/persona-specific art direction.

## Per-mockup next-action matrix

| Mockup/file | Are applied | Aren't applied | Can apply now | Could apply later | Should prioritize |
| --- | --- | --- | --- | --- | --- |
| `workspace-mockup.tsx` | Composed shell regions | None critical | No immediate change | `PanelShell` if repeated | Low |
| `chrome.tsx` | Core tokens, `Glyph` | `SegmentedControl`, `GlyphButton` rail variants | Barrel imports | Topbar tabs and rail buttons | Medium |
| `asset-sidebar.tsx` | `GlyphButton`, `NavItem` | `ScrollableRegion`, `PanelHeader` | Scrollable nav body | Header compound | Medium |
| `context-panel.tsx` | `SegmentedTabs`, `Chip`, cards | `PanelHeader`, `ScrollableRegion` | Scrollable canvas wrapper | Header compound | Medium |
| `workspace-updates.tsx` | `GlyphButton`, update cards | `ScrollableRegion`, `PanelHeader` | Scrollable updates list | Header compound | Medium |
| `agent-drawer.tsx` | `SegmentedTabs`, `GlyphButton` | `Chip`, `DescriptionList`, `ScrollableRegion`, `CommandComposer` | Topic chips, change list, scroll body | Drawer composer compound | High |
| `cards.tsx` | `Surface`, `Button` | None critical | No immediate change | More `Surface` variants if card system grows | Low |
| `homepage-chat-visual-primitives.tsx` | Conversation compounds and neutral tokens | Lower-level `Disclosure`/`DescriptionList` not used | Barrel imports, possible detail `DescriptionList` | `Surface` shells | High |
| `homepage-chat-section-mockup.tsx` | Chat proposal/tool-call wrappers | Most neutral chat tokens, `MessageBubble`, `CommandComposer` compound | Token substitutions and neutral import path | Message/composer/storyboard compound migration | Highest |
| `saved-workflow-companion-phone.tsx` | Conversation compounds and neutral chat tokens | `SegmentedControl`, `Chip`, `PhoneFrame` | Badge chip | Phone frame, segmented tabs | Medium |
| `saved-workflow-run-wireframe-mockup.tsx` | Core/card/control tokens | `Surface`, `Chip`, `WorkflowGraph` | Status chips | Workflow node/graph compounds | Medium |
| `companion-iphone-status-bar.tsx` | Local implementation | Shared primitives intentionally absent | No change | Device primitive if reused | Low |

## Recommended next implementation slice

For the next PR/slice, keep scope narrow:

1. Replace reusable `--nous-home-chat-*` tokens in `homepage-chat-section-mockup.tsx` with existing neutral aliases.
2. Switch homepage chat compatibility imports to `@/components/mockups/conversation`.
3. Use `DescriptionList` and `ScrollableRegion` in `agent-drawer.tsx`.
4. Run visual and automated gates:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run e2e
```

This slice applies the highest-confidence audit findings without changing larger mockup shells or storyboard behavior.
