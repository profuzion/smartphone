"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cases, type Case } from "../_lib/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Halftone — Live Index (§2).
 *
 * The conventional "Selected Work" grid is replaced with an interactive
 * terminal-style case index.
 *
 *   • Left col (lg: 58%) — 12-row mono table.
 *   • Right col (lg: 42%) — sticky preview that swaps on row hover.
 *   • Mobile — preview collapses; the row's note expands inline.
 *
 * The preview is a procedurally-styled "panel" — a window-chrome card
 * with a per-case accent and a hand-tuned mini composition. Avoids the
 * generic "screenshot grid" trap entirely.
 */

const ACCENT_BY_SURFACE: Record<string, string> = {
  "assistant ui": "#B6FF38",
  "admin console": "#7C9CFF",
  "agent toolkit": "#F4B95A",
  "observability": "#FF7A5C",
  "eval ui": "#A57DFB",
  "config dsl": "#5DD3B0",
  "onboarding flow": "#B6FF38",
  "policy console": "#A57DFB",
  "inference fleet": "#FF7A5C",
  "agentic crm": "#7C9CFF",
  "voice studio": "#5DD3B0",
};

export function SectionIndex() {
  const root = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<number>(0);

  useGSAP(
    () => {
      gsap.from("[data-row]", {
        opacity: 0,
        y: 12,
        duration: 0.5,
        ease: "expo.out",
        stagger: 0.04,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      gsap.from("[data-index-eyebrow]", {
        opacity: 0,
        y: 18,
        duration: 0.6,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="cases"
      className="relative isolate"
      style={{ background: "var(--ht-ink)" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        {/* Section meta */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div data-index-eyebrow>
            <p className="ht-eyebrow ht-eyebrow--signal">// cases</p>
            <h2 className="ht-display ht-display--lg mt-3 max-w-3xl">
              an index of recent surfaces.
            </h2>
            <p
              className="mt-4 max-w-xl text-[14.5px] leading-relaxed"
              style={{ color: "var(--ht-dust)" }}
            >
              {cases.length} entries. press <Kbd>j</Kbd> / <Kbd>k</Kbd> to
              traverse, <Kbd>↩</Kbd> to open. hover a row to load its preview.
            </p>
          </div>
          <div
            className="flex items-center gap-2 border px-2.5 py-1.5"
            style={{ borderColor: "var(--ht-seam)" }}
          >
            <span
              style={{
                fontFamily: "var(--ht-mono)",
                fontSize: 11,
                color: "var(--ht-dust-low)",
              }}
            >
              grep
            </span>
            <span style={{ color: "var(--ht-dust)", fontFamily: "var(--ht-mono)", fontSize: 12 }}>
              ▸
            </span>
            <span className="ht-caret" />
          </div>
        </div>

        {/* Two-column body */}
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          {/* TABLE */}
          <div>
            {/* Header row */}
            <div
              className="grid items-center gap-3 border-y py-3 text-[10.5px] tracking-[0.18em] uppercase"
              style={{
                fontFamily: "var(--ht-mono)",
                color: "var(--ht-dust-low)",
                borderColor: "var(--ht-seam)",
                gridTemplateColumns: "44px 1.5fr 1.6fr 1.4fr 0.9fr 24px",
              }}
            >
              <span>#</span>
              <span>client</span>
              <span className="hidden md:block">surface</span>
              <span className="hidden md:block">model</span>
              <span>status</span>
              <span aria-hidden />
            </div>

            {/* Rows */}
            <ul>
              {cases.map((c, i) => (
                <li
                  key={c.n}
                  data-row
                  data-cursor
                  data-cursor-label="open"
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative grid cursor-pointer items-center gap-3 border-b py-4 transition-colors duration-200"
                  style={{
                    borderColor: "var(--ht-seam)",
                    gridTemplateColumns: "44px 1.5fr 1.6fr 1.4fr 0.9fr 24px",
                    background:
                      active === i ? "rgba(255,255,255,0.025)" : "transparent",
                  }}
                  tabIndex={0}
                >
                  {/* left ticker fill */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-0 h-full w-[2px] origin-top transition-transform duration-300"
                    style={{
                      background: "var(--ht-signal)",
                      transform:
                        active === i ? "scaleY(1)" : "scaleY(0)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--ht-mono)",
                      fontSize: 11,
                      color: "var(--ht-dust-low)",
                    }}
                  >
                    {c.n}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--ht-mono)",
                      fontSize: 14,
                      color: "var(--ht-bone)",
                    }}
                  >
                    {c.client}
                  </span>
                  <span
                    className="hidden md:block"
                    style={{
                      fontFamily: "var(--ht-mono)",
                      fontSize: 13,
                      color: "var(--ht-bone-mute)",
                    }}
                  >
                    {c.surface}
                  </span>
                  <span
                    className="hidden md:block"
                    style={{
                      fontFamily: "var(--ht-mono)",
                      fontSize: 12,
                      color: "var(--ht-dust)",
                    }}
                  >
                    {c.model}
                  </span>
                  <span
                    className="flex items-center gap-2"
                    style={{
                      fontFamily: "var(--ht-mono)",
                      fontSize: 11,
                      color:
                        c.status === "in flight"
                          ? "var(--ht-signal)"
                          : "var(--ht-dust)",
                    }}
                  >
                    {c.status === "in flight" && (
                      <span
                        aria-hidden
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{
                          background: "var(--ht-signal)",
                          animation: "ht-pulse 1.6s var(--ht-eo) infinite",
                          boxShadow: "0 0 8px 1px var(--ht-signal-glow)",
                        }}
                      />
                    )}
                    <span>{c.status}</span>
                  </span>
                  <span
                    className="opacity-40 transition-opacity duration-200 group-hover:opacity-100"
                    style={{
                      fontFamily: "var(--ht-mono)",
                      fontSize: 13,
                      color: "var(--ht-bone)",
                    }}
                  >
                    ↗
                  </span>
                </li>
              ))}

              {/* Continue row — blinking caret */}
              <li
                className="flex items-center gap-2 py-5 text-[12px]"
                style={{ fontFamily: "var(--ht-mono)", color: "var(--ht-dust)" }}
              >
                <span style={{ color: "var(--ht-dust-low)" }}>▸</span>
                continue browsing
                <span className="ht-caret ht-caret--signal" />
              </li>
            </ul>
          </div>

          {/* STICKY PREVIEW */}
          <div className="relative">
            <div className="lg:sticky lg:top-28">
              <CasePreview c={cases[active]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block px-1.5 py-0.5"
      style={{
        fontFamily: "var(--ht-mono)",
        fontSize: 11,
        border: "1px solid var(--ht-seam)",
        borderRadius: 3,
        color: "var(--ht-bone)",
        background: "var(--ht-panel)",
      }}
    >
      {children}
    </span>
  );
}

function CasePreview({ c }: { c: Case }) {
  const accent = ACCENT_BY_SURFACE[c.surface] ?? "#B6FF38";

  return (
    <article
      key={c.n}
      className="ht-window ht-fadein relative"
      style={{ minHeight: 420 }}
    >
      <div className="ht-window__bar">
        <span className="ht-window__dot ht-window__dot--live" />
        <span className="ht-window__dot" />
        <span className="ht-window__dot" />
        <span className="ht-window__name">{c.client}.surface.tsx</span>
      </div>

      {/* Visual mini-composition — accent halo + mono label + abstract grid */}
      <div className="relative px-7 pb-7 pt-9">
        <span
          aria-hidden
          className="absolute right-7 top-7 block h-12 w-12 rounded-full"
          style={{
            background: `radial-gradient(circle, ${accent}55 0%, transparent 70%)`,
          }}
        />
        <p
          className="ht-eyebrow"
          style={{ color: "var(--ht-dust)" }}
        >
          ht / case · {c.n}
        </p>
        <h3
          className="ht-display ht-display--md mt-3"
          style={{ color: "var(--ht-bone)" }}
        >
          {c.client}<span style={{ color: accent }}>.</span>
        </h3>
        <p
          className="mt-3 text-[13.5px] leading-relaxed"
          style={{ color: "var(--ht-bone-mute)" }}
        >
          {c.note}
        </p>

        {/* Mini composition — abstract surface vignette */}
        <div
          className="mt-6 grid gap-2"
          style={{ gridTemplateColumns: "repeat(12, 1fr)" }}
        >
          {/* accent strip */}
          <div
            className="col-span-12 h-1"
            style={{
              background: `linear-gradient(90deg, ${accent} 0%, transparent 60%)`,
            }}
          />
          {/* labels */}
          {[
            ["surface", c.surface],
            ["model", c.model],
            ["status", c.status],
          ].map(([k, v]) => (
            <div
              key={k}
              className="col-span-12 flex items-center justify-between border-t pt-2 sm:col-span-12"
              style={{ borderColor: "var(--ht-seam)" }}
            >
              <span
                style={{
                  fontFamily: "var(--ht-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--ht-dust-low)",
                }}
              >
                {k}
              </span>
              <span
                style={{
                  fontFamily: "var(--ht-mono)",
                  fontSize: 12,
                  color: k === "status" ? accent : "var(--ht-bone)",
                }}
              >
                {v}
              </span>
            </div>
          ))}

          {/* abstract chart strip */}
          <div
            className="col-span-12 mt-3 grid h-20 gap-px overflow-hidden"
            style={{ gridTemplateColumns: "repeat(32, minmax(0, 1fr))" }}
          >
            {Array.from({ length: 32 }).map((_, i) => {
              // Deterministic pseudo-random heights from index + case n.
              const seed = (i * 9301 + parseInt(c.n) * 49297) % 233280;
              const h = 12 + (seed % 70);
              const tint = i % 7 === 0 ? accent : "rgba(255,255,255,0.16)";
              return (
                <span
                  key={i}
                  className="block"
                  style={{
                    height: `${h}%`,
                    alignSelf: "end",
                    background: tint,
                  }}
                />
              );
            })}
          </div>
        </div>

        <a
          href="#"
          data-cursor
          data-cursor-label="open"
          className="mt-7 inline-flex items-center gap-2 border px-3 py-1.5 transition-colors duration-200"
          style={{
            fontFamily: "var(--ht-mono)",
            fontSize: 12,
            borderColor: "var(--ht-seam)",
            color: "var(--ht-bone)",
          }}
        >
          read the case
          <span className="ht-arrow">→</span>
        </a>
      </div>
    </article>
  );
}
