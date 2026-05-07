# Profuzion v9 — static preview + WordPress / Bricks handoff

Self-contained bundle for **local browser preview** and **Bricks + child theme** deployment. Paths below are relative to this `v9/` folder.

## Layout

| Path | Purpose |
|------|--------|
| **`preview/`** | Vanilla HTML/CSS/JS comp (`pfz-v2-wp-preview.html` + `pfz-v2-wp.css` + `pfz-v2-wp.js` + `media/`). Serve this folder locally. |
| **`wordpress/profuzion-brick-child/`** | Full **Profuzion** child theme — copy to `wp-content/themes/profuzion-brick-child/` on the server. |
| **`wordpress/profuzion-v2-wp-bundled.css`** | Same bundle as in the child theme `assets/css/` (reference / diff). |
| **`wordpress/profuzion-v2-flat.css`** | Flat CSS mirror without Google Fonts `@import` in the header (optional reference). |
| **`bricks-import/`** | Machine imports for **Bricks → Templates → Import**: `profuzion-v2-bricks-import.json` (home body), `profuzion-v2-bricks-case-import.json` (case study). |
| **`docs/`** | Deploy kit, BEM/ACSS class map, copy-paste notes (`BRICKS-COPY-PASTE-v2.md`), parity and Cloudways docs. |
| **`scripts/sync-v2-wp-css.mjs`** | Copy of the monorepo sync script — **run from the main `project/` repo** with `npm run sync-v2-wp-css` if you edit `src/app/v2/v2.css`, then copy the generated child theme CSS into this bundle if needed. |

## Local preview

```bash
npx --yes serve preview -l 3339 --no-clipboard
```

Open **http://localhost:3339/pfz-v2-wp-preview.html** (or `profuzion-v2-preview.html` redirect).

## WordPress / Bricks (short path)

1. Upload **`wordpress/profuzion-brick-child/`** as the active child theme.
2. Ensure **Bricks** parent is installed (`Template:` in child `style.css` must match your Bricks folder name — often `bricks`).
3. Import JSON from **`bricks-import/`** in the order described in **`docs/BRICKS-DEPLOY-KIT.md`** (v2 rows) or **`docs/BRICKS-DEPLOY-KIT-V6.md`** if you are on the v6 template set — adjust import filenames to match what you actually use on the build.
4. Apply classes and forms per **`docs/GLOBAL-CLASSES-BRICKS.md`** and **`docs/BRICKS-COPY-PASTE-v2.md`**.

### NovaMira (run from monorepo `project/` root)

NovaMira only allows **writing `.php` files** under **`wp-content/novamira-sandbox/`**. With **`.mcp.json`** present:

1. **`npm run wp:handoff`**, then mirror **`tools/wordpress/profuzion-brick-child`** → **`v9/wordpress/profuzion-brick-child`** (e.g. Windows **`robocopy … /MIR`**).
2. **`node scripts/novamira-call.mjs sync-theme`** — stages files under **`novamira-sandbox/pfz-upload/profuzion-brick-child`**, mirrors into **`wp-content/themes/profuzion-brick-child`**, activates theme, runs **`profuzion_import_bricks_from_theme_directory`**.
3. **`node scripts/novamira-call.mjs finalize-theme`** — activation + Bricks import only (after sync).

## Authoritative sources in the monorepo

If this folder gets out of date, refresh from `project/`:

- Child theme: `tools/wordpress/profuzion-brick-child/`
- Bricks JSON: `src/app/v2/profuzion-v2-bricks-*.json`
- Preview assets: `bricks-build/pfz-v2-wp-*` + `bricks-build/media/`
