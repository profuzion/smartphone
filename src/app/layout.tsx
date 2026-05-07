import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, Geist_Mono, Manrope } from "next/font/google";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import { site } from "@/content/site";
import { buildRootGraph, safeJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0F" },
    { media: "(prefers-color-scheme: light)", color: "#0B0B0F" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const PAGE_TITLE = `${site.name} — Brand & Website Design in Winkler, Manitoba · Since 1999`;
const PAGE_DESCRIPTION = `${site.name} is the longest-running brand and website design studio in Winkler, Manitoba and the Pembina Valley. Founded by ${site.founder.name} in ${site.foundingYear}. Brand design, website design, and custom AI integration for owners across southern Manitoba.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: {
    icon: [{ url: "/pfs-logo-mark.svg", type: "image/svg+xml" }],
    shortcut: "/pfs-logo-mark.svg",
    apple: "/pfs-logo-mark.svg",
  },
  title: {
    default: PAGE_TITLE,
    template: `%s · ${site.name}`,
  },
  description: PAGE_DESCRIPTION,
  applicationName: site.name,
  keywords: [
    // Tier 1 — primary local
    "brand design Winkler",
    "website design Winkler",
    "website design Pembina Valley",
    "brand design Pembina Valley",
    "graphic design Winkler",
    // Tier 2 — regional
    "website design Manitoba",
    "brand design Manitoba",
    "logo design Winkler",
    "logo design Pembina Valley",
    // Tier 3 — vertical
    "construction website design Manitoba",
    "trades website design Winkler",
    "construction brand design Pembina Valley",
    "manufacturing website design Manitoba",
    // Tier 4 — AI
    "website AI integration Manitoba",
    "AI chatbot Winkler",
    "custom chatbot Manitoba",
    // Tier 5 — founder + studio
    "Profuzion Studio",
    "Lowell Klassen designer",
    "design studio Winkler",
  ],
  authors: [{ name: site.founder.name, url: site.url }],
  creator: site.founder.name,
  publisher: site.name,
  category: "Design studio",
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "website",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    siteName: site.name,
    locale: "en_CA",
    url: site.url,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    // Lowell: paste the value from Google Search Console / Bing Webmaster here.
    google: undefined,
    other: {
      "msvalidate.01": undefined as unknown as string,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = safeJsonLd(buildRootGraph());

  return (
    <html
      lang="en-CA"
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Single @graph block covers LocalBusiness, Person, 9× Service, FAQPage, ItemList. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </head>
      <body className="bg-obsidian text-vellum flex min-h-full flex-col selection:bg-fusion selection:text-obsidian">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
