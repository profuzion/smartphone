import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEXUS Ø — Smartphone",
  description:
    "Scroll-driven concept landing for a flagship smartphone — editorial motion study.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/smartphone" },
};

export default function SmartphoneLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="smartphone-route bg-[#0a0a0a] text-neutral-100 antialiased [--phone-accent:#00f5c8]">
      {children}
    </div>
  );
}
