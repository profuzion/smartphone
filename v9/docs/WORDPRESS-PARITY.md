# Design preview v2 → WordPress / Bricks — what converts and what does not

There is **no automatic** path that turns this **preview codebase** (TypeScript UI, WebGL helpers, GSAP) into WordPress. You **rebuild** the experience in **Bricks** (layout, content) and optionally reattach **behaviour** with **vanilla JS** in a child theme. This document is the parity map.

---

## Honest summary

| Layer in v2 | In WordPress / Bricks |
|-------------|------------------------|
| **File-based routes, layouts, page modules** | **No direct equivalent.** Use **Pages/Templates** in Bricks (header, footer, single, archive). |
| **Utility-class styling** (v2 uses minimal utilities; mostly `v2.css`) | **ACSS** for tokens/spacing + **BEM** global classes, or enqueue the same **`.pfz` CSS** (see `profuzion-v6-wp-bundled.css`). |
| **`v2.css` (tokens, `.btn--*`, `.pfz-card`, …)** | **Yes — portable as plain CSS.** Enqueue `profuzion-v6-wp-bundled.css` and add wrapper class **`pfz`** on `body` or `main`. Color tokens: **`--primary`**, `--base`, `--secondary`, … (align with ACSS). |
| **GSAP + ScrollTrigger inside the preview app** | **Rewrite** as one **footer** script: load **GSAP + ScrollTrigger**, `gsap.registerPlugin(ScrollTrigger)`, target **IDs / classes** you set in Bricks. Same *effect* is achievable; wiring differs. |
| **WebGL halftone (shader in the preview stack)** | **Not Bricks-native.** Options: (a) **`<canvas>` + three.js** in a child theme JS bundle; (b) **simpler** CSS gradient / static image / Lottie; (c) **iframe** to a small static page that only runs the shader. |
| **Custom cursor** | **Port to vanilla JS + CSS** (position fixed div, `pointermove`, `cursor: none` on `.pfz`). Enqueue in child theme. |
| **Code-splitting / server rendering in the preview app** | N/A for WP front. **Bricks** outputs HTML; “dynamic” = **PHP / ACF / Bricks dynamic tags**. |
| **Contact form env (iframe / POST)** | **Bricks Form** or plugin; no change to the porting story. |

---

## Files in this folder

| File | Use |
|------|-----|
| **`profuzion-brick-child/`** | **Bricks child theme** — `functions.php` enqueues `assets/css/profuzion-v6-wp-bundled.css`, cursor + GSAP + optional **Three.js** halftone + **pfz-v6-animations.js**, and adds **`pfz`** + **`pfz-v6`** to `body_class`. |
| **`profuzion-brick-child/assets/css/profuzion-v6-wp-bundled.css`** | Google Fonts + full Profuzion utility CSS (mirror of `src/app/v2/v2.css` with WP font variables). |
| **`profuzion-brick-child/includes/cpt-case-study.php`** | Registers **`pfz_case_study`** CPT; archive/singles at **`/work/...`**. |
| **`profuzion-brick-child/acf-json/group_pfz_case_study_2026.json`** | ACF field group (sync in WP) for case study posts — **free ACF**-friendly (no repeaters). |
| **`BRICKS-DEPLOY-KIT.md`** | **End-to-end checklist** — **`npm run wp:handoff`**, imports, ACF sync, permalinks. |
| **`GLOBAL-CLASSES-BRICKS.md`** | **BEM class → Bricks element** map for homepage + **`pfz-case`** template. |
| **`src/app/v2/profuzion-v2-bricks-case-import.json`** | Bricks machine import for **case study** layout (sample: Nature's Knoll). Regenerate: **`npm run bricks:import`** or **`npm run wp:handoff`**. |
| **`WORDPRESS-PARITY.md`** | This map. |
| **`BEM-FOUNDATION.md`** | BEM (bem.info) + how **`pfz`** / **`pfz-*`** map to **Bricks** global classes with **ACSS**. |

---

## Suggested order of work

1. **Bricks** structure + **ACF** content (you’re doing this).  
2. **Activate the child theme** `profuzion-brick-child` (it enqueues bundled CSS, adds **`pfz`** + **`pfz-v6`** to `body`, cursor + GSAP + Three halftone + v6 animations).  
3. Apply **`pfz-*`**, **`btn` / `btn--*`** on Bricks wrappers (or map ACSS tokens to the same values as in `.pfz`).  
4. **GSAP / motion:** use `data-pz-fade` on wrappers, or edit `assets/js/motion.js` in the child theme for custom timelines.  
5. **WebGL halftone (optional):** last; highest effort (see table above).

---

## Why not “convert everything” in one tool

WordPress runs **PHP + HTML in the admin/builder**; it does not execute **authoring-format UI bundles** or **package-managed dependencies** from this repo. Anything that is **component-based** in the preview must become **static markup + enqueued scripts**. That is a **manual** port with this repo as the **source of truth**, not a button.

For **copy/JSON/sections**, you have `src/app/v2/BRICKS-COPY-PASTE.md`, **`profuzion-v2-bricks-import.json`** (homepage), and **`profuzion-v2-bricks-case-import.json`** (case study). Run **`npm run wp:handoff`** from the project root to refresh CSS + JSON exports — then follow **`BRICKS-DEPLOY-KIT.md`**.
