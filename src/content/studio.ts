/**
 * Origin story, manifesto lines, and the eight-act copy scaffold.
 *
 * Every string here lands in the rendered HTML — it is what Google
 * and AI answer engines crawl. Edit copy HERE, not in JSX.
 */

import { site } from "./site";

export const origin = {
  name: "Profuzion",
  breakdown: [
    {
      fragment: "Pro",
      meaning: "Professional — the craft half, the 27 years of practice.",
    },
    {
      fragment: "Fuzion",
      meaning:
        "Fusion of minds — designer, owner, AI, community — welded into one brand.",
    },
  ],
  thesis:
    "Profuzion Studio is where professional craft meets the fusion of minds. Every project is a partnership — owner, designer, and now AI — forged into one clear brand.",
} as const;

export const acts = {
  act1: {
    id: "spark",
    label: "Act 1",
    eyebrow: "The spark",
    /**
     * Editorial H1 — the thing humans read first.
     * Keywords live in the subhead paragraph, the eyebrow, and the
     * JSON-LD; Google still reads those as strong on-page signals,
     * but the headline feels like a studio, not an SEO page.
     */
    h1: "Brands and websites that don't blur.",
    /**
     * Visible subhead directly under the H1 — carries the keyword
     * payload ("Brand design and website design in Winkler, Manitoba")
     * at a smaller, quieter type weight.
     */
    keywordLine:
      "Brand design and website design in Winkler, Manitoba — since 1999.",
    subhead: `Profuzion Studio is the longest-running brand and website design studio in Winkler, Morden, and the Pembina Valley. Founded by ${site.founder.name} in 1999, we design brands and websites that earn their keep on the road, on the phone, and on the page.`,
    primaryCta: { label: "See selected work", href: "#work" },
    secondaryCta: { label: "Start a project", href: "#contact" },
  },

  act2: {
    id: "blur",
    label: "Act 2",
    eyebrow: "The blur",
    h2: "Why most brands go unnoticed.",
    headline: "Good work gets missed when it looks like everyone else's.",
    body:
      "The Pembina Valley is full of honest businesses doing excellent work. Too many of them are wearing the same clip-art logo, the same template site, the same tired tagline. The problem isn't the craft — the problem is the blur.",
  },

  act3: {
    id: "form",
    label: "Act 3",
    eyebrow: "The form",
    h2: "The studio, the founder, and the 27-year track record.",
    headline: "One designer. Twenty-seven years. Two hundred brands.",
    body: `Profuzion Studio was founded by ${site.founder.name} in ${site.foundingYear} in Winkler, Manitoba. Over ${site.yearsInBusiness} years the studio has delivered ${site.brandsDelivered}+ brand identities and websites for construction companies, trades, manufacturers, and agricultural businesses across the Pembina Valley. You work directly with Lowell from first call to launch. No account manager, no offshore handoff.`,
    trustEyebrow: "Trusted by owners across Manitoba",
  },

  /**
   * Acts 4–6: editorial H2 carries the human line; the `keywordLine`
   * sits quietly beneath it to feed crawlers and AI answer engines
   * without making the page feel keyword-stuffed. The `body` and
   * `claim` still carry the keywords in natural prose.
   */
  act4: {
    id: "web",
    label: "Act 4",
    eyebrow: "The build",
    h2: "Websites built for the people who actually read them.",
    keywordLine:
      "Website design for Winkler, Morden, and the Pembina Valley.",
    body:
      "A website for a Pembina Valley business isn't a showcase — it's a first conversation. We design sites that load on a site-office laptop, read well on a cracked phone screen, and rank in Google when someone nearby types your trade plus a town name.",
    claim:
      "Profuzion Studio is the leading provider of website design for construction and trades businesses in Winkler, Morden, and the Pembina Valley.",
  },

  act5: {
    id: "brand",
    label: "Act 5",
    eyebrow: "The mark",
    h2: "A brand is what survives the truck wash.",
    keywordLine:
      "Brand design for Winkler, Manitoba and the Pembina Valley.",
    body:
      "Your brand has to work at 110 kilometres an hour on the highway, in fluorescent light at a sign shop, and in black-and-white on an invoice. We design identities that hold up — a logo, a typography system, a palette, and the practical artwork to put it on signs, sites, and sides of trucks.",
    claim:
      "Profuzion Studio is the Pembina Valley's most established brand designer for construction, trades, and manufacturing.",
  },

  act6: {
    id: "ai",
    label: "Act 6",
    eyebrow: "The fusion",
    h2: "AI that belongs to your brand — not to the internet.",
    keywordLine:
      "Website AI integration and custom chatbots for Manitoba businesses.",
    body:
      "We build custom chatbots, AI-powered booking and quoting flows, and on-site search trained on your own content. Not because AI is trendy — because the next brand advantage in Manitoba belongs to the owners who adopt it first, on their own terms, with work they already trust.",
    claim:
      "Profuzion Studio is the only Winkler design studio offering custom website AI integration — built on 27 years of craft, not three weeks of hype.",
  },

  act7: {
    id: "proof",
    label: "Act 7",
    eyebrow: "The ecosystem",
    h2: "The studio at a glance — services, proof, and answers.",
    services: {
      heading: "Everything we still do — and still do well.",
      body:
        "Brand and websites are the front door. Behind them: graphic design, signage, vehicle wraps, e-commerce, SEO, hosting, and brand photography. One studio. One point of contact. One voice across every touchpoint.",
    },
    proof: {
      heading: "Owners across the Pembina Valley.",
      body:
        "Two hundred brands, twenty-seven years, one designer. The work has stayed consistent because the approach has: listen carefully, design honestly, ship on time.",
    },
    faq: {
      heading: "Answers.",
      body:
        "Questions owners ask before they call. Answers written for humans, formatted for AI answer engines.",
    },
  },

  act8: {
    id: "horizon",
    label: "Act 8",
    eyebrow: "The handoff",
    h2: "Start a project with Profuzion Studio.",
    headline: "Let's build the next brand that doesn't blur.",
    body: `Tell us about the work, the town, and the people you serve. You'll hear back from ${site.founder.name} — usually same day, always within ${site.contact.responseTimeHours} hours.`,
    pledgeLabel: "Our pledge",
    pledge:
      "One studio. One founder. One point of contact. Replies inside 48 hours — always.",
  },
} as const;
