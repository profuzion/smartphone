"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { industries, type Industry } from "../_lib/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Profuzion · v2 — Industries (§2).
 *
 * Layout
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │ // who we are for                                            │
 *   │                                                              │
 *   │ Four types of owners who                                     │
 *   │ keep coming back to us.                                      │
 *   │                                                              │
 *   │ ┌──────────────────┐ ┌────────────────────────────────────┐  │
 *   │ │ 01 Industrial     │ │  [ procedural preview panel ]    │  │
 *   │ │ 02 Contractors   │ │                                    │  │
 *   │ │ 03 Food Producers│ │  … lead + deliverables + proof     │  │
 *   │ │ 04 E-comm. sell. │ │                                    │  │
 *   │ │                  │ │  · (from site.ts for vertical)     │  │
 *   │ │                  │ │                                    │  │
 *   │ │                  │ │  proof line under list             │  │
 *   │ └──────────────────┘ └────────────────────────────────────┘  │
 *   └──────────────────────────────────────────────────────────────┘
 *
 *   • Hovering / focusing a row sets `active`; the preview crossfades.
 *   • Mobile (< lg): rows + preview collapse into stacked cards.
 *   • The preview's procedural texture is built with a tinted radial
 *     halftone field colored by the industry's `hue`.
 */

export function SectionIndustries() {
  const root = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<Industry>(industries[0]);

  useGSAP(
    () => {
      gsap.from("[data-ind-meta]", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from("[data-ind-row]", {
        opacity: 0,
        x: -16,
        duration: 0.55,
        ease: "expo.out",
        stagger: 0.07,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
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
      {/* Hairline up-rule */}
      <div className="p-rule" />

      <div className="mx-auto max-w-[1480px] px-6 py-24 lg:px-10 lg:py-32">
        {/* Section meta */}
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div data-ind-meta>
            <p className="p-eyebrow p-eyebrow--amber">// who we are for</p>
            <h2 className="p-display p-display--lg mt-3 max-w-3xl">
              Four types of owners who
              <br />
              keep coming back to us.
            </h2>
          </div>
          <p
            className="p-body max-w-md"
            data-ind-meta
          >
            We don't pretend to be every studio for every business. These four
            verticals share something we've spent twenty-five years getting
            right — trust, said quietly.
          </p>
        </div>

        {/* Body */}
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* LEFT — rows */}
          <ul className="flex flex-col">
            {industries.map((ind, i) => {
              const isActive = active.id === ind.id;
              return (
                <li
                  key={ind.id}
                  data-ind-row
                  className="border-b"
                  style={{ borderColor: "var(--p-rule)" }}
                >
                  <button
                    onPointerEnter={() => setActive(ind)}
                    onFocus={() => setActive(ind)}
                    onClick={() => setActive(ind)}
                    data-cursor
                    data-cursor-label="reveal"
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-200"
                    style={{
                      color: isActive ? "var(--p-ink)" : "var(--p-stone)",
                    }}
                  >
                    <span className="flex items-baseline gap-5">
                      <span
                        aria-hidden
                        style={{
                          fontFamily: "var(--p-mono)",
                          fontSize: 12,
                          letterSpacing: "0.16em",
                          color: isActive
                            ? "var(--p-amber)"
                            : "var(--p-stone-low)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="transition-colors duration-200"
                        style={{
                          fontFamily: "var(--p-sans)",
                          fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)",
                          fontWeight: 500,
                          letterSpacing: "-0.025em",
                          lineHeight: 1.05,
                        }}
                      >
                        {ind.label}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="ml-4 inline-flex items-center gap-2"
                      style={{
                        opacity: isActive ? 1 : 0.35,
                        transition: "opacity 220ms var(--p-eo)",
                      }}
                    >
                      <span
                        className="inline-block h-px transition-all duration-300"
                        style={{
                          width: isActive ? 32 : 12,
                          background: isActive
                            ? "var(--p-amber)"
                            : "var(--p-stone-low)",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--p-mono)",
                          fontSize: 11,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: isActive
                            ? "var(--p-amber)"
                            : "var(--p-stone-low)",
                        }}
                      >
                        {isActive ? "viewing" : "view"}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* RIGHT — sticky preview */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <IndustryPreview ind={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustryPreview({ ind }: { ind: Industry }) {
  return (
    <article
      key={ind.id}
      className="p-card relative overflow-hidden p-fadeup"
      style={{
        background: "var(--p-paper-2)",
        borderRadius: 18,
        minHeight: 480,
      }}
    >
      {/* Procedural background — tinted halftone radial */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at 80% 20%, ${ind.hue}33, transparent 60%),
            radial-gradient(ellipse 80% 60% at 10% 90%, ${ind.hue}1f, transparent 65%),
            repeating-radial-gradient(circle at 50% 50%, ${ind.hue}0c 0px, ${ind.hue}0c 1px, transparent 1px, transparent 14px)
          `,
        }}
      />

      <div className="relative grid gap-8 p-8 lg:p-10">
        {/* Top: index + label */}
        <div className="flex items-center justify-between">
          <p
            style={{
              fontFamily: "var(--p-mono)",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--p-stone-mid)",
            }}
          >
            ↳ {ind.label.toLowerCase()}
          </p>
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full"
            style={{
              background: ind.hue,
              boxShadow: `0 0 14px 2px ${ind.hue}88`,
            }}
          />
        </div>

        {/* Lead headline */}
        <h3
          className="p-display"
          style={{
            fontSize: "clamp(1.75rem, 3.4vw, 3rem)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 0.98,
            color: "var(--p-ink)",
            maxWidth: "14ch",
          }}
        >
          {ind.lead}
        </h3>

        {/* Deliverables */}
        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {ind.deliverables.map((d) => (
            <li
              key={d}
              className="flex items-center gap-3"
              style={{
                fontFamily: "var(--p-sans)",
                fontSize: 14,
                color: "var(--p-ink-2)",
              }}
            >
              <span
                aria-hidden
                className="inline-block h-px w-3"
                style={{ background: ind.hue }}
              />
              {d}
            </li>
          ))}
        </ul>

        {/* Proof */}
        <p
          className="border-t pt-5"
          style={{
            borderColor: "var(--p-rule)",
            fontFamily: "var(--p-serif)",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 1.4vw, 1.3rem)",
            lineHeight: 1.35,
            color: "var(--p-ink-2)",
          }}
        >
          &ldquo;{ind.proof}&rdquo;
        </p>
      </div>
    </article>
  );
}
