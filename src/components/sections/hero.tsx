"use client";

import { useRef } from "react";
import { useGSAP, gsap, SplitText } from "@/lib/gsap";
import { site } from "@/content/site";
import { acts } from "@/content/studio";

/**
 * Act 1 — The Spark.
 *
 * First viewport. Must carry:
 *  - A visible, SSR'd editorial <h1> that reads like a studio, not an
 *    SEO page ("Brands and websites that don't blur.").
 *  - A quieter keyword subhead immediately below the H1 so the
 *    location payload ("Brand design and website design in Winkler,
 *    Manitoba — since 1999.") still lives in the rendered HTML and
 *    gets weighted by Google and by AI answer engines.
 *  - The founder's direct line (the "since 1999" quotable claim) in
 *    the subhead paragraph.
 *  - Two CTAs — view work, start a project.
 *
 * Animated reveal is progressive enhancement; text is fully readable
 * without JS, which is the SEO mandate from BRIEF §27/§27B.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const act = acts.act1;

  useGSAP(
    () => {
      const headline = root.current?.querySelector<HTMLElement>(
        "[data-hero-headline]",
      );
      const eyebrow = root.current?.querySelector<HTMLElement>(
        "[data-hero-eyebrow]",
      );
      const sub = root.current?.querySelector<HTMLElement>("[data-hero-sub]");
      const ctas = root.current?.querySelectorAll<HTMLElement>(
        "[data-hero-cta]",
      );

      if (!headline) return;

      const split = new SplitText(headline, {
        type: "lines,words",
        mask: "lines",
        linesClass: "overflow-hidden",
      });

      const tl = gsap.timeline({ delay: 0.2 });

      if (eyebrow) {
        tl.from(
          eyebrow,
          { y: 20, autoAlpha: 0, duration: 0.8, ease: "power3.out" },
          0,
        );
      }

      tl.from(
        split.words,
        {
          yPercent: 110,
          rotate: 2,
          stagger: 0.035,
          duration: 1.05,
          ease: "expo.out",
        },
        0.15,
      );

      if (sub) {
        tl.from(
          sub,
          { y: 20, autoAlpha: 0, duration: 0.9, ease: "power3.out" },
          "-=0.6",
        );
      }

      if (ctas && ctas.length) {
        tl.from(
          ctas,
          {
            y: 16,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        );
      }

      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="spark"
      ref={root}
      aria-labelledby="act1-h1"
      className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden pt-[var(--nav-h)] pb-16 md:pb-24"
    >
      <div className="container-shell relative z-10 flex w-full flex-col gap-10">
        <div className="flex items-center gap-3" data-hero-eyebrow>
          <span className="bg-fusion h-1.5 w-1.5 rounded-full shadow-[0_0_10px_var(--color-fusion)]" />
          <p className="eyebrow">
            {act.eyebrow} · Est. {site.foundingYear} · {site.publicLocation.locality},{" "}
            {site.publicLocation.regionName}
          </p>
        </div>

        {/* Editorial H1. */}
        <h1
          id="act1-h1"
          className="headline-display text-[clamp(3.25rem,10vw,11rem)]"
          data-hero-headline
        >
          {act.h1}
          <span className="text-fusion">.</span>
        </h1>

        {/*
         * Quiet keyword subhead. Renders visibly below the H1 at a
         * modest italic weight so the location + service payload
         * ("Brand design and website design in Winkler, Manitoba")
         * still lives in the rendered DOM for Google and AI crawlers
         * — without dominating the composition.
         */}
        <p
          className="font-display text-smoke text-lg italic md:text-2xl"
          data-hero-sub
        >
          {act.keywordLine}
        </p>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p
            className="text-bone max-w-xl text-lg leading-relaxed md:text-xl"
            data-hero-sub
          >
            {act.subhead}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={act.primaryCta.href}
              data-hero-cta
              className="bg-vellum text-obsidian hover:bg-fusion hover:text-vellum inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300"
            >
              {act.primaryCta.label}
              <span aria-hidden>→</span>
            </a>
            <a
              href={act.secondaryCta.href}
              data-hero-cta
              className="text-bone hover:text-vellum inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] px-6 py-3.5 text-sm tracking-wide transition-colors duration-300"
            >
              {act.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
