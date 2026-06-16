# Mockup Design System Consolidation Plan

Date: 2026-05-24

Inputs:

- `docs/mockup-design-system-token-audit.md`
- `docs/mockup-component-reuse-audit.md`

Goal: turn the current mockups into a repeatable, composable, and consistent design system without losing visual parity on `component-polish` or `design-system`.

## North star

The system should be layered, not page-specific:

1. **Tokens define reusable decisions**: foreground, surfaces, strokes, accents, type, component contracts.
2. **Primitives define reusable anatomy**: surface, icon button, chip, segmented control, disclosure, description list.
3. **Compounds define product UI grammar**: message bubble, composer, working panel, tool-call list, proposal card, panel header.
4. **Composed mockups assemble compounds**: app shell, chat canvas, phone frame, workflow graph.
5. **Local composition stays local**: homepage offsets, masks, workflow coordinates, phone hardware details, avatar/integration art.

## Guiding rules

| Rule | Why it matters |
| --- | --- |
| Preserve visual parity first. | This is a consolidation plan, not a redesign. |
| Expand existing primitives before creating parallel ones. | `Surface`, `Chip`, `GlyphButton`, `SegmentedTabs`, and `NavItem` already cover much of the system. |
| Prefer slot-based compounds over prop explosions. | Slots keep composed components flexible while retaining consistent shells. |
| Keep components server-rendered by default. | Only interactive tabs, animated storyboards, drawer toggles, or live phone time need client state. |
| Keep old names as temporary wrappers during migration. | Prevents a high-risk big-bang rename from `HomepageChat*` to product-neutral names. |
| Globalize repeated behavior, not one-off art direction. | Masks, coordinates, device chrome, and persona art should not become global contracts. |
| New tokens should match component boundaries. | Use `--nous-chat-*`, `--nous-composer-*`, `--nous-tool-call-*`, `--nous-task-proposal-*` for reusable conversation UI. |

## Target file structure

```txt
src/components/mockups/
  primitives/
    surface.tsx
    icon-button.tsx
    chip.tsx
    segmented-control.tsx
    disclosure.tsx
    description-list.tsx
    scrollable-region.tsx
  shell/
    panel-header.tsx
    panel-shell.tsx
    nav-group.tsx
    reference-panel.tsx
  conversation/
    message-bubble.tsx
    command-composer.tsx
    working-panel.tsx
    tool-call-list.tsx
    proposal-card.tsx
    chat-transcript.tsx
  device/
    phone-frame.tsx
  workflow/
    workflow-graph.tsx
    workflow-node.tsx
```

This structure can coexist with the current folders during migration. Existing exports can wrap the new components until the route code is migrated.

## Phase 1 — Token boundary cleanup

**Objective:** separate global component contracts from local mockup composition values.

| Work item | Details | Done when |
| --- | --- | --- |
| Add conversation token aliases | Introduce `--nous-chat-*`, `--nous-composer-*`, `--nous-assistant-response-*`, `--nous-tool-call-*`, `--nous-task-proposal-*`, initially mapped from existing values. | Existing visual output is unchanged. |
| Split `--nous-home-chat-*` | Keep homepage frame width/height, masks, offsets, greeting placement, and sidebar fade as local homepage tokens. Promote repeated message/composer/task values. | New shared components do not need `home-chat` names for reusable behavior. |
| Remove product use of marketing `--nous-page-*` | Replace saved workflow/product mockup surfaces with `--nous-bg-*`, `--nous-card-*`, `--nous-control-*`, or future workflow aliases. | Product mockups no longer depend on marketing page surface tokens. |
| Complete type roles | Add tokens for repeated micro/body compact sizes before more components consume arbitrary values. | Common badge/action/proposal sizes have named roles. |
| Freeze legacy aliases | Keep `--hairline-*`, `--asset-sidebar-*`, `--context-area-*`, and `--nous-text-*` only for compatibility. | No new code uses legacy aliases. |

Recommended token additions:

```css
--nous-chat-message-bg-user
--nous-chat-message-bg-assistant
--nous-chat-message-fg
--nous-chat-message-radius
--nous-chat-message-padding-x
--nous-chat-message-padding-y
--nous-composer-bg
--nous-composer-placeholder-fg
--nous-composer-toolbar-height
--nous-composer-send-ready-bg
--nous-composer-send-ready-fg
--nous-assistant-response-section-gap
--nous-tool-call-list-margin-top
--nous-task-proposal-radius
```

## Phase 2 — Primitive component foundation

**Objective:** make the smallest repeated pieces reusable before moving composed components.

| Component | Build / expand | Initial migrations |
| --- | --- | --- |
| `Surface` | Add `as`, `tone`, `stroke`, `radius`, `shadow`. | Work cards, update cards, workflow stat cards, review panels. |
| `IconButton` / expanded `GlyphButton` | Add `size`, `shape`, `tone`, `surface`, `active`, `as="span"`. | Header actions, rail buttons, icon frames, send button shell where appropriate. |
| `Chip` | Add `size`, `tone`, `shape`, `interactive`, `priority`. | Topic pills, status badges, token pills, workflow status, proposal action chips. |
| `SegmentedControl` | Replace tuple-only `SegmentedTabs`; support buttons/spans, `tablist`, icons, optional metadata. | Topbar tabs, context tabs, drawer tabs, companion phone surface tabs. |
| `Disclosure` | Native `<details>`/`summary` wrapper with consistent summary and content styles. | Tool-call details, proposal details, result disclosure. |
| `DescriptionList` | Compact label/value grid with optional divided rows and label width. | Agent changes, tool calls, proposal details. |
| `ScrollableRegion` | Standard `min-h-0 flex-1 overflow-y-auto` + scrollbar utility + optional padding/gutter. | Sidebar body, updates rail, drawer body, transcript, composer textarea. |

Acceptance criteria:

- Existing mockup pages render the same after each primitive migration.
- New primitives are server components unless an event handler is required.
- Existing primitive exports continue to work during migration.

## Phase 3 — Conversation/product compounds

**Objective:** move proven `HomepageChat*` primitives into product-neutral reusable components.

| New component | Source to generalize | Requirements |
| --- | --- | --- |
| `MessageBubble` | `HomepageChatAssistantMessage`, homepage user bubble, drawer message, companion message. | `role="assistant | user | system"`, optional accent, controlled max width, tokenized padding/radius. |
| `CommandComposer` | `CommandInput`, `DrawerCommandInput`, homepage `CommandComposer`. | Hero/compact/drawer sizing, toolbar slots, caret, placeholder, send-ready state. |
| `WorkingPanel` | `HomepageChatWorkingPanel`, working accordion, companion thinking card. | Status, eyebrow, collapsible mode, complete/running state, paragraph/content slots. |
| `ToolCallList` | `HomepageChatToolCallList`. | Running/complete state, active call index, native disclosure, shared tool-call type. |
| `ProposalCard` / `HumanApprovalCard` | `HomepageChatTaskProposalCard`, companion approval card. | Title/name/body/details/actions, action priority, glass/surface variants. No dependency on marketing hero CSS names. |
| `ChatTranscript` / `MessageStack` | Homepage transcript, companion phone message stack. | Server-friendly stack first; autoscroll/storyboard behavior stays in client wrapper. |

Migration method:

1. Create product-neutral component.
2. Make existing `HomepageChat*` export a thin wrapper around it.
3. Migrate `SavedWorkflowCompanionPhone` first because it already consumes several shared primitives.
4. Migrate `HomepageChatSectionMockup` next while preserving storyboard behavior.
5. Migrate `AgentDrawer` message/composer/description list where practical.
6. Remove wrapper names only after all route code is product-neutral.

## Phase 4 — Shell and documentation compounds

**Objective:** standardize repeated layout wrappers without creating a rigid mega-shell.

| Component | Use cases | Notes |
| --- | --- | --- |
| `PanelHeader` | Asset sidebar header, context header, updates header, drawer header, study section headers. | Slot-based: leading, title, description, tabs, actions. |
| `PanelShell` | Sidebar, updates rail, drawer, chat canvas, workflow article sections. | Build after `Surface`, `PanelHeader`, and `ScrollableRegion`; keep optional. |
| `NavGroup` | Asset sidebar sections, homepage agent sidebar groups. | Uses `NavItem` and optional disclosure triangle. |
| `ReferencePanel` / `ReferenceTable` | Design-system token/component tables and polish note cards. | Keeps audit/docs pages consistent without polluting product UI. |
| `AuditPage` / `AuditSection` | `DesignSystemDoc` and `ComponentPolishPage`. | Optional convenience once reference components exist. |

Acceptance criteria:

- Docs/review pages use the same reference table/panel components.
- Product shell regions use shared panel/header primitives where they do not obscure layout intent.

## Phase 5 — Larger composed mockup shells

**Objective:** extract only the composed shells that are likely to repeat.

| Candidate | Priority | Extract when |
| --- | --- | --- |
| `PhoneFrame` | Medium | Another mobile mockup appears, or the companion phone continues evolving. |
| `WorkflowGraph` / `WorkflowNode` | Medium | Workflow editor appears beyond the saved-workflow wireframe. |
| `ChatCanvas` | Medium | A second chat canvas composition appears. Do not include homepage offsets. |
| `AgentDrawerShell` | Medium-low | Drawer content, launcher, or layout variants multiply. |
| `AppShellFrame` | Low | App shell is needed outside the design-system specimen. |

Keep these local until repeated:

- Homepage masks, fades, offsets, greeting placement.
- Workflow coordinates and connector paths.
- Phone hardware details and status icon dimensions.
- Persona/avatar/integration colors.

## Phase 6 — Cleanup and enforcement

**Objective:** remove migration debt and prevent drift.

| Check | Expected result |
| --- | --- |
| `rg "--hairline|--asset-sidebar|--context-area|--nous-text-" src/components` | No new usage; ideally only compatibility definitions remain. |
| `rg "--nous-page-" src/components/product-mockups` | No matches. |
| `rg "--nous-home-chat-" src/components/mockups` | No reusable components depend on homepage-specific tokens. |
| `rg "HomepageChat" src/components/product-mockups` | Only compatibility wrappers remain, then eventually none. |
| Visual pass on `/design-system` and `/component-polish` | No unintended visual changes across dark/light/rust themes. |

Quality gates for implementation PRs:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Run `npm run e2e` after large page-level migrations, especially after `HomepageChatSectionMockup`, `SavedWorkflowCompanionPhone`, or `WorkspaceMockup` changes.

## Suggested PR sequence

| PR | Scope | Why this slice |
| --- | --- | --- |
| 1 | Token aliases and type roles only. | Establishes stable names without component churn. |
| 2 | Primitive expansions: `Surface`, `IconButton`, `Chip`, `SegmentedControl`. | High reuse, low visual risk. |
| 3 | Structural primitives: `Disclosure`, `DescriptionList`, `ScrollableRegion`, `PanelHeader`. | Prepares for compound migrations. |
| 4 | Conversation compounds: `MessageBubble`, `CommandComposer`, `WorkingPanel`, `ToolCallList`. | Removes the largest duplicated product UI. |
| 5 | `ProposalCard` extraction and glass/task-proposal token cleanup. | Decouples product approval UI from marketing hero CSS. |
| 6 | Refactor app shell/docs pages to use panel/reference/nav helpers. | Makes review pages and shell regions consistent. |
| 7 | Optional composed shells: `PhoneFrame`, `WorkflowGraph`, `ChatCanvas`. | Only after repeated needs are confirmed. |
| 8 | Remove compatibility wrappers/aliases and update docs. | Cleans final drift once parity is verified. |

## Success definition

The consolidation is successful when:

- Reusable product UI no longer carries `HomepageChat*` names.
- Conversation UI is built from shared message, composer, working, tool-call, and proposal components.
- App shell regions reuse common surface, header, nav, chip, segmented, and scroll primitives.
- Product mockups do not consume marketing page tokens.
- Local art direction remains local instead of becoming fake global system tokens.
- The same primitives can compose new mockups without copying large Tailwind strings.
- `/design-system` and `/component-polish` remain visually stable across supported themes.
