import { ProfuzionCursor } from "./_components/cursor";
import { ProfuzionFooter } from "./_components/footer";
import { ProfuzionNav } from "./_components/nav";
import { ProfuzionSiteLoader } from "./_components/site-loader";
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
 * Profuzion · v2 — concept route.
 *
 * Section flow:
 *   §1 Hero          — soft halftone shader + soft sans + italic accent
 *   §2 Industries    — interactive vertical chips (industrial / four verticals)
 *   §2b About         — founder portrait + back story
 *   §3 Branding      — museum-style brand spreads (dark ink section)
 *   §4 Websites      — sticky browser-frame mockups + scrolling case slots
 *   §5 Process       — five-phase editorial timeline
 *   §6 Engagements   — three pricing cards, middle one primary
 *   §7 Quote         — editorial pull-quote (Instrument Serif italic)
 *   §8 CTA           — soft contact panel (no terminal aesthetic)
 *   Footer           — oversized wordmark + columns
 */

export default function ProfuzionV2() {
  return (
    <div className="pfz relative isolate min-h-screen">
      <ProfuzionSiteLoader />
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
