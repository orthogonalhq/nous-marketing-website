# Shared primitive refactor report

Date: 2026-05-24

## Refactor completed

This report records the implementation pass following the token/identity audits.

## 1. Conversation primitives moved to shared namespace

### Before

- Neutral conversation compounds were implemented in:
  - `src/components/product-mockups/homepage-chat-visual-primitives.tsx`
- 02 consumed them via:
  - `src/components/mockups/conversation/index.ts`
- The public import looked shared, but the physical implementation still lived under 01's product namespace.

### After

- Implementation moved to:
  - `src/components/mockups/conversation/conversation-primitives.tsx`
- Shared barrel now exports from the shared implementation:
  - `src/components/mockups/conversation/index.ts`
- The old product file remains as a compatibility re-export:
  - `src/components/product-mockups/homepage-chat-visual-primitives.tsx`

### Why

`MessageBubble`, `WorkingPanel`, `ToolCallList`, `ProposalCard`, and `ProposalActionChip` are no longer 01-only implementation details. 02 uses them as product-agnostic conversation primitives, and future mockups should import from the shared namespace without depending on homepage-specific paths.

## 2. Ambient surface primitives added

### Added

- `src/components/mockups/surface/ambient-surface.tsx`
- `src/components/mockups/surface/index.ts`

### Exports

- `AmbientLayer`
- `AmbientSurface`

### Contract

`AmbientLayer` provides a decorative layer primitive:

- `aria-hidden="true"` by default
- `pointer-events-none` by default
- `absolute` positioning by default
- configurable inset/class/style/data attributes

`AmbientSurface` provides a semantic wrapper:

- `relative overflow-hidden` shell
- ordered decorative layers
- `relative z-10` content wrapper
- semantic `as` support for `article`, `aside`, `div`, and `section`
- support for `ariaLabel`, `role`, `id`, style, and data attributes

## 3. Applied ambient primitives

### 01 / Homepage chat

- `ChatCanvas` now uses `AmbientSurface` for the canvas shell and radial/highlight layers.
- `AgentSidebar` now uses `AmbientSurface` for the drawer shell, sidebar radial layer, and rim-light outline layer.

Preserved:

- `aria-label="Chat welcome panel"`
- `aria-label="Agent navigation"`
- `data-homepage-chat-canvas-radial`
- `data-homepage-chat-canvas-highlight` conditional behavior
- `data-homepage-chat-sidebar-radial`
- `data-homepage-chat-sidebar-outer-border`
- sidebar unfocused mask/content opacity behavior

### 02 / Saved workflow run

- `WorkflowAmbientBackdrop` now uses `AmbientLayer`.
- `WorkflowGraphGrid` now uses `AmbientLayer`.
- `WorkflowPanelRadial` now uses `AmbientLayer`.
- `PhoneFrame` now uses `AmbientLayer` for the sidebar-style radial overlay.
- `PhoneScreen` now uses `AmbientLayer` for the canvas radial overlay.

Preserved:

- Workflow graph coordinate classes
- Workflow node/callout/stat structure
- Phone hardware/notch/camera structure
- Companion tab interaction
- Telegram brand styling exception

## 4. What intentionally stayed local

- 01's hero chat frame geometry and transcript positioning.
- 01's sidebar nav rows and avatar imagery.
- 02's workflow graph topology/coordinates.
- 02's phone hardware geometry.
- Telegram blue avatar and message accent.

## 5. Import boundary cleanup

- Updated the legacy home chat mockup import to use the stable design-system component barrel instead of deep icon imports.
- Verified no product/mockup components import from `design-system/mockup/components/icons` directly.

## 6. Validation status

- `npm run typecheck` passed.
- `npm run lint` passed.
- `npm run test` passed.
- `npm run build` passed.
- `npm run e2e` passed.

## Follow-up opportunities

1. Add neutral sidebar-chrome tokens so device chrome does not reference `--nous-home-chat-sidebar-*` directly.
2. Consider a shared `TypingIndicator` only after a second consumer appears.
3. Consider a shared disclosure data table only after another mockup needs inspectable tabular results.
4. Eventually remove compatibility aliases after older design-system components/tests no longer reference them.
