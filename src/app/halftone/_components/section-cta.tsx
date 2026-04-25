"use client";

import { useEffect, useRef, useState } from "react";
import { studio } from "../_lib/site";

/**
 * Halftone — Initialize CTA (§7).
 *
 * A centred terminal panel boots out a fake `./initialize-project`
 * sequence, then fades in a contact form inline. Submitting types out
 * a completion line (`> sent. ▌`) — the form does not actually post.
 *
 * The boot is gated by an IntersectionObserver so the animation
 * triggers when the section enters view, not on every component mount.
 */

const BOOT_LINES = [
  { prompt: "$", text: "./initialize-project --target halftone" },
  { prompt: ">", text: "probing repo... ok" },
  { prompt: ">", text: "checking design language... ok" },
  { prompt: ">", text: "compiling discovery brief... ok" },
  { prompt: ">", text: "scheduling probe ▌" },
];

const CHAR_DELAY = 14; // ms per char
const LINE_GAP = 220; // ms between lines

export function SectionCta() {
  const root = useRef<HTMLElement | null>(null);
  const [shouldBoot, setShouldBoot] = useState(false);
  const [bootProgress, setBootProgress] = useState<{
    line: number;
    chars: number;
  }>({ line: 0, chars: 0 });
  const [formReady, setFormReady] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Observe section entry to start the boot sequence once.
  useEffect(() => {
    if (!root.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldBoot(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.25 },
    );
    io.observe(root.current);
    return () => io.disconnect();
  }, []);

  // Drive the boot type-out.
  useEffect(() => {
    if (!shouldBoot) return;
    let cancelled = false;

    const run = async () => {
      for (let li = 0; li < BOOT_LINES.length; li++) {
        const line = BOOT_LINES[li];
        for (let ci = 0; ci <= line.text.length; ci++) {
          if (cancelled) return;
          setBootProgress({ line: li, chars: ci });
          await new Promise((r) => setTimeout(r, CHAR_DELAY));
        }
        await new Promise((r) => setTimeout(r, LINE_GAP));
      }
      if (!cancelled) {
        setBootProgress({ line: BOOT_LINES.length, chars: 0 });
        setFormReady(true);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [shouldBoot]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      ref={root}
      id="initialize"
      className="relative isolate"
      style={{ background: "var(--ht-ink)" }}
    >
      <div className="ht-grid--fine pointer-events-none absolute inset-0 opacity-50" />
      {/* Top + bottom amber-pink glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(182,255,56,0.06), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1100px] px-6 py-28 lg:px-10 lg:py-40">
        {/* Section meta */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="ht-eyebrow ht-eyebrow--signal">// initialize</p>
          <h2 className="ht-display ht-display--lg mt-3">
            two weeks from now,
            <br />
            this could be your first PR.
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl text-[14.5px] leading-relaxed"
            style={{ color: "var(--ht-dust)" }}
          >
            We reply within one business day. No discovery deck, no rituals —
            just a 30-minute call to see if we're the right hands for the
            surface in front of you.
          </p>
        </div>

        {/* Terminal panel */}
        <div
          className="ht-window relative mx-auto max-w-2xl"
          style={{ boxShadow: "0 40px 100px -40px rgba(0,0,0,0.9)" }}
        >
          <div className="ht-window__bar">
            <span className="ht-window__dot ht-window__dot--live" />
            <span className="ht-window__dot" />
            <span className="ht-window__dot" />
            <span className="ht-window__name">~/halftone/initialize.sh</span>
          </div>

          {/* Boot transcript */}
          <div className="px-5 py-5 sm:px-7 sm:py-7">
            <pre
              className="whitespace-pre-wrap"
              style={{
                fontFamily: "var(--ht-mono)",
                fontSize: 13,
                lineHeight: 1.65,
                color: "var(--ht-bone)",
                tabSize: 2,
              }}
            >
              {BOOT_LINES.map((line, li) => {
                if (li > bootProgress.line) return null;
                const text =
                  li === bootProgress.line
                    ? line.text.slice(0, bootProgress.chars)
                    : line.text;
                const stillTyping = li === bootProgress.line && !formReady;
                return (
                  <span key={li} className="block">
                    <span style={{ color: "var(--ht-dust-low)" }}>
                      {line.prompt}
                    </span>{" "}
                    <span
                      style={{
                        color: line.prompt === "$" ? "var(--ht-bone)" : "var(--ht-bone-mute)",
                      }}
                    >
                      {text}
                    </span>
                    {stillTyping && <span className="ht-caret ht-caret--signal" />}
                  </span>
                );
              })}

              {submitted && (
                <span className="block mt-3" style={{ color: "var(--ht-signal)" }}>
                  &gt; sent. expect a reply within 24h.
                  <span className="ht-caret ht-caret--signal" />
                </span>
              )}
            </pre>

            {/* Form — fades in after boot */}
            <form
              onSubmit={handleSubmit}
              className="mt-6 overflow-hidden transition-all duration-700"
              style={{
                opacity: formReady ? 1 : 0,
                maxHeight: formReady && !submitted ? 600 : submitted ? 0 : 0,
                pointerEvents: formReady && !submitted ? "auto" : "none",
              }}
              aria-hidden={!formReady || submitted}
            >
              <div className="ht-rule mt-2 mb-5" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="name" placeholder="ada lovelace" />
                <Field
                  id="email"
                  type="email"
                  label="email"
                  placeholder="ada@halftone.studio"
                />
              </div>
              <Field
                id="surface"
                label="what surface are you shipping?"
                placeholder="we're rebuilding our agent inspector — three screens, type-safe tools..."
                textarea
              />

              {/* Honeypot */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] -top-[9999px]"
              />

              <div className="mt-5 flex items-center justify-between gap-4">
                <span
                  style={{
                    fontFamily: "var(--ht-mono)",
                    fontSize: 11,
                    color: "var(--ht-dust-low)",
                  }}
                >
                  ready · press{" "}
                  <span
                    className="inline-block px-1.5 py-0.5"
                    style={{
                      fontFamily: "var(--ht-mono)",
                      fontSize: 11,
                      border: "1px solid var(--ht-seam)",
                      borderRadius: 3,
                      color: "var(--ht-bone)",
                      background: "var(--ht-panel)",
                    }}
                  >
                    ↩
                  </span>{" "}
                  to send
                </span>
                <button
                  type="submit"
                  data-cursor
                  data-cursor-label="send"
                  className="ht-btn"
                >
                  send probe
                  <span className="ht-arrow">→</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Direct contact fallback */}
        <p
          className="mt-10 text-center text-[12.5px]"
          style={{
            fontFamily: "var(--ht-mono)",
            color: "var(--ht-dust-low)",
          }}
        >
          or skip the boot —{" "}
          <a
            href={`mailto:${studio.contact.email}`}
            data-cursor
            data-cursor-label="email"
            className="border-b transition-colors duration-150 hover:text-[var(--ht-bone)]"
            style={{
              color: "var(--ht-bone-mute)",
              borderColor: "var(--ht-seam-2)",
            }}
          >
            {studio.contact.email}
          </a>
        </p>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
  textarea = false,
}: {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const common = {
    id,
    name: id,
    placeholder,
    required: id !== "company",
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className:
      "w-full bg-transparent px-3 py-2.5 transition-colors duration-200 focus:outline-none",
    style: {
      border: `1px solid ${focused ? "var(--ht-signal)" : "var(--ht-seam)"}`,
      background: "var(--ht-void)",
      fontFamily: "var(--ht-mono)",
      fontSize: 13,
      color: "var(--ht-bone)",
      borderRadius: 3,
    } as const,
  };

  return (
    <label className="block">
      <span
        className="ht-eyebrow mb-2 inline-block"
        style={{ color: focused ? "var(--ht-signal)" : "var(--ht-dust)" }}
      >
        // {label}
      </span>
      {textarea ? (
        <textarea {...common} rows={4} />
      ) : (
        <input {...common} type={type} />
      )}
    </label>
  );
}
