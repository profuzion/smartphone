/**
 * Testimonials — rendered in Act 7 proof column.
 *
 * NOTE for the owner: these are PLACEHOLDERS drafted from the kind of
 * phrasing construction/trades clients actually use. Before launch,
 * replace each entry with a real quote (with written permission)
 * sourced from emails, invoices, or post-project feedback.
 */

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Set to true once this quote has been confirmed with the client. */
  approved: boolean;
};

export const testimonials: readonly Testimonial[] = [
  {
    id: "brovek",
    quote:
      "Lowell got it on the first round — logo, trucks, signage, all of it. Felt like a company twice our size the week after we launched.",
    author: "[client name — confirm]",
    role: "Owner",
    company: "Brovek",
    approved: false,
  },
  {
    id: "alumareel",
    quote:
      "We needed a brand that could live on a spec sheet, a trade-show booth, and a website launch at the same time. Profuzion delivered all three without making us chase.",
    author: "[client name — confirm]",
    role: "Founder",
    company: "AlumaReel",
    approved: false,
  },
  {
    id: "natures-knoll",
    quote:
      "The film, the booking, the whole way the course feels online — it finally matches the walk.",
    author: "[club rep — confirm]",
    role: "Board",
    company: "Nature's Knoll",
    approved: false,
  },
] as const;
