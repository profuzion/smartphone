import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { featuredProjects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${site.url}/#services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/#work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/#about`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/#faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/#contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];

  const serviceAnchors: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/#${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: s.tier === "primary" ? 0.8 : 0.6,
  }));

  /**
   * Each project now has a dedicated subpage at /work/{slug} — those
   * are the canonical URLs we want Google and AI answer engines to
   * crawl, not the (removed) homepage work anchors.
   */
  const projectPages: MetadataRoute.Sitemap = featuredProjects.map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...core, ...serviceAnchors, ...projectPages];
}
