"use client";

import { useCallback, useEffect, useId, useState } from "react";
/**
 * Profuzion · v2 — sticky nav.
 *
 * Three regions (desktop, lg+):
 *   • Left: horizontal wordmark
 *   • Center: section pills (active state in amber)
 *   • Right: "Book a call" CTA (pill, chartreuse on hover)
 *
 * Below lg: hamburger opens a full-height sheet (backdrop + list + CTA). The bar
 * stays above the overlay so the icon always toggles open/close.
 *
 * Dark glass bar fades in when scrolled past the hero (or when the menu is open).
 */

const LINKS = [
  { id: "industries", label: "Industries" },
  { id: "about", label: "About" },
  { id: "branding", label: "Branding" },
  { id: "websites", label: "Websites" },
  { id: "process", label: "Process" },
  { id: "engagements", label: "Pricing" },
  { id: "contact", label: "Contact" },
] as const;

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-6" aria-hidden>
      <span
        className="absolute left-0 right-0 top-0 h-0.5 rounded-full transition-transform duration-200"
        style={{
          background: "var(--contrast)",
          transform: open ? "translateY(9px) rotate(45deg)" : "none",
        }}
      />
      <span
        className="absolute left-0 right-0 top-2 h-0.5 rounded-full transition-opacity duration-200"
        style={{
          background: "var(--contrast)",
          opacity: open ? 0 : 1,
        }}
      />
      <span
        className="absolute left-0 right-0 top-4 h-0.5 rounded-full transition-transform duration-200"
        style={{
          background: "var(--contrast)",
          transform: open ? "translateY(-9px) rotate(-45deg)" : "none",
        }}
      />
    </span>
  );
}

export function ProfuzionNav() {
  const menuId = useId();
  const [active, setActive] = useState<string>("industries");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean,
    ) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.2, 0.5, 1],
      },
    );

    sections.forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navScrim = menuOpen || scrolled;

  return (
    <>
    <nav
      className={`fixed inset-x-0 top-0 transition-all duration-300 ${
        menuOpen ? "z-[100]" : "z-50"
      }`}
      style={{
        backdropFilter: navScrim ? "blur(14px) saturate(120%)" : "none",
        WebkitBackdropFilter: navScrim ? "blur(14px) saturate(120%)" : "none",
        background: menuOpen
          ? "rgba(10, 10, 12, 0.98)"
          : scrolled
            ? "rgba(10, 10, 12, 0.82)"
            : "transparent",
        borderBottom: navScrim
          ? "1px solid var(--border)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1480px] items-center justify-between px-6 lg:h-20 lg:px-10">
        {/* Lockup */}
        <a
          href="#top"
          data-cursor
          data-cursor-label="top"
          className="group inline-flex min-w-0 shrink items-center gap-3"
          aria-label="Profuzion — top"
        >
          <img
            src="/pfs-logo-horizontal-light-v2.svg"
            alt=""
            width={240}
            height={31}
            decoding="async"
            className="h-[1.5rem] w-auto max-w-[min(220px,58vw)] object-contain object-left -ml-[7px] sm:h-[1.625rem] lg:h-[1.75rem] lg:max-w-[min(260px,36vw)]"
            aria-hidden
          />
        </a>

        {/* Center pills */}
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  data-cursor
                  data-cursor-label={l.label.toLowerCase()}
                  className="relative inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 transition-colors duration-200"
                  style={{
                    fontFamily: "var(--text-sans)",
                    fontSize: 13.5,
                    fontWeight: 500,
                    letterSpacing: "-0.005em",
                    color: isActive ? "var(--contrast)" : "var(--contrast-muted)",
                  }}
                >
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full transition-all duration-200"
                    style={{
                      background: isActive
                        ? "var(--primary)"
                        : "rgba(255,255,255,0.2)",
                      boxShadow: isActive
                        ? "0 0 8px 1px var(--primary-glow)"
                        : "none",
                    }}
                  />
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA — desktop; mobile lives in the sheet */}
        <a
          href="#contact"
          className="btn--secondary hidden lg:inline-flex"
          data-cursor
          data-cursor-label="book"
        >
          Book a call
          <span className="pfz-btn-arrow">→</span>
        </a>

        <button
          type="button"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors duration-200 lg:hidden"
          style={{
            borderColor: "var(--border-strong)",
            color: "var(--contrast)",
            background: "var(--base-light)",
          }}
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>
    </nav>

    {menuOpen && (
      <>
        <div
          className="fixed inset-0 z-40 cursor-pointer bg-black/50 backdrop-blur-[2px] lg:hidden"
          aria-hidden
          onClick={closeMenu}
        />
        <div
          id={menuId}
          className="fixed bottom-0 left-0 right-0 top-16 z-[60] flex max-h-[calc(100dvh-4rem)] flex-col overflow-hidden lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          style={{
            background: "rgba(5, 5, 7, 0.98)",
            borderTop: "1px solid var(--border)",
            boxShadow: "0 -20px 60px -20px rgba(0,0,0,0.5)",
          }}
        >
          <nav
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-4"
            aria-label="Page sections"
          >
            <ul className="flex flex-col gap-1">
              {LINKS.map((l) => {
                const isActive = active === l.id;
                return (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      data-cursor
                      data-cursor-label={l.label.toLowerCase()}
                      onClick={closeMenu}
                      className="flex items-center gap-3 rounded-xl px-3 py-3.5 transition-colors duration-200"
                      style={{
                        fontFamily: "var(--text-sans)",
                        fontSize: "1.05rem",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        color: isActive ? "var(--contrast)" : "var(--contrast-muted)",
                        background: isActive
                          ? "var(--base-light)"
                          : "transparent",
                      }}
                    >
                      <span
                        aria-hidden
                        className="inline-block h-2 w-2 shrink-0 rounded-full transition-all duration-200"
                        style={{
                          background: isActive
                            ? "var(--primary)"
                            : "rgba(255,255,255,0.2)",
                          boxShadow: isActive
                            ? "0 0 10px 1px var(--primary-glow)"
                            : "none",
                        }}
                      />
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div
            className="shrink-0 border-t p-6"
            style={{ borderColor: "var(--border)" }}
          >
            <a
              href="#contact"
              className="btn--secondary w-full justify-center"
              data-cursor
              data-cursor-label="book"
              onClick={closeMenu}
            >
              Book a call
              <span className="pfz-btn-arrow">→</span>
            </a>
          </div>
        </div>
      </>
    )}
    </>
  );
}
