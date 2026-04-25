"use client";

import { useEffect, useState } from "react";

/**
 * Halftone — sticky nav.
 *
 * Three regions:
 *   • Left: monogram lockup [HT] + index id
 *   • Center: section anchor pills (active state lights chartreuse)
 *   • Right: single primary CTA `book a probe →`
 *
 * Uses IntersectionObserver to keep the active section in sync as the
 * page scrolls. Backdrop blur kicks in once the user has scrolled
 * past the hero.
 */

const LINKS = [
  { id: "cases", label: "index" },
  { id: "process", label: "pipeline" },
  { id: "stack", label: "stack" },
  { id: "engagements", label: "engagements" },
  { id: "signal", label: "signal" },
] as const;

export function HalftoneNav() {
  const [active, setActive] = useState<string>("cases");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean,
    ) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.2, 0.5, 1],
      },
    );

    sections.forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        background: scrolled ? "rgba(10,10,11,0.65)" : "transparent",
        borderBottom: scrolled
          ? "1px solid var(--ht-seam)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        {/* Lockup */}
        <a
          href="#top"
          data-cursor
          data-cursor-label="top"
          className="group flex items-center gap-3"
        >
          <span
            className="grid h-8 w-8 place-items-center border text-[11px] tracking-[0.18em]"
            style={{
              fontFamily: "var(--ht-mono)",
              borderColor: "var(--ht-seam)",
              color: "var(--ht-bone)",
            }}
          >
            HT
          </span>
          <span
            className="hidden whitespace-nowrap text-[11px] tracking-[0.18em] uppercase lg:inline"
            style={{ fontFamily: "var(--ht-mono)", color: "var(--ht-dust)" }}
          >
            halftone
            <span style={{ color: "var(--ht-dust-low)" }}>
              {" / index-001"}
            </span>
          </span>
        </a>

        {/* Center pills */}
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  data-cursor
                  data-cursor-label={l.label}
                  className="relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors duration-200"
                  style={{
                    fontFamily: "var(--ht-mono)",
                    fontSize: 12,
                    letterSpacing: "0.04em",
                    color: isActive ? "var(--ht-bone)" : "var(--ht-dust)",
                  }}
                >
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full transition-all duration-200"
                    style={{
                      background: isActive
                        ? "var(--ht-signal)"
                        : "var(--ht-seam-2)",
                      boxShadow: isActive
                        ? "0 0 8px 1px var(--ht-signal-glow)"
                        : "none",
                    }}
                  />
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <a href="#initialize" className="ht-btn" data-cursor data-cursor-label="book">
          book a probe
          <span className="ht-arrow">→</span>
        </a>
      </div>
    </nav>
  );
}
