import {
  blockEl,
  buttonEl,
  code,
  container,
  div,
  heading,
  imageEl,
  list,
  sectionPadded,
  textBasic,
  textHtml,
} from "./bricks-elements.mjs";

/* Homepage layout CSS ships from the Header template (`_css.custom` on the root section).
 * Hero deco HTML is markup-only (halftone shells) — no hidden `<style>` block here (v9). */

/** Applied to every Bricks `container` on this page so Structure has a stable hook. */
export const PFZ_HOME_CONTAINER = "pfz-home__container";

/** Marker class on unavoidable raw HTML (`html` element) nodes. */
export const PFZ_BRICKS_HTML = "pfz-bricks-html";

/* ──────────────────────── Source content ────────────────────────
 * Inlined from src/app/v2/_lib/site.ts so the .mjs generator has no
 * TypeScript dependency. Keep aligned with the React preview.
 * ─────────────────────────────────────────────────────────────── */

const STUDIO = {
  name: "Profuzion",
  monogram: "PZ",
  positioning: "Brand & Website design. Mastered.",
  founded: 1999,
  location: "Winkler, Manitoba · Pembina Valley",
  availability: "now booking summer 2026",
  email: "hello@profuzionstudio.com",
  phone: "204.362.6171",
  postalCode: "R6W 0P4",
};

const NAV_LINKS = [
  { id: "industries", label: "Industries" },
  { id: "about", label: "About" },
  { id: "branding", label: "Branding" },
  { id: "websites", label: "Websites" },
  { id: "process", label: "Process" },
  { id: "engagements", label: "Pricing" },
  { id: "contact", label: "Contact" },
];

const INDUSTRIES = [
  {
    id: "industrial",
    label: "Industrial",
    lead: "Capability that shows up in the spec sheet.",
    deliverables: [
      "Tradeshow and facility systems",
      "Product-line architecture for distributors",
      "Audit-ready safety and quality narrative",
      "Technical and catalog writing",
      "Hiring and talent microsites",
    ],
    proof: "For plant managers and owners who get understood the first time.",
    hue: "#3a4a5c",
  },
  {
    id: "contractors",
    label: "Contractors",
    lead: "Bids, crews, and a name on the side of the shop.",
    deliverables: [
      "Truck, yard, and crew apparel systems",
      "Estimate and bid presentation templates",
      "Local project galleries and case pages",
      "Warranty and change-order clarity in writing",
      "Trade school and hiring outreach",
    ],
    proof: "For firms that live and die on callbacks.",
    hue: "#7d6650",
  },
  {
    id: "food-producers",
    label: "Food Producers",
    lead: "Provenance people can read on the label.",
    deliverables: [
      "Label and case-pack design systems",
      "Wholesale and distributor sheets",
      "Origin, allergen, and compliance copy",
      "Field-to-facility story on the site",
      "Co-packer and export-facing PDFs",
    ],
    proof: "For teams who need trust before the first bite.",
    hue: "#b85838",
  },
  {
    id: "ecommerce",
    label: "E-commerce Sellers",
    lead: "A shop that doesn't feel like a template.",
    deliverables: [
      "DTC and marketplace listing strategy",
      "Product and bundle page system",
      "Email and post-purchase flows",
      "Review and UGC in the right places",
      "Return and policy copy that still sounds human",
    ],
    proof: "For owners who A/B test but don't sound like a help desk.",
    hue: "#5a6a52",
  },
];

const BRANDING_CASES = [
  {
    slug: "alumareel",
    client: "AlumaReel",
    tagline: "An engineered brand for an engineered product.",
    industry: "Aluminum reel manufacturing",
    year: 2025,
    summary:
      "Wordmark, monogram, palette, typography, voice — routed to a website, a sell sheet, and a CAD-driven render pipeline.",
    glyph: "AR",
    palette: ["#0F0E0C", "#9C968B", "#C9531C"],
    typePair: { display: "Söhne Breit", body: "Söhne Buch" },
    deliverables: ["Identity system", "Render pipeline", "Sell sheet"],
  },
  {
    slug: "brovek",
    client: "Brovek",
    tagline: "A brand built to wear work boots.",
    industry: "Construction · trades",
    year: 2024,
    summary:
      "Confident, no-nonsense identity — wordmark, monogram, document system, and a vehicle wrap that reads at 70 km/h.",
    glyph: "BV",
    palette: ["#1c1b18", "#c9531c", "#f2eee5"],
    typePair: { display: "GT America Mono", body: "GT America" },
    deliverables: ["Mark + monogram", "Vehicle livery", "Document kit"],
  },
  {
    slug: "natures-knoll-golf",
    client: "Nature's Knoll",
    tagline: "A century of local memory, set in editorial type.",
    industry: "Non-profit golf",
    year: 2026,
    summary:
      "Restored mark, an editorial voice document, and a member-facing identity that reads as well at 11pt as at 110pt.",
    glyph: "NK",
    palette: ["#2a3a28", "#9b8868", "#f2eee5"],
    typePair: { display: "GT Sectra", body: "GT Walsheim" },
    deliverables: ["Mark restoration", "Voice document", "Member system"],
  },
  {
    slug: "avion",
    client: "Avion",
    tagline: "Aviation services brand built for high-trust client acquisition.",
    industry: "Aviation services",
    year: 2026,
    summary:
      "Identity built for hangar wall and pilot brief: a clean wordmark, a tail-mark, and a one-page service overview the office uses every day.",
    glyph: "AV",
    palette: ["#11202e", "#a9b3bd", "#d97706"],
    typePair: { display: "Söhne Breit", body: "Söhne Buch" },
    deliverables: ["Identity system", "Service overview", "Tail-mark"],
  },
];

const WEBSITE_CASES = [
  {
    slug: "natures-knoll-golf",
    client: "Nature's Knoll Golf",
    tagline: "A nine-hole story, shot like a film.",
    industry: "Hospitality",
    year: 2026,
    url: "naturesknollgolf.com",
    outcome:
      "Editorial scroll narrative, 3-minute course film in the hero, Lightspeed booking flow that members trust.",
    metrics: [
      { label: "LCP (hero)", value: "<2.1s" },
      { label: "Booking screens", value: "4 → 1" },
      { label: "Film length", value: "3:00" },
    ],
  },
  {
    slug: "alumareel",
    client: "AlumaReel",
    tagline: "Catalogue product, finished site.",
    industry: "Industrial",
    year: 2025,
    url: "alumareel.com",
    outcome:
      "Procedural CAD render pipeline, a clear sell-sheet route, and a distributor-facing product architecture.",
    metrics: [
      { label: "Render time", value: "−72%" },
      { label: "Spec downloads", value: "+4.1×" },
      { label: "Distributor pages", value: "11" },
    ],
  },
  {
    slug: "brovek",
    client: "Brovek",
    tagline: "Industrial brand and brochure system for trade-buyer trust.",
    industry: "Construction",
    year: 2024,
    url: "brovek.ca",
    outcome:
      "Wordmark + brochure that reads at 70 km/h, a vehicle wrap system, and a trade-buyer document kit.",
    metrics: [
      { label: "RFQ rate", value: "+38%" },
      { label: "Quote → close", value: "+22%" },
      { label: "Brochure views", value: "1.7k/mo" },
    ],
  },
  {
    slug: "avion",
    client: "Avion",
    tagline: "Aviation services brand built for high-trust client acquisition.",
    industry: "Aviation",
    year: 2026,
    url: "avion.aero",
    outcome:
      "Service overview the office uses every day, a tail-mark and brief-card system, and a discreet client portal route.",
    metrics: [
      { label: "Inquiry quality", value: "+41%" },
      { label: "Brief turnaround", value: "−38%" },
      { label: "Portal adoption", value: "84%" },
    ],
  },
];

const PHASES = [
  {
    n: "01",
    name: "Listen",
    duration: "Week 1",
    headline: "We start at the desk you actually work from.",
    body: "Founder interview, voice notes, and the three questions every new project needs answered before we can name the work.",
    bullets: ["Founder interview", "Voice notes", "Brief"],
  },
  {
    n: "02",
    name: "Frame",
    duration: "Weeks 2–3",
    headline: "Positioning, voice, and the shape of the work.",
    body: "Positioning brief, message hierarchy, and the first design directions — typography, color, mark, in three flavors.",
    bullets: ["Positioning", "Voice doc", "3 directions"],
  },
  {
    n: "03",
    name: "Design",
    duration: "Weeks 3–6",
    headline: "Identity and screens — drawn together, not in series.",
    body: "Brand system + key web screens designed in lock-step so the launch reads as one decision, not two.",
    bullets: ["Identity system", "Key screens", "Style guide"],
  },
  {
    n: "04",
    name: "Ship",
    duration: "Weeks 6–8",
    headline: "Built, tested, indexed, handed over.",
    body: "Production build, QA, performance, accessibility, and the indexing pass before launch — plus a 30-minute hand-off call.",
    bullets: ["Production build", "QA + a11y", "Hand-off"],
  },
  {
    n: "05",
    name: "Tend",
    duration: "Ongoing",
    headline: "Quarterly rounds keep the work earning its keep.",
    body: "Quarterly content, SEO, and performance — plus a direct line to the founder for things that don't fit a ticket.",
    bullets: ["Quarterly content", "SEO + perf", "Direct line"],
  },
];

const ENGAGEMENTS = [
  {
    id: "brand",
    name: "Brand system",
    duration: "4–6 weeks",
    shape: "fixed-scope",
    description:
      "Founder interview, positioning, mark, palette, typography, voice document, and a one-page studio brief.",
    includes: [
      "Founder interview + brief",
      "Mark, palette, typography",
      "Voice document",
      "One-page studio brief",
    ],
    cta: "Start the brand",
    primary: false,
  },
  {
    id: "brand-website",
    name: "Brand & website",
    duration: "8–10 weeks",
    shape: "primary",
    description:
      "Brand system + a website built to perform. Most owners start here — the work reads as one decision, not two.",
    includes: [
      "Everything in Brand system",
      "Website design + build",
      "Performance + a11y pass",
      "Launch + 30-day support",
    ],
    cta: "Book a call",
    primary: true,
  },
  {
    id: "tend",
    name: "Tend (retainer)",
    duration: "Monthly",
    shape: "ongoing",
    description:
      "Quarterly content, SEO, performance, direct line to the founder. For owners who want the work to keep earning its keep.",
    includes: [
      "Quarterly content rounds",
      "SEO + performance",
      "Direct line to founder",
      "Quarterly review",
    ],
    cta: "Add Tend",
    primary: false,
  },
];

const PULL_QUOTE = {
  text: "We don't sell websites. We design the version of you that earns the next call — and then we make sure the site is the easy part.",
  source: "Profuzion · founder voice doc, v3",
};

const FOUNDER = {
  headline: "One studio. One person on the call.",
  paragraphs: [
    `I founded Profuzion in 1999 at a single desk in Winkler — not to follow design trends, but to help owners who have to be understood the first time and trusted the second. Lawyers, agents, shop floors, and front desks: the work has always been about clarity, not volume.`,
    "The stack changes every few years. The promise doesn't: a brand and site you can hand to a new hire without a translation layer. When you hire the studio, you work with me from first call to launch — no account manager, no handoff to someone who wasn't in the room for the brief.",
  ],
};

/** Theme-relative URLs — upload matching files under child theme `assets/media/` after import. */
const THEME_MEDIA_BASE =
  "/wp-content/themes/profuzion-brick-child/assets/media";
const FOUNDER_HEADSHOT_URL = `${THEME_MEDIA_BASE}/lowell-headshot.png`;
const FOUNDER_IMAGE_ALT =
  "Lowell Klassen — Founder & designer · Winkler, Manitoba";

function caseWebScreenshotUrl(slug) {
  return `${THEME_MEDIA_BASE}/cases/web-${slug}.jpg`;
}

function industryHeroImageUrl(id) {
  return `${THEME_MEDIA_BASE}/industry-${id}.jpg`;
}

/* ──────────────────────── HTML helpers ──────────────────────── */

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function ruleBricksHtml(id, parent, label = "Rule") {
  return code(
    id,
    parent,
    `<div class="pfz-rule" aria-hidden="true"></div>`,
    label,
    `${PFZ_BRICKS_HTML} pfz-home__rule-html`,
  );
}

function industryPreviewGradientHtml(ind) {
  return `<div class="pfz-home__ind-preview-bg" aria-hidden="true" style="background:
    radial-gradient(ellipse 60% 80% at 80% 20%, ${ind.hue}33, transparent 60%),
    radial-gradient(ellipse 80% 60% at 10% 90%, ${ind.hue}1f, transparent 65%),
    repeating-radial-gradient(circle at 50% 50%, ${ind.hue}0c 0px, ${ind.hue}0c 1px, transparent 1px, transparent 14px);"></div>`;
}

/** Native text / list nodes for the brand spread detail column (CTA is a separate Button). */
function brandSpreadDetailBundle(detailWrap, brand, i) {
  const slug = brand.slug;
  const idx = String(i + 1).padStart(2, "0");
  const eyebrow = `pz-brand-${slug}-eyebrow`;
  const h3 = `pz-brand-${slug}-h3`;
  const tag = `pz-brand-${slug}-tag`;
  const dl = `pz-brand-${slug}-dl`;
  const summary = `pz-brand-${slug}-summary`;
  const palLab = `pz-brand-${slug}-pal-label`;
  const pal = `pz-brand-${slug}-pal`;
  const typeLab = `pz-brand-${slug}-type-label`;
  const typepair = `pz-brand-${slug}-typepair`;
  const deliv = `pz-brand-${slug}-deliv-ul`;
  const ids = [eyebrow, h3, tag, dl, summary, palLab, pal, typeLab, typepair, deliv];
  const nodes = [
    textBasic(
      eyebrow,
      detailWrap,
      `↳ case · ${idx}`,
      `Brand spread eyebrow · ${brand.client}`,
      "pfz-eyebrow pfz-eyebrow--primary pfz-home__brand-spread-eyebrow",
      { tag: "p" },
    ),
    textHtml(
      h3,
      detailWrap,
      `${esc(brand.client)}<span class="pfz-display__accent">.</span>`,
      "h3",
      `Brand spread title · ${brand.client}`,
      "pfz-display pfz-home__brand-spread-h3",
    ),
    textBasic(
      tag,
      detailWrap,
      esc(brand.tagline),
      `Brand spread tag · ${brand.client}`,
      "pfz-home__brand-spread-tag",
      { tag: "p" },
    ),
    textHtml(
      dl,
      detailWrap,
      `<dl class="pfz-home__brand-spread-dl"><div><dt>industry</dt><dd>${esc(brand.industry)}</dd></div><div><dt>year</dt><dd>${esc(brand.year)}</dd></div></dl>`,
      "div",
      `Brand spread meta · ${brand.client}`,
      "pfz-home__brand-spread-dl-host",
    ),
    textBasic(
      summary,
      detailWrap,
      esc(brand.summary),
      `Brand spread summary · ${brand.client}`,
      "pfz-body pfz-home__brand-spread-summary",
      { tag: "p" },
    ),
    textBasic(
      palLab,
      detailWrap,
      "palette",
      `Brand spread palette label · ${brand.client}`,
      "pfz-home__brand-spread-pal-label",
      { tag: "p" },
    ),
    textHtml(
      pal,
      detailWrap,
      `<div class="pfz-home__brand-spread-pal" aria-hidden="true">${brand.palette.map((c) => `<span style="background:${c};"></span>`).join("")}</div>`,
      "div",
      `Brand spread palette · ${brand.client}`,
      "pfz-home__brand-spread-pal-wrap",
      { _attributes: [{ name: "aria-hidden", value: "true" }] },
    ),
    textBasic(
      typeLab,
      detailWrap,
      "typography",
      `Brand spread type label · ${brand.client}`,
      "pfz-home__brand-spread-type-label",
      { tag: "p" },
    ),
    textHtml(
      typepair,
      detailWrap,
      `<div class="pfz-home__brand-spread-typepair"><span class="pfz-home__brand-spread-typepair-italic">Aa</span><span class="pfz-home__brand-spread-typepair-display">${esc(brand.typePair.display)}</span><span style="color: var(--contrast-muted-mid);">·</span><span class="pfz-home__brand-spread-typepair-body">${esc(brand.typePair.body)}</span></div>`,
      "div",
      `Brand spread type · ${brand.client}`,
      "pfz-home__brand-spread-typepair-host",
    ),
    list(
      deliv,
      detailWrap,
      brand.deliverables.map((d) => esc(d)),
      `Brand spread deliverables · ${brand.client}`,
      "pfz-home__brand-spread-deliv",
    ),
  ];
  return { ids, nodes };
}

function websiteSlotMobileOnlyHTML(kase) {
  return `
<div class="pfz-home__web-slot-mobile">
    <div class="pfz-browser">
      <div class="pfz-browser__bar">
        <span class="pfz-browser__dot" style="background:#e26b49;"></span>
        <span class="pfz-browser__dot" style="background:#e3b04b;"></span>
        <span class="pfz-browser__dot" style="background:#7a9f5f;"></span>
        <span class="pfz-browser__url">${esc(kase.url)}</span>
      </div>
      <div class="pfz-browser__body">${websiteMockupHTML(kase)}</div>
    </div>
  </div>`.trim();
}

/** Native text nodes for website slot copy column (mobile mock stays in `code`). */
function websiteSlotTextBundle(slotTextWrap, kase, i) {
  const idx = String(i + 1).padStart(2, "0");
  const eyebrow = `pz-web-slot-${i}-eyebrow`;
  const h3 = `pz-web-slot-${i}-h3`;
  const tag = `pz-web-slot-${i}-tag`;
  const outcome = `pz-web-slot-${i}-outcome`;
  const metrics = `pz-web-slot-${i}-metrics`;
  const ids = [eyebrow, h3, tag, outcome, metrics];
  const metricsInner = kase.metrics
    .map(
      (m) => `<div><dt>${esc(m.label)}</dt><dd>${esc(m.value)}</dd></div>`,
    )
    .join("");
  const nodes = [
    textHtml(
      eyebrow,
      slotTextWrap,
      `↳ web · ${idx} · <span class="pfz-home__web-slot-eyebrow-year">${kase.year}</span>`,
      "p",
      `Website slot eyebrow · ${kase.client}`,
      "pfz-eyebrow pfz-eyebrow--primary pfz-home__web-slot-eyebrow",
    ),
    heading(
      h3,
      slotTextWrap,
      esc(kase.client),
      "h3",
      `Website slot title · ${kase.client}`,
      "pfz-display pfz-home__web-slot-h3",
    ),
    textBasic(
      tag,
      slotTextWrap,
      esc(kase.tagline),
      `Website slot tag · ${kase.client}`,
      "pfz-home__web-slot-tag",
      { tag: "p" },
    ),
    textBasic(
      outcome,
      slotTextWrap,
      esc(kase.outcome),
      `Website slot outcome · ${kase.client}`,
      "pfz-body pfz-home__web-slot-outcome",
      { tag: "p" },
    ),
    textHtml(
      metrics,
      slotTextWrap,
      `<dl class="pfz-home__web-slot-metrics">${metricsInner}</dl>`,
      "div",
      `Website slot metrics · ${kase.client}`,
      "pfz-home__web-slot-metrics-host",
    ),
  ];
  return { ids, nodes };
}

function brandMonoHTML(brand) {
  const accent = brand.palette[2] ?? brand.palette[0];
  const support = brand.palette[1];
  const yr = String(brand.year).slice(-2);
  const id = brand.slug.slice(0, 3).toUpperCase();
  return `
<div class="pfz-home__brand-mono">
  <div class="pfz-home__brand-mono-bg" aria-hidden="true" style="background:
    radial-gradient(ellipse 70% 60% at 30% 30%, ${accent}33, transparent 70%),
    radial-gradient(ellipse 80% 60% at 80% 80%, ${support}26, transparent 70%),
    var(--base-light);"></div>
  <div class="pfz-home__brand-mono-overlay" aria-hidden="true" style="background-image: radial-gradient(circle at 1px 1px, ${accent}66 1px, transparent 1.5px); background-size: 16px 16px;"></div>
  <span class="pfz-home__brand-mono-bracket pfz-home__brand-mono-bracket--tl" aria-hidden="true"></span>
  <span class="pfz-home__brand-mono-bracket pfz-home__brand-mono-bracket--tr" aria-hidden="true"></span>
  <span class="pfz-home__brand-mono-bracket pfz-home__brand-mono-bracket--bl" aria-hidden="true"></span>
  <span class="pfz-home__brand-mono-bracket pfz-home__brand-mono-bracket--br" aria-hidden="true"></span>
  <div class="pfz-home__brand-mono-meta pfz-home__brand-mono-meta--tl">
    <span>profuzion / brand</span>
    <span>${esc(brand.industry.toLowerCase())}</span>
  </div>
  <div class="pfz-home__brand-mono-meta pfz-home__brand-mono-meta--tr">
    case ${yr}-${id}
  </div>
  <div class="pfz-home__brand-mono-glyph" style="text-shadow: 0 0 80px ${accent}66;">
    ${esc(brand.glyph)}<span style="color: var(--primary);">.</span>
  </div>
  <div class="pfz-home__brand-mono-pal" aria-hidden="true">
    ${brand.palette.map((c) => `<span style="background:${c};"></span>`).join("")}
  </div>
  <div class="pfz-home__brand-mono-deliv">${brand.deliverables.length} deliverables</div>
</div>`.trim();
}

function websiteMockupHTML(kase) {
  return `
<div class="pfz-home__mockup" aria-hidden="true">
  <p class="pfz-home__mockup-eyebrow">${esc(kase.industry)} · ${kase.year}</p>
  <p class="pfz-home__mockup-h1">${esc(kase.client)}<span style="color:var(--primary);">.</span> <em>${esc(kase.tagline.split(" ").slice(0, 3).join(" "))}</em></p>
  <div class="pfz-home__mockup-cards">
    <div class="pfz-home__mockup-card"></div>
    <div class="pfz-home__mockup-card"></div>
    <div class="pfz-home__mockup-card"></div>
  </div>
</div>`.trim();
}

function processRowHTML(p) {
  return `
<li class="pfz-home__proc-row" data-pz-fade>
  <div>
    <span class="pfz-home__proc-num">${esc(p.n)} · ${esc(p.name)}</span>
    <p class="pfz-home__proc-name">${esc(p.name)}</p>
    <p class="pfz-home__proc-duration">${esc(p.duration)}</p>
  </div>
  <div>
    <h3 class="pfz-display pfz-home__proc-h3">${esc(p.headline)}</h3>
    <p class="pfz-home__proc-body">${esc(p.body)}</p>
    <ul class="pfz-home__proc-bullets">
      ${p.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}
    </ul>
  </div>
</li>`.trim();
}

/* ──────────────────────── Section builders ────────────────────────
 * Each returns [section, container, code] — section wraps a container
 * which holds one Bricks `code` element with the section HTML. The
 * code element is the editable surface in Bricks.
 * ──────────────────────────────────────────────────────────────── */

/** Hero bottom strip — mirrored in Bricks per-element Custom CSS (`_css.custom`, `%root%`). */
const HERO_BOTTOM_WRAP_CSS = `%root% {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;
}
@media (min-width: 640px) {
  %root% {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}`;

const HERO_BOTTOM_VLIST_ROW_CSS = `%root% {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1.5rem;
  font-family: var(--text-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--contrast-muted);
}`;

const HERO_BOTTOM_VLIST_ITEM_CSS = `%root% {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}`;

const HERO_BOTTOM_VLIST_DOT_CSS = `%root% {
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--contrast-muted-mid);
}`;

const HERO_BOTTOM_SCROLL_CSS = `%root% {
  margin: 0;
  font-family: var(--text-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--contrast-muted-mid);
}
%root% strong {
  font-weight: inherit;
  color: var(--contrast);
}`;

function heroSection() {
  const s = "pz-hero-s",
    c = "pz-hero-c",
    deco = "pz-hero-deco-html",
    inner = "pz-hero-inner",
    metaWrap = "pz-hero-meta-wrap",
    metaLoc = "pz-hero-meta-loc",
    metaAvail = "pz-hero-meta-avail",
    headline = "pz-hero-headline-div",
    heroTitle = "pz-hero-title-h1",
    heroLede = "pz-hero-lede-p",
    ctaWrap = "pz-hero-cta-div",
    btnBook = "pz-hero-btn-book",
    btnWork = "pz-hero-btn-work",
    botWrap = "pz-hero-bot-wrap",
    vRow = "pz-hero-vrow",
    scrollLine = "pz-hero-scroll-line";

  const halftoneDecor = `
<div data-pfz-halftone class="pfz-hero__halftone" aria-hidden="true"></div>
<div class="pfz-home__hero-darken" aria-hidden="true"></div>
<div class="pfz-home__hero-top-fade" aria-hidden="true"></div>
<div class="pfz-home__hero-void" aria-hidden="true"></div>
<div class="pfz-home__hero-bottom-fade" aria-hidden="true"></div>`.trim();

  const heroH1Inner = `
<span data-word>Brand</span> <span data-word>&amp;</span> <span data-word>Website</span> <span data-word>design</span><br/>
<span data-word>for</span> <span data-word>owners</span> <span data-word>who</span> <span data-word>want</span> <span data-word>to</span><br/>
<span data-word class="pfz-italic" style="color: var(--primary);">stand</span> <span data-word class="pfz-italic" style="color: var(--primary);">out</span><span data-word>.</span>`.trim();

  const heroLedeInner = `
Profuzion is the quiet design studio in Winkler, Manitoba — the one local
<span style="color: var(--contrast); font-weight: 500;">industry, construction, food production, and e-commerce</span>
send their best referrals to. Brands and websites built to read the way you sound across the desk.`.trim();

  const heroVerticalLabels = INDUSTRIES.map((ind) => ind.label);
  const itemIds = heroVerticalLabels.map((_, i) => `pz-hero-vitem-${i}`);
  const heroBottomStripNodes = heroVerticalLabels.flatMap((label, i) => {
    const item = itemIds[i];
    const dot = `pz-hero-vdot-${i}`;
    const lab = `pz-hero-vlab-${i}`;
    return [
      div(item, vRow, [dot, lab], `Hero · vertical · ${label}`, "pfz-home__hero-vlist-item", {
        _customCss: HERO_BOTTOM_VLIST_ITEM_CSS,
      }),
      div(dot, item, [], "Hero · dot", "pfz-home__hero-vlist-dot", {
        _attributes: [{ name: "aria-hidden", value: "true" }],
        _customCss: HERO_BOTTOM_VLIST_DOT_CSS,
      }),
      textBasic(lab, item, esc(label), `Hero · ${label}`, "pfz-home__hero-vlist-label", {
        tag: "span",
      }),
    ];
  });

  return [
    sectionPadded(
      s,
      "top",
      "§1 Hero (HTML ID: top)",
      [c],
      { top: "0", right: "0", bottom: "0", left: "0" },
      "pfz-home__hero",
    ),
    container(c, s, [deco, inner], "Hero shell", PFZ_HOME_CONTAINER),
    code(deco, c, halftoneDecor, "Hero · halftone decor", `${PFZ_BRICKS_HTML} pfz-home__hero-deco-html`),
    blockEl(inner, c, [metaWrap, headline, botWrap], "Hero inner", "pfz-home__hero-inner"),
    blockEl(metaWrap, inner, [metaLoc, metaAvail], "Hero · meta", "pfz-home__hero-meta", {
      _attributes: [{ name: "data-hero-meta", value: "" }],
    }),
    textBasic(
      metaLoc,
      metaWrap,
      `${esc(STUDIO.location.split(" · ")[0])} · since ${STUDIO.founded}`,
      "Hero · meta · location",
      "pfz-eyebrow pfz-home__hero-meta-line pfz-home__hero-meta-line--loc",
      { tag: "p" },
    ),
    textHtml(
      metaAvail,
      metaWrap,
      `<span class="pfz-home__avail-dot" aria-hidden="true"></span>${esc(STUDIO.availability)}`,
      "p",
      "Hero · meta · availability",
      "pfz-eyebrow pfz-eyebrow--primary pfz-home__hero-meta-line pfz-home__hero-meta-line--avail",
    ),
    blockEl(headline, inner, [heroTitle, heroLede, ctaWrap], "Hero headline", "pfz-home__hero-headline"),
    textHtml(
      heroTitle,
      headline,
      heroH1Inner,
      "h1",
      "Hero · title",
      "pfz-display pfz-display--xl pfz-home__hero-h1",
    ),
    textHtml(
      heroLede,
      headline,
      heroLedeInner,
      "p",
      "Hero · lede",
      "pfz-lede pfz-home__hero-lede",
      { _attributes: [{ name: "data-hero-meta", value: "" }] },
    ),
    blockEl(ctaWrap, headline, [btnBook, btnWork], "Hero CTAs", "pfz-home__hero-cta"),
    buttonEl(
      btnBook,
      ctaWrap,
      "Book a 30-min call →",
      "Hero · book",
      "btn--secondary pfz-home__hero-cta-btn pfz-home__hero-cta-btn--book",
      "#contact",
    ),
    buttonEl(
      btnWork,
      ctaWrap,
      "See the work ↓",
      "Hero · work",
      "btn--base btn--outline pfz-home__hero-cta-btn pfz-home__hero-cta-btn--work",
      "#branding",
    ),
    blockEl(botWrap, inner, [vRow, scrollLine], "Hero · bottom strip", "pfz-home__hero-bot-wrap", {
      _attributes: [{ name: "data-hero-meta", value: "" }],
      _customCss: HERO_BOTTOM_WRAP_CSS,
    }),
    blockEl(vRow, botWrap, itemIds, "Hero · verticals row", "pfz-home__hero-vlist-row", {
      _customCss: HERO_BOTTOM_VLIST_ROW_CSS,
    }),
    ...heroBottomStripNodes,
    textBasic(
      scrollLine,
      botWrap,
      `scroll ↓ · <strong>${esc(STUDIO.positioning)}</strong>`,
      "Hero · scroll cue",
      "pfz-home__hero-scroll-line",
      {
        tag: "p",
        _customCss: HERO_BOTTOM_SCROLL_CSS,
      },
    ),
  ];
}

function industriesSection() {
  const s = "pz-ind-s",
    c = "pz-ind-c",
    shell = "pz-ind-shell",
    indRule = "pz-ind-rule-html",
    metaRow = "pz-ind-meta-row",
    metaCol = "pz-ind-meta-col",
    metaEyebrow = "pz-ind-meta-eyebrow",
    metaH2 = "pz-ind-meta-h2",
    metaBody = "pz-ind-meta-body",
    bodyDiv = "pz-ind-body-grid",
    listDiv = "pz-ind-list-wrap",
    previewCol = "pz-ind-preview-col-div",
    previewStack = "pz-ind-preview-stack-div";

  const previewActiveId = INDUSTRIES[0].id;

  const itemSlotIds = INDUSTRIES.map((ind) => `pz-ind-slot-${ind.id}`);
  const previewCardIds = INDUSTRIES.map((ind) => `pz-ind-prev-${ind.id}`);

  const rowNodes = INDUSTRIES.flatMap((ind, i) => {
    const slotId = `pz-ind-slot-${ind.id}`;
    const btnId = `pz-ind-btn-${ind.id}`;
    const num = String(i + 1).padStart(2, "0");
    const isActive = ind.id === previewActiveId;
    const rowInnerHTML = `
    <span class="pfz-home__ind-row-num-group" style="display: flex; align-items: baseline; gap: 1.25rem;">
      <span class="pfz-home__ind-row-num">${num}</span>
      <span class="pfz-home__ind-row-label">${esc(ind.label)}</span>
    </span>
    <span class="pfz-home__ind-row-meta" data-ind-row-meta>${isActive ? "viewing" : "view"}</span>`;

    return [
      blockEl(slotId, listDiv, [btnId], `Industries · ${ind.label}`, "pfz-home__ind-slot", {
        _attributes: [
          { name: "role", value: "listitem" },
          { name: "data-ind-slot", value: ind.id },
        ],
      }),
      buttonEl(
        btnId,
        slotId,
        rowInnerHTML.trim(),
        `Industries · row · ${ind.label}`,
        `pfz-home__ind-row pfz-home__ind-row-btn${isActive ? " is-active" : ""}`,
        null,
        {
          _attributes: [
            { name: "type", value: "button" },
            { name: "data-ind-row", value: ind.id },
            { name: "data-cursor", value: "" },
            { name: "data-cursor-label", value: "reveal" },
          ],
        },
      ),
    ];
  });

  const previewCardNodes = INDUSTRIES.flatMap((ind) => {
    const cid = `pz-ind-prev-${ind.id}`;
    const imgId = `pz-ind-prev-${ind.id}-img`;
    const bodyHost = `pz-ind-prev-${ind.id}-body`;
    const gradCo = `pz-ind-prev-${ind.id}-grad-html`;
    const innerDiv = `pz-ind-prev-${ind.id}-inner`;
    const topRow = `pz-ind-prev-${ind.id}-top`;
    const kickId = `pz-ind-prev-${ind.id}-kick`;
    const dotHost = `pz-ind-prev-${ind.id}-dot-host`;
    const h3Id = `pz-ind-prev-${ind.id}-h3`;
    const ulId = `pz-ind-prev-${ind.id}-deliv-ul`;
    const proofId = `pz-ind-prev-${ind.id}-proof`;
    const isActive = ind.id === previewActiveId;
    const cardCls = `pfz-card pfz-home__ind-preview pfz-home__ind-preview-card${isActive ? " is-active" : ""}`;
    return [
      blockEl(cid, previewStack, [imgId, bodyHost], `Industry preview · ${ind.label}`, cardCls, {
        _attributes: [
          { name: "data-ind-preview-card", value: ind.id },
          { name: "aria-hidden", value: isActive ? "false" : "true" },
        ],
      }),
      imageEl(
        imgId,
        cid,
        `Industry · ${ind.label} · visual`,
        "pfz-home__ind-preview-shot",
        {
          url: industryHeroImageUrl(ind.id),
          external: true,
          alt: "",
        },
        {
          _attributes: [{ name: "aria-hidden", value: "true" }],
        },
      ),
      blockEl(bodyHost, cid, [gradCo, innerDiv], "Industry preview · body stack", "pfz-home__ind-preview-body"),
      code(
        gradCo,
        bodyHost,
        industryPreviewGradientHtml(ind),
        `Industry preview · gradient · ${ind.label}`,
        `${PFZ_BRICKS_HTML} pfz-home__ind-preview-bg-html`,
      ),
      blockEl(innerDiv, bodyHost, [topRow, h3Id, ulId, proofId], "Industry preview · inner", "pfz-home__ind-preview-inner"),
      blockEl(topRow, innerDiv, [kickId, dotHost], "Industry preview · top", "pfz-home__ind-preview-top"),
      textBasic(
        kickId,
        topRow,
        `↳ ${esc(ind.label.toLowerCase())}`,
        `Industry preview kicker · ${ind.label}`,
        "pfz-home__ind-preview-kicker",
        { tag: "p" },
      ),
      textHtml(
        dotHost,
        topRow,
        `<span class="pfz-home__ind-preview-dot" aria-hidden="true" style="background:${ind.hue}; box-shadow: 0 0 14px 2px ${ind.hue}88;"></span>`,
        "div",
        `Industry preview dot · ${ind.label}`,
        "pfz-home__ind-preview-dot-host",
        { _attributes: [{ name: "aria-hidden", value: "true" }] },
      ),
      heading(
        h3Id,
        innerDiv,
        esc(ind.lead),
        "h3",
        `Industry preview lead · ${ind.label}`,
        "pfz-display pfz-home__ind-preview-h3",
      ),
      list(
        ulId,
        innerDiv,
        ind.deliverables.map((d) => esc(d)),
        `Industry preview deliverables · ${ind.label}`,
        "pfz-home__ind-preview-deliv",
      ),
      textHtml(
        proofId,
        innerDiv,
        `&ldquo;${esc(ind.proof)}&rdquo;`,
        "p",
        `Industry preview proof · ${ind.label}`,
        "pfz-home__ind-preview-proof",
      ),
    ];
  });

  return [
    sectionPadded(
      s,
      "industries",
      "§2 Industries",
      [c],
      { top: "0", right: "0", bottom: "0", left: "0" },
      "pfz-home__sec",
    ),
    container(c, s, [shell], "Industries shell", PFZ_HOME_CONTAINER),
    blockEl(shell, c, [indRule, metaRow, bodyDiv], "Industries · padded shell", "pfz-home__shell pfz-home__sec-pad"),
    ruleBricksHtml(indRule, shell, "Industries · rule"),
    blockEl(metaRow, shell, [metaCol, metaBody], "Industries · meta row", "pfz-home__meta-row pfz-home__meta-row--gap-lg"),
    blockEl(metaCol, metaRow, [metaEyebrow, metaH2], "Industries · meta column", "pfz-home__meta-col pfz-home__meta-col--industries", {
      _attributes: [{ name: "data-ind-meta", value: "" }],
    }),
    textBasic(
      metaEyebrow,
      metaCol,
      "// who we are for",
      "Industries · eyebrow",
      "pfz-eyebrow pfz-eyebrow--primary pfz-home__meta-eyebrow",
      { tag: "p" },
    ),
    heading(
      metaH2,
      metaCol,
      "Four types of owners who<br/>keep coming back to us.",
      "h2",
      "Industries · heading",
      "pfz-display pfz-display--lg pfz-home__meta-h2",
    ),
    textBasic(
      metaBody,
      metaRow,
      "We don't pretend to be every studio for every business. These four verticals share something we've spent twenty-five years getting right — trust, said quietly.",
      "Industries · meta body",
      "pfz-body pfz-home__meta-body pfz-home__meta-body--industries",
      {
        tag: "p",
        _attributes: [{ name: "data-ind-meta", value: "" }],
      },
    ),
    blockEl(bodyDiv, shell, [listDiv, previewCol], "Industries · grid body", "pfz-home__ind-body", {
      _attributes: [{ name: "data-ind-root", value: "" }],
    }),
    blockEl(listDiv, bodyDiv, itemSlotIds, "Industries · list", "pfz-home__ind-list", {
      _attributes: [{ name: "role", value: "list" }],
    }),
    ...rowNodes,
    blockEl(previewCol, bodyDiv, [previewStack], "Industries · preview column", "pfz-home__ind-preview-col"),
    blockEl(previewStack, previewCol, previewCardIds, "Industries · preview stack", "pfz-home__ind-preview-stack"),
    ...previewCardNodes,
  ];
}

function founderSection() {
  const s = "pz-about-s",
    c = "pz-about-c",
    shellDiv = "pz-about-shell",
    ruleCo = "pz-about-rule-html",
    founderGrid = "pz-about-founder-grid",
    colPortrait = "pz-about-portrait-col",
    portraitWrap = "pz-about-portrait",
    portraitBgCo = "pz-about-portrait-bg-html",
    founderImg = "pz-about-portrait-img",
    portraitCapCo = "pz-about-portrait-caption-html",
    fcWrap = "pz-about-copy-wrap",
    introWrap = "pz-about-intro-wrap",
    eyebrowTb = "pz-about-eyebrow",
    headlineH2 = "pz-about-headline",
    ledeTb = "pz-about-lede",
    bodyTb = "pz-about-body",
    btn = "pz-about-cta-btn";

  const portraitBgHtml = `<div class="pfz-home__founder-portrait-overlay" aria-hidden="true" style="position:absolute;inset:0;z-index:1;background: radial-gradient(ellipse 60% 70% at 30% 30%, rgba(182,255,56,0.06), transparent 60%), linear-gradient(180deg, var(--base-light) 0%, var(--base) 100%); pointer-events:none;"></div>`;

  const portraitCapInner = `Lowell Klassen <span style="color:rgba(255,255,255,0.45);margin-inline:0.5em;" aria-hidden="true">·</span> Founder &amp; designer`;

  return [
    sectionPadded(
      s,
      "about",
      "§3 Founder",
      [c],
      { top: "0", right: "0", bottom: "0", left: "0" },
      "pfz-home__sec",
    ),
    container(c, s, [shellDiv], "Founder shell", PFZ_HOME_CONTAINER),
    blockEl(shellDiv, c, [ruleCo, founderGrid], "Founder padded shell", "pfz-home__shell pfz-home__sec-pad"),
    ruleBricksHtml(ruleCo, shellDiv, "Founder · rule"),
    blockEl(founderGrid, shellDiv, [colPortrait, fcWrap], "Founder grid", "pfz-home__founder-grid"),
    blockEl(colPortrait, founderGrid, [portraitWrap], "Founder portrait column", "pfz-home__founder-portrait-col", {
      _attributes: [{ name: "data-pz-fade", value: "" }],
    }),
    blockEl(portraitWrap, colPortrait, [portraitBgCo, founderImg, portraitCapCo], "Founder portrait", "pfz-home__founder-portrait"),
    code(
      portraitBgCo,
      portraitWrap,
      portraitBgHtml,
      "Founder · portrait overlay",
      `${PFZ_BRICKS_HTML} pfz-home__founder-portrait-overlay-html`,
    ),
    imageEl(founderImg, portraitWrap, "Founder headshot", "pfz-home__founder-photo", {
      url: FOUNDER_HEADSHOT_URL,
      external: true,
      alt: FOUNDER_IMAGE_ALT,
    }),
    textHtml(
      portraitCapCo,
      portraitWrap,
      portraitCapInner,
      "p",
      "Founder · portrait caption",
      "pfz-home__founder-portrait-caption",
      {
        _attributes: [
          {
            name: "style",
            value:
              "position:absolute;left:1rem;bottom:1rem;margin:0;font-family:var(--text-mono);font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.9);text-shadow:0 1px 12px rgba(0,0,0,0.4);z-index:2;",
          },
        ],
      },
    ),
    blockEl(fcWrap, founderGrid, [introWrap, ledeTb, bodyTb, btn], "Founder copy column", "pfz-home__founder-copy"),
    blockEl(introWrap, fcWrap, [eyebrowTb, headlineH2], "Founder · intro", "pfz-home__founder-intro", {
      _attributes: [{ name: "data-pz-fade", value: "" }],
    }),
    textBasic(
      eyebrowTb,
      introWrap,
      "// the founder",
      "Founder · eyebrow",
      "pfz-eyebrow pfz-eyebrow--primary pfz-home__founder-eyebrow",
      { tag: "p" },
    ),
    heading(
      headlineH2,
      introWrap,
      esc(FOUNDER.headline),
      "h2",
      "Founder · headline",
      "pfz-display pfz-display--lg pfz-home__meta-h2 pfz-home__founder-h2",
      {
        _attributes: [{ name: "id", value: "founder-heading" }],
      },
    ),
    textBasic(
      ledeTb,
      fcWrap,
      esc(FOUNDER.paragraphs[0]),
      "Founder · lede",
      "pfz-lede pfz-home__founder-lede",
      { tag: "p" },
    ),
    textBasic(
      bodyTb,
      fcWrap,
      esc(FOUNDER.paragraphs[1]),
      "Founder · body",
      "pfz-body pfz-home__founder-body",
      { tag: "p" },
    ),
    buttonEl(
      btn,
      fcWrap,
      "Write me directly →",
      "Founder · CTA",
      "btn--base btn--outline pfz-home__founder-cta pfz-home__founder-cta-btn",
      "#contact",
    ),
  ];
}

function brandingSection() {
  const s = "pz-brand-s",
    c = "pz-brand-c",
    shellDiv = "pz-brand-shell",
    ruleCo = "pz-brand-rule-html",
    metaRow = "pz-brand-meta-row",
    metaCol = "pz-brand-meta-col",
    metaEyebrow = "pz-brand-meta-eyebrow",
    metaH2 = "pz-brand-meta-h2",
    metaBody = "pz-brand-meta-body",
    wallDiv = "pz-brand-wall",
    brandListDiv = "pz-brand-spread-list";

  const wallCellIds = BRANDING_CASES.map((br) => `pz-brand-wall-${br.slug}`);
  const wallNodes = BRANDING_CASES.map((br, i) => {
    const bid = wallCellIds[i];
    const inner = `
      <span class="pfz-home__brand-wall-name">${esc(br.client)}</span>
      <div class="pfz-home__brand-wall-foot">
        <span class="pfz-home__brand-wall-foot-ind">${esc(br.industry)}</span>
        <span class="pfz-home__brand-wall-foot-yr">${esc(br.year)}</span>
      </div>`;
    return buttonEl(
      bid,
      wallDiv,
      inner.trim(),
      `Brand wall · ${br.client}`,
      "pfz-home__brand-wall-cell",
      `/work/${br.slug}/`,
      {
        _attributes: [
          { name: "data-cursor", value: "" },
          {
            name: "data-cursor-label",
            value: br.client.toLowerCase(),
          },
        ],
      },
    );
  });

  const spreadIds = BRANDING_CASES.map((br) => `pz-brand-spread-${br.slug}`);
  const spreadNodes = BRANDING_CASES.flatMap((brand, i) => {
    const sid = spreadIds[i];
    const monoCo = `pz-brand-spread-mono-${brand.slug}`;
    const detailWrap = `pz-brand-spread-detail-${brand.slug}`;
    const ctaBtn = `pz-brand-spread-cta-${brand.slug}`;
    const bundle = brandSpreadDetailBundle(detailWrap, brand, i);
    const flip = i % 2 === 1;
    const spreadCls = `pfz-home__brand-spread${flip ? " pfz-home__brand-spread--flip" : ""}`;
    return [
      blockEl(sid, brandListDiv, [monoCo, detailWrap], `Brand spread · ${brand.client}`, spreadCls, {
        _attributes: [{ name: "data-pz-fade", value: "" }],
      }),
      code(
        monoCo,
        sid,
        `<div class="pfz-home__brand-spread-mono">\n${brandMonoHTML(brand)}\n</div>`,
        `Brand spread mono · ${brand.client}`,
        `${PFZ_BRICKS_HTML} pfz-home__brand-spread-mono-html`,
      ),
      blockEl(
        detailWrap,
        sid,
        [...bundle.ids, ctaBtn],
        `Brand spread detail · ${brand.client}`,
        "pfz-home__brand-spread-detail",
      ),
      ...bundle.nodes,
      buttonEl(
        ctaBtn,
        detailWrap,
        `Read the case<span aria-hidden="true"> →</span>`,
        `Brand spread CTA · ${brand.client}`,
        "pfz-home__brand-spread-cta pfz-home__brand-spread-cta-btn",
        `/work/${brand.slug}/`,
        {
          _attributes: [
            { name: "data-cursor", value: "" },
            { name: "data-cursor-label", value: "open" },
          ],
        },
      ),
    ];
  });

  return [
    sectionPadded(
      s,
      "branding",
      "§4 Branding",
      [c],
      { top: "0", right: "0", bottom: "0", left: "0" },
      "pfz-home__sec pfz-home__sec--ink",
    ),
    container(c, s, [shellDiv], "Branding shell", PFZ_HOME_CONTAINER),
    blockEl(shellDiv, c, [ruleCo, metaRow, wallDiv, brandListDiv], "Branding padded shell", "pfz-home__shell pfz-home__sec-pad"),
    ruleBricksHtml(ruleCo, shellDiv, "Branding · rule"),
    blockEl(metaRow, shellDiv, [metaCol, metaBody], "Branding · meta row", "pfz-home__meta-row pfz-home__meta-row--gap-lg"),
    blockEl(metaCol, metaRow, [metaEyebrow, metaH2], "Branding · meta column", "pfz-home__meta-col pfz-home__meta-col--branding", {
      _attributes: [{ name: "data-pz-fade", value: "" }],
    }),
    textBasic(
      metaEyebrow,
      metaCol,
      "// brand systems",
      "Branding · eyebrow",
      "pfz-eyebrow pfz-eyebrow--primary pfz-home__meta-eyebrow",
      { tag: "p" },
    ),
    textHtml(
      metaH2,
      metaCol,
      `Identities built to <span class="pfz-italic" style="color: var(--primary);">outlive</span> the launch.`,
      "h2",
      "Branding · heading",
      "pfz-display pfz-display--lg pfz-home__meta-h2 pfz-home__meta-h2--branding",
    ),
    textBasic(
      metaBody,
      metaRow,
      "We treat a brand like a long-form decision. Every system we ship comes with a one-page voice doc — so the people we hand it to never stop sounding like themselves.",
      "Branding · meta body",
      "pfz-body pfz-home__meta-body pfz-home__meta-body--branding",
      {
        tag: "p",
        _attributes: [{ name: "data-pz-fade", value: "" }],
      },
    ),
    blockEl(wallDiv, shellDiv, wallCellIds, "Brand wall", "pfz-home__brand-wall", {
      _attributes: [{ name: "data-pz-fade", value: "" }],
    }),
    ...wallNodes,
    blockEl(brandListDiv, shellDiv, spreadIds, "Brand spreads", "pfz-home__brand-list", {
      _attributes: [{ name: "role", value: "list" }],
    }),
    ...spreadNodes,
  ];
}

function websitesSection() {
  const s = "pz-web-s",
    c = "pz-web-c",
    shellDiv = "pz-web-shell",
    ruleCo = "pz-web-rule-html",
    metaRow = "pz-web-meta-row",
    metaCol = "pz-web-meta-col",
    metaEyebrow = "pz-web-meta-eyebrow",
    metaH2 = "pz-web-meta-h2",
    metaBody = "pz-web-meta-body",
    webGrid = "pz-web-grid",
    stickyCol = "pz-web-sticky-col",
    stickyInner = "pz-web-sticky-inner",
    browserDiv = "pz-web-browser",
    barCo = "pz-web-browser-bar-html",
    browserBody = "pz-web-browser-body",
    progressWrap = "pz-web-progress",
    dotsCo = "pz-web-dots-html",
    counterTb = "pz-web-counter-line",
    slotListDiv = "pz-web-slot-list";

  const layerIds = WEBSITE_CASES.map((_, i) => `pz-web-layer-${i}`);
  const layerNodes = WEBSITE_CASES.flatMap((kase, i) => {
    const lid = `pz-web-layer-${i}`;
    const imgId = `pz-web-layer-${i}-shot`;
    const mockId = `pz-web-layer-${i}-mock-html`;
    const layerCls = `pfz-home__web-mockup-layer${i === 0 ? " is-active" : ""}`;
    return [
      blockEl(lid, browserBody, [imgId, mockId], `Web mockup layer · ${kase.client}`, layerCls, {
        _attributes: [{ name: "data-web-mockup", value: String(i) }],
      }),
      imageEl(
        imgId,
        lid,
        `Screenshot · ${kase.client}`,
        "pfz-home__web-mockup-shot",
        {
          url: caseWebScreenshotUrl(kase.slug),
          external: true,
          alt: "",
        },
        {
          _attributes: [{ name: "aria-hidden", value: "true" }],
        },
      ),
      code(
        mockId,
        lid,
        websiteMockupHTML(kase),
        `Web mockup procedural · ${kase.client}`,
        `${PFZ_BRICKS_HTML} pfz-home__web-mockup-html`,
      ),
    ];
  });

  const slotIds = WEBSITE_CASES.map((_, i) => `pz-web-slot-${i}`);
  const slotNodes = WEBSITE_CASES.flatMap((kase, i) => {
    const sid = slotIds[i];
    const slotMain = `pz-web-slot-${i}-main`;
    const mobileCo = `pz-web-slot-${i}-mobile-html`;
    const slotTextWrap = `pz-web-slot-${i}-text`;
    const bundle = websiteSlotTextBundle(slotTextWrap, kase, i);
    const footDiv = `pz-web-slot-${i}-foot`;
    const chipId = `pz-web-slot-${i}-chip`;
    const btnId = `pz-web-slot-${i}-btn`;
    return [
      blockEl(sid, slotListDiv, [slotMain, footDiv], `Website slot · ${kase.client}`, "pfz-home__web-slot", {
        _attributes: [
          { name: "data-web-slot", value: "" },
          { name: "data-idx", value: String(i) },
          { name: "data-url", value: kase.url },
        ],
      }),
      blockEl(slotMain, sid, [mobileCo, slotTextWrap], `Website slot main · ${kase.client}`, "pfz-home__web-slot-main"),
      code(
        mobileCo,
        slotMain,
        websiteSlotMobileOnlyHTML(kase),
        `Website slot mobile mock · ${kase.client}`,
        `${PFZ_BRICKS_HTML} pfz-home__web-slot-mobile-html`,
      ),
      blockEl(
        slotTextWrap,
        slotMain,
        bundle.ids,
        `Website slot copy · ${kase.client}`,
        "pfz-home__web-slot-copy",
      ),
      ...bundle.nodes,
      blockEl(footDiv, sid, [chipId, btnId], "Website slot foot", "pfz-home__web-slot-foot"),
      textBasic(chipId, footDiv, esc(kase.industry), `Website slot chip · ${kase.client}`, "pfz-home__web-chip pfz-home__web-slot-chip", {
        tag: "span",
      }),
      buttonEl(
        btnId,
        footDiv,
        `Read the case<span aria-hidden="true"> →</span>`,
        `Website slot CTA · ${kase.client}`,
        "pfz-home__brand-spread-cta pfz-home__web-slot-cta-btn",
        `/work/${kase.slug}/`,
        {
          _attributes: [
            { name: "data-cursor", value: "" },
            { name: "data-cursor-label", value: "open" },
          ],
        },
      ),
    ];
  });

  const dotsUl = `<ul class="pfz-home__web-progress-dots">
${WEBSITE_CASES.map((_, i) => `<li data-web-dot="${i}"${i === 0 ? ` class="is-active"` : ""}></li>`).join("\n")}
</ul>`;

  const barHtml = `<div class="pfz-browser__bar pfz-home__web-browser-bar">
            <span class="pfz-browser__dot" style="background:#e26b49;"></span>
            <span class="pfz-browser__dot" style="background:#e3b04b;"></span>
            <span class="pfz-browser__dot" style="background:#7a9f5f;"></span>
            <span class="pfz-browser__url" data-web-url>${esc(WEBSITE_CASES[0].url)}</span>
          </div>`;

  const counterText = `case 01 / ${String(WEBSITE_CASES.length).padStart(2, "0")}`;

  return [
    sectionPadded(
      s,
      "websites",
      "§5 Websites",
      [c],
      { top: "0", right: "0", bottom: "0", left: "0" },
      "pfz-home__sec",
    ),
    container(c, s, [shellDiv], "Websites shell", PFZ_HOME_CONTAINER),
    blockEl(shellDiv, c, [ruleCo, metaRow, webGrid], "Websites padded shell", "pfz-home__shell pfz-home__sec-pad"),
    ruleBricksHtml(ruleCo, shellDiv, "Websites · rule"),
    blockEl(metaRow, shellDiv, [metaCol, metaBody], "Websites · meta row", "pfz-home__meta-row pfz-home__meta-row--gap-lg"),
    blockEl(metaCol, metaRow, [metaEyebrow, metaH2], "Websites · meta column", "pfz-home__meta-col pfz-home__meta-col--websites", {
      _attributes: [{ name: "data-pz-fade", value: "" }],
    }),
    textBasic(
      metaEyebrow,
      metaCol,
      "// websites in production",
      "Websites · eyebrow",
      "pfz-eyebrow pfz-eyebrow--primary pfz-home__meta-eyebrow",
      { tag: "p" },
    ),
    textHtml(
      metaH2,
      metaCol,
      `Sites that <span class="pfz-italic" style="color: var(--primary);">close</span> the call.`,
      "h2",
      "Websites · heading",
      "pfz-display pfz-display--lg pfz-home__meta-h2 pfz-home__meta-h2--websites",
    ),
    textBasic(
      metaBody,
      metaRow,
      "Built for performance. Tuned for Core Web Vitals, AI search, and the owner who has to update the rates page herself on a Tuesday at 10pm.",
      "Websites · meta body",
      "pfz-body pfz-home__meta-body pfz-home__meta-body--websites",
      {
        tag: "p",
        _attributes: [{ name: "data-pz-fade", value: "" }],
      },
    ),
    blockEl(webGrid, shellDiv, [stickyCol, slotListDiv], "Websites grid", "pfz-home__web-grid", {
      _attributes: [{ name: "data-web-root", value: "" }],
    }),
    blockEl(stickyCol, webGrid, [stickyInner], "Websites sticky column", "pfz-home__web-sticky-col"),
    blockEl(stickyInner, stickyCol, [browserDiv, progressWrap], "Websites sticky inner", "pfz-home__web-sticky"),
    blockEl(browserDiv, stickyInner, [barCo, browserBody], "Websites browser chrome host", "pfz-browser pfz-home__web-browser-host"),
    code(barCo, browserDiv, barHtml.trim(), "Websites · browser chrome", `${PFZ_BRICKS_HTML} pfz-home__web-browser-bar-html`),
    blockEl(browserBody, browserDiv, layerIds, "Websites mockup layers", "pfz-browser__body pfz-home__web-browser-body"),
    ...layerNodes,
    blockEl(progressWrap, stickyInner, [dotsCo, counterTb], "Websites progress", "pfz-home__web-progress"),
    code(dotsCo, progressWrap, dotsUl.trim(), "Websites · progress dots", `${PFZ_BRICKS_HTML} pfz-home__web-progress-dots-html`),
    textBasic(counterTb, progressWrap, counterText, "Websites · counter", "pfz-home__web-progress-counter", {
      tag: "p",
      _attributes: [{ name: "data-web-counter", value: "" }],
    }),
    blockEl(slotListDiv, webGrid, slotIds, "Website slots", "pfz-home__web-slot-list", {
      _attributes: [{ name: "role", value: "list" }],
    }),
    ...slotNodes,
  ];
}

function processSection() {
  const s = "pz-proc-s",
    c = "pz-proc-c",
    shellDiv = "pz-proc-shell",
    ruleCo = "pz-proc-rule-html",
    metaRow = "pz-proc-meta-row",
    metaCol = "pz-proc-meta-col",
    metaEyebrow = "pz-proc-meta-eyebrow",
    metaH2 = "pz-proc-meta-h2",
    metaBody = "pz-proc-meta-body",
    gridCo = "pz-proc-grid-html";

  const procGridHtml = `
<div class="pfz-home__proc-grid">
    <div class="pfz-home__proc-rail" aria-hidden="true"></div>
    <ol class="pfz-home__proc-list">
      ${PHASES.map(processRowHTML).join("")}
    </ol>
  </div>`.trim();

  return [
    sectionPadded(
      s,
      "process",
      "§6 Process",
      [c],
      { top: "0", right: "0", bottom: "0", left: "0" },
      "pfz-home__sec",
    ),
    container(c, s, [shellDiv], "Process shell", PFZ_HOME_CONTAINER),
    blockEl(shellDiv, c, [ruleCo, metaRow, gridCo], "Process padded shell", "pfz-home__shell pfz-home__sec-pad"),
    ruleBricksHtml(ruleCo, shellDiv, "Process · rule"),
    blockEl(metaRow, shellDiv, [metaCol, metaBody], "Process · meta row", "pfz-home__meta-row pfz-home__meta-row--gap-lg"),
    blockEl(metaCol, metaRow, [metaEyebrow, metaH2], "Process · meta column", "pfz-home__meta-col pfz-home__meta-col--process", {
      _attributes: [{ name: "data-pz-fade", value: "" }],
    }),
    textBasic(
      metaEyebrow,
      metaCol,
      "// how we work",
      "Process · eyebrow",
      "pfz-eyebrow pfz-eyebrow--primary pfz-home__meta-eyebrow",
      { tag: "p" },
    ),
    heading(
      metaH2,
      metaCol,
      "Five rounds. No<br/>surprise invoices.",
      "h2",
      "Process · heading",
      "pfz-display pfz-display--lg pfz-home__meta-h2 pfz-home__meta-h2--process",
    ),
    textBasic(
      metaBody,
      metaRow,
      "We work in fixed phases on a scoped quote. You see the studio brief in week one, the first design rounds in week three, and a launched site somewhere between week six and eight.",
      "Process · meta body",
      "pfz-body pfz-home__meta-body pfz-home__meta-body--process",
      {
        tag: "p",
        _attributes: [{ name: "data-pz-fade", value: "" }],
      },
    ),
    code(gridCo, shellDiv, procGridHtml, "Process · phases grid", `${PFZ_BRICKS_HTML} pfz-home__proc-grid-html`),
  ];
}

function engagementsSection() {
  const s = "pz-eng-s",
    c = "pz-eng-c",
    shellDiv = "pz-eng-shell",
    ruleCo = "pz-eng-rule-html",
    metaRow = "pz-eng-meta-row",
    metaCol = "pz-eng-meta-col",
    metaEyebrow = "pz-eng-meta-eyebrow",
    metaH2 = "pz-eng-meta-h2",
    metaBody = "pz-eng-meta-body",
    engGrid = "pz-eng-grid";

  const cardWrapIds = ENGAGEMENTS.map((e) => `pz-eng-${e.id}-card`);

  const cardNodes = ENGAGEMENTS.flatMap((e) => {
    const wrap = `pz-eng-${e.id}-card`;
    const fadeRoot = `pz-eng-${e.id}-fade`;
    const favId = `pz-eng-${e.id}-fav`;
    const h3Id = `pz-eng-${e.id}-h3`;
    const metaId = `pz-eng-${e.id}-meta`;
    const descId = `pz-eng-${e.id}-desc`;
    const ulId = `pz-eng-${e.id}-ul`;
    const bId = `pz-eng-${e.id}-btn`;
    const cardCls = `pfz-home__eng-card${e.primary ? " pfz-home__eng-card--primary" : ""}`;
    const btnCls = `${e.primary ? "btn--primary" : "btn--base btn--outline"} pfz-home__eng-card-cta pfz-home__eng-card-cta-btn`;
    const fadeChildIds = e.primary ? [favId, h3Id, metaId, descId, ulId] : [h3Id, metaId, descId, ulId];

    const nodes = [
      blockEl(wrap, engGrid, [fadeRoot, bId], `Engagement · ${e.name}`, cardCls),
      div(fadeRoot, wrap, fadeChildIds, `Engagement · ${e.name} fade`, "", {
        _attributes: [{ name: "data-pz-fade", value: "" }],
        _customCss: `%root% { display: contents; }`,
      }),
    ];
    if (e.primary) {
      nodes.push(
        textBasic(favId, fadeRoot, "Studio favourite", `Engagement · ${e.name} fav`, "pfz-home__eng-card-fav", {
          tag: "span",
        }),
      );
    }
    nodes.push(
      heading(h3Id, fadeRoot, esc(e.name), "h3", `Engagement · ${e.name} title`, ""),
      textHtml(
        metaId,
        fadeRoot,
        `<span>${esc(e.duration)}</span><span aria-hidden="true">·</span><strong>${esc(e.shape)}</strong>`,
        "div",
        `Engagement · ${e.name} meta`,
        "pfz-home__eng-card-meta",
      ),
      textBasic(descId, fadeRoot, esc(e.description), `Engagement · ${e.name} desc`, "", { tag: "p" }),
      list(
        ulId,
        fadeRoot,
        e.includes.map((inc) => esc(inc)),
        `Engagement · ${e.name} list`,
        "",
      ),
      buttonEl(bId, wrap, `${esc(e.cta)} →`, `Engagement · ${e.name} CTA`, btnCls, "#contact"),
    );
    return nodes;
  });

  return [
    sectionPadded(
      s,
      "engagements",
      "§7 Engagements",
      [c],
      { top: "0", right: "0", bottom: "0", left: "0" },
      "pfz-home__sec pfz-home__sec--paper-light",
    ),
    container(c, s, [shellDiv], "Engagements shell", PFZ_HOME_CONTAINER),
    blockEl(shellDiv, c, [ruleCo, metaRow, engGrid], "Engagements padded shell", "pfz-home__shell pfz-home__sec-pad"),
    ruleBricksHtml(ruleCo, shellDiv, "Engagements · rule"),
    blockEl(metaRow, shellDiv, [metaCol, metaBody], "Engagements · meta row", "pfz-home__meta-row pfz-home__meta-row--gap-lg"),
    blockEl(metaCol, metaRow, [metaEyebrow, metaH2], "Engagements · meta column", "pfz-home__meta-col pfz-home__meta-col--engagements", {
      _attributes: [{ name: "data-pz-fade", value: "" }],
    }),
    textBasic(
      metaEyebrow,
      metaCol,
      "// engagements",
      "Engagements · eyebrow",
      "pfz-eyebrow pfz-eyebrow--primary pfz-home__meta-eyebrow",
      { tag: "p" },
    ),
    textHtml(
      metaH2,
      metaCol,
      `Three ways to <span class="pfz-italic" style="color: var(--primary);">start</span>.`,
      "h2",
      "Engagements · heading",
      "pfz-display pfz-display--lg pfz-home__meta-h2 pfz-home__meta-h2--engagements",
    ),
    textBasic(
      metaBody,
      metaRow,
      "Most owners book the full project. Some start with the brand and add the site later. Tend is for the long haul — quarterly rounds, no tickets.",
      "Engagements · meta body",
      "pfz-body pfz-home__meta-body pfz-home__meta-body--engagements",
      {
        tag: "p",
        _attributes: [{ name: "data-pz-fade", value: "" }],
      },
    ),
    blockEl(engGrid, shellDiv, cardWrapIds, "Engagements grid", "pfz-home__eng-grid"),
    ...cardNodes,
  ];
}

function quoteSection() {
  const s = "pz-quote-s",
    c = "pz-quote-c",
    shellOuter = "pz-quote-shell",
    ruleCo = "pz-quote-rule-html",
    quoteWrap = "pz-quote-inner-wrap",
    photoId = "pz-quote-photo-img",
    eyebrowTb = "pz-quote-eyebrow",
    blockTb = "pz-quote-blockquote";

  const words = PULL_QUOTE.text.split(" ");
  const quoteInner = `<p class="pfz-italic pfz-home__quote-text">
      <span aria-hidden="true" style="color: var(--primary); margin-right: 0.18em;">&ldquo;</span>${words
        .map((w) => `<span data-quote-word style="display:inline-block;margin-right:0.16em;">${esc(w)}</span>`)
        .join("")}<span aria-hidden="true" style="color: var(--primary);">&rdquo;</span>
    </p>
    <footer class="pfz-home__quote-foot">
      <span class="pfz-home__quote-foot-cite">${esc(PULL_QUOTE.source)}</span>
    </footer>`;

  return [
    sectionPadded(
      s,
      "quote",
      "§8 Pull quote",
      [c],
      { top: "0", right: "0", bottom: "0", left: "0" },
      "pfz-home__sec",
    ),
    container(c, s, [shellOuter], "Quote shell", PFZ_HOME_CONTAINER),
    blockEl(shellOuter, c, [ruleCo, quoteWrap], "Quote · outer", "pfz-home__quote-shell"),
    ruleBricksHtml(ruleCo, shellOuter, "Quote · rule"),
    blockEl(
      quoteWrap,
      shellOuter,
      [photoId, eyebrowTb, blockTb],
      "Quote · inner",
      "pfz-home__shell pfz-home__quote-inner pfz-home__quote-inner--photo",
    ),
    imageEl(photoId, quoteWrap, "Quote · founder photo", "pfz-home__quote-photo", {
      url: FOUNDER_HEADSHOT_URL,
      external: true,
      alt: FOUNDER_IMAGE_ALT,
    }),
    textBasic(
      eyebrowTb,
      quoteWrap,
      "// founder voice",
      "Quote · eyebrow",
      "pfz-eyebrow pfz-eyebrow--primary pfz-home__quote-eyebrow",
      { tag: "p" },
    ),
    textHtml(
      blockTb,
      quoteWrap,
      quoteInner.trim(),
      "blockquote",
      "Quote · blockquote",
      "pfz-home__quote",
      {
        _attributes: [{ name: "style", value: "margin:0;" }],
      },
    ),
  ];
}

function ctaSection() {
  const s = "pz-cta-s",
    c = "pz-cta-c",
    shellDiv = "pz-cta-shell",
    ruleCo = "pz-cta-rule-html",
    ctaGridDiv = "pz-cta-grid",
    leftCol = "pz-cta-left",
    introWrap = "pz-cta-intro-stack",
    introEyebrow = "pz-cta-intro-eyebrow",
    introH2 = "pz-cta-intro-h2",
    introBody = "pz-cta-intro-body",
    listWrap = "pz-cta-contact-list",
    rowMail = "pz-cta-row-mail",
    rowPhone = "pz-cta-row-phone",
    rowStudio = "pz-cta-row-studio",
    rowHours = "pz-cta-row-hours",
    availWrap = "pz-cta-avail",
    availDot = "pz-cta-avail-dot",
    availLbl = "pz-cta-avail-lbl",
    rightCol = "pz-cta-right",
    formWrap = "pz-cta-form-wrap",
    formIntroStack = "pz-cta-form-intro-stack",
    formBar = "pz-cta-form-bar",
    formBarL = "pz-cta-form-bar-l",
    formBarR = "pz-cta-form-bar-r",
    formIntroBody = "pz-cta-form-intro-body",
    btn = "pz-cta-email-btn";

  const loc = STUDIO.location.split(" · ")[0];

  return [
    sectionPadded(
      s,
      "contact",
      "§9 CTA",
      [c],
      { top: "0", right: "0", bottom: "0", left: "0" },
      "pfz-home__sec",
    ),
    container(c, s, [shellDiv], "CTA shell", PFZ_HOME_CONTAINER),
    blockEl(shellDiv, c, [ruleCo, ctaGridDiv], "CTA padded shell", "pfz-home__shell pfz-home__sec-pad"),
    ruleBricksHtml(ruleCo, shellDiv, "CTA · rule"),
    blockEl(ctaGridDiv, shellDiv, [leftCol, rightCol], "CTA grid", "pfz-home__cta-grid"),
    blockEl(leftCol, ctaGridDiv, [introWrap, listWrap, availWrap], "CTA · left column", "pfz-home__cta-left"),
    blockEl(introWrap, leftCol, [introEyebrow, introH2, introBody], "CTA · intro", "pfz-home__cta-intro", {
      _attributes: [{ name: "data-pz-fade", value: "" }],
    }),
    textBasic(
      introEyebrow,
      introWrap,
      "// start a conversation",
      "CTA · eyebrow",
      "pfz-eyebrow pfz-eyebrow--primary pfz-home__cta-intro-eyebrow",
      { tag: "p" },
    ),
    textHtml(
      introH2,
      introWrap,
      `Ready when <span class="pfz-italic" style="color: var(--primary);">you</span> are.`,
      "h2",
      "CTA · headline",
      "pfz-display pfz-display--lg pfz-home__cta-h2 pfz-home__cta-intro-h2",
      {
        _attributes: [{ name: "data-pz-fade", value: "" }],
      },
    ),
    textBasic(
      introBody,
      introWrap,
      "The fastest way to start is a 30-minute call. No pitch deck. We ask three questions, you ask three, we both leave with a clear next step.",
      "CTA · intro body",
      "pfz-body pfz-home__cta-intro-body",
      {
        tag: "p",
        _attributes: [
          { name: "data-pz-fade", value: "" },
          { name: "style", value: "margin-top:1.5rem;max-width:28rem;" },
        ],
      },
    ),
    blockEl(listWrap, leftCol, [rowMail, rowPhone, rowStudio, rowHours], "CTA · contact rows", "pfz-home__cta-list", {
      _attributes: [{ name: "data-pz-fade", value: "" }],
    }),
    div(rowMail, listWrap, ["pz-cta-lbl-direct", "pz-cta-btn-mail"], "CTA row · email", "pfz-home__cta-row"),
    textBasic("pz-cta-lbl-direct", rowMail, "Direct", "CTA · Direct label", "label pfz-home__cta-label", {
      tag: "span",
    }),
    buttonEl(
      "pz-cta-btn-mail",
      rowMail,
      esc(STUDIO.email),
      "CTA · mail link",
      "val pfz-home__cta-value",
      `mailto:${STUDIO.email}`,
      {
        _attributes: [
          { name: "data-cursor", value: "" },
          { name: "data-cursor-label", value: "direct" },
        ],
      },
    ),
    div(rowPhone, listWrap, ["pz-cta-lbl-phone", "pz-cta-btn-phone"], "CTA row · phone", "pfz-home__cta-row"),
    textBasic("pz-cta-lbl-phone", rowPhone, "Phone", "CTA · Phone label", "label pfz-home__cta-label", {
      tag: "span",
    }),
    buttonEl(
      "pz-cta-btn-phone",
      rowPhone,
      esc(STUDIO.phone),
      "CTA · phone link",
      "val pfz-home__cta-value",
      "tel:+12043626171",
      {
        _attributes: [
          { name: "data-cursor", value: "" },
          { name: "data-cursor-label", value: "phone" },
        ],
      },
    ),
    div(rowStudio, listWrap, ["pz-cta-lbl-studio", "pz-cta-val-studio"], "CTA row · studio", "pfz-home__cta-row"),
    textBasic("pz-cta-lbl-studio", rowStudio, "Studio", "CTA · Studio label", "label pfz-home__cta-label", {
      tag: "span",
    }),
    textBasic(
      "pz-cta-val-studio",
      rowStudio,
      `${esc(loc)} · ${esc(STUDIO.postalCode)}`,
      "CTA · Studio value",
      "val pfz-home__cta-value",
      { tag: "span" },
    ),
    div(rowHours, listWrap, ["pz-cta-lbl-hours", "pz-cta-val-hours"], "CTA row · hours", "pfz-home__cta-row"),
    textBasic("pz-cta-lbl-hours", rowHours, "Hours", "CTA · Hours label", "label pfz-home__cta-label", {
      tag: "span",
    }),
    textBasic(
      "pz-cta-val-hours",
      rowHours,
      "Mon–Thu, 9–5 CT · Friday, by appointment",
      "CTA · Hours value",
      "val pfz-home__cta-value",
      { tag: "span" },
    ),
    blockEl(availWrap, leftCol, [availDot, availLbl], "CTA · availability strip", "pfz-home__cta-avail", {
      _attributes: [
        { name: "data-pz-fade", value: "" },
        {
          name: "style",
          value: "margin-top:3rem;display:flex;align-items:center;gap:0.75rem;",
        },
      ],
    }),
    div(availDot, availWrap, [], "CTA · avail dot", "pfz-home__avail-dot", {
      _attributes: [{ name: "aria-hidden", value: "true" }],
    }),
    textBasic(
      availLbl,
      availWrap,
      esc(STUDIO.availability),
      "CTA · availability label",
      "pfz-home__cta-avail-label",
      {
        tag: "span",
        _attributes: [
          {
            name: "style",
            value:
              "font-family:var(--text-mono);font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--primary);",
          },
        ],
      },
    ),
    blockEl(rightCol, ctaGridDiv, [formWrap], "CTA · right column", "pfz-home__cta-right", {
      _attributes: [{ name: "data-pz-fade", value: "" }],
    }),
    blockEl(formWrap, rightCol, [formIntroStack, btn], "CTA · form", "pfz-home__cta-form"),
    blockEl(formIntroStack, formWrap, [formBar, formIntroBody], "CTA · form intro", "pfz-home__cta-form-intro"),
    blockEl(formBar, formIntroStack, [formBarL, formBarR], "CTA · form bar", "pfz-home__cta-form-bar"),
    textBasic(formBarL, formBar, "New project intake", "CTA · form bar left", "l pfz-home__cta-form-bar-l", {
      tag: "span",
    }),
    textBasic(
      formBarR,
      formBar,
      "Reply within one business day",
      "CTA · form bar right",
      "r pfz-home__cta-form-bar-r",
      { tag: "span" },
    ),
    textBasic(
      formIntroBody,
      formIntroStack,
      "Briefly describe what you're building and your timeline. Email opens your usual mail client — same inbox we answer Monday–Thursday.",
      "CTA · form helper",
      "pfz-body pfz-home__cta-form-helper",
      {
        tag: "p",
        _attributes: [
          { name: "style", value: "font-size:14px;color:var(--contrast-muted);margin:0 0 1.5rem;" },
        ],
      },
    ),
    buttonEl(
      btn,
      formWrap,
      "Email the studio →",
      "CTA · email",
      "btn--primary pfz-home__cta-email-btn",
      `mailto:${STUDIO.email}`,
    ),
  ];
}

/** Homepage body sections (no header/footer). Mirrors the v6 React preview. */
export function buildHomeContent() {
	return [
		...heroSection(),
		...industriesSection(),
		...founderSection(),
		...brandingSection(),
		...websitesSection(),
		...processSection(),
		...engagementsSection(),
		...quoteSection(),
		...ctaSection(),
	];
}

/** Used by the case-page generator's "Keep exploring" related grid. */
export const HOME_NAV_LINKS = NAV_LINKS;
export const HOME_STUDIO = STUDIO;
