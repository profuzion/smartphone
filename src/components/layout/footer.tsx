import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[var(--color-border)] py-16 md:py-20">
      <div className="container-shell flex flex-col gap-12">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          {/* Studio identity + NAP block */}
          <div className="space-y-4">
            <p className="eyebrow">Studio</p>
            <p className="font-display text-vellum text-3xl leading-tight tracking-tight">
              {site.name}
              <span className="text-fusion">.</span>
            </p>
            <p className="text-smoke max-w-sm text-sm leading-relaxed">
              {site.shortDescription}
            </p>
            <address className="text-smoke not-italic">
              <span>
                {site.publicLocation.locality}, {site.publicLocation.regionName}{" "}
                {site.publicLocation.postalCode}
              </span>
              <br />
              <span>{site.publicLocation.countryName}</span>
            </address>
          </div>

          {/* Direct contact */}
          <div className="space-y-4">
            <p className="eyebrow">Contact</p>
            <ul className="space-y-2 text-base">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-vellum hover:text-fusion transition-colors"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.contact.phone}`}
                  className="text-vellum hover:text-fusion transition-colors"
                >
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li className="text-smoke text-sm">
                Replies within {site.contact.responseTimeHours} hours.
              </li>
            </ul>
          </div>

          {/* Elsewhere */}
          <div className="space-y-4">
            <p className="eyebrow">Elsewhere</p>
            <ul className="flex flex-col gap-2">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-vellum hover:text-fusion inline-flex items-center gap-2 text-base transition-colors"
                  >
                    {s.label} <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-[var(--color-border)] text-smoke flex flex-col justify-between gap-3 border-t pt-8 text-xs md:flex-row">
          <span>
            © {year} {site.name}. All rights reserved.
          </span>
          <span>
            Designed and built in {site.publicLocation.locality},{" "}
            {site.publicLocation.regionName} · Serving the {site.regionShort}{" "}
            since {site.foundingYear}.
          </span>
        </div>
      </div>
    </footer>
  );
}
