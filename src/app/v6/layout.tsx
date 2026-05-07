import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../v2/v2.css";

export const metadata: Metadata = {
  title: "Profuzion · v6 — Local preview (v2 parity)",
  description:
    "Same layout, CSS, and sections as v2 for visual QA. Production v6 is Bricks + child theme (vanilla Three halftone + GSAP).",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Profuzion · v6",
    description:
      "Visual parity check with v2 · WordPress handoff in tools/wordpress/BRICKS-DEPLOY-KIT-V6.md",
    type: "website",
  },
};

export default function V6Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <>{children}</>;
}
