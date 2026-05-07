# BEM + Profuzion → WordPress / Bricks

This is the **naming and structure foundation** for moving v2 from **component-based markup in the preview app** to **Bricks + [Automatic.css](https://docs.automaticcss.com/)** and the **Profuzion Bricks child theme** (`profuzion-brick-child/`).

Official methodology: [BEM — Quick start](https://bem.info/en/methodology/quick-start/). The “classic” technology page ([Classical BEM stack](https://bem.info/en/technologies/classic/)) describes **BEM’s own tooling** (BEMJSON, BEMHTML, BEMTREE, i-bem.js, build pipeline). We **do not** adopt that full stack in WordPress. We **only** use the same **naming and independence rules** for HTML/CSS (and for hooking small scripts).

---

## BEM core (what we actually apply in Bricks)

| Concept | Rule (short) | Example |
|--------|----------------|---------|
| **Block** | Reusable, purpose-named component; no outer margin/position that couples it to a page (geometry lives on a parent or a **mix**). | `pfz-hero`, `pfz-cta` |
| **Element** | Part of a block, not `block__elem1__elem2` — one level: `block__element`. | `pfz-hero__eyebrow`, `pfz-hero__headline` |
| **Modifier** | Appearance / state, **on the same node** as the block or element, **with** the base class. **Boolean:** `block_mod`; **key–value:** `block_key_val`. | `pfz-cta` + `pfz-cta--primary`, or ACSS-style `btn` + `btn--primary` (see v2). |
| **Mix** | Two BEM entities on **one** DOM node (e.g. Bricks `section` = layout block + your `header__search` element). | `pfz-search-form site-header__search` |

**Why this matters in Bricks:** you add **one global BEM class per block** in the builder, then sub-elements and modifiers. ACSS still supplies **spacing, type scale, and tokens**; BEM is for **component identity**, not replicating every utility in the name.

---

## How this maps from the current repo

| In design preview v2 (today) | Role | In WordPress |
|-------------------|------|--------------|
| `body` / main wrapper **`pfz`** | Design-token + utility scope (BEM **block** for the page shell; all utilities are scoped under `.pfz …`). | Keep **`pfz`** on `body` (child theme does this) or a wrapping `<main>`. |
| **`btn--primary`**, **`btn--secondary`**, **`btn--base`**, **`btn--outline`**, **`.pfz-card`**, … | **Design system** in `v2.css`: **buttons** follow [ACSS button classes](https://docs.automaticcss.com/buttons/button-classes) (solid + optional `btn--outline`). **Arrows** use **`pfz-btn-arrow`** (not ACSS). | Match Bricks + ACSS; enqueued bundle ships the same class names. |
| **IDs** like `#industries`, `#contact` | In-page nav / GSAP. | **Same IDs** on Bricks section/container settings. |
| **JSX** `className` | Not BEM’s classic stack. | Bricks outputs **static HTML**; you assign **BEM + ACSS** classes in the builder. |

**v2** and the bundled child-theme CSS now share this **`pfz-*`** naming; Bricks markup should match `src/app/v2/v2.css`.

---

## Recommended namespace for *new* Bricks global classes

Use a **short block prefix** to avoid collisions with ACSS and other plugins, e.g.:

- **`pfz-`** = Profuzion block (e.g. `pfz-hero`, `pfz-cta`, `pfz-section--ink`).

**Elements** always use double underscore: `pfz-hero__lede`, `pfz-cta__form`.  
**Modifiers** for theme/state: `pfz-section--ink`, `pfz-card--hover` (or `pfz_section_key_val` if you follow strict kebab BEM; stay consistent in one project).

This aligns with the [Quick start](https://bem.info/en/methodology/quick-start/) rules without importing the [classic BEM build stack](https://bem.info/en/technologies/classic/).

---

## Profuzion Bricks child theme (repo)

Use the included **`tools/wordpress/profuzion-brick-child/`** as the active child theme. It already:

- Enqueues **`profuzion-v6-wp-bundled.css`** (tokens + `pfz-*` utilities — mirror of `src/app/v2/v2.css`)
- Enqueues **cursor** + **GSAP** + **motion** scripts
- Adds **`pfz`** to `body_class`

**ACSS** ([docs](https://docs.automaticcss.com/)) handles **scales, utilities, and variables**; **BEM** global classes in Bricks name **custom Profuzion blocks** so sections stay refactorsable and don’t depend on one-off Bricks class soup.

---

## One-line “calculation”

**ACSS = design system + responsive utilities. BEM = component naming for your custom markup. Child theme = shared CSS/JS. Bricks = layout and content.** The classic BEM *toolchain* is optional; the **methodology** is the contract we keep.
