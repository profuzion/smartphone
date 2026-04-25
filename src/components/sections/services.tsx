import { extendedServices, primaryServices } from "@/content/services";
import { acts } from "@/content/studio";

/**
 * Act 7 — Ecosystem column. The extended-service roster, rendered
 * as a clean editorial list. Primary services are already covered
 * in Acts 4-6 so they're linked but not re-described here.
 */
export function Services() {
  const act = acts.act7;
  return (
    <section
      id="services"
      aria-labelledby="services-h2"
      className="relative py-28 md:py-36"
    >
      <div className="container-shell grid grid-cols-1 gap-14 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <p className="eyebrow">{act.label} · {act.eyebrow}</p>
          <h2
            id="services-h2"
            className="headline-display text-[clamp(2rem,4vw,3.5rem)]"
          >
            {act.services.heading}
          </h2>
          <p className="text-bone max-w-lg text-base leading-relaxed md:text-lg">
            {act.services.body}
          </p>

          <div className="border-t border-[var(--color-border)] pt-6">
            <p className="eyebrow mb-3">Primary focus</p>
            <ul className="text-bone space-y-1 text-base">
              {primaryServices.map((s) => (
                <li key={s.slug}>
                  <a href={`#${s.slug}`} className="hover:text-vellum transition-colors">
                    {s.name} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="eyebrow mb-6">Everything else we do</p>
          <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {extendedServices.map((s) => (
              <li
                key={s.slug}
                id={s.slug}
                className="group grid grid-cols-1 gap-3 py-6 md:grid-cols-[1fr_2fr] md:items-baseline md:gap-6"
              >
                <div className="font-display text-vellum text-xl md:text-2xl">
                  {s.name}
                </div>
                <div className="text-bone text-sm leading-relaxed md:text-base">
                  {s.oneLiner}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
