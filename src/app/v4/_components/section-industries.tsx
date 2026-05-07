"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { industries } from "../_lib/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Profuzion · v4 — Industries (§2).
 *
 * Stacking-deck variant. Each industry is its own deck card; the next card
 * scrolls up over the previous and stops a few pixels lower so the previous
 * card's pin label keeps peeking. Each card uses the industry's `hue` as
 * its accent so scrolling through the deck reads as four distinct rooms.
 *
 *   ┌─ 01  Industrial ───────────────────── plant managers ─┐ ← peeks
 *   ┌─ 02  Contractors ──────────────────── bid · crew ──────┐
 *   │  Bids, crews, and a name on the side of the shop.       │
 *   │  ↳ Truck, yard, and crew apparel systems                │
 *   │  ↳ Estimate and bid presentation templates              │
 *   │  ↳ Local project galleries and case pages               │
 *   │  ↳ Warranty and change-order clarity in writing         │
 *   │  ↳ Trade school and hiring outreach                     │
 *   │                                                          │
 *   │  "For firms that live and die on callbacks."             │
 *   └──────────────────────────────────────────────────────────┘
 *
 * No JS state, no hover-driven preview swap. Scroll IS the navigation.
 */

export function SectionIndustries() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from("[data-ind-meta]", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      // Stacking-deck depth scrub
      const cards = gsap.utils.toArray<HTMLElement>("[data-ind-card]");
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card, {
          scale: 0.975,
          y: -4,
          opacity: 0.72,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top 92%",
            end: "top 35%",
            scrub: 0.6,
          },
        });
      });

      // Per-card body reveal
      cards.forEach((card) => {
        const head = card.querySelector("[data-ind-head]");
        const body = card.querySelector("[data-ind-body]");
        const items = card.querySelectorAll("[data-ind-item]");
        const proof = card.querySelector("[data-ind-proof]");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 70%" },
        });
        tl.from(head, { opacity: 0, y: 24, duration: 0.7, ease: "expo.out" })
          .from(
            body,
            { opacity: 0, y: 14, duration: 0.5, ease: "expo.out" },
            "-=0.45",
          )
          .from(
            items,
            {
              opacity: 0,
              x: 14,
              duration: 0.45,
              stagger: 0.06,
              ease: "expo.out",
            },
            "-=0.35",
          )
          .from(
            proof,
            { opacity: 0, y: 10, duration: 0.6, ease: "expo.out" },
            "-=0.3",
          );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="industries"
      className="relative isolate"
      style={{ background: "var(--p-paper)" }}
    >
      <div className="p-rule" />
      <div className="mx-auto max-w-[1480px] px-6 pt-24 pb-16 lg:px-10 lg:pt-32 lg:pb-24">
        {/* Section meta */}
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6 lg:mb-24">
          <div>
            <p className="p-eyebrow p-eyebrow--amber" data-ind-meta>
              // who we are for
            </p>
            <h2
              className="p-display p-display--lg mt-3 max-w-3xl"
              data-ind-meta
            >
              Four types of owners who
              <br />
              keep coming{" "}
              <span className="p-italic" style={{ color: "var(--p-amber)" }}>
                back
              </span>
              .
            </h2>
          </div>
          <p className="p-body max-w-md" data-ind-meta>
            We don&apos;t pretend to be every studio for every business. Four
            verticals share something we&apos;ve spent twenty-five years
            getting right — trust, said quietly.
          </p>
        </div>

        {/* Stacking deck */}
        <ol
          className="v4-stack relative"
          style={
            {
              ["--p-stack-top" as string]: "104px",
              ["--p-stack-step" as string]: "46px",
            } as React.CSSProperties
          }
        >
          {industries.map((ind, i) => (
            <li
              key={ind.id}
              data-ind-card
              className="v4-stack__item"
              style={
                {
                  ["--i" as string]: i,
                } as React.CSSProperties
              }
            >
              <article
                className="v4-card v4-card--ink relative"
                style={{ borderColor: "var(--p-rule-on-ink)" }}
              >
                {/* Hue accent slab — uses the industry's color */}
                <div
                  className="v4-card__accent"
                  aria-hidden
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${ind.hue} 24%, ${ind.hue} 76%, transparent 100%)`,
                    opacity: 0.85,
                  }}
                />

                {/* Procedural tint — same recipe as the original preview, now per-card */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `
                      radial-gradient(ellipse 70% 90% at 92% 10%, ${ind.hue}38, transparent 60%),
                      radial-gradient(ellipse 80% 60% at 8% 95%, ${ind.hue}22, transparent 65%),
                      repeating-radial-gradient(circle at 50% 50%, ${ind.hue}0a 0px, ${ind.hue}0a 1px, transparent 1px, transparent 14px)
                    `,
                  }}
                />

                {/* Pin header */}
                <header className="v4-card__pin relative">
                  <span className="v4-card__pin-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="v4-card__pin-name">{ind.label}</span>
                  <span
                    className="v4-card__pin-meta"
                    style={{ color: ind.hue, opacity: 0.85 }}
                  >
                    vertical · {String(i + 1).padStart(2, "0")} / {String(industries.length).padStart(2, "0")}
                  </span>
                </header>

                {/* Card body */}
                <div className="relative grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-14 lg:py-16">
                  {/* LEFT — oversized number + label */}
                  <div className="flex flex-col">
                    <span
                      style={{
                        fontFamily: "var(--p-mono)",
                        fontSize: 11,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--p-stone)",
                      }}
                    >
                      vertical · {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="p-italic mt-2 leading-none"
                      style={{
                        fontFamily: "var(--p-serif)",
                        fontSize: "clamp(5rem, 11vw, 11rem)",
                        color: ind.hue,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="mt-4"
                      style={{
                        fontFamily: "var(--p-sans)",
                        fontWeight: 600,
                        fontSize: "clamp(1.6rem, 2.4vw, 2.25rem)",
                        letterSpacing: "-0.025em",
                        color: "var(--p-ink)",
                      }}
                    >
                      {ind.label}
                    </span>
                    <span
                      aria-hidden
                      className="mt-4 inline-block h-2 w-2 self-start rounded-full"
                      style={{
                        background: ind.hue,
                        boxShadow: `0 0 18px 2px ${ind.hue}aa`,
                      }}
                    />
                  </div>

                  {/* RIGHT — narrative + deliverables + proof */}
                  <div className="flex flex-col">
                    <h3
                      data-ind-head
                      className="p-display"
                      style={{
                        fontSize: "clamp(1.6rem, 2.6vw, 2.5rem)",
                        fontWeight: 500,
                        letterSpacing: "-0.028em",
                        lineHeight: 1.05,
                        color: "var(--p-ink)",
                        maxWidth: "20ch",
                      }}
                    >
                      {ind.lead}
                    </h3>

                    <div data-ind-body className="mt-8 flex items-center gap-3">
                      <span
                        className="inline-block h-px w-8"
                        style={{ background: ind.hue }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--p-mono)",
                          fontSize: 11,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: ind.hue,
                        }}
                      >
                        Deliverables
                      </span>
                    </div>
                    <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {ind.deliverables.map((d) => (
                        <li
                          key={d}
                          data-ind-item
                          className="flex items-baseline gap-3"
                          style={{
                            fontFamily: "var(--p-sans)",
                            fontSize: "clamp(0.95rem, 1.05vw, 1.075rem)",
                            color: "var(--p-ink-2)",
                          }}
                        >
                          <span
                            aria-hidden
                            className="inline-block translate-y-[-2px]"
                            style={{
                              fontFamily: "var(--p-mono)",
                              fontSize: 12,
                              color: ind.hue,
                            }}
                          >
                            ↳
                          </span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>

                    <p
                      data-ind-proof
                      className="mt-10 border-t pt-6"
                      style={{
                        borderColor: "var(--p-rule)",
                        fontFamily: "var(--p-serif)",
                        fontStyle: "italic",
                        fontSize: "clamp(1.05rem, 1.4vw, 1.35rem)",
                        lineHeight: 1.35,
                        color: "var(--p-ink-2)",
                        maxWidth: "44ch",
                      }}
                    >
                      &ldquo;{ind.proof}&rdquo;
                    </p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
