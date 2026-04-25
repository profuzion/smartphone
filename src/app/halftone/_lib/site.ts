/**
 * Halftone — concept/demo content
 *
 * This file is the single source of truth for the route at /halftone.
 * Every section component pulls its copy + rows + JSON-like config from
 * here so the whole concept can be edited in one place.
 *
 * Copy style guide:
 *   • Lowercase mono-friendly. Periods, no shouting.
 *   • Verbs over adjectives. No "innovative", no "solutions".
 *   • Quantities and surfaces, not adjectives, do the lifting.
 */

export const studio = {
  name: "Halftone",
  monogram: "HT",
  positioning: "Interfaces for software that thinks.",
  oneLiner:
    "Halftone is a six-person studio shipping product UI for AI-native teams. Linear-class motion. Anthropic-grade restraint. We start in your codebase, not Figma.",
  meta: {
    teamSize: 6,
    cities: ["Toronto", "Berlin"],
    timezone: "UTC",
    availability: "Q1 2026",
  },
  contact: {
    email: "probe@halftone.studio",
    bookingHref: "#initialize",
  },
  build: {
    commit: "c8a7d2",
    env: "prod",
  },
} as const;

export const cases = [
  {
    n: "001",
    client: "acaria",
    surface: "assistant ui",
    model: "openai gpt-4.1",
    status: "shipped",
    note: "Inference UI for a multi-tenant analyst assistant. 28k MAU.",
  },
  {
    n: "002",
    client: "pulse.fm",
    surface: "admin console",
    model: "proprietary",
    status: "shipped",
    note: "Operator console for a sub-second voice routing platform.",
  },
  {
    n: "003",
    client: "beam",
    surface: "onboarding flow",
    model: "anthropic claude",
    status: "in flight",
    note: "YC S24 — agentic CRM, currently onboarding 200 design partners.",
  },
  {
    n: "004",
    client: "foundry/93",
    surface: "agent toolkit",
    model: "anthropic claude",
    status: "shipped",
    note: "Tool-author surface for a Series B agentic platform.",
  },
  {
    n: "005",
    client: "latticework",
    surface: "observability",
    model: "multi-model",
    status: "shipped",
    note: "Eval and inference monitoring for teams shipping >1B tokens/wk.",
  },
  {
    n: "006",
    client: "slate",
    surface: "eval ui",
    model: "proprietary",
    status: "in flight",
    note: "Side-by-side eval studio. Replaces three internal Notion docs.",
  },
  {
    n: "007",
    client: "mosaic",
    surface: "config dsl",
    model: "openai gpt-4o",
    status: "shipped",
    note: "Type-safe config language with a live, schema-aware editor.",
  },
  {
    n: "008",
    client: "citadel",
    surface: "policy console",
    model: "anthropic claude",
    status: "shipped",
    note: "Compliance surface for a fintech with a model-risk team.",
  },
  {
    n: "009",
    client: "northstream",
    surface: "inference fleet",
    model: "proprietary",
    status: "shipped",
    note: "Real-time fleet ops for a 320-GPU inference cluster.",
  },
  {
    n: "010",
    client: "pivot.ai",
    surface: "agentic crm",
    model: "anthropic claude",
    status: "in flight",
    note: "Inbox-first CRM where every reply is an agent draft.",
  },
  {
    n: "011",
    client: "hum",
    surface: "voice studio",
    model: "whisper-3",
    status: "shipped",
    note: "Studio app for journalists transcribing 14-hour days.",
  },
] as const;

export type Case = (typeof cases)[number];

export const phases = [
  {
    n: "01",
    name: "probe",
    duration: "1 week",
    headline: "We learn your stack before we touch your design system.",
    json: [
      { k: "inputs", v: '["repo access", "design tokens", "two product calls"]' },
      { k: "outputs", v: '["surface map", "risk register", "linear scope doc"]' },
      { k: "artifacts", v: '"halftone.audit.md"' },
      { k: "ends_with", v: '"go / no-go conversation. you decide."' },
    ],
  },
  {
    n: "02",
    name: "map",
    duration: "1–2 weeks",
    headline: "We name the surfaces, the affordances, and the failure modes.",
    json: [
      { k: "inputs", v: '["audit.md", "user research", "model contract"]' },
      { k: "outputs", v: '["surface inventory", "failure-mode table", "voice spec"]' },
      { k: "artifacts", v: '"halftone.map.fig + halftone.voice.md"' },
      { k: "ends_with", v: '"a sequenced build plan. no surprises."' },
    ],
  },
  {
    n: "03",
    name: "build",
    duration: "4–6 weeks",
    headline: "We ship inside your repo. PRs, not Figma exports.",
    json: [
      { k: "inputs", v: '["build plan", "your component library", "you"]' },
      { k: "outputs", v: '["merged surfaces", "motion library", "storybook"]' },
      { k: "artifacts", v: '"~32 PRs · ~6 stories · 1 release notes doc"' },
      { k: "cadence", v: '"daily merges. weekly demo. async reviews."' },
    ],
  },
  {
    n: "04",
    name: "tend",
    duration: "ongoing",
    headline: "We stay on retainer until the surface earns its weight.",
    json: [
      { k: "inputs", v: '["product roadmap", "feature flags", "instrumented usage"]' },
      { k: "outputs", v: '["motion fidelity passes", "ui regression PRs", "polish loops"]' },
      { k: "artifacts", v: '"a surface that gets faster, not slower."' },
      { k: "exit", v: '"30-day notice, both ways. no penalties."' },
    ],
  },
] as const;

export type Phase = (typeof phases)[number];

export const surfaces = [
  {
    id: "assistant",
    name: "assistant chat",
    note: "stream-first chat with type-safe tool calls.",
    color: "#B6FF38",
  },
  {
    id: "admin",
    name: "admin console",
    note: "operator surfaces. dense tables, calm motion.",
    color: "#7C9CFF",
  },
  {
    id: "agent",
    name: "agent toolkit",
    note: "author tools, inspect runs, replay traces.",
    color: "#F4B95A",
  },
  {
    id: "observability",
    name: "observability",
    note: "eval, inference, and cost in one panel.",
    color: "#FF7A5C",
  },
  {
    id: "eval",
    name: "eval studio",
    note: "side-by-side and pairwise. keyboard-first.",
    color: "#A57DFB",
  },
  {
    id: "config",
    name: "config dsl",
    note: "schema-aware editors with live validation.",
    color: "#5DD3B0",
  },
] as const;

export type Surface = (typeof surfaces)[number];

export const engagements = [
  {
    id: "audit",
    file: "audit.json",
    duration: "1 week",
    starting: "from $9k",
    primary: false,
    fields: [
      { k: "scope", v: '"full surface audit"' },
      { k: "deliverables", v: '["audit.md", "linear roadmap", "30m readout"]' },
      { k: "ideal_for", v: '"teams shipping a v2 within a quarter"' },
      { k: "team", v: '["founder", "1 designer + 1 engineer"]' },
    ],
  },
  {
    id: "engagement",
    file: "engagement.json",
    duration: "6 weeks",
    starting: "from $48k",
    primary: true,
    fields: [
      { k: "scope", v: '"surface design + build"' },
      { k: "deliverables", v: '["~32 PRs", "storybook coverage", "motion library"]' },
      { k: "ideal_for", v: '"teams replacing a v1 they have outgrown"' },
      { k: "team", v: '["1 design lead", "2 engineers", "embedded review"]' },
    ],
  },
  {
    id: "retainer",
    file: "retainer.json",
    duration: "monthly",
    starting: "from $22k/mo",
    primary: false,
    fields: [
      { k: "scope", v: '"embedded design + frontend"' },
      { k: "deliverables", v: '["weekly merges", "polish loops", "design review"]' },
      { k: "ideal_for", v: '"teams who are tired of design debt compounding"' },
      { k: "exit", v: '"30-day notice, both ways"' },
    ],
  },
] as const;

export type Engagement = (typeof engagements)[number];

export const signal = [
  {
    date: "2026.04.20",
    type: "shipped",
    body: "acaria — 1.4 inference observability pane",
    href: "#",
  },
  {
    date: "2026.04.18",
    type: "wrote",
    body: '"the case against tool-pickers"',
    href: "#",
  },
  {
    date: "2026.04.12",
    type: "shipped",
    body: "foundry/93 — agent author surface, v3",
    href: "#",
  },
  {
    date: "2026.04.04",
    type: "spoke",
    body: "AI Engineer Summit — agentic UIs as a stateful problem",
    href: "#",
  },
  {
    date: "2026.03.28",
    type: "shipped",
    body: "latticework — eval studio, side-by-side mode",
    href: "#",
  },
  {
    date: "2026.03.22",
    type: "wrote",
    body: '"streaming UI is a contract, not an effect"',
    href: "#",
  },
  {
    date: "2026.03.14",
    type: "shipped",
    body: "mosaic — schema-aware config editor",
    href: "#",
  },
  {
    date: "2026.03.06",
    type: "spoke",
    body: "KubeCon — interfaces for non-deterministic systems",
    href: "#",
  },
  {
    date: "2026.02.28",
    type: "shipped",
    body: "citadel — policy review surface, v1",
    href: "#",
  },
  {
    date: "2026.02.20",
    type: "wrote",
    body: '"writing motion specs your engineers will actually merge"',
    href: "#",
  },
  {
    date: "2026.02.10",
    type: "shipped",
    body: "northstream — inference fleet ops console",
    href: "#",
  },
  {
    date: "2026.01.28",
    type: "spoke",
    body: "Strange Loop — small studios in a model-driven world",
    href: "#",
  },
] as const;

export type SignalEntry = (typeof signal)[number];

/**
 * One editorial moment in §6 — the rare departure from monospace.
 * Set in italic Instrument Serif at large size to do the human work.
 */
export const pullQuote = {
  body: "We don't ship dashboards. We ship operator surfaces — the kind a senior PM keeps open in the second monitor at 11pm because something's wrong and the answer needs to be one keystroke away.",
  attribution: "Halftone — internal voice doc, v0.4",
};

/**
 * Capabilities listed alongside the 3D cluster in §4.
 * IDs map to surfaces[].id so hovering a capability lifts the matching panel.
 */
export const capabilities = [
  { id: "assistant", label: "design systems" },
  { id: "admin", label: "operator dashboards" },
  { id: "agent", label: "agent tooling" },
  { id: "observability", label: "data viz" },
  { id: "eval", label: "evaluation interfaces" },
  { id: "config", label: "configuration editors" },
] as const;
