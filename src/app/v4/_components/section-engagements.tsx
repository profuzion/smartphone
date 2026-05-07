"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { engagements } from "../_lib/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Profuzion · v4 — Engagements (§6).
 *
 * Three pricing/engagement cards. Middle one is "primary" — slightly
 * raised, amber accent, label "studio favourite".
 *
 * Layout
 *   ┌─────────────┐ ┌──────────────┐ ┌─────────────┐
 *   │ Brand       │ │ Brand & site │ │ Tend        │
 *   │ system      │ │ (primary)    │ │ retainer    │
 *   │             │ │              │ │             │
 *   │ from $9k    │ │ from $24k    │ │ $1.8k/mo    │
 *   │ ✓ list      │ │ ✓ list       │ │ ✓ list      │
 *   │ [ Start →]  │ │ [ Book → ]   │ │ [ Add →]    │
 *   └─────────────┘ └──────────────┘ └─────────────┘
 */

export function SectionEngagements() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from("[data-eng-meta]", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from("[data-eng-card]", {
        opacity: 0,
        y: 36,
        duration: 0.85,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });

      // Parallax fan — each card travels at a different scroll velocity so
      // they fan apart as you scroll past, then re-align as the section
      // leaves. Desktop only (the mobile stack is already taut).
      const mq = window.matchMedia("(min-width: 1024px)");
      if (mq.matches) {
        const cards = gsap.utils.toArray<HTMLElement>("[data-eng-card]");
        // Outer cards drift more, middle (primary) stays grounded.
        const offsets = [-44, 0, 44];
        cards.forEach((card, i) => {
          const off = offsets[i] ?? 0;
          if (off === 0) return;
          gsap.fromTo(
            card,
            { yPercent: -Math.sign(off) * 4 },
            {
              yPercent: Math.sign(off) * 4,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        });
      }
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="engagements"
      className="relative isolate"
      style={{ background: "var(--p-paper-2)" }}
    >
      <div className="p-rule" />
      <div className="mx-auto max-w-[1480px] px-6 py-24 lg:px-10 lg:py-32">
        {/* Section meta */}
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div data-eng-meta>
            <p className="p-eyebrow p-eyebrow--amber">// engagements</p>
            <h2 className="p-display p-display--lg mt-3 max-w-3xl">
              Three ways to{" "}
              <span className="p-italic" style={{ color: "var(--p-amber)" }}>
                start
              </span>
              .
            </h2>
          </div>
          <p className="p-body max-w-md" data-eng-meta>
            Most owners book the full project. Some start with the brand and
            add the site later. Tend is for the long haul — quarterly rounds,
            no tickets.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {engagements.map((e) => (
            <article
              key={e.id}
              data-eng-card
              className="p-card relative flex flex-col p-8 lg:p-10"
              style={{
                background: e.primary ? "var(--p-void)" : "var(--p-paper)",
                color: "var(--p-ink)",
                borderColor: e.primary
                  ? "var(--p-rule-on-ink)"
                  : "var(--p-rule-strong)",
                transform: e.primary ? "translateY(-12px)" : "none",
              }}
            >
              {e.primary && (
                <span
                  className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full px-3 py-1"
                  style={{
                    background: "var(--p-amber)",
                    color: "var(--p-on-signal)",
                    fontFamily: "var(--p-mono)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    aria-hidden
                    className="inline-block h-1 w-1 rounded-full"
                    style={{ background: "var(--p-void)" }}
                  />
                  Studio favourite
                </span>
              )}

              <h3
                style={{
                  fontFamily: "var(--p-sans)",
                  fontWeight: 600,
                  fontSize: "clamp(1.3rem, 1.9vw, 1.75rem)",
                  letterSpacing: "-0.02em",
                  color: "var(--p-ink)",
                }}
              >
                {e.name}
              </h3>

              <div className="mt-2 flex items-baseline gap-2">
                <span
                  style={{
                    fontFamily: "var(--p-mono)",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    color: e.primary ? "var(--p-stone)" : "var(--p-stone-mid)",
                  }}
                >
                  {e.duration}
                </span>
                <span
                  aria-hidden
                  className="inline-block"
                  style={{
                    color: e.primary ? "var(--p-stone)" : "var(--p-stone-mid)",
                  }}
                >
                  ·
                </span>
                <span
                  style={{
                    fontFamily: "var(--p-mono)",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    color: "var(--p-amber)",
                  }}
                >
                  {e.shape}
                </span>
              </div>

              <p
                className="mt-5"
                style={{
                  fontFamily: "var(--p-sans)",
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: e.primary ? "var(--p-stone)" : "var(--p-stone)",
                }}
              >
                {e.description}
              </p>

              <ul
                className="mt-6 flex flex-1 flex-col gap-2.5 border-t pt-6"
                style={{
                  borderColor: e.primary
                    ? "var(--p-rule-on-ink)"
                    : "var(--p-rule)",
                }}
              >
                {e.includes.map((inc) => (
                  <li
                    key={inc}
                    className="flex items-center gap-3"
                    style={{
                      fontFamily: "var(--p-sans)",
                      fontSize: 14,
                      color: e.primary ? "var(--p-ink)" : "var(--p-ink-2)",
                    }}
                  >
                    <span
                      aria-hidden
                      className="inline-block h-px w-3"
                      style={{ background: "var(--p-amber)" }}
                    />
                    {inc}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                data-cursor
                data-cursor-label={e.primary ? "book" : "start"}
                className="mt-8 inline-flex items-center justify-between gap-3 rounded-full border px-5 py-3 transition-all duration-200"
                style={{
                  borderColor: e.primary
                    ? "var(--p-amber)"
                    : "var(--p-ink)",
                  background: e.primary ? "var(--p-amber)" : "transparent",
                  color: e.primary ? "var(--p-on-signal)" : "var(--p-ink)",
                  fontFamily: "var(--p-sans)",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {e.cta}
                <span aria-hidden>→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
