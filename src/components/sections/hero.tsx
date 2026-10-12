import type { CSSProperties } from "react";
import { SystemDiagram } from "@/components/diagrams/system-diagram";
import { ButtonLink } from "@/components/ui/button";
import { hero } from "@/content/home";
import { cn } from "@/lib/cn";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-44 lg:pb-28">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_20%,transparent_75%)]" />
        <div className="absolute -top-56 left-1/2 h-[42rem] w-[72rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(79_125_255/0.22),transparent)]" />
        <div className="absolute top-40 -right-40 h-[36rem] w-[36rem] bg-[radial-gradient(closest-side,rgb(139_92_246/0.16),transparent)]" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-canvas" />
      </div>

      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-6">
          <p
            className="animate-enter inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] py-1.5 pr-3.5 pl-2 text-xs text-muted"
            style={delay(0)}
          >
            <span aria-hidden="true" className="relative ml-1 flex size-2">
              <span className="status-dot absolute inset-0 rounded-full bg-brand-sky/60 blur-[3px]" />
              <span className="relative size-2 rounded-full bg-brand-sky" />
            </span>
            <span className="text-fg/90">{hero.eyebrow}</span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-line-strong sm:block" />
            <span className="hidden font-mono text-[11px] tracking-wide text-subtle sm:inline">{hero.eyebrowDetail}</span>
          </p>

          <h1
            id="hero-heading"
            className="mt-7 text-[3.25rem] leading-[0.98] font-semibold tracking-[-0.05em] text-fg sm:text-7xl lg:text-[5.25rem] xl:text-[5.75rem]"
          >
            {hero.headline.map((word, i) => (
              <span
                key={word}
                className={cn("animate-enter block", i === hero.headline.length - 1 && "text-gradient pb-1")}
                style={delay(60 + i * 90)}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Not animated: this is usually the LCP element. */}
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {hero.subheadline}
          </p>

          <div className="animate-enter mt-9 flex flex-col gap-3 sm:flex-row" style={delay(320)}>
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} size="lg" variant="secondary" arrow={false}>
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="animate-enter min-w-0 lg:col-span-6" style={delay(200)}>
          <SystemDiagram />
        </div>
      </div>
    </section>
  );
}
