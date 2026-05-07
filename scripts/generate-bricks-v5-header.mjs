/**
 * Bricks template: **Header** — sticky nav structure matching v2 ProfuzionNav.
 * Import in Bricks → Templates; set template type to Header; assign in Theme Styles.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  buttonEl,
  container,
  heading,
  makePack,
  sectionPadded,
  textBasic,
} from "./lib/bricks-elements.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "../src/app/v5/profuzion-v5-bricks-header-import.json");

const content = [];

const hdr = "v5-hdr-s";
const hdrInner = "v5-hdr-c";

content.push(
  sectionPadded(
    hdr,
    "",
    "v5 · HEADER template — Bricks: set type = Header",
    [hdrInner],
    { top: "0", right: "24", bottom: "0", left: "24" },
    "pfz-section",
  ),
  container(hdrInner, hdr, ["v5-hdr-brand", "v5-hdr-nav", "v5-hdr-cta-row"], "Header inner", "pfz-case__shell"),
);

content.push(
  heading(
    "v5-hdr-brand",
    hdrInner,
    "PZ — Profuzion",
    "div",
    "Logo — link to home or #top",
    "pfz-eyebrow",
  ),
);

const navCopy = `Center nav — replace with Bricks Nav Menu or buttons (ACSS text links + hover).

Industries → #industries
About → #about
Branding → #branding
Websites → #websites
Process → #process
Pricing → #engagements

Case-study variant: logo → home URL; add “Selected work” → /work/`;

content.push(textBasic("v5-hdr-nav", hdrInner, navCopy, "Nav cluster", "pfz-body"));

const ctaRow = "v5-hdr-cta-row";
content.push(
  container(ctaRow, hdrInner, ["v5-hdr-btn"], "CTA wrap"),
  buttonEl(
    "v5-hdr-btn",
    ctaRow,
    "Book a call",
    "→ #contact",
    "btn btn--primary",
    "#contact",
  ),
);

writeFileSync(out, JSON.stringify(makePack(content), null, 2), "utf8");
console.log("Wrote", out);
