"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { studio } from "../_lib/site";

/**
 * Halftone — Hero (§1).
 *
 * Layout
 * ──────────────────────────────────────────────────────────────
 *   ┌────────────────────────────┬──────────────────────────────┐
 *   │ HT · index-001             │           SIGNAL · 04:22:11  │
 *   │                            │                              │
 *   │      interfaces for                                       │
 *   │      software                                             │
 *   │      that thinks.                                         │
 *   │                                                           │
 *   │ studio of 6 · toronto      │      [↓ scroll · 0001/0007]  │
 *   │ berlin · q1 2026                                          │
 *   └────────────────────────────┴──────────────────────────────┘
 *
 * The shader fills the whole viewport behind everything; HTML
 * sits above with mix-blend-difference on the headline so the
 * signal-coloured halo from the shader bleeds into the type.
 */

// The shader canvas is heavy and DOM-only client; load it lazily.
const HalftoneShaderCanvas = dynamic(
  () => import("../_three/halftone-shader").then((m) => m.HalftoneShaderCanvas),
  { ssr: false, loading: () => null },
);

function useUtcTicker() {
  const [t, setT] = useState<string>("00:00:00");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      const ss = String(d.getUTCSeconds()).padStart(2, "0");
      setT(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export function SectionHero() {
  const root = useRef<HTMLElement | null>(null);
  const utc = useUtcTicker();

  useGSAP(
    () => {
      // Headline lines — blur-in stagger.
      gsap.from("[data-hero-line]", {
        y: 30,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.0,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.15,
      });

      // Corners and meta — crisp slow rise.
      gsap.from("[data-hero-meta]", {
        y: 12,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.06,
        delay: 0.55,
      });

      // CTAs.
      gsap.from("[data-hero-cta]", {
        y: 14,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.85,
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate overflow-hidden"
      style={{ height: "100svh", minHeight: "100svh" }}
    >
      {/* Shader fills the viewport at z-0 */}
      <div aria-hidden className="absolute inset-0">
        <HalftoneShaderCanvas />
      </div>

      {/* Hairline grid overlay above the shader for ruling */}
      <div aria-hidden className="ht-grid pointer-events-none absolute inset-0 opacity-50" />

      {/* Top fade for the nav */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,11,0.65) 0%, transparent 100%)",
        }}
      />

      {/* Bottom fade so the next section starts clean */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to top, var(--ht-ink) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col px-6 pb-16 pt-28 lg:px-10 lg:pb-24 lg:pt-32">
        {/* TOP META */}
        <div className="flex items-start justify-between gap-4">
          <span className="ht-eyebrow" data-hero-meta>
            ht / index-001 · concept demo
          </span>
          <span className="ht-pill" data-hero-meta>
            <span className="hidden sm:inline">signal · live</span>
            <span className="sm:hidden">live</span>
            <span style={{ color: "var(--ht-bone)" }}>{utc} UTC</span>
          </span>
        </div>

        {/* MIDDLE — headline. Pushed to lower-third for editorial weight. */}
        <div className="mt-auto flex flex-col gap-8">
          <h1
            className="ht-display select-none"
            style={{ mixBlendMode: "difference" }}
          >
            <span className="block" data-hero-line>
              interfaces for
            </span>
            <span className="block" data-hero-line>
              software
            </span>
            <span className="block" data-hero-line>
              that thinks
              <span style={{ color: "var(--ht-signal)" }}>.</span>
            </span>
          </h1>

          <p
            className="max-w-xl text-[15px] leading-relaxed"
            data-hero-meta
            style={{ color: "var(--ht-bone-mute)", fontFamily: "var(--ht-sans)" }}
          >
            {studio.oneLiner}
          </p>

          {/* CTA pair */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#initialize"
              className="ht-btn"
              data-cursor
              data-cursor-label="probe"
              data-hero-cta
            >
              book a probe
              <span className="ht-arrow">→</span>
            </a>
            <a
              href="#cases"
              className="ht-btn ht-btn--ghost"
              data-cursor
              data-cursor-label="index"
              data-hero-cta
            >
              read the index
              <span className="ht-arrow">↓</span>
            </a>
          </div>
        </div>

        {/* BOTTOM META */}
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6">
          <p
            className="ht-eyebrow max-w-[20rem] leading-relaxed"
            style={{ textTransform: "none", letterSpacing: "0.02em" }}
            data-hero-meta
          >
            <span style={{ color: "var(--ht-bone)" }}>
              studio of {studio.meta.teamSize}.
            </span>{" "}
            {studio.meta.cities.join(" & ")}.{" "}
            <span style={{ color: "var(--ht-dust-low)" }}>
              available {studio.meta.availability}.
            </span>
          </p>

          <div
            className="flex flex-col items-end text-right text-[10px] leading-relaxed"
            style={{
              fontFamily: "var(--ht-mono)",
              letterSpacing: "0.18em",
              color: "var(--ht-dust)",
              textTransform: "uppercase",
            }}
            data-hero-meta
          >
            <span>scroll</span>
            <span style={{ color: "var(--ht-signal)" }}>0001 / 0007</span>
          </div>
        </div>
      </div>
    </section>
  );
}
