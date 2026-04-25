"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useScrollStore } from "@/lib/scroll-store";

/**
 * Mounts Lenis once at the document root and syncs it with GSAP's ticker
 * so ScrollTrigger animations stay in step with the smooth scroll.
 *
 * Also pushes progress (0..1) into the Zustand scroll store so that the
 * persistent 3D scene and any act-aware overlay can react.
 *
 * Respects `prefers-reduced-motion` by skipping the smooth engine and
 * falling back to a plain `scroll` listener on the window.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const setProgress = useScrollStore((s) => s.setProgress);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // ── Reduced-motion fallback ───────────────────────────────────
    if (prefersReducedMotion) {
      const onScroll = () => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    // ── Lenis smooth engine ───────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      lerp: 0.1,
    });

    lenisRef.current = lenis;

    const onScroll = (e: { scroll: number; limit: number }) => {
      ScrollTrigger.update();
      setProgress(e.limit > 0 ? e.scroll / e.limit : 0);
    };

    lenis.on("scroll", onScroll);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [setProgress]);

  return <>{children}</>;
}
