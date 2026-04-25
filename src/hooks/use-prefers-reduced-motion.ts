"use client";

import { useEffect, useState } from "react";

/**
 * Reports the user's `prefers-reduced-motion` preference. Server-safe:
 * always returns `false` during SSR so we never mismatch hydration.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
