/**
 * Split `pfz-home-layout.css` for Bricks `_css.custom`:
 * - Main (nav + homepage sections …) → Header template root section.
 * - Footer (`body.pfz .pfz-home__foot-inner` onward) → Footer template root section.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PATH = join(__dirname, "pfz-home-layout.css");

const MARKER = "body.pfz .pfz-home__foot-inner";

export function loadSplitSiteLayoutCss() {
  const full = readFileSync(PATH, "utf8");
  const i = full.indexOf(MARKER);
  if (i === -1) {
    throw new Error(
      `${PATH}: missing split anchor "${MARKER}" — cannot partition CSS for Bricks.`,
    );
  }
  return {
    siteCssMain: full.slice(0, i).trimEnd(),
    siteCssFooter: full.slice(i).trim(),
  };
}
