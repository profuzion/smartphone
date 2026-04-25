"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { engagements, type Engagement } from "../_lib/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Halftone — Engagements (§5).
 *
 * Three "config object" cards rendered as code-editor windows:
 *   audit.json · engagement.json · retainer.json
 *
 * Hovering a card lifts it; the others dim. The card body is JSON
 * with the first two fields visible by default; the remaining fields
 * fade-and-stack in when the card is hovered (the "extra" fields).
 *
 * The middle card is marked primary — its window-bar accents
 * chartreuse and it stands a hair taller.
 */

export function SectionEngagements() {
  const root = useRef<HTMLElement | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.from("[data-eng-meta]", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from("[data-eng-card]", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="engagements"
      className="relative isolate"
      style={{ background: "var(--ht-ink)" }}
    >
      <div className="ht-rule" />

      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-14 max-w-3xl" data-eng-meta>
          <p className="ht-eyebrow ht-eyebrow--signal">// engagements</p>
          <h2 className="ht-display ht-display--lg mt-3">
            three configs.
            <br />
            no proposals.
          </h2>
          <p
            className="mt-4 max-w-xl text-[14.5px] leading-relaxed"
            style={{ color: "var(--ht-dust)" }}
          >
            We don't write 40-page decks. Pick the shape that matches the
            decision in front of you and we'll start the same week.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {engagements.map((e, i) => (
            <EngagementCard
              key={e.id}
              eng={e}
              index={i}
              hovered={hovered}
              onHover={setHovered}
            />
          ))}
        </div>

        {/* Footnote */}
        <p
          className="mt-10 text-[12px] leading-relaxed"
          style={{
            color: "var(--ht-dust-low)",
            fontFamily: "var(--ht-mono)",
          }}
        >
          // most engagements start as an audit, then upgrade. you decide.
        </p>
      </div>
    </section>
  );
}

function EngagementCard({
  eng,
  index,
  hovered,
  onHover,
}: {
  eng: Engagement;
  index: number;
  hovered: number | null;
  onHover: (i: number | null) => void;
}) {
  const isHovered = hovered === index;
  const isDimmed = hovered !== null && !isHovered;

  return (
    <article
      data-eng-card
      onPointerEnter={() => onHover(index)}
      onPointerLeave={() => onHover(null)}
      data-cursor
      data-cursor-label="open"
      className="ht-window relative flex flex-col transition-all duration-300"
      style={{
        opacity: isDimmed ? 0.55 : 1,
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 0 0 1px rgba(182,255,56,0.18), 0 30px 80px -30px rgba(0,0,0,0.8)"
          : "0 16px 50px -30px rgba(0,0,0,0.6)",
        borderColor: isHovered
          ? "rgba(182,255,56,0.3)"
          : eng.primary
            ? "rgba(182,255,56,0.15)"
            : "var(--ht-seam)",
      }}
    >
      {/* Window chrome */}
      <div className="ht-window__bar">
        <span
          className={`ht-window__dot ${eng.primary || isHovered ? "ht-window__dot--live" : ""}`}
        />
        <span className="ht-window__dot" />
        <span className="ht-window__dot" />
        <span className="ht-window__name">{eng.file}</span>
      </div>

      {/* Body */}
      <div className="flex-1 px-5 pb-2 pt-5">
        {/* Headline row — duration + primary star */}
        <div className="flex items-center justify-between">
          <p
            className="ht-eyebrow"
            style={{ color: eng.primary ? "var(--ht-signal)" : "var(--ht-dust)" }}
          >
            {eng.id}
            {eng.primary && (
              <span style={{ color: "var(--ht-signal)" }}> · primary</span>
            )}
          </p>
          <p
            className="ht-eyebrow"
            style={{ textTransform: "none", letterSpacing: "0.02em" }}
          >
            {eng.duration}
          </p>
        </div>

        <h3
          className="ht-display ht-display--md mt-3"
          style={{ color: "var(--ht-bone)", fontSize: "clamp(1.5rem, 2vw, 2.25rem)" }}
        >
          {eng.starting}
        </h3>

        {/* JSON */}
        <pre
          className="ht-json mt-5 whitespace-pre-wrap break-words"
        >
          <span className="p">{"{"}</span>
          {"\n"}
          {eng.fields.slice(0, 2).map((f) => (
            <span key={f.k} className="block">
              {"  "}
              <span className="k">"{f.k}"</span>
              <span className="p">: </span>
              <span
                className={
                  f.v.startsWith("[") || f.v.startsWith("{") ? "n" : "s"
                }
              >
                {f.v}
              </span>
              <span className="p">,</span>
            </span>
          ))}
          {/* Hidden fields — fade and "type" in on hover */}
          <span
            className="block overflow-hidden transition-[max-height,opacity] duration-500 ease-[var(--ht-eo)]"
            style={{
              maxHeight: isHovered ? 200 : 0,
              opacity: isHovered ? 1 : 0,
            }}
          >
            {eng.fields.slice(2).map((f, j) => (
              <span
                key={f.k}
                className={isHovered ? "ht-fold-line block" : "block"}
                style={{ animationDelay: `${j * 80 + 60}ms` }}
              >
                {"  "}
                <span className="k">"{f.k}"</span>
                <span className="p">: </span>
                <span
                  className={
                    f.v.startsWith("[") || f.v.startsWith("{") ? "n" : "s"
                  }
                >
                  {f.v}
                </span>
                {j < eng.fields.length - 3 ? <span className="p">,</span> : null}
              </span>
            ))}
          </span>
          <span className="p">{"}"}</span>
        </pre>

        {/* Bottom CTA */}
        <div
          className="mt-5 flex items-center justify-between border-t pt-4"
          style={{ borderColor: "var(--ht-seam)" }}
        >
          <span
            style={{
              fontFamily: "var(--ht-mono)",
              fontSize: 11,
              color: "var(--ht-dust-low)",
            }}
          >
            // tab to expand
          </span>
          <a
            href="#initialize"
            data-cursor
            data-cursor-label="request"
            className="inline-flex items-center gap-1.5 transition-colors duration-200"
            style={{
              fontFamily: "var(--ht-mono)",
              fontSize: 12,
              color: isHovered ? "var(--ht-signal)" : "var(--ht-bone)",
            }}
          >
            request
            <span className="ht-arrow">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}
