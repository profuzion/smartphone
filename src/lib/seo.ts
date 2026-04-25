/**
 * Schema.org builders. Each function returns a plain object ready to
 * be stringified into a JSON-LD <script> tag.
 *
 * Sanitization for XSS: the caller is responsible for running
 * JSON.stringify(schema).replace(/</g, "\\u003c") before injecting.
 */

import { site } from "@/content/site";
import { services } from "@/content/services";
import { featuredProjects, type Project } from "@/content/projects";
import { faqs } from "@/content/faq";

const BASE = site.url;
const STUDIO_ID = `${BASE}#studio`;
const FOUNDER_ID = `${BASE}#founder`;

/* ── LocalBusiness ───────────────────────────────────────────── */
export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": STUDIO_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: site.shortName,
    slogan: site.tagline,
    description: site.shortDescription,
    foundingDate: `${site.foundingYear}-01-01`,
    url: BASE,
    telephone: site.contact.phone,
    email: site.contact.email,
    image: `${BASE}/og-image.png`,
    logo: `${BASE}/brand/profuzion-mark.svg`,
    priceRange: "$$",
    areaServed: site.areaServed.map((name) => ({
      "@type": "City",
      name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Manitoba",
      },
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.publicLocation.locality,
      addressRegion: site.publicLocation.region,
      postalCode: site.publicLocation.postalCode,
      addressCountry: site.publicLocation.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.publicLocation.geo.latitude,
      longitude: site.publicLocation.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    knowsAbout: [
      "Brand design",
      "Website design",
      "Website AI integration",
      "Custom AI chatbots",
      "Graphic design",
      "Signage and vehicle wraps",
      "E-commerce",
      "Local SEO",
      "Answer engine optimization",
      "Brand photography",
      "Construction marketing",
      "Trades marketing",
      "Manufacturing marketing",
    ],
    knowsLanguage: ["en"],
    founder: { "@id": FOUNDER_ID },
    employee: [{ "@id": FOUNDER_ID }],
    sameAs: site.social.map((s) => s.href),
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, url: `${BASE}/#${s.slug}` },
    })),
    /**
     * aggregateRating is intentionally omitted until real Google Business
     * Profile review counts are available. Inserting a placeholder would
     * risk a manual action from Google for misleading structured data.
     */
  };
}

/* ── Person (Founder) ────────────────────────────────────────── */
export function buildFounderSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: site.founder.name,
    givenName: site.founder.givenName,
    familyName: site.founder.familyName,
    jobTitle: site.founder.jobTitle,
    image: `${BASE}${site.founder.headshot}`,
    url: BASE,
    worksFor: { "@id": STUDIO_ID },
    knowsAbout: [
      "Brand design",
      "Website design",
      "Website AI integration",
      "Graphic design",
      "Local SEO",
    ],
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: site.publicLocation.locality,
        addressRegion: site.publicLocation.region,
        postalCode: site.publicLocation.postalCode,
        addressCountry: site.publicLocation.country,
      },
    },
  };
}

/* ── Services (one per service) ──────────────────────────────── */
export function buildServiceSchemas() {
  return services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/#${s.slug}`,
    name: s.name,
    serviceType: s.name,
    description: s.oneLiner,
    provider: { "@id": STUDIO_ID },
    areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
    category: s.tier === "primary" ? "Primary service" : "Extended service",
  }));
}

/* ── FAQPage ─────────────────────────────────────────────────── */
export function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE}/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/* ── ItemList of featured projects ───────────────────────────── */
export function buildWorkSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BASE}/#work`,
    name: "Selected work — Profuzion Studio",
    itemListElement: featuredProjects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.client,
        headline: p.tagline,
        description: p.summary,
        dateCreated: `${p.year}-01-01`,
        /**
         * Canonical URL is always the Profuzion case-study subpage.
         * The `liveUrl` (if any) is exposed via the project's own
         * CreativeWork schema on that subpage, not here.
         */
        url: `${BASE}/work/${p.slug}`,
        creator: { "@id": STUDIO_ID },
      },
    })),
  };
}

/* ── Per-project CreativeWork schema for /work/[slug] ───────── */
export function buildProjectSchema(project: Project) {
  const url = `${BASE}/work/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": url,
    name: `${project.client} — ${project.tagline}`,
    headline: project.tagline,
    description: project.summary,
    url,
    mainEntityOfPage: url,
    image: project.gallery
      .slice(0, 4)
      .map((g) => `${BASE}${g.src}`),
    dateCreated: `${project.year}-01-01`,
    datePublished: `${project.year}-01-01`,
    creator: { "@id": STUDIO_ID },
    author: { "@id": FOUNDER_ID },
    publisher: { "@id": STUDIO_ID },
    about: project.industry,
    spatialCoverage: project.location,
    keywords: [
      project.vertical,
      project.industry,
      project.location,
      ...project.scope,
    ].join(", "),
    ...(project.liveUrl ? { workExample: { "@type": "WebSite", url: project.liveUrl } } : {}),
  };
}

export function buildProjectBreadcrumbs(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: site.name,
        item: BASE,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Selected work",
        item: `${BASE}/#work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.client,
        item: `${BASE}/work/${project.slug}`,
      },
    ],
  };
}

/* ── Master: returns all five wrapped as @graph ──────────────── */
export function buildRootGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildLocalBusinessSchema(),
      buildFounderSchema(),
      ...buildServiceSchemas(),
      buildFaqSchema(),
      buildWorkSchema(),
    ],
  };
}

/**
 * Sanitize a schema object for inline <script> injection.
 * Replaces `<` with its unicode escape so a stray HTML tag in data
 * can never close the surrounding <script>.
 */
export function safeJsonLd(schema: unknown): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
