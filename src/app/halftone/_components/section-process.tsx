"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { phases } from "../_lib/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Halftone — Pipeline (§3).
 *
 *   ─ Two-column layout
 *     • Left 38% — vertical phase ticker; a chartreuse rule "draws" downward
 *       as the section scrolls into view.
 *     • Right 62% — accordion of four code-fold panels, each rendered as
 *       a syntax-highlighted JSON object. One open at a time. First is open
 *       on mount.
 *
 *   ─ Click any phase header to expand. The expanded panel shows the
 *     JSON config, line-by-line, with a 50ms stagger.
 */

export function SectionProcess() {
  const root = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<number>(0);

  useGSAP(
    () => {
      // Section eyebrow + headline reveal.
      gsap.from("[data-process-meta]", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      // Side ticker: the chartreuse rule scales from 0 to 1 across the section.
      gsap.fromTo(
        "[data-process-rule]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="process"
      className="relative isolate"
      style={{ background: "var(--ht-ink)" }}
    >
      {/* Hairline separator from previous section */}
      <div className="ht-rule" />

      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        {/* Section meta */}
        <div className="mb-16 max-w-3xl" data-process-meta>
          <p className="ht-eyebrow ht-eyebrow--signal">// pipeline</p>
          <h2 className="ht-display ht-display--lg mt-3">
            four phases. no theatre.
          </h2>
          <p
            className="mt-4 max-w-xl text-[14.5px] leading-relaxed"
            style={{ color: "var(--ht-dust)" }}
          >
            We work in repos, not Figma exports. Every phase ends with a
            decision you can make in five minutes.
          </p>
        </div>

        {/* Body */}
        <div className="grid gap-10 lg:grid-cols-[0.45fr_1fr] lg:gap-16">
          {/* LEFT — scroll ticker */}
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <p className="ht-eyebrow mb-6">phase ticker</p>
              <div className="relative pl-6">
                {/* Hairline rule */}
                <span
                  aria-hidden
                  className="absolute left-2 top-0 h-full w-px"
                  style={{ background: "var(--ht-seam)" }}
                />
                {/* Animated chartreuse rule */}
                <span
                  aria-hidden
                  data-process-rule
                  className="absolute left-2 top-0 h-full w-px origin-top"
                  style={{
                    background: "var(--ht-signal)",
                    boxShadow: "0 0 8px 1px var(--ht-signal-glow)",
                  }}
                />
                <ul className="flex flex-col gap-10">
                  {phases.map((p, i) => {
                    const active = open === i;
                    return (
                      <li key={p.n} className="relative">
                        <span
                          aria-hidden
                          className="absolute -left-[18px] top-1.5 h-3 w-3 rounded-full transition-colors duration-300"
                          style={{
                            background: active ? "var(--ht-signal)" : "var(--ht-seam-2)",
                            border: `1px solid ${active ? "var(--ht-signal)" : "var(--ht-seam-2)"}`,
                            boxShadow: active
                              ? "0 0 12px 2px var(--ht-signal-glow)"
                              : "none",
                          }}
                        />
                        <button
                          onClick={() => setOpen(i)}
                          data-cursor
                          data-cursor-label="focus"
                          className="block text-left transition-colors duration-200"
                          style={{
                            fontFamily: "var(--ht-mono)",
                            fontSize: 12.5,
                            color: active ? "var(--ht-bone)" : "var(--ht-dust)",
                          }}
                        >
                          <span style={{ color: "var(--ht-dust-low)" }}>
                            {p.n} //{" "}
                          </span>
                          {p.name}
                          <span className="block mt-1 text-[10.5px] uppercase tracking-[0.16em]" style={{ color: "var(--ht-dust-low)" }}>
                            {p.duration}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>

          {/* RIGHT — accordion */}
          <div className="flex flex-col gap-4">
            {phases.map((p, i) => (
              <PhasePanel
                key={p.n}
                phase={p}
                open={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PhasePanel({
  phase,
  open,
  onToggle,
}: {
  phase: (typeof phases)[number];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="ht-window transition-shadow duration-300"
      style={{
        boxShadow: open
          ? "0 0 0 1px var(--ht-signal-glow), 0 24px 60px -24px rgba(0,0,0,0.7)"
          : "none",
      }}
    >
      <button
        onClick={onToggle}
        data-cursor
        data-cursor-label={open ? "close" : "open"}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
      >
        {/* Window dots — first one lights chartreuse when open */}
        <span
          className={`ht-window__dot ${open ? "ht-window__dot--live" : ""}`}
        />
        <span className="ht-window__dot" />
        <span className="ht-window__dot" />

        {/* Phase identity */}
        <div className="ml-2 flex flex-1 items-center gap-4">
          <span
            style={{
              fontFamily: "var(--ht-mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--ht-dust-low)",
            }}
          >
            {phase.n}
          </span>
          <span
            style={{
              fontFamily: "var(--ht-mono)",
              fontSize: 14,
              color: open ? "var(--ht-bone)" : "var(--ht-bone-mute)",
            }}
          >
            {phase.name}.json
          </span>
          <span
            className="hidden flex-1 truncate sm:inline-block"
            style={{
              fontFamily: "var(--ht-sans)",
              fontSize: 13,
              color: "var(--ht-dust)",
            }}
          >
            {phase.headline}
          </span>
        </div>

        <span
          aria-hidden
          className="text-[18px] transition-transform duration-300"
          style={{
            color: open ? "var(--ht-signal)" : "var(--ht-dust)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            fontFamily: "var(--ht-mono)",
          }}
        >
          +
        </span>
      </button>

      {/* Expanded body */}
      <div
        className="overflow-hidden transition-[max-height] duration-500 ease-[var(--ht-eo)]"
        style={{
          maxHeight: open ? 360 : 0,
        }}
      >
        <div className="border-t" style={{ borderColor: "var(--ht-seam)" }}>
          <div
            className="grid gap-6 px-5 py-6 sm:grid-cols-[auto_1fr] sm:px-7"
            style={{ background: "var(--ht-void)" }}
          >
            <div>
              <p className="ht-eyebrow">duration</p>
              <p
                className="mt-1"
                style={{
                  fontFamily: "var(--ht-mono)",
                  fontSize: 13,
                  color: "var(--ht-bone)",
                }}
              >
                {phase.duration}
              </p>
              <p className="ht-eyebrow mt-5">phase {phase.n}</p>
              <p
                className="mt-1 max-w-xs text-[13px] leading-relaxed"
                style={{ color: "var(--ht-bone-mute)" }}
              >
                {phase.headline}
              </p>
            </div>

            <pre
              key={open ? "on" : "off"}
              className="ht-json whitespace-pre-wrap break-words"
              style={{ tabSize: 2 }}
            >
              <span className="ht-fold-line" style={{ animationDelay: "0ms", display: "block" }}>
                <span className="p">{"{"}</span>
              </span>
              {phase.json.map((row, idx) => (
                <span
                  key={row.k}
                  className="ht-fold-line block"
                  style={{ animationDelay: `${50 + idx * 70}ms` }}
                >
                  {"  "}
                  <span className="k">"{row.k}"</span>
                  <span className="p">: </span>
                  <span
                    className={
                      row.v.startsWith("[") || row.v.startsWith("{")
                        ? "n"
                        : "s"
                    }
                  >
                    {row.v}
                  </span>
                  {idx < phase.json.length - 1 ? (
                    <span className="p">,</span>
                  ) : null}
                </span>
              ))}
              <span
                className="ht-fold-line block"
                style={{ animationDelay: `${50 + phase.json.length * 70}ms` }}
              >
                <span className="p">{"}"}</span>
              </span>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
