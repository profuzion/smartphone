import type { Metadata } from "next";
import "./v2.css";

export const metadata: Metadata = {
  title: "Profuzion · v2 — Brand & website design that earns trust",
  description:
    "A concept direction for Profuzion Studio. Brand and website design for industrial, contractors, food producers, and e-commerce in Winkler, Manitoba and the Pembina Valley.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Profuzion · v2",
    description:
      "Concept site direction. Brand and website design for trust-led businesses.",
    type: "website",
  },
};

export default function V2Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
