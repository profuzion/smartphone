# Bricks native elements vs Profuzion generators

Your Bricks UI groups (Layout, Basic Text, Media, …) map to **`name`** strings in copied-elements JSON. This repo tracks **every item you listed** in:

**`scripts/lib/bricks-native-catalog.mjs`** → `BRICKS_NATIVE_CATALOG` + **`PFZ_BRICKS_UI_CLASS`**

## Shared classes (“they talk to each other”)

Every generator-emitted element of type `section`, `container`, `text`, … receives:

`pfz-bricks-ui pfz-bricks-ui--{bricksName}`

merged **ahead of** your BEM / utility classes (`pfz-home__*`, ACSS, etc.). Target typography across all Basic Text nodes with:

```css
.pfz .pfz-bricks-ui--text { /* … */ }
```

Hooks are listed exhaustively in `PFZ_BRICKS_UI_CLASS` (including types we do **not** generate yet, so you can style them when added in Bricks manually).

Helpers: **`scripts/lib/bricks-native-ui-classes.mjs`** (`mergeBricksUiClasses`), wired inside **`scripts/lib/bricks-elements.mjs`**.

Base reset: **`scripts/lib/pfz-home-layout.css`** (`.pfz .pfz-bricks-ui { box-sizing: border-box; }`).

## Implemented factories (`bricks-elements.mjs`)

| Bricks `name` | Helpers |
|---------------|---------|
| `section` | `section`, `sectionPadded`, `sectionCase` |
| `container` | `container` |
| `block` | `blockEl` |
| `div` | `div` |
| `heading` | `heading` |
| `text` | `textBasic`, `textHtml`, `list`, `richText` (`richText` still emits **`text`** with a `div` tag — not the Rich Text element) |
| `rich-text` | `richTextBricks` (default `content` HTML; verify keys after import) |
| `video` | `videoBricks` (settings pass-through; verify after import) |
| `icon` | `iconBricks` (settings pass-through; verify after import) |
| `text-link` | `textLinkEl` (verify link settings after import on your Bricks version) |
| `button` | `buttonEl` |
| `image` | `imageEl` |
| `html` | `code`, `htmlEl` (raw HTML pass-through — **not** Basic Text) |

Registry alias **`text-basic`** has a hook class in `PFZ_BRICKS_UI_CLASS` for legacy nodes; exports use **`text`** for Basic Text.

## Everything else

Accordion, Tabs, Form, Posts, Nav Menu, executable **`code`**, etc. are catalogued with **`status: "not_generated"`** until we add verified settings shapes. **`rich-text`**, **`video`**, and **`icon`** have **stub** factories (`richTextBricks`, `videoBricks`, `iconBricks`) — confirm settings against copy-from-builder JSON on your Bricks version (see [Agent to Bricks element registry docs](https://agenttobricks.com/plugin/element-data-model/)).

## Imports

- Homepage packs: `src/app/v10/profuzion-v10-bricks-import.json` (recommended), plus regenerated `v2` / `v5` / `v6` mirrors.
- After changes: **`npm run wp:handoff`** (refreshes JSON + child theme copies + inlined layout CSS).
