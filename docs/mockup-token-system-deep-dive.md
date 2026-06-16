# Mockup token system deep dive

Date: 2026-05-24

## Scope

This audit covers the token stack used by the `/component-polish` mockups:

- `src/styles/tokens/primitives.css`
- `src/styles/tokens/app-theme.css`
- `src/styles/tokens/components.css`
- Mockup primitives in `src/components/design-system/mockup/components/primitives.tsx`
- Shared mockup namespaces under `src/components/mockups/**`
- Product mockups `01 / Homepage chat` and `02 / Saved workflow run`

The goal is not only to list tokens, but to identify how visual identity is encoded and where product-specific naming should become shared primitive/component contracts.

## Token layer map

| Layer | File | Responsibility | Current state |
| --- | --- | --- | --- |
| Primitive values | `primitives.css` | Raw color stops, alpha values, radii, spacing scale, font stacks. | Stable foundation. Mostly low-level constants with no product language. |
| Theme semantics | `app-theme.css` | Maps primitives into semantic UI roles (`--nous-bg-canvas`, `--nous-fg-title`, `--nous-stroke-default`, accents, shadows) and overrides them for light/rust themes. | Strong source of global identity. Also contains marketing page tokens (`--nous-page-*`) that should remain page-level, not mockup/component-level. |
| Component anatomy | `components.css` | App-shell/component dimensions, surface roles, mockup-specific anatomy, neutral conversation aliases, device/workflow/companion tokens, compatibility aliases. | The active mockup language lives here. It is partly global and partly still named after `home-chat`. |
| React primitives | `primitives.tsx` | Runtime component contracts for `Surface`, `Chip`, `SegmentedControl`, `DescriptionList`, `PanelHeader`, etc. | Good reusable base layer, but it does not yet own ambient/radial visual layers or conversation compounds. |

## Identity encoded by the token system

The mockup visual language is intentionally quiet and low contrast:

1. **Near-black canvas first**
   - `--nous-bg-canvas` defaults to `#050505` via `--nous-color-black-950`.
   - 01's chat canvas and 02's workflow/phone surfaces now map to `--nous-chat-canvas-bg`.

2. **Transparent white/graphite surfaces**
   - `--nous-stroke-*` and `--nous-bg-card-*` use very low alpha values.
   - Message, panel, and node surfaces rely on subtle edges more than visible fills.

3. **Blue as the primary interactive accent**
   - `--nous-accent-info` and related foreground/background tokens drive send buttons, active workflow pulses, proposal primary actions, and active icons.

4. **Radial light as product polish**
   - 01 introduces radial overlays for the chat canvas and left agent sidebar.
   - 02 now maps workflow and phone surfaces to the same canvas/sidebar radial vocabulary.

5. **Glass/prism affordance for important proposals**
   - Task proposal tokens are mapped from 01 and reused by 02's approval card.
   - The prism implementation still lives in the conversation compound, backed by `hero-sub-header-cards.module.css`.

6. **Micro typography and subdued metadata**
   - `--nous-type-micro-*`, `--nous-type-meta`, and `--nous-font-agent-mono` provide the small labels and machine-like status text.

## Component-token groups in `components.css`

| Group | Prefix | Type | Assessment |
| --- | --- | --- | --- |
| App shell/drawer/workspace | `--nous-shell-*`, `--nous-sidebar-*`, `--nous-drawer-*`, `--nous-workspace-*` | Global app mockup anatomy | Good shared substrate. |
| 01 homepage chat geometry | `--nous-home-chat-frame-*`, `--nous-home-chat-canvas-*`, `--nous-home-chat-sidebar-*`, transcript/composer layout tokens | Product-specific layout | Keep product-specific where it encodes 01 layout/proportions. Do not force into global unless 02 needs identical geometry. |
| Neutral conversation | `--nous-chat-*`, `--nous-composer-*`, `--nous-assistant-response-*`, `--nous-tool-call-*`, `--nous-task-proposal-*` | Shared visual language | Correct direction. These are the tokens other mockups should consume. |
| 02 device/companion | `--nous-device-*`, `--nous-companion-*` | Scenario/device anatomy | Valid local-ish component namespace. Several values intentionally map to 01 visual identity. |
| 02 workflow | `--nous-workflow-*` | Scenario/workflow graph anatomy | Valid scenario namespace. Coordinates remain local in TSX; visual surface/node tokens map toward 01 identity. |
| Compatibility aliases | `--nous-text-*`, `--hairline-*`, `--asset-sidebar-*`, `--context-area-*` | Migration shim | Still present in token CSS for backward compatibility, but should not appear in product/mockup component implementations. |

## Current shared primitive coverage

| Primitive/component | Exists? | Used by 01 | Used by 02 | Notes |
| --- | --- | --- | --- | --- |
| `Surface` | Yes | Indirectly through system components | Workflow frame/nodes/stats | Good for border/radius/shadow, but does not express ambient layers. |
| `Chip` | Yes | Page chips and workflow header/callout through 02 | Workflow header/callout/status | Strong shared primitive. |
| `SegmentedControl` | Yes | Design-system contexts | Companion app surface tabs | Good; 02 adds scenario-specific layout classes. |
| `DescriptionList` | Yes | Proposal details | Proposal details via shared `ProposalCard` | Good. |
| `PanelHeader` | Yes | Design-system panels | Companion and workflow headers | Good. |
| `CommandComposer` | Yes, in `mockups/conversation` | Homepage composer | Available for future 02 composer flows | Good shared primitive. |
| Conversation compounds (`MessageBubble`, `WorkingPanel`, `ToolCallList`, `ProposalCard`) | Yes, but physically in `product-mockups/homepage-chat-visual-primitives.tsx` | 01 source | 02 consumer via `mockups/conversation` barrel | Needs refactor: shared components should live under `mockups/conversation`, not under the 01 product namespace. |
| Ambient/radial layer primitive | No | Repeated inline canvas/sidebar layers | Repeated inline workflow/phone layers | Needs refactor. This is now a shared visual identity mechanism. |

## Findings

### Good system behavior

- 02 is now mostly consuming shared conversation tokens instead of inventing a separate visual grammar.
- The app theme can shift dark/light/rust because most mockup surfaces map back to global theme semantics.
- Reusable primitives exist for the common structural patterns: surfaces, chips, tabs, headers, description lists, scroll containers.
- Product-level geometry is still explicit where appropriate, especially 01's precise hero composition and 02's workflow graph coordinates.

### Friction points

1. **Shared conversation compounds live in a product directory.**
   - `src/components/mockups/conversation/index.ts` re-exports from `src/components/product-mockups/homepage-chat-visual-primitives.tsx`.
   - This makes 02 depend on 01's file location even though the components and tokens are now neutral.

2. **Ambient layers are repeated as inline divs.**
   - 01 canvas/sidebar, 02 workflow frame/panel, and 02 phone frame/screen all render decorative absolute radial layers by hand.
   - This is visual identity infrastructure, not product-specific content.

3. **Some neutral tokens still map through `home-chat` source tokens.**
   - This is acceptable as a migration strategy, but docs and import paths should make clear that consumers use neutral tokens.
   - Future cleanup can rename source tokens after all page-specific tests stop asserting `--nous-home-chat-*` for shared anatomy.

4. **Compatibility aliases remain in CSS.**
   - They are not used by the refactored product/mockup components, but they remain available for older design-system panels.
   - Keep temporarily, but do not add new usage.

## Refactor recommendations from this step

1. Move neutral conversation compounds to `src/components/mockups/conversation/conversation-primitives.tsx`.
2. Keep `src/components/product-mockups/homepage-chat-visual-primitives.tsx` as a compatibility re-export only.
3. Add a shared `AmbientLayer` / `AmbientSurface` primitive under `src/components/mockups/surface`.
4. Use the ambient primitive in 01 canvas/sidebar and 02 workflow/phone surfaces.
5. Keep 01 layout tokens and 02 workflow coordinates local; only share the visual identity mechanisms.
