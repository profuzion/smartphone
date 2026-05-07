"use client";

import { useEffect, useState } from "react";
import { studio } from "../_lib/site";

/**
 * Profuzion · v2 — footer.
 *
 * Three rows:
 *   1. Oversized "Profuzion." wordmark with sage period accent
 *      and meta column (location · since 1999 · availability)
 *   2. Three-column nav / contact / elsewhere
 *   3. Bottom strip — © year, Winkler MB, made-on-the-prairie
 */

type FooterProps = {
  /** Use `/v2` on nested routes so section jumps resolve from case-study pages. */
  linkBase?: string;
};

export function ProfuzionFooter({ linkBase = "" }: FooterProps) {
  const h = (id: string) => `${linkBase}#${id}`;
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer
      className="pfz-section pfz-section--ink relative isolate overflow-hidden w-full"
      style={{ background: "var(--base-ultra-dark)", color: "var(--contrast)" }}
    >
      <div className="mx-auto max-w-[1480px] px-6 pt-24 pb-10 lg:px-10 lg:pt-32 lg:pb-12">
        {/* Wordmark + meta */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <h2
            className="pfz-display"
            style={{
              fontSize: "clamp(4rem, 14vw, 13rem)",
              lineHeight: 0.86,
              fontWeight: 500,
              letterSpacing: "-0.05em",
              color: "var(--contrast)",
            }}
          >
            {studio.name}
            <span style={{ color: "var(--primary)" }}>.</span>
          </h2>

          <ul
            className="flex flex-col gap-2 text-right"
            style={{
              fontFamily: "var(--text-mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--contrast-muted)",
            }}
          >
            <li>{studio.location}</li>
            <li>since {studio.founded}</li>
            <li style={{ color: "var(--primary)" }}>{studio.availability}</li>
          </ul>
        </div>

        {/* Rule */}
        <div className="my-12 pfz-rule pfz-rule--ink lg:my-16" />

        {/* Three-column nav */}
        <div className="grid gap-10 sm:grid-cols-3 lg:gap-16">
          <FooterCol
            label="Navigate"
            items={[
              { href: h("industries"), label: "Industries" },
              { href: h("about"), label: "About" },
              { href: h("branding"), label: "Branding" },
              { href: h("websites"), label: "Websites" },
              { href: h("process"), label: "Process" },
              { href: h("engagements"), label: "Pricing" },
            ]}
          />
          <FooterCol
            label="Contact"
            items={[
              {
                href: "mailto:hello@profuzionstudio.com",
                label: "hello@profuzionstudio.com",
              },
              { href: "tel:+12043626171", label: "204.362.6171" },
              { href: h("contact"), label: "Book a call →" },
            ]}
          />
          <FooterCol
            label="Studio"
            items={[
              { href: "/", label: "Profuzion v1 (live)" },
              { href: "https://instagram.com/profuzion", label: "Instagram" },
              { href: "https://linkedin.com/in/lowellklassen", label: "LinkedIn" },
              { href: "https://github.com/profuzion", label: "GitHub" },
            ]}
          />
        </div>

        {/* Bottom strip */}
        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t pt-6 sm:flex-row sm:items-center"
          style={{ borderColor: "var(--border-on-dark)" }}>
          <p
            style={{
              fontFamily: "var(--text-mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--contrast-muted)",
            }}
          >
            © {now.getFullYear()} Profuzion Studio · R6W 0P4 · Winkler, Manitoba
          </p>
          <p
            style={{
              fontFamily: "var(--text-mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--contrast-muted)",
            }}
          >
            Concept · v2 · {now.toISOString().slice(0, 10)}
          </p>
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
  items: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <p
        className="mb-4"
        style={{
          fontFamily: "var(--text-mono)",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--contrast-muted)",
        }}
      >
        {label}
      </p>
      <ul className="flex flex-col gap-3">
        {items.map((it) => (
          <li key={it.href}>
            <a
              href={it.href}
              data-cursor
              data-cursor-label={label.toLowerCase()}
              className="group inline-flex items-center gap-2 transition-colors duration-200"
              style={{
                fontFamily: "var(--text-sans)",
                fontSize: 14.5,
                color: "var(--contrast)",
              }}
            >
              <span
                aria-hidden
                className="inline-block h-px w-3 transition-all duration-200 group-hover:w-5"
                style={{ background: "var(--primary)" }}
              />
              <span className="transition-colors duration-200 group-hover:text-[color:var(--primary)]">
                {it.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
