"use client";

import { useScrollStore } from "@/lib/scroll-store";

/**
 * Profuzion · v4 — Scroll progress hairline.
 *
 * A 2px chartreuse rail pinned to the top of the viewport. Its scaleX is
 * driven directly off the global Lenis-fed scroll store, so it tracks the
 * current document position without registering its own ScrollTrigger.
 *
 * Sits above the nav (z 60) and is non-interactive.
 */
export function ProfuzionScrollProgress() {
  const progress = useScrollStore((s) => s.progress);
  return (
    <div className="v4-progress" aria-hidden>
      <div
        className="v4-progress__bar"
        style={{ transform: `scaleX(${progress.toFixed(4)})` }}
      />
    </div>
  );
}
