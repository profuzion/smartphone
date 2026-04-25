"use client";

import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { signal, pullQuote } from "../_lib/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Halftone — Signal (§6).
 *
 *   ┌──────────────┬─────────────────────────────────────┐
 *   │ // signal    │  2026.04.20 ▸ shipped ▸ acaria 1.4  │
 *   │ filters:     │  2026.04.18 ▸ wrote   ▸ "the case…" │
 *   │ [shipped]    │  2026.04.12 ▸ shipped ▸ foundry/93  │
 *   │ [wrote]      │  …                                  │
 *   │ [spoke]      │                                     │
 *   └──────────────┴─────────────────────────────────────┘
 *
 *   Below: an editorial pull-quote — the rare moment of italic
 *   Instrument Serif against the dominant monospace field.
 */

type Filter = "all" | "shipped" | "wrote" | "spoke";

const FILTERS: { id: Filter; label: string; count?: number }[] = [
  { id: "all", label: "all" },
  { id: "shipped", label: "shipped" },
  { id: "wrote", label: "wrote" },
  { id: "spoke", label: "spoke" },
];

const TYPE_COLORS: Record<string, string> = {
  shipped: "var(--ht-signal)",
  wrote: "var(--ht-amber)",
  spoke: "var(--ht-pink)",
};

export function SectionSignal() {
  const root = useRef<HTMLElement | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => signal.filter((s) => (filter === "all" ? true : s.type === filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: signal.length };
    signal.forEach((s) => (c[s.type] = (c[s.type] ?? 0) + 1));
    return c;
  }, []);

  useGSAP(
    () => {
      gsap.from("[data-signal-meta]", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from("[data-signal-row]", {
        opacity: 0,
        x: 14,
        duration: 0.45,
        ease: "expo.out",
        stagger: 0.04,
        scrollTrigger: { trigger: "[data-signal-feed]", start: "top 80%" },
      });
      gsap.from("[data-signal-quote]", {
        opacity: 0,
        y: 30,
        duration: 1.0,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-signal-quote]", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="signal"
      className="relative isolate"
      style={{ background: "var(--ht-void)" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-12 max-w-3xl" data-signal-meta>
          <p className="ht-eyebrow ht-eyebrow--signal">// signal</p>
          <h2 className="ht-display ht-display--lg mt-3">
            we ship in the open.
          </h2>
        </div>

        {/* Body */}
        <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr] lg:gap-12">
          {/* LEFT — filters + meta */}
          <aside data-signal-meta>
            <p className="ht-eyebrow mb-4">filter feed</p>
            <ul className="flex flex-col gap-1.5">
              {FILTERS.map((f) => {
                const isActive = filter === f.id;
                return (
                  <li key={f.id}>
                    <button
                      onClick={() => setFilter(f.id)}
                      data-cursor
                      data-cursor-label={f.label}
                      className="group flex w-full items-center justify-between gap-4 border px-3 py-2 text-left transition-colors duration-200"
                      style={{
                        borderColor: isActive
                          ? "var(--ht-signal)"
                          : "var(--ht-seam)",
                        background: isActive
                          ? "rgba(182,255,56,0.05)"
                          : "transparent",
                      }}
                    >
                      <span
                        className="flex items-center gap-2.5"
                        style={{ fontFamily: "var(--ht-mono)", fontSize: 13 }}
                      >
                        <span
                          aria-hidden
                          className="inline-block h-1.5 w-1.5 rounded-full"
                          style={{
                            background:
                              f.id === "all"
                                ? isActive
                                  ? "var(--ht-signal)"
                                  : "var(--ht-seam-2)"
                                : TYPE_COLORS[f.id] ?? "var(--ht-seam-2)",
                            opacity: isActive ? 1 : 0.5,
                          }}
                        />
                        <span
                          style={{
                            color: isActive ? "var(--ht-bone)" : "var(--ht-bone-mute)",
                          }}
                        >
                          {f.label}
                        </span>
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--ht-mono)",
                          fontSize: 11,
                          color: "var(--ht-dust-low)",
                        }}
                      >
                        {counts[f.id] ?? 0}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 ht-rule" />

            <p
              className="mt-6 text-[12.5px] leading-relaxed"
              style={{
                color: "var(--ht-dust-low)",
                fontFamily: "var(--ht-mono)",
              }}
            >
              // updated weekly. ships are real.
              <br />
              writing leans technical. talks lean philosophical.
            </p>
          </aside>

          {/* RIGHT — feed */}
          <div
            data-signal-feed
            className="relative border"
            style={{
              borderColor: "var(--ht-seam)",
              background:
                "linear-gradient(180deg, var(--ht-panel) 0%, var(--ht-void) 100%)",
            }}
          >
            {/* feed header */}
            <div
              className="flex items-center justify-between border-b px-5 py-3"
              style={{ borderColor: "var(--ht-seam)" }}
            >
              <span
                style={{
                  fontFamily: "var(--ht-mono)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--ht-dust)",
                }}
              >
                ht / feed.log
              </span>
              <span
                className="flex items-center gap-2"
                style={{
                  fontFamily: "var(--ht-mono)",
                  fontSize: 11,
                  color: "var(--ht-dust-low)",
                }}
              >
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{
                    background: "var(--ht-signal)",
                    boxShadow: "0 0 8px 1px var(--ht-signal-glow)",
                    animation: "ht-pulse 2.4s var(--ht-eo) infinite",
                  }}
                />
                tail · live
              </span>
            </div>

            <ul className="max-h-[520px] overflow-y-auto" data-lenis-prevent>
              {filtered.map((row, i) => (
                <li
                  key={row.date + row.body}
                  data-signal-row
                  className="group flex items-baseline gap-4 border-b px-5 py-3.5 transition-colors duration-200 last:border-b-0 hover:bg-[rgba(255,255,255,0.025)]"
                  style={{
                    borderColor: "var(--ht-seam)",
                    fontFamily: "var(--ht-mono)",
                  }}
                >
                  {/* newest pulse */}
                  {i === 0 && (
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{
                        background: "var(--ht-signal)",
                        boxShadow: "0 0 8px 1px var(--ht-signal-glow)",
                        animation: "ht-pulse 1.8s var(--ht-eo) infinite",
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontSize: 11.5,
                      color: "var(--ht-dust-low)",
                      minWidth: 88,
                    }}
                  >
                    {row.date}
                  </span>
                  <span
                    style={{
                      fontSize: 11.5,
                      color: TYPE_COLORS[row.type] ?? "var(--ht-bone)",
                      minWidth: 64,
                    }}
                  >
                    ▸ {row.type}
                  </span>
                  <span
                    className="flex-1 truncate"
                    style={{
                      fontSize: 13,
                      color: "var(--ht-bone-mute)",
                    }}
                  >
                    {row.body}
                  </span>
                  <a
                    href={row.href}
                    data-cursor
                    data-cursor-label="open"
                    className="opacity-30 transition-opacity duration-150 group-hover:opacity-100"
                    style={{
                      fontSize: 13,
                      color: "var(--ht-bone)",
                    }}
                  >
                    ↗
                  </a>
                </li>
              ))}
            </ul>

            <div
              className="flex items-center justify-between border-t px-5 py-3"
              style={{ borderColor: "var(--ht-seam)" }}
            >
              <span
                style={{
                  fontFamily: "var(--ht-mono)",
                  fontSize: 11,
                  color: "var(--ht-dust-low)",
                }}
              >
                {filtered.length} of {signal.length} entries
              </span>
              <span
                className="flex items-center gap-1.5"
                style={{
                  fontFamily: "var(--ht-mono)",
                  fontSize: 11,
                  color: "var(--ht-dust)",
                }}
              >
                press <span className="ht-caret" /> to follow
              </span>
            </div>
          </div>
        </div>

        {/* Editorial pull-quote — the one moment of italic serif */}
        <div className="ht-rule mt-24" />
        <blockquote
          data-signal-quote
          className="relative mx-auto mt-16 max-w-4xl"
          style={{ fontFamily: "var(--ht-serif)" }}
        >
          <p
            className="italic leading-[1.05]"
            style={{
              fontSize: "clamp(1.85rem, 4.4vw, 4rem)",
              color: "var(--ht-bone)",
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ color: "var(--ht-signal)" }}>“</span>
            {pullQuote.body}
            <span style={{ color: "var(--ht-signal)" }}>”</span>
          </p>
          <footer
            className="mt-8 flex items-center gap-3"
            style={{
              fontFamily: "var(--ht-mono)",
              fontSize: 12,
              color: "var(--ht-dust)",
            }}
          >
            <span
              aria-hidden
              className="inline-block h-px w-10"
              style={{ background: "var(--ht-seam-2)" }}
            />
            {pullQuote.attribution}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
