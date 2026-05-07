import { ProfuzionCursor } from "../v2/_components/cursor";
import { ProfuzionFooter } from "../v2/_components/footer";
import { ProfuzionNav } from "../v2/_components/nav";
import { ProfuzionSiteLoader } from "../v2/_components/site-loader";
import { SectionBranding } from "../v2/_components/section-branding";
import { SectionCTA } from "../v2/_components/section-cta";
import { SectionEngagements } from "../v2/_components/section-engagements";
import { SectionFounder } from "../v2/_components/section-founder";
import { SectionHero } from "../v2/_components/section-hero";
import { SectionIndustries } from "../v2/_components/section-industries";
import { SectionProcess } from "../v2/_components/section-process";
import { SectionQuote } from "../v2/_components/section-quote";
import { SectionWebsites } from "../v2/_components/section-websites";

/**
 * Profuzion · v5 — visual parity with v2 in-browser; WordPress handoff uses
 * `src/app/v5/profuzion-v5-bricks-*.json` + **`npm run wp:handoff`**.
 */
export default function ProfuzionV5() {
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
