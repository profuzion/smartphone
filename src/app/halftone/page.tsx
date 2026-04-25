import { HalftoneCursor } from "./_components/cursor";
import { HalftoneNav } from "./_components/nav";
import { HalftoneFooter } from "./_components/footer";
import { SectionHero } from "./_components/section-hero";
import { SectionIndex } from "./_components/section-index";
import { SectionProcess } from "./_components/section-process";
import { SectionStack } from "./_components/section-stack";
import { SectionEngagements } from "./_components/section-engagements";
import { SectionSignal } from "./_components/section-signal";
import { SectionCta } from "./_components/section-cta";

/**
 * Halftone — concept demo at /halftone.
 *
 * Seven scroll sections, all rendered above .halftone — a route-scoped
 * theme wrapper that hosts every CSS custom property used on the page.
 *
 *   §1  Hero          /initialize        — GLSL halftone field + headline
 *   §2  Live Index    /cases             — terminal case table
 *   §3  Pipeline      /process           — JSON code-fold timeline
 *   §4  Stack         /stack             — Three.js panel cluster
 *   §5  Engagements   /engagements       — JSON config cards
 *   §6  Signal        /signal            — terminal feed + pull-quote
 *   §7  Initialize    /initialize        — terminal contact form
 */

export default function HalftonePage() {
  return (
    <div className="halftone relative">
      <HalftoneCursor />
      <HalftoneNav />
      <main className="relative z-0">
        <SectionHero />
        <SectionIndex />
        <SectionProcess />
        <SectionStack />
        <SectionEngagements />
        <SectionSignal />
        <SectionCta />
      </main>
      <HalftoneFooter />
    </div>
  );
}
