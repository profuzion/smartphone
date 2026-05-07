/**
 * Profuzion ↔ Bricks native element matrix.
 *
 * Bricks stores `name` per element (registry slug). UI labels below match the
 * builder’s marketing names; `bricksName` is what appears in copied JSON.
 *
 * @typedef {"implemented" | "partial" | "stub" | "not_generated"} BricksGeneratorStatus
 */

/** @type {Array<{ category: string, uiLabel: string, bricksName: string, status: BricksGeneratorStatus, note?: string, helpers?: string[] }>} */
export const BRICKS_NATIVE_CATALOG = [
  // ── Layout Elements ──────────────────────────────────────────
  {
    category: "Layout Elements",
    uiLabel: "Section",
    bricksName: "section",
    status: "implemented",
    helpers: ["section", "sectionPadded", "sectionCase"],
  },
  {
    category: "Layout Elements",
    uiLabel: "Container",
    bricksName: "container",
    status: "implemented",
    helpers: ["container"],
  },
  {
    category: "Layout Elements",
    uiLabel: "Block",
    bricksName: "block",
    status: "stub",
    helpers: ["blockEl"],
    note: "Flexible layout wrapper; use where Bricks Block is preferable to Div.",
  },
  {
    category: "Layout Elements",
    uiLabel: "Div",
    bricksName: "div",
    status: "implemented",
    helpers: ["div"],
  },

  // ── Basic Elements ───────────────────────────────────────────
  {
    category: "Basic Elements",
    uiLabel: "Heading",
    bricksName: "heading",
    status: "implemented",
    helpers: ["heading"],
  },
  {
    category: "Basic Elements",
    uiLabel: "Basic Text",
    bricksName: "text",
    status: "implemented",
    helpers: ["textBasic", "textHtml", "list"],
    note: "Registry may also list `text-basic` on older docs; exports use `text` for editable Basic Text.",
  },
  {
    category: "Basic Elements",
    uiLabel: "Rich Text",
    bricksName: "rich-text",
    status: "stub",
    helpers: ["richTextBricks"],
    note: "Default export uses `settings.content` HTML; merge `extra` if your Bricks build expects different keys — verify after import.",
  },
  {
    category: "Basic Elements",
    uiLabel: "Text Link",
    bricksName: "text-link",
    status: "stub",
    helpers: ["textLinkEl"],
  },
  {
    category: "Basic Elements",
    uiLabel: "Button",
    bricksName: "button",
    status: "implemented",
    helpers: ["buttonEl"],
  },
  {
    category: "Basic Elements",
    uiLabel: "Icon",
    bricksName: "icon",
    status: "stub",
    helpers: ["iconBricks"],
    note: "Pass-through `settings` (icon library / font fields vary by Bricks version); verify after import.",
  },
  {
    category: "Basic Elements",
    uiLabel: "Image",
    bricksName: "image",
    status: "implemented",
    helpers: ["imageEl"],
  },
  {
    category: "Basic Elements",
    uiLabel: "Video",
    bricksName: "video",
    status: "stub",
    helpers: ["videoBricks"],
    note: "Pass-through `settings` (`videoType`, URLs, …); match copy-from-builder JSON for your site — verify after import.",
  },

  // ── Media Elements ────────────────────────────────────────────
  {
    category: "Media Elements",
    uiLabel: "Image Gallery",
    bricksName: "gallery",
    status: "not_generated",
    note: "Confirm slug via Bricks → copy element; may differ by version.",
  },
  {
    category: "Media Elements",
    uiLabel: "Image Slider",
    bricksName: "slider",
    status: "not_generated",
  },
  {
    category: "Media Elements",
    uiLabel: "Carousel",
    bricksName: "carousel",
    status: "not_generated",
  },
  {
    category: "Media Elements",
    uiLabel: "Audio",
    bricksName: "audio",
    status: "not_generated",
  },
  {
    category: "Media Elements",
    uiLabel: "Lottie",
    bricksName: "lottie",
    status: "not_generated",
  },

  // ── Content Elements ──────────────────────────────────────────
  {
    category: "Content Elements",
    uiLabel: "Accordion",
    bricksName: "accordion",
    status: "not_generated",
  },
  {
    category: "Content Elements",
    uiLabel: "Tabs",
    bricksName: "tabs",
    status: "not_generated",
  },
  {
    category: "Content Elements",
    uiLabel: "Alert",
    bricksName: "alert",
    status: "not_generated",
  },
  {
    category: "Content Elements",
    uiLabel: "Divider",
    bricksName: "divider",
    status: "not_generated",
  },
  {
    category: "Content Elements",
    uiLabel: "Progress Bar",
    bricksName: "progress-bar",
    status: "not_generated",
  },
  {
    category: "Content Elements",
    uiLabel: "Counter",
    bricksName: "counter",
    status: "not_generated",
  },
  {
    category: "Content Elements",
    uiLabel: "Price List",
    bricksName: "pricing-tables",
    status: "not_generated",
    note: "Slug may be `pricing-tables` or `price-list` — verify in your Bricks version.",
  },
  {
    category: "Content Elements",
    uiLabel: "Icon List",
    bricksName: "icon-list",
    status: "not_generated",
  },

  // ── Forms & Interactive ─────────────────────────────────────
  {
    category: "Forms & Interactive Elements",
    uiLabel: "Form",
    bricksName: "form",
    status: "not_generated",
  },
  {
    category: "Forms & Interactive Elements",
    uiLabel: "Search",
    bricksName: "search",
    status: "not_generated",
  },
  {
    category: "Forms & Interactive Elements",
    uiLabel: "Map",
    bricksName: "map",
    status: "not_generated",
  },
  {
    category: "Forms & Interactive Elements",
    uiLabel: "Countdown",
    bricksName: "countdown",
    status: "not_generated",
  },
  {
    category: "Forms & Interactive Elements",
    uiLabel: "Social Icons",
    bricksName: "social-icons",
    status: "not_generated",
  },

  // ── WordPress & Dynamic ───────────────────────────────────────
  {
    category: "WordPress & Dynamic Data Elements",
    uiLabel: "Posts",
    bricksName: "posts",
    status: "not_generated",
  },
  {
    category: "WordPress & Dynamic Data Elements",
    uiLabel: "Pagination",
    bricksName: "pagination",
    status: "not_generated",
  },
  {
    category: "WordPress & Dynamic Data Elements",
    uiLabel: "Breadcrumbs",
    bricksName: "breadcrumbs",
    status: "not_generated",
  },
  {
    category: "WordPress & Dynamic Data Elements",
    uiLabel: "Nav Menu",
    bricksName: "nav-menu",
    status: "not_generated",
  },
  {
    category: "WordPress & Dynamic Data Elements",
    uiLabel: "Sidebar",
    bricksName: "sidebar",
    status: "not_generated",
  },
  {
    category: "WordPress & Dynamic Data Elements",
    uiLabel: "Shortcode",
    bricksName: "shortcode",
    status: "not_generated",
  },
  {
    category: "WordPress & Dynamic Data Elements",
    uiLabel: "Code (PHP/CSS/JS execution)",
    bricksName: "code",
    status: "not_generated",
    note: "Differs from HTML pass-through; needs Bricks execution/signature for PHP.",
  },

  // ── Our HTML pass-through (maps to UI “HTML / Code” workflow) ─
  {
    category: "Profuzion generators (HTML pass-through)",
    uiLabel: "HTML (raw markup)",
    bricksName: "html",
    status: "implemented",
    helpers: ["code", "htmlEl"],
    note: "Emits Bricks `html` element (`settings.html`) for procedural markup — one editor surface, not Basic Text.",
  },
];

/** HTML-safe suffix for `_cssClasses` (kebab bricksName → BEM modifier). */
function uiModifierFromBricksName(bricksName) {
  return String(bricksName).replace(/[^a-z0-9-]/gi, "");
}

/** Every catalog `bricksName` → shared hook class so the same element type styles coherently. */
const _pfzBricksUiFromCatalog = Object.fromEntries(
  BRICKS_NATIVE_CATALOG.map((row) => {
    const mod = uiModifierFromBricksName(row.bricksName);
    return [row.bricksName, `pfz-bricks-ui pfz-bricks-ui--${mod}`];
  }),
);

export const PFZ_BRICKS_UI_CLASS = Object.freeze({
  ..._pfzBricksUiFromCatalog,
  /** Registry alias on some sites / docs; same editor family as Basic Text (`text`). */
  "text-basic": "pfz-bricks-ui pfz-bricks-ui--text-basic",
});
