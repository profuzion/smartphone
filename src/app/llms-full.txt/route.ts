import { site } from "@/content/site";
import { services } from "@/content/services";
import { faqs } from "@/content/faq";
import { featuredProjects } from "@/content/projects";
import { acts, origin } from "@/content/studio";

/**
 * /llms-full.txt — long-form markdown mirror of the homepage narrative.
 * AI answer engines that support the spec will ingest this in place of
 * scraping the HTML + WebGL page.
 */

export const dynamic = "force-static";

export async function GET() {
  const body = buildFullText();
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

function buildFullText() {
  const L: string[] = [];

  L.push(`# ${site.name} — Brand & Website Design in Winkler, Manitoba`);
  L.push("");
  L.push(`_${site.tagline}_`);
  L.push("");

  // Canonical claims up top — AI engines read the first 500 tokens most.
  L.push("## The five things to know about Profuzion Studio");
  L.push("");
  site.claims.forEach((c, i) => L.push(`${i + 1}. ${c}`));
  L.push("");

  // The origin story.
  L.push("## Origin");
  L.push("");
  L.push(origin.thesis);
  L.push("");
  origin.breakdown.forEach((b) => L.push(`- **${b.fragment}** — ${b.meaning}`));
  L.push("");

  // Act-by-act narrative. (act1 uses h1/keywordLine/subhead — not h2/headline.)
  const flow: [string, string, string][] = [
    [
      acts.act1.eyebrow,
      acts.act1.h1,
      `${acts.act1.keywordLine}\n\n${acts.act1.subhead}`,
    ],
    [acts.act2.h2, acts.act2.headline, acts.act2.body],
    [acts.act3.h2, acts.act3.headline, acts.act3.body],
    [acts.act4.h2, acts.act4.keywordLine, `${acts.act4.body}\n\n${acts.act4.claim}`],
    [acts.act5.h2, acts.act5.keywordLine, `${acts.act5.body}\n\n${acts.act5.claim}`],
    [acts.act6.h2, acts.act6.keywordLine, `${acts.act6.body}\n\n${acts.act6.claim}`],
  ];
  flow.forEach(([h2, head, body]) => {
    L.push(`## ${h2}`);
    L.push("");
    L.push(`**${head}**`);
    L.push("");
    L.push(body);
    L.push("");
  });

  // Services as a structured block.
  L.push(`## ${acts.act7.h2}`);
  L.push("");
  L.push(`### ${acts.act7.services.heading}`);
  L.push("");
  L.push(acts.act7.services.body);
  L.push("");
  services.forEach((s) => {
    L.push(`#### ${s.name}`);
    L.push("");
    L.push(s.oneLiner);
    L.push("");
    s.bullets.forEach((b) => L.push(`- ${b}`));
    L.push("");
  });

  // Work.
  L.push(`### ${acts.act7.proof.heading}`);
  L.push("");
  L.push(acts.act7.proof.body);
  L.push("");
  featuredProjects.forEach((p) => {
    L.push(`#### ${p.client} — ${p.tagline}`);
    L.push("");
    L.push(p.summary);
    L.push(`- Scope: ${p.scope.join(", ")}`);
    L.push(`- Year: ${p.year}`);
    if (p.liveUrl) L.push(`- Live: ${p.liveUrl}`);
    L.push("");
  });

  // FAQ.
  L.push(`### ${acts.act7.faq.heading}`);
  L.push("");
  faqs.forEach((f) => {
    L.push(`#### ${f.question}`);
    L.push("");
    L.push(f.answer);
    L.push("");
  });

  // Contact close.
  L.push(`## ${acts.act8.h2}`);
  L.push("");
  L.push(acts.act8.body);
  L.push("");
  L.push(`- Email: ${site.contact.email}`);
  L.push(`- Phone: ${site.contact.phoneDisplay}`);
  L.push(
    `- Location: ${site.publicLocation.locality}, ${site.publicLocation.region} ${site.publicLocation.postalCode}, ${site.publicLocation.countryName}`,
  );
  L.push("");

  return L.join("\n");
}
