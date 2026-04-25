import Link from "next/link";
import { site } from "@/content/site";
import { primaryServices } from "@/content/services";
import { featuredProjects } from "@/content/projects";
import { acts } from "@/content/studio";

/**
 * Act 6 — AI integration. The "fusion" act — where the 27-year studio
 * meets modern AI. Positioned as pilot work with early-adopter pricing
 * because we don't yet have a published AI case study.
 */
export function AiIntegration() {
  const act = acts.act6;
  const service = primaryServices.find((s) => s.slug === "website-ai-integration")!;
  const alumareel = featuredProjects[1];

  return (
    <section
      id="website-ai-integration"
      aria-labelledby="act6-h2"
      className="relative py-28 md:py-40"
    >
      <div className="container-shell space-y-14">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <p className="eyebrow">{act.label} · {act.eyebrow}</p>
            <h2
              id="act6-h2"
              className="headline-display text-[clamp(2.5rem,6vw,5.5rem)]"
            >
              {act.h2}
            </h2>
            <p className="font-display text-smoke text-lg italic md:text-xl">
              {act.keywordLine}
            </p>
            <p className="text-bone max-w-2xl text-lg leading-relaxed md:text-xl">
              {act.body}
            </p>
            <figure className="border-fusion/40 max-w-2xl border-l-2 pl-5">
              <blockquote className="text-vellum text-base leading-relaxed italic md:text-lg">
                “{act.claim}”
              </blockquote>
            </figure>
          </div>

          <div className="space-y-6 rounded-sm border border-[var(--color-border)] bg-graphite/50 p-8">
            <p className="eyebrow">Pilot scope</p>
            <ul className="space-y-3">
              {service.bullets.map((b) => (
                <li
                  key={b}
                  className="text-bone border-l border-fusion/60 pl-4 text-sm leading-relaxed"
                >
                  {b}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="bg-fusion text-obsidian hover:bg-fusion-bright inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium tracking-wide transition-colors"
            >
              Talk about an AI pilot →
            </a>
            <p className="text-smoke text-xs">
              Early-adopter pricing for {site.regionShort} businesses through 2026.
            </p>
          </div>
        </div>

        {/* AlumaReel — second featured case */}
        <Link
          href={`/work/${alumareel.slug}`}
          className="border-fusion/30 hover:border-fusion/70 group relative flex flex-col gap-6 border-t border-dashed pt-10 transition-colors md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl space-y-2">
            <p className="eyebrow">Featured case · Brand + Web</p>
            <p className="font-display text-vellum text-3xl leading-tight md:text-4xl">
              {alumareel.client} — {alumareel.tagline}
            </p>
            <p className="text-smoke text-base">{alumareel.summary}</p>
            <p className="text-fusion group-hover:text-fusion-bright pt-2 text-xs tracking-wide uppercase">
              Read the case →
            </p>
          </div>
          <ul className="text-smoke flex flex-wrap gap-2 text-xs uppercase tracking-wider">
            {alumareel.scope.map((s) => (
              <li key={s} className="border border-[var(--color-border)] px-3 py-1">
                {s}
              </li>
            ))}
          </ul>
        </Link>
      </div>
    </section>
  );
}
