"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pullQuote } from "../_lib/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Profuzion · v4 — Pull quote (§7).
 *
 * Editorial moment. Oversized italic Instrument Serif over the cream
 * paper. Subtle scroll-driven mask reveals the text from left to right.
 */

export function SectionQuote() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const words = root.current?.querySelectorAll<HTMLElement>(
        "[data-quote-word]",
      );
      if (!words) return;

      gsap.fromTo(
        words,
        { opacity: 0.18, y: 0 },
        {
          opacity: 1,
          stagger: 0.04,
          duration: 0.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: root },
  );

  // Split the quote into words for word-by-word reveal
  const words = pullQuote.text.split(" ");

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden"
      style={{ background: "var(--p-paper)" }}
    >
      <div className="p-rule" />
      <div className="mx-auto max-w-[1480px] px-6 py-32 lg:px-10 lg:py-44">
        <p className="p-eyebrow p-eyebrow--amber mb-10 lg:mb-14">
          // founder voice
        </p>

        <blockquote className="relative">
          <p
            className="p-italic"
            style={{
              fontFamily: "var(--p-serif)",
              fontStyle: "italic",
              fontSize: "clamp(2rem, 5.6vw, 5.5rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: "var(--p-ink)",
              maxWidth: "22ch",
            }}
          >
            <span aria-hidden style={{ color: "var(--p-amber)", marginRight: "0.18em" }}>
              &ldquo;
            </span>
            {words.map((w, i) => (
              <span
                key={`${w}-${i}`}
                data-quote-word
                className="inline-block"
                style={{ marginRight: "0.16em" }}
              >
                {w}
              </span>
            ))}
            <span aria-hidden style={{ color: "var(--p-amber)" }}>
              &rdquo;
            </span>
          </p>

          <footer className="mt-10 flex items-center gap-4">
            <span
              aria-hidden
              className="inline-block h-px w-12"
              style={{ background: "var(--p-amber)" }}
            />
            <p
              style={{
                fontFamily: "var(--p-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--p-stone-mid)",
              }}
            >
              {pullQuote.source}
            </p>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
