/**
 * Contact / intake form wiring for Profuzion v2.
 *
 * **Bricks Builder forms** and **Pro Forms** (and similar) render on the
 * WordPress server. This Next app cannot execute shortcodes, so for production
 * you typically:
 *
 * 1. **Iframe (recommended)** — In Bricks, create a minimal page (blank header/footer
 *    or a narrow template) and add only the Bricks “Form” element, or a Pro Forms /
 *    WS Form block. Publish, then set:
 *    `NEXT_PUBLIC_CONTACT_FORM_IFRAME_URL` = that page’s public URL. The CTA
 *    section will show that page inside a styled, same-card iframe.
 *
 * 2. **POST endpoint (optional)** — If your plugin exposes a REST or public POST
 *    URL, set `NEXT_PUBLIC_CONTACT_FORM_ACTION` and the built-in fields will
 *    submit as `multipart/form-data`. You may need to add the plugin’s required
 *    hidden fields as extra inputs in `section-cta` (or use the iframe).
 *
 * If neither is set, the in-repo React form runs (demo: simulated submit) or you
 * can add a `POST` handler under `src/app/api/contact`.
 */

export function getContactFormIframeUrl(): string | undefined {
  const u = process.env.NEXT_PUBLIC_CONTACT_FORM_IFRAME_URL?.trim();
  return u || undefined;
}

export function getContactFormActionUrl(): string | undefined {
  const u = process.env.NEXT_PUBLIC_CONTACT_FORM_ACTION?.trim();
  return u || undefined;
}
