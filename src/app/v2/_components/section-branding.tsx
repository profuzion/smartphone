"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brandingCases, type BrandingCase } from "../_lib/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Profuzion · v2 — Branding case studies (§3).
 *
 * Layout
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │  // brand systems                                            │
 *   │  Identities built to                                         │
 *   │  outlive the launch.                                         │
 *   │                                                              │
 *   │  Then a sequence of museum-style "brand spreads" on the      │
 *   │  dark ink background — alternating left/right layouts:       │
 *   │                                                              │
 *   │  ┌─────────────────────────────┬───────────────────────────┐ │
 *   │  │  BIG MONOGRAM               │  Client name              │ │
 *   │  │  (procedural, half-bleed)   │  Tagline                  │ │
 *   │  │                             │  Industry · Year          │ │
 *   │  │                             │  ───                      │ │
 *   │  │                             │  Summary                  │ │
 *   │  │                             │  ───                      │ │
 *   │  │                             │  ▆▆▆▆▆▆▆ palette          │ │
 *   │  │                             │  Aa Bb · type pair        │ │
 *   │  │                             │  Three · deliverables     │ │
 *   │  │                             │  Read the case →          │ │
 *   │  └─────────────────────────────┴───────────────────────────┘ │
 *   └──────────────────────────────────────────────────────────────┘
 *
 *   Each spread reveals on scroll. The monogram has a slow parallax
 *   y-shift so the spread breathes as the user scrolls past it.
 */

export function SectionBranding() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from("[data-brand-meta]", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      // Each spread fades in
      gsap.utils.toArray<HTMLElement>("[data-brand-spread]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
        // Parallax the monogram inside
        const mono = el.querySelector<HTMLElement>("[data-brand-mono]");
        if (mono) {
          gsap.fromTo(
            mono,
            { y: 30 },
            {
              y: -30,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        }
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="branding"
      className="p-section--ink relative isolate overflow-hidden"
    >
      <div className="mx-auto max-w-[1480px] px-6 pt-24 pb-8 lg:px-10 lg:pt-32 lg:pb-12">
        {/* Section meta */}
        <div className="mb-20 flex flex-wrap items-end justify-between gap-6">
          <div data-brand-meta>
            <p className="p-eyebrow p-eyebrow--amber">// brand systems</p>
            <h2
              className="p-display p-display--lg mt-3 max-w-3xl"
              style={{ color: "var(--p-ink)" }}
            >
              Identities built to{" "}
              <span className="p-italic" style={{ color: "var(--p-amber)" }}>
                outlive
              </span>{" "}
              the launch.
            </h2>
          </div>
          <p
            className="p-body max-w-md"
            data-brand-meta
            style={{ color: "var(--p-stone)" }}
          >
            We treat a brand like a long-form decision. Every system we ship
            comes with a one-page voice doc — so the people we hand it to never
            stop sounding like themselves.
          </p>
        </div>

        {/* Logo wall — small intro grid */}
        <div className="mb-24 grid grid-cols-2 gap-px sm:grid-cols-4" data-brand-meta>
          {brandingCases.map((c) => (
            <div
              key={c.slug}
              className="relative aspect-[2/1] overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)",
                border: "1px solid var(--p-rule-on-ink)",
              }}
              data-cursor
              data-cursor-label={c.client.toLowerCase()}
            >
              <div className="absolute inset-0 grid place-items-center">
                <span
                  style={{
                    fontFamily: "var(--p-sans)",
                    fontSize: "clamp(1.4rem, 2.4vw, 2.2rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                    color: "var(--p-ink)",
                  }}
                >
                  {c.client}
                </span>
              </div>
              {/* Year / industry on hover */}
              <div
                className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 opacity-0 transition-opacity duration-300 hover:opacity-100"
                style={{
                  background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.4))",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--p-mono)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--p-stone)",
                  }}
                >
                  {c.industry}
                </span>
                <span
                  style={{
                    fontFamily: "var(--p-mono)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    color: "var(--p-amber)",
                  }}
                >
                  {c.year}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Brand spreads */}
        <ul className="flex flex-col gap-24 lg:gap-40">
          {brandingCases.map((c, i) => (
            <li key={c.slug} data-brand-spread>
              <BrandSpread brand={c} flip={i % 2 === 1} index={i + 1} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BrandSpread({
  brand,
  flip,
  index,
}: {
  brand: BrandingCase;
  flip: boolean;
  index: number;
}) {
  return (
    <article
      className={
        "grid items-center gap-10 lg:grid-cols-12 lg:gap-16 " +
        (flip ? "lg:[direction:rtl]" : "")
      }
    >
      {/* Monogram column */}
      <div
        className={
          "relative lg:col-span-7 lg:[direction:ltr] " +
          (flip ? "" : "")
        }
      >
        <BrandMonogram brand={brand} />
      </div>

      {/* Details column */}
      <div className="lg:col-span-5 lg:[direction:ltr]">
        <p className="p-eyebrow p-eyebrow--amber">
          ↳ case · {String(index).padStart(2, "0")}
        </p>
        <h3
          className="p-display mt-4"
          style={{
            fontSize: "clamp(2rem, 3.6vw, 3.5rem)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
            color: "var(--p-ink)",
          }}
        >
          {brand.client}
          <span style={{ color: "var(--p-amber)" }}>.</span>
        </h3>
        <p
          className="mt-4 max-w-md"
          style={{
            fontFamily: "var(--p-serif)",
            fontStyle: "italic",
            fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
            lineHeight: 1.3,
            color: "var(--p-stone)",
          }}
        >
          {brand.tagline}
        </p>

        <dl
          className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2"
          style={{
            fontFamily: "var(--p-mono)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--p-stone)",
          }}
        >
          <div>
            <dt style={{ color: "var(--p-stone-mid)" }}>industry</dt>
            <dd className="mt-0.5" style={{ color: "var(--p-ink)" }}>
              {brand.industry}
            </dd>
          </div>
          <div>
            <dt style={{ color: "var(--p-stone-mid)" }}>year</dt>
            <dd className="mt-0.5" style={{ color: "var(--p-ink)" }}>
              {brand.year}
            </dd>
          </div>
        </dl>

        <p
          className="mt-8 max-w-md"
          style={{
            fontFamily: "var(--p-sans)",
            fontSize: 15,
            lineHeight: 1.55,
            color: "var(--p-stone)",
          }}
        >
          {brand.summary}
        </p>

        {/* Palette */}
        <div className="mt-8">
          <p
            className="mb-3"
            style={{
              fontFamily: "var(--p-mono)",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--p-stone-mid)",
            }}
          >
            palette
          </p>
          <div className="flex h-12 max-w-md overflow-hidden rounded-md">
            {brand.palette.map((c) => (
              <div
                key={c}
                className="flex-1 transition-transform duration-300 hover:scale-y-110"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>

        {/* Type pair */}
        <div className="mt-6">
          <p
            className="mb-3"
            style={{
              fontFamily: "var(--p-mono)",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--p-stone-mid)",
            }}
          >
            typography
          </p>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span
              style={{
                fontFamily: "var(--p-serif)",
                fontStyle: "italic",
                fontSize: "clamp(1.6rem, 2.4vw, 2.1rem)",
                color: "var(--p-ink)",
                lineHeight: 1,
              }}
            >
              Aa
            </span>
            <span
              style={{
                fontFamily: "var(--p-sans)",
                fontWeight: 500,
                fontSize: "clamp(1.3rem, 1.9vw, 1.7rem)",
                letterSpacing: "-0.02em",
                color: "var(--p-ink)",
                lineHeight: 1,
              }}
            >
              {brand.typePair.display}
            </span>
            <span style={{ color: "var(--p-stone-mid)" }}>·</span>
            <span
              style={{
                fontFamily: "var(--p-sans)",
                fontWeight: 400,
                fontSize: 14,
                color: "var(--p-stone)",
              }}
            >
              {brand.typePair.body}
            </span>
          </div>
        </div>

        {/* Deliverables */}
        <ul className="mt-8 flex flex-wrap gap-2">
          {brand.deliverables.map((d) => (
            <li
              key={d}
              className="rounded-full border px-3.5 py-1.5"
              style={{
                fontFamily: "var(--p-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                borderColor: "var(--p-rule-on-ink)",
                color: "var(--p-stone)",
              }}
            >
              {d}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={`/work/${brand.slug}`}
          data-cursor
          data-cursor-label="open"
          className="group mt-10 inline-flex items-center gap-3 transition-colors duration-200"
          style={{
            fontFamily: "var(--p-sans)",
            fontSize: 14.5,
            fontWeight: 500,
            color: "var(--p-ink)",
          }}
        >
          <span
            aria-hidden
            className="inline-block h-px transition-all duration-200"
            style={{
              width: 28,
              background: "var(--p-amber)",
            }}
          />
          Read the case
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </article>
  );
}

/**
 * Procedural brand monogram — oversized typographic mark on a soft tinted
 * field. Replace with real logo SVGs in /public/clients/featured/{slug}.svg
 * for the final build. The structure stays the same.
 */
function BrandMonogram({ brand }: { brand: BrandingCase }) {
  const accent = brand.palette[2] ?? brand.palette[0];
  return (
    <div
      data-brand-mono
      className="relative aspect-[5/4] overflow-hidden rounded-2xl"
      style={{
        background: `
          radial-gradient(ellipse 70% 60% at 30% 30%, ${accent}33, transparent 70%),
          radial-gradient(ellipse 80% 60% at 80% 80%, ${brand.palette[1]}26, transparent 70%),
          var(--p-paper-2)
        `,
        border: "1px solid var(--p-rule-on-ink)",
      }}
    >
      {/* Procedural halftone overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${accent}66 1px, transparent 1.5px)`,
          backgroundSize: "16px 16px",
          mixBlendMode: "screen",
        }}
      />

      {/* Corner brackets */}
      <span
        aria-hidden
        className="absolute left-4 top-4 h-3 w-3 border-l border-t"
        style={{ borderColor: "var(--p-rule-on-ink)" }}
      />
      <span
        aria-hidden
        className="absolute right-4 top-4 h-3 w-3 border-r border-t"
        style={{ borderColor: "var(--p-rule-on-ink)" }}
      />
      <span
        aria-hidden
        className="absolute left-4 bottom-4 h-3 w-3 border-l border-b"
        style={{ borderColor: "var(--p-rule-on-ink)" }}
      />
      <span
        aria-hidden
        className="absolute right-4 bottom-4 h-3 w-3 border-r border-b"
        style={{ borderColor: "var(--p-rule-on-ink)" }}
      />

      {/* Top-left meta */}
      <div className="absolute left-6 top-6 flex flex-col gap-1"
        style={{
          fontFamily: "var(--p-mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--p-stone)",
        }}
      >
        <span>profuzion / brand</span>
        <span>{brand.industry.toLowerCase()}</span>
      </div>

      {/* Top-right meta */}
      <div className="absolute right-6 top-6 text-right"
        style={{
          fontFamily: "var(--p-mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--p-amber)",
        }}
      >
        case {String(brand.year).slice(-2)}-{brand.slug.slice(0, 3).toUpperCase()}
      </div>

      {/* Big monogram center */}
      <div className="absolute inset-0 grid place-items-center">
        <span
          style={{
            fontFamily: "var(--p-sans)",
            fontWeight: 500,
            fontSize: "clamp(7rem, 18vw, 16rem)",
            letterSpacing: "-0.06em",
            lineHeight: 0.85,
            color: "var(--p-ink)",
            textShadow: `0 0 80px ${accent}66`,
          }}
        >
          {brand.glyph}
          <span style={{ color: "var(--p-amber)" }}>.</span>
        </span>
      </div>

      {/* Bottom-left palette strip */}
      <div className="absolute left-6 bottom-6 flex h-1.5 w-32">
        {brand.palette.map((c) => (
          <span key={c} style={{ background: c }} className="flex-1" />
        ))}
      </div>

      {/* Bottom-right deliverable count */}
      <div className="absolute right-6 bottom-6 text-right"
        style={{
          fontFamily: "var(--p-mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--p-stone)",
        }}
      >
        {brand.deliverables.length} deliverables
      </div>
    </div>
  );
}
