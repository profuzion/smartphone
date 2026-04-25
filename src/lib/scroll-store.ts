import { create } from "zustand";

/**
 * Canonical scroll state shared between Lenis, the 3D scene, and any
 * overlay component that wants to react to position.
 *
 * `progress`  — 0..1 across the full document.
 * `act`       — 0..7 integer, the current act (snaps at section breaks).
 * `actFloat`  — continuous 0..7, used by shaders for smooth morphing.
 */

export type ScrollState = {
  progress: number;
  act: number;
  actFloat: number;
  setProgress: (p: number) => void;
};

export const TOTAL_ACTS = 8;

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  act: 0,
  actFloat: 0,
  setProgress: (p) => {
    const clamped = Math.max(0, Math.min(1, p));
    const actFloat = clamped * (TOTAL_ACTS - 1);
    const act = Math.min(TOTAL_ACTS - 1, Math.floor(actFloat + 0.0001));
    set({ progress: clamped, actFloat, act });
  },
}));
