import fs from "fs";

const v2css = fs.readFileSync("src/app/v2/v2.css", "utf8");
const fontBlock = `  /* WP / static HTML: next/font → concrete families */
  --font-manrope: "Manrope", system-ui, sans-serif;
  --font-display: "Instrument Serif", Georgia, serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

`;
if (!v2css.includes(".pfz {")) {
  throw new Error("v2.css must contain .pfz {");
}
const withFonts = v2css.replace(/\.pfz \{\r?\n/, `.pfz {\n${fontBlock}`);

function bundledHeader(label) {
  return `/* Profuzion ${label} — WordPress: Google Fonts + v2.css tokens (BEM .pfz). Body class: pfz. */

@import url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap");

/* === begin mirror of src/app/v2/v2.css (font vars injected) === */

`;
}

const flatHeader = `/* Profuzion v5 — static CSS mirror of src/app/v2/v2.css (BEM .pfz). Load fonts via theme or @import. */

`;

const bundledV5 = bundledHeader("v5");
const bundledV2 = bundledHeader("v2");

const outputs = [
  ["tools/wordpress/profuzion-brick-child/assets/css/profuzion-v5-wp-bundled.css", bundledV5 + withFonts],
  ["tools/wordpress/profuzion-v5-wp-bundled.css", bundledV5 + withFonts],
  ["tools/wordpress/profuzion-v5.css", flatHeader + withFonts],
  // Legacy filenames stay byte-identical to v5 bundle for existing bookmarks / CI.
  ["tools/wordpress/profuzion-brick-child/assets/css/profuzion-v2-wp-bundled.css", bundledV2 + withFonts],
  ["tools/wordpress/profuzion-v2-wp-bundled.css", bundledV2 + withFonts],
  ["tools/wordpress/profuzion-v2.css", flatHeader.replace("v5", "v2") + withFonts],
];

for (const [p, data] of outputs) {
  fs.writeFileSync(p, data);
}
console.log("wrote", outputs.length, "CSS mirrors (v5 primary + v2 paths kept in sync)");
