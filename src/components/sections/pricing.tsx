import type { CSSProperties } from "react";
import { CalendarDays, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { engagements, pricingFootnotes, pricingIntro, type Engagement } from "@/content/pricing";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/cn";

function EngagementCard({ engagement, index }: { engagement: Engagement; index: number }) {
  const { featured } = engagement;
  return (
    <li
      data-reveal
      style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
      className={cn(
        "relative flex h-full flex-col rounded-3xl p-px",
        featured
          ? "bg-gradient-to-b from-brand-blue/70 via-brand-violet/40 to-white/[0.06] shadow-[0_30px_80px_-30px_rgb(79_125_255/0.55)]"
          : "bg-line",
      )}
    >
      <div
        className={cn(
          "flex h-full flex-col rounded-[calc(1.5rem-1px)] p-6 sm:p-7",
          featured ? "bg-[linear-gradient(180deg,#0e1220,#0a0c12_45%)]" : "bg-surface",
        )}
      >
        <div className="flex min-h-6 items-center justify-between gap-3">
          <h3 className="font-semibold tracking-[-0.02em] text-fg">{engagement.name}</h3>
          {engagement.badge ? (
            <span className="rounded-full border border-brand-sky/40 bg-brand-sky/10 px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-brand-sky uppercase">
              {engagement.badge}
            </span>
          ) : null}
        </div>

        <p className="mt-5 flex flex-wrap items-baseline gap-x-1.5">
          {engagement.price.from ? <span className="text-sm text-muted">From</span> : null}
          <span className="text-[2.25rem] leading-none font-semibold tracking-[-0.04em] text-fg">
            {engagement.price.amount}
          </span>
          {engagement.price.per ? <span className="text-sm text-muted">{engagement.price.per}</span> : null}
        </p>
        <p className="mt-2 font-mono text-[11px] text-subtle">{engagement.unit}</p>

        <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">{engagement.description}</p>

        <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
          {engagement.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-fg/90">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-sky" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7">
          <p className="mb-4 text-xs text-subtle">
            <span className="text-muted">Best for:</span> {engagement.bestFor}
          </p>
          <ButtonLink
            href={engagement.cta.href}
            variant={featured ? "primary" : "secondary"}
            className="w-full"
            arrow={featured ? "right" : false}
          >
            {engagement.cta.label}
          </ButtonLink>
        </div>
      </div>
    </li>
  );
}

export function Pricing({ index }: { index: string }) {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="relative py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[36rem] bg-[radial-gradient(50%_50%_at_30%_50%,rgb(79_125_255/0.07),transparent)]"
      />
      <div className="container-page">
        <SectionHeader
          index={index}
          eyebrow={pricingIntro.eyebrow}
          title={pricingIntro.title}
          description={pricingIntro.description}
          headingId="pricing-heading"
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 xl:grid-cols-4">
          {engagements.map((engagement, i) => (
            <EngagementCard key={engagement.id} engagement={engagement} index={i} />
          ))}
        </ul>

        <div
          data-reveal
          className="mt-8 flex flex-col gap-4 rounded-2xl border border-line px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <ul className="space-y-1 text-sm text-muted">
            {pricingFootnotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          {siteConfig.bookingUrl ? (
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-fg hover:text-white"
            >
              <CalendarDays aria-hidden="true" className="size-4 text-brand-sky" />
              Book a 30-min call
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
