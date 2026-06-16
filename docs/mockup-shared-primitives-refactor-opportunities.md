# Shared primitive refactor opportunities

Date: 2026-05-24

## Decision framework

A repeated pattern should become a shared primitive when it meets most of these criteria:

1. It appears in both 01 and 02, or 02 already consumes it as if it were shared.
2. It expresses visual identity rather than one-off scenario content.
3. It has stable accessibility/semantic needs.
4. It can be parameterized without hiding important product-specific geometry.
5. Moving it reduces product-to-product coupling.

## Candidate matrix

| Candidate | Evidence | Share now? | Rationale | Target location |
| --- | --- | --- | --- | --- |
| Conversation compounds: `MessageBubble`, `WorkingPanel`, `ToolCallList`, `ProposalCard`, `ProposalActionChip` | 01 defines them; 02 imports and uses them via `mockups/conversation` barrel. | Yes | They are already neutral in API/token usage; only the file location is product-specific. | `src/components/mockups/conversation/conversation-primitives.tsx` |
| `CommandComposer` | 01 uses it; drawer/other surfaces can reuse it. | Already shared | Current location is correct. | `src/components/mockups/conversation/command-composer.tsx` |
| Ambient layer (`absolute inset-0`, `aria-hidden`, radial/highlight backgrounds) | Repeated in 01 chat canvas/sidebar and 02 workflow/phone surfaces. | Yes | It is the visual identity mechanism behind dark glass/radial surfaces. | `src/components/mockups/surface/ambient-surface.tsx` |
| Ambient surface wrapper (`relative overflow-hidden`, decorative layers, z-index content) | 01 `ChatCanvas` and `AgentSidebar` share this exact shell. | Yes | Reduces repeated layering while preserving custom class/tokens per consumer. | `src/components/mockups/surface/ambient-surface.tsx` |
| Workflow graph node | 02-only. | No | It should remain in `mockups/workflow`; no second graph consumer yet. | Keep existing. |
| Workflow connector/callout | 02-only. | No | Topology and callout placement are scenario-specific. | Keep existing. |
| Phone frame/screen | 02-only but already separated. | No additional extraction | Device components are already in `mockups/device`; hardware details should not be generalized into `Surface`. | Keep existing. |
| Companion app tabs/header | 02-only. | No | Uses `SegmentedControl`/`PanelHeader`; deeper extraction would be speculative. | Keep inside product/component. |
| 01 sidebar navigation rows | 01-only. | Not now | 02 borrows the sidebar visual tokens, not the navigation anatomy. | Keep inside 01 until reused. |
| Results table | 01-only. | Not now | Could become `DataDisclosureTable`, but 02 does not need it today. | Defer. |
| Typing indicator | 01-only. | Not now | Visual language candidate, but no 02 consumer. | Defer. |

## Refactor plan

### Step 1: Move conversation compounds

- Move the implementation from `src/components/product-mockups/homepage-chat-visual-primitives.tsx` to `src/components/mockups/conversation/conversation-primitives.tsx`.
- Update `src/components/mockups/conversation/index.ts` to export from the shared file.
- Leave `homepage-chat-visual-primitives.tsx` as a compatibility re-export so any older imports continue to work.

Expected benefit:

- 02 no longer physically depends on a 01 product file for shared visual primitives.
- Future mockups have an obvious import path for conversation components.

### Step 2: Add ambient surface primitives

Add:

- `AmbientLayer`: a decorative, aria-hidden, pointer-events-none absolute layer with data-attribute support.
- `AmbientSurface`: a semantic wrapper that renders decorative layers plus a `relative z-10` content container.

Expected benefit:

- 01 and 02 use the same mechanism for radial/highlight/outline layers.
- Decorative layers become accessible-by-default (`aria-hidden`) and non-interactive by default.
- Visual identity is easier to audit because radial layers have one primitive contract.

### Step 3: Apply ambient primitives

Apply to:

- 01 `ChatCanvas`
- 01 `AgentSidebar`
- 02 `WorkflowAmbientBackdrop`
- 02 `WorkflowGraphGrid`
- 02 `WorkflowPanelRadial`
- 02 `PhoneFrame`
- 02 `PhoneScreen`

Expected benefit:

- Less repeated markup.
- Clearer distinction between reusable visual surface mechanics and product-specific geometry.

## Guardrails

- Do not move workflow coordinates into tokens or shared primitives.
- Do not convert Telegram blue into a global token in this pass.
- Preserve existing data attributes and tests.
- Preserve compatibility exports while product pages/tests still import old paths.
