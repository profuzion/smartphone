"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { phases } from "../_lib/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Profuzion · v4 — Process (§5).
 *
 * The signature stacking-cards section. Each phase is a sticky deck card;
 * as you scroll, the next phase scrolls up over the previous one and stops
 * a few pixels lower, so every previous card's "pin" header keeps peeking.
 *
 *   ┌── PHASE · 01  Listen ─────────────── Week 1 ──┐ ← peeks
 *   ┌── PHASE · 02  Frame ──────────────── Weeks 2–3 ─┐
 *   │                                                  │
 *   │   Positioning, voice, and the shape of the work. │
 *   │   ...                                            │
 *   │   Deliverables                                   │
 *   │    ↳ Studio brief (1 page)                       │
 *   │    ↳ Voice document                              │
 *   │    ↳ Sitemap and message hierarchy               │
 *   └──────────────────────────────────────────────────┘
 *
 * As card N+1 covers card N, GSAP scrubs card N's scale + opacity slightly
 * so the deck looks like it has depth. The pin header stays at full opacity
 * so the user can always read where they are in the process.
 *
 * UX: this is sticky, not scroll-jacked. The user controls scroll speed at
 * all times; the cards animate proportionally to scroll, never "captured."
 */

export function SectionProcess() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      // Section meta entrance
      gsap.from("[data-pr-meta]", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      // Stacking-deck depth: each previous card recedes as the next covers it.
      const cards = gsap.utils.toArray<HTMLElement>("[data-pr-card]");
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

      // Per-card body reveal (cheap & quick — only fires once)
      cards.forEach((card) => {
        const head = card.querySelector("[data-pr-head]");
        const body = card.querySelector("[data-pr-body]");
        const bullets = card.querySelectorAll("[data-pr-bullet]");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 70%" },
        });
        tl.from(head, { opacity: 0, y: 24, duration: 0.7, ease: "expo.out" })
          .from(
            body,
            { opacity: 0, y: 14, duration: 0.6, ease: "expo.out" },
            "-=0.45",
          )
          .from(
            bullets,
            {
              opacity: 0,
              x: 16,
              duration: 0.5,
              stagger: 0.08,
              ease: "expo.out",
            },
            "-=0.4",
          );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="process"
      className="relative isolate"
      style={{ background: "var(--p-paper)" }}
    >
      <div className="p-rule" />
      <div className="mx-auto max-w-[1480px] px-6 pt-24 pb-16 lg:px-10 lg:pt-32 lg:pb-24">
        {/* Section meta */}
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6 lg:mb-24">
          <div>
            <p className="p-eyebrow p-eyebrow--amber" data-pr-meta>
              // how we work
            </p>
            <h2
              className="p-display p-display--lg mt-3 max-w-3xl"
              data-pr-meta
            >
              Five rounds. No
              <br />
              surprise{" "}
              <span className="p-italic" style={{ color: "var(--p-amber)" }}>
                invoices
              </span>
              .
            </h2>
          </div>
          <p className="p-body max-w-md" data-pr-meta>
            Each phase is its own room — and you walk through them one at a
            time. Scroll to advance; nothing here moves on its own.
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
          {phases.map((p, i) => (
            <li
              key={p.n}
              data-pr-card
              className="v4-stack__item"
              style={
                {
                  ["--i" as string]: i,
                } as React.CSSProperties
              }
            >
              <article className="v4-card v4-card--ink relative">
                <div className="v4-card__accent" aria-hidden />

                {/* Pin header — always visible above the next card */}
                <header className="v4-card__pin">
                  <span className="v4-card__pin-num">phase · {p.n}</span>
                  <span className="v4-card__pin-name">{p.name}</span>
                  <span className="v4-card__pin-meta">{p.duration}</span>
                </header>

                {/* Card body */}
                <div className="grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-14 lg:py-16">
                  {/* LEFT — oversized phase number set in serif italic */}
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
                      round {p.n} of 05
                    </span>
                    <span
                      className="p-italic mt-2 leading-none"
                      style={{
                        fontFamily: "var(--p-serif)",
                        fontSize: "clamp(5rem, 11vw, 11rem)",
                        color: "var(--p-amber)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {p.n}
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
                      {p.name}
                    </span>
                    <span
                      className="mt-2"
                      style={{
                        fontFamily: "var(--p-mono)",
                        fontSize: 11,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--p-stone-mid)",
                      }}
                    >
                      {p.duration}
                    </span>
                  </div>

                  {/* RIGHT — narrative + deliverables */}
                  <div className="flex flex-col">
                    <h3
                      data-pr-head
                      className="p-display"
                      style={{
                        fontSize: "clamp(1.6rem, 2.6vw, 2.5rem)",
                        fontWeight: 500,
                        letterSpacing: "-0.028em",
                        lineHeight: 1.05,
                        color: "var(--p-ink)",
                        maxWidth: "22ch",
                      }}
                    >
                      {i === phases.length - 1 ? (
                        <>
                          {p.headline}
                          <span
                            className="p-italic"
                            style={{ color: "var(--p-amber)" }}
                          >
                            {""}
                          </span>
                        </>
                      ) : (
                        p.headline
                      )}
                    </h3>
                    <p
                      data-pr-body
                      className="mt-6 max-w-2xl"
                      style={{
                        fontFamily: "var(--p-sans)",
                        fontSize: "clamp(1rem, 1.15vw, 1.15rem)",
                        lineHeight: 1.6,
                        color: "var(--p-stone)",
                      }}
                    >
                      {p.body}
                    </p>

                    <div
                      className="mt-10 flex items-center gap-3"
                      aria-hidden
                    >
                      <span
                        className="inline-block h-px w-8"
                        style={{ background: "var(--p-amber)" }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--p-mono)",
                          fontSize: 11,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "var(--p-amber)",
                        }}
                      >
                        Deliverables
                      </span>
                    </div>
                    <ul className="mt-5 flex flex-col gap-3">
                      {p.bullets.map((b) => (
                        <li
                          key={b}
                          data-pr-bullet
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
                              color: "var(--p-amber)",
                            }}
                          >
                            ↳
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
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
