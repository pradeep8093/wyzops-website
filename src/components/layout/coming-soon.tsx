import type { CSSProperties } from "react";
import { LogoMark } from "@/components/ui/logo";
import { siteConfig } from "@/content/site";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

/** Full-screen "Coming soon" shown in place of the whole site when IS_COMING_SOON is on. */
export function ComingSoon() {
  return (
    <section
      aria-labelledby="coming-soon-heading"
      className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_45%,#000_15%,transparent_75%)]" />
        <div className="absolute top-1/2 left-1/2 h-[40rem] w-[64rem] -translate-x-1/2 -translate-y-[60%] bg-[radial-gradient(closest-side,rgb(79_125_255/0.2),transparent)]" />
        <div className="absolute -right-40 -bottom-20 h-[32rem] w-[32rem] bg-[radial-gradient(closest-side,rgb(139_92_246/0.14),transparent)]" />
      </div>

      <div className="container-page flex flex-col items-center text-center">
        <p className="animate-enter inline-flex items-center gap-3" style={delay(0)}>
          <LogoMark className="size-10" />
          <span className="text-xl font-semibold tracking-[-0.02em] text-fg">{siteConfig.name}</span>
        </p>

        <h1
          id="coming-soon-heading"
          className="animate-enter mt-10 text-6xl leading-[0.95] font-semibold tracking-[-0.05em] text-fg sm:text-8xl"
          style={delay(90)}
        >
          Coming <span className="text-gradient">soon.</span>
        </h1>

        <p className="animate-enter mt-7 eyebrow text-muted" style={delay(180)}>
          {siteConfig.tagline}
        </p>
      </div>
    </section>
  );
}
