import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyNav } from "../../../v2/_components/nav-case-study";
import { ProfuzionCursor } from "../../../v2/_components/cursor";
import { ProfuzionFooter } from "../../../v2/_components/footer";
import { ProjectMedia } from "@/components/work/project-media";
import {
  featuredProjects,
  getProjectBySlug,
  getRelatedProjects,
  type Project,
} from "@/content/projects";
import { site } from "@/content/site";
import {
  buildProjectSchema,
  buildProjectBreadcrumbs,
  safeJsonLd,
} from "@/lib/seo";

/** Local QA: same Flyte-style case layout as /v2/work — wrapper includes `pfz-v6` (WordPress body parity). */

const PATH_PREFIX = "/v6/work";
const HOME_BASE = "/v6";

type Params = Promise<{ slug: string }>;

function evolutionEyebrow(project: Project): string {
  const m: Record<Project["vertical"], string> = {
    web: "Website evolution",
    brand: "Brand evolution",
    hospitality: "Hospitality · brand & web",
    construction: "Construction · brand",
    manufacturing: "Manufacturing · brand & web",
    aviation: "Aviation services · brand & web",
  };
  return m[project.vertical];
}

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

  const title = `${project.client} — ${project.tagline} · v6 preview`;
  const description = project.summary;
  const url = `${site.url}${PATH_PREFIX}/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: false, follow: false },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_CA",
      images: project.gallery[0]
        ? [{ url: `${site.url}${project.gallery[0].src}`, alt: project.tagline }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.gallery[0] ? [`${site.url}${project.gallery[0].src}`] : undefined,
    },
  };
}

export default async function V6ProjectPreviewPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project.slug, 4);
  const workIndexUrl = `${site.url}${HOME_BASE}#websites`;
  const jsonLdProject = safeJsonLd(
    buildProjectSchema(project, {
      pathPrefix: PATH_PREFIX,
      workIndexUrl,
    }),
  );
  const jsonLdCrumbs = safeJsonLd(
    buildProjectBreadcrumbs(project, {
      pathPrefix: PATH_PREFIX,
      workIndexUrl,
    }),
  );

  const heroImage = project.gallery[0];
  const restOfGallery = project.gallery.slice(1);

  const resultBullets: string[] = [
    ...project.deliverables,
    ...(project.metrics?.map((m) => `${m.label}: ${m.value}`) ?? []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdProject }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdCrumbs }}
      />

      <div className="pfz pfz-v6 pfz-case relative isolate">
        <ProfuzionCursor />
        <CaseStudyNav homeBase={HOME_BASE} variantLabel="v6 · case" />

        <main className="pfz-case__main">
          <header className="pfz-case__shell pfz-case__masthead">
            <div className="pfz-rule mb-10" />
            <div className="pfz-case__masthead-grid">
              <div className="pfz-case__title-stack">
                <h1 className="pfz-display pfz-display--lg pfz-case__title">
                  {project.client}
                  <span className="pfz-display__accent">.</span>
                </h1>
                <p className="pfz-eyebrow pfz-eyebrow--primary pfz-eyebrow--bare pfz-eyebrow--lg">
                  {evolutionEyebrow(project)} · {project.year}
                </p>
              </div>
              <p className="pfz-case-tagline pfz-case-tagline--trailing">{project.tagline}</p>
            </div>
          </header>

          {heroImage && (
            <section className="pfz-case__shell pfz-case__hero" aria-label="Project hero">
              <ProjectMedia image={heroImage} priority />
            </section>
          )}

          <section className="pfz-case__shell pfz-case__lede" aria-labelledby="case-lede">
            <h2 id="case-lede" className="sr-only">
              Summary
            </h2>
            <p className="pfz-lede pfz-case__lede-text">{project.summary}</p>
            {project.liveUrl && (
              <p className="pfz-case__lede-actions">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn--base btn--outline"
                  data-cursor
                  data-cursor-label="live"
                >
                  Visit the live site
                  <span className="pfz-btn-arrow">↗</span>
                </a>
              </p>
            )}
          </section>

          <section className="pfz-case__story" aria-labelledby="case-story">
            <h2 id="case-story" className="sr-only">
              Challenge, approach, and outcome
            </h2>
            <div className="pfz-case__story-inner">
              <StoryBlock
                label="Growth barrier"
                heading={project.challenge.heading}
                body={project.challenge.body}
              />
              <StoryBlock
                label="Evolution"
                heading={project.approach.heading}
                body={project.approach.body}
              />

              {project.pullQuote && (
                <figure className="pfz-case__pullquote">
                  <blockquote className="pfz-case__pullquote-text">
                    “{project.pullQuote.quote}”
                  </blockquote>
                  <figcaption className="pfz-case__pullquote-cite">
                    {project.pullQuote.author} · {project.pullQuote.role}
                  </figcaption>
                </figure>
              )}

              <div className="pfz-case__results">
                <p className="pfz-eyebrow pfz-eyebrow--primary pfz-eyebrow--lg">Results</p>
                <h3 className="pfz-display pfz-display--md">{project.outcome.heading}</h3>
                <p className="pfz-body pfz-body--story">{project.outcome.body}</p>
                <ul className="pfz-case__results-list">
                  {resultBullets.map((line) => (
                    <li key={line} className="pfz-case__results-item">
                      <span aria-hidden className="pfz-case__results-mark">
                        ✦
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {restOfGallery.length > 0 && (
            <section className="pfz-case__gallery" aria-labelledby="case-gallery-h">
              <div className="pfz-case__gallery-inner">
                <div className="pfz-case__gallery-intro">
                  <p className="pfz-eyebrow">Gallery</p>
                  <h2 id="case-gallery-h" className="pfz-display pfz-display--md">
                    The work,{" "}
                    <span className="pfz-italic pfz-display--primary">up close</span>.
                  </h2>
                </div>
                <div className="pfz-case__gallery-grid">
                  {restOfGallery.map((img, i) => (
                    <ProjectMedia
                      key={`${img.src}-${i}`}
                      image={img}
                      className={
                        img.wide ? "pfz-case__gallery-span pfz-case__gallery-span--md" : ""
                      }
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          <section
            className="pfz-section pfz-section--ink pfz-case__cta"
            aria-labelledby="case-cta-shout"
          >
            <div className="pfz-case__cta-noise" aria-hidden />
            <div className="pfz-case__cta-inner">
              <p id="case-cta-shout" className="pfz-case__cta-shout">
                WHAT GOT YOU HERE{" "}
                <span className="pfz-italic pfz-display--primary">won&apos;t</span> GET YOU THERE.
              </p>
              <p className="pfz-body pfz-case__cta-lede">
                Not a traditional bloated agency — a founder-led studio for owners who need the
                work to read clearly the first time. Grab a call and we&apos;ll map the next
                evolution.
              </p>
              <div className="pfz-case__cta-actions">
                <a
                  href={`${HOME_BASE}#contact`}
                  className="btn--secondary"
                  data-cursor
                  data-cursor-label="book"
                >
                  Book a 30-min call
                  <span className="pfz-btn-arrow">→</span>
                </a>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="btn--base btn--outline"
                  data-cursor
                  data-cursor-label="email"
                >
                  {site.contact.email}
                </a>
              </div>
            </div>
          </section>

          <section className="pfz-case__related" aria-labelledby="case-related-h">
            <div className="pfz-case__shell">
              <div className="pfz-case__related-head">
                <div>
                  <p className="pfz-eyebrow">Selected work</p>
                  <h2
                    id="case-related-h"
                    className="pfz-display pfz-display--md pfz-case__related-title"
                  >
                    Keep exploring.
                  </h2>
                </div>
                <Link
                  href={`${HOME_BASE}#websites`}
                  className="btn--base btn--outline pfz-case__related-back"
                  data-cursor
                  data-cursor-label="all"
                >
                  Back to v6 home
                  <span className="pfz-btn-arrow">↑</span>
                </Link>
              </div>
              <ul className="pfz-case__related-grid">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`${PATH_PREFIX}/${r.slug}`}
                      data-cursor
                      data-cursor-label={r.client}
                      className="pfz-case-card"
                    >
                      <span className="pfz-case-card__type">
                        {r.industry.split("·")[0]?.trim() ?? "Project"}
                      </span>
                      <span className="pfz-case-card__title">{r.client}</span>
                      <span className="pfz-case-card__tagline">{r.tagline}</span>
                      <span className="pfz-case-card__cta">View case →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>

        <ProfuzionFooter linkBase={HOME_BASE} />
      </div>
    </>
  );
}

function StoryBlock({
  label,
  heading,
  body,
}: {
  label: string;
  heading: string;
  body: string;
}) {
  return (
    <div className="pfz-case__block">
      <p className="pfz-eyebrow pfz-eyebrow--primary pfz-eyebrow--lg">{label}</p>
      <h3 className="pfz-case__block-heading">{heading}</h3>
      <p className="pfz-body pfz-body--story">{body}</p>
    </div>
  );
}
