"use client";

import Image from "next/image";
import { useState } from "react";
import { clsx } from "clsx";
import type { ProjectImage } from "@/content/projects";

/**
 * ProjectMedia — renders a case-study image with a graceful fallback.
 *
 * Why the fallback? The case-study subpages ship before the real
 * mockup renders exist in /public/work/... . Rather than failing the
 * build or showing a broken-image icon, we:
 *
 *   1. Attempt to load the image with next/image.
 *   2. If the network 404s at runtime, swap in a tasteful placeholder
 *      tile that carries the alt text and caption.
 *
 * When the owner drops the real JPG/PNG/WEBP at the written path the
 * component picks it up automatically with no code change.
 */

type Aspect = NonNullable<ProjectImage["aspect"]>;

const ASPECT_CLASSES: Record<Aspect, string> = {
  "hero": "aspect-[16/7]",
  "21/9": "aspect-[21/9]",
  "16/9": "aspect-[16/9]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
};

export function ProjectMedia({
  image,
  priority = false,
  className,
}: {
  image: ProjectImage;
  priority?: boolean;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  const aspect = image.aspect ?? "16/9";
  const aspectClass = ASPECT_CLASSES[aspect];

  return (
    <figure className={clsx("space-y-3", className)}>
      <div
        className={clsx(
          "relative overflow-hidden rounded-sm border border-[var(--color-border)] bg-graphite",
          aspectClass,
        )}
      >
        {!errored ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover"
            priority={priority}
            onError={() => setErrored(true)}
          />
        ) : (
          <MediaPlaceholder alt={image.alt} />
        )}
      </div>
      {image.caption && (
        <figcaption className="text-smoke font-display max-w-2xl text-sm italic md:text-base">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Placeholder tile shown when the real asset is missing. Uses the
 * alt text as its headline so crawlers and screen readers still get
 * the description, and the tile itself still looks intentional on
 * the page — not broken.
 */
function MediaPlaceholder({ alt }: { alt: string }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-fusion/15 via-plasma/10 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_30%_30%,rgba(255,77,31,0.45),transparent_55%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 p-6 md:p-8"
      >
        <span className="font-mono text-smoke text-[0.65rem] tracking-[0.3em] uppercase">
          Mockup pending
        </span>
      </div>
      <p className="relative font-display text-vellum max-w-md text-xl leading-tight md:text-2xl">
        {alt}
      </p>
    </div>
  );
}
