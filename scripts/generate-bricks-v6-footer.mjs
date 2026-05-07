/**
 * Bricks template: **Footer** (v6) — wordmark + 3-column nav, matching
 * /v6 React preview. Renders a single Bricks `code` element with full
 * footer HTML driven by `pfz-home__foot-*` classes.
 *
 * Footer-scoped layout CSS from `pfz-home-layout.css` is on the footer **section**
 * `_css.custom` so it is editable in the builder (v9 handoff).
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  code,
  container,
  makePack,
  sectionPadded,
} from "./lib/bricks-elements.mjs";
import { loadSplitSiteLayoutCss } from "./lib/split-pfz-site-layout-css.mjs";
import { HOME_STUDIO } from "./lib/bricks-home-content.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(
  __dirname,
  "../src/app/v6/profuzion-v6-bricks-footer-import.json",
);

const { siteCssFooter } = loadSplitSiteLayoutCss();

const year = new Date().getFullYear();

const navItems = [
  { href: "#industries", label: "Industries" },
  { href: "#about", label: "About" },
  { href: "#branding", label: "Branding" },
  { href: "#websites", label: "Websites" },
  { href: "#process", label: "Process" },
  { href: "#engagements", label: "Pricing" },
];
const contactItems = [
  { href: `mailto:${HOME_STUDIO.email}`, label: HOME_STUDIO.email },
  { href: "tel:+12043626171", label: HOME_STUDIO.phone },
  { href: "#contact", label: "Book a call →" },
];
const studioItems = [
  { href: "/work/", label: "Selected work" },
  { href: "https://instagram.com/profuzion", label: "Instagram" },
  { href: "https://linkedin.com/in/lowellklassen", label: "LinkedIn" },
];

const colHTML = (label, items) => `
<div class="pfz-home__foot-col">
  <p class="pfz-home__foot-col-label">${label}</p>
  <ul>
    ${items
      .map(
        (it) =>
          `<li><a href="${it.href}" data-cursor data-cursor-label="${label.toLowerCase()}">${it.label}</a></li>`,
      )
      .join("")}
  </ul>
</div>`;

const footerHTML = `
<div class="pfz-home__foot-inner">
  <div class="pfz-home__foot-top">
    <h2 class="pfz-home__foot-mark">${HOME_STUDIO.name}<span class="pfz-display__accent">.</span></h2>
    <ul class="pfz-home__foot-meta">
      <li>${HOME_STUDIO.location}</li>
      <li>since ${HOME_STUDIO.founded}</li>
      <li class="is-availability">${HOME_STUDIO.availability}</li>
    </ul>
  </div>

  <div class="pfz-rule pfz-rule--ink" aria-hidden="true" style="margin-block: 3rem 0;"></div>

  <div class="pfz-home__foot-cols">
    ${colHTML("Navigate", navItems)}
    ${colHTML("Contact", contactItems)}
    ${colHTML("Studio", studioItems)}
  </div>

  <div class="pfz-home__foot-bot">
    <p>© ${year} Profuzion Studio · ${HOME_STUDIO.postalCode} · ${HOME_STUDIO.location.split(" · ")[0]}</p>
  </div>
</div>`.trim();

const sId = "v6-ft-s",
  cId = "v6-ft-c",
  coId = "v6-ft-code";

const content = [
  sectionPadded(
    sId,
    "",
    "v6 · Footer",
    [cId],
    { top: "0", right: "0", bottom: "0", left: "0" },
    "pfz-home__foot",
    {
      _customCss: siteCssFooter,
    },
  ),
  container(cId, sId, [coId], "Footer shell", "pfz-home__foot-wrap"),
  code(coId, cId, footerHTML, "Footer content"),
];

writeFileSync(out, JSON.stringify(makePack(content), null, 2), "utf8");
console.log("Wrote", out);
