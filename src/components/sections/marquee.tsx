import { trustLogos } from "@/content/projects";
import { acts } from "@/content/studio";

/**
 * Act 3 (upper) — Trust strip. Construction + trades logos rendered
 * as plain text placeholders until the real SVGs land in
 * /public/clients/trades/. Text always SSR'd so the company names
 * are visible to crawlers (keyword value + local-citation value).
 *
 * TODO (owner): replace each `<span>` with `<Image>` once the logo
 * SVGs are available. Keep the name as `alt` text.
 */
export function Marquee() {
  const act = acts.act3;
  return (
    <section
      id="trust"
      aria-label="Clients and trusted partners"
      className="relative border-y border-[var(--color-border)] bg-obsidian/60 py-10"
    >
      <div className="container-shell flex flex-col gap-6">
        <p className="eyebrow text-center">{act.trustEyebrow}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {trustLogos.map((c) => (
            <li
              key={c.name}
              className="text-bone/70 font-display text-lg tracking-tight whitespace-nowrap md:text-xl"
            >
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
