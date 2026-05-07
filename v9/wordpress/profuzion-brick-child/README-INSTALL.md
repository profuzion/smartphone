# Profuzion — Bricks child theme (install)

## Before you upload (strongly recommended)

From the **design repository** root (where `package.json` lives), run:

```bash
npm run wp:handoff
```

Then zip or copy **this entire folder**, including **`assets/js/vendor/*.min.js`**. WordPress expects those files for same-origin GSAP/Three; without them the theme falls back to CDNs (or halftone may load Three from jsDelivr).

## Requirements

- WordPress 6.x+
- **Bricks** parent theme installed and active folder name: `bricks` (if your host renames it, change `Template:` in `style.css` to match).
- This folder uploaded to `wp-content/themes/profuzion-brick-child/`.

## Install

1. Zip this directory or copy it into `wp-content/themes/`.
2. In **Appearance → Themes**, activate **Profuzion (Bricks child)**.
3. The child theme adds **`pfz`** / **`pfz-v6`** on `<body>`, and enqueues **only files from this theme** (no preview-site bundles):
   - `assets/css/profuzion-v6-wp-bundled.css` (Manrope, Instrument Serif, JetBrains Mono + v2 tokens/utilities)
   - `assets/js/cursor.js` (custom cursor; hidden on touch and below 1024px width)
   - **`assets/js/vendor/gsap.min.js`** + **`ScrollTrigger.min.js`** when present (run **`npm run sync-wp-vendor-js`** — or **`npm run wp:handoff`**, which includes that step — before zipping/deploying; otherwise GSAP falls back to cdnjs)
   - `assets/js/motion.js` for `data-pz-fade` (use CSS-only **`.pfz-fadeup`** if you do not want GSAP on that block)
   - `assets/js/pfz-v6-animations.js` for hero + industries hooks when **`PROFUZION_V6_SCROLL_ANIMS`** is `true`
   - Three + `pfz-halftone-hero.js` on the front page by default (filter **`profuzion_enqueue_halftone`**; constants in `functions.php`)

## Bricks content

- **One command** from the design repository: **`npm run wp:handoff`** (see `package.json`) — syncs bundled CSS, copies **vendor JS** into `assets/js/vendor/`, and regenerates Bricks JSON (v6).
- **v6 deploy kit:** `tools/wordpress/BRICKS-DEPLOY-KIT-V6.md` — import **`src/app/v6/profuzion-v6-bricks-*-import.json`** (header, footer, home, case).
- **Deploy checklist (legacy v5 notes):** `tools/wordpress/BRICKS-DEPLOY-KIT.md`.
- Map links (`#top`, `#contact`, …) and forms in the builder. Replace the “Hero shader / dev note” section when you are done.

## Case studies (CPT + ACF)

- After activation, **flush permalinks** (Settings → Permalinks → Save).
- **Case studies →** add posts; **slug** becomes the URL under `/work/your-slug/`.
- **ACF:** Custom Fields → sync **Profuzion — Case study** from `acf-json/` (or import `group_pfz_case_study_2026.json`).

## Interactions

- **Cursor labels:** on any element, add `data-cursor` and optional `data-cursor-label="VIEW"`.
- **Scroll motion:** add `data-pz-fade` to a block wrapper, or class **`pfz-fadeup`** (CSS also defines a one-shot keyframe; GSAP wins when motion script runs).

## Parity

See `../../WORDPRESS-PARITY.md` in this repo for what does not port 1:1 (WebGL halftone, preview-only UI, etc.).

## Updating styles from the design repository

`profuzion-v6-wp-bundled.css` is synced with `src/app/v2/v2.css` via **`npm run sync-v6-wp-css`** or **`npm run wp:handoff`** from the project root. Vendor libraries: **`npm run sync-wp-vendor-js`**. Toggles in `functions.php`: **`PROFUZION_VENDOR_LOCAL`**, **`PROFUZION_V6_SCROLL_ANIMS`**, **`PROFUZION_V6_HALFTONE_DEFAULT`**, and filter **`profuzion_enqueue_halftone`**.
