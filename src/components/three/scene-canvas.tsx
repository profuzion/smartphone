"use client";

import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor, Preload } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Seed } from "./seed";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Persistent sticky scene. Mounted once at the root of `<main>` as a
 * fixed full-viewport layer behind all HTML. Every act sits on top of
 * this one continuous 3D stage, which is what sells the "render that
 * follows you down the page" promise.
 *
 * - `dpr` auto-tiered via PerformanceMonitor (cuts pixel cost on low GPUs).
 * - `prefers-reduced-motion` users get a static render (one frame, no loop).
 * - `aria-hidden` so screen readers skip the canvas and read the HTML.
 */
export function SceneCanvas() {
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5]);
  const reduced = usePrefersReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ contain: "strict" }}
    >
      {/*
       * Atmospheric tint sits BEHIND the canvas so the seed is never
       * occluded. The canvas uses alpha:true, so these gradients show
       * through wherever the seed isn't drawn.
       */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_75%_28%,rgba(255,77,31,0.22),transparent_60%),radial-gradient(ellipse_55%_55%_at_18%_82%,rgba(124,58,237,0.14),transparent_70%)]"
      />

      <Canvas
        dpr={dpr}
        frameloop={reduced ? "demand" : "always"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ fov: 32, position: [0, 0, 6] }}
        className="absolute inset-0"
      >
        <PerformanceMonitor
          onIncline={() => setDpr([1, 2])}
          onDecline={() => setDpr([1, 1])}
        />
        <Suspense fallback={null}>
          <Seed />
        </Suspense>
        <Preload all />
      </Canvas>

      {/*
       * Bottom-only vignette sits ABOVE the canvas to fade the seed into
       * the obsidian floor as you scroll. Top half of the screen stays
       * clean so the seed reads beside the hero typography.
       */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[35vh] bg-gradient-to-b from-transparent to-obsidian" />
    </div>
  );
}
