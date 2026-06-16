# Mockup Design System Token Audit

Date: 2026-05-24

Reviewed routes:

- `http://localhost:3000/design-system`
- `http://localhost:3000/component-polish`

Reviewed source:

- `src/components/design-system/nous-design-system.tsx`
- `src/components/design-system/design-system-theme-shell.tsx`
- `src/components/design-system/mockup/components/*`
- `src/components/product-mockups/*`
- `src/styles/tokens/primitives.css`
- `src/styles/tokens/app-theme.css`
- `src/styles/tokens/components.css`
- `src/components/home/hero-sub-header-cards.module.css` where reused by the task proposal card

## Classification rules

| Classification | Meaning | Desired home |
| --- | --- | --- |
| Global token | A semantic or primitive value shared across mockups and themes. It should be safe for future product UI to consume directly. | `src/styles/tokens/primitives.css`, `app-theme.css`, or shared component token layer |
| Global component contract | A reusable component-specific token for stable UI anatomy such as shell, drawer, composer, card, chat message, task proposal, or tool-call list. | `src/styles/tokens/components.css`, named after the reusable component rather than a page mockup |
| Local / inline-with-extra-steps | A one-off mockup measurement, absolute position, screenshot mask, brand/persona color, device-frame detail, or route/demo-only value currently expressed as a CSS variable. It adds indirection without creating a reusable system contract. | Component/module CSS, local constants, or inline Tailwind arbitrary values |

## Executive assessment

- The common global base is strong for `fg`, `bg`, `stroke`, `accent`, `radius`, `shadow`, `shell`, `card`, `control`, `nav`, `segmented`, `drawer`, and dense type roles.
- The largest token debt is the `--nous-home-chat-*` namespace. It mixes a reusable conversation system with one-off homepage composition measurements. Split it into global chat/composer/task tokens plus local homepage layout values.
- The saved workflow wireframe leaks marketing-page tokens (`--nous-page-*`) into product mockups. Those should be replaced by app semantic tokens or a future `--nous-workflow-*` component contract.
- The task proposal card is reused in the homepage chat and companion phone, but it currently depends on marketing hero glass classes and `--nous-home-chat-task-proposal-*` tokens. It should become a global product component contract.
- Backward-compatible aliases (`--hairline-*`, `--asset-sidebar-*`, `--context-area-*`, `--nous-text-*`) should not be expanded. They should be migration aliases only.

## Mockup component coverage

| Mockup component | Current token posture | Global assessment | Action |
| --- | --- | --- | --- |
| `DesignSystemThemeShell` | Uses global foreground/background/stroke/radius/shadow plus `--nous-design-system-page-bg`. | Mostly global. Page background is documentation-shell specific. | Keep shell globals; keep doc-page background scoped to design-system docs. |
| `WorkspaceMockup` | Uses `--nous-shell-*`, app chrome background, texture, demo-frame dimensions. | Shell frame is global; demo frame and overlay border are review-board local. | Keep shell tokens global; move or clearly mark `--nous-demo-frame-*` and outer border overlay as demo-only. |
| `AppTopBar` | Uses `--nous-topbar-*`, `--nous-kbd-*`, semantic fg/bg/stroke/accent. | Good global component contract. | Keep global; consider adding active/inactive top-tab aliases only if the component leaves the mockup. |
| `IconRail` | Uses shell/userbar/control/icon/accent tokens and inline project colors via style. | Rail sizing and accents are global; individual project identity colors are content-specific. | Keep rail/control tokens; do not create global tokens for each project instance. |
| `AssetSidebar` | Uses `--nous-sidebar-*`, `--nous-nav-*`, `--nous-sidebar-title-fg`, avatar gradient literals. | Sidebar/nav tokens are global; avatar colors are local persona content. | Keep sidebar/nav global; keep avatar gradient local unless avatar component is formalized. |
| `ContextPanel` | Uses workspace header/canvas/status/card/control tokens. | Workspace layout is a component contract for the app shell. | Keep global while workspace shell is canonical. |
| `WorkspaceUpdates` | Uses updates panel spacing, app panel bg, bottom fade. | Updates anatomy is reusable; fade destination is effect/theme-specific. | Keep `--nous-updates-*`; keep bottom fade scoped/derived from surface tokens. |
| `AgentDrawer` | Uses `--nous-drawer-*`, message, command input, control, fg/stroke tokens. | Good global assistant drawer contract. | Keep global; use as source for the chat/composer split. |
| Design-system `Surface`, `Button`, `Chip`, `GlyphButton`, `SegmentedTabs` | Uses card/control/nav/segmented/accent tokens. | Good reusable primitives. | Keep global and avoid old aliases. |
| `HomepageChatSectionMockup` | Uses many `--nous-home-chat-*` values for both reusable chat UI and fixed homepage composition. | Mixed: chat UI should globalize; frame geometry and masks should remain local. | Split namespace into `--nous-chat-*`, `--nous-composer-*`, `--nous-task-proposal-*`, plus local homepage layout. |
| `HomepageChatVisualPrimitives` | Reusable assistant message, working panel, tool-call list, and task proposal card. Uses home-chat tokens plus marketing glass module. | Strong candidate for global conversation primitives. | Extract global product primitives and rename tokens away from `home-chat`. |
| `SavedWorkflowRunWireframeMockup` | Uses app tokens plus `--nous-page-*` marketing tokens and absolute workflow-node positions. | Wireframe content is local; workflow graph anatomy may later be global. | Replace page-token dependencies; leave node positions local until workflow editor stabilizes. |
| `SavedWorkflowCompanionPhone` | Uses chat primitives and global app tokens, plus device frame, Telegram blue, iPhone status details. | Chat reuse is global; device/integration details are local. | Keep phone frame local unless phone mockups repeat; promote Telegram only if integrations become a product component. |
| `CompanionIphoneStatusBar` | Pure device dimensions and live time state. | Local device mockup detail. | Keep local; do not tokenize globally. |
| `hero-sub-header-cards.module.css` glass panel reuse | Marketing CTA/glass tokens are borrowed for product task proposal. | Reuse reveals a real product glass panel pattern, but current names are marketing-specific. | Extract shared glass/task proposal tokens or stop reusing hero CTA classes from product mockups. |

## Token and pattern audit

| Token / pattern | Seen in | Assessment | Convert to global? | Recommendation |
| --- | --- | --- | --- | --- |
| `--nous-color-*` primitives | `primitives.css` | Global token | Already global | Keep as primitive layer only; app code should prefer semantic aliases. |
| `--nous-alpha-*` primitives | `primitives.css` | Global token | Already global | Keep; use for semantic surfaces/strokes instead of raw rgba when repeated. |
| `--nous-fg-*` | All mockups | Global token | Already global | Keep as canonical foreground hierarchy for text/icons/glyphs. |
| `--nous-bg-*` | All app-shell and chat mockups | Global token | Already global | Keep as canonical app surface hierarchy. |
| `--nous-stroke-*` | All mockups | Global token | Already global | Keep as canonical border/divider/ring hierarchy. |
| `--nous-accent-info-*`, `success`, `warning`, `workspace` | Shell, chips, task proposal, workflow graph | Global token | Already global | Keep semantic accent groups. Use aliases for component states when needed. |
| `--nous-radius-*` | All mockups | Global token | Already global | Keep; map `rounded-[14px]` and other near-scale values to component aliases only when intentional. |
| `--nous-space-*` | Token layer, underused by components | Global token | Already global but underused | Use for generic spacing only. Do not force shell geometry into generic spacing. |
| `--nous-font-*` | Global CSS, mono labels, agent sidebar title | Global token | Already global | Keep; do not create page-specific font-family aliases unless a component needs a stable contract. |
| `--nous-type-*` | Design system, cards, drawer, tables | Global token | Needs expansion | Add shared roles for repeated `0.5625rem`, `0.59375rem`, `0.625rem`, `0.6875rem`, `0.75rem`, and `0.9375rem` before more chat/task components ship. |
| `--nous-leading-drawer` | Drawer and homepage response | Global component contract | Rename/split | Convert to a more general `--nous-chat-body-leading` or `--nous-assistant-response-leading` when used outside drawers. |
| `--nous-shadow-card`, `--nous-shadow-overlay`, `--nous-shadow-drawer` | Cards, overlay drawer, review panels | Global token | Already global | Keep. Add device/phone shadow only if phone shell becomes reusable. |
| `--nous-texture-*`, `--nous-app-chrome-bg`, `--nous-updates-panel-bg` | Workspace shell and design system shell | Global app effect | Already global-ish | Keep for app shell themes; do not use for single-card local effects. |
| `--nous-design-system-page-bg`, `--nous-reference-panel-bg` | Design-system/component-polish boards | Docs/reference token | No product global | Keep scoped to design-system/reference pages, not product UI. |
| `--nous-page-*` | Marketing pages and saved workflow wireframe | Marketing-page token | No, for product mockups | Replace in product mockups with `--nous-bg-*`, `--nous-card-*`, or future workflow tokens. |
| `--nous-shell-*` | Workspace frame | Global component contract | Already global | Keep for topbar/rail/sidebar/updates geometry. |
| `--nous-demo-frame-*` | Workspace specimen frame | Local / inline-with-extra-steps | No | Mark demo-only or move to the specimen wrapper; not part of product UI. |
| `--nous-topbar-*` | AppTopBar | Global component contract | Already global | Keep as stable app-shell topbar contract. |
| `--nous-kbd-*` | Topbar search shortcut | Global component contract | Already global | Keep if keyboard hints recur; otherwise small but harmless. |
| `--nous-sidebar-*` | Asset sidebar and homepage sidebar padding reuse | Global component contract | Already global | Keep for app/sidebar anatomy. Avoid `home-chat-sidebar-*` duplicates for generic nav spacing. |
| `--nous-workspace-*` | Workspace canvas/header | Global component contract | Already global | Keep while workspace shell is canonical. |
| `--nous-updates-*` | Updates panel | Global component contract | Already global | Keep for updates rail anatomy. |
| `--nous-updates-bottom-fade` | Updates panel fade | Theme/effect token | Maybe, scoped | Derive from panel background or keep scoped; do not treat as generic gradient. |
| `--nous-card-*` | Dashboard cards, updates mini cards, review panels | Global component contract | Already global | Keep as app card contract. |
| `--nous-control-*` | Buttons, icon buttons, tabs, composer controls | Global component contract | Already global | Keep; prefer over one-off control padding and icon sizes. |
| `--nous-icon-*` and icon stroke tokens | Icons across shell/chat | Global component contract | Already global | Keep. Use directly instead of `--nous-home-chat-icon-stroke-*` aliases where identical. |
| `--nous-nav-*` | Sidebar and homepage chat sidebar rows | Global component contract | Already global | Keep and use for all sidebar-like rows. |
| `--nous-segmented-*` | Topbar/workspace/drawer tabs | Global component contract | Already global | Keep. Consider active-state aliases only if theming diverges. |
| `--nous-panel-header-fg`, `--nous-section-title-fg`, `--nous-meta-fg`, `--nous-timestamp-fg-minimal` | Workspace and cards | Global component aliases | Already global | Keep because they improve component readability and theme flexibility. |
| `--nous-drawer-*` | Agent drawer and chat response reuse | Global component contract | Already global, but overextended | Keep for drawer; split reusable conversation roles out of drawer names. |
| `--nous-message-bg`, `--nous-message-fg` | Drawer message and homepage user message | Global component contract | Needs expansion | Convert to full `--nous-chat-message-*` set for user/assistant/system messages. |
| `--nous-command-input-*` | Drawer and homepage composer | Global component contract | Needs rename/expansion | Promote to `--nous-composer-*` for chat inputs, then alias command input to composer where appropriate. |
| `--nous-home-chat-frame-width`, `--nous-home-chat-frame-height` | Homepage chat visual frame | Local / inline-with-extra-steps | No | Keep route/mockup-local; global frame dimensions would overfit one composition. |
| `--nous-home-chat-component-mask` | Homepage chat fade mask | Local / inline-with-extra-steps | No | Keep local CSS class/module token. It is screenshot-composition polish, not system language. |
| `--nous-home-chat-canvas-left`, top/bottom, content padding, greeting offset | Homepage chat layout | Local / inline-with-extra-steps | No | Keep local. These position one hero composition. |
| `--nous-home-chat-canvas-bg`, radius, radial/highlight backgrounds | Homepage chat and companion phone | Mixed component contract | Partially | Promote stable chat surface values to `--nous-chat-canvas-*`; keep radial/highlight art direction local unless reused. |
| `--nous-home-chat-greeting-*` | Homepage hero greeting | Local / inline-with-extra-steps | No | Keep local hero typography; not an app-wide type role. |
| `--nous-home-chat-composer-*` | Homepage composer width/margins | Mixed | Partially | Widths/margins are local; input heights, padding, font sizes should merge into `--nous-composer-*`. |
| `--nous-home-chat-command-*` | Homepage command composer | Global component candidate | Yes | Convert to `--nous-composer-*` and share with drawer/companion surfaces. |
| `--nous-home-chat-send-button-*` | Composer send button | Global component candidate | Yes | Convert to `--nous-composer-send-*`; set foreground to `var(--nous-fg-white)` rather than raw `#ffffff`. |
| `--nous-home-chat-transcript-*` | Homepage transcript | Mixed | Partially | Transcript gap and stack behavior can become `--nous-chat-transcript-*`; width/top/bottom are local composition. |
| `--nous-home-chat-message-*` | Homepage user/assistant messages and visual primitives | Global component candidate | Yes | Convert to `--nous-chat-message-*` with user, assistant, padding, radius, type, and max-width roles. |
| `--nous-home-chat-response-*` | Assistant reasoning/final answer blocks | Global component candidate | Yes | Convert to `--nous-assistant-response-*` because companion phone reuses the pattern. |
| `--nous-home-chat-tool-*` and tool-call wave | Homepage and companion tool-call lists | Global component candidate | Yes | Convert to `--nous-tool-call-*`; keep shimmer animation values local until motion tokens exist. |
| `--nous-home-chat-task-proposal-*` | Homepage final proposal and companion approval card | Global component contract | Yes, high priority | Convert to `--nous-task-proposal-*` and extract from marketing hero glass module. |
| `--nous-home-chat-typing-*` | Homepage typing indicator | Global component candidate | Yes | Convert to `--nous-typing-indicator-*` if typing appears outside the homepage. |
| `--nous-home-chat-sidebar-width`, frame radius, bg, shadow, masks, overlays | Homepage Agent sidebar | Mixed | Partially | Width/masks/shadow are local to offset hero; stable sidebar/nav surface roles can become `--nous-chat-sidebar-*` only if reused. |
| `--nous-home-chat-sidebar-padding-*`, nav font, thread gaps, footer/icon sizes | Homepage Agent sidebar | Mixed component contract | Partially | Prefer existing `--nous-sidebar-*`, `--nous-nav-*`, and `--nous-icon-*`; only create chat-sidebar tokens for behavior unique to chat history. |
| `--nous-home-chat-user-avatar-*` | Homepage avatar CSS, now image-based in markup | Local / content-specific | No | Keep local/persona-specific. Do not globalize Andrew/avatar art direction. |
| `--nous-home-chat-icon-stroke-*` | Homepage icons | Alias-only indirection | No | Use global `--nous-icon-stroke-regular` etc. directly unless per-region stroke weight diverges. |
| `--hairline-*` | Compatibility aliases | Legacy alias | No | Do not use in new components; migrate to `--nous-stroke-*` and remove after parity. |
| `--asset-sidebar-*` | Compatibility aliases | Legacy/component-local alias | No | Replace with `--nous-sidebar-*`, `--nous-nav-*`, or semantic foreground tokens. |
| `--context-area-tab-switcher-bg` | Compatibility alias | Legacy/component-local alias | No | Replace with `--nous-segmented-*` / `--nous-bg-control`. |
| `--nous-text-*` aliases | Globals and selection styles | Legacy alias | No | Use `--nous-fg-*`. Keep only temporary compatibility mappings. |
| Raw avatar gradient `#f4c7a0` / `#116c7a` | Asset sidebar footer | Local/persona content | No | Keep inline/local unless a formal avatar token API appears. |
| Telegram brand blue `#229ED9` | Companion phone Telegram mode | Integration brand local | Maybe later | Keep local now. Promote to `--nous-integration-telegram-*` only if integration surfaces repeat. |
| Phone frame values (`rounded-[2.55rem]`, `min-h-[34rem]`, status bar icon sizes, device side buttons) | Companion phone | Local / inline-with-extra-steps | No | Keep in the phone mockup component. Device hardware details are not app system tokens. |
| Workflow graph absolute positions/connectors | Saved workflow wireframe | Local wireframe layout | No | Keep local arrays/classes until workflow editor geometry is productized. |
| Workflow node/card styling | Saved workflow wireframe | Future component candidate | Maybe later | If workflow editor repeats, create `--nous-workflow-node-*`, `--nous-workflow-connector-*`, and `--nous-workflow-status-*`. |
| Radial mockup art (`bg-[radial-gradient(...)]`, masks, glows) | Saved workflow and homepage chat | Local art direction | No | Keep local unless a repeated product backdrop component emerges. |
| Motion classes/keyframes (`nous-home-chat-*`) | Homepage storyboard | Mixed | Maybe | Extract `--nous-motion-*` duration/easing tokens only after a second storyboard/animated agent flow uses the same timing. |

## Recommended conversion backlog

| Priority | Convert | Why | Suggested target |
| --- | --- | --- | --- |
| P0 | Chat message system | Homepage chat and companion phone already share message bubbles and assistant panels. | `--nous-chat-message-bg-user`, `--nous-chat-message-bg-assistant`, `--nous-chat-message-fg`, `--nous-chat-message-radius`, `--nous-chat-message-padding-*`, `--nous-chat-message-type-size`, `--nous-chat-transcript-gap` |
| P0 | Composer / command input | Drawer command input and homepage composer are the same control family with different layout constraints. | `--nous-composer-bg`, `--nous-composer-border`, `--nous-composer-placeholder-fg`, `--nous-composer-min-height`, `--nous-composer-compact-height`, `--nous-composer-padding-*`, `--nous-composer-toolbar-height`, `--nous-composer-send-*` |
| P0 | Assistant response / reasoning blocks | Working/thinking panels, result tables, final answer spacing, and collapsible sections are reusable agent UI. | `--nous-assistant-response-gap`, `--nous-assistant-response-section-gap`, `--nous-assistant-response-padding-top`, `--nous-assistant-response-meta-fg`, `--nous-assistant-response-result-fg` |
| P0 | Tool-call list | Homepage and companion phone reuse the same tool-call details. | `--nous-tool-call-bg`, `--nous-tool-call-radius`, `--nous-tool-call-padding-*`, `--nous-tool-call-label-width`, `--nous-tool-call-running-wave-bg` |
| P0 | Task proposal / approval card | The card appears in both subscription-review and meal-prep examples and is a key product primitive. | `--nous-task-proposal-*` plus a shared component independent of `hero-sub-header-cards.module.css` |
| P0 | Remove product use of marketing `--nous-page-*` tokens | Product mockups should not depend on marketing-page surfaces. | Replace with `--nous-bg-*`, `--nous-card-*`, `--nous-control-*`, or future `--nous-workflow-*`. |
| P1 | Type scale completion | Several repeated micro sizes are currently arbitrary values. | Add named type roles for badge micro, tiny status, action chip, body compact, proposal title. |
| P1 | Workflow graph contract | Needed only if workflow editor becomes a reusable mockup/component beyond this wireframe. | `--nous-workflow-node-*`, `--nous-workflow-connector-*`, `--nous-workflow-status-*`. |
| P1 | Motion tokens | Storyboard timing and accordion easing recur internally but not yet across components. | `--nous-motion-duration-fast/base/slow`, `--nous-motion-ease-standard/emphasized`. |
| P2 | Device phone shell | Useful only if phone/device mockups repeat. | `--nous-device-phone-*`; otherwise keep local. |
| P2 | Integration brand colors | Useful only if integration-specific surfaces become product UI. | `--nous-integration-telegram-*`, etc. |

## Keep local / do not globalize

- Homepage chat frame width/height, canvas left offset, greeting offset, masks, and screenshot fade overlays.
- Workflow node absolute positions and connector coordinates.
- Device hardware dimensions, status bar icon paths/sizes, and phone shell shadows.
- Persona/avatar art, Andrew-specific image sizing, and one-off project identity colors.
- Single-route radial art direction and background glows.
- Compatibility aliases except as temporary migration support.

## Proposed next token split

```css
/* Global conversation primitives */
--nous-chat-canvas-bg: var(--nous-bg-canvas);
--nous-chat-canvas-radius: var(--nous-radius-lg);
--nous-chat-transcript-gap: 10px;
--nous-chat-message-radius: var(--nous-radius-xl);
--nous-chat-message-padding-x: 14px;
--nous-chat-message-padding-y: 10px;
--nous-chat-message-bg-user: var(--nous-message-bg);
--nous-chat-message-bg-assistant: rgba(255, 255, 255, 0.045);
--nous-chat-message-fg: var(--nous-message-fg);

/* Global composer component */
--nous-composer-bg: var(--nous-command-input-bg);
--nous-composer-placeholder-fg: var(--nous-command-input-placeholder-fg);
--nous-composer-radius: var(--nous-radius-control-lg);
--nous-composer-toolbar-height: var(--nous-shell-topbar-height);
--nous-composer-send-ready-bg: var(--nous-accent-info);
--nous-composer-send-ready-fg: var(--nous-fg-white);

/* Global agent artifacts */
--nous-assistant-response-section-gap: 12px;
--nous-tool-call-list-margin-top: 8px;
--nous-task-proposal-radius: var(--nous-radius-lg);
```

The exact values should be pulled from the existing `--nous-home-chat-*` tokens during implementation; the important change is the namespace boundary: reusable product behavior gets a global component name, and route composition stays local.
