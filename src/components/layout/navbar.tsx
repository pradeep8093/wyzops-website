"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { mainNav, primaryCta } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/cn";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // While the mobile menu is open: lock scroll, make the page inert, handle Esc,
  // and move focus into the panel.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const background = document.querySelectorAll<HTMLElement>("main, footer");
    root.style.overflow = "hidden";
    background.forEach((el) => el.setAttribute("inert", ""));
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) close();
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = "";
      background.forEach((el) => el.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  const isActive = (href: string) => !href.includes("#") && pathname === href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex h-14 max-w-[78rem] items-center justify-between rounded-full border pr-2 pl-3 sm:pl-4 lg:pl-4 transition-[background-color,border-color,box-shadow] duration-500 ease-out-soft sm:pl-5",
          scrolled || open
            ? "border-line bg-[rgb(10_12_18/0.72)] shadow-[0_8px_32px_-12px_rgb(0_0_0/0.6)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="/" aria-label={`${siteConfig.name} — home`} className="rounded-lg" onClick={() => close()}>
          <Logo />
        </Link>

        <ul className="hidden items-center gap-0.5 md:flex">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm transition-colors duration-200 hover:bg-white/[0.05] hover:text-fg",
                  isActive(item.href) ? "text-fg" : "text-muted",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ButtonLink href={primaryCta.href} size="sm" arrow={false} className="max-sm:hidden">
            {primaryCta.label}
          </ButtonLink>

          <button
            ref={toggleRef}
            type="button"
            className="relative inline-flex size-10 items-center justify-center rounded-full text-fg transition-colors hover:bg-white/[0.06] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-5 rounded-full bg-current transition-transform duration-300 ease-out-soft",
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-5 rounded-full bg-current transition-transform duration-300 ease-out-soft",
                  open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-0 -z-10 overflow-y-auto bg-canvas/95 px-6 pt-28 pb-10 backdrop-blur-2xl md:hidden"
      >
        <div aria-hidden="true" className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-60" />
        {open ? (
          <div className="relative flex min-h-full flex-col">
            <ul className="flex flex-col">
              {mainNav.map((item, i) => (
                <li
                  key={item.href}
                  className="animate-enter border-b border-line"
                  style={{ "--enter-delay": `${60 + i * 50}ms` } as CSSProperties}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => close()}
                    className="flex items-center justify-between py-5 text-3xl font-medium tracking-[-0.03em] text-fg"
                  >
                    {item.label}
                    <span aria-hidden="true" className="font-mono text-xs text-subtle">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div
              className="animate-enter mt-auto flex flex-col gap-4 pt-10"
              style={{ "--enter-delay": "320ms" } as CSSProperties}
            >
              <ButtonLink href={primaryCta.href} size="lg" onClick={() => close()}>
                {primaryCta.label}
              </ButtonLink>
              <p className="text-center text-sm text-muted">{siteConfig.tagline}</p>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
