import type { CSSProperties } from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import { workIntro } from "@/content/home";

/** Card for a real, client-approved case study. */
export function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const content = (
    <>
      {study.image ? (
        <div className="relative aspect-[16/9] overflow-hidden rounded-[1.125rem] border border-line">
          <Image
            src={study.image.src}
            alt={study.image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.02]"
          />
        </div>
      ) : null}
      <div className="p-6 sm:p-7">
        <p className="eyebrow text-[0.68rem] text-subtle">
          {study.client}
          {study.year ? ` · ${study.year}` : ""}
        </p>
        <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-fg sm:text-2xl">{study.title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{study.summary}</p>
        {study.outcome ? <p className="mt-4 text-sm text-fg">{study.outcome}</p> : null}
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {study.services.map((s) => (
            <li key={s} className="rounded-md border border-line px-2 py-1 font-mono text-[0.6875rem] text-muted">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  const className =
    "spotlight group block h-full rounded-3xl border border-line bg-surface/70 p-1.5 transition-[transform,border-color] duration-500 ease-out-soft hover:-translate-y-1 hover:border-line-strong";

  return (
    <li data-reveal style={{ "--reveal-delay": `${(index % 2) * 100}ms` } as CSSProperties}>
      {study.url ? (
        <a href={study.url} data-spotlight className={className}>
          {content}
        </a>
      ) : (
        <article data-spotlight className={className}>
          {content}
        </article>
      )}
    </li>
  );
}

function WorkEmptyState() {
  const { emptyState } = workIntro;
  return (
    <div data-reveal className="relative isolate mt-14 overflow-hidden rounded-[2rem] border border-line lg:mt-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60 mask-radial" />
        <div className="absolute inset-x-0 -bottom-40 mx-auto h-80 w-[48rem] max-w-full bg-[radial-gradient(closest-side,rgb(79_125_255/0.16),transparent)]" />
      </div>

      {/* Pipeline motif */}
      <svg aria-hidden="true" viewBox="0 0 1200 40" preserveAspectRatio="none" className="absolute inset-x-0 top-10 h-10 w-full opacity-70">
        <path d="M0 20 H1200" stroke="rgb(255 255 255 / 0.07)" />
        {[180, 420, 600, 780, 1020].map((x, i) => (
          <g key={x}>
            <circle cx={x} cy={20} r={i === 2 ? 5 : 3.5} fill="#05060a" stroke={i === 2 ? "#93b4ff" : "rgb(255 255 255 / 0.25)"} />
          </g>
        ))}
      </svg>

      <div className="mx-auto max-w-3xl px-6 pt-24 pb-14 text-center sm:px-10 sm:pt-28 sm:pb-16">
        <h3 className="text-2xl leading-snug font-semibold tracking-[-0.03em] text-fg sm:text-[2rem]">
          {emptyState.title}
        </h3>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">{emptyState.body}</p>
        <div className="mt-8 flex justify-center">
          <ButtonLink href={emptyState.cta.href} variant="secondary">
            {emptyState.cta.label}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

export function SelectedWork({ index }: { index: string }) {
  return (
    <section id="work" aria-labelledby="work-heading" className="relative pt-4 pb-24 lg:pb-28">
      <div className="container-page">
        <SectionHeader
          index={index}
          eyebrow={workIntro.eyebrow}
          title={workIntro.title}
          description={caseStudies.length > 0 ? undefined : workIntro.description}
          headingId="work-heading"
        />
        {caseStudies.length > 0 ? (
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16">
            {caseStudies.map((study, i) => (
              <CaseStudyCard key={study.slug} study={study} index={i} />
            ))}
          </ul>
        ) : (
          <WorkEmptyState />
        )}
      </div>
    </section>
  );
}
