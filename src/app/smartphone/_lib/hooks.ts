import { useLayoutEffect, useState, useSyncExternalStore } from "react";

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function useCoarsePointer(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(pointer: coarse)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(pointer: coarse)").matches,
    () => false,
  );
}

/** Bumps when viewport settles after resize — rebuild ScrollTriggers safely */
export function useViewportSignature(): number {
  const [sig, setSig] = useState(0);

  useLayoutEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const bump = () => {
      clearTimeout(t);
      t = setTimeout(() => setSig((s) => s + 1), 180);
    };
    bump();
    window.addEventListener("resize", bump, { passive: true });
    return () => {
      window.removeEventListener("resize", bump);
      clearTimeout(t);
    };
  }, []);

  return sig;
}
