import { faqs } from "@/content/faq";
import { acts } from "@/content/studio";

/**
 * Act 7 (FAQ block). The eight Q&A pairs are rendered as native
 * <details>/<summary> for accessible expand/collapse without JS.
 *
 * CRITICAL: the `question` + `answer` text here MUST match the
 * FAQPage JSON-LD in `app/layout.tsx` verbatim. If you edit one,
 * edit both. Google will nuke FAQ rich results for mismatches.
 */
export function Faq() {
  const act = acts.act7;
  return (
    <section
      id="faq"
      aria-labelledby="faq-h2"
      className="relative py-24 md:py-32"
    >
      <div className="container-shell grid grid-cols-1 gap-14 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <p className="eyebrow">{act.label} · Answers</p>
          <h2
            id="faq-h2"
            className="headline-display text-[clamp(2rem,4vw,3.5rem)]"
          >
            {act.faq.heading}
          </h2>
          <p className="text-bone max-w-md text-base leading-relaxed md:text-lg">
            {act.faq.body}
          </p>
        </div>

        <dl className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {faqs.map((f) => (
            <details
              key={f.id}
              id={f.id}
              className="group py-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="font-display text-vellum hover:text-fusion flex cursor-pointer items-start justify-between gap-6 text-lg leading-snug transition-colors md:text-xl">
                <dt className="inline">{f.question}</dt>
                <span
                  aria-hidden
                  className="text-smoke group-hover:text-fusion mt-1 shrink-0 text-sm transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <dd className="text-bone mt-4 max-w-3xl pr-10 text-sm leading-relaxed md:text-base">
                {f.answer}
              </dd>
            </details>
          ))}
        </dl>
      </div>
    </section>
  );
}
