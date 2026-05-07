"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { founderIntro } from "../_lib/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Profuzion · v2 — Founder / About.
 *
 * Portrait + short back story after Industries so visitors meet the
 * person behind the work before the case studies.
 */

export function SectionFounder() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from("[data-founder-meta]", {
        opacity: 0,
        y: 20,
        duration: 0.65,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
      gsap.from("[data-founder-visual]", {
        opacity: 0,
        y: 24,
        duration: 0.75,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="about"
      className="relative isolate"
      style={{ background: "var(--p-paper)" }}
      aria-labelledby="founder-heading"
    >
      <div className="p-rule" />

      <div className="mx-auto max-w-[1480px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          {/* Portrait */}
          <div data-founder-visual className="relative order-2 lg:order-1">
            <div
              className="p-card group relative aspect-[3/4] w-full max-w-md overflow-hidden lg:max-w-none"
              data-cursor
              data-cursor-label="portrait"
            >
              <Image
                src={founderIntro.imageSrc}
                alt={founderIntro.imageAlt}
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                priority={false}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 55%, rgba(15,14,12,0.22) 100%)",
                }}
              />
              <p
                className="absolute left-4 bottom-4 m-0"
                style={{
                  fontFamily: "var(--p-mono)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.9)",
                  textShadow: "0 1px 12px rgba(0,0,0,0.4)",
                }}
              >
                {founderIntro.name}
                <span
                  className="mx-2"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                  aria-hidden
                >
                  ·
                </span>
                {founderIntro.role}
              </p>
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 max-w-xl lg:order-2">
            <div data-founder-meta>
              <p className="p-eyebrow p-eyebrow--amber">{"// the founder"}</p>
              <h2
                id="founder-heading"
                className="p-display p-display--lg mt-3"
              >
                {founderIntro.headline}
              </h2>
            </div>

            <p className="p-lede mt-8">
              {founderIntro.paragraphs[0]}
            </p>
            <p className="p-body mt-5">
              {founderIntro.paragraphs[1]}
            </p>

            <a
              href="#contact"
              className="btn--base btn--outline mt-10 inline-flex"
              data-cursor
              data-cursor-label="write"
            >
              Write me directly
              <span className="pfz-btn-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
