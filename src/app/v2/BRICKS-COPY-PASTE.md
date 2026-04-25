# Profuzion v2 → Bricks (copy-paste content)

**You cannot paste React/TSX, Three.js, or GSAP from this repo into Bricks** — Bricks outputs HTML. Use this file to **paste plain text** into Bricks **Heading**, **Text**, **Button**, and **List** elements. Rebuild **layout and styling** in Bricks + ACSS; map **colors** to ACSS variables using `v2.css` tokens (e.g. void `#050507`, signal `#b6ff38`).

**One-page anchors:** in Bricks, set each main section’s **HTML ID** (section or container) to match the `id` below so menu links work (`#industries`, etc.).

## Bricks JSON import (machine format)

- **File:** `profuzion-v2-bricks-import.json` (same folder as this doc). It uses the `content` + `bricksCopiedElements`-style structure so Bricks can **Import template** (Bricks → **Templates** → import icon → choose the JSON) or, on some sites, **paste** copied Bricks JSON into the builder.
- **Regenerate** from the repo: `node scripts/generate-bricks-import.mjs`
- **What’s inside:** **Hero, Industries, Contact**, plus **About, Branding (summary), Websites (summary), Process, Engagements, Pull quote**, a short **halftone / dev note** block (delete in production), and the same CTA copy. Styling (ACSS, BEM) and **header/footer templates** you still set in Bricks. Case-study *cards* on the Next site are placeholders here — use **ACF + Query Loop** for full case layouts.
- If import **fails** (version mismatch): in Bricks, build an empty **Section → Container → Heading** on a page, **export** that as JSON, and compare the wrapper keys to this file; adjust `version` or top-level shape to match your Bricks build.

---

## Sticky nav (header template)

| Label (menu text) | Link  |
|-------------------|--------|
| Industries | `#industries` |
| About | `#about` |
| Branding | `#branding` |
| Websites | `#websites` |
| Process | `#process` |
| Pricing | `#engagements` |

- Primary CTA button: text **Book a call** → `#contact`  
- Logo / home: `#top` (set HTML ID of hero to `top` or add empty anchor at top)

---

## §1 Hero — HTML ID: `top`

**Eyebrow (left):** `Winkler, Manitoba` · `since 1999` · `v2`  
(Or single line: use first segment of location + “since 1999 · v2”.)

**Eyebrow (right, amber):** `now booking summer 2026`

**H1 (line breaks as needed):**  
`Brand` `&` `Website` `design`  
`for` `owners` `who` `want` `to`  
*stand* *out*.  
(Emphasize “stand out” in accent color / display serif in Bricks.)

**Lede:**  
Profuzion is the quiet design studio in Winkler, Manitoba — the one local **industry, construction, food production, and e-commerce** send their best referrals to. Brands and websites built to read the way you sound across the desk.

**Primary button:** `Book a 30-min call` → `#contact`  
**Ghost button:** `See the work` → `#branding`

**Bottom strip (mono caps):**  
- Industrial  
- Contractors  
- Food Producers  
- E-commerce Sellers  

**Scroll line:** `scroll ↓ ·` + *Brand & Website design for owners who want to stand out.* (studio positioning one-liner)

---

## §2 Industries — HTML ID: `industries`

**Eyebrow:** `// who we are for`

**H2:**  
Four types of owners who  
keep coming back to us.

**Side paragraph:**  
We don't pretend to be every studio for every business. These four verticals share something we've spent twenty-five years getting right — trust, said quietly.

For each **vertical** (row + detail panel), use this copy:

### Industrial
- **Lead:** Capability that shows up in the spec sheet.  
- **Deliverables:** Tradeshow and facility systems · Product-line architecture for distributors · Audit-ready safety and quality narrative · Technical and catalog writing · Hiring and talent microsites  
- **Proof:** For plant managers and owners who get understood the first time.

### Contractors
- **Lead:** Bids, crews, and a name on the side of the shop.  
- **Deliverables:** Truck, yard, and crew apparel systems · Estimate and bid presentation templates · Local project galleries and case pages · Warranty and change-order clarity in writing · Trade school and hiring outreach  
- **Proof:** For firms that live and die on callbacks.

### Food Producers
- **Lead:** Provenance people can read on the label.  
- **Deliverables:** Label and case-pack design systems · Wholesale and distributor sheets · Origin, allergen, and compliance copy · Field-to-facility story on the site · Co-packer and export-facing PDFs  
- **Proof:** For teams who need trust before the first bite.

### E-commerce Sellers
- **Lead:** A shop that doesn't feel like a template.  
- **Deliverables:** DTC and marketplace listing strategy · Product and bundle page system · Email and post-purchase flows · Review and UGC in the right places · Return and policy copy that still sounds human  
- **Proof:** For owners who A/B test but don't sound like a help desk.

---

## About / Founder — HTML ID: `about`

**From `founderIntro` + site:**

- **H2:** One studio. One person on the call.  
- **P1:** I founded Profuzion in 1999 at a single desk in Winkler — not to follow design trends, but to help owners who have to be understood the first time and trusted the second. Lawyers, agents, shop floors, and front desks: the work has always been about clarity, not volume.  
- **P2:** The stack changes every few years. The promise doesn't: a brand and site you can hand to a new hire without a translation layer. When you hire the studio, you work with me from first call to launch — no account manager, no handoff to someone who wasn’t in the room for the brief.  

(Alt text for headshot, if you use the image: `Lowell Klassen — Brand Partner and Founder · Winkler, Manitoba`)

**Manifesto block (if you add it):**  
- **Eyebrow:** `// what we believe`  
- **P1:** Most websites for service businesses look like they were ordered from a catalogue. Same hero photo. Same testimonial slider. Same forgettable trust.  
- **P2:** We build brands and sites that read the way you sound across the desk — calm, certain, unmistakeably yours. The kind a referral lands on and finishes the call.  
- **Sign-off:** `— Profuzion · since 1999`

---

## Branding case studies — HTML ID: `branding`

**Intro:** use manifesto and/or a short H2; then one **card per case** (ACF: client, tagline, industry, year, summary, deliverables, etc.).

1. **AlumaReel** — An engineered brand for an engineered product.  
   - Industry: Aluminum reel manufacturing  
   - Summary: Wordmark, monogram, palette, typography, voice — routed to a website, a sell sheet, and a CAD-driven render pipeline.  
   - Deliverables: Identity system · Render pipeline · Sell sheet  

2. **Brovek** — A brand built to wear work boots.  
   - Industry: Construction · trades  
   - Summary: Confident, no-nonsense identity — wordmark, monogram, document system, and a vehicle wrap that reads at 70 km/h.  
   - Deliverables: Mark + monogram · Vehicle livery · Document kit  

3. **Nature's Knoll** — A century of local memory, set in editorial type.  
   - Industry: Non-profit golf  
   - Summary: Restored mark, an editorial voice document, and a member-facing identity that reads as well at 11pt as at 110pt.  
   - Deliverables: Mark restoration · Voice document · Member system  

4. **Keystone & Co.** (concept) — A law firm that writes the way it advises.  
   - Industry: Law · partnership  
   - Summary: A serif-led identity built for trust and longevity — a wordmark, partner monograms, and a long-form firm history.  
   - Deliverables: Wordmark + crest · Firm history · Stationery  

---

## Website case studies — HTML ID: `websites`

One block per case (ACF or static):

1. **Nature's Knoll Golf Course** — *A nine-hole story, shot like a film.*  
   - Hospitality · golf · 2026 · `naturesknoll.ca`  
   - Outcome: A scroll-narrative homepage with a three-minute course film and Lightspeed booking integration in a single screen.  
   - Metrics: Booking screens 4 → 1 · LCP 2.1s · Course film 3:00  

2. **AlumaReel** — *Catalogue product, finished site.*  
   - Manufacturing · product · 2025 · `alumareel.com`  
   - Outcome: A product-first homepage that closes — anchored by CAD-driven renders that ship from the same files the shop floor uses.  
   - Metrics: Render → site 48h · Variants unlimited · Brand assets 27  

3. **Keystone & Co.** (concept) — *A firm site that reads like a partnership letter.*  
   - Law · concept · 2026 · `keystone.law`  
   - Outcome: Editorial firm history, partner-led practice pages, and an intake flow built like a private consultation, not a form.  
   - Metrics: Bounce −42% · Intake friction −5 fields · Time on page +3:11  

4. **Pembina Realty** (concept) — *Listings that feel like the place.*  
   - Real estate · concept · 2026 · `pembinarealty.ca`  
   - Outcome: Listing-led discovery, editorial property write-ups, and a search experience that respects how buyers actually browse.  
   - Metrics: Listings → tours +38% · Saved searches +2.6× · Map vs list 61 / 39  

5. **Northpoint Fitness** (concept) — *Energy without the screaming.*  
   - Fitness · concept · 2026 · `northpoint.fit`  
   - Outcome: Schedule-first homepage, coach pages with intro reels, and a class-pack flow that doesn't bury the price.  
   - Metrics: First-class signup +74% · Drop-off −51% · Mobile share 82%  

---

## Process — HTML ID: `process`

| # | Name | Duration | Headline | Body (short) |
|---|------|----------|----------|----------------|
| 01 | Listen | Week 1 | We start at the desk you actually work from. | Two long conversations. We learn how you sound to a referral, what your worst client taught you, and what you want to be three years from now. |
| 02 | Frame | Weeks 2–3 | Positioning, voice, and the shape of the work. | We write the studio brief — one page, no decks. It names the audience, the shape of the brand, and the three things the website has to earn. |
| 03 | Design | Weeks 3–6 | Identity and screens — drawn together, not in series. | Brand system and website design happen on the same canvas. A wordmark earns its weight by working at 11pt in a footer and 110pt on a vehicle. |
| 04 | Ship | Weeks 6–8 | Built, tested, indexed, handed over. | Built in Next.js, tuned for Core Web Vitals, structured for AI search and Google. We hand over a site you can update without us. **(In WordPress, change “Next.js” to your stack, e.g. Bricks/WordPress.)** |
| 05 | Tend | Ongoing (optional) | Quarterly rounds keep the work earning its keep. | Most owners stay on a small monthly retainer for content updates, evergreen SEO, and a quarterly health check. No tickets, no surprise invoices. |

**Bullets per phase (from code):**  
- **01:** Founder interview · Audience read-throughs · Audit of current touchpoints  
- **02:** Studio brief (1 page) · Voice document · Sitemap and message hierarchy  
- **03:** Mark, palette, typography · Page-by-page art direction · Two rounds of revisions  
- **04:** Performance + accessibility pass · SEO + AEO setup · Owner training  
- **05:** Quarterly content rounds · Performance + AEO maintenance · Direct line to the founder  

---

## Engagements / Pricing — HTML ID: `engagements`

1. **Brand system**  
   - 4–6 weeks · fixed-scope quote  
   - Founder interview, positioning, mark, palette, typography, voice document, and a one-page studio brief. Everything you need to brief the next thing yourself.  
   - Includes: Founder interview + audit · Mark + monogram · Palette + typography · Voice document · Stationery starter kit  
   - CTA: `Start the brand →`  

2. **Brand & website** (primary)  
   - 8–10 weeks · fixed-scope quote · most owners start here  
   - The full project. Brand system + a Next.js website built to perform — Core Web Vitals, AI search, Google Business, the works. **(In WP, say “WordPress/Bricks” or your actual stack.)**  
   - Includes: Everything in Brand system · Sitemap + message hierarchy · Page-by-page art direction · Next.js build + CMS · Performance + SEO + AEO **(edit stack labels for reality)**  
   - CTA: `Book the project →`  

3. **Tend (retainer)**  
   - Monthly · small monthly retainer  
   - Quarterly content rounds, evergreen SEO, performance maintenance, and a direct line to the founder. No tickets, no surprise invoices.  
   - Includes: Quarterly content updates · Evergreen SEO + AEO · Performance reviews · Direct founder access  
   - CTA: `Add Tend →`  

---

## Pull quote — (optional HTML ID: `quote` — v2 has no id; add if you add a nav link)

**Eyebrow:** `// founder voice`  

**Quote:**  
We don't sell websites. We design the version of you that earns the next call — and then we make sure the site is the easy part.

**Source line:** `Profuzion · founder voice doc, v3`

---

## Contact — HTML ID: `contact`

**Eyebrow:** `// start a conversation`  

**H2:** Ready when *you* are. (*you* in accent / italic.)

**P:** The fastest way to start is a 30-minute call. No pitch deck. We ask three questions, you ask three, we both leave with a clear next step.

**Contact lines:**  
- **Direct** — hello@profuzionstudio.com  
- **Phone** — 204.362.6171  
- **Studio** — Winkler, Manitoba · R6W 0P4  
- **Hours** — Mon–Thu, 9–5 CT · Friday, by appointment  

**Badge:** `now booking summer 2026`

**Form panel label:** `→ new project intake` · `reply ≤ 1 day`  

**Fields (native form labels):**  
- Your name *  
- Email *  
- Business · location  
- What's the project? (optional)  

**Footer of form (micro):** `no automated reply · founder writes back`  
**Button:** `Send` → `→`  

**Success (after submit):**  
- **H3:** Got it. We'll write back within a day.  
- **P:** Thanks for the note. The founder reads every intake personally — expect a real reply, not an automation, with a couple of dates for a 30-minute call.  

*Or replace the form with your Bricks/Pro Forms + SMTP as discussed.*

---

## Footer

**Wordmark:** Profuzion **.** (period in accent)  

**Meta column:**  
- Winkler, Manitoba · Pembina Valley (or `studio.location` from top)  
- since 1999  
- now booking summer 2026  

**Navigate:** Industries · About · Branding · Websites · Process · Pricing (same `#` as nav)

**Contact:** hello@profuzionstudio.com · 204.362.6171 · Book a call → `#contact`  

**Studio (update URLs if needed):** Profuzion v1 (live) · Instagram · LinkedIn · GitHub  

**Bottom:**  
`©` [year] `Profuzion Studio · R6W 0P4 · Winkler, Manitoba`  
`Concept · v2 ·` [date] *(optional; remove “Concept v2” on production)*  

---

## ACF (reminder)

- **CPT** e.g. `case_study` with fields matching branding/website case rows above.  
- **Brings:** load cards via Query Loop in Bricks + dynamic ACF.

---

*Generated from the v2 Next codebase for Bricks handoff. Edited stack mentions (Next.js) may need one pass for a pure WordPress story.*
