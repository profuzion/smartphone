import { acts } from "@/content/studio";

/**
 * Act 2 — The Blur. Editorial block: why most small-business brands
 * get lost. Short, declarative, SSR'd.
 */
export function Manifesto() {
  const act = acts.act2;
  return (
    <section
      id="blur"
      aria-labelledby="act2-h2"
      className="relative py-28 md:py-40"
    >
      <div className="container-shell grid grid-cols-1 gap-14 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-3">
          <p className="eyebrow">{act.label} · {act.eyebrow}</p>
          <h2
            id="act2-h2"
            className="headline-display text-[clamp(2rem,4vw,3.25rem)] text-bone"
          >
            {act.h2}
          </h2>
        </div>
        <div className="space-y-8">
          <p className="font-display text-vellum text-[clamp(2rem,5.5vw,4.25rem)] italic leading-[0.95]">
            {act.headline}
          </p>
          <p className="text-bone max-w-2xl text-lg leading-relaxed md:text-xl">
            {act.body}
          </p>
        </div>
      </div>
    </section>
  );
}
