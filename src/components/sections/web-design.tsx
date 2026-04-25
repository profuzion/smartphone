import Link from "next/link";
import { site } from "@/content/site";
import { primaryServices } from "@/content/services";
import { featuredProjects } from "@/content/projects";
import { acts } from "@/content/studio";

/**
 * Act 4 — Website Design.
 *
 * Anchored at `#website-design` so the sitemap link resolves directly
 * to this block. Contains the direct-quotable claim, the service
 * bullets, and points to the first featured case study (Nature's Knoll).
 */
export function WebDesign() {
  const act = acts.act4;
  const service = primaryServices.find((s) => s.slug === "website-design")!;
  const featured = featuredProjects[0]; // Nature's Knoll

  return (
    <section
      id="website-design"
      aria-labelledby="act4-h2"
      className="relative py-28 md:py-40"
    >
      <div className="container-shell grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-8">
          <p className="eyebrow">{act.label} · {act.eyebrow}</p>
          <h2
            id="act4-h2"
            className="headline-display text-[clamp(2.25rem,5vw,4.5rem)]"
          >
            {act.h2}
          </h2>
          {/*
           * Keyword subhead — small italic caption. Carries the SEO
           * payload ("website design · Winkler · Pembina Valley")
           * without dominating the composition.
           */}
          <p className="font-display text-smoke text-lg italic md:text-xl">
            {act.keywordLine}
          </p>
          <p className="text-bone max-w-xl text-lg leading-relaxed md:text-xl">
            {act.body}
          </p>

          <figure className="border-fusion/40 max-w-xl border-l-2 pl-5">
            <blockquote className="text-vellum text-base leading-relaxed italic md:text-lg">
              “{act.claim}”
            </blockquote>
          </figure>

          <ul className="grid max-w-xl grid-cols-1 gap-2 md:grid-cols-2">
            {service.bullets.map((b) => (
              <li
                key={b}
                className="text-bone border-l border-[var(--color-border)] pl-4 text-sm leading-relaxed"
              >
                {b}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="text-bone hover:text-vellum inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm transition-colors"
            >
              Start a website project →
            </a>
            <span className="text-smoke text-xs">
              Serving {site.areaServed.slice(0, 3).join(", ")} and the rest of the{" "}
              {site.regionShort}.
            </span>
          </div>
        </div>

        {/* Featured case study card — Nature's Knoll */}
        <div className="relative flex flex-col justify-end overflow-hidden rounded-sm border border-[var(--color-border)] bg-gradient-to-br from-graphite via-ash to-obsidian p-8 md:p-12">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-fusion/20 blur-3xl" />
          <div className="relative space-y-6">
            <p className="eyebrow">Featured case · Website</p>
            <p className="font-display text-vellum text-3xl leading-tight md:text-5xl">
              {featured.client}
            </p>
            <p className="text-bone text-lg italic">{featured.tagline}</p>
            <p className="text-smoke max-w-md text-sm leading-relaxed md:text-base">
              {featured.summary}
            </p>
            <ul className="text-smoke flex flex-wrap gap-2 text-xs uppercase tracking-wider">
              {featured.scope.map((s) => (
                <li key={s} className="border border-[var(--color-border)] px-3 py-1">
                  {s}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                href={`/work/${featured.slug}`}
                className="text-fusion hover:text-fusion-bright inline-flex items-center gap-2 text-sm transition-colors"
              >
                Read the case →
              </Link>
              {featured.liveUrl && (
                <a
                  href={featured.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-smoke hover:text-vellum inline-flex items-center gap-2 text-sm transition-colors"
                >
                  View live preview ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
