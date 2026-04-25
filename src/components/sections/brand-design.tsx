import Link from "next/link";
import { site } from "@/content/site";
import { primaryServices } from "@/content/services";
import { featuredProjects } from "@/content/projects";
import { acts } from "@/content/studio";

/**
 * Act 5 — Brand Design.
 */
export function BrandDesign() {
  const act = acts.act5;
  const service = primaryServices.find((s) => s.slug === "brand-design")!;
  const featured = featuredProjects[2]; // Brovek

  return (
    <section
      id="brand-design"
      aria-labelledby="act5-h2"
      className="relative py-28 md:py-40"
    >
      <div className="container-shell grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1fr]">
        {/* Case card first on the left for visual rhythm alternation */}
        <div className="relative order-2 flex flex-col justify-end overflow-hidden rounded-sm border border-[var(--color-border)] bg-gradient-to-br from-graphite via-ash to-obsidian p-8 lg:order-1 md:p-12">
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-plasma/20 blur-3xl" />
          <div className="relative space-y-6">
            <p className="eyebrow">Featured case · Brand</p>
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
            <Link
              href={`/work/${featured.slug}`}
              className="text-fusion hover:text-fusion-bright inline-flex items-center gap-2 text-sm transition-colors"
            >
              Read the case →
            </Link>
          </div>
        </div>

        <div className="order-1 space-y-8 lg:order-2">
          <p className="eyebrow">{act.label} · {act.eyebrow}</p>
          <h2
            id="act5-h2"
            className="headline-display text-[clamp(2.25rem,5vw,4.5rem)]"
          >
            {act.h2}
          </h2>
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
              Start a brand project →
            </a>
            <span className="text-smoke text-xs">
              Brand design for {site.publicLocation.locality}, {site.areaServed[1]}, {site.areaServed[2]}, and all of the {site.regionShort}.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
