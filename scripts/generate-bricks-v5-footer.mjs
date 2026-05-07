/**
 * Bricks template: **Footer** — ink section + wordmark + 3 columns matching v2 footer.
 * Import in Bricks → Templates; set template type to Footer.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  container,
  heading,
  makePack,
  section,
  textBasic,
} from "./lib/bricks-elements.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "../src/app/v5/profuzion-v5-bricks-footer-import.json");

const content = [];

const foot = "v5-ft-s";
const footInner = "v5-ft-c";
const topRow = "v5-ft-top";

content.push(
  section(
    foot,
    "",
    "v5 · FOOTER template — Bricks: set type = Footer",
    [footInner],
    "pfz-section pfz-section--ink",
  ),
  container(footInner, foot, ["v5-ft-top", "v5-ft-rule", "v5-ft-cols", "v5-ft-bottom"], "Footer container", "pfz-case__shell"),
);

content.push(
  container(topRow, footInner, ["v5-ft-mark", "v5-ft-meta"], "Wordmark + meta", "pfz-case__masthead-grid"),
);

content.push(
  heading(
    "v5-ft-mark",
    topRow,
    "Profuzion.",
    "h2",
    "Wordmark — span.pfz-display__accent on “.”",
    "pfz-display",
  ),
);

content.push(
  textBasic(
    "v5-ft-meta",
    topRow,
    "Winkler, Manitoba · Pembina Valley\nsince 1999\nnow booking summer 2026",
    "Meta",
    "pfz-body",
  ),
);

content.push(
  textBasic(
    "v5-ft-rule",
    footInner,
    "\u200b",
    "Rule (hairline)",
    "pfz-rule pfz-rule--ink",
  ),
);

const colText = `Three-column grid (sm:grid-cols-3). Use ACSS gap/spacing.

Navigate
· Industries → #industries
· About → #about
· Branding → #branding
· Websites → #websites
· Process → #process
· Pricing → #engagements

Contact
· hello@profuzionstudio.com (mailto)
· 204.362.6171 (tel)
· Book a call → #contact

Studio
· Profuzion v1 (live) → your URL
· Instagram
· LinkedIn
· GitHub`;

content.push(textBasic("v5-ft-cols", footInner, colText, "Link columns", "pfz-body"));

content.push(
  textBasic(
    "v5-ft-bottom",
    footInner,
    "© {year} Profuzion Studio · R6W 0P4 · Winkler, Manitoba\nProfuzion · Bricks v5",
    "Bottom strip",
    "pfz-eyebrow",
  ),
);

writeFileSync(out, JSON.stringify(makePack(content), null, 2), "utf8");
console.log("Wrote", out);
