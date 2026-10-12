import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { SectionHeader } from "@/components/ui/section-header";
import { servicesIntro } from "@/content/home";
import { advisory, practices, type Service } from "@/content/services";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <li data-reveal style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties} className="h-full">
      <Link
        href={`/contact?type=${service.projectType}`}
        aria-label={`${service.title} — discuss a project`}
        aria-describedby={`service-${service.slug}-desc`}
        data-spotlight
        className="spotlight group flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-6 transition-[transform,border-color,background-color] duration-500 ease-out-soft hover:-translate-y-1 hover:border-line-strong hover:bg-elevated/80"
      >
        <div className="flex items-start justify-between">
          <span className="relative inline-flex size-10 items-center justify-center rounded-xl border border-line-strong bg-gradient-to-b from-white/[0.08] to-white/[0.01] text-brand-sky shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] transition-colors duration-500 group-hover:text-white">
            <Icon name={service.icon} className="size-[1.125rem]" />
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 text-subtle opacity-0 transition-all duration-300 ease-out-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg group-hover:opacity-100 group-focus-visible:opacity-100"
          />
        </div>

        <h4 className="mt-5 text-[1.0625rem] font-semibold tracking-[-0.02em] text-fg">{service.title}</h4>
        <p id={`service-${service.slug}-desc`} className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
          {service.description}
        </p>

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label={`${service.title} capabilities`}>
          {service.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-line bg-white/[0.02] px-2 py-1 font-mono text-[0.6875rem] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </li>
  );
}

function AdvisoryCard() {
  return (
    <div
      data-reveal
      className="relative isolate mt-6 overflow-hidden rounded-3xl border border-line-strong bg-surface/80 p-7 sm:p-9"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_120%_at_0%_0%,rgb(79_125_255/0.12),transparent_60%)]"
      />
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="eyebrow text-subtle">Advisory</p>
          <h3 className="mt-3 flex items-center gap-3 text-2xl font-semibold tracking-[-0.03em] text-fg">
            <Icon name={advisory.icon} className="size-5 text-brand-sky" />
            {advisory.title}
          </h3>
          <p className="mt-3 leading-relaxed text-muted">{advisory.description}</p>
        </div>
        <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:col-span-4">
          {advisory.includes.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-fg/90">
              <span aria-hidden="true" className="size-1.5 rotate-45 bg-brand-sky/80" />
              {item}
            </li>
          ))}
        </ul>
        <div className="lg:col-span-3 lg:text-right">
          <ButtonLink href={`/contact?type=${advisory.projectType}`} variant="secondary">
            Talk to an architect
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

export function Services({ index }: { index: string }) {
  return (
    <section id="services" aria-labelledby="services-heading" className="relative py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(60%_50%_at_50%_0%,rgb(79_125_255/0.08),transparent)]"
      />
      <div className="container-page">
        <SectionHeader
          index={index}
          eyebrow={servicesIntro.eyebrow}
          title={servicesIntro.title}
          description={servicesIntro.description}
          headingId="services-heading"
        />

        <div className="mt-14 space-y-12 lg:mt-16 lg:space-y-14">
          {practices.map((practice, p) => (
            <div key={practice.slug} id={`practice-${practice.slug}`} className="grid gap-6 lg:grid-cols-12 lg:gap-8">
              <div data-reveal className="lg:col-span-3 lg:pt-2">
                <p className="eyebrow flex items-center gap-2 text-subtle">
                  <span className="text-brand-sky">{String(p + 1).padStart(2, "0")}</span>
                  Practice
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.025em] text-fg">{practice.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted lg:max-w-[16rem]">{practice.summary}</p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
                {practice.services.map((service, i) => (
                  <ServiceCard key={service.slug} service={service} index={i} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <AdvisoryCard />

        <p data-reveal className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          Need something that spans practices? That&apos;s most projects.
          <Link href="/contact" className="group inline-flex items-center gap-1 font-medium text-fg hover:text-white">
            Tell us what you&apos;re solving
            <ArrowRight aria-hidden="true" className="size-4 text-brand-sky transition-transform group-hover:translate-x-0.5" />
          </Link>
        </p>
      </div>
    </section>
  );
}
