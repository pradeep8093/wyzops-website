import type { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import { siteConfig } from "@/content/site";

export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <article className="relative isolate pt-32 pb-24 sm:pt-40 lg:pb-32">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_40%_at_50%_0%,#000,transparent)]"
      />
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-brand-sky">Legal</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-fg sm:text-5xl">{title}</h1>
          <p className="mt-4 font-mono text-sm text-subtle">Last updated: {lastUpdated}</p>

          {siteConfig.legalPagesAreDrafts ? (
            <div
              role="note"
              className="mt-8 flex gap-3 rounded-xl border border-amber-400/30 bg-amber-400/[0.07] px-4 py-3 text-sm text-amber-100"
            >
              <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-amber-300" />
              <p>
                This page is a template and has not yet been reviewed by legal counsel. Replace bracketed placeholders
                and have it reviewed before relying on it.
              </p>
            </div>
          ) : null}

          <div className="prose-legal mt-10">{children}</div>
        </div>
      </div>
    </article>
  );
}
