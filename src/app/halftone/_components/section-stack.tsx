"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { capabilities, surfaces } from "../_lib/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const StackCluster = dynamic(
  () => import("../_three/stack-cluster").then((m) => m.StackCluster),
  { ssr: false, loading: () => null },
);

/**
 * Halftone — Stack & Surfaces (§4).
 *
 * Layout
 *   ┌─────────────────────────────────────┬───────────────────┐
 *   │                                     │  // capabilities   │
 *   │       [3D panel cluster]            │   - design systems │
 *   │       (drag · auto-rotate)          │   - operator dbs   │
 *   │                                     │   - agent tooling  │
 *   │                                     │   - data viz       │
 *   │                                     │   - eval ifaces    │
 *   │                                     │   - config editors │
 *   └─────────────────────────────────────┴───────────────────┘
 *
 * Hovering a capability sets `activeId` on the cluster, which lifts
 * the matching panel forward and dims the rest. Touch / mobile gets
 * the cluster on its own and the capability list as a horizontal
 * scroll-snap row beneath it.
 */

export function SectionStack() {
  const root = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<string | null>(null);

  useGSAP(
    () => {
      gsap.from("[data-stack-meta]", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from("[data-cap]", {
        opacity: 0,
        x: 16,
        duration: 0.55,
        ease: "expo.out",
        stagger: 0.06,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="stack"
      className="relative isolate overflow-hidden"
      style={{ background: "var(--ht-void)" }}
    >
      <div className="ht-grid--fine pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        {/* Section meta */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6" data-stack-meta>
          <div>
            <p className="ht-eyebrow ht-eyebrow--signal">// stack</p>
            <h2 className="ht-display ht-display--lg mt-3 max-w-3xl">
              six surfaces. one coherent voice.
            </h2>
          </div>
          <p
            className="max-w-md text-[14.5px] leading-relaxed"
            style={{ color: "var(--ht-dust)" }}
          >
            We design across the surfaces a modern AI product needs — assistant
            chat, agent tooling, observability, eval — and we keep the language
            consistent across every one.
          </p>
        </div>

        {/* Body */}
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          {/* Cluster */}
          <div
            className="relative overflow-hidden border"
            style={{
              borderColor: "var(--ht-seam)",
              background:
                "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(255,255,255,0.025), transparent 70%), var(--ht-ink)",
              height: "min(76vh, 720px)",
              minHeight: 480,
              cursor: "grab",
            }}
            data-cursor
            data-cursor-label="rotate"
          >
            <StackCluster activeId={active} />

            {/* Corner annotations */}
            <div className="pointer-events-none absolute left-4 top-4">
              <p
                className="ht-eyebrow"
                style={{ color: "var(--ht-dust)" }}
              >
                ht / cluster · 6 surfaces
              </p>
            </div>
            <div className="pointer-events-none absolute right-4 top-4">
              <p
                className="ht-eyebrow"
                style={{ color: "var(--ht-dust-low)" }}
              >
                drag to rotate
              </p>
            </div>
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <p
                className="ht-eyebrow"
                style={{
                  color: active ? "var(--ht-signal)" : "var(--ht-dust-low)",
                }}
              >
                {active
                  ? `focus: ${surfaces.find((s) => s.id === active)?.name}`
                  : "ambient · auto-rotate"}
              </p>
              <p className="ht-eyebrow" style={{ color: "var(--ht-dust-low)" }}>
                fps 60 · dpr 1.6
              </p>
            </div>
          </div>

          {/* Capability list */}
          <aside>
            <p className="ht-eyebrow mb-6">// capabilities</p>
            <ul
              className="flex gap-2 overflow-x-auto pb-3 lg:flex-col lg:gap-0 lg:overflow-visible"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {capabilities.map((c, i) => {
                const isActive = active === c.id;
                const surface = surfaces.find((s) => s.id === c.id);
                return (
                  <li
                    key={c.id}
                    data-cap
                    className="shrink-0 lg:w-full"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <button
                      onPointerEnter={() => setActive(c.id)}
                      onPointerLeave={() => setActive(null)}
                      onFocus={() => setActive(c.id)}
                      onBlur={() => setActive(null)}
                      data-cursor
                      data-cursor-label="lift"
                      className="group flex w-full items-center justify-between gap-4 border-b py-5 pl-2 pr-3 text-left transition-colors duration-200"
                      style={{
                        borderColor: "var(--ht-seam)",
                      }}
                    >
                      <span className="flex items-center gap-4">
                        <span
                          aria-hidden
                          className="flex items-center"
                          style={{
                            fontFamily: "var(--ht-mono)",
                            fontSize: 11,
                            color: "var(--ht-dust-low)",
                            letterSpacing: "0.16em",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="transition-colors duration-200"
                          style={{
                            fontFamily: "var(--ht-mono)",
                            fontSize: 14,
                            color: isActive ? "var(--ht-bone)" : "var(--ht-bone-mute)",
                          }}
                        >
                          {c.label}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="h-2 w-2 rounded-full transition-all duration-300"
                        style={{
                          background: isActive
                            ? surface?.color ?? "var(--ht-signal)"
                            : "var(--ht-seam-2)",
                          boxShadow: isActive
                            ? `0 0 10px 1px ${surface?.color ?? "var(--ht-signal)"}88`
                            : "none",
                          transform: isActive ? "scale(1.4)" : "scale(1)",
                        }}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <p
              className="mt-8 text-[12.5px] leading-relaxed"
              style={{
                color: "var(--ht-dust-low)",
                fontFamily: "var(--ht-mono)",
              }}
            >
              hover a capability to lift its surface forward.
              <br />
              the rest fade. they always come back.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
