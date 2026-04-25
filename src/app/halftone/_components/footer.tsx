"use client";

import { useEffect, useState } from "react";
import { studio } from "../_lib/site";

/**
 * Halftone — footer.
 *
 * Three rows:
 *   1. Oversized mono "HALFTONE" + cities legal
 *   2. Three column grid: navigate · contact · stack
 *   3. Live UTC timestamp + commit hash + signal pulse
 */

function useUtcClock() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const t = d.toISOString().replace("T", " ").slice(0, 19);
      setNow(`${t} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function HalftoneFooter() {
  const utc = useUtcClock();

  return (
    <footer
      className="relative z-10 border-t"
      style={{ borderColor: "var(--ht-seam)", background: "var(--ht-void)" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
        {/* Row 1 — wordmark */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            className="ht-display"
            style={{
              fontSize: "clamp(3rem, 14vw, 12rem)",
              lineHeight: 0.85,
              color: "var(--ht-bone)",
            }}
          >
            halftone<span style={{ color: "var(--ht-signal)" }}>.</span>
          </h2>
          <p
            className="ht-eyebrow max-w-xs"
            style={{ color: "var(--ht-dust)" }}
          >
            Toronto · Berlin
            <br />
            studio of {studio.meta.teamSize}
            <br />
            available {studio.meta.availability}
          </p>
        </div>

        {/* Row 2 — columns */}
        <div className="ht-rule mt-12 mb-10" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <FooterCol
            label="navigate"
            items={[
              { label: "//cases", href: "#cases" },
              { label: "//pipeline", href: "#process" },
              { label: "//stack", href: "#stack" },
              { label: "//engagements", href: "#engagements" },
              { label: "//signal", href: "#signal" },
            ]}
          />
          <FooterCol
            label="contact"
            items={[
              { label: studio.contact.email, href: `mailto:${studio.contact.email}` },
              { label: "book a probe →", href: "#initialize" },
              { label: "press kit", href: "#" },
              { label: "general inquiry", href: "#" },
            ]}
          />
          <FooterCol
            label="elsewhere"
            items={[
              { label: "github", href: "#" },
              { label: "x", href: "#" },
              { label: "linkedin", href: "#" },
              { label: "rss", href: "#" },
            ]}
          />
        </div>

        {/* Row 3 — build status */}
        <div className="ht-rule mt-12 mb-6" />

        <div
          className="flex flex-col gap-3 text-[11px] sm:flex-row sm:items-center sm:justify-between"
          style={{ fontFamily: "var(--ht-mono)", color: "var(--ht-dust-low)" }}
        >
          <span>
            © halftone studio · concept demo · all surfaces fictional
          </span>
          <span className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: "var(--ht-signal)",
                boxShadow: "0 0 8px 1px var(--ht-signal-glow)",
                animation: "ht-pulse 2.4s var(--ht-eo) infinite",
              }}
            />
            build {studio.build.commit} · {studio.build.env} · {utc || "—"}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="ht-eyebrow mb-4">{label}</p>
      <ul className="flex flex-col gap-2">
        {items.map((it) => (
          <li key={it.label}>
            <a
              href={it.href}
              data-cursor
              className="group inline-flex items-center gap-2 transition-colors duration-150"
              style={{
                fontFamily: "var(--ht-mono)",
                fontSize: 13,
                color: "var(--ht-bone-mute)",
              }}
            >
              <span
                aria-hidden
                className="inline-block h-px w-3 transition-all duration-200 group-hover:w-6"
                style={{ background: "var(--ht-seam-2)" }}
              />
              <span className="group-hover:text-[var(--ht-bone)]">
                {it.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
