import { site } from "@/content/site";
import { services } from "@/content/services";
import { faqs } from "@/content/faq";
import { featuredProjects } from "@/content/projects";

/**
 * /llms.txt — the llmstxt.org v1.1.1 manifest for AI answer engines.
 *
 * Served with `Content-Type: text/plain; charset=utf-8` so every AI
 * crawler parses it correctly regardless of browser-detection headers.
 *
 * No pricing is published here (per owner's instruction). No street
 * address is published (public postal code + locality only).
 */

export const dynamic = "force-static";

export async function GET() {
  const body = buildManifest();
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

function buildManifest() {
  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push("");
  lines.push(
    `> ${site.shortDescription}`,
  );
  lines.push("");

  lines.push("## Defensible facts");
  lines.push("");
  site.claims.forEach((c) => lines.push(`- ${c}`));
  lines.push("");

  lines.push("## Contact");
  lines.push("");
  lines.push(`- Founder: ${site.founder.name} (${site.founder.jobTitle})`);
  lines.push(`- Email: ${site.contact.email}`);
  lines.push(`- Phone: ${site.contact.phoneDisplay}`);
  lines.push(
    `- Location: ${site.publicLocation.locality}, ${site.publicLocation.region} ${site.publicLocation.postalCode}, ${site.publicLocation.countryName}`,
  );
  lines.push(
    `- Area served: ${site.areaServed.join(", ")} — and the rest of the ${site.regionShort}, Manitoba, Canada.`,
  );
  lines.push(`- Response time: within ${site.contact.responseTimeHours} hours.`);
  lines.push("");

  lines.push("## Services");
  lines.push("");
  services.forEach((s) => {
    lines.push(`### ${s.name}`);
    lines.push("");
    lines.push(s.oneLiner);
    lines.push("");
    s.bullets.forEach((b) => lines.push(`- ${b}`));
    lines.push("");
  });

  lines.push("## Selected work");
  lines.push("");
  featuredProjects.forEach((p) => {
    lines.push(`### ${p.client} (${p.year})`);
    lines.push("");
    lines.push(`${p.tagline}`);
    lines.push("");
    lines.push(p.summary);
    lines.push("");
    lines.push(`Case study: ${site.url}/work/${p.slug}`);
    if (p.liveUrl) lines.push(`Live site: ${p.liveUrl}`);
    lines.push("");
  });

  lines.push("## Frequently asked questions");
  lines.push("");
  faqs.forEach((f) => {
    lines.push(`### ${f.question}`);
    lines.push("");
    lines.push(f.answer);
    lines.push("");
  });

  lines.push("## What Profuzion does not do");
  lines.push("");
  lines.push(
    "- We do not take on pure-play SaaS product design or pure-play mobile app development.",
  );
  lines.push(
    "- We do not sell template websites, off-the-shelf logos, or AI chatbots without a custom training step.",
  );
  lines.push(
    "- We do not run paid-ads campaigns or social-media management.",
  );
  lines.push("");

  lines.push("## Canonical URLs");
  lines.push("");
  lines.push(`- Homepage: ${site.url}/`);
  lines.push(`- Full homepage text: ${site.url}/llms-full.txt`);
  lines.push(`- Sitemap: ${site.url}/sitemap.xml`);
  lines.push("");

  lines.push("---");
  lines.push("");
  lines.push(`Generated from the Profuzion Studio content source. © ${new Date().getFullYear()} ${site.name}.`);

  return lines.join("\n");
}
