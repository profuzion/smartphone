"use client";

import type { WebsiteCase } from "../_lib/site";

/**
 * Profuzion · v2 — procedural website mockups.
 *
 * Each `styleKey` renders a distinct, plausible homepage mockup using
 * styled divs (no images). Replace these with real screenshots once
 * the production case studies have art-directed mockups.
 */

export function WebsiteMockup({ kase }: { kase: WebsiteCase }) {
  const { styleKey, accent } = kase;

  return (
    <div className="relative h-full w-full overflow-hidden">
      {styleKey === "editorial-hospitality" && (
        <EditorialHospitality accent={accent} />
      )}
      {styleKey === "manufacturing-product" && (
        <ManufacturingProduct accent={accent} />
      )}
      {styleKey === "law-firm" && <LawFirm accent={accent} />}
      {styleKey === "real-estate" && <RealEstate accent={accent} />}
      {styleKey === "fitness" && <Fitness accent={accent} />}
      {styleKey === "coach" && <Coach accent={accent} />}
    </div>
  );
}

/* ────── Style 1: editorial-hospitality (Nature's Knoll) ────── */

function EditorialHospitality({ accent }: { accent: string }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(ellipse 70% 50% at 50% 30%, #5a7a4a 0%, ${accent} 60%, #182018 100%)
        `,
      }}
    >
      {/* Top nav */}
      <div className="flex items-center justify-between px-7 py-5">
        <div className="flex items-center gap-2">
          <div
            className="grid h-7 w-7 place-items-center rounded-full"
            style={{ background: "rgba(242,238,229,0.9)" }}
          >
            <span style={{ fontFamily: "serif", fontStyle: "italic", color: accent, fontSize: 13 }}>
              N
            </span>
          </div>
          <span style={{ fontFamily: "serif", fontStyle: "italic", color: "rgba(242,238,229,0.95)", fontSize: 14 }}>
            Nature&apos;s Knoll
          </span>
        </div>
        <div className="flex items-center gap-5">
          {["Course", "Membership", "Events", "Story"].map((l) => (
            <span
              key={l}
              style={{
                fontFamily: "serif",
                fontStyle: "italic",
                fontSize: 12,
                color: "rgba(242,238,229,0.7)",
              }}
            >
              {l}
            </span>
          ))}
          <div
            className="rounded-full px-3.5 py-1.5"
            style={{
              background: "rgba(242,238,229,0.95)",
              fontFamily: "sans-serif",
              fontWeight: 500,
              fontSize: 11,
              color: accent,
            }}
          >
            Book a tee →
          </div>
        </div>
      </div>

      {/* Hero copy */}
      <div className="absolute left-7 right-7 top-[28%]">
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(242,238,229,0.7)",
            marginBottom: 14,
          }}
        >
          ↳ a hidden nine-hole course · est. 1928
        </p>
        <div role="presentation" aria-hidden="true"
          style={{
            fontFamily: "serif",
            fontStyle: "italic",
            fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            color: "rgba(242,238,229,0.98)",
            maxWidth: "16ch",
          }}
        >
          The hidden gem you haven&apos;t played yet.
        </div>
        <p
          style={{
            marginTop: 20,
            fontFamily: "sans-serif",
            fontSize: 13,
            lineHeight: 1.5,
            color: "rgba(242,238,229,0.78)",
            maxWidth: "44ch",
          }}
        >
          Nine quiet holes folded into the Pembina Valley, kept by the people who play it. A three-minute film, a flat rate card, and a tee time you can find without a phone tree.
        </p>
      </div>

      {/* Bottom booking handle */}
      <div className="absolute inset-x-7 bottom-7 flex items-center justify-between rounded-full px-5 py-3"
        style={{ background: "rgba(15,14,12,0.55)", backdropFilter: "blur(10px)", border: "1px solid rgba(242,238,229,0.2)" }}
      >
        <span style={{ fontFamily: "sans-serif", fontSize: 11, color: "rgba(242,238,229,0.85)" }}>
          ▸ tee time · sat oct 12 · 2 players
        </span>
        <span style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(242,238,229,0.95)" }}>
          $46 / round · book →
        </span>
      </div>
    </div>
  );
}

/* ────── Style 2: manufacturing-product (AlumaReel) ────── */

function ManufacturingProduct({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0" style={{ background: "#f4efe5" }}>
      {/* Top nav */}
      <div
        className="flex items-center justify-between border-b px-7 py-5"
        style={{ borderColor: "rgba(15,14,12,0.08)" }}
      >
        <div className="flex items-center gap-2">
          <div className="h-5 w-5" style={{ background: accent, borderRadius: 2 }} />
          <span
            style={{
              fontFamily: "sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.04em",
              color: "#0F0E0C",
            }}
          >
            ALUMAREEL
          </span>
        </div>
        <div className="flex items-center gap-5">
          {["Product", "Specs", "Distributors", "Contact"].map((l) => (
            <span
              key={l}
              style={{
                fontFamily: "sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: "#56524a",
              }}
            >
              {l}
            </span>
          ))}
          <div
            className="rounded-sm px-3 py-1.5"
            style={{
              background: accent,
              fontFamily: "sans-serif",
              fontWeight: 500,
              fontSize: 11,
              color: "#f4efe5",
            }}
          >
            Request quote
          </div>
        </div>
      </div>

      {/* Two-column hero */}
      <div className="grid h-[calc(100%-60px)] grid-cols-2">
        <div className="flex flex-col justify-center px-7">
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#9C968B",
              marginBottom: 14,
            }}
          >
            ↳ AR-100 series · made in Manitoba
          </p>
          <div role="presentation" aria-hidden="true"
            style={{
              fontFamily: "sans-serif",
              fontWeight: 600,
              fontSize: "clamp(1.8rem, 3.6vw, 3rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              color: "#0F0E0C",
              maxWidth: "12ch",
            }}
          >
            The aluminum reel rebuilt from the bearing out.
          </div>
          <ul
            className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2"
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#56524a",
            }}
          >
            {["Capacity 12 kg", "Bearing -- ABEC 7", "Frame 6061 T6", "Made in MB"].map((s) => (
              <li key={s}>↳ {s}</li>
            ))}
          </ul>
          <div className="mt-8 flex gap-2">
            <div className="rounded-full px-4 py-2" style={{ background: "#0F0E0C", color: "#f4efe5", fontSize: 11, fontFamily: "sans-serif", fontWeight: 500 }}>
              Spec sheet →
            </div>
            <div className="rounded-full border px-4 py-2" style={{ borderColor: "rgba(15,14,12,0.18)", color: "#0F0E0C", fontSize: 11, fontFamily: "sans-serif", fontWeight: 500 }}>
              Find a distributor
            </div>
          </div>
        </div>
        <div className="relative">
          {/* Product render plate */}
          <div
            className="absolute inset-4 rounded-md"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 50% 50%, #2a2825 0%, #0F0E0C 100%)`,
            }}
          >
            <div
              className="absolute inset-0 m-auto"
              style={{
                width: "60%",
                height: "60%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: `radial-gradient(circle at 30% 30%, #c9c5bd, #56524a 60%, #1c1b18 100%)`,
                borderRadius: "50%",
                boxShadow: `inset 0 0 40px rgba(0,0,0,0.5), 0 30px 60px rgba(0,0,0,0.4)`,
              }}
            />
            <span
              className="absolute right-3 bottom-3"
              style={{
                fontFamily: "monospace",
                fontSize: 9,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(242,238,229,0.45)",
              }}
            >
              CAD-rendered · 48h pipeline
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────── Style 3: law-firm (Keystone & Co.) ────── */

function LawFirm({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0" style={{ background: "#f7f3ea" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-6">
        <span
          style={{
            fontFamily: "serif",
            fontSize: 14,
            letterSpacing: "0.2em",
            color: accent,
          }}
        >
          KEYSTONE &amp; CO.
        </span>
        <div className="flex items-center gap-6">
          {["Practices", "Partners", "Insights", "Contact"].map((l) => (
            <span
              key={l}
              style={{
                fontFamily: "serif",
                fontSize: 12,
                color: "#3a3a3a",
                letterSpacing: "0.04em",
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Centered editorial */}
      <div className="absolute inset-x-0 top-[26%] flex flex-col items-center px-8 text-center">
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 9,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#7a6f5e",
            marginBottom: 20,
          }}
        >
          ESTABLISHED 1991 · WINKLER · PEMBINA VALLEY
        </p>
        <div role="presentation" aria-hidden="true"
          style={{
            fontFamily: "serif",
            fontSize: "clamp(2.2rem, 4.5vw, 4.2rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: accent,
            maxWidth: "16ch",
          }}
        >
          Quiet counsel. Loud results.
        </div>
        <p
          style={{
            marginTop: 18,
            fontFamily: "serif",
            fontStyle: "italic",
            fontSize: 14,
            color: "#5a554a",
            maxWidth: "48ch",
            lineHeight: 1.5,
          }}
        >
          Three decades of family, real estate, and corporate work. We answer your call before noon.
        </p>
        <div className="mt-8 flex gap-3">
          <div
            className="rounded-sm px-5 py-2.5"
            style={{
              background: accent,
              color: "#f7f3ea",
              fontFamily: "serif",
              fontSize: 12,
              letterSpacing: "0.06em",
            }}
          >
            BOOK A CONSULTATION
          </div>
          <div
            className="rounded-sm border px-5 py-2.5"
            style={{
              borderColor: "rgba(28,34,48,0.25)",
              color: accent,
              fontFamily: "serif",
              fontSize: 12,
              letterSpacing: "0.06em",
            }}
          >
            OUR PRACTICES
          </div>
        </div>
      </div>

      {/* Bottom: practice areas */}
      <div className="absolute inset-x-8 bottom-7 grid grid-cols-4 gap-4">
        {["Family", "Real estate", "Corporate", "Estates"].map((p, i) => (
          <div
            key={p}
            className="border-t pt-3"
            style={{ borderColor: "rgba(28,34,48,0.18)" }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 9,
                letterSpacing: "0.18em",
                color: "#7a6f5e",
              }}
            >
              0{i + 1}
            </span>
            <p
              style={{
                marginTop: 4,
                fontFamily: "serif",
                fontSize: 13,
                color: accent,
              }}
            >
              {p}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────── Style 4: real-estate (Pembina Realty) ────── */

function RealEstate({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0" style={{ background: "#f4efe5" }}>
      <div
        className="flex items-center justify-between border-b px-7 py-5"
        style={{ borderColor: "rgba(15,14,12,0.08)" }}
      >
        <span
          style={{
            fontFamily: "sans-serif",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            fontSize: 16,
            color: "#1c1b18",
          }}
        >
          Pembina Realty
        </span>
        <div className="flex items-center gap-5">
          {["Listings", "Agents", "Communities", "Sell"].map((l) => (
            <span key={l} style={{ fontFamily: "sans-serif", fontSize: 12, color: "#56524a", fontWeight: 500 }}>
              {l}
            </span>
          ))}
          <div
            className="rounded-full px-4 py-1.5"
            style={{
              background: accent,
              fontFamily: "sans-serif",
              fontSize: 11,
              fontWeight: 500,
              color: "#f4efe5",
            }}
          >
            Save searches
          </div>
        </div>
      </div>

      <div className="grid h-[calc(100%-60px)] grid-cols-[1.1fr_1fr]">
        {/* Left: editorial pitch */}
        <div className="flex flex-col justify-center px-8">
          <p style={{ fontFamily: "serif", fontStyle: "italic", fontSize: 12, color: "#7a6f5e" }}>
            this week in the valley
          </p>
          <div role="presentation" aria-hidden="true"
            style={{
              marginTop: 8,
              fontFamily: "sans-serif",
              fontWeight: 500,
              fontSize: "clamp(1.8rem, 3.4vw, 2.8rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#1c1b18",
              maxWidth: "16ch",
            }}
          >
            Twelve homes, written by people who&apos;ve walked them.
          </div>
          <div className="mt-8 flex flex-col gap-3">
            {[
              { addr: "204 Mountain Ave", price: "$489k", note: "century home · 4 bd" },
              { addr: "118 7th St N", price: "$362k", note: "starter · garage" },
              { addr: "Lot 14, Bridgeway", price: "$540k", note: "new build · view lot" },
            ].map((row) => (
              <div
                key={row.addr}
                className="flex items-baseline justify-between border-b py-2"
                style={{ borderColor: "rgba(15,14,12,0.08)" }}
              >
                <div>
                  <p style={{ fontFamily: "sans-serif", fontWeight: 500, fontSize: 13.5, color: "#1c1b18" }}>{row.addr}</p>
                  <p style={{ fontFamily: "sans-serif", fontSize: 11.5, color: "#56524a", marginTop: 2 }}>{row.note}</p>
                </div>
                <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 500, color: accent }}>
                  {row.price}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Right: large map plate */}
        <div className="relative m-5 overflow-hidden rounded-md" style={{ background: "#e6dfd0" }}>
          {/* Map streets */}
          <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="none">
            {[40, 90, 150, 220, 300, 360].map((y) => (
              <line key={`h${y}`} x1={0} y1={y} x2={400} y2={y} stroke="#c9bfa9" strokeWidth={1} />
            ))}
            {[60, 120, 200, 280, 340].map((x) => (
              <line key={`v${x}`} x1={x} y1={0} x2={x} y2={400} stroke="#c9bfa9" strokeWidth={1} />
            ))}
            {/* Listing pins */}
            {[
              [80, 60],
              [180, 130],
              [260, 90],
              [320, 220],
              [120, 250],
              [220, 320],
            ].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r={9} fill={accent} opacity={0.18} />
                <circle cx={x} cy={y} r={4} fill={accent} />
              </g>
            ))}
          </svg>
          <div className="absolute left-3 top-3 rounded-full px-3 py-1"
            style={{ background: "rgba(244,239,229,0.92)", fontFamily: "monospace", fontSize: 10, color: "#56524a" }}>
            map · 6 listings
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────── Style 5: fitness (Northpoint) ────── */

function Fitness({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0" style={{ background: "#0F0E0C", color: "#f4efe5" }}>
      <div className="flex items-center justify-between px-7 py-5">
        <span
          style={{
            fontFamily: "sans-serif",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.18em",
            color: "#f4efe5",
          }}
        >
          NORTHPOINT
        </span>
        <div className="flex items-center gap-5">
          {["Schedule", "Coaches", "Class packs", "Story"].map((l) => (
            <span key={l} style={{ fontFamily: "sans-serif", fontSize: 12, color: "rgba(244,239,229,0.7)", fontWeight: 500 }}>
              {l}
            </span>
          ))}
          <div
            className="rounded-full px-4 py-1.5"
            style={{
              background: accent,
              fontFamily: "sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: "#0F0E0C",
            }}
          >
            First class free →
          </div>
        </div>
      </div>

      <div className="absolute inset-x-7 top-[18%]">
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 9,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(244,239,229,0.55)",
            marginBottom: 14,
          }}
        >
          schedule · this week · 38 classes
        </p>
        <div role="presentation" aria-hidden="true"
          style={{
            fontFamily: "sans-serif",
            fontWeight: 600,
            fontSize: "clamp(2.2rem, 4.4vw, 3.8rem)",
            lineHeight: 0.96,
            letterSpacing: "-0.035em",
            color: "#f4efe5",
            maxWidth: "14ch",
          }}
        >
          Train hard. Sound human.
        </div>
      </div>

      {/* Schedule grid */}
      <div className="absolute inset-x-7 bottom-7">
        <div
          className="grid grid-cols-7 gap-1.5 rounded-md p-3"
          style={{ background: "rgba(244,239,229,0.04)", border: "1px solid rgba(244,239,229,0.12)" }}
        >
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d, i) => (
            <div key={d} className="flex flex-col gap-1.5">
              <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.16em", color: "rgba(244,239,229,0.55)", textAlign: "center" }}>
                {d}
              </p>
              {[0, 1, 2].map((j) => {
                const filled = (i + j) % 3 !== 1;
                return (
                  <div
                    key={j}
                    className="rounded-sm px-2 py-1.5"
                    style={{
                      background: filled ? (j === 1 ? accent : "rgba(244,239,229,0.08)") : "transparent",
                      border: filled ? "none" : "1px dashed rgba(244,239,229,0.15)",
                      fontFamily: "sans-serif",
                      fontSize: 10,
                      fontWeight: 500,
                      color: filled ? (j === 1 ? "#0F0E0C" : "#f4efe5") : "rgba(244,239,229,0.3)",
                    }}
                  >
                    {filled ? (j === 0 ? "6:00 strength" : j === 1 ? "12:00 hiit" : "18:30 yoga") : "—"}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ────── Style 6: coach (catch-all) ────── */

function Coach({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0" style={{ background: "#f4efe5" }}>
      <div className="flex items-center justify-between px-7 py-5">
        <span style={{ fontFamily: "serif", fontStyle: "italic", fontSize: 16, color: "#1c1b18" }}>
          Sarah Tate, coaching
        </span>
        <div className="flex items-center gap-5">
          {["Programs", "Story", "Reading", "Apply"].map((l) => (
            <span key={l} style={{ fontFamily: "sans-serif", fontSize: 12, color: "#56524a", fontWeight: 500 }}>{l}</span>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-7 top-[22%]">
        <div role="presentation" aria-hidden="true"
          style={{
            fontFamily: "serif",
            fontStyle: "italic",
            fontSize: "clamp(2.2rem, 4.4vw, 3.8rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.025em",
            color: accent,
            maxWidth: "16ch",
          }}
        >
          A practice that earns the rate.
        </div>
        <p style={{ marginTop: 16, fontFamily: "sans-serif", fontSize: 14, color: "#56524a", maxWidth: "44ch", lineHeight: 1.5 }}>
          Three programs. One waitlist. I work with five clients at a time.
        </p>
      </div>
    </div>
  );
}
