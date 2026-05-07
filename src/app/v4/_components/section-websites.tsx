"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { websiteCases } from "../_lib/site";
import { WebsiteMockup } from "./website-mockup";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Profuzion · v4 — Website case studies (§4).
 *
 * Layout (lg+):
 *   ┌─────────────────────────┬────────────────────────┐
 *   │ [STICKY browser frame]  │ ┌──────────────────┐   │
 *   │   procedural mockup     │ │ Case 01          │   │
 *   │   for active case       │ │ ...              │   │
 *   │   crossfades on case    │ └──────────────────┘   │
 *   │   advance               │ ┌──────────────────┐   │
 *   │                         │ │ Case 02          │   │
 *   │ [progress dots vertical]│ │ ...              │   │
 *   │                         │ └──────────────────┘   │
 *   │                         │ ...                    │
 *   └─────────────────────────┴────────────────────────┘
 *
 * Each case slot is one viewport tall and sets `active` via IO when
 * it crosses the middle of the viewport. The sticky browser frame on
 * the left swaps mockups via opacity crossfade.
 *
 * Mobile: cases stack with their mockup inline.
 */

export function SectionWebsites() {
  const root = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const slots = root.current?.querySelectorAll<HTMLElement>(
      "[data-web-slot]",
    );
    if (!slots || slots.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    slots.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      gsap.from("[data-web-meta]", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="websites"
      className="relative isolate"
      style={{ background: "var(--p-paper)" }}
    >
      <div className="mx-auto max-w-[1480px] px-6 py-24 lg:px-10 lg:py-32">
        {/* Section meta */}
        <div className="mb-20 flex flex-wrap items-end justify-between gap-6">
          <div data-web-meta>
            <p className="p-eyebrow p-eyebrow--amber">// websites in production</p>
            <h2 className="p-display p-display--lg mt-3 max-w-3xl">
              Sites that{" "}
              <span className="p-italic" style={{ color: "var(--p-amber)" }}>
                close
              </span>{" "}
              the call.
            </h2>
          </div>
          <p className="p-body max-w-md" data-web-meta>
            Built for performance. Tuned for Core Web Vitals, AI search, and the
            owner who has to update the rates page herself on a Tuesday at
            10pm.
          </p>
        </div>

        {/* Two-column reveal */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* LEFT — sticky frame (desktop only) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              {/* Frame */}
              <div className="p-browser aspect-[16/10]">
                <div className="p-browser__bar">
                  <span
                    className="p-browser__dot"
                    style={{ background: "#e26b49" }}
                  />
                  <span
                    className="p-browser__dot"
                    style={{ background: "#e3b04b" }}
                  />
                  <span
                    className="p-browser__dot"
                    style={{ background: "#7a9f5f" }}
                  />
                  <span className="p-browser__url">
                    {websiteCases[active]?.url}
                  </span>
                </div>
                <div className="relative h-[calc(100%-37px)] w-full overflow-hidden">
                  {websiteCases.map((c, i) => (
                    <div
                      key={c.slug}
                      className="absolute inset-0 transition-opacity duration-500 ease-out"
                      style={{
                        opacity: i === active ? 1 : 0,
                        pointerEvents: i === active ? "auto" : "none",
                      }}
                      aria-hidden={i !== active}
                    >
                      <WebsiteMockup kase={c} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress + active meta */}
              <div className="mt-6 flex items-center justify-between gap-4">
                <ul className="flex items-center gap-1.5">
                  {websiteCases.map((c, i) => (
                    <li
                      key={c.slug}
                      className="transition-all duration-300"
                      style={{
                        height: 3,
                        width: i === active ? 36 : 12,
                        background:
                          i === active
                            ? "var(--p-amber)"
                            : "var(--p-rule-strong)",
                        borderRadius: 3,
                      }}
                    />
                  ))}
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
                  case {String(active + 1).padStart(2, "0")} /{" "}
                  {String(websiteCases.length).padStart(2, "0")}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — case slots */}
          <ol className="flex flex-col">
            {websiteCases.map((c, i) => (
              <li
                key={c.slug}
                data-web-slot
                data-idx={i}
                className="flex min-h-[80vh] flex-col justify-center border-t py-12 first:border-t-0 lg:min-h-[90vh]"
                style={{ borderColor: "var(--p-rule)" }}
              >
                {/* Mobile mockup */}
                <div className="mb-8 lg:hidden">
                  <div className="p-browser aspect-[16/10]">
                    <div className="p-browser__bar">
                      <span
                        className="p-browser__dot"
                        style={{ background: "#e26b49" }}
                      />
                      <span
                        className="p-browser__dot"
                        style={{ background: "#e3b04b" }}
                      />
                      <span
                        className="p-browser__dot"
                        style={{ background: "#7a9f5f" }}
                      />
                      <span className="p-browser__url">{c.url}</span>
                    </div>
                    <div className="relative h-[calc(100%-37px)] w-full">
                      <WebsiteMockup kase={c} />
                    </div>
                  </div>
                </div>

                {/* Slot content */}
                <p className="p-eyebrow p-eyebrow--amber">
                  ↳ web · {String(i + 1).padStart(2, "0")} ·{" "}
                  <span style={{ color: "var(--p-stone-mid)" }}>{c.year}</span>
                </p>
                <h3
                  className="p-display mt-4"
                  style={{
                    fontSize: "clamp(2rem, 3.6vw, 3.4rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                    lineHeight: 0.98,
                  }}
                >
                  {c.client}
                </h3>
                <p
                  className="mt-3 max-w-md"
                  style={{
                    fontFamily: "var(--p-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(1.1rem, 1.4vw, 1.4rem)",
                    lineHeight: 1.3,
                    color: "var(--p-ink-2)",
                  }}
                >
                  {c.tagline}
                </p>
                <p
                  className="mt-5 max-w-md"
                  style={{
                    fontFamily: "var(--p-sans)",
                    fontSize: 15.5,
                    lineHeight: 1.55,
                    color: "var(--p-stone)",
                  }}
                >
                  {c.outcome}
                </p>

                {/* Metrics */}
                <dl className="mt-8 grid grid-cols-3 gap-4">
                  {c.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="border-t pt-3"
                      style={{ borderColor: "var(--p-rule)" }}
                    >
                      <dt
                        style={{
                          fontFamily: "var(--p-mono)",
                          fontSize: 10,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--p-stone-mid)",
                        }}
                      >
                        {m.label}
                      </dt>
                      <dd
                        className="mt-1.5"
                        style={{
                          fontFamily: "var(--p-sans)",
                          fontWeight: 500,
                          fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)",
                          letterSpacing: "-0.02em",
                          color: "var(--p-ink)",
                        }}
                      >
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Industry chip + CTA */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span
                    className="rounded-full border px-3.5 py-1.5"
                    style={{
                      fontFamily: "var(--p-mono)",
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      borderColor: "var(--p-rule-strong)",
                      color: "var(--p-stone)",
                    }}
                  >
                    {c.industry}
                  </span>
                  <a
                    href={`/work/${c.slug}`}
                    data-cursor
                    data-cursor-label="open"
                    className="group inline-flex items-center gap-2"
                    style={{
                      fontFamily: "var(--p-sans)",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "var(--p-ink)",
                    }}
                  >
                    <span
                      aria-hidden
                      className="inline-block h-px w-5 transition-all duration-200 group-hover:w-8"
                      style={{ background: "var(--p-amber)" }}
                    />
                    Read the case
                    <span
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
