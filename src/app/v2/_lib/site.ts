/**
 * Profuzion · v2 — content store.
 *
 * Pulls real Profuzion case studies from src/content/projects.ts and adds
 * v2-only narrative content (manifesto, industries-served, services, quote).
 *
 * Audience: industrial, contractors, food producers, e-commerce.
 */

import { site } from "@/content/site";
import { featuredProjects } from "@/content/projects";

/* ──────────────────────── Studio identity ──────────────────────── */

export const studio = {
  name: "Profuzion",
  monogram: "PZ",
  positioning: "Brand & Website design. Mastered.",
  founded: 1999,
  location: "Winkler, Manitoba · Pembina Valley",
  availability: "now booking summer 2026",
};

/* ──────────────────────── Founder (About) ──────────────────────── */

export const founderIntro = {
  name: site.founder.name,
  role: site.founder.jobTitle,
  imageSrc: site.founder.headshot,
  imageAlt: `${site.founder.name} — ${site.founder.jobTitle} · Winkler, Manitoba`,
  headline: "One studio. One person on the call.",
  /**
   * Short back story — v2 copy; keep aligned with / content/site for facts
   * (year founded, direct relationship with clients).
   */
  paragraphs: [
    `I founded Profuzion in ${site.foundingYear} at a single desk in Winkler — not to follow design trends, but to help owners who have to be understood the first time and trusted the second. Lawyers, agents, shop floors, and front desks: the work has always been about clarity, not volume.`,
    "The stack changes every few years. The promise doesn't: a brand and site you can hand to a new hire without a translation layer. When you hire the studio, you work with me from first call to launch — no account manager, no handoff to someone who wasn’t in the room for the brief.",
  ] as const,
};

/* ──────────────────────── Manifesto ──────────────────────── */

export const manifesto = {
  eyebrow: "// what we believe",
  body: [
    "Most websites for service businesses look like they were ordered from a catalogue. Same hero photo. Same testimonial slider. Same forgettable trust.",
    "We build brands and sites that read the way you sound across the desk — calm, certain, unmistakeably yours. The kind a referral lands on and finishes the call.",
  ],
  signature: "— Profuzion · since 1999",
};

/* ──────────────────────── Industries ──────────────────────── */

export type Industry = {
  id: string;
  label: string;
  /** Single-line lead — used in the chip and the hover panel header */
  lead: string;
  /** What you actually deliver for this vertical */
  deliverables: readonly string[];
  /** A subtle proof line — shown when this industry is hovered */
  proof: string;
  /** Tinted accent overlay for the procedural panel preview */
  hue: string;
};

export const industries: readonly Industry[] = [
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
] as const;

/* ──────────────────────── Branding cases ──────────────────────── *
 * Pulls projects whose vertical or scope reads brand-led.
 * Layout for the showcase is a museum-style logo wall + spread.
 */

export type BrandingCase = {
  slug: string;
  client: string;
  tagline: string;
  industry: string;
  year: number;
  /** A single line summary — < 100 chars */
  summary: string;
  /** Brand mark glyph or wordmark to render. Procedural fallback if undefined. */
  glyph?: string;
  /** Color trio shown as a swatch strip */
  palette: readonly [string, string, string];
  /** A typography pairing label — display / body */
  typePair: { display: string; body: string };
  /** Three deliverables to stamp on the spread */
  deliverables: readonly [string, string, string];
};

export const brandingCases: readonly BrandingCase[] = [
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
    slug: "natures-knoll",
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
    slug: "concept-keystone-law",
    client: "Keystone & Co.",
    tagline: "A law firm that writes the way it advises.",
    industry: "Law · partnership",
    year: 2026,
    summary:
      "A serif-led identity built for trust and longevity — a wordmark, partner monograms, and a long-form firm history.",
    glyph: "K&Co",
    palette: ["#1c2230", "#a59882", "#f2eee5"],
    typePair: { display: "Tiempos Headline", body: "Söhne Buch" },
    deliverables: ["Wordmark + crest", "Firm history", "Stationery"],
  },
] as const;

/* ──────────────────────── Website cases ──────────────────────── */

export type WebsiteCase = {
  slug: string;
  client: string;
  tagline: string;
  industry: string;
  year: number;
  /** URL shown in the browser-frame mockup */
  url: string;
  /** One-line outcome */
  outcome: string;
  /** Three before/after stat lines */
  metrics: readonly [
    { label: string; value: string },
    { label: string; value: string },
    { label: string; value: string },
  ];
  /** Visual style key — drives the procedural mockup */
  styleKey:
    | "editorial-hospitality"
    | "manufacturing-product"
    | "law-firm"
    | "real-estate"
    | "fitness"
    | "coach";
  /** Accent color for the mockup */
  accent: string;
};

export const websiteCases: readonly WebsiteCase[] = [
  {
    slug: "natures-knoll",
    client: "Nature's Knoll Golf Course",
    tagline: "A nine-hole story, shot like a film.",
    industry: "Hospitality · golf",
    year: 2026,
    url: "naturesknoll.ca",
    outcome:
      "A scroll-narrative homepage with a three-minute course film and Lightspeed booking integration in a single screen.",
    metrics: [
      { label: "Booking screens", value: "4 → 1" },
      { label: "LCP", value: "2.1s" },
      { label: "Course film", value: "3:00" },
    ],
    styleKey: "editorial-hospitality",
    accent: "#2a3a28",
  },
  {
    slug: "alumareel",
    client: "AlumaReel",
    tagline: "Catalogue product, finished site.",
    industry: "Manufacturing · product",
    year: 2025,
    url: "alumareel.com",
    outcome:
      "A product-first homepage that closes — anchored by CAD-driven renders that ship from the same files the shop floor uses.",
    metrics: [
      { label: "Render → site", value: "48h" },
      { label: "Variants", value: "unlimited" },
      { label: "Brand assets", value: "27" },
    ],
    styleKey: "manufacturing-product",
    accent: "#0F0E0C",
  },
  {
    slug: "concept-keystone-law",
    client: "Keystone & Co.",
    tagline: "A firm site that reads like a partnership letter.",
    industry: "Law · concept",
    year: 2026,
    url: "keystone.law",
    outcome:
      "Editorial firm history, partner-led practice pages, and an intake flow built like a private consultation, not a form.",
    metrics: [
      { label: "Bounce", value: "−42%" },
      { label: "Intake friction", value: "−5 fields" },
      { label: "Time on page", value: "+3:11" },
    ],
    styleKey: "law-firm",
    accent: "#1c2230",
  },
  {
    slug: "concept-pembina-realty",
    client: "Pembina Realty",
    tagline: "Listings that feel like the place.",
    industry: "Real estate · concept",
    year: 2026,
    url: "pembinarealty.ca",
    outcome:
      "Listing-led discovery, editorial property write-ups, and a search experience that respects how buyers actually browse.",
    metrics: [
      { label: "Listings → tours", value: "+38%" },
      { label: "Saved searches", value: "+2.6×" },
      { label: "Map vs list", value: "61 / 39" },
    ],
    styleKey: "real-estate",
    accent: "#7d6650",
  },
  {
    slug: "concept-northpoint-fitness",
    client: "Northpoint Fitness",
    tagline: "Energy without the screaming.",
    industry: "Fitness · concept",
    year: 2026,
    url: "northpoint.fit",
    outcome:
      "Schedule-first homepage, coach pages with intro reels, and a class-pack flow that doesn't bury the price.",
    metrics: [
      { label: "First-class signup", value: "+74%" },
      { label: "Drop-off", value: "−51%" },
      { label: "Mobile share", value: "82%" },
    ],
    styleKey: "fitness",
    accent: "#b85838",
  },
] as const;

/* ──────────────────────── Process ──────────────────────── */

export type Phase = {
  n: string;
  name: string;
  duration: string;
  headline: string;
  body: string;
  bullets: readonly string[];
};

export const phases: readonly Phase[] = [
  {
    n: "01",
    name: "Listen",
    duration: "Week 1",
    headline: "We start at the desk you actually work from.",
    body: "Two long conversations. We learn how you sound to a referral, what your worst client taught you, and what you want to be three years from now.",
    bullets: [
      "Founder interview",
      "Audience read-throughs",
      "Audit of current touchpoints",
    ],
  },
  {
    n: "02",
    name: "Frame",
    duration: "Weeks 2–3",
    headline: "Positioning, voice, and the shape of the work.",
    body: "We write the studio brief — one page, no decks. It names the audience, the shape of the brand, and the three things the website has to earn.",
    bullets: [
      "Studio brief (1 page)",
      "Voice document",
      "Sitemap and message hierarchy",
    ],
  },
  {
    n: "03",
    name: "Design",
    duration: "Weeks 3–6",
    headline: "Identity and screens — drawn together, not in series.",
    body: "Brand system and website design happen on the same canvas. A wordmark earns its weight by working at 11pt in a footer and 110pt on a vehicle.",
    bullets: [
      "Mark, palette, typography",
      "Page-by-page art direction",
      "Two rounds of revisions",
    ],
  },
  {
    n: "04",
    name: "Ship",
    duration: "Weeks 6–8",
    headline: "Built, tested, indexed, handed over.",
    body: "Built in Next.js, tuned for Core Web Vitals, structured for AI search and Google. We hand over a site you can update without us.",
    bullets: [
      "Performance + accessibility pass",
      "SEO + AEO setup",
      "Owner training",
    ],
  },
  {
    n: "05",
    name: "Tend",
    duration: "Ongoing (optional)",
    headline: "Quarterly rounds keep the work earning its keep.",
    body: "Most owners stay on a small monthly retainer for content updates, evergreen SEO, and a quarterly health check. No tickets, no surprise invoices.",
    bullets: [
      "Quarterly content rounds",
      "Performance + AEO maintenance",
      "Direct line to the founder",
    ],
  },
];

/* ──────────────────────── Services / engagements ──────────────────────── */

export type Engagement = {
  id: string;
  name: string;
  duration: string;
  shape: string;
  description: string;
  includes: readonly string[];
  primary?: boolean;
  cta: string;
};

export const engagements: readonly Engagement[] = [
  {
    id: "brand",
    name: "Brand system",
    duration: "4–6 weeks",
    shape: "fixed-scope quote",
    description:
      "Founder interview, positioning, mark, palette, typography, voice document, and a one-page studio brief. Everything you need to brief the next thing yourself.",
    includes: [
      "Founder interview + audit",
      "Mark + monogram",
      "Palette + typography",
      "Voice document",
      "Stationery starter kit",
    ],
    cta: "Start the brand →",
  },
  {
    id: "site",
    name: "Brand & website",
    duration: "8–10 weeks",
    shape: "fixed-scope quote · most owners start here",
    description:
      "The full project. Brand system + a Next.js website built to perform — Core Web Vitals, AI search, Google Business, the works.",
    includes: [
      "Everything in Brand system",
      "Sitemap + message hierarchy",
      "Page-by-page art direction",
      "Next.js build + CMS",
      "Performance + SEO + AEO",
    ],
    primary: true,
    cta: "Book the project →",
  },
  {
    id: "tend",
    name: "Tend (retainer)",
    duration: "Monthly",
    shape: "small monthly retainer",
    description:
      "Quarterly content rounds, evergreen SEO, performance maintenance, and a direct line to the founder. No tickets, no surprise invoices.",
    includes: [
      "Quarterly content updates",
      "Evergreen SEO + AEO",
      "Performance reviews",
      "Direct founder access",
    ],
    cta: "Add Tend →",
  },
];

/* ──────────────────────── Editorial pull-quote ──────────────────────── */

export const pullQuote = {
  text: "We don't sell websites. We design the version of you that earns the next call — and then we make sure the site is the easy part.",
  source: "Profuzion · founder voice doc, v3",
};

/* ──────────────────────── Re-export helper for SEO consistency ──────────────────────── */

export const projects = featuredProjects;
