import { mergeBricksUiClasses } from "./bricks-native-ui-classes.mjs";

/** Shared Bricks "copied elements" helpers — v2/v5/v6/v10 handoff JSON. */

/** Bump when native element shapes change (e.g. pfz-bricks-ui hooks). */
export const BRICKS_EXPORT_VERSION = "1.15.0";

function applyCssClasses(settings, classes) {
  if (typeof classes !== "string" || !classes.trim()) {
    return settings;
  }
  const t = classes.trim();
  const next = { ...settings };
  next._cssClasses = next._cssClasses ? `${next._cssClasses} ${t}` : t;
  return next;
}

/**
 * Bricks Style → CSS → “Custom CSS” (use `%root%` placeholder — Bricks replaces it with the element selector).
 * Stored under `_css.custom` in copied-elements JSON (works with recent Bricks 1.9+ / 2.x imports).
 */
export function applyBricksCustomCss(settings, cssUsingPercentRoot) {
  const css =
    typeof cssUsingPercentRoot === "string"
      ? cssUsingPercentRoot.trim()
      : "";
  if (!css) return settings;
  const next = { ...settings };
  const prev =
    typeof next._css === "object" && next._css !== null ? next._css : {};
  next._css = { ...prev, custom: css };
  return next;
}

function mergeExtraSettings(settings, extra) {
  if (!extra || typeof extra !== "object") return settings;
  const { _customCss, ...rest } = extra;
  let next = { ...settings, ...rest };
  if (typeof _customCss === "string" && _customCss.trim()) {
    next = applyBricksCustomCss(next, _customCss);
  }
  return next;
}

/** Shell wrapper: drop duplicate width rules when v2.css handles layout. */
function containerBase(classes) {
  const c = typeof classes === "string" ? classes : "";
  const usesShell = c.includes("pfz-case__shell");
  /** Footer inner `.pfz-home__foot-inner` already caps width — avoid nested 1480px squeeze. */
  const footWrap = c.includes("pfz-home__foot-wrap");
  const base = {
    _width: "100%",
  };
  if (!usesShell && !footWrap) {
    base._maxWidth = "1480";
    base._margin = { right: "auto", left: "auto" };
  }
  return base;
}

export function section(id, cssId, label, childIds, classes = "", extra = {}) {
  const settings = mergeExtraSettings(
    {
      tag: "section",
      _cssId: cssId,
      _padding: { top: "60", right: "24", bottom: "60", left: "24" },
    },
    extra,
  );
  return {
    id,
    name: "section",
    parent: 0,
    children: childIds,
    settings: applyCssClasses(settings, mergeBricksUiClasses("section", classes)),
    label,
  };
}

/** Section with custom padding (e.g. header/footer). Case studies use sectionCase (48px vertical). */
export function sectionCase(id, cssId, label, childIds, classes = "", extra = {}) {
  return sectionPadded(
    id,
    cssId,
    label,
    childIds,
    {
      top: "48",
      right: "24",
      bottom: "48",
      left: "24",
    },
    classes,
    extra,
  );
}

export function sectionPadded(
  id,
  cssId,
  label,
  childIds,
  padding = { top: "60", right: "24", bottom: "60", left: "24" },
  classes = "",
  extra = {},
) {
  const settings = mergeExtraSettings(
    {
      tag: "section",
      _cssId: cssId || "",
      _padding: padding,
    },
    extra,
  );
  return {
    id,
    name: "section",
    parent: 0,
    children: childIds,
    settings: applyCssClasses(settings, mergeBricksUiClasses("section", classes)),
    label,
  };
}

export function container(id, parent, childIds, label, classes = "") {
  return {
    id,
    name: "container",
    parent,
    children: childIds,
    settings: applyCssClasses(
      containerBase(classes),
      mergeBricksUiClasses("container", classes),
    ),
    label,
  };
}

export function heading(
  id,
  parent,
  text,
  tag,
  label,
  classes = "",
  extra = {},
) {
  const settings = mergeExtraSettings({ tag, text }, extra);
  return {
    id,
    name: "heading",
    parent,
    children: [],
    settings: applyCssClasses(settings, mergeBricksUiClasses("heading", classes)),
    label,
  };
}

/** Bricks `text` element with explicit HTML (`settings.text`) and tag (`p`, `blockquote`, …). */
export function textHtml(
  id,
  parent,
  html,
  tag,
  label,
  classes = "",
  extra = {},
) {
  const settings = mergeExtraSettings({ tag, text: html }, extra);
  return {
    id,
    name: "text",
    parent,
    children: [],
    settings: applyCssClasses(settings, mergeBricksUiClasses("text", classes)),
    label,
  };
}

/**
 * Plain typography — emits Bricks **`text`** (the editable Basic Text element).
 * Older exports incorrectly used `text-basic`, which Bricks does not treat as native.
 *
 * Pass `{ tag: "span" }` (etc.) in `extra`; defaults to **`p`** when omitted.
 */
export function textBasic(
  id,
  parent,
  text,
  label,
  classes = "",
  extra = {},
) {
  const settings = mergeExtraSettings({ text, tag: "p" }, extra);
  return {
    id,
    name: "text",
    parent,
    children: [],
    settings: applyCssClasses(settings, mergeBricksUiClasses("text", classes)),
    label,
  };
}

/**
 * Native Bricks Button (renders as `<a>` when `link` is set).
 * Profuzion / ACSS classes: `btn--primary`, `btn--secondary`, `btn--base btn--outline`, etc.
 *
 * @param {string|null|undefined} link - External URL/hash/mailto/tel, or null for plain button.
 */
export function buttonEl(
  id,
  parent,
  text,
  label,
  classes = "",
  link = null,
  extra = {},
) {
  let settings = { text };
  if (link) {
    settings.link =
      typeof link === "string"
        ? { type: "external", url: link, newTab: false }
        : link;
  }
  settings = mergeExtraSettings(settings, extra);
  return {
    id,
    name: "button",
    parent,
    children: [],
    settings: applyCssClasses(settings, mergeBricksUiClasses("button", classes)),
    label,
  };
}

/** Inline hyperlinked text (Bricks Text Link — verify settings after import). */
export function textLinkEl(
  id,
  parent,
  text,
  label,
  classes = "",
  link = "#",
  extra = {},
) {
  const settings = mergeExtraSettings(
    {
      text,
      link:
        typeof link === "string"
          ? { type: "external", url: link, newTab: false }
          : link,
    },
    extra,
  );
  return {
    id,
    name: "text-link",
    parent,
    children: [],
    settings: applyCssClasses(settings, mergeBricksUiClasses("text-link", classes)),
    label,
  };
}

/**
 * Native Bricks Image (`name: "image"`).
 * Prefer assigning media in the library after import; `url` pre-fills external/theme paths.
 */
export function imageEl(id, parent, label, classes = "", img = {}, extra = {}) {
  const {
    url = "",
    external = true,
    id: mediaId = 0,
    size = "full",
    link = null,
  } = img;
  const image = {
    external,
    filename: "",
    id: mediaId,
    size,
    full: url || "",
    url: url || "",
  };
  if (Object.prototype.hasOwnProperty.call(img, "alt")) {
    image.alt = img.alt;
  }
  let settings = { image };
  if (link) {
    settings.link =
      typeof link === "string"
        ? { type: "external", url: link, newTab: false }
        : link;
  }
  settings = mergeExtraSettings(settings, extra);
  return {
    id,
    name: "image",
    parent,
    children: [],
    settings: applyCssClasses(settings, mergeBricksUiClasses("image", classes)),
    label,
  };
}

/**
 * "Code" helper kept as the public name so generators don't churn —
 * but it now emits Bricks's `html` element under the hood. The native
 * `code` element only renders content when `executeCode: true`, which
 * needs a server-signed signature we can't generate via REST. The
 * `html` element is a plain raw-HTML pass-through with no signature
 * gate, ideal for procedural section markup.
 */
export function code(id, parent, html, label = "html", classes = "") {
  return {
    id,
    name: "html",
    parent,
    children: [],
    // Bricks Element_Html reads its content from `settings.html`, not `code`.
    settings: applyCssClasses({ html }, mergeBricksUiClasses("html", classes)),
    label,
  };
}

/**
 * Bricks "html" element — alternative to `code` with a simpler shape.
 * Same use case, but renders HTML without the code-execution toggle.
 */
export function htmlEl(id, parent, html, label = "html", classes = "") {
  return {
    id,
    name: "html",
    parent,
    children: [],
    settings: applyCssClasses({ code: html }, mergeBricksUiClasses("html", classes)),
    label,
  };
}

/** Bricks "div" element — like container, but explicitly a div tag. */
/** Optional `extra` merges into settings before CSS classes (e.g. `_attributes`). */
export function div(
  id,
  parent,
  childIds,
  label = "div",
  classes = "",
  extra = {},
) {
  const settings = mergeExtraSettings({}, extra);
  return {
    id,
    name: "div",
    parent,
    children: childIds,
    settings: applyCssClasses(settings, mergeBricksUiClasses("div", classes)),
    label,
  };
}

/** Bricks Block — flexible layout wrapper (same JSON role as Div with different editor semantics). */
export function blockEl(
  id,
  parent,
  childIds,
  label = "block",
  classes = "",
  extra = {},
) {
  const settings = mergeExtraSettings({}, extra);
  return {
    id,
    name: "block",
    parent,
    children: childIds,
    settings: applyCssClasses(settings, mergeBricksUiClasses("block", classes)),
    label,
  };
}

/** Bricks `text` as `<ul>` — pass pre-escaped plain-text items unless you intentionally output HTML. */
export function list(id, parent, items, label = "list", classes = "", extra = {}) {
  const settings = mergeExtraSettings(
    { tag: "ul", text: items.map((t) => `<li>${t}</li>`).join("") },
    extra,
  );
  return {
    id,
    name: "text",
    parent,
    children: [],
    settings: applyCssClasses(settings, mergeBricksUiClasses("text", classes)),
    label,
  };
}

/** Bricks "icon-box": eyebrow + heading + body in one element-set. */
export function richText(id, parent, html, label = "rich text", classes = "") {
  return {
    id,
    name: "text",
    parent,
    children: [],
    settings: applyCssClasses(
      { tag: "div", text: html },
      mergeBricksUiClasses("text", classes),
    ),
    label,
  };
}

/** Bricks Rich Text (`rich-text`). Default `content` HTML — merge `extra` to swap keys per Bricks version. */
export function richTextBricks(id, parent, html, label, classes = "", extra = {}) {
  const settings = mergeExtraSettings({ content: html }, extra);
  return {
    id,
    name: "rich-text",
    parent,
    children: [],
    settings: applyCssClasses(settings, mergeBricksUiClasses("rich-text", classes)),
    label,
  };
}

/**
 * Native Video — supply Bricks-shaped settings (`videoType`, `youtubeUrl`, `fileUrl`, …).
 * Keys vary by Bricks version; pass through exactly what copy-from-builder exports show.
 */
export function videoBricks(id, parent, label, classes = "", settings = {}, extra = {}) {
  const merged = mergeExtraSettings(settings, extra);
  return {
    id,
    name: "video",
    parent,
    children: [],
    settings: applyCssClasses(merged, mergeBricksUiClasses("video", classes)),
    label,
  };
}

/** Native Icon — supply Bricks-shaped settings (`icon`, library/font fields per builder UI). */
export function iconBricks(id, parent, label, classes = "", settings = {}, extra = {}) {
  const merged = mergeExtraSettings(settings, extra);
  return {
    id,
    name: "icon",
    parent,
    children: [],
    settings: applyCssClasses(merged, mergeBricksUiClasses("icon", classes)),
    label,
  };
}

export function makePack(content, globalClasses = [], globalElements = []) {
  return {
    content,
    source: "bricksCopiedElements",
    version: BRICKS_EXPORT_VERSION,
    globalClasses,
    globalElements,
  };
}
