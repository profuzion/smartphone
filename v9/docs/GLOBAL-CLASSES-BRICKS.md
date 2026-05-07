# Bricks global classes — Profuzion v2 (paste reference)

## Bricks UI workflow (required)

- **Apply every Profuzion / ACSS class name in the builder:** select the element → **CSS** → **CSS classes** (space-separated). That is the front-facing workflow — same fields you use for Global Class picks.
- **Do not** paste Profuzion layout or typography into: **Appearance → Customize → Additional CSS**, **Bricks → Settings → Custom code / Custom CSS**, or the per-element **CSS → “Custom CSS”** textarea for whole sections. Those bypass the class system and are hard to audit. Exceptions: one-off third-party overrides you explicitly want outside the design system.
- **Stylesheet of record** for tokens + `.pfz-*` rules: child theme **`profuzion-v6-wp-bundled.css`** (mirrored from `v2.css`). Bricks controls + **CSS classes** shape the page; the bundle supplies the CSS for those class names.

**You do not define layout in these names** — they carry **typography, color, spacing, and component chrome** only. Assign them in Bricks → **element → CSS → CSS classes** (or create mirrored entries in **Global Classes** if you prefer the class manager UI — still not a raw CSS box).

All selectors in `src/app/v2/v2.css` are scoped under **`body.pfz`** (the child theme adds `pfz` to `body_class`).

## Case study template (`pfz-case`)

Add **`pfz-case`** next to **`pfz`** on the same wrapper **only if** you need the `min-height: 100vh` hook; usually **`pfz` on body** is enough and sections carry **`pfz-case__*`** below.

| Class | Apply to |
|------|----------|
| `pfz-case__main` | `<main>` |
| `pfz-case__shell` | Horizontal padding + max-width wrapper |
| `pfz-case__masthead` | Title block section |
| `pfz-case__masthead-grid` | Flex row for title + tagline |
| `pfz-case__title-stack` | Title + kicker column |
| `pfz-case__title` | `<h1>` width cap |
| `pfz-case-tagline` | Italic tagline |
| `pfz-case-tagline--trailing` | Right-align tagline from `md` up |
| `pfz-case__lede` | Lede section vertical padding |
| `pfz-case__lede-text` | Centered lede |
| `pfz-case__lede-actions` | CTA row under lede |
| `pfz-case__story` | Growth / evolution / results band |
| `pfz-case__story-inner` | Narrow inner column |
| `pfz-case__block` | One narrative block |
| `pfz-case__block-heading` | Block `<h3>` |
| `pfz-case__pullquote` | `<figure>` |
| `pfz-case__pullquote-text` | `<blockquote>` |
| `pfz-case__pullquote-cite` | `<figcaption>` |
| `pfz-case__results` | Results stack |
| `pfz-case__results-list` | `<ul>` |
| `pfz-case__results-item` | `<li>` |
| `pfz-case__results-mark` | ✦ span |
| `pfz-case__gallery` | Gallery section |
| `pfz-case__gallery-inner` | Gallery max-width + gap |
| `pfz-case__gallery-intro` | Eyebrow + H2 |
| `pfz-case__gallery-grid` | Grid |
| `pfz-case__gallery-span` | Full-width cell mobile |
| `pfz-case__gallery-span--md` | Two-column span from `md` |
| `pfz-section` + `pfz-section--ink` + `pfz-case__cta` | Ink CTA strip |
| `pfz-case__cta-noise` | Decorative noise overlay (absolute) |
| `pfz-case__cta-inner` | Centered content |
| `pfz-case__cta-shout` | All-caps shout line |
| `pfz-case__cta-lede` | Subcopy under shout |
| `pfz-case__cta-actions` | Button row |
| `pfz-case__related` | Related cases section |
| `pfz-case__related-head` | Title row |
| `pfz-case__related-title` | H2 top margin helper |
| `pfz-case__related-back` | “Back” button align |
| `pfz-case__related-grid` | Card grid |
| `pfz-case-card` | **`<a>`** card |
| `pfz-case-card__type` | Industry chip |
| `pfz-case-card__title` | Client name |
| `pfz-case-card__tagline` | Italic line |
| `pfz-case-card__cta` | “View case →” |

## Shared v2 utilities (homepage + case)

| Class | Role |
|------|------|
| `pfz-display`, `pfz-display--lg`, `pfz-display--md`, `pfz-display--xl` | Display scale |
| `pfz-display__accent`, `pfz-display--primary` | Signal colour |
| `pfz-eyebrow`, `pfz-eyebrow--primary`, `pfz-eyebrow--bare`, `pfz-eyebrow--lg` | Mono labels |
| `pfz-italic` | Instrument Serif accent |
| `pfz-body`, `pfz-body--story` | Body copy |
| `pfz-lede` | Intro paragraph |
| `pfz-rule` | Hairline |
| `pfz-card` | Card surface |
| **`btn--primary`**, **`btn--secondary`**, **`btn--base`**, **`btn--outline`** | [ACSS button names](https://docs.automaticcss.com/buttons/button-classes) |
| `pfz-btn-arrow` | Arrow transition (children of `.btn--*`) |

After editing `v2.css`, run **`npm run wp:handoff`** or **`npm run sync-v6-wp-css`** from the project root so **`profuzion-v6-wp-bundled.css`** in the child theme stays current.
