import { Icon } from "@/components/ui/icon";
import { SectionHeader } from "@/components/ui/section-header";
import { principles, whyIntro } from "@/content/home";

export function WhyWyzOps({ index }: { index: string }) {
  return (
    <section id="why" aria-labelledby="why-heading" className="relative py-24 lg:py-28">
      <div className="container-page">
        <SectionHeader
          index={index}
          eyebrow={whyIntro.eyebrow}
          title={whyIntro.title}
          description={whyIntro.description}
          headingId="why-heading"
        />

        <ul data-reveal className="mt-14 grid overflow-hidden rounded-3xl border border-line bg-line [gap:1px] sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {principles.map((item) => (
            <li
              key={item.title}
              data-spotlight
              className="spotlight group bg-canvas p-7 transition-colors duration-500 hover:bg-surface sm:p-9"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-lg border border-line bg-white/[0.03] text-brand-sky transition-colors duration-500 group-hover:border-brand-blue/40">
                <Icon name={item.icon} className="size-[1.125rem]" />
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-fg">{item.title}</h3>
              <p className="mt-2.5 leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
