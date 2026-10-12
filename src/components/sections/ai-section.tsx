import type { CSSProperties } from "react";
import { AgentDiagram, agentTrace } from "@/components/diagrams/agent-diagram";
import { Icon } from "@/components/ui/icon";
import { SectionHeader } from "@/components/ui/section-header";
import { aiSection } from "@/content/home";
import { cn } from "@/lib/cn";

function TracePanel() {
  return (
    <div
      data-reveal
      className="rounded-2xl border border-line bg-[rgb(8_10_15/0.9)] font-mono text-[11.5px] leading-6 sm:text-xs"
    >
      <div className="flex h-9 items-center justify-between border-b border-line px-4 text-[11px] text-subtle">
        <span>agent-trace</span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="status-dot size-1.5 rounded-full bg-brand-violet" />
          example run
        </span>
      </div>
      <ol className="space-y-0.5 p-4" aria-label="Example agent trace">
        {agentTrace.map((line, i) => {
          const isStep = line.kind !== "›" && line.kind !== "✓";
          return (
            <li
              key={line.label}
              className={cn("trace-line flex items-center gap-3", isStep && "pl-4")}
              style={{ "--i": i } as CSSProperties}
            >
              {isStep ? (
                <>
                  <span aria-hidden="true" className="text-subtle">↳</span>
                  <span className="w-8 text-[#c4b5fd]">{line.kind}</span>
                  <span className="text-fg">{line.label}</span>
                  <span className="ml-auto text-emerald-400/90">{line.status}</span>
                </>
              ) : (
                <>
                  <span aria-hidden="true" className={line.kind === "✓" ? "text-emerald-400" : "text-brand-sky"}>
                    {line.kind}
                  </span>
                  <span className={cn("min-w-0 truncate", line.kind === "✓" ? "text-emerald-300/90" : "text-fg")}>{line.label}</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function AiSection({ index }: { index: string }) {
  return (
    <section id="ai" aria-labelledby="ai-heading" className="relative py-12 sm:py-16">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-surface/80 px-5 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          {/* Lab backdrop */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-dots absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,#000,transparent)]" />
            <div className="absolute -top-40 right-0 h-[36rem] w-[40rem] bg-[radial-gradient(closest-side,rgb(139_92_246/0.22),transparent)]" />
            <div className="absolute -bottom-48 -left-20 h-[30rem] w-[36rem] bg-[radial-gradient(closest-side,rgb(34_211_238/0.1),transparent)]" />
          </div>

          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-6">
              <SectionHeader
                index={index}
                eyebrow={aiSection.eyebrow}
                title={
                  <>
                    {aiSection.title} <span className="text-gradient">{aiSection.titleAccent}</span>
                  </>
                }
                description={aiSection.body}
                headingId="ai-heading"
              />

              <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
                {aiSection.capabilities.map((cap, i) => (
                  <li
                    key={cap.title}
                    data-reveal
                    style={{ "--reveal-delay": `${(i % 2) * 80}ms` } as CSSProperties}
                    className="flex gap-3.5 border-t border-line py-4"
                  >
                    <Icon name={cap.icon} className="mt-0.5 size-[1.125rem] shrink-0 text-[#c4b5fd]" />
                    <div>
                      <h3 className="text-[0.9375rem] font-medium text-fg">{cap.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{cap.body}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <p data-reveal className="mt-6 border-l-2 border-brand-violet/50 pl-4 text-sm leading-relaxed text-muted">
                {aiSection.stance}
              </p>
            </div>

            <div className="flex min-w-0 flex-col gap-4 lg:col-span-6 lg:pt-4">
              <div
                data-reveal
                data-anim
                className="[contain:layout_paint] rounded-2xl border border-line bg-[rgb(8_10_15/0.75)] p-3 shadow-[0_40px_120px_-40px_rgb(139_92_246/0.45)] sm:p-5"
              >
                <AgentDiagram />
              </div>
              <TracePanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
