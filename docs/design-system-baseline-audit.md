# Nue Design System Baseline Audit

Source specimen: `src/components/design-system/mockup/components`.

Purpose: rebuild the design-system baseline from the implemented mockup code, then derive tokens from observed value patterns rather than from the original screenshot.

## Screenshot validation pass

After extracting the code values, the mockup screenshot was used only to validate **semantic intent**: what each value is doing in the complete interface hierarchy. This changes the preferred namespace model from direct role names like `text-active` / `text-disabled` toward a more composable foreground, surface, stroke, accent, and component-alias model.

### Validated semantic namespace model

Use this as the review-ready namespace proposal.

```txt
--nous-color-*       Primitive/raw color values.
--nous-alpha-*       Primitive opacity values.
--nous-fg-*          Foreground semantics: text, icons, glyphs.
--nous-bg-*          Surface/background semantics.
--nous-stroke-*      Borders, dividers, hairlines, rings.
--nous-accent-*      Intent/status/product accent semantics.
--nous-space-*       Generic spacing scale only.
--nous-radius-*      Generic radius scale.
--nous-shadow-*      Elevation/shadow effects.
--nous-type-*        Typography roles.
--nous-shell-*       App shell layout contracts.
--nous-control-*     Control sizing/state contracts.
--nous-card-*        Card component contracts.
--nous-drawer-*      Agent drawer contracts.
```

### Why this namespace is more accurate

The screenshot shows that many repeated colors are not tied to a single component or state. For example, `#393F46` appears as muted icons, section labels, and metadata. Calling it `disabled` would be too narrow. Likewise, `#BFC4CB` is not only active text; it is the high-emphasis UI foreground used across chrome and controls. The validated model therefore uses composable base semantics first, then optional component aliases where needed.

## Review-ready semantic groupings

### Foreground namespace

| Token | Value | Validated screenshot role | Component aliases that may point to it |
| --- | --- | --- | --- |
| `--nous-fg-white` | `#FFFFFF` | Maximum contrast, active global nav label | `--nous-topbar-tab-fg-active` |
| `--nous-fg-bright` | `#D8DBDF` | Bright drawer result text, emphasized send/action text | `--nous-drawer-result-fg`, `--nous-control-fg-strong` |
| `--nous-fg-title` | `#D0D6E0` | Main page title, section headings, card titles, badge count text | `--nous-card-title-fg`, `--nous-section-title-fg`, `--nous-pill-fg-default` |
| `--nous-fg-primary` | `#BFC4CB` | High-emphasis UI text/icons: sidebar active label, panel header labels, selected segmented tab, rail icons | `--nous-nav-item-fg-active`, `--nous-panel-header-fg`, `--nous-icon-fg-primary` |
| `--nous-fg-body` | `#AEB4BD` | Drawer/conversation body copy and message body | `--nous-drawer-body-fg`, `--nous-message-fg` |
| `--nous-fg-body-strong` | `#C6C9CF` | Large drawer intro text; body copy that needs more contrast over glass | `--nous-drawer-intro-fg` |
| `--nous-fg-secondary` | `#8A8F98` | Page subtitle, secondary update titles, placeholder-adjacent labels | `--nous-subtitle-fg`, `--nous-update-title-fg` |
| `--nous-fg-placeholder` | `#9FA5AE` | Textarea/input placeholder text | `--nous-input-placeholder-fg` |
| `--nous-fg-muted` | `#5B5F67` | Card body copy, low-emphasis summaries | `--nous-card-body-fg`, `--nous-summary-fg` |
| `--nous-fg-subtle` | `#4F555D` | Drawer meta labels, worked-for status, utility icons | `--nous-meta-fg`, `--nous-icon-fg-subtle` |
| `--nous-fg-quieter` | `#393F46` | Muted glyphs, section labels, low-emphasis metadata | `--nous-icon-fg-muted`, `--nous-section-label-fg` |
| `--nous-fg-minimal` | `#333338` | Barely visible timestamps / background metadata | `--nous-timestamp-fg-minimal` |

Decision: use `fg-*` instead of `text-*` because the same values apply to text, icons, glyph strokes, badges, and metadata. Avoid `disabled` unless an element is truly non-interactive.

### Surface namespace

| Token | Value | Validated screenshot role | Component aliases that may point to it |
| --- | --- | --- | --- |
| `--nous-bg-canvas` | `#050505` | Outer application canvas | `--nous-shell-bg` |
| `--nous-bg-chrome` | `#050505` | Browser-like top/rail chrome | `--nous-topbar-bg`, `--nous-rail-bg` |
| `--nous-bg-shell` | `#080808` | Main inner app shell base | `--nous-workspace-bg` |
| `--nous-bg-panel` | `#101010` | Solid low-elevation panel | `--nous-panel-bg` |
| `--nous-bg-input` | `#111212` | Drawer command input background | `--nous-command-input-bg` |
| `--nous-bg-control-bar` | `#111213` | Global segmented nav background | `--nous-segmented-bg` |
| `--nous-bg-inset` | `#121212` | Inset input/control fields | `--nous-field-bg` |
| `--nous-bg-elevated` | `#171717` | Search field / raised dark control | `--nous-search-bg` |
| `--nous-bg-control-active` | `#1A1C1E` | Active top nav segment | `--nous-topbar-tab-bg-active` |
| `--nous-bg-selected-subtle` | `#E9E9FF06` | Sidebar selected/hover row | `--nous-nav-item-bg-active` |
| `--nous-bg-card-muted` | `rgba(25,25,25,.08)` | Lower-priority update cards | `--nous-update-card-bg` |
| `--nous-bg-card` | `rgba(25,25,25,.12)` | Main dashboard cards | `--nous-card-bg` |
| `--nous-bg-control` | `rgba(25,25,25,.16)` | Icon buttons and subtle controls | `--nous-icon-button-bg` |
| `--nous-bg-message` | `rgba(25,25,25,.2)` | User message bubble / conversational block | `--nous-message-bg` |
| `--nous-bg-overlay-glass` | `rgba(12,12,13,.92)` | Agent drawer glass surface | `--nous-drawer-bg` |

Decision: keep the public namespace as `bg-*` rather than `surface-*` because it composes naturally in CSS/Tailwind usage. The role is still semantic, not primitive.

### Stroke namespace

| Token | Value | Validated screenshot role |
| --- | --- | --- |
| `--nous-stroke-ghost` | `rgba(255,255,255,.01)` | Almost invisible nested control edge |
| `--nous-stroke-soft` | `rgba(255,255,255,.02)` | Soft card/nav selected edge |
| `--nous-stroke-subtle` | `rgba(255,255,255,.04)` | Default app dividers and borders |
| `--nous-stroke-default` | `rgba(255,255,255,.06)` | More visible overlay edges |
| `--nous-stroke-strong` | `rgba(255,255,255,.10)` | Strong control/overlay boundary |
| `--nous-stroke-emphasis` | `rgba(255,255,255,.16)` | Highest non-accent stroke |

Decision: use `stroke-*` rather than `border-*` because the same values are used for borders, dividers, SVG-like glyph context, rings, and separator lines. Deprecate `hairline` once migration is complete.

### Accent namespace

| Token group | Values | Validated screenshot role |
| --- | --- | --- |
| `--nous-accent-info-*` | `#5B7CFF`, `#8EB4EA`, `#bec8ff`, `#adb9ff`, `#BFC8FF`, `rgba(91,124,255,.1/.13)` | Product focus, selected workspace mode, review/action tags |
| `--nous-accent-workspace-*` | `#6D3DF2`, `#391289` | Workspace/project identity, active project rail item |
| `--nous-accent-success-*` | `#23A768`, `#1A8C54`, `#A7FFA7`, `rgba(29,255,17,.07)` | Running state and success project identity |
| `--nous-accent-warning-*` | `#F0C400`, `rgba(240,196,0,.09/.1)` | Needs-review actions and warning attention |

Decision: use semantic intent groups for action/status accents, but reserve `workspace` for project identity colors because purple/green rail tiles function as identity marks, not just status colors.

### Component alias layer

Components should mostly consume semantic tokens directly. Create aliases only where a value is part of the component contract or likely to vary by theme/component.

```css
.nous-app-theme {
  --nous-nav-item-fg: var(--nous-fg-primary);
  --nous-nav-item-fg-active: var(--nous-fg-primary);
  --nous-nav-item-bg-active: var(--nous-bg-selected-subtle);
  --nous-nav-section-label-fg: var(--nous-fg-quieter);

  --nous-panel-header-fg: var(--nous-fg-primary);
  --nous-section-title-fg: var(--nous-fg-title);
  --nous-card-title-fg: var(--nous-fg-title);
  --nous-card-body-fg: var(--nous-fg-muted);
  --nous-card-bg: var(--nous-bg-card);

  --nous-drawer-bg: var(--nous-bg-overlay-glass);
  --nous-drawer-body-fg: var(--nous-fg-body);
  --nous-drawer-result-fg: var(--nous-fg-bright);
  --nous-drawer-meta-fg: var(--nous-fg-subtle);

  --nous-command-input-bg: var(--nous-bg-input);
  --nous-command-input-placeholder-fg: var(--nous-fg-placeholder);
}
```

Decision: aliases should not duplicate every value. Use them for component identity, theming flexibility, and readability.

## Extraction rules

Values are classified into four buckets:

1. **Primitive token** — raw material value, usually reusable across themes.
2. **Semantic token** — role-based value used by UI surfaces, text, borders, states, or accents.
3. **Component token** — contract value for a specific shell/component pattern.
4. **Local value** — specimen-only or content/layout-specific value that should not become global.

## Raw value inventory

### Most repeated color values

| Value | Count | Observed role | Recommended token direction |
| --- | ---: | --- | --- |
| `#BFC4CB` | 9 | Active control/nav text, inactive chrome icon text, selected tab text | `--nous-text-active`, possibly `--nous-icon-active` |
| `#393F46` | 7 | Muted icons, section labels, metadata, inactive utility glyphs | `--nous-text-disabled`, `--nous-icon-muted` |
| `#D0D6E0` | 7 | Page heading, section title, card title, emphasized drawer text | `--nous-text-heading` |
| `#4F555D` | 6 | Drawer meta labels, utility icons, weak status text | `--nous-text-faint`, `--nous-icon-faint` |
| `#5B5F67` | 4 | Card body copy | `--nous-text-muted` |
| `#D8DBDF` | 4 | Strong drawer body text, send button icon/text | `--nous-text-strong` |
| `#AEB4BD` | 3 | Drawer body text and conversational surface text | `--nous-text-body` |
| `#8A8F98` | 2 | Subtitle and update-card title | `--nous-text-secondary` |
| `#E9E9FF06` | 2 | Sidebar nav hover/active background | `--nous-surface-selected-subtle` |
| `#391289` | 2 | Purple project/workspace surface | `--nous-accent-purple-deep` |

### Single-use color values that still reveal roles

| Value | Observed role | Recommended direction |
| --- | --- | --- |
| `#FFFFFF` | Active top-level tab text | semantic alias to `--nous-text-inverse` or `--nous-text-white` |
| `#C6C9CF` | Drawer scrolling body text | merge with `--nous-text-body` or add `--nous-text-body-strong` only if reused |
| `#A5ACB6` | Current token value for primary text / agent count | keep as primitive/semantic candidate, but code mostly uses `#BFC4CB` and `#D0D6E0` for stronger roles |
| `#9FA5AE` | Drawer input placeholder/body | `--nous-text-placeholder` |
| `#333338` | Timestamp-hidden/meta text | `--nous-text-hidden` |
| `#111212` | Drawer command input surface | `--nous-surface-input` |
| `#111213` | Top switcher background | `--nous-surface-control-bar` |
| `#1A1C1E` | Active top switcher tab | `--nous-surface-control-active` |
| `#060606` | Updates bottom fade destination | local/effect token for panel fade |
| `#f4c7a0`, `#116c7a` | Avatar gradient stops | local/persona/avatar primitive, not app-system core |
| `#1A8C54` | Green project rail button | `--nous-accent-green-deep` |
| `#8EB4EA` | Active top tab icon blue | `--nous-accent-blue-soft` |
| `#A7FFA7` | Success chip text | `--nous-accent-success-text` |
| `#bec8ff`, `#adb9ff`, `#BFC8FF` | Blue chip/pill text | consolidate into `--nous-accent-info-text` scale |

### RGBA / alpha values

| Value | Count | Observed role | Recommended token direction |
| --- | ---: | --- | --- |
| `rgba(255,255,255,0.035)` | 2 | Soft control/pill background | `--nous-surface-control-soft` |
| `rgba(91,124,255,0.1)` | 2 | Info topic/chip surface | `--nous-accent-info-surface-subtle` |
| `rgba(91,124,255,0.13)` | 2 | Info/primary active surface | `--nous-accent-info-surface` |
| `rgba(12,12,13,0.92)` | 2 | Glass drawer overlay | `--nous-surface-overlay-glass` |
| `rgba(25,25,25,.08)` | 1 | Muted update card surface | `--nous-surface-card-muted` |
| `rgba(25,25,25,.12)` | 1 | Base card surface | `--nous-surface-card` |
| `rgba(25,25,25,0.16)` | 1 | Icon button surface | `--nous-surface-control` |
| `rgba(25,25,25,0.2)` | 1 | Drawer message surface | `--nous-surface-message` |
| `rgba(240,196,0,0.09/0.1)` | 2 total | Warning action/chip surfaces | consolidate to `--nous-accent-warning-surface` |
| `rgba(29,255,17,0.07)` | 1 | Success chip surface | `--nous-accent-success-surface` |
| `rgba(7,7,7,0.75)` | 1 | Drawer drop shadow | `--nous-shadow-drawer` |

### Existing token values in use

Current component code already relies on several tokens, but names are mixed between system and component-specific concepts.

| Current token | Observed role | Recommendation |
| --- | --- | --- |
| `--hairline-stroke` | Dominant border/divider token; 22 uses | Rename to `--nous-border-subtle` |
| `--hairline-soft` | Softer card/nav active border | Rename to `--nous-border-soft` |
| `--hairline-strong` | Drawer/open-button border | Rename to `--nous-border-strong` |
| `--hairline-ghost` | Nearly invisible control border | Rename to `--nous-border-ghost` |
| `--nous-bg-chrome` | App chrome and top-level frame | Rename to `--nous-surface-chrome` |
| `--nous-bg-elevated` | Search field surface | Rename to `--nous-surface-elevated` |
| `--nous-bg-inset` | Command input surface | Rename to `--nous-surface-inset` |
| `--asset-sidebar-*` | Component-local naming | Move into semantic/component token layer, not global raw naming |
| `--context-area-tab-switcher-bg` | Component-local naming | Replace with segmented-control component token |

## Pattern map

### Text hierarchy

The mockup has a clear 8-step dark-shell text hierarchy.

| Role | Current values | Proposed semantic token |
| --- | --- | --- |
| White/maximum emphasis | `#FFFFFF` | `--nous-text-white` |
| Heading/title | `#D0D6E0`, sometimes `#D8DBDF` | `--nous-text-heading` |
| Active UI text | `#BFC4CB` | `--nous-text-active` |
| Body/conversation | `#AEB4BD`, `#C6C9CF` | `--nous-text-body` |
| Secondary/subtitle | `#8A8F98`, `#9FA5AE` | `--nous-text-secondary` / `--nous-text-placeholder` |
| Muted content | `#5B5F67` | `--nous-text-muted` |
| Faint/meta | `#4F555D` | `--nous-text-faint` |
| Disabled/icons/section labels | `#393F46`, `#333338` | `--nous-text-disabled` / `--nous-text-hidden` |

Decision: do not create a generic numbered gray scale first. The implementation shows role-based usage more strongly than neutral-scale usage. Keep primitive grays available, but author components against semantic text roles.

### Surface hierarchy

The UI uses black/near-black solids for structural chrome and translucent graphite for content surfaces.

| Role | Current values | Proposed token |
| --- | --- | --- |
| App canvas/chrome | `#050505` via `--nous-bg-app`, `--nous-bg-chrome` | `--nous-surface-canvas`, `--nous-surface-chrome` |
| Shell/panel | `#080808`, `#101010` | `--nous-surface-shell`, `--nous-surface-panel` |
| Input/control solid | `#111212`, `#111213`, `#121212` | `--nous-surface-input`, `--nous-surface-control-bar`, `--nous-surface-inset` |
| Elevated/search/active | `#171717`, `#1A1C1E` | `--nous-surface-elevated`, `--nous-surface-control-active` |
| Card ladder | `rgba(25,25,25,.08/.12/.16/.2)` | `--nous-surface-card-muted`, `--nous-surface-card`, `--nous-surface-control`, `--nous-surface-message` |
| Overlay/glass | `rgba(12,12,13,.92)` plus gradient | `--nous-surface-overlay-glass`, `--nous-gradient-overlay-glass` |

Decision: token names should distinguish structural surfaces from translucent content surfaces.

### Border hierarchy

The current `hairline` family is valuable, but should be normalized into border semantics.

| Role | Current value family | Proposed token |
| --- | --- | --- |
| Invisible/ghost | `rgba(255,255,255,.01)` | `--nous-border-ghost` |
| Soft card edge | `rgba(255,255,255,.02)` | `--nous-border-soft` |
| Default shell stroke | `rgba(255,255,255,.04)` | `--nous-border-subtle` |
| Strong overlay edge | `rgba(255,255,255,.06)` | `--nous-border-default` |
| Emphasized/focus-adjacent | `rgba(255,255,255,.10/.16)` | `--nous-border-strong`, `--nous-border-emphasis` |

Decision: preserve the opacity ramp as primitives, but expose semantic border names to components.

### Accent hierarchy

Accent colors fall into product/status/action roles.

| Role | Current values | Proposed token group |
| --- | --- | --- |
| Info/primary/action | `#5B7CFF`, `#8EB4EA`, `#bec8ff`, `#adb9ff`, `#BFC8FF`, `rgba(91,124,255,.1/.13)` | `--nous-accent-info-*` |
| Workspace/project purple | `#6D3DF2`, `#391289` | `--nous-accent-purple-*` |
| Success/running | `#23A768`, `#1A8C54`, `#A7FFA7`, `rgba(29,255,17,.07)` | `--nous-accent-success-*` |
| Warning/review | `#F0C400`, `rgba(240,196,0,.09/.1)` | `--nous-accent-warning-*` |

Decision: accents need foreground, surface, and deep/base variants. Avoid one generic `blue-500` token in component code.

### Density and measurement hierarchy

Repeated arbitrary values show a compact desktop app density system.

| Value/cluster | Observed role | Token direction |
| --- | --- | --- |
| `24px` | Small icon button/avatar mark | component size token |
| `32px` | Rail button/icon button size | `--nous-control-size-md`, `--nous-rail-item-size` |
| `35px` | App topbar height | `--nous-shell-topbar-height` |
| `40px` | Context header height | `--nous-shell-contextbar-height` |
| `43px` | Bottom userbar height | `--nous-shell-userbar-height` |
| `50px` | Project rail width | `--nous-shell-rail-width` |
| `236px` | Asset sidebar width | `--nous-shell-sidebar-width` |
| `340px` | Updates panel width | `--nous-shell-updates-width` |
| `580px` | Agent drawer width | `--nous-drawer-width` |
| `310px` | Search box width | `--nous-topbar-search-width` |
| `21px / 15px` | Card padding | `--nous-card-padding-x`, `--nous-card-padding-y` |

Decision: shell dimensions are component-contract tokens. They should not be folded into generic spacing.

### Radius hierarchy

Observed radii: `4`, `5`, `6`, `8`, `10`, `12`, `13`, `16`, pill.

Recommended radius primitive scale:

```css
--nous-radius-2xs: 4px;
--nous-radius-xs: 5px;
--nous-radius-sm: 6px;
--nous-radius-md: 8px;
--nous-radius-lg: 10px;
--nous-radius-xl: 12px;
--nous-radius-2xl: 16px;
--nous-radius-pill: 999px;
```

Decision: `13px` appears instance-specific for one message bubble and should either map to `12px` or become a component token only if the bubble shape is intentionally distinct.

### Typography hierarchy

Observed sizes: `10px`, `11px`, `12px`, Tailwind `text-xs`, `text-sm`, `17px`, `22px`.

| Role | Current values | Token direction |
| --- | --- | --- |
| Tiny metadata/tag text | `10px` | `--nous-type-meta-xs` |
| Drawer/topic micro text | `11px` | `--nous-type-meta-sm` |
| Mono/action/card body | `12px`, `text-xs` | `--nous-type-body-sm` |
| Nav/header/card title | `14px`, `text-sm` | `--nous-type-ui-md` |
| Section title | `17px` | `--nous-type-section-title` |
| Page/workspace title | `22px` | `--nous-type-page-title` |

Decision: define role tokens for important type uses, but do not over-tokenize every Tailwind size until components settle.

## Proposed baseline token taxonomy

### Primitive layer

```css
/* alpha primitives */
--nous-white-a01: rgba(255, 255, 255, 0.01);
--nous-white-a02: rgba(255, 255, 255, 0.02);
--nous-white-a04: rgba(255, 255, 255, 0.04);
--nous-white-a06: rgba(255, 255, 255, 0.06);
--nous-white-a10: rgba(255, 255, 255, 0.10);
--nous-white-a16: rgba(255, 255, 255, 0.16);

/* accent primitives */
--nous-blue-500: #5b7cff;
--nous-blue-300: #8eb4ea;
--nous-purple-700: #391289;
--nous-purple-500: #6d3df2;
--nous-green-700: #1a8c54;
--nous-green-500: #23a768;
--nous-yellow-500: #f0c400;
```

### Semantic app-theme layer

```css
.nous-app-theme {
  --nous-surface-canvas: #050505;
  --nous-surface-chrome: #050505;
  --nous-surface-shell: #080808;
  --nous-surface-panel: #101010;
  --nous-surface-input: #111212;
  --nous-surface-control-bar: #111213;
  --nous-surface-inset: #121212;
  --nous-surface-elevated: #171717;
  --nous-surface-control-active: #1a1c1e;
  --nous-surface-selected-subtle: #e9e9ff06;
  --nous-surface-card-muted: rgba(25, 25, 25, 0.08);
  --nous-surface-card: rgba(25, 25, 25, 0.12);
  --nous-surface-control: rgba(25, 25, 25, 0.16);
  --nous-surface-message: rgba(25, 25, 25, 0.2);
  --nous-surface-overlay-glass: rgba(12, 12, 13, 0.92);

  --nous-border-ghost: var(--nous-white-a01);
  --nous-border-soft: var(--nous-white-a02);
  --nous-border-subtle: var(--nous-white-a04);
  --nous-border-default: var(--nous-white-a06);
  --nous-border-strong: var(--nous-white-a10);
  --nous-border-emphasis: var(--nous-white-a16);

  --nous-text-white: #ffffff;
  --nous-text-heading: #d0d6e0;
  --nous-text-strong: #d8dbdf;
  --nous-text-active: #bfc4cb;
  --nous-text-body: #aeb4bd;
  --nous-text-secondary: #8a8f98;
  --nous-text-placeholder: #9fa5ae;
  --nous-text-muted: #5b5f67;
  --nous-text-faint: #4f555d;
  --nous-text-disabled: #393f46;
  --nous-text-hidden: #333338;

  --nous-accent-info: var(--nous-blue-500);
  --nous-accent-info-soft: var(--nous-blue-300);
  --nous-accent-info-text: #bec8ff;
  --nous-accent-info-text-muted: #adb9ff;
  --nous-accent-info-surface-subtle: rgba(91, 124, 255, 0.10);
  --nous-accent-info-surface: rgba(91, 124, 255, 0.13);

  --nous-accent-success: var(--nous-green-500);
  --nous-accent-success-deep: var(--nous-green-700);
  --nous-accent-success-text: #a7ffa7;
  --nous-accent-success-surface: rgba(29, 255, 17, 0.07);

  --nous-accent-warning: var(--nous-yellow-500);
  --nous-accent-warning-surface: rgba(240, 196, 0, 0.10);
}
```

### Component contract layer

```css
.nous-app-theme {
  --nous-shell-topbar-height: 35px;
  --nous-shell-rail-width: 50px;
  --nous-shell-sidebar-width: 236px;
  --nous-shell-updates-width: 340px;
  --nous-shell-contextbar-height: 40px;
  --nous-shell-userbar-height: 43px;
  --nous-shell-frame-inset: 6px;

  --nous-topbar-search-width: 310px;
  --nous-drawer-width: 580px;
  --nous-drawer-top: 100px;
  --nous-drawer-inset: 13px;

  --nous-card-padding-x: 21px;
  --nous-card-padding-y: 15px;
  --nous-card-radius: var(--nous-radius-xl);

  --nous-control-size-sm: 24px;
  --nous-control-size-md: 32px;
  --nous-rail-item-size: 32px;
}
```

## Values to keep local for now

These should not become global tokens until repeated by another component or confirmed as an intentional design rule.

- `h-[820px]` — mockup demo frame height.
- `min-w-[1180px]` — mockup/demo viewport guard.
- `max-w-[610px]` — local drawer paragraph constraint.
- `grid-cols-[58px_1fr]` — local definition-list layout.
- `h-[1.15em]` — caret visual detail.
- Avatar gradient stops `#f4c7a0` and `#116c7a` — content/persona-specific.
- Bottom fade `#060606` — likely effect-local until fades are formalized.
- `rounded-[13px]` — message bubble can map to 12px unless 13px is intentionally preserved.

## Refactor sequence

1. Add the new primitive, semantic, and component token names while keeping old tokens as aliases.
2. Replace hardcoded colors in components with semantic tokens.
3. Replace shell measurements with component contract tokens.
4. Replace `--hairline-*` usage with `--nous-border-*` usage.
5. Replace component-specific global names such as `--asset-sidebar-*` with semantic/component names.
6. Only after visual parity is verified, remove deprecated aliases.

## Success criteria

- No intended visual change to the existing mockup.
- Hardcoded colors in mockup components are reserved for demonstrably local content values only.
- Shell dimensions are readable from component tokens.
- Reusable primitives consume semantic tokens rather than screenshot literals.
- The app theme can evolve independently from the marketing website theme.
