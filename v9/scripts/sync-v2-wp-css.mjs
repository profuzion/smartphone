import fs from "fs";

const v2 = fs.readFileSync("src/app/v2/v2.css", "utf8");
const fontBlock = `  /* WP / static HTML: next/font → concrete families */
  --font-manrope: "Manrope", system-ui, sans-serif;
  --font-display: "Instrument Serif", Georgia, serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

`;
if (!v2.includes(".pfz {")) {
  throw new Error("v2.css must contain .pfz {");
}
const withFonts = v2.replace(/\.pfz \{\r?\n/, `.pfz {\n${fontBlock}`);

const bundledHeader = `/* Profuzion v2 — WordPress: Google Fonts + v2.css (BEM .pfz). Body class: pfz. */

@import url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap");

/* === begin mirror of src/app/v2/v2.css (font vars injected) === */

`;

const flatHeader = `/* Profuzion v2 — static CSS mirror of src/app/v2/v2.css (BEM .pfz). Load fonts via theme or @import. */

`;

const bundled = bundledHeader + withFonts;
const flat = flatHeader + withFonts;

/* flat = v2 + injected font vars, no @import (preview HTML loads Google Fonts).
 * Also used for bricks-build so http://localhost:3333/pfz-v2-wp-preview.html
 * stays aligned with src/app/v2/v2.css after `npm run sync-v2-wp-css`. */
const paths = [
  "tools/wordpress/profuzion-brick-child/assets/css/profuzion-v2-wp-bundled.css",
  "tools/wordpress/profuzion-v2-wp-bundled.css",
  "tools/wordpress/profuzion-v2.css",
  "bricks-build/pfz-v2-wp.css",
];
for (const p of paths) {
  fs.writeFileSync(p, p.includes("wp-bundled") ? bundled : flat);
}
console.log("wrote", paths.length, "files");
