# Profuzion Studio — Homepage

Award‑lane brand homepage for **Profuzion Studio**. Built with a stack curated
for cinematic scroll experiences, 3D, and editorial typography.

## Stack

| Layer         | Tool |
| ------------- | ---- |
| Application   | **TypeScript** UI (see `package.json` for runtime and UI dependencies) |
| Styling       | Token-driven CSS (`src/app/globals.css`, route-level stylesheets) |
| Smooth scroll | **Lenis** (synced with GSAP ticker) |
| Animation     | **GSAP 3** · `ScrollTrigger` · `SplitText` · UI animation helpers |
| 3D / WebGL    | **Three.js** · scene helpers · post-processing |
| UI motion     | **Motion** — micro-interactions |
| Tooling       | ESLint · Prettier · bundled dev tooling |

## Folder structure

```
src/
  app/                  Route modules (layout, page, globals)
  components/
    layout/             Nav, Footer, chrome
    sections/           Hero, Marquee, Manifesto, Services, Work...
    three/              WebGL scenes, shared Canvas wrapper
  content/              Central content config (copy, nav, social)
  hooks/                Small reusable hooks
  lib/                  utils, gsap registration
  providers/            Lenis smooth-scroll provider
public/
  renders/              Blender-exported PNGs (hero & case-study art)
  models/               GLB/GLTF assets for WebGL
```

## Design tokens

Brand tokens live in `src/app/globals.css` under `@theme`. Core palette:

- `obsidian` `#0B0B0F` · base
- `graphite` `#14141B` · elevated surface
- `vellum` `#F4F1EA` · paper
- `fusion` `#FF4D1F` · signature accent
- `plasma` `#7C3AED` · secondary accent

Typography: **Instrument Serif** (display), **Inter** (body), **Geist Mono**.

## Commands

```bash
npm run dev        # Local preview
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint
npm run wp:handoff # WordPress: sync v6 CSS + vendor JS + Bricks JSON (run before every deploy)

# Cloudflare (OpenNext — full Next.js on Workers; see below)
npm run cf:build    # Build worker bundle (.open-next/)
npm run cf:preview # Build + run in local Workers runtime (workerd)
npm run cf:deploy  # Build + deploy (needs `wrangler login` and account)
```

**Cloudflare:** This app is a full-stack Next.js app (`/api/contact`, SSG routes). Cloudflare’s supported path is **[Workers + `@opennextjs/cloudflare`](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)**, not a static **Pages** export.

1. Install [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (already a dev dependency) and run `npx wrangler login` once.
2. Set secrets for production contact email: `npx wrangler secret put RESEND_API_KEY` (and optionally `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`).
3. Run `npm run cf:deploy` — ships to the Worker named **`profuzion-studio`** in `wrangler.jsonc`. Attach a custom domain under **Workers & Pages** → your worker → **Triggers** → **Custom Domains**.
4. CI: use **[Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)** or GitHub Actions with build command `npm run cf:build` / deploy `npm run cf:deploy`; provide the same env vars Cloudflare needs at build time ([OpenNext env guide](https://opennext.js.org/cloudflare/howtos/env-vars)).

Canonical URLs in `src/content/site.ts` use `https://profuzionstudio.com`; update `site.url` (or move it to an env) when pointing a workers.dev preview at SEO metadata.

Other script names are in **`package.json`**.

## WordPress / Bricks (v2 handoff)

**Deploy kit (v6):** `tools/wordpress/BRICKS-DEPLOY-KIT-V6.md` — **Three.js halftone** + **GSAP**, Bricks header/footer/home/case, **ACF Pro**, CPT, BEM + ACSS. Run **`npm run wp:handoff`** before deploy. Older notes: `BRICKS-DEPLOY-KIT.md`.

1. **Hero** — placeholder ambient gradient now; add a WebGL `<canvas>` / scene when ready.
2. **Work** — currently previews the existing glass‑sphere renders in
   `public/renders/`. Replace with real case studies.
3. **3D integration** — import Blender output as `.glb` into
   `public/models/` then load in-scene.
4. **Motion language** — scroll timelines are registered with GSAP helpers so they auto-cleanup and sync with Lenis.

## Principles

- **Performance is design.** Heavy renders lazy-load, dpr auto-scales.
- **Accessibility isn't optional.** Reduced-motion disables smooth scroll
  and any scroll-scrubbed timelines; focus states are visible.
- **Type safety end-to-end.** Strict TS, no `any` drift.
