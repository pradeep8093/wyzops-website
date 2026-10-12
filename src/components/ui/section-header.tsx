import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow: string;
  /** Optional index shown before the eyebrow, e.g. "02". */
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  /** id applied to the heading so the section can use aria-labelledby. */
  headingId?: string;
  align?: "left" | "center";
  className?: string;
  /** Extra content rendered beside the header on large screens (e.g. a CTA). */
  aside?: ReactNode;
};

export function SectionHeader({
  eyebrow,
  index,
  title,
  description,
  headingId,
  align = "left",
  className,
  aside,
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div
      data-reveal
      className={cn(
        "flex flex-col gap-8",
        aside ? "lg:flex-row lg:items-end lg:justify-between" : null,
        centered && "items-center text-center",
        className,
      )}
    >
      <div className={cn("max-w-3xl", centered && "mx-auto")}>
        <p className={cn("eyebrow flex items-center gap-3 text-brand-sky", centered && "justify-center")}>
          {index ? <span className="text-subtle">{index}</span> : null}
          {index ? <span aria-hidden="true" className="h-px w-6 bg-line-strong" /> : null}
          <span>{eyebrow}</span>
        </p>
        <h2
          id={headingId}
          className="mt-5 text-[2rem] leading-[1.08] font-semibold tracking-[-0.035em] text-fg sm:text-[2.5rem] lg:text-[3.25rem]"
        >
          {title}
        </h2>
        {description ? (
          <p className={cn("mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg", centered && "mx-auto")}>
            {description}
          </p>
        ) : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}
