"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

/**
 * Centralized GSAP registration. Import `gsap` from this module everywhere
 * so plugins register exactly once.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrollToPlugin);

  // Global defaults — editorial, cinematic feel
  gsap.defaults({
    ease: "expo.out",
    duration: 1.1,
  });

  // ScrollTrigger defaults
  ScrollTrigger.defaults({
    markers: false,
  });
}

export { gsap, ScrollTrigger, SplitText, ScrollToPlugin, useGSAP };
