import type { Metadata } from "next";
import "./halftone.css";

/**
 * Halftone — concept route layout.
 *
 * Overrides the root metadata so the browser tab, OG, and crawlers
 * see Halftone (the concept) instead of Profuzion Studio.
 *
 * The root <html>/<body>, fonts, and SmoothScrollProvider all still
 * wrap this — we just claim the page-level meta and the route-scoped
 * stylesheet here.
 */

export const metadata: Metadata = {
  title: "Halftone — Interfaces for software that thinks.",
  description:
    "Halftone is a six-person studio shipping product UI for AI-native teams. Linear-class motion, Anthropic-grade restraint. We start in your codebase, not Figma.",
  alternates: { canonical: "/halftone" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Halftone — Interfaces for software that thinks.",
    description:
      "Six-person studio. AI-native product UI. Designs in-repo, not in Figma.",
    type: "website",
  },
};

export default function HalftoneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
