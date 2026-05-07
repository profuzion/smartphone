"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { studio } from "../_lib/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const HalftoneCanvas = dynamic(
  () =>
    import("../_three/halftone-shader").then((m) => m.ProfuzionHalftoneCanvas),
  { ssr: false, loading: () => null },
);

/**
 * Profuzion · v4 — Hero (§1).
 *
 * Layout
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │ [PZ] · WINKLER MB · v2 ───────────────── now booking · 2026  │
 *   │                                                              │
 *   │   Brand & Website design                                     │
 *   │   for owners who want to                                     │
 *   │   stand out.  ← 'stand / out' Instrument Serif + signal    │
 *   │                                                              │
 *   │   Profuzion has been quietly building the brands and sites   │
 *   │   that local industrial, contractor, and producer teams send │
 *   │   their best referrals to. Since 1999.                       │
 *   │                                                              │
 *   │   [ Book a 30-min call → ]   [ See the work ↓ ]             │
 *   │                                                              │
 *   │ —————————————————————————————————————————————————————        │
 *   │ Industrial · Contractors · Food · E-commerce         scroll ↓  │
 *   └──────────────────────────────────────────────────────────────┘
 *
 * Behind everything: void-field halftone shader. Bone dots → chartreuse at cursor.
 */

export function SectionHero() {
  const root = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      // Headline: blur-in, word stagger
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll("[data-word]");
        gsap.from(words, {
          opacity: 0,
          y: 28,
          filter: "blur(10px)",
          duration: 1.0,
          ease: "expo.out",
          stagger: 0.06,
          delay: 0.15,
        });
      }
      gsap.from("[data-hero-meta]", {
        opacity: 0,
        y: 14,
        duration: 0.7,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.3,
      });
      gsap.from("[data-hero-cta]", {
        opacity: 0,
        y: 14,
        duration: 0.65,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.5,
      });

      // Scroll-driven parallax — headline + lede + bottom strip lift at
      // different velocities as the user scrolls past the hero.
      // No pinning, no scroll-jacking — pure scrubbed transforms.
      gsap.to(headlineRef.current, {
        yPercent: -22,
        opacity: 0.55,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.to("[data-hero-lede]", {
        yPercent: -12,
        opacity: 0.6,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.to("[data-hero-cta]", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.to("[data-hero-strip]", {
        yPercent: -4,
        opacity: 0.7,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    },
    { scope: root },
  );

  // Nudge the canvas to redraw after fonts load (font swap can shift layout)
  useEffect(() => {
    if (typeof document === "undefined") return;
    const onLoad = () => window.dispatchEvent(new Event("resize"));
    document.fonts?.ready.then(onLoad);
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate overflow-hidden"
      style={{ background: "var(--p-paper)", color: "var(--p-ink)" }}
    >
      {/* Halftone canvas (positioned absolute, fills section) */}
      <div className="absolute inset-0 -z-0">
        <HalftoneCanvas />
      </div>

      {/* Readability: uniform darkening over the shader so H1 / lede sit forward */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "rgba(0, 0, 0, 0.5)" }}
      />

      {/* Soft top-fade that lets the nav blur read cleanly */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,7,0.75) 0%, transparent 100%)",
        }}
      />

      {/* Slight void behind headline for legibility on dense halftone */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 68% 72% at 32% 52%, rgba(5,5,7,0.28) 0%, rgba(5,5,7,0.1) 42%, transparent 72%)",
        }}
      />

      {/* Bottom paper fade — softens transition into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--p-paper) 70%, var(--p-paper) 100%)",
        }}
      />

      <div className="relative z-[2] mx-auto flex min-h-[100svh] max-w-[1480px] flex-col px-6 pt-28 pb-16 lg:px-10 lg:pt-32 lg:pb-24">
        {/* Top meta row */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 pb-12"
          data-hero-meta
        >
          <p className="p-eyebrow">
            {studio.location.split(" · ")[0]} · since {studio.founded} · v4
          </p>
          <p className="p-eyebrow p-eyebrow--amber">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: "var(--p-amber)",
                boxShadow: "0 0 10px 1px var(--p-amber-glow)",
              }}
            />
            {studio.availability}
          </p>
        </div>

        {/* Headline */}
        <div className="flex-1 flex flex-col justify-center">
          <h1
            ref={headlineRef}
            className="p-display p-display--xl"
            style={{ maxWidth: "min(32ch, 100%)" }}
          >
            <span data-word className="inline-block">Brand</span>{" "}
            <span data-word className="inline-block">&amp;</span>{" "}
            <span data-word className="inline-block">Website</span>{" "}
            <span data-word className="inline-block">design</span>
            <br />
            <span data-word className="inline-block">for</span>{" "}
            <span data-word className="inline-block">owners</span>{" "}
            <span data-word className="inline-block">who</span>{" "}
            <span data-word className="inline-block">want</span>{" "}
            <span data-word className="inline-block">to</span>
            <br />
            <span
              data-word
              className="p-italic inline-block"
              style={{ color: "var(--p-amber)" }}
            >
              stand
            </span>{" "}
            <span
              data-word
              className="p-italic inline-block"
              style={{ color: "var(--p-amber)" }}
            >
              out
            </span>
            <span data-word className="inline-block">.</span>
          </h1>

          <p
            className="p-lede mt-8 max-w-2xl"
            data-hero-meta
            data-hero-lede
            style={{ color: "var(--p-ink-2)" }}
          >
            Profuzion is the quiet design studio in Winkler, Manitoba — the
            one local{" "}
            <span style={{ color: "var(--p-ink)", fontWeight: 500 }}>
              industry, construction, food production, and e-commerce
            </span>{" "}
            send their best referrals to. Brands and websites built to read
            the way you sound across the desk.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-3" data-hero-cta>
            <a
              href="#contact"
              className="p-btn"
              data-cursor
              data-cursor-label="book"
            >
              Book a 30-min call
              <span className="p-arrow">→</span>
            </a>
            <a
              href="#branding"
              className="p-btn p-btn--ghost"
              data-cursor
              data-cursor-label="see"
            >
              See the work
              <span className="p-arrow">↓</span>
            </a>
          </div>
        </div>

        {/* Bottom strip — verticals + scroll cue */}
        <div
          className="mt-16 flex flex-col gap-6 border-t pt-6 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "var(--p-rule)" }}
          data-hero-meta
          data-hero-strip
        >
          <ul
            className="flex flex-wrap items-center gap-x-6 gap-y-2"
            style={{
              fontFamily: "var(--p-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--p-stone)",
            }}
          >
            {[
              "Industrial",
              "Contractors",
              "Food Producers",
              "E-commerce Sellers",
            ].map(
              (v) => (
                <li key={v} className="inline-flex items-center gap-2">
                  <span
                    aria-hidden
                    className="inline-block h-1 w-1 rounded-full"
                    style={{ background: "var(--p-stone-mid)" }}
                  />
                  {v}
                </li>
              ),
            )}
          </ul>
          <p
            style={{
              fontFamily: "var(--p-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--p-stone-mid)",
            }}
          >
            scroll ↓ ·{" "}
            <span style={{ color: "var(--p-ink)" }}>
              {studio.positioning}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
