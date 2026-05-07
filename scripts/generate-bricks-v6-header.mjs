/**
 * Bricks template: **Header** (v6) — sticky top nav matching /v6 React preview.
 *
 * Structure: **section** → **container** → **div** (`nav-wrap`) → **div** (`nav`) →
 * **Image** (wordmark) + **HTML** (pills list) + **div** (`nav-actions`) → **Button** (Book).
 *
 * Site layout CSS (minus footer-only tail) lives on the header **section** `_css.custom`.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  buttonEl,
  code,
  container,
  div,
  imageEl,
  makePack,
  section,
} from "./lib/bricks-elements.mjs";
import {
  HOME_NAV_LINKS,
  PFZ_BRICKS_HTML,
  PFZ_HOME_CONTAINER,
} from "./lib/bricks-home-content.mjs";
import { loadSplitSiteLayoutCss } from "./lib/split-pfz-site-layout-css.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(
  __dirname,
  "../src/app/v6/profuzion-v6-bricks-header-import.json",
);

const { siteCssMain } = loadSplitSiteLayoutCss();

/** Theme path — upload to Media Library in production if Bricks rejects external-relative. */
const LOGO_URL =
  "/wp-content/themes/profuzion-brick-child/assets/media/pfs-logo-horizontal-light-v2.svg";

const linksHTML = HOME_NAV_LINKS.map(
  (l) =>
    `<li><a href="/#${l.id}" data-cursor data-cursor-label="${l.label.toLowerCase()}">${l.label}</a></li>`,
).join("");

const pillsHTML = `<ul class="pfz-home__nav-pills">${linksHTML}</ul>`;

const sId = "v6-hdr-s",
  cId = "v6-hdr-c",
  wrapId = "v6-hdr-nav-wrap",
  navId = "v6-hdr-nav",
  logoId = "v6-hdr-logo-img",
  pillsId = "v6-hdr-nav-pills-html",
  actionsId = "v6-hdr-nav-actions",
  hdrBtnId = "v6-hdr-btn-book";

const content = [
  section(sId, "", "v6 · Header", [cId], "pfz-home__sec", {
    _customCss: siteCssMain,
  }),
  container(cId, sId, [wrapId], "Header shell", PFZ_HOME_CONTAINER),
  div(wrapId, cId, [navId], "Header · sticky band", "pfz-home__nav-wrap"),
  div(navId, wrapId, [logoId, pillsId, actionsId], "Header · nav row", "pfz-home__nav"),
  imageEl(
    logoId,
    navId,
    "Header · wordmark",
    "pfz-home__nav-wordmark",
    {
      url: LOGO_URL,
      external: true,
      link: "/#top",
      alt: "",
    },
    {
      _attributes: [
        { name: "decoding", value: "async" },
        { name: "data-cursor", value: "" },
        { name: "data-cursor-label", value: "top" },
      ],
    },
  ),
  code(pillsId, navId, pillsHTML, "Header · nav pills", `${PFZ_BRICKS_HTML} pfz-home__nav-pills-html`),
  div(actionsId, navId, [hdrBtnId], "Header · actions", "pfz-home__nav-actions"),
  buttonEl(
    hdrBtnId,
    actionsId,
    "Book a call →",
    "Header · Book CTA",
    "btn--secondary pfz-home__nav-cta",
    "/#contact",
  ),
];

writeFileSync(out, JSON.stringify(makePack(content), null, 2), "utf8");
console.log("Wrote", out);
