import { code, container, section, sectionCase } from "./bricks-elements.mjs";

/* ──────────────────────── Case study template ────────────────────────
 * Mirrors src/app/v6/work/[slug]/page.tsx 1:1. The Bricks `single`
 * template is applied to every pfz_case_study CPT post; per-post
 * content comes from ACF Pro fields (`pfz_case_*`) resolved via
 * Bricks dynamic-data tokens like `{acf_pfz_case_kicker}`.
 *
 * Layout classes (pfz-case__*) live in v2.css → bundled CSS, already
 * loaded by the child theme on every page. No extra inline <style>
 * is needed for the case template — only the home page needed that
 * because its layout classes were the freshly-added pfz-home__* set.
 * ─────────────────────────────────────────────────────────────── */

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* Inline JS that runs per case-page render: fetches related case-study
 * posts from the WP REST API and paints them into the related grid.
 * The hero image and gallery are filled in the same block from ACF +
 * featured-image data exposed via REST. */
const CASE_RUNTIME_SCRIPT = `
<script id="pfz-case-runtime">
(function () {
  "use strict";
  if (!document.body) return;

  function init() {
    var article = document.querySelector('main, body');
    if (!article) return;
    var bodyClass = document.body.className || '';
    var m = bodyClass.match(/postid-(\\d+)/);
    if (!m) return;
    var postId = m[1];

    var heroSlot = document.querySelector('[data-pfz-case-hero]');
    var gallerySlot = document.querySelector('[data-pfz-case-gallery]');
    var relatedSlot = document.querySelector('[data-pfz-case-related]');

    function fetchPost(id) {
      return fetch('/wp-json/wp/v2/pfz_case_study/' + id + '?_embed=1', {
        headers: { Accept: 'application/json' },
      }).then(function (r) { return r.ok ? r.json() : null; });
    }
    function fetchRelated(excludeId) {
      return fetch('/wp-json/wp/v2/pfz_case_study?per_page=4&exclude=' + excludeId + '&_embed=1', {
        headers: { Accept: 'application/json' },
      }).then(function (r) { return r.ok ? r.json() : []; });
    }
    function imgUrl(post) {
      try {
        var media = post && post._embedded && post._embedded['wp:featuredmedia'];
        if (media && media[0] && media[0].source_url) return media[0].source_url;
      } catch (e) {}
      return null;
    }

    fetchPost(postId).then(function (post) {
      if (!post) return;
      /* Hero image */
      var heroSrc = imgUrl(post);
      if (heroSrc && heroSlot) {
        heroSlot.innerHTML =
          '<img src="' + heroSrc + '" alt="" loading="eager" decoding="async" style="width:100%;height:auto;display:block;border-radius:18px;">';
      } else if (heroSlot) {
        heroSlot.innerHTML = '';
      }

      /* Gallery — pfz_case_gallery field is an array of attachment IDs.
         Resolve each by fetching the media item. */
      if (gallerySlot) {
        var galleryIds =
          post.acf && Array.isArray(post.acf.pfz_case_gallery)
            ? post.acf.pfz_case_gallery
            : [];
        if (galleryIds.length === 0) {
          gallerySlot.parentElement && gallerySlot.parentElement.parentElement
            ? (gallerySlot.parentElement.parentElement.style.display = 'none')
            : null;
        } else {
          var fetches = galleryIds.map(function (id) {
            var idVal = typeof id === 'object' && id ? (id.id || id.ID) : id;
            return fetch('/wp-json/wp/v2/media/' + idVal, {
              headers: { Accept: 'application/json' },
            }).then(function (r) { return r.ok ? r.json() : null; });
          });
          Promise.all(fetches).then(function (items) {
            gallerySlot.innerHTML = items
              .filter(Boolean)
              .map(function (it, i) {
                var src = it.source_url;
                var w = it.media_details && it.media_details.width;
                var h = it.media_details && it.media_details.height;
                var wide = w && h && w / h > 1.6;
                var cls = wide
                  ? 'pfz-case__gallery-span pfz-case__gallery-span--md'
                  : 'pfz-case__gallery-span';
                return (
                  '<figure class="' + cls + '">' +
                    '<img src="' + src + '" alt="' + (it.alt_text || '') + '" loading="lazy" decoding="async" style="width:100%;height:auto;display:block;border-radius:12px;">' +
                  '</figure>'
                );
              })
              .join('');
          });
        }
      }
    });

    /* Related cards */
    if (relatedSlot) {
      fetchRelated(postId).then(function (posts) {
        relatedSlot.innerHTML = posts
          .map(function (p) {
            var title = (p.title && p.title.rendered) || '';
            var industry = (p.acf && p.acf.pfz_case_kicker) || '';
            var tagline = (p.acf && p.acf.pfz_case_tagline) || '';
            var url = p.link || '#';
            var industryShort = industry.split('·')[0].trim() || 'Project';
            return (
              '<li>' +
                '<a class="pfz-case-card" href="' + url + '" data-cursor data-cursor-label="' + esc(title.toLowerCase()) + '">' +
                  '<span class="pfz-case-card__type">' + esc(industryShort) + '</span>' +
                  '<span class="pfz-case-card__title">' + title + '</span>' +
                  '<span class="pfz-case-card__tagline">' + esc(tagline) + '</span>' +
                  '<span class="pfz-case-card__cta">View case →</span>' +
                '</a>' +
              '</li>'
            );
          })
          .join('');
      });
    }

    function esc(s) {
      return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>`.trim();

/* Tokens: Bricks resolves `{post_title}` and `{acf_FIELD}` in the rendered
 * HTML. Keep the template content exactly v6's React shape; runtime JS
 * paints the hero / gallery / related grids using ACF data via REST. */

function mastheadSection() {
  const inner = `
<header class="pfz-case__shell pfz-case__masthead">
  <div class="pfz-rule" style="margin-bottom: 2.5rem;" aria-hidden="true"></div>
  <div class="pfz-case__masthead-grid">
    <div class="pfz-case__title-stack">
      <h1 class="pfz-display pfz-display--lg pfz-case__title">{post_title}<span class="pfz-display__accent">.</span></h1>
      <p class="pfz-eyebrow pfz-eyebrow--primary pfz-eyebrow--bare pfz-eyebrow--lg">{acf_pfz_case_kicker}</p>
    </div>
    <p class="pfz-case-tagline pfz-case-tagline--trailing">{acf_pfz_case_tagline}</p>
  </div>
</header>`.trim();
  const s = "pz-case-mh",
    c = "pz-case-mh-c",
    co = "pz-case-mh-code";
  return [
    sectionCase(s, "case-masthead", "Case · masthead", [c], "pfz-case__main"),
    container(c, s, [co], "Masthead shell"),
    code(co, c, inner, "Masthead content"),
  ];
}

function heroImageSection() {
  const inner = `
<section class="pfz-case__shell pfz-case__hero" aria-label="Project hero">
  <div data-pfz-case-hero></div>
</section>`.trim();
  const s = "pz-case-hero-s",
    c = "pz-case-hero-c",
    co = "pz-case-hero-code";
  return [
    sectionCase(s, "case-hero", "Case · hero image", [c], ""),
    container(c, s, [co], "Hero image shell"),
    code(co, c, inner, "Hero image content"),
  ];
}

function ledeSection() {
  const inner = `
<section class="pfz-case__shell pfz-case__lede" aria-labelledby="case-lede">
  <h2 id="case-lede" class="sr-only">Summary</h2>
  <p class="pfz-lede pfz-case__lede-text">{acf_pfz_case_summary}</p>
  <p class="pfz-case__lede-actions">
    <a href="{acf_pfz_case_live_url}" target="_blank" rel="noopener noreferrer" class="btn--base btn--outline" data-cursor data-cursor-label="live">
      Visit the live site <span class="pfz-btn-arrow">↗</span>
    </a>
  </p>
</section>`.trim();
  const s = "pz-case-led-s",
    c = "pz-case-led-c",
    co = "pz-case-led-code";
  return [
    sectionCase(s, "case-lede-sec", "Case · lede", [c], ""),
    container(c, s, [co], "Lede shell"),
    code(co, c, inner, "Lede content"),
  ];
}

function storySection() {
  const inner = `
<section class="pfz-case__story" aria-labelledby="case-story">
  <h2 id="case-story" class="sr-only">Challenge, approach, and outcome</h2>
  <div class="pfz-case__story-inner">
    <div class="pfz-case__block">
      <p class="pfz-eyebrow pfz-eyebrow--primary pfz-eyebrow--lg">Growth barrier</p>
      <h3 class="pfz-case__block-heading">{acf_pfz_case_challenge_heading}</h3>
      <p class="pfz-body pfz-body--story">{acf_pfz_case_challenge_body}</p>
    </div>
    <div class="pfz-case__block">
      <p class="pfz-eyebrow pfz-eyebrow--primary pfz-eyebrow--lg">Evolution</p>
      <h3 class="pfz-case__block-heading">{acf_pfz_case_approach_heading}</h3>
      <p class="pfz-body pfz-body--story">{acf_pfz_case_approach_body}</p>
    </div>

    <figure class="pfz-case__pullquote">
      <blockquote class="pfz-case__pullquote-text">&ldquo;{acf_pfz_case_pull_quote}&rdquo;</blockquote>
      <figcaption class="pfz-case__pullquote-cite">{acf_pfz_case_pull_cite}</figcaption>
    </figure>

    <div class="pfz-case__results">
      <p class="pfz-eyebrow pfz-eyebrow--primary pfz-eyebrow--lg">Results</p>
      <h3 class="pfz-display pfz-display--md">{acf_pfz_case_outcome_heading}</h3>
      <p class="pfz-body pfz-body--story">{acf_pfz_case_outcome_body}</p>
      <ul class="pfz-case__results-list" data-pfz-case-results>
        <!-- Filled at render time — splits {acf_pfz_case_results_bullets} on newlines.
             Falls back to a single <li> if the field is short. -->
      </ul>
    </div>
  </div>
</section>`.trim();
  const s = "pz-case-st-s",
    c = "pz-case-st-c",
    co = "pz-case-st-code";
  return [
    sectionCase(s, "case-story-sec", "Case · story", [c], ""),
    container(c, s, [co], "Story shell"),
    code(co, c, inner, "Story content"),
  ];
}

function gallerySection() {
  const inner = `
<section class="pfz-case__gallery" aria-labelledby="case-gallery-h">
  <div class="pfz-case__gallery-inner">
    <div class="pfz-case__gallery-intro">
      <p class="pfz-eyebrow">Gallery</p>
      <h2 id="case-gallery-h" class="pfz-display pfz-display--md">
        The work, <span class="pfz-italic pfz-display--primary">up close</span>.
      </h2>
    </div>
    <div class="pfz-case__gallery-grid" data-pfz-case-gallery>
      <!-- Painted at runtime from acf_pfz_case_gallery via REST. -->
    </div>
  </div>
</section>`.trim();
  const s = "pz-case-gal-s",
    c = "pz-case-gal-c",
    co = "pz-case-gal-code";
  return [
    sectionCase(s, "case-gallery-sec", "Case · gallery", [c], ""),
    container(c, s, [co], "Gallery shell"),
    code(co, c, inner, "Gallery content"),
  ];
}

function ctaSection() {
  const inner = `
<section class="pfz-section pfz-section--ink pfz-case__cta" aria-labelledby="case-cta-shout">
  <div class="pfz-case__cta-noise" aria-hidden="true"></div>
  <div class="pfz-case__cta-inner">
    <p id="case-cta-shout" class="pfz-case__cta-shout">
      WHAT GOT YOU HERE <span class="pfz-italic pfz-display--primary">won't</span> GET YOU THERE.
    </p>
    <p class="pfz-body pfz-case__cta-lede">
      Not a traditional bloated agency — a founder-led studio for owners who need the work to read clearly the first time. Grab a call and we'll map the next evolution.
    </p>
    <div class="pfz-case__cta-actions">
      <a href="/#contact" class="btn--secondary" data-cursor data-cursor-label="book">
        Book a 30-min call <span class="pfz-btn-arrow">→</span>
      </a>
      <a href="mailto:hello@profuzionstudio.com" class="btn--base btn--outline" data-cursor data-cursor-label="email">
        hello@profuzionstudio.com
      </a>
    </div>
  </div>
</section>`.trim();
  const s = "pz-case-cta-s",
    c = "pz-case-cta-c",
    co = "pz-case-cta-code";
  return [
    sectionCase(s, "case-cta-sec", "Case · CTA", [c], ""),
    container(c, s, [co], "CTA shell"),
    code(co, c, inner, "CTA content"),
  ];
}

function relatedSection() {
  const inner = `
<section class="pfz-case__related" aria-labelledby="case-related-h">
  <div class="pfz-case__shell">
    <div class="pfz-case__related-head">
      <div>
        <p class="pfz-eyebrow">Selected work</p>
        <h2 id="case-related-h" class="pfz-display pfz-display--md pfz-case__related-title">Keep exploring.</h2>
      </div>
      <a class="btn--base btn--outline pfz-case__related-back" href="/" data-cursor data-cursor-label="all">
        Back to home <span class="pfz-btn-arrow">↑</span>
      </a>
    </div>
    <ul class="pfz-case__related-grid" data-pfz-case-related>
      <!-- Painted at runtime from /wp-json/wp/v2/pfz_case_study?exclude=<id>. -->
    </ul>
  </div>
</section>
${CASE_RUNTIME_SCRIPT}`.trim();
  const s = "pz-case-rel-s",
    c = "pz-case-rel-c",
    co = "pz-case-rel-code";
  return [
    sectionCase(s, "case-related-sec", "Case · related", [c], ""),
    container(c, s, [co], "Related shell"),
    code(co, c, inner, "Related content + runtime script"),
  ];
}

/** Public — buildCaseContent assembled from the v6 React tree. */
export function buildCaseContent() {
  return [
    ...mastheadSection(),
    ...heroImageSection(),
    ...ledeSection(),
    ...storySection(),
    ...gallerySection(),
    ...ctaSection(),
    ...relatedSection(),
  ];
}
