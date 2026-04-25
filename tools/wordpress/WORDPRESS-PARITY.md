# Next v2 → WordPress / Bricks — what “converts” and what does not

There is **no automatic** path that turns this **Next.js + React + R3F + GSAP** repo into WordPress. You **rebuild** the experience in **Bricks** (layout, content) and optionally reattach **behaviour** with **vanilla JS** in a child theme. This document is the parity map.

---

## Honest summary

| Layer in v2 | In WordPress / Bricks |
|-------------|------------------------|
| **Next.js App Router, `page.tsx`, layouts** | **No equivalent.** Use **Pages/Templates** in Bricks (header, footer, single, archive). |
| **Tailwind** (v2 uses minimal utilities; mostly `v2.css`) | **ACSS** for tokens/spacing + **BEM** global classes, or enqueue the same **`.profuzion-v2` CSS** (see `profuzion-v2-wp-bundled.css`). |
| **`v2.css` (tokens, `.p-btn`, `.p-card`, …)** | **Yes — portable as plain CSS.** Enqueue `profuzion-v2-wp-bundled.css` and add wrapper class `profuzion-v2` on body or main. |
| **GSAP + ScrollTrigger + `@gsap/react`** | **Rewrite** as one **footer** script: load **GSAP + ScrollTrigger** from CDN, `gsap.registerPlugin(ScrollTrigger)`, target **IDs / classes** you set in Bricks. Not 1:1 with React hooks; same *effect* is achievable. |
| **WebGL halftone (`@react-three/fiber`, shader)** | **Not Bricks-native.** Options: (a) **`<canvas>` + three.js** in a child theme JS bundle; (b) **simpler** CSS gradient / static image / Lottie; (c) **iframe** to a small static page that only runs the shader. |
| **Custom cursor component** | **Port to vanilla JS + CSS** (position fixed div, `pointermove`, `cursor: none` on `.profuzion-v2`). Enqueue in child theme. |
| **Next `dynamic()` / SSR** | N/A for WP front. **Bricks** outputs HTML; “dynamic” = **PHP / ACF / Bricks dynamic tags**. |
| **Contact form env (iframe / POST)** | **Bricks Form** or plugin; no change to the porting story. |

---

## Files in this folder

| File | Use |
|------|-----|
| **`profuzion-brick-child/`** | **Bricks child theme** — `functions.php` enqueues `assets/css/profuzion-v2-wp-bundled.css`, `assets/js/cursor.js`, GSAP + `assets/js/motion.js`, and adds the `profuzion-v2` body class. See `profuzion-brick-child/README-INSTALL.md`. |
| **`profuzion-brick-child/assets/css/profuzion-v2-wp-bundled.css`** | Google Fonts + full v2 utility CSS (mirror of `src/app/v2/v2.css` with WP font variables). |
| **`WORDPRESS-PARITY.md`** | This map. |

---

## Suggested order of work

1. **Bricks** structure + **ACF** content (you’re doing this).  
2. **Activate the child theme** `profuzion-brick-child` (it enqueues bundled CSS, adds `profuzion-v2` to `body`, and loads cursor + GSAP motion).  
3. Apply **BEM / `p-*` classes** on Bricks wrappers (or map ACSS tokens to the same hex as `--p-*`).  
4. **GSAP / motion:** use `data-pz-fade` on wrappers, or edit `assets/js/motion.js` in the child theme for custom timelines.  
5. **WebGL halftone (optional):** last; highest effort (see table above).

---

## Why not “convert everything” in one tool

WordPress runs **PHP + HTML in the admin/builder**; it does not execute **React** or **npm packages** from this repo. Anything that is **components + hooks** must become **static markup + enqueued scripts**. That is a **manual** port with this repo as the **source of truth**, not a button.

For **copy/JSON/sections**, you already have `src/app/v2/BRICKS-COPY-PASTE.md` and `profuzion-v2-bricks-import.json` in the app folder.
