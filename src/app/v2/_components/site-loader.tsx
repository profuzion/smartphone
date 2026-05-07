"use client";

import type { CSSProperties } from "react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { studio } from "../_lib/site";

/** Total choreography: mark reveal → orbit & pulse → wordmark unveil → hold → exit */
const DURATION_MS = 3800;
const EXIT_MS = 760;
const LOADER_TAGLINE_ACCENT = "Mastered.";

/** Horizontal lime glints — L→R and R→L, staggered like film leader / scope traces */
const LOADER_H_LINES: readonly {
  top: string;
  delay: string;
  duration: string;
  dir: "lr" | "rl";
}[] = [
  { top: "10%", delay: "0s", duration: "2.35s", dir: "lr" },
  { top: "22%", delay: "0.5s", duration: "2.65s", dir: "rl" },
  { top: "34%", delay: "0.1s", duration: "2.5s", dir: "rl" },
  { top: "62%", delay: "0.25s", duration: "2.45s", dir: "rl" },
  { top: "76%", delay: "0.6s", duration: "2.7s", dir: "lr" },
  { top: "88%", delay: "0.4s", duration: "2.55s", dir: "rl" },
] as const;

/**
 * Full-viewport intro: **PFS logomark** (`pfs-loader-mark.svg` · `PFS_Logomark_v2`)
 * with orbital bloom, then **word lock-up** (`pfs-loader-wordmark.svg` · light v2)
 * unveils beneath
 * for a vertical lockup before the site appears.
 *
 * `prefers-reduced-motion`: short fade, static lockup, no spin/blur choreography.
 */
export function ProfuzionSiteLoader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const doneRef = useRef(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setExiting(true);
    exitTimer.current = setTimeout(() => {
      setVisible(false);
    }, reduceMotion ? 180 : EXIT_MS);
  }, [reduceMotion]);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onMq = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    if (!visible || doneRef.current) return;
    if (reduceMotion) {
      const t = window.setTimeout(finish, 420);
      return () => clearTimeout(t);
    }
    const t = setTimeout(finish, DURATION_MS);
    return () => clearTimeout(t);
  }, [visible, reduceMotion, finish]);

  useEffect(() => {
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pz-site-loader"
      style={{
        ...({
          "--pz-loader-ms": `${DURATION_MS}ms`,
        } as CSSProperties),
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "grid",
        placeItems: "center",
        background: "var(--base-ultra-dark, #050507)",
        pointerEvents: exiting ? "none" : "auto",
        opacity: exiting ? 0 : 1,
        transition: `opacity ${exiting ? (reduceMotion ? 0.2 : 0.72) : 0.6}s var(--ease-out, cubic-bezier(0.2, 0.8, 0.2, 1))`,
        overflow: "hidden",
      }}
      role="status"
      aria-live="polite"
      aria-label="Profuzion Studio loading"
    >
      <div
        aria-hidden
        className="pz-site-loader__mist"
        style={{
          position: "absolute",
          inset: "-20%",
          background: `
            radial-gradient(ellipse 55% 45% at 50% 38%, rgba(182, 255, 56, 0.09) 0%, transparent 55%),
            radial-gradient(ellipse 80% 50% at 30% 70%, rgba(182, 255, 56, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse 90% 80% at 50% 100%, #0a0a0b 0%, #050507 45%, #020203 100%)
          `,
        }}
      />
      <div
        aria-hidden
        className="pz-site-loader__dots pz-site-loader__dots--lime"
      />
      <div
        aria-hidden
        className="pz-site-loader__dots pz-site-loader__dots--bone"
      />
      <div
        aria-hidden
        className="pz-site-loader__vignette"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 0%, rgba(0,0,0,0.5) 100%)",
          pointerEvents: "none",
        }}
      />
      <div aria-hidden className="pz-site-loader__lines">
        {LOADER_H_LINES.map((row, i) => (
          <span
            key={i}
            className="pz-site-loader__hline"
            data-dir={row.dir}
            style={
              reduceMotion
                ? {
                    top: row.top,
                    opacity: 0.19,
                    left: `${(i * 7 + 5) % 40}%`,
                    width: "32%",
                    maxWidth: 240,
                  }
                : {
                    top: row.top,
                    animation: `${row.dir === "lr" ? "pzLoaderHSliceLR" : "pzLoaderHSliceRL"} ${row.duration} cubic-bezier(0.2, 0.8, 0.2, 1) infinite`,
                    animationDelay: row.delay,
                  }
            }
          />
        ))}
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--border, rgba(255,255,255,0.1)) 20%, var(--border) 50%, var(--border) 80%, transparent)",
          opacity: 0.85,
        }}
      />

      <div
        className="pz-site-loader__content"
        style={{
          position: "relative",
          zIndex: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "min(28rem, 92vw)",
        }}
      >
        <div className="pz-site-loader__lockup">
          <div className="pz-site-loader__sigil-stage">
            <div className="pz-site-loader__sigil-glow" aria-hidden />
            {!reduceMotion && (
              <div className="pz-site-loader__orbit" aria-hidden />
            )}
            <img
              className="pz-site-loader__mark-img"
              src="/pfs-loader-mark.svg"
              alt=""
              width={380}
              height={380}
              decoding="async"
              draggable={false}
            />
          </div>

          <img
            className="pz-site-loader__word-img"
            src="/pfs-loader-wordmark.svg"
            alt=""
            width={928}
            height={94}
            decoding="async"
            draggable={false}
            aria-hidden
          />

          <p className="pz-site-loader__tagline pfz-eyebrow pfz-eyebrow--bare">
            {studio.positioning.endsWith(LOADER_TAGLINE_ACCENT) ? (
              <>
                {studio.positioning
                  .slice(0, -LOADER_TAGLINE_ACCENT.length)
                  .trimEnd()}{" "}
                <span className="pz-site-loader__tagline-accent">
                  {LOADER_TAGLINE_ACCENT}
                </span>
              </>
            ) : (
              studio.positioning
            )}
          </p>
        </div>
      </div>

      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "var(--border)",
          zIndex: 5,
        }}
      >
        <div
          className="pz-site-loader__bar"
          style={{
            height: "100%",
            width: "100%",
            background:
              "linear-gradient(90deg, var(--primary) 0%, #c8ff5c 100%)",
            boxShadow: "0 0 20px var(--primary-glow)",
            transform: reduceMotion ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            animation: reduceMotion
              ? "none"
              : `pzLoaderBar ${DURATION_MS}ms var(--ease-out, cubic-bezier(0.2, 0.8, 0.2, 1)) forwards`,
          }}
        />
      </div>
    </div>
  );
}
