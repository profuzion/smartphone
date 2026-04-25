"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Halftone — custom cursor.
 *
 * • Hidden on touch / coarse pointer devices (CSS handles `cursor: none`
 *   only when fine pointers are detected, see halftone.css).
 * • Tracks mouse with requestAnimationFrame; the cursor lerps toward
 *   the target each frame for a slightly trailing feel.
 * • Reads two attrs from interactive elements:
 *     data-cursor                 — toggles "expanded" state
 *     data-cursor-label="probe"   — replaces the label text
 *
 * The cursor is positioned: fixed and given pointer-events: none, so it
 * is purely visual — real hit-testing remains on the element below.
 */

export function HalftoneCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [label, setLabel] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const root = document.documentElement;
    root.classList.add("halftone--cursor-on");

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible) setVisible(true);
      const el = e.target as HTMLElement | null;
      const interactive = el?.closest?.("[data-cursor], a, button, [role='button']");
      if (interactive) {
        const lbl = (interactive as HTMLElement).getAttribute("data-cursor-label");
        setLabel(lbl);
        setExpanded(true);
      } else {
        setLabel(null);
        setExpanded(false);
      }
    };

    const tick = () => {
      // Smooth lerp the ring toward the cursor, leave the dot pinned.
      ring.current.x += (target.current.x - ring.current.x) * 0.22;
      ring.current.y += (target.current.y - ring.current.y) * 0.22;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      root.classList.remove("halftone--cursor-on");
    };
  }, [visible]);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full transition-[width,height,background,border-color,opacity] duration-200 will-change-transform"
        style={{
          width: expanded ? 72 : 26,
          height: expanded ? 72 : 26,
          border: `1px solid ${expanded ? "var(--ht-signal)" : "rgba(232,232,234,0.5)"}`,
          background: expanded ? "rgba(182,255,56,0.08)" : "transparent",
          opacity: visible ? 1 : 0,
        }}
      >
        {label && (
          <span
            className="select-none uppercase"
            style={{
              fontFamily: "var(--ht-mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
              color: "var(--ht-signal)",
            }}
          >
            {label}
          </span>
        )}
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full transition-opacity duration-150 will-change-transform"
        style={{
          width: 4,
          height: 4,
          background: expanded ? "var(--ht-signal)" : "var(--ht-bone)",
          boxShadow: expanded ? "0 0 8px 1px var(--ht-signal-glow)" : "none",
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  );
}
