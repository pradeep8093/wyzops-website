import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80dvh] items-center overflow-hidden pt-32 pb-24">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_45%,#000,transparent)]"
      />
      <div className="container-page text-center">
        <p className="font-mono text-sm text-brand-sky">404 · route_not_found</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-fg sm:text-6xl">
          This endpoint doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted">
          The page you&apos;re looking for has moved or never shipped. Let&apos;s get you back on a known path.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary" arrow={false}>
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
