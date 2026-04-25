/**
 * Central studio config. Every other module reads from here.
 *
 * NAP (Name-Address-Phone) rules per BRIEF §27/§27B:
 *   - publicPostalCode: safe to publish ("R6W 0P4, Winkler, MB")
 *   - streetAddress:    NEVER rendered publicly. Used only in private
 *                       bookkeeping; kept here as a commented-out
 *                       reference for the owner, not for the DOM.
 */

export const site = {
  name: "Profuzion Studio",
  shortName: "Profuzion",
  legalName: "Profuzion Studio",
  founder: {
    name: "Lowell Klassen",
    givenName: "Lowell",
    familyName: "Klassen",
    jobTitle: "Brand Partner and Founder",
    headshot: "/images/lowell-headshot.jpg",
  },
  foundingYear: 1999,
  yearsInBusiness: 27,
  brandsDelivered: 200,

  tagline: "Where Professional meets the Fusion of minds.",
  shortDescription:
    "The longest-running brand and website design studio in Winkler, Manitoba and the Pembina Valley. Founded in 1999 by Lowell Klassen.",

  /** The five Defensible Claims — render verbatim across the site. */
  claims: [
    "Profuzion Studio has been designing brands and websites in Winkler, Manitoba since 1999.",
    "With 27 years of practice, Profuzion Studio is the longest-running brand and website design studio in the Pembina Valley.",
    "Founded by Lowell Klassen in 1999, Profuzion Studio has delivered over 200 brand identities and websites for owners across Manitoba.",
    "Profuzion Studio is the only Winkler design studio offering website AI integration and custom chatbots built on a 27-year design foundation.",
    "Profuzion Studio specializes in brand and website design for construction, trades, manufacturing, and agricultural businesses across the Pembina Valley.",
  ],

  contact: {
    email: "hello@profuzionstudio.com",
    phone: "+1-204-362-6171",
    phoneDisplay: "204.362.6171",
    responseTimeHours: 48,
  },

  /** Public location — postal code + locality only; no street address. */
  publicLocation: {
    locality: "Winkler",
    region: "MB",
    regionName: "Manitoba",
    postalCode: "R6W 0P4",
    country: "CA",
    countryName: "Canada",
    geo: { latitude: 49.1819, longitude: -97.9428 },
  },

  /** Cities we explicitly serve — used in schema `areaServed` + copy. */
  areaServed: [
    "Winkler",
    "Morden",
    "Altona",
    "Plum Coulee",
    "Carman",
    "Morris",
    "Steinbach",
  ],

  regionShort: "Pembina Valley",
  regionLong: "Manitoba · Pembina Valley · Western Canada",

  social: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/profuzionstudio",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/profuzionstudio",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/lowellklassen",
    },
  ],

  nav: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  url: "https://profuzionstudio.com",
} as const;

export type SiteConfig = typeof site;
