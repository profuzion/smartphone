"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { acts } from "@/content/studio";

type SubmitState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ok"; message: string }
  | { kind: "error"; message: string };

/**
 * Act 8 — Invitation. Contact form + the pledge.
 *
 * Posts to /api/contact (route handler) which validates with Zod and
 * forwards to Resend. A honeypot field (`company`) traps naive bots.
 */
export function Invitation() {
  const act = acts.act8;
  const [state, setState] = useState<SubmitState>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ kind: "loading" });
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !json.ok) {
        setState({
          kind: "error",
          message: json.message ?? "Something went sideways. Try email instead.",
        });
        return;
      }
      setState({
        kind: "ok",
        message: `Got it — ${site.founder.givenName} will reply inside ${site.contact.responseTimeHours} hours.`,
      });
      form.reset();
    } catch {
      setState({
        kind: "error",
        message: "Network issue. Email us directly if that's easier.",
      });
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="act8-h2"
      className="relative py-28 md:py-40"
    >
      <div className="container-shell grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr]">
        {/* Left: invitation copy + pledge */}
        <div className="space-y-8">
          <p className="eyebrow">{act.label} · {act.eyebrow}</p>
          <h2
            id="act8-h2"
            className="headline-display text-[clamp(2.5rem,6vw,5.5rem)]"
          >
            {act.h2}
          </h2>
          <p className="font-display text-vellum text-[clamp(1.8rem,3.6vw,2.8rem)] italic leading-[1] text-balance">
            {act.headline}
          </p>
          <p className="text-bone max-w-xl text-lg leading-relaxed md:text-xl">
            {act.body}
          </p>

          <figure className="border-fusion/40 max-w-lg border-l-2 pl-5">
            <p className="eyebrow text-smoke mb-2">{act.pledgeLabel}</p>
            <blockquote className="text-vellum text-base leading-relaxed md:text-lg">
              {act.pledge}
            </blockquote>
          </figure>

          <ul className="text-bone grid grid-cols-1 gap-3 text-base sm:grid-cols-2">
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="hover:text-vellum transition-colors"
              >
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.contact.phone}`}
                className="hover:text-vellum transition-colors"
              >
                {site.contact.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>

        {/* Right: form */}
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-5 rounded-sm border border-[var(--color-border)] bg-graphite/40 p-6 md:p-8"
        >
          {/* Honeypot — actual humans never fill this */}
          <label className="sr-only" aria-hidden>
            Company
            <input name="company" tabIndex={-1} autoComplete="off" />
          </label>

          <Field name="name" label="Your name" required />
          <Field name="email" label="Email" type="email" required />
          <Field name="business" label="Business name (optional)" />
          <Field name="town" label="Town / city" placeholder="Winkler, Morden, Altona…" />

          <label className="flex flex-col gap-2">
            <span className="eyebrow">How can we help?</span>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="A sentence or two about what you're building."
              className="bg-obsidian text-vellum border-[var(--color-border)] focus:border-fusion resize-none rounded-sm border px-4 py-3 text-base outline-none transition-colors"
            />
          </label>

          <button
            type="submit"
            disabled={state.kind === "loading"}
            className="bg-vellum text-obsidian hover:bg-fusion hover:text-vellum disabled:opacity-60 inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300"
          >
            {state.kind === "loading" ? "Sending…" : "Send it →"}
          </button>

          {state.kind === "ok" && (
            <p className="text-fusion text-sm" role="status">
              {state.message}
            </p>
          )}
          {state.kind === "error" && (
            <p className="text-smoke text-sm" role="alert">
              {state.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field(props: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="eyebrow">{props.label}</span>
      <input
        name={props.name}
        type={props.type ?? "text"}
        required={props.required}
        placeholder={props.placeholder}
        className="bg-obsidian text-vellum border-[var(--color-border)] focus:border-fusion rounded-sm border px-4 py-3 text-base outline-none transition-colors"
      />
    </label>
  );
}
