# Profuzion Studio — Homepage

Award‑lane brand homepage for **Profuzion Studio**. Built with a stack curated
for cinematic scroll experiences, 3D, and editorial typography.

## Stack

| Layer                | Tool                                                                    |
| -------------------- | ----------------------------------------------------------------------- |
| Framework            | **Next.js 16** (App Router) · **React 19** · **TypeScript**             |
| Styling              | **Tailwind CSS v4** + custom design tokens (see `src/app/globals.css`)  |
| Smooth scroll        | **Lenis** (synced with GSAP ticker)                                     |
| Animation            | **GSAP 3** · `ScrollTrigger` · `SplitText` · `@gsap/react`              |
| 3D / WebGL           | **Three.js** · `@react-three/fiber` · `drei` · `postprocessing`         |
| UI motion            | **Motion** (Framer Motion successor) — for micro-interactions           |
| Tooling              | ESLint · Prettier + `prettier-plugin-tailwindcss` · Turbopack           |

## Folder structure

```
src/
  app/                  Next.js App Router (layout, page, globals)
  components/
    layout/             Nav, Footer, chrome
    sections/           Hero, Marquee, Manifesto, Services, Work...
    three/              R3F scenes, shared Canvas wrapper
  content/              Central content config (copy, nav, social)
  hooks/                Small reusable hooks
  lib/                  utils, gsap registration
  providers/            Lenis smooth-scroll provider
public/
  renders/              Blender-exported PNGs (hero & case-study art)
  models/               GLB/GLTF assets for R3F
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
npm run dev      # Start dev server (Turbopack) — http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Lint
```

## Building the site

1. **Hero** — placeholder ambient gradient now; drop an R3F <Canvas/>
   rendering `FloatingOrb` or the exported Blender GLB to finish.
2. **Work** — currently previews the existing glass‑sphere renders in
   `public/renders/`. Replace with real case studies.
3. **3D integration** — import the Blender output as `.glb` into
   `public/models/` then load via drei's `useGLTF`.
4. **Motion language** — all scroll animations are registered via
   `@gsap/react`'s `useGSAP` so they auto-cleanup and sync with Lenis.

## Principles

- **Performance is design.** Heavy renders lazy-load, dpr auto-scales.
- **Accessibility isn't optional.** Reduced-motion disables smooth scroll
  and any scroll-scrubbed timelines; focus states are visible.
- **Type safety end-to-end.** Strict TS, no `any` drift.
