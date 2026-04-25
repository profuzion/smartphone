"use client";

import { useEffect, useRef } from "react";

/**
 * Profuzion · v2 — custom cursor.
 *
 * 18px ring tracks the pointer with subtle lerping.
 * Expands to 64px and shows `data-cursor-label` text on interactive
 * elements (anything with [data-cursor]).
 *
 * Hidden on touch / coarse-pointer devices.
 */

const LERP = 0.22;
const REST_SIZE = 18;
const HOT_SIZE = 64;

export function ProfuzionCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);

  const target = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const hot = useRef(false);
  const labelText = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      const isHot = !!el;
      hot.current = isHot;

      if (isHot && el) {
        const label = el.getAttribute("data-cursor-label");
        labelText.current = label;
        if (labelRef.current) {
          labelRef.current.textContent = label || "";
          labelRef.current.style.opacity = label ? "1" : "0";
        }
      } else {
        labelText.current = null;
        if (labelRef.current) {
          labelRef.current.textContent = "";
          labelRef.current.style.opacity = "0";
        }
      }
    };

    let raf = 0;
    const tick = () => {
      cursor.current.x += (target.current.x - cursor.current.x) * LERP;
      cursor.current.y += (target.current.y - cursor.current.y) * LERP;

      const size = hot.current ? HOT_SIZE : REST_SIZE;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${
          cursor.current.x - size / 2
        }px, ${cursor.current.y - size / 2}px, 0)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.background = hot.current
          ? "var(--p-amber)"
          : "transparent";
        ringRef.current.style.borderColor = hot.current
          ? "transparent"
          : "rgba(255,255,255,0.45)";
        ringRef.current.style.mixBlendMode = hot.current
          ? ("normal" as const)
          : ("normal" as const);
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${
          target.current.x - 2
        }px, ${target.current.y - 2}px, 0)`;
        dotRef.current.style.opacity = hot.current ? "0" : "1";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden rounded-full border md:block"
        style={{
          width: REST_SIZE,
          height: REST_SIZE,
          borderColor: "rgba(255,255,255,0.45)",
          mixBlendMode: "normal",
          transition:
            "width 220ms cubic-bezier(.2,.8,.2,1), height 220ms cubic-bezier(.2,.8,.2,1), background 220ms cubic-bezier(.2,.8,.2,1), border-color 220ms cubic-bezier(.2,.8,.2,1)",
          willChange: "transform",
        }}
      >
        <div
          ref={labelRef}
          className="absolute inset-0 grid place-items-center text-[10px] font-medium tracking-[0.16em] uppercase opacity-0 transition-opacity duration-200"
          style={{ color: "var(--p-on-signal)" }}
        />
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-1 w-1 rounded-full md:block"
        style={{
          background: "var(--p-amber)",
          willChange: "transform, opacity",
          transition: "opacity 200ms cubic-bezier(.2,.8,.2,1)",
        }}
      />
    </>
  );
}
