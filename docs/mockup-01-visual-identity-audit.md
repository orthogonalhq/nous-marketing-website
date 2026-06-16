# Mockup 01 visual identity audit: Homepage chat

Date: 2026-05-24

## Scope

Component audited:

- `src/components/product-mockups/homepage-chat-section-mockup.tsx`
- Conversation compounds currently exported through `src/components/mockups/conversation`
- Token sources in `src/styles/tokens/components.css`

Mockup 01 is the current source of truth for the shared product mockup visual identity.

## Visual identity summary

01 presents Nue as a dark, quiet, agentic workspace:

- **A near-black chat canvas** with a barely-visible radial light field.
- **A left agent drawer** that sits over the canvas, slightly heavier and more tactile than the chat area.
- **Low-alpha strokes** rather than high-contrast outlines.
- **Soft glass controls** for command input, task proposal cards, and tool states.
- **One strong interactive accent**: blue on the send button and primary proposal action.
- **Motion that suggests thought/process**: streamed text, tool-call shimmer, typing dots, and subtle message entrance.

## Token application by region

### 1. Outer composition

| Concern | Tokens/classes | Notes |
| --- | --- | --- |
| Fixed specimen size | `--nous-home-chat-frame-height`, `--nous-home-chat-frame-width` | Product-specific geometry. Keep local to 01. |
| Chat/sidebar layering | `data-homepage-chat-area`, z-index classes | Interaction/storyboard state is product-specific. |
| Fade/mask support | `.nous-home-chat-component-fade` | Currently not used in the focused static state, but remains part of the 01 identity tooling. |

### 2. Chat canvas

| Concern | Tokens/classes | Identity role |
| --- | --- | --- |
| Surface fill | `--nous-chat-canvas-bg` mapping to `--nous-home-chat-canvas-bg` | The canvas is almost black and deliberately flat. |
| Radial light | `--nous-chat-canvas-radial-bg` | Creates depth without adding visible panels. |
| Highlight | `--nous-home-chat-canvas-highlight-bg` | Only shown for the unfocused canvas state. |
| Radius/stroke | `--nous-home-chat-canvas-radius`, `--nous-stroke-default`, `--nous-stroke-ghost` | Subtle glass/chrome edge. |
| Greeting type | `--nous-home-chat-greeting-*` | Product-specific hero mood and scale. |

### 3. Transcript and message stack

| Concern | Tokens/classes | Identity role |
| --- | --- | --- |
| Transcript width/position | `--nous-home-chat-transcript-*` | Product-specific geometry. |
| Stack spacing | `--nous-chat-transcript-gap` | Shared conversation rhythm. |
| User/assistant bubbles | `--nous-chat-message-*` | Shared conversation surface language. |
| Assistant response rhythm | `--nous-assistant-response-*` | Shared working-answer spacing. |
| Typing indicator | `--nous-chat-typing-*`, `.nous-home-chat-typing-dot` | Shared behavior candidate; class name remains 01-specific. |

### 4. Command composer

| Concern | Tokens/classes | Identity role |
| --- | --- | --- |
| Shell fill | `--nous-composer-bg` | Dark input well. |
| Heights/font sizes | `--nous-composer-min-height`, `--nous-composer-compact-height`, `--nous-composer-font-size` | Shared composer anatomy, mapped from 01. |
| Toolbar | `--nous-composer-toolbar-*` | Shared composer layout. |
| Send affordance | `--nous-composer-send-ready-*`, `.nous-home-chat-send-button-ready` | Blue action highlight and small motion. |
| Icon sizing | `--nous-home-chat-command-*-icon-*` | Still 01-specific; acceptable because icon layout is tied to the hero composer mockup. |

### 5. Tool calls and working state

| Concern | Tokens/classes | Identity role |
| --- | --- | --- |
| Tool-call shell | `ToolCallList`, `--nous-tool-call-*` | Shared machine-process pattern. |
| Running shimmer | `.nous-tool-call-running-summary::after` and compatibility `.nous-home-chat-tool-call-running-summary::after` | Shared behavior exists, but compatibility class remains for tests/01 selectors. |
| Working accordion | Inline structure in `StructuredAssistantResponse` | Candidate for future shared `AssistantWorkingAccordion`, but 01 has complex streamed state. |

### 6. Task proposal card

| Concern | Tokens/classes | Identity role |
| --- | --- | --- |
| Glass card shell | `ProposalCard`, `hero-sub-header-cards.module.css` | Important approval/proposal affordance. |
| Summary/detail/action tokens | `--nous-task-proposal-*` | Correct shared token namespace. |
| Primary action | `--nous-task-proposal-primary-action-*` | Blue approval/action language. |
| Description rows | `DescriptionList` | Good shared primitive. |

### 7. Agent sidebar

| Concern | Tokens/classes | Identity role |
| --- | --- | --- |
| Drawer fill | `--nous-home-chat-sidebar-bg` | Darker/heavier than canvas. |
| Radial light | `--nous-home-chat-sidebar-radial-bg` | Mirrors canvas lighting from the left-drawer context. |
| Outline mask | `.nous-home-chat-sidebar-outline-border`, `--nous-home-chat-sidebar-outline-*` | Signature subtle rim-light. |
| Unfocused state | `.nous-home-chat-sidebar-unfocused`, `--nous-home-chat-sidebar-unfocused-*` | Establishes focal hierarchy: chat active, sidebar receded. |
| Navigation sizing | `--nous-home-chat-nav-*`, sidebar icon tokens | Product-specific drawer layout; can remain local unless another mockup uses same drawer. |

## What should be shared from 01

| Candidate | Share? | Reason |
| --- | --- | --- |
| Chat message bubble | Yes | Already shared by 02 and backed by neutral `--nous-chat-message-*` tokens. |
| Assistant working panel | Yes | 02 uses the same thinking/process card. |
| Tool call list | Yes | 01 and 02 both use the same inspectable tool trace pattern. |
| Proposal card/action chips | Yes | 01 task setup and 02 approval gate are the same UX primitive. |
| Command composer | Yes | Already separated into `mockups/conversation`; should remain shared. |
| Ambient radial/decorative layers | Yes | Canvas/sidebar/workflow/phone all now use the same visual mechanism. |
| Exact hero layout | No | 01-specific storyboard composition. |
| Exact agent sidebar navigation | Not yet | It is reused visually by 02's phone bezel, but not structurally as a drawer. |
| User avatar image | No | Scenario/persona asset. |
| Streamed response state machine | No, not now | 01-specific animation/storyboard logic. Parts can be extracted later after another consumer appears. |

## Refactor implications

1. Conversation compounds should move out of the 01 product file because 02 already consumes them as shared primitives.
2. Ambient layer rendering should become a shared mockup primitive so 01 remains the source of visual identity without forcing each component to hand-code absolute decorative divs.
3. Keep `HomepageChatSectionMockup` as a product/storyboard component; only move the visual compounds that have proven reuse.
