# Profuzion — Bricks child theme (install)

## Requirements

- WordPress 6.x+
- **Bricks** parent theme installed and active folder name: `bricks` (if your host renames it, change `Template:` in `style.css` to match).
- This folder uploaded to `wp-content/themes/profuzion-brick-child/`.

## Install

1. Zip this directory or copy it into `wp-content/themes/`.
2. In **Appearance → Themes**, activate **Profuzion (Bricks child)**.
3. The child theme adds `profuzion-v2` to the `<body>` class, enqueues:
   - `assets/css/profuzion-v2-wp-bundled.css` (Manrope, Instrument Serif, JetBrains Mono + v2 tokens/utilities)
   - `assets/js/cursor.js` (custom cursor; hidden on touch and below 1024px width)
   - GSAP 3.12.5 + ScrollTrigger from CDN, then `assets/js/motion.js` for elements with `data-pz-fade` (use CSS-only `.p-fadeup` if you do not want GSAP on that block).

## Bricks content

- Import the generated pack: `src/app/v2/profuzion-v2-bricks-import.json` (from this repo) via Bricks **Template Library** import, or follow `src/app/v2/BRICKS-COPY-PASTE.md`.
- Map links (`#top`, `#contact`, …) and forms in the builder. Replace the “Hero shader / dev note” section when you are done.

## Interactions

- **Cursor labels:** on any element, add `data-cursor` and optional `data-cursor-label="VIEW"`.
- **Scroll motion:** add `data-pz-fade` to a block wrapper, or class `p-fadeup` (CSS also defines a one-shot keyframe; GSAP wins when motion script runs).

## Parity

See `../../WORDPRESS-PARITY.md` in this repo for what does not port 1:1 (WebGL halftone, React, etc.).

## Updating styles from the Next app

`profuzion-v2-wp-bundled.css` is hand-synced with `src/app/v2/v2.css`. After changing tokens or utilities in Next, copy the non-font preamble into the bundled file or regenerate using your own script.
