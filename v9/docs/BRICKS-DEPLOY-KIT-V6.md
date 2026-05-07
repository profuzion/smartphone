# Profuzion v6 → WordPress / Bricks / ACSS / BEM

**v6** is the **v2 visual + motion rebuild** for WordPress: same **`src/app/v2/v2.css`** tokens and BEM scope (`body.pfz.pfz-v6`), **Bricks** for layout, **ACSS** for framework utilities, **vanilla GSAP + Three.js** in the child theme (authoring-time preview code is not loaded on the live site).

---

## Seamless production deploy (do this order)

These steps avoid the usual friction (missing vendor JS, 404 on `/work/…`, halftone not running, wrong Bricks shell).

1. **In the design repository** (folder with `package.json`): install dependencies, then run **`npm run wp:handoff`**. That refreshes **`profuzion-v6-wp-bundled.css`**, copies **`assets/js/vendor/*.min.js`** (GSAP, ScrollTrigger, Three), and regenerates all Bricks JSON. **Commit or upload the child theme only after this step** so production always gets the vendor folder.
2. **Deploy the full child theme** `tools/wordpress/profuzion-brick-child/` — including **`assets/js/vendor/`** — to `wp-content/themes/profuzion-brick-child/`.
3. **Bricks parent** theme directory must be named **`bricks`**, or edit **`Template:`** in the child **`style.css`** to match your server.
4. **Activate** the child theme. **Settings → Permalinks → Save** once (rewrite rules; the theme also flushes on switch, but saving covers plugin order edge cases).
5. **Bricks:** import **`src/app/v6/profuzion-v6-bricks-*.json`** — **Header** → **Footer** → assign under **Bricks → Settings** → **Home** body → **Case** template (see table below).
6. **Homepage / halftone:** Halftone + Three load only when **`profuzion_should_enqueue_halftone()`** is true. By default that follows **`is_front_page()`**. Set **Settings → Reading → Your homepage displays → A static page** and choose your one-pager as *Homepage*, **or** add a small `profuzion_enqueue_halftone` filter in a site plugin (examples in this doc).
7. **ACF:** sync **Profuzion — Case study** (**ACF Pro** required for the gallery field). Full CPT/forms detail: **`BRICKS-DEPLOY-KIT.md`**.

---

## Local visual QA (preview app)

The route **`/v6`** uses the same v2 section modules and `v2.css`, with **`pfz-v6`** on the wrapper so hero/halftone CSS matches WordPress. From the repository root, start the **`dev`** or **`start`** script in `package.json`, then open **`http://localhost:3000/v6`** (or your chosen port). Compare with **`/v2`** side by side — layout and styling should align; production WordPress uses the vanilla Three halftone + GSAP child theme.

---

## Handoff command

From the project root (directory with `package.json`):

```bash
npm run wp:handoff
```

That runs **`sync-v6-wp-css`** → **`sync-wp-vendor-js`** → **Bricks generators** (mirrors `v2.css` → `profuzion-v6-wp-bundled.css`, keeps v5/v2 CSS paths in sync, fills `assets/js/vendor/`, writes `src/app/v6/` and legacy JSON exports).

---

## Child theme scripts (WordPress surface)

Everything below is served from **`wp-content/themes/profuzion-brick-child/`** after you run **`sync-wp-vendor-js`** (mirrors GSAP + ScrollTrigger from the project’s locked dependencies, downloads pinned Three r160 UMD into `assets/js/vendor/`). **Authoring-only preview bundles are not enqueued** on the live site.

| Handle | Source | Role |
|--------|--------|------|
| `profuzion-v6-bundled` | `assets/css/profuzion-v6-wp-bundled.css` | Mirror of `v2.css` + Google Fonts |
| `profuzion-cursor` | `assets/js/cursor.js` | Custom cursor (`data-cursor`) |
| `gsap` | `assets/js/vendor/gsap.min.js` * | Core GSAP |
| `gsap-scrolltrigger` | `assets/js/vendor/ScrollTrigger.min.js` * | ScrollTrigger plugin |
| `profuzion-motion` | `assets/js/motion.js` | `[data-pz-fade]` scroll fades |
| `pfz-v6-animations` | `assets/js/pfz-v6-animations.js` | Hero + industries ScrollTriggers (see `PROFUZION_V6_SCROLL_ANIMS`) |
| `three` | `assets/js/vendor/three.min.js` * | UMD build (halftone only) |
| `pfz-halftone-hero` | `assets/js/pfz-halftone-hero.js` | WebGL halftone (expects `#top`; see halftone rules below) |

\*If `PROFUZION_VENDOR_LOCAL` is true but vendor files are missing, **GSAP** falls back to cdnjs; **Three** falls back to jsDelivr for the halftone bundle only. Set `PROFUZION_VENDOR_LOCAL` to `false` to force CDN for GSAP always.

**Halftone (heavy):** By default the halftone scripts run only on **`is_front_page()`**. Override with:

```php
add_filter('profuzion_enqueue_halftone', function () {
	return is_page('about'); // example
});
```

Or disable the default front-page rule entirely: set `PROFUZION_V6_HALFTONE_DEFAULT` to `false` and then only pages that return `true` from the filter above will load Three + halftone.

**Scroll layer:** Set `PROFUZION_V6_SCROLL_ANIMS` to `false` in `functions.php` to stop enqueueing `pfz-v6-animations.js` (hero stagger / industries still need GSAP if you add your own scripts).

---

## Bricks templates to import (`src/app/v6/`)

| File | Template type in Bricks |
|------|-------------------------|
| `profuzion-v6-bricks-header-import.json` | **Header** |
| `profuzion-v6-bricks-footer-import.json` | **Footer** |
| `profuzion-v6-bricks-home-import.json` | **Section template** or **page body** (includes §0 setup note + same sections as v2 import) |
| `profuzion-v6-bricks-case-import.json` | Case single layout |
| `profuzion-v6-bricks-hero-prompt-import.json` | **Optional test:** Hero section only (**`_cssGlobalClasses`**, BEM + ACSS + `u-*`); register matching classes in Global Classes Manager, then paste/import. After **`wp profuzion import-bricks`**, appears as **`pfz-v6-hero-prompt`** in **Bricks → Templates**. |

Import order: **Header** → **Footer** → assign in theme settings → **Home** → **Case**. The hero-prompt bundle is standalone (not wired to Conditions); insert or assign where you want to test.

**CLI:** With the child theme deployed, **`wp profuzion import-bricks`** imports all rows in `bricks-import/`, including **`pfz-v6-hero-prompt`**.

**Classes on import:** Template JSON pre-fills **CSS → CSS classes** (`_cssClasses`) on sections, containers, headings, text, and buttons so styling is visible in the Bricks UI. Adjust or extend in the class field only — avoid Custom CSS boxes for Profuzion (see **`GLOBAL-CLASSES-BRICKS.md`**).

---

## Required markup hooks (parity with v2)

**Hero** — section HTML ID **`top`**:

- Optional first child: `<div data-pfz-halftone class="pfz-hero__halftone" aria-hidden="true"></div>` (script creates it if missing).
- Headline: each word in `<span data-word>` (blur stagger).
- Rows: `data-hero-meta`, CTA row: `data-hero-cta`.

**Industries** — section ID **`industries`**:

- `data-ind-meta` on intro blocks.
- `data-ind-row` on each vertical list row.

**Scroll fades elsewhere:** `data-pz-fade` (existing `motion.js`).

Full class map: `tools/wordpress/GLOBAL-CLASSES-BRICKS.md` · ACF case fields unchanged from v5 kit (**ACF Pro** for gallery).

---

## Plugins

- **Bricks**, **ACF** (+ **Pro** for `pfz_case_gallery`), **Automatic.css** — align palette to `v2.css` variables.

---

## Parity notes

- **Site loader / preview-only sections:** Rebuild in Bricks + CSS or optional small HTML + JS; not 1:1 duplicated in PHP yet.
- **Other GSAP sections (branding, websites, process, …):** Extend `pfz-v6-animations.js` or add `[data-pz-fade]` in Bricks until full port.
- **Three.js:** Keep **`npm run sync-wp-vendor-js`** (or **`npm run wp:handoff`**) in your release process and **commit** `assets/js/vendor/` so production stays same-origin; CDN is only a fallback if files are missing.
- **Strict CSP:** If your host blocks third-party scripts, ensure **`assets/js/vendor/`** is deployed and avoid turning off **`PROFUZION_VENDOR_LOCAL`**; halftone still needs **Three** either locally or from jsDelivr unless you disable halftone for that environment.

---

## Related paths

| Path | Purpose |
|------|---------|
| `tools/wordpress/profuzion-brick-child/assets/js/pfz-halftone-hero.js` | Halftone port of `v2/_three/halftone-shader` (preview WebGL module) |
| `tools/wordpress/profuzion-brick-child/assets/js/pfz-v6-animations.js` | Hero + industries GSAP |
| `BRICKS-DEPLOY-KIT.md` | Earlier v5-focused doc (still useful for ACF/CPT steps) |
