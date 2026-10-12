import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out-soft active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-canvas shadow-[0_0_0_1px_rgb(255_255_255/0.1),0_8px_30px_-6px_rgb(79_125_255/0.45)] hover:bg-white hover:shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_10px_40px_-6px_rgb(79_125_255/0.65)]",
  secondary:
    "border border-line-strong bg-white/[0.03] text-fg backdrop-blur hover:border-white/25 hover:bg-white/[0.07]",
  ghost: "text-fg hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-[0.9375rem] sm:h-[3.25rem] sm:px-7",
};

type Arrow = "right" | "up-right" | false;

function ArrowIcon({ arrow }: { arrow: Arrow }) {
  if (!arrow) return null;
  const Component = arrow === "up-right" ? ArrowUpRight : ArrowRight;
  return (
    <Component
      aria-hidden="true"
      className={cn(
        "size-4 transition-transform duration-300 ease-out-soft",
        arrow === "up-right"
          ? "group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
          : "group-hover/btn:translate-x-0.5",
      )}
    />
  );
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  arrow?: Arrow;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

/** Link styled as a button. Uses next/link for internal routes. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  arrow = "right",
  children,
  className,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isInternal = href.startsWith("/") && !href.startsWith("//");

  if (isInternal) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
        <ArrowIcon arrow={arrow} />
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...rest}>
      {children}
      <ArrowIcon arrow={arrow} />
    </a>
  );
}

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  arrow?: Arrow;
} & ComponentPropsWithoutRef<"button">;

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      <ArrowIcon arrow={arrow} />
    </button>
  );
}

/** Inline text link with an animated arrow. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-white",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 text-brand-sky transition-transform duration-300 ease-out-soft group-hover/link:translate-x-1"
      />
    </Link>
  );
}
