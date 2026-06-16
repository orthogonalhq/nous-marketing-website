# Mockup Component Reuse Audit

Date: 2026-05-24

Purpose: identify repeated elements and component patterns across the mockup routes so the design system can move from one-off mockup markup to reusable primitives, compounds, and composed components.

Reviewed routes:

- `http://localhost:3000/component-polish`
- `http://localhost:3000/design-system`

Reviewed source areas:

- `src/components/design-system/nous-design-system.tsx`
- `src/components/component-polish/component-polish-page.tsx`
- `src/components/design-system/design-system-theme-shell.tsx`
- `src/components/design-system/mockup/components/*`
- `src/components/product-mockups/*`

## Scan passes

| Pass | Scope | What it checked | Result |
| --- | --- | --- | --- |
| 1 | Design-system app mockup source | Existing primitives, shell regions, drawer, cards, controls, nav, panel anatomy. | Found reusable primitives already present, but several private local components duplicate them. |
| 2 | Product mockup source | Homepage chat, chat visual primitives, companion phone, saved workflow wireframe. | Found strong repeated chat/task/tool-call primitives, currently named too narrowly as `HomepageChat*`. |
| 3 | Cross-boundary comparison | Duplicate Tailwind structure and token usage between app shell and product mockups. | Found cross-cutting candidates: icon buttons, composer, message bubble, tabs, chips, surface/card, panel shell. |
| 4 | Direct pattern grep | Function inventory, `<details>/<summary>/<dl>`, `grid size-*`, `rounded-full`, scroll regions, existing primitive usage. | Confirmed repeated disclosure, description-list, badge, icon-frame, and scrollbar anatomy. |
| 5 | Review-board page scan | Design-system and component-polish documentation/study page wrappers. | Found repeated section headers, reference panels, token pills, and table-like reference rows. |

## Component extraction table

| Level | Repeated element / pattern | Observed in | Current coverage | Reusable component recommendation | Priority | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Primitive | Glyph/icon renderer | `Glyph`, `DisclosureTriangle`, icons in chrome, drawer, cards, chat, workflow. | `Glyph` and `DisclosureTriangle` already exist. | Keep `Glyph`; add size/tone/stroke presets only if repeated overrides keep growing. | P2 | Existing primitive is good. Avoid over-abstracting Lucide imports beyond the current map. |
| Primitive | Icon button / icon frame | `GlyphButton`, `ProjectRailButton`, `CreateProjectButton`, `IconFrame`, composer send button, workflow icon squares, app avatar icon circle. | `GlyphButton` partially covers it. | Expand to `MockupIconButton` / enhanced `GlyphButton` with `size`, `shape`, `tone`, `surface`, `active`, and `as="span"`. | P0 | This is one of the clearest primitive duplications. |
| Primitive | Surface/card shell | `Surface`, `WorkCard`, `InsightCard`, `UpdateMiniCard`, workflow nodes, stat cards, proposal card wrappers, chat canvas, phone app body. | `Surface` exists but only covers one card tone. | Expand `Surface` with `tone`, `stroke`, `radius`, `shadow`, and optional `as`. | P0 | Prefer extending before creating more one-off card wrappers. |
| Primitive | Chip / pill / badge | `Chip`, `TopicPill`, status chips, workflow status pill, companion `Live` badge, trigger pill, proposal action chips, token pills on polish page. | `Chip` partially covers status only. | Expand to `MockupChip` with `size`, `tone`, `shape`, `interactive`, `priority`. | P0 | Unifies many `rounded-full` small-label patterns. |
| Primitive | Small action button | `Button`, card review actions, proposal action chips, compact controls. | `Button` exists for card actions. | Keep `Button`; align with expanded `Chip` for non-button action chips. | P1 | Useful, but less duplicated than icon/chip/surface. |
| Primitive | Disclosure affordance | `DisclosureTriangle`, tool-call details, task proposal details, working accordion, sidebar section labels. | Triangle exists; disclosure container is local. | Add `MockupDisclosure` for summary/content anatomy. | P1 | Should preserve native `<details>` where possible. |
| Primitive | Streaming text / caret | `SequentialStreamedText`, composer caret, sidebar thread caret, drawer input caret. | Local only. | Add `MockupCaret`; keep `StreamingText` local until more streaming views appear. | P2 | Mostly animation/storyboard support. |
| Primitive | Scrollable region | `nous-mobile-scrollbar` plus `min-h-0 flex-1 overflow-y-auto` in sidebar, context panel, updates rail, drawer body, transcript, composer textarea. | CSS utility exists, structure repeated inline. | Add `ScrollableRegion` with padding/gutter options. | P1 | Reduces repeated flex/overflow boilerplate. |
| Primitive | Definition / key-value list | Agent drawer change list, tool-call `<dl>`, proposal details, workflow metric cards. | No dedicated primitive. | Add `MockupDescriptionList` and optionally `MetricCard`. | P1 | Common structure: mono label + compact value. |
| Compound | Segmented control / tabs | `SegmentedTabs`, topbar `TopTab`, context tabs, drawer tabs, companion phone tablist. | `SegmentedTabs` exists but tuple-only and not interactive/accessible enough for all uses. | Replace/expand with `MockupSegmentedControl`. | P0 | Needs support for buttons, spans, icon labels, tablist role, and optional metadata. |
| Compound | Navigation row | `NavItem`, homepage `SidebarRow`, asset sidebar primary/section nav rows. | `NavItem` covers basic app-sidebar row. | Expand to `MockupNavItem`; add `NavGroup`. | P1 | Use existing nav tokens; avoid duplicate home-chat nav row styling. |
| Compound | Sidebar/nav group | Asset sidebar sections, homepage agent sidebar groups. | Local maps and section labels. | Add `MockupNavGroup` with optional disclosure icon. | P1 | Repeated label + children + spacing. |
| Compound | Panel header / title with actions | Asset sidebar header, context header, updates header, agent drawer header, sidebar header, study section headers. | Local structure in each file. | Add `PanelHeader` / `SectionHeader` with slots for leading icon, title, tabs, actions, description. | P0 | High leverage across shell and docs pages. |
| Compound | Header actions cluster | Asset sidebar actions, updates actions, drawer actions, homepage sidebar header actions. | Uses `GlyphButton`, but wrapper/gap repeated. | Add `PanelActions` or let `PanelHeader` own action layout. | P1 | Likely covered by `PanelHeader`. |
| Compound | User/avatar summary row | Asset sidebar footer, homepage sidebar footer, companion app avatar/header. | Local only. | Add `UserSummary` / `AvatarLabelRow`. | P2 | Reusable if more account/project footers appear. Keep persona colors local. |
| Compound | Count/status badge | WorkCard count bubble, context running chip/counters, workflow active dot label, companion live badge. | Partially covered by `Chip`. | Use expanded `Chip`; add `CountBadge` only for absolute card counters. | P1 | WorkCard counter is a distinct placement pattern. |
| Compound | Command composer | `CommandInput`, `DrawerCommandInput`, homepage `CommandComposer`. | `CommandInput` is too narrow; drawer/homepage duplicate the full composer anatomy. | Add `MockupCommandComposer`. | P0 | Should support compact/hero/drawer modes, caret, toolbar slots, send-ready state. |
| Compound | Message bubble | Drawer user message, homepage user bubble, `HomepageChatAssistantMessage`, companion message. | Assistant bubble extracted only for homepage/product. | Add `MockupMessageBubble` with `role="assistant|user|system"`. | P0 | Crosses design-system and product mockups. |
| Compound | Working/thinking panel | `HomepageChatWorkingPanel`, homepage working accordion, companion thinking card, agent drawer status/result section. | Product primitive exists, but not generalized. | Add `MockupWorkingPanel` / `ThinkingAccordion`. | P0 | Should handle expanded/collapsed and complete/running states. |
| Compound | Tool-call disclosure list | `HomepageChatToolCallList` used by homepage and companion phone; related drawer `<dl>` list. | Extracted but homepage-named. | Rename/promote to `MockupToolCallList`. | P0 | Already proven reusable. Move out of homepage naming. |
| Compound | Proposal/action card | `HomepageChatTaskProposalCard`, homepage final proposal wrapper, companion approval card. | Extracted but homepage-named and relies on marketing glass CSS. | Rename/promote to `MockupProposalCard` or `HumanApprovalCard`; extract `ActionChip`. | P0 | Highest-value composed product primitive after composer/message/tool calls. |
| Compound | Results/data disclosure | `SubscriptionResultsTable`, tool-call disclosure, task proposal details. | Local table only. | Add `DataDisclosure` only if more evidence/result tables are planned. | P2 | Keep local for now unless a second table appears. |
| Compound | Reference table/list row | Design-system component table, token table, polish note cards. | Local in docs pages. | Add `ReferenceTable` / `ReferencePanel`. | P1 | Review pages already repeat rounded panel + grid rows. |
| Compound | Token pill list | Component polish token refs, study chips, status/category chips. | Local. | Use expanded `Chip` with `tone="token"` or add `TokenPill`. | P1 | Useful for docs/polish boards. |
| Compound | Theme switcher | `DesignSystemThemeShell` select. | Local client component. | Keep local unless other themeable mockup docs need it. | P2 | It is a doc control, not product UI. |
| Composed | Panel shell / shell region | Asset sidebar, context panel, updates rail, agent drawer, homepage sidebar, chat canvas, workflow article sections. | No shared panel shell. | Add `MockupPanelShell` with `header`, `body`, `footer`, `scroll`, `side`, `surface` props. | P1 | Do after primitives stabilize to avoid a large rigid abstraction. |
| Composed | App shell specimen | `WorkspaceMockup`, `AppTopBar`, `IconRail`, `AssetSidebar`, `ContextPanel`, `WorkspaceUpdates`, `AgentDrawer`. | Already composed as explicit components. | Keep as canonical specimen; optionally formalize `AppShellFrame`. | P2 | Not urgent unless the shell appears outside the design-system page. |
| Composed | Agent drawer shell | `AgentDrawer`, collapsed launcher, drawer header, topics rail, body, composer. | One composed component. | Add `AgentDrawerShell` only if drawer content/launcher variants multiply. | P1 | Immediate lower-level extractions may solve most duplication. |
| Composed | Chat canvas | Homepage `ChatCanvasFrame`, `ChatCanvas`, companion phone app body. | Local homepage implementation. | Add `MockupChatCanvas` after message/composer/transcript primitives exist. | P1 | Should not include homepage offset positioning. |
| Composed | Chat transcript | Homepage `ChatTranscript`, companion phone message stack. | Local. | Add `MockupChatTranscript` / `MessageStack` with autoscroll optional. | P1 | Autoscroll makes homepage version client-specific; keep basic stack server-friendly. |
| Composed | Chat/sidebar navigation | Homepage `AgentSidebar`, `SidebarHeader`, `SidebarNav`, `SidebarGroup`, `SidebarRow`, `SidebarFooter`; asset sidebar has analogous structure. | Private local components plus `NavItem`. | Add `MockupSidebar` only if chat sidebar repeats. | P2 | Use nav primitives first. |
| Composed | Companion phone frame | Phone frame markup plus `CompanionIphoneStatusBar`. | Status bar extracted; hardware shell inline. | Add `MockupPhoneFrame`. | P1 | High local duplication inside phone shell; useful if more mobile mockups are expected. |
| Composed | Workflow graph | `workflowNodes`, `workflowConnectors`, `WorkflowNode`, approval gate marker. | Node component local; connectors inline map. | Add `WorkflowGraph`, `WorkflowNode`, `WorkflowConnector` if workflow editor repeats. | P1 | Current absolute positions should stay data/local. |
| Composed | Workflow status/approval marker | Approval gate pill, active node status, connectors pulse. | Local. | Add `WorkflowStatusPill` only as part of workflow graph extraction. | P2 | Not needed independently yet. |
| Composed | Review/documentation page shell | `DesignSystemDoc`, `ComponentPolishPage`, `IntroBar`, `ComponentPolishIntro`, `Section`, study sections. | One `Section` helper in design-system page only. | Add `MockupAuditPage`, `AuditIntro`, `AuditSection`, `SpecimenStudy`. | P1 | Helpful because both routes are audit/specimen boards. |

## Highest-confidence extraction order

1. **Expand existing primitives first**: `GlyphButton`, `Chip`, `Surface`, `SegmentedTabs`, `NavItem`.
2. **Extract core conversation compounds**: `MockupMessageBubble`, `MockupCommandComposer`, `MockupWorkingPanel`, `MockupToolCallList`.
3. **Promote proposal/approval card**: rename `HomepageChatTaskProposalCard` to a product-neutral component and remove dependency on marketing hero glass naming.
4. **Add layout helpers**: `PanelHeader`, `ScrollableRegion`, `MockupDescriptionList`, `ReferencePanel/Table`.
5. **Only then compose shells**: `MockupPanelShell`, `MockupChatCanvas`, `MockupPhoneFrame`, `WorkflowGraph`.

## Existing components to preserve and generalize

| Existing component | Keep? | Change needed |
| --- | --- | --- |
| `Glyph` | Yes | Keep as the icon primitive. |
| `DisclosureTriangle` | Yes | Keep; pair with a new disclosure wrapper. |
| `Surface` | Yes | Add variants instead of making parallel card shells. |
| `NavItem` | Yes | Add element type, size, and active/hover variants. |
| `SegmentedTabs` | Yes | Rename or expand to `SegmentedControl`; support real tablist/buttons. |
| `CommandInput` | Wrap | Replace internals with `MockupCommandComposer`. |
| `Button` | Yes | Keep for text actions; align variants with chips. |
| `Chip` | Yes | Add size/tone/shape/interactive props. |
| `GlyphButton` | Yes | Expand into the canonical icon-button/icon-frame primitive. |
| `HomepageChatAssistantMessage` | Wrap | Replace with product-neutral `MockupMessageBubble`. |
| `HomepageChatWorkingPanel` | Wrap | Replace with product-neutral `MockupWorkingPanel`. |
| `HomepageChatToolCallList` | Rename | Promote to `MockupToolCallList`. |
| `HomepageChatTaskProposalCard` | Rename | Promote to `MockupProposalCard` / `HumanApprovalCard`. |

## Things that repeat but should stay local for now

- Homepage chat absolute composition: frame height, canvas offset, masks, sidebar fade, greeting placement.
- Workflow graph absolute coordinates and connector positions.
- Device hardware details: phone side buttons, notch, camera dot, status icon SVG dimensions.
- Persona or integration art: Andrew avatar, local avatar gradients, Telegram brand color.
- One-off route labels/content arrays. Map content into reusable components, but do not tokenize or componentize every content row.

## Proposed shared component namespace

If these move out of the route-specific mockup folders, prefer a neutral mockup namespace rather than `HomepageChat*`:

```txt
src/components/mockups/primitives/
  glyph-button.tsx
  surface.tsx
  chip.tsx
  segmented-control.tsx
  disclosure.tsx
  description-list.tsx

src/components/mockups/conversation/
  message-bubble.tsx
  command-composer.tsx
  working-panel.tsx
  tool-call-list.tsx
  proposal-card.tsx
  chat-transcript.tsx

src/components/mockups/shell/
  panel-header.tsx
  panel-shell.tsx
  scrollable-region.tsx
  nav-group.tsx

src/components/mockups/device/
  phone-frame.tsx

src/components/mockups/workflow/
  workflow-graph.tsx
  workflow-node.tsx
```

This keeps the system layered: primitives first, conversation/product compounds second, full mockup shells last.
