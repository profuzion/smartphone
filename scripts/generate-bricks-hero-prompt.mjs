/**
 * Bricks "copied elements" export — hero section only (class-toggle / _cssGlobalClasses).
 * Matches the spec: BEM + ACSS utilities + u-* in order; no _cssCustom / no inline styles here.
 * Register the same class identifiers in Bricks → Global Classes before import.
 *
 * Output: src/app/v6/profuzion-v6-bricks-hero-prompt-import.json
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { makePack } from "./lib/bricks-elements.mjs";
import { PFZ_BRICKS_UI_CLASS } from "./lib/bricks-native-catalog.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "../src/app/v6/profuzion-v6-bricks-hero-prompt-import.json");

function el(id, name, parent, children, settings, label = "") {
  return { id, name, parent, children, settings, ...(label ? { label } : {}) };
}

/**
 * @param {string[]} classes
 * @param {Record<string, unknown>} base
 * @param {string} [bricksUiName] - registry `name` for shared `pfz-bricks-ui--*` hooks
 */
function withGlobalClasses(base, classes, bricksUiName = "") {
  const next = {
    ...base,
    _cssGlobalClasses: classes,
  };
  const hook =
    bricksUiName && PFZ_BRICKS_UI_CLASS[bricksUiName]
      ? PFZ_BRICKS_UI_CLASS[bricksUiName]
      : "";
  if (hook) {
    const prev = next._cssClasses ? String(next._cssClasses).trim() : "";
    next._cssClasses = prev ? `${hook} ${prev}` : hook;
  }
  return next;
}

const IDS = {
  section: "pz-hp-s",
  container: "pz-hp-c",
  grid: "pz-hp-grid",
  copy: "pz-hp-copy",
  eyebrow: "pz-hp-eye",
  heading: "pz-hp-h1",
  subtitle: "pz-hp-sub",
  actions: "pz-hp-act",
  btnPrimary: "pz-hp-b1",
  btnSecondary: "pz-hp-b2",
  proof: "pz-hp-prf",
  media: "pz-hp-med",
  image: "pz-hp-img",
};

const content = [
  el(
    IDS.section,
    "section",
    0,
    [IDS.container],
    withGlobalClasses(
      {
        tag: "section",
        _cssId: "top",
      },
      [
        "section",
        "section--hero",
        "bg-base",
        "pad-section-xxl",
        "border-b",
        "border-primary-trans-30",
      ],
      "section",
    ),
    "Hero (class-toggle prompt) — HTML id: top",
  ),

  el(
    IDS.container,
    "container",
    IDS.section,
    [IDS.grid],
    withGlobalClasses(
      {
        _width: "100%",
        _maxWidth: "1480",
        _margin: { right: "auto", left: "auto" },
      },
      ["container", "container--wide", "px-m"],
      "container",
    ),
    "Shell",
  ),

  el(
    IDS.grid,
    "block",
    IDS.container,
    [IDS.copy, IDS.media],
    withGlobalClasses(
      {},
      [
        "hero",
        "hero--v2",
        "hero__grid",
        "grid",
        "grid-2",
        "gap-l",
        "items-center",
      ],
      "block",
    ),
    "Hero grid",
  ),

  el(
    IDS.copy,
    "block",
    IDS.grid,
    [IDS.eyebrow, IDS.heading, IDS.subtitle, IDS.actions, IDS.proof],
    withGlobalClasses({}, ["hero__copy", "flex", "flex-col", "gap-m"], "block"),
    "Copy column",
  ),

  el(
    IDS.eyebrow,
    "text",
    IDS.copy,
    [],
    withGlobalClasses(
      { tag: "p", text: "" },
      ["text-xs", "text-neutral-light", "mb-s"],
      "text",
    ),
    "Eyebrow (DD)",
  ),

  el(
    IDS.heading,
    "heading",
    IDS.copy,
    [],
    withGlobalClasses(
      { tag: "h1", text: "" },
      ["heading-xl", "text-shade", "u-max-width-heading", "mb-m"],
      "heading",
    ),
    "Headline (DD)",
  ),

  el(
    IDS.subtitle,
    "text",
    IDS.copy,
    [],
    withGlobalClasses(
      { tag: "p", text: "" },
      ["text-l", "text-neutral-light", "u-max-width-read", "mb-xl"],
      "text",
    ),
    "Subtitle (DD)",
  ),

  el(
    IDS.actions,
    "block",
    IDS.copy,
    [IDS.btnPrimary, IDS.btnSecondary],
    withGlobalClasses(
      {},
      ["hero__actions", "flex", "flex-wrap-wrap", "gap-m", "items-center"],
      "block",
    ),
    "CTA row",
  ),

  el(
    IDS.btnPrimary,
    "button",
    IDS.actions,
    [],
    withGlobalClasses(
      {
        text: "",
        link: { type: "external", url: "#contact", newTab: false },
      },
      ["hero__cta", "btn", "btn-action"],
      "button",
    ),
    "Primary CTA (set link in Bricks)",
  ),

  el(
    IDS.btnSecondary,
    "button",
    IDS.actions,
    [],
    withGlobalClasses(
      {
        text: "",
        link: { type: "external", url: "#branding", newTab: false },
      },
      ["hero__cta", "hero__cta--ghost", "btn", "btn--outline-neutral"],
      "button",
    ),
    "Secondary CTA (set link in Bricks)",
  ),

  el(
    IDS.proof,
    "text",
    IDS.copy,
    [],
    withGlobalClasses(
      { tag: "p", text: "" },
      ["text-xs", "text-neutral-light", "mt-l"],
      "text",
    ),
    "Proof line (optional / DD)",
  ),

  el(
    IDS.media,
    "block",
    IDS.grid,
    [IDS.image],
    withGlobalClasses(
      {},
      [
        "hero__media",
        "u-radius-lg",
        "u-border-subtle",
        "u-shadow-soft",
        "u-media-ratio",
      ],
      "block",
    ),
    "Media wrap",
  ),

  el(
    IDS.image,
    "image",
    IDS.media,
    [],
    withGlobalClasses(
      {
        image: {
          external: false,
          filename: "",
          id: 0,
          size: "large",
          full: "",
          url: "",
        },
      },
      ["w-full", "object-cover", "u-radius-lg"],
      "image",
    ),
    "Hero image (set media / DD)",
  ),
];

const pack = makePack(content, [], []);

writeFileSync(out, `${JSON.stringify(pack, null, 2)}\n`, "utf8");
console.log("Wrote", out);
