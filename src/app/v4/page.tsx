import { ProfuzionCursor } from "./_components/cursor";
import { ProfuzionFooter } from "./_components/footer";
import { ProfuzionNav } from "./_components/nav";
import { ProfuzionScrollProgress } from "./_components/scroll-progress";
import { SectionBranding } from "./_components/section-branding";
import { SectionCTA } from "./_components/section-cta";
import { SectionEngagements } from "./_components/section-engagements";
import { SectionFounder } from "./_components/section-founder";
import { SectionHero } from "./_components/section-hero";
import { SectionIndustries } from "./_components/section-industries";
import { SectionProcess } from "./_components/section-process";
import { SectionQuote } from "./_components/section-quote";
import { SectionWebsites } from "./_components/section-websites";

/**
 * Profuzion · v4 — concept route.
 *
 * Built on v2's foundation; v4's signature is **scroll choreography**:
 *   • Sticky-stacking deck cards (Industries, Branding, Process)
 *   • Counter-parallax columns (Founder, Branding spreads)
 *   • Hero parallax lift on scroll
 *   • Engagements parallax fan
 *   • Global scroll-progress hairline pinned to the top of viewport
 *
 * UX promise: nothing here scroll-jacks. The user controls scroll velocity at
 * all times; every animation is a pure scrub on top of natural scroll.
 *
 * Section flow:
 *   §1  Hero          — halftone shader + parallax headline lift
 *   §2  Industries    — sticky-stacking deck cards (one per vertical)
 *   §2b About         — counter-parallax founder portrait + copy
 *   §3  Branding      — sticky-stacking deck of editorial brand spreads
 *   §4  Websites      — sticky browser frame + scrolling case slots
 *   §5  Process       — sticky-stacking deck of phase cards (the SIGNATURE)
 *   §6  Engagements   — three pricing cards with parallax fan
 *   §7  Quote         — editorial pull-quote (word-by-word scroll scrub)
 *   §8  CTA           — soft contact panel
 *   Footer            — oversized wordmark + columns
 */

export default function ProfuzionV4() {
  return (
    <div className="profuzion-v4 relative isolate min-h-screen">
      <ProfuzionScrollProgress />
      <ProfuzionCursor />
      <ProfuzionNav />

      <main>
        <SectionHero />
        <SectionIndustries />
        <SectionFounder />
        <SectionBranding />
        <SectionWebsites />
        <SectionProcess />
        <SectionEngagements />
        <SectionQuote />
        <SectionCTA />
      </main>

      <ProfuzionFooter />
    </div>
  );
}
