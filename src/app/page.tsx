import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { SceneCanvas } from "@/components/three/scene-canvas";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Manifesto } from "@/components/sections/manifesto";
import { StudioOrigin } from "@/components/sections/studio-origin";
import { WebDesign } from "@/components/sections/web-design";
import { BrandDesign } from "@/components/sections/brand-design";
import { AiIntegration } from "@/components/sections/ai-integration";
import { Services } from "@/components/sections/services";
import { Work } from "@/components/sections/work-placeholder";
import { Faq } from "@/components/sections/faq";
import { Invitation } from "@/components/sections/invitation";

/**
 * Profuzion Studio homepage — eight scroll acts over a single
 * persistent 3D scene.
 *
 *   Act 1 · Spark      → Hero
 *   Act 2 · Blur       → Manifesto
 *   Act 3 · Form       → Marquee (trust strip) + StudioOrigin
 *   Act 4 · Build      → WebDesign                    (#website-design)
 *   Act 5 · Mark       → BrandDesign                  (#brand-design)
 *   Act 6 · Fusion     → AiIntegration                (#website-ai-integration)
 *   Act 7 · Ecosystem  → Services + Work + Faq        (#services / #work / #faq)
 *   Act 8 · Horizon    → Invitation                   (#contact)
 *
 * SceneCanvas is position:fixed at z:0 and lives on the obsidian body
 * background; HTML content sits on a `relative z-10` wrapper so every
 * act renders above the same continuous 3D stage. Each section uses
 * `bg-obsidian/X` to control how much of the seed bleeds through.
 */
export default function Home() {
  return (
    <>
      <SceneCanvas />
      <div className="relative z-10 flex min-h-full flex-col">
        <Nav />
        <main className="flex flex-1 flex-col">
          <Hero />
          <Manifesto />
          <Marquee />
          <StudioOrigin />
          <WebDesign />
          <BrandDesign />
          <AiIntegration />
          <Services />
          <Work />
          <Faq />
          <Invitation />
        </main>
        <Footer />
      </div>
    </>
  );
}
