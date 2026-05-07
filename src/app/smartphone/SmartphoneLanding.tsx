"use client";

/**
 * NEXUS Ø — Scroll-driven smartphone landing.
 *
 * Motion: GSAP + ScrollTrigger + SplitText · Smooth scroll: root Lenis (`SmoothScrollProvider`).
 * Resize: GSAP context rebuild via useGSAP(revertOnUpdate) when viewport settles.
 */

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, type CSSProperties } from "react";
import {
  ACCENT,
  CHAPTERS,
  chapterVisualGradient,
  GALLERY,
  HERO_DISPLAY_WALLPAPER,
  MARQUEE_ITEMS,
  NAV,
  SMARTPHONE_ABOUT_SRC,
  SMARTPHONE_PLACEHOLDERS,
} from "./_lib/constants";
import { useCoarsePointer, usePrefersReducedMotion, useViewportSignature } from "./_lib/hooks";
import { useGSAP, gsap, SplitText, ScrollTrigger } from "@/lib/gsap";

export default function SmartphoneLanding() {
  const root = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorDot = useRef<HTMLDivElement>(null);
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null);
  const velocityRef = useRef(0);

  const reduced = usePrefersReducedMotion();
  const coarsePointer = useCoarsePointer();
  const showCursor = !reduced && !coarsePointer;

  const viewportSig = useViewportSignature();

  useGSAP(
    () => {
      const el = curtain.current;
      if (!el) return;
      if (reduced) {
        gsap.set(el, { autoAlpha: 0, pointerEvents: "none" });
        return;
      }
      gsap.set(el, { autoAlpha: 1 });
      gsap.to(el, {
        yPercent: -101,
        duration: 1.25,
        ease: "expo.out",
        delay: 0.08,
        onComplete: () => {
          gsap.set(el, { pointerEvents: "none", visibility: "hidden" });
        },
      });
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  useEffect(() => {
    if (!showCursor || !cursor.current || !cursorDot.current) return;

    const outer = cursor.current;
    const inner = cursorDot.current;

    const move = (e: MouseEvent) => {
      gsap.to(outer, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.55,
        ease: "expo.out",
        overwrite: true,
      });
    };

    const enterMag = () => {
      gsap.to(inner, { scale: 2.35, opacity: 0.92, duration: 0.45, ease: "expo.out" });
      gsap.to(outer, {
        borderColor: ACCENT,
        duration: 0.45,
        ease: "expo.out",
      });
    };

    const leaveMag = () => {
      gsap.to(inner, { scale: 1, opacity: 1, duration: 0.45, ease: "expo.out" });
      gsap.to(outer, {
        borderColor: "rgba(244,244,244,0.35)",
        duration: 0.45,
        ease: "expo.out",
      });
    };

    window.addEventListener("mousemove", move, { passive: true });

    const magnetic = root.current?.querySelectorAll("[data-magnetic]");
    magnetic?.forEach((node) => {
      node.addEventListener("mouseenter", enterMag);
      node.addEventListener("mouseleave", leaveMag);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      magnetic?.forEach((node) => {
        node.removeEventListener("mouseenter", enterMag);
        node.removeEventListener("mouseleave", leaveMag);
      });
    };
  }, [showCursor, viewportSig]);

  useGSAP(
    () => {
      const wrap = root.current;
      if (!wrap || reduced) return;

      const revertLater: Array<() => void> = [];

      const ctx = gsap.context(() => {
        void document.fonts.ready.then(() => ScrollTrigger.refresh());

        const obs = ScrollTrigger.observe({
          target: window,
          type: "wheel,touch,scroll,pointer",
          onChangeY: (self) => {
            velocityRef.current = self.velocityY;
          },
        });
        revertLater.push(() => obs.kill());

        const marqueeInner = wrap.querySelector<HTMLElement>("[data-marquee-track]");
        if (marqueeInner) {
          marqueeTweenRef.current = gsap.fromTo(
            marqueeInner,
            { xPercent: 0 },
            {
              xPercent: -50,
              duration: 42,
              ease: "none",
              repeat: -1,
            },
          );

          const marqueeTickerFn = () => {
            const tw = marqueeTweenRef.current;
            if (!tw) return;
            const v = velocityRef.current;
            const boost = gsap.utils.clamp(0.35, 4.2, 1 + Math.abs(v) / 420);
            tw.timeScale(v >= 0 ? boost : -boost);
          };
          gsap.ticker.add(marqueeTickerFn);
          revertLater.push(() => {
            gsap.ticker.remove(marqueeTickerFn);
          });
        }

        const hero = wrap.querySelector<HTMLElement>("[data-hero]");
        const heroHeadline = wrap.querySelector<HTMLElement>("[data-hero-headline]");
        const heroSub = wrap.querySelector<HTMLElement>("[data-hero-sub]");
        const heroGlow = wrap.querySelector<HTMLElement>("[data-hero-glow]");
        const heroGrain = wrap.querySelector<HTMLElement>("[data-hero-parallax-grain]");
        const heroOrb = wrap.querySelector<HTMLElement>("[data-hero-parallax-orb]");

        let heroSplit: SplitText | undefined;
        let subSplit: SplitText | undefined;

        if (heroHeadline) {
          heroSplit = new SplitText(heroHeadline, {
            type: "chars",
            charsClass: "phone-split-char",
          });
          gsap.set(heroSplit.chars, {
            clipPath: "inset(0 0 100% 0)",
            willChange: "clip-path",
          });
        }
        if (heroSub) {
          subSplit = new SplitText(heroSub, {
            type: "words",
            mask: "words",
          });
          gsap.set(subSplit.words, { yPercent: 110, opacity: 0.35 });
        }

        revertLater.push(() => {
          heroSplit?.revert();
          subSplit?.revert();
        });

        if (hero && heroSplit?.chars?.length) {
          const scrub = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "+=130%",
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
            },
          });

          scrub.to(
            heroSplit.chars,
            {
              clipPath: "inset(0 0 0% 0)",
              stagger: { each: 0.025 },
              duration: 1,
              ease: "none",
            },
            0,
          );

          if (subSplit?.words?.length) {
            scrub.to(
              subSplit.words,
              {
                yPercent: 0,
                opacity: 1,
                stagger: { each: 0.04 },
                duration: 0.85,
              },
              0.15,
            );
          }

          scrub.fromTo(
            "[data-hero-product]",
            { y: 48, rotateZ: -4, autoAlpha: 0 },
            { y: 0, rotateZ: 0, autoAlpha: 1, duration: 1 },
            0.05,
          );
        }

        if (heroGlow && hero) {
          gsap.fromTo(
            heroGlow,
            { yPercent: -8 },
            {
              yPercent: 14,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
        if (heroOrb && hero) {
          gsap.fromTo(
            heroOrb,
            { yPercent: 6 },
            {
              yPercent: -18,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
        if (heroGrain && hero) {
          gsap.to(heroGrain, {
            rotate: 4,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        const seam = wrap.querySelector<HTMLElement>("[data-seam]");
        if (seam) {
          gsap.fromTo(
            seam,
            { yPercent: -12 },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: seam,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }

        const hSection = wrap.querySelector<HTMLElement>("[data-horizontal]");
        const hTrack = wrap.querySelector<HTMLElement>("[data-horizontal-track]");
        if (hSection && hTrack) {
          const getScroll = () => Math.max(hTrack.scrollWidth - window.innerWidth, 0);

          gsap.to(hTrack, {
            x: () => -getScroll(),
            ease: "none",
            scrollTrigger: {
              trigger: hSection,
              pin: true,
              scrub: true,
              start: "top top",
              end: () => "+=" + (getScroll() + window.innerHeight * 0.35),
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        }

        wrap.querySelectorAll<HTMLElement>("[data-clip-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            {
              clipPath: "circle(0% at 50% 62%)",
              scale: 1.06,
              willChange: "clip-path",
            },
            {
              clipPath: "circle(140% at 50% 50%)",
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("[data-clip-scope]") ?? el,
                start: "top 82%",
                end: "top 28%",
                scrub: true,
              },
              onComplete: () => gsap.set(el, { clearProps: "willChange" }),
            },
          );
        });

        wrap.querySelectorAll<HTMLElement>("[data-split-heading]").forEach((heading) => {
          const split = new SplitText(heading, {
            type: "words",
            mask: "words",
          });
          gsap.from(split.words, {
            yPercent: 115,
            rotateX: -14,
            stagger: 0.035,
            duration: 1.05,
            ease: "expo.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
          revertLater.push(() => split.revert());
        });

        const visuals = wrap.querySelectorAll<HTMLElement>("[data-chapter-visual]");
        const panels = wrap.querySelectorAll<HTMLElement>("[data-chapter-panel]");

        const activateChapter = (index: number) => {
          visuals.forEach((node, j) => {
            const idx =
              node.dataset.chapterIndex !== undefined ? Number(node.dataset.chapterIndex) : j;
            const active = idx === index;
            gsap.to(node, {
              autoAlpha: active ? 1 : 0.14,
              scale: active ? 1 : 0.94,
              filter: active ? "blur(0px)" : "blur(6px)",
              duration: 0.65,
              ease: "expo.out",
            });
          });
        };

        panels.forEach((panel, index) => {
          ScrollTrigger.create({
            trigger: panel,
            start: "top center+=12%",
            end: "bottom center-=12%",
            onToggle: ({ isActive }) => {
              if (isActive) activateChapter(index);
            },
          });
        });
        activateChapter(0);

        gsap.from("[data-footer-inner]", {
          y: 36,
          autoAlpha: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: "[data-footer]",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });

        revertLater.push(() => {
          marqueeTweenRef.current?.kill();
          marqueeTweenRef.current = null;
        });
      }, wrap);

      return () => {
        ctx.revert();
        revertLater.forEach((fn) => fn());
      };
    },
    {
      scope: root,
      dependencies: [reduced, viewportSig],
      revertOnUpdate: true,
    },
  );

  const accentStyle = useCallback(
    (): CSSProperties =>
      ({
        color: ACCENT,
      }) as CSSProperties,
    [],
  );

  const gutter = "px-[clamp(1rem,4vw,3rem)]";

  return (
    <div
      ref={root}
      className="grain relative isolate min-h-[100svh] overflow-x-clip [&_.phone-split-char]:inline-block [&_.phone-split-char]:overflow-hidden [&_.phone-split-char]:align-bottom"
    >
      <div
        ref={curtain}
        className="pointer-events-auto fixed inset-0 z-[10001] bg-[#0a0a0a]"
        aria-hidden
      />

      {showCursor ? (
        <div
          ref={cursor}
          className="pointer-events-none fixed top-0 left-0 z-[10000] mix-blend-difference"
          style={{ transform: "translate(-50%, -50%)" }}
          aria-hidden
        >
          <div
            ref={cursorDot}
            className="flex size-11 items-center justify-center rounded-full border border-[rgba(244,244,244,0.35)]"
          >
            <span className="size-1 rounded-full bg-white" />
          </div>
        </div>
      ) : null}

      <a
        href="#hero-main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[10002] focus:m-4 focus:rounded-sm focus:bg-[#00f5c8] focus:px-4 focus:py-2 focus:text-black focus:outline-none"
      >
        Skip to content
      </a>

      <header className="fixed top-0 right-0 left-0 z-50 mix-blend-difference">
        <nav
          className={`flex items-start justify-between pt-8 pb-4 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.28em] uppercase ${gutter}`}
          aria-label="Primary"
        >
          <Link href="/" className="text-neutral-400 hover:text-white" data-magnetic prefetch={false}>
            Close
          </Link>
          <ul className="flex flex-wrap justify-end gap-x-8 gap-y-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <a className="text-neutral-300 hover:text-white" href={item.href} data-magnetic>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="hero-main">
        <section
          id="hero"
          data-hero
          aria-labelledby="hero-title"
          className={`relative flex min-h-[100svh] flex-col justify-end pb-24 pt-32 md:pb-36 ${gutter}`}
        >
          <div
            data-hero-glow
            className="pointer-events-none absolute inset-0 opacity-[0.55]"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 70% 18%, rgba(0,245,200,0.22), transparent 62%), radial-gradient(circle at 12% 88%, rgba(0,245,200,0.07), transparent 45%)",
            }}
          />
          <div
            data-hero-parallax-orb
            className="pointer-events-none absolute -top-[18%] right-[-8%] size-[min(58vw,520px)] rounded-full opacity-[0.12]"
            aria-hidden
            style={{
              background: `radial-gradient(circle at 35% 35%, ${ACCENT}, transparent 68%)`,
              filter: "blur(12px)",
            }}
          />
          <div
            data-hero-parallax-grain
            className="pointer-events-none absolute inset-0 opacity-[0.034]"
            aria-hidden
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
              mixBlendMode: "overlay",
            }}
          />

          <div className="relative z-10 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.42fr)] lg:items-end">
            <div className="space-y-10">
              <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.38em] text-neutral-500 uppercase">
                Flagship · Gen&nbsp;IV · Fabricated fiction
              </p>

              <h1
                id="hero-title"
                data-hero-headline
                className="font-[family-name:var(--font-display)] text-[clamp(4rem,12vw,14rem)] leading-[0.88] font-normal tracking-[-0.04em]"
                style={accentStyle()}
              >
                NEXUS&nbsp;Ø
              </h1>

              <p
                data-hero-sub
                className="max-w-xl font-[family-name:var(--font-manrope)] text-lg leading-relaxed font-light text-neutral-400 md:text-xl [&_em]:italic [&_em]:text-neutral-200"
              >
                The smartphone as <em>edited hardware</em> — ceramic cool to the cheek,
                whisper-quiet shutters, light that behaves like ink on rag paper.
              </p>

              <div className="flex flex-wrap gap-6">
                <a
                  href="#contact"
                  data-magnetic
                  className="inline-flex items-center gap-3 border border-neutral-700 px-8 py-4 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.22em] text-neutral-100 uppercase transition-colors hover:border-[var(--phone-accent)] hover:text-[var(--phone-accent)]"
                >
                  Reserve briefing
                </a>
                <a
                  href="#work"
                  data-magnetic
                  className="text-neutral-500 underline-offset-8 hover:text-neutral-200 hover:underline"
                >
                  Scroll the dossier
                </a>
              </div>
            </div>

            <figure
              data-hero-product
              className="relative mx-auto lg:mx-0 lg:translate-x-[10%] lg:-rotate-2"
            >
              <div
                className="pointer-events-none absolute inset-[-8%] rounded-[3rem] bg-[radial-gradient(ellipse_68%_52%_at_50%_68%,rgba(0,245,200,0.14),transparent_72%)]"
                aria-hidden
              />

              <div className="relative mx-auto w-[min(74vw,292px)] [aspect-ratio:9/19.5]">
                <div
                  className="absolute inset-0 flex flex-col rounded-[2.85rem] bg-gradient-to-b from-neutral-600 via-neutral-900 to-neutral-950 p-[10px] shadow-[0_36px_100px_-24px_rgba(0,0,0,0.9),0_0_80px_-28px_rgba(0,245,200,0.14)] ring-1 ring-white/[0.08]"
                >
                  <div className="relative min-h-0 flex-1 overflow-hidden rounded-[2.15rem] bg-black">
                    <Image
                      src={HERO_DISPLAY_WALLPAPER.src}
                      alt="High-definition landscape photograph shown on the smartphone display"
                      fill
                      className="object-cover object-[center_42%]"
                      sizes="(max-width: 1024px) 90vw, 400px"
                      quality={95}
                      priority
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent opacity-60"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.07]"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute top-2.5 left-1/2 z-10 h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_1px_2px_rgba(255,255,255,0.06)] ring-1 ring-white/10"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>

              <figcaption className="mx-auto mt-5 max-w-[min(74vw,292px)] px-1 text-center font-[family-name:var(--font-mono)] text-[8px] leading-snug tracking-[0.08em] text-neutral-600 normal-case">
                Display wallpaper:{" "}
                <a
                  href={HERO_DISPLAY_WALLPAPER.creditUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-400 underline decoration-neutral-700 underline-offset-2 hover:text-[var(--phone-accent)]"
                >
                  {HERO_DISPLAY_WALLPAPER.creditName}
                </a>
              </figcaption>
            </figure>
          </div>
        </section>

        <div
          data-seam
          aria-hidden
          className={`relative z-[1] -mt-[clamp(3rem,12vh,9rem)] mb-[clamp(4rem,14vh,10rem)] ${gutter}`}
        >
          <div className="flex items-end justify-between gap-8 border-b border-neutral-800 pb-10">
            <p
              data-split-heading
              className="max-w-md font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-neutral-300 [perspective:1200px]"
            >
              Silence reads as <span className="text-[var(--phone-accent)] italic">luxury</span> when glass meets graphite dusk.
            </p>
            <p className="hidden font-[family-name:var(--font-mono)] text-[10px] tracking-[0.32em] text-neutral-600 uppercase md:block">
              SCROLL&nbsp;002
            </p>
          </div>
        </div>

        <section aria-label="Continuous narrative strip" className="border-y border-neutral-900 bg-black/40">
          <div className="overflow-hidden py-6">
            <div
              data-marquee-track
              className="flex w-max font-[family-name:var(--font-mono)] text-[11px] tracking-[0.42em] text-neutral-500 uppercase"
            >
              {[0, 1].map((dup) => (
                <div key={dup} className="flex shrink-0 items-center px-10 whitespace-nowrap">
                  {MARQUEE_ITEMS.map((line, i) => (
                    <span key={`${dup}-${i}`}>{line}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="work"
          data-horizontal
          aria-labelledby="work-title"
          className="relative flex h-[100svh] flex-col justify-center overflow-hidden bg-[#070707]"
        >
          <div className={`pointer-events-none absolute top-16 left-0 z-10 ${gutter}`}>
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.38em] text-neutral-600 uppercase">
              Archive · still life
            </p>
            <h2
              id="work-title"
              data-split-heading
              className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,6rem)] tracking-[-0.03em] text-neutral-100 [perspective:1200px]"
            >
              Surface tension studies
            </h2>
          </div>

          <div
            data-horizontal-track
            className={`relative mt-[clamp(8rem,22vh,14rem)] flex h-[52vh] min-h-[280px] w-max items-stretch gap-6 md:gap-10 ${gutter}`}
          >
            {GALLERY.map((item, idx) => (
              <article
                key={item.label}
                data-clip-scope
                className="relative aspect-[16/10] w-[85vw] shrink-0 overflow-hidden rounded-sm border border-neutral-800 md:w-[52vw]"
              >
                <div data-clip-reveal className="absolute inset-0">
                  <Image
                    src={SMARTPHONE_PLACEHOLDERS[idx]}
                    alt={`Gallery still: ${item.label} — smartphone placeholder photo`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 85vw, 52vw"
                    loading="lazy"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                    style={{
                      background: `linear-gradient(${item.hue}, rgba(10,10,10,0.35)), radial-gradient(circle at 22% 88%, rgba(0,245,200,0.35), transparent 55%)`,
                    }}
                    aria-hidden
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-8 mix-blend-difference">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.4em] text-white uppercase opacity-70">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="font-[family-name:var(--font-display)] text-4xl text-white md:text-5xl">{item.label}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" aria-labelledby="about-title" className={`py-[clamp(5rem,14vw,10rem)] ${gutter}`}>
          <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.75fr)] lg:gap-24">
            <div className="space-y-10 lg:translate-y-[8vh]">
              <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.38em] text-neutral-600 uppercase">
                About · editorial lens
              </p>
              <h2
                id="about-title"
                data-split-heading
                className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,8vw,7rem)] leading-[0.94] tracking-[-0.035em] [perspective:1200px]"
              >
                We traded spectacle for <span className="italic text-[var(--phone-accent)]">tension</span>.
              </h2>
              <div className="max-w-xl space-y-6 font-[family-name:var(--font-manrope)] text-lg leading-relaxed text-neutral-400">
                <p>
                  Every seam on Ø is misaligned on purpose — optical rhythm beats mechanical symmetry when your thumb stays on the glass all day.
                </p>
                <p className="text-neutral-500">
                  Not a SKU. Not crowdfunding vapor. This route exists as a motion/layout artifact — proof that flagship storytelling can stay lightweight on the wire.
                </p>
              </div>
            </div>

            <figure
              data-clip-scope
              className="relative aspect-[4/5] w-full max-w-xl justify-self-end overflow-hidden rounded-sm border border-neutral-800 lg:-translate-x-[6%]"
            >
              <div data-clip-reveal className="absolute inset-0">
                <Image
                  src={SMARTPHONE_ABOUT_SRC}
                  alt="Editorial smartphone still life — placeholder from Unsplash"
                  fill
                  className="object-cover object-[center_40%]"
                  sizes="(max-width: 1024px) 100vw, 36rem"
                  loading="lazy"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
                  aria-hidden
                />
              </div>
              <figcaption className="sr-only">About section placeholder image — handset photography.</figcaption>
            </figure>
          </div>
        </section>

        <section
          id="process"
          aria-labelledby="process-title"
          className={`border-t border-neutral-900 bg-[#060606] py-[clamp(5rem,12vw,9rem)] ${gutter}`}
        >
          <h2 id="process-title" className="sr-only">
            Process chapters
          </h2>
          <p
            data-split-heading
            className="mb-[clamp(3rem,10vw,6rem)] max-w-[22ch] font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.02em] text-neutral-200 [perspective:1200px]"
          >
            Chaptered fabrication notes.
          </p>

          <div className="grid gap-16 lg:grid-cols-2 lg:gap-8">
            <div className="space-y-[clamp(4rem,14vh,9rem)] pb-24 lg:pb-48">
              {CHAPTERS.map((ch, chapterIndex) => (
                <article
                  key={ch.k}
                  data-chapter-panel
                  className="max-w-lg border-l border-neutral-800 pl-10"
                  aria-labelledby={`ch-${ch.k}-title`}
                >
                  <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.42em] text-[var(--phone-accent)] uppercase">
                    {ch.k}
                  </p>
                  <h3
                    id={`ch-${ch.k}-title`}
                    data-split-heading
                    className="mt-6 font-[family-name:var(--font-display)] text-4xl tracking-[-0.02em] text-neutral-100 [perspective:1200px] md:text-5xl"
                  >
                    {ch.title}
                  </h3>
                  <figure
                    data-clip-scope
                    className="relative mt-8 aspect-[16/11] w-full overflow-hidden rounded-sm border border-neutral-800 lg:hidden"
                  >
                    <div data-clip-reveal className="absolute inset-0">
                      <Image
                        src={SMARTPHONE_PLACEHOLDERS[chapterIndex]}
                        alt={`Chapter ${ch.k} visual — smartphone placeholder`}
                        fill
                        className="object-cover object-center"
                        sizes="100vw"
                        loading="lazy"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 opacity-70 mix-blend-soft-light"
                        style={{ background: chapterVisualGradient(chapterIndex) }}
                        aria-hidden
                      />
                    </div>
                    <figcaption className="sr-only">Chapter {ch.k} visual plate</figcaption>
                  </figure>
                  <p className="mt-5 font-[family-name:var(--font-manrope)] text-lg leading-relaxed text-neutral-500">
                    {ch.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="relative hidden min-h-[140vh] lg:block">
              <div className="sticky top-[clamp(5rem,14vh,8rem)] flex h-[calc(100svh-clamp(5rem,14vh,8rem))] items-center">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm border border-neutral-800">
                  {CHAPTERS.map((ch, i) => (
                    <div
                      key={ch.k}
                      data-chapter-visual
                      data-chapter-index={i}
                      className="absolute inset-0"
                      style={{
                        opacity: i === 0 ? 1 : 0.14,
                      }}
                    >
                      <Image
                        src={SMARTPHONE_PLACEHOLDERS[i]}
                        alt=""
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 28rem"
                        loading="lazy"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-black/40"
                        style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.55)" }}
                        aria-hidden
                      />
                      <div
                        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-soft-light"
                        style={{ background: chapterVisualGradient(i) }}
                        aria-hidden
                      />
                    </div>
                  ))}
                  <span className="sr-only">Chapter visuals synchronized with scroll position.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-title" className={`py-[clamp(5rem,14vw,10rem)] ${gutter}`}>
          <div className="grid gap-16 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.38em] text-neutral-600 uppercase">
                Contact · routing desk
              </p>
              <h2
                id="contact-title"
                data-split-heading
                className="mt-8 font-[family-name:var(--font-display)] text-[clamp(3rem,9vw,8rem)] tracking-[-0.04em] [perspective:1200px]"
              >
                Request the deck.
              </h2>
            </div>

            <div className="flex flex-col gap-10 lg:translate-y-6">
              <p className="max-w-md font-[family-name:var(--font-manrope)] text-lg text-neutral-400">
                Tell us where Ø should dock next — investor narrative, keynote staging, or microsite rollout.
              </p>
              <a
                href="mailto:hello@example.com?subject=NEXUS%20Ø%20brief"
                data-magnetic
                className="inline-flex w-fit items-center gap-4 border border-neutral-700 px-10 py-5 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.26em] text-neutral-100 uppercase transition-colors hover:border-[var(--phone-accent)] hover:text-[var(--phone-accent)]"
              >
                hello@example.com
              </a>
              <form className="grid gap-6 border border-neutral-900 bg-neutral-950/60 p-10 backdrop-blur-sm" aria-label="Lead capture (visual demo only)" noValidate>
                <div className="grid gap-2">
                  <label htmlFor="brief-name" className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.28em] text-neutral-600 uppercase">
                    Name
                  </label>
                  <input
                    id="brief-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Ada Monroe"
                    className="border border-neutral-800 bg-black/60 px-4 py-3 font-[family-name:var(--font-manrope)] text-neutral-100 outline-none ring-0 placeholder:text-neutral-600 focus:border-[var(--phone-accent)]"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="brief-email" className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.28em] text-neutral-600 uppercase">
                    Email
                  </label>
                  <input
                    id="brief-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@studio.com"
                    className="border border-neutral-800 bg-black/60 px-4 py-3 font-[family-name:var(--font-manrope)] text-neutral-100 outline-none placeholder:text-neutral-600 focus:border-[var(--phone-accent)]"
                  />
                </div>
                <button
                  type="button"
                  data-magnetic
                  className="mt-2 inline-flex justify-center border border-[var(--phone-accent)] bg-[var(--phone-accent)] px-8 py-4 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.26em] text-black uppercase hover:bg-transparent hover:text-[var(--phone-accent)]"
                >
                  Send (demo UI)
                </button>
              </form>
            </div>
          </div>
        </section>

        <footer data-footer className={`border-t border-neutral-900 pb-16 pt-12 ${gutter}`}>
          <div data-footer-inner className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-[family-name:var(--font-display)] text-4xl tracking-[-0.02em] text-neutral-300">
                NEXUS&nbsp;Ø
              </p>
              <p className="mt-4 max-w-sm font-[family-name:var(--font-mono)] text-[10px] leading-relaxed tracking-[0.22em] text-neutral-600 uppercase">
                Concept route · GSAP ScrollTrigger lab · Lenis synced via root provider ·{" "}
                {new Date().getFullYear()}
              </p>
              <p className="mt-4 max-w-md font-[family-name:var(--font-mono)] text-[9px] leading-relaxed font-normal tracking-[0.12em] text-neutral-700 normal-case">
                Placeholder photography:{" "}
                <a
                  href="https://unsplash.com/license"
                  className="text-neutral-500 underline decoration-neutral-700 underline-offset-2 hover:text-[var(--phone-accent)]"
                  target="_blank"
                  rel="noreferrer"
                >
                  Unsplash
                </a>{" "}
                (free commercial use).
              </p>
            </div>
            <nav aria-label="Footer" className="flex flex-wrap gap-x-10 gap-y-4 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.28em] text-neutral-500 uppercase">
              <a href="#hero" className="hover:text-[var(--phone-accent)]">
                Index
              </a>
              <a href="#work" className="hover:text-[var(--phone-accent)]">
                Work
              </a>
              <Link href="/" prefetch={false} className="hover:text-[var(--phone-accent)]">
                Exit
              </Link>
            </nav>
          </div>
        </footer>
      </main>
    </div>
  );
}
