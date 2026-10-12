import type { CSSProperties } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { process, processIntro } from "@/content/home";

export function Process({ index }: { index: string }) {
  return (
    <section id="process" aria-labelledby="process-heading" className="relative py-24 lg:py-28">
      <div className="container-page">
        <SectionHeader
          index={index}
          eyebrow={processIntro.eyebrow}
          title={processIntro.title}
          description={processIntro.description}
          headingId="process-heading"
        />

        <div data-reveal className="relative mt-16 lg:mt-20">
          {/* Connector: horizontal on desktop, vertical on mobile */}
          <div aria-hidden="true" className="absolute top-[1.375rem] right-[12.5%] left-[12.5%] hidden h-px bg-line lg:block">
            <div className="timeline-progress h-full origin-left bg-gradient-to-r from-brand-blue via-brand-violet to-brand-cyan" />
          </div>
          <div aria-hidden="true" className="absolute top-6 bottom-6 left-[1.375rem] w-px bg-line lg:hidden">
            <div className="timeline-progress-y h-full origin-top bg-gradient-to-b from-brand-blue via-brand-violet to-brand-cyan" />
          </div>

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {process.map((item, i) => (
              <li
                key={item.step}
                className="relative grid grid-cols-[2.75rem_1fr] content-start gap-5 lg:grid-cols-1 lg:justify-items-center lg:gap-7 lg:text-center"
              >
                <span
                  className="relative z-10 flex size-11 items-center justify-center rounded-full border border-line-strong bg-canvas font-mono text-xs text-fg shadow-[0_0_0_6px_var(--color-canvas)]"
                  style={{ "--i": i } as CSSProperties}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgb(79_125_255/0.25),transparent_70%)]"
                  />
                  <span className="relative">{item.step}</span>
                </span>
                <div className="pt-1.5 lg:max-w-[16rem] lg:pt-0">
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-fg">{item.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-muted">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
