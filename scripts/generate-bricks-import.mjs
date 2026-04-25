/**
 * Writes src/app/v2/profuzion-v2-bricks-import.json
 * Bricks: Template Library → Import, or Bricks page → paste from clipboard
 *   (if supported). Format from html2bricks / Bricks "copied elements" pattern.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "../src/app/v2/profuzion-v2-bricks-import.json");

function section(id, cssId, label, childIds) {
  return {
    id,
    name: "section",
    parent: 0,
    children: childIds,
    settings: {
      tag: "section",
      _cssId: cssId,
      _padding: { top: "60", right: "24", bottom: "60", left: "24" },
    },
    label,
  };
}

function container(id, parent, childIds, label) {
  return {
    id,
    name: "container",
    parent,
    children: childIds,
    settings: {
      _width: "100%",
      _maxWidth: "1480",
      _margin: { right: "auto", left: "auto" },
    },
    label,
  };
}

function heading(id, parent, text, tag, label) {
  return {
    id,
    name: "heading",
    parent,
    children: [],
    settings: { tag, text },
    label,
  };
}

function textBasic(id, parent, text, label) {
  return {
    id,
    name: "text-basic",
    parent,
    children: [],
    settings: { text },
    label,
  };
}

function buttonEl(id, parent, text, label) {
  return {
    id,
    name: "button",
    parent,
    children: [],
    settings: { text },
    label,
  };
}

const content = [];

/* ── Hero (id top) ── */
{
  const c = "pz-hero",
    cont = "pz-hero-c",
    ch = [
      "pz-hero-e0",
      "pz-hero-e1",
      "pz-hero-h1",
      "pz-hero-lede",
      "pz-hero-btns",
      "pz-hero-strip",
    ];
  content.push(
    section(c, "top", "§1 Hero (HTML ID: top)", [cont]),
    container(cont, c, ch, "Hero container"),
  );
  content.push(
    textBasic("pz-hero-e0", cont, "Winkler, Manitoba · since 1999 · v2", "Eyebrow left"),
  );
  content.push(
    textBasic("pz-hero-e1", cont, "now booking summer 2026", "Eyebrow right"),
  );
  content.push(
    heading(
      "pz-hero-h1",
      cont,
      "Brand & Website design for owners who want to stand out.\n(Style “stand out” with accent in Bricks — split into spans if needed.)",
      "h1",
      "H1",
    ),
  );
  content.push(
    textBasic(
      "pz-hero-lede",
      cont,
      "Profuzion is the quiet design studio in Winkler, Manitoba — the one local industry, construction, food production, and e-commerce send their best referrals to. Brands and websites built to read the way you sound across the desk.",
      "Lede",
    ),
  );
  const btnC = "pz-hero-btns";
  content.push(
    container(btnC, cont, ["pz-hero-b1", "pz-hero-b2"], "CTA row"),
    buttonEl("pz-hero-b1", btnC, "Book a 30-min call", "→ #contact (set link in Bricks)"),
    buttonEl("pz-hero-b2", btnC, "See the work", "→ #branding (set link + ghost style)"),
  );
  content.push(
    textBasic(
      "pz-hero-strip",
      cont,
      "INDUSTRIAL · CONTRACTORS · FOOD PRODUCERS · E-COMMERCE SELLERS\n\nscroll ↓ · Brand & Website design for owners who want to stand out.",
      "Bottom strip (mono in Bricks)",
    ),
  );
}

/* ── Industries ── */
{
  const s = "pz-ind", cont = "pz-ind-c";
  const body = `We don't pretend to be every studio for every business. These four verticals share something we've spent twenty-five years getting right — trust, said quietly.

INDUSTRIAL
Lead: Capability that shows up in the spec sheet.
Deliverables: Tradeshow and facility systems · Product-line architecture for distributors · Audit-ready safety and quality narrative · Technical and catalog writing · Hiring and talent microsites
Proof: For plant managers and owners who get understood the first time.

CONTRACTORS
Lead: Bids, crews, and a name on the side of the shop.
Deliverables: Truck, yard, and crew apparel systems · Estimate and bid presentation templates · Local project galleries and case pages · Warranty and change-order clarity in writing · Trade school and hiring outreach
Proof: For firms that live and die on callbacks.

FOOD PRODUCERS
Lead: Provenance people can read on the label.
Deliverables: Label and case-pack design systems · Wholesale and distributor sheets · Origin, allergen, and compliance copy · Field-to-facility story on the site · Co-packer and export-facing PDFs
Proof: For teams who need trust before the first bite.

E-COMMERCE SELLERS
Lead: A shop that doesn't feel like a template.
Deliverables: DTC and marketplace listing strategy · Product and bundle page system · Email and post-purchase flows · Review and UGC in the right places · Return and policy copy that still sounds human
Proof: For owners who A/B test but don't sound like a help desk.`;
  content.push(
    section(s, "industries", "§2 Industries (HTML ID: industries)", [cont]),
    container(cont, s, ["pz-ind-ey", "pz-ind-h2", "pz-ind-body"], "Industries"),
  );
  content.push(
    textBasic("pz-ind-ey", cont, "// who we are for", "Eyebrow"),
  );
  content.push(
    heading("pz-ind-h2", cont, "Four types of owners who keep coming back to us.", "h2", "H2"),
  );
  content.push(
    textBasic("pz-ind-body", cont, body, "Verticals copy"),
  );
}

/* ── Contact ── */
{
  const s = "pz-cta", cont = "pz-cta-c";
  content.push(
    section(s, "contact", "§8 Contact (HTML ID: contact)", [cont]),
    container(cont, s, ["pz-cta-ey", "pz-cta-h2", "pz-cta-p", "pz-cta-dl", "pz-cta-hint"], "CTA block"),
  );
  content.push(
    textBasic("pz-cta-ey", cont, "// start a conversation", "Eyebrow"),
  );
  content.push(
    heading("pz-cta-h2", cont, "Ready when you are.", "h2", "H2 (italic you in Bricks)"),
  );
  content.push(
    textBasic(
      "pz-cta-p",
      cont,
      "The fastest way to start is a 30-minute call. No pitch deck. We ask three questions, you ask three, we both leave with a clear next step.",
      "Intro",
    ),
  );
  content.push(
    textBasic(
      "pz-cta-dl",
      cont,
      "Direct: hello@profuzionstudio.com\nPhone: 204.362.6171\nStudio: Winkler, Manitoba · R6W 0P4\nHours: Mon–Thu, 9–5 CT · Friday, by appointment",
      "Contact list",
    ),
  );
  content.push(
    textBasic(
      "pz-cta-hint",
      cont,
      "Add your Bricks / Pro Form here, or use native fields. Panel labels: new project intake · reply ≤ 1 day. Footer note: no automated reply · founder writes back.",
      "Form placeholder",
    ),
  );
}

/* ── About ── */
{
  const s = "pz-about",
    cont = "pz-about-c",
    body = `One studio. One person on the call.

I founded Profuzion in 1999 at a single desk in Winkler — not to follow design trends, but to help owners who have to be understood the first time and trusted the second. Lawyers, agents, shop floors, and front desks: the work has always been about clarity, not volume.

The stack changes every few years. The promise doesn't: a brand and site you can hand to a new hire without a translation layer. When you hire the studio, you work with me from first call to launch — no account manager, no handoff to someone who wasn’t in the room for the brief.

// what we believe
Most websites for service businesses look like they were ordered from a catalogue. Same hero photo. Same testimonial slider. Same forgettable trust.

We build brands and sites that read the way you sound across the desk — calm, certain, unmistakeably yours. The kind a referral lands on and finishes the call.
— Profuzion · since 1999`;
  content.push(
    section(s, "about", "§ About (HTML ID: about)", [cont]),
    container(cont, s, ["pz-about-h2", "pz-about-txt"], "About"),
  );
  content.push(heading("pz-about-h2", cont, "One studio. One person on the call.", "h2", "H2"));
  content.push(textBasic("pz-about-txt", cont, body, "Founder + manifesto"));
}

/* ── Branding (summary — use ACF for full cases) ── */
{
  const s = "pz-brand", cont = "pz-brand-c";
  const t = `Branding — case studies (detail: ACF + Query Loop)

AlumaReel — An engineered brand for an engineered product.
Brovek — A brand built to wear work boots.
Nature's Knoll — A century of local memory, set in editorial type.
Keystone & Co. (concept) — A law firm that writes the way it advises.`;
  content.push(
    section(s, "branding", "§ Branding (HTML ID: branding)", [cont]),
    container(cont, s, ["pz-brand-txt"], "Branding"),
  );
  content.push(textBasic("pz-brand-txt", cont, t, "Branding list"));
}

/* ── Websites (summary) ── */
{
  const s = "pz-web", cont = "pz-web-c";
  const t = `Website case studies — full cards via ACF + Bricks loop

Nature's Knoll Golf — A nine-hole story, shot like a film.
AlumaReel — Catalogue product, finished site.
Keystone & Co. — A firm site that reads like a partnership letter.
Pembina Realty — Listings that feel like the place.
Northpoint Fitness — Energy without the screaming.`;
  content.push(
    section(s, "websites", "§ Websites (HTML ID: websites)", [cont]),
    container(cont, s, ["pz-web-txt"], "Websites"),
  );
  content.push(textBasic("pz-web-txt", cont, t, "Websites list"));
}

/* ── Process ── */
{
  const s = "pz-proc",
    cont = "pz-proc-c",
    t = `01 Listen (Week 1) — We start at the desk you actually work from.
02 Frame (Weeks 2–3) — Positioning, voice, and the shape of the work.
03 Design (Weeks 3–6) — Identity and screens — drawn together, not in series.
04 Ship (Weeks 6–8) — Built, tested, indexed, handed over. (Stack: align with your Bricks/WordPress build.)
05 Tend (ongoing) — Quarterly rounds keep the work earning its keep.`;
  content.push(
    section(s, "process", "§ Process (HTML ID: process)", [cont]),
    container(cont, s, ["pz-proc-h2", "pz-proc-txt"], "Process"),
  );
  content.push(heading("pz-proc-h2", cont, "How we work", "h2", "H2 (replace with your H2)"));
  content.push(textBasic("pz-proc-txt", cont, t, "Phases"));
}

/* ── Engagements / Pricing ── */
{
  const s = "pz-eng", cont = "pz-eng-c";
  const t = `Brand system (4–6 weeks) — fixed-scope quote. Founder interview, positioning, mark, palette, typography, voice document, and a one-page studio brief.

Brand & website (8–10 weeks) — PRIMARY. Brand system + website built to perform. Most owners start here.

Tend (retainer) — Monthly. Quarterly content, SEO, performance, direct line to the founder.`;
  content.push(
    section(s, "engagements", "§ Pricing (HTML ID: engagements)", [cont]),
    container(cont, s, ["pz-eng-h2", "pz-eng-txt"], "Engagements"),
  );
  content.push(heading("pz-eng-h2", cont, "Engagements", "h2", "H2"));
  content.push(textBasic("pz-eng-txt", cont, t, "Three tiers — refine in Bricks cards"));
}

/* ── Quote ── */
{
  const s = "pz-quote", cont = "pz-quote-c";
  content.push(
    section(s, "quote", "§ Pull quote (HTML ID: quote)", [cont]),
    container(cont, s, ["pz-quote-ey", "pz-quote-txt", "pz-quote-src"], "Quote"),
  );
  content.push(
    textBasic("pz-quote-ey", cont, "// founder voice", "Eyebrow"),
  );
  content.push(
    textBasic(
      "pz-quote-txt",
      cont,
      "“We don't sell websites. We design the version of you that earns the next call — and then we make sure the site is the easy part.”",
      "Blockquote (style italic serif in Bricks)",
    ),
  );
  content.push(
    textBasic("pz-quote-src", cont, "Profuzion · founder voice doc, v3", "Source"),
  );
}

/* ── Halftone placeholder (replace with child theme script or static BG) ── */
{
  const s = "pz-halo", cont = "pz-halo-c";
  content.push(
    section(s, "hero-bg-note", "Hero shader (optional)", [cont]),
    container(cont, s, ["pz-halo-txt"], "Note"),
  );
  content.push(
    textBasic(
      "pz-halo-txt",
      cont,
      "Next v2 used a WebGL halftone in the hero. In WordPress: use a static gradient/image, a Bricks background video, or enqueue the profuzion-brick-child script bundle when you add a canvas (see tools/wordpress/WORDPRESS-PARITY.md).",
      "Dev note — delete in production",
    ),
  );
}

const pack = {
  content,
  source: "bricksCopiedElements",
  version: "1.12.4",
  globalClasses: [],
  globalElements: [],
};

writeFileSync(out, JSON.stringify(pack, null, 2), "utf8");
console.log("Wrote", out);