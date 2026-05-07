# Profuzion v5 → Bricks / WordPress — deploy kit (no blank page)

**Current production handoff: [BRICKS-DEPLOY-KIT-V6.md](./BRICKS-DEPLOY-KIT-V6.md)** — v2 parity with **Three.js halftone + GSAP** in the child theme (**`wp:handoff`** targets v6 CSS + v6 Bricks JSON).

---

# (Archive / v5 reference below)

Follow this order. **Everything referenced already exists in this repo** — you install, import, sync, and map — you are not inventing structure from scratch.

**v5** is the current handoff: same visual tokens as **`src/app/v2/v2.css`**, but **Bricks** owns layout, **ACF Pro** supplies the gallery field (plus free-field parity), **ACSS** supplies framework utilities (align palette/spacing to those tokens — see `BEM-FOUNDATION.md`). **Header** and **footer** ship as **separate Bricks template JSON** files.

---

## 0. One command from the project root (handoff bundle)

From the **project root** — the directory that contains **`package.json`** (e.g. `E:\PFS\Projects\Cursor\project`), **not** your Windows user folder:

```bash
cd E:\PFS\Projects\Cursor\project
npm run wp:handoff
```

(Use your actual project path; **pnpm** / **yarn** equivalents work if you mirror the same script names.)

If you see **`ENOENT` / Could not read package.json**, your shell is in the wrong directory; `cd` to the project first.

This:

1. **Mirrors CSS** — `src/app/v2/v2.css` → **`profuzion-v6-wp-bundled.css`** in the child theme (and **`profuzion-v5-wp-bundled.css`**, **`profuzion-v2-wp-bundled.css`** mirrors in the same run).
2. **Mirrors vendor JS** — GSAP + ScrollTrigger + Three into **`profuzion-brick-child/assets/js/vendor/`**.
3. **Regenerates Bricks JSON** — v6 header/footer/home/case plus legacy v2/v5 home/case paths (see **BRICKS-DEPLOY-KIT-V6.md** for what to import in production).

---

## 1. WordPress + plugins

- WordPress **6.x+**
- **Bricks** (parent theme; default folder name `bricks` — or edit `Template:` in child `style.css`)
- **Advanced Custom Fields PRO** — required for **`pfz_case_gallery`** (Gallery field). Other case fields still work on free ACF if you omit gallery until licensed.
- **Automatic.css** — configure palette/spacing to match `v2.css` tokens (`--primary`, `--base`, …). Use ACSS **`btn`**, **`btn--primary`**, spacing, and type utilities on Bricks nodes; keep Profuzion **BEM** blocks (`pfz-*`) per `GLOBAL-CLASSES-BRICKS.md`.

---

## 2. Install the child theme (pre-wired CSS/JS)

**Option A — SSH from your PC (automated):** see **`tools/wordpress/DEPLOY-CLOUDWAYS.md`** and `scripts/deploy-cloudways.ps1` (requires OpenSSH Client + Cloudways Master Credentials).

**Option B — Manual:**

1. Copy **`tools/wordpress/profuzion-brick-child/`** to `wp-content/themes/profuzion-brick-child/` (or zip that folder and upload).
2. **Appearance → Themes** — activate **Profuzion (Bricks child)**.
3. Confirm:
   - `body` has classes **`pfz`** and **`pfz-v6`**
   - **`profuzion-v6-wp-bundled.css`** loads in view source (primary bundle; v5/v2 mirrors are also updated when you run `wp:handoff`).

**Includes:**

- `includes/cpt-case-study.php` — registers **`pfz_case_study`** CPT with archive slug **`work`** (URLs like `/work/natures-knoll/` if you set the post slug).
- `acf-json/group_pfz_case_study_2026.json` — field group for that CPT (**Sync** in ACF). Includes **`pfz_case_gallery`** when using **ACF Pro**.

---

## 3. Flush permalinks

**Settings → Permalinks** → Save (twice if needed) so **`work`** URLs resolve.

---

## 4. Sync ACF field group

1. **Custom Fields** → **Field Groups**.
2. You should see **Profuzion — Case study** with **Sync available** — **Sync** it (loads from `acf-json/group_pfz_case_study_2026.json`).
3. If it does not appear, use **Import** and point at that JSON file, or import the JSON via ACF tools.

Without **ACF Pro**, WordPress will not register the **Gallery** field type — sync still works for text/URL fields; add Pro before relying on **`pfz_case_gallery`**.

Fill **one sample post** (Nature's Knoll) using the copy in `src/app/v2/BRICKS-COPY-PASTE.md` § Case study, or paste from `src/content/projects.ts`.

---

## 5. Import Bricks templates

**Current production imports:** **`src/app/v6/profuzion-v6-bricks-*-import.json`** — follow **`BRICKS-DEPLOY-KIT-V6.md`** for order and IDs. The table below lists **v5** paths for archive / comparison.

### v5 paths (reference)

| File | Use |
|------|-----|
| `src/app/v5/profuzion-v5-bricks-header-import.json` | **Header** — sticky nav structure; set template type **Header** in Bricks after import. |
| `src/app/v5/profuzion-v5-bricks-footer-import.json` | **Footer** — ink band + columns; set template type **Footer**. |
| `src/app/v5/profuzion-v5-bricks-home-import.json` | **Homepage body** — sections + HTML IDs (`#top`, `#industries`, …). Does **not** include header/footer. |
| `src/app/v5/profuzion-v5-bricks-case-import.json` | **Case study** layout; sample copy = Nature's Knoll; gallery note references **`pfz_case_gallery`**. |

**Bricks → Templates → Import** (or Library import — depends on Bricks version).

If import **fails** on version mismatch: export one dummy section from your Bricks install, compare top-level keys, adjust `"version"` in the JSON (see comment in `BRICKS-COPY-PASTE.md`).

**Legacy v2 paths** (same generated body/case content): `src/app/v2/profuzion-v2-bricks-import.json`, `profuzion-v2-bricks-case-import.json` — still written for backwards compatibility.

---

## 6. Assign BEM / ACSS classes in Bricks

Open **`tools/wordpress/GLOBAL-CLASSES-BRICKS.md`** for the full class map. Imports pre-fill **CSS classes** on many elements (`_cssClasses`); refine spacing and layout in Bricks (padding, grid) or add **ACSS** utilities in the same **CSS classes** field. Prefer **ACSS** utilities for grids and **`btn`** variants where they match `v2.css`. Avoid WP/Bricks **Custom CSS** boxes for Profuzion styling — use classes + bundled CSS.

---

## 7. Wire dynamic data (case single)

On your **single template** for `pfz_case_study`:

- Map headings and text to **ACF** fields (field names prefixed `pfz_case_…` — see ACF group).
- **Featured Image** → hero.
- **Gallery** — Bricks **Gallery** (or images loop) → **ACF Pro** field **`pfz_case_gallery`**.

---

## 8. Header / footer (v5)

- Import **`profuzion-v5-bricks-header-import.json`** and **`profuzion-v5-bricks-footer-import.json`** as separate **Bricks templates** (types **Header** / **Footer**).
- Assign them in **Bricks → Settings** so all pages use the same shell; **case single** can override with a header variant (logo → home, “Selected work” → `/work/`) if you duplicate the header template in Bricks.

---

## 9. Forms & SMTP

Replace placeholder contact block with **Bricks Form** or plugin; configure SMTP. Copy for fields is in `BRICKS-COPY-PASTE.md` § Contact.

---

## 10. What stays preview-only (optional later)

| Feature | WordPress approach |
|---------|-------------------|
| WebGL halftone hero | Static image, video, iframe, or custom canvas in child theme — see `WORDPRESS-PARITY.md` |
| Full GSAP parity | `data-pz-fade` + child theme `motion.js` |

---

## 11. In-browser preview (local)

Route **`/v5`** reuses v2 sections and **`v2.css`** so local visuals stay aligned with the WordPress token file while you build in Bricks.

---

## File index

| Path | Purpose |
|------|---------|
| `tools/wordpress/DEPLOY-CLOUDWAYS.md` | **SSH/SCP** deploy steps + `scripts/deploy-cloudways.ps1` |
| `tools/wordpress/WORDPRESS-PARITY.md` | What does / doesn’t port 1:1 |
| `tools/wordpress/BEM-FOUNDATION.md` | BEM + ACSS contract |
| `tools/wordpress/GLOBAL-CLASSES-BRICKS.md` | Class → element map |
| `src/app/v2/BRICKS-COPY-PASTE.md` | All **plain text** + IDs |
| `src/app/v5/profuzion-v5-bricks-header-import.json` | Bricks **header** machine import |
| `src/app/v5/profuzion-v5-bricks-footer-import.json` | Bricks **footer** machine import |
| `src/app/v5/profuzion-v5-bricks-home-import.json` | Bricks homepage **body** import |
| `src/app/v5/profuzion-v5-bricks-case-import.json` | Bricks case study import |
| `tools/wordpress/profuzion-brick-child/` | Child theme + bundled CSS + CPT + ACF JSON |

---

*Run **`npm run wp:handoff`** before every WordPress deploy so CSS, vendor JS, and JSON exports match the latest source.*
