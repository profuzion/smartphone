import type { Metadata } from "next";
import "../v2/v2.css";

export const metadata: Metadata = {
  title: "Profuzion · v5 — Brand & website design that earns trust",
  description:
    "Concept direction (v5). Same visual system as v2; production target is Bricks + ACF Pro + ACSS in WordPress.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Profuzion · v5",
    description:
      "Concept site direction. Brand and website design for trust-led businesses.",
    type: "website",
  },
};

export default function V5Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
