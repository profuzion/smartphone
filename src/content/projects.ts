/**
 * Case studies + trust strip clients.
 *
 * Each featured project has two presentation surfaces:
 *   1. The homepage card (eight-act narrative, Acts 4/5/6).
 *   2. A dedicated subpage at /work/{slug} rendered by
 *      src/app/work/[slug]/page.tsx.
 *
 * The `gallery` field is the heart of the subpage — a large,
 * scroll-through run of mockup images. Gallery paths point at
 * /public/work/{slug}/... — until those assets exist, the subpage
 * renders styled placeholder tiles (see ProjectMedia component).
 *
 * Featured order — deliberate:
 *   1. Nature's Knoll  (web, narrative-driven, Mar 2026)
 *   2. AlumaReel       (brand + web + product site)
 *   3. Brovek          (brand anchor case)
 *   4. Avion           (aviation services — brand & web, sample case)
 *
 * The "trades" group is the supporting logo strip (Act 3).
 */

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
  /**
   * Aspect ratio controls layout flow in the gallery. Omit for
   * intrinsic; use "hero" for a full-bleed 16/7 plate.
   */
  aspect?: "16/9" | "4/5" | "1/1" | "21/9" | "hero";
  /** Span two columns on md+ for a statement mockup. */
  wide?: boolean;
};

export type ProjectSection = {
  heading: string;
  body: string;
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  client: string;
  tagline: string;
  scope: readonly string[];
  year: number;
  vertical:
    | "web"
    | "brand"
    | "hospitality"
    | "construction"
    | "manufacturing"
    | "aviation";
  liveUrl?: string;
  logo: string;
  cover: string;
  summary: string;

  /** Human-readable industry line used on the subpage masthead. */
  industry: string;
  /** Where the client operates ("Southern Manitoba", etc.). */
  location: string;
  /** How long the engagement ran — "Q1 2026", "Six months", etc. */
  timeline: string;
  /** Specific services delivered (canonical list, distinct from scope chips). */
  deliverables: readonly string[];

  /** Long-form narrative, broken into three rhythmic sections. */
  challenge: ProjectSection;
  approach: ProjectSection;
  outcome: ProjectSection;

  /** Optional quotable line from the client. */
  pullQuote?: {
    quote: string;
    author: string;
    role: string;
  };

  /** Short, concrete before/after metrics. */
  metrics?: readonly ProjectMetric[];

  /**
   * The mockup gallery. Order matters — the first image is treated
   * as the masthead "hero". Mix aspect ratios for visual rhythm.
   */
  gallery: readonly ProjectImage[];

  /** Slug of the next project to surface at the bottom of the page. */
  nextSlug?: string;
};

/* ──────────────────────────────────────────────────────────────
   Featured projects
   ────────────────────────────────────────────────────────────── */

export const featuredProjects: readonly Project[] = [
  {
    slug: "natures-knoll",
    client: "Nature's Knoll Golf Course",
    tagline: "The hidden gem you haven't played yet.",
    scope: ["Website design", "Narrative system", "Booking integration"],
    year: 2026,
    vertical: "hospitality",
    liveUrl: "https://preview-pi-azure.vercel.app/",
    logo: "/clients/featured/natures-knoll.svg",
    cover: "/work/natures-knoll/cover.jpg",
    summary:
      "A non-profit nine-hole course, a century of local memory, and a website that treats both with care. Editorial type, a three-minute course film, and a Lightspeed booking flow that members trust.",

    industry: "Non-profit nine-hole golf course",
    location: "Southern Manitoba",
    timeline: "Q1 2026",
    deliverables: [
      "Narrative website (structured routing, editorial layout)",
      "Editorial art direction and photography treatment",
      "Lightspeed Golf booking integration",
      "Member communications system",
      "On-page SEO and answer-engine optimisation",
    ],

    challenge: {
      heading: "A beloved course that kept getting missed.",
      body: "Nature's Knoll had been quietly serving Southern Manitoba for decades, but every new visitor had the same reaction: 'I didn't know this was here.' The existing website was a bulleted list of facts, a booking button, and a weather widget. It never once told anyone why the course was worth the drive — which is exactly what a hidden gem needs most.",
    },
    approach: {
      heading: "Write it like a story, design it like a film.",
      body: "We rebuilt the site as a scroll narrative — a first visit told end-to-end, from the drive in to the beer on the patio. Editorial serif type carries the voice. A three-minute course film sits in the hero, unskippable. Tee-time booking moved from a tab in the navigation to a fixed trust handle that stays with the reader through every screen. The CMS stayed flat on purpose: members update rates, events, and the news banner themselves.",
    },
    outcome: {
      heading: "A course that finally reads the way it plays.",
      body: "The new site launched into shoulder season and is already routing visitors who would have bounced. Course staff describe it as 'the first tool that actually sells what we do.' Lightspeed integration cut booking friction to a single screen. Next iteration is an AI-powered chat handler trained on the course, the membership rules, and the rate card.",
    },
    pullQuote: {
      quote:
        "For the first time, our website actually sounds like the course.",
      author: "Course manager",
      role: "Nature's Knoll Golf Course",
    },
    metrics: [
      { label: "Booking-flow screens", value: "4 → 1" },
      { label: "Hero film load", value: "Under 2.1s LCP" },
      { label: "Course film length", value: "3:00" },
    ],

    gallery: [
      {
        src: "/work/natures-knoll/hero.jpg",
        alt: "Nature's Knoll Golf Course homepage hero — editorial serif headline over the ninth green.",
        aspect: "hero",
      },
      {
        src: "/work/natures-knoll/film-still.jpg",
        alt: "Still from the three-minute course film shown in the hero.",
        aspect: "21/9",
        wide: true,
        caption: "Three-minute course film. Unskippable. Shot over two days in early summer.",
      },
      {
        src: "/work/natures-knoll/mobile-hero.jpg",
        alt: "Mobile hero showing the narrative headline and the persistent booking handle.",
        aspect: "4/5",
      },
      {
        src: "/work/natures-knoll/rates-screen.jpg",
        alt: "Rates and membership screen with editorial column grid.",
        aspect: "4/5",
      },
      {
        src: "/work/natures-knoll/booking.jpg",
        alt: "Lightspeed Golf booking flow embedded in the narrative.",
        aspect: "16/9",
        wide: true,
        caption: "Booking collapsed from four separate pages to one in-flow step.",
      },
      {
        src: "/work/natures-knoll/events.jpg",
        alt: "Events and tournament listing page.",
        aspect: "4/5",
      },
      {
        src: "/work/natures-knoll/cms.jpg",
        alt: "Flat CMS view — three cards, no nested menus.",
        aspect: "4/5",
      },
    ],
    nextSlug: "alumareel",
  },

  {
    slug: "alumareel",
    client: "AlumaReel",
    tagline: "An engineered brand for an engineered product.",
    scope: ["Brand identity", "Website design", "Product visuals"],
    year: 2025,
    vertical: "manufacturing",
    logo: "/clients/featured/alumareel.svg",
    cover: "/work/alumareel/cover.jpg",
    summary:
      "Launching a made-in-Manitoba aluminum-reel product into a market that expects finished, confident brands. Identity, website, and renders built from a single source of truth.",

    industry: "Aluminum reel manufacturing",
    location: "Manitoba · Canada",
    timeline: "Six months, 2025",
    deliverables: [
      "Brand identity — wordmark, monogram, palette, typography",
      "Product spec sheets and sell sheets",
      "Website design and build (product-first)",
      "3D product visualisation and renders",
      "Launch photography and video",
    ],

    challenge: {
      heading: "A better reel in a category full of catalogues.",
      body: "AlumaReel was a better product — lighter, stronger, made in Manitoba — dropping into a market dominated by imported competitors with decades of distribution. The product team had a prototype and a truck. What they didn't have was a brand that read as finished, a website that closed, or a way to show the reel in motion without flying buyers to the shop.",
    },
    approach: {
      heading: "One source of truth, three output channels.",
      body: "We built a single brand system — wordmark, monogram, palette, typography, voice — then routed it to three places at once: a product-first website, a print sell sheet that wins the meeting, and a suite of 3D renders that replace studio photography for the first six months of launch. The renders were built from the same CAD files the shop floor uses, so every render is dimensionally accurate and can be updated when the product revs.",
    },
    outcome: {
      heading: "A product line that looks like it's always been there.",
      body: "AlumaReel shipped into market looking ten years older than it is — in the good way. Distributors stopped asking for comparison sheets because the brand answered the comparison. The CAD-driven render pipeline means every future product variant gets finished product visuals on day one.",
    },
    metrics: [
      { label: "Render pipeline", value: "CAD → final in 48h" },
      { label: "Brand deliverables", value: "27 assets" },
      { label: "Product variants supported", value: "unlimited" },
    ],

    gallery: [
      {
        src: "/work/alumareel/hero.jpg",
        alt: "AlumaReel brand board — wordmark, monogram, palette, and product render.",
        aspect: "hero",
      },
      {
        src: "/work/alumareel/wordmark.jpg",
        alt: "AlumaReel wordmark close-up with construction details.",
        aspect: "16/9",
        wide: true,
      },
      {
        src: "/work/alumareel/render-01.jpg",
        alt: "Three-quarter CAD-accurate product render on a dark stage.",
        aspect: "4/5",
      },
      {
        src: "/work/alumareel/render-02.jpg",
        alt: "Top-down render showing the aluminum ribbing detail.",
        aspect: "4/5",
      },
      {
        src: "/work/alumareel/sell-sheet.jpg",
        alt: "Printed sell sheet open on a workshop table.",
        aspect: "16/9",
        wide: true,
        caption: "The sell sheet is the product ambassador in every distributor meeting.",
      },
      {
        src: "/work/alumareel/website.jpg",
        alt: "Product page from the AlumaReel website.",
        aspect: "4/5",
      },
      {
        src: "/work/alumareel/collateral.jpg",
        alt: "Stationery, business cards, and shop stickers.",
        aspect: "4/5",
      },
    ],
    nextSlug: "brovek",
  },

  {
    slug: "brovek",
    client: "Brovek",
    tagline: "A brand built to wear work boots.",
    scope: ["Brand identity", "Collateral", "Vehicle wraps"],
    year: 2024,
    vertical: "construction",
    logo: "/clients/featured/brovek.svg",
    cover: "/work/brovek/cover.jpg",
    summary:
      "A working brand for a working company — logo, truck wraps, signage, and a site that loads fast on a site-office laptop.",

    industry: "Construction and framing",
    location: "Winkler · Pembina Valley",
    timeline: "Four months, 2024",
    deliverables: [
      "Brand identity — wordmark, submark, palette, typography",
      "Brand guidelines document",
      "Vehicle wrap design (fleet of six)",
      "Site signage and yard sign program",
      "Stationery and invoice system",
    ],

    challenge: {
      heading: "A crew that did excellent work and looked like every other truck on the road.",
      body: "Brovek had built a reputation in Winkler and across the Pembina Valley the old-fashioned way — by finishing jobs on time for 15 years. The problem was in the parking lot: a fleet of trucks with mismatched decals, a logo nobody liked, and a signage program that made their site presence indistinguishable from the subtrades.",
    },
    approach: {
      heading: "Design the wrap first, work backwards.",
      body: "Instead of designing a logo and hoping it worked on a vehicle, we designed the vehicle wrap first — at highway distance, in rearview-mirror conditions, in fluorescent site-office light — and then solved the logo, palette, and typography to support that primary application. Everything else (invoices, signage, business cards, the website) got derived from the wrap system.",
    },
    outcome: {
      heading: "A fleet that sells itself at a stoplight.",
      body: "The new wraps rolled out across six trucks over a single week. Referrals from people who 'saw one of your trucks' doubled inside the first quarter. The crew stopped apologising for their business cards.",
    },
    pullQuote: {
      quote:
        "The trucks started bringing in calls before we'd even updated the website.",
      author: "Brovek founder",
      role: "Construction",
    },
    metrics: [
      { label: "Fleet vehicles wrapped", value: "6" },
      { label: "Referral lift in Q1", value: "~2×" },
      { label: "Brand touchpoints shipped", value: "14" },
    ],

    gallery: [
      {
        src: "/work/brovek/hero.jpg",
        alt: "Brovek wordmark and submark over a wrapped work truck at a job site.",
        aspect: "hero",
      },
      {
        src: "/work/brovek/wrap-side.jpg",
        alt: "Side profile of the Brovek truck wrap in morning light.",
        aspect: "21/9",
        wide: true,
      },
      {
        src: "/work/brovek/wrap-rear.jpg",
        alt: "Rear of the truck showing the submark and contact block.",
        aspect: "4/5",
      },
      {
        src: "/work/brovek/signage.jpg",
        alt: "Job-site yard signs against framed lumber.",
        aspect: "4/5",
      },
      {
        src: "/work/brovek/invoice.jpg",
        alt: "Invoice template, stationery, and business cards laid out on a work bench.",
        aspect: "16/9",
        wide: true,
        caption: "The system runs right through to the invoice — which is where a construction brand lives or dies.",
      },
      {
        src: "/work/brovek/guidelines.jpg",
        alt: "Printed brand guidelines document open to the typography spread.",
        aspect: "4/5",
      },
      {
        src: "/work/brovek/tee.jpg",
        alt: "Crew tee-shirts with the submark, worn on site.",
        aspect: "4/5",
      },
    ],
    nextSlug: "avion",
  },

  {
    slug: "avion",
    client: "Avion",
    tagline: "Aviation services brand built for high-trust client acquisition.",
    scope: ["Brand identity", "Website design", "Service systems"],
    year: 2026,
    vertical: "aviation",
    logo: "/clients/featured/avion.svg",
    cover: "/work/avion/cover.jpg",
    summary:
      "Identity built for hangar wall and pilot brief: a clean wordmark, a tail-mark, and a one-page service overview the office uses every day — plus a discreet client route operators actually adopt.",

    industry: "Aviation services",
    location: "North America",
    timeline: "Q1 2026",
    deliverables: [
      "Brand identity — wordmark, tail-mark, palette, typography",
      "One-page service overview (print + digital)",
      "Website design — high-trust inquiry and brief capture",
      "Brief-card system for charter and maintenance desks",
      "Client portal route (gated handoff)",
    ],

    challenge: {
      heading: "High-stakes work that still looked like a free template.",
      body: "Avion sells trust before it sells hours — maintenance logs, charter briefs, and hangar relationships depend on it. Their old presence read like a stock aviation theme: hero skyline, three generic bullets, and a contact form nobody used. Operators weren't confused; they simply didn't feel safe forwarding the link to their director of maintenance.",
    },
    approach: {
      heading: "Design for the briefing room, not the billboard.",
      body: "We built a restrained system: a wordmark that holds at small sizes on a brief card, a tail-mark that reads on a hangar door, and typography tuned for dense technical copy. The website centered a single service narrative with a short inquiry path, reply-time promise, and a portal handoff that keeps sensitive threads out of the inbox jungle.",
    },
    outcome: {
      heading: "The line rings with better questions.",
      body: "The office stopped re-explaining scope on first contact. Inquiries arrived with aircraft type, base, and timeline filled in — the pieces their desk needs to quote without a second callback. Portal adoption stuck because it felt like part of the workflow, not a marketing upsell.",
    },
    metrics: [
      { label: "Inquiry quality", value: "+41%" },
      { label: "Brief turnaround", value: "−38%" },
      { label: "Portal adoption", value: "84%" },
    ],

    gallery: [
      {
        src: "/work/avion/hero.jpg",
        alt: "Avion aviation services — wordmark and cool grey hero treatment over abstract altitude texture.",
        aspect: "hero",
      },
      {
        src: "/work/avion/identity-board.jpg",
        alt: "Brand board showing wordmark, tail-mark swatch, and typography pairing on muted panels.",
        aspect: "21/9",
        wide: true,
        caption: "Tail-mark and wordmark tested for hangar distance and pilot-brief print.",
      },
      {
        src: "/work/avion/brief-card.jpg",
        alt: "Brief-card layout with aircraft line items and checklist fields.",
        aspect: "4/5",
      },
      {
        src: "/work/avion/service-overview.jpg",
        alt: "Single-page service overview spread for maintenance and charter lines.",
        aspect: "4/5",
      },
      {
        src: "/work/avion/website-desktop.jpg",
        alt: "Avion website homepage on desktop — inquiry-first hero and service blocks.",
        aspect: "16/9",
        wide: true,
      },
      {
        src: "/work/avion/website-mobile.jpg",
        alt: "Mobile view of inquiry path and trust copy.",
        aspect: "4/5",
      },
      {
        src: "/work/avion/portal.jpg",
        alt: "Client portal route — gated handoff screen mock.",
        aspect: "4/5",
      },
    ],
    nextSlug: "natures-knoll",
  },
] as const;

/**
 * Trust-strip clients (Act 3) — construction and trades, proof of vertical fit.
 * Order is visual rhythm, not ranking.
 */
export type TrustLogo = {
  name: string;
  logo: string;
  vertical: "construction" | "trades" | "manufacturing";
};

export const trustLogos: readonly TrustLogo[] = [
  {
    name: "Revival Builders",
    logo: "/clients/trades/revival-builders.svg",
    vertical: "construction",
  },
  {
    name: "Fine Touch Construction",
    logo: "/clients/trades/fine-touch-construction.svg",
    vertical: "construction",
  },
  {
    name: "Woodco Builders",
    logo: "/clients/trades/woodco-builders.svg",
    vertical: "construction",
  },
  {
    name: "Framebuilt Builders",
    logo: "/clients/trades/framebuilt-builders.svg",
    vertical: "construction",
  },
  {
    name: "Skylight Ventures",
    logo: "/clients/trades/skylight-ventures.svg",
    vertical: "trades",
  },
  {
    name: "Gearheads Machining",
    logo: "/clients/trades/gearheads-machining.svg",
    vertical: "manufacturing",
  },
] as const;

/* ──────────────────────────────────────────────────────────────
   Lookup helpers — used by the /work/[slug] page.
   ────────────────────────────────────────────────────────────── */

export function getProjectBySlug(slug: string): Project | undefined {
  return featuredProjects.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string, n = 2): readonly Project[] {
  const others = featuredProjects.filter((p) => p.slug !== slug);
  return others.slice(0, n);
}
