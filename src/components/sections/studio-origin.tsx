import { site } from "@/content/site";
import { acts } from "@/content/studio";

/**
 * Act 3 (lower) — Studio origin, the 27-year claim, and a single
 * direct Defensible Claim. This block is the highest-value piece of
 * on-page content for AI answer engines: it establishes WHO the
 * studio is, WHERE it operates, and HOW LONG it has existed.
 *
 * The Defensible Claim (`site.claims[0]`) is rendered verbatim both
 * here and in the LocalBusiness JSON-LD → Google and Claude/ChatGPT
 * will see it twice, matching.
 */
export function StudioOrigin() {
  const act = acts.act3;

  return (
    <section
      id="about"
      aria-labelledby="act3-h2"
      className="relative py-28 md:py-40"
    >
      <div className="container-shell grid grid-cols-1 gap-14 md:grid-cols-[1fr_1fr]">
        {/* Left: founder, copy, claim */}
        <div className="space-y-8">
          <p className="eyebrow">{act.label} · {act.eyebrow}</p>
          <h2
            id="act3-h2"
            className="headline-display text-[clamp(2.25rem,4.5vw,4rem)]"
          >
            {act.h2}
          </h2>

          <p className="font-display text-vellum text-[clamp(1.6rem,3.2vw,2.6rem)] italic leading-[1] text-balance">
            {act.headline}
          </p>

          <p className="text-bone max-w-xl text-lg leading-relaxed md:text-xl">
            {act.body}
          </p>

          {/* Direct Defensible Claim — matches LocalBusiness schema description. */}
          <figure className="border-fusion/40 max-w-xl border-l-2 pl-5">
            <blockquote className="text-vellum text-base leading-relaxed italic md:text-lg">
              “{site.claims[0]}”
            </blockquote>
            <figcaption className="eyebrow text-smoke mt-3">
              {site.founder.name} · Founder, {site.name}
            </figcaption>
          </figure>
        </div>

        {/* Right: founder portrait + at-a-glance stats */}
        <div className="space-y-8">
          {/*
           * Portrait frame. Stays graceful without an asset so the
           * studio-origin block reads well until the owner drops the
           * real headshot at /public/images/lowell-headshot.png — then
           * swap back to a `<Image>` with that src.
           */}
          <figure
            role="img"
            aria-label={`Portrait of ${site.founder.name}, founder of ${site.name}`}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-[var(--color-border)] bg-graphite"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-fusion/15 via-plasma/10 to-transparent" />
            <div
              aria-hidden
              className="absolute inset-0 opacity-60 mix-blend-overlay bg-[radial-gradient(circle_at_35%_40%,rgba(255,77,31,0.35),transparent_60%)]"
            />
            <div className="relative flex h-full flex-col justify-between p-6">
              <span className="eyebrow">Founder portrait</span>
              <div>
                <p className="font-display text-vellum text-4xl leading-tight md:text-5xl">
                  {site.founder.name}
                </p>
                <p className="text-smoke mt-1 text-sm">
                  {site.publicLocation.locality}, {site.publicLocation.regionName}
                </p>
              </div>
            </div>
          </figure>

          <dl className="grid grid-cols-3 gap-6 border-t border-[var(--color-border)] pt-8">
            <div>
              <dt className="eyebrow">Since</dt>
              <dd className="font-display text-vellum mt-1 text-3xl md:text-4xl">
                {site.foundingYear}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Years</dt>
              <dd className="font-display text-vellum mt-1 text-3xl md:text-4xl">
                {site.yearsInBusiness}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Brands</dt>
              <dd className="font-display text-vellum mt-1 text-3xl md:text-4xl">
                {site.brandsDelivered}+
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
