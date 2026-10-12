import type { CSSProperties } from "react";
import { Icon } from "@/components/ui/icon";
import { SectionHeader } from "@/components/ui/section-header";
import { deliveryIntro, deliveryPoints, overlap } from "@/content/home";

const pct = (hourET: number) => `${(hourET / 24) * 100}%`;
const span = (start: number, end: number) =>
  ({ left: pct(start), width: `${((end - start) / 24) * 100}%` }) as CSSProperties;

function OverlapTimeline() {
  const { bands } = overlap;
  const ticks = [
    { h: 0, label: "12 AM" },
    { h: 6, label: "6 AM" },
    { h: 12, label: "12 PM" },
    { h: 18, label: "6 PM" },
    { h: 24, label: "12 AM" },
  ];

  return (
    <figure
      data-reveal
      className="relative overflow-hidden rounded-3xl border border-line bg-surface/80 p-6 sm:p-8"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_80%_at_45%_0%,rgb(79_125_255/0.12),transparent_70%)]"
      />
      <p className="eyebrow text-brand-sky">Overlap</p>
      <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-fg sm:text-xl">{overlap.headline}</p>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
        <span className="whitespace-nowrap">{overlap.etWindow}</span>
        <span className="whitespace-nowrap">{overlap.istWindow}</span>
      </p>

      <div className="mt-8" aria-hidden="true">
        <div className="relative space-y-5">
          {/* Overlap highlight column */}
          <div
            className="absolute -top-2 -bottom-2 rounded-lg border border-brand-sky/30 bg-brand-sky/[0.07]"
            style={span(bands.overlapStart, bands.overlapEnd)}
          />
          <div>
            <p className="mb-2 flex items-center justify-between text-xs text-muted">
              <span className="text-fg">Your team · US Eastern</span>
            </p>
            <div className="relative h-9 rounded-lg bg-white/[0.03] ring-1 ring-line ring-inset">
              <div
                className="absolute inset-y-1 flex items-center overflow-hidden rounded-md bg-gradient-to-r from-white/15 to-white/[0.08] px-3"
                style={span(bands.clientStart, bands.clientEnd)}
              >
                <span className="hidden truncate font-mono text-[11px] text-fg sm:block">Your business day</span>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs text-fg">WyzOps · India</p>
            <div className="relative h-9 rounded-lg bg-white/[0.03] ring-1 ring-line ring-inset">
              <div
                className="absolute inset-y-1 flex items-center overflow-hidden rounded-md bg-gradient-to-r from-brand-violet/40 to-brand-blue/40 px-3"
                style={span(bands.teamStart, bands.overlapStart)}
              >
                <span className="hidden truncate font-mono text-[11px] text-fg sm:block">Build time · your night</span>
              </div>
              <div
                className="absolute inset-y-1 flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-brand-blue to-brand-cyan px-2"
                style={span(bands.overlapStart, bands.overlapEnd)}
              >
                <span className="hidden truncate font-mono text-[11px] font-medium text-canvas sm:block">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Axis */}
        <div className="relative mt-5 h-5 font-mono text-[10px] whitespace-nowrap text-subtle">
          {ticks.map((t, i) => (
            <span
              key={`${t.h}-${i}`}
              className="absolute -translate-x-1/2 first:translate-x-0 last:-translate-x-full"
              style={{ left: pct(t.h) }}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>

      <ul aria-hidden="true" className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] text-muted sm:hidden">
        <li className="flex items-center gap-2">
          <span className="size-2.5 rounded-sm bg-white/20" />
          Your business day
        </li>
        <li className="flex items-center gap-2">
          <span className="size-2.5 rounded-sm bg-gradient-to-r from-brand-violet/60 to-brand-blue/60" />
          WyzOps build time
        </li>
        <li className="flex items-center gap-2">
          <span className="size-2.5 rounded-sm bg-gradient-to-r from-brand-blue to-brand-cyan" />
          Live overlap
        </li>
      </ul>

      <figcaption className="mt-4 text-xs text-subtle">
        Times shown in US Eastern. India works through your night, overlaps with your morning, and hands off before
        your afternoon.
      </figcaption>
    </figure>
  );
}

export function Delivery({ index }: { index: string }) {
  return (
    <section id="delivery" aria-labelledby="delivery-heading" className="relative py-24 lg:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <SectionHeader
              index={index}
              eyebrow={deliveryIntro.eyebrow}
              title={deliveryIntro.title}
              description={deliveryIntro.description}
              headingId="delivery-heading"
            />
          </div>
          <div className="lg:col-span-7">
            <OverlapTimeline />
          </div>
        </div>

        <ul className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {deliveryPoints.map((point, i) => (
            <li
              key={point.title}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as CSSProperties}
              className="flex gap-4 border-t border-line py-6"
            >
              <Icon name={point.icon} className="mt-0.5 size-[1.125rem] shrink-0 text-brand-sky" />
              <div>
                <h3 className="font-medium text-fg">{point.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{point.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
