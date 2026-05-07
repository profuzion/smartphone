import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { SceneCanvas } from "@/components/three/scene-canvas";
import { ProjectMedia } from "@/components/work/project-media";
import {
  featuredProjects,
  getProjectBySlug,
  getRelatedProjects,
} from "@/content/projects";
import { site } from "@/content/site";
import {
  buildProjectSchema,
  buildProjectBreadcrumbs,
  safeJsonLd,
} from "@/lib/seo";

/**
 * /work/[slug] — dedicated case-study subpage.
 *
 * Each featured project lives at its own URL — /work/natures-knoll,
 * /work/alumareel, /work/brovek, /work/avion — rather than as a scroll anchor on
 * the homepage. The reasons this matters:
 *
 *   1. SEO: each case study is a separate indexable page with its
 *      own title, meta description, H1, canonical URL, and
 *      CreativeWork + BreadcrumbList JSON-LD.
 *   2. Shareability: owners can send /work/brovek directly.
 *   3. Surface: we can show a long gallery of mockups without
 *      inflating the homepage.
 *
 * All projects are statically generated via generateStaticParams
 * so the pages render instantly and the HTML is fully crawlable.
 *
 * Layout mirrors the homepage: the same fixed SceneCanvas sits behind
 * content at z-0; Nav, main, and Footer sit in a relative z-10 column so
 * the 3D seed reads as one continuous stage.
 */

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = `${project.client} — ${project.tagline}`;
  const description = project.summary;
  const url = `${site.url}/work/${slug}`;
  /** First gallery image doubles as the OG image. */
  const ogImage = project.gallery[0]
    ? `${site.url}${project.gallery[0].src}`
    : `${site.url}/og-image.png`;

  return {
    title,
    description,
    alternates: { canonical: url },
    keywords: [
      project.client,
      project.industry,
      project.vertical,
      ...project.scope,
      "Profuzion Studio case study",
      `Profuzion Studio ${project.client}`,
      "Winkler brand design",
      "Winkler website design",
      "Pembina Valley design studio",
    ],
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_CA",
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.tagline }],
      publishedTime: `${project.year}-01-01`,
      authors: [site.founder.name],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project.slug, 2);
  const jsonLdProject = safeJsonLd(buildProjectSchema(project));
  const jsonLdCrumbs = safeJsonLd(buildProjectBreadcrumbs(project));

  const heroImage = project.gallery[0];
  const restOfGallery = project.gallery.slice(1);

  return (
    <>
      {/* Per-page JSON-LD: CreativeWork + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdProject }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdCrumbs }}
      />

      <SceneCanvas />
      <div className="relative z-10 flex min-h-full flex-col">
        <Nav />

        <main className="flex flex-1 flex-col pt-[var(--nav-h)]">
          {/* ── Masthead (grain + isolate match homepage hero) ── */}
          <header className="grain relative isolate pb-16 pt-12 md:pb-24 md:pt-20">
            <div className="container-shell space-y-8">
              <nav
                aria-label="Breadcrumb"
                className="text-smoke flex items-center gap-2 text-xs tracking-[0.2em] uppercase"
              >
                <Link
                  href="/"
                  className="hover:text-vellum transition-colors"
                >
                  {site.shortName}
                </Link>
                <span aria-hidden>·</span>
                <Link
                  href="/#work"
                  className="hover:text-vellum transition-colors"
                >
                  Selected work
                </Link>
                <span aria-hidden>·</span>
                <span className="text-vellum">{project.client}</span>
              </nav>

              <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                <div className="space-y-6">
                  <p className="eyebrow">
                    Case study · {project.vertical} · {project.year}
                  </p>
                  <h1 className="headline-display text-[clamp(2.5rem,7vw,6rem)]">
                    {project.client}
                    <span className="text-fusion">.</span>
                  </h1>
                  <p className="font-display text-smoke max-w-2xl text-xl italic md:text-2xl">
                    {project.tagline}
                  </p>
                </div>

                <dl className="grid max-w-md grid-cols-2 gap-x-10 gap-y-4 text-sm">
                  <div className="space-y-1">
                    <dt className="eyebrow">Industry</dt>
                    <dd className="text-vellum">{project.industry}</dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="eyebrow">Location</dt>
                    <dd className="text-vellum">{project.location}</dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="eyebrow">Timeline</dt>
                    <dd className="text-vellum">{project.timeline}</dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="eyebrow">Studio</dt>
                    <dd className="text-vellum">{site.name}</dd>
                  </div>
                </dl>
              </div>

              {project.liveUrl && (
                <div className="pt-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fusion hover:text-fusion-bright inline-flex items-center gap-2 text-sm transition-colors"
                  >
                    Visit the live site ↗
                  </a>
                </div>
              )}
            </div>
          </header>

          {/* ── Hero mockup (full-bleed-ish) ───────────────── */}
          {heroImage && (
            <section className="pb-20 md:pb-28">
              <div className="container-shell">
                <ProjectMedia image={heroImage} priority />
              </div>
            </section>
          )}

          {/* ── Narrative: Challenge / Approach / Outcome ──── */}
          <section className="relative pb-24 md:pb-32">
            <div className="container-shell grid gap-16 md:grid-cols-[1fr_2fr] md:gap-20">
              <aside className="space-y-10">
                <div className="space-y-2">
                  <p className="eyebrow">Summary</p>
                  <p className="text-bone text-lg leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="eyebrow">Deliverables</p>
                  <ul className="space-y-2">
                    {project.deliverables.map((d) => (
                      <li
                        key={d}
                        className="text-smoke border-l border-fusion/40 pl-4 text-sm leading-relaxed"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <p className="eyebrow">Scope</p>
                  <ul className="flex flex-wrap gap-2 text-xs uppercase tracking-wider">
                    {project.scope.map((s) => (
                      <li
                        key={s}
                        className="text-smoke border border-[var(--color-border)] px-3 py-1"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              <div className="space-y-14">
                <ProjectNarrative section={project.challenge} label="Challenge" />
                <ProjectNarrative section={project.approach} label="Approach" />
                <ProjectNarrative section={project.outcome} label="Outcome" />

                {project.pullQuote && (
                  <figure className="border-fusion/60 max-w-2xl border-l-2 pl-6">
                    <blockquote className="font-display text-vellum text-2xl leading-snug italic md:text-3xl">
                      “{project.pullQuote.quote}”
                    </blockquote>
                    <figcaption className="eyebrow text-smoke mt-4">
                      {project.pullQuote.author} · {project.pullQuote.role}
                    </figcaption>
                  </figure>
                )}

                {project.metrics && project.metrics.length > 0 && (
                  <dl className="grid grid-cols-2 gap-8 border-t border-[var(--color-border)] pt-8 md:grid-cols-3">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="space-y-1">
                        <dt className="eyebrow">{m.label}</dt>
                        <dd className="font-display text-vellum text-3xl md:text-4xl">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </div>
          </section>

          {/* ── Full gallery ────────────────────────────────── */}
          {restOfGallery.length > 0 && (
            <section className="relative border-y border-[var(--color-border)] bg-obsidian/60 py-24 md:py-32">
              <div className="container-shell space-y-14">
                <div className="max-w-xl space-y-3">
                  <p className="eyebrow">Gallery</p>
                  <h2 className="headline-display text-[clamp(2rem,4vw,3.25rem)]">
                    The work, up close.
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
                  {restOfGallery.map((img, i) => (
                    <ProjectMedia
                      key={`${img.src}-${i}`}
                      image={img}
                      className={img.wide ? "md:col-span-2" : ""}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── Related projects + CTA ──────────────────────── */}
          <section className="border-t border-[var(--color-border)] py-24 md:py-32">
            <div className="container-shell grid gap-16 md:grid-cols-[1fr_1fr] md:gap-20">
              <div className="space-y-6">
                <p className="eyebrow">More work</p>
                <h2 className="headline-display text-[clamp(2rem,4vw,3.25rem)]">
                  Keep reading.
                </h2>
                <ul className="space-y-4">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/work/${r.slug}`}
                        className="group hover:border-fusion/60 flex items-baseline justify-between gap-6 border-b border-[var(--color-border)] pb-3 transition-colors"
                      >
                        <div className="space-y-1">
                          <p className="font-display text-vellum text-2xl md:text-3xl">
                            {r.client}
                          </p>
                          <p className="text-smoke text-sm italic">
                            {r.tagline}
                          </p>
                        </div>
                        <span
                          aria-hidden
                          className="text-fusion translate-x-0 transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6 rounded-sm border border-[var(--color-border)] bg-graphite/40 p-8 md:p-10">
                <p className="eyebrow">Start a project</p>
                <h2 className="headline-display text-[clamp(1.75rem,3.5vw,2.75rem)]">
                  Thinking about your own?
                </h2>
                <p className="text-bone leading-relaxed">
                  Tell {site.founder.name} about the work, the town, and the
                  people you serve. Replies within {site.contact.responseTimeHours}{" "}
                  hours — usually same day.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/#contact"
                    className="bg-fusion text-obsidian hover:bg-fusion-bright inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium tracking-wide transition-colors"
                  >
                    Start a project →
                  </Link>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-bone hover:text-vellum inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] px-5 py-3 text-sm transition-colors"
                  >
                    {site.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

function ProjectNarrative({
  section,
  label,
}: {
  section: { heading: string; body: string };
  label: string;
}) {
  return (
    <div className="space-y-4">
      <p className="eyebrow">{label}</p>
      <h3 className="font-display text-vellum text-[clamp(1.6rem,3vw,2.5rem)] leading-tight text-balance">
        {section.heading}
      </h3>
      <p className="text-bone max-w-2xl text-lg leading-relaxed">
        {section.body}
      </p>
    </div>
  );
}
