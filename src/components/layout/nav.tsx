"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Top navigation. Fixed, translucent on scroll, accent word-mark.
 * Anchor links hop to the in-page act sections on the homepage.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[var(--nav-h)]",
        "transition-[background,border-color,backdrop-filter] duration-700",
        "flex items-center",
        scrolled
          ? "border-b border-[var(--color-border)] bg-obsidian/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-shell flex w-full items-center justify-between">
        <Link
          href="/"
          className="font-display flex items-baseline gap-2 text-[1.65rem] leading-none tracking-tight"
          aria-label={`${site.name} — home`}
        >
          <span>Profuzion</span>
          <span className="text-fusion">.</span>
          <span className="font-mono text-smoke hidden text-[0.7rem] tracking-[0.25em] uppercase sm:inline">
            Est. {site.foundingYear}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-smoke hover:text-vellum eyebrow transition-colors duration-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contact"
          className={cn(
            "group relative hidden items-center gap-3 md:inline-flex",
            "rounded-full border border-[var(--color-border)] px-5 py-2.5",
            "eyebrow hover:border-fusion transition-colors duration-300",
          )}
        >
          <span className="bg-fusion h-1.5 w-1.5 rounded-full shadow-[0_0_12px_var(--color-fusion)]" />
          <span>Start a project</span>
        </a>
      </div>
    </header>
  );
}
