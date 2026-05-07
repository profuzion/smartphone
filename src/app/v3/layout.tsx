import type { Metadata } from "next";
import "./v3.css";

export const metadata: Metadata = {
  title: "Profuzion · v3 — A small design studio in Winkler, Manitoba",
  description:
    "A concept direction for Profuzion Studio. Brand and website design for industrial, contractors, food producers, and e-commerce in Winkler, Manitoba and the Pembina Valley. Set as a letter.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Profuzion · v3",
    description:
      "Concept site direction. A letter, set in Instrument Serif on cream paper.",
    type: "website",
  },
};

export default function V3Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
