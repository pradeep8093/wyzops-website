import { ButtonLink } from "@/components/ui/button";
import { finalCta } from "@/content/home";
import { siteConfig } from "@/content/site";

export function CtaSection({
  title = finalCta.title,
  body = finalCta.body,
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="cta-heading" className="relative py-16 sm:py-24">
      <div className="container-page">
        <div
          data-reveal
          className="relative isolate overflow-hidden rounded-[2rem] border border-line-strong bg-surface px-6 py-20 text-center sm:px-12 sm:py-28"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,#000,transparent)]" />
            <div className="absolute -bottom-1/2 left-1/2 h-[42rem] w-[60rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(79_125_255/0.32),rgb(139_92_246/0.14)_55%,transparent)]" />
            <div className="hairline-x absolute inset-x-0 top-0 h-px" />
          </div>

          <p className="eyebrow text-brand-sky">Build · Integrate · Automate</p>
          <h2
            id="cta-heading"
            className="mx-auto mt-6 max-w-3xl text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.04em] text-fg sm:text-6xl"
          >
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{body}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={finalCta.primaryCta.href} size="lg">
              {finalCta.primaryCta.label}
            </ButtonLink>
            {siteConfig.bookingUrl ? (
              <ButtonLink
                href={siteConfig.bookingUrl}
                size="lg"
                variant="secondary"
                arrow="up-right"
                target="_blank"
                rel="noopener noreferrer"
              >
                {finalCta.bookingLabel}
              </ButtonLink>
            ) : null}
            <ButtonLink href={`mailto:${siteConfig.contactEmail}`} size="lg" variant="secondary" arrow="up-right">
              {finalCta.secondaryLabel}
            </ButtonLink>
          </div>
          <p className="mt-8 font-mono text-xs text-subtle">
            Engineering teams in {siteConfig.location.country} · {siteConfig.location.servedRegion}
          </p>
        </div>
      </div>
    </section>
  );
}
