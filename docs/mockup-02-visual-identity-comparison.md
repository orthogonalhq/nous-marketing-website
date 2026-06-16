# Mockup 02 visual identity comparison: Saved workflow run

Date: 2026-05-24

## Scope

Components audited:

- `src/components/product-mockups/saved-workflow-run-wireframe-mockup.tsx`
- `src/components/product-mockups/saved-workflow-companion-phone.tsx`
- `src/components/mockups/workflow/workflow-editor-panel.tsx`
- `src/components/mockups/device/phone-frame.tsx`
- Shared conversation compounds exported through `src/components/mockups/conversation`

This compares 02 against 01's visual identity, not only against its original wireframe structure.

## 02 composition overview

02 is a split scenario:

1. **Focused companion phone conversation**
   - Helper/Telegram tabs choose the surface.
   - Phone screen shows app header, intro message, thinking card, tool calls, and human approval proposal.

2. **Background workflow editor graph**
   - Nodes show a saved workflow run and pause at the approval gate.
   - Stats summarize run state, permission, and surface.

The component is now structurally composed from reusable layers (`PhoneFrame`, `PhoneScreen`, `WorkflowRunFrame`, `WorkflowEditorPanel`) instead of a single monolith.

## How 02 currently inherits 01 identity

| 01 visual identity mechanism | 02 application | Assessment |
| --- | --- | --- |
| Chat canvas fill | `--nous-workflow-run-bg`, `--nous-workflow-panel-bg`, `PhoneScreen` background map to `--nous-chat-canvas-bg` | Good convergence. 02 no longer has a separate muted editor shell identity. |
| Canvas radial light | `--nous-workflow-run-radial-bg`, `--nous-workflow-panel-radial-bg`, phone screen radial layer map to `--nous-chat-canvas-radial-bg` | Good, but the decorative layer implementation is repeated inline. |
| Sidebar/drawer surface | `PhoneFrame` bezel maps to `--nous-home-chat-sidebar-bg` and sidebar shadow | Good visual convergence for the phone hardware shell, but the token source name is still 01-specific. |
| Message bubbles | `CompanionMessage` uses shared `MessageBubble` | Good shared primitive reuse. |
| Thinking/working state | `WorkingThinkingCard` uses shared `WorkingPanel` | Good shared primitive reuse. |
| Tool traces | `CompanionToolCalls` uses shared `ToolCallList` | Good shared primitive reuse. |
| Proposal/approval | `ApprovalProposalCard` uses shared `ProposalCard` | Strongest shared UX convergence. |
| Blue approval accent | Workflow callout and active pulse use info accent / task proposal primary tokens | Good; visually connects workflow approval gate to conversation approval action. |

## 02-specific identity that should stay local

| Area | Keep local? | Reason |
| --- | --- | --- |
| Workflow node coordinates/connectors | Yes | These are scenario topology, not a reusable system primitive. |
| Workflow graph grid size/line | Mostly yes | Graph background is specific to workflow editor; only surface treatment should be shared. |
| Phone hardware button/notch/camera geometry | Yes | Device chrome anatomy, not shared with 01. |
| Telegram blue avatar/message accent | Yes | Third-party brand exception. It should stay local unless a formal brand-token strategy is added. |
| Companion tab labels/copy | Yes | Scenario content. |

## Visual gaps against 01

### 1. Shared primitives still have product-owned source files

02 imports `MessageBubble`, `WorkingPanel`, `ToolCallList`, and `ProposalCard` from `@/components/mockups/conversation`, but that barrel currently points at a 01 product file. This means 02 is conceptually clean but physically coupled to 01.

### 2. Ambient overlays are implemented repeatedly

02 has repeated absolute decorative elements:

- `WorkflowAmbientBackdrop` renders run radial/highlight layers.
- `WorkflowPanelRadial` renders panel radial layers.
- `PhoneFrame` renders a sidebar radial overlay.
- `PhoneScreen` renders a canvas radial overlay.

01 has the same pattern in `ChatCanvas` and `AgentSidebar`. This is now a shared identity mechanism and should be a primitive.

### 3. Phone frame uses a direct 01 token

`PhoneFrame` uses `--nous-home-chat-sidebar-radial-bg` directly for its radial overlay. The visual mapping is correct, but the component should eventually consume a neutral device/sidebar chrome token. For this pass, refactoring the rendering primitive is the higher-value change.

### 4. Workflow graph nodes are halfway between cards and chat messages

Workflow nodes now use 01 message surfaces (`--nous-workflow-node-bg` mapped to `--nous-chat-message-bg-assistant`) but still use `Surface` card shadows and workflow-specific layout. This is acceptable: the graph should not become a chat transcript, it should only borrow surface language.

### 5. Companion header/tab treatment is converged but still scenario-specific

The phone header uses `PanelHeader` and shared message surface background. Tabs use `SegmentedControl`. This is sufficient for now; extracting an `AppConversationHeader` would be premature without a third consumer.

## Shared primitive candidates found in 02

| Candidate | Current implementation | Refactor action |
| --- | --- | --- |
| Conversation compounds | Physically in `product-mockups/homepage-chat-visual-primitives.tsx`; imported by 02 via barrel | Move to `mockups/conversation/conversation-primitives.tsx`; leave compatibility re-export. |
| Decorative ambient layer | Inline absolute `div`/`span` in 01 and 02 | Add `AmbientLayer` primitive and use it in canvas/sidebar/workflow/phone surfaces. |
| Ambient surface wrapper | 01 `ChatCanvas` and `AgentSidebar` share `relative overflow-hidden` + layers + z-index content | Add `AmbientSurface` to reduce repeated shell/layer/content structure. |
| Proposal/action pattern | Already `ProposalCard` and `ProposalActionChip` | Keep as shared conversation compound. |
| Thinking/tool-call pattern | Already `WorkingPanel` and `ToolCallList` | Keep as shared conversation compound. |
| App/device frame | `PhoneFrame`/`PhoneScreen` already in `mockups/device` | Keep. Do not merge with generic `Surface`; hardware details are device-specific. |
| Workflow graph | Already in `mockups/workflow` | Keep. Do not over-generalize coordinates. |

## Refactor target for this pass

This pass should implement the two high-confidence shared primitives:

1. **Move conversation primitives to the shared conversation namespace.**
2. **Introduce ambient layer/surface primitives and apply them to 01 and 02.**

Deferred:

- Neutral sidebar chrome tokens for non-sidebar consumers.
- Shared typed/streamed response state machine.
- Shared data table primitive for 01 results tables.
- Shared app-conversation header until another non-phone consumer appears.
