import type { CSSProperties, ReactNode } from "react";
import { Check } from "lucide-react";
import { CodeMock, ProductMock } from "@/components/diagrams/mocks";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { businessAreas } from "@/content/home";
import { showProducts } from "@/content/navigation";
import { cn } from "@/lib/cn";

type Area = (typeof businessAreas)["products"];

function AreaCard({
  area,
  visual,
  tone,
  index,
  pending = false,
}: {
  area: Area;
  visual: ReactNode;
  tone: "violet" | "blue";
  index: number;
  /** Show the pending label instead of the CTA (e.g. no products published yet). */
  pending?: boolean;
}) {
  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${index * 120}ms` } as CSSProperties}
      className="group flex flex-col rounded-[1.75rem] border border-line bg-surface/60 p-1.5 transition-colors duration-500 hover:border-line-strong"
    >
      <div
        className={cn(
          "relative h-60 overflow-hidden rounded-[1.375rem] border border-line sm:h-64",
          tone === "violet"
            ? "bg-[radial-gradient(120%_90%_at_20%_0%,rgb(139_92_246/0.24),transparent_60%),linear-gradient(#0a0c12,#0a0c12)]"
            : "bg-[radial-gradient(120%_90%_at_80%_0%,rgb(79_125_255/0.24),transparent_60%),linear-gradient(#0a0c12,#0a0c12)]",
        )}
      >
        <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
        <div className="mask-fade-b absolute inset-x-6 top-8 transition-transform duration-700 ease-out-soft group-hover:-translate-y-1.5 sm:inset-x-10 sm:top-10">
          {visual}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p
          className={cn(
            "eyebrow inline-flex w-fit items-center gap-2 rounded-full border px-2.5 py-1 text-[0.68rem]",
            tone === "violet"
              ? "border-brand-violet/30 bg-brand-violet/10 text-[#c4b5fd]"
              : "border-brand-blue/30 bg-brand-blue/10 text-brand-sky",
          )}
        >
          {area.label}
        </p>
        <h3 className="mt-5 text-2xl leading-tight font-semibold tracking-[-0.03em] text-fg sm:text-[1.75rem]">
          {area.title}
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{area.body}</p>
        <ul className="mt-6 space-y-2.5">
          {area.points.map((point) => (
            <li key={point} className="flex items-center gap-3 text-sm text-fg/90">
              <Check aria-hidden="true" className={cn("size-4 shrink-0", tone === "violet" ? "text-[#c4b5fd]" : "text-brand-sky")} />
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-8 pt-2 sm:mt-auto sm:pt-8">
          {pending && area.pendingLabel ? (
            <p className="inline-flex h-11 items-center gap-2.5 rounded-full border border-dashed border-line-strong px-5 text-sm text-muted">
              <span aria-hidden="true" className="status-dot size-1.5 rounded-full bg-[#c4b5fd]" />
              {area.pendingLabel}
            </p>
          ) : (
            <ButtonLink href={area.cta.href} variant="secondary">
              {area.cta.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </article>
  );
}

export function BusinessAreas({ index }: { index: string }) {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative py-24 lg:py-28">
      <div className="container-page">
        <SectionHeader
          index={index}
          eyebrow={businessAreas.eyebrow}
          title={businessAreas.title}
          description={businessAreas.description}
          headingId="about-heading"
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16">
          <AreaCard area={businessAreas.engineering} visual={<CodeMock />} tone="blue" index={0} />
          <AreaCard
            area={businessAreas.products}
            visual={<ProductMock />}
            tone="violet"
            index={1}
            pending={!showProducts}
          />
        </div>
      </div>
    </section>
  );
}
