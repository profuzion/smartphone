import { site } from "@/content/site";

/**
 * Profuzion · v3 — "The Letter".
 *
 * The most minimal version of the homepage I can make:
 *   • One column. Cream paper. Ink type. Instrument Serif throughout.
 *   • No imagery. No buttons with fills. No scroll choreography.
 *   • The italic IS the accent — there is no second color.
 *
 * Server-rendered. No client JavaScript on this page (only the hairline
 * draw + a single fade-in are CSS @keyframes).
 *
 * Structure (single page, top to bottom):
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │  PROFUZION · WINKLER, MANITOBA      NOW BOOKING · SUMMER 26  │
 *   │                                                              │
 *   │  Brand & website                                             │
 *   │  design for owners                                           │
 *   │  who want to                                                 │
 *   │  stand out.            ← italic                              │
 *   │                                                              │
 *   │  [lede]                                                      │
 *   │  ─────                                                       │
 *   │  We work with         [list — four verticals]                │
 *   │  ─────                                                       │
 *   │  Recent work          [list — four cases]                    │
 *   │  ─────                                                       │
 *   │  How it works         [single paragraph]                     │
 *   │  ─────                                                       │
 *   │  A note from the founder  [first-person · signed]            │
 *   │  ─────                                                       │
 *   │  Write me             [contact lines + single CTA]           │
 *   │  ─────                                                       │
 *   │  © 2026 · R6W 0P4 · since 1999 · v3                          │
 *   └──────────────────────────────────────────────────────────────┘
 */

const verticals = [
  { label: "Industrial", desc: "plant managers, distributors, manufacturers" },
  { label: "Contractors", desc: "trades who live and die on callbacks" },
  { label: "Food", desc: "producers who need trust before the first bite" },
  { label: "E-commerce", desc: "sellers who'd rather not sound like a help desk" },
] as const;

const cases = [
  {
    name: "AlumaReel",
    year: "2025",
    desc: "an engineered brand for an engineered product",
  },
  {
    name: "Brovek",
    year: "2024",
    desc: "a brand built to wear work boots",
  },
  {
    name: "Nature's Knoll",
    year: "2026",
    desc: "a century of local memory, set in editorial type",
  },
  {
    name: "Keystone & Co.",
    year: "2026",
    desc: "a law firm that writes the way it advises",
  },
] as const;

export default function ProfuzionV3() {
  return (
    <div className="profuzion-v3 relative min-h-[100svh]">
      <main className="mx-auto w-full max-w-[68rem] px-6 sm:px-10 lg:px-16">
        {/* ───────── Mast ───────── */}
        <header className="flex flex-wrap items-baseline justify-between gap-4 pt-10 pb-24 sm:pt-14 lg:pt-20 lg:pb-40">
          <p className="v-meta v-fadein">
            Profuzion · Winkler, Manitoba
          </p>
          <p className="v-meta v-fadein v-fadein--delay-1">
            now booking · summer 2026
          </p>
        </header>

        {/* ───────── Headline ───────── */}
        <section
          aria-labelledby="v3-headline"
          className="pb-16 sm:pb-24 lg:pb-32"
        >
          <h1
            id="v3-headline"
            className="v-display v-fadein v-fadein--delay-1"
            style={{ maxWidth: "16ch" }}
          >
            Brand &amp; website
            <br />
            design for owners
            <br />
            who want to{" "}
            <span className="v-italic">stand&nbsp;out</span>
            <span aria-hidden>.</span>
          </h1>

          <p
            className="v-lede v-fadein v-fadein--delay-2 mt-12 sm:mt-16"
            style={{ maxWidth: "44ch" }}
          >
            Profuzion is a small design studio in Winkler, Manitoba. We&apos;ve
            spent twenty-seven years making brands and websites for industrial,
            construction, food, and e-commerce owners across the prairies.
            Quiet, exact work — built to outlive the launch.
          </p>
        </section>

        {/* ───────── We work with ───────── */}
        <Rule />
        <section
          aria-labelledby="v3-clients"
          className="py-16 sm:py-20 lg:py-28"
        >
          <h2 id="v3-clients" className="v-h2 mb-10 sm:mb-12">
            We work with
          </h2>
          <dl className="v-list">
            {verticals.map((v) => (
              <div key={v.label} className="v-list__row">
                <dt className="v-list__label">{v.label}</dt>
                <dd className="v-list__desc">{v.desc}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ───────── Recent work ───────── */}
        <Rule />
        <section
          aria-labelledby="v3-work"
          className="py-16 sm:py-20 lg:py-28"
        >
          <h2 id="v3-work" className="v-h2 mb-10 sm:mb-12">
            Recent work
          </h2>
          <dl className="v-cases">
            {cases.map((c) => (
              <div key={c.name} className="v-cases__row">
                <dt className="v-cases__name">{c.name}</dt>
                <dd className="v-cases__year">{c.year}</dd>
                <dd className="v-cases__desc">{c.desc}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ───────── How it works ───────── */}
        <Rule />
        <section
          aria-labelledby="v3-how"
          className="py-16 sm:py-20 lg:py-28"
        >
          <h2 id="v3-how" className="v-h2 mb-8 sm:mb-10">
            How it works
          </h2>
          <p className="v-body" style={{ maxWidth: "56ch" }}>
            Five fixed phases — <span className="v-italic">Listen</span>,{" "}
            <span className="v-italic">Frame</span>,{" "}
            <span className="v-italic">Design</span>,{" "}
            <span className="v-italic">Ship</span>,{" "}
            <span className="v-italic">Tend</span> — on a scoped quote. You
            see the studio brief in week one, the first design rounds in week
            three, and a launched site between week six and eight. Most owners
            stay on a small monthly retainer afterward; some don&apos;t. Either
            way, the work is yours.
          </p>
        </section>

        {/* ───────── A note from the founder ───────── */}
        <Rule />
        <section
          aria-labelledby="v3-founder"
          className="py-16 sm:py-20 lg:py-28"
        >
          <h2 id="v3-founder" className="v-h2 mb-8 sm:mb-10">
            A note from the founder
          </h2>
          <div
            className="flex flex-col gap-6 sm:gap-7"
            style={{ maxWidth: "56ch" }}
          >
            <p className="v-body">
              I started Profuzion at a single desk in 1999, not to follow
              design trends but to help owners who have to be understood the
              first time. Lawyers, agents, shop floors, front desks — the work
              has always been about clarity, not volume.
            </p>
            <p className="v-body">
              The stack changes every few years. The promise doesn&apos;t — a
              brand and site you can hand to a new hire without a translation
              layer. When you hire the studio, you work with me from the first
              call to launch.
            </p>
            <p className="v-sig mt-2">
              — {site.founder.name}, Winkler, Manitoba
            </p>
          </div>
        </section>

        {/* ───────── Write me ───────── */}
        <Rule />
        <section
          id="contact"
          aria-labelledby="v3-contact"
          className="py-16 sm:py-20 lg:py-28"
        >
          <h2 id="v3-contact" className="v-h2 mb-8 sm:mb-10">
            Write me
          </h2>
          <ul
            className="flex flex-col gap-3 sm:gap-4"
            style={{ maxWidth: "44ch" }}
          >
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="v-body v-link"
              >
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.contact.phone}`}
                className="v-body v-link"
              >
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <span className="v-body" style={{ color: "var(--v-stone)" }}>
                Mon–Thu, 9–5 CT  ·  Friday, by appointment
              </span>
            </li>
          </ul>

          <a
            href={`mailto:${site.contact.email}?subject=A%2030-minute%20call`}
            className="v-cta mt-12 inline-flex sm:mt-16"
          >
            Book a 30-minute call
            <span className="v-cta__arrow" aria-hidden>
              →
            </span>
          </a>
        </section>

        {/* ───────── Colophon ───────── */}
        <Rule />
        <footer className="py-10 sm:py-14">
          <p className="v-meta">
            © {new Date().getFullYear()} {site.name} · R6W 0P4 · Winkler,
            Manitoba · since {site.foundingYear} · v3
          </p>
        </footer>
      </main>
    </div>
  );
}

function Rule() {
  return (
    <div aria-hidden className="v-rule" />
  );
}
