import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ArrowLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { productsIntro } from "@/content/home";
import { products, productStatusLabel, type Product, type ProductStatus } from "@/content/products";
import { cn } from "@/lib/cn";

const statusStyles: Record<ProductStatus, string> = {
  live: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  beta: "border-brand-blue/30 bg-brand-blue/10 text-brand-sky",
  "in-development": "border-brand-violet/30 bg-brand-violet/10 text-[#c4b5fd]",
  "coming-soon": "border-line-strong bg-white/[0.04] text-muted",
};

export function StatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.6875rem]",
        statusStyles[status],
      )}
    >
      <span aria-hidden="true" className="status-dot size-1.5 rounded-full bg-current" />
      {productStatusLabel[status]}
    </span>
  );
}

/** Card for a real product. Rendered automatically once content/products.ts has entries. */
export function ProductCard({ product, index }: { product: Product; index: number }) {
  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.125rem] border border-line bg-elevated">
        {product.image ? (
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.02]"
          />
        ) : (
          <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60 mask-radial" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="eyebrow text-[0.68rem] text-subtle">{product.category}</span>
          <StatusBadge status={product.status} />
        </div>
        <h3 className="mt-4 flex items-center gap-2 text-xl font-semibold tracking-[-0.02em] text-fg">
          {product.name}
          {product.url ? (
            <ArrowUpRight aria-hidden="true" className="size-4 text-subtle transition-colors group-hover:text-fg" />
          ) : null}
        </h3>
        <p className="mt-2 leading-relaxed text-muted">{product.description}</p>
      </div>
    </>
  );

  const className =
    "spotlight group flex h-full flex-col rounded-3xl border border-line bg-surface/70 p-1.5 transition-[transform,border-color] duration-500 ease-out-soft hover:-translate-y-1 hover:border-line-strong";

  return (
    <li data-reveal style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as CSSProperties}>
      {product.url ? (
        <a href={product.url} target="_blank" rel="noopener noreferrer" data-spotlight className={className}>
          {body}
        </a>
      ) : (
        <article data-spotlight className={className}>
          {body}
        </article>
      )}
    </li>
  );
}

function GhostCard({ className, delay }: { className?: string; delay: number }) {
  return (
    <div
      aria-hidden="true"
      className={cn("rounded-2xl border border-line bg-elevated/80 p-4 shadow-2xl shadow-black/40 backdrop-blur", className)}
      style={{ "--delay": `${delay}s` } as CSSProperties}
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/[0.06] bg-[radial-gradient(120%_100%_at_0%_0%,rgb(139_92_246/0.28),transparent_60%),radial-gradient(100%_100%_at_100%_100%,rgb(79_125_255/0.2),transparent_60%)]">
        <div className="absolute inset-x-3 top-3 flex gap-1.5">
          <span className="h-1.5 w-8 rounded-full bg-white/20" />
          <span className="h-1.5 w-5 rounded-full bg-white/10" />
        </div>
        <div className="absolute inset-x-3 bottom-3 grid grid-cols-3 gap-1.5">
          <span className="skeleton h-6 rounded-md" />
          <span className="skeleton h-6 rounded-md" />
          <span className="skeleton h-6 rounded-md" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="skeleton h-2 w-16 rounded-full" />
        <span className="h-4 w-20 rounded-full border border-brand-violet/30 bg-brand-violet/10" />
      </div>
      <span className="skeleton mt-3 block h-3 w-28 rounded-full" />
      <span className="skeleton mt-2.5 block h-2 w-full rounded-full" />
      <span className="skeleton mt-1.5 block h-2 w-3/4 rounded-full" />
    </div>
  );
}

function ProductsEmptyState() {
  const { emptyState } = productsIntro;
  return (
    <div
      data-reveal
      data-anim
      className="relative isolate mt-14 overflow-hidden rounded-[2rem] border border-line bg-surface/70 lg:mt-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_60%_80%_at_80%_50%,#000,transparent)]" />
        <div className="absolute top-1/2 right-0 h-[30rem] w-[34rem] -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(139_92_246/0.16),transparent)]" />
      </div>

      <div className="grid items-center gap-12 p-7 sm:p-10 lg:grid-cols-2 lg:p-14">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-violet/30 bg-brand-violet/10 px-3 py-1 font-mono text-xs text-[#c4b5fd]">
            <span aria-hidden="true" className="status-dot size-1.5 rounded-full bg-[#c4b5fd]" />
            {emptyState.status}
          </span>
          <h3 className="mt-6 text-3xl leading-tight font-semibold tracking-[-0.035em] text-fg sm:text-4xl">
            {emptyState.title}
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">{emptyState.body}</p>
          <ArrowLink href={emptyState.cta.href} className="mt-8">
            {emptyState.cta.label}
          </ArrowLink>
        </div>

        <div className="relative mx-auto h-72 w-full max-w-md sm:h-80">
          <GhostCard className="float-y absolute top-6 left-0 w-[62%] rotate-[-4deg] opacity-60" delay={-2} />
          <GhostCard className="float-y absolute top-0 right-0 w-[62%] rotate-[3deg]" delay={0} />
        </div>
      </div>
    </div>
  );
}

export function Products({ index }: { index: string }) {
  return (
    <section id="products" aria-labelledby="products-heading" className="relative py-24 lg:py-28">
      <div className="container-page">
        <SectionHeader
          index={index}
          eyebrow={productsIntro.eyebrow}
          title={productsIntro.title}
          description={productsIntro.description}
          headingId="products-heading"
        />

        {products.length > 0 ? (
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </ul>
        ) : (
          <ProductsEmptyState />
        )}
      </div>
    </section>
  );
}
