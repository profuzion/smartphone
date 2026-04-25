"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  getContactFormActionUrl,
  getContactFormIframeUrl,
} from "../_lib/contact-form-config";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const contactIframeSrc = getContactFormIframeUrl();
const contactActionUrl = getContactFormActionUrl();

/**
 * Profuzion · v2 — Contact CTA (§8).
 *
 * Soft contact moment. No terminal aesthetic — this is the bookend
 * where intake fields connect to the Next mock, a WP iframe (Bricks / Pro Forms),
 * or an optional public POST URL. Friendly, calm, confident.
 *
 * Layout
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │ // start a conversation                                      │
 *   │ Ready when you are.                                          │
 *   │                                                              │
 *   │ Direct: hello@profuzionstudio.com                            │
 *   │ Phone:  204.362.6171                                         │
 *   │                                                              │
 *   │ Or pass us your details — we'll write back within a day:     │
 *   │ ┌──────────────┐ ┌──────────────┐                            │
 *   │ │ Your name    │ │ Email        │                            │
 *   │ └──────────────┘ └──────────────┘                            │
 *   │ ┌────────────────────────────────────────────────────────┐   │
 *   │ │ Your business · location                               │   │
 *   │ └────────────────────────────────────────────────────────┘   │
 *   │ ┌────────────────────────────────────────────────────────┐   │
 *   │ │ What's the project? (optional)                         │   │
 *   │ │                                                        │   │
 *   │ └────────────────────────────────────────────────────────┘   │
 *   │ [ Send →     ]   < replies within a business day >           │
 *   └──────────────────────────────────────────────────────────────┘
 */

export function SectionCTA() {
  const root = useRef<HTMLElement | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(false);
  const useWpEmbed = Boolean(contactIframeSrc);

  useGSAP(
    () => {
      gsap.from("[data-cta-el]", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "expo.out",
        stagger: 0.06,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root },
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPostError(false);

    if (contactActionUrl) {
      setSubmitting(true);
      try {
        const form = e.currentTarget;
        const body = new FormData(form);
        const res = await fetch(contactActionUrl, {
          method: "POST",
          body,
          mode: "cors",
        });
        if (res.ok) setSubmitted(true);
        else setPostError(true);
      } catch {
        setPostError(true);
      } finally {
        setSubmitting(false);
      }
      return;
    }

    setSubmitting(true);
    // Simulated submit when no POST URL and no WP iframe (local dev / demo).
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 800);
  };

  return (
    <section
      ref={root}
      id="contact"
      className="relative isolate"
      style={{ background: "var(--p-paper)" }}
    >
      <div className="p-rule" />
      <div className="mx-auto max-w-[1480px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* LEFT — pitch */}
          <div>
            <p className="p-eyebrow p-eyebrow--amber" data-cta-el>
              // start a conversation
            </p>
            <h2
              className="p-display p-display--lg mt-3"
              data-cta-el
              style={{ maxWidth: "12ch" }}
            >
              Ready when{" "}
              <span className="p-italic" style={{ color: "var(--p-amber)" }}>
                you
              </span>{" "}
              are.
            </h2>
            <p className="p-body mt-6 max-w-md" data-cta-el>
              The fastest way to start is a 30-minute call. No pitch deck. We
              ask three questions, you ask three, we both leave with a clear
              next step.
            </p>

            <ul className="mt-10 flex flex-col gap-4" data-cta-el>
              <ContactRow label="Direct" value="hello@profuzionstudio.com" href="mailto:hello@profuzionstudio.com" />
              <ContactRow label="Phone" value="204.362.6171" href="tel:+12043626171" />
              <ContactRow label="Studio" value="Winkler, Manitoba · R6W 0P4" />
              <ContactRow
                label="Hours"
                value="Mon–Thu, 9–5 CT · Friday, by appointment"
              />
            </ul>

            <div
              className="mt-12 flex items-center gap-3"
              data-cta-el
            >
              <span
                aria-hidden
                className="inline-block h-2 w-2 animate-pulse rounded-full"
                style={{
                  background: "var(--p-amber)",
                  boxShadow: "0 0 14px 1px var(--p-amber-glow)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--p-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--p-amber)",
                }}
              >
                now booking summer 2026
              </span>
            </div>
          </div>

          {/* RIGHT — form panel */}
          <div data-cta-el>
            <div
              className="p-card relative p-8 lg:p-10"
              style={{
                background: "var(--p-paper-2)",
                borderColor: "var(--p-rule-strong)",
              }}
            >
              <div
                className="mb-6 flex items-center justify-between border-b pb-4"
                style={{ borderColor: "var(--p-rule)" }}
              >
                <span
                  style={{
                    fontFamily: "var(--p-mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--p-stone-mid)",
                  }}
                >
                  → new project intake
                </span>
                <span
                  style={{
                    fontFamily: "var(--p-mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--p-amber)",
                  }}
                >
                  reply ≤ 1 day
                </span>
              </div>

              {useWpEmbed ? (
                <WordPressFormEmbed src={contactIframeSrc!} />
              ) : submitted ? (
                <SuccessState />
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field name="name" label="Your name" placeholder="Lowell" required />
                    <Field
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="you@firm.ca"
                      required
                    />
                  </div>
                  <Field
                    name="business"
                    label="Business · location"
                    placeholder="Keystone & Co. · Winkler MB"
                  />
                  <Field
                    name="project"
                    label="What's the project? (optional)"
                    placeholder="Rebrand + new firm site. Need to launch by August."
                    multiline
                  />

                  {/* Honeypot (ignored by most WP handlers; remove if a POST endpoint rejects it) */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      width: 1,
                      height: 1,
                      overflow: "hidden",
                    }}
                  >
                    <input name="company" tabIndex={-1} autoComplete="off" />
                  </div>

                  {postError && (
                    <p
                      className="text-sm"
                      style={{ color: "var(--p-amber-2)" }}
                      role="alert"
                    >
                      Couldn&apos;t send that just now. Please email
                      {" "}
                      <a
                        className="underline"
                        style={{ color: "var(--p-ink)" }}
                        href="mailto:hello@profuzionstudio.com"
                      >
                        hello@profuzionstudio.com
                      </a>
                      .
                    </p>
                  )}

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                    <p
                      style={{
                        fontFamily: "var(--p-mono)",
                        fontSize: 11,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--p-stone-mid)",
                      }}
                    >
                      {contactActionUrl
                        ? "submits to your configured endpoint"
                        : "no automated reply · founder writes back"}
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="p-btn"
                      data-cursor
                      data-cursor-label={submitting ? "sending" : "send"}
                      style={{
                        opacity: submitting ? 0.65 : 1,
                        background: "var(--p-amber)",
                        borderColor: "var(--p-amber)",
                      }}
                    >
                      {submitting ? "Sending…" : "Send"}
                      {!submitting && <span className="p-arrow">→</span>}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Helpers ───────────────────── */

function WordPressFormEmbed({ src }: { src: string }) {
  return (
    <div
      className="overflow-hidden rounded-md"
      style={{
        border: "1px solid var(--p-rule-strong)",
        background: "var(--p-paper)",
      }}
    >
      <iframe
        title="Contact — new project intake (WordPress form)"
        src={src}
        className="block w-full border-0"
        style={{
          minHeight: 520,
          height: "min(560px, 62vh)",
          background: "var(--p-paper)",
        }}
        loading="lazy"
        sandbox="allow-forms allow-scripts allow-same-origin"
      />
    </div>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const text = (
    <>
      <span
        style={{
          fontFamily: "var(--p-mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--p-stone-mid)",
        }}
      >
        {label}
      </span>
      <span
        className={href ? "transition-colors duration-200 group-hover:text-[color:var(--p-amber)]" : ""}
        style={{
          fontFamily: "var(--p-sans)",
          fontSize: 15,
          fontWeight: 500,
          color: "var(--p-ink)",
          letterSpacing: "-0.005em",
        }}
      >
        {value}
      </span>
    </>
  );
  return (
    <li>
      {href ? (
        <a
          href={href}
          data-cursor
          data-cursor-label={label.toLowerCase()}
          className="group flex items-baseline justify-between border-t pt-3 transition-colors duration-200"
          style={{ borderColor: "var(--p-rule)" }}
        >
          {text}
        </a>
      ) : (
        <div
          className="flex items-baseline justify-between border-t pt-3"
          style={{ borderColor: "var(--p-rule)" }}
        >
          {text}
        </div>
      )}
    </li>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required,
  multiline,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span
        style={{
          fontFamily: "var(--p-mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--p-stone-mid)",
        }}
      >
        {label} {required && <span style={{ color: "var(--p-amber)" }}>*</span>}
      </span>
      {multiline ? (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={4}
          className="resize-none rounded-md border bg-transparent px-3.5 py-3 transition-colors duration-200 focus:outline-none"
          style={{
            fontFamily: "var(--p-sans)",
            fontSize: 15,
            color: "var(--p-ink)",
            borderColor: "var(--p-rule-strong)",
            background: "var(--p-paper-2)",
          }}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className="rounded-md border bg-transparent px-3.5 py-3 transition-colors duration-200 focus:outline-none"
          style={{
            fontFamily: "var(--p-sans)",
            fontSize: 15,
            color: "var(--p-ink)",
            borderColor: "var(--p-rule-strong)",
            background: "var(--p-paper-2)",
          }}
        />
      )}
    </label>
  );
}

function SuccessState() {
  return (
    <div className="flex flex-col items-start gap-4 py-8">
      <span
        aria-hidden
        className="grid h-12 w-12 place-items-center rounded-full"
        style={{
          background: "var(--p-amber)",
          color: "var(--p-on-signal)",
          fontSize: 18,
        }}
      >
        ✓
      </span>
      <h3
        className="p-display"
        style={{
          fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)",
          fontWeight: 500,
          letterSpacing: "-0.025em",
          lineHeight: 1.05,
          color: "var(--p-ink)",
        }}
      >
        Got it. We&apos;ll write back within a day.
      </h3>
      <p
        className="p-body"
        style={{ maxWidth: "44ch" }}
      >
        Thanks for the note. The founder reads every intake personally — expect
        a real reply, not an automation, with a couple of dates for a 30-minute
        call.
      </p>
    </div>
  );
}
