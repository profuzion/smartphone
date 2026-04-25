import Link from "next/link";
import { featuredProjects } from "@/content/projects";
import { testimonials } from "@/content/testimonials";
import { acts } from "@/content/studio";

/**
 * Act 7 (proof column) — featured-work index + testimonials.
 *
 * The individual featured cases already have visible anchor blocks in
 * Acts 4/5/6 (Nature's Knoll, Brovek, AlumaReel respectively) — this
 * block is the at-a-glance gallery and the social-proof layer.
 *
 * Name kept as `work-placeholder.tsx` to minimise filesystem churn;
 * the export is the canonical `Work` component going forward.
 */
export function Work() {
  const act = acts.act7;
  return (
    <section
      id="work"
      aria-labelledby="work-h2"
      className="relative py-24 md:py-32"
    >
      <div className="container-shell space-y-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-3">
            <p className="eyebrow">{act.label} · Selected work</p>
            <h2
              id="work-h2"
              className="headline-display text-[clamp(2rem,4vw,3.5rem)]"
            >
              {act.proof.heading}
            </h2>
            <p className="text-bone text-base leading-relaxed md:text-lg">
              {act.proof.body}
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredProjects.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className="group relative flex h-full flex-col gap-3 border border-[var(--color-border)] bg-graphite/40 p-6 transition-colors hover:border-fusion/40"
              >
                <p className="eyebrow">{p.vertical}</p>
                <p className="font-display text-vellum text-2xl leading-tight">
                  {p.client}
                </p>
                <p className="text-bone text-sm italic">{p.tagline}</p>
                <p className="text-smoke text-xs">
                  {p.year} · {p.scope.join(", ")}
                </p>
                <span className="text-fusion group-hover:text-fusion-bright mt-auto text-xs transition-colors">
                  Read the case →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Testimonials — PLACEHOLDERS until the owner confirms quotes. */}
        <div className="grid grid-cols-1 gap-8 border-t border-[var(--color-border)] pt-12 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="space-y-3 border-l border-fusion/40 pl-5"
            >
              <blockquote className="text-vellum text-base leading-relaxed italic md:text-lg">
                “{t.quote}”
              </blockquote>
              <figcaption className="eyebrow text-smoke">
                {t.author} · {t.role}, {t.company}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// Backwards-compat export in case any old import survives.
export const WorkPlaceholder = Work;
