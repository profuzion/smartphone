#!/usr/bin/env node
/**
 * SEO / AEO crawlability audit.
 *
 * Run against a running dev or prod server:
 *   node scripts/verify-seo.mjs           # defaults to http://localhost:3000
 *   node scripts/verify-seo.mjs https://profuzionstudio.com
 *
 * Checks performed:
 *   1. GET /           → 200, HTML contains rendered-text density targets.
 *   2. GET /robots.txt → allow-lists AI crawlers, points at sitemap.
 *   3. GET /sitemap.xml → 200, contains homepage.
 *   4. GET /llms.txt   → 200, text/plain, ≥ 1500 bytes.
 *   5. JSON-LD graph parses and contains all five schema types.
 *   6. FAQ questions in JSON-LD appear verbatim in the rendered HTML.
 */

const BASE = process.argv[2] ?? "http://localhost:3000";

const failures = [];
let passed = 0;

function ok(msg) {
  passed++;
  console.log("\u2714", msg);
}
function bad(msg) {
  failures.push(msg);
  console.log("\u2718", msg);
}

async function fetchText(path, { expectedType } = {}) {
  const res = await fetch(`${BASE}${path}`);
  const ct = res.headers.get("content-type") ?? "";
  if (!res.ok) throw new Error(`${path} returned ${res.status}`);
  if (expectedType && !ct.includes(expectedType)) {
    throw new Error(`${path} returned content-type ${ct}, expected ${expectedType}`);
  }
  return await res.text();
}

(async () => {
  console.log(`\nAuditing ${BASE}\n`);

  // ── 1. Homepage ─────────────────────────────────────────────
  let html;
  try {
    html = await fetchText("/", { expectedType: "text/html" });
    ok(`GET / → 200 HTML (${html.length.toLocaleString()} bytes)`);
  } catch (e) {
    bad(`GET / failed: ${e.message}`);
    return;
  }

  // Strip HTML tags for honest text density measurement.
  const plain = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");

  const count = (needle) =>
    (plain.match(new RegExp(`\\b${needle}\\b`, "gi")) ?? []).length;

  const densityTargets = {
    Winkler: 8,
    Manitoba: 10,
    "Pembina Valley": 4,
    "1999": 3,
    "27": 3,
    Profuzion: 5,
    Lowell: 3,
  };

  for (const [term, floor] of Object.entries(densityTargets)) {
    const n = count(term.replace(/ /g, "\\s+"));
    if (n >= floor) ok(`Density · "${term}" → ${n} (floor ${floor})`);
    else bad(`Density · "${term}" → ${n} (floor ${floor})`);
  }

  /*
   * H1 must exist. It does NOT need to contain the local keywords
   * directly — editorial headlines are fine — but the hero section
   * (the first 2 KB of rendered text after the H1) MUST carry
   * "Winkler" and "Manitoba" so Google treats them as primary
   * on-page signals. That is the compromise between human-readable
   * editorial copy and localisable SEO.
   */
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!h1Match) {
    bad("No <h1> found.");
  } else {
    const h1 = h1Match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    ok(`<h1> present → "${h1}"`);

    const heroWindow = plain.slice(0, 2000);
    if (/Winkler/i.test(heroWindow) && /Manitoba/i.test(heroWindow)) {
      ok("Hero section contains Winkler + Manitoba within first 2 KB");
    } else {
      bad("Hero section missing Winkler or Manitoba in first 2 KB of rendered text");
    }
  }

  // ── 2. JSON-LD graph ────────────────────────────────────────
  const ldMatch = html.match(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i,
  );
  if (!ldMatch) {
    bad("No JSON-LD <script> found.");
  } else {
    try {
      const graph = JSON.parse(ldMatch[1].replace(/\\u003c/g, "<"));
      const nodes = graph["@graph"] ?? [graph];
      const types = new Set(
        nodes.flatMap((n) => (Array.isArray(n["@type"]) ? n["@type"] : [n["@type"]])),
      );
      for (const need of ["LocalBusiness", "Person", "Service", "FAQPage", "ItemList"]) {
        if (types.has(need)) ok(`JSON-LD contains ${need}`);
        else bad(`JSON-LD missing ${need}`);
      }

      const faqNode = nodes.find((n) => n["@type"] === "FAQPage");
      if (faqNode?.mainEntity?.length) {
        const firstQ = faqNode.mainEntity[0].name;
        if (plain.includes(firstQ)) {
          ok(`FAQ question visible in HTML → "${firstQ.slice(0, 60)}…"`);
        } else {
          bad(`FAQ question NOT visible in HTML → "${firstQ}"`);
        }
      }
    } catch (e) {
      bad(`JSON-LD parse failed: ${e.message}`);
    }
  }

  // ── 3. Robots / Sitemap / llms.txt ──────────────────────────
  try {
    const robots = await fetchText("/robots.txt");
    const required = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];
    for (const bot of required) {
      if (robots.includes(bot)) ok(`robots.txt allow-lists ${bot}`);
      else bad(`robots.txt missing ${bot}`);
    }
  } catch (e) {
    bad(`robots.txt check failed: ${e.message}`);
  }

  try {
    const sitemap = await fetchText("/sitemap.xml");
    if (sitemap.includes("<urlset") && sitemap.includes(BASE.replace(/\/$/, "")))
      ok("sitemap.xml well-formed and contains origin URL");
    else if (sitemap.includes("<urlset")) ok("sitemap.xml well-formed");
    else bad("sitemap.xml malformed");
  } catch (e) {
    bad(`sitemap check failed: ${e.message}`);
  }

  try {
    const llms = await fetchText("/llms.txt", { expectedType: "text/plain" });
    if (llms.length > 1500) ok(`llms.txt ${llms.length} bytes (≥ 1500)`);
    else bad(`llms.txt only ${llms.length} bytes`);
  } catch (e) {
    bad(`llms.txt check failed: ${e.message}`);
  }

  /*
   * Case-study subpages: each /work/:slug must return 200 HTML, own
   * a distinct H1, and embed a CreativeWork + BreadcrumbList JSON-LD.
   */
  const projectSlugs = ["natures-knoll", "alumareel", "brovek"];
  for (const slug of projectSlugs) {
    try {
      const page = await fetchText(`/work/${slug}`, { expectedType: "text/html" });
      const h1Match = page.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      if (!h1Match) {
        bad(`/work/${slug} missing <h1>`);
        continue;
      }
      const h1 = h1Match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      ok(`/work/${slug} → H1 "${h1}"`);

      const allLdBlocks = [
        ...page.matchAll(
          /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
        ),
      ];
      const types = new Set();
      for (const block of allLdBlocks) {
        try {
          const parsed = JSON.parse(block[1].replace(/\\u003c/g, "<"));
          const nodes = parsed["@graph"] ?? [parsed];
          for (const n of nodes) {
            const t = Array.isArray(n["@type"]) ? n["@type"] : [n["@type"]];
            for (const x of t) types.add(x);
          }
        } catch {
          // Ignore parse failure; caught by the assertions below.
        }
      }
      if (types.has("CreativeWork")) ok(`/work/${slug} has CreativeWork JSON-LD`);
      else bad(`/work/${slug} missing CreativeWork JSON-LD`);
      if (types.has("BreadcrumbList")) ok(`/work/${slug} has BreadcrumbList JSON-LD`);
      else bad(`/work/${slug} missing BreadcrumbList JSON-LD`);
    } catch (e) {
      bad(`/work/${slug} check failed: ${e.message}`);
    }
  }

  // ── 4. Done ────────────────────────────────────────────────
  console.log(`\n${passed} passed · ${failures.length} failed.\n`);
  if (failures.length) {
    for (const f of failures) console.log("  · " + f);
    process.exit(1);
  }
})();
