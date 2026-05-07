/**
 * Service catalogue — drives the Services section, the navigation,
 * and the 9x Service JSON-LD schemas in layout.tsx.
 *
 * `tier` defines narrative priority:
 *   primary   → Web, Brand, AI (Acts 4-6 in the scroll).
 *   extended  → adjacent services (still offered; covered in Act 7 ecosystem).
 */

export type ServiceTier = "primary" | "extended";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  tier: ServiceTier;
  headline: string;
  oneLiner: string;
  bullets: readonly string[];
  /** Keywords injected into Service JSON-LD + meta. */
  keywords: readonly string[];
};

export const services: readonly Service[] = [
  // ── Primary ────────────────────────────────────────────────────
  {
    slug: "website-design",
    name: "Website Design",
    shortName: "Web",
    tier: "primary",
    headline: "Websites that work as hard as you do.",
    oneLiner:
      "Fast, accessible, conversion-focused websites for Winkler and Pembina Valley businesses. Built for owners who answer their own phone.",
    bullets: [
      "Custom builds or WordPress — whichever fits your team.",
      "Core Web Vitals–grade performance on mobile.",
      "Content you can update without calling us.",
      "Local SEO structure baked in from the first wireframe.",
    ],
    keywords: [
      "website design Winkler",
      "web design Pembina Valley",
      "construction website design Manitoba",
      "trades website design Winkler",
    ],
  },
  {
    slug: "brand-design",
    name: "Brand Design",
    shortName: "Brand",
    tier: "primary",
    headline: "Logos that belong on a truck, a sign, a jersey.",
    oneLiner:
      "Brand identity systems built for businesses that live on job sites, storefronts, and community pages — not moodboards.",
    bullets: [
      "Logo, marks, typography, and a practical colour system.",
      "Vehicle wraps, signage, and print-ready artwork.",
      "Written brand guidelines your team will actually open.",
      "Named to rank in local search — not to sound clever.",
    ],
    keywords: [
      "brand design Winkler",
      "logo design Pembina Valley",
      "construction brand design Manitoba",
      "trades logo design Winkler",
    ],
  },
  {
    slug: "website-ai-integration",
    name: "Website AI Integration",
    shortName: "AI",
    tier: "primary",
    headline: "AI that earns its keep, not its buzzword.",
    oneLiner:
      "Pilot programs using chatbots, lead routing, and on-site search — built on 27 years of craft, not three weeks of hype.",
    bullets: [
      "Customer-service chatbots trained on your own content.",
      "AI-powered quoting and booking flows.",
      "Early-adopter pricing for Manitoba businesses in 2026.",
      "Launched on websites we build — or websites you already own.",
    ],
    keywords: [
      "website AI integration Manitoba",
      "AI chatbot Winkler",
      "AI-powered website Pembina Valley",
      "custom chatbot Winkler",
    ],
  },

  // ── Extended ───────────────────────────────────────────────────
  {
    slug: "graphic-design",
    name: "Graphic Design",
    shortName: "Graphic",
    tier: "extended",
    headline: "Print, packaging, and collateral done right.",
    oneLiner:
      "Brochures, catalogues, trade-show booths, and the small-but-important things a growing business prints weekly.",
    bullets: [
      "Print + digital collateral, designed once and reusable.",
      "Sell-sheets, one-pagers, and proposal templates.",
      "Packaging and label design with press-ready files.",
    ],
    keywords: [
      "graphic design Winkler",
      "print design Manitoba",
      "packaging design Pembina Valley",
    ],
  },
  {
    slug: "signage-vehicle-wraps",
    name: "Signage & Vehicle Wraps",
    shortName: "Signage",
    tier: "extended",
    headline: "Your brand on the road and on the street.",
    oneLiner:
      "Wraps, decals, and exterior signage designed to be readable at a glance — because your truck is your billboard.",
    bullets: [
      "Full-colour vehicle wrap design.",
      "Storefront and yard signage.",
      "Install-ready artwork, colour-matched and proofed.",
    ],
    keywords: [
      "vehicle wrap design Winkler",
      "signage design Pembina Valley",
      "trades truck wrap Manitoba",
    ],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    shortName: "E-comm",
    tier: "extended",
    headline: "Online stores built to sell, not to sit.",
    oneLiner:
      "Shopify and WooCommerce storefronts with honest inventory, real-world shipping, and a tidy admin.",
    bullets: [
      "Shopify, WooCommerce, or a custom headless build.",
      "Payments, shipping, tax — set up once, set up right.",
      "Product photography and merchandising guidance.",
    ],
    keywords: [
      "e-commerce Winkler",
      "Shopify website Manitoba",
      "online store Pembina Valley",
    ],
  },
  {
    slug: "seo-local-search",
    name: "SEO & Local Search",
    shortName: "SEO",
    tier: "extended",
    headline: "Getting found in Winkler — and by AI.",
    oneLiner:
      "Local SEO, Google Business Profile tuning, schema markup, and emerging Answer-Engine Optimization for AI search.",
    bullets: [
      "Google Business Profile setup and ongoing optimization.",
      "Structured data (schema.org) built into every page.",
      "llms.txt and AEO prep so AI engines quote you, not your competitor.",
    ],
    keywords: [
      "SEO Winkler",
      "local SEO Manitoba",
      "answer engine optimization Pembina Valley",
    ],
  },
  {
    slug: "hosting-care",
    name: "Hosting & Care Plans",
    shortName: "Care",
    tier: "extended",
    headline: "The site we built, kept quietly running.",
    oneLiner:
      "Managed hosting, backups, security, and monthly edits — a predictable line-item, not a surprise invoice.",
    bullets: [
      "Fast, Canadian-friendly hosting options.",
      "Weekly backups and uptime monitoring.",
      "Monthly edit allowance — use it or save it.",
    ],
    keywords: [
      "website hosting Winkler",
      "website maintenance Manitoba",
      "website care plan Pembina Valley",
    ],
  },
  {
    slug: "photography-video",
    name: "Photography & Video",
    shortName: "Photo",
    tier: "extended",
    headline: "Your real crew, on your real jobsite.",
    oneLiner:
      "Brand photography, drone footage, and short-form video — the assets that make your website and socials actually yours.",
    bullets: [
      "On-location jobsite and crew photography.",
      "Drone aerials for build progress and final handoff.",
      "Short-form video for social and landing pages.",
    ],
    keywords: [
      "brand photography Winkler",
      "drone photography Manitoba",
      "construction video Pembina Valley",
    ],
  },
] as const;

export const primaryServices = services.filter((s) => s.tier === "primary");
export const extendedServices = services.filter((s) => s.tier === "extended");
