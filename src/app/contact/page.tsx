import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ArrowUpRight, CalendarDays, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { nextSteps } from "@/content/contact";
import { overlap } from "@/content/home";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell WyzOps what you're trying to build, integrate, automate, or improve — SaaS, web and mobile development, Boomi and API integrations, AI, and MCP.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-heading" className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 lg:pb-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_50%_at_30%_0%,#000_20%,transparent_70%)]" />
        <div className="absolute -top-48 left-0 h-[36rem] w-[56rem] bg-[radial-gradient(closest-side,rgb(79_125_255/0.18),transparent)]" />
        <div className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] bg-[radial-gradient(closest-side,rgb(139_92_246/0.12),transparent)]" />
      </div>

      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-5">
          <p className="eyebrow animate-enter text-brand-sky">Contact</p>
          <h1
            id="contact-heading"
            className="animate-enter mt-5 text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.045em] text-fg sm:text-6xl"
            style={{ "--enter-delay": "80ms" } as CSSProperties}
          >
            Let&apos;s build something useful.
          </h1>
          <p
            className="animate-enter mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg"
            style={{ "--enter-delay": "160ms" } as CSSProperties}
          >
            Tell us what you&apos;re working on. A short description is enough to start — we&apos;ll follow up with the
            right questions.
          </p>

          <div
            className="animate-enter mt-10 rounded-2xl border border-line bg-surface/60 p-5"
            style={{ "--enter-delay": "240ms" } as CSSProperties}
          >
            <p className="text-sm text-muted">{siteConfig.bookingUrl ? "Prefer to talk or email?" : "Prefer email?"}</p>
            {siteConfig.bookingUrl ? (
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 flex items-center gap-2.5 font-medium text-fg"
              >
                <CalendarDays aria-hidden="true" className="size-4 text-brand-sky" />
                <span className="underline-offset-4 group-hover:underline">Book a 30-minute call</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ) : null}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="group mt-2 inline-flex items-center gap-2.5 font-medium text-fg"
            >
              <Mail aria-hidden="true" className="size-4 text-brand-sky" />
              <span className="underline-offset-4 group-hover:underline">{siteConfig.contactEmail}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <p className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-sm text-muted">
              <MapPin aria-hidden="true" className="size-4 text-subtle" />
              Engineering teams in {siteConfig.location.country} · {overlap.etWindow} overlap
            </p>
          </div>

          <div className="animate-enter mt-12" style={{ "--enter-delay": "320ms" } as CSSProperties}>
            <h2 className="eyebrow text-subtle">What happens next</h2>
            <ol className="mt-6 space-y-6">
              {nextSteps.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-4">
                  <span className="flex size-8 items-center justify-center rounded-full border border-line-strong font-mono text-xs text-muted">
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <h3 className="text-[0.9375rem] font-medium text-fg">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <div
            className="animate-enter relative rounded-[1.75rem] border border-line bg-white/[0.02] p-1.5 shadow-[0_40px_120px_-50px_rgb(79_125_255/0.4)]"
            style={{ "--enter-delay": "200ms" } as CSSProperties}
          >
            <div className="rounded-[1.375rem] border border-line bg-surface/90 p-6 backdrop-blur sm:p-9">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
