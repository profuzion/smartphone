# Profuzion Studio — award-site v2 design reference

**Path:** `project/bricks-build/PROFUZION-V2-DESIGN-REFERENCE.md`  
**Shortcut from repo root:** [`../V2-DESIGN-REFERENCE.md`](../V2-DESIGN-REFERENCE.md)

---

## TL;DR — where things live

| You need | Open |
| --- | --- |
| **This document** | Vision, voice, Liquid Architecture, tokens, type, copy, acts, Seed, checklists, performance/SEO summary |
| **Static full-page preview (browser)** | `profuzion-v2-preview.html` — obsidian/bone/iris, all five acts, DM Serif + JetBrains placeholders |
| **Bricks JSON, full GLSL, enqueue, §42 build** | Master **BRIEF v2.0** (mega-brief in Cursor) — archive as `BRIEF.md` if you want it in Git |
| **Cursor canvas** | `~/.cursor/projects/…/canvases/profuzion-v2-design-preview.canvas.tsx` — IDE-only sketch, not final art |

---

## What this file is / is not

**Is:** The **design and content** source of truth for the scroll-driven, single-scene 3D homepage (award-track mood: obsidian, bone, iris, serif + mono, five acts).

**Is not:** Paste-ready Bricks element JSON, PHP, or shader source strings — those stay in **BRIEF v2.0**. Import JSON in this repo under `src/app/v6/` may still follow the **older** chartreuse / industries site until you regenerate from this reference.

---

## 0. Naming: two different “v2”s in this repo

| Name in repo | What it is | Design system |
| --- | --- | --- |
| **`src/app/v2/`**, `tools/wordpress/profuzion-v2.css`, `pfz-home-layout.css` | Earlier **Next.js / WordPress** bundle (industries, chartreuse) | **Not** Liquid Architecture |
| **This doc + `profuzion-v2-global-classes.css`** | **Award-site** spec | **Authoritative** for the new homepage |

If someone says “v2 CSS in `src`,” assume the **bundle**. “v2 design reference / Liquid Architecture” means **this file**.

---

## 1. Vision and positioning

**One-line pitch:**  
*Profuzion Studio — where ideas overflow into form.*

**Three-line positioning:**  
Profuzion is a digital design atelier. We design the overflow between idea and experience. Working across brand systems, motion, 3D and web, we shape living visual worlds that carry a story from first frame to final interaction.

**Name (dual meaning)**

- **Profusion** — overflow, abundance, blooming.  
- **Fusion** — merging, melding, transformation.

Both read in the hero object (“The Seed”), which **blooms, fuses, flows and settles** with scroll.

**Primary audience**

- Creative directors at ambitious brands  
- Founders of funded startups (Series A–C) who want a world, not a logo  
- Agencies who partner on visual-heavy deliverables  

**Tone:** confident, slightly mystical, never corporate, never precious. Short sentences; verbs carry weight.

**Never-use (voice):**  
*solutions, cutting-edge, bespoke, journey* (except when literal), *passionate*, AI / SaaS clichés.

---

## 2. Brand narrative (copy bible)

| | |
| --- | --- |
| Tagline (primary) | We design the overflow between idea and experience. |
| Tagline (short) | Where ideas overflow into form. |
| Tagline (one word) | Bloom. |

**Core verbs:** spark, bloom, fuse, flow, settle.  
**Core nouns:** seed, current, pool, system, profusion.

**Never-use (copy):**  
solutions, unleash, synergy, innovative, cutting-edge, passionate, disrupt, ecosystem (unless literal), seamless.

**Voice rules**

1. Lead with image, not claim.  
2. Italicize **exactly one word per paragraph** of display copy (final proofread; reconcile early drafts that use two for symmetry).  
3. Mono = **labels only**, uppercase, letter-spacing **0.12em** (see also typo “0.1em” elsewhere — **0.12em wins**).  
4. No closing exclamation marks.  
5. Oxford comma; en-dashes for ranges; em-dashes **without** spaces.

---

## 3. Aesthetic direction — Liquid Architecture

**Phrase:** Solid architectural forms behaving like fluids — translucent, refractive, SSS-style reads. Resin curing in slow motion; pigment in oil.

**Material** — frosted translucent resin, inner glow. *Discipline refs (don’t clone):* Iris van Herpen 3D-printed work, James Turrell Skyspaces, Yuri Suzuki sculptures.

**Light** — one **directional key ~45°, 5600K**; slow **iris-violet rim**; HDRI subtle, desaturated studio.

**Camera** — **35mm equivalent** always. **Shallow DoF** in Acts **3 and 5**; **wide / deep** in Act **2**.

**Post** — bloom only on **iris-accent** reads; **no** film grain; **no** film LUT. Look **digital-pure**.

**Never-use (visual):** chrome, holographic, rainbow gradients, Y2K, fluffy blobs, vaporwave. Prefer **cool, sculptural, editorial**.

**Reference sites (discipline only, never copy surface):**  
igloo.inc · oliviersarfati.com · studio-lumio.com · humanoid.to · dogstudio.com/story/exodus  

**Internal:** there is no Figma in-repo; mood = this doc + reference frames + master brief shaders.

---

## 4. Design tokens (ACSS / CSS variables)

Define **once**; reference via classes (`profuzion-v2-global-classes.css` + BRIEF §13.A).

### Colors

| Token | Value | Use |
| --- | --- | --- |
| `--obsidian` | `#0A0A0B` | Page bg |
| `--obsidian-2` | `#111114` | Raised surfaces |
| `--bone` | `#F2EEE5` | Primary type |
| `--bone-dim` | `rgba(242,238,229,0.6)` | Secondary |
| `--bone-mute` | `rgba(242,238,229,0.35)` | Captions |
| `--iris` | `#6E5BFF` | **Single accent** |
| `--iris-deep` | `#3B2CC9` | Hover / shader interior |
| `--iris-glow` | `rgba(110,91,255,0.35)` | Glow |
| `--amber` | `#F5A524` | **Errors only** |
| `--hair` | `rgba(242,238,229,0.08)` | Hairlines |

### Spacing (8pt grid)

`4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192` → map to ACSS; no one-off px gutters.

### Radius

`--r-xs 2px` · `--r-sm 4px` · `--r-md 8px` · `--r-lg 16px` · `--r-full 999px`

### Elevation

```text
--shadow-1  0 1px 2px rgba(0,0,0,0.5)
--shadow-2  0 10px 40px rgba(0,0,0,0.45)
```

### Motion

```text
--ease-out-expo      cubic-bezier(0.19, 1, 0.22, 1)
--ease-in-out-quint  cubic-bezier(0.86, 0, 0.07, 1)
--ease-out-soft      cubic-bezier(0.33, 1, 0.68, 1)
--dur-fast    160ms
--dur-base    320ms
--dur-slow    640ms
--dur-story  1200ms
```

### Z-index

```text
--z-canvas   0
--z-content  10
--z-nav      40
--z-cursor   80
--z-loader  100
```

### Contrast

Bone on obsidian = primary text. Iris = accents / large type only — **not** long body in iris.

---

## 5. Typography

**Rule: two families only — no sans** (deliberate).

**Display:** PP Editorial New (400 + italic). Dev fallbacks: Editorial New, DM Serif Display.  
**Labels:** JetBrains Mono 400/500, self-hosted woff2.

### Scale (fluid)

```text
--fs-display   clamp(5rem,   11vw, 13rem)   /* Act 2 H */
--fs-hero      clamp(3.5rem,  9vw, 10rem)   /* Act 1 H */
--fs-h2        clamp(2rem,  4.5vw, 4.5rem)
--fs-h3        clamp(1.5rem,2.8vw, 2.5rem)
--fs-body      clamp(1rem,  1.1vw, 1.125rem)
--fs-small     0.875rem
--fs-mono      0.6875rem
```

**Line height:** display **0.95** · body **1.5** · mono **1.4**  
**Tracking:** display **-0.02em** · body **0** · mono (uppercase) **0.12em**

---

## 6. Final homepage copy (ship)

### Act 1 — Spark

- Eyebrow: `PROFUZION — DIGITAL DESIGN ATELIER`  
- Hero: *We design the overflow between* idea *and* experience.  
- Hint: `SCROLL TO BEGIN`

### Act 2 — Bloom

- Headline: *Ideas* bloom *in profusion.*  
- Deck: We are a digital design atelier. We shape brand, motion and space into systems that feel alive — the kind of worlds that carry a story from first frame to final click.  
- Rail: `BRAND · MOTION · 3D · WEB · SPATIAL`

### Act 3 — Fusion

- Label: `SELECTED WORK — 2024—2026`  
- **Meridian** — A calendar reimagined as a tool for focus. — *“They gave our product a pulse.” — Rea Kapoor, CEO* — 2025 · Brand, Product, Motion · San Francisco.  
- **Halcyon** — An audio studio's first permanent identity. — *“It sounds like our music looks.” — Jules Marchand* — 2025 · Brand, 3D · Paris.  
- **Northfield Press** — Three hundred years of print, finally legible. — *“Our archive feels current again.” — The editors* — 2024 · Editorial, Web · London.

### Act 4 — Current

- Label: `CAPABILITIES`  
- 01 **BRAND SYSTEMS** — Identities that behave like products, not posters.  
- 02 **MOTION & FILM** — Thirty-second stories that do the work of thirty pages.  
- 03 **3D & SPATIAL** — Worlds that survive contact with the real.  
- 04 **WEB PLATFORMS** — Sites you actually want to come back to.  
- 05 **CREATIVE DIRECTION** — A partner in the room when it matters.

### Act 5 — Invitation

- Headline: *What will you* grow *here?*  
- Input: `Your email` · Submit: `Begin` · Success: *We'll be in touch within two working days.*

### Footer

- Left: Profuzion Studio · [Address]  
- Center: hello@profuzion.studio · instagram · are.na · linkedin  
- Right: © 2026 Profuzion Studio · Built with care in-house.

---

## 7. Five-act scroll choreography

| Act | Progress (page 0→1) | Height | HTML beat | Seed / 3D |
| --- | --- | --- | --- | --- |
| 1 Spark | 0.00–0.12 | 100vh | Eyebrow, H1, hint; fade out | Tiny iris pinpoint; drift |
| 2 Bloom | 0.12–0.34 | 200vh | SplitText headline; rail | Pull back; spark→bloom |
| 3 Fusion | 0.34–0.62 | 300vh | 3 projects ~100vh | Orbit in; DoF narrow; tower; color keys |
| 4 Current | 0.62–0.84 | 200vh | Services + hover targets | Low angle; ribbon; mouse bend |
| 5 Invitation | 0.84–1.00 | 100vh | Form | Top-down; pool; ripple on submit |

**Camera:** Catmull–Rom path along scroll, **35mm** equivalent, eased — no jitter.

**Post (v1.1+):** iris-only bloom ramp; still **no** grain / film LUT.

---

## 7b. The Seed — art direction

One sculpt, not a mascot. Five reads: **spark · bloom · fusion · current · pool**.

| Stage | Read | Silhouette |
| --- | --- | --- |
| Spark | Tight energy | Near-point / tiny sphere |
| Bloom | Organic burst | Petal-like shells |
| Fusion | Architecture | Stepped vertical tower |
| Current | Flow | Elongated ribbon / loop |
| Pool | Rest | Flat disc, subtle ripple |

**Material:** frosted resin / dense glass — **Fresnel rim**, **inner iris glow**, **not** chrome. Optional caustics texture — subtle.

**Delivery:** `seed.glb` (Draco, under 500KB, morph targets) **or** procedural icosphere + **custom ShaderMaterial** (no `MeshPhysicalMaterial` swap for “speed”).

---

## 7c. Page shell (layers)

Bottom → top: **`stage`** (fixed WebGL, `aria-hidden`) → **`content`** (acts; default `pointer-events: none`; links/buttons/inputs re-enabled) → **`nav`** → **`cursor`** / **`loader`**.

**Reduced motion:** no Lenis smoothing; shader time still; camera parked; no SplitText; same story beats.

---

## 7d. Reference sites — absorb, don’t clone

| Site | Takeaway |
| --- | --- |
| igloo.inc | Restraint, type-led confidence |
| oliviersarfati.com | Editorial pacing |
| studio-lumio.com | Light & material calm |
| humanoid.to | Grid precision |
| dogstudio.com/story/exodus | Long scroll, scene continuity |

---

## 8. Shader uniforms (designer ↔ dev)

What scroll / interaction drives (full code in BRIEF §29–30):

| Uniform | Role |
| --- | --- |
| `uProgress` | Full page scroll **0→1** |
| `uAct` | Continuous act index **0→4** (fractional between acts) |
| `uTime` | Slow breath; **0** if reduced-motion |
| `uMouse` | NDC **-1…1** — ribbon bend in Act 4 |
| `uRipple` | **0→1** pulse after form submit (decays in JS) |
| `uColorA/B/C` | Obsidian / iris / bone (tint narrative) |

---

## 9. Performance & ship (targets)

| Metric | Target |
| --- | --- |
| LCP | under 2.5s |
| CLS | under 0.05 |
| INP | under 200ms |
| FPS | 60 M1-class desktop; 45+ mid laptop; 30+ mid Android |
| JS (gzip) | under ~250KB first load (libs + site) |
| GLB | under 500KB |
| Page weight | under ~2MB |
| Lighthouse perf | 90+ (target) |

Techniques: cap DPR (~1.5), conditional canvas on front page only, defer analytics, cache CDN assets, compressed media.

---

## 10. SEO / social (Rank Math)

- **Title:** Profuzion Studio — Digital Design Atelier  
- **Description:** We design the overflow between idea and experience. A digital design atelier working in brand, motion, 3D and web.  
- **OG:** 1200×630, obsidian field, wordmark + one **Seed** frame; test in Slack / iMessage / LinkedIn.  
- **Schema:** Organization + WebSite; case studies as CreativeWork / Article as needed.

---

## 11. Sign-off checklist

- [ ] No sans in UI typography (stacks may fall back to system serif/monospace only as last resort).  
- [ ] Iris = meaningful moments only — not body paragraphs.  
- [ ] Display copy: one italic / paragraph after proofread.  
- [ ] Mono = labels, uppercase + tracking.  
- [ ] No banned vocabulary (§2).  
- [ ] 3D = resin / frost / editorial — not chrome or rainbow.  
- [ ] All layout/styles from **global classes** — no Bricks panel overrides / `_cssCustom`.  
- [ ] Custom **shader** ships — not a default physical material substitute.

---

**End — design reference.** For Bricks JSON trees, full GLSL includes, Code Element paste, and §42 build order, use the **BRIEF v2.0** mega-document.
