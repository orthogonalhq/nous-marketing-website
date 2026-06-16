# Mockup 02 corrective visual pass

Date: 2026-05-25

## Problem statement

After the primitive/token refactor, `02 / Saved workflow run` still looked visually unrelated to both:

- `01 / Homepage chat`
- the supplied no-chrome homepage chat layout direction

The issue was not missing tokens. It was composition and hierarchy:

- #2 used a dominant physical phone mockup.
- The workflow graph was sharp and equally present instead of unfocused.
- The companion transcript was over-dense, with chat-owned tool calls and expanded proposal details.
- The composition did not use #1's no-chrome sidebar + chat canvas layout.

## Corrective target

Move #2 from **phone + graph split screen** to the same **no-chrome homepage chat layout** as #1:

1. No app chrome, top bar, icon rail, or desktop workspace shell.
2. Use the left pane for the companion message stream, not asset/sidebar navigation.
3. Use the same broad dark chat canvas treatment as #1 on the right.
4. Place the workflow editor as a quiet, unfocused background layer inside the right chat canvas.
5. Render the left message stream with the same transcript/composer primitives as #1.
6. Do not render tool calls in chat; execution belongs to the workflow graph.
7. Collapse proposal details by default to reduce density.

## What should change

| Area | Before | After |
| --- | --- | --- |
| Primary composition | Left iPhone + right workflow graph | Left message pane + right no-chrome chat canvas |
| Companion surface | Physical phone hardware / nav-like sidebar | Left chat transcript using shared 01 conversation primitives |
| Workflow focus | Sharp, full opacity | Dimmed/soft unfocused background |
| Tool calls | Rendered in chat | Removed from chat; represented by workflow graph |
| Proposal details | Expanded by default | Collapsed by default |
| Visual identity | Token-mapped but structurally different | No-chrome #1 composition aligned with the supplied mockup |

## What should remain shared

- `MessageBubble`
- `WorkingPanel`
- `ToolCallList` for chat-owned work in other mockups; not used by #2's helper chat
- `RunningWorkflow` for saved workflow execution in #2's helper chat
- `ProposalCard`
- `CommandComposer`
- `AmbientLayer` / `AmbientSurface`
- Workflow graph primitives and device primitives can remain in the repo, but #2 should no longer center the physical phone.

## What stays local

- Workflow node topology and coordinates.
- Sunday Meal Prep scenario copy.
- Helper app copy and Sunday Meal Prep scenario content.

## Validation target

- Keep #2 landmarks accessible:
  - `Saved workflow run wireframe mockup`
  - `Companion app conversation`
  - `Unfocused workflow run graph`
- Preserve the helper app view with no device/surface switcher.
- Preserve active workflow node assertion.
- Run full quality gate after implementation.

## Implementation completed

### Composition

- Replaced the primary #2 composition from `PhoneFrame + workflow split` to the #1 no-chrome homepage chat layout.
- Removed the intermediate desktop app-shell/topbar/rail direction.
- Renamed the active companion implementation from phone-oriented to chat-oriented:
  - `src/components/product-mockups/saved-workflow-companion-panel.tsx`
- Added #1-style local parts inside `saved-workflow-run-wireframe-mockup.tsx`:
  - left companion message pane
  - dark chat canvas
  - unfocused workflow background layer
  - companion transcript/composer stack
- Moved the companion conversation into the left pane via `SavedWorkflowCompanionChat layout="panel"`.
- Removed asset/sidebar navigation from #2's active render path.
- Removed the physical iPhone frame/status-bar from the active #2 render path.
- Removed the helper/third-party surface switcher; #2 now renders the helper app view only.

### Density and hierarchy

- Removed companion chat tool calls; the workflow graph is the execution surface.
- Added a purple running workflow disclosure with a workflow icon to represent the saved workflow run without implying chat-owned tool calls.
- Collapsed approval proposal details by default.
- Added a compact command composer matching #1's completed chat state.
- Reintroduced a true unfocused workflow treatment with lower opacity and slight blur.

### Token tuning

- Dimmed workflow node/stat backgrounds.
- Reduced workflow node icon and padding scale.
- Kept #2 on #1's frame height and canvas/sidebar spatial contract.
- Added light/rust workflow node/stat overrides so theme switching remains usable.

### Preserved behavior

- Helper app view remains; no helper/third-party tabs render.
- `data-companion-app-surface` remains.
- Shared conversation primitives remain in use.
- Active workflow node and scenario copy remain.

## Validation completed

- `npm run typecheck` passed.
- `npm run lint` passed.
- `npm run test` passed.
- `npm run build` passed.
- `npm run e2e` passed.
