"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { phases } from "../_lib/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Profuzion · v2 — Process (§5).
 *
 * Layout
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │ // how we work                                               │
 *   │  Five rounds. No surprise invoices.                          │
 *   │                                                              │
 *   │  Each phase is a wide editorial row with:                    │
 *   │   ─ phase number + name + duration         ─ headline        │
 *   │                                            ─ body            │
 *   │                                            ─ three deliverable│
 *   │                                              checks          │
 *   │                                                              │
 *   │  A vertical scroll-progress rail runs down the left edge.    │
 *   └──────────────────────────────────────────────────────────────┘
 */

export function SectionProcess() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from("[data-pr-meta]", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      gsap.utils.toArray<HTMLElement>("[data-pr-row]").forEach((el) => {
        const num = el.querySelector<HTMLElement>("[data-pr-num]");
        const head = el.querySelector<HTMLElement>("[data-pr-head]");
        const body = el.querySelector<HTMLElement>("[data-pr-body]");
        const bullets = el.querySelectorAll<HTMLElement>("[data-pr-bullet]");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
        tl.from(num, { opacity: 0, x: -30, duration: 0.6, ease: "expo.out" })
          .from(head, { opacity: 0, y: 20, duration: 0.6, ease: "expo.out" }, "-=0.4")
          .from(body, { opacity: 0, y: 12, duration: 0.5, ease: "expo.out" }, "-=0.4")
          .from(
            bullets,
            { opacity: 0, x: 8, duration: 0.4, stagger: 0.06, ease: "expo.out" },
            "-=0.3",
          );
      });

      // Progress rail
      const rail = root.current?.querySelector<HTMLElement>("[data-pr-rail]");
      if (rail) {
        gsap.fromTo(
          rail,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 70%",
              end: "bottom 70%",
              scrub: 0.5,
            },
          },
        );
      }
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
      <div className="mx-auto max-w-[1480px] px-6 py-24 lg:px-10 lg:py-32">
        {/* Section meta */}
        <div className="mb-20 flex flex-wrap items-end justify-between gap-6">
          <div data-pr-meta>
            <p className="p-eyebrow p-eyebrow--amber">// how we work</p>
            <h2 className="p-display p-display--lg mt-3 max-w-3xl">
              Five rounds. No
              <br />
              surprise invoices.
            </h2>
          </div>
          <p className="p-body max-w-md" data-pr-meta>
            We work in fixed phases on a scoped quote. You see the studio brief
            in week one, the first design rounds in week three, and a launched
            site somewhere between week six and eight.
          </p>
        </div>

        {/* Body — phases */}
        <div className="relative grid lg:grid-cols-[80px_1fr] lg:gap-10">
          {/* Rail */}
          <div className="hidden lg:block">
            <div
              className="sticky top-32 mx-auto h-[60vh] w-px"
              style={{ background: "var(--p-rule)" }}
            >
              <div
                data-pr-rail
                className="absolute inset-0 w-px origin-top"
                style={{ background: "var(--p-amber)" }}
              />
            </div>
          </div>

          {/* Rows */}
          <ol className="flex flex-col">
            {phases.map((p, i) => (
              <li
                key={p.n}
                data-pr-row
                className="grid gap-6 border-t py-10 first:border-t-0 lg:grid-cols-[200px_1fr] lg:gap-12 lg:py-14"
                style={{ borderColor: "var(--p-rule)" }}
              >
                {/* Left meta */}
                <div data-pr-num>
                  <span
                    style={{
                      fontFamily: "var(--p-mono)",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--p-amber)",
                    }}
                  >
                    {p.n} · {p.name}
                  </span>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: "var(--p-sans)",
                      fontWeight: 600,
                      fontSize: "clamp(1.4rem, 1.8vw, 1.85rem)",
                      letterSpacing: "-0.02em",
                      color: "var(--p-ink)",
                    }}
                  >
                    {p.name}
                  </p>
                  <p
                    className="mt-1"
                    style={{
                      fontFamily: "var(--p-mono)",
                      fontSize: 11,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--p-stone-mid)",
                    }}
                  >
                    {p.duration}
                  </p>
                </div>

                {/* Right body */}
                <div>
                  <h3
                    data-pr-head
                    className="p-display"
                    style={{
                      fontSize: "clamp(1.6rem, 2.6vw, 2.5rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.025em",
                      lineHeight: 1.05,
                      color: "var(--p-ink)",
                      maxWidth: "20ch",
                    }}
                  >
                    {i % 2 === 0 ? (
                      p.headline
                    ) : (
                      <>
                        {p.headline.split(".")[0]}
                        <span
                          className="p-italic"
                          style={{ color: "var(--p-amber)" }}
                        >
                          .
                        </span>
                      </>
                    )}
                  </h3>
                  <p
                    data-pr-body
                    className="mt-5 max-w-2xl"
                    style={{
                      fontFamily: "var(--p-sans)",
                      fontSize: 16,
                      lineHeight: 1.55,
                      color: "var(--p-stone)",
                    }}
                  >
                    {p.body}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.bullets.map((b) => (
                      <li
                        key={b}
                        data-pr-bullet
                        className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5"
                        style={{
                          borderColor: "var(--p-rule-strong)",
                          fontFamily: "var(--p-sans)",
                          fontSize: 13,
                          fontWeight: 500,
                          color: "var(--p-ink-2)",
                        }}
                      >
                        <span
                          aria-hidden
                          className="inline-block h-1 w-1 rounded-full"
                          style={{ background: "var(--p-amber)" }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
