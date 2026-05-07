"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";
export type CaseStudyNavProps = {
  homeBase?: string;
  variantLabel?: string;
};

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

/**
 * v2 case-study nav — same visual language as ProfuzionNav; hash links
 * resolve to /v2 sections instead of in-page anchors.
 */
export function CaseStudyNav({
  homeBase = "/v2",
  variantLabel: _variantLabel = "v2 · case",
}: CaseStudyNavProps) {
  const menuId = useId();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const links = useMemo(
    () =>
      [
        { href: homeBase, label: "Concept home" },
        { href: `${homeBase}#websites`, label: "Selected work" },
        { href: `${homeBase}#contact`, label: "Contact" },
      ] as const,
    [homeBase],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          <a
            href={homeBase}
            data-cursor
            data-cursor-label="home"
            className="group inline-flex min-w-0 shrink items-center gap-3"
            aria-label="Profuzion — home"
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

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-cursor
                  data-cursor-label={l.label.toLowerCase()}
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 transition-colors duration-200"
                  style={{
                    fontFamily: "var(--text-sans)",
                    fontSize: 13.5,
                    fontWeight: 500,
                    letterSpacing: "-0.005em",
                    color: "var(--contrast-muted)",
                  }}
                >
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.2)" }}
                  />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={`${homeBase}#contact`}
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
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      data-cursor
                      data-cursor-label={l.label.toLowerCase()}
                      onClick={closeMenu}
                      className="flex items-center gap-3 rounded-xl px-3 py-3.5 transition-colors duration-200"
                      style={{
                        fontFamily: "var(--text-sans)",
                        fontSize: "1.05rem",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        color: "var(--contrast)",
                        background: "var(--base-light)",
                      }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div
              className="shrink-0 border-t p-6"
              style={{ borderColor: "var(--border)" }}
            >
              <a
                href={`${homeBase}#contact`}
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
