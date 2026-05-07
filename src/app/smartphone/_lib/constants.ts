/** Smartphone landing — copy & motion constants */

export const ACCENT = "var(--phone-accent, #00f5c8)";

export const NAV = [
  { href: "#hero", label: "Index" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
] as const;

export const CHAPTERS = [
  {
    k: "01",
    title: "Crystalline chassis",
    body: "Ceramic fused to titanium ribbon — edges stay sharp under pocket abrasion.",
  },
  {
    k: "02",
    title: "Silicon choreography",
    body: "Signal paths folded threefold so thermals breathe without swelling the silhouette.",
  },
  {
    k: "03",
    title: "Sensor dusk mode",
    body: "Night stacks fuse spectral plates — noise stays cinematic, not crunchy.",
  },
  {
    k: "04",
    title: "Battery folklore",
    body: "Two-day stamina under editorial brightness curves — measured, not marketed.",
  },
] as const;

export const GALLERY = [
  { label: "Studio sweep", hue: "145deg" },
  { label: "Glass warp", hue: "205deg" },
  { label: "Machined ridge", hue: "265deg" },
  { label: "Nocturnal UI", hue: "325deg" },
] as const;

export const MARQUEE_ITEMS = [
  "Ceramic dusk · spectral ISP · titanium ribbon · graphite vapor chamber · editorial OLED curve · machine-learned shutter hush · two-day folklore stamina · spatial audio weave · ion-forged rails · matte-noir telemetry · dockless continuum · ",
];

/**
 * Four curated Unsplash photos (smartphone / product — editorial lighting).
 * License: https://unsplash.com/license — free for commercial use.
 * Swap photo IDs anytime; keep `w=` ≤ 1920 for sane bandwidth.
 */
export const SMARTPHONE_PLACEHOLDERS = [
  "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1600&q=85",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=85",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=85",
  "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=1600&q=85",
] as const;

/** About column — second shot (multi-device rhythm). */
export const SMARTPHONE_ABOUT_SRC = SMARTPHONE_PLACEHOLDERS[1];

/**
 * Hero — single handset, screen forward. Full photographic wallpaper.
 * Unsplash License: https://unsplash.com/license
 * Source image requested at ~4K decode width + high q; Next/Image still serves modern formats.
 */
export const HERO_DISPLAY_WALLPAPER = {
  src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=4096&q=95",
  creditUrl: "https://unsplash.com/@bzindel",
  creditName: "Bailey Zindel / Unsplash",
} as const;

/** Gradient plate matched to process chapter index (desktop stack + mobile inline). */
export function chapterVisualGradient(index: number): string {
  return `linear-gradient(${115 + index * 36}deg, rgba(0,245,200,0.08), transparent 50%), radial-gradient(circle at ${28 + index * 11}% ${62 - index * 8}%, rgba(255,255,255,0.07), transparent 45%), #090909`;
}
