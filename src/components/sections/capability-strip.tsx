import { Fragment } from "react";
import { capabilities } from "@/content/home";

export function CapabilityStrip() {
  return (
    <section aria-label="Capabilities" className="relative">
      <div aria-hidden="true" className="hairline-x absolute inset-x-0 top-0 h-px" />
      <div aria-hidden="true" className="hairline-x absolute inset-x-0 bottom-0 h-px" />
      <div className="container-page py-7 sm:py-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-6">
          {capabilities.map((item, i) => (
            <Fragment key={item}>
              {i > 0 ? (
                <li aria-hidden="true" className="hidden size-1 rotate-45 bg-gradient-to-br from-brand-blue to-brand-cyan opacity-70 sm:block" />
              ) : null}
              <li className="eyebrow text-[0.72rem] text-muted sm:text-xs">{item}</li>
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
}
